<template>
  <div class="mx-auto max-w-4xl p-4 relative overflow-hidden">
    <!-- decorative floating cloud (subtle, uses CSS animation) -->
    <div
      class="pointer-events-none absolute -top-8 -right-8 opacity-30 animate-float"
    >
      <svg
        width="160"
        height="80"
        viewBox="0 0 160 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(20,10)" fill="#e6f0ff">
          <ellipse cx="70" cy="30" rx="50" ry="22" />
          <ellipse cx="40" cy="34" rx="28" ry="18" />
          <ellipse cx="100" cy="34" rx="28" ry="18" />
        </g>
      </svg>
    </div>

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
        class="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 to-white rounded-xl p-6 shadow relative z-10"
      >
        <div class="flex-1">
          <div class="flex items-center gap-4">
            <div
              class="rounded-full bg-white/60 px-8 py-4 shadow-inner flex items-center gap-4"
            >
              <!-- animated sun/moon icon -->
              <div
                :class="[
                  'w-14 h-14 flex items-center justify-center rounded-full',
                  isDay ? 'bg-yellow-100' : 'bg-slate-700',
                ]"
                class="flex-shrink-0"
              >
                <svg
                  v-if="isDay"
                  class="w-10 h-10 transform animate-sun-rotate"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4" fill="#FDBA74" />
                  <g stroke="#FDBA74" stroke-width="1.2">
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M4.2 4.2l1.4 1.4" />
                    <path d="M18.4 18.4l1.4 1.4" />
                    <path d="M4.2 19.8l1.4-1.4" />
                    <path d="M18.4 5.6l1.4-1.4" />
                  </g>
                </svg>
                <svg
                  v-else
                  class="w-10 h-10 text-white opacity-95"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                    fill="#c7d2fe"
                  />
                </svg>
              </div>

              <div>
                <div class="text-4xl font-bold text-sky-700">
                  {{ current?.temperature_2m ?? "—" }}
                  <span class="text-xl align-super">°C</span>
                </div>
                <div class="text-sm text-slate-600">
                  As of
                  <NuxtTime
                    v-if="current?.time"
                    :datetime="current.time"
                    year="numeric"
                    month="short"
                    day="numeric"
                    hour="2-digit"
                    minute="2-digit"
                  />
                  <template v-else>N/A</template>
                </div>
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
            <NuxtTime
              v-if="payload?.cachedAt"
              :datetime="payload.cachedAt"
              year="numeric"
              month="short"
              day="numeric"
              hour="2-digit"
              minute="2-digit"
            />
            <template v-else>-</template>
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
          <h2
            class="text-lg font-medium text-slate-800 flex items-center gap-3"
          >
            Hourly forecast
            <svg
              v-if="sparkPath"
              class="h-8 w-40"
              viewBox="0 0 240 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                :d="sparkPath"
                stroke="#0ea5e9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                class="stroke-spark"
              />
            </svg>
          </h2>
          <div class="text-sm text-slate-500">
            Next {{ hourlyItems.length }} hours
          </div>
        </div>

        <div class="-mx-2 overflow-x-auto pb-2">
          <div class="flex gap-3 px-2">
            <template v-for="(h, idx) in hourlyItems" :key="idx">
              <div
                class="min-w-[96px] flex-shrink-0 rounded-xl bg-gradient-to-b from-white to-slate-50 p-3 text-center shadow transform transition-transform hover:scale-105"
              >
                <div class="text-xs text-slate-500">
                  {{ formatHour(h.time) }}
                </div>
                <div class="mt-2 text-lg font-semibold text-slate-800">
                  {{
                    h.temp != null ? Math.round(h.temp * 10) / 10 + "°" : "—"
                  }}
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
import { computed } from "vue";

// Minimal payload type matching the API example
type TWeatherPayload = {
  _cached?: boolean;
  cachedAt?: string;
  user?: any;
  weather?: {
    latitude?: number;
    longitude?: number;
    generationtime_ms?: number;
    utc_offset_seconds?: number;
    timezone?: string;
    timezone_abbreviation?: string;
    elevation?: number;
    current_units?: Record<string, any>;
    current?: {
      time?: string;
      interval?: number;
      temperature_2m?: number;
      wind_speed_10m?: number;
    };
    hourly_units?: Record<string, any>;
    hourly?: {
      time?: string[];
      temperature_2m?: number[];
      relative_humidity_2m?: number[];
      wind_speed_10m?: number[];
    };
  };
};

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

const formatHour = (t?: string) => {
  if (!t) return "";
  try {
    const d = new Date(t);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (e: unknown) {
    console.error("Error formatting time:", e);
    return t;
  }
};

const hourlyItems = computed(() => {
  if (!hourly.value?.time || !hourly.value?.temperature_2m) return [];
  const times = hourly.value.time;
  const temps = hourly.value.temperature_2m;
  const hums = hourly.value.relative_humidity_2m;
  const winds = hourly.value.wind_speed_10m;
  const len = Math.min(times.length, temps.length);
  const items: Array<{
    time?: string;
    temp?: number;
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

// is it day-time (quick heuristic from current.time)
const isDay = computed(() => {
  const t = current.value?.time;
  if (!t) return true;
  try {
    const h = new Date(t).getHours();
    return h >= 6 && h < 19;
  } catch {
    return true;
  }
});

// sparkline path for the first 24 hourly temps
const sparkPath = computed(() => {
  const items = hourlyItems.value.slice(0, 24);
  if (!items.length) return "";
  // Build a numeric temps array and ignore missing values when computing bounds
  const temps = items.map((i) => (typeof i.temp === "number" ? i.temp : NaN));
  const defined = temps.filter((t) => !Number.isNaN(t));
  if (!defined.length) return "";
  const n = temps.length;
  const W = 240;
  const H = 48;
  const pad = 6;
  const innerW = W - pad * 2;
  const innerH = H - pad * 2;
  const min = Math.min(...defined);
  const max = Math.max(...defined);
  const range = max - min || 1;
  const points = temps.map((t, idx) => {
    const x = pad + (idx / Math.max(1, n - 1)) * innerW;
    const val = Number.isNaN(t) ? min : t; // fallback to min for missing
    const y = pad + (1 - (val - min) / range) * innerH;
    return [x, y];
  });
  return points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(" ");
});
</script>

<style scoped>
/* subtle float animation for decorations */
@keyframes floatY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}
.animate-float {
  animation: floatY 6s ease-in-out infinite;
}

/* rotating sun */
@keyframes sunRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-sun-rotate {
  animation: sunRotate 18s linear infinite;
  transform-origin: center;
}

/* draw sparkline stroke animation */
@keyframes drawStroke {
  from {
    stroke-dashoffset: 2000;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.stroke-spark {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: drawStroke 1.6s ease forwards;
}
</style>
