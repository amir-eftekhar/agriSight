"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Plus, 
  MessageCircle, 
  ThumbsUp, 
  CheckCircle2, 
  Search,
  TrendingUp,
  Leaf,
  AlertCircle,
  Filter,
  Image as ImageIcon
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  diseaseTag?: string;
  cropType?: string;
  imageUrl?: string;
  isSolved: boolean;
  upvotes: number;
  replyCount: number;
  createdAt: Date;
}

interface Reply {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  isSolution: boolean;
  upvotes: number;
  createdAt: Date;
}

export default function CommunityPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'John Farmer',
      title: 'Yellow spots on tomato leaves - Need help!',
      content: 'I\'ve been noticing yellow spots appearing on my tomato plants. They started small but are spreading quickly. Has anyone dealt with this before?',
      diseaseTag: 'Leaf Spot',
      cropType: 'Tomatoes',
      imageUrl: undefined,
      isSolved: true,
      upvotes: 15,
      replyCount: 8,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Sarah Green',
      title: 'White powder on cucumber leaves',
      content: 'My cucumber plants have developed a white powdery substance on the leaves. It seems to be spreading to other plants. What should I do?',
      diseaseTag: 'Powdery Mildew',
      cropType: 'Cucumbers',
      imageUrl: undefined,
      isSolved: true,
      upvotes: 23,
      replyCount: 12,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Mike Rodriguez',
      title: 'Early blight on potatoes - organic solutions?',
      content: 'Looking for organic treatment options for early blight. I prefer not to use chemical fungicides if possible.',
      diseaseTag: 'Early Blight',
      cropType: 'Potatoes',
      imageUrl: undefined,
      isSolved: false,
      upvotes: 8,
      replyCount: 5,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'Lisa Chen',
      title: 'Aphid infestation spreading fast!',
      content: 'My pepper plants are being attacked by aphids. They\'re multiplying quickly and I need advice on natural pest control methods.',
      diseaseTag: 'Pests',
      cropType: 'Peppers',
      imageUrl: undefined,
      isSolved: false,
      upvotes: 12,
      replyCount: 6,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);

  const diseasesTags = ['All', 'Powdery Mildew', 'Early Blight', 'Leaf Spot', 'Pests', 'Root Rot', 'Mosaic Virus'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterTag === 'all' || post.diseaseTag === filterTag;
    return matchesSearch && matchesFilter;
  });

  const handleUpvote = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
    toast({
      title: "Upvoted!",
      description: "Thanks for your feedback",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">
              Farmer Community
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Connect with fellow farmers, share experiences, and find solutions together
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-600">Total Posts</h3>
                <MessageCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-3xl font-black text-gray-900">{posts.length}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-600">Solved Issues</h3>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-3xl font-black text-gray-900">
                {posts.filter(p => p.isSolved).length}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-4 border-purple-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-600">Active Members</h3>
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-3xl font-black text-gray-900">156</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-600">This Week</h3>
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <div className="text-3xl font-black text-gray-900">+24</div>
            </motion.div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-gray-300 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-300 rounded-xl h-12"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {diseasesTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={filterTag === tag.toLowerCase() ? "default" : "outline"}
                    onClick={() => setFilterTag(tag.toLowerCase())}
                    className={`rounded-xl font-bold ${
                      filterTag === tag.toLowerCase() 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => setShowNewPostDialog(true)}
                className="bg-green-600 hover:bg-green-700 rounded-xl font-bold h-12 px-6"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Post
              </Button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="rounded-3xl border-4 border-gray-300 shadow-xl hover:border-green-400 transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {post.userName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{post.userName}</h3>
                            <p className="text-xs text-gray-500">
                              {post.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          {post.isSolved && (
                            <Badge className="bg-green-600 text-white font-bold ml-2">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Solved
                            </Badge>
                          )}
                        </div>

                        <h2 className="text-2xl font-black text-gray-900 mb-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-700 mb-4">{post.content}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.diseaseTag && (
                            <Badge className="bg-red-100 text-red-800 border-2 border-red-300 font-bold">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {post.diseaseTag}
                            </Badge>
                          )}
                          {post.cropType && (
                            <Badge className="bg-green-100 text-green-800 border-2 border-green-300 font-bold">
                              <Leaf className="h-3 w-3 mr-1" />
                              {post.cropType}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpvote(post.id)}
                            className="font-bold hover:bg-green-50"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.upvotes}
                          </Button>
                          <div className="flex items-center text-gray-600">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">{post.replyCount} replies</span>
                          </div>
                        </div>
                      </div>

                      {post.imageUrl && (
                        <div className="ml-4">
                          <img
                            src={post.imageUrl}
                            alt="Post image"
                            className="w-32 h-32 object-cover rounded-xl border-2 border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500 font-medium">No posts found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


