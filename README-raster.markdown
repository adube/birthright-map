Birthright Interactive Map - Raster manipulation README
=======================================================

This README is about raster file manipulation and use.


How to georeference a plain jpeg image
--------------------------------------

I used the [World File] [1] method, which requires knowing how many map units
there is in 1 pixel. Here's how I calculated it.

The original jpeg file of Cerilia is 5032px X 3151px. Using Gimp, I selected
the scale within the map, which gave 75miles for approximatively 225px.
Converting that gave 1 mile / 3 pixels, or 1 pixel / 533.33 meters. I chose
'meters' as my map units rather than miles.

Following the [World File] [1] definition, I created a .jpw file with the
following content:

    533.333333
    0.0
    0.0
    -533.333333
    0.0
    0.0

When the file gets the same file name as the original jpg file (minus the
extension), you can use [ogrinfo] [3] utility program to get its extent :

    adube@weltall:~/proj/birthright-map/data$ gdalinfo cerilia-original.jpg
    Driver: JPEG/JPEG JFIF
    Files: cerilia-original.jpg
           cerilia-original.jpw
    Size is 5032, 3151
    Coordinate System is `'
    Origin = (-266.666666500000019,266.666666500000019)
    Pixel Size = (533.333333000000039,-533.333333000000039)
    Metadata:
      EXIF_ColorSpace=65535
      EXIF_DateTime=2006:02:12 20:59:21
      EXIF_Orientation=1
      EXIF_PixelXDimension=5032
      EXIF_PixelYDimension=3151
      EXIF_ResolutionUnit=2
      EXIF_Software=Adobe Photoshop 7.0
      EXIF_XResolution=(72)
      EXIF_YResolution=(72)
    Image Structure Metadata:
      COMPRESSION=JPEG
      INTERLEAVE=PIXEL
      SOURCE_COLOR_SPACE=YCbCr
    Corner Coordinates:
    Upper Left  (    -266.667,     266.667) 
    Lower Left  (    -266.667,-1680266.666) 
    Upper Right ( 2683466.665,     266.667) 
    Lower Right ( 2683466.665,-1680266.666) 
    Center      ( 1341599.999, -839999.999) 
    Band 1 Block=5032x1 Type=Byte, ColorInterp=Red
      Image Structure Metadata:
        COMPRESSION=JPEG
    Band 2 Block=5032x1 Type=Byte, ColorInterp=Green
      Image Structure Metadata:
        COMPRESSION=JPEG
    Band 3 Block=5032x1 Type=Byte, ColorInterp=Blue
      Image Structure Metadata:
        COMPRESSION=JPEG

and there you have it: a spacially referenced jpg file.


GeoTiff - better performance
----------------------------
JPEG files are okay, but have poor performance when used in spacial
environments. The best format is the [GeoTIFF][4], so I used GDAL
[gdal_translate] tool to convert it.

    gdal_translate -b 1 -b 2 -b 3 -mask 4 -co TILED=YES -co COMPRESS=JPEG -co PHOTOMETRIC=YCBCR --config GDAL_TIFF_INTERNAL_MASK YES  cerilia-original.jpg cerilia-original.tif

For even more performances, overview images can be added within the GeoTIFF
file using the [gdaladdo][6] utility.

    gdaladdo -r average cerilia-original.tif 2 4 8 16 32 64 128

If we compare the end result, a MapServer "draw map" query takes around 680ms
to return an image when using the jpg file and around 90ms when using the 
GeoTIFF file instead. This will make the map tiles rendering much faster.


References
----------

*   [World File wiki] [1]
*   [World File calculator] [2]
*   GDAL Utilities:
    *   [gdalinfo] [3]
    *   [gdal_translate] [5]
    *   [gdaladdo] [6]
*   [GeoTIFF raster format] [4]


[1]: http://en.wikipedia.org/wiki/World_file "World File wiki page"
[2]: http://egb13.net/2009/03/worldfile-calculator/ "World File calculator"
[3]: http://www.gdal.org/gdalinfo.html "gdalinfo, an utility listing information about a raster dataset"
[4]: http://en.wikipedia.org/wiki/GeoTIFF "GeoTIFF, best raster format"
[5]: http://www.gdal.org/gdal_translate.html "gdal_translate, GDAL utility to convert raster data between different formats"
[6]: http://www.gdal.org/gdaladdo.html "gdaladdo, builds overview images"