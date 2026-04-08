import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google"; // Import the creator function

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Rename the instance to avoid conflict with the import
const googleAI = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const result = await streamText({
      model: googleAI("gemini-2.5-flash-lite"), // Use the renamed instance
      prompt:
        "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI SDK Error:", error);
    return new Response(
      JSON.stringify({ error: "Stream initialization failed" }),
      {
        status: 500,
      },
    );
  }
}
