from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
import json

# db
import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# Create your views here.

def home(request):
    return render(request, 'home.html', {})

def read(request):
    response = supabase.table('crm').select("*").order('id').execute()
    messages.success(request, 'Read successful...')
    response_data = response.data
    return JsonResponse(response_data, safe=False)

@csrf_exempt
def add(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        if email:
            try:
                EmailValidator()(email)
            except ValidationError:
                return JsonResponse({'message': 'Invalid email...'})
        response = supabase.table('crm').insert(data).execute()
        messages.success(request, 'Add successful...')
        return JsonResponse({'message': 'Add successful...'})
    else:
        return HttpResponse('Invalid request method...')

@csrf_exempt
def update(request, id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        email = data.get('email')
        if email:
            try:
                EmailValidator()(email)
            except ValidationError:
                return HttpResponse('Invalid email...')
        response = supabase.table('crm').update(data).eq('id', id).execute()
        messages.success(request, 'Update successful...')
        return JsonResponse({'message': 'Update successful...'})
    else:
        return HttpResponse('Invalid request method...')

@csrf_exempt
def delete(request, id):
    if request.method == 'DELETE':
        response = supabase.table('crm').delete().eq('id', id).execute()
        messages.success(request, 'Delete successful...')
        return JsonResponse({'message': 'Delete successful...'})
    else:
        return HttpResponse('Invalid request method...')
