#!/bin/sh
if [ -z "${GA_TOKEN}" ]; then
  echo "Missing expected env variable."
  exit 1
fi
echo "REACT_APP_GA_TOKEN=${GA_TOKEN}" > ./.env.production.local
