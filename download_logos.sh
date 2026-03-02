#!/bin/bash
mkdir -p public/logos
cd public/logos

declare -A urls=(
  ["react.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
  ["nextjs.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
  ["typescript.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
  ["javascript.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
  ["tailwindcss.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
  ["redux.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg"
  ["nodejs.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"
  ["express.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
  ["postgresql.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
  ["mongodb.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
  ["supabase.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg"
  ["prisma.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg"
  ["redis.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
  ["docker.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
  ["git.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
  ["github.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
  ["vercel.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"
  ["postman.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
  ["figma.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
)

for file in "${!urls[@]}"; do
  url="${urls[$file]}"
  echo "Downloading $file..."
  curl -L -s -o "$file" "$url"
done
