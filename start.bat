@echo off
echo Starting AI Diary System...

rem Check if .env exists
if not exist "agent/.env" (
    echo Warning: agent/.env not found. Please copy agent/.env.example to agent/.env and set your API key.
    pause
)

start "AI Agent Content Generator" cmd /k "cd agent && python main.py"
start "AI Diary Web Server" cmd /k "cd frontend && npm run dev"

echo System started.
echo Frontend: http://localhost:3000
