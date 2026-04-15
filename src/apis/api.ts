import type { QueryClient, QueryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { StatusCodes } from "http-status-codes";

/**
 * TODO: this needs a more suitable file name/location
 */

/**
 * Retrieve all items by provided options.
 * TODO: add type handling
 */
export async function fetchAll(client: QueryClient, options: QueryOptions): any[] {
  const [ key ] = options.queryKey;

  return {
    [key]: await client.fetchQuery(options)
  };
}

/**
 * Retrieve single item by provided options.
 * TODO: add type handling
 */
export async function fetchById(client: QueryClient, options: QueryOptions): any {
  const [ key ] = options.queryKey;

  try {
    return {
      [key]: await client.fetchQuery(options)
    };
  }
  catch (error) {
    if (isAxiosError(error) && error.status === StatusCodes.NOT_FOUND) {
      throw notFound();
    }

    throw new Error("An unexpected error has occurred.");
  }
}
