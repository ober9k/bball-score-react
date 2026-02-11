/**
 * Set a small sleep timer for mocking API response delays.
 * @param ms milliseconds
 * @returns {Promise<unknown>}
 */
export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
