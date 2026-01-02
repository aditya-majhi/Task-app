import { NextRequest } from "next/server";
import { runTaskCopilot } from "@/services/agent";
import { supabase } from "@/db/supabase";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const userMessage =
        body.messages?.at(-1)?.content ?? "";

    const { data: tasks } = await supabase
        .from("tasks")
        .select("*");

    const reply = await runTaskCopilot(
        userMessage,
        tasks ?? []
    );

    // ✅ STREAM AG-UI EVENTS
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        start(controller) {
            // assistant message
            controller.enqueue(
                encoder.encode(
                    JSON.stringify({
                        type: "assistant_message",
                        message: {
                            role: "assistant",
                            content: reply,
                        },
                    }) + "\n"
                )
            );

            // terminal event
            controller.enqueue(
                encoder.encode(
                    JSON.stringify({ type: "run_completed" }) + "\n"
                )
            );

            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "application/x-ndjson",
        },
    });
}
