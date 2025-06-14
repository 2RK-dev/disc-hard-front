export function unwrapResult<T>(result: {success: boolean, data?: T, error?: string}): T | null {
    if (!result.success) {
        console.error("An error occurred : " + result.error);
        return null;
    }
    return result.data || null;
}