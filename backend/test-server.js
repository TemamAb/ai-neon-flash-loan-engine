const axios = require('axios');

const PORTS = [5000, 5001, 5002, 5003, 5004, 5005];

async function testServer() {
  console.log('� Testing AINEON Server...');
  
  for (const port of PORTS) {
    try {
      console.log(`�� Testing port ${port}...`);
      const response = await axios.get(`http://localhost:${port}/health`, { timeout: 1000 });
      
      if (response.data.status === 'healthy') {
        console.log(`✅ Server found on port ${port}`);
        
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
            console.log(`✅ ${endpoint}: ${endpointResponse.status}`);
          } catch (error) {
            console.log(`❌ ${endpoint}: ${error.message}`);
          }
        }
        
        return port;
      }
    } catch (error) {
      console.log(`❌ Port ${port} not available`);
    }
  }
  
  console.log('❌ No running server found');
  return null;
}

testServer().then(port => {
  if (port) {
    console.log(`� Server is running correctly on port ${port}`);
    console.log(`� Open http://localhost:${port}/dashboard/metrics in your browser`);
  } else {
    console.log('� Start the server with: node server-complete.js');
  }
});
