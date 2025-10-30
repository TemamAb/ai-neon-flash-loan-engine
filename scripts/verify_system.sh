#!/bin/bash
echo "� COMPREHENSIVE AINEON DASHBOARD VERIFICATION"
echo "=============================================="
expected_files=("docker-compose.yml" "Dockerfile" "package.json" "server.js" "frontend-server.js" "deploy_unified.sh")
all_good=true
echo "� CHECKING REQUIRED FILES:"
for file in "${expected_files[@]}"; do
    if [ -f "$file" ] && [ -s "$file" ]; then
        echo "✅ $file: EXISTS AND NOT EMPTY"
    else
        echo "❌ $file: MISSING OR EMPTY"
        all_good=false
    fi
done
echo "" && echo "� DIRECTORY CONTENTS:" && ls -la
echo "" && echo "� FILE COUNT:" && find . -maxdepth 1 -type f | wc -l
echo "" && echo "� CHECKING FOR DUPLICATES:"
duplicates=$(find . -maxdepth 1 -type f -printf "%f\n" | sort | uniq -i -d)
if [ -z "$duplicates" ]; then
    echo "✅ No duplicate files found"
else
    echo "❌ Duplicate files detected:" && echo "$duplicates" && all_good=false
fi
echo "" && echo "⚡ CHECKING EXECUTABLE PERMISSIONS:"
if [ -x "deploy_unified.sh" ]; then
    echo "✅ deploy_unified.sh is executable"
else
    echo "❌ deploy_unified.sh is NOT executable" && all_good=false
fi
echo "" && echo "� CHECKING FOR UNWANTED FILES:"
unwanted_files=$(find . -maxdepth 1 -type f \( -name "node_modules" -o -name ".git" -o -name "*.log" -o -name "*.tmp" \))
if [ -z "$unwanted_files" ]; then
    echo "✅ No unwanted files found"
else
    echo "⚠️  Unexpected files detected:" && echo "$unwanted_files"
fi
echo "" && echo "� FILE TYPES BREAKDOWN:"
echo "JavaScript files:" $(find . -maxdepth 1 -name "*.js" | wc -l)
echo "JSON files:" $(find . -maxdepth 1 -name "*.json" | wc -l)
echo "YAML files:" $(find . -maxdepth 1 -name "*.yml" | wc -l)
echo "Shell scripts:" $(find . -maxdepth 1 -name "*.sh" | wc -l)
echo "Docker files:" $(find . -maxdepth 1 -name "Dockerfile" | wc -l)
echo ""
if $all_good; then
    echo "� ALL CHECKS PASSED! SYSTEM READY FOR DEPLOYMENT"
    echo "✅ Expected files: Present and not empty"
    echo "✅ No duplicates: Clean file structure"
    echo "✅ Permissions: Scripts are executable"
    echo "✅ No conflicts: Clean directory"
    echo "" && echo "� DEPLOYMENT STATUS: READY"
else
    echo "❌ VERIFICATION FAILED - Please check the issues above"
    echo "� DEPLOYMENT STATUS: BLOCKED"
fi
