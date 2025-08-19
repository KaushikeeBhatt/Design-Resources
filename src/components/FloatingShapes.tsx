import React from 'react';

const FloatingShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orb */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Medium gradient orb */}
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '6s'}}></div>
      
      {/* Small floating shapes */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      
      <div className="absolute top-3/4 left-1/4 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="absolute top-1/3 left-3/4 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      
      {/* Geometric shapes */}
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 border border-white/20 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
      
      <div className="absolute top-1/2 right-1/2 w-12 h-12 border border-purple-400/30 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
    </div>
  );
};

export default FloatingShapes;
