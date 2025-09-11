"use client";
import { useEffect, useRef, useState } from "react";
import { Loader2, Camera, Send, RotateCcw, AlertTriangle, CheckCircle, Info, Leaf, BookOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

interface DiagnosisResult {
  plant: string;
  disease: string;
  confidence: number;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string;
  recommendation: string;
  preventionTips?: string[];
  severity?: string;
}

export default function DiagnosisPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [viewHistory, setViewHistory] = useState(false);
  
  const { data: session, status } = useSession();

  // Mock diagnosis history
  const diagnosisHistory = [
    {
      id: "diag1",
      plant: "Wheat",
      disease: "Leaf Rust",
      date: "2 days ago",
      image: "/image2.png",
      severity: "Medium"
    },
    {
      id: "diag2",
      plant: "Rice",
      disease: "Bacterial Leaf Blight",
      date: "1 week ago",
      image: "/image.png",
      severity: "High"
    },
    {
      id: "diag3",
      plant: "Tomato",
      disease: "Healthy",
      date: "2 weeks ago",
      image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9tYXRvJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D",
      severity: "None"
    }
  ];

  useEffect(() => {
    const startCamera = async () => {
      try {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const constraints = {
          video: {
            facingMode: isMobile ? { exact: "environment" } : "user",
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraError(null);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError("We couldn't access your camera. Please check permissions and try again.");
      }
    };

    if (!viewHistory) {
      startCamera();
    }

    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [viewHistory]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imgData = canvas.toDataURL("image/png"); // base64 image
      setPhoto(imgData);
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
    setResult(null);
  };

  const sendToAPI = async () => {
    if (!photo) return;
    setLoading(true);

    try {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        const body = {
          image: photo,
          location: { lat: latitude, lng: longitude },
        };

        try {
          const res = await fetch("/api/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const data = await res.json();

          if (res.status !== 200) {
            // Mock data for demo
            setResult({
              plant: "Tomato",
              disease: "Late Blight",
              confidence: 0.95,
              location: { lat: latitude, lng: longitude },
              timestamp: new Date().toISOString(),
              recommendation:
                "Remove affected leaves, use copper-based fungicide, and avoid overhead watering.",
              preventionTips: [
                "Rotate crops every 2-3 years",
                "Use disease-resistant varieties when available",
                "Ensure proper spacing between plants for adequate air circulation",
                "Apply preventative fungicides during wet weather conditions"
              ],
              severity: "High"
            });
          } else {
            setResult(data);
          }
        } catch (err) {
          // Mock data in case of error
          setResult({
            plant: "Tomato",
            disease: "Late Blight",
            confidence: 0.95,
            location: { lat: latitude, lng: longitude },
            timestamp: new Date().toISOString(),
            recommendation:
              "Remove affected leaves, use copper-based fungicide, and avoid overhead watering.",
            preventionTips: [
              "Rotate crops every 2-3 years",
              "Use disease-resistant varieties when available",
              "Ensure proper spacing between plants for adequate air circulation",
              "Apply preventative fungicides during wet weather conditions"
            ],
            severity: "High"
          });
        }
        
        setLoading(false);
      }, (err) => {
        console.error("Geolocation error:", err);
        // If geolocation fails, still provide a result with dummy coords
        setResult({
          plant: "Tomato",
          disease: "Late Blight",
          confidence: 0.95,
          location: { lat: 28.7041, lng: 77.1025 },
          timestamp: new Date().toISOString(),
          recommendation:
            "Remove affected leaves, use copper-based fungicide, and avoid overhead watering.",
          preventionTips: [
            "Rotate crops every 2-3 years",
            "Use disease-resistant varieties when available",
            "Ensure proper spacing between plants for adequate air circulation",
            "Apply preventative fungicides during wet weather conditions"
          ],
          severity: "High"
        });
        setLoading(false);
      });
    } catch (err) {
      console.error("Error sending to API:", err);
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'low':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'none':
      default:
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be logged in to use the diagnosis feature</p>
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
          <h1 className="text-2xl font-bold">Crop Diagnosis</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setViewHistory(!viewHistory)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                viewHistory 
                  ? "bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700" 
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {viewHistory ? "Take New Photo" : "View History"}
            </button>
          </div>
        </div>
        
        {viewHistory ? (
          <div className="mb-10">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">Diagnosis History</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diagnosisHistory.map((item) => (
                  <div key={item.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.plant} 
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                        {item.severity}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{item.plant}</h3>
                      <p className={`text-sm ${
                        item.disease === "Healthy" 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {item.disease}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Take a Photo</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Take a clear photo of the affected plant part (leaf, stem, fruit) to diagnose potential diseases.
              </p>
              
              {cameraError ? (
                <div className="flex flex-col items-center gap-4 p-6 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                  <p className="text-center text-red-600 dark:text-red-400">{cameraError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition"
                  >
                    <RotateCcw size={16} />
                    Retry Camera
                  </button>
                </div>
              ) : !photo ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="w-full max-w-md aspect-[4/3] bg-black rounded-lg overflow-hidden shadow-md">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                  
                  <button
                    onClick={takePhoto}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition"
                  >
                    <Camera size={18} />
                    Take Photo
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-md aspect-[4/3] bg-black rounded-lg overflow-hidden shadow-md">
                    <img
                      src={photo}
                      alt="Captured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={resetPhoto}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-sm transition"
                    >
                      <RotateCcw size={16} />
                      Retake
                    </button>
                    
                    <button
                      onClick={sendToAPI}
                      disabled={loading}
                      className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                      {loading ? "Analyzing..." : "Analyze Image"}
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
                <h3 className="text-sm font-medium mb-2">Tips for Best Results:</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                    <span>Take close-up photos in good lighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                    <span>Focus on the affected area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                    <span>Include both healthy and infected parts for comparison</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              {result ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      result.disease.toLowerCase().includes('healthy') 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {result.disease.toLowerCase().includes('healthy') 
                        ? <CheckCircle className="h-6 w-6" /> 
                        : <AlertTriangle className="h-6 w-6" />
                      }
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Diagnosis Result</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(result.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Plant</p>
                      <p className="text-lg font-semibold">{result.plant}</p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Disease</p>
                      <p className={`text-lg font-semibold ${
                        result.disease.toLowerCase().includes('healthy') 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {result.disease}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Confidence</p>
                      <p className="text-lg font-semibold">{(result.confidence * 100).toFixed(1)}%</p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Severity</p>
                      <p className={`text-lg font-semibold ${getSeverityColor(result.severity || 'Low')}`}>
                        {result.severity || 'Low'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="flex items-center gap-2 font-semibold mb-2">
                        <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                        Recommendation
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{result.recommendation}</p>
                    </div>
                    
                    {result.preventionTips && result.preventionTips.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold mb-2">
                          <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                          Prevention Tips
                        </h3>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {result.preventionTips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Link href="/predictions/treatment?disease=Late%20Blight&plant=Tomato">
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Info className="h-4 w-4" />
                        View Detailed Treatment
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-10">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                    <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Results will appear here</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-md">
                    Take a photo of your crop and analyze it to get a detailed diagnosis and treatment recommendations.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
