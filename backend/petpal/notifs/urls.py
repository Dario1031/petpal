from django.urls import path
from .views import CreateNotificationView, UpdateNotificationView, GetNotificationView, ListNotificationView
app_name = 'notifs'

urlpatterns = [ 
    path('creation/', CreateNotificationView.as_view(), name='notif_create'),
    path('alteration/<int:id>/', UpdateNotificationView.as_view(), name='notif_update'),
    path('<int:id>/', GetNotificationView.as_view(), name='notif_get'),
    path('list/', ListNotificationView.as_view(), name='notif_list'),
]

