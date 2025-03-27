"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./component/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { motion } from "framer-motion";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 relative"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          background: [
            "radial-gradient(circle at 20% 20%, rgba(62, 184, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 60%, rgba(62, 184, 255, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(62, 184, 255, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
      >
        ImageKit ReelsPro
      </motion.h1>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [0.8, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto my-20"
        />
      ) : (
        <VideoFeed videos={videos} />
      )}
    </motion.main>
  );
}