#!/bin/bash

echo "🚀 Starting Pre-Deploy Checks for CalcPro 🚀"

# ------------------------------
# 1️⃣ Check Node & npm versions
# ------------------------------
NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
echo "🔹 Node version: $NODE_VERSION"
echo "🔹 npm version: $NPM_VERSION"

# ------------------------------
# 2️⃣ Check for predeploy script
# ------------------------------
echo "🔹 Checking for predeploy script in package.json..."
if ! grep -q '"predeploy":' package.json; then
  echo "❌ 'predeploy' script not found in package.json."
  exit 1;
fi

# ------------------------------
# 3️⃣ Clean previous build
# ------------------------------
echo "🔹 Removing node_modules, package-lock.json, .next"
rm -rf node_modules package-lock.json .next

# ------------------------------
# 4️⃣ Install dependencies
# ------------------------------
echo "🔹 Installing dependencies..."
npm install

# ------------------------------
# 5️⃣ Run Prettier auto-format
# ------------------------------
echo "🔹 Running Prettier to fix code style..."
npx prettier --write .

# ------------------------------
# 6️⃣ Run ESLint
# ------------------------------
echo "🔹 Running ESLint..."
eslint . --ext .tsx,.ts,.js,.jsx
if [ $? -ne 0 ]; then
  echo "❌ ESLint errors found. Fix them before deploying."
  exit 1;
fi

# ------------------------------
# 7️⃣ Run TypeScript check
# ------------------------------
echo "🔹 Running TypeScript check..."
tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found. Fix them before deploying."
  exit 1;
fi

# ------------------------------
# 8️⃣ Detect & fix 'use client' + metadata issues
# ------------------------------
echo "🔹 Checking for 'use client' components exporting metadata..."
for file in $(grep -rl '"use client"' src/app); do
  if grep -q 'export const metadata' "$file"; then
    echo "⚠ Found 'metadata' in $file. Fixing automatically..."
    
    # Extract metadata block
    METADATA_BLOCK=$(awk '/export const metadata/,/}/' "$file")
    
    # Create a new server component file to hold metadata
    METADATA_FILE="${file%.tsx}.metadata.ts"
    echo "$METADATA_BLOCK" > "$METADATA_FILE"
    echo "✅ Created server component: $METADATA_FILE"
    
    # Remove metadata block from original client component
    sed -i "/export const metadata/,/}/d" "$file"
    echo "✅ Removed metadata from $file"
  fi
done

# ------------------------------
# 9️⃣ Build Next.js project
# ------------------------------
echo "🔹 Building Next.js project..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Next.js build failed. Fix errors above before deploying."
  exit 1;
fi

echo "✅ Pre-Deploy Checks Passed! Ready for deployment."
