import {DateFormat} from '/DateFormat.js';

export class Clock extends DateFormat {
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

