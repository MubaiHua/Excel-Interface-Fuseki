# Generated by Django 4.2.7 on 2023-12-03 06:21

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DatabaseModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('graph_name', models.CharField(default='default', max_length=100, unique=True)),
                ('turtle_file', models.TextField()),
                ('prefix', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10000), default=list, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='MappingModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('query', models.TextField()),
                ('csv', models.JSONField(default=dict, help_text='csv data', null=True)),
                ('db_id', models.ForeignKey(help_text='database id', on_delete=django.db.models.deletion.CASCADE, related_name='db_id', to='excelinterface.databasemodel')),
            ],
        ),
        migrations.CreateModel(
            name='InportDataModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('csv', models.JSONField(default=dict, help_text='csv data', null=True)),
                ('query', models.TextField()),
                ('mapping_id', models.ForeignKey(help_text='mapping id', on_delete=django.db.models.deletion.CASCADE, related_name='mapping_id', to='excelinterface.mappingmodel')),
            ],
        ),
    ]