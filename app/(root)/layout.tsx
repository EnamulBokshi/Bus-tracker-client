

import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import AiModal from '@/components/AiModal';


const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full h-screen'>
        <SidebarTrigger />
        <AiModal />
        

        <section className='px-5'>
          {children}

        </section>

      </main>
    </SidebarProvider>
  )
}

export default RootLayout