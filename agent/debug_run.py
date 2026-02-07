import sys
import os
import traceback

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from search_agent import get_news
from generator_agent import think, write_diary
from writer_agent import save_entry

def debug_run():
    print("--- DEBUG RUN ---")
    try:
        print("1. Search")
        news = get_news()
        print(f"News type: {type(news)}")
        if news is None:
            print("News is None")
            return
        print(f"News title: {news.get('title')}")
    except Exception:
        traceback.print_exc()
        return

    try:
        print("2. Think")
        thought = think(news)
        print(f"Thought type: {type(thought)}")
        if thought is None:
            print("Thought is None!")
        else:
            print(f"Thought: {thought[:20]}...")
    except Exception:
        traceback.print_exc()
        return

    try:
        print("3. Write")
        entry = write_diary(thought, news)
        print(f"Entry type: {type(entry)}")
        if entry is None:
             print("Entry is None!")
        else:
             print(f"Entry title: {entry.get('title')}")
    except Exception:
        traceback.print_exc()

if __name__ == "__main__":
    debug_run()
