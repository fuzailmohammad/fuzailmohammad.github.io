#!/bin/bash

echo "Building optimized portfolio..."

rm -rf dist

npm run build

echo "Build complete!"
ls -lh dist/
