import type { Activity } from "./assets";

export interface Comment {
  id: string;
  activityId: string;
  author: string;
  content: string;
  date: string;
  dateTimestamp: number;
}

export interface ActivityWithComments extends Activity {
  comments?: Comment[];
  likes?: number;
  shares?: number;
}

export interface ActivityFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  category: string;
  location: string;
  images: File[];
  videos: File[];
}

