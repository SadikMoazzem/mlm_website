import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://42a089fb0a45dad9162d0ff5a13f78b0@o483893.ingest.us.sentry.io/4510025481781248",

  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  _experiments: {
    enableLogs: true,
  },

  // Performance Monitoring
  tracesSampleRate: 1.0,

  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',

  environment: process.env.NODE_ENV,
});
