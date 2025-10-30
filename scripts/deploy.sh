#!/bin/bash
# Production deployment script
docker build -t aineon-arbitrage .
docker run -d -p 3003:3003 \
  -e NODE_ENV=production \
  -e API_KEYS=your_keys_here \
  aineon-arbitrage
