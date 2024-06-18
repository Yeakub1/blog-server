export const postResolver = {
  addPost: async (params: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized access!",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        userError: "Title and content is required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.userId,
      },
    });
    return {
      userError: null,
      post: newPost,
    };
  },
    updatePost: async (params: any, args: any, { prisma, userInfo }: any) => {
      if (!userInfo) {
        return {
          userError: "Unauthorized access!",
          post: null,
        };
      }
      const user = await prisma.user.findUnique({
        where: {
          id: userInfo.userId,
        },
      });
      if (!user) {
        return {
          userError: "User Not Found!",
          post: null,
        };
      }
      const post = await prisma.post.findUnique({
        where: {
          id: Number(args.postId),
        },
      });
      if (!post) {
        return {
          userError: "Post Not Found!",
          post: null,
        };
        }
        if (post.authorId !== user.id) {
            return {
              userError: "Post not won not by user!",
              post: null,
            };

        }
        const updatedPost = await prisma.post.update({
            where: {
              id: Number(args.postId),
            },
            data: args.post,
        })
        return {
          userError: null,
          post: updatedPost,
        };
    },
};
