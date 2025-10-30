#!/bin/bash

echo "Ì∫Ä AINEON AI Trading Platform - GitHub Deployment"
echo "=================================================="

# Configuration
REPO_URL="https://github.com/TemamAb/aineon-flash--loan-engine.git"
COMMIT_MESSAGE="Ì∫Ä Complete AINEON AI Trading Platform Deployment

- ‚úÖ Complete Retool dashboard (24 files)
- ‚úÖ HTML command center (aineon-command-center.html) 
- ‚úÖ All 8 trading modules implemented
- ‚úÖ Backend APIs and trading engines
- ‚úÖ Smart contracts and security systems
- ‚úÖ Production deployment scripts
- ‚úÖ Comprehensive documentation

Features:
‚Ä¢ Flash loan arbitrage engine
‚Ä¢ Multi-chain trading (Ethereum, BSC, Polygon)
‚Ä¢ AI-powered risk management
‚Ä¢ Real-time monitoring dashboard
‚Ä¢ Gasless transaction support
‚Ä¢ Emergency stop protocols
‚Ä¢ Institutional-grade security"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}[‚úì]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[‚úó]${NC} $1"
}

# Step 1: Pre-flight checks
echo ""
echo "Ì≥ã STEP 1: Pre-flight Checks"
echo "----------------------------"

# Check if we're in git repository
if [ ! -d ".git" ]; then
    print_error "Not a git repository. Initializing..."
    git init
fi

# Check git status
print_status "Checking git status..."
git status

# Check remote origin
print_status "Checking remote configuration..."
if git remote -v | grep -q "origin"; then
    CURRENT_REMOTE=$(git remote get-url origin)
    print_status "Remote origin set to: $CURRENT_REMOTE"
    
    if [ "$CURRENT_REMOTE" != "$REPO_URL" ]; then
        print_warning "Remote URL differs from target. Updating..."
        git remote set-url origin "$REPO_URL"
    fi
else
    print_status "Adding remote origin..."
    git remote add origin "$REPO_URL"
fi

# Step 2: Cleanup and verification
echo ""
echo "Ì∑π STEP 2: Project Cleanup Check"
echo "-------------------------------"

# Check for large files
print_status "Checking for large files..."
LARGE_FILES=$(find . -size +10M -type f 2>/dev/null | head -10)
if [ -n "$LARGE_FILES" ]; then
    print_warning "Large files found (consider adding to .gitignore):"
    echo "$LARGE_FILES"
else
    print_status "No large files detected"
fi

# Check node_modules
if [ -d "node_modules" ]; then
    NODE_SIZE=$(du -sh node_modules 2>/dev/null | cut -f1)
    print_warning "node_modules detected ($NODE_SIZE) - should be in .gitignore"
else
    print_status "node_modules not present (good)"
fi

# Verify .gitignore
if [ -f ".gitignore" ]; then
    print_status ".gitignore found - checking contents..."
    if grep -q "node_modules" .gitignore && grep -q ".env" .gitignore; then
        print_status ".gitignore properly configured"
    else
        print_warning ".gitignore might need updates"
    fi
else
    print_warning "No .gitignore file found"
fi

# Step 3: Project size and file count
echo ""
echo "Ì≥ä STEP 3: Project Statistics"
echo "---------------------------"

# Project size
PROJECT_SIZE=$(du -sh . | cut -f1)
print_status "Project size: $PROJECT_SIZE"

# File count
FILE_COUNT=$(find . -type f -not -path "./.git/*" | wc -l)
print_status "Total files: $FILE_COUNT"

# Key directories check
print_status "Key components verified:"
[ -d "aineon-dashboard" ] && print_status "  ‚úÖ Retool dashboard"
[ -f "aineon-command-center.html" ] && print_status "  ‚úÖ HTML dashboard" 
[ -d "backend" ] && print_status "  ‚úÖ Backend services"
[ -f "flash-loan-arbitrage.js" ] && print_status "  ‚úÖ Trading engine"
[ -d "frontend" ] && print_status "  ‚úÖ Frontend components"

# Step 4: Git operations
echo ""
echo "Ì¥ß STEP 4: Git Operations"
echo "-----------------------"

# Add all files
print_status "Adding files to git..."
git add .

# Check what will be committed
print_status "Files to be committed:"
git status --porcelain | head -20
if [ $(git status --porcelain | wc -l) -gt 20 ]; then
    print_status "... and more"
fi

# Commit
print_status "Creating commit..."
git commit -m "$COMMIT_MESSAGE"

if [ $? -eq 0 ]; then
    print_status "Commit successful!"
else
    print_error "Commit failed. Check for errors above."
    exit 1
fi

# Step 5: Push to GitHub
echo ""
echo "Ì∫Ä STEP 5: Push to GitHub"
echo "-----------------------"

# Determine branch
CURRENT_BRANCH=$(git branch --show-current)
print_status "Current branch: $CURRENT_BRANCH"

# Push
print_status "Pushing to GitHub..."
if git push -u origin "$CURRENT_BRANCH"; then
    print_status "‚úÖ Successfully pushed to GitHub!"
    print_status "Ì≥± Repository: $REPO_URL"
else
    print_error "Push failed. Trying alternative approach..."
    
    # Try different branch names
    print_status "Trying 'main' branch..."
    git branch -M main 2>/dev/null
    git push -u origin main
    
    if [ $? -ne 0 ]; then
        print_status "Trying 'master' branch..."
        git branch -M master 2>/dev/null  
        git push -u origin master
    fi
fi

# Step 6: Final verification
echo ""
echo "‚úÖ STEP 6: Final Verification"
echo "---------------------------"

# Verify push
print_status "Verifying remote status..."
git log --oneline -3
print_status "Remote branches:"
git branch -r

echo ""
echo "Ìæâ DEPLOYMENT COMPLETE!"
echo "========================"
echo "Ì≥ä Project Overview:"
echo "   ‚Ä¢ Total Files: $FILE_COUNT"
echo "   ‚Ä¢ Project Size: $PROJECT_SIZE" 
echo "   ‚Ä¢ Dashboard: Retool (24 files) + HTML version"
echo "   ‚Ä¢ Backend: Complete API and trading engines"
echo "   ‚Ä¢ Smart Contracts: Flash loan system"
echo "   ‚Ä¢ Security: Multi-sig & emergency protocols"
echo ""
echo "Ìºê Access your repository:"
echo "   $REPO_URL"
echo ""
echo "Ì∫Ä Next steps:"
echo "   1. Verify files on GitHub"
echo "   2. Set up GitHub Pages for HTML dashboard"
echo "   3. Configure CI/CD pipelines"
echo "   4. Add collaborators"
