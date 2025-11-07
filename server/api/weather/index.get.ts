export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  // Build a unique cache key per user.id (assume user.id is string or number)
  const cacheKey = `weather-user-${user.id}`;

  // Try to retrieve from a cache
  const cached = await useStorage("cache").getItem(cacheKey);
  if (cached)
    return {
      _cached: true,
      ...cached,
    };

  // Otherwise fetch and cache
  try {
    const response = await $fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m",
    );
    const result = {
      cachedAt: new Date().toISOString(),
      user,
      weather: response,
    };
    // Cache result per user, e.g. for 10 minutes (600 sec)
    await useStorage("cache").setItem(cacheKey, result, { maxAge: 600 });
    return result;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw createError({ statusCode: 500, message: "Internal Server Error" });
  }
});
