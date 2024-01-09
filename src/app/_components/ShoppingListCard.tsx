"use client";

import type { ShoppingList, ShoppingListItem } from "@prisma/client";
import ShoppingListHandler from "~/app/_components/ShoppingListFormHandler";
import IngredientTable from "~/app/_components/IngredientTable";
import { Card, CardHeader } from "@nextui-org/card";
import { Button, CardBody, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import type { Ingredient } from "~/utils/IngredientCalculator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { motion } from "framer-motion";
import { Modes } from "~/app/lib/shoppingListModes";
import ShoppingItemFormModal from "~/app/_components/ShoppingItemFormModal";

export interface ShoppingListTableProps {
  shoppingList: ShoppingList & {
    items: ShoppingListItem[];
  };
}

export default function ShoppingListCard({
  shoppingList,
}: ShoppingListTableProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  const router = useRouter();
  console.log(selectedIngredients);

  function onRemoveItems() {
    deleteMutation.mutate({
      shoppingListId: shoppingList.id,
      items: selectedIngredients.flatMap((ingredient) => ingredient.id),
    });
  }

  const deleteMutation = api.shoppingList.deleteItems.useMutation({
    onSuccess: () => {
      toast.success("Shopping list items deleted");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error deleting shopping list items");
    },
  });

  return (
    <motion.div layout transition={{ type: "spring", duration: 0.2 }}>
      <Card className="w-full sm:w-[17rem]">
        <CardHeader className="flex flex-col items-start justify-center space-y-2">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xl font-semibold">{shoppingList.name}</h2>
            <div className="space-x-2">
              <ShoppingListHandler
                mode={Modes.EDIT}
                buttonSize="sm"
                shoppingList={shoppingList}
              />
              <ShoppingListHandler
                mode={Modes.DELETE}
                buttonSize="sm"
                shoppingList={shoppingList}
              />
            </div>
          </div>
          <p className="text-left text-sm">{shoppingList.description}</p>
        </CardHeader>

        <CardBody className="grid grid-cols-2 gap-4">
          <Button
            size="sm"
            color="success"
            className={shoppingList.items.length > 0 ? "" : "col-span-2"}
            onPress={onOpen}
          >
            Add Items
          </Button>
          <ShoppingItemFormModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            submit={() => {}}
            title="Add Items"
          />
          {shoppingList.items.length > 0 ? (
            <>
              <Button size="sm" color="danger" onPress={onRemoveItems}>
                Remove Items
              </Button>

              <IngredientTable
                className="col-span-2"
                removeWrapper
                ingredients={shoppingList.items}
                isSelectable={true}
                onSelect={setSelectedIngredients}
              />
            </>
          ) : (
            <p className="col-span-2 text-center text-sm text-foreground-600">
              No items in this shopping list
            </p>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
