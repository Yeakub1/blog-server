import { prisma } from "../utils/prisma";

export const resolvers = {
  Query: {},
  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
