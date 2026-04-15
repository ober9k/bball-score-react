import type { SeasonDto } from "@/types/season.ts";

export type DtoConverter<T> = (data: any) => T;

