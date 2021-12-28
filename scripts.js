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

//mapboxgl.accessToken = 'pk.eyJ1IjoiaGNhc3RlbGxhcm8iLCJhIjoiY2lrazJvZHFrMDl1eXYwa202Z2Njczk1eiJ9.fIBpy-XcIN0kKSuIx6oReA';

var map_style = main_items.map.style;
var map_center = main_items.map.center;
var map_zoom = main_items.map.zoom;
var lang = main_items.main_language;
var country = main_items.country[language];
var event = main_items.event[language];
var title = main_items.title[language];
var description = main_items.description[language];
var report = main_items.report[language];

colors = {
    'yellow_3': ['#ecdcb0', '#dfbc59', '#d29b02'],
    'yellow_4': ['#ecdcb0', '#e4c676', '#dbb13c', '#d29b02'],
    'yellow_5': ['#ecdcb0', '#e6cc85', '#dfbc59', '#d9ab2d', '#d29b02'],
    'yellow_6': ['#ecdcb0', '#e6cc85', '#dfbc59', '#d9ab2d', '#d29b02', '#c38f01'],
    'orange_3': ['#d7c0ba', '#d17f6b', '#cb3f1b'],
    'orange_4': ['#d7c0ba', '#d39585', '#cf6a50', '#cb3f1b'],
    'places_4': ['#d7c0ba', '#d49f92', '#d17f6b', '#ce5f43', '#cb3f1b', '#c52700'],
    'orange_5': ['#d7c0ba', '#d49f92', '#d17f6b', '#ce5f43', '#cb3f1b'],
    'orange_6': ['#d7c0ba', '#d49f92', '#d17f6b', '#ce5f43', '#cb3f1b', '#c52700'],
    'green_3': ['#b8d9c9', '#64a284', '#106b3f'],
    'green_4': ['#b8d9c9', '#80b59b', '#48906d', '#106b3f'],
    'green_5': ['#b8d9c9', '#8ebea7', '#64a284', '#3a8761', '#106b3f'],
    'green_6': ['#b8d9c9', '#8ebea7', '#64a284', '#3a8761', '#106b3f', '#015029'],
    'lightblue_3': ['#edf4fa', '#96b5cf', '#3f76a3'],
    'lightblue_4': ['#c1d5e5', '#96b5cf', '#6a96b9', '#3f76a3'],
    'lightblue_5': ['#edf4fa', '#c1d5e5', '#96b5cf', '#6a96b9', '#3f76a3'],
    'lightblue_6': ['#edf4fa', '#c1d5e5', '#96b5cf', '#6a96b9', '#3f76a3', '#1f67a3'],
    'blue_3': ['#d5f6f6', '#82a3a3', '#2f4f4f'],
    'blue_4': ['#accdcd', '#82a3a3', '#587979', '#2f4f4f'],
    'blue_5': ['#d5f6f6', '#accdcd', '#82a3a3', '#587979', '#2f4f4f'],
    'blue_6': ['#d5f6f6', '#accdcd', '#82a3a3', '#587979', '#2f4f4f', '#213838'],
    'sizes_4': [4, 6, 8, 10],
    'sizes_6': [3, 4, 6, 8, 9, 10],

};

//var indicator = getQueryVariableGET('indicator_id');


var map = new maplibregl.Map({
    container: 'map', // container id
    style: map_style, // stylesheet location
    center: map_center, // starting position [lng, lat]
    zoom: map_zoom // starting zoom
});

layers_array = [];

