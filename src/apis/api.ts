import type { DtoConverter } from "@/apis/converters.ts";
import type { QueryClient, QueryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { StatusCodes } from "http-status-codes";

/**
 * TODO: this needs a more suitable file name/location
 */

/**
 * Retrieve all items by provided options.
 */
export async function fetchAll<T>(client: QueryClient, options: QueryOptions): Promise<T[]> {
  return client.fetchQuery(options)
}

/**
 * Retrieve single item by provided options.
 */
export async function fetchById<T>(client: QueryClient, options: QueryOptions): Promise<T> {
  try {
    return client.fetchQuery(options);
  }
  catch (error) {
    if (isAxiosError(error) && error.status === StatusCodes.NOT_FOUND) {
      throw notFound();
    }

    throw new Error("An unexpected error has occurred.");
  }
}
