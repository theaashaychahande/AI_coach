from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from webcam.emotion_detection import start_emotion_detection
import threading

app = FastAPI()

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Webcam toggle endpoint
@app.post("/api/webcam")
async def toggle_webcam(data: dict):
    is_on = data.get("isOn")
    if is_on:
        print("Webcam turned ON. Starting emotion detection...")
        # Run emotion detection in a separate thread to avoid blocking the server
        threading.Thread(target=start_emotion_detection, daemon=True).start()
    else:
        print("Webcam turned OFF.")
    return {"status": "success"}

# WebSocket chat endpoint
@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        # Process AI chat response here
        response = f"AI: You said {data}"
        await websocket.send_text(response)