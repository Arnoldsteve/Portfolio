// Shared content types. Copy lives in the sibling files; `site.ts` re-exports everything.

/** Honest project status: every project wears exactly one. */
export type Status = 'live' | 'pilot' | 'building' | 'code' | 'concept';

/** An image on the site. `illustration` marks drawings that stand in for a product not yet deployed. */
export type Shot = { src: string; alt: string; width: number; height: number; illustration?: boolean };

/** Architecture diagram: boxes on a grid (col, row) joined by arrows. `hot` = the step the design is built around. */
export type Diagram = {
  title: string;
  nodes: { id: string; label: string; sub: string; col: number; row: number; hot?: boolean }[];
  edges: { from: string; to: string; label?: string }[];
};

/** Company logo (real file) for the experience strip; companies without one show their name. */
/** `mark`: the file is a symbol only, so the company name is shown beside it. */
export type Logo = { src: string; alt: string; width: number; height: number; mark?: boolean };

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  oneLiner: string;
  seoDescription: string;
  status: Status;
  liveUrl?: string;
  meta: { role: string; rails: string; stack: string };
  showcase: { wide: Shot; phone: Shot };
  results: { num: string; cap: string }[];
  problem: string;
  constraints: string[];
  flowIntro: string;
  flow: string[];
  flowHighlight: number;
  diagram: Diagram;
  decision: { chose: string; rejected: string };
  result: string;
  change: string;
  cta: { eyebrow: string; title: string; link: string; href: string };
  next: { label: string; href: string };
};

/** The lead project on the home page. */
export type Flagship = {
  slug: string; name: string; kind: string; status: Status; summary: string; bullets: string[]; shot: Shot; liveUrl: string;
};

/** A project card under "More work". `href` is where the whole card goes; `shot: null` = no image. */
export type Project = {
  slug: string; name: string; kind: string; status: Status; desc: string; hard: string; shot: Shot | null; href: string; cta: string;
};
