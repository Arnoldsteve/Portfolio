export const routes = [
  { path: "/", name: "home" },
  { path: "/work/umoja", name: "work-umoja" },
  { path: "/work/jaza-wifi", name: "work-jaza" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/writing", name: "writing" },
  { path: "/writing/payment-callbacks-exactly-once", name: "post" },
  { path: "/work/gradehub", name: "404", status: 404 },
] as const;

export const themes = ["light", "dark"] as const;
