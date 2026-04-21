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
export async function fetchAll(client: QueryClient, options: QueryOptions): any[] {
  return client.fetchQuery(options)
}

/**
 * Retrieve all items by provided options.
 * This will be the replacement.
 * TODO: add type handling
 */
export async function fetchAllWithConverter<T>(client: QueryClient, options: QueryOptions, dtoConverter: DtoConverter<T>): T[] {
  const [ key ] = options.queryKey;

  return {
    [key]: await client.fetchQuery(options)
      .then((items) => items.map(dtoConverter)),
  };
}

/**
 * Retrieve single item by provided options.
 */
export async function fetchById<T>(client: QueryClient, options: QueryOptions): T {
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
