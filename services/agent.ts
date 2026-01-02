import { GoogleGenerativeAI } from "@google/generative-ai";
import { Task } from "../types/types";

const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GEMINI_API_KEY!
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

export async function runTaskCopilot(
    userMessage: string,
    tasks: Task[]
) {
    const prompt = `
You are an embedded task management copilot.

Your capabilities:
- Summarize active tasks
- Suggest priorities
- Break vague tasks into actionable subtasks

Current tasks:
${tasks.map(t => `- ${t.title} (${t.status}, ${t.priority})`).join("\n")}

User message:
"${userMessage}"

Respond clearly and concisely.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}
