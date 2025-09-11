"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  BarChart2, 
  Droplet, 
  Sun, 
  Thermometer, 
  Wind, 
  Calendar, 
  Leaf, 
  PieChart,
  ArrowRight,
  HelpCircle,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Farm {
  id: string;
  name: string;
  location: string;
  area: number;
  currentCrop?: string;
  soilType: string;
}

interface PredictionResult {
  crop: string;
  confidence: number;
  yield: number;
  revenue: number;
  growingPeriod: string;
  waterRequirements: string;
  fertilizerRecommendation: string;
  diseaseRisk: string;
}

interface RecommendedCropCardProps {
  crop: string;
  confidence: number;
  index: number;
}

const RecommendedCropCard = ({ crop, confidence, index }: RecommendedCropCardProps) => {
  const colors = [
    { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400" },
    { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
    { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
  ];
  
  const color = colors[index % colors.length];
  
  return (
    <div className="flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
      <div className={`p-3 rounded-full ${color.bg} mr-4`}>
        <Leaf className={`h-6 w-6 ${color.text}`} />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">{crop}</h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
          <div 
            className={`h-2 rounded-full ${index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : "bg-purple-500"}`}
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
      </div>
      <div className="ml-4">
        <span className={`font-bold ${color.text}`}>{confidence}%</span>
      </div>
    </div>
  );
};

const FarmConditionsCard = () => {
  // Mock sensor data
  const conditions = [
    { name: "Soil Moisture", value: "36%", icon: <Droplet className="h-5 w-5 text-blue-500" /> },
    { name: "Temperature", value: "27°C", icon: <Thermometer className="h-5 w-5 text-red-500" /> },
    { name: "Sunlight", value: "High", icon: <Sun className="h-5 w-5 text-yellow-500" /> },
    { name: "Wind", value: "12 km/h", icon: <Wind className="h-5 w-5 text-gray-500" /> },
  ];
  
  return (
    <Card className="p-5 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold text-lg mb-4">Current Farm Conditions</h3>
      <div className="grid grid-cols-2 gap-4">
        {conditions.map((condition, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {condition.icon}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{condition.name}</p>
              <p className="font-semibold">{condition.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const YieldForecastCard = () => {
  return (
    <Card className="p-5 border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg">Yield Forecast</h3>
        <Link href="/predictions/yield">
          <button className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            Details <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Wheat</h4>
            <span className="text-green-600 dark:text-green-400 flex items-center text-sm font-medium">
              +12% <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div className="h-2 rounded-full bg-green-500" style={{ width: '85%' }}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Predicted: 2.8 tons/acre</span>
            <span>Last Year: 2.5 tons/acre</span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Rice</h4>
            <span className="text-red-600 dark:text-red-400 flex items-center text-sm font-medium">
              -5% <ArrowUpRight className="h-3 w-3 ml-1 rotate-90" />
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div className="h-2 rounded-full bg-orange-500" style={{ width: '65%' }}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Predicted: 3.2 tons/acre</span>
            <span>Last Year: 3.4 tons/acre</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const PredictionsPage = () => {
  const { data: session, status } = useSession();
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  
  // Mock data for farms
  const farms: Farm[] = [
    { id: "farm1", name: "Green Valley Farm", location: "Amritsar, Punjab", area: 5.2, currentCrop: "Wheat", soilType: "Loamy" },
    { id: "farm2", name: "Riverside Fields", location: "Ludhiana, Punjab", area: 3.8, currentCrop: "Rice", soilType: "Clay" },
    { id: "farm3", name: "Sunset Acres", location: "Chandigarh, Punjab", area: 4.5, soilType: "Sandy" },
  ];
  
  // Mock crop recommendations
  const cropRecommendations = [
    { crop: "Wheat", confidence: 92 },
    { crop: "Barley", confidence: 78 },
    { crop: "Maize", confidence: 65 },
  ];

  // Get farm details for the selected farm
  const selectedFarmDetails = farms.find(farm => farm.id === selectedFarm);
  
  const handleGetPredictions = () => {
    if (!selectedFarm) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPredictionResult({
        crop: "Wheat",
        confidence: 92,
        yield: 2.8,
        revenue: 84000,
        growingPeriod: "November to April",
        waterRequirements: "450-650 mm",
        fertilizerRecommendation: "N:P:K ratio of 120:60:40 kg/ha",
        diseaseRisk: "Low risk of rust in current conditions"
      });
      setLoading(false);
    }, 1500);
  };
  
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to access predictions</p>
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
        <h1 className="text-2xl font-bold mb-6">Crop Predictions & Analytics</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Next Season Recommendations
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Farm</label>
                <select 
                  value={selectedFarm}
                  onChange={(e) => setSelectedFarm(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">-- Select a farm --</option>
                  {farms.map(farm => (
                    <option key={farm.id} value={farm.id}>{farm.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedFarmDetails && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-medium">{selectedFarmDetails.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
                      <p className="font-medium">{selectedFarmDetails.area} acres</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Soil Type</p>
                      <p className="font-medium">{selectedFarmDetails.soilType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current Crop</p>
                      <p className="font-medium">{selectedFarmDetails.currentCrop || "None"}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleGetPredictions}
                disabled={!selectedFarm || loading}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart2 className="h-5 w-5" />
                    Get Predictions
                  </>
                )}
              </button>
              
              {predictionResult && (
                <div className="mt-8 space-y-6">
                  <h3 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-800 pb-2">Recommended Crops</h3>
                  <div className="space-y-3">
                    {cropRecommendations.map((rec, index) => (
                      <RecommendedCropCard 
                        key={rec.crop} 
                        crop={rec.crop}
                        confidence={rec.confidence}
                        index={index}
                      />
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                    <h3 className="text-lg font-semibold mb-4">Detailed Analysis for {predictionResult.crop}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">Growing Period</span>
                        </div>
                        <p className="font-medium">{predictionResult.growingPeriod}</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Droplet className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">Water Requirements</span>
                        </div>
                        <p className="font-medium">{predictionResult.waterRequirements}</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Yield</span>
                        </div>
                        <p className="font-medium">{predictionResult.yield} tons/acre</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <PieChart className="h-4 w-4 text-purple-500" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">Potential Revenue</span>
                        </div>
                        <p className="font-medium">₹{predictionResult.revenue.toLocaleString()}/acre</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Fertilizer Recommendation</span>
                        </div>
                        <Popover>
                          <PopoverTrigger>
                            <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                              <HelpCircle className="h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-4">
                            <h3 className="font-medium mb-2">About Fertilizer Recommendations</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              These recommendations are based on soil analysis, crop requirements, and local conditions. Always follow local agricultural extension guidelines.
                            </p>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{predictionResult.fertilizerRecommendation}</p>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">Disease Risk Assessment</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{predictionResult.diseaseRisk}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <FarmConditionsCard />
            <YieldForecastCard />
            
            <Card className="p-5 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-lg mb-4">Seasonal Forecast</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <span>Temperature</span>
                  </div>
                  <span className="font-medium">2°C above average</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    <span>Rainfall</span>
                  </div>
                  <span className="font-medium">Normal</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <span>Sunshine</span>
                  </div>
                  <span className="font-medium">5% above average</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PredictionsPage;
