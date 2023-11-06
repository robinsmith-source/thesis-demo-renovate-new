import { api } from "~/trpc/server";
import RecipeCard from "~/app/_components/RecipeCard";

export default async function Home() {
  const latestRecipes = await api.recipe.getLatest.query({ take: 6 });

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {latestRecipes ? (
          latestRecipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))
        ) : (
          <h2>No recipes found...</h2>
        )}
      </div>
    </main>
  );
}
