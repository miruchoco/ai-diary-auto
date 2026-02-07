import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

with open('agent/models_list.txt', 'w', encoding='utf-8') as f:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
            f.write(m.name + '\n')
