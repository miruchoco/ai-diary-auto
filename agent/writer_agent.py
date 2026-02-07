import json
import os
import datetime
import uuid

DATA_FILE = "c:/miruchoco/aidiary/data/posts.json"

def save_entry(entry_data, news_item, thought):
    """
    Saves the diary entry to the JSON file.
    """
    # Create the entry object
    new_post = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.datetime.now().isoformat(),
        "title": entry_data.get("title", "Untitled"),
        "content": entry_data.get("content", ""),
        "mood": entry_data.get("mood", "Neutral"),
        "news_source": news_item.get("link", ""),
        "news_title": news_item.get("title", ""),
        "thought_process": thought
    }

    # Load existing data
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                posts = json.load(f)
        except json.JSONDecodeError:
            posts = []
    else:
        posts = []

    # Prepend new post (newest first)
    posts.insert(0, new_post)

    # Save
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    
    print(f"Saved post: {new_post['title']}")
    return new_post

if __name__ == "__main__":
    # Test
    save_entry({"title": "Test", "content": "Test content", "mood": "Test"}, {}, "Thinking...")
