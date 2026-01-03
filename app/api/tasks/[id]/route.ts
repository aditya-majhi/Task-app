import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const body = await req.json();

    const { id } = await params;
    const { data, error } = await supabase
        .from("tasks")
        .update(body)
        .eq("id", id)
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data);
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ success: true });
}
