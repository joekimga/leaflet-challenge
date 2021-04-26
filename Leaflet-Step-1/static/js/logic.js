var quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// console.log("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")

var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
    });

// Create our map w/ streetmap and earthquakes layers 
var myMap = L.map("mapid", {
  center: [
    37.09, -95.71
  ],
  zoom:2
});

grayscalemap.addTo(myMap);

d3.json(quakeUrl).then(function(data) {

    //createFeatures(data.features);
    console.log("data:", data);
    function styles(feature) {
      return {
        opacity: 1,
        color: "#FF0000",
        fillColor: circleColor(feature.geometry.coordinates[2]),
        radius: radiusSize(feature.properties.mag),
        fillOpacity: 1,
        weight: 0.5,
        stroke: true
      };
    }

    function circleColor(depth) {
      if (depth > 90) {
        return "tomato"
      }
      else if (depth > 70) {
        return "lightsalmon"
      }
      else if (depth >50) {
        return "orange"
      }
      else if (depth >30) {
        return "gold"
      }
      else if (depth >10) {
        return "yellowgreen"
      }
      else {
        return "lightgreen"
      }
    }
    function radiusSize(magnitude) {
        return magnitude * 5;
      } 
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: styles,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + "Place: " +  feature.properties.place +
        "</h3><hr><p>" + "<br>Time: " + new Date(feature.properties.time) + 
        "<br>Depth :" + feature.geometry.coordinates[2] + 
        "<br>Magnitude: " + feature.properties.mag + "</p>");
      }
    }).addTo(myMap);
    var legend = L.control({position: 'bottomright'});
    
    legend.onAdd = function() {
    
        var div = L.DomUtil.create('div', 'info legend');
        var labels = [-10, 10, 30, 50, 70, 90];
        var colors = ["lightgreen", "yellowgreen", "gold", "orange", "lightsalmon", "tomato"];
            
        for (var i = 0; i < labels.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                labels[i] + (labels[i + 1] ? '&ndash;' + labels[i + 1] + '<br>' : '+');
        }
    
        return div;
    };   
    legend.addTo(myMap);
});




//function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    function radiusSize(magnitude) {
        return magnitude * 15;
      }  

        
  function circleColor(depth) {
    if (depth > 90) {
      return "tomato"
    }
    else if (depth > 70) {
      return "lightsalmon"
    }
    else if (depth >50) {
      return "orange"
    }
    else if (depth >30) {
      return "gold"
    }
    else if (depth >10) {
      return "yellowgreen"
    }
    else {
      return "lightgreen"
    }
  }


