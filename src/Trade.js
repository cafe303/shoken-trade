
const holidayJp = require('@holiday-jp/holiday_jp')
const axios = require('axios')
const csv = require('csv-stream')

class Trade {
  isToshoOpenDate(date = new Date()){
    if(date.getDay() % 6 === 0){// 土日は閉まっている
      return false
    }
    if(holidayJp.isHoliday(date)){// 祝日は閉まっている
      return false
    }
    if(date.getMonth() * 8 + date.getDate() < 4 ||
      (date.getMonth() === 11 && date.getDate() === 31)
    ){// 年末年始は閉まっている
      return false
    }
    return true
  }
  isToshoOpenTime(date = new Date()){
    if(this.isToshoOpenDate(date)){
      var hour = date.getHours()
      if(hour < 9 || hour >= 15) return false;
      return true;
    }
    return false
  }
  async getHeikinData(type = 'nikkei'){
    if(this.heikinData){
      return this.heikinData[type];
    }
    return axios({
      url: 'https://drive.google.com/uc?export=download&id=1YALTft9gCByveJn7SQVOUn2AOWiVoX7E',
      responseType: 'stream'
    }).then((response) => {
      this.heikinData = {
        nikkei: [],
        topix: [],
      }
      return new Promise((resolve, reject) => {
        response.data.pipe(csv({separator: '\t'}))
        .on('data', data => {
          this.heikinData.nikkei.push(parseFloat(data[0]))
          this.heikinData.topix.push(parseFloat(data[1]))
        })
        .on('end', () => {
          resolve(this.heikinData[type])
        })
        .on('error', reject)
      })
    })
  }
}

module.exports = Trade
