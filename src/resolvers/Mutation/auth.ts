import bcrypt from "bcrypt";
import { UserInfo } from "../../utils/types";
import { jwtHelper } from "../../utils/jwtHelpers";
import config from "../../config";

export const authResolver = {
  signup: async (parent: any, args: UserInfo, { prisma }: any) => {
    const isExit = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (isExit) {
      return {
        userError: "User Already this email is registered!",
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(args.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtHelper.generateToken(
      { userId: newUser.id },
      config.jwt.secret as string
    );
    return {
      userError: null,
      token,
    };
  },
  signin: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      return {
        userError: "User not found!",
        token: null,
      };
    }
    const correctPass = await bcrypt.compare(args.password, user.password);

    if (!correctPass) {
      return {
        userError: "Incorrect Password!",
        token: null,
      };
    }

    const token = await jwtHelper.generateToken(
      { userId: user.id },
      config.jwt.secret as string
    );

    return {
      userError: null,
      token,
    };
  },
};
