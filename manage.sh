#!/bin/bash

# Script to manage the Aminah Tour project using pnpm

COMMAND=$1

case "$COMMAND" in
  dev)
    echo "🚀 Starting development server..."
    pnpm dev
    ;;
  build)
    echo "🏗️  Building project..."
    pnpm build
    ;;
  start)
    echo "🟢 Starting production server..."
    pnpm start
    ;;
  lint)
    echo "🧹 Linting project..."
    pnpm lint
    ;;
  install)
    echo "📦 Installing dependencies..."
    pnpm install
    ;;
  *)
    echo "Usage: ./manage.sh {dev|build|start|lint|install}"
    exit 1
    ;;
esac
