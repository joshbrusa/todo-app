from django.http import JsonResponse, HttpResponse
from task.models import Task
import json

def read(request):
	return JsonResponse({'data': list(Task.objects.values())})

def readId(request, id):
	return JsonResponse({'data': str(Task.objects.get(id=id))})

def create(request):
	if request.method != 'POST':
		return JsonResponse({'ok': False})

	data = json.loads(request.body)

	if len(data['text']) == 0:
		return JsonResponse({'ok': False, 'message': 'Cannot be empty.'})

	Task.objects.create(text=data['text'])

	return JsonResponse({'ok': True})

def update(request):
	if request.method != 'PATCH':
		return JsonResponse({'ok': False})
	
	data = json.loads(request.body)

	if len(data['text']) == 0:
		return JsonResponse({'ok': False, 'message': 'Cannot be empty.'})

	Task.objects.filter(id=data['id']).update(text=data['text'])

	return JsonResponse({'ok': True})

def delete(request):
	if request.method != 'DELETE':
		return JsonResponse({'ok': False})
	
	data = json.loads(request.body)
	Task.objects.filter(id=data['id']).delete()

	return JsonResponse({'ok': True})