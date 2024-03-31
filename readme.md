Project Name: Data Processing Web Application
Description:
This project is a web application developed using Django on the backend and React on the frontend. It allows users to upload CSV or Excel files, perform data processing operations such as editing data types of columns, and view the processed data in a table format.

Features:
Upload CSV or Excel files.
Edit data types of columns dynamically.
View processed data in a table format.
Pagination support for large datasets.
Error handling for invalid file uploads or data processing operations.
Technologies Used:
Django (Backend Framework)
React (Frontend Library)
Axios (HTTP client for making API requests)
Material-UI (UI components library)
Papaparse (CSV parser)
Django REST Framework (API framework for Django)
PostgreSQL (Database)
Setup Instructions:
Clone the repository: git clone <repository-url>
Navigate to the backend directory: cd backend
Install Python dependencies: pip install -r requirements.txt
Apply database migrations: python manage.py migrate
Start the Django server: python manage.py runserver
Navigate to the frontend directory: cd frontend
Install Node.js dependencies: npm install
Start the React development server: npm start
Usage:
Visit http://localhost:3000/ in your web browser to access the application.
Click on the "Upload" button to upload a CSV or Excel file.
After uploading the file, you can view the data in a table format.
Edit the data types of columns using the dropdown menus.
Pagination controls allow you to navigate through large datasets.
Errors are displayed as alerts at the bottom of the page for any issues encountered during file upload or data processing.
Backend Testing:
Unit tests for the Django backend can be found in the tests.py file inside the dataapp directory.
To run the tests, navigate to the backend directory and execute python manage.py test.
Frontend Testing:
Unit tests for the frontend React components can be found in the app.test.js file inside the frontend/src directory.
To run the tests, navigate to the frontend directory and execute npm test.
