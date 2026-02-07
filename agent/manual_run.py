import sys
import os

# Ensure we can import from local modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from search_agent import get_news
from generator_agent import think, write_diary
from writer_agent import save_entry

def manual_run():
    print("--- Starting Manual Agent Run ---")
    
    # 1. Search
    print("1. Searching for news...")
    try:
        news = get_news()
    except Exception as e:
        print(f"Search failed: {e}")
        return

    if not news:
        print("No news found.")
        return
    print(f"Found: {news['title']}")
    
    # 2. Think
    print("2. Thinking about it...")
    try:
        thought = think(news)
        print(f"Thought: {thought[:50]}...")
    except Exception as e:
        print(f"Think failed: {e}")
        return
    
    # 3. Write
    print("3. Writing diary...")
    try:
        entry_data = write_diary(thought, news)
        print(f"Written: {entry_data.get('title')}")
    except Exception as e:
         print(f"Write failed: {e}")
         return
    
    # 4. Save
    print("4. Saving to database...")
    if entry_data and 'content' in entry_data:
        saved_post = save_entry(entry_data, news, thought)
        print(f"Success! Saved entry ID: {saved_post['id']}")
    else:
        print("Failed to generate valid entry data.")

if __name__ == "__main__":
    manual_run()
