export const routes = [
  { path: "/", name: "home" },
  { path: "/work/jaza-wifi", name: "work-jaza" },
  { path: "/work/umoja-studio", name: "work-coming-soon" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/does-not-exist", name: "404", status: 404 },
] as const;

export const themes = ["light", "dark"] as const;
