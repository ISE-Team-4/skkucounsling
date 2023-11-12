
# Generated by Django 4.1.3 on 2023-11-12 18:15


from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [

        ('common', '0007_alter_user_id'),

    ]

    operations = [
        migrations.CreateModel(
            name='Counseling',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='CounselingApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('application_file', models.FileField(upload_to='application')),
                ('applied_at', models.DateTimeField(auto_now_add=True)),
                ('counseling_type', models.CharField(max_length=30)),

                ('approved', models.BooleanField(default=False)),
                ('denied', models.BooleanField(default=False)),

                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='common.student')),
            ],
        ),
        migrations.CreateModel(
            name='CounselingTestSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('timeslot', models.CharField(max_length=10)),
                ('counseling', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='counseling.counseling')),
            ],
        ),
        migrations.CreateModel(
            name='CounselingSchedule',
            fields=[

                ('id', models.IntegerField(primary_key=True, serialize=False)),

                ('session_date', models.DateField()),
                ('session_timeslot', models.CharField(max_length=10)),
                ('session_number', models.IntegerField()),
                ('session_status', models.CharField(max_length=10)),
                ('counseling', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='counseling.counseling')),
            ],
        ),
        migrations.CreateModel(
            name='CounselingPrefertimeslot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timeslot', models.CharField(max_length=10)),
                ('counseling_application', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='counseling.counselingapplication')),
            ],
        ),
        migrations.CreateModel(

            name='CounselingPreferfield',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('field', models.CharField(max_length=100)),
                ('counseling_application', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='counseling.counselingapplication')),
            ],
        ),
        migrations.CreateModel(

            name='CounselingJournals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback', models.CharField(max_length=300)),

                ('counseling_schedule', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='counseling.counselingschedule')),

            ],
        ),
        migrations.AddField(
            model_name='counseling',
            name='counseling_application',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='counseling.counselingapplication'),
        ),
        migrations.AddField(
            model_name='counseling',
            name='counselor',

            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='common.counselor'),

        ),
        migrations.AddField(
            model_name='counseling',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='common.student'),
        ),
    ]
