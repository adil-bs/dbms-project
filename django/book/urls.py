from django.urls import path
from . import views

urlpatterns = [
    path('getbooks/',views.get_books), 
    path('book/<str:book_id>/',views.get_book),
    path('<str:user_id>/book/<str:book_id>/addreview/',views.add_review),
    path('book/<str:book_id>/review',views.review), 
    path('book/<str:book_id>/review/<str:rid>',views.comment),
]