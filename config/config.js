var main_items = {
    "title": ["Evaluación de Daños y Pérdidas <br> (DaLA)", "Damage and Loss Assessment <br> (DaLA)"],
    "country": ["País: Guyana <img src='./images/guy_flag.svg'>", "Country: Guyana <img src='./images/guy_flag.svg'>"],
    "event": ["Evento: Afectación por inundaciones adversas, Junio de 2021", "Event: Impacted by adverse flooding, June 2021"],
    "report": ["Ir al reporte <i class='fas fa-file-pdf'></i>", "Go to report <i class='fas fa-file-pdf'></i>"],
    "description": ["Descripción del evento", "Description of the event"],
    "logo_partner": ["gfdrr_logo.png"],
    "main_language": "english",
    "map": {
        "center": [-61.156, 5.1], // X and Y
        "zoom": 5.8,
        "style": "mapbox://styles/mapbox/light-v10"
    }
}

/* var indicadores = [
    [1, '', '']
    [2, '', '']
    [3, '', '']
    [4, '', '']
] */


var categories = [
    [1, 'Eventos', 'Events'],
    [2, 'Población afectada', 'Affected population'],
    [3, 'Educación', 'Education'],
    [4, 'Salud', 'Health'],
    [5, 'Vivienda', 'Housing'],
    [6, 'Agua y saneamiento', 'Water and sanitation'],
    [7, 'Electricidad y energía', 'Power and energy'],
    [8, 'Telecomunicaciones', 'Telecommunications'],
    [9, 'Transporte y vialidad', 'Transportation'],
    [10, 'Agricultura', 'Agriculture'],
    [11, 'Turismo y comercio', 'Tourism'],
    [12, 'Medio ambiente', 'Environment'],
    [13, 'Impacto macroeconómico', 'Macroeconomic impact'],
    [14, 'Evaluación DaLa', 'DaLa evaluation'],
]

var key_messages = [
    [1, ''],
    [2, ''],
    [3, ''],
    [4, ''],
    [5, ''],
    [6, ''],
    [7, ''],
    [8, ''],
    [9, ''],
    [10, ''],
    [11, ''],
    [12, ''],
    [13, ''],
    [14, ''],
    [15, ''],
    [16, ''],
    [17, ''],
    [18, ''],
    [19, ''],
    [20, ''],
    [21, ''],
    [22, ''],
    [23, ''],
    [24, ''],
]

