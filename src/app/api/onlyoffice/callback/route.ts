export async function POST(request: Request) {
  // OnlyOffice will POST various status updates here while attempting to save
  // Returning { error: 0 } acknowledges successful handling. Any non-zero error
  // value is treated as a failure by Document Server and will prompt a download.
  try {
    const body = await request.json();
    console.log("OnlyOffice callback: ", body);

    // Basic sanity check per OnlyOffice callback contract
    // See: https://api.onlyoffice.com/editors/callback
    if (typeof body !== "object" || body === null || typeof body.status !== "number") {
      return new Response(JSON.stringify({ error: 1 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // You could persist changes here when status === 2 or 6 (document is ready to be saved)
    // For now, we acknowledge all statuses as handled successfully.
    return new Response(JSON.stringify({ error: 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OnlyOffice callback error:", error);
    return new Response(JSON.stringify({ error: 1 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}