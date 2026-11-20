import { z } from "zod";

// Our CSP forbids eval. Zod v4 otherwise probes `new Function("")` to JIT-compile validators; the probe
// is caught, but Firefox logs the blocked attempt as an error. jitless skips the probe entirely.
z.config({ jitless: true });

export { z };
