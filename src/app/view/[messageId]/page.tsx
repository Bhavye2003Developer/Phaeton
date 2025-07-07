import ViewPage from "@/components/view/ViewPage";

export default async function Page({
  params,
}: {
  params: Promise<{ messageId: string }>;
}) {
  const { messageId } = await params;
  return <ViewPage messageId={messageId} />;
}
