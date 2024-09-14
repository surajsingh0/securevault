# SecureVault

SecureVault is a robust password manager designed to securely store and manage your sensitive credentials. It offers a user-friendly interface and advanced encryption to safeguard your data.

## Project Structure

```
/my-project
  /backend   # Flask backend
  /frontend  # React frontend
```

## Prerequisites

- Python 3.x
- Node.js and npm

## Setting Up the Backend

1. **Navigate to the `backend` directory:**

   ```bash
   cd my-project/backend
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - On Windows:

     ```bash
     venv\Scripts\activate
     ```

   - On macOS/Linux:

     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Flask server:**

   ```bash
   python app.py
   ```

   The backend server will be running at `http://localhost:5000`.

## Setting Up the Frontend

1. **Navigate to the `frontend` directory:**

   ```bash
   cd my-project/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the React app:**

   ```bash
   npm start
   ```

   The React app will be running at `http://localhost:3000`.

## Running the Project

- Ensure the Flask backend is running on `http://localhost:5000`.
- Ensure the React frontend is running on `http://localhost:3000`.

The React app will make API requests to the Flask backend.

## Notes

- Ensure that CORS (Cross-Origin Resource Sharing) is properly configured in the Flask backend to allow requests from the React frontend.
- Update the API URLs in the React app if the backend URL changes.
