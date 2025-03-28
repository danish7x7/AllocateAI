import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight, TrendingUp, BarChart2, Activity, PieChart as PieIcon, Sparkles, Brain, Zap, AlertTriangle } from 'lucide-react';

// Mock data - in a real app this would come from your backend
const performanceData = [
  { name: 'Jan 2020', stocks: 1000, crypto: 800, fixedAssets: 1200 },
  { name: 'Jul 2020', stocks: 950, crypto: 1100, fixedAssets: 1220 },
  { name: 'Jan 2021', stocks: 1100, crypto: 1800, fixedAssets: 1240 },
  { name: 'Jul 2021', stocks: 1250, crypto: 2200, fixedAssets: 1260 },
  { name: 'Jan 2022', stocks: 1150, crypto: 1400, fixedAssets: 1290 },
  { name: 'Jul 2022', stocks: 1050, crypto: 900, fixedAssets: 1310 },
  { name: 'Jan 2023', stocks: 1200, crypto: 1100, fixedAssets: 1330 },
  { name: 'Jul 2023', stocks: 1300, crypto: 1350, fixedAssets: 1350 },
  { name: 'Jan 2024', stocks: 1400, crypto: 1600, fixedAssets: 1380 },
  { name: 'Jul 2024', stocks: 1450, crypto: 1800, fixedAssets: 1400 },
  { name: 'Jan 2025', stocks: 1550, crypto: 2100, fixedAssets: 1420 },
];

// ML prediction data
const predictionData = [
  { name: 'Jul 2025', stocks: 1600, crypto: 2300, fixedAssets: 1440 },
  { name: 'Jan 2026', stocks: 1700, crypto: 2500, fixedAssets: 1460 },
];

// Correlation data
const correlationData = [
  { factor: 'Inflation', stocks: -0.65, crypto: -0.45, fixedAssets: 0.30 },
  { factor: 'Interest Rates', stocks: -0.70, crypto: -0.60, fixedAssets: 0.40 },
  { factor: 'GDP Growth', stocks: 0.75, crypto: 0.50, fixedAssets: 0.20 },
  { factor: 'Geopolitical Events', stocks: -0.40, crypto: -0.55, fixedAssets: 0.15 },
  { factor: 'Tech Innovation', stocks: 0.65, crypto: 0.80, fixedAssets: 0.10 },
];

// Performance metrics
const annualizedReturns = [
  { name: 'Stocks', value: 11.2, color: '#8884d8' },
  { name: 'Crypto', value: 27.5, color: '#82ca9d' },
  { name: 'Fixed Assets', value: 4.3, color: '#ffc658' },
];

