@echo off
echo Installing Python dependencies...
cd agent
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing Python requirements.
    exit /b
)

echo.
echo Installing Frontend dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing Node modules.
    exit /b
)

echo.
echo Setup complete.
timeout /t 5
