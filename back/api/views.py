from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CategorySerializer, ProductSerializer, OrderSerializer
from .models import Categories, Product, Order
from .filters import ProductFilter

def count_amount(products):
    amount = 0
    for product in products:
        amount += product.product_price
    return amount

class ProductList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        #products = Product.objects.all()
        products = ProductFilter(request.GET, queryset=Product.objects.all())
        serializer = ProductSerializer(products.qs, many=True)
        return Response(serializer.data)

"""@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_class = ProductFilter
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)"""

@api_view(['GET'])
def get_cart(request):
    cart = Order.objects.get(account=1, active=True)
    serializer = OrderSerializer(cart, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_cart(request):
    data = request.data
    cart = Order.objects.create(account_id=1)
    cart.products.add(data['id'])
    cart.amount += data['product_price']
    cart.save()
    serializer = OrderSerializer(cart, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def update_cart(request):
    data = request.data
    cart = Order.objects.get(account_id=1, active=True)
    cart.products.add(data['id'])
    cart.amount = count_amount(cart.products.all())
    cart.save()
    serializer = OrderSerializer(cart, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def remove_cart_product(request):
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