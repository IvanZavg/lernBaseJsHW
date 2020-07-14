let clients = [
    {
      id: 0,
      firstName: 'FirstName1',
      lastName: 'LastName1',
      address: 'address1',
      phone: 'phone1'
    }, {
      id: 1,
      firstName: 'FirstName2',
      lastName: 'LastName2',
      address: 'address2',
      phone: 'phone2'
    }, {
      id: 2,
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

class Client  {

  static clientsDataList = clients; //сохранение входных данных в поле класса

  //Решил попробовать реализовать возможность возвращать из методов (таких как fetch и find) ссылки на экземпляры классов а не создавать новые
  //для этого решил создать массив с экземпляроами класса
  static instancesClient = (function () { //инициализация массива экземпляров класса на основе входных данных
      let instClientArr = [];

      Client.clientsDataList.forEach((clientObj,index) => {
        instClientArr.push(new Client(clientObj, true)); //создание массива экземпляров класса на основе входных данных
      });

      return instClientArr;
  })();

  static destroy (id) {
    for(let i = 0; i < Client.clientsDataList.length; i++){ //перебираю массив объектов
      if(Client.clientsDataList[i]['id'] === id) { //нахожу нужный объект по соответствию id
        Client.clientsDataList.splice(i,1);  //удаляю из массива объектов
        Client.instancesClient.splice(i,1);  //удаляю из массива экземпляров класса
        break;     
      }
    }
    return Client.instancesClient;
  }

  static create (data) {
  //решил добавить возможность создавать сразу множество объектов      
    if(Array.isArray(data)){
      let clientsArr = [];

      data.forEach(clientObj => {
        clientsArr.push(new Client(clientObj));
      });

      return clientsArr;
    }

    return new Client(data);
  }

  static fetch (data) {
   return Client.instancesClient; //просто возвращает массив с экземплярами класса
  }

  static find (id) {
    for(let i = 0; i < Client.instancesClient.length; i++){ //перебираю массив объектов экземпляров класса
      if(Client.instancesClient[i]['id'] === id) { //нахожу нужный экземпляр по соответствию id
        return Client.instancesClient[i]; 
      }
    }
  }

  constructor (data, itIsInit = false) {
    this.id =  data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.address = data.address;
    this.phone = data.phone;

    if (!itIsInit) { //проверка условия чтобы при инициализации не дублировать запись в clientsDataList
      Client.clientsDataList.push(data);
      Client.instancesClient.push(this);  
    }      
  };

  getFirstName () {
    return this.firstName; 
  }

  updateFirstName (newName) {
    return this.firstName = newName;
  }

  getLastName () {
    return this.lastName;
  }

  updateLastName (newLastName) {
    return this.lastName = newLastName;
  }

  getAddress () {
    return this.address;
  }

  updateAddress (newAdress) {
    return this.address = newAdress;
  }

  getPhone () {
    return this.phone;
  }

  updatePhone (newPhone) {
    return this.phone = newPhone;
  }

  update (data) {
    let thisKeys = Object.keys(this), //получаю ключи тек объекта для дальнейшего обновления clientsDataList
        thisId = this.id, //получаю id текущего объекта чтобы потом найти нужный объект в clientsDataList
        objUpdClientsList = {}; //создаю пустой объект, который заполню с учетом новых значений и им заменю объект в clientsDataList

    for(let key in data){
      if(this.hasOwnProperty(key) && key !== 'id') this[key] = data[key]; //меняю свойства на основе переданых данных   
    }   

    thisKeys.forEach((el) => {
      objUpdClientsList[el] = this[el];  //наполняю objUpdClientsList обновленными свойствами
    });
  
    for(let i = 0; i < Client.clientsDataList.length; i++){
      if(Client.clientsDataList[i]['id'] === thisId) {
        Client.clientsDataList[i] = objUpdClientsList; //заменяю объект в clientsDataList
        break;    
      }
    }

    return this;   
  }

  destroy () {
    Client.destroy(this.id);
    return Client.clientsDataList;
  }

  addCard (data) {
    data.clientId = this.id;
    return new Card(data);
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

  static cardsDataList = cards; 
  static instancesСards = (function () { 
      let instСardArr = [];

      Card.cardsDataList.forEach((cardObj,index) => {
        instСardArr.push(new Card(cardObj, true)); 
      });

      return instСardArr;
  })();

  static fetch () {
     return Card.instancesСards;
  }

  static find (id) {
    for(let i = 0; i < Card.instancesСards.length; i++) { //перебираю массив объектов экземпляров класса
      if(Card.instancesСards[i]['id'] === id) { //нахожу нужный экземпляр по соответствию id
        return Card.instancesСards[i]; 
      }
    }
  }

  static destroy (id) {
    for(let i = 0; i < Card.cardsDataList.length; i++){ //перебираю массив объектов
      if(Card.cardsDataList[i]['id'] === id) { //нахожу нужный объект по соответствию id
        Card.cardsDataList.splice(i,1);  //удаляю из массива объектов
        Card.instancesСards.splice(i,1);  //удаляю из массива экземпляров класса
        break;     
      }
    }
    return Card.instancesСards;
  }

  static findByClient (clientId) {
    let cardsArr = [];

    for(let i = 0; i < Card.instancesСards.length; i++) {
      if(Card.instancesСards[i]['clientId'] === clientId) cardsArr.push(Card.instancesСards[i]);
    }

    return cardsArr;
  }

  constructor (data, itIsInit = false) {
    this.id = data.id;
    this.number = data.number;
    this.expirationData = data.data;
    this.clientId = data.clientId;

     if (!itIsInit) { //проверка условия чтобы при инициализации не дублировать запись в clientsDataList
      Card.cardsDataList.push(data);
      Card.instancesСards.push(this);  
    }
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
    return this.expirationData = newExpirationData;
  }
}



//Проверка Client
/*
console.log(Client.instancesClient) //instances arr Array(3) [ {…}, {…}, {…} ]
let testClient = new Client({
                            id: 4,
                            firstName: 'Vasy',
                            lastName: 'Vaskin',
                            address: 'Vasilivska 1',
                            phone: '08311111111111'
                          });
console.log(Client.instancesClient);                  //instances arr Array(4) [ {…}, {…}, {…}, {…} ]
console.log(testClient.updateFirstName('Olyosha'));   //Olyosha
console.log(testClient.getFirstName());               //Olyosha
console.log(testClient.updateLastName('Olyoshkin'));  //Olyoshkin
console.log(testClient.getLastName());                //Olyoshkin
console.log(testClient.fullName);                     //Olyoshkin Olyosha
console.log(testClient.fullName = 'Petrov Pety');     //Petrov Pety
console.log(testClient.getAddress());                 //Vasilivska 1
console.log(testClient.updateAddress('Green street'));//Green street
console.log(testClient.getPhone());                   //08311111111111
console.log(testClient.updatePhone('111111111111'));  //111111111111

console.log(testClient.update({  
                              firstName: 'Test',
                              lastName: 'Test',
                              test: 'test'
                            }));      // Object { id: 4, firstName: "Test", lastName: "Test", ...}
console.log(Client.instancesClient);  //(4) […] ... { id: 4, firstName: "Test", lastName: "Test", … }
console.log(testClient.destroy());    //Array(3) [ {…}, {…}, {…} ]

console.log(Client.instancesClient[0].getCards()); //Array(3) ... 1: Object { id: 1, number: "0001", expirationData: 1493034301601, … } ...
console.log(Client.instancesClient[0].addCard({
                                                  id: 5,
                                                  number: '1009',
                                                  data: 1000000000001
                                                }));
console.log(Client.instancesClient[0].getCards()); //Array(4) ... 3: Object { id: 5, number: "1009", expirationData: 1000000000001, … }
*/

//Client Class methods
/*
console.log(Client.fetch());    //Array(3) [ {…}, {…}, {…} ]
console.log(Client.find(0));    //{ id: 0, firstName: "FirstName1", lastName: "LastName1", address: "address1", phone: "phone1" }
console.log(Client.destroy(1)); // Array [ {…}, {…} ]
console.log(Client.create({
                            id: 5,
                            firstName: 'Vasy',
                            lastName: 'Vaskin',
                            address: 'Vasilivska 1',
                            phone: '08311111111111'
                          }));       //{ id: 5, firstName: "Vasy", lastName: "Vaskin", address: "Vasilivska 1", phone: "08311111111111" }
console.log(Client.instancesClient); //Array(3) [ {…}, {…}, {…} ]
*/

//Проверка Card
/*
console.log(Card.instancesСards); // Array(4) [ {…}, {…}, {…}, {…} ]
let testCard = new Card({
                            id: 5,
                            clientId: 1,
                            number: '1009',
                            data: 1000000000001
                          });
console.log(Card.instancesСards);   // Array(5) ... 4: Object { id: 5, number: "1009", expirationData: 1000000000001, … }
console.log(testCard.getNumber());  // 1009
console.log(testCard.getClient());  //Object { id: 1, firstName: "FirstName2", lastName: "LastName2", ...}
console.log(testCard.updateExpirationData(20000000000002)); // 20000000000002
console.log(testCard.getExpirationData(20000000000002));    // 20000000000002
*/

//Client Class methods
/*
console.log(Card.fetch());   // Array(4) [ {…}, {…}, {…}, {…} ]
console.log(Card.find(0));   // Object { id: 0, number: "0000", expirationData: 1493034361601, clientId: 0 }
console.log(Card.destroy(1));      // Array(3) [ {…}, {…}, {…} ]
console.log(Card.findByClient(1)); // 0: Object { id: 3, number: "1001", expirationData: 1493034101601, … }
*/