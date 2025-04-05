import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { BusFrontIcon, Calendar, Home, Route } from 'lucide-react'
import Link from 'next/link'
export const sidebarItems = [
{
  title: "Home",
  url: "/",
  icon: Home
},
{
  title: "Routes",
  url: "/routes",
  icon: Route
},
{
  title: "Schedule",
  url: "/schedule",
  icon: Calendar
},
{
  title: "Buses",
  url: "/buses",
  icon: BusFrontIcon
}
]
const DashboardSidebar = () => {
  return (
    <Sidebar> 
        <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                {
                  sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-2 p-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <item.icon className="w-5 h-5" />
                        <span className="flex-1 ml-3 whitespace-nowrap">{item.title}</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300" />
                      </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                }
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        </Sidebar>
  )
}

export default DashboardSidebar