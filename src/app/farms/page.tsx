"use client"
import React, { useState } from 'react'
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { 
  Map, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Edit, 
  BarChart2, 
  Leaf, 
  Droplet, 
  Sun, 
  Thermometer
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
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
  crops: string[];
  soilType: string;
  lastUpdated: string;
  image: string;
}

// Mock data for farms
const mockFarms: Farm[] = [
  {
    id: "farm1",
    name: "Green Valley Farm",
    location: "Amritsar, Punjab",
    area: 5.2,
    crops: ["Wheat", "Rice"],
    soilType: "Loamy",
    lastUpdated: "2 hours ago",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop"
  },
  {
    id: "farm2",
    name: "Riverside Fields",
    location: "Ludhiana, Punjab",
    area: 3.8,
    crops: ["Cotton", "Sugarcane"],
    soilType: "Clay",
    lastUpdated: "1 day ago",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop"
  },
  {
    id: "farm3",
    name: "Sunset Acres",
    location: "Chandigarh, Punjab",
    area: 4.5,
    crops: ["Corn", "Potato"],
    soilType: "Sandy",
    lastUpdated: "5 hours ago",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop"
  }
];

interface SensorDataCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

const SensorDataCard = ({ title, value, unit, icon }: SensorDataCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="text-xl font-semibold">
        {value} <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
      </div>
    </div>
  );
};

const FarmDetails = ({ farm }: { farm: Farm | null }) => {
  if (!farm) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="h-64 overflow-hidden relative">
          <img 
            src={farm.image} 
            alt={farm.name} 
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            onClick={() => {}}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{farm.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                <Map className="h-4 w-4 mr-1" /> {farm.location}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium">{farm.area} acres</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {farm.lastUpdated}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Current Crops</h3>
            <div className="flex flex-wrap gap-2">
              {farm.crops.map((crop, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Soil Type</h3>
            <p className="text-gray-600 dark:text-gray-300">{farm.soilType}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Sensor Data (Real-time)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SensorDataCard 
                title="Soil Moisture" 
                value="36" 
                unit="%" 
                icon={<Droplet className="h-4 w-4 text-blue-500" />} 
              />
              <SensorDataCard 
                title="Temperature" 
                value="27" 
                unit="°C" 
                icon={<Thermometer className="h-4 w-4 text-red-500" />} 
              />
              <SensorDataCard 
                title="Sunlight" 
                value="85" 
                unit="%" 
                icon={<Sun className="h-4 w-4 text-yellow-500" />} 
              />
              <SensorDataCard 
                title="Soil Fertility" 
                value="74" 
                unit="%" 
                icon={<Leaf className="h-4 w-4 text-green-500" />} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link href={`/predictions?farmId=${farm.id}`}>
              <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                <BarChart2 className="h-5 w-5" /> View Predictions
              </button>
            </Link>
            <Link href={`/carbon_credits?farmId=${farm.id}`}>
              <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                <Leaf className="h-5 w-5" /> Carbon Credits
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FarmCard = ({ farm }: { farm: Farm }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <>
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-md">
        <div className="h-40 overflow-hidden relative">
          <img 
            src={farm.image} 
            alt={farm.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Link href={`/farms/${farm.id}`}>
                <h3 className="font-semibold text-lg hover:text-green-600 transition-colors">{farm.name}</h3>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Map className="h-3 w-3 mr-1" /> {farm.location}
              </p>
            </div>
            <Popover>
              <PopoverTrigger>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-1">
                <button 
                  className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-left"
                  onClick={() => {}}
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button 
                  className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-left text-red-600 dark:text-red-400"
                  onClick={() => {}}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm font-medium">{farm.area} acres</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {farm.crops.join(", ")}
            </div>
          </div>
          
          <Link href={`/farms/${farm.id}`}>
            <button 
              className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              View Details
            </button>
          </Link>
        </div>
      </Card>
      
      {/* Using dedicated farm details page instead of popup */}
      {/* {showDetails && <FarmDetails farm={farm} />} */}
    </>
  );
};

const AddFarmCard = () => {
  return (
    <Card className="flex flex-col items-center justify-center h-full min-h-[312px] border-dashed border-2 border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all p-6">
      <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
        <Plus className="h-6 w-6 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Add New Farm</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
        Register a new farm to track crops and monitor data
      </p>
      <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
        Add Farm
      </button>
    </Card>
  );
};

const FarmsPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to view your farms</p>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Farms</h1>
          <div className="flex gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search farms..." 
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="location">Location</option>
              <option value="area">Area</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockFarms.map(farm => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
          <AddFarmCard />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FarmsPage
