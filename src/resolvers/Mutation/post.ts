export const postResolver = {
  addPost: async (params: any, agrs: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized access!",
        post: null,
      };
    }

    if (!agrs.title || !agrs.content) {
      return {
        userError: "Title and content is required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: agrs.title,
        content: agrs.content,
        authorId: userInfo.userId,
      },
    });
    return {
      userError: null,
      post: newPost,
    };
  },
};