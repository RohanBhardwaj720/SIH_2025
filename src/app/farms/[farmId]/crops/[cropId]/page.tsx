"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Sprout,
  AlertTriangle,
  ArrowUpRight,
  Zap,
  Calculator
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../../../../../components/ui/tabs";

// Define interfaces
interface SoilRequirement {
  idealPH: [number, number];
  idealMoisture: [number, number];
  idealTemperature: [number, number];
  nutrientRequirements: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
  };
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
  soilRequirements: SoilRequirement;
  notes: string;
  carbonCredits: number;
}

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
  rainfall: number;
  forecast: {
    date: string;
    condition: string;
    tempMin: number;
    tempMax: number;
    rainfall: number;
  }[];
  timestamp: string;
}

// Mock data generator
const getCropData = (farmId: string, cropId: string): Crop => {
  // In a real app, this would fetch from an API
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
        idealPH: [6.0, 7.5],
        idealMoisture: [60, 80],
        idealTemperature: [15, 24],
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
        idealPH: [5.5, 6.5],
        idealMoisture: [70, 90],
        idealTemperature: [20, 35],
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
        idealPH: [5.8, 7.0],
        idealMoisture: [65, 75],
        idealTemperature: [20, 30],
        nutrientRequirements: {
          nitrogen: "High",
          phosphorus: "High",
          potassium: "Medium"
        }
      },
      notes: "Crop is growing well, implemented new irrigation technique this season",
      carbonCredits: 20
    }
  ];
  
  return crops.find(crop => crop.id === cropId) || crops[0];
};

// Generate mock sensor data
const generateSensorData = (): SoilData => {
  return {
    pH: 6.2,
    moisture: 72,
    temperature: 22,
    nitrogen: 65,
    phosphorus: 45,
    potassium: 80,
    organicMatter: 3.5,
    electricalConductivity: 0.7,
    timestamp: "2025-09-11T08:30:00Z"
  };
};

// Generate mock weather data
const generateWeatherData = (): WeatherData => {
  return {
    temperature: 25,
    humidity: 65,
    windSpeed: 8,
    rainfall: 0,
    forecast: [
      { date: "2025-09-12", condition: "Sunny", tempMin: 22, tempMax: 28, rainfall: 0 },
      { date: "2025-09-13", condition: "Partly Cloudy", tempMin: 21, tempMax: 29, rainfall: 0 },
      { date: "2025-09-14", condition: "Rain", tempMin: 19, tempMax: 24, rainfall: 15 },
      { date: "2025-09-15", condition: "Cloudy", tempMin: 18, tempMax: 23, rainfall: 5 },
      { date: "2025-09-16", condition: "Sunny", tempMin: 20, tempMax: 27, rainfall: 0 }
    ],
    timestamp: "2025-09-11T08:30:00Z"
  };
};

// Component for the gauge meter visualization
const GaugeMeter = ({ 
  value, 
  min, 
  max, 
  idealMin, 
  idealMax, 
  unit, 
  label 
}: { 
  value: number; 
  min: number; 
  max: number; 
  idealMin: number; 
  idealMax: number; 
  unit: string; 
  label: string; 
}) => {
  // Calculate percentage position on the gauge
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Determine if the value is within ideal range
  const isIdeal = value >= idealMin && value <= idealMax;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className={`text-sm font-medium ${isIdeal ? 'text-green-600' : 'text-amber-600'}`}>
          {value}{unit}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${isIdeal ? 'bg-green-500' : 'bg-amber-500'}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
        <span>{min}{unit}</span>
        <span className="text-green-600 dark:text-green-400">Ideal: {idealMin}-{idealMax}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

// Component for displaying nutrient level
const NutrientLevel = ({ 
  level, 
  required, 
  label 
}: { 
  level: number; 
  required: string; 
  label: string; 
}) => {
  let color = "bg-amber-500";
  let textColor = "text-amber-600";
  let statusText = "Low";
  
  if (required === "High" && level >= 70) {
    color = "bg-green-500";
    textColor = "text-green-600";
    statusText = "Optimal";
  } else if (required === "Medium" && level >= 50) {
    color = "bg-green-500";
    textColor = "text-green-600";
    statusText = "Optimal";
  } else if (required === "Low" && level >= 20) {
    color = "bg-green-500";
    textColor = "text-green-600";
    statusText = "Optimal";
  }
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className={`text-sm font-medium ${textColor}`}>
          {statusText} ({level}%)
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Required level: <span className="font-medium">{required}</span>
      </div>
    </div>
  );
};

