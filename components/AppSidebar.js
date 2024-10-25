"use client";

import { useEffect } from 'react';
import { Home, Inbox, Calendar, Search, Settings, ChevronDown, Boxes, User, Package, Bell, CreditCard, LogOut, FileText, Users } from "lucide-react"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Invoices", href: "/dashboard/invoices" },
  { icon: Package, label: "Products", href: "/dashboard/products" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
//   { icon: Inbox, label: "Inbox", href: "/dashboard/inbox" },
//   { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
//   { icon: Search, label: "Search", href: "/dashboard/search" },
//   { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function AppSidebar() {
  const { isCollapsed } = useSidebar()

  return (
    <Sidebar className={cn("transition-all duration-300", isCollapsed ? "w-16" : "w-64")}>
      <SidebarHeader className="p-2">
        {!isCollapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center w-full text-left p-2">
                <div className="mr-2 h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                  <Boxes className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="font-semibold truncate">Acme Inc</div>
                  <div className="text-xs text-muted-foreground truncate">Enterprise</div>
                </div>
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2">
              <DropdownMenuItem>Acme Inc</DropdownMenuItem>
              <DropdownMenuItem>Acme Corp</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
              <Boxes className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Application</SidebarGroupLabel>}
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton className={cn(isCollapsed && "justify-center")}>
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && <span className="ml-2">{item.label}</span>}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        {!isCollapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center w-full text-left p-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/path-to-avatar.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="font-semibold truncate">shadcn</div>
                  <div className="text-xs text-muted-foreground truncate">m@example.com</div>
                </div>
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" alignOffset={-8} sideOffset={8}>
              <DropdownMenuItem>
                <Package className="mr-2 h-4 w-4" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Avatar className="h-8 w-8 mx-auto">
            <AvatarImage src="/path-to-avatar.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
