"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  BarChart2, 
  BarChart, 
  LineChart, 
  PieChart, 
  Activity, 
  ArrowRight, 
  Calendar, 
  ChevronDown, 
  Download, 
  Filter, 
  Droplet, 
  Thermometer, 
  Leaf, 
  Sun,
  Wind
} from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

interface Farm {
  id: string;
  name: string;
  location: string;
  area: number;
  currentCrop: string;
}

const mockFarms: Farm[] = [
  { id: "farm1", name: "Green Valley Farm", location: "Amritsar, Punjab", area: 5.2, currentCrop: "Wheat" },
  { id: "farm2", name: "Riverside Fields", location: "Ludhiana, Punjab", area: 3.8, currentCrop: "Rice" },
  { id: "farm3", name: "Sunset Acres", location: "Chandigarh, Punjab", area: 4.5, currentCrop: "Maize" },
];

interface AnalyticsSummaryCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: {
    bg: string;
  };
}

const AnalyticsSummaryCard = ({ title, value, change, icon, color }: AnalyticsSummaryCardProps) => {
  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full ${color.bg}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={`text-xs ${change.includes('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface SensorData {
  current: number;
  average: number;
  min: number;
  max: number;
  trend: string;
  history?: { timestamp: string; value: number }[];
}

interface SensorDataCardProps {
  title: string;
  data: SensorData;
  unit: string;
  icon: React.ReactNode;
  color: {
    bg: string;
    text?: string;
    chart?: string;
  };
}

const SensorDataCard = ({ title, data, unit, icon, color }: SensorDataCardProps) => {
  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${color.bg}`}>
            {icon}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold">{data.current}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500 dark:text-gray-400">Past 24 Hours</span>
          <div className="flex items-center gap-1">
            <span className="font-medium">Avg: {data.average}{unit}</span>
            <span className={`${data.trend.includes('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {data.trend}
            </span>
          </div>
        </div>
        
        <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden relative">
          <div className="absolute inset-0 flex items-end">
            {/* This would be a real chart in a production app */}
            <div className="flex justify-between w-full h-full">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-t ${color.chart}`}
                  style={{ 
                    height: `${20 + Math.random() * 80}%`, 
                    marginRight: '1px' 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-500 dark:text-gray-400">Min: {data.min}{unit}</span>
          <span className="text-gray-500 dark:text-gray-400">Max: {data.max}{unit}</span>
        </div>
      </div>
    </Card>
  );
};

const GrowthChartCard = () => {
  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Crop Growth Tracking</h3>
        <div className="flex items-center gap-2">
          <select className="text-xs p-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option>Last 30 Days</option>
            <option>Last 60 Days</option>
            <option>Last 90 Days</option>
          </select>
          <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          [Crop growth visualization chart]
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <p className="text-xs text-gray-500 dark:text-gray-400">Current Stage</p>
          <p className="font-medium">Flowering</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <p className="text-xs text-gray-500 dark:text-gray-400">Growth Rate</p>
          <p className="font-medium text-green-600 dark:text-green-400">+3.2%</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <p className="text-xs text-gray-500 dark:text-gray-400">Days to Harvest</p>
          <p className="font-medium">45</p>
        </div>
      </div>
    </Card>
  );
};

const YieldPredictionCard = () => {
  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Yield Prediction</h3>
        <Link href="/predictions/yield">
          <button className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            Details <ArrowRight className="h-3 w-3" />
          </button>
        </Link>
      </div>
      
      <div className="relative mt-2 h-36 flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="h-full w-full rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <div className="h-3/4 w-3/4 rounded-full bg-green-200 dark:bg-green-800/30 flex items-center justify-center">
              <div className="h-2/4 w-2/4 rounded-full bg-green-300 dark:bg-green-700/40 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">85%</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Yield</p>
          <p className="font-medium">2.8 tons/acre</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <p className="text-xs text-gray-500 dark:text-gray-400">Compared to Avg</p>
          <p className="font-medium text-green-600 dark:text-green-400">+12%</p>
        </div>
      </div>
    </Card>
  );
};

const WeatherImpactCard = () => {
  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Weather Impact Analysis</h3>
      
      <div className="space-y-3">
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <Sun className="h-5 w-5 text-yellow-500 mr-3" />
          <div className="flex-grow">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Sunshine</p>
              <p className="text-xs text-green-600 dark:text-green-400">Positive</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
              <div className="h-1.5 rounded-full bg-green-500" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <Droplet className="h-5 w-5 text-blue-500 mr-3" />
          <div className="flex-grow">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Rainfall</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Neutral</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
              <div className="h-1.5 rounded-full bg-gray-500" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <Thermometer className="h-5 w-5 text-red-500 mr-3" />
          <div className="flex-grow">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Temperature</p>
              <p className="text-xs text-red-600 dark:text-red-400">Negative</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
              <div className="h-1.5 rounded-full bg-red-500" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <Wind className="h-5 w-5 text-gray-500 mr-3" />
          <div className="flex-grow">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Wind</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Neutral</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
              <div className="h-1.5 rounded-full bg-gray-500" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const AnalyticsPage = () => {
  const { data: session, status } = useSession();
  const [selectedFarm, setSelectedFarm] = useState<string>("farm1");
  const [timeRange, setTimeRange] = useState("7d");
  
  // Mock sensor data
  const sensorData = {
    moisture: {
      current: 36,
      average: 38,
      min: 32,
      max: 45,
      trend: "-2%"
    },
    temperature: {
      current: 27,
      average: 26,
      min: 22,
      max: 31,
      trend: "+1%"
    },
    soilHealth: {
      current: 74,
      average: 72,
      min: 68,
      max: 78,
      trend: "+2%"
    },
    sunlight: {
      current: 85,
      average: 80,
      min: 65,
      max: 95,
      trend: "+5%"
    }
  };
  
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to access analytics</p>
          <Link href="/login">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
              Log In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Farm Analytics</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Real-time insights and data visualization
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedFarm}
              onChange={(e) => setSelectedFarm(e.target.value)}
            >
              {mockFarms.map(farm => (
                <option key={farm.id} value={farm.id}>{farm.name}</option>
              ))}
            </select>
            
            <select 
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium flex items-center gap-1">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <AnalyticsSummaryCard 
            title="Soil Moisture" 
            value="36%" 
            change="-2% from avg" 
            icon={<Droplet className="h-5 w-5 text-blue-500" />} 
            color={{bg: "bg-blue-100 dark:bg-blue-900/30"}}
          />
          <AnalyticsSummaryCard 
            title="Temperature" 
            value="27°C" 
            change="+1°C from avg" 
            icon={<Thermometer className="h-5 w-5 text-red-500" />} 
            color={{bg: "bg-red-100 dark:bg-red-900/30"}}
          />
          <AnalyticsSummaryCard 
            title="Soil Health" 
            value="74%" 
            change="+2% from last week" 
            icon={<Leaf className="h-5 w-5 text-green-500" />} 
            color={{bg: "bg-green-100 dark:bg-green-900/30"}}
          />
          <AnalyticsSummaryCard 
            title="Sunlight" 
            value="85%" 
            change="+5% from avg" 
            icon={<Sun className="h-5 w-5 text-yellow-500" />} 
            color={{bg: "bg-yellow-100 dark:bg-yellow-900/30"}}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                Soil Moisture Trends
              </h3>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                  Daily
                </button>
                <button className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  Weekly
                </button>
                <button className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  Monthly
                </button>
              </div>
            </div>
            
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                [Soil moisture trend visualization chart]
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Avg Moisture</p>
                <p className="font-medium">38%</p>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Optimal Range</p>
                <p className="font-medium">35-45%</p>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-medium text-green-600 dark:text-green-400">Good</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-red-500" />
                Temperature & Humidity
              </h3>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
                  Temperature
                </button>
                <button className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  Humidity
                </button>
                <button className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  Both
                </button>
              </div>
            </div>
            
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                [Temperature trend visualization chart]
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Avg Temp</p>
                <p className="font-medium">26°C</p>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Optimal Range</p>
                <p className="font-medium">22-28°C</p>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-medium text-yellow-600 dark:text-yellow-400">Moderate</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SensorDataCard 
            title="Soil Moisture" 
            data={sensorData.moisture} 
            unit="%" 
            icon={<Droplet className="h-4 w-4 text-blue-500" />} 
            color={{bg: "bg-blue-100 dark:bg-blue-900/30", chart: "bg-blue-500"}}
          />
          <SensorDataCard 
            title="Soil pH " 
            data={sensorData.temperature} 
            unit="" 
            icon={<Thermometer className="h-4 w-4 text-red-500" />} 
            color={{bg: "bg-red-100 dark:bg-red-900/30", chart: "bg-red-500"}}
          />
          <SensorDataCard 
            title="Soil EC" 
            data={sensorData.soilHealth} 
            unit="%" 
            icon={<Leaf className="h-4 w-4 text-green-500" />} 
            color={{bg: "bg-green-100 dark:bg-green-900/30", chart: "bg-green-500"}}
          />
          <SensorDataCard 
            title="Sunlight" 
            data={sensorData.sunlight} 
            unit="%" 
            icon={<Sun className="h-4 w-4 text-yellow-500" />} 
            color={{bg: "bg-yellow-100 dark:bg-yellow-900/30", chart: "bg-yellow-500"}}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <GrowthChartCard />
          <YieldPredictionCard />
          <WeatherImpactCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
