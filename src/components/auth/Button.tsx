import { ChromeIcon } from "lucide-react"
import { signIn, signOut } from "../../auth"
import { Button } from "../ui/button"
import React from "react"

export function SignIn({
    provider,
    ...props
  }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
      if(provider=='google'){
          return (
              <form
                action={async () => {
                  "use server"
                  await signIn(provider)
                }}
              >
                {/* <Button {...props}>Sign In</Button> */}
                <Button  variant="outline" className="w-full">
                      
                      <ChromeIcon className="w-4 h-4 mr-2" />
                      Sign in with Google
                    </Button>
              </form>
            )
      }
       else if(provider=='github'){
          return (
              <form
                action={async () => {
                  "use server"
                  await signIn(provider)
                }}
              >
                {/* <Button {...props}>Sign In</Button> */}
                <Button  variant="outline" className="w-full">
                      
                   
                      Sign in with Github
                    </Button>
              </form>
            )
      }else if(provider=='linkedin'){
          return (
              <form
                action={async () => {
                  "use server"
                  await signIn(provider)
                }}
              >
                {/* <Button {...props}>Sign In</Button> */}
                <Button  variant="outline" className="w-full">
                      
                   
                      Sign in with Linkedin
                    </Button>
              </form>
            )
      }
   
  }

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}