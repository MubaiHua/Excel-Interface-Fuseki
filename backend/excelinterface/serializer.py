from rest_framework import serializers
from .models import DatabaseModel, MappingModel, InportDataModel


class DatabaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatabaseModel
        fields = '__all__'

class MappingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MappingModel
        fields = '__all__'

class InportDataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = InportDataModel
        fields = '__all__'
