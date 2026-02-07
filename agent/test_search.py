import feedparser
import urllib.parse
import random

def test_search():
    topic = "AI OR Technology"
    encoded_topic = urllib.parse.quote(topic)
    rss_url = f"https://news.google.com/rss/search?q={encoded_topic}&hl=ja&gl=JP&ceid=JP:ja"
    
    print(f"URL: {rss_url}")
    
    try:
        feed = feedparser.parse(rss_url)
        print(f"Feed status: {feed.get('status')}")
        print(f"Feed entries: {len(feed.entries)}")
        
        if feed.entries:
            entry = feed.entries[0]
            print(f"Sample Entry Title: {entry.title}")
            print(f"Sample Entry Link: {entry.link}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_search()
