CREATE TABLE IF NOT EXISTS "report_media_resource_record" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_url" varchar(255) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"upload_time" timestamp DEFAULT now() NOT NULL,
	"file_type" varchar(50),
	"del_flag" varchar(1) DEFAULT '0'
);
