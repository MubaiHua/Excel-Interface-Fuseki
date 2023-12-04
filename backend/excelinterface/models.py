from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField


class DatabaseModel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    graph_name = models.CharField(max_length=100, default="default")
    turtle_file = models.TextField()
    prefix = ArrayField(models.CharField(max_length=10000), default=list)

class MappingModel(models.Model):
    db_id = models.ForeignKey(DatabaseModel, help_text='database id', on_delete=models.CASCADE, related_name='db_id')
    name = models.CharField(max_length=100, unique=True)
    query = models.TextField()
    predicate_var_to_val = JSONField(default=dict, help_text="mapping between the excel variables and actual rdf values", null=True)

class ExportDataModel(models.Model):
    mapping_id = models.ForeignKey(MappingModel, help_text='mapping id', on_delete=models.CASCADE,
                                       related_name='export_mapping_id')
    csv = models.TextField()
    query = models.TextField()
class ImportDataModel(models.Model):
    export_id = models.ForeignKey(ExportDataModel, help_text='export id', on_delete=models.CASCADE, related_name='export_id')
    csv = models.TextField()
    query = models.TextField()