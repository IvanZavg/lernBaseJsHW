let clients = [
    {
      id: 1,
      firstName: 'FirstName1',
      lastName: 'LastName1',
      address: 'address1',
      phone: 'phone1'
    }, {
      id: 2,
      firstName: 'FirstName2',
      lastName: 'LastName2',
      address: 'address2',
      phone: 'phone2'
    }, {
      id: 3,
      firstName: 'FirstName3',
      lastName: 'LastName3',
      address: 'address3',
      phone: 'phone3'
    }
  ];

let cards = [
  {
    id: 0,
    clientId: 0,
    number: '0000',
    data: 1493034361601
  }, {
    id: 1,
    clientId: 0,
    number: '0001',
    data: 1493034301601
  }, {
    id: 2,
    clientId: 0,
    number: '0002',
    data: 1493034001601
  }, {
    id: 3,
    clientId: 1,
    number: '1001',
    data: 1493034101601
  }
];


class BankDataFactory {
  static availableClasses = {};

  static savedClassId = {};

  static addClass (className, classRef, classCash) {
    this.availableClasses[className] = {};
    this.availableClasses[className].classRef = classRef;
    this.availableClasses[className].classCash = classCash;
  }

  static create (className, data) {
    if (!this.availableClasses[className]) throw new Error(`Required class-${className} is not available`);

    let createdClass = this.availableClasses[className].classRef;
    let classCash = this.availableClasses[className].classCash;

    if (!this.savedClassId[className]) {
      this.savedClassId[className] = [data.id];
    }
    else {
      this.checkID(this.savedClassId[className], data.id);
      this.savedClassId[className].push(data.id);
    }

    if (!!classCash) {
      let cash = createdClass[classCash];

      cash.push(new createdClass(data));

      return cash[cash.length - 1];
    }
    
    return new createdClass(data);
  }

  static createMany (className, arrData) {
    return arrData.map(clientData => this.create(className,clientData));
  }

  static checkID (arr, id) { //для предотвращения дублирования id
    arr.forEach( (savedId) => {
      if (savedId == id ) {
        throw new Error(`id-${id} already used`);
      }
      else if (typeof id !== 'number') {
        throw new Error(`id-${id} is not a number`);
      }
    });  
  }

}


class Client  {
  static instancesClient = [];

  static destroy (id) {
    this.instancesClient = this.instancesClient.filter(client => client.id != id)
    return this;
  }

  static fetch (data) {
   return this.instancesClient; 
  }

  static find (id) {
    return this.instancesClient.find(client => client.id === id);
  }

  constructor (data, itIsInit = false) {
    this.id =  data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.address = data.address;
    this.phone = data.phone;
  };

  getFirstName () {
    return this.firstName; 
  }

  updateFirstName (newName) {
    this.firstName = newName;
    return this;
  }

  getLastName () {
    return this.lastName;
  }

  updateLastName (newLastName) {
    this.lastName = newLastName;
    return this;
  }

  getAddress () {
    return this.address;
  }

  updateAddress (newAdress) {
    this.address = newAdress;
    return this;
  }

  getPhone () {
    return this.phone;
  }

  updatePhone (newPhone) {
    this.phone = newPhone;
    return this;
  }

  update (data) {
    for(let key in data){
      if(this.hasOwnProperty(key) && key !== 'id') this[key] = data[key]; 
    }   

    return this;   
  }

  destroy () {
    Client.destroy(this.id);
    return Client.instancesClient;
  }

  addCard (data) {
    data.clientId = this.id;
    new Card(data);

    return this;
  }

  getCards (id){
    return Card.findByClient(this.id);
  }

  get fullName () {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName (newFullName){
    let [lastName, firstName] = newFullName.split(' ');

    this.firstName = firstName;
    this.lastName = lastName;

    return this.FullName;
  }   

}


class Card {
  static instancesСards = [];

  static fetch () {
     return this.instancesСards;
  }

  static find (id) {
    return this.instancesСards.find(client => client.id === id);
  }

  static destroy (id) {
    this.instancesСards = this.instancesСards.filter(client => client.id != id)
    return this;
  }

  static findByClient (clientId) {
    return this.instancesСards.filter(card => card.clientId === clientId)
  }

  constructor (data) {
    this.id = data.id;
    this.number = data.number;
    this.expirationData = data.data;
    this.clientId = data.clientId;
  }

  getNumber () {
    return this.number;
  };

  getClient () {
    return Client.find(this.clientId)
  }

  getExpirationData () {
    return this.expirationData;
  }

  updateExpirationData (newExpirationData) {
    this.expirationData = newExpirationData;
    return this
  }

}


BankDataFactory.addClass('client', Client, 'instancesClient');
BankDataFactory.addClass('card', Card, 'instancesСards');

let incomeDataClients = BankDataFactory.createMany ('client', clients);
let incomeDataCards = BankDataFactory.createMany ('card', cards);

console.log(incomeDataClients);
console.log(incomeDataCards);
