var map;

(function(){
    var urls = [
        "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
        "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
        "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png"
    ];

    map = new OpenLayers.Map({
        div: "map",
        layers: [
            new OpenLayers.Layer.WMS(
                "Cerilia Original",
                "http://127.0.0.1/cgi-bin/mapserv?map=/home/adube/proj/birthright-map/map/cerilia.map",
                {
                    layers: "cerilia-original"
                },
                {
                  attribution: "<a href='http://community.wizards.com/bright/go/gallery/item/86320415?pref_tab=photos'>Map of Cerilia</a>, Compiled by Drakkan",
                  resolutions: [2400, 1200, 600, 300, 150],
                  singleTile: true
                }
            )
        ],
        center: [1341600, -840000],
        zoom: 0,
        projection: new OpenLayers.Projection('EPSG:32198'),
        maxExtent: new OpenLayers.Bounds(-266.667,-1680266.666,2683466.665,266.667),
        units: 'm'
    });
    
    map.addControls([
        new OpenLayers.Control.ScaleLine(),
        new OpenLayers.Control.LayerSwitcher
    ]);
})();