map.on('load', function () {

    map.addSource('extent_wms', {
        type: 'geojson',
        data: extent_wms
    });

    var content_layer = {
        'id': 'extent_wms',
        type: "fill",
        'source': 'extent_wms',
        'layout': {
            'visibility': 'visible'
        },
        // "filter": ['==', 'category', 0],
        paint: {
            'fill-color': 'red',
            'fill-opacity': 0
        }
    };

    map.addLayer(content_layer);

    map.on('click', 'extent_wms', (e) => {
        var popup_content = '<div class="integrated_popup"><span class="non_information_popup">Sin información</span></div>';
        //'<div class="integrated_popup"><div class="row"><div class="col-12">x: ' + e.lngLat.lng.toFixed(4) + ', y: ' + e.lngLat.lat.toFixed(4) + '<br></div></div></div>'
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popup_content)
            .addTo(map);
    });

    getfeatureinfo = function getfeatureinfo(x, y, z) {
        console.log("Entró a getfeatureinfo:" + x + ', y: ' + y +', z: '+ z  )

        var capa_consulta = z
        var layer_number = x
        map.on('mouseenter', y, function (e) {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', y, function (e) {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', y, function (e) {

            var r = 6378137 * Math.PI * 2;
            var x = (e.lngLat.lng / 360) * r;
            var sin = Math.sin(e.lngLat.lat * Math.PI / 180);
            var y = 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI * r;
            var zoom = map.getZoom();

            metersPerPx = 156543.03392 * Math.cos(e.lngLat.lat * Math.PI / 180) / Math.pow(2, zoom)

            var tolerance = metersPerPx * 25;
            console.log(zoom + ' ' + 1 / zoom + ' ' + tolerance);
            var bbox = (x - tolerance) + ',' + (y - tolerance) + ',' + (x + tolerance) + ',' + (y + tolerance);

            collapse_popup = ''

            var url = 'https://geoportal.cepal.org/geoserver/ows?' +
                'SERVICE=WMS&' +
                'VERSION=1.3.0&' +
                'REQUEST=GetFeatureInfo&' +
                'BBOX=' + bbox + '&' +
                'CRS=EPSG:3857&' +
                'WIDTH=256&' +
                'HEIGHT=256&' +
                'LAYERS=' + capa_consulta + '&' +
                'STYLES=&' +
                'FORMAT=image/png&' +
                'QUERY_LAYERS=' + capa_consulta + '&' +
                'INFO_FORMAT=application/json&' +
                'I=128&' +
                'J=128';
            let inner_popup = '';
            var cargar_popup = function cargar_popup() {
                return new Promise(function (resolve, reject) {
                    resolve($.getJSON(url, function (data) {
                        console.log(data);
                        if (typeof (data.features[0]) == 'undefined') { } else {
                            inner_popup = inner_popup + '<div data-toggle="collapse" style="margin-top: 1rem; width:100%;display: flex;" href="#collapse_' + layer_number + '"><span style="margin-right: 5px;">' + layers[layer_number - 1][3 + language] + '</span><i class="fas fa-plus-circle" style="margin-left:auto;"></i>' + '</div><div id="collapse_' + layer_number + '" class="collapseOne collapse ' + collapse_popup + ' popupcontent"><br>';
                            var datos = data.features[0].properties;
                            
                                $.each(datos, function (i, record) {
                                    inner_popup = inner_popup +
                                        '<b>' + i + ': </b>' + record + '<br>';
                                });                            
                            inner_popup = inner_popup + '</div>'
                        }
                    }))
                })
            }

            cargar_popup().then(function (data) {
                if (inner_popup.length == 0) { } else {
                    $(".non_information_popup").hide();
                    $(".integrated_popup").append(inner_popup);
                    /* new maplibregl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(inner_popup)
                        .addTo(beforeMap); */
                }

            })
        });
    }
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
        getfeatureinfo(x, 'extent_wms', y)
    }
    layer_switcher = function layer_switcher(x, y) {
        var layer_name = y
        var layer_position = layers_array.indexOf(x);
        if (language == 0) { var language_code = 'ES' } else { var language_cod = 'EN' }
        if (layer_position == -1) {
            var image_url = 'https://geoportal.cepal.org/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer_name + '&STYLE=' + layer_name + '&legend_options=fontAntiAliasing:true;fontSize:12;forceLabels:on&LANGUAGE=' + language_code;

            load_layer(x, y);
            layers_array.push(x);
            $("#checkbox_" + x).prop("checked", true);
            toggle_tab('tab_layers');
            $("#layers").append('<div class="row layer_body" id="reference_body_' + x + '"><div class="row w-100 layer_header"><div class="col-1" ><input type="checkbox" class="form-check-input" style="align-items: center;" value="" id="checkbox_' + x + '" checked></div><div class="col-10">' + layers[x - 1][3 + language] + '</div></div>');
            $("#reference_body_" + x).append('<div class="row w-100 layer_legend" id="leagend_' + x + '" ><img src="' + image_url + '"></div>');
        } else {
            var visibility = map.getLayoutProperty('layer_' + x, 'visibility');
            if (visibility == 'visible') {
                map.setLayoutProperty('layer_' + x, 'visibility', 'none');
                $("#checkbox_" + x).prop('checked', false);
            } else {
                map.setLayoutProperty('layer_' + x, 'visibility', 'visible');
                $("#checkbox_" + x).prop("checked", true);
            }
        }
        $('#legend_' + x).toggle();

    };
    select_evaluation = () => {
        //event.preventDefault();
        var selected_evaluation = $("#evaluation_selector").children("option:selected").val();
        var selected_sector = $("#sector_selector").children("option:selected").val();
        console.log(selected_evaluation, selected_sector);
        var url = 'https://geoportal.cepal.org/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=geonode:DALA_EVALUATION_GUY&outputFormat=json&srs=EPSG%3A4326&srsName=EPSG%3A4326';

        fetch(url)
            .then((resp) => resp.json())
            .then(function (data) {

                map.addSource('source_0', {
                    type: 'geojson',
                    data: data,
                });
                var values_array = [];
                var field = selected_evaluation + '_' + selected_sector;
                $.each(data.features, function (i, feature) {
                    values_array.push(feature.properties[field]);
                });
                var legend_content = ['step', ['get', field], '#e4e4e4',];
                calculate_classes = function calculate_classes() {

                    var min_value = values_array[0];
                    var max_value = values_array[values_array.length - 1];
                    var values_range = max_value - min_value;
                    if (values_range == 0) {
                        var classes = 1;
                    } else {
                        var classes = 3;
                    }
                    var classes_array = [];

                    var i;
                    for (i = 0; i < classes; i++) {
                        //var class_values = [];
                        var start_value = min_value + ((values_range / classes) * (i));
                        var end_value = min_value + ((values_range / classes) * (i + 1));
                        classes_array.push([start_value, end_value]);
                    };
                    //reference_array.push(classes_array);        
                    $.each(classes_array, function (i, class_data) {
                        //legend_content.push(Math.round(class_data[0]));
                        legend_content.push(class_data[0]);
                        legend_content.push(colors.orange_6[i]);
                        //referencia_1 = '<span class="es" style="display:' + display_es + ';"> de </span>' + minimo + '<span class="en" style="display:' + display_en + '"> to </span><span class="es" style="display:' + display_es + ';"> a </span>' + limite_1;
                    });
                    console.log("legend_content: " + legend_content)
                };
                calculate_classes();
                values_array.sort();
                console.log(values_array)
                var content_layer = {
                    'id': 'layer_0',
                    'type': "fill",
                    'source': 'source_0',
                    'layout': {
                        'visibility': 'visible',
                    },
                    'paint': {
                        'fill-color': legend_content,
                        'fill-opacity': 1,
                        'fill-outline-color': 'white',
                    }
                };
                map.addLayer(content_layer);
            });
    }
});

