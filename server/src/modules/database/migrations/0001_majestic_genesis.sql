ALTER TABLE "document_sections" ALTER COLUMN "source" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "document_sections" ADD COLUMN "source_id" varchar(255);--> statement-breakpoint
ALTER TABLE "document_sections" ADD COLUMN "checksum" varchar(64);--> statement-breakpoint
ALTER TABLE "document_sections" ADD COLUMN "updated_at" timestamp DEFAULT now();