// export async function POST(request: Request) {
//   // OnlyOffice will POST various status updates here while attempting to save
//   // Returning { error: 0 } acknowledges successful handling. Any non-zero error
//   // value is treated as a failure by Document Server and will prompt a download.
//   try {
//     const body = await request.json();
//     console.log("OnlyOffice callback: ", body);

//     // Basic sanity check per OnlyOffice callback contract
//     // See: https://api.onlyoffice.com/editors/callback
//     if (
//       typeof body !== "object" ||
//       body === null ||
//       typeof body.status !== "number"
//     ) {
//       return new Response(JSON.stringify({ error: 1 }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // You could persist changes here when status === 2 or 6 (document is ready to be saved)
//     // For now, we acknowledge all statuses as handled successfully.
//     return new Response(JSON.stringify({ error: 0 }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("OnlyOffice callback error:", error);
//     return new Response(JSON.stringify({ error: 1 }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

import fs from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.status === 2) {
      // Download and save the document
      const response = await fetch(body.url);
      const filetype = body.filetype;
      const buffer = await response.arrayBuffer();

      const documentsDir = path.join(process.cwd(), "documents");
      if (!fs.existsSync(documentsDir)) {
        fs.mkdirSync(documentsDir, { recursive: true });
      }

      const filePath = path.join(
        documentsDir,
        `document_${body.key}.${filetype}`,
      );
      fs.writeFileSync(filePath, Buffer.from(buffer));

      console.log(`Document saved: ${filePath}`);
    }

    return NextResponse.json({ error: 0 });
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json({ error: 1 }, { status: 500 });
  }
}

// import { mkdir, writeFile } from "node:fs/promises";
// import { type NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const status = body?.status;
//   const fileUrl = body?.url;
//   console.log("ONLYOFFICE CALLBACK", body);

//   try {
//     if (status === 2 || status === 6) {
//       const res = await fetch(fileUrl);
//       const buf = Buffer.from(await res.arrayBuffer());
//       await mkdir(".data", { recursive: true });
//       await writeFile(".data/edited.docx", buf);
//     }
//     return NextResponse.json({ error: 0 });
//   } catch (e) {
//     // Still respond with error=0 or the editor will show an error
//     console.error(e);
//     return NextResponse.json({ error: 0 });
//   }
// }
