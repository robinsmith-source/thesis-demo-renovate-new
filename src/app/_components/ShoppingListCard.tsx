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
import { FaTrash } from "react-icons/fa6";
import ConfirmationModal from "~/app/_components/ConfirmationModal";
import { Modes } from "~/app/lib/shoppingListModes";

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
  function onDeleteItems() {
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

        <CardBody>
          {shoppingList.items.length > 0 ? (
            <>
              <div>
                <Button isIconOnly size="sm" color="danger" onPress={onOpen}>
                  <FaTrash />
                </Button>
                <ConfirmationModal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  title="Delete shopping list items"
                  body={`Are you sure you want to delete the selected shopping list items? 
This action cannot be undone.`}
                  onConfirm={() => {
                    onDeleteItems();
                    onClose();
                  }}
                />
              </div>
              <IngredientTable
                className="mt-4"
                removeWrapper
                ingredients={shoppingList.items}
                isSelectable={true}
                onSelect={setSelectedIngredients}
              />
            </>
          ) : (
            <p className="text-center text-sm text-foreground-600">
              No items in this shopping list
            </p>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
