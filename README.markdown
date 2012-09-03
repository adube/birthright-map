Birthright Interactive Map
==========================

This repository holds an interactive web mapping prototype application which
displays Birthright Cerilia maps.


Requirements
------------

*   Apache
*   OpenLayers 2.12
    *   root directory must be web visible from /openlayers/2.12/
*   MapServer CGI 6.0.x


Installation
------------

*   Fill all requirements
*   Copy and edit the JavaScript config file to fit your environmnent
    
        cp htdocs/config-dist.inc.js htdocs/config.inc.js
        vim htdocs/config.inc.js


Data
----
The data directory is not included in this repository.


Raster Manipulation
-------------------
See README-raster.markdown file.


References
----------

*   [MapServer] [1]
*   [OpenLayers] [2]

[1]: http://mapserver.org/ "MapServer, the map renderer server"
[2]: http://openlayers.org/ "OpenLayers, the JavaScript map engine"
