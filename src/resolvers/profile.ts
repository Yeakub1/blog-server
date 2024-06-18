export const Profile = {
  user: async (params: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    });
  },
};
