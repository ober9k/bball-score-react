/**
 * Set a small sleep timer for mocking API response delays.
 * @param ms milliseconds
 * @returns {Promise<unknown>}
 */
exports.sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
