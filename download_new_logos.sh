#!/bin/bash
mkdir -p public/logos
cd public/logos

declare -A urls=(
  ["framer.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/framer.svg"
  ["reacthookform.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/reacthookform.svg"
  ["zod.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/zod.svg"
  ["reactquery.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/reactquery.svg"
  ["radixui.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/radixui.svg"
  ["trpc.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/trpc.svg"
  ["jwt.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/jwt.svg"
  ["nginx.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/nginx.svg"
  ["githubactions.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/githubactions.svg"
  ["turborepo.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/turborepo.svg"
  ["eslint.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/eslint.svg"
  ["prettier.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/prettier.svg"
  ["jest.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/jest.svg"
  ["vitest.svg"]="https://raw.githubusercontent.com/pheralb/svgl/main/public/library/vitest.svg"
  ["websockets.svg"]="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg"
)

for file in "${!urls[@]}"; do
  url="${urls[$file]}"
  echo "Downloading $file..."
  curl -L -s -o "$file" "$url"
done

# Fallback for react query if it fails
if [ ! -s reactquery.svg ]; then
  curl -L -s -o reactquery.svg "https://raw.githubusercontent.com/TanStack/query/main/media/repo-header-logo.svg"
fi

