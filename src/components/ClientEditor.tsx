"use client";

import dynamic from "next/dynamic";

const DocumentEditor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

export default function ClientEditor() {
  return (
    <main className="w-full h-screen">
      <DocumentEditor />
    </main>
  );
}
