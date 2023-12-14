"use client";
import React from "react";
import {Button, Input, Tab, Tabs} from "@nextui-org/react";
import { usePathname } from "next/navigation";
export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const handleSearch() = async () => {
      const response = await api.recipe.getRecipesAdvanced.query(
            {
                take: 20,
                tags: [],
            })

  return (
    <main>
      <div className="flex flex-row">
          <Tabs aria-label="Options" selectedKey={pathname}>
              <Tab key="public" title="Public" href="public"></Tab>
              <Tab key="private" title="Private" href="private"></Tab>
          </Tabs>
          <Input
              type="text"
              size="small"
              width="50px"
              placeholder="Search recipes..."
              endContent=
                  {
              <MailIcon onClick={}/>
          }
          />
      </div>

      {children}
    </main>
  );
}
