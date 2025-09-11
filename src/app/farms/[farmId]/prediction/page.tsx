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
  PieChart,
  LineChart,
  ArrowLeft,
  Sprout,
  AlertTriangle
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

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

interface CropPrediction {
  name: string;
  variety: string;
  suitabilityScore: number;
  expectedYield: string;
  plantingWindow: string;
  harvestWindow: string;
  waterRequirement: string;
  fertilizerRequirement: string;
  soilSuitability: string;
  climateRisk: string;
  marketDemand: string;
  profitMargin: string;
}

const farmId = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentSoilData, setCurrentSoilData] = useState<SoilData | null>(null);
  const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData | null>(null);
  const [cropPredictions, setCropPredictions] = useState<CropPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock soil data
      setCurrentSoilData({
        pH: 6.5 + (Math.random() * 0.6 - 0.3),
        moisture: 70 + (Math.random() * 10 - 5),
        temperature: 22 + (Math.random() * 4 - 2),
        nitrogen: 45 + (Math.random() * 8 - 4),
        phosphorus: 30 + (Math.random() * 6 - 3),
        potassium: 25 + (Math.random() * 5 - 2.5),
        organicMatter: 3.2 + (Math.random() * 0.4 - 0.2),
        electricalConductivity: 0.8 + (Math.random() * 0.2 - 0.1),
        timestamp: new Date().toISOString()
      });
      
      // Mock weather data
      setCurrentWeatherData({
        temperature: 25 + (Math.random() * 6 - 3),
        humidity: 65 + (Math.random() * 12 - 6),
        windSpeed: 10 + (Math.random() * 8 - 4),
        precipitation: Math.random() < 0.2 ? Math.random() * 5 : 0,
        forecast: Math.random() < 0.7 ? "Sunny" : Math.random() < 0.85 ? "Cloudy" : "Rainy",
        timestamp: new Date().toISOString()
      });
      
      // Mock crop predictions
      setCropPredictions([
        {
          name: "Rice",
          variety: "Basmati-1121",
          suitabilityScore: 92,
          expectedYield: "25 quintals/acre",
          plantingWindow: "June - July",
          harvestWindow: "October - November",
          waterRequirement: "High",
          fertilizerRequirement: "Medium",
          soilSuitability: "Excellent",
          climateRisk: "Low",
          marketDemand: "High",
          profitMargin: "Good"
        },
        {
          name: "Wheat",
          variety: "HD-2967",
          suitabilityScore: 88,
          expectedYield: "32 quintals/acre",
          plantingWindow: "November - December",
          harvestWindow: "April - May",
          waterRequirement: "Medium",
          fertilizerRequirement: "Medium",
          soilSuitability: "Good",
          climateRisk: "Low",
          marketDemand: "High",
          profitMargin: "Good"
        },
        {
          name: "Maize",
          variety: "DHM-117",
          suitabilityScore: 78,
          expectedYield: "30 quintals/acre",
          plantingWindow: "June - July",
          harvestWindow: "September - October",
          waterRequirement: "Medium",
          fertilizerRequirement: "High",
          soilSuitability: "Good",
          climateRisk: "Medium",
          marketDemand: "Medium",
          profitMargin: "Medium"
        },
        {
          name: "Cotton",
          variety: "Bt Cotton",
          suitabilityScore: 72,
          expectedYield: "12 quintals/acre",
          plantingWindow: "April - May",
          harvestWindow: "October - December",
          waterRequirement: "Medium",
          fertilizerRequirement: "High",
          soilSuitability: "Moderate",
          climateRisk: "Medium",
          marketDemand: "High",
          profitMargin: "High"
        },
        {
          name: "Sugarcane",
          variety: "CoS 8436",
          suitabilityScore: 65,
          expectedYield: "400 quintals/acre",
          plantingWindow: "February - March",
          harvestWindow: "December - March",
          waterRequirement: "Very High",
          fertilizerRequirement: "Very High",
          soilSuitability: "Moderate",
          climateRisk: "Medium",
          marketDemand: "Stable",
          profitMargin: "Medium"
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [params.farmId]);

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to view crop predictions</p>
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
          <Link 
            href={`/farms/${params.farmId}`}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Farm Details
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium">Crop Prediction</span>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Crop Prediction</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your farm's soil conditions, weather data, and historical performance, here are the best crop recommendations.
          </p>
        </div>
        
        {/* Current Soil & Weather Conditions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Farm Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Soil Conditions */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Layers className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
                Soil Conditions
              </h3>
              
              {currentSoilData && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">pH Level</p>
                    <p className="font-medium">{currentSoilData.pH.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Moisture</p>
                    <p className="font-medium">{currentSoilData.moisture.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nitrogen (N)</p>
                    <p className="font-medium">{currentSoilData.nitrogen.toFixed(1)} mg/kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phosphorus (P)</p>
                    <p className="font-medium">{currentSoilData.phosphorus.toFixed(1)} mg/kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Potassium (K)</p>
                    <p className="font-medium">{currentSoilData.potassium.toFixed(1)} mg/kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Organic Matter</p>
                    <p className="font-medium">{currentSoilData.organicMatter.toFixed(1)}%</p>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Weather Conditions */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <CloudRain className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Weather Conditions
              </h3>
              
              {currentWeatherData && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                    <p className="font-medium">{currentWeatherData.temperature.toFixed(1)}°C</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                    <p className="font-medium">{currentWeatherData.humidity.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                    <p className="font-medium">{currentWeatherData.windSpeed.toFixed(1)} km/h</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Precipitation</p>
                    <p className="font-medium">{currentWeatherData.precipitation.toFixed(1)} mm</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Forecast</p>
                    <p className="font-medium">{currentWeatherData.forecast}</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
        
        {/* Crop Recommendations */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Crops</h2>
          <div className="space-y-4">
            {cropPredictions.map((crop, index) => (
              <Card 
                key={index}
                className={`p-6 border-l-4 ${
                  crop.suitabilityScore >= 90 ? 'border-l-green-500' : 
                  crop.suitabilityScore >= 80 ? 'border-l-green-400' : 
                  crop.suitabilityScore >= 70 ? 'border-l-yellow-500' : 
                  crop.suitabilityScore >= 60 ? 'border-l-orange-500' : 
                  'border-l-red-500'
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center mb-2">
                      <Sprout className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-semibold">{crop.name}</h3>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({crop.variety})</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            crop.suitabilityScore >= 90 ? 'bg-green-500' : 
                            crop.suitabilityScore >= 80 ? 'bg-green-400' : 
                            crop.suitabilityScore >= 70 ? 'bg-yellow-500' : 
                            crop.suitabilityScore >= 60 ? 'bg-orange-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${crop.suitabilityScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{crop.suitabilityScore}% Suitable</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Expected Yield</p>
                        <p className="font-medium">{crop.expectedYield}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Planting Window</p>
                        <p className="font-medium">{crop.plantingWindow}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Harvest Window</p>
                        <p className="font-medium">{crop.harvestWindow}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Market Demand</p>
                        <p className="font-medium">{crop.marketDemand}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Water Requirement</p>
                        <p className="font-medium">{crop.waterRequirement}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Fertilizer Need</p>
                        <p className="font-medium">{crop.fertilizerRequirement}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Soil Suitability</p>
                        <p className="font-medium">{crop.soilSuitability}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Profit Margin</p>
                        <p className="font-medium">{crop.profitMargin}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 lg:ml-4">
                    <button 
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors w-full lg:w-auto flex items-center justify-center"
                    >
                      <Sprout className="h-4 w-4 mr-1" />
                      Plant This Crop
                    </button>
                    <button 
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-md text-sm font-medium transition-colors w-full lg:w-auto flex items-center justify-center"
                    >
                      <BarChart2 className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
                
                {index === 0 && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-800 dark:text-green-300">
                        <strong>AI Recommendation:</strong> Based on your soil conditions and the current market trends, rice is your best option. Your soil's pH level is ideal for rice cultivation, and the expected rainfall in the coming months will support optimal growth.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link 
            href={`/farms/${params.farmId}`}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Farm Details
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default farmId;
