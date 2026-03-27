CREATE TABLE "chat_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" text,
	"summary" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "chat_sessions_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "document_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"source" text NOT NULL,
	"metadata" jsonb,
	"embedding" vector(384) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
