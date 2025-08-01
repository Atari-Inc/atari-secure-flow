import { useState } from "react";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Settings, 
  Shield, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AppSidebarProps {
  userRole: string;
  onLogout: () => void;
}

export function AppSidebar({ userRole, onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "File Manager", url: "/files", icon: FolderOpen },
  ];

  const adminItems = [
    { title: "User Management", url: "/users", icon: Users },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const roleLabels = {
    admin: "Administrator",
    user: "Internal User", 
    client: "External Client",
    vendor: "Vendor"
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r bg-card/50 transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-foreground truncate">
                  Atari SFTP
                </h2>
                <p className="text-xs text-muted-foreground truncate">
                  {roleLabels[userRole as keyof typeof roleLabels]}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        {(userRole === "admin") && (
          <>
            <Separator />
            <SidebarGroup>
              <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
                Administration
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={getNavCls}
                          title={collapsed ? item.title : undefined}
                        >
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Footer */}
        <div className="mt-auto p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className={`w-full justify-start text-muted-foreground hover:text-foreground ${
              collapsed ? "px-2" : ""
            }`}
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}