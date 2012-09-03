var map;

(function(){
    map = new OpenLayers.Map({
        div: "map",
        layers: [
            new OpenLayers.Layer.TileCache(
                "Cerilia Original (tiled)",
                BRM.HOST+"/cache",
                "cerilia_original",
                {
                    attribution: "<a href='http://community.wizards.com/bright/go/gallery/item/86320415?pref_tab=photos'>Map of Cerilia</a>, Compiled by Drakkan",
                    format: 'image/jpeg',
                    transitionEffect: 'resize',
                    resolutions: [2400, 1200, 600, 300, 150]
                }
            ),
            new OpenLayers.Layer.WMS(
                "Cerilia Original (untiled)",
                BRM.HOST+"/cgi-bin/mapserv?map="+BRM.ROOT_DIR+"/map/cerilia.map",
                {
                    layers: "cerilia-original"
                },
                {
                    attribution: "<a href='http://community.wizards.com/bright/go/gallery/item/86320415?pref_tab=photos'>Map of Cerilia</a>, Compiled by Drakkan",
                    resolutions: [2400, 1200, 600, 300, 150],
                    singleTile: true,
                    transitionEffect: 'resize'
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
