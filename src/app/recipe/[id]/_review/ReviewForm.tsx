"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Textarea,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import RatingInput from "./RatingInput";
import { CardHeader } from "@nextui-org/card";
import { RecipeReview } from "@prisma/client";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";

export default function ReviewForm({
  className,
  recipeId,
  formValue,
}: {
  formValue?: Partial<RecipeReview>;
  recipeId: string;
  className?: string;
}) {
  const schema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string(),
  });

  const { control, handleSubmit, reset } = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 1,
      comment: "",
      ...formValue,
    },
  });

  const [isEditing, setIsEditing] = useState();

  const onSubmit = (data: { rating: number; comment: string | null }) => {
    createMutation.mutate({
      rating: data.rating,
      comment: data.comment ?? "",
      recipeId: recipeId,
    });
  };

  const createMutation = api.review.create.useMutation({
    onSuccess: () => {
      toast.success("Review submitted successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onEdit = (data: { rating: number; comment: string | null }) => {
    editMutation.mutate({
      rating: data.rating,
      comment: data.comment ?? "",
      recipeId: recipeId,
    });
  };

  const editMutation = api.review.update.useMutation({
    onSuccess: () => {
      toast.success("Review submitted successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card className={`${className} w-[36rem]`}>
      <CardHeader className="-mb-4 flex justify-between">
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <RatingInput
              value={field.value}
              onChange={(newValue: number) => field.onChange(newValue)}
            />
          )}
        />
      </CardHeader>
      <CardBody>
        <Controller
          control={control}
          name="comment"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              minRows={3}
              label="Comment"
              placeholder="I really liked this recipe!"
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              value={field.value ?? ""}
            />
          )}
        />
      </CardBody>
      <CardFooter className="-mt-4 flex justify-end">
        {isEditing ? (
          <Button
            isIconOnly
            color="secondary"
            variant="flat"
            onClick={handleSubmit(onEdit)}
          >
            <FaPenToSquare />
          </Button>
        ) : (
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
