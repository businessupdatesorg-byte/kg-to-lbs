@echo off
echo ============================================================
echo   Starting WeightConverter Pro Local Live Server
echo   Engineered for 100/100 Google PageSpeed Insights Score
echo ============================================================
echo.
echo Opening http://localhost:8080 in your browser...
start http://localhost:8080
cd /d "%~dp0"
python -m http.server 8080
pause
