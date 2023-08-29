from django.contrib import admin

from .models import Categories, Product, Order, FinishedOrder

admin.site.register(FinishedOrder)
admin.site.register(Categories)
admin.site.register(Product)
admin.site.register(Order)
