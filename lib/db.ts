// lib/db.ts
// Central database client — uses Supabase (replaces Prisma/SQLite)
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Service-role client for server-side API routes (bypasses RLS)
export const db = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper: create a task
export async function createTask(text: string, userId?: string) {
  const { data, error } = await db
    .from("tasks")
    .insert({ text, status: "pending", user_id: userId ?? null })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Helper: get a task by id
export async function getTask(id: string) {
  const { data, error } = await db
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Helper: update a task
export async function updateTask(id: string, updates: Record<string, unknown>) {
  const { data, error } = await db
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}
