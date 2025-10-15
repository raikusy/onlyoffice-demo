import jwt from "jsonwebtoken";

export interface DocumentConfig {
  document: {
    fileType: string;
    key: string;
    title: string;
    url: string;
    permissions?: {
      edit?: boolean;
      download?: boolean;
      comment?: boolean;
      review?: boolean;
    };
  };
  documentType: "word" | "cell" | "slide";
  editorConfig: {
    callbackUrl?: string;
    mode?: "edit" | "view";
    user?: {
      id: string;
      name: string;
    };
  };
  height?: string;
  width?: string;
  token?: string;
}

export function generateJWT(config: Omit<DocumentConfig, "token">): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const payload = {
    ...config,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
  };

  return jwt.sign(payload, secret, { algorithm: "HS256" });
}

export function getDocumentType(fileType: string): "word" | "cell" | "slide" {
  const wordTypes = ["docx", "doc", "odt", "rtf", "txt"];
  const cellTypes = ["xlsx", "xls", "ods", "csv"];
  const slideTypes = ["pptx", "ppt", "odp"];

  if (wordTypes.includes(fileType.toLowerCase())) return "word";
  if (cellTypes.includes(fileType.toLowerCase())) return "cell";
  if (slideTypes.includes(fileType.toLowerCase())) return "slide";

  return "word"; // default
}

export function generateDocumentKey(filename: string): string {
  // Generate a unique key for the document
  return `${filename}_${Date.now()}`;
}
