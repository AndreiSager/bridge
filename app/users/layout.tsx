import Sidebar from "../components/sidebar/Sidebar";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error Server Component
    <Sidebar children={children}>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
