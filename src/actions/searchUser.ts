import prisma from '@/lib/db';

export async function searchUsers(searchTerm: string) {
    try {
        const users = await prisma.user.findMany({
            where: {
              
                    username: {
                      startsWith: searchTerm,
                    },
                  
                
            },
            take:5
        }
        );


        return users;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }    }
}

