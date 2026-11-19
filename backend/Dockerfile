# 1. Use an official, specific Python slim image to keep the footprint small
FROM python:3.12-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only dependency definitions first to maximize Docker build caching
COPY requirements.txt .

# 4. Copy only dependency definitions first to maximize Docker build caching
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code
COPY app/ ./app/

# 6. Expose the port your application listens on (e.g., 8000)
EXPOSE 8000

# 7. Define the default startup command
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
