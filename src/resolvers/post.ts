export const Post = {
  author: async (params: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: params.authorId,
      },
    });
  },
};
