from django.shortcuts import render
from rest_framework.views import APIView
# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import csrf_exempt
from .scripts.process_data import processed_data,edit_data,get_data
from .models import UploadedFile
from django.http import JsonResponse
from rest_framework import status

# @method_decorator(csrf_exempt, name='dispatch')
class Data(APIView):
	def post(self,request):
			if 'file' not in request.FILES:
				return JsonResponse({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
			data=(request.FILES['file'])
			processed=processed_data(data,10)
			new_file=UploadedFile.objects.create(file=data)
			new_file.processed=processed
			new_file.save()
			print(processed)
			if (processed):
				return JsonResponse({"models_to_return": processed['data'],'total':processed['total']}, content_type='text/csv')
			return JsonResponse({'parse error'})
	
	def put(self, request):
            # Retrieve the latest uploaded file from the database
			try:
				print('put')
				column = request.data.get('column')
				index = int(request.data.get('index'))
				target_type = request.data.get('type')
				latest_uploaded_file = UploadedFile.objects.latest('uploaded_at')
				file_path = latest_uploaded_file.file.path
				processed = edit_data(file_path, target_type, column,index)
				print(file_path, processed, 'processed')
				return JsonResponse({'data': processed},status=200)
			except:
				return JsonResponse({'message': 'cannot convert type'}, status=400)

	def get(self, request,*args,**kwargs):
			print('i')
            # Retrieve the latest uploaded file from the database
			try:
				# print(request)
				index = int(request.GET.get('index'))
				target_type = request.GET.getlist('types', [])
				print(index,'index')
				latest_uploaded_file = UploadedFile.objects.latest('uploaded_at')
				file_path = latest_uploaded_file.file.path
				processed = get_data(file_path, target_type, index)
				# print(file_path, processed, 'processed')
				return JsonResponse({'models_to_return': processed},status=200)
			except:
				return JsonResponse({'message': 'cannot convert type'}, status=400)
		



