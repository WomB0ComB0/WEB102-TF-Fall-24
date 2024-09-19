#!/bin/bash

for dir in */; do
  if [ -d "$dir" ]; then
    cd "$dir"
    if [ -d "node_modules" ]; then
      rm -rf node_modules
    fi
    bun install
    cd ..
  fi
done