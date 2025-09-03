import os
import googlemaps
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app) 

# Initialize API clients
try:
    groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    gmaps_client = googlemaps.Client(key=os.environ.get("GOOGLE_MAPS_API_KEY"))
except Exception as e:
    print(f"Error initializing API clients: {e}")
    groq_client = None
    gmaps_client = None

@app.route("/api/generate-itinerary", methods=["POST"])
def generate_itinerary():
    if not groq_client or not gmaps_client:
        return jsonify({"error": "API clients not configured"}), 500

    # Get data from the request
    data = request.get_json()
    destination = data.get("destination")
    duration = data.get("duration")
    interests = data.get("interests")
    plans = data.get("plans", "") 

    if not all([destination, duration, interests]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # 1. Geocode destination for more context
        geocode_result = gmaps_client.geocode(destination)
        if geocode_result:
            formatted_address = geocode_result[0]['formatted_address']
            location_context = f"The user wants to go to {formatted_address}."
        else:
            location_context = f"The user wants to go to {destination}."

        # 2. --- FIX: Added a new rule for logistical feasibility and travel time ---
        system_prompt = f"""
You are a meticulous and fact-based travel planner. Your primary goal is absolute geographical and factual accuracy.

**NON-NEGOTIABLE RULES:**
1.  **No Invention:** You are strictly forbidden from inventing names of places, museums, restaurants, or any landmarks. Every recommendation MUST be a real, verifiable location.
2.  **Strict Location Constraint:** ALL recommendations MUST be located strictly within the city of **'{destination}'**.
3.  **Admit When Unsure:** If you cannot find a real location within **'{destination}'** that perfectly matches the user's niche interests (e.g., a specific "vintage car museum"), you MUST state that a specific museum of that type doesn't exist in the city. Then, suggest the closest available real alternative or a general activity. Do NOT create a fictional name.
4.  **Logistical Feasibility:** You MUST create a realistic schedule, considering travel time and grouping nearby attractions. Day trips should consume the entire day.
"""

        user_prompt = f"""
        Please create a travel itinerary based on these details, following all of your rules.

        - **Destination:** {destination}
        - **Trip Duration:** {duration}
        - **Traveler's Interests:** {interests}
        - **Location Context from Google Maps:** {location_context}
        """
        
        if plans:
            user_prompt += f"\n- **Existing Plans to Incorporate:** The traveler has these existing plans that you MUST build the schedule around: '{plans}'."

        user_prompt += """

        Please provide a day-by-day plan. Format the output clearly with markdown for headings (e.g., ## Day 1) and bolding for names (e.g., **Shaniwar Wada**).
        """

        # 3. Call Groq AI API
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                }
            ],
            model="llama3-8b-8192",
        )

        itinerary = chat_completion.choices[0].message.content
        return jsonify({"itinerary": itinerary})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to generate itinerary"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)