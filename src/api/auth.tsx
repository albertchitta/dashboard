import { supabase } from "@/lib/supabase";

export const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/",
    },
  });
};

export const signOutUser = async () => {
  await supabase.auth.signOut();
};
