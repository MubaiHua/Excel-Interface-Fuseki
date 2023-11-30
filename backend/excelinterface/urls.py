from django.urls import path
from .views import get, i_want_my_own_name

urlpatterns = [
    path('get/', get, name='get'),
    path('i_want_my_own_name/', i_want_my_own_name, name='i_want_my_own_name')
    # other paths specific to your app...
]