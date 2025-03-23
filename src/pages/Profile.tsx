
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ClubHeadTools from '@/components/ClubHeadTools';

const Profile: React.FC = () => {
  const { user, isClubHead, getProfile } = useAuth();

  // Fetch the latest profile data when the component mounts
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      
      {user && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-1">Email: {user.email}</p>
          <p className="text-gray-600 mb-1">Role: {user.role}</p>
          <p className="text-gray-600 mb-1">Club: {user.club}</p>
          <p className="text-gray-600 mb-1">Chapter: {user.chapter}</p>
          <p className="text-gray-600 mb-1">Total Credits: {user.totalCredits}</p>
          <p className="text-gray-600 mb-4">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
          
          {user.phoneNumber && (
            <p className="text-gray-600 mb-1">Phone: {user.phoneNumber}</p>
          )}
          {user.city && (
            <p className="text-gray-600 mb-1">City: {user.city}</p>
          )}
          {user.state && (
            <p className="text-gray-600 mb-1">State: {user.state}</p>
          )}
          {user.college && (
            <p className="text-gray-600 mb-1">College: {user.college}</p>
          )}
        </div>
      )}
      
      {/* Only show club head tools to users with role 'club_head' */}
      {isClubHead() && (
        <div className="mt-8">
          <ClubHeadTools />
        </div>
      )}
    </div>
  );
};

export default Profile;
