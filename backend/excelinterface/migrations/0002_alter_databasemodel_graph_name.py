# Generated by Django 4.2.7 on 2023-12-03 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('excelinterface', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='databasemodel',
            name='graph_name',
            field=models.CharField(default='default', max_length=100),
        ),
    ]
