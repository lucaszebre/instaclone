'use client'


import React from 'react';

type ProfileStatsProps = {
  publications: string;
  followers: string;
  following: string;
};

    const ProfileStats: React.FC<ProfileStatsProps> = ({ publications, followers, following }) => {
    return (
        <ul className="flex md:hidden justify-between items-center py-4 px-6 bg-gray-100 rounded-md">
        <li className="flex flex-col items-center">
            <span className="font-bold text-lg">{publications}</span>
            <span className="text-sm text-gray-600">posts</span>
        </li>
        <li className="flex flex-col items-center">
            <a href="/kihura_/followers/" className="text-blue-500 hover:underline">
            <span className="font-bold text-lg">{followers}</span>
            <span className="text-sm text-gray-600">followers</span>
            </a>
        </li>
        <li className="flex flex-col items-center">
            <a href="/kihura_/following/" className="text-blue-500 hover:underline">
            <span className="font-bold text-lg">{following}</span>
            <span className="text-sm text-gray-600">following</span>
            </a>
        </li>
        </ul>
    );
    };

export default ProfileStats;