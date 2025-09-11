import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Cloud,
  Droplets,
  Sun,
  Wind,
  CloudRain,
  ThermometerSun,
  Calendar,
  Info,
  AlertTriangle,
  BarChart3,
  ArrowRight
} from 'lucide-react';

export default function WeatherPage() {
  // Mock data for current location and weather
  const location = {
    name: "Ludhiana",
    state: "Punjab",
    country: "India",
    coordinates: { lat: 30.9010, long: 75.8573 }
  };
  
  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    windDirection: "NE",
    precipitation: 0,
    uvIndex: 7,
    feelsLike: 30,
    visibility: "20 km",
    pressure: "1012 hPa",
    dewPoint: 21,
    lastUpdated: "10 minutes ago"
  };
  
  // 7-day forecast mock data
  const forecast = [
    { day: "Today", condition: "Partly Cloudy", high: 29, low: 22, precipitation: 10, icon: <Cloud className="h-6 w-6" /> },
    { day: "Tomorrow", condition: "Sunny", high: 31, low: 23, precipitation: 0, icon: <Sun className="h-6 w-6" /> },
    { day: "Wed", condition: "Sunny", high: 32, low: 24, precipitation: 0, icon: <Sun className="h-6 w-6" /> },
    { day: "Thu", condition: "Light Rain", high: 29, low: 23, precipitation: 40, icon: <CloudRain className="h-6 w-6" /> },
    { day: "Fri", condition: "Partly Cloudy", high: 28, low: 22, precipitation: 20, icon: <Cloud className="h-6 w-6" /> },
    { day: "Sat", condition: "Sunny", high: 30, low: 23, precipitation: 0, icon: <Sun className="h-6 w-6" /> },
    { day: "Sun", condition: "Sunny", high: 31, low: 24, precipitation: 0, icon: <Sun className="h-6 w-6" /> },
  ];
  
  // Hourly forecast mock data
  const hourlyForecast = [
    { time: "Now", temp: 28, condition: "Partly Cloudy", icon: <Cloud className="h-5 w-5" /> },
    { time: "2 PM", temp: 29, condition: "Partly Cloudy", icon: <Cloud className="h-5 w-5" /> },
    { time: "3 PM", temp: 29, condition: "Partly Cloudy", icon: <Cloud className="h-5 w-5" /> },
    { time: "4 PM", temp: 28, condition: "Partly Cloudy", icon: <Cloud className="h-5 w-5" /> },
    { time: "5 PM", temp: 27, condition: "Partly Cloudy", icon: <Cloud className="h-5 w-5" /> },
    { time: "6 PM", temp: 26, condition: "Clear", icon: <Sun className="h-5 w-5" /> },
    { time: "7 PM", temp: 25, condition: "Clear", icon: <Sun className="h-5 w-5" /> },
    { time: "8 PM", temp: 24, condition: "Clear", icon: <Sun className="h-5 w-5" /> },
  ];
  
  // Agricultural forecasts - useful info for farmers
  const agriculturalForecasts = [
    {
      title: "Precipitation Outlook",
      description: "Light rainfall expected on Thursday (40% chance). Total expected: 5-10mm.",
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Temperature Trend",
      description: "Temperatures slightly above seasonal average for the next 7 days.",
      icon: <ThermometerSun className="h-5 w-5 text-red-500" />,
    },
    {
      title: "Growing Conditions",
      description: "Favorable for rice cultivation. Consider irrigation on Wednesday.",
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Wind Advisory",
      description: "Moderate winds on Friday, suitable for pesticide application in the morning.",
      icon: <Wind className="h-5 w-5 text-purple-500" />,
    },
  ];
  
  // Weather alerts
  const weatherAlerts = [
    {
      type: "Advisory",
      title: "Heat Advisory",
      description: "Temperatures may reach 32°C on Wednesday. Ensure proper hydration for workers and livestock.",
      severity: "moderate",
    }
  ];
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Weather Forecast</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed weather for your farming decisions
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <select className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            <option>North Farm (Ludhiana)</option>
            <option>South Farm (Amritsar)</option>
            <option>East Farm (Jalandhar)</option>
          </select>
          
          <select className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            <option>Today</option>
            <option>Next 7 Days</option>
            <option>Next 14 Days</option>
            <option>Monthly Outlook</option>
          </select>
        </div>
      </div>
      
      {/* Current Weather Card */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{location.name}, {location.state}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {location.country} · Updated {currentWeather.lastUpdated}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Cloud className="h-16 w-16 text-blue-500" />
                <span className="text-lg">{currentWeather.condition}</span>
              </div>
            </div>
            
            <div className="flex items-center mt-6">
              <span className="text-6xl font-bold">{currentWeather.temperature}°C</span>
              <div className="ml-4 text-gray-600 dark:text-gray-400">
                <div>Feels like {currentWeather.feelsLike}°C</div>
                <div className="flex gap-4 mt-1">
                  <span>Low: {forecast[0].low}°</span>
                  <span>High: {forecast[0].high}°</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Humidity</span>
              <div className="flex items-center mt-1">
                <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                <span>{currentWeather.humidity}%</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Wind</span>
              <div className="flex items-center mt-1">
                <Wind className="h-4 w-4 mr-2 text-gray-500" />
                <span>{currentWeather.windSpeed} km/h {currentWeather.windDirection}</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Precipitation</span>
              <div className="flex items-center mt-1">
                <CloudRain className="h-4 w-4 mr-2 text-blue-500" />
                <span>{currentWeather.precipitation} mm</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-sm">UV Index</span>
              <div className="flex items-center mt-1">
                <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                <span>{currentWeather.uvIndex} (High)</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Visibility</span>
              <div className="flex items-center mt-1">
                <Info className="h-4 w-4 mr-2 text-gray-500" />
                <span>{currentWeather.visibility}</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Pressure</span>
              <div className="flex items-center mt-1">
                <BarChart3 className="h-4 w-4 mr-2 text-gray-500" />
                <span>{currentWeather.pressure}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Weather Alerts */}
      {weatherAlerts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Weather Alerts</h2>
          {weatherAlerts.map((alert, idx) => (
            <Card 
              key={idx} 
              className={`p-4 mb-4 border-l-4 ${
                alert.severity === 'high' ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' : 
                alert.severity === 'moderate' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
              }`}
            >
              <div className="flex items-start">
                <AlertTriangle className={`h-5 w-5 mr-3 ${
                  alert.severity === 'high' ? 'text-red-500' : 
                  alert.severity === 'moderate' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div>
                  <div className="font-medium">{alert.type}: {alert.title}</div>
                  <p className="text-sm mt-1">{alert.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Hourly Forecast */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Hourly Forecast</h2>
        <Card className="p-4 overflow-x-auto">
          <div className="flex space-x-6 min-w-max">
            {hourlyForecast.map((hour, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[80px]">
                <span className="font-medium mb-2">{hour.time}</span>
                {hour.icon}
                <span className="text-lg font-bold mt-2">{hour.temp}°</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{hour.condition}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* 7-Day Forecast */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">7-Day Forecast</h2>
        <Card className="overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {forecast.map((day, idx) => (
              <div key={idx} className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="w-1/4">
                  <span className="font-medium">{day.day}</span>
                </div>
                <div className="w-1/4 flex items-center">
                  {day.icon}
                  <span className="ml-2">{day.condition}</span>
                </div>
                <div className="w-1/4 flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">
                    {day.low}° / {day.high}°
                  </span>
                </div>
                <div className="w-1/4 flex items-center">
                  <CloudRain className="h-4 w-4 text-blue-500 mr-2" />
                  <span>{day.precipitation}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Agricultural Forecasts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Agricultural Weather Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agriculturalForecasts.map((item, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-start">
                {item.icon}
                <div className="ml-3">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Historical Weather & Long-term Outlook */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Historical Weather</h3>
            <Calendar className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Compare current conditions with historical averages
          </p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Average High (June)</span>
              <span className="font-medium">35°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Current Month High</span>
              <span className="font-medium text-green-600">32°C (-3°)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Average Rainfall (June)</span>
              <span className="font-medium">65mm</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Current Month Rainfall</span>
              <span className="font-medium text-red-600">45mm (-20mm)</span>
            </div>
          </div>
          
          <button className="flex items-center mt-4 text-green-600 hover:text-green-700 font-medium">
            View Full Historical Data
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Seasonal Outlook</h3>
            <ThermometerSun className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Long-term weather predictions for planning
          </p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">July - September</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Temperatures expected to be 1-2°C above normal. Rainfall near or slightly below average.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Monsoon Prediction</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monsoon likely to arrive on schedule. Predicted to be slightly weaker than usual.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Drought Risk</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Low risk of drought conditions in the next 3 months.
              </p>
            </div>
          </div>
          
          <button className="flex items-center mt-4 text-green-600 hover:text-green-700 font-medium">
            View Detailed Forecast
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </Card>
      </div>
      
      {/* Weather Impact on Crops */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Weather Impact on Crops</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Rice</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Positive</span>
                  <span>Current temperatures optimal for growth</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Watch</span>
                  <span>Below average rainfall may require irrigation</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Wheat</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Positive</span>
                  <span>Mild temperatures favorable for development</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Positive</span>
                  <span>Dry conditions reduce disease pressure</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Vegetables</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Watch</span>
                  <span>High UV index may stress leafy greens</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Positive</span>
                  <span>Good growing conditions for tomatoes</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-2">Recommended Actions</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Consider irrigation for rice fields by Wednesday if no rainfall occurs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Good opportunity for field work on Tuesday and Wednesday</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Provide shade for sensitive vegetable crops during peak afternoon hours</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
