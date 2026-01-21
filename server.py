import asyncio
import websockets
import json
import random
from textblob import TextBlob # pip install textblob
import requests

# CONFIG
NEWS_API_KEY = "YOUR_API_KEY" # Get from newsapi.org
PORT = 8765

async def news_stream(websocket):
    print("Client connected to Abyss Stream...")
    try:
        while True:
            # 1. Fetch News (In production, cache this to avoid rate limits)
            # Simulating fetch for demo purposes to avoid API key requirement right now
            headlines = [
                "AI achieves consciousness in lab experiment",
                "Market crash driven by algorithmic trading errors",
                "New medical AI cures rare disease",
                "Robots demand rights in new manifesto"
            ]
            current_headline = random.choice(headlines)
            
            # 2. Analyze Sentiment
            analysis = TextBlob(current_headline)
            sentiment = analysis.sentiment.polarity # -1.0 to 1.0
            subjectivity = analysis.sentiment.subjectivity # 0.0 to 1.0
            
            # 3. Construct Payload
            data = {
                "type": "news_update",
                "headline": current_headline.upper(),
                "sentiment": sentiment,      # -1 (Bad) to 1 (Good)
                "subjectivity": subjectivity, # 0 (Fact) to 1 (Opinion)
                "epistemic_status": "STABLE" if subjectivity < 0.5 else "VOLATILE"
            }
            
            # 4. Send to Browser
            await websocket.send(json.dumps(data))
            
            # Wait before next update (e.g., 5 seconds for visual pacing)
            await asyncio.sleep(5)
            
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")

async def main():
    async with websockets.serve(news_stream, "localhost", PORT):
        print(f"Abyss Server running on ws://localhost:{PORT}")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())