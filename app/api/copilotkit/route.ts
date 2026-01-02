import {
    CopilotRuntime,
    GoogleGenerativeAIAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";

const runtime = new CopilotRuntime();
const serviceAdapter = new GoogleGenerativeAIAdapter({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
});

export const POST = async (req: NextRequest) => {
    const { handleRequest } =
        copilotRuntimeNextJSAppRouterEndpoint({
            runtime,
            serviceAdapter,
            endpoint: "/api/copilotkit",
        });

    return handleRequest(req);
};
