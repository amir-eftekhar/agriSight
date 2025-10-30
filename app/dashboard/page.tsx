"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Activity, TrendingUp, AlertCircle, Leaf, Calendar, Download, Target, Zap, ThumbsUp, AlertTriangle, Lightbulb, CheckCircle2, Lock, Loader2, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { getUserDetections } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [detections, setDetections] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      // Show notification and redirect
      toast({
        title: "Sign In Required",
        description: "Please sign in to access your dashboard",
        variant: "destructive",
      });
      router.push('/');
    }
  }, [user, loading, router, toast]);

  useEffect(() => {
    async function loadUserData() {
      if (user) {
        try {
          const userDetections = await getUserDetections(user.id);
          setDetections(userDetections);
        } catch (error) {
          console.error('Error loading detections:', error);
        } finally {
          setLoadingData(false);
        }
      }
    }
    loadUserData();
  }, [user]);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="max-w-lg w-full shadow-2xl border-4 border-gray-300 rounded-3xl">
            <CardContent className="pt-12 pb-8 px-8 text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lock className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Sign In Required
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Please sign in to access your personalized dashboard with detection history, analytics, and insights.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => router.push('/')} 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg py-6 rounded-2xl shadow-lg"
                >
                  <User className="h-5 w-5 mr-2" />
                  Sign In to Continue
                </Button>
                
                <p className="text-sm text-gray-500">
                  Don't have an account? Sign up to start tracking your plant health!
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">With an account, you can:</p>
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600">Save detections</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600">Track history</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600">View analytics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600">Get insights</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Calculate stats from actual user data
  const totalScans = detections.length;
  const diseasesDetected = detections.filter(d => d.disease.toLowerCase() !== 'healthy').length;
  const healthyPlants = detections.filter(d => d.disease.toLowerCase() === 'healthy').length;
  const lastScan = detections.length > 0 
    ? new Date(detections[0].created_at).toLocaleString()
    : 'No scans yet';

  const stats = {
    totalScans,
    diseasesDetected,
    healthyPlants,
    lastScan
  };

  // Use actual user detections or show placeholder
  const recentDetections = detections.length > 0 
    ? detections.slice(0, 5).map(d => ({
        id: d.id,
        date: new Date(d.created_at).toLocaleDateString(),
        disease: d.disease,
        confidence: d.confidence,
        status: d.disease.toLowerCase() === 'healthy' ? 'healthy' : 'disease'
      }))
    : [
        { id: 1, date: "No data", disease: "Start by detecting plants", confidence: 0, status: "healthy" },
      ];

  // Calculate actual disease distribution
  const diseaseMap = new Map<string, number>();
  detections.forEach(d => {
    const disease = d.disease;
    diseaseMap.set(disease, (diseaseMap.get(disease) || 0) + 1);
  });

  const colors = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#3b82f6", "#ec4899"];
  const diseaseDistribution = detections.length > 0
    ? Array.from(diseaseMap.entries()).map(([name, value], index) => ({
        name,
        value,
        color: name.toLowerCase() === 'healthy' ? '#10b981' : colors[index % colors.length]
      }))
    : [{ name: "No Data", value: 1, color: "#9ca3af" }];

  // Calculate monthly trends from actual data
  const monthlyMap = new Map<string, { scans: number; diseases: number }>();
  detections.forEach(d => {
    const date = new Date(d.created_at);
    const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
    const current = monthlyMap.get(monthKey) || { scans: 0, diseases: 0 };
    current.scans += 1;
    if (d.disease.toLowerCase() !== 'healthy') {
      current.diseases += 1;
    }
    monthlyMap.set(monthKey, current);
  });

  const monthlyTrends = detections.length > 0
    ? Array.from(monthlyMap.entries()).map(([month, data]) => ({
        month,
        scans: data.scans,
        diseases: data.diseases
      })).slice(-5)
    : [
        { month: "N/A", scans: 0, diseases: 0 },
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-purple rounded-full mb-4 animate-bounce-slow">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 text-shadow-fun">
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
              className="card-info p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-700">Total Scans</h3>
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">{stats.totalScans}</div>
              <p className="text-sm text-gray-600 font-medium">+12 from last month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-warning p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-700">Diseases Detected</h3>
                <div className="bg-amber-100 p-2 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">{stats.diseasesDetected}</div>
              <p className="text-sm text-gray-600 font-medium">25.5% of total scans</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-success p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-700">Healthy Plants</h3>
                <div className="bg-green-100 p-2 rounded-xl">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">{stats.healthyPlants}</div>
              <p className="text-sm text-gray-600 font-medium">74.5% success rate</p>
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
                    Your latest plant health scans
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
                          <div className={`w-4 h-4 rounded-full ${detection.status === 'healthy' ? 'bg-green-500' : 'bg-amber-500'}`} />
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
                        All your plant disease scans
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
                          <div className={`w-4 h-4 rounded-full ${detection.status === 'healthy' ? 'bg-green-500' : 'bg-amber-500'}`} />
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
                <div className="card-success p-8 text-center">
                  <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Health Score Trend</h3>
                  <div className="text-6xl font-black text-green-600 mb-3">74.5%</div>
                  <p className="text-xl text-gray-700 font-medium mb-4">Overall Health Score</p>
                  <div className="flex items-center justify-center gap-2 text-green-600 font-bold">
                    <ThumbsUp className="h-6 w-6" />
                    <span className="text-lg">+5.2% from last month</span>
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
                        <p className="text-base font-bold text-green-900">Good Job!</p>
                      </div>
                      <p className="text-sm text-green-800 font-medium">
                        Your detection rate has improved by 15% this month
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
                        Powdery mildew cases are increasing. Consider preventive measures.
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
                        Regular monitoring every 3-4 days can help catch diseases early
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
