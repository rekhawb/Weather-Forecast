

//var eleContainer = document.getElementById("displayResults");
var fetchButton = document.getElementById("search");
var eleContainer1 = document.getElementById("displayResults2");
var mapContainer = document.getElementById("Map");
//var srchContainer = document.getElementById("srchCard");
var btnSrch = document.getElementById("btn");

function init(){

  document.getElementById("srchCity").value= 'Atlanta';
  getApi();
}


function getApi() {
  

 // eleContainer.innerHTML = "";
  eleContainer1.innerHTML = "";
  mapContainer.innerHTML="";
  document.getElementById('Map').innerHTML = "<div id='demoMap' ></div>";
  //pull city from the search box
  var paramCity = document.getElementById("srchCity").value.trim();
  //insert the city to search into the url and contruct the url
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${paramCity}&units=imperial&appid=f507df7a1f6e477124070c1e676d907b`;

  //searchResultsArr = [];
  //set local storage item to store searches. if we donot have the first search yet, insert a random city

  if (localStorage.getItem("Search Terms") === null) {
    localStorage.setItem("Search Terms", "Macon");
  } else {
  }

  var searchHistory = localStorage.getItem("Search Terms").split(",");
  //srchContainer.innerHTML = "";
  for (i = 0; i <  searchHistory.length ; i++) {
    htmlCreate = ` <div style="background-color:#A9A9A9; font-size:2rem;border-radius:5px;text-align:center;height:100%;padding:5px;margin:5px">
   <button id="btn" style="width:100%; padding:5px; margin:5px; background-color:#A9A9A9;border:none;height:60% ">${searchHistory[i]}</button>
   </div>`;

   // srchContainer.innerHTML = srchContainer.innerHTML + htmlCreate;
  }

  //pull lat and lon co ordinates for the search city

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var resultsDt = new Date(Date.now()).toLocaleDateString("en-US");

      var resultsCity = data.name;

      var resultsLat = data.coord.lat;
      var resultsLon = data.coord.lon;

      var htmlCreate = "";

      //pass the lat lon co ordinates to the getForecast
      

      getForecast(resultsLat, resultsLon, resultsCity, resultsDt);
    });
}

function getForecast(resultsLat, resultsLon, resultsCity, resultsDt) {
  requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${resultsLat}&lon=${resultsLon}&units=imperial&exclude=hourly,minutely,alerts&appid=f507df7a1f6e477124070c1e676d907b`;
  var htmlCreate = "";

  //if resultsCity is blank or city name is not valid, donot  store in the search history

  if (resultsCity === "") {
  } else {
    var localstr = localStorage.getItem("Search Terms");
    if (localstr.includes(resultsCity)) {
    } else {
      localStorage.setItem(
        "Search Terms",
        localStorage.getItem("Search Terms") + "," + resultsCity
      );
    }
  }

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var resultsCur = data.current;

      resultsCity = resultsCity + "  (" + resultsDt + ")";
      var resultsTemp = resultsCur.temp + " <span>&#176;</span>F";
      var resultsHmdty = resultsCur.humidity + " %";
      var resultsWind = resultsCur.wind_speed + " MPH";
      var resultsUvi = resultsCur.uvi;

      var resultsIcn = resultsCur.weather[0].icon;

      // pull the icon to show weather icon on page

      var imgURL = `http://openweathermap.org/img/w/${resultsIcn}.png`;
/*
      htmlCreate = ` <div class="col-sm-6 resultsCard1" style= "border: solid 1px black">
      <h4>${resultsCity} <img src ='http://openweathermap.org/img/w/${resultsIcn}.png'/></h4>
       <p>Temp:  ${resultsTemp}</p>
       <p>Wind: ${resultsWind}</p>
       <p>Humidity: ${resultsHmdty}</p>
       <p>UV Index: <span id="colorUV">${resultsUvi}</span></p>
       </div>
       `; //+ htmlCreate;*/


       var htmlCreate = `<div class="table-responsive">
       <table class="table table-success table-striped table-sm">
       <thead>
         <tr>
           <th scope="col">Date</th>
           <th scope="col">Forecast</th>
           <th scope="col">Temp</th>
           <th scope="col">Wind</th>
           <th scope="col">Humidity</th>
           <th scope="col">UV Index</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <th scope="row"> ${resultsDt}</th>
           <td><img src ='http://openweathermap.org/img/w/${resultsIcn}.png'/></td>
           <td>${resultsTemp}</td>
           <td> ${resultsWind}</td>
           <td> ${resultsHmdty}</td>
          <td id="colorUV" style = "color:white">${resultsUvi}</td>
         </tr>
         
     </tbody>
     </table>
     </div>`

       /*
       var htmlCreate_row= `
        <div class="col-sm resultsCard1" style= "border: solid 1px black; background-color:rgb(0, 0, 128);">
       <h6 style="color:white">${resultsCity} </h6>
       </div>
       <div class="col-sm resultsCard1" style= "border: solid 1px black">
      <img src ='http://openweathermap.org/img/w/${resultsIcn}.png'/>
       </div>
       <div class="col-sm resultsCard1" style= "border: solid 1px black">
        <p>Temp:  ${resultsTemp}</p>
        </div>
        <div class="col-sm resultsCard1" style= "border: solid 1px black">
        <p>Wind: ${resultsWind}</p>
        </div>
        <div class="col-sm resultsCard1" style= "border: solid 1px black">
        
        <p>Humidity: ${resultsHmdty}</span></p>
        
        </div>
        </div>
        `; //+ htmlCreate;<img src ='http://openweathermap.org/img/w/${resultsIcn}.png'/>

/*

        <div class="col-sm resultsCard1" style= "border: solid 1px black">
        
        <p>UV Index: <span id="colorUV">${resultsUvi}</span></p>
        
        </div>
htmlCreate = `<div class="container">
<div class="row" >
  <div class="col">col</div>
  <div class="col">col</div>
  <div class="w-100"></div>
  <div class="col">col</div>
  <div class="col">col</div>
</div>
</div>`;


      var htmlCreate1 = ` <div class="col-sm-6" >
      <h3 style="font-weight:10px; text-align:right">5 Day Forecast:</h3>
      </div>`*/
     
    var map = L.map('demoMap').setView({lon: resultsLon, lat: resultsLat}, 2);

      // add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        maxNativeZoom: 19
        //attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(map);

      // show the scale bar on the lower left corner
      L.control.scale({imperial: true, metric: true}).addTo(map);

      // show a marker on the map
      L.marker({lon: resultsLon, lat: resultsLat}).addTo(map)//.bindPopup('The center of the world').openPopup();
      let popup = L.popup().setLatLng([resultsLat,resultsLon]).setContent( htmlCreate).openOn(map);
     // L.bindPopup(popup,{width:500  }),openOn(map);
      map.flyTo([resultsLat, resultsLon], 9, {
        animate: true,
        duration: 1
});


var colorUvIndex = document.getElementById('colorUV').textContent;
  colorUvIndex = colorUvIndex.substring(10,);
   //https://stackoverflow.com/questions/64529695/openlayers-6-add-maker-labels-or-text

    if(colorUvIndex <3){
      document.getElementById('colorUV').style.backgroundColor= 'green';
    }else  if(colorUvIndex >=3 && colorUvIndex < 6 ){
      document.getElementById('colorUV').style.backgroundColor= 'yellow';
    }else  if(colorUvIndex >=6 && colorUvIndex < 8 ){
      document.getElementById('colorUV').style.backgroundColor= 'orange';
    }else  if(colorUvIndex >=8 && colorUvIndex <11 ){
      document.getElementById('colorUV').style.backgroundColor= 'red';
    }

    document.getElementById('demoMap').style.border='thick solid #1e698d';

      htmlCreate = "";

      // show 5 day forecast

      var resultsDaily = data.daily;
      // console.log(resultsDaily);
      resultsDt = new Date();

      for (i = 0; i < resultsDaily.length - 2; i++) {
        resultsDt = new Date();
        resultsDt.setDate(resultsDt.getDate() + (i+1));
        resultsDt = resultsDt.toLocaleDateString("en-us");//toISOString().substring(0, 10);<p>Temp:  ${resultsTemp}</p>   col-sm-1 col-md-3 
        var resultsTemp = resultsDaily[i].temp.day + " <span>&#176;</span>F";
        var resultsHmdty = resultsDaily[i].humidity + " %";
        var resultsWind = resultsDaily[i].wind_speed + " MPH";

        var resultsIcon = resultsDaily[i].weather[0].icon;

        htmlCreate = ` 
        <div class="col-sm-12 col-md-5 resultsCard  text-white"> 
        <p style="font-size:2rem; background-color:white;color:#1e698d">${resultsDt}<p>
      <img src ='http://openweathermap.org/img/w/${resultsIcon}.png'/>
       <p>Temp:  ${resultsTemp}</p>
       <p>Wind: ${resultsWind}</p>
       <p>Humidity: ${resultsHmdty}</p>
       </div>  
       `; //+ htmlCreate;

        eleContainer1.innerHTML = eleContainer1.innerHTML + htmlCreate;
      }

      

    });


   

}

