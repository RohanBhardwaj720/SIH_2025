// app/api/weather/route.ts
export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key missing" }), { status: 500 });
  }

  // Prefer lat/lon if available
  let query = "Delhi,India";
  if (lat && lon) {
    query = `${lat},${lon}`;
  } else if (city) {
    query = city;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}&aqi=yes`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch weather" }), { status: res.status });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
