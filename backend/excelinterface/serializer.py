from rest_framework import serializers
from .models import DatabaseModel, MappingModel, ImportDataModel, ExportDataModel


class DatabaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatabaseModel
        fields = '__all__'

class MappingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MappingModel
        fields = '__all__'

class ImportDataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportDataModel
        fields = '__all__'

class ExportDataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExportDataModel
        fields = '__all__'