"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Map, 
  Sprout, 
  BarChart2, 
  Leaf, 
  Droplet, 
  Sun, 
  Thermometer, 
  Wind, 
  CloudRain, 
  ChevronRight 
} from "lucide-react";
import { Card } from "@/components/ui/card";

// Define types
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
  actualYield?: string;
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

// FarmOverview component
const FarmOverview = ({ farm }: { farm: Farm }) => {
  // Calculate total carbon credits
  const totalCarbonCredits = farm.crops.reduce((sum, crop) => sum + crop.carbonCredits, 0);
  
  // Latest sensor data
  const latestSoilData = farm.sensorData.soil[0];
  const latestWeatherData = farm.sensorData.weather[0];
  
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
        
        <Card className="p-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Credits</p>
              <p className="text-2xl font-bold">{farm.carbonCredits}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Farm Overview */}
      <Card className="p-6 border">
        <h3 className="text-lg font-semibold mb-4">Farm Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-medium">{farm.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Soil Type</p>
                <p className="font-medium">{farm.soilType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <p className="font-medium">{farm.lastUpdated}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Conditions</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                  <span>{latestWeatherData.temperature.toFixed(1)}°C</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 text-blue-500 mr-2" />
                  <span>{latestWeatherData.humidity.toFixed(1)}% Humidity</span>
                </div>
                <div className="flex items-center">
                  <Wind className="h-4 w-4 text-teal-500 mr-2" />
                  <span>{latestWeatherData.windSpeed.toFixed(1)} km/h</span>
                </div>
                <div className="flex items-center">
                  <Sun className="h-4 w-4 text-amber-500 mr-2" />
                  <span>{latestSoilData.moisture.toFixed(1)}% Soil Moisture</span>
                </div>
              </div>
            </div>
            
            <Link 
              href={`/farms/${farm.id}/sensor-network`}
              className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center"
            >
              View Sensor Network Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </Card>
      
      {/* Carbon Credits Summary */}
      <div>
        <Card className="p-6 border">
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
                href={`/carbon_credits?farmId=${farm.id}`}
                className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center"
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </Card>
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

export default FarmOverview;
