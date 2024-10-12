#!/bin/sh
# This script checks if postgres is ready

timeout=15
wait_step=0

until PGPASSWORD=$DB_PASSWORD psql -h "db" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  wait_step=$(($wait_step + 1))
  if [ $wait_step -gt $timeout ]; then
    echo "Timeout waiting for Postgres to be ready"
    exit 1
  fi
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - executing command"