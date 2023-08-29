from django.db import models
from django.utils import timezone

from django.contrib.auth.models import User

class Categories(models.Model):
    category_name = models.CharField(max_length=50)

    def __str__(self):
        return self.category_name
    
class Product(models.Model):
    product_image = models.ImageField(upload_to='products/', blank=False)
    product_name = models.CharField(max_length=100)
    product_price = models.IntegerField(default=0)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)

    def __str__(self):
        return self.product_name
    
class Order(models.Model):
    products = models.ManyToManyField(Product, blank=True)
    amount = models.IntegerField(default=0)
    account = models.ForeignKey(User, on_delete=models.DO_NOTHING, unique=True)
    active = models.BooleanField(default=True)

class FinishedOrder(models.Model):
    full_name = models.CharField(max_length=150)
    address = models.CharField(max_length=250)
    city = models.CharField(max_length=100)
    products = models.ManyToManyField(Product, blank=False)
    amount = models.IntegerField()
    account = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    order_time = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return self.full_name