import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Settings, 
  Bell, 
  Lock, 
  HelpCircle, 
  FileText,
  Tractor,
  Leaf
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card className="p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">John Smith</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Farmer since 2015</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <span>johnsmith@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-3" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Punjab, India</span>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors">
                Edit Profile
              </button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Farming Experience</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Tractor className="w-5 h-5 text-green-600 mr-3" />
                <span>8+ years of farming experience</span>
              </div>
              <div className="flex items-center">
                <Leaf className="w-5 h-5 text-green-600 mr-3" />
                <span>Specialization in wheat and rice</span>
              </div>
              <div className="flex items-center">
                <Leaf className="w-5 h-5 text-green-600 mr-3" />
                <span>Sustainable farming practices</span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Settings */}
        <div className="lg:col-span-2">
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Settings className="w-5 h-5 mr-2" />
              Account Settings
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Personal Information</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal details</p>
                    </div>
                  </div>
                  <span className="text-green-600">&rarr;</span>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Password & Security</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Manage password and security settings</p>
                    </div>
                  </div>
                  <span className="text-green-600">&rarr;</span>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Notifications</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Configure notification preferences</p>
                    </div>
                  </div>
                  <span className="text-green-600">&rarr;</span>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Farm Locations</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Manage your farm locations</p>
                    </div>
                  </div>
                  <span className="text-green-600">&rarr;</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <HelpCircle className="w-5 h-5 mr-2" />
              Help & Support
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Help Center</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get help with using the platform</p>
                    </div>
                  </div>
                  <span className="text-green-600">&rarr;</span>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">User Guides</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Documentation and tutorials</p>
                    </div>
                  </div>
                  <span className="text-green-600">&rarr;</span>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-green-500 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-green-600">Contact Support</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get in touch with our support team</p>
                    </div>
                  </div>
                  <span className="text-green-600">&rarr;</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Activity & Statistics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Total Farms</h4>
              <p className="text-3xl font-bold text-green-600">4</p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Carbon Credits Earned</h4>
              <p className="text-3xl font-bold text-blue-600">124</p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Successful Diagnoses</h4>
              <p className="text-3xl font-bold text-purple-600">17</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-md font-medium mb-3">Recent Activity</h4>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-sm">Added a new farm: <span className="font-medium">North Field</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
              </div>
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-sm">Performed diagnosis on <span className="font-medium">Wheat Crop</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">5 days ago</p>
              </div>
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-sm">Earned <span className="font-medium">15 carbon credits</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 week ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
