from django.shortcuts import render
from django.http import HttpResponse

from models import Image

import simplekml

def index(request):
    return render(request, 'index.html', {
        'error_message': "You didn't select a choice.",
    })

def locations(request):
    kml = simplekml.Kml()
    images = Image.objects.all()
    for image in images:
        kml.newpoint(
            name = image.image.url, 
            coords = [(
                image.longitude,
                image.latitude
            )]
        ) 

    response = HttpResponse(kml.kml())
    response['Content-Disposition'] = 'attachment; filename="locations.kml"'
    response['Content-Type'] = 'application/kml'
    return response