var layers = [
    [1, 3, 'geonode:SCHOOLS_DALA_GUY_3857', 'Escuelas', 'Schools', 'Equipo de evaluación con datos del Ministerio de Educación, GUYNODE y OpenStreetMap', 'Assessment team with Ministry of Education, GUYNODE and OpenStreetMap data', 'Esta capa muestra las instalaciones escolares en Guyana.', 'This layer shows the school facilities in Guyana'],
    [2, 6, 'geonode:GUY_RIVERS', 'Ríos', 'Rivers', 'Comisión de Tierras y Encuestas de Guyana', 'Guyana Lands and Surveys Commission', 'Esta capa muestra los principales ríos de Guyana.', 'This layer shows the main rivers of Guyana'],
    [3, 1, 'geonode:GUY_REGIONS', 'Regiones', 'Regions', 'Comisión de Tierras y Encuestas de Guyana', 'Guyana Lands and Surveys Commission', 'Límites del Consejo Democrático de las Regiones (RDC) de Guyana', 'Boundaries of Regions Democratic Council (RDC) of Guyana'],
    [4, 12, 'geonode:GUY_NATURAL_ZONES', 'Zonas naturales', 'Natural zones', 'Comisión de Tierras y Encuestas de Guyana', 'Guyana Lands and Surveys Commission', 'Esta capa muestra las regiones naturales de Guyana.', 'This layer shows the natural regions of Guyana'],
    [5, 5, 'geonode:GUY_MAIN_TOWNS_POLY', 'Principales ciudades (polígonos)', 'Main towns (polygons)', 'Equipo de evaluación con datos de OpenStreetMap', 'Assessment team with OpenStreetMap data', 'Esta capa muestra las principales ciudades de Guyana.', 'This layer shows the main towns of Guyana'],
    [6, 5, 'geonode:GUY_MAIN_TOWNS_POINTS', 'Principales ciudades (puntos)', 'Main towns (points)', 'Equipo de evaluación con datos de OpenStreetMap', 'Assessment team with OpenStreetMap data', 'Esta capa muestra las principales ciudades de Guyana clasificadas como ciudades, pueblos y aldeas.', 'This layer shows the main towns of Guyana classified as City, Towns and Villages'],
    [7, 9, 'geonode:GUY_MAIN_ROADS', 'Caminos principales', 'Main roads', 'Equipo de evaluación con datos de OpenStreetMap', 'Assessment team with OpenStreetMap data', 'Esta capa muestra las principales carreteras de Guyana.', 'This layer shows the main roads of Guyana'],
    [8, 6, 'geonode:GUY_MAIN_RIVERS', 'Ríos principales', 'Main rivers', 'Comisión de Tierras y Encuestas de Guyana', 'Guyana Lands and Surveys Commission', 'Esta capa muestra los principales ríos de Guyana.', 'This layer shows the main rivers of Guyana'],
    [9, 12, 'geonode:GUY_LAND_USE_COASTAL_PLAIN_2010', 'Uso de suelo costero', 'Coastal land use', 'Comisión Forestal de Guyana, 2010', 'Guyana Forestry Commission, 2010', 'Esta capa muestra los límites de las unidades de uso / tenencia de la tierra a lo largo de la llanura costera en la parte noreste de Guyana. El conjunto de datos se actualizó utilizando imágenes de satélite de resolución media (LANDSAT TM de 2010/2011), durante el proyecto de desarrollo del plan de uso de la tierra, sin embargo, no se realizó ningún trabajo de campo en este momento.', 'This layer shows boundaries of Land Use / tenure units  along the Coastal Plain the the north-eastern part of Guyana. The dataset was updated using a medium resolution satellite imagery (LANDSAT TM from 2010/2011), during the Development of the Land Use plan project however no field work was conducted at this time.'],
    [10, 12, 'geonode:GUY_LAND_COVER_USE_2010', 'Uso de cobertura de suelo', 'Land cover use', 'Comisión Forestal de Guyana, 2010', 'Guyana Forestry Commission, 2010', 'Esta capa resume la cobertura y el uso del suelo en Guyana según los mapas de vegetación elaborados por GFC (2010) y Huber et al (1995), que se actualizaron utilizando un mosaico de imágenes satelitales LANDSAT TM de 2010/2011.', 'This layer summarizes the Land Cover / Land Use in Guyana  based on the vegetation maps made by GFC (2010) and Huber et al (1995), which were updated using a mosaic of LANDSAT TM satellite imagery from 2010/2011'],
    [11, 2, 'geonode:GUY_HOUSES_OSM', 'Viviendas', 'Housing', 'Open Street Map', 'Equipo de evaluación con datos de OpenStreetMap', 'Assessment team with OpenStreetMap data', 'Esta capa muestra las unidades habitacionales utilizadas como referencia para estimar los daños en el sector habitacional.', 'This layer shows the housing units used as a reference for estimating the damages in the housing sector'],
    [12, 1, 'geonode:GUY_FLOODED_AREA_JUN_MAY_2021', 'Área inundada junio-mayo 2021','Flooded area jun-may 2021', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Extensión de agua en todo el país identificando las áreas que se inundaron en algún momento durante los meses de mayo y junio de 2021', 'Water extent across the country identifying the areas that were flooded at some point during the months of May and June 2021'],
    [13, 9, 'geonode:GUY_AIRPORTS', 'Aeropuertos', 'Airports', 'Comisión de Tierras y Encuestas de Guyana', 'Guyana Lands and Surveys Commission', 'Esta capa muestra los aeropuertos y pistas de aterrizaje en Guyana.', 'This layer shows the airports and airstrips in Guyana'],
    [14, 2, 'geonode:GUY_HEALTH_FACILITIES', 'Centros de salud', 'Health facilities', 'Comisión de Tierras y Encuestas de Guyana','Guyana Lands and Surveys Commission', 'Esta capa muestra los diferentes tipos de establecimientos de salud en Guyana.','This layer shows the different types of health facilities in Guyana'],
    [15, 1, 'geonode:Flood_area_09_06_2021_UpperMazaruni_RCM2_MS', 'Área inundada "Upper Mazaruni" (09/06/2021)', 'Flooded area "Upper Mazaruni" (09/06/2021)', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Este mapa ilustra las aguas superficiales detectadas por satélite a lo largo del río Mazaruni en la región de Cuyuni-Mazaruni de Guyana, según se observa en la imagen del radar RCM-2 obtenida el 9 de junio de 2021 a las 22:17 UTC. Dentro del área analizada de aproximadamente 700 km2, se observó un total de aproximadamente 4 km2 de tierras inundadas. Este es un análisis preliminar que aún no ha sido validado en el campo. Envíe sus comentarios en tierra a UNITAR-UNOSAT', 'This map illustrates satellite-detected surface waters along the Mazaruni river in Cuyuni-Mazaruni Region of Guyana as observed from RCM-2 radar image acquired on 09 June 2021 at 22:17 UTC. Within the analyzed area of about 700 km2, a total of about 4 km2 of lands were observed as flooded. This is a preliminary analysis that has not yet been validated in the field. Please send ground feedback to UNITAR-UNOSAT'],
    [16, 1, 'geonode:Flood_area_23_06_2021_Upper_Mazaruni_ST1_MS', 'Área inundada "Upper Mazaruni" (23/06/2021)', 'Flooded area "Upper Mazaruni" (23/06/2021)', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Este mapa ilustra las aguas superficiales detectadas por satélite a lo largo del río Mazaruni en la región de Cuyuni-Mazaruni de Guyana como se observa en la imagen del radar Sentinel-1 adquirida el 23 de junio de 2021 a las 22:15 UTC. Dentro del área analizada de unos 480 km2, la extensión del agua parece haber disminuido en unos 3 km2 desde el 9 de junio de 2021.', ''],
    [17, 1, 'geonode:Flood_area_19_05_2021_Rupununi_ST1_MS', 'Área inundada "Rupununi" (19/05/2021)', 'Flooded area "Rupununi" (19/05/2021)', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Este mapa ilustra las aguas superficiales detectadas por satélite a lo largo del río Rupununi observadas a partir de la imagen Sentinel-1 adquirida el 19 de mayo de 2021.', 'This map illustrates satellite-detected surface waters along the Rupununi river observed from Sentinel-1 image acquired on 19 May 2021.'],
    [18, 1, 'geonode:Flood_area_20_05_2021_Rupununi_ST2_MS', 'Área inundada "Rupununi" (20/05/2021)', 'Flooded area "Rupununi" (20/05/2021)', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Este mapa ilustra las aguas superficiales detectadas por satélite a lo largo del río Rupununi observadas a partir de la imagen Sentinel-2 adquirida el 20 de mayo de 2021.', 'This map illustrates satellite-detected surface waters along the Rupununi river observed from Sentinel-2 image acquired on 20 May 2021.'],
    [19, 1, 'geonode:Flood_area_12_06_2021_Region9_ST1_MS', 'Área inundada "region 9" (12/06/2021)', 'Flooded area "region 9" (12/06/2021)', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Este mapa ilustra las aguas superficiales detectadas por satélite a lo largo del río Rupununi en la región del Alto Takutu-Alto Essequibo de Guyana, como se observa en la imagen Sentinel-1 adquirida el 12 de junio de 2021 a las 09:45 UTC. Dentro del área analizada de unos 6.500 km2, se observó un total de unos 235 km2 de tierras inundadas y la carretera de unos 26 km está potencialmente afectada por las inundaciones.', 'This map illustrates satellite-detected surface waters along the Rupununi river in Upper Takutu-Upper Essequibo Region of Guyana as observed from Sentinel-1 image acquired on 12 June 2021 at 09:45 UTC. Within the analyzed area of about 6,500 km2, a total of about 235 km2 of lands were observed as flooded and the road about 26 km are potentially affected by the floods.'],
    [20, 1, 'geonode:Flood_area_07_06_2021_Kwakwani_RCM2_MS', 'Área inundada "Kwakwani" (07/06/2021)', 'Flooded area "Kwakwani" (07/06/2021)', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Este mapa ilustra las aguas superficiales detectadas por satélite a lo largo del río Berbice en la región superior de Demerara-Berbice de Guyana, como se observa en la imagen de radar RCM-2 obtenida el 7 de junio de 2021 a las 22:21 UTC. Dentro del área analizada de aproximadamente 38.000 ha, se observó un total de aproximadamente 48 ha de tierras inundadas. Este es un análisis preliminar que aún no ha sido validado en el campo. Envíe sus comentarios en tierra a UNITAR-UNOSAT', 'This map illustrates satellite-detected surface waters along the Berbice river in Upper Demerara-Berbice Region of Guyana as observed from RCM-2 radar image acquired on 07 June 2021 at 22:21 UTC. Within the analyzed area of about 38,000 ha, a total of about 48 ha of lands were observed as flooded. This is a preliminary analysis that has not yet been validated in the field. Please send ground feedback to UNITAR-UNOSAT'],
    [21, 1, 'geonode:Flood_area_06_06_2021_Guayna_VIIRS_MS', 'Área inundada "Guayna" (06/06/2021)', 'Flooded area "Guayna" (06/06/2021)', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Este mapa ilustra las inundaciones acumuladas utilizando datos de NOAA20-VIIRS en Guyana entre el 2 y el 6 de junio de 2021. Dentro de las zonas libres de nubes analizadas de unos 200.000 km2, un total de unos 5.000 km2 de tierras parecen estar inundadas. Según los datos de población de Worldpop y las aguas superficiales detectadas, alrededor de 80.000 personas están potencialmente expuestas o viven cerca de áreas inundadas. La población potencialmente expuesta se encuentra principalmente en la Región 6 con ~ 22.000 personas, la Región 3 con ~ 19.000 y la Región 5 con ~ 15.000 personas.', 'This map illustrates cumulative floods using NOAA20-VIIRS data in Guyana between the 2nd and the 6th of June 2021. Within the analyzed cloud free zones of about 200,000 km2, a total of about 5,000 km2 of lands appear to be flooded. Based on Worldpop population data and the detected surface waters, about 80,000 people are potentially exposed or living close to flooded areas. The potentially exposed population is mainly located in the Region 6 with ~22,000 people, Region 3 with ~19,000 and Region 5 with ~15,000 people.'],
    [22, 1, 'geonode:Flood_area_08_06_2021_Guayna_VIIRS_ABI_MS', 'Área inundada "Guayna" (08/06/2021)', 'Flooded area "Guayna" (08/06/2021)', 'UNITAR-UNOSAT, 2021', 'UNITAR-UNOSAT, 2021', 'Este mapa ilustra las aguas superficiales detectadas por satélite en Guyana, observadas a partir de un producto de inundación conjunto VIIRS-ABI adquirido el 6 y el 8 de junio de 2021. Dentro de las zonas libres de nubes analizadas de aproximadamente 140 000 km2, parece haber un total de aproximadamente 2000 km2 de tierras. inundado. La extensión total del agua detectada el 8 de junio de 2021 parece haber disminuido en unos 1.000 km2 desde el 6 de junio de 2021. Según los datos de población de Worldpop y las aguas superficiales detectadas, unas 30.000 personas están potencialmente expuestas o viven cerca de áreas inundadas. La población potencialmente expuesta se encuentra principalmente en la Región 6 con ~ 10,000 personas y las Regiones 2 y 5 con ~ 6,000 personas cada una.', 'This map illustrates satellite-detected surface waters in Guyana as observed from a Joint VIIRS-ABI flood product acquired on 6 & 8 June 2021. Within the analyzed cloud free zones of about 140,000 km2, a total of about 2,000 km2 of lands appear to be flooded. The overall water extent as detected on the 8 June 2021 appears to have decreased of about 1,000 km2 since 6 June 2021. Based on Worldpop population data and the detected surface waters, about 30,000 people are potentially exposed or living close to flooded areas. The potentially exposed population is mainly located in the Region 6 with ~10,000 people and Region 2 & 5 with ~6,000 people each.'],
    [23, 1, 'geonode:Flood_area_07_06_2021_COP_MS', 'Área inundada (07/06/2021)', 'Flooded area (07/06/2021)', 'Copernicus, Emergency Management Service - Mapping, 2021', 'Copernicus, Emergency Management Service - Mapping, 2021', 'Aguas superficiales detectadas por satélite en la parte oriental de la Región 2 Pomeroon-Supenaam el 6 de junio de 2021', 'Satellite - detected surface waters at the eastern part of Region 2 Pomeroon-Supenaam on 06 June 2021'],
]