import { User } from "@prisma/client";
import MemberBox from "./MemberBox";

interface MemberListProps {
  members: User[];
}

export default function MemberList({ members }: MemberListProps) {
  return (
    <div className="flex flex-col gap-4">
      {members.map((member) => (
        <MemberBox key={member.id} member={member} />
      ))}
    </div>
  );
}
