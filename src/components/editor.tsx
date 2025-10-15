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
    default:
      console.log(errorDescription);
      break;
  }
}

export default function Editor() {
  // const origin = typeof window !== "undefined" ? window.location.origin : "";
  // const appBaseUrl = (process.env.NEXT_PUBLIC_APP_BASE_URL || origin).replace(
  //   /\/$/,
  //   "",
  // );
  const docServerUrl = (
    process.env.NEXT_PUBLIC_ONLYOFFICE_DOCSERVER_URL || "http://localhost:8000/"
  ).replace(/(?<!:)\/{0,1}$/u, "/");

  const callbackUrl = `https://yupsis-onlyoffice.loca.lt/api/onlyoffice/callback`;

  // const fileUrl = `http://192.168.0.195:3000/files/list-1.xlsx`;
  const fileUrl = "https://yupsis-onlyoffice.loca.lt/files/list-1.xlsx";

  console.log("docServerUrl", docServerUrl);
  console.log("fileUrl", fileUrl);

  console.log("callbackUrl", callbackUrl);

  const filename = "list-1.xlsx";

  const documentKey = `${filename}-${Date.now()}`; // Generate unique key
  return (
    <DocumentEditor
      id="docxEditor"
      documentServerUrl={docServerUrl}
      config={{
        document: {
          fileType: "xlsx",
          key: documentKey,
          title: filename,
          url: fileUrl,
          // permissions: {
          //   edit: true,
          //   download: true,
          //   comment: true,
          //   review: true,
          //   chat: false,
          //   protect: false,
          // },
        },
        documentType: "cell",
        editorConfig: {
          callbackUrl: callbackUrl,
          mode: "edit",
        },
      }}
      events_onDocumentReady={onDocumentReady}
      onLoadComponentError={onLoadComponentError}
      height="100%"
      width="100%"
    />
  );
}