const volatility = [
  { name: 'Stocks', value: 18.5, color: '#8884d8' },
  { name: 'Crypto', value: 78.3, color: '#82ca9d' },
  { name: 'Fixed Assets', value: 3.7, color: '#ffc658' },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

// Anomaly detection data
const anomalyData = [
  { date: 'Jan 2020', value: 1000, anomaly: false },
  { date: 'Mar 2020', value: 750, anomaly: true },
  { date: 'Jun 2020', value: 850, anomaly: false },
  { date: 'Oct 2020', value: 950, anomaly: false },
  { date: 'Jan 2021', value: 1100, anomaly: false },
  { date: 'May 2021', value: 1400, anomaly: true },
  { date: 'Aug 2021', value: 1250, anomaly: false },
  { date: 'Jan 2022', value: 1150, anomaly: false },
  { date: 'Apr 2022', value: 900, anomaly: true },
  { date: 'Aug 2022', value: 1050, anomaly: false },
  { date: 'Jan 2023', value: 1200, anomaly: false },
  { date: 'Jun 2023', value: 1300, anomaly: false },
  { date: 'Oct 2023', value: 1250, anomaly: false },
  { date: 'Jan 2024', value: 1400, anomaly: false },
  { date: 'May 2024', value: 1700, anomaly: true },
  { date: 'Oct 2024', value: 1450, anomaly: false },
  { date: 'Jan 2025', value: 1550, anomaly: false },
];

// Scenario analysis data
const scenarioData = [
  { month: 'Mar 2025', baseline: 1600, bullish: 1700, bearish: 1500 },
  { month: 'Jun 2025', baseline: 1650, bullish: 1800, bearish: 1450 },
  { month: 'Sep 2025', baseline: 1700, bullish: 1900, bearish: 1400 },
  { month: 'Dec 2025', baseline: 1750, bullish: 2000, bearish: 1350 },
  { month: 'Mar 2026', baseline: 1800, bullish: 2100, bearish: 1300 },
];

// AI-generated insights
const aiInsights = [
  { 
    id: 1, 
    title: "Crypto Patterns Signal Potential Rally", 
    description: "Analysis of on-chain metrics suggests cryptocurrency accumulation patterns similar to those preceding the 2021 bull run.",
    confidence: 76,
    impact: "High",
    assetClass: "Cryptocurrency"
  },
  { 
    id: 2, 
    title: "Fixed Assets Hedge Against Market Uncertainty", 
    description: "Real estate and other fixed assets show increased correlation with inflation expectations, making them effective hedges in the current market.",
    confidence: 89,
    impact: "Medium",
    assetClass: "Fixed Assets"
  },
  { 
    id: 3, 
    title: "Tech Stock Valuation Warning", 
    description: "Price-to-earnings ratios in technology sector exceed historical averages by 28%, suggesting potential overvaluation.",
    confidence: 82,
    impact: "Medium",
    assetClass: "Stocks"
  },
  { 
    id: 4, 
    title: "Interest Rate Impact on Market Rotation", 
    description: "Pattern detection indicates potential sector rotation from growth to value stocks over next 6 months.",
    confidence: 71,
    impact: "High",
    assetClass: "Stocks"
  },
];

const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [modelAccuracy, setModelAccuracy] = useState(84);
  const [isTraining, setIsTraining] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [showPredictions, setShowPredictions] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState('baseline');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showAiExplanation, setShowAiExplanation] = useState(false);
  
  // Combined data with historical and predictions
  const combinedData = showPredictions 
    ? [...performanceData, ...predictionData]
    : performanceData;

  const startTraining = () => {
    setIsTraining(true);
    setTimeout(() => {
      setModelAccuracy(prev => Math.min(prev + Math.floor(Math.random() * 3), 95));
      setIsTraining(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Financial Assets Analysis Dashboard</h1>
        <p className="text-gray-600">Compare performance and correlations between Fixed Assets, Cryptocurrencies, and Stock Markets</p>
      </header>

      {/* Navigation */}
      <div className="flex space-x-1 mb-6 bg-white p-1 rounded-lg shadow">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'performance' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance Analysis
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'factors' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
          onClick={() => setActiveTab('factors')}
        >
          Market Factors
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'ml' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
          onClick={() => setActiveTab('ml')}
        >
          ML Predictions
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'ai' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
          onClick={() => setActiveTab('ai')}
        >
          <div className="flex items-center">
            <Sparkles size={14} className="mr-1" />
            AI Insights
          </div>
        </button>
      </div>

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Asset Performance (5 Years)</h2>
              <div className="flex space-x-2">
                <button
                  className={`p-2 rounded ${chartType === 'line' ? 'bg-gray-200' : 'bg-white'}`}
                  onClick={() => setChartType('line')}
                >
                  <Activity size={16} />
                </button>
                <button
                  className={`p-2 rounded ${chartType === 'area' ? 'bg-gray-200' : 'bg-white'}`}
                  onClick={() => setChartType('area')}
                >
                  <BarChart2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center mb-3">
              <label className="flex items-center mr-4 text-sm">
                <input
                  type="checkbox"
                  checked={showPredictions}
                  onChange={() => setShowPredictions(!showPredictions)}
                  className="mr-1"
                />
                Show ML Predictions
              </label>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart data={combinedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="stocks" 
                      stroke="#8884d8" 
                      name="Stocks"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="crypto" 
                      stroke="#82ca9d" 
                      name="Cryptocurrency"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="fixedAssets" 
                      stroke="#ffc658" 
                      name="Fixed Assets"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <AreaChart data={combinedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="stocks" 
                      stackId="1" 
                      stroke="#8884d8" 
                      fill="#8884d8"
                      name="Stocks"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="crypto" 
                      stackId="1" 
                      stroke="#82ca9d" 
                      fill="#82ca9d"
                      name="Cryptocurrency"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="fixedAssets" 
                      stackId="1" 
                      stroke="#ffc658" 
                      fill="#ffc658"
                      name="Fixed Assets"
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Annualized Returns (%)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={annualizedReturns}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {annualizedReturns.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Volatility (%)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volatility}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Volatility']} />
                    <Bar dataKey="value" name="Volatility">
                      {volatility.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-3">
                <h3 className="font-medium mb-2">Stocks</h3>
                <p className="flex items-center text-lg font-semibold">
                  <span className="mr-2">+55%</span>
                  <ArrowUpRight className="text-green-500" size={16} />
                </p>
                <p className="text-sm text-gray-600">5-year growth, moderate volatility with steady returns</p>
              </div>

              <div className="border rounded-lg p-3">
                <h3 className="font-medium mb-2">Cryptocurrency</h3>
                <p className="flex items-center text-lg font-semibold">
                  <span className="mr-2">+162.5%</span>
                  <ArrowUpRight className="text-green-500" size={16} />
                </p>
                <p className="text-sm text-gray-600">Highest growth potential with significant volatility</p>
              </div>

              <div className="border rounded-lg p-3">
                <h3 className="font-medium mb-2">Fixed Assets</h3>
                <p className="flex items-center text-lg font-semibold">
                  <span className="mr-2">+18.3%</span>
                  <ArrowUpRight className="text-green-500" size={16} />
                </p>
                <p className="text-sm text-gray-600">Lowest volatility with steady but modest growth</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Factors Tab */}
      {activeTab === 'factors' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Market Factors Correlation</h2>
            <p className="text-sm text-gray-600 mb-4">How various economic and global factors correlate with asset performance</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={correlationData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[-1, 1]} tickFormatter={(tick) => tick.toFixed(1)} />
                  <YAxis type="category" dataKey="factor" width={150} />
                  <Tooltip formatter={(value) => [value.toFixed(2), 'Correlation']} />
                  <Legend />
                  <Bar dataKey="stocks" name="Stocks" fill="#8884d8" />
                  <Bar dataKey="crypto" name="Cryptocurrency" fill="#82ca9d" />
                  <Bar dataKey="fixedAssets" name="Fixed Assets" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Correlation ranges from -1 (strong negative) to 1 (strong positive)</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Market Factors</h2>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-medium">Inflation Impact</h3>
                <p className="text-sm text-gray-600">Inflation negatively affects stocks and crypto while being positively correlated with fixed assets like real estate.</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-medium">Interest Rate Sensitivity</h3>
                <p className="text-sm text-gray-600">Rising interest rates typically cause stock and crypto markets to decline while increasing returns on certain fixed income assets.</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-medium">Technological Innovation</h3>
                <p className="text-sm text-gray-600">Tech advancements strongly drive cryptocurrency growth and tech stocks, with minimal impact on traditional fixed assets.</p>
              </div>
              <div>
                <h3 className="font-medium">Geopolitical Events</h3>
                <p className="text-sm text-gray-600">Political instability often triggers market volatility, affecting all asset classes but to varying degrees.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ML Predictions Tab */}
      {activeTab === 'ml' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">ML Model Performance</h2>
                <p className="text-sm text-gray-600">Based on 5 years of historical data</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{modelAccuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-6 mt-6">
              <div className="flex-1 mb-6 md:mb-0">
                <h3 className="font-medium mb-3">Model Features</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    Historical price data (5 years)
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    Macroeconomic indicators
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    Market sentiment analysis
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    Global event impact factors
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    Cross-asset correlation patterns
                  </li>
                </ul>
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium mb-3">Model Technology</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    LSTM Neural Networks
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    Ensemble methods (XGBoost, Random Forest)
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    Time series forecasting
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    Adaptive learning rates
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    Real-time model retraining
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button
                onClick={startTraining}
                disabled={isTraining}
                className={`px-4 py-2 rounded-md font-medium ${
                  isTraining 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isTraining ? 'Training in progress...' : 'Retrain Model with Latest Data'}
              </button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">12-Month Predictions</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={predictionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stocks" name="Stocks" fill="#8884d8" />
                  <Bar dataKey="crypto" name="Cryptocurrency" fill="#82ca9d" />
                  <Bar dataKey="fixedAssets" name="Fixed Assets" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p className="mb-2">Prediction confidence levels:</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-blue-600 rounded-full mr-2"></span>
                  Stocks: 87% confidence
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-green-600 rounded-full mr-2"></span>
                  Crypto: 76% confidence
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-yellow-600 rounded-full mr-2"></span>
                  Fixed Assets: 92% confidence
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Insights Tab */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Sparkles size={20} className="mr-2 text-yellow-500" />
                  AI-Powered Market Insights
                </h2>
                <p className="text-sm text-gray-600">Real-time analysis and pattern detection across global markets</p>
              </div>
              <button 
                className="px-3 py-2 bg-blue-50 text-blue-600 rounded-md flex items-center text-sm font-medium"
                onClick={() => {
                  setIsAnalyzing(true);
                  setAnalysisProgress(0);
                  const timer = setInterval(() => {
                    setAnalysisProgress(prev => {
                      if (prev >= 100) {
                        clearInterval(timer);
                        setIsAnalyzing(false);
                        return 100;
                      }
                      return prev + 5;
                    });
                  }, 100);
                }}
              >
                {isAnalyzing ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Analyzing {analysisProgress}%
                  </>
                ) : (
                  <>
                    <Brain size={16} className="mr-2" />
                    Run New Analysis
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Anomaly Detection</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="category" dataKey="date" name="Date" />
                      <YAxis type="number" dataKey="value" name="Value" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter 
                        name="Stock Values" 
                        data={anomalyData} 
                        fill={(entry) => entry.anomaly ? '#ff4d4f' : '#82ca9d'}
                        shape={(props) => {
                          const { cx, cy, fill } = props;
                          if (props.payload.anomaly) {
                            return (
                              <g>
                                <circle cx={cx} cy={cy} r={6} fill={fill} />
                                <circle cx={cx} cy={cy} r={10} fill="none" stroke={fill} />
                              </g>
                            );
                          }
                          return <circle cx={cx} cy={cy} r={6} fill={fill} />;
                        }}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-sm text-gray-600 flex items-start">
                  <AlertTriangle size={16} className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <span>AI has detected 4 market anomalies (red points) that might indicate trend shifts.</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Scenario Analysis</h3>
                <div className="mb-3 flex justify-between">
                  <div className="flex space-x-3">
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${selectedScenario === 'baseline' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                      onClick={() => setSelectedScenario('baseline')}
                    >
                      Baseline
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${selectedScenario === 'bullish' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}
                      onClick={() => setSelectedScenario('bullish')}
                    >
                      Bullish
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${selectedScenario === 'bearish' ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}
                      onClick={() => setSelectedScenario('bearish')}
                    >
                      Bearish
                    </button>
                  </div>
                  <button
                    className="text-blue-600 text-sm flex items-center"
                    onClick={() => setShowAiExplanation(!showAiExplanation)}
                  >
                    {showAiExplanation ? 'Hide explanation' : 'How it works'} 
                    {showAiExplanation ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
                  </button>
                </div>
                
                {showAiExplanation && (
                  <div className="bg-blue-50 p-3 rounded-md mb-3 text-sm text-blue-800">
                    <p className="mb-2">Our AI runs 10,000+ simulations based on:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Historical market behavior patterns</li>
                      <li>Current macroeconomic indicators</li>
                      <li>Sentiment analysis from news and social media</li>
                      <li>Network analysis of asset correlations</li>
                    </ul>
                  </div>
                )}
                
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scenarioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="baseline" 
                        stroke="#8884d8" 
                        name="Baseline"
                        strokeWidth={selectedScenario === 'baseline' ? 3 : 1}
                        opacity={selectedScenario === 'baseline' ? 1 : 0.5}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="bullish" 
                        stroke="#82ca9d" 
                        name="Bullish"
                        strokeWidth={selectedScenario === 'bullish' ? 3 : 1}
                        opacity={selectedScenario === 'bullish' ? 1 : 0.5}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="bearish" 
                        stroke="#ff8042" 
                        name="Bearish"
                        strokeWidth={selectedScenario === 'bearish' ? 3 : 1}
                        opacity={selectedScenario === 'bearish' ? 1 : 0.5}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Scenario probability:</span>
                    <div className="space-x-3">
                      <span className="text-blue-600">Baseline: 65%</span>
                      <span className="text-green-600">Bullish: 20%</span>
                      <span className="text-red-600">Bearish: 15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Zap size={18} className="mr-2 text-yellow-500" />
                AI-Generated Investment Insights
              </h3>
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{insight.title}</h4>
                      <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {insight.assetClass}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 my-2">{insight.description}</p>
                    <div className="flex justify-between text-xs text-gray
    </div>
  );
};

export default FinancialDashboard;
