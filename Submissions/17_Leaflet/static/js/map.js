$(document).ready(function() {
    let fullURL = $('#timeFilter').val();
    makeMap(fullURL, -2);

    //Listeners for dropdowns
    $("#timeFilter, #magFilter").change(function() {
        let fullURL = $('#timeFilter').val();
        let minMag = $('#magFilter').val();
        let vizText = $("#timeFilter option:selected").text();
        $('#vizTitle').text(`Earthquakes in the ${vizText}`);
        makeMap(fullURL, minMag);
    });
});



function makeMap(fullURL, minMag) {
    //clear map
    $('#mapParent').empty();
    $('#mapParent').append('<div style="height:700px" id="map"></div>');

    // Adding tile layer to the map
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-streets-v11",
        accessToken: API_KEY
    });

    //Load in quake data
    d3.json(fullURL).then(function(response) {

        //create variables for markers, heatmap, and circles
        var markers = L.markerClusterGroup();
        var heatArray = [];
        var quakedata = response.features
        var circles = [];

        // Loop through each quake
        quakedata.forEach(function(d) {
            if ((d.geometry.coordinates[1]) && (d.geometry.coordinates[0])) {
                if (d.properties.mag >= minMag) {


                    //Add marker to cluster
                    let temp = L.marker([+d.geometry.coordinates[1], +d.geometry.coordinates[0]]).bindPopup(`<h4>${d.properties.place.toUpperCase()}</h4><hr><h5>Magnitude: ${d.properties.mag}  |  Depth: ${d.geometry.coordinates[2]} KM</h5><hr><h6>Time: ${new Date(d.properties.time)}</h6><hr><h6><a href="${d.properties.url}" target="_blank">More Info</a></h6>`);
                    markers.addLayer(temp);

                    //Add coords to heatmap
                    heatArray.push([+d.geometry.coordinates[1], +d.geometry.coordinates[0]]);

                    //Add circle w/ coords and popup
                    let circle = L.circleMarker([+d.geometry.coordinates[1], +d.geometry.coordinates[0]], {
                        fillOpacity: 0.8,
                        color: "white",
                        weight: 1,
                        fillColor: getCircleColor(d.geometry.coordinates[2]),
                        radius: getMarkerSize(d.properties.mag)
                    }).bindPopup(`<h4>${d.properties.place.toUpperCase()}</h4><hr><h5>Magnitude: ${d.properties.mag}  |  Depth: ${d.geometry.coordinates[2]} KM</h5><hr><h6>Time: ${new Date(d.properties.time)}</h6><hr><h6><a href="${d.properties.url}" target="_blank">More Info</a></h6>`);
                    circles.push(circle);

                }
            }
        });

        //read in second plate data
        var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
        d3.json(tectonicPlatesURL).then(function(plates) {
            var plateLayer = L.geoJson(plates, {
                // Style each feature (in this case a tectonic plate)
                style: function(feature) {
                    return {
                        color: "purple",
                        weight: 2
                    };
                }
            });



            //create heatmap layer. Add max zoom to show intensity when zoomed out
            var heat = L.heatLayer(heatArray, {
                radius: 40,
                blur: 10,
                maxZoom: 15,
            });

            //Add circles to layer
            var circleLayer = L.layerGroup(circles);


            // Create a baseMaps object to contain the map styles
            var baseMaps = {
                "Street": streetmap,
                "Dark": darkmap,
                "Light": lightmap,
                "Satellite": satellitemap
            };

            // Create an overlayMaps object to contain different layers
            var overlayMaps = {
                "Heatmap": heat,
                "Markers": markers,
                "Magnitude & Depth Map": circleLayer,
                "Tectonic Plates": plateLayer
            };

            // Creating map object with initial layers
            var myMap = L.map("map", {
                center: [0, 0],
                zoom: 3,
                layers: [satellitemap, plateLayer]
            });

            // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
            myMap.addLayer(markers);
            L.control.layers(baseMaps, overlayMaps).addTo(myMap);

            // Create a depth legend
            var depthlegend = L.control({ position: 'bottomleft' });
            depthlegend.onAdd = function() {
                var div = L.DomUtil.create("div", "info legend");

                //create HTML for legend (has to be i tags)
                div.innerHTML += "<h4>Depth(KM)</h4>";
                div.innerHTML += '<i style="background: red"></i><span>Shallow (< 70)</span><br>';
                div.innerHTML += '<i style="background: yellow"></i><span>Intermediate(70-300)</span><br>';
                div.innerHTML += '<i style="background: green"></i><span>Deep (> 300)</span><br>';


                return div
            }
            depthlegend.addTo(myMap);

            // Create a depth legend
            var maglegend = L.control({ position: 'bottomleft' });
            maglegend.onAdd = function() {
                var div = L.DomUtil.create("div", "info maglegend");

                //create HTML for legend (has to be i tags)
                div.innerHTML += "<h4>Magnitude</h4>";
                div.innerHTML += '<i style="width: 10px; height: 10px"></i><span>Magnitude of 1</span><br>';
                div.innerHTML += '<i style="width: 20px; height: 20px"></i><span>Magnitude of 3</span><br>';
                div.innerHTML += '<i style="width: 27px; height: 27px"></i><span>Magnitude of 5</span><br>';


                return div
            }
            maglegend.addTo(myMap);
        });
    });
}

//Functions for circle colors and radius

// Set radius to magnitude. Add 3 to eliminate negative values and keep same scale.
function getMarkerSize(mag) {
    let radius = 0;
    if ((mag + 2) > 0) {
        radius = (mag + 2) * 2;
    }
    return radius;
}

//set color to depth
function getCircleColor(depth) {
    let color = "";
    if (depth > 300) {
        color = "green";
    } else if (depth > 70) {
        color = "yellow";

    } else {
        color = "red";
    }

    return color;
}