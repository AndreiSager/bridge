import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
import ConversationId from "../conversations/[conversationId]/page";

export default async function getAllConversationUsers(conversationId: string) {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }

  try {
    const allUsers = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      select: {
        userIds: true,
        // orderBy: {
        //   createdAt: "desc",
        // },
      },
    });

    return allUsers;
  } catch (error: any) {
    return [];
  }
}
