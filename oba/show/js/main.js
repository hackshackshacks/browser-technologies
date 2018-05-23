'use strict';

(function () {
  var app = {
    elements: {
      buildingBtns: document.querySelectorAll('.building'),
      dateBtns: document.querySelectorAll('.date'),
      background: document.querySelector('.background'),
      posters: document.querySelector('.posters')
    },
    flkty: '',
    isFlkty: false,
    init: function init() {
      api.init();
      this.handleEvents();
    },
    handleEvents: function handleEvents() {
      var _this = this;

      this.elements.buildingBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          api.setCurrentBuilding(Number(btn.value));
          _this.elements.buildingBtns.forEach(function (button) {
            button.classList.remove('active');
          });
          btn.classList.add('active');
          api.init();
        });
      });
      this.elements.dateBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          api.currentDate = Number(btn.value);
          _this.elements.dateBtns.forEach(function (button) {
            button.classList.remove('active');
          });
          btn.classList.add('active');
          api.init();
        });
      });
    },
    createPoster: function createPoster(title, date, url, desc) {
      var newTitle = title.replace('' + api.buildings[api.currentBuilding].name, '<span>' + api.buildings[api.currentBuilding].name + '</span>');
      var highres = url.replace('level3', 'level2');
      var el = '\n      <article class="carousel-cell">\n        <div class="poster-text">\n          <h1>' + newTitle + '</h1>\n          <h1>' + date + '</h1>\n        </div>\n        <img src="' + url + '" srcset="' + url + ' 1x, ' + highres + ' 2x" alt="">\n      </article>\n      ';
      return el;
    },
    render: function render(data) {
      var _this2 = this;

      var posters = [];
      data.forEach(function (item) {
        posters += _this2.createPoster(item.title, item.date, item.url);
      });
      if (this.isFlkty) {
        this.flkty.destroy();
      }
      helper.replaceHTML(this.elements.posters, posters);
      var elem = document.querySelector('.main-carousel');
      this.flkty = new Flickity(elem, {
        wrapAround: true
      });
      this.isFlkty = true;
    }
  };
  var api = {
    elements: {
      loader: document.querySelector('#loader-wrapper')
    },
    buildings: [{
      name: 'Paradiso',
      address: 'Weteringschans 6',
      dateRange: [['1968-05-23T10:20:13+05:30', '1972-05-23T10:20:13+05:30'], ['1972-05-23T10:20:13+05:30', '1975-05-23T10:20:13+05:30'], ['1975-05-23T10:20:13+05:30', '1980-05-23T10:20:13+05:30'], ['1980-05-23T10:20:13+05:30', '1990-05-23T10:20:13+05:30'], ['1990-05-23T10:20:13+05:30', '2100-05-23T10:20:13+05:30']]
    }, {
      name: 'Melkweg',
      address: 'Lijnbaansgracht 234A',
      dateRange: [['1968-05-23T10:20:13+05:30', '2017-05-23T10:20:13+05:30'], ['1972-05-23T10:20:13+05:30', '1975-05-23T10:20:13+05:30'], ['1975-05-23T10:20:13+05:30', '1980-05-23T10:20:13+05:30'], ['1980-05-23T10:20:13+05:30', '1990-05-23T10:20:13+05:30'], ['1990-05-23T10:20:13+05:30', '2100-05-23T10:20:13+05:30']]
    }],
    dateRange: [['1970-05-23T10:20:13+05:30', '1980-05-23T10:20:13+05:30'], ['1980-05-23T10:20:13+05:30', '1990-05-23T10:20:13+05:30'], ['1990-05-23T10:20:13+05:30', '2000-05-23T10:20:13+05:30'], ['2000-05-23T10:20:13+05:30', '2100-05-23T10:20:13+05:30']],
    currentBuilding: 0,
    currentDate: 0,
    init: function init() {
      if (window.localStorage.getItem('currentBuilding')) {
        this.currentBuilding = JSON.parse(window.localStorage.getItem('currentBuilding'));
        app.elements.buildingBtns[this.currentBuilding].checked = true;
      } else {
        this.currentBuilding = 0;
        window.localStorage.setItem('currentBuilding', JSON.stringify(0));
      }
      this.handleData();
    },
    setCurrentBuilding: function setCurrentBuilding(number) {
      window.localStorage.setItem('currentBuilding', JSON.stringify(number));
      return number;
    },
    generateUrl: function generateUrl(type, limit) {
      var query = void 0;
      if (type === 'posters') {
        query = '\n          PREFIX dc: <http://purl.org/dc/elements/1.1/>\n          PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n          PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>\n          SELECT ?poster ?title ?img ?date WHERE {\n            ?poster dc:type "Poster."^^xsd:string .\n            ?poster dc:title ?title .\n            ?poster dc:subject "Music."^^xsd:string .\n            ?poster foaf:depiction ?img .\n            FILTER REGEX(?title, "' + this.buildings[this.currentBuilding].name + '") .\n            ?poster sem:hasBeginTimeStamp ?date .\n            FILTER (?date > "' + this.dateRange[this.currentDate][0] + '"^^xsd:dateTime && ?date < "' + this.dateRange[this.currentDate][1] + '"^^xsd:dateTime)\n          }\n          ORDER BY ?date\n        ';
      } else if (type === 'count') {
        query = '\n          PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n          PREFIX dc: <http://purl.org/dc/elements/1.1/>\n          PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>\n          SELECT count(*) as ?count WHERE {\n            ?photo dc:type "foto"^^xsd:string .\n            ?photo dc:title ?title .\n            ?photo foaf:depiction ?img .\n            FILTER REGEX(?title, "' + this.buildings[this.currentBuilding].address + '") .\n            ?photo sem:hasBeginTimeStamp ?date .\n            FILTER (?date > "' + this.buildings[this.currentBuilding].dateRange[this.currentDate][0] + '"^^xsd:dateTime && ?date < "' + this.buildings[this.currentBuilding].dateRange[this.currentDate][1] + '"^^xsd:dateTime)\n          }\n        ';
      } else if (type === 'background') {
        query = '\n          PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n          PREFIX dc: <http://purl.org/dc/elements/1.1/>\n          PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>\n        \n          SELECT ?photo ?title ?img ?date WHERE {\n            ?photo dc:type "foto"^^xsd:string .\n            ?photo dc:title ?title .\n            ?photo foaf:depiction ?img .\n            FILTER REGEX(?title, "' + this.buildings[this.currentBuilding].address + '") .\n            ?photo sem:hasBeginTimeStamp ?date .\n            FILTER (?date > "1968-05-23T10:20:13+05:30"^^xsd:dateTime && ?date < "2017-05-23T10:20:13+05:30"^^xsd:dateTime)\n          }\n          ORDER BY ?date OFFSET ' + limit + ' LIMIT 1\n        ';
      }
      var encodedQuery = encodeURIComponent(query);
      return 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=' + encodedQuery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';
    },
    getData: function getData(url) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onload = function () {
          return resolve(xhr.responseText);
        };
        xhr.onerror = function () {
          return reject(xhr.statusText);
        };
        xhr.send();
      });
    },
    handleData: function handleData() {
      var _this3 = this;

      var loaded = 0;
      var limit = void 0;
      this.getData(this.generateUrl('posters')).then(function (result) {
        var data = JSON.parse(result).results.bindings;
        var usefulData = data.map(function (item) {
          var obj = {
            title: item.title.value,
            date: item.date.value,
            url: item.img.value
          };
          return obj;
        });
        // let anImg = new Image()
        // anImg.src = usefulData[0].url
        // anImg.addEventListener('load', () => {
        //   console.log('loaded')
        // })
        window.localStorage.setItem(_this3.buildings[_this3.currentBuilding].name.toLowerCase() + '_posters', JSON.stringify(usefulData));
        app.render(usefulData);
        loaded++;
        _this3.updateLoader(loaded);
      });
      var newUrl = void 0;
      var randomNum = void 0;
      if (window.localStorage.getItem(this.buildings[this.currentBuilding].name.toLowerCase() + '_count')) {
        limit = JSON.parse(window.localStorage.getItem(this.buildings[this.currentBuilding].name.toLowerCase() + '_count'));
        randomNum = helper.randomize(1, limit) - 1;
        if (window.localStorage.getItem(this.buildings[this.currentBuilding].name.toLowerCase() + '_background-' + this.currentDate + '-' + randomNum)) {
          var url = JSON.parse(window.localStorage.getItem(this.buildings[this.currentBuilding].name.toLowerCase() + '_background-' + this.currentDate + '-' + randomNum));
          app.elements.background.style.backgroundImage = 'url(' + url + ')';
        } else {
          this.getData(this.generateUrl('background', randomNum)).then(function (result) {
            console.log(result);
            var oldUrl = JSON.parse(result).results.bindings[0].img.value;
            newUrl = _this3.storeBackground(oldUrl);
            window.localStorage.setItem(_this3.buildings[_this3.currentBuilding].name.toLowerCase() + '_background-' + _this3.currentDate + '-' + randomNum, JSON.stringify(newUrl));
            app.elements.background.style.backgroundImage = 'url(' + newUrl + ')';
          });
        }
        loaded = loaded + 2;
        this.updateLoader(loaded);
      } else {
        this.getData(this.generateUrl('count')).then(function (result) {
          limit = JSON.parse(result).results.bindings[0].count.value;
          randomNum = helper.randomize(1, limit) - 1;
          window.localStorage.setItem(_this3.buildings[_this3.currentBuilding].name.toLowerCase() + '_count', JSON.stringify(limit));
          loaded++;
          _this3.updateLoader(loaded);
        }).then(function () {
          _this3.getData(_this3.generateUrl('background', helper.randomize(1, limit) - 1)).then(function (result) {
            window.localStorage.setItem(_this3.buildings[_this3.currentBuilding].name.toLowerCase() + '_background-' + _this3.currentDate + '-' + randomNum, JSON.stringify(newUrl));
            loaded++;
            _this3.updateLoader(loaded);
          });
        });
      }
    },
    storeBackground: function storeBackground(data) {
      var splitUrl = data.split('/');
      splitUrl[5] = '1000x1000';
      return splitUrl.join('/');
    },
    updateLoader: function updateLoader(loaded) {
      if (loaded !== 3) {
        document.querySelector('.main-carousel').classList.remove('show');
      } else if (loaded === 3) {
        this.elements.loader.classList.add('hidden');
        document.querySelector('.main-carousel').classList.add('show');
      }
    }
  };
  var helper = {
    randomize: function randomize(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min); // number between min and max
    },
    emptyElement: function emptyElement(element) {
      // empty an html element
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
    replaceHTML: function replaceHTML(element, string) {
      // empty html and insert new value
      this.emptyElement(element);
      element.insertAdjacentHTML('beforeend', string);
    },
    checkImg: function checkImg(imageUrl, callBack) {
      var imageData = new Image();
      imageData.onload = function () {
        callBack(true);
      };
      imageData.onerror = function (e) {
        e.preventDefault();
        callBack(false);
      };
      imageData.src = imageUrl;
    }
  };
  app.init();
})();