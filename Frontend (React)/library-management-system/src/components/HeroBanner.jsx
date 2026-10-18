import React from "react";

const HeroBanner = () => {
  return (
    <div
      className="hero min-h-[300px] md:min-h-[400px] lg:min-h-[700px]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1536965764833-5971e0abed7c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-5 text-2xl md:text-5xl font-bold">Explore Books, Expand Your Mind</h1>
          <p className="mb-5">
            Discover, explore, and manage books effortlessly with our smart Library Management System. Get your favorite books, track borrowing and returns, and enjoy a seamless library experience—all in one place.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
