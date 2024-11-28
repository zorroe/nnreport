ALTER TABLE "media_file" ALTER COLUMN "update_time" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "media_file" ALTER COLUMN "update_time" DROP NOT NULL;