#!/bin/bash
echo "Ì¥ç COMPREHENSIVE AINEON DASHBOARD VERIFICATION"
echo "=============================================="
expected_files=("docker-compose.yml" "Dockerfile" "package.json" "server.js" "frontend-server.js" "deploy_unified.sh")
all_good=true
echo "Ì≥Ñ CHECKING REQUIRED FILES:"
for file in "${expected_files[@]}"; do
    if [ -f "$file" ] && [ -s "$file" ]; then
        echo "‚úÖ $file: EXISTS AND NOT EMPTY"
    else
        echo "‚ùå $file: MISSING OR EMPTY"
        all_good=false
    fi
done
echo "" && echo "Ì≥ä DIRECTORY CONTENTS:" && ls -la
echo "" && echo "Ì¥¢ FILE COUNT:" && find . -maxdepth 1 -type f | wc -l
echo "" && echo "Ì∫® CHECKING FOR DUPLICATES:"
duplicates=$(find . -maxdepth 1 -type f -printf "%f\n" | sort | uniq -i -d)
if [ -z "$duplicates" ]; then
    echo "‚úÖ No duplicate files found"
else
    echo "‚ùå Duplicate files detected:" && echo "$duplicates" && all_good=false
fi
echo "" && echo "‚ö° CHECKING EXECUTABLE PERMISSIONS:"
if [ -x "deploy_unified.sh" ]; then
    echo "‚úÖ deploy_unified.sh is executable"
else
    echo "‚ùå deploy_unified.sh is NOT executable" && all_good=false
fi
echo "" && echo "Ì∫´ CHECKING FOR UNWANTED FILES:"
unwanted_files=$(find . -maxdepth 1 -type f \( -name "node_modules" -o -name ".git" -o -name "*.log" -o -name "*.tmp" \))
if [ -z "$unwanted_files" ]; then
    echo "‚úÖ No unwanted files found"
else
    echo "‚ö†Ô∏è  Unexpected files detected:" && echo "$unwanted_files"
fi
echo "" && echo "Ì≥ã FILE TYPES BREAKDOWN:"
echo "JavaScript files:" $(find . -maxdepth 1 -name "*.js" | wc -l)
echo "JSON files:" $(find . -maxdepth 1 -name "*.json" | wc -l)
echo "YAML files:" $(find . -maxdepth 1 -name "*.yml" | wc -l)
echo "Shell scripts:" $(find . -maxdepth 1 -name "*.sh" | wc -l)
echo "Docker files:" $(find . -maxdepth 1 -name "Dockerfile" | wc -l)
echo ""
if $all_good; then
    echo "Ìæâ ALL CHECKS PASSED! SYSTEM READY FOR DEPLOYMENT"
    echo "‚úÖ Expected files: Present and not empty"
    echo "‚úÖ No duplicates: Clean file structure"
    echo "‚úÖ Permissions: Scripts are executable"
    echo "‚úÖ No conflicts: Clean directory"
    echo "" && echo "Ì∫Ä DEPLOYMENT STATUS: READY"
else
    echo "‚ùå VERIFICATION FAILED - Please check the issues above"
    echo "Ì∫Ä DEPLOYMENT STATUS: BLOCKED"
fi
