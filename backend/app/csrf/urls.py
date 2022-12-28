from django.urls import path

from . import views

urlpatterns = [
    path('set', views.set, name='set'),
]