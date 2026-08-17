"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { DemoConversation } from "@/lib/demo-features";
import { formatDate } from "@/lib/utils";

export function DemoMessagingWorkspace({
  initialConversations,
  initialThreadId,
}: {
  initialConversations: DemoConversation[];
  initialThreadId?: string;
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedThreadId, setSelectedThreadId] = useState(
    initialThreadId ?? initialConversations[0]?.id ?? "",
  );
  const [draft, setDraft] = useState("");

  const activeConversation =
    conversations.find((conversation) => conversation.id === selectedThreadId) ??
    conversations[0] ??
    null;

  function handleSelect(threadId: string) {
    setSelectedThreadId(threadId);
    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === threadId
          ? {
              ...conversation,
              unreadCount: 0,
            }
          : conversation,
      ),
    );
  }

  function handleSend() {
    if (!draft.trim() || !activeConversation) {
      return;
    }

    const nextMessage = {
      id: `local-${Date.now()}`,
      sender: "client" as const,
      author: "You",
      content: draft.trim(),
      sentAt: new Date().toISOString(),
    };

    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              messages: [...conversation.messages, nextMessage],
            }
          : conversation,
      ),
    );
    setDraft("");
  }

  if (!activeConversation) {
    return (
      <div className="surface p-6 text-sm leading-7 text-slate-300">
        No demo conversations are available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.6fr]">
      <aside className="surface space-y-4 p-4 sm:p-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Inbox</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-white">
            Demo client messages
          </h2>
        </div>
        <div className="space-y-3">
          {conversations.map((conversation) => {
            const lastMessage = conversation.messages[conversation.messages.length - 1];
            const isActive = conversation.id === activeConversation.id;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => handleSelect(conversation.id)}
                className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-cyan-300 bg-cyan-400/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{conversation.participantName}</p>
                    <p className="mt-1 text-sm text-slate-300">{conversation.gigTitle}</p>
                  </div>
                  {conversation.unreadCount > 0 ? (
                    <span className="rounded-full bg-amber-300 px-2 py-1 text-xs font-semibold text-slate-950">
                      {conversation.unreadCount}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-cyan-100">
                  {conversation.orderStage}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                  {lastMessage?.content}
                </p>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="surface flex min-h-[42rem] flex-col p-4 sm:p-6">
        <div className="border-b border-white/10 pb-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            {activeConversation.participantRole}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-white">
            {activeConversation.participantName}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Project: {activeConversation.gigTitle}
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto py-6">
          {activeConversation.messages.map((message) => {
            const isSelf = message.sender === "client";

            return (
              <div
                key={message.id}
                className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xl rounded-[1.5rem] px-4 py-3 ${
                    isSelf ? "bg-white text-slate-950" : "bg-white/5 text-white"
                  }`}
                >
                  <p className="text-sm font-semibold">{message.author}</p>
                  <p className="mt-2 text-sm leading-7">{message.content}</p>
                  <p
                    className={`mt-3 text-xs uppercase tracking-[0.2em] ${
                      isSelf ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {formatDate(message.sentAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-4">
          <label className="block text-sm text-slate-300" htmlFor="message-draft">
            Send a demo message
          </label>
          <textarea
            id="message-draft"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={4}
            placeholder="Type a project update or question..."
            className="mt-3 w-full rounded-[1.5rem] border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Demo only. Messages are stored in local page state.
            </p>
            <Button type="button" onClick={handleSend} disabled={!draft.trim()}>
              Send message
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
