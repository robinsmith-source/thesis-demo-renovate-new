"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { convertUnitName } from "~/app/utils";
import { ShoppingList, ShoppingListItem } from "@prisma/client";

interface ShoppingListTableProps {
  shoppingList: ShoppingList & {
    items: ShoppingListItem[];
  };
}

export default function ShoppingListTable({
  shoppingList,
}: ShoppingListTableProps) {
  return (
    <div>
      <h2>{shoppingList.name}</h2>
      <Table
        aria-label="Ingredient Table"
        className="max-w-xs py-4"
        isCompact
        isStriped
      >
        <TableHeader>
          <TableColumn maxWidth={40} className="text-right">
            Amount
          </TableColumn>
          <TableColumn minWidth={40}>Ingredient</TableColumn>
        </TableHeader>

        <TableBody>
          {shoppingList.items.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell className="text-right">
                {`${ingredient.quantity} ${convertUnitName(ingredient.unit)}`}
              </TableCell>
              <TableCell>{ingredient.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
