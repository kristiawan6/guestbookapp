"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useStatistics } from "@/hooks/use-statistics";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    href: "/admin/dashboard",
    icon: Home,
    label: "Dashboard",
  },
  {
    href: "/admin/broadcast",
    icon: FileText,
    label: "Broadcast Template",
  },
  {
    href: "/admin/guest-categories",
    icon: Users,
    label: "Guest Category",
  },
  {
    href: "/admin/guests",
    icon: Users,
    label: "Guests",
  },
  {
    href: "/admin/guest-statistic",
    icon: BarChart,
    label: "Guest Statistic",
  },
  {
    href: "/admin/claim-souvenir",
    icon: Gift,
    label: "Claim Souvenir & etc",
  },
  {
    href: "/admin/guestbook",
    icon: Book,
    label: "Guestbook",
  },
  {
    href: "/admin/web-invitation",
    icon: Globe,
    label: "Web Invitation",
  },
];

function Header() {
  const { user, events, selectedEventId, setSelectedEventId } =
    useStatistics();
  const { toggleSidebar } = useSidebar();

  const selectedEvent = events?.find((event: any) => event.id === selectedEventId);

  return (
    <header className="relative z-10 flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <h1 className="text-lg font-semibold">
                {selectedEvent?.name || "Select an Event"}
              </h1>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {events?.map((event: any) => (
              <DropdownMenuItem
                key={event.id}
                onSelect={() => setSelectedEventId(event.id)}
              >
                {event.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{user?.events[0]?.event.name}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useStatistics();
  return (
    <SidebarProvider className="flex min-h-screen bg-gray-50">
      <Sidebar>
        <SidebarHeader>
          <h1 className="text-2xl font-bold">MIGUNESIA</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton>
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            {user?.role === "SuperAdmin" && (
              <SidebarMenuItem>
                <Link href="/admin/event-management">
                  <SidebarMenuButton>
                    <Shield className="h-5 w-5" />
                    Event Management
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col h-screen w-full overflow-x-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <footer className="p-4 text-center text-sm text-gray-500 bg-white">
          © 2025, Migunesia. All rights reserved.{" "}
          <Link href="#" className="text-blue-500">
            Read Documentation
          </Link>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}