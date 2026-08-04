@echo off
setlocal

cd /d "%~dp0"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Node.js/npm was not found. Please install Node.js, then run this launcher again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing frontend dependencies. This may take a few minutes...
  call npm.cmd install
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting QuantPilot market data backend...
start "QuantPilot Market Data" cmd /k "cd /d ""%~dp0"" && npm.cmd run backend"

echo Opening QuantPilot frontend preview...
timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:3000"

if exist "node_modules\.bin\vite.cmd" (
  call "node_modules\.bin\vite.cmd" --host 127.0.0.1 --port 3000
) else (
  call npm.cmd run frontend
)