load_page = function load_page() {
    $("#title").html(title);
    $("#country").html(country);
    $("#event").html(event);
    $("#description").html(description);
    $("#report").html(report);
    $.each(categories, function (i) {
        $("#layer_tree").append('<div class="row header-category" data-toggle="collapse" data-target="#body_category_' + categories[i][0] + '">' +
            '<div class="col-10">' + categories[i][1 + language] + '</div><div class="col-1 text-center counter" id="layer_counter_category_' + categories[i][0] + '">0</div></div>' +
            '<div class="row collapse body-category" id ="body_category_' + categories[i][0] + '" data-parent="#toc"></div>');
    });
    $.each(layers, function (i) {
        $('#body_category_' + layers[i][1]).append('<div class="row layer_body" id="layer_body_' + layers[i][0] + '"><div class="row w-100 layer_header" onclick="layer_switcher(\'' + layers[i][0] + '\',\'' + layers[i][2] + '\')"><div class="col-1" ><input type="checkbox" class="form-check-input" style="align-items: center;" value="" id="checkbox_' + layers[i][0] + '"></div><div class="col-10">' + layers[i][3 + language] + '</div></div>');
        var number = $('#layer_counter_category_' + layers[i][1]).html();
        $('#layer_counter_category_' + layers[i][1]).html(Number(number) + 1);
    });
}
load_page();



load_evaluation = () => {
    var input = '<div class="layer_body" id="layer_body_0">' +
        '<div class="row">Evaluación:</div><div class="row"><select id="evaluation_selector" name="evaluation">';
    $.each(evaluations, function (i, evaluation) {
        input = input + '<option value="' + evaluation[1] + '">' + evaluation[language + 2] + '</option>'
    });
    input = input + '</select></div><div class="row">Sector:</div><div class="row"><select id="sector_selector" name="sector">';
    $.each(sectors, function (i, sector) {
        input = input + '<option value="' + sector[0] + '">' + sector[language + 1] + '</option>'
    });
    input = input + '</select></div><div class="row"><button onclick="select_evaluation()">Seleccionar</button></div></div>';
    $('#body_category_0').append(input);
}
load_evaluation();

function info_evento() {
    var x = document.getElementById("description");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function toggle_tab(x) {
    $(".tab_selected").addClass("tab");
    $(".tab_selected").removeClass("tab_selected");
    $("#" + x).removeClass("tab");
    $("#" + x).addClass("tab_selected");
    if (x == "tab_layers") {
        $("#layer_tree").hide();
    } else {
        $("#layer_tree").show();
    }
};


