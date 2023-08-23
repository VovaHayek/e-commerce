from django.urls import path

from . import views

urlpatterns = [
    path('registration/', views.RegistrationView.as_view()),
    path('logout/', views.LogoutView.as_view()),
]