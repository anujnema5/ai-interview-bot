# Use the official Python 3.11 slim image (Debian-based)
FROM python:3.11-slim

# Update system and install required system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libc6 \
    && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the required Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend folder to the working directory in the container
COPY . .

# Expose port 8000
EXPOSE 8000

# Run the FastAPI application with uvicorn on port 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]