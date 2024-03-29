# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-23 07:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slg', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroupPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_group_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('email', models.CharField(max_length=254)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserUserPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.SmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TbBills',
            fields=[
                ('gameorderid', models.BigAutoField(db_column='GameOrderId', primary_key=True, serialize=False)),
                ('giftid', models.CharField(db_column='GiftId', max_length=32)),
                ('producttype', models.CharField(db_column='ProductType', max_length=1)),
                ('productid', models.CharField(db_column='ProductId', max_length=32)),
                ('otherarg', models.IntegerField(db_column='OtherArg')),
                ('pricecurrencycode', models.CharField(db_column='PriceCurrencyCode', max_length=3)),
                ('priceamount', models.DecimalField(db_column='PriceAmount', decimal_places=2, max_digits=10)),
                ('uid', models.BigIntegerField(db_column='Uid')),
                ('zoneid', models.IntegerField(db_column='ZoneId')),
                ('os', models.IntegerField(db_column='Os')),
                ('accounttype', models.IntegerField(db_column='AccountType')),
                ('accountid', models.CharField(db_column='AccountId', max_length=32)),
                ('registertime', models.IntegerField(db_column='RegisterTime')),
                ('nickname', models.CharField(db_column='Nickname', max_length=100)),
                ('clientip', models.CharField(db_column='ClientIP', max_length=50)),
                ('countrycode', models.CharField(db_column='CountryCode', max_length=2)),
                ('purchasetimes', models.IntegerField(db_column='PurchaseTimes')),
                ('purchaseplatform', models.IntegerField(db_column='PurchasePlatform')),
                ('orderid', models.CharField(db_column='OrderId', max_length=50)),
                ('purchasetoken', models.CharField(db_column='PurchaseToken', max_length=120)),
                ('purchasestate', models.IntegerField(db_column='PurchaseState')),
                ('cancelreason', models.CharField(blank=True, db_column='CancelReason', max_length=10, null=True)),
                ('createtime', models.IntegerField(db_column='CreateTime')),
                ('purchasetime', models.IntegerField(db_column='PurchaseTime')),
                ('delivertime', models.IntegerField(db_column='DeliverTime')),
                ('inaccounttime', models.IntegerField(db_column='InAccountTime')),
            ],
            options={
                'db_table': 'tb_bills',
                'managed': False,
            },
        ),
    ]
