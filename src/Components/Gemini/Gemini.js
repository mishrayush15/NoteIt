

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyB7jajy5owK-0O7OM6Zp_32zEEBgwdkeBw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function run(text) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage(text + " make short and important notes or points of the given paragraph/ chapter/ text regardless of anything and also add add some important points from you side to make me understand this clearly");
    const ans = result.response.text();
    return ans;
}
