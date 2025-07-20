import type { LatLngExpression } from "leaflet";

export type PlaceInfo = {
  day: number;
  date: string;
  isStartSection?: boolean;
  id: number;
  order?: number;
  position: LatLngExpression;
  title: string;
  detail: string;
  src: string;
  address?: string;
  tags?: string[];
  cost?: string;
};

export type Range = {
  from: Date | undefined;
  to: Date | undefined;
};