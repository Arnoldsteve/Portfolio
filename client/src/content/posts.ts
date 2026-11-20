// Blog posts, as structured content (no MDX dependency).
// Written from Steve's own repos and verified findings. Steve: read each before publishing,
// Dates are ISO (YYYY-MM-DD).

export type Block = { h2: string } | { p: string } | { ul: string[] } | { code: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  tag: string;
  body: Block[];
  cta: { text: string; label: string; href: string };
};

export const posts: Post[] = [
  {
    slug: 'payment-callbacks-exactly-once',
    title: 'A retried payment callback must never pay twice',
    description: 'How Umoja records every M-Pesa payment and payout exactly once: idempotency keys, an append-only ledger and an outbox.',
    date: '2026-11-20',
    tag: 'Payments',
    body: [
      { p: 'Payment providers retry. M-Pesa, Paystack and Stripe will all send the same callback more than once if your server is slow, times out or returns an error. On Umoja — a live marketplace where buyers pay with M-Pesa and creators withdraw to M-Pesa — we treated duplicate callbacks as a when, not an if. Here is the design that makes a repeated callback harmless.' },
      { h2: 'Rule 1: one key per money movement' },
      { p: 'Every payment row stores the provider’s transaction id, and that column is unique. When a callback arrives, the handler verifies the signature, looks up the transaction id, and if a finished payment already exists it does nothing and returns 200. The provider stops retrying; nothing is posted twice.' },
      { p: 'The same idea applies one level down. Every ledger transaction carries an idempotency key built from what caused it:' },
      { code: 'sale:{paymentId}\npayout:{payoutId}' },
      { p: 'A retry that reaches the ledger with a key it has already seen is rejected. Two independent guards, so a bug in one layer can’t move money twice.' },
      { h2: 'Rule 2: balances are derived, never edited' },
      { p: 'The tempting design is a balance column you add to and subtract from. It is simple, and it is how money goes missing: a retried request or a half-finished write changes the number, and nothing records why.' },
      { p: 'Umoja uses an append-only, double-entry ledger instead. Every movement is one or more immutable entries, and every transaction must balance — debits equal credits, per currency — or the write is rejected. A creator’s balance is the sum of their entries. Mistakes are fixed with a new compensating transaction, never an edit or a delete.' },
      { p: 'A worked example from the design: a buyer pays KES 1,000, the platform takes 10% commission and the payment provider charges KES 30. The ledger credits the creator 900 and the platform 100, and records the 30 as a fee expense. The creator’s 900 is predictable, and every shilling has a line.' },
      { h2: 'Rule 3: one transaction, then an outbox' },
      { p: 'The ledger entries, the cached wallet balance and the order status are written in one database transaction — all or nothing. Anything that should happen after the money moves, like an email to the buyer, is written to an outbox table in that same transaction, and a worker publishes it. You never get “money moved but the event was lost”, or “the email went out but the payment rolled back”.' },
      { h2: 'Rule 4: assume a callback never arrives' },
      { p: 'Idempotency handles callbacks that arrive too often. Reconciliation handles the ones that never arrive. A scheduled job sweeps payments stuck in a pending state against the provider’s own records, and a second job checks that every cached wallet balance equals the sum of its ledger entries. If they ever differ, that is an alert, not a log line.' },
      { h2: 'How I test it' },
      { ul: [
        'Replay the same callback twice, then ten times, concurrently. Exactly one sale, one ledger transaction, one email.',
        'Kill the process between the money write and the event. The outbox still delivers the event once.',
        'Delete a callback entirely. Reconciliation finds the payment and settles it.',
        'Sum the ledger. It must equal every wallet, to the cent.',
      ] },
      { p: 'None of this is specific to M-Pesa. It is the same discipline I used on Stripe webhooks for a UK travel checkout. If your payment flow has a balance column that gets updated in place, that is the first thing I would look at.' },
    ],
    cta: { text: 'Building something that moves money?', label: 'Get a quote from SaTechs', href: '/contact?route=build' },
  },
  {
    slug: 'wifi-payer-vs-device',
    title: 'The phone that pays isn’t always the device that connects',
    description: 'Designing Jaza WiFi, a self-service paid hotspot: why payment and internet access are two different identities.',
    date: '2026-11-20',
    tag: 'Product design',
    body: [
      { p: 'Jaza WiFi is a self-service paid hotspot I’m building. A customer connects, sees clear plans, pays with M-Pesa on their own phone and is online in under a minute, with no operator involved. The first design question turned out to be the most important one: who, exactly, is the customer?' },
      { h2: 'Two identities, not one' },
      { p: 'Picture a customer who wants WiFi on their laptop. The laptop joins the network and sees the plans, but the payment happens on their phone, where M-Pesa lives. If the system grants access to “whoever paid”, the wrong device gets online.' },
      { p: 'So Jaza separates the two:' },
      { ul: [
        'The payer is a phone number. It proves money was sent, and it is used for recognition and history across devices and sites.',
        'The subscriber is a device, identified by its MAC address as the router sees it. This is what actually gets internet. A grant is bound to exactly one device.',
      ] },
      { p: 'The pending request carries the device; the payment carries the phone. When the payment is confirmed, the server grants the device that asked — not the phone that paid, unless they are the same device.' },
      { h2: 'Who owns the clock' },
      { p: 'A MikroTik router can time sessions by itself, and that is the obvious place to put paid time. I put it in the server instead, keyed to the device. That is what makes two fairness promises possible: if the site’s internet goes down, the clock pauses, so paid time is never silently used up; and a device that drops and rejoins keeps its balance without paying again. The router’s RADIUS timers stay, but only as a backstop.' },
      { h2: 'Constraints that shaped the design' },
      { ul: [
        'The first site is a home connection on a wireless ISP with about 20 Mbps shared. Bandwidth, not data, is the scarce resource, so every device gets a speed cap.',
        'The router has no public IP address. It dials out to the server over WireGuard and holds the tunnel open, so the server can push grants and disconnects back down.',
        'Phones detect captive portals over plain HTTP, so the portal, the payment provider and M-Pesa endpoints have to be allowed through the walled garden before payment works at all.',
        'Payments start with Paystack’s M-Pesa STK push, behind an interface, so a direct Daraja integration can replace it later without a rewrite.',
      ] },
      { p: 'Jaza WiFi is still in development. If you run a space where people need WiFi — a residential block, a café, a co-working space — I would like to hear how you handle it today.' },
    ],
    cta: { text: 'Want paid WiFi without vouchers?', label: 'Talk to me about Jaza WiFi', href: '/contact?route=partner' },
  },
  {
    slug: 'three-bugs-before-launch',
    title: 'Three bugs a booking platform hides until launch',
    description: 'A payment reference that could be reused, a race that oversold limited slots, and a timezone bug with company-wide reach — and how to look for them.',
    date: '2026-11-20',
    tag: 'QA',
    body: [
      { p: 'I lead QA on a travel platform before its launch. Testing turned up three problems that would have cost real money in production. None of them were exotic, and that is the point: they hide in almost every booking or checkout system, and you only find them if you go looking.' },
      { h2: '1. A payment reference that could be reused' },
      { p: 'A payment reference from one booking could be reused on another. It is an access-control flaw: the system trusted that a reference was paid, without checking that it belonged to this booking.' },
      { p: 'How to look for it: take a valid, paid reference and submit it somewhere it doesn’t belong — another booking, another user, another amount. Every check on a payment should ask “paid, by whom, for what, and how much”, not just “paid?”.' },
      { h2: '2. A race that oversold limited slots' },
      { p: 'Limited slots could be oversold when two customers booked the last one at the same moment. Each request read “one left”, and both succeeded. I reproduced it live, which matters: a race condition nobody can reproduce tends to be argued away.' },
      { p: 'How to look for it: fire concurrent requests at anything with a limit — the last seat, the last room, a coupon with one use left — and count what was sold. The fix is in the data layer, with a lock or an atomic conditional update, not a check in application code.' },
      { h2: '3. A timezone bug with company-wide reach' },
      { p: 'Dates and times were being stored and compared in a way that went wrong across time zones, and the effects reached well beyond one feature. I traced it and wrote the fix plan: a schema change, a backfill of existing data, and a six-phase rollout so nothing broke on the way.' },
      { p: 'How to look for it: create bookings from different time zones, around midnight and around daylight-saving changes, and check every date the customer and the operator see. Store instants in UTC, keep the user’s time zone separately, and convert only at the edges.' },
      { h2: 'What the three have in common' },
      { ul: [
        'Each one passes a happy-path demo.',
        'Each one costs money or trust after launch, when it is ten times harder to fix.',
        'Each one is found by a test plan written from the failure cases first, before the feature ships.',
      ] },
      { p: 'That is why I build and test. Engineers who only build test what they meant to build; QA that only tests rarely knows where the code is fragile. Doing both is how bugs like these get caught before customers find them.' },
    ],
    cta: { text: 'Launching a product that takes payments?', label: 'Get a QA review from SaTechs', href: '/contact?route=build' },
  },
];

export function readingMinutes(post: Post): number {
  const text = post.body.map((b) => ('ul' in b ? b.ul.join(' ') : Object.values(b)[0])).join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
