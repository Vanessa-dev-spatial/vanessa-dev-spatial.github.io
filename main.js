import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
// Import proj4 from its own package, not from OpenLayers
import proj4 from 'proj4';

// Import register function from OpenLayers
import { register } from 'ol/proj/proj4';

// Import getProjection from OpenLayers to use the custom projection
import { get as getProjection } from 'ol/proj';

// Define your custom projection using proj4 syntax
proj4.defs("ESRI:54009","+proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs");

// Register proj4 with OpenLayers
register(proj4);

// Now you can retrieve and use the projection
const newProjection = getProjection('ESRI:54009');

var OSM_layer = new TileLayer({
    source: new OSM()
    });

new Map ({
    target: 'map-container',
    layers: [OSM_layer
    ],
    view: new View({
        center: fromLonLat([0,0]),
        projection: 'ESRI:54009',
        zoom: 2
    })
})

