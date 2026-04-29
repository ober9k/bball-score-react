import type { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { StatusCodes } from "http-status-codes";

/**
 * TODO: this needs a more suitable file name/location
 */

/**
 * Retrieve all items by provided options.
 */
export async function fetchAll<T>(client: QueryClient, options: FetchQueryOptions): Promise<T[]> {
  return (await client.fetchQuery(options)) as T[]; /* todo: revisit, setting to avoid error */
}

/**
 * Retrieve single item by provided options.
 */
export async function fetchById<T>(client: QueryClient, options: FetchQueryOptions): Promise<T> {
  try {
    return (await client.fetchQuery(options)) as T; /* todo: revisit, setting to avoid error */
  }
  catch (error) {
    if (isAxiosError(error) && error.status === StatusCodes.NOT_FOUND) {
      throw notFound();
    }

    throw new Error("An unexpected error has occurred.");
  }
}
