import { get, put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { Activity } from "@/types/assets";

const DATA_DIR = path.join(process.cwd(), "data");
const ACTIVITIES_FILE = path.join(DATA_DIR, "activities.json");
const ACTIVITIES_BLOB_PATH = "data/activities.json";

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureLocalDataFile() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  if (!existsSync(ACTIVITIES_FILE)) {
    await writeFile(ACTIVITIES_FILE, JSON.stringify([]), "utf-8");
  }
}

async function readLocalActivities() {
  await ensureLocalDataFile();
  const data = await readFile(ACTIVITIES_FILE, "utf-8");
  return JSON.parse(data) as Activity[];
}

async function writeLocalActivities(activities: Activity[]) {
  await ensureLocalDataFile();
  await writeFile(ACTIVITIES_FILE, JSON.stringify(activities, null, 2), "utf-8");
}

export async function readActivities() {
  if (!hasBlobToken()) {
    return readLocalActivities();
  }

  const result = await get(ACTIVITIES_BLOB_PATH, {
    access: "private",
  });

  if (!result || result.statusCode === 304 || !result.stream) {
    return [];
  }

  const data = await new Response(result.stream).text();
  if (!data.trim()) {
    return [];
  }

  return JSON.parse(data) as Activity[];
}

export async function writeActivities(activities: Activity[]) {
  if (!hasBlobToken()) {
    if (process.env.VERCEL) {
      throw new Error("BLOB_READ_WRITE_TOKEN is required on Vercel");
    }

    await writeLocalActivities(activities);
    return;
  }

  await put(ACTIVITIES_BLOB_PATH, JSON.stringify(activities, null, 2), {
    access: "private",
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json",
  });
}

export function toActivitySummary(activity: Activity): Activity {
  return {
    ...activity,
    fullDescription: "",
    images: (activity.images || []).filter((image) => !image.startsWith("data:")),
    videos: (activity.videos || []).filter((video) => !video.startsWith("data:")),
  };
}
