CREATE TABLE IF NOT EXISTS "storage_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"type" varchar(256) NOT NULL,
	"config" jsonb NOT NULL
);
