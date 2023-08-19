import django_filters
from .models import Categories, Product, Order

class ProductFilter(django_filters.FilterSet):
    class Meta:
        model = Product
        fields = ['product_name', 'product_price_min', 'product_price_max']

    #product_name = django_filters.CharFilter(field_name='product_name', lookup_expr='icontains')
    
    product_price_min = django_filters.NumberFilter(field_name='product_price',
                                                     lookup_expr='gte')
    
    product_price_max = django_filters.NumberFilter(field_name='product_price',
                                                     lookup_expr='lte')