import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  User,
} from "@nextui-org/react";
import ReviewRating from "~/app/_components/ReviewRating";

type RecipeCardProps = {
  rating: number;
  comment: string | null;
} & {
  author?: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export default function ReviewCard({ review }: { review: RecipeCardProps }) {
  const { rating, comment, author } = review;

  return (
    <Card className="w-[36rem]">
      <CardHeader>
        <ReviewRating rating={rating} />
      </CardHeader>
      {comment && <CardBody>{comment}</CardBody>}
      {author && (
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
              src: author.image ?? undefined,
              showFallback: true,
              size: "sm",
            }}
          />
        </CardFooter>
      )}
    </Card>
  );
}
