const {chromium} = require('playwright')
const fs = require('fs')
const path = require('path')
const commandOptions = require('./commandOptions')

class Shoken {
  static async setup () {
    Shoken.browser = await chromium.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1200,800'
      ],
      headless: commandOptions.headless,
      defaultViewport: {
        width: 1200,
        height: 800
      },
      slowMo: 1
    })
    console.log('Browser open')
  }
  
  static async start(option = {}){
    var query = Object.assign({}, commandOptions, option)
    var className = query.shoken_select
    var filePath = path.join(__dirname, className[0].toUpperCase() + className.slice(1) + '.js')
    console.log(filePath)
    if(fs.existsSync(filePath)){
      var Cls = require(filePath)
      var obj = new Cls(query)
      await obj.run()
    } else {
      console.error('Path not exists', filePath)
    }
  }

  static async end(){
    if(Shoken.browser){
      let browser = Shoken.browser
      Shoken.browser = null
      await browser.close()
      console.log('Browser close')
    }
  }

  constructor(query){
    this.query = query || {}
    this.runResult = -1
  }
  async run(){
    console.log('Run start')
    for(var i = 0; i <= this.query.shoken_retry; ++i){
      try{
        await this._run()
      }catch(e){
        console.error(e)
      }
      if(this.runResult >= 0){
        break;
      }
    }
    if(this.runResult > 0){
      console.log("実行に成功しました")
    } else if(this.runResult < 0){
      console.error("実行に失敗しました")
    } else {
      console.warn("実行に失敗したか、成功したか分かりませんでした")
    }
  }
  async _run(){
    if(this.page){
      try{
        await this.page.close()
      }catch(e){}
    }
    this.page = await Shoken.browser.newPage()
    this.page.setDefaultTimeout(this.query.page_timeout)

    for(var count = 0; ; ++count){
      if(await this.login(count)){
        break
      } else if(count === 3){
        console.warn('ログインに失敗しました')
        return false
      }
    }

    await this.search()
    await this.buy()

    if(!this.query.not_end){
      await this.page.close()
    }
  }
  async login(){}
  async search(){}
  async buy(){}

  async sleep(time){
    return new Promise(resolve => setTimeout(resolve, time))
  }
  async goto(url){
    return this.page.goto(url)
  }
  async handle(query){
    var ele = await this.page.waitForSelector(query)
    if(!ele){
      console.error(query)
    }
    await ele.focus()
    return ele
  }
  async handleType(query, text){
    var ele = await this.handle(query)
    return ele.type(String(text))
  }
  async handleFill(query, text){
    return this.page.fill(query, String(text))
  }
  async handleClick(query){
    var ele = await this.handle(query)
    return ele.click()
  }
}

process.on('uncaughtException', (err) => {
  console.error(err)
  Shoken.end()
});

module.exports = Shoken
