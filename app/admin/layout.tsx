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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStatistics } from "@/hooks/use-statistics";
import { Button } from "@/components/ui/button";
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
    <header className="relative z-10 flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        {user?.role === "SuperAdmin" ? (
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
              {events?.map((event) => (
                <DropdownMenuItem
                  key={event.id}
                  onSelect={() => setSelectedEventId(event.id)}
                >
                  {event.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <h1 className="text-lg font-semibold">
            {selectedEvent?.name || "Event"}
          </h1>
        )}
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
            <form action={logout}>
              <button type="submit" className="w-full text-left">
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useStatistics();
  const pathname = usePathname();

  return (
    <SidebarProvider className="flex min-h-screen bg-gray-50">
      <Sidebar>
        <SidebarHeader>
          <Image src="/logo.svg" alt="Migunesia Logo" width={150} height={40} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton isActive={pathname === item.href}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            {user?.role === "SuperAdmin" && (
              <>
                <SidebarMenuItem>
                  <Link href="/admin/event-management">
                    <SidebarMenuButton
                      isActive={pathname === "/admin/event-management"}
                    >
                      <Shield className="h-5 w-5" />
                      Event Management
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/admin/user-management">
                    <SidebarMenuButton
                      isActive={pathname === "/admin/user-management"}
                    >
                      <Users className="h-5 w-5" />
                      User Management
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </>
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