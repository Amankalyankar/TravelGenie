# TravelGenie ✈️

TravelGenie is an AI-powered travel itinerary generator that creates personalized, day-by-day travel plans. 


## About The Project

Planning a trip can be overwhelming. TravelGenie simplifies this process by acting as your personal travel assistant. Simply provide your destination, the length of your trip, and your interests, and the AI will craft a detailed, realistic, and logistically sound itinerary.

A key feature of this project is its commitment to factual accuracy. By first verifying the destination with the Google Maps Geocoding API, it provides the AI with a grounded context, significantly reducing the chance of recommending non-existent "hallucinated" locations.

## Features

- **AI-Powered Itinerary Generation:** Leverages the speed and power of the Groq API with the `meta-llama/llama-4-scout` model.
- **Geographical Accuracy:** Integrates the Google Maps Geocoding API to provide real-world context to the AI.
- **Personalized Plans:** Tailors suggestions based on user-provided interests and incorporates any pre-existing plans.
- **Dynamic & Responsive UI:** A modern user experience built with React, TypeScript, and Tailwind CSS.
- **Markdown Rendering:** Displays the generated itinerary in a clean, readable, and beautifully formatted layout.

---

## Technology Stack

| Component | Technology                                                              |
| :-------- | :---------------------------------------------------------------------- |
| **Backend** | Python, Flask, Groq API, Google Maps API                                |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, shadcn/ui                        |

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (which includes npm)
* [Python 3.x](https://www.python.org/downloads/)
* [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/Aman-627/TravelGenie.git
    cd TravelGenie
    ```

2.  **Backend Setup**

    * Navigate to the backend directory:
        ```sh
        cd backend
        ```
    * Create and activate a Python virtual environment:
        * **On macOS/Linux:**
            ```sh
            python3 -m venv venv
            source venv/bin/activate
            ```
        * **On Windows:**
            ```sh
            python -m venv venv
            .\venv\Scripts\activate
            ```
    * Create a `requirements.txt` file with the following content:
        ```txt
        Flask
        Flask-Cors
        python-dotenv
        groq
        googlemaps
        ```
    * Install the required Python packages:
        ```sh
        pip install -r requirements.txt
        ```

3.  **Frontend Setup**
    * From the root `TravelGenie` directory, navigate to the frontend folder:
        ```sh
        cd frontend
        ```
    * Install the required npm packages:
        ```sh
        npm install
        ```

---

## Environment Variables

This project requires API keys to function.

1.  In the `backend` directory, create a new file named `.env`.
2.  Add the following lines to it, replacing the placeholder text with your actual API keys:
    ```env
    GROQ_API_KEY="your_groq_api_key_here"
    GOOGLE_MAPS_API_KEY="your_google_maps_api_key_here"
    ```
    * You can get a Groq API key from the [Groq Console](https://console.groq.com/keys).
    * You can get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis). Make sure to enable the **Geocoding API**.

---

## Running the Application

1.  **Start the Backend Server**
    * In your terminal, make sure you are in the `backend` directory and your virtual environment is activated.
    * Run the Flask application:
        ```sh
        python app.py
        ```
    * Your backend will be running on `http://127.0.0.1:5000`.

2.  **Start the Frontend Server**
    * Open a **new terminal window**.
    * Navigate to the `frontend` directory.
    * Run the React development server:
        ```sh
        npm run dev
        ```
    * Your frontend will be running on `http://localhost:5173`. Open this URL in your browser to use TravelGenie.
