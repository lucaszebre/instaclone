import prisma from '@/lib/db';
import { User } from '@prisma/client';

export async function searchUsers(searchTerm: string): Promise<User[]> {
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: searchTerm, // Search by username
                            mode: 'insensitive', // Case-insensitive search
                        },
                    },
                    {
                        fullName: {
                            contains: searchTerm, // Search by full name
                            mode: 'insensitive', // Case-insensitive search
                        },
                    },
                ],
            },
        });

        if(!users){
            return []
        }
        return users;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        return []
    }
}
