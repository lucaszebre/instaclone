import Edit from '@/components/edit';
import React from 'react';
import { useQuery } from 'react-query';
import notFound from '../not-found';
import getUserProfile from '@/lib/getUserProfile';

const Page = () => {
  const { data: profile, isLoading, isError } = useQuery('userProfile', getUserProfile);

  if (!profile) return notFound()

  return (
    <div className="flex flex-row justify-center w-full h-full">
      <Edit
        username={profile.username}
        gender={profile.gender || ''}
        urlavatar={profile.profilePictureUrl || ''}
        fullname={profile.fullName || ''}
        bio={profile.bio || ''}
      />
    </div>
  );
};

export default Page;
