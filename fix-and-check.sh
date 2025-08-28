#!/bin/bash
echo "🚀 Starting full cleanup + deploy readiness check..."

# Step 1: Auto-fix linting issues
echo "🔧 Running ESLint auto-fix..."
npx eslint . --ext .ts,.tsx --fix || true

# Step 2: Remove unused imports automatically
echo "🧹 Removing unused imports/variables..."
cat > .eslintrc.clean.json <<EOL
{
  "plugins": ["unused-imports"],
  "rules": {
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
  }
}
EOL
npx eslint . --ext .ts,.tsx --fix -c .eslintrc.clean.json || true
rm .eslintrc.clean.json

# Step 3: TypeScript type check
echo "📘 Running TypeScript check..."
npx tsc --noEmit || true

# Step 4: Try local build
echo "⚙️ Testing Next.js build..."
npm run build || true

echo "✅ Cleanup + check complete! Review logs above for remaining issues."
