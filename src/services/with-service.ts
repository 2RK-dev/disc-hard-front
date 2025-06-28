export async function withService<T>(mockImport: () => Promise<T>, realImport: () => Promise<T>): Promise<T> {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        return mockImport();
    } else if (process.env.NEXT_PUBLIC_USE_MOCKS === 'false') {
        return realImport();
    } else {
        throw new Error(
            "The environment variable 'NEXT_PUBLIC_USE_MOCKS' must be set to either 'true' or 'false'. " +
            "Please update your environment configuration to specify whether to use mock or real services."
        );
    }
}
