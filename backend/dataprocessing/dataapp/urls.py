from django.urls import path
from .views import Data

urlpatterns = [
    path('upload/', Data.as_view() ,name='upload_data'),
	path('edit/',Data.as_view(),name='edit_data'),
	path('get',Data.as_view(),name='get_data')
]