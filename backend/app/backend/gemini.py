import requests


from google.oauth2 import service_account

from backend.app.backend.config import gemini_api_key_path, gemini_api_url, google_credentials_url

# Path to your service account key JSON file
# key_path = gemini_api_key_path
#
# # Load credentials from the service account key file
# credentials = service_account.Credentials.from_service_account_file(
#     key_path,
#     scopes=[google_credentials_url]
# )
#
# # Obtain an access token using the credentials
# access_token = credentials.token

# print(access_token)
# print(type(access_token))
# Use the access token in your API requests
# headers = {
#     "Authorization": f"Bearer {access_token}",
#     "Content-Type": "application/json"
# }

# Define the URL endpoint with placeholders for region and project ID
url = gemini_api_url

# Define your request payload (JSON format)
payload = {
  "question": "How do I use the Vertex AI API?",
  "context": "I want to generate quizzes programmatically.",
  "options": ["Option A", "Option B", "Option C", "Option D"]
}


# Define your authentication credentials (if required)
# headers = {
#     "Authorization": "fBearer {}",
#     "Content-Type": "application/json"
# }
#
# # Send the POST request
def gemini():
    response = requests.post(url, json=payload)

    # Check the response status
    if response.status_code == 200:
        print("Request successful!")
        # Process the response data if needed
        print(response.json())
    else:
        print("Error:", response.text)
