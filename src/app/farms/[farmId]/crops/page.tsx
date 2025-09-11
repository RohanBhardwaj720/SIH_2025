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
  ArrowLeft,
  Filter,
  Sprout,
  Search,
  GanttChart,
  Clock
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

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

interface Farm {
  id: string;
  name: string;
  crops: Crop[];
}

const CropsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock data for crops
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
        },
        {
          id: "crop4",
          name: "Cotton",
          plantedDate: "2025-04-10",
          harvestDate: "2025-11-15",
          area: "6 acres",
          status: "Growing",
          variety: "Bt Cotton",
          expectedYield: "12 quintals/acre",
          soilRequirements: {
            idealPH: [6.0, 7.2],
            idealMoisture: [50, 70],
            idealTemperature: [20, 30],
            nutrientRequirements: {
              nitrogen: "Medium",
              phosphorus: "High",
              potassium: "Medium"
            }
          },
          notes: "Good growth so far, added additional fertilizer last week",
          carbonCredits: 35
        },
        {
          id: "crop5",
          name: "Sugarcane",
          plantedDate: "2025-02-20",
          harvestDate: "2026-01-25",
          area: "7 acres",
          status: "Growing",
          variety: "CoS 8436",
          expectedYield: "400 quintals/acre",
          soilRequirements: {
            idealPH: [6.0, 7.5],
            idealMoisture: [70, 85],
            idealTemperature: [22, 35],
            nutrientRequirements: {
              nitrogen: "Very High",
              phosphorus: "High",
              potassium: "High"
            }
          },
          notes: "Showing excellent growth, on track for high yield",
          carbonCredits: 50
        },
        {
          id: "crop6",
          name: "Soybean",
          plantedDate: "2025-06-05",
          harvestDate: "2025-10-10",
          area: "3 acres",
          status: "Planned",
          variety: "JS-335",
          expectedYield: "18 quintals/acre",
          soilRequirements: {
            idealPH: [6.0, 7.0],
            idealMoisture: [60, 70],
            idealTemperature: [20, 30],
            nutrientRequirements: {
              nitrogen: "Low",
              phosphorus: "Medium",
              potassium: "Medium"
            }
          },
          notes: "Planting scheduled for next month, field preparation underway",
          carbonCredits: 15
        },
        {
          id: "crop7",
          name: "Potato",
          plantedDate: "2024-11-15",
          harvestDate: "2025-02-25",
          area: "2 acres",
          status: "Harvested",
          variety: "Kufri Jyoti",
          expectedYield: "150 quintals/acre",
          actualYield: "165 quintals/acre",
          soilRequirements: {
            idealPH: [5.5, 6.5],
            idealMoisture: [65, 75],
            idealTemperature: [15, 25],
            nutrientRequirements: {
              nitrogen: "Medium",
              phosphorus: "High",
              potassium: "High"
            }
          },
          notes: "Excellent yield this season, 10% above expectations",
          carbonCredits: 25
        }
      ];
      
      setFarm({
        id: params.farmId as string,
        name: params.farmId === "farm1" ? "North Farm" : 
              params.farmId === "farm2" ? "South Field" :
              params.farmId === "farm3" ? "East Plantation" : "West Orchard",
        crops: crops
      });
      
      setLoading(false);
    }, 1000);
  }, [params.farmId]);
  
  // Filter and search crops
  const filteredCrops = farm?.crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         crop.variety.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || crop.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to view crop details</p>
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
            {farm?.name}
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium">All Crops</span>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Crops in {farm?.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your crops and view detailed information
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <input 
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="growing">Growing</option>
                <option value="harvested">Harvested</option>
                <option value="planned">Planned</option>
              </select>
              <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            
            <button 
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
            >
              Add New Crop
            </button>
          </div>
        </div>
        
        {/* Crop List */}
        <div className="space-y-4 mb-8">
          {filteredCrops && filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <Link href={`/farms/${params.farmId}/crops/${crop.id}`} key={crop.id}>
                <Card className="p-4 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex items-start space-x-3 mb-4 md:mb-0">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        crop.status === 'Harvested' 
                          ? 'bg-blue-100 dark:bg-blue-900/30' 
                          : crop.status === 'Planned' 
                          ? 'bg-yellow-100 dark:bg-yellow-900/30' 
                          : 'bg-green-100 dark:bg-green-900/30'
                      }`}>
                        <Sprout className={`h-6 w-6 ${
                          crop.status === 'Harvested' 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : crop.status === 'Planned' 
                            ? 'text-yellow-600 dark:text-yellow-400' 
                            : 'text-green-600 dark:text-green-400'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">{crop.name}</h3>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            crop.status === 'Harvested' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                              : crop.status === 'Planned' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {crop.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Variety: {crop.variety}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Area</p>
                        <p className="font-medium">{crop.area}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Planting Date</p>
                        <p className="font-medium">{new Date(crop.plantedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Harvest Date</p>
                        <p className="font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Expected Yield</p>
                        <p className="font-medium">{crop.expectedYield}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 md:mt-0">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400">No crops found</p>
            </div>
          )}
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

export default CropsPage;
