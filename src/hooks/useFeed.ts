import getFeed from '@/actions/getFeed';
import { useInfiniteQuery } from 'react-query';

const useFeedQuery = () => {
    return useInfiniteQuery(
        'feed',
        async ({ pageParam = 1 }) => {
            const posts = await getFeed(pageParam);
            return posts;
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                // If the last fetched page has less posts than the maximum, 
                // it indicates that there are no more posts to fetch.
                const maxPostsPerPage = 5; // Adjust based on your server logic
                if (lastPage.length < maxPostsPerPage) {
                    return undefined;
                }
                // Otherwise, return the next page index.
                return allPages.length + 1;
            },
        }
    );
};

export default useFeedQuery;
