function readLead(payload) {
  return {
    name: payload.name || payload.first_name || payload["first name"] || "Lead sem nome",
    phone: payload.phone || payload.whatsapp || payload.telefone || "",
    email: payload.email || "",
    interest: payload.treatment || payload.interest || payload.procedimento || "Consulta",
    channel: payload.channel || "Chatfuel"
  };
}

export async function POST(request) {
  const expectedSecret = process.env.CHATFUEL_WEBHOOK_SECRET;
  const requestUrl = new URL(request.url);
  const receivedSecret = requestUrl.searchParams.get("secret") || request.headers.get("x-chatfuel-secret");

  if (expectedSecret && receivedSecret !== expectedSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => ({}));
  const lead = readLead(payload);

  console.log("Chatfuel lead received", lead);

  return Response.json({
    messages: [
      {
        text: `Obrigado, ${lead.name}. Recebemos seu interesse em ${lead.interest}. Nossa equipe vai acompanhar por aqui.`
      }
    ],
    set_attributes: {
      crm_status: "lead_received",
      crm_interest: lead.interest,
      crm_channel: lead.channel
    }
  });
}

export async function GET() {
  return Response.json({
    status: "ok",
    service: "chatfuel-webhook"
  });
}
