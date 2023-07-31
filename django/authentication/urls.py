from django.urls import path
from . import views

urlpatterns = [
    path('signup/',views.signUp),
    path('signin/',views.signIn),
    path('home/',views.home),
    path("logout/<str:id>/",views.logout),
    path('fp/',views.forgotPassword),
    path('islogged/<str:userid>/',views.isLogged),
    path('changeusername/<str:userid>/',views.changeUsername)
      
]
