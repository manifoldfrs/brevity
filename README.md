# Brevity
LLM Content Summarizer

# Brevity
LLM Content Summarizer

## Local Setup

### Frontend

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Start the Development Server**

   ```bash
   npm start
   ```
4. **Access the App**
   Open your browser and go to `http://localhost:3000`

### Backend

1. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```
2. **Create a Virtual Environment**

   ```bash
   python3 -m venv env
   ```
3. **Activate the Virtual Environment**
   - **On macOS/Linux:**

     ```bash
     source env/bin/activate
     ```
   - **On Windows:**

     ```bash
     .\env\Scripts\activate
     ```
4. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```
5. **Set Up Environment Variables**

   - Create a `.env` file in the `backend` directory.
   - Add your OpenRouter API key:
     ```
     OPENROUTER_API_KEY=your_api_key_here
     ```
6. **Start the Backend Server**

   ```bash
   uvicorn server:app --reload
   ```
7. **Access the Backend**
   The server runs at `http://localhost:8000`

### Convex

1. **Install Convex CLI**

   ```bash
   npm install -g convex
   ```
2. **Log In to Convex**

   ```bash
   convex login
   ```
3. **Navigate to the Convex Directory**

   ```bash
   cd convex
   ```
4. **Deploy the Schema**

   ```bash
   convex deploy
   ```
5. **Start the Convex Dev Server**

   ```bash
   convex dev
   ```
6. **Access Convex**
   The Convex functions are now ready to use.

## Running the Full Application

1. **Start All Services**

   - Ensure the backend server and Convex dev server are running.
   - Start the frontend as described above.

2. **Use the Application**

   Open your browser and go to `http://localhost:3000` to start using Brevity.
