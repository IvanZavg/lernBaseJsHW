class Element {
  constructor (options) {
    this.tag = options.tag;
    this.id  = options.id || null;
    this.class  = options.class || null;
  }

  createEl () {
    let el = document.createElement(this.tag);
    if(this.id) el.id = this.id;
    if(this.class) el.className  =  this.class;
    return el;
  }

  insertAsChild (perentElSelector) {
    let perent = document.querySelector(perentElSelector);
    perent.appendChild(this.createEl());
  }
} 

class Square extends Element {
  constructor (options) {
    super(options);
    this.tag = 'div';
    this.width = options.size;
    this.height = options.size;
    this.bgColor = options.colorFill;
  }

  createEl () {
    let el = super.createEl();
    el.style.cssText = `width: ${this.width}; height: ${this.height}; background-color: ${this.bgColor}`;
    return el;
  }
}   

class BlinkSquare extends Square {
  static setBlinkTogle (el, isVisible, interval) {
    if (isVisible){
      el.style.opacity = '0';
    }
    else{
      el.style.opacity = '1';
    }
    
    isVisible = !isVisible;
    setTimeout(BlinkSquare.setBlinkTogle, interval, el, isVisible, interval);
  }

  constructor (options){
    super(options);
    this.interval = options.ms;
  }

  startBlink () {
    let interval = this.interval;
    let isVisible = true;
    let el = document.getElementById(this.id)
    BlinkSquare.setBlinkTogle(el, isVisible, interval);
  }
}


let testDiv = new BlinkSquare({
                             id: 'testDiv',
                             class: 'testClass',
                             size: '100px',
                             colorFill: 'red',
                             ms: 1000
                          });
testDiv.insertAsChild('#forTestInsert');
testDiv.startBlink();

