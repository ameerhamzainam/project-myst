'use client'
import React, { useCallback, useState } from "react";
import Navbar from "@/components/Navbar/page"; // Use @ alias for cleaner imports
import AIPromptGenerator from "@/components/AIPromptGenerator/page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
// import { Message } from "@/types/ApiResponse"; // Use a frontend type, not the DB model

export default function DashboardClient({ session }: { session: any }) {
  const [messages, setMessages] = useState<any[]>([]); // Use your frontend Message type
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: false
    }
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((m) => m._id.toString() !== messageId));
  };

  return (
    <div style={{ padding: "40px" }}>
      <Navbar />
      <h1>Dashboard</h1>
      <p>Welcome back, <strong>{session.user?.name || session.user?.email}</strong>!</p>
      
      <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc" }}>
        <h3>Your Profile Info</h3>
        <p>Email: {session.user?.email}</p>
      </div>
      <AIPromptGenerator />
    </div>
  );
}