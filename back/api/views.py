from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CategorySerializer, ProductSerializer, OrderSerializer
from .models import Categories, Product, Order, FinishedOrder
from .filters import ProductFilter

def count_amount(products):
    amount = 0
    for product in products:
        amount += product.product_price
    return amount

class ProductList(APIView):
    def get(self, request, format=None):
        products = ProductFilter(request.GET, queryset=Product.objects.all())
        serializer = ProductSerializer(products.qs, many=True)
        return Response(serializer.data)

class Cart(APIView):
    def get(self, request):
        cart = Order.objects.get(account=1, active=True)
        serializer = OrderSerializer(cart, many=False)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        cart = Order.objects.create(account_id=1)
        cart.products.add(data['id'])
        cart.amount += data['product_price']
        cart.save()
        serializer = OrderSerializer(cart, many=False)
        return Response(serializer.data)
    
    def put(self, request):
        data = request.data
        cart = Order.objects.get(account_id=1, active=True)
        cart.products.add(data['id'])
        cart.amount = count_amount(cart.products.all())
        cart.save()
        serializer = OrderSerializer(cart, many=False)
        return Response(serializer.data)
    
    def delete(self, request):
        data = request.data
        cart = Order.objects.get(account_id=1, active=True)
        cart.products.remove(data['product_id'])
        cart.amount = count_amount(cart.products.all())
        cart.save()
        serializer = OrderSerializer(cart, many=False)
        return Response(serializer.data)

@api_view(['GET'])
def get_categories(request):
    categories = Categories.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

class FinishOrder(APIView):
    def post(self, request):
        print("WORKS!!!!!!!!!")
        data = request.data
        active_order = Order.objects.get(account=1)
        print(data)
        if data:
            finishing_order = FinishedOrder.objects.create(full_name=data['full_name'], address=data['address'], city=data['city'], amount=active_order.amount, account_id=1)
            for product in active_order.products.all():
                finishing_order.products.add(product.id)
            finishing_order.save()
            active_order.delete()
        return None