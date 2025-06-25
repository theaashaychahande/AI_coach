import streamlit as st
import cv2
from deepface import DeepFace
import pandas as pd
import numpy as np
import sqlite3
from datetime import datetime
import threading

st.set_page_config(page_title="AI Coach", layout="wide")
st.title("🧠 Sentiment-Aware AI Coach")

# Sidebar Menu
menu = st.sidebar.selectbox("Menu", ["Dashboard", "Start Session", "History"])

# Initialize DB
def init_db():
    conn = sqlite3.connect('mood_log.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS mood_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            emotion TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Log emotion
def log_mood(emotion):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn = sqlite3.connect('mood_log.db')
    c = conn.cursor()
    c.execute("INSERT INTO mood_logs (timestamp, emotion) VALUES (?, ?)", (timestamp, emotion))
    conn.commit()
    conn.close()

# Webcam feed and emotion detection
def run_webcam():
    cap = cv2.VideoCapture(0)
    placeholder = st.empty()

    while True:
        ret, frame = cap.read()
        if not ret:
            st.error("Failed to access webcam.")
            break

        try:
            result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
            emotion = result[0]['dominant_emotion']
            log_mood(emotion)
            status_text = f"Current Mood: {emotion.capitalize()}"
        except Exception as e:
            emotion = "Unknown"
            status_text = "Detecting..."

        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        placeholder.image(frame, channels="RGB", caption=status_text)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()

if menu == "Dashboard":
    st.header("Welcome Back!")
    st.write("I'm your AI Coach — I'll help you stay focused, motivated, and emotionally aware.")

elif menu == "Start Session":
    st.header("Let’s Start Your Session")
    st.write("Smile! I'm watching your emotions...")
    run_webcam()

elif menu == "History":
    st.header("Your Mood History")
    conn = sqlite3.connect('mood_log.db')
    df = pd.read_sql_query("SELECT * FROM mood_logs ORDER BY timestamp DESC LIMIT 100", conn)
    conn.close()

    if not df.empty:
        st.dataframe(df)
        st.bar_chart(df['emotion'].value_counts())
    else:
        st.info("No mood data yet. Start a session to begin tracking.")