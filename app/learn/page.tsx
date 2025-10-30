"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Leaf, Sprout, TrendingUp, Shield, Search, ExternalLink, Bug, Droplets, Wind, Target, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const diseases = [
    {
      name: "Powdery Mildew",
      category: "Fungal",
      description: "A fungal disease characterized by white powdery spots on leaves and stems.",
      symptoms: ["White powdery coating", "Leaf curling", "Stunted growth"],
      causes: ["High humidity", "Poor air circulation", "Overcrowding"],
      treatment: "Apply sulfur-based fungicides or neem oil. Improve air circulation.",
      prevention: "Proper plant spacing, reduce humidity, remove infected leaves promptly.",
      icon: <Droplets className="h-10 w-10" />
    },
    {
      name: "Early Blight",
      category: "Fungal",
      description: "A common fungal disease affecting tomatoes and potatoes.",
      symptoms: ["Dark spots with concentric rings", "Yellowing leaves", "Leaf drop"],
      causes: ["Warm, humid weather", "Infected soil", "Water splash"],
      treatment: "Remove infected leaves, apply copper-based fungicides.",
      prevention: "Crop rotation, mulching, avoid overhead watering.",
      icon: <Target className="h-10 w-10" />
    },
    {
      name: "Late Blight",
      category: "Fungal",
      description: "A devastating disease that can destroy entire crops quickly.",
      symptoms: ["Gray-green water-soaked spots", "White mold on leaf undersides", "Rapid plant death"],
      causes: ["Cool, wet weather", "High humidity", "Airborne spores"],
      treatment: "Apply fungicides immediately, remove infected plants.",
      prevention: "Use resistant varieties, ensure good drainage, monitor weather.",
      icon: <Bug className="h-10 w-10" />
    },
    {
      name: "Bacterial Blight",
      category: "Bacterial",
      description: "Bacterial infection causing leaf spots and plant wilting.",
      symptoms: ["Water-soaked lesions", "Brown spots with yellow halos", "Wilting"],
      causes: ["Contaminated tools", "Insect damage", "Wet conditions"],
      treatment: "Remove infected parts, apply copper bactericides.",
      prevention: "Sterilize tools, control insects, avoid working with wet plants.",
      icon: <AlertCircle className="h-10 w-10" />
    },
    {
      name: "Mosaic Virus",
      category: "Viral",
      description: "Viral disease causing mottled, discolored leaves.",
      symptoms: ["Yellow and green mottled patterns", "Distorted leaves", "Stunted growth"],
      causes: ["Aphids and other insects", "Contaminated tools", "Infected seeds"],
      treatment: "No cure; remove infected plants to prevent spread.",
      prevention: "Control aphids, use virus-free seeds, practice good sanitation.",
      icon: <Wind className="h-10 w-10" />
    }
  ];

  const bestPractices = [
    {
      title: "Crop Rotation",
      icon: <Sprout className="h-8 w-8" />,
      description: "Rotate crops annually to prevent soil-borne diseases and pest buildup.",
      tips: [
        "Don't plant the same crop family in the same spot for 3-4 years",
        "Follow heavy feeders with legumes to restore nitrogen",
        "Keep detailed records of what was planted where"
      ],
      color: "green"
    },
    {
      title: "Water Management",
      icon: <Droplets className="h-8 w-8" />,
      description: "Proper watering is crucial for disease prevention.",
      tips: [
        "Water at the base of plants to keep foliage dry",
        "Water in the morning so plants dry during the day",
        "Use drip irrigation when possible",
        "Avoid overwatering which promotes fungal growth"
      ],
      color: "blue"
    },
    {
      title: "Soil Health",
      icon: <TrendingUp className="h-8 w-8" />,
      description: "Healthy soil produces healthy plants that resist diseases.",
      tips: [
        "Add compost regularly to improve soil structure",
        "Test soil pH and adjust as needed",
        "Use organic mulch to retain moisture and suppress weeds",
        "Avoid compaction by not working wet soil"
      ],
      color: "purple"
    },
    {
      title: "Preventive Care",
      icon: <Shield className="h-8 w-8" />,
      description: "Prevention is always better than cure.",
      tips: [
        "Inspect plants regularly for early signs of problems",
        "Remove diseased plant material promptly",
        "Sterilize tools between uses",
        "Choose disease-resistant varieties when available",
        "Maintain proper plant spacing for air circulation"
      ],
      color: "emerald"
    }
  ];

  const sustainablePractices = [
    {
      title: "Integrated Pest Management (IPM)",
      content: "IPM combines biological, cultural, physical, and chemical tools to minimize pest damage with the least disruption to the environment."
    },
    {
      title: "Companion Planting",
      content: "Growing certain plants together can repel pests, attract beneficial insects, and improve overall plant health."
    },
    {
      title: "Composting",
      content: "Turn organic waste into nutrient-rich soil amendment while reducing landfill waste and chemical fertilizer use."
    },
    {
      title: "Natural Predators",
      content: "Encourage beneficial insects like ladybugs and lacewings that prey on plant pests."
    }
  ];

  const yieldOptimization = [
    {
      title: "Optimal Planting Times",
      description: "Plant at the right time for your climate zone to maximize growth and minimize disease pressure."
    },
    {
      title: "Proper Spacing",
      description: "Give plants adequate space for air circulation and light penetration, reducing disease and improving yields."
    },
    {
      title: "Fertilization Strategy",
      description: "Feed plants appropriately with balanced nutrients. Too much or too little can reduce yields and increase susceptibility to diseases."
    },
    {
      title: "Pruning and Training",
      description: "Remove suckers and train plants properly to direct energy into fruit production rather than excess foliage."
    }
  ];

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disease.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const colorMap = {
    green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-400" },
    blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-400" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-400" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-400" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-earth rounded-full mb-4 animate-bounce-slow">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 text-shadow-fun">
              Learning Hub
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Comprehensive guides on plant diseases, sustainable farming practices, 
              and strategies to optimize your crop yields
            </p>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="diseases" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl border-4 border-gray-200 p-1 h-auto">
              <TabsTrigger value="diseases" className="rounded-xl py-3 text-base font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white">Common Diseases</TabsTrigger>
              <TabsTrigger value="practices" className="rounded-xl py-3 text-base font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white">Best Practices</TabsTrigger>
              <TabsTrigger value="sustainable" className="rounded-xl py-3 text-base font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white">Sustainable Farming</TabsTrigger>
              <TabsTrigger value="optimization" className="rounded-xl py-3 text-base font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white">Yield Optimization</TabsTrigger>
            </TabsList>

            {/* Common Diseases Tab */}
            <TabsContent value="diseases" className="space-y-6">
              <Card className="rounded-3xl border-4 border-green-300 shadow-xl">
                <CardHeader className="bg-green-50 rounded-t-3xl">
                  <CardTitle className="text-2xl font-black text-gray-900">Search Plant Diseases</CardTitle>
                  <CardDescription className="text-gray-700 font-medium">
                    Learn about symptoms, causes, and treatments
                  </CardDescription>
                  <div className="relative mt-4">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search diseases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-lg font-medium rounded-2xl border-2 border-gray-300"
                    />
                  </div>
                </CardHeader>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredDiseases.map((disease, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-4 border-gray-300 shadow-xl hover:shadow-2xl hover:border-green-400 transition-all h-full">
                      <CardHeader className="bg-gray-50 rounded-t-3xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-red-100 p-3 rounded-2xl text-red-600">
                            {disease.icon}
                          </div>
                          <Badge className="bg-green-600 text-white font-bold px-3 py-1">
                            {disease.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl font-black text-gray-900">{disease.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <p className="text-base text-gray-700 font-medium">{disease.description}</p>
                        
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                          <h4 className="font-black text-base text-gray-900 mb-2 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            Symptoms:
                          </h4>
                          <ul className="space-y-1">
                            {disease.symptoms.map((symptom, i) => (
                              <li key={i} className="text-sm text-gray-700 font-medium flex items-start gap-2">
                                <span className="text-red-500 text-lg">•</span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                          <h4 className="font-black text-base text-gray-900 mb-2 flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            Treatment:
                          </h4>
                          <p className="text-sm text-gray-700 font-medium">{disease.treatment}</p>
                        </div>

                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                          <h4 className="font-black text-base text-gray-900 mb-2 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-green-600" />
                            Prevention:
                          </h4>
                          <p className="text-sm text-gray-700 font-medium">{disease.prevention}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Best Practices Tab */}
            <TabsContent value="practices" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {bestPractices.map((practice, index) => {
                  const colors = colorMap[practice.color as keyof typeof colorMap];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`rounded-3xl border-4 ${colors.border} shadow-xl h-full`}>
                        <CardHeader className={`${colors.bg} rounded-t-3xl`}>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`${colors.bg} p-3 rounded-2xl ${colors.text} border-2 ${colors.border}`}>
                              {practice.icon}
                            </div>
                            <CardTitle className="text-2xl font-black text-gray-900">{practice.title}</CardTitle>
                          </div>
                          <CardDescription className="text-gray-700 font-medium text-base">{practice.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {practice.tips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className={`${colors.text} text-2xl leading-none`}>•</span>
                                <span className="text-base text-gray-700 font-medium">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Sustainable Farming Tab */}
            <TabsContent value="sustainable" className="space-y-6">
              <Card className="rounded-3xl border-4 border-emerald-300 shadow-xl">
                <CardHeader className="bg-emerald-50 rounded-t-3xl">
                  <CardTitle className="text-3xl font-black text-gray-900">Sustainable Agriculture Practices</CardTitle>
                  <CardDescription className="text-gray-700 font-medium text-lg">
                    Methods to protect the environment while maintaining productive farms
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {sustainablePractices.map((practice, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-white border-4 border-green-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all"
                      >
                        <h3 className="font-black text-xl text-gray-900 mb-3">{practice.title}</h3>
                        <p className="text-base text-gray-700 font-medium">{practice.content}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="card-success p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-green-600" />
                  Additional Resources
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-lg transition-shadow border-2 border-green-200 hover:border-green-400">
                    <span className="text-base font-bold text-gray-900">USDA Sustainable Agriculture Guide</span>
                    <ExternalLink className="h-5 w-5 text-green-600" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-lg transition-shadow border-2 border-green-200 hover:border-green-400">
                    <span className="text-base font-bold text-gray-900">Organic Farming Handbook</span>
                    <ExternalLink className="h-5 w-5 text-green-600" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-lg transition-shadow border-2 border-green-200 hover:border-green-400">
                    <span className="text-base font-bold text-gray-900">Climate-Smart Agriculture</span>
                    <ExternalLink className="h-5 w-5 text-green-600" />
                  </a>
                </div>
              </div>
            </TabsContent>

            {/* Yield Optimization Tab */}
            <TabsContent value="optimization" className="space-y-6">
              <Card className="rounded-3xl border-4 border-amber-300 shadow-xl">
                <CardHeader className="bg-amber-50 rounded-t-3xl">
                  <CardTitle className="text-3xl font-black text-gray-900">Maximize Your Crop Yields</CardTitle>
                  <CardDescription className="text-gray-700 font-medium text-lg">
                    Science-backed strategies to increase productivity
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {yieldOptimization.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white border-l-4 border-amber-500 rounded-xl shadow-md"
                      >
                        <h3 className="font-black text-lg text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-base text-gray-700 font-medium">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="card-success p-8 text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Get Personalized Recommendations</h3>
                <p className="text-lg text-gray-700 font-medium mb-6">
                  Our AI can generate custom yield optimization plans for your specific crops and region
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-110 transition-all">
                  Generate Custom Plan
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
