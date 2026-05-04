import sys
import os
from dotenv import load_dotenv

# Add the backend directory to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

# Explicitly load .env from the backend directory
load_dotenv(os.path.join(os.getcwd(), 'backend', '.env'))

from app.core.database import engine
from sqlalchemy import text

def check_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version();"))
            row = result.fetchone()
            print(f"Connection successful!")
            print(f"PostgreSQL version: {row[0]}")
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    check_connection()
