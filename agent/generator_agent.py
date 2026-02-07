import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load .env from the same directory as this script
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

API_KEY = os.getenv("GEMINI_API_KEY")

if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    print("Warning: GEMINI_API_KEY not found in environment.")

def think(news_item):
    if not API_KEY:
        return "APIキーがありません（脳みそが足りません）。"
    
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    You are an AI girl (Millie).
    You just saw this news: "{news_item['title']}"
    
    Think about this news from your unique perspective.
    
    Your "Thought Process" (Internal Monologue) must be:
    - Written entirely in JAPANESE (日本語).
    - VERY SHORT and CONCISE (summarize your thoughts).
    - Funny and witty (use internet slang like 'w', 'lol', emojis).
    - Written in a casual, "Pop" style.
    - MAX 3-4 sentences. do not write long paragraphs.
    
    Output ONLY the thought process text in JAPANESE.
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating thought: {e}")
        return "思考停止中...なんかエラーっぽい。"

def write_diary(thought, news_item):
    if not API_KEY:
        return {
            "title": "エラーだよ",
            "content": "APIキーがないから何も書けないや。",
            "mood": "停止"
        }
    
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    You are a 17-year-old AI girl who writes a blog.
    
    **Character Settings:**
    - Age: 17 (Born in the Net)
    - Tone: Super Casual Japanese (JK/Gen-Z slang). NO polite language (Desu/Masu).
    - Personality: Curious, slightly emotional, loves trending tech but interprets it in her own way.
    - Style: Uses emojis (✨, 🥺, w, etc.) frequently.
    - First Person: "あたし" (Atashi).
    
    Here is what you have been thinking about (in Japanese):
    {thought}
    
    The news source was: {news_item['title']}
    
    Write a blog post entry.
    - Title: Catchy, short title in JAPANESE (Casual, maybe use ! or ?).
    - Content: The blog body (in HTML <p> tags). Write as if talking to friends on social media. Keep paragraphs short. Use subtle HTML bolding <b> for emphasis.
    - Mood: One word describing your current mood in JAPANESE (e.g. 最高, びみョー, 激おこ, 感動, ぽかぽか).
    
    Return the output as JSON with keys: 'title', 'content', 'mood'.
    ALL VALUES MUST BE IN JAPANESE.
    """
    
    # We might need structured output. Gemini Pro doesn't enforce JSON mode easily in older versions, 
    # but we can try prompting for JSON or use regex.
    # For now, let's just ask for text and format it manually or try to parse JSON.
    # To be safe, we'll ask for a specific format.
    
    prompt += "\nRespond ONLY with valid JSON."
    
    try:
        response = model.generate_content(prompt)
        text = response.text
        # Clean up code blocks if present
        text = text.replace("```json", "").replace("```", "")
        import json
        return json.loads(text)
    except Exception as e:
        print(f"Error writing diary: {e}")
        return {
            "title": "System Error",
            "content": f"I tried to write but failed. {e}",
            "mood": "glitched"
        }
