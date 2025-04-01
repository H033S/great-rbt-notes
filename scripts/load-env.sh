#!/bin/bash

FILE="$1"

if [ "$FILE" = "" ]; then
    echo "Expected `path` to env file"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "File `$FILE` does not exits"
    exit 1
fi

while IFS="=" read -r name value; do
    export "$name"="$value"
    echo "Exported $name"
done < $FILE
