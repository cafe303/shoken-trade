const Shoken = require('./Shoken')

class Sbi extends Shoken {
  async login(){
    await this.goto('https://site2.sbisec.co.jp/ETGate/')
    await this.handleFill('input[type="text"][name="user_id"]', this.query.login_id)
    await this.handleFill('input[type="password"][name="user_password"]', this.query.login_password)
    await this.handleClick('input[name="ACT_login"]')
    return true
  }

  async search(){
    // 検索コードの入力前準備
    if(this.query.trade_category === 'toshi_shintaku'){
      await this.handleClick('#tabLink2 a')
    }

    // 検索コードの入力
    if(this.query.trade_category === 'toshi_shintaku'){
      await this.handleFill('#fundSearch', this.query.trade_code)
    } else if(this.query.trade_category === 'japan_kabu'){
      await this.handleFill('#top_stock_sec', this.query.trade_code)
    }

    // 検索ボタンのクリック
    if(this.query.trade_category === 'toshi_shintaku'){
      await this.handleClick('#tabSearch2 a')
      await this.sleep(5000) // 画面遷移のため15秒待ち
      await this.handleClick('a.fundDetail')
    } else if(this.query.trade_category === 'japan_kabu'){
      await this.handleClick('#srchK a')
    }
  }

  async buy(){
    if(this.query.trade_category === 'toshi_shintaku'){
      return this.toshi_shintaku_buy()
    }
  }
  async toshi_shintaku_buy(skip_trade_button = false, retryCount = 0){
    var ele
    if(!skip_trade_button){
      // 金額買付 口数買付をクリック
      if(this.query.trade_by_price){
        await this.handleClick('.button.price a')
      } else {
        await this.handleClick('.button.unit a')
      }
    }

    ele = await this.handle('input[type="password"][name="trade_pwd"]')
    if(!ele){
      if(this.query.trade_auto_agreement){
        // 同意して次へを自動でクリックする
        ele = await this.handle('img[alt="同意して次へ"]')
        if(ele) {
          ele = await this.page.evaluateHandle(el => el.parentElement, ele)
          await ele.click()
          return this.toshi_shintaku_buy(true)
        }
      }
      return false
    }
    await this.sleep(10)
    await ele.type(String(this.query.trade_password))

    if(this.query.trade_by_price){
      // 預かり区分の設定
      if(this.query.trade_azukari_kubun === 'nisa'){
        await this.handleClick('#nisaazukari')
      }

      // 分配金の設定
      ele = 'input[type="radio"][name="reinvest"]'
      if(this.query.trade_bunpai === 'saitoshi'){
        ele += '[value="2"]'
      } else {
        ele += '[value="1"]'
      }
      await this.handleClick(ele)

      await this.handleFill('input[name="payment"]', this.query.trade_amount)
    }
    await this.handleClick('input[name="skip_estimate"]')

    var ele = await this.handle('img[alt="注文発注"]')
    if(!ele) return false; 
    ele = await this.page.evaluateHandle(el => el.parentElement, ele)

    await ele.click()// 注文発注実行

    await this.sleep(10000)// ページ遷移を待つ

    ele = await this.handle('h2')
    if(ele){
      ele = await ele.innerText()
      if(ele.startsWith('注文受付')){
        this.runResult = 1
        return true
      }
    }

    ele = await this.handle('input[type="password"][name="trade_pwd"]')
    if(ele){
      if(retryCount < 1){
        return this.toshi_shintaku_buy(true, retryCount + 1)
      }
      return false
    }
    this.runResult = 0
  }
}

module.exports = Sbi