// Component for recommendation card
const RecommendationCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
}) => {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
      <div className="flex items-start">
        <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-blue-800 dark:text-blue-300">{title}</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main page component
export default function CropPage() {
  const params = useParams();
  const router = useRouter();
  const farmId = params.farmId as string;
  const cropId = params.cropId as string;
  
  const [crop, setCrop] = useState<Crop | null>(null);
  const [sensorData, setSensorData] = useState<SoilData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  useEffect(() => {
    // In a real app, these would be API calls
    setCrop(getCropData(farmId, cropId));
    setSensorData(generateSensorData());
    setWeatherData(generateWeatherData());
  }, [farmId, cropId]);
  
  if (!crop || !sensorData || !weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Calculate days to harvest
  const daysToHarvest = () => {
    const today = new Date();
    const harvestDate = new Date(crop.harvestDate);
    const diffTime = harvestDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-6">
          <Link href="/farms" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            Farms
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link href={`/farms/${farmId}`} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            Farm Details
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="font-medium text-gray-900 dark:text-white">{crop.name}</span>
        </nav>
        
        {/* Crop Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold">{crop.name}</h1>
              <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                crop.status === "Growing" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                crop.status === "Harvested" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
              }`}>
                {crop.status}
              </span>
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
              <Sprout className="h-4 w-4 mr-1" /> Variety: {crop.variety}
              <span className="mx-2">•</span>
              <Map className="h-4 w-4 mr-1" /> Area: {crop.area}
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0">
            <button className="mr-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Edit Crop
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
              View Health Report
            </button>
          </div>
        </div>
        
        {/* Crop Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Days Until Harvest</p>
                <p className="text-2xl font-bold">{daysToHarvest()}</p>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Planted</p>
              <p className="text-sm font-medium">{formatDate(crop.plantedDate)}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Expected Harvest</p>
              <p className="text-sm font-medium">{formatDate(crop.harvestDate)}</p>
            </div>
          </Card>
          
          <Card className="p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expected Yield</p>
                <p className="text-2xl font-bold">{crop.expectedYield}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <BarChart2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Trend</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  5% above forecast
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Year's Yield</p>
              <p className="text-sm font-medium">28 quintals/acre</p>
            </div>
          </Card>
          
          <Card className="p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Credits</p>
                <p className="text-2xl font-bold">{crop.carbonCredits}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Credit Value</p>
              <p className="text-sm font-medium">₹{crop.carbonCredits * 750}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">YoY Change</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  12% increase
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Tabs for crop details */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="soil" className="text-sm">Soil Data</TabsTrigger>
            <TabsTrigger value="weather" className="text-sm">Weather</TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
            <TabsTrigger value="recommendations" className="text-sm">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="p-6 border mb-6">
                  <h3 className="text-lg font-semibold mb-4">Crop Information</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Variety</p>
                      <p className="font-medium">{crop.variety}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
                      <p className="font-medium">{crop.area}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-medium">{crop.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expected Yield</p>
                      <p className="font-medium">{crop.expectedYield}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Planted Date</p>
                      <p className="font-medium">{formatDate(crop.plantedDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expected Harvest</p>
                      <p className="font-medium">{formatDate(crop.harvestDate)}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border">
                  <h3 className="text-lg font-semibold mb-4">Notes</h3>
                  <p className="text-gray-700 dark:text-gray-300">{crop.notes}</p>
                </Card>
              </div>
              
              <div>
                <Card className="p-6 border mb-6">
                  <h3 className="text-lg font-semibold mb-4">Ideal Growing Conditions</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">pH Level</p>
                      <p className="font-medium">{crop.soilRequirements.idealPH[0]} - {crop.soilRequirements.idealPH[1]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Moisture</p>
                      <p className="font-medium">{crop.soilRequirements.idealMoisture[0]}% - {crop.soilRequirements.idealMoisture[1]}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                      <p className="font-medium">{crop.soilRequirements.idealTemperature[0]}°C - {crop.soilRequirements.idealTemperature[1]}°C</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mt-2">Nutrient Requirements:</p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Nitrogen</p>
                          <p className="text-sm font-medium">{crop.soilRequirements.nutrientRequirements.nitrogen}</p>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Phosphorus</p>
                          <p className="text-sm font-medium">{crop.soilRequirements.nutrientRequirements.phosphorus}</p>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Potassium</p>
                          <p className="text-sm font-medium">{crop.soilRequirements.nutrientRequirements.potassium}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <div className="grid grid-cols-1 gap-4">
                  <Link href={`/farms/${farmId}/crops/${cropId}/predictions`}>
                    <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors">
                      <BarChart2 className="h-5 w-5" /> Yield Predictions
                    </button>
                  </Link>
                  <Link href={`/farms/${farmId}/crops/${cropId}/analytics`}>
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors">
                      <LineChart className="h-5 w-5" /> View Analytics
                    </button>
                  </Link>
                  <Link href={`/farms/${farmId}/crops/${cropId}/carbon`}>
                    <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-700 py-2.5 px-4 rounded-lg font-medium transition-colors">
                      <Leaf className="h-5 w-5" /> Carbon Credits
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="soil">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="p-6 border mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Current Soil Conditions</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last updated: {new Date(sensorData.timestamp).toLocaleString()}
                    </p>
                  </div>
                  
                  <h4 className="font-medium mb-4">pH & Moisture Levels</h4>
                  <div className="space-y-6">
                    <GaugeMeter 
                      value={sensorData.pH} 
                      min={4.0} 
                      max={9.0} 
                      idealMin={crop.soilRequirements.idealPH[0]} 
                      idealMax={crop.soilRequirements.idealPH[1]} 
                      unit="" 
                      label="pH Level" 
                    />
                    
                    <GaugeMeter 
                      value={sensorData.moisture} 
                      min={0} 
                      max={100} 
                      idealMin={crop.soilRequirements.idealMoisture[0]} 
                      idealMax={crop.soilRequirements.idealMoisture[1]} 
                      unit="%" 
                      label="Soil Moisture" 
                    />
                    
                    <GaugeMeter 
                      value={sensorData.temperature} 
                      min={0} 
                      max={40} 
                      idealMin={crop.soilRequirements.idealTemperature[0]} 
                      idealMax={crop.soilRequirements.idealTemperature[1]} 
                      unit="°C" 
                      label="Soil Temperature" 
                    />
                  </div>
                  
                  <h4 className="font-medium mt-8 mb-4">Nutrient Levels</h4>
                  <div className="space-y-6">
                    <NutrientLevel 
                      level={sensorData.nitrogen} 
                      required={crop.soilRequirements.nutrientRequirements.nitrogen} 
                      label="Nitrogen (N)" 
                    />
                    
                    <NutrientLevel 
                      level={sensorData.phosphorus} 
                      required={crop.soilRequirements.nutrientRequirements.phosphorus} 
                      label="Phosphorus (P)" 
                    />
                    
                    <NutrientLevel 
                      level={sensorData.potassium} 
                      required={crop.soilRequirements.nutrientRequirements.potassium} 
                      label="Potassium (K)" 
                    />
                  </div>
                  
                  <h4 className="font-medium mt-8 mb-4">Additional Soil Metrics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Organic Matter</p>
                      <p className="text-xl font-medium">{sensorData.organicMatter}%</p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Good (≥2.5% is considered healthy)
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Electrical Conductivity</p>
                      <p className="text-xl font-medium">{sensorData.electricalConductivity} dS/m</p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Normal (0.6-1.2 dS/m is optimal)
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div>
                <Card className="p-6 border mb-6">
                  <h3 className="text-lg font-semibold mb-4">Soil Health Score</h3>
                  
                  <div className="relative pt-1 mb-6">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 dark:bg-green-900 dark:text-green-300">
                          Healthy
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                          85%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                      <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-3">Soil Health Analysis</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-0.5 mr-2">
                        <Droplet className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span>Moisture level is optimal for current growth stage</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-0.5 mr-2">
                        <Thermometer className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span>Soil temperature is within ideal range</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full mt-0.5 mr-2">
                        <AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span>Phosphorus levels are slightly below optimal</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-0.5 mr-2">
                        <Zap className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span>Electrical conductivity indicates good nutrient availability</span>
                    </li>
                  </ul>
                </Card>
                
                <Card className="p-6 border">
                  <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                  
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 mb-4">
                    <div className="flex items-start">
                      <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-full mr-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-300">Phosphorus Deficiency</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                          Add 10kg/acre of balanced phosphorus fertilizer to address the deficiency in the next 7 days.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/farms/${farmId}/crops/${cropId}/recommendations`}>
                    <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors mt-2">
                      <Leaf className="h-5 w-5" /> View All Recommendations
                    </button>
                  </Link>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="weather">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="p-6 border mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Current Weather Conditions</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last updated: {new Date(weatherData.timestamp).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-2">
                        <Thermometer className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-2">
                        <Droplet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-2">
                        <Wind className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-2xl font-bold">{weatherData.windSpeed} km/h</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-2">
                        <CloudRain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-2xl font-bold">{weatherData.rainfall} mm</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Rainfall</p>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-4">5-Day Forecast</h4>
                  <div className="space-y-4">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center">
                          <div className="mr-4 w-10 text-center">
                            <p className="text-sm font-medium">{day.date.split('-')[2]}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(day.date).toLocaleString('default', { month: 'short' })}
                            </p>
                          </div>
                          
                          <div>
                            {day.condition === "Sunny" && <Sun className="h-8 w-8 text-yellow-500" />}
                            {day.condition === "Partly Cloudy" && <CloudRain className="h-8 w-8 text-gray-500" />}
                            {day.condition === "Rain" && <CloudRain className="h-8 w-8 text-blue-500" />}
                            {day.condition === "Cloudy" && <CloudRain className="h-8 w-8 text-gray-500" />}
                          </div>
                          
                          <div className="ml-4">
                            <p className="text-sm font-medium">{day.condition}</p>
                            {day.rainfall > 0 && (
                              <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                                <CloudRain className="h-3 w-3 mr-1" /> {day.rainfall} mm
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <p className="text-sm font-medium">{day.tempMin}° - {day.tempMax}°</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              <div>
                <Card className="p-6 border mb-6">
                  <h3 className="text-lg font-semibold mb-4">Weather Impact</h3>
                  
                  <div className="relative pt-1 mb-6">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 dark:bg-green-900 dark:text-green-300">
                          Favorable
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                          90%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                      <div style={{ width: "90%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-3">Crop-specific Analysis</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-0.5 mr-2">
                        <Thermometer className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span>Current temperature range is optimal for {crop.name.toLowerCase()} growth</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-0.5 mr-2">
                        <CloudRain className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span>Expected rainfall will provide adequate moisture</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full mt-0.5 mr-2">
                        <AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span>Monitor humidity levels as they may promote fungal growth</span>
                    </li>
                  </ul>
                </Card>
                
                <Card className="p-6 border">
                  <h3 className="text-lg font-semibold mb-4">Weather Alerts</h3>
                  
                  <div className="space-y-4">
                    <RecommendationCard 
                      title="Rainfall Alert" 
                      description="Heavy rainfall expected on September 14. Consider delaying any planned fertilizer application until after the rain." 
                      icon={<CloudRain className="h-5 w-5 text-blue-600 dark:text-blue-400" />} 
                    />
                    
                    <Link href={`/farms/${farmId}/crops/${cropId}/weather`}>
                      <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors mt-2">
                        <CloudRain className="h-5 w-5" /> View Weather Forecast
                      </button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border">
                <h3 className="text-lg font-semibold mb-4">Growth Timeline</h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Growth chart visualization will appear here</p>
                </div>
              </Card>
              
              <Card className="p-6 border">
                <h3 className="text-lg font-semibold mb-4">Soil Nutrient Trends</h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Nutrient trend chart will appear here</p>
                </div>
              </Card>
              
              <Card className="p-6 border">
                <h3 className="text-lg font-semibold mb-4">Yield Comparison</h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Yield comparison chart will appear here</p>
                </div>
              </Card>
              
              <Card className="p-6 border">
                <h3 className="text-lg font-semibold mb-4">Resource Usage</h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Resource usage chart will appear here</p>
                </div>
              </Card>
            </div>
            
            <div className="mt-6 text-center">
              <Link href={`/farms/${farmId}/crops/${cropId}/analytics`}>
                <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                  View Detailed Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 mb-2">
                <Card className="p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">AI-Powered Recommendations</h3>
                    <span className="px-2.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded-full">
                      Updated Today
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    These recommendations are generated based on current soil conditions, weather forecasts, and historical crop data.
                  </p>
                </Card>
              </div>
              
              <Card className="p-6 border">
                <h3 className="text-lg font-semibold mb-4">Fertilizer Recommendations</h3>
                <div className="space-y-4">
                  <RecommendationCard 
                    title="Apply Phosphorus Fertilizer" 
                    description="Add 10kg/acre of balanced phosphorus fertilizer to address the deficiency in the next 7 days." 
                    icon={<Sprout className="h-5 w-5 text-blue-600 dark:text-blue-400" />} 
                  />
                  
                  <RecommendationCard 
                    title="Micronutrient Application" 
                    description="Apply foliar spray with zinc and boron to support reproductive growth stage." 
                    icon={<Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />} 
                  />
                </div>
              </Card>
              
              <Card className="p-6 border">
                <h3 className="text-lg font-semibold mb-4">Irrigation Recommendations</h3>
                <div className="space-y-4">
                  <RecommendationCard 
                    title="Adjust Irrigation Schedule" 
                    description="Due to forecasted rain on Sept 14, reduce irrigation by 30% for the next 5 days." 
                    icon={<CloudRain className="h-5 w-5 text-blue-600 dark:text-blue-400" />} 
                  />
                </div>
              </Card>
              
              <Card className="p-6 border">
                <h3 className="text-lg font-semibold mb-4">Pest & Disease Management</h3>
                <div className="space-y-4">
                  <RecommendationCard 
                    title="Preventive Fungicide Application" 
                    description="Apply fungicide within the next 5 days to prevent potential fungal diseases due to upcoming humid conditions." 
                    icon={<AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />} 
                  />
                </div>
              </Card>
              
              <Card className="p-6 border">
                <h3 className="text-lg font-semibold mb-4">Harvesting Plan</h3>
                <div className="space-y-4">
                  <RecommendationCard 
                    title="Prepare Harvesting Equipment" 
                    description="Begin maintenance checks on harvesting equipment as crop is approaching maturity stage." 
                    icon={<Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />} 
                  />
                </div>
              </Card>
            </div>
            
            <div className="mt-6 text-center">
              <Link href={`/farms/${farmId}/crops/${cropId}/recommendations`}>
                <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                  Get Custom Action Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Quick action buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Link href={`/farms/${farmId}/crops/${cropId}/predictions`}>
            <button className="w-full flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <BarChart2 className="h-6 w-6 text-green-600 dark:text-green-500 mb-2" />
              <span className="text-sm font-medium">Yield Forecast</span>
            </button>
          </Link>
          
          <Link href={`/farms/${farmId}/crops/${cropId}/analytics`}>
            <button className="w-full flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-500 mb-2" />
              <span className="text-sm font-medium">Analytics</span>
            </button>
          </Link>
          
          <Link href={`/farms/${farmId}/crops/${cropId}/carbon`}>
            <button className="w-full flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-500 mb-2" />
              <span className="text-sm font-medium">Carbon Credits</span>
            </button>
          </Link>
          
          <Link href={`/farms/${farmId}/crops/${cropId}/management`}>
            <button className="w-full flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Calculator className="h-6 w-6 text-purple-600 dark:text-purple-500 mb-2" />
              <span className="text-sm font-medium">Resource Planning</span>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
