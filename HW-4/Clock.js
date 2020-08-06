import {DateFormat} from '/DateFormat.js';

class Clock extends DateFormat {
  constructor (format, date) {
    super(format);
    this.date = (date) ? new Date(date) : new Date;
  }

  run () {
    this.timer = setInterval( () => {
      console.log(this.getFormatedDate());
    },1000 )

    return this;
  }

  stop () {
    clearInterval(this.timer);

    return this;
  }

}

let clock = new Clock('hh:ii:ss dd/mm/yyyy');

console.log(2);