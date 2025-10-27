const axios = require('axios');

const PORTS = [5000, 5001, 5002, 5003, 5004, 5005];

async function testServer() {
  console.log('í·ª Testing AINEON Server...');
  
  for (const port of PORTS) {
    try {
      console.log(`ï¿½ï¿½ Testing port ${port}...`);
      const response = await axios.get(`http://localhost:${port}/health`, { timeout: 1000 });
      
      if (response.data.status === 'healthy') {
        console.log(`âœ… Server found on port ${port}`);
        
        // Test all endpoints
        const endpoints = [
          '/',
          '/dashboard/metrics', 
          '/ai/decisions',
          '/health'
        ];
        
        for (const endpoint of endpoints) {
          try {
            const endpointResponse = await axios.get(`http://localhost:${port}${endpoint}`);
            console.log(`âœ… ${endpoint}: ${endpointResponse.status}`);
          } catch (error) {
            console.log(`âŒ ${endpoint}: ${error.message}`);
          }
        }
        
        return port;
      }
    } catch (error) {
      console.log(`âŒ Port ${port} not available`);
    }
  }
  
  console.log('âŒ No running server found');
  return null;
}

testServer().then(port => {
  if (port) {
    console.log(`í¾‰ Server is running correctly on port ${port}`);
    console.log(`í³Š Open http://localhost:${port}/dashboard/metrics in your browser`);
  } else {
    console.log('í²¡ Start the server with: node server-complete.js');
  }
});
