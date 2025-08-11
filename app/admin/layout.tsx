"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  FileText,
  Gift,
  Book,
  Globe,
  BarChart,
  ChevronDown,
  LogOut,
  Menu,
  Shield,
  Bell,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStatistics } from "@/hooks/use-statistics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logout } from "@/app/auth/logout/actions";
import Image from "next/image";
import { EventProvider, useEventContext } from "@/hooks/use-event-context";
 
 const menuItems = [
   {
    href: "/admin/dashboard",
    icon: Home,
    label: "Dashboard",
    color: "text-blue-500",
  },
  {
    href: "/admin/broadcast",
    icon: FileText,
    label: "Broadcast Template",
    color: "text-purple-500",
  },
  {
    href: "/admin/guest-categories",
    icon: Users,
    label: "Guest Category",
    color: "text-red-500",
  },
  {
    href: "/admin/guests",
    icon: Users,
    label: "Guests",
    color: "text-gray-500",
  },
  {
    href: "/admin/guest-statistic",
    icon: BarChart,
    label: "Guest Statistic",
    color: "text-purple-500",
  },
  {
    href: "/admin/claim-souvenir",
    icon: Gift,
    label: "Claim Souvenir & etc",
    color: "text-blue-500",
  },
  {
    href: "/admin/guestbook",
    icon: Book,
    label: "Guestbook",
    color: "text-blue-500",
  },
  {
    href: "/admin/web-invitation",
    icon: Globe,
    label: "Web Invitation",
    color: "text-yellow-500",
  },
];

function Header() {
  const { user } = useStatistics();
  const { events, selectedEventId, setSelectedEventId } = useEventContext();
  const { toggleSidebar } = useSidebar();

  const selectedEvent = events?.find((event) => event.id === selectedEventId);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-2 sm:gap-4 px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="hover:bg-gray-100 rounded-lg p-2 transition-colors flex-shrink-0"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          {user?.role === "SuperAdmin" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1 sm:p-2 transition-colors min-w-0">
                  <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                    {selectedEvent?.name || "Select Event"}
                  </h1>
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Select Event</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {events?.map((event) => (
                  <DropdownMenuItem
                    key={event.id}
                    onSelect={() => setSelectedEventId(event.id)}
                    className="cursor-pointer"
                  >
                    {event.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
              {selectedEvent?.name || "Event"}
            </h1>
          )}
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search guests, events, templates..."
              className="w-full pl-10 bg-gray-50/50 border-gray-200 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Mobile Search Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden h-9 w-9 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search className="h-4 w-4 text-gray-600" />
          </Button>
          
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative h-9 w-9 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex h-9 w-9 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-4 w-4 text-gray-600" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-9 rounded-full pl-2 sm:pl-3 pr-1 sm:pr-2 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Avatar className="h-6 w-6 sm:h-7 sm:w-7 ring-2 ring-blue-500/20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-semibold">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.username || "User"}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user?.role?.toLowerCase() || "Admin"}
                    </div>
                  </div>
                  <ChevronDown className="h-3 w-3 text-gray-400 hidden sm:block" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.username || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || user?.events?.[0]?.event?.name || "user@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <form action={logout}>
                <button type="submit" className="w-full text-left">
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useStatistics();
  const pathname = usePathname();

  return (
    <SidebarProvider className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Sidebar className="border-r border-gray-200/60">
        <SidebarHeader className="border-b border-gray-200/60 p-6">
          <div className="flex items-center justify-center">
            <Image src="/guestly_logo.svg" alt="Guestly Logo" width={256} height={128} />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarMenu className="space-y-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton 
                    isActive={pathname === item.href}
                    className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-blue-200"
                  >
                    <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-blue-600' : item.color}`} />
                    <span className="truncate">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            {user?.role === "SuperAdmin" && (
              <>
                <div className="my-4 border-t border-gray-200/60 pt-4">
                  <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Super Admin
                  </p>
                </div>
                <SidebarMenuItem>
                  <Link href="/admin/event-management">
                    <SidebarMenuButton
                      isActive={pathname === "/admin/event-management"}
                      className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-blue-200"
                    >
                      <Shield className={`h-5 w-5 ${pathname === "/admin/event-management" ? 'text-blue-600' : 'text-orange-500'}`} />
                      <span className="truncate">Event Management</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/admin/user-management">
                    <SidebarMenuButton
                      isActive={pathname === "/admin/user-management"}
                      className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-blue-200"
                    >
                      <Users className={`h-5 w-5 ${pathname === "/admin/user-management" ? 'text-blue-600' : 'text-green-500'}`} />
                      <span className="truncate">User Management</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <Header />
        <main className="flex-1">
          <div className="p-3 sm:p-4 md:p-6 mx-auto max-w-7xl">
            {children}
          </div>
        </main>
        <footer className="border-t border-gray-200/60 p-4 text-center text-sm text-gray-500 bg-white/80 backdrop-blur-sm">
          © 2025, Guestly. All rights reserved.{" "}
          <Link href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
            Read Documentation
          </Link>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </EventProvider>
  );
}