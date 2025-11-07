<template>
  <div class="mx-auto max-w-4xl p-4">
    <header class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-slate-800">Weather</h1>
      <div class="text-sm text-slate-500">
        Powered by Open-Meteo ·
        <span class="font-medium text-slate-700">{{
          weather?.timezone ?? "—"
        }}</span>
      </div>
    </header>

    <div
      v-if="!weather"
      class="rounded-lg border border-dashed border-slate-200 p-8 text-center text-slate-500"
    >
      Loading weather…
    </div>

    <section v-else class="space-y-6">
      <!-- Current weather card -->
      <div
        class="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 to-white rounded-xl p-6 shadow"
      >
        <div class="flex-1">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-white/60 px-8 py-4 shadow inner-shadow">
              <div class="text-4xl font-bold text-sky-700">
                {{ current?.temperature_2m ?? "—"
                }}<span class="text-xl align-super">°C</span>
              </div>
              <div class="text-sm text-slate-600">
                As of {{ formatDate(current?.time) }}
              </div>
            </div>

            <div>
              <div class="text-sm text-slate-500">Location</div>
              <div class="text-lg font-medium text-slate-800">
                lat: {{ weather?.latitude ?? "—" }}, lon:
                {{ weather?.longitude ?? "—" }}
              </div>
              <div class="mt-2 text-sm text-slate-600">
                Elevation:
                <span class="font-medium"
                  >{{ weather?.elevation ?? "—" }} m</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="w-full sm:w-56">
          <div class="grid grid-cols-1 gap-2">
            <div class="rounded-lg bg-white/60 p-3 text-center shadow">
              <div class="text-xs text-slate-500">Wind</div>
              <div class="text-lg font-semibold text-slate-800">
                {{ current?.wind_speed_10m ?? "—" }}
                <span class="text-sm text-slate-600">{{
                  weather?.current_units?.wind_speed_10m ??
                  weather?.hourly_units?.wind_speed_10m ??
                  "km/h"
                }}</span>
              </div>
            </div>
            <div class="rounded-lg bg-white/60 p-3 text-center shadow">
              <div class="text-xs text-slate-500">Humidity (hourly)</div>
              <div class="text-lg font-semibold text-slate-800">
                {{ hourly?.relative_humidity_2m?.[hourlyIndex] ?? "—"
                }}<span class="text-sm text-slate-600">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Details grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="rounded-lg bg-white p-4 shadow">
          <div class="text-xs text-slate-500">Timezone</div>
          <div class="mt-1 font-medium text-slate-800">
            {{ weather?.timezone }} ({{ weather?.timezone_abbreviation }})
          </div>
        </div>
        <div class="rounded-lg bg-white p-4 shadow">
          <div class="text-xs text-slate-500">Data generated</div>
          <div class="mt-1 font-medium text-slate-800">
            {{ payload?.cachedAt ? formatDate(payload.cachedAt) : "—" }}
          </div>
        </div>
        <div class="rounded-lg bg-white p-4 shadow">
          <div class="text-xs text-slate-500">Units</div>
          <div class="mt-1 text-slate-800">
            Temp:
            <span class="font-medium">{{
              weather?.current_units?.temperature_2m ?? "°C"
            }}</span>
          </div>
          <div class="mt-1 text-slate-800">
            Wind:
            <span class="font-medium">{{
              weather?.current_units?.wind_speed_10m ?? "km/h"
            }}</span>
          </div>
        </div>
      </div>

      <!-- Hourly forecast scroll -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-medium text-slate-800">Hourly forecast</h2>
          <div class="text-sm text-slate-500">
            Next {{ hourlyItems.length }} hours
          </div>
        </div>

        <div class="-mx-2 overflow-x-auto pb-2">
          <div class="flex gap-3 px-2">
            <template v-for="(h, idx) in hourlyItems" :key="idx">
              <div
                class="min-w-[96px] flex-shrink-0 rounded-xl bg-gradient-to-b from-white to-slate-50 p-3 text-center shadow"
              >
                <div class="text-xs text-slate-500">
                  {{ formatHour(h.time) }}
                </div>
                <div class="mt-2 text-lg font-semibold text-slate-800">
                  {{ Math.round(h.temp * 10) / 10 }}°
                </div>
                <div class="text-xs text-slate-500 mt-1">
                  Wind:
                  <span class="font-medium text-slate-700"
                    >{{ h.wind ?? "—" }}
                    {{ weather?.hourly_units?.wind_speed_10m ?? "km/h" }}</span
                  >
                </div>
                <div class="text-xs text-slate-500">
                  RH:
                  <span class="font-medium text-slate-700"
                    >{{ h.humidity ?? "—" }}%</span
                  >
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Raw debug (collapsible) -->
      <DevOnly>
        <details class="rounded-lg bg-white p-4 shadow">
          <summary class="cursor-pointer text-sm text-slate-600">
            Raw payload (toggle)
          </summary>
          <pre class="mt-3 max-h-64 overflow-auto text-xs text-slate-700">{{
            payload
          }}</pre>
        </details>
      </DevOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "protected",
});

const { data } = await useAPI<TWeatherPayload>("/api/weather", {
  key: "weather",
});

const payload = computed(() => data?.value ?? null);
const weather = computed(() => payload.value?.weather ?? null);
const current = computed(() => weather.value?.current ?? null);
const hourly = computed(() => weather.value?.hourly ?? null);

function formatHour(t?: string) {
  if (!t) return "";
  try {
    const d = new Date(t);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (e: unknown) {
    console.error("Error formatting time:", e);
    return t;
  }
}
function formatDate(t?: string) {
  if (!t) return "";
  try {
    const d = new Date(t);
    return d.toLocaleString();
  } catch (e: unknown) {
    console.error("Error formatting date:", e);
    return t;
  }
}

const hourlyItems = computed(() => {
  if (!hourly.value?.time || !hourly.value?.temperature_2m) return [];
  const times = hourly.value.time;
  const temps = hourly.value.temperature_2m;
  const hums = hourly.value.relative_humidity_2m;
  const winds = hourly.value.wind_speed_10m;
  const len = Math.min(times.length, temps.length);
  const items: Array<{
    time: string;
    temp: number;
    humidity?: number;
    wind?: number;
  }> = [];
  for (let i = 0; i < len; i++) {
    items.push({
      time: times[i],
      temp: temps[i],
      humidity: hums?.[i],
      wind: winds?.[i],
    });
  }
  return items.slice(0, 48); // limit to a reasonable number
});

// helper used in the template to peek a nearby hourly value for humidity
const hourlyIndex = Math.max(
  0,
  hourlyItems.value.findIndex((h) => h.time === current.value?.time) || 0,
);
</script>
