#!/bin/bash
echo "� DISCOVERING LIVE ENDPOINTS..."
echo "Target: https://ai-neon-live-flash-loan.onrender.com"
echo ""

# Test various endpoint patterns
patterns=(
  "/api/health" "/health" "/api/status" "/status" 
  "/" "/api" "/api/engine" "/api/trading" "/api/profit"
  "/v1/health" "/v1/status" "/engine" "/trading" "/profit"
)

for pattern in "${patterns[@]}"; do
  url="https://ai-neon-live-flash-loan.onrender.com${pattern}"
  echo -n "Testing: ${pattern} -> "
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$status" = "200" ]; then
    echo "✅ FOUND (200)"
    # Show first line of response
    curl -s "$url" | head -1
  elif [ "$status" = "404" ]; then
    echo "❌ Not found"
  else
    echo "⚠️  HTTP $status"
  fi
done

echo ""
echo "� Checking for HTML response (might be frontend):"
curl -s https://ai-neon-live-flash-loan.onrender.com | head -2
