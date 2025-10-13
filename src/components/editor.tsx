"use client";

import { DocumentEditor } from "@onlyoffice/document-editor-react";

function onDocumentReady(_event: unknown) {
  console.log("Document is loaded");
}

function onLoadComponentError(errorCode: number, errorDescription: string) {
  switch (errorCode) {
    case -1: // Unknown error loading component
      console.log(errorDescription);
      break;

    case -2: // Error load DocsAPI from http://documentserver/
      console.log(errorDescription);
      break;

    case -3: // DocsAPI is not defined
      console.log(errorDescription);
      break;
  }
}

export default function Editor() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return (
    <DocumentEditor
      id="docxEditor"
      documentServerUrl="http://localhost:8080/"
      config={{
        document: {
          fileType: "xlsx",
          key: "unique-file-key",
          title: "CopList.xlsx",
          url: `${origin}/files/CopList.xlsx`,
        },
        documentType: "cell",
        editorConfig: {
          callbackUrl: `${origin}/api/onlyoffice/callback`,
          embedded: {
            embedUrl: "/embed/spreadsheet",
            toolbarDocked: "top",
          },
        },
      }}
      events_onDocumentReady={onDocumentReady}
      onLoadComponentError={onLoadComponentError}
    />
  );
}
