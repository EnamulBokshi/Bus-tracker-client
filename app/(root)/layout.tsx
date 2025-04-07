

import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

const RootLayout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <SidebarProvider>
    <AppSidebar />

    <main className='w-full h-screen'>
      <SidebarTrigger />
      {children}

    </main>
  </SidebarProvider>
  )
}

export default RootLayout