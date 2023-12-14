import { api } from "~/trpc/server";
import React from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "~/app/recipe/[id]/_review/ReviewForm";

export default async function ReviewSection({
  recipeId,
}: {
  recipeId: string;
}) {
  const reviews = await api.review.get.query({ recipeId });

  return (
    <section className="flex flex-col items-center">
      <ReviewForm recipeId={recipeId} />
      {reviews && reviews.length > 0 && (
        <div className="mt-4 flex justify-center gap-2">
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      )}
    </section>
  );
}
