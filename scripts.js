function getQueryVariableGET(variable) {
    // Estoy asumiendo que query es window.location.search.substring(1);
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
};

var lang = getQueryVariableGET('lang');
if (lang == "es") {
    var language = 0;
} else if (lang == "en") {
    var language = 1;
} else {
    if (main_items.main_language == "english") {
        var language = 1;
    } else if (main_items.main_language == "spanish") {
        var language = 0;
    }
}

mapboxgl.accessToken = 'pk.eyJ1IjoiaGNhc3RlbGxhcm8iLCJhIjoiY2lrazJvZHFrMDl1eXYwa202Z2Njczk1eiJ9.fIBpy-XcIN0kKSuIx6oReA';

var map_style = main_items.map.style;
var map_center = main_items.map.center;
var map_zoom = main_items.map.zoom;
var lang = main_items.main_language;
var country = main_items.country[language];
var event = main_items.event[language];
var title = main_items.title[language];
var description = main_items.description[language];
var report = main_items.report[language];

//var indicator = getQueryVariableGET('indicator_id');


var map = new mapboxgl.Map({
    container: 'map', // container id
    style: map_style, // stylesheet location
    center: map_center, // starting position [lng, lat]
    zoom: map_zoom // starting zoom
});

layers_array = [];

map.on('load', function() {
    var load_layer = function load_layer(x, y) {
        map.addSource('source_' + x, {
            'type': 'raster',
            'tiles': [
                'https://geoportal.cepal.org/geoserver/ows?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=' + y,
            ],
            'tileSize': 256
        });
        var content_layer = {
            'id': 'layer_' + x,
            type: "raster",
            'source': 'source_' + x,
            'layout': {
                visibility: 'visible',
            },
            paint: {}
        };
        map.addLayer(content_layer);
    }
    layer_switcher = function layer_switcher(x, y) {
        var layer_name = y
        var layer_position = layers_array.indexOf(x);
        if (language == 0) { var language_code = 'ES' } else { var language_cod = 'EN' }
        if (layer_position == -1) {
            var image_url = 'https://geoportal.cepal.org/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer_name + '&STYLE=' + layer_name + '&legend_options=fontAntiAliasing:true;fontSize:12;forceLabels:on&LANGUAGE=' + language_code;
            $('#layer_body_' + x).append('<div class="row w-100 layer_legend" id="legend_' + x + '" style="display:none;"><img src="' + image_url + '"></div>');
            load_layer(x, y);
            layers_array.push(x);
        } else {
            var visibility = map.getLayoutProperty('layer_' + x, 'visibility');
            if (visibility == 'visible') {
                map.setLayoutProperty('layer_' + x, 'visibility', 'none');
            } else {
                map.setLayoutProperty('layer_' + x, 'visibility', 'visible');
            }

        }
        $('#legend_' + x).toggle();

    };
});

load_page = function load_page() {
    $("#title").html(title);
    $("#country").html(country);
    $("#event").html(event);
    $("#description").html(description);
    $("#report").html(report);
    $.each(categories, function(i) {
        $("#toc").append('<div class="row header-category" data-toggle="collapse" data-target="#body_category_' + categories[i][0] + '">' +
            '<div class="col-10">' + categories[i][1 + language] + '</div><div class="col-1 text-center counter" id="layer_counter_category_' + categories[i][0] + '">0</div></div>' +
            '<div class="row collapse body-category" id ="body_category_' + categories[i][0] + '" data-parent="#toc"></div>');
    });
    $.each(layers, function(i) {
        $('#body_category_' + layers[i][1]).append('<div class="row layer_body" id="layer_body_' + layers[i][0] + '"><div class="row w-100 layer_header"><div class="col-1"><input type="checkbox" class="form-check-input" style="lign-items: center;" value="" onclick="layer_switcher(\'' + layers[i][0] + '\',\'' + layers[i][2] + '\')"></div><div class="10">' + layers[i][3 + language] + '</div></div>');
        var number = $('#layer_counter_category_' + layers[i][1]).html();
        $('#layer_counter_category_' + layers[i][1]).html(Number(number) + 1);
    });
}
load_page();


function info_evento() {
    var x = document.getElementById("description");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }