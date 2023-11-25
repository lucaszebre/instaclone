import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import React, { ReactNode } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.type';
import { useRouter } from 'next/navigation';
interface Props {
    children: ReactNode;
    
    }
const ProfileOption: React.FC<Props> = ({    children
}) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    return (
        <div>
            <Dialog>
                <DialogTrigger> 
                    {children}
    
                </DialogTrigger>
                <DialogContent>
                    <Button variant="ghost">
                        Code qr
                    </Button>
                    <Button variant="ghost">
                        Parametre et confidantialité
                    </Button>
                    <Button onClick={async ()=>{
                            await supabase.auth.signOut()
                            router.refresh()

                    } } variant="ghost">
                        Déconnexion
                    </Button>
                    <Button 
                    variant="ghost">
                        Cancel
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProfileOption
