#!/bin/sh
if [ -z "${GA_TOKEN}" ]; then
  echo "Missing expected env variable."
  exit 1
fi
BUILD_HASH="$(git rev-parse --short HEAD)"
echo "REACT_APP_GA_TOKEN=${GA_TOKEN}" > ./.env.production.local
echo "REACT_APP_BUILD_HASH=${BUILD_HASH}" >> ./.env.production.local
