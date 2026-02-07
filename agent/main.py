import schedule
import time
import os
import sys

# Ensure we can import from local modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import agent modules
from search_agent import get_news
from generator_agent import think, write_diary
from writer_agent import save_entry

def job():
    print("Starting diary generation job...")
    try:
        # 1. Search for news
        news = get_news()
        if not news:
            print("No news found, skipping.")
            return
        print(f"Found news: {news['title']}")

        # 2. Think about it
        thought = think(news)
        print("Thought process completed.")

        # 3. Write diary
        entry = write_diary(thought, news)
        print("Diary entry generated.")

        # 4. Save to file
        save_entry(entry, news, thought)
        print("Diary entry saved.")
        pass
    except Exception as e:
        print(f"Error in job: {e}")

def main():
    print("AI Diary Agent Started.")
    # Schedule the job every 4 hours
    schedule.every(4).hours.do(job)
    
    # Also run once immediately for testing if needed
    # job()

    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    main()
