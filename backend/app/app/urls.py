from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/csrf/', include('csrf.urls')),
    path('api/v1/task/', include('task.urls')),
]
