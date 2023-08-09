SET client_min_messages TO WARNING;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
DROP SCHEMA "public" CASCADE;

CREATE SCHEMA "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL UNIQUE,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."entries" (
	"entryId" serial NOT NULL UNIQUE,
	"userId" integer NOT NULL,
	"title" TEXT NOT NULL,
	"subtitle" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"body" TEXT NOT NULL,
	"date" TIMESTAMP DEFAULT now() NOT NULL,
  "photoURL" TEXT NOT NULL,
	"photoAlt" TEXT NOT NULL,
	"photoAuthor" TEXT NOT NULL,
	"photoAuthorLink" TEXT NOT NULL,
	CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."savedEntries" (
	"saveId" serial NOT NULL UNIQUE,
	"userId" integer NOT NULL,
	"entryId" integer NOT NULL,
	CONSTRAINT "saved_entries_pk" PRIMARY KEY ("saveId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."follows" (
	"followId" serial NOT NULL UNIQUE,
	"followerId" integer NOT NULL,
	"followedId" integer NOT NULL,
	CONSTRAINT "follows_pk" PRIMARY KEY ("followId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."likes" (
	"likeId" serial NOT NULL UNIQUE,
	"userId" integer NOT NULL,
	"entryId" integer NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("likeId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "savedEntries" ADD CONSTRAINT "savedEntries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "savedEntries" ADD CONSTRAINT "savedEntries_fk1" FOREIGN KEY ("entryId") REFERENCES "entries"("entryId");

ALTER TABLE "follows" ADD CONSTRAINT "follows_fk0" FOREIGN KEY ("followerId") REFERENCES "users"("userId");
ALTER TABLE "follows" ADD CONSTRAINT "follows_fk1" FOREIGN KEY ("followedId") REFERENCES "users"("userId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("entryId") REFERENCES "entries"("entryId");
