// creation of a map with openstreetmap tile added, in the 'map' div.
var map = L.map('map', {
    'center': [12.378451, -1.503345],
    'zoom': 3,
    'layers': [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
      })
    ]
  });

// creation of layer, that is added to the map
var controlLayers = L.control.layers().addTo(map);

// importation of wascal countries geo data (because we use it two)
var url = '../data/wascal_countries.geo.json';

//creation of fill wascal countries layer
$.getJSON(url, function (geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function (feature) {
      return {
        'weight': 0,
        'fillColor': 'orange',
        'fillOpacity': 1
      }
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, 'fill Wascal countries');
});

//creation of wascal countries borders layer
$.getJSON(url, function (geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function (feature) {
      return {
        'weight': 1,
        'color': 'red',
        'fillOpacity': 0
      }
    },
    onEachFeature: function (feature, layer) {
      layer.on('click', layerClickHandler);
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, 'wascal countries borders');
});


//creation of wascal offices layer
$.getJSON('../data/wascal_offices.geojson', function (geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function (feature) {
      return {
        'weight': 1,
        'color': 'red',
        'fillOpacity': 0
      }
    },
    onEachFeature: function (feature, layer) {
      layer.on('click', layerClickHandler);
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, 'wascal Offices');
});

//creation of wascal gsp layer
$.getJSON('../data/wascal_gsp.geojson', function (geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function (feature) {
      return {
        'weight': 1,
        'color': 'red',
        'fillOpacity': 0
      }
    },
    onEachFeature: function (feature, layer) {
      layer.on('click', layerClickHandler);
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, 'wascal GSP');
});

// layerClickHandler function
function layerClickHandler (e) {

  var marker = e.target;
      properties = e.target.feature.properties;
  
  if (marker.hasOwnProperty('_popup')) {
    marker.unbindPopup();
  }

  marker.bindPopup(generate_form(marker.feature));
  marker.openPopup();

}

//generate_form function
function generate_form (feature){
  
  var tpl ='<font size="3.5" face="Times New Roman" >\
            <div class="p-3 mb-2 bg-light text-dark">\
            <table class="table table-bordered table-hover table-sm" >\
            <tbody>';
  var keys=Object.keys(feature.properties);
  
  keys.forEach(k => {
    tpl += generate_form_row(k,feature.properties[k]);
  });
  tpl += '</tbody>\
          </table>\
          </div>\
          </font>';
  return tpl;
}

// generate_form_row function
function generate_form_row(lbl,dta){

    var rw = '<tr>' +
             '<th scope="row">' +lbl+ '</th>' +
             '<td>' +dta+ '</td>' +
             '</tr>';
  return rw;
}
