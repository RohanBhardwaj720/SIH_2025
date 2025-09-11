import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Search,
  HelpCircle,
  BookOpen,
  Mail,
  Phone,
  MessageSquare,
  Video,
  FileText,
  Leaf,
  Droplets,
  CloudSun,
  CreditCard,
  AlertTriangle,
  PieChart,
  ArrowRight,
  ThumbsUp,
  Server
} from 'lucide-react';

export default function HelpCenterPage() {
  // Mock popular questions
  const popularQuestions = [
    {
      question: "How do I set up my first farm in the system?",
      answer: "To set up your first farm, navigate to the 'My Farms' section and click on 'Add New Farm'. Follow the step-by-step guide to input your farm details, location, and crop information. You can add multiple fields within the same farm."
    },
    {
      question: "How accurate is the crop disease diagnosis?",
      answer: "Our crop disease diagnosis uses advanced AI models trained on millions of plant images. It has an accuracy rate of approximately 85-90% for common crop diseases. For best results, take clear photos in good lighting conditions and provide multiple angles of the affected plant."
    },
    {
      question: "What sensors are compatible with the platform?",
      answer: "Our platform is compatible with a wide range of agricultural sensors including soil moisture sensors, temperature sensors, humidity sensors, and more from manufacturers like Davis Instruments, Onset HOBO, Sentek, Meter Group, and our own FarmSense sensors."
    },
    {
      question: "How do I earn carbon credits?",
      answer: "You can earn carbon credits by implementing sustainable farming practices like no-till farming, cover cropping, precision fertilizer application, and agroforestry. Our system tracks these practices and calculates carbon sequestration based on scientific models. Credits are verified by third-party auditors before being issued."
    },
    {
      question: "Can I access the platform offline?",
      answer: "Yes, many features of our mobile app work offline. Data is synced when you reconnect to the internet. Critical features like farm records, recent diagnoses, and reference guides are always available offline."
    },
  ];
  
  // Mock help categories
  const helpCategories = [
    {
      title: "Getting Started",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      topics: ["Account Setup", "Farm Registration", "Data Import", "Mobile App", "User Roles"]
    },
    {
      title: "Farm Management",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      topics: ["Adding Fields", "Crop Planning", "Record Keeping", "Harvest Tracking", "Labor Management"]
    },
    {
      title: "Sensor Data",
      icon: <Server className="h-5 w-5 text-purple-500" />,
      topics: ["Sensor Setup", "Data Interpretation", "Alerts Configuration", "Troubleshooting", "API Access"]
    },
    {
      title: "Disease Diagnosis",
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      topics: ["Taking Good Photos", "Understanding Results", "Treatment Options", "Disease Prevention", "Historical Analysis"]
    },
    {
      title: "Weather & Predictions",
      icon: <CloudSun className="h-5 w-5 text-yellow-500" />,
      topics: ["Weather Forecasts", "Seasonal Outlooks", "Crop Yield Models", "Risk Assessment", "Climate Adaptation"]
    },
    {
      title: "Carbon Credits",
      icon: <CreditCard className="h-5 w-5 text-green-600" />,
      topics: ["Eligibility Criteria", "Measuring Impact", "Verification Process", "Market Trading", "Payment Options"]
    },
  ];
  
  // Mock guides and tutorials
  const guidesAndTutorials = [
    {
      title: "Complete Guide to Farm Setup",
      type: "PDF Guide",
      duration: "15 min read",
      popularity: "Most popular"
    },
    {
      title: "Using Soil Moisture Sensors Effectively",
      type: "Video Tutorial",
      duration: "8 min watch",
      popularity: "New"
    },
    {
      title: "Maximizing Your Carbon Credit Earnings",
      type: "Interactive Guide",
      duration: "20 min read",
      popularity: "Trending"
    },
    {
      title: "Identifying Common Crop Diseases",
      type: "Photo Guide",
      duration: "12 min read",
      popularity: "Staff pick"
    },
  ];
  
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">How can we help you?</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Find answers to common questions, explore guides, or contact our support team for personalized assistance.
        </p>
        
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for help topics, guides, or questions..." 
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400"
          />
        </div>
      </div>
      
      {/* Quick Help Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Card className="p-6 hover:shadow-md transition-shadow text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="font-medium text-lg mb-2">Chat with Support</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Get immediate assistance from our support team through live chat.
          </p>
          <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center">
            Start Chat <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <Video className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="font-medium text-lg mb-2">Video Tutorials</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Learn through our comprehensive video tutorials and demonstrations.
          </p>
          <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium inline-flex items-center">
            Watch Videos <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow text-center">
          <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-medium text-lg mb-2">Knowledge Base</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Browse our extensive documentation and help articles.
          </p>
          <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium inline-flex items-center">
            Explore Articles <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </Card>
      </div>
      
      {/* Popular Questions Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <HelpCircle className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {popularQuestions.map((item, idx) => (
            <Card key={idx} className="p-0 overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-5 cursor-pointer">
                  <h3 className="font-medium text-lg pr-2">{item.question}</h3>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.answer}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <button className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful
                    </button>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Updated 2 weeks ago
                    </span>
                  </div>
                </div>
              </details>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
            View All FAQs
          </button>
        </div>
      </div>
      
      {/* Help Categories */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <BookOpen className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold">Help by Category</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpCategories.map((category, idx) => (
            <Card key={idx} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">{category.title}</h3>
                  <ul className="space-y-1">
                    {category.topics.map((topic, topicIdx) => (
                      <li key={topicIdx} className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 cursor-pointer text-sm">
                        • {topic}
                      </li>
                    ))}
                  </ul>
                  <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm mt-3 flex items-center">
                    View All <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Guides and Tutorials */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold">Guides & Tutorials</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guidesAndTutorials.map((guide, idx) => (
            <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {guide.type.includes('Video') ? (
                  <Video className="h-10 w-10 text-gray-400" />
                ) : (
                  <FileText className="h-10 w-10 text-gray-400" />
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    {guide.type}
                  </span>
                  {guide.popularity && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {guide.popularity}
                    </span>
                  )}
                </div>
                <h3 className="font-medium mb-2">{guide.title}</h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {guide.duration}
                </div>
                <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm flex items-center">
                  {guide.type.includes('Video') ? 'Watch Now' : 'Read Now'} <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
            Browse All Resources
          </button>
        </div>
      </div>
      
      {/* Contact Support */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our support team is here to help with any questions or issues you might have.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 shadow-sm">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">Email Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Get a response within 24 hours
              </p>
              <a href="mailto:support@farmsense.com" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                support@farmsense.com
              </a>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 shadow-sm">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">Phone Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Available 9 AM - 6 PM (IST)
              </p>
              <a href="tel:+918005551234" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                +91 800-555-1234
              </a>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 shadow-sm">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">Live Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Get instant help from our team
              </p>
              <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Section */}
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold mb-3">Was this help center useful?</h2>
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <ThumbsUp className="h-5 w-5" />
            Yes, it was helpful
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
            </svg>
            No, I need more help
          </button>
        </div>
      </div>
    </div>
  );
}
