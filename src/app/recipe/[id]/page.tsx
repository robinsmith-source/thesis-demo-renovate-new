import { api } from "~/trpc/server";
import RecipeStep from "~/app/_components/RecipeStep";
import { Card, CardHeader } from "@nextui-org/card";
import React from "react";
import { Image, Link } from "@nextui-org/react";
import NextImage from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await api.recipe.get.query({ id: params.id });
  if (!recipe) {
    return <div>404</div>;
  }

  return (
    <main>
      <Card className="h-96">
        <CardHeader className="absolute bottom-1 z-10 flex-col !items-start">
          <h1 className="text-2xl font-medium text-white">{recipe.name}</h1>
          <p className="text-white">
            created by{" "}
            <Link href={`/user/${recipe.author.id}`}>{recipe.author.name}</Link>
          </p>
        </CardHeader>
        <Image
          as={NextImage}
          width={500}
          height={300}
          removeWrapper
          alt="recipe header"
          className="z-0 h-full w-full object-cover"
          src="https://placekitten.com/500/300"
        />
      </Card>

      <div className="p-4">
        <p className="py-4 text-center text-xl font-medium">
          {recipe.description}
        </p>
        <table>
          <thead>
            <tr>
              <th className="pr-4 text-right">Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {recipe.steps.map((step) => (
              <RecipeStep step={step} key={step.id} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
