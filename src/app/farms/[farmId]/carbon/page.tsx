"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  BarChart2, 
  Calendar, 
  ChevronRight,
  ArrowLeft, 
  Leaf, 
  CloudRain,
  Sprout,
  LineChart,
  Download,
  Share2,
  Printer,
  BadgeCheck
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

interface CarbonData {
  total: number;
  lastMonth: number;
  thisMonth: number;
  annualTarget: number;
  progress: number;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  history: {
    month: string;
    amount: number;
  }[];
  transactions: {
    date: string;
    activity: string;
    amount: number;
    type: 'reduction' | 'offset';
    status: 'verified' | 'pending';
  }[];
}

const CarbonCreditsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCarbonData({
        total: 32.5,
        lastMonth: 4.2,
        thisMonth: 3.8,
        annualTarget: 50,
        progress: 65,
        breakdown: [
          { category: 'Soil Carbon Sequestration', amount: 15.3, percentage: 47 },
          { category: 'Reduced Tillage', amount: 8.2, percentage: 25 },
          { category: 'Cover Crops', amount: 5.4, percentage: 17 },
          { category: 'Efficient Irrigation', amount: 3.6, percentage: 11 }
        ],
        history: [
          { month: 'Jan', amount: 2.1 },
          { month: 'Feb', amount: 2.5 },
          { month: 'Mar', amount: 3.2 },
          { month: 'Apr', amount: 3.8 },
          { month: 'May', amount: 4.0 },
          { month: 'Jun', amount: 4.2 },
          { month: 'Jul', amount: 3.8 },
          { month: 'Aug', amount: 3.5 },
          { month: 'Sep', amount: 2.8 },
          { month: 'Oct', amount: 2.6 },
          { month: 'Nov', amount: 0 },
          { month: 'Dec', amount: 0 }
        ],
        transactions: [
          { 
            date: '2023-10-15', 
            activity: 'Cover Crop Implementation', 
            amount: 1.2, 
            type: 'reduction',
            status: 'verified'
          },
          { 
            date: '2023-09-28', 
            activity: 'No-Till Farming Practice', 
            amount: 0.8, 
            type: 'reduction',
            status: 'verified'
          },
          { 
            date: '2023-09-05', 
            activity: 'Efficient Irrigation Installation', 
            amount: 0.6, 
            type: 'reduction',
            status: 'verified'
          },
          { 
            date: '2023-08-20', 
            activity: 'Agroforestry Implementation', 
            amount: 1.5, 
            type: 'offset',
            status: 'pending'
          },
          { 
            date: '2023-08-10', 
            activity: 'Organic Fertilizer Transition', 
            amount: 0.9, 
            type: 'reduction',
            status: 'verified'
          }
        ]
      });
      
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
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to view carbon credits</p>
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
          <span className="text-sm font-medium">Carbon Credits</span>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Carbon Credits</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your farm's carbon sequestration and emission reduction activities
          </p>
        </div>
        
        {carbonData && (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Carbon Credits</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{carbonData.total}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Metric Tons CO₂e</p>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">This Month</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{carbonData.thisMonth}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Metric Tons CO₂e</p>
                  </div>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  {carbonData.thisMonth > carbonData.lastMonth ? (
                    <span className="text-green-600 dark:text-green-400">▲ {((carbonData.thisMonth - carbonData.lastMonth) / carbonData.lastMonth * 100).toFixed(1)}% from last month</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">▼ {((carbonData.lastMonth - carbonData.thisMonth) / carbonData.lastMonth * 100).toFixed(1)}% from last month</span>
                  )}
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Annual Target</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{carbonData.progress}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">of {carbonData.annualTarget} Metric Tons</p>
                  </div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                    <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 dark:bg-purple-400 h-2.5 rounded-full" 
                    style={{ width: `${carbonData.progress}%` }}
                  ></div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Estimated Value</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">${(carbonData.total * 35).toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">at $35/Metric Ton</p>
                  </div>
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                    <BadgeCheck className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Chart and Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Carbon Credits History</h3>
                  <div className="flex space-x-2">
                    <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Printer className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* This would be a real chart in a production app */}
                <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500 dark:text-gray-400">Carbon Credits Chart (Monthly)</span>
                </div>
                
                {/* Monthly Data */}
                <div className="grid grid-cols-6 mt-4">
                  {carbonData.history.map((item, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="mx-auto w-3 bg-green-600 dark:bg-green-500 rounded-t-sm" 
                        style={{ 
                          height: `${(item.amount / Math.max(...carbonData.history.map(i => i.amount))) * 60}px`,
                          minHeight: item.amount > 0 ? '4px' : '0'
                        }}
                      ></div>
                      <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">{item.month}</p>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Carbon Source Breakdown</h3>
                
                {carbonData.breakdown.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.amount} MT ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${
                          index === 0 ? 'bg-green-600 dark:bg-green-500' : 
                          index === 1 ? 'bg-blue-600 dark:bg-blue-500' : 
                          index === 2 ? 'bg-purple-600 dark:bg-purple-500' : 
                          'bg-yellow-600 dark:bg-yellow-500'
                        } h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-8">
                  <h4 className="text-sm font-medium mb-4">Potential Improvements</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="p-1 bg-green-100 dark:bg-green-900/20 rounded-full mr-2 mt-0.5">
                        <Sprout className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Implement cover cropping for an additional 2.5 MT</span>
                    </li>
                    <li className="flex items-start">
                      <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded-full mr-2 mt-0.5">
                        <CloudRain className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Upgrade to drip irrigation for an additional 1.8 MT</span>
                    </li>
                    <li className="flex items-start">
                      <div className="p-1 bg-purple-100 dark:bg-purple-900/20 rounded-full mr-2 mt-0.5">
                        <Leaf className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Add agroforestry elements for an additional 4.2 MT</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
            
            {/* Recent Transactions */}
            <div className="mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Recent Carbon Activities</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount (MT)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {carbonData.transactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{transaction.activity}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.type === 'reduction' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {transaction.type === 'reduction' ? 'Emission Reduction' : 'Carbon Offset'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{transaction.amount}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.status === 'verified' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            }`}>
                              {transaction.status === 'verified' ? 'Verified' : 'Pending Verification'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </>
        )}
        
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

export default CarbonCreditsPage;
