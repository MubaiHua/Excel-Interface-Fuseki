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
    query = models.TextField()
    csv = JSONField(default=dict, help_text="csv data", null=True)

class InportDataModel(models.Model):
    mapping_id = models.ForeignKey(MappingModel, help_text='mapping id', on_delete=models.CASCADE, related_name='mapping_id')
    csv = JSONField(default=dict, help_text="csv data", null=True)
    query = models.TextField()
