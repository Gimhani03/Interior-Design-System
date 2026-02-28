import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Sofa, FolderTree, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { to: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Manage Users", icon: Users },
  { to: "/admin/furniture-management", label: "Manage Furniture", icon: Sofa },
  { to: "/admin/designs", label: "Manage Designs", icon: FolderTree },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-56 bg-white border-r border-border flex flex-col pt-[68px]">
      <div className="px-4 py-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-3">
          Admin Panel
        </p>
      </div>
      <Separator />
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
