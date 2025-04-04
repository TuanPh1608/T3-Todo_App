"use client";

import React from "react";

import ToDoFormInput from "@/components/ToDoFormInput";
import { Separator } from "@/components/ui/separator";
import ListBoard from "@/components/ListBoard";
import Header from "@/components/HeaderBar";

const breadcrumbs = [{ label: "Todo", href: "#" }, { label: "List" }];

const HomePage = () => {
  return (
    <>
      <Header breadcrumbs={breadcrumbs} />
      <div className="p-4">
        <Separator orientation="horizontal" className="mb-4 mr-2" />
        <div className="grid gap-4">
          <div className="space-y-4">
            <ToDoFormInput />
          </div>
        </div>
        <ListBoard />
      </div>
    </>
  );
};

export default HomePage;
