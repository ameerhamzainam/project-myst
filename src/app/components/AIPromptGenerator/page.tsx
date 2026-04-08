"use client";

import { useCompletion } from "@ai-sdk/react";
import { useState } from "react";

export default function AIPromptGenerator() {
  const [questions, setQuestions] = useState<string[]>([]);
  
  const { complete, completion, isLoading } = useCompletion({
  api: "/api/chat",
  // This is the key for v6 when using toTextStreamResponse
  streamProtocol: 'text', 
  onFinish: (prompt, result) => {
    setQuestions(result.split("||"));
  },
});

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <button 
        onClick={() => complete("")} 
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
      >
        {isLoading ? "Generating Questions..." : "Suggest AI Questions"}
      </button>

      <div className="mt-4 flex flex-col gap-2">
        {questions.length > 0 && questions.map((q, i) => (
          <div 
            key={i} 
            className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-900 cursor-pointer hover:bg-indigo-100"
            onClick={() => {
               // Logic to auto-fill your message input would go here
               console.log("Selected:", q.trim());
            }}
          >
            {q.trim()}
          </div>
        ))}
      </div>
    </div>
  );
}