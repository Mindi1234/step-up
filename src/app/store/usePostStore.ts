"use client";

import { create } from "zustand";
import { IPost } from "@/interfaces/IPost";
import {pusherClient } from "@/lib/pusher-frontend";
import Pusher from "pusher-js";

type PusherClinet = Pusher;
interface PostState {
  posts: IPost[];
  pusherClient: PusherClinet | null;
  setPosts: (posts: IPost[]) => void;
  clearPosts: () => void;
  updatePost: (id: string, updated: Partial<IPost>) => void;
  removePost: (id: string) => void;
  updatePostLikes: (postId: string, newLikesCount: number) => void;
  initPostChannel: (userId: string) => void;
}

export const usePostStore = create<PostState>((set,get) => ({
  posts: [],
  pusherClient: null,
  setPosts: (posts) => set({ posts }),
  clearPosts: () => set({ posts: [] }),

  updatePost: (id, updated) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, ...updated } as IPost : p
      ),
    })),

  removePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id === id),
    })),

  updatePostLikes: (postId, newLikesCount) =>
    set((state) => ({
      posts: state.posts.map((p) => p.id === postId ?
        { ...p, likesCount: newLikesCount } as IPost : p
      ),
    })),

  initPostChannel: (userId) => {
    const state = get();
    if (state.pusherClient && (state.pusherClient as any).connection.state === 'connected') {
      console.log("Pusher already initialized and connected.");
      return;
    }

    
    // 1. צור או אחזר את הערוץ
    const channel = pusherClient.subscribe(`private-user-${userId}`);

    // 2. קבע את ה-Listener לאירוע
    channel.bind("like-toggled", (data: any) => {
      console.log(`Received like-toggled event for post ${data.postId}:`, data);
      // הפעל את פונקציית העדכון של ה-Store
      usePostStore.getState().updatePostLikes(data.postId, data.likesCount);
    });

    // אופציונלי: פונקציה לבטל הרשמה (Unsubscribe) כאשר הקומפוננטה נעלמת
    return () => {
      channel.unbind("like-toggled");
      pusherClient.unsubscribe(`private-user-${userId}`);
    };
  },
}));

