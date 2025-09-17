#!/bin/bash

echo "🚀 Starting Pre-Deploy Checks for CalcPro 🚀"

# ------------------------------
# 1️⃣ Clean previous build & Install dependencies
# ------------------------------
echo "🔹 Removing old build artifacts and reinstalling dependencies..."
rm -rf node_modules package-lock.json .next
npm install
if [ $? -ne 0 ]; then
  echo "❌ npm install failed. Aborting."
  exit 1;
fi

# ------------------------------
# 2️⃣ Build Next.js project
# ------------------------------
echo "🔹 Building Next.js project..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Next.js build failed. Fix errors above before deploying."
  exit 1;
fi

echo "✅ Build successful! Now running quality checks..."

# ------------------------------
# 3️⃣ Run Prettier auto-format
# ------------------------------
echo "🔹 Running Prettier to fix code style..."
npx prettier --write .

# ------------------------------
# 4️⃣ Run ESLint
# ------------------------------
echo "🔹 Running ESLint..."
eslint . --ext .tsx,.ts,.js,.jsx --fix
if [ $? -ne 0 ]; then
  echo "⚠️ ESLint errors were found and auto-fixed. Please review the changes."
fi

# ------------------------------
# 5️⃣ Run TypeScript check
# ------------------------------
echo "🔹 Running TypeScript check..."
tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found. Fix them before deploying."
  exit 1;
fi

echo "✅ All Pre-Deploy Checks Passed! Ready for deployment."
