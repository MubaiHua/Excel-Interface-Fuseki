# Generated by Django 4.2.7 on 2023-12-04 00:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('excelinterface', '0003_remove_mappingmodel_csv_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='InportDataModel',
            new_name='ImportDataModel',
        ),
    ]
