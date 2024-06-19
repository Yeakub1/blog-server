import { userLoaders } from "../dataLoaders/userLoader";

export const Post = {
  author: async (params: any, args: any, { prisma, userInfo }: any) => {
    return userLoaders.load(params.authorId);
  },
};
