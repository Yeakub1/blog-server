import { checkUserAccess } from "../../utils/checkUserAccess";

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

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
  deletePost: async (params: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized access!",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });

    return {
      userError: null,
      post: deletePost,
    };
  },
  publishPost: async (params: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized access!",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
};
