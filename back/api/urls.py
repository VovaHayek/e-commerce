from django.urls import path

from . import views

urlpatterns = [
    #path('products', views.get_products),
    path('products', views.ProductList.as_view()),
    path('categories', views.get_categories),
    path('cart', views.get_cart),
    path('cart/create', views.create_cart),
    path('cart/update_cart', views.update_cart),
    path('cart/remove_product', views.remove_cart_product),
    path('order', views.FinishOrder.as_view())
]