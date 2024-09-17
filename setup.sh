#!/bin/bash

labs=("Timetabled" "Samosa-Selector" "On-My-Grind" "Cap" "Crypto-Hustle-Lite" "Crypto-Hustle-Pro" "Bet")

count=0
for i in "${!labs[@]}"; do
    lab="${labs[$i]}"
    name="Lab-$((i + 1))-$lab"
    echo "Creating project: $name"
    
    npx create-vite "$name" --template react-swc-ts
done