const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyBH7VQqkgO4M_Tl4KqwHE-dxlpwKmkwjxc");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenerateAIContent = async (
  formData: any,
  selectedTemplate: any
) => {
  if (!selectedTemplate) {
    throw new Error("Selected template is missing");
  }

  try {
    const FinalAIPrompt =
      JSON.stringify(formData) + ", " + selectedTemplate.aiPrompt;
    const result = await chatSession.sendMessage(FinalAIPrompt);
    
    // Extract text from the response
    const aiResponse = result.response.candidates[0].content.parts[0].text;

    // Save to database
    const saveResponse = await fetch("/api/chat/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
        templateSlug: selectedTemplate.slug,
        aiResponse,
      }),
    });

    if (!saveResponse.ok) {
      const errorData = await saveResponse.json();
      throw new Error(errorData.error || "Failed to save chat message");
    }

    return aiResponse;
  } catch (error) {
    console.error("Error in GenerateAIContent:", error);
    throw error;
  }
};
