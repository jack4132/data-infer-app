# Project Name: Data Processing Web Application

## Description
This project is a web application developed using **Django** on the backend and **React** on the frontend. It allows users to upload CSV or Excel files, perform data processing operations such as editing data types of columns, and view the processed data in a table format.

## Features
- Upload CSV or Excel files.
- Edit data types of columns dynamically.
- View processed data in a table format.
- Pagination support for large datasets.
- Error handling for invalid file uploads or data processing operations.

## Technologies Used
- **Django** (Backend Framework)
- **React** (Frontend Library)
- **Axios** (HTTP client for making API requests)
- **Material-UI** (UI components library)
- **Papaparse** (CSV parser)
- **Django REST Framework** (API framework for Django)
- **PostgreSQL** (Database)

## Setup Instructions
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend directory: `cd backend`
3. Install Python dependencies: `pip install -r requirements.txt`
4. Apply database migrations: `python manage.py migrate`
5. Start the Django server: `python manage.py runserver`
6. Navigate to the frontend directory: `cd frontend`
7. Install Node.js dependencies: `npm install`
8. Start the React development server: `npm start`

## Usage
1. Visit [http://localhost:3000/](http://localhost:3000/) in your web browser to access the application.
2. Click on the "Upload" button to upload a CSV or Excel file.
3. After uploading the file, you can view the data in a table format.
4. Edit the data types of columns using the dropdown menus.
5. Pagination controls allow you to navigate through large datasets.
6. Errors are displayed as alerts at the bottom of the page for any issues encountered during file upload or data processing.

## Backend Testing
- Unit tests for the Django backend can be found in the `tests.py` file inside the `dataapp` directory.
- To run the tests, navigate to the backend directory and execute `python manage.py test`.

## Frontend Testing
- Unit tests for the frontend React components can be found in the `app.test.js` file inside the `frontend/src` directory.
- To run the tests, navigate to the frontend directory and execute `npm test`.
