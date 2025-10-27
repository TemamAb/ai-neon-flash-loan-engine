import React, { useState, useEffect } from 'react';
import AINEONDashboard from './components/AINEON-Dashboard';
import { AINEONAPI, AINEONWebSocket } from './api-config';
import './components/AINEON-Dashboard.css';

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [liveUpdates, setLiveUpdates] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [
          health,
          engineStatus,
          modulesStatus,
          blockchainStatus,
          walletStatus,
          tradingPerformance,
          riskParameters,
          flashLoansAnalytics
        ] = await Promise.all([
          AINEONAPI.getHealth(),
          AINEONAPI.getEngineStatus(),
          AINEONAPI.getModulesStatus(),
          AINEONAPI.getBlockchainStatus(),
          AINEONAPI.getWalletStatus(),
          AINEONAPI.getTradingPerformance(),
          AINEONAPI.getRiskParameters(),
          AINEONAPI.getFlashLoansAnalytics()
        ]);

        setDashboardData({
          health,
          engineStatus,
          modulesStatus,
          blockchainStatus,
          walletStatus,
          tradingPerformance,
          riskParameters,
          flashLoansAnalytics
        });
        
        setIsConnected(true);
        console.log('âœ… AINEON Dashboard connected to live API');
      } catch (error) {
        console.error('âŒ Failed to connect to AINEON API:', error);
        setIsConnected(false);
      }
    };

    loadInitialData();
  }, []);

  // WebSocket for real-time updates
  useEffect(() => {
    if (isConnected) {
      const ws = new AINEONWebSocket((data) => {
        if (data.type === 'LIVE_UPDATE') {
          setLiveUpdates(prev => ({
            ...prev,
            ...data.data
          }));
        }
      });

      return () => ws.close();
    }
  }, [isConnected]);

  // Merge live updates with static data
  const mergedData = dashboardData ? {
    ...dashboardData,
    ...liveUpdates
  } : null;

  if (!mergedData) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <h2>íº€ AINEON AI Trading Engine</h2>
          <p>Connecting to live trading infrastructure...</p>
          <div className="spinner"></div>
          <p className="connection-status">
            {isConnected ? 'âœ… Connected' : 'í´„ Connecting...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <AINEONDashboard data={mergedData} />
    </div>
  );
}

export default App;
