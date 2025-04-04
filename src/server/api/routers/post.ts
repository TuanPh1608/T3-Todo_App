import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          description: input.description,
          status: "todo", // Mặc định status là "todo"
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          status: input.status,
        },
      });
    }),

  // update status
  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  // Get all todos
  getAll: publicProcedure.query(async ({ ctx }) => {
    const list = await ctx.db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return list ?? null;
  }),

  // Delete a todo
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          id: input.id,
        },
      });
    }),

  // Get count by status
  getStatusCounts: publicProcedure.query(async ({ ctx }) => {
    try {
      const counts = await ctx.db.post.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      });

      // Initialize the counts for each status
      const statusCounts: Record<string, number> = {
        completed: 0,
        todo: 0,
        inProgress: 0,
      };

      // Safely iterate over the result and assign the counts
      counts.forEach((item: { status: string; _count: { status: number } }) => {
        if (item.status === "completed") {
          statusCounts.completed = item._count.status;
        } else if (item.status === "todo") {
          statusCounts.todo = item._count.status;
        } else if (item.status === "inProgress") {
          statusCounts.inProgress = item._count.status;
        }
      });

      return statusCounts;
    } catch (error) {
      console.error("Error fetching status counts:", error);
      return {
        completed: 0,
        todo: 0,
        inProgress: 0,
      };
    }
  }),
});
