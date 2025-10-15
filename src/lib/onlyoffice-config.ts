import { generateToken } from "./jwt";

export interface DocumentConfig {
  documentType: "word" | "cell" | "slide";
  document: {
    fileType: string;
    key: string;
    title: string;
    url: string;
    permissions: {
      edit: boolean;
      download: boolean;
      review: boolean;
    };
  };
  editorConfig: {
    callbackUrl: string;
    user: {
      id: string;
      name: string;
    };
    customization?: {
      autosave: boolean;
      forcesave: boolean;
    };
  };
  token?: string;
}

export function createDocumentConfig(
  fileName: string,
  fileType: string,
  documentKey: string,
  userId: string,
  userName: string,
  canEdit: boolean = true,
): DocumentConfig {
  const documentType = getDocumentType(fileType);

  const config: DocumentConfig = {
    documentType,
    document: {
      fileType,
      key: documentKey,
      title: fileName,
      url: `${process.env.NEXT_PUBLIC_ONLYOFFICE_API_URL}/api/documents/${documentKey}/download`,
      permissions: {
        edit: canEdit,
        download: true,
        review: true,
      },
    },
    editorConfig: {
      callbackUrl: `${process.env.NEXT_PUBLIC_ONLYOFFICE_API_URL}/api/documents/${documentKey}/callback`,
      user: {
        id: userId,
        name: userName,
      },
      customization: {
        autosave: true,
        forcesave: false,
      },
    },
  };

  // Generate JWT token for the entire config
  if (process.env.ONLYOFFICE_JWT_SECRET) {
    config.token = generateToken(config);
  }

  return config;
}

function getDocumentType(fileType: string): "word" | "cell" | "slide" {
  const wordFormats = [
    "doc",
    "docx",
    "docm",
    "dot",
    "dotx",
    "dotm",
    "odt",
    "fodt",
    "ott",
    "rtf",
    "txt",
    "html",
    "htm",
    "mht",
    "pdf",
    "djvu",
    "fb2",
    "epub",
    "xps",
  ];
  const cellFormats = [
    "xls",
    "xlsx",
    "xlsm",
    "xlt",
    "xltx",
    "xltm",
    "ods",
    "fods",
    "ots",
    "csv",
  ];
  const slideFormats = [
    "pps",
    "ppsx",
    "ppsm",
    "ppt",
    "pptx",
    "pptm",
    "pot",
    "potx",
    "potm",
    "odp",
    "fodp",
    "otp",
  ];

  if (wordFormats.includes(fileType.toLowerCase())) return "word";
  if (cellFormats.includes(fileType.toLowerCase())) return "cell";
  if (slideFormats.includes(fileType.toLowerCase())) return "slide";

  return "word"; // default
}
