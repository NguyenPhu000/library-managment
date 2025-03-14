import React from "react";
import FeatureSection from "../components/sections/FeatureSection";
import HeroSection from "../components/sections/Herosection";
import BookShowcase from "../components/sections/BookShowcase";
import UpdatedBook from "../components/sections/UpdatedBook";
const LibraryHome = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <BookShowcase />
      <UpdatedBook />
    </div>
  );
};

export default LibraryHome;
