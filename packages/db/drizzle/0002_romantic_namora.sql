CREATE TABLE IF NOT EXISTS "media_file" (
	"id" serial PRIMARY KEY NOT NULL,
	"filename" varchar(256) NOT NULL,
	"filetype" varchar(32) NOT NULL,
	"preview" text,
	"create_time" date DEFAULT now(),
	"update_time" date DEFAULT now(),
	"deleted" varchar DEFAULT '0'
);
