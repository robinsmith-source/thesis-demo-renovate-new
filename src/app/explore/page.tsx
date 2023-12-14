import { api } from "~/trpc/server";
import RecipeCard from "~/app/_components/RecipeCard";

export default async function Page() {
  //query gets adjusted with the information provided from the client component --> as search query
  const latestRecipes = await api.recipe.getRecipesAdvanced.query({
    take: 20,
  });

  return (
    <main className="flex flex-col items-center">
      {/* Here should be the search component as a client component */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {latestRecipes ? (
          latestRecipes.map((recipe) => (
            <RecipeCard recipeId={recipe.id} key={recipe.id} />
          ))
        ) : (
          <h2>No recipes found...</h2>
        )}
      </div>
    </main>
  );
}
