from django.urls import path
from .views import CreatePetView, UpdatePetView, GetPetView, DeletePetView, SearchAndFilterPetsView
app_name = 'pets'

urlpatterns = [ 
    path('creation/', CreatePetView.as_view(), name='pet_create'),
    path('alteration/<int:id>/', UpdatePetView.as_view(), name='pet_update'),
    path('<int:id>/', GetPetView.as_view(), name='pet_detail'),
    path('removal/<int:id>/', DeletePetView.as_view(), name='pet_delete'),
    path('list/', SearchAndFilterPetsView.as_view(), name='pet_search'),
]