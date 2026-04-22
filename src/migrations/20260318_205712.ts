import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ru', 'en');
  CREATE TYPE "public"."enum_submissions_status" AS ENUM('new', 'processed', 'archived');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"display_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true NOT NULL,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"accent_color" varchar DEFAULT '#6C4BCF',
  	"image_id" integer,
  	"cta_href" varchar NOT NULL,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"result" varchar NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experience_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true NOT NULL,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experience_items_locales" (
  	"period" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"highlight" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "skill_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true NOT NULL,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"attachment_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "skill_groups_locales" (
  	"title" varchar NOT NULL,
  	"level" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true NOT NULL,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"preferred_channel" varchar,
  	"message" varchar NOT NULL,
  	"status" "enum_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"projects_id" integer,
  	"experience_items_id" integer,
  	"skill_groups_id" integer,
  	"testimonials_id" integer,
  	"submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_contact_items_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"icon_id" integer
  );
  
  CREATE TABLE "site_settings_social_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_s_e_o_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_name" varchar DEFAULT 'Your Name' NOT NULL,
  	"default_s_e_o_title" varchar NOT NULL,
  	"default_s_e_o_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_hero_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_hero_facts_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_about_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_about_principles_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_about_stats_locales" (
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_preferences_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_preferences_items_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"method_href" varchar NOT NULL,
  	"method_open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "home_page_contact_methods_locales" (
  	"method_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "home_page_footer_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_enabled" boolean DEFAULT true NOT NULL,
  	"hero_order" numeric DEFAULT 1 NOT NULL,
  	"hero_primary_cta_href" varchar NOT NULL,
  	"hero_primary_cta_open_in_new_tab" boolean DEFAULT false,
  	"hero_secondary_cta_href" varchar NOT NULL,
  	"hero_secondary_cta_open_in_new_tab" boolean DEFAULT false,
  	"hero_portrait_id" integer,
  	"about_enabled" boolean DEFAULT true NOT NULL,
  	"about_order" numeric DEFAULT 1 NOT NULL,
  	"skills_enabled" boolean DEFAULT true NOT NULL,
  	"skills_order" numeric DEFAULT 1 NOT NULL,
  	"experience_enabled" boolean DEFAULT true NOT NULL,
  	"experience_order" numeric DEFAULT 1 NOT NULL,
  	"projects_enabled" boolean DEFAULT true NOT NULL,
  	"projects_order" numeric DEFAULT 1 NOT NULL,
  	"testimonials_enabled" boolean DEFAULT true NOT NULL,
  	"testimonials_order" numeric DEFAULT 1 NOT NULL,
  	"preferences_enabled" boolean DEFAULT true NOT NULL,
  	"preferences_order" numeric DEFAULT 1 NOT NULL,
  	"faq_enabled" boolean DEFAULT true NOT NULL,
  	"faq_order" numeric DEFAULT 1 NOT NULL,
  	"contact_enabled" boolean DEFAULT true NOT NULL,
  	"contact_order" numeric DEFAULT 1 NOT NULL,
  	"footer_enabled" boolean DEFAULT true NOT NULL,
  	"footer_order" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_name" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"hero_primary_cta_label" varchar NOT NULL,
  	"hero_secondary_cta_label" varchar NOT NULL,
  	"hero_portrait_label" varchar,
  	"about_title" varchar NOT NULL,
  	"about_body" varchar NOT NULL,
  	"skills_title" varchar NOT NULL,
  	"skills_subtitle" varchar NOT NULL,
  	"experience_title" varchar NOT NULL,
  	"experience_subtitle" varchar NOT NULL,
  	"projects_title" varchar NOT NULL,
  	"testimonials_title" varchar NOT NULL,
  	"testimonials_subtitle" varchar NOT NULL,
  	"testimonials_signal_title" varchar,
  	"testimonials_signal_body" varchar,
  	"preferences_title" varchar NOT NULL,
  	"faq_title" varchar NOT NULL,
  	"contact_title" varchar NOT NULL,
  	"contact_description" varchar NOT NULL,
  	"contact_form_title" varchar NOT NULL,
  	"contact_form_description" varchar NOT NULL,
  	"contact_privacy_text" varchar NOT NULL,
  	"footer_copyright" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skill_groups_id" integer,
  	"experience_items_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_items_locales" ADD CONSTRAINT "experience_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skill_groups" ADD CONSTRAINT "skill_groups_attachment_image_id_media_id_fk" FOREIGN KEY ("attachment_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skill_groups_locales" ADD CONSTRAINT "skill_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skill_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experience_items_fk" FOREIGN KEY ("experience_items_id") REFERENCES "public"."experience_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skill_groups_fk" FOREIGN KEY ("skill_groups_id") REFERENCES "public"."skill_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submissions_fk" FOREIGN KEY ("submissions_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_items" ADD CONSTRAINT "site_settings_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_items_locales" ADD CONSTRAINT "site_settings_contact_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_contact_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links_locales" ADD CONSTRAINT "site_settings_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_s_e_o_og_image_id_media_id_fk" FOREIGN KEY ("default_s_e_o_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_facts" ADD CONSTRAINT "home_page_hero_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_facts_locales" ADD CONSTRAINT "home_page_hero_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_principles" ADD CONSTRAINT "home_page_about_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_principles_locales" ADD CONSTRAINT "home_page_about_principles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_about_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_stats" ADD CONSTRAINT "home_page_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_stats_locales" ADD CONSTRAINT "home_page_about_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_about_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_preferences_items" ADD CONSTRAINT "home_page_preferences_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_preferences_items_locales" ADD CONSTRAINT "home_page_preferences_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_preferences_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_faq_items" ADD CONSTRAINT "home_page_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_faq_items_locales" ADD CONSTRAINT "home_page_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_contact_methods" ADD CONSTRAINT "home_page_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_contact_methods_locales" ADD CONSTRAINT "home_page_contact_methods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_contact_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_links" ADD CONSTRAINT "home_page_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_links_locales" ADD CONSTRAINT "home_page_footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_portrait_id_media_id_fk" FOREIGN KEY ("hero_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_skill_groups_fk" FOREIGN KEY ("skill_groups_id") REFERENCES "public"."skill_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_experience_items_fk" FOREIGN KEY ("experience_items_id") REFERENCES "public"."experience_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_image_idx" ON "projects" USING btree ("image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experience_items_updated_at_idx" ON "experience_items" USING btree ("updated_at");
  CREATE INDEX "experience_items_created_at_idx" ON "experience_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "experience_items_locales_locale_parent_id_unique" ON "experience_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "skill_groups_attachment_image_idx" ON "skill_groups" USING btree ("attachment_image_id");
  CREATE INDEX "skill_groups_updated_at_idx" ON "skill_groups" USING btree ("updated_at");
  CREATE INDEX "skill_groups_created_at_idx" ON "skill_groups" USING btree ("created_at");
  CREATE UNIQUE INDEX "skill_groups_locales_locale_parent_id_unique" ON "skill_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "submissions_updated_at_idx" ON "submissions" USING btree ("updated_at");
  CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_experience_items_id_idx" ON "payload_locked_documents_rels" USING btree ("experience_items_id");
  CREATE INDEX "payload_locked_documents_rels_skill_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("skill_groups_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_contact_items_order_idx" ON "site_settings_contact_items" USING btree ("_order");
  CREATE INDEX "site_settings_contact_items_parent_id_idx" ON "site_settings_contact_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_contact_items_locales_locale_parent_id_unique" ON "site_settings_contact_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_icon_idx" ON "site_settings_social_links" USING btree ("icon_id");
  CREATE UNIQUE INDEX "site_settings_social_links_locales_locale_parent_id_unique" ON "site_settings_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_default_s_e_o_default_s_e_o_og_image_idx" ON "site_settings" USING btree ("default_s_e_o_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_facts_order_idx" ON "home_page_hero_facts" USING btree ("_order");
  CREATE INDEX "home_page_hero_facts_parent_id_idx" ON "home_page_hero_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_hero_facts_locales_locale_parent_id_unique" ON "home_page_hero_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_about_principles_order_idx" ON "home_page_about_principles" USING btree ("_order");
  CREATE INDEX "home_page_about_principles_parent_id_idx" ON "home_page_about_principles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_about_principles_locales_locale_parent_id_unique" ON "home_page_about_principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_about_stats_order_idx" ON "home_page_about_stats" USING btree ("_order");
  CREATE INDEX "home_page_about_stats_parent_id_idx" ON "home_page_about_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_about_stats_locales_locale_parent_id_unique" ON "home_page_about_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_preferences_items_order_idx" ON "home_page_preferences_items" USING btree ("_order");
  CREATE INDEX "home_page_preferences_items_parent_id_idx" ON "home_page_preferences_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_preferences_items_locales_locale_parent_id_unique" ON "home_page_preferences_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_faq_items_order_idx" ON "home_page_faq_items" USING btree ("_order");
  CREATE INDEX "home_page_faq_items_parent_id_idx" ON "home_page_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_faq_items_locales_locale_parent_id_unique" ON "home_page_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_contact_methods_order_idx" ON "home_page_contact_methods" USING btree ("_order");
  CREATE INDEX "home_page_contact_methods_parent_id_idx" ON "home_page_contact_methods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_contact_methods_locales_locale_parent_id_unique" ON "home_page_contact_methods_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_footer_links_order_idx" ON "home_page_footer_links" USING btree ("_order");
  CREATE INDEX "home_page_footer_links_parent_id_idx" ON "home_page_footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_footer_links_locales_locale_parent_id_unique" ON "home_page_footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_hero_portrait_idx" ON "home_page" USING btree ("hero_portrait_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_skill_groups_id_idx" ON "home_page_rels" USING btree ("skill_groups_id");
  CREATE INDEX "home_page_rels_experience_items_id_idx" ON "home_page_rels" USING btree ("experience_items_id");
  CREATE INDEX "home_page_rels_projects_id_idx" ON "home_page_rels" USING btree ("projects_id");
  CREATE INDEX "home_page_rels_testimonials_id_idx" ON "home_page_rels" USING btree ("testimonials_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "experience_items" CASCADE;
  DROP TABLE "experience_items_locales" CASCADE;
  DROP TABLE "skill_groups" CASCADE;
  DROP TABLE "skill_groups_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_contact_items" CASCADE;
  DROP TABLE "site_settings_contact_items_locales" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_social_links_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "home_page_hero_facts" CASCADE;
  DROP TABLE "home_page_hero_facts_locales" CASCADE;
  DROP TABLE "home_page_about_principles" CASCADE;
  DROP TABLE "home_page_about_principles_locales" CASCADE;
  DROP TABLE "home_page_about_stats" CASCADE;
  DROP TABLE "home_page_about_stats_locales" CASCADE;
  DROP TABLE "home_page_preferences_items" CASCADE;
  DROP TABLE "home_page_preferences_items_locales" CASCADE;
  DROP TABLE "home_page_faq_items" CASCADE;
  DROP TABLE "home_page_faq_items_locales" CASCADE;
  DROP TABLE "home_page_contact_methods" CASCADE;
  DROP TABLE "home_page_contact_methods_locales" CASCADE;
  DROP TABLE "home_page_footer_links" CASCADE;
  DROP TABLE "home_page_footer_links_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_submissions_status";`)
}
