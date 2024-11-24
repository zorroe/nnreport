ALTER TABLE "media_file" ALTER COLUMN "create_time" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "media_file" ALTER COLUMN "create_time" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "media_file" ALTER COLUMN "update_time" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "media_file" ALTER COLUMN "update_time" SET NOT NULL;