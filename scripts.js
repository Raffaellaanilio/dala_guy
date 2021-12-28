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

//var indicator = getQueryVariableGET('indicator_id');


var map = new maplibregl.Map({
    container: 'map', // container id
    style: map_style, // stylesheet location
    center: map_center, // starting position [lng, lat]
    zoom: map_zoom // starting zoom
});

layers_array = [];

map.on('load', function () {
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
            $("#checkbox_" + x).prop("checked", true);
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
});

load_page = function load_page() {
    $("#title").html(title);
    $("#country").html(country);
    $("#event").html(event);
    $("#description").html(description);
    $("#report").html(report);
    $.each(categories, function (i) {
        $("#toc").append('<div class="row header-category" data-toggle="collapse" data-target="#body_category_' + categories[i][0] + '">' +
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

select_evaluation = () => {
    //event.preventDefault();
    var selected_evaluation = $("#evaluation_selector").children("option:selected").val();
    alert(selected_evaluation);
    var evaluation_data = '';
    var url = 'https://geoportal.cepal.org/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=geonode%3ADALA_EVALUATION_GUY&outputFormat=json&srs=EPSG%3A3857&srsName=EPSG%3A3857';
    // ($.getJSON(url, function (data) {
    //     evaluation_data = data;
    // }));

    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            map.addSource('source_0', {
                type: 'geojson',
                data: data,
            });
            var content_layer = {
                'id': 'layer_0',
                type: "fill",
                'source': 'source_0',
                'layout': {
                    visibility: 'visible',
                },
                paint: {
                    'fill-color': 'red',
                    'fill-opacity': 0
                }
            };
            map.addLayer(content_layer);
        });
}

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

/* function infoEvento() {
    let x = document.getElementById("description");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function infoPais() {
    let x = document.getElementById("countryIndicators");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
    console.log("prueba")
}
 */

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function toggleCountryIndicators() {
    document.querySelector(".myDropdownCountryIndicators").classList.toggle("show");
  }

  function toggleDescription() {
    document.querySelector(".myDropdownDescription").classList.toggle("show");
  }

  
  // Close the dropdown if the user clicks outside of it // ** NO ESTÁ FUNCIONANDO **
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.querySelector(".dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  //AJAX GET API

     let indicators = [1,2,50,100]
     let countryISO3 = "GUY"
     let selectedIndicators = [indicators.forEach(element => console.log(element))]
     url = `https://api-cepalstat.cepal.org/cepalstat/api/v1/indicator/${selectedIndicators}/metadata?lang=en&format=json`

  for (let index = 0; index < selectedIndicators.length; index++) {

    $.get(url, (response, status) => {
        if (status === "success"){
            $("#countryIndicators").append(
              `<div>
              ${response.body.metadata.indicator_name} (${response.body.metadata.last_update})<br>
              ${response.body.data.value}
              </div>`
            );  
          ;
        }
      }
      );
    

  }



     
