"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Activity, TrendingUp, AlertCircle, Leaf, Calendar, Download, ThumbsUp, AlertTriangle, Lightbulb, CheckCircle2, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardMockPage() {
  // Mock data for demonstration
  const stats = {
    totalScans: 156,
    diseasesDetected: 42,
    healthyPlants: 114,
    lastScan: "2 hours ago"
  };

  const recentDetections = [
    { id: 1, date: "2024-10-29", disease: "Tomato - Early Blight", confidence: 92, status: "disease", imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=100" },
    { id: 2, date: "2024-10-29", disease: "Healthy", confidence: 96, status: "healthy", imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=100" },
    { id: 3, date: "2024-10-28", disease: "Potato - Late Blight", confidence: 89, status: "disease", imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100" },
    { id: 4, date: "2024-10-28", disease: "Healthy", confidence: 94, status: "healthy", imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=100" },
    { id: 5, date: "2024-10-27", disease: "Powdery Mildew", confidence: 87, status: "disease", imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=100" },
    { id: 6, date: "2024-10-27", disease: "Healthy", confidence: 93, status: "healthy", imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=100" },
    { id: 7, date: "2024-10-26", disease: "Tomato - Leaf Spot", confidence: 85, status: "disease", imageUrl: "https://images.unsplash.com/photo-1606731198061-c4d7e5c9dbb4?w=100" },
    { id: 8, date: "2024-10-26", disease: "Corn - Common Rust", confidence: 91, status: "disease", imageUrl: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=100" },
  ];

  const diseaseDistribution = [
    { name: "Healthy", value: 114, color: "#10b981" },
    { name: "Powdery Mildew", value: 15, color: "#f59e0b" },
    { name: "Early Blight", value: 12, color: "#ef4444" },
    { name: "Leaf Spot", value: 8, color: "#8b5cf6" },
    { name: "Late Blight", value: 7, color: "#ec4899" },
  ];

  const monthlyTrends = [
    { month: "Jun", scans: 18, diseases: 5 },
    { month: "Jul", scans: 24, diseases: 7 },
    { month: "Aug", scans: 31, diseases: 9 },
    { month: "Sep", scans: 38, diseases: 11 },
    { month: "Oct", scans: 45, diseases: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Demo Banner */}
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-6 shadow-2xl border-4 border-blue-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-full p-3">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-1">Demo Dashboard</h2>
                  <p className="text-blue-100 font-medium">
                    This is a preview with sample data. Sign in to see your real dashboard!
                  </p>
                </div>
              </div>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-2xl px-8 py-6 text-lg shadow-lg">
                Sign In for Real Data
              </Button>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 animate-bounce-slow">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">
              Your Dashboard
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Track your plant health and detection history
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-700">Total Scans</h3>
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">{stats.totalScans}</div>
              <p className="text-sm text-gray-600 font-medium">+23 from last month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-700">Diseases Detected</h3>
                <div className="bg-amber-100 p-2 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">{stats.diseasesDetected}</div>
              <p className="text-sm text-gray-600 font-medium">26.9% of total scans</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-700">Healthy Plants</h3>
                <div className="bg-green-100 p-2 rounded-xl">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">{stats.healthyPlants}</div>
              <p className="text-sm text-gray-600 font-medium">73.1% success rate</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-4 border-gray-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-700">Last Scan</h3>
                <div className="bg-gray-100 p-2 rounded-xl">
                  <Calendar className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">{stats.lastScan}</div>
              <p className="text-sm text-gray-600 font-medium">Keep monitoring regularly</p>
            </motion.div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl border-4 border-gray-200 p-1 h-auto">
              <TabsTrigger value="overview" className="rounded-xl py-3 text-lg font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl py-3 text-lg font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white">History</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-xl py-3 text-lg font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Monthly Trends Chart */}
                <Card className="rounded-3xl border-4 border-blue-300 shadow-xl">
                  <CardHeader className="bg-blue-50 rounded-t-3xl">
                    <CardTitle className="text-2xl font-black text-gray-900">Monthly Trends</CardTitle>
                    <CardDescription className="text-gray-700 font-medium">
                      Scans and disease detections over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="scans" fill="#10b981" name="Total Scans" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="diseases" fill="#f59e0b" name="Diseases" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Disease Distribution Pie Chart */}
                <Card className="rounded-3xl border-4 border-purple-300 shadow-xl">
                  <CardHeader className="bg-purple-50 rounded-t-3xl">
                    <CardTitle className="text-2xl font-black text-gray-900">Disease Distribution</CardTitle>
                    <CardDescription className="text-gray-700 font-medium">
                      Breakdown of detection results
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={diseaseDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {diseaseDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="rounded-3xl border-4 border-green-300 shadow-xl">
                <CardHeader className="bg-green-50 rounded-t-3xl">
                  <CardTitle className="text-2xl font-black text-gray-900">Recent Detections</CardTitle>
                  <CardDescription className="text-gray-700 font-medium">
                    Latest plant health scans
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {recentDetections.slice(0, 5).map((detection) => (
                      <motion.div
                        key={detection.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <img 
                            src={detection.imageUrl} 
                            alt={detection.disease}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-gray-300"
                          />
                          <div>
                            <p className="font-bold text-gray-900">{detection.disease}</p>
                            <p className="text-sm text-gray-600 font-medium">{detection.date}</p>
                          </div>
                        </div>
                        <Badge 
                          className={`${detection.status === 'healthy' ? 'bg-green-600' : 'bg-amber-500'} text-white font-bold px-4 py-2 text-sm`}
                        >
                          {detection.confidence}% confidence
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card className="rounded-3xl border-4 border-indigo-300 shadow-xl">
                <CardHeader className="bg-indigo-50 rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-black text-gray-900">Complete Detection History</CardTitle>
                      <CardDescription className="text-gray-700 font-medium">
                        All plant disease scans
                      </CardDescription>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {recentDetections.map((detection) => (
                      <div key={detection.id} className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-indigo-400 transition-all">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={detection.imageUrl} 
                            alt={detection.disease}
                            className="w-12 h-12 rounded-lg object-cover border-2 border-gray-300"
                          />
                          <div>
                            <p className="font-bold text-gray-900">{detection.disease}</p>
                            <p className="text-sm text-gray-600 font-medium">{detection.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={`${detection.status === 'healthy' ? 'bg-green-600' : 'bg-amber-500'} text-white font-bold`}>
                            {detection.confidence}%
                          </Badge>
                          <Button variant="outline" size="sm" className="border-2 border-gray-300 font-bold rounded-xl hover:bg-gray-50">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-8 text-center shadow-xl border-4 border-green-300">
                  <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Health Score Trend</h3>
                  <div className="text-6xl font-black text-green-600 mb-3">73.1%</div>
                  <p className="text-xl text-gray-700 font-medium mb-4">Overall Health Score</p>
                  <div className="flex items-center justify-center gap-2 text-green-600 font-bold">
                    <ThumbsUp className="h-6 w-6" />
                    <span className="text-lg">+8.3% from last month</span>
                  </div>
                </div>

                <Card className="rounded-3xl border-4 border-pink-300 shadow-xl">
                  <CardHeader className="bg-pink-50 rounded-t-3xl">
                    <CardTitle className="text-2xl font-black text-gray-900">AI Insights</CardTitle>
                    <CardDescription className="text-gray-700 font-medium">
                      Smart recommendations from your data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-base font-bold text-green-900">Excellent Progress!</p>
                      </div>
                      <p className="text-sm text-green-800 font-medium">
                        Your healthy plant rate has improved by 18% this month
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-amber-500 w-8 h-8 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-base font-bold text-amber-900">Watch Out</p>
                      </div>
                      <p className="text-sm text-amber-800 font-medium">
                        Early blight cases detected. Consider preventive fungicide treatment.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-base font-bold text-blue-900">Pro Tip</p>
                      </div>
                      <p className="text-sm text-blue-800 font-medium">
                        Regular monitoring every 3-4 days helps catch diseases in early stages
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

