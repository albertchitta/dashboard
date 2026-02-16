import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { LoginPage } from "./views/Login";
import type { User } from "@supabase/supabase-js";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log("Current user:", user);
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes (including sign out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return <>{user ? <PublicRoutes /> : <LoginPage />}</>;
}

export default App;
