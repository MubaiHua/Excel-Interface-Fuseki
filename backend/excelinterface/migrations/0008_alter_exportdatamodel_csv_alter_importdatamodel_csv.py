# Generated by Django 4.2.7 on 2023-12-04 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('excelinterface', '0007_alter_exportdatamodel_csv_alter_importdatamodel_csv'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exportdatamodel',
            name='csv',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='importdatamodel',
            name='csv',
            field=models.TextField(),
        ),
    ]
