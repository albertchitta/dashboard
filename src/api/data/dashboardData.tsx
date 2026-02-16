import { supabase } from "@/lib/supabase";

export interface Dashboard {
  id: string;
  userId: string;
  name: string;
  url: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDashboardInput {
  name: string;
  url?: string;
  icon?: string;
}

export interface UpdateDashboardInput {
  name?: string;
  url?: string;
  icon?: string;
}

/**
 * Fetch all dashboards, ordered by creation date (newest first)
 */
export async function getAllDashboards() {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to fetch dashboards");
  }

  const { data, error } = await supabase
    .from("dashboards")
    .select("*")
    .eq("userId", user.id)
    .order("createdAt", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch dashboards: ${error.message}`);
  }

  return data as Dashboard[];
}

/**
 * Fetch a single dashboard by ID
 */
export async function getDashboardById(id: string) {
  const { data, error } = await supabase
    .from("dashboards")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch dashboard: ${error.message}`);
  }

  return data as Dashboard;
}

/**
 * Create a new dashboard
 */
export async function createDashboard(input: CreateDashboardInput) {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to create a dashboard");
  }

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("dashboards")
    .insert({
      userId: user.id,
      name: input.name,
      url: input.url || "#",
      icon: input.icon || "IconFolder",
      createdAt: now,
      updatedAt: now,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create dashboard: ${error.message}`);
  }

  return data as Dashboard;
}

/**
 * Update an existing dashboard
 */
export async function updateDashboard(id: string, input: UpdateDashboardInput) {
  const { data, error } = await supabase
    .from("dashboards")
    .update({
      ...input,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update dashboard: ${error.message}`);
  }

  return data as Dashboard;
}

/**
 * Delete a dashboard by ID
 */
export async function deleteDashboard(id: string) {
  const { error } = await supabase.from("dashboards").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete dashboard: ${error.message}`);
  }

  return { success: true };
}

/**
 * Search dashboards by name
 */
export async function searchDashboards(query: string) {
  const { data, error } = await supabase
    .from("dashboards")
    .select("*")
    .ilike("name", `%${query}%`)
    .order("createdAt", { ascending: false });

  if (error) {
    throw new Error(`Failed to search dashboards: ${error.message}`);
  }

  return data as Dashboard[];
}

/**
 * Get dashboards count
 */
export async function getDashboardsCount() {
  const { count, error } = await supabase
    .from("dashboards")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error(`Failed to get dashboards count: ${error.message}`);
  }

  return count || 0;
}
