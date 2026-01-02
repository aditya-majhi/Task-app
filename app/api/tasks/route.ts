import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase";

export async function GET() {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("due_date", { ascending: true });

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();

    const { data, error } = await supabase
        .from("tasks")
        .insert(body)
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data);
}
