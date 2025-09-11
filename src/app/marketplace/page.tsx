"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Tag, 
  MapPin, 
  User, 
  Search, 
  Filter, 
  Plus,
  MessageCircle,
  Star,
  ChevronDown,
  ArrowUpDown,
  Truck
} from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

interface MarketplaceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  image: string;
  organic: boolean;
  description: string;
  postedAt: string;
}

const mockListings: MarketplaceItem[] = [
  {
    id: "item1",
    title: "Premium Wheat Seeds",
    category: "Seeds",
    price: 2500,
    unit: "quintal",
    quantity: 10,
    location: "Ludhiana, Punjab",
    seller: {
      name: "Farmer Singh",
      rating: 4.8,
      verified: true
    },
    image: "/image4.png",
    organic: true,
    description: "High-quality wheat seeds with excellent germination rate. Ideal for Rabi season.",
    postedAt: "2 days ago"
  },
  {
    id: "item2",
    title: "Organic Rice",
    category: "Produce",
    price: 3200,
    unit: "quintal",
    quantity: 15,
    location: "Amritsar, Punjab",
    seller: {
      name: "Green Farms",
      rating: 4.5,
      verified: true
    },
    image: "/image3.png",
    organic: true,
    description: "Freshly harvested organic rice. No pesticides used.",
    postedAt: "5 days ago"
  },
  {
    id: "item3",
    title: "Natural Fertilizer",
    category: "Supplies",
    price: 850,
    unit: "bag (50kg)",
    quantity: 25,
    location: "Chandigarh, Punjab",
    seller: {
      name: "EcoGrow Solutions",
      rating: 4.9,
      verified: true
    },
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2671&auto=format&fit=crop",
    organic: true,
    description: "100% natural compost fertilizer. Great for all types of crops.",
    postedAt: "1 week ago"
  },
  {
    id: "item4",
    title: "Tractor on Rent",
    category: "Equipment",
    price: 1200,
    unit: "day",
    quantity: 1,
    location: "Patiala, Punjab",
    seller: {
      name: "Modern Agro Services",
      rating: 4.3,
      verified: false
    },
    image: "/image5.png",
    organic: false,
    description: "45HP tractor available for rent. Includes basic implements.",
    postedAt: "3 days ago"
  },
  {
    id: "item5",
    title: "Fresh Tomatoes",
    category: "Produce",
    price: 1800,
    unit: "quintal",
    quantity: 5,
    location: "Jalandhar, Punjab",
    seller: {
      name: "Fresh Valley Farms",
      rating: 4.6,
      verified: true
    },
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=2574&auto=format&fit=crop",
    organic: true,
    description: "Farm-fresh tomatoes, perfect ripeness. Available for immediate delivery.",
    postedAt: "Today"
  },
  {
    id: "item6",
    title: "Solar Water Pump",
    category: "Equipment",
    price: 35000,
    unit: "piece",
    quantity: 2,
    location: "Mohali, Punjab",
    seller: {
      name: "SunTech Agro",
      rating: 4.7,
      verified: true
    },
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2558&auto=format&fit=crop",
    organic: false,
    description: "5HP solar water pump with controller. Energy efficient and low maintenance.",
    postedAt: "1 week ago"
  }
];

const categories = [
  "All Categories",
  "Seeds",
  "Produce",
  "Equipment",
  "Supplies",
  "Livestock",
  "Services"
];

interface MarketplaceFiltersProps {
  setActiveFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const MarketplaceFilters = ({ setActiveFilters }: MarketplaceFiltersProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-800 h-fit">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <Filter className="mr-2 h-5 w-5 text-gray-500" />
        Filters
      </h3>
      
      <div className="space-y-5">
        <div>
          <h4 className="font-medium mb-2">Categories</h4>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`category-${index}`} 
                  className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                  defaultChecked={index === 0}
                  onChange={() => {
                    if (index !== 0) {
                      setActiveFilters(prev => ({...prev, category}));
                    } else {
                      setActiveFilters(prev => ({...prev, category: null}));
                    }
                  }}
                />
                <label htmlFor={`category-${index}`} className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Price Range</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="min-price" className="text-xs text-gray-500 dark:text-gray-400">Min (₹)</label>
              <input 
                type="number" 
                id="min-price" 
                placeholder="0" 
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-sm"
                onChange={(e) => setActiveFilters(prev => ({...prev, minPrice: e.target.value}))}
              />
            </div>
            <div>
              <label htmlFor="max-price" className="text-xs text-gray-500 dark:text-gray-400">Max (₹)</label>
              <input 
                type="number" 
                id="max-price" 
                placeholder="50000" 
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-sm"
                onChange={(e) => setActiveFilters(prev => ({...prev, maxPrice: e.target.value}))}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Other Filters</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="organic" 
                className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                onChange={(e) => setActiveFilters(prev => ({...prev, organic: e.target.checked}))}
              />
              <label htmlFor="organic" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Organic Only
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="verified" 
                className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                onChange={(e) => setActiveFilters(prev => ({...prev, verified: e.target.checked}))}
              />
              <label htmlFor="verified" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Verified Sellers
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="available" 
                className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                onChange={(e) => setActiveFilters(prev => ({...prev, available: e.target.checked}))}
              />
              <label htmlFor="available" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Available Now
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Location</h4>
          <select 
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-sm"
            onChange={(e) => setActiveFilters(prev => ({...prev, location: e.target.value}))}
          >
            <option value="">All Locations</option>
            <option value="Amritsar">Amritsar</option>
            <option value="Ludhiana">Ludhiana</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Jalandhar">Jalandhar</option>
            <option value="Patiala">Patiala</option>
            <option value="Mohali">Mohali</option>
          </select>
        </div>
        
        <button className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-medium transition-colors">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

const MarketplaceListingCard = ({ item }: { item: MarketplaceItem }) => {
  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-md">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        {item.organic && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Organic
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{item.title}</h3>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">₹{item.price.toLocaleString()}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">per {item.unit}</div>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
          <Tag className="h-3 w-3 mr-1" /> {item.category}
          <span className="mx-2">•</span>
          <MapPin className="h-3 w-3 mr-1" /> {item.location}
        </div>
        
        <div className="flex items-center mt-3">
          <div className="flex items-center text-xs">
            <User className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">{item.seller.name}</span>
            {item.seller.verified && (
              <svg className="h-3 w-3 ml-1 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
          </div>
          <div className="flex items-center ml-auto text-xs">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < Math.round(item.seller.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} 
                />
              ))}
            </div>
            <span className="ml-1 text-gray-600 dark:text-gray-300">{item.seller.rating}</span>
          </div>
        </div>
        
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {item.description}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Posted {item.postedAt}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-medium transition-colors">
              <MessageCircle className="h-3 w-3 inline mr-1" /> Contact
            </button>
            <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors">
              <ShoppingBag className="h-3 w-3 inline mr-1" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const MarketplacePage = () => {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [sortOption, setSortOption] = useState('newest');
  
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to access the marketplace</p>
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
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <Link href="/marketplace/sell">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
              <Plus className="h-4 w-4" /> Create Listing
            </button>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for seeds, equipment, produce..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex gap-3">
            <select 
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div>
            <MarketplaceFilters setActiveFilters={setActiveFilters} />
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-gray-500" />
                  <p className="text-sm">Free delivery on orders over ₹10,000 within 30km</p>
                </div>
                <button className="text-sm text-green-600 dark:text-green-400 font-medium hover:underline">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockListings.map(item => (
                <MarketplaceListingCard key={item.id} item={item} />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketplacePage;
