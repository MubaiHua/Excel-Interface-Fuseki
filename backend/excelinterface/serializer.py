from rest_framework import serializers
from .models import DatabaseModel, MappingModel, ImportDataModel, ExportDataModel

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Get the 'fields' argument from the serializer context
        fields = kwargs.pop('fields', None)
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields:
            # Drop any fields that are not specified in the 'fields' argument
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    class Meta:
        abstract = True

class DatabaseModelSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = DatabaseModel
        fields = '__all__'

class MappingModelSerializer(DynamicFieldsModelSerializer):
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