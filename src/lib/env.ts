import { z } from "zod";

const serverSchema = z.object({
	FIREBASE_SERVICE_ACCOUNT_BASE64: z.string().optional(),
	FIREBASE_EMULATOR_HOST: z.string().default("localhost"),
	FIREBASE_EMULATOR_AUTH_PORT: z.coerce.number().default(9099),
	FIREBASE_EMULATOR_FIRESTORE_PORT: z.coerce.number().default(8080),
	FIREBASE_EMULATOR_STORAGE_PORT: z.coerce.number().default(9199),
	FIREBASE_EMULATOR_FUNCTIONS_PORT: z.coerce.number().default(5001),
	RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60_000),
	RATE_LIMIT_MAX: z.coerce.number().default(120)
});

const clientSchema = z.object({
	NEXT_PUBLIC_APP_NAME: z.string().default("Firebase Studio"),
	NEXT_PUBLIC_DEFAULT_PROJECT_ID: z.string().default("demo-firebase"),
	NEXT_PUBLIC_API_BASE: z.string().default("/api"),
	NEXT_PUBLIC_EMULATOR_HOST: z.string().default("localhost")
});

export const serverEnv = serverSchema.parse(process.env);
export const clientEnv = clientSchema.parse({
	NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
	NEXT_PUBLIC_DEFAULT_PROJECT_ID: process.env.NEXT_PUBLIC_DEFAULT_PROJECT_ID,
	NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
	NEXT_PUBLIC_EMULATOR_HOST: process.env.NEXT_PUBLIC_EMULATOR_HOST
});