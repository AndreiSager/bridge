import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationHeader from "./components/ConversationHeader";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-ignore
    <Sidebar>
      <div className="flex flex-col overflow-hidden fixed inset-y-0 pb-0 lg:pb-0 lg:left-[60px] w-full lg:w-[300px] lg:block border-r-[1px] border-gray-20 gap-[10px]">
        <ConversationHeader users={users} initialItems={conversations} />
        <ConversationList users={users} initialItems={conversations} />
      </div>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
