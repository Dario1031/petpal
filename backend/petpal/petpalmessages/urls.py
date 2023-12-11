from django.urls import path
from .views import SendMessage, MessageList, RecentMessagesView
app_name = 'petpalmessages'

urlpatterns = [ 
    path('', SendMessage.as_view(), name='messages_send'),
    path('<username>/', MessageList.as_view(), name='list_messages'),
    path('<username>/recent/', RecentMessagesView.as_view(), name='recent'),
]