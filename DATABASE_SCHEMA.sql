-- AgriSight Database Schema for Supabase
-- Run these commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  region TEXT,
  primary_crops TEXT[],
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Detection Results Table
CREATE TABLE detection_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  disease TEXT NOT NULL,
  confidence DECIMAL(5,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  ai_analysis TEXT,
  treatment_applied BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat History Table (optional)
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Yield Optimization Plans Table (optional)
CREATE TABLE optimization_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  crop_type TEXT NOT NULL,
  region TEXT NOT NULL,
  plan_content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Posts Table (for farmer connections)
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  disease_tag TEXT,
  crop_type TEXT,
  image_url TEXT,
  is_solved BOOLEAN DEFAULT FALSE,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Replies Table
CREATE TABLE community_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_solution BOOLEAN DEFAULT FALSE,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Messages with Images
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX idx_detection_user ON detection_results(user_id);
CREATE INDEX idx_detection_date ON detection_results(created_at DESC);
CREATE INDEX idx_detection_disease ON detection_results(disease);
CREATE INDEX idx_chat_user ON chat_history(user_id);
CREATE INDEX idx_chat_date ON chat_history(created_at DESC);
CREATE INDEX idx_optimization_user ON optimization_plans(user_id);
CREATE INDEX idx_community_posts_date ON community_posts(created_at DESC);
CREATE INDEX idx_community_posts_disease ON community_posts(disease_tag);
CREATE INDEX idx_community_replies_post ON community_replies(post_id);
CREATE INDEX idx_chat_messages_user ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_date ON chat_messages(created_at DESC);

-- Create Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add Trigger to User Profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE detection_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Detection Results Policies
CREATE POLICY "Users can view own detections"
  ON detection_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own detections"
  ON detection_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own detections"
  ON detection_results FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own detections"
  ON detection_results FOR DELETE
  USING (auth.uid() = user_id);

-- Chat History Policies
CREATE POLICY "Users can view own chat history"
  ON chat_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Optimization Plans Policies
CREATE POLICY "Users can view own plans"
  ON optimization_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plans"
  ON optimization_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans"
  ON optimization_plans FOR UPDATE
  USING (auth.uid() = user_id);

-- Community Posts Policies
CREATE POLICY "Anyone can view community posts"
  ON community_posts FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own posts"
  ON community_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON community_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON community_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Community Replies Policies
CREATE POLICY "Anyone can view community replies"
  ON community_replies FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own replies"
  ON community_replies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own replies"
  ON community_replies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies"
  ON community_replies FOR DELETE
  USING (auth.uid() = user_id);

-- Chat Messages Policies
CREATE POLICY "Users can view own chat messages"
  ON chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create Storage Bucket for Plant Images
-- Run this in the Supabase Dashboard Storage section or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('plant-images', 'plant-images', true);

-- Storage Policies
CREATE POLICY "Users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'plant-images' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'plant-images');

CREATE POLICY "Users can update own images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create Views for Analytics (optional)

-- Disease Distribution View
CREATE OR REPLACE VIEW disease_distribution AS
SELECT 
  disease,
  COUNT(*) as count,
  AVG(confidence) as avg_confidence,
  COUNT(DISTINCT user_id) as affected_users
FROM detection_results
GROUP BY disease
ORDER BY count DESC;

-- Monthly Detection Trends View
CREATE OR REPLACE VIEW monthly_detection_trends AS
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as total_detections,
  COUNT(CASE WHEN disease != 'Healthy' THEN 1 END) as disease_detections,
  COUNT(CASE WHEN disease = 'Healthy' THEN 1 END) as healthy_detections
FROM detection_results
GROUP BY month
ORDER BY month DESC;

-- User Statistics View
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
  user_id,
  COUNT(*) as total_scans,
  COUNT(CASE WHEN disease != 'Healthy' THEN 1 END) as diseases_detected,
  COUNT(CASE WHEN disease = 'Healthy' THEN 1 END) as healthy_plants,
  ROUND(AVG(confidence), 2) as avg_confidence,
  MAX(created_at) as last_scan
FROM detection_results
GROUP BY user_id;

-- Grant Select on Views
GRANT SELECT ON disease_distribution TO authenticated;
GRANT SELECT ON monthly_detection_trends TO authenticated;
GRANT SELECT ON user_statistics TO authenticated;

-- Sample Data (for testing - optional)
-- Uncomment if you want to add sample data

/*
INSERT INTO user_profiles (id, email, full_name, region, primary_crops)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'farmer@example.com', 'John Doe', 'California', ARRAY['Tomatoes', 'Lettuce']),
  ('550e8400-e29b-41d4-a716-446655440001', 'student@example.com', 'Jane Smith', 'Texas', ARRAY['Corn', 'Wheat']);

INSERT INTO detection_results (user_id, image_url, disease, confidence, ai_analysis)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'https://example.com/image1.jpg', 'Powdery Mildew', 92.5, 'This plant shows signs of powdery mildew...'),
  ('550e8400-e29b-41d4-a716-446655440000', 'https://example.com/image2.jpg', 'Healthy', 95.0, 'Plant appears healthy with no visible diseases...'),
  ('550e8400-e29b-41d4-a716-446655440001', 'https://example.com/image3.jpg', 'Early Blight', 88.3, 'Early stage blight detected...');
*/

