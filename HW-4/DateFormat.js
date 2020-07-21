class DateFormat {
  static availableSigns = ['y','m','d','h','i','s'];

  static formats = {
    yyyy: (date) => date.getFullYear(),

    yy: (date) => {
      let year = date.getFullYear().toString();
      return year[2] + year[3];
    },

    mm: (date) => {
     let month = date.getMonth()+1;
     return (month < 10) ? '0' + month : month;
    },

    dd: (date) => {
     let dayOfMonth = date.getDate();
     return (dayOfMonth < 10) ? '0' + dayOfMonth : dayOfMonth;
    },

    hh: (date) => {
     let hours = date.getHours();
     return (hours < 10) ? '0' + hours : hours;
    },

    ii: (date) => {
     let minutes = date.getMinutes();
     return (minutes < 10) ? '0' + minutes : minutes;
    },

    ss:  (date) => {
     let seconds = date.getSeconds();
     return (seconds < 10) ? '0' + seconds : seconds;
    }
  }

  static fillArrDateParts (templateStr) {
    let datePartsArr = [];

    for (let i = 0; i < this.availableSigns.length; i++) {

      let rgxp = new RegExp(`${this.availableSigns[i]}+`, 'im');
      let dPart = templateStr.match(rgxp);

      if (!!dPart) {
        dPart[0] = dPart[0].toLowerCase();
        datePartsArr.push(dPart);
      }
      else {
        continue;
      }
    }

    return datePartsArr.sort((a,b) => a.index - b.index);
  }

  static fillArrDelivers (templateStr, datePartsArr) {
    let rgxpStr = datePartsArr.reduce((accum, el) => accum + '(.+)?'+ el,'') + '(.+)?';
    let deliversArr = templateStr.match(new RegExp(rgxpStr, 'im'));
    
    deliversArr.shift();
    deliversArr = deliversArr.map(el => {
      if(!el) return '';
      return el;
    });

    return deliversArr;
  }

  constructor (template) {
    this.template = template;
    this.crateDate = new Date();
    this.datePartsArr =  DateFormat.fillArrDateParts(template);
    this.deliversArr = DateFormat.fillArrDelivers(template, this.datePartsArr);
  }

  getFormatedDate (incomeDate) {
    let date =  (incomeDate) ? new Date(incomeDate) : new Date();
    let j = 0;

    let dateStr = this.datePartsArr.reduce((accum, el) => {
      if (j < this.deliversArr.length - 2) {
        return accum + this.deliversArr[j++] + DateFormat.formats[el](date);
      }
      else {
        return accum + this.deliversArr[j++] + DateFormat.formats[el](date) + this.deliversArr[j++];
      }

    },'')

    return dateStr;
  }

  changeFormatTo (template) {
    this.datePartsArr =  DateFormat.fillArrDateParts(template);
    this.deliversArr = DateFormat.fillArrDelivers(template, this.datePartsArr);

    return this;
  }

}