"use client";

import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function AdvancedRecipeSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback(
    (name?: string, order?: string, pageSize?: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      name ? params.set("name", name) : params.delete("name");
      order ? params.set("order", order) : params.delete("order");
      pageSize
        ? params.set("pageSize", pageSize.toString())
        : params.delete("pageSize");

      router.replace(`${pathname}?${params.toString()}`);
    },
    333,
  ); // debounce in ms

  return (
    <Card className="h-20 w-full justify-center">
      <div className="m-2 flex flex-row items-center justify-between space-x-2">
        <Button
          size="lg"
          variant="flat"
          color="secondary"
          startContent={<FaFilter />}
          onClick={() => console.log("todo: open filter view")}
        >
          Filters
        </Button>
        <Input
          type="text"
          className="w-1/2"
          defaultValue={searchParams.get("name")?.toString()}
          startContent={<FaMagnifyingGlass className="mr-1" />}
          placeholder="Search recipes"
          onValueChange={(value) =>
            handleSearch(
              value,
              searchParams.get("order") ?? "",
              Number(searchParams.get("pageSize")) ?? 12,
            )
          }
        />
        <span className="whitespace-nowrap font-extralight">Sort By</span>
        <Select
          fullWidth={false}
          size="sm"
          className="w-32"
          selectionMode="single"
          onSelectionChange={(value) =>
            handleSearch(
              searchParams.get("name") ?? "",
              Array.from(value)[0]?.toString() ?? "",
              Number(searchParams.get("pageSize")) ?? 12,
            )
          }
        >
          <SelectItem key="NEWEST" value="NEWEST">
            newest
          </SelectItem>
          <SelectItem key="OLDEST" value="OLDEST">
            oldest
          </SelectItem>
        </Select>
        <span className="whitespace-nowrap font-extralight">Items per page</span>
        <Select
          fullWidth={false}
          size="sm"
          className="w-24"
          selectionMode="single"
          onSelectionChange={(value) =>
            handleSearch(
              searchParams.get("name") ?? "",
              searchParams.get("order") ?? "",
              Number(Array.from(value)[0]),
            )
          }
        >
          <SelectItem key="4" value="4">
            4
          </SelectItem>
          <SelectItem key="6" value="6">
            6
          </SelectItem>
          <SelectItem key="12" value="12">
            12
          </SelectItem>
        </Select>
      </div>
    </Card>
  );
}
