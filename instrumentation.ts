import * as Sentry from "@sentry/nextjs";
import type { Instrumentation } from "next";

export function register() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
    sendDefaultPii: false,
  });
}

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context
) => {
  await Sentry.captureRequestError(err, request, context);
};
