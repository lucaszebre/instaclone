import prisma from '@/lib/db';
import { User } from '@prisma/client'; // Import the User model from your Prisma schema

export async function searchUsers(searchTerm: string): Promise<User[] | undefined> {
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: searchTerm, // You can adjust the search criteria as needed
                            mode: 'insensitive', // Case-insensitive search
                        },
                    },
                    {
                        fullName: {
                            contains: searchTerm, // You can adjust the search criteria as needed
                            mode: 'insensitive', // Case-insensitive search
                        },
                    },
                ],
            },
        });

        // Sort the users based on a relevant criteria, e.g., by username
        users.sort((a, b) => a.username.localeCompare(b.username));

        return users;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }    }
}

