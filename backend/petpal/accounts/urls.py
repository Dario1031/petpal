from django.urls import path
from .views import AccountProfileView, CreateShelterAccountView, ListShelterView, CreatePetSeekerAccountView, UpdateAccountView, ActiveUserView, ListShelterPageView, ListBothView
app_name = 'accounts'

urlpatterns = [ 
    path('<user_id>/info/', AccountProfileView.as_view(), name='account_info'),
    path('shelter/creation/', CreateShelterAccountView.as_view(), name='shelter_create'),
    path('petseeker/creation/', CreatePetSeekerAccountView.as_view(), name='petseeker_create'),
    path('list/', ListShelterPageView.as_view(), name="shelter_list"),
    path('alteration/', UpdateAccountView.as_view(), name="update_account"),
    path('activeuser/', ActiveUserView.as_view(), name="active_user"),
    path('listbasic/', ListBothView.as_view(), name="basic_shelter_list"),
]