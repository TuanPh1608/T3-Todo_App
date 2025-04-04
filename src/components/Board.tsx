// components/Board.tsx

import React from "react";
import TodoItem from "./TodoItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columnStyles } from "@/lib/utils";

interface IfetchedData {
  status: string;
  description: string;
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface BoardProps {
  data: {
    columns: Record<string, { id: number; title: string; taskIds: number[] }>;
    tasks: Record<number, IfetchedData>;
    columnOrder: string[];
  };
}

const Board = ({ data }: BoardProps) => {
  return (
    <div className="flex space-x-10">
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column?.taskIds
          .map((taskId) => data.tasks[taskId])
          .filter((task) => task !== undefined);

        const { color } = columnStyles[columnId] ?? {
          color: "bg-gray-100",
        };

        return (
          <div key={column?.id} className="w-[500px]">
            <Card className={`bg-white shadow-md p-4 rounded-lg ${color}`}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-center">
                  {column?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks?.map((task) => (
                    <TodoItem key={task?.id} showStatus={false} todo={{ ...task, id: task.id.toString() }} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Board;
