# AI Diary Project

This project consists of an AI agent that automatically writes diary entries based on news, and a Next.js website to display them.

## Prerequisites
- Node.js
- Python 3.8+
- Gemini API Key

## Setup
1. Run `setup.bat` to install dependencies.
2. Go to `agent/` folder, copy `.env.example` to `.env` and paste your Gemini API Key.

## Usage
Run `start.bat` to launch both the Agent (runs every 4 hours) and the Web Server.

## Directory Structure
- `frontend/`: The Next.js website (http://localhost:3000).
- `agent/`: Python scripts for the AI.
- `data/`: Storage for diary entries (`posts.json`).
