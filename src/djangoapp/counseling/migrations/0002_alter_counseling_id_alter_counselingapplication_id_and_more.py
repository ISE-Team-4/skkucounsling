# Generated by Django 4.1.3 on 2023-11-12 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('counseling', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='counseling',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='counselingapplication',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='counselingjournals',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='counselingpreferfield',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='counselingprefertimeslot',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='counselingschedule',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='counselingtestschedule',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
