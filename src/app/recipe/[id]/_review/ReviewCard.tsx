import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  User,
} from "@nextui-org/react";
import { RecipeReview } from "@prisma/client";
import ReviewRating from "~/app/_components/ReviewRating";

type RecipeCardProps = RecipeReview & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};
export default function ReviewCard({ review }: { review: RecipeCardProps }) {
  const { rating, comment, author } = review;

  return (
    <Card className="w-96">
      <CardHeader>
        <ReviewRating rating={rating} />
      </CardHeader>
      {comment && <CardBody>{comment}</CardBody>}
      <CardFooter className="flex justify-end">
        <User
          name={
            <Link
              color="secondary"
              href={`/user/${author.id}`}
              showAnchorIcon
              size="sm"
            >
              {author.name}
            </Link>
          }
          avatarProps={{
            src: author.image || undefined,
            showFallback: true,
            size: "sm",
          }}
        />
      </CardFooter>
    </Card>
  );
}
