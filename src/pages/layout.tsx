import { ThemeProvider } from "@/components/theme-provider"




export default function RootLayout({ children }: {
    children: React.ReactNode
  }) {

   

  return (
   
     
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
    
  )
}
