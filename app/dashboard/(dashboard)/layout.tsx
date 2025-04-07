import DashboardSidebar from '@/components/dashboard-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const SidebarLayout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <SidebarProvider>
        <DashboardSidebar/>
        <main>
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  )
}

export default SidebarLayout