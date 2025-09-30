"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  BarChart2, 
  Calendar, 
  ChevronRight, 
  Leaf, 
  Droplet, 
  Sun, 
  Thermometer, 
  Wind, 
  CloudRain, 
  Layers,
  Eye,
  PieChart,
  LineChart,
  GanttChart,
  ArrowRight,
  Clock,
  MapPin,
  Map,
  Sprout
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../../../components/ui/tabs";
// import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
// import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
// import { Chart } from "react-chartjs-2";

// Define the interfaces for sensor data
interface SoilData {
  pH: number;
  moisture: number;
  temperature: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  electricalConductivity: number;
  timestamp: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: string;
  timestamp: string;
}

interface Farm {
  id: string;
  name: string;
  location: string;
  area: string;
  crops: Crop[];
  soilType: string;
  lastUpdated: string;
  sensorData: {
    soil: SoilData[];
    weather: WeatherData[];
  };
  carbonCredits: number;
}

interface Crop {
  id: string;
  name: string;
  plantedDate: string;
  harvestDate: string;
  area: string;
  status: string;
  variety: string;
  expectedYield: string;
  actualYield?: string;
  soilRequirements: {
    idealPH: [number, number];
    idealMoisture: [number, number];
    idealTemperature: [number, number];
    nutrientRequirements: {
      nitrogen: string;
      phosphorus: string;
      potassium: string;
    };
  };
  notes: string;
  carbonCredits: number;
}

  // Mock Data Generator
const generateMockFarm = (farmId: string): Farm => {
  const crops: Crop[] = [
    {
      id: "crop1",
      name: "Wheat",
      plantedDate: "2025-06-15",
      harvestDate: "2025-11-20",
      area: "8 acres",
      status: "Growing",
      variety: "HD-2967",
      expectedYield: "32 quintals/acre",
      soilRequirements: {
        idealPH: [6.0, 7.5] as [number, number],
        idealMoisture: [60, 80] as [number, number],
        idealTemperature: [15, 24] as [number, number],
        nutrientRequirements: {
          nitrogen: "High",
          phosphorus: "Medium",
          potassium: "Medium"
        }
      },
      notes: "Wheat is thriving well, some minor issues with yellow leaf tips in the north section",
      carbonCredits: 45
    },
    {
      id: "crop2",
      name: "Rice",
      plantedDate: "2025-05-01",
      harvestDate: "2025-09-10",
      area: "5 acres",
      status: "Growing",
      variety: "Basmati-1121",
      expectedYield: "25 quintals/acre",
      soilRequirements: {
        idealPH: [5.5, 6.5] as [number, number],
        idealMoisture: [70, 90] as [number, number],
        idealTemperature: [20, 35] as [number, number],
        nutrientRequirements: {
          nitrogen: "High",
          phosphorus: "Medium",
          potassium: "Medium"
        }
      },
      notes: "Some pest issues detected in the eastern part of the field, need to monitor closely",
      carbonCredits: 30
    },
    {
      id: "crop3",
      name: "Maize",
      plantedDate: "2025-07-05",
      harvestDate: "2025-10-20",
      area: "4 acres",
      status: "Growing",
      variety: "DHM-117",
      expectedYield: "30 quintals/acre",
      soilRequirements: {
        idealPH: [5.8, 7.0] as [number, number],
        idealMoisture: [65, 75] as [number, number],
        idealTemperature: [20, 30] as [number, number],
        nutrientRequirements: {
          nitrogen: "High",
          phosphorus: "High",
          potassium: "Medium"
        }
      },
      notes: "Crop is growing well, implemented new irrigation technique this season",
      carbonCredits: 20
    }
  ];  // Generate 7 days of historical soil data
  const soilData: SoilData[] = [];
  const now = new Date();
  for (let i = 0; i < 168; i++) { // 7 days * 24 hours = 168 data points
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000)); // Every hour
    
    // Add some natural variation to the data
    const hourOfDay = timestamp.getHours();
    const isDaytime = hourOfDay > 6 && hourOfDay < 18;
    
    soilData.push({
      pH: 6.5 + (Math.random() * 0.6 - 0.3),
      moisture: 70 + (Math.random() * 10 - 5) + (isDaytime ? -3 : 2), // Lower during day, higher at night
      temperature: 22 + (Math.random() * 4 - 2) + (isDaytime ? 3 : -2), // Higher during day, lower at night
      nitrogen: 45 + (Math.random() * 8 - 4),
      phosphorus: 30 + (Math.random() * 6 - 3),
      potassium: 25 + (Math.random() * 5 - 2.5),
      organicMatter: 3.2 + (Math.random() * 0.4 - 0.2),
      electricalConductivity: 0.8 + (Math.random() * 0.2 - 0.1),
      timestamp: timestamp.toISOString()
    });
  }

  // Generate weather data for the same period
  const weatherData: WeatherData[] = [];
  for (let i = 0; i < 168; i++) {
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
    const hourOfDay = timestamp.getHours();
    const isDaytime = hourOfDay > 6 && hourOfDay < 18;
    
    
    weatherData.push({
      temperature: 25 + (Math.random() * 6 - 3) + (isDaytime ? 5 : -3),
      humidity: 65 + (Math.random() * 12 - 6) + (isDaytime ? -5 : 5),
      windSpeed: 10 + (Math.random() * 8 - 4),
      precipitation: Math.random() > 0.8 ? Math.random() * 5 : 0, // Occasional rain
      forecast: Math.random() > 0.7 ? "Sunny" : Math.random() > 0.4 ? "Partly Cloudy" : "Rainy",
      timestamp: timestamp.toISOString()
    });
  }


  return {
    id: farmId,
    name: farmId === "farm1" ? "North Farm" : 
          farmId === "farm2" ? "South Field" :
          farmId === "farm3" ? "East Plantation" : "West Orchard",
    location: farmId === "farm1" ? "Punjab" : 
              farmId === "farm2" ? "Haryana" :
              farmId === "farm3" ? "Uttar Pradesh" : "Himachal Pradesh",
    area: farmId === "farm1" ? "15 acres" : 
          farmId === "farm2" ? "12 acres" :
          farmId === "farm3" ? "8 acres" : "6 acres",
    crops: crops,
    soilType: farmId === "farm1" ? "Loamy" : 
              farmId === "farm2" ? "Clay" :
              farmId === "farm3" ? "Sandy Loam" : "Silty",
    lastUpdated: "2 hours ago",
    sensorData: {
      soil: soilData,
      weather: weatherData
    },
    carbonCredits: farmId === "farm1" ? 95 : 
                  farmId === "farm2" ? 72 :
                  farmId === "farm3" ? 43 : 25
  };
};

// Farm Overview Component
const FarmOverviewSection = ({ farm }: { farm: Farm }) => {
  // Get the most recent soil and weather data
  const latestSoilData = farm.sensorData.soil[0];
  const latestWeatherData = farm.sensorData.weather[0];
  
  const totalCarbonCredits = farm.carbonCredits;
  
  return (
    <div className="space-y-6">
      {/* Farm Information Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{farm.name}</h2>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{farm.location}</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Area</p>
                <p className="font-medium">{farm.area}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Soil Type</p>
                <p className="font-medium">{farm.soilType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Crops</p>
                <p className="font-medium">{farm.crops.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <p className="font-medium">{farm.lastUpdated}</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="rounded-lg overflow-hidden h-48 w-full md:w-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Map className="h-8 w-8 text-gray-400 dark:text-gray-600" />
            </div>
            <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">Farm map view</p>
          </div>
        </div>
      </Card>
      
      {/* Sensor Data Overview */}
      <div>
        <h3 className="text-xl font-bold mb-4">Live Sensor Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Soil Moisture */}
          <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Soil Moisture</p>
                <p className="text-2xl font-bold">{latestSoilData.moisture.toFixed(1)}%</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, latestSoilData.moisture)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              {latestSoilData.moisture < 60 ? "Low" : 
               latestSoilData.moisture > 80 ? "High" : "Optimal"} moisture level
            </p>
          </Card>
          
          {/* Soil pH */}
          <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Soil pH</p>
                <p className="text-2xl font-bold">{latestSoilData.pH.toFixed(1)}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${(latestSoilData.pH / 14) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              {latestSoilData.pH < 6.0 ? "Acidic" : 
               latestSoilData.pH > 7.5 ? "Alkaline" : "Neutral"} soil pH
            </p>
          </Card>
          
          {/* Temperature */}
          <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                <p className="text-2xl font-bold">{latestWeatherData.temperature.toFixed(1)}°C</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                <Thermometer className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">0°C</span>
              <div className="w-full mx-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-orange-600 h-2.5 rounded-full" 
                  style={{ width: `${(latestWeatherData.temperature / 50) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">50°C</span>
            </div>
          </Card>
          
          {/* Humidity */}
          <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="text-2xl font-bold">{latestWeatherData.humidity.toFixed(1)}%</p>
              </div>
              <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full">
                <CloudRain className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-teal-600 h-2.5 rounded-full" 
                style={{ width: `${latestWeatherData.humidity}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              {latestWeatherData.humidity < 40 ? "Low" : 
               latestWeatherData.humidity > 80 ? "High" : "Moderate"} humidity
            </p>
          </Card>
        </div>
      </div>
      
      {/* Soil Nutrient Composition */}
      <div>
        <h3 className="text-xl font-bold mb-4">Soil Nutrient Composition</h3>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nitrogen (N) */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Nitrogen (N)</p>
                <p className="font-bold text-green-600 dark:text-green-400">{latestSoilData.nitrogen.toFixed(1)} mg/kg</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${(latestSoilData.nitrogen / 100) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {latestSoilData.nitrogen < 40 ? "Low" : 
                 latestSoilData.nitrogen > 60 ? "High" : "Optimal"} nitrogen level
              </p>
            </div>
            
            {/* Phosphorus (P) */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Phosphorus (P)</p>
                <p className="font-bold text-blue-600 dark:text-blue-400">{latestSoilData.phosphorus.toFixed(1)} mg/kg</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(latestSoilData.phosphorus / 100) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {latestSoilData.phosphorus < 25 ? "Low" : 
                 latestSoilData.phosphorus > 45 ? "High" : "Optimal"} phosphorus level
              </p>
            </div>
            
            {/* Potassium (K) */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Potassium (K)</p>
                <p className="font-bold text-purple-600 dark:text-purple-400">{latestSoilData.potassium.toFixed(1)} mg/kg</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${(latestSoilData.potassium / 100) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {latestSoilData.potassium < 20 ? "Low" : 
                 latestSoilData.potassium > 40 ? "High" : "Optimal"} potassium level
              </p>
            </div>
            
            {/* Additional soil properties */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Organic Matter</p>
                <p className="font-bold text-amber-600 dark:text-amber-400">{latestSoilData.organicMatter.toFixed(1)}%</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-amber-600 h-2.5 rounded-full" 
                  style={{ width: `${(latestSoilData.organicMatter / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {latestSoilData.organicMatter < 2 ? "Low" : 
                 latestSoilData.organicMatter > 4 ? "High" : "Good"} organic content
              </p>
            </div>
            
            {/* EC */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Electrical Conductivity</p>
                <p className="font-bold text-red-600 dark:text-red-400">{latestSoilData.electricalConductivity.toFixed(2)} dS/m</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-red-600 h-2.5 rounded-full" 
                  style={{ width: `${(latestSoilData.electricalConductivity / 2) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {latestSoilData.electricalConductivity < 0.5 ? "Low salinity" : 
                 latestSoilData.electricalConductivity > 1 ? "High salinity" : "Normal"} level
              </p>
            </div>
            
            {/* Soil Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Soil Temperature</p>
                <p className="font-bold text-orange-600 dark:text-orange-400">{latestSoilData.temperature.toFixed(1)}°C</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-orange-600 h-2.5 rounded-full" 
                  style={{ width: `${(latestSoilData.temperature / 40) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {latestSoilData.temperature < 15 ? "Cool" : 
                 latestSoilData.temperature > 30 ? "Warm" : "Optimal"} for root growth
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Carbon Credits Summary */}
      {/* <div>
        <h3 className="text-xl font-bold mb-4">Carbon Credits</h3>
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Carbon Credits for this Farm</p>
              <div className="flex items-end">
                <p className="text-3xl font-bold">{totalCarbonCredits}</p>
                <p className="text-lg text-gray-500 dark:text-gray-400 ml-2">credits</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Offset equivalent: <span className="font-medium">{(totalCarbonCredits * 0.04).toFixed(1)} tons</span> of CO₂
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-2">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <Link
                href={`/carbon_credits`}
                className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center"
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </Card>
      </div> */}
      
      {/* Crop List */}
      <div>
        <h3 className="text-xl font-bold mb-4">Active Crops</h3>
        <div className="space-y-4">
          {farm.crops.map(crop => (
            <Link href={`/farms/${farm.id}/crops/${crop.id}`} key={crop.id}>
              <Card className="p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex items-start space-x-3 mb-4 sm:mb-0">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <Sprout className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">{crop.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Variety: {crop.variety}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-medium">{crop.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Area</p>
                      <p className="font-medium">{crop.area}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Planted</p>
                      <p className="font-medium">{new Date(crop.plantedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Expected Harvest</p>
                      <p className="font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <ChevronRight className="hidden sm:block h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sensor Data Component
const SensorData = ({ farm }: { farm: Farm }) => {
  const soilData = farm.sensorData.soil;
  const weatherData = farm.sensorData.weather;
  
  // Group data by day for charting
  const lastDay = soilData.slice(0, 24); // Last 24 hours
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Live Sensor Network</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Real-time data from sensors deployed across your farm. Monitoring soil and environmental conditions 24/7.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Soil Sensors</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Soil Moisture Sensors</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Soil pH Sensors</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Soil EC Sensors</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Air Temperature Sensor </span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Humidity Sensors</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
                            <div className="flex justify-between text-sm">
                <span>Rainfall Sensor</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Environmental Sensors</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Weather Station</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Humidity Sensors</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Wind Speed Sensors</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Rainfall Sensors</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Light Intensity Sensors</span>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last data sync: <span className="font-medium">2 minutes ago</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Battery status: <span className="font-medium">85%</span>
          </p>
        </div>
      </Card>
      
      
      {/* Soil Data Visualization */}
      <div>
        <h3 className="text-xl font-bold mb-4">Soil Conditions (Last 24 Hours)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Soil Moisture Chart */}
          <Card className="p-5">
            <h4 className="font-medium mb-3">Soil Moisture</h4>
            <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <LineChart className="h-12 w-12 text-gray-400" />
              <p className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                Chart visualization would be rendered here
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Min</p>
                <p className="font-medium">
                  {Math.min(...lastDay.map(d => d.moisture)).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Avg</p>
                <p className="font-medium">
                  {(lastDay.reduce((sum, d) => sum + d.moisture, 0) / lastDay.length).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Max</p>
                <p className="font-medium">
                  {Math.max(...lastDay.map(d => d.moisture)).toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
          
          {/* Soil Temperature Chart */}
          
          
          {/* Soil pH Chart */}
         
          

        </div>
      </div>
      
      {/* Weather Data Visualization */}

    </div>
  );
};

// Farm Analytics Component
const FarmAnalytics = ({ farm }: { farm: Farm }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Farm Performance Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Analytics and insights based on historical and real-time farm data
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <select className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-gray-800">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
              Export
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Area</p>
                <p className="text-2xl font-bold">{farm.area}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Map className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Crops</p>
                <p className="text-2xl font-bold">{farm.crops.length}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <Sprout className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Yield Forecast</p>
                <p className="text-2xl font-bold">
                  {farm.crops.reduce((sum, crop) => sum + parseInt(crop.expectedYield), 0)} qtl
                </p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                <BarChart2 className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </Card>
          
          {/* <Card className="p-4 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Credits</p>
                <p className="text-2xl font-bold">{farm.carbonCredits}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card> */}
        </div>
        
        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5 border">
            <h4 className="font-medium mb-4">Crop Growth vs. Ideal Conditions</h4>
            <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <GanttChart className="h-12 w-12 text-gray-400" />
              <p className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                Chart visualization would be rendered here
              </p>
            </div>
          </Card>
          
          <Card className="p-5 border">
            <h4 className="font-medium mb-4">Resource Usage Efficiency</h4>
            <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <PieChart className="h-12 w-12 text-gray-400" />
              <p className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                Chart visualization would be rendered here
              </p>
            </div>
          </Card>
          
          <Card className="p-5 border">
            <h4 className="font-medium mb-4">Soil Health Trends</h4>
            <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <LineChart className="h-12 w-12 text-gray-400" />
              <p className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                Chart visualization would be rendered here
              </p>
            </div>
          </Card>
          
          <Card className="p-5 border">
            <h4 className="font-medium mb-4">Carbon Credit Accumulation</h4>
            <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <BarChart2 className="h-12 w-12 text-gray-400" />
              <p className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                Chart visualization would be rendered here
              </p>
            </div>
          </Card>
        </div>
      </Card>
      
      {/* Insights and Recommendations */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">AI-Powered Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3">
                <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300">Water Management</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Soil moisture levels are trending below optimal for wheat crops. Consider increasing irrigation in the northern section by 15% over the next week.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
                <Sprout className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-300">Crop Health</h4>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                  Nutrient analysis indicates phosphorus deficiency in the rice crop. Adding 10kg/acre of balanced phosphorus fertilizer is recommended.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-start">
              <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-full mr-3">
                <Sun className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-orange-800 dark:text-orange-300">Weather Alert</h4>
                <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                  Heat stress risk detected for the next 3 days. Consider providing additional water and temporary shade for the maize crop.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-start">
              <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full mr-3">
                <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-purple-800 dark:text-purple-300">Yield Optimization</h4>
                <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                  Based on current growth patterns, wheat yield could be increased by 8% by adjusting irrigation timing to early morning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
// "use client";

// "use client";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ChartOptions as ChartJSOptions,
  ChartData,
  LinearScale,
  CategoryScale,
} from "chart.js";
import {
  MatrixController,
  MatrixElement,
  MatrixDataPoint,
} from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";

// ✅ Register all required components
ChartJS.register(
  MatrixController,
  MatrixElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale
);

// Extend MatrixDataPoint with "v"
type FarmDataPoint = MatrixDataPoint & { v: number };

const farmData: FarmDataPoint[] = [
  { x: 0, y: 0, v: 0.8 },
  { x: 1, y: 0, v: 0.6 },
  { x: 2, y: 0, v: 0.3 },
  { x: 0, y: 1, v: 0.9 },
  { x: 1, y: 1, v: 0.4 },
  { x: 2, y: 1, v: 0.2 },
  { x: 0, y: 2, v: 0.7 },
  { x: 1, y: 2, v: 0.5 },
  { x: 2, y: 2, v: 0.1 },
];

function getColor(value: number): string {
  const r = Math.floor(255 * (1 - value));
  const g = Math.floor(255 * value);
  return `rgb(${r},${g},0)`;
}

export  function Heatmap() {
  const data: ChartData<"matrix", FarmDataPoint[], unknown> = {
    datasets: [
      {
        label: "Farm Heatmap",
        data: farmData,
        backgroundColor: (ctx) =>
          getColor((ctx.raw as FarmDataPoint).v),
        width: ({ chart }) =>
          ((chart.chartArea?.width || 0) / 3) - 2,
        height: ({ chart }) =>
          ((chart.chartArea?.height || 0) / 3) - 2,
      },
    ],
  };

  const options: ChartJSOptions<"matrix"> = {
    responsive: true,
    scales: {
      x: {
        type: "linear", // ✅ now works
        position: "top",
        ticks: { stepSize: 1 },
      },
      y: {
        type: "linear", // ✅ now works
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `Health Index: ${((ctx.raw as FarmDataPoint).v * 100).toFixed(1)}%`,
        },
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Farm Health Heatmap</h2>
      <Chart type="matrix" data={data} options={options} />
    </div>
  );
}


// Farm Overview Dashboard Component
const FarmOverview = ({ farm }: { farm: Farm }) => {
  // Calculate total carbon credits
  const totalCarbonCredits = farm.crops.reduce((sum, crop) => sum + crop.carbonCredits, 0);
  
  return (
    <div className="space-y-8">
      {/* Farm Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Area</p>
              <p className="text-2xl font-bold">{farm.area}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Map className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Crops</p>
              <p className="text-2xl font-bold">{farm.crops.length}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <Sprout className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Yield Forecast</p>
              <p className="text-2xl font-bold">
                {farm.crops.reduce((sum, crop) => sum + parseInt(crop.expectedYield), 0)} qtl
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
              <BarChart2 className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>
        
        {/* <Card className="p-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Credits</p>
              <p className="text-2xl font-bold">{totalCarbonCredits}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card> */}
      </div>
      
      {/* Crop List */}
      <div>
        <h3 className="text-xl font-bold mb-4">Active Crops</h3>
        <div className="space-y-4">
          {farm.crops.map(crop => (
            <Link href={`/farms/${farm.id}/crops/${crop.id}`} key={crop.id}>
              <Card className="p-5 hover:shadow-md transition-shadow border">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex items-start space-x-3 mb-4 sm:mb-0">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <Sprout className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">{crop.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Variety: {crop.variety}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-medium">{crop.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Area</p>
                      <p className="font-medium">{crop.area}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Planted</p>
                      <p className="font-medium">{new Date(crop.plantedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Expected Harvest</p>
                      <p className="font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <ChevronRight className="hidden sm:block h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Farm Detail Page
export default function FarmDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [farm, setFarm] = useState<Farm | null>(null);
  
  useEffect(() => {
    if (params.farmId) {
      // In a real app, this would be an API call
      const mockFarm = generateMockFarm(params.farmId as string);
      setFarm(mockFarm);
    }
  }, [params.farmId]);
  
  if (status === "loading" || !farm) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to view farm details</p>
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
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Link 
            href="/farms"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            My Farms
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium">{farm.name}</span>
        </div>
        
        {/* Quick Access Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {/* <Link 
            href={`/farms/${farm.id}/prediction`}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors"
          >
            <Sprout className="mr-2 h-4 w-4" />
            Crop Prediction
          </Link> */}
          
          {/* <Link 
            href={`/farms/${farm.id}/carbon`}
            className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40 rounded-md text-sm transition-colors"
          >
            <Leaf className="mr-2 h-4 w-4" />
            Carbon Credits
          </Link> */}
          
          <Link 
            href={`/farms/${farm.id}/crops`}
            className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40 rounded-md text-sm transition-colors"
          >
            <PieChart className="mr-2 h-4 w-4" />
            View All Crops
          </Link>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="sensor" className="text-sm">Sensor Data</TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
            {/* <TabsTrigger value="prediction" className="text-sm">Crop Prediction</TabsTrigger> */}
            {/* <TabsTrigger value="carbon" className="text-sm">Carbon Credits</TabsTrigger> */}
            <TabsTrigger value="hyperspectral" className="text-sm">Hyperspectral Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <FarmOverviewSection farm={farm} />
          </TabsContent>
          
          <TabsContent value="sensor">
            <SensorData farm={farm} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <FarmAnalytics farm={farm} />
          </TabsContent>
          <TabsContent value="hyperspectral">
            <Heatmap/>
          </TabsContent>
          
          {/* <TabsContent value="prediction">
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">Crop Prediction</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                View detailed crop predictions for this farm
              </p>
              <Link 
                href={`/farms/${farm.id}/prediction`}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Go to Crop Prediction
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </TabsContent> */}
          
          {/* <TabsContent value="carbon">
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">Carbon Credits</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Track and manage carbon credits for this farm
              </p>
              <Link 
                href={`/farms/${farm.id}/carbon`}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                View Carbon Credits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
