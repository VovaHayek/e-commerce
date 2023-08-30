from django.urls import path

from . import views

urlpatterns = [
    #path('products', views.get_products),
    path('products', views.ProductList.as_view()),
    path('categories', views.get_categories),
    path('cart', views.Cart.as_view()),
    path('order', views.FinishOrder.as_view())
]