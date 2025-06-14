export async function withService<T>(mockImport: () => Promise<T>, realImport: () => Promise<T>): Promise<T> {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        return mockImport();
    } else if (process.env.NEXT_PUBLIC_USE_MOCKS === 'false') {
        return realImport();
    } else {
        throw new Error("Environment variable NEXT_PUBLIC_USE_MOCKS is not set.");
    }
}