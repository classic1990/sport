import React from 'react';

const LoadingSkeleton = ({ type = 'card' }) => {
  const baseClass = "animate-pulse bg-gradient-to-r from-gray-800 to-gray-700 rounded";
  
  if (type === 'team') {
    return (
      <div className="team-card">
        <div className={`${baseClass} w-20 h-20 mx-auto mb-4`}></div>
        <div className={`${baseClass} h-4 w-16 mx-auto mb-2`}></div>
        <div className={`${baseClass} h-3 w-12 mx-auto`}></div>
      </div>
    );
  }
  
  if (type === 'league') {
    return (
      <div className="luxury-card p-8">
        <div className={`${baseClass} w-24 h-24 mx-auto mb-4`}></div>
        <div className={`${baseClass} h-5 w-24 mx-auto mb-2`}></div>
        <div className={`${baseClass} h-3 w-16 mx-auto`}></div>
      </div>
    );
  }
  
  if (type === 'hero') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`${baseClass} w-32 h-32 md:w-48 md:h-48 mx-auto mb-8`}></div>
          <div className={`${baseClass} h-16 w-64 md:w-96 mx-auto mb-4`}></div>
          <div className={`${baseClass} h-8 w-48 md:w-64 mx-auto mb-8`}></div>
          <div className="flex gap-4 justify-center">
            <div className={`${baseClass} h-12 w-32 rounded-full`}></div>
            <div className={`${baseClass} h-12 w-32 rounded-full`}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return <div className={`${baseClass} h-32 w-full`}></div>;
};

export default LoadingSkeleton;
