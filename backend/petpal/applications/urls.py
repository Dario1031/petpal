from django.urls import path
from .views import CreateApplicationView, ApplicationView, UpdateApplicationPetSeekerView, UpdateApplicationShelterView, SearchAndFilterApplicationView
app_name = 'applications'

urlpatterns = [
    path('<user_id>/petseeker/creation/', CreateApplicationView.as_view(), name = 'create_application'),
    path('<user_id>/petseeker/list/', ApplicationView.as_view(), name = 'view_application'),
    path('<user_id>/<int:id>/petseeker/alteration/', UpdateApplicationPetSeekerView.as_view(), name = 'update_application_petseeker'),
    path('<user_id>/<int:id>/shelter/alteration/', UpdateApplicationShelterView.as_view(), name = 'update_application_shelter'),
    path('<user_id>/shelter/list/', SearchAndFilterApplicationView.as_view(), name = 'list_shelter_applications')
]