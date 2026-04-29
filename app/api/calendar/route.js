function unfoldIcsLines(text) {
  return text.replace(/\r?\n[ \t]/g, "");
}

function readField(eventBlock, field) {
  const line = eventBlock
    .split(/\r?\n/)
    .find((item) => item.startsWith(`${field}`));

  if (!line) return "";
  return line.slice(line.indexOf(":") + 1).replace(/\\,/g, ",").replace(/\\n/g, " ").trim();
}

function formatTime(value) {
  if (!value) return "Dia todo";

  const match = value.match(/T(\d{2})(\d{2})/);
  if (!match) return "Dia todo";

  return `${match[1]}:${match[2]}`;
}

function parseEvents(icsText) {
  const unfolded = unfoldIcsLines(icsText);
  const blocks = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) ?? [];

  return blocks.slice(0, 12).map((block) => ({
    time: formatTime(readField(block, "DTSTART")),
    patient: readField(block, "SUMMARY") || "Evento sem titulo",
    type: readField(block, "DESCRIPTION") || "Google Calendar",
    provider: "Dr. Joao Lima",
    status: "Google"
  }));
}

export async function GET() {
  const calendarUrl = process.env.GOOGLE_CALENDAR_ICS_URL;

  if (!calendarUrl) {
    return Response.json({ events: [], configured: false });
  }

  try {
    const response = await fetch(calendarUrl, { next: { revalidate: 60 } });

    if (!response.ok) {
      return Response.json({ events: [], configured: true, error: "Calendar fetch failed" }, { status: 502 });
    }

    const icsText = await response.text();
    return Response.json({ events: parseEvents(icsText), configured: true });
  } catch {
    return Response.json({ events: [], configured: true, error: "Calendar unavailable" }, { status: 502 });
  }
}
