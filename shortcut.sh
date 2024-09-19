#!/bin/bash

directories=($(ls -d */))

if [ $# -eq 0 ]; then
    echo "Usage: source $0 <directory_number>"
    echo "Available directories:"
    for i in "${!directories[@]}"; do
        echo "$i: ${directories[$i]}"
    done
    return 1
fi

dir_num=$1

if ! [[ "$dir_num" =~ ^[0-9]+$ ]]; then
    echo "Error: Please provide a valid number." >&2
    return 1
fi

if [ "$dir_num" -ge 0 ] && [ "$dir_num" -lt ${#directories[@]} ]; then
    target_dir="${directories[$dir_num]}"
    echo "Changing to directory: $target_dir"
    cd "$target_dir" || return 1
else
    echo "Error: Invalid directory number. Please choose a number between 0 and $((${#directories[@]} - 1))." >&2
    return 1
fi