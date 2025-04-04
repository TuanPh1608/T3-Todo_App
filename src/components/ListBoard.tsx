// components/ListBoard.tsx

import React, { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import Board from "@/components/Board";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";


interface IfetchedData {
  status: string;
  description: string;
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const ListBoard = () => {
  const { data: fetchedData, isLoading } = api.post.getAll.useQuery();
  const utils = api.useUtils();

  const [data, setData] = useState<{
    columns: Record<string, { id: number; title: string; taskIds: number[] }>;
    tasks: Record<number, IfetchedData>;
    columnOrder: string[];
  } | null>(null);

  useEffect(() => {
    if (fetchedData) {
      const tasks = fetchedData.reduce<Record<number, IfetchedData>>(
        (acc: Record<number, IfetchedData>, task: IfetchedData) => {
          acc[task.id] = { ...task };
          return acc;
        },
        {} as Record<number, IfetchedData>
      );

      const columns = {
        todo: {
          id: 1,
          title: "To Do",
          taskIds: fetchedData
            .filter((task: IfetchedData) => task.status === "todo")
            .map((task: IfetchedData) => task.id),
        },
        inProgress: {
          id: 2,
          title: "In Progress",
          taskIds: fetchedData
            .filter((task: IfetchedData) => task.status === "inProgress")
            .map((task: IfetchedData) => task.id),
        },
        completed: {
          id: 3,
          title: "Completed",
          taskIds: fetchedData
            .filter((task: IfetchedData) => task.status === "completed")
            .map((task: IfetchedData) => task.id),
        },
      };

      setData({
        tasks,
        columns,
        columnOrder: ["todo", "inProgress", "completed"],
      });
    }
  }, [fetchedData]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Todo List</h1>

      {isLoading || !data ? (
        <div className="flex space-x-6">
          {["To Do", "In Progress", "Completed"].map((title, index) => (
            <Card key={index} className="w-[350px] bg-gray-200 shadow-md p-4 rounded-lg">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-10 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Board data={data} />
      )}
    </div>
  );
};

export default ListBoard;
