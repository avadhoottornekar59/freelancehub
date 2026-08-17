import { DemoMessagingWorkspace } from "@/components/messages/demo-messaging-workspace";
import { SectionHeading } from "@/components/layout/section-heading";
import { demoConversations, getConversationByGigId } from "@/lib/demo-features";

export default function MessagesPage({
  searchParams,
}: {
  searchParams?: { gigId?: string; thread?: string };
}) {
  const initialThreadId =
    searchParams?.thread ?? (searchParams?.gigId ? getConversationByGigId(searchParams.gigId)?.id : undefined);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Messaging Demo"
        title="Preview the client and freelancer chat flow"
        description="This inbox works without a database. You can switch between threads and send local demo replies to test the experience."
      />
      <DemoMessagingWorkspace
        initialConversations={demoConversations}
        initialThreadId={initialThreadId}
      />
    </div>
  );
}
