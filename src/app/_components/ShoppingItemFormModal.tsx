"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ShoppingListFormType } from "~/app/_components/ShoppingListFormHandler";
import type { Unit } from "@prisma/client";
import React from "react";

interface ShoppingListFormModalProps {
  onOpenChange: () => void;
  isOpen: boolean;
  title: string;
  formValue?: {
    id: string;
    name: string;
    description?: string | null;
  };
  submit: (shoppingListForm: ShoppingListFormType) => void;
}

export default function ShoppingItemFormModal({
  onOpenChange,
  isOpen,
  title,
  formValue,
  submit,
}: ShoppingListFormModalProps) {
  const schema = z.object({
    name: z.string().min(1),
    quantity: z.number().min(1),
    unit: z.enum(
      [
        "GRAM",
        "KILOGRAM",
        "LITER",
        "MILLILITER",
        "TEASPOON",
        "TABLESPOON",
        "CUP",
        "PINCH",
        "PIECE",
      ],
      {
        required_error: "Unit is required",
        invalid_type_error: "Invalid unit",
      },
    ),
  });

  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      quantity: 1,
      unit: "PIECE",
      ...formValue,
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3>{title}</h3>
              </ModalHeader>
              <ModalBody>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      label="Name"
                      variant="bordered"
                      isRequired
                      isInvalid={!!fieldState.error}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="quantity"
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      value={(field.value as number)?.toString() ?? ""}
                      label="Quantity"
                      variant="bordered"
                      isRequired
                      type="number"
                      onChange={(event) => {
                        field.onChange(+event.target.value);
                      }}
                      isInvalid={!!fieldState.error}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="unit"
                  render={({ field, fieldState }) => (
                    <Select
                      {...field}
                      label="Unit"
                      selectedKeys={[field.value]}
                      isInvalid={!!fieldState.error}
                      errorMessage={fieldState.error?.message}
                      isRequired
                      disallowEmptySelection={true}
                    >
                      {[
                        "GRAM",
                        "KILOGRAM",
                        "LITER",
                        "MILLILITER",
                        "TEASPOON",
                        "TABLESPOON",
                        "CUP",
                        "PINCH",
                        "PIECE",
                      ].map((ingredientUnit) => (
                        <SelectItem
                          key={ingredientUnit}
                          value={ingredientUnit as Unit}
                        >
                          {ingredientUnit[0] +
                            ingredientUnit.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onClick={handleSubmit(submit)}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
