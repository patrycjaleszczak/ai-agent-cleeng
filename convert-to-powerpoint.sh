#!/bin/bash

# Playwright Workshop - PowerPoint Converter
# This script converts the markdown presentation to PowerPoint format

echo "🎭 Playwright Workshop - PowerPoint Converter"
echo "=============================================="
echo ""

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null
then
    echo "❌ Pandoc is not installed!"
    echo ""
    echo "Please install Pandoc first:"
    echo ""
    echo "Windows:  choco install pandoc"
    echo "Mac:      brew install pandoc"
    echo "Linux:    sudo apt-get install pandoc"
    echo ""
    echo "Or download from: https://pandoc.org/installing.html"
    echo ""
    exit 1
fi

echo "✅ Pandoc found!"
echo ""

# Check if markdown file exists
if [ ! -f "Playwright_Workshop_Presentation.md" ]; then
    echo "❌ Error: Playwright_Workshop_Presentation.md not found!"
    echo "Please run this script from the workspace directory."
    exit 1
fi

echo "📄 Converting presentation..."
echo ""

# Convert to PowerPoint
pandoc Playwright_Workshop_Presentation.md \
    -o Playwright_Workshop.pptx \
    -t pptx \
    --slide-level=2

if [ $? -eq 0 ]; then
    echo "✅ Success! PowerPoint created: Playwright_Workshop.pptx"
    echo ""
    echo "📊 Your presentation is ready with 62 slides covering:"
    echo "   • Reports & Reporters (25 min)"
    echo "   • Debugging & Analysis (25 min)"
    echo "   • Test Stability (30 min)"
    echo "   • Q&A & Wrap-up (10 min)"
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Open Playwright_Workshop.pptx in PowerPoint"
    echo "   2. Apply your company theme"
    echo "   3. Review speaker notes"
    echo "   4. Practice your demos"
    echo "   5. You're ready to present!"
    echo ""
else
    echo "❌ Error: Conversion failed!"
    echo ""
    echo "Try manual conversion or see POWERPOINT_CONVERSION_GUIDE.md"
    exit 1
fi
