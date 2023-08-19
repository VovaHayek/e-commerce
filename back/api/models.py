from django.db import models

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
    account = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

