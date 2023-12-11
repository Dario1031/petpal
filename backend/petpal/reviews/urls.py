from django.urls import path
from .views import CreateReview, ReviewList, ReviewIdList
app_name = 'reviews'

urlpatterns = [ 
    path('', CreateReview.as_view(), name='review_creation'),
    path('<username>/list/', ReviewList.as_view(), name='review_list'),
    path('<userid>/id/list/', ReviewIdList.as_view(), name='review_id_list'),
]