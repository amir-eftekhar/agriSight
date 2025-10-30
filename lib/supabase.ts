import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DetectionResult = {
  id: string;
  user_id: string;
  image_url: string;
  disease: string;
  confidence: number;
  ai_analysis: string;
  created_at: string;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  region?: string;
  primary_crops?: string[];
  created_at: string;
};

export async function saveDetectionResult(
  userId: string,
  imageUrl: string,
  disease: string,
  confidence: number,
  aiAnalysis: string
) {
  const { data, error } = await supabase
    .from('detection_results')
    .insert([
      {
        user_id: userId,
        image_url: imageUrl,
        disease,
        confidence,
        ai_analysis: aiAnalysis,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getUserDetections(userId: string) {
  const { data, error } = await supabase
    .from('detection_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as DetectionResult[];
}

export async function uploadImage(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('plant-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('plant-images')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as UserProfile | null;
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({ id: userId, ...updates })
    .select();

  if (error) throw error;
  return data[0];
}

// Community functions
export type CommunityPost = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  disease_tag?: string;
  crop_type?: string;
  image_url?: string;
  is_solved: boolean;
  upvotes: number;
  created_at: string;
};

export type CommunityReply = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  is_solution: boolean;
  upvotes: number;
  created_at: string;
};

export async function getCommunityPosts(limit = 50) {
  const { data, error } = await supabase
    .from('community_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as CommunityPost[];
}

export async function createCommunityPost(
  userId: string,
  title: string,
  content: string,
  diseaseTag?: string,
  cropType?: string,
  imageUrl?: string
) {
  const { data, error } = await supabase
    .from('community_posts')
    .insert([
      {
        user_id: userId,
        title,
        content,
        disease_tag: diseaseTag,
        crop_type: cropType,
        image_url: imageUrl,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getPostReplies(postId: string) {
  const { data, error } = await supabase
    .from('community_replies')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as CommunityReply[];
}

export async function createReply(
  postId: string,
  userId: string,
  content: string,
  isSolution = false
) {
  const { data, error } = await supabase
    .from('community_replies')
    .insert([
      {
        post_id: postId,
        user_id: userId,
        content,
        is_solution: isSolution,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function upvotePost(postId: string) {
  const { data, error } = await supabase.rpc('increment_post_upvotes', {
    post_id: postId,
  });

  if (error) throw error;
  return data;
}

export async function markPostSolved(postId: string) {
  const { data, error } = await supabase
    .from('community_posts')
    .update({ is_solved: true })
    .eq('id', postId)
    .select();

  if (error) throw error;
  return data[0];
}

// Chat message functions
export type ChatMessage = {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  image_url?: string;
  created_at: string;
};

export async function saveChatMessage(
  userId: string,
  role: 'user' | 'assistant',
  content: string,
  imageUrl?: string
) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      {
        user_id: userId,
        role,
        content,
        image_url: imageUrl,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getUserChatHistory(userId: string, limit = 100) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data as ChatMessage[];
}
