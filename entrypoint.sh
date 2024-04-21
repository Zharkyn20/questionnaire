#!/bin/bash

# Start server
echo "Starting server"

uvicorn backend.app.main:app --reload

exec "$@"
