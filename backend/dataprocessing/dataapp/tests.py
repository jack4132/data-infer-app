from django.test import TestCase, Client
from django.urls import reverse
from dataapp.models import UploadedFile
from django.core.files.uploadedfile import SimpleUploadedFile
import json

class DataViewTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_post_data_with_file(self):
        file_content = b"some,file,content"
        file = SimpleUploadedFile("test.csv", file_content)
        
        response = self.client.post(reverse('upload_data'), {'file': file}, format='multipart/form-data')

        self.assertEqual(response.status_code, 200)
        self.assertIn(b"some,file,content", response.content)

    def test_post_data_without_file(self):
        response = self.client.post(reverse('upload_data'))
        
        self.assertEqual(response.status_code, 400)
        self.assertIn(b"No file uploaded", response.content)

    def test_put_data_with_invalid_params(self):
        UploadedFile.objects.create(file='/Users/jacksonthounaojam/Desktop/rhombus.ai/backend/dataprocessing/uploads/2024/03/25/test_-_Sheet1_1_bECRQ9S.csv/')

        data = {'column': 'Name', 'type': 'object'}
        response = self.client.put(reverse('edit_data'), data=json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        # Add more assertions as needed

    def test_put_data_with_invalid_params(self):
        response = self.client.put(reverse('edit_data'))
        
        self.assertEqual(response.status_code, 400)
