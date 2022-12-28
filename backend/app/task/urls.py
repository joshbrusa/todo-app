from django.urls import path

from . import views

urlpatterns = [
    path('read', views.read, name='read'),
    path('read/<id>', views.readId, name='readId'),
    path('create', views.create, name='create'),
    path('update', views.update, name='update'),
    path('delete', views.delete, name='delete'),
]