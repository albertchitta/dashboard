import * as React from "react";
import {
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import {
  getAllDashboards,
  createDashboard,
  deleteDashboard as deleteDashboardAPI,
} from "@/api/data/dashboardData";

// Icon mapping to convert string icon names to icon components
const iconMap: Record<string, any> = {
  IconDatabase,
  IconReport,
  IconFileWord,
  IconFolder,
};

const data = {
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const { user } = useAuth();

  // Fetch dashboards when component mounts or user changes
  useEffect(() => {
    if (!user) return;

    const fetchDashboards = async () => {
      try {
        const data = await getAllDashboards();
        // Convert dashboard data to sidebar format
        const formattedDashboards = data.map((dashboard) => ({
          id: dashboard.id,
          name: dashboard.name,
          url: dashboard.url,
          icon: iconMap[dashboard.icon] || IconFolder,
        }));
        setDashboards(formattedDashboards);
      } catch (error) {
        console.error("Failed to fetch dashboards:", error);
      }
    };

    fetchDashboards();
  }, [user]);

  const addDashboard = async (name: string) => {
    try {
      const newDashboard = await createDashboard({
        name,
        url: "#",
        icon: "IconFolder",
      });
      setDashboards([
        ...dashboards,
        {
          id: newDashboard.id,
          name: newDashboard.name,
          url: newDashboard.url,
          icon: iconMap[newDashboard.icon] || IconFolder,
        },
      ]);
    } catch (error) {
      console.error("Failed to create dashboard:", error);
    }
  };

  const deleteDashboard = async (name: string) => {
    try {
      const dashboardToDelete = dashboards.find((d) => d.name === name);
      if (dashboardToDelete?.id) {
        await deleteDashboardAPI(dashboardToDelete.id);
        setDashboards(dashboards.filter((dashboard) => dashboard.name !== name));
      }
    } catch (error) {
      console.error("Failed to delete dashboard:", error);
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={dashboards}
          onAddItem={addDashboard}
          onDeleteItem={deleteDashboard}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
