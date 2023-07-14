from django.urls import path  
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/read', views.read, name='read'),
    path('api/add', views.add, name='add'),
    path('api/update/<int:id>', views.update, name='update'),
    path('api/delete/<int:id>', views.delete, name='delete')
]
