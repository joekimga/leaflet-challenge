var quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

console.log("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")

d3.json(quakeUrl, function(data) {

    createFeatures(data.features);
    console.log(data);
});

function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    function radiusSize(magnitude) {
        return magnitude * 20000;
      }  

        
  function circleColor(magnitude) {
    if (magnitude < 1) {
      return "lightgreen"
    }
    else if (magnitude < 2) {
      return "yellowgreen"
    }
    else if (magnitude < 3) {
      return "gold"
    }
    else if (magnitude < 4) {
      return "orange"
    }
    else if (magnitude < 5) {
      return "lightsalmon"
    }
    else {
      return "tomato"
    }
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(earthquakeData, latlng) {
      return L.circle(latlng, {
        radius: radiusSize(earthquakeData.properties.mag),
        color: circleColor(earthquakeData.properties.mag),
        fillOpacity: 1
      });
    },
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {


    var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.outdoors",
      accessToken: API_KEY
    });
  
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });
  
    var grayscalemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    // Faultline layer
    var faultLine = new L.LayerGroup();
    
    // baseMaps object to hold our base layers
    var baseMaps = {
      "Outdoor Map": outdoorsmap,
      "Greyscale Map": grayscalemap,
      "Satellite Map": satellitemap
    };
  
    // overlay object to hold overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes,
      FaultLines: faultLine
    };
  
    // Create our map w/ streetmap and earthquakes layers 
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 4,
      layers: [outdoorsmap, earthquakes, faultLine]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
    // Query to retrieve faultline data
    var faultlinequery = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
    
    // Create faultlines and add them to faultline layer
    d3.json(faultlinequery, function(data) {
      L.geoJSON(data, {
        style: function() {
          return {color: "orange", fillOpacity: 0}
        }
      }).addTo(faultLine)
    })
  
    // color function 
    function getColor(c) {
      return c > 5 ? '#ff3333' :
             c > 4  ? '#ff6633' :
             c > 3  ? '#ff9933' :
             c > 2  ? '#ffcc33' :
             c > 1  ? '#ffff33' :
                      '#ccff33';
    }
  
  // Add legend to map
    var legend = L.control({position: 'bottomright'});
    
    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend'),
            mags = [0, 1, 2, 3, 4, 5],
            labels = [];
  
            
        for (var i = 0; i < mags.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
                mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    legend.addTo(myMap);
  }
      