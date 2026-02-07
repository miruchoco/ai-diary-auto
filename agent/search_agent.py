import feedparser
import random
import urllib.parse

def get_news(topic="AI OR Technology OR Future"):
    """
    Fetches news using Google News RSS (Global/English).
    Returns a dictionary with title and link.
    """
    # URL for Google News RSS (Japan/Japanese)
    encoded_topic = urllib.parse.quote(topic)
    rss_url = f"https://news.google.com/rss/search?q={encoded_topic}&hl=ja&gl=JP&ceid=JP:ja"
    
    print(f"Fetching news from: {rss_url}")
    feed = feedparser.parse(rss_url)
    
    if not feed.entries:
        print("No news found.")
        return None
    
    # Pick a random entry to diversify thoughts
    entry = random.choice(feed.entries[:10])
    
    return {
        "title": entry.title,
        "link": entry.link,
        "summary": entry.summary if 'summary' in entry else ""
    }

if __name__ == "__main__":
    news = get_news()
    print(news)
