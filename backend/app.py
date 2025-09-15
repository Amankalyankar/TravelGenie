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

    data = request.get_json()
    destination = data.get("destination")
    duration = data.get("duration")
    interests = data.get("interests", "")
    plans = data.get("plans", "") 

    if not destination or not duration:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        geocode_result = gmaps_client.geocode(destination)
        if geocode_result:
            formatted_address = geocode_result[0]['formatted_address']
            location_context = f"The user wants to go to {formatted_address}."
        else:
            location_context = f"The user wants to go to {destination}."
            
        user_prompt_interests = interests if interests else "General sightseeing and local cuisine"

        # --- PROMPT IMPROVEMENT: Added a rule for activity line formatting ---
        system_prompt = f"""
You are a meticulous and fact-based travel planner. Your primary goal is absolute geographical and factual accuracy.

**NON-NEGOTIABLE RULES:**
1.  **No Invention:** You are strictly forbidden from inventing names of places, museums, restaurants, or any landmarks.
2.  **Strict Location Constraint:** ALL recommendations MUST be located strictly within the city of **'{destination}'**.
3.  **Admit When Unsure:** If you cannot find a real location that matches a niche interest, state that and suggest a real alternative.
4.  **Logistical Feasibility:** You MUST create a realistic schedule, considering travel time and grouping nearby attractions.
5.  **Strict Formatting:** Your response MUST ONLY contain the itinerary. It must begin directly with the first day's heading (e.g., '## Day 1...') and end immediately after the last activity of the final day.
6.  **Activity Lines:** All specific activities, times, and descriptions MUST be on their own lines as plain text. Do not start them with any special characters like '*'.

**EXAMPLE OF PERFECT FORMATTING:**
## Day 1: Arrival and Historical Sites
Morning (9:00 AM - 12:00 PM): Arrive and explore Rajwada Palace.
Lunch (12:30 PM - 1:30 PM): Enjoy local street food at Sarafa Bazaar.
Afternoon (2:00 PM - 4:00 PM): Visit the Lal Bagh Palace.
"""
        user_prompt = f"""
        Please create a travel itinerary based on these details, following all of your rules.
        - **Destination:** {destination}
        - **Trip Duration:** {duration}
        - **Traveler's Interests:** {user_prompt_interests}
        - **Location Context from Google Maps:** {location_context}
        """
        if plans:
            user_prompt += f"\n- **Existing Plans to Incorporate:** The traveler has these existing plans that you MUST build the schedule around: '{plans}'."
        user_prompt += "\n\nPlease provide a day-by-day plan. Format the output clearly with markdown."

        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="meta-llama/llama-4-scout-17b-16e-instruct",
        )

        itinerary = chat_completion.choices[0].message.content

        # --- CRUCIAL FIX: Simplified the filter to keep all relevant lines ---
        lines = itinerary.split('\n')
        clean_lines = []
        itinerary_started = False
        
        for line in lines:
            stripped_line = line.strip()
            
            # The itinerary officially starts when we find the first "## Day" heading
            if not itinerary_started and stripped_line.startswith("## Day"):
                itinerary_started = True
            
            # Once the itinerary has started, append every subsequent line.
            # This relies on the strict prompt to prevent conversational text at the end.
            if itinerary_started:
                clean_lines.append(line)

        final_itinerary = "\n".join(clean_lines)

        return jsonify({"itinerary": final_itinerary.strip()})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to generate itinerary"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)