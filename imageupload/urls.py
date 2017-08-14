from django.conf.urls import url

import views

urlpatterns = [
    url(r'^locations\.kml$', views.locations, name='locations'),
    url(r'^$', views.index, name='index'),
]

