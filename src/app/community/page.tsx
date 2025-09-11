"use client";
import React from 'react';
import { Card } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import {
  MessageSquare,
  Users,
  CalendarDays,
  Award,
  ThumbsUp,
  MessageCircle,
  Clock,
  Bookmark,
  Share2,
  Filter,
  Search,
  Plus,
  Leaf,
  Map,
  Book
} from 'lucide-react';


export default function CommunityPage() {

  const { data: session, status } = useSession();

  // Mock user data
  const user = {
    name: session?.user?.name || 'Farmer',
    avatar: null,
    location: "Delhi, India",
    joinDate: "March 2025",
    posts: 12,
    reputation: 128
  };
  
  // Mock forum posts
  const forumPosts = [
    {
      id: 1,
      title: "Best practices for wheat irrigation during dry spells?",
      author: "Rajesh Kumar",
      authorLocation: "Haryana",
      date: "2 hours ago",
      content: "We're experiencing unusually dry weather in my region. I'm concerned about my wheat crop. Does anyone have experience with efficient irrigation methods that conserve water while ensuring the crop gets what it needs?",
      tags: ["wheat", "irrigation", "water conservation"],
      likes: 24,
      comments: 15,
      views: 156,
      isPopular: true
    },
    {
      id: 2,
      title: "Organic solutions for aphid control in vegetable gardens",
      author: "Priya Singh",
      authorLocation: "Uttarakhand",
      date: "Yesterday",
      content: "I've noticed aphids on my vegetable plants and want to avoid chemical pesticides. Has anyone tried neem oil or other organic solutions? What was your experience and application method?",
      tags: ["organic farming", "pest control", "vegetables"],
      likes: 18,
      comments: 21,
      views: 203,
      isPopular: true
    },
    {
      id: 3,
      title: "Recommendations for rice varieties with better drought tolerance",
      author: "Vikram Patel",
      authorLocation: "Uttar Pradesh",
      date: "3 days ago",
      content: "Looking to switch to more drought-tolerant rice varieties for next season. Any recommendations from fellow farmers who have tried different varieties in similar semi-arid conditions?",
      tags: ["rice", "drought resistance", "crop selection"],
      likes: 32,
      comments: 28,
      views: 341,
      isPopular: true
    },
    {
      id: 4,
      title: "Selling surplus tomatoes - best markets or direct channels?",
      author: "Meena Gupta",
      authorLocation: "Maharashtra",
      date: "4 days ago",
      content: "I have a surplus of tomatoes this season and looking for the best way to sell them. Has anyone had success with farmers markets, direct to restaurants, or online platforms?",
      tags: ["market access", "tomatoes", "selling produce"],
      likes: 14,
      comments: 19,
      views: 187
    },
    {
      id: 5,
      title: "Strategies for adapting to climate change in North India",
      author: "Dr. Anand Sharma",
      authorLocation: "Delhi",
      date: "1 week ago",
      content: "As an agricultural scientist, I'm interested in hearing from farmers about what climate adaptation strategies are working on the ground. What changes have you made to your farming practices in response to changing weather patterns?",
      tags: ["climate change", "adaptation", "sustainable farming"],
      likes: 45,
      comments: 37,
      views: 412,
      isPopular: true
    }
  ];
  
  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Sustainable Farming Workshop",
      date: "June 15, 2023",
      location: "Punjab Agricultural University, Ludhiana",
      attendees: 45
    },
    {
      id: 2,
      title: "Farmer-to-Farmer Knowledge Exchange",
      date: "June 23, 2023",
      location: "Community Center, Amritsar",
      attendees: 32
    },
    {
      id: 3,
      title: "New Technologies in Irrigation",
      date: "July 5, 2023",
      location: "Virtual Webinar",
      attendees: 128
    }
  ];
  
  // Mock knowledge resources
  const knowledgeResources = [
    {
      title: "Organic Pest Management Guide",
      type: "PDF Guide",
      source: "Punjab Agricultural University",
      downloads: 1243
    },
    {
      title: "Seasonal Crop Calendar for North India",
      type: "Interactive Tool",
      source: "Ministry of Agriculture",
      downloads: 876
    },
    {
      title: "Water Conservation Techniques",
      type: "Video Series",
      source: "Farmer's Knowledge Network",
      downloads: 1568
    }
  ];
  
  // Mock local expert farmers
  const localExperts = [
    {
      name: "Gurpreet Singh",
      specialty: "Organic Rice Farming",
      location: "Ludhiana",
      yearsExperience: 25
    },
    {
      name: "Anjali Sharma",
      specialty: "Sustainable Water Management",
      location: "Amritsar",
      yearsExperience: 18
    },
    {
      name: "Dr. Manpreet Kaur",
      specialty: "Agricultural Economics",
      location: "Chandigarh",
      yearsExperience: 15
    }
  ];
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Farmer Community</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect, share knowledge, and grow together
          </p>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
            <Plus className="h-4 w-4" />
            New Post
          </button>
          <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Users className="h-4 w-4" />
            My Network
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2">
          {/* Search and filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search discussions..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
          
          {/* Forum posts */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Discussion Forum</h2>
              <div className="flex gap-2">
                <select className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
                  <option>All Topics</option>
                  <option>Crop Management</option>
                  <option>Irrigation</option>
                  <option>Pest Control</option>
                  <option>Market Access</option>
                  <option>Climate Adaptation</option>
                </select>
                <select className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
                  <option>Most Comments</option>
                </select>
              </div>
            </div>
            
            {forumPosts.map(post => (
              <Card key={post.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-green-700 dark:text-green-300">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{post.title}</h3>
                      {post.isPopular && (
                        <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 text-xs px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Posted by {post.author} from {post.authorLocation} • {post.date}
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {post.content}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                        <Bookmark className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="flex justify-center mt-4">
              <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
                View More Discussions
              </button>
            </div>
          </div>
          
          {/* Knowledge Resources */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Farmer Knowledge Center</h2>
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {knowledgeResources.map((resource, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-500 transition-colors">
                    <div className="flex items-center mb-3">
                      <Book className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">{resource.title}</h3>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <p>{resource.type}</p>
                      <p>Source: {resource.source}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{resource.downloads} downloads</span>
                      <button className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
                  Browse All Resources
                </button>
              </div>
            </Card>
          </div>
          
          {/* Upcoming Events */}
          <div>
            <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                      <CalendarDays className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Map className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                    <button className="ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm h-fit">
                      Join
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* User profile card */}
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                <span className="text-xl font-medium text-green-700 dark:text-green-300">
                  {user.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-lg font-medium">{user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.location}</p>
              
              <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center border-y border-gray-200 dark:border-gray-700 py-3">
                <div>
                  <div className="font-medium">{user.posts}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Posts</div>
                </div>
                <div>
                  <div className="font-medium">{user.reputation}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Reputation</div>
                </div>
                <div>
                  <div className="font-medium">
                    <Leaf className="h-4 w-4 inline text-green-600" />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Farmer</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Member since {user.joinDate}
              </div>
              
              <button className="mt-4 w-full bg-white dark:bg-gray-800 border border-green-600 dark:border-green-500 text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 py-2 px-4 rounded-md transition-colors">
                View Profile
              </button>
            </div>
          </Card>
          
          {/* Local experts */}
          <Card className="p-6">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              Local Farming Experts
            </h3>
            
            <div className="space-y-4">
              {localExperts.map((expert, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-green-700 dark:text-green-300">
                      {expert.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{expert.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {expert.specialty} • {expert.location}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {expert.yearsExperience} years experience
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
              View All Experts
            </button>
          </Card>
          
          {/* Popular topics */}
          <Card className="p-6">
            <h3 className="font-medium text-lg mb-4">Popular Topics</h3>
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors">
                #OrganicFarming
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors">
                #WaterConservation
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors">
                #ClimateChange
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors">
                #SustainablePractices
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors">
                #CropDisease
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors">
                #SoilHealth
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors">
                #FarmTechnology
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors">
                #MarketPrices
              </span>
            </div>
          </Card>
          
          {/* Community stats */}
          <Card className="p-6">
            <h3 className="font-medium text-lg mb-4">Community Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Members</span>
                <span className="font-medium">4,567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Active Discussions</span>
                <span className="font-medium">173</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Knowledge Resources</span>
                <span className="font-medium">328</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Upcoming Events</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
