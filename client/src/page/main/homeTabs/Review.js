import React from "react";
import { DeckCard, FlipCard } from "../../../component/cards";

const Review = () => {
  return (
    <div className="mx-40">
      <div class="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 110:grid-cols-5 gap-10">
        <DeckCard />
        <DeckCard />
        <FlipCard />
      </div>
    </div>
  );
};

export default Review;
