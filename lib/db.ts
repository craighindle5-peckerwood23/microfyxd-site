// lib/db.ts
// Lazy Supabase client — only instantiated at runtime, never at build time
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _db: SupabaseClient | null = null;

function getDb(): SupabaseClient {
  if (!_db) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase env vars not set (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
    }
    _db = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _db;
}

// Named export so routes can do: import { db } from "@/lib/db"
// But db is now a Proxy that defers creation until first use
export const db = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});

// Helper: create a task
export async function createTask(text: string, userId?: string) {
  const client = getDb();
  const { data, error } = await client
    .from("tasks")
    .insert({ text, status: "pending", user_id: userId ?? null })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Helper: get a task by id
export async function getTask(id: string) {
  const client = getDb();
  const { data, error } = await client
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Helper: update a task
export async function updateTask(id: string, updates: Record<string, unknown>) {
  const client = getDb();
  const { data, error } = await client
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}
