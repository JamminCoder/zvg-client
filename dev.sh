#!/usr/bin/bash

npm start
npx tailwindcss -i src/css/input.css -o public/css/tailwind.css --minify --watch
