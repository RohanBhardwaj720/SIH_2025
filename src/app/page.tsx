"use client"
import React from 'react'
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowRight, Leaf, CloudRain, BarChart2, Zap, Map, Camera, Sprout } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const DashboardCard = ({ title, description, icon, link }: DashboardCardProps) => {
  return (
    <Link href={link}>
      <Card className="h-full p-6 border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-md">
        <div className="flex flex-col h-full">
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">{description}</p>
          <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
            View <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

const WeatherWidget = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Today's Weather</h3>
          <p className="text-sm opacity-90">Chandigarh, Punjab</p>
        </div>
        <CloudRain className="h-10 w-10" />
      </div>
      <div className="mt-4">
        <div className="flex items-end">
          <span className="text-3xl font-bold">27°C</span>
          <span className="ml-2 text-sm opacity-80">Partly Cloudy</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
          <div>
            <p className="opacity-80">Humidity</p>
            <p className="font-medium">62%</p>
          </div>
          <div>
            <p className="opacity-80">Wind</p>
            <p className="font-medium">12 km/h</p>
          </div>
          <div>
            <p className="opacity-80">Rainfall</p>
            <p className="font-medium">0.2 mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FarmSummary = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Farm Summary</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Farms</p>
          <p className="text-xl font-semibold">3</p>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Area</p>
          <p className="text-xl font-semibold">12.5 acres</p>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active Crops</p>
          <p className="text-xl font-semibold">4</p>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Credits</p>
          <p className="text-xl font-semibold">235</p>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-6">Welcome to FarmSense</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Your one-stop solution for smart farming, crop management, and sustainability.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                  Log In
                </button>
              </Link>
              <Link href="/register">
                <button className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg font-medium transition-colors">
                  Register
                </button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farm Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Manage multiple farms and crops in one place</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crop Diagnosis</h3>
              <p className="text-gray-600 dark:text-gray-400">Identify diseases and get treatment recommendations</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <BarChart2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Yield Predictions</h3>
              <p className="text-gray-600 dark:text-gray-400">Get accurate crop yield forecasts with ML models</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Welcome back, {session.user?.name || 'Farmer'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <FarmSummary />
          </div>
          <div>
            <WeatherWidget />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <DashboardCard 
            title="My Farms" 
            description="Manage all your farms and crops in one place"
            icon={<Map className="h-6 w-6 text-green-600 dark:text-green-500" />}
            link="/farms"
          />
          
          <DashboardCard 
            title="Crop Diagnosis" 
            description="Upload images to identify diseases and get treatment recommendations"
            icon={<Camera className="h-6 w-6 text-green-600 dark:text-green-500" />}
            link="/diagnosis"
          />
          
          <DashboardCard 
            title="Carbon Credits" 
            description="Track and trade your carbon credits earned from sustainable farming"
            icon={<Leaf className="h-6 w-6 text-green-600 dark:text-green-500" />}
            link="/carbon_credits"
          />
          
          <DashboardCard 
            title="Crop Predictions" 
            description="Get AI-powered recommendations for your next planting season"
            icon={<Sprout className="h-6 w-6 text-green-600 dark:text-green-500" />}
            link="/predictions"
          />
          
          <DashboardCard 
            title="Yield Forecasts" 
            description="Estimate your crop yields based on historical data and conditions"
            icon={<BarChart2 className="h-6 w-6 text-green-600 dark:text-green-500" />}
            link="/predictions/yield"
          />
          
          <DashboardCard 
            title="Sensor Analytics" 
            description="View real-time sensor data and analytics from your farm"
            icon={<Zap className="h-6 w-6 text-green-600 dark:text-green-500" />}
            link="/analytics"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page