//Задание 1
function sendXHR (xhr, method, body) {
  if (method === 'GET') {
    xhr.send();
  }
  else if (method === 'POST') {
    xhr.send(body);
  }
}

function getXhrResponse (resolve, reject, xhr) {
  if (xhr.status != 200) {
    reject(xhr.status);
  }
  else {
    resolve(xhr.response);
  }
}

function myFetch (url, options = {}) {
  let xhr = new XMLHttpRequest(),
      method = options.method || 'GET',
      body = options.body || null;

  xhr.open(method, url);
  sendXHR (xhr, method, body);

  return new Promise ((resolve, reject) => {
    xhr.addEventListener('load', getXhrResponse.bind(this, resolve, reject, xhr));
  });
}

//Задание 2 функции
function getAlbums (url, n) {
  return myFetch (url)
    .then((res) => {;
      return new Promise ((resolve, reject) => {
        try {
          let arr = JSON.parse(res).filter((el) => el.id <= n);

          resolve(arr);
        }
        catch (error) {
          reject(error)
        }
      });
    });
}

function getFotos (url, albumId) {
  url = `${url}?albumId=${albumId}`;
  return myFetch (url)
}

function parsePhotos (photosArr) {

  return photosArr.map((el) => {
      el = JSON.parse(el);

      return el.map((photoObj) => {

        return {
          title: photoObj.title,
          url: photoObj.url,
          thumbnailUrl: photoObj.url
        };

      });

    });
}

//Задание 2 обработка альбомов
getAlbums('https://jsonplaceholder.typicode.com/albums', 3)
  .then((albumArr) => {
    let arrPomisesPhoto = albumArr.map((el) => {
          return  getFotos ('https://jsonplaceholder.typicode.com/photos', el.id); 
        });

    return  Promise.all(arrPomisesPhoto).then((results) => { return {albums : albumArr, photos: results} });
  })
  .then((res) => {
    let photos = parsePhotos(res.photos);

    let albums = res.albums.map((el, i) => {    
      return {
          title: el.title,
          photos: photos[i]
        };
    });

    return albums;
  })
  .then((albums) => {
    console.log(albums);
  }) 