fetchButton.addEventListener("click", getApi);

// add an event listener on document. check if its a btn ID, if it is, pull the city name and pass it to the search city. And display results for the city selected from the search history

document.addEventListener("click", function (event) {
  var btnID = event.target.id;
  if (btnID === "btn") {
    // alert(event.target.innerHTML);
    document.getElementById("srchCity").value = event.target.innerHTML;
    getApi();
  }
});

//init();






      /*L.control.scale().addTo(map);
      setInterval(function(){
        map.flyTo(center, zoom);
        setTimeout(function(){
            map.setView([200, 0]);
        }, 2000);
    }, 4000);*/
/*
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([resultsLon, resultsLat])),
      name: resultsCity + 'http://openweathermap.org/img/w/'+resultsIcn+'.png',
    });

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src:'http://openweathermap.org/img/w/'+resultsIcn+'.png',
        scale: 0.1
      })
    
    });
    var labelStyle = new ol.style.Style({
      text: new ol.style.Text({
        font: '18px Calibri,sans-serif',
        overflow: true,
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 128, 25)'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
        // color: 'rgba(0, 0, 0, 25)',
          width: 3
        }),
        offsetY: -12
      })
    });
    var style = [ labelStyle];


    var map = new ol.Map({
      target: 'demoMap',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [iconFeature]
          }),
          style: new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [1.0, 70],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
             // src: 'https://openlayers.org/en/latest/examples/data/icon.png'
             src:'http://openweathermap.org/img/w/'+resultsIcn+'.png'
            }),
          
        }),/* add text style here 
        style: function(feature) {
         labelStyle.getText().setText(feature.get('name'));
          return style;
        }
     
    }),
      
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([resultsLon, resultsLat]),
        zoom: 6
      })
    });

*/





      //eleContainer.innerHTML = htmlCreate+htmlCreate1;

    //var colorUvIndex = document.getElementById('colorUV').textContent;
    //colorUvIndex = colorUvIndex.substring(10,);
    //https://stackoverflow.com/questions/64529695/openlayers-6-add-maker-labels-or-text
/*
    if(colorUvIndex <3){
      document.getElementById('colorUV').style.backgroundColor= 'green';
    }else  if(colorUvIndex >=3 && colorUvIndex < 6 ){
      document.getElementById('colorUV').style.backgroundColor= 'yellow';
    }else  if(colorUvIndex >=6 && colorUvIndex < 8 ){
      document.getElementById('colorUV').style.backgroundColor= 'orange';
    }else  if(colorUvIndex >=8 && colorUvIndex <11 ){
      document.getElementById('colorUV').style.backgroundColor= 'red';
    }
*/