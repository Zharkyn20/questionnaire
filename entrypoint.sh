#!/bin/bash

# Start server
echo "Starting server"

uvicorn backend.app.main:app --reload --host 0.0.0.0.0 --port 8000

exec "$@"
