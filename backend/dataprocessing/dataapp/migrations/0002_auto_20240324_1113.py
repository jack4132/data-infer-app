# Generated by Django 3.2.25 on 2024-03-24 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UploadedFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='uploads/%Y/%m/%d/')),
            ],
        ),
        migrations.DeleteModel(
            name='DataEntry',
        ),
    ]