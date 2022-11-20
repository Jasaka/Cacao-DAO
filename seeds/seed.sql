-- Create Tables
CREATE TABLE IF NOT EXISTS "users"
(
    "id"     uuid NOT NULL,
    "name"   text NOT NULL,
    "secret" text NOT NULL,
    "wallet" text,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "proposals"
(
    "id"            uuid NOT NULL,
    "title"         text NOT NULL,
    "description"   text NOT NULL,
    "author"        uuid NOT NULL,
    "currentHash"   text NOT NULL,
    "predictedCost" numeric,
    "upvotes"       numeric,
    "downvotes"     numeric,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "proposalFlags"
(
    "id"             uuid    NOT NULL,
    "reason"         text    NOT NULL,
    "author"         uuid    NOT NULL,
    "authorIsPublic" boolean NOT NULL,
    "proposalHash"   text    NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "versionHistory"
(
    "hash"       text      NOT NULL,
    "timestamp"  timestamp NOT NULL,
    "arweaveId"  text      NOT NULL,
    "proposalId" uuid      NOT NULL,

    PRIMARY KEY ("hash")
);

CREATE TABLE IF NOT EXISTS "openSession"
(
    "token"   text      NOT NULL,
    "userId"  uuid      NOT NULL,
    "expires" timestamp NOT NULL,

    PRIMARY KEY ("token")
);

CREATE TABLE IF NOT EXISTS "projects"
(
    "id"           uuid NOT NULL,
    "proposalHash" text NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "productManagers"
(
    "userId" uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS "navigation"
(
    "label"        text    NOT NULL,
    "url"          text    NOT NULL,
    "order"        numeric NOT NULL,
    "onlyLoggedIn" boolean NOT NULL
);

ALTER TABLE "proposals"
    ADD FOREIGN KEY ("author") REFERENCES "users" ("id"),
    ADD FOREIGN KEY ("currentHash") REFERENCES "versionHistory" ("hash");

ALTER TABLE "proposalFlags"
    ADD FOREIGN KEY ("author") REFERENCES "users" ("id");

ALTER TABLE "versionHistory"
    ADD FOREIGN KEY ("proposalId") REFERENCES "proposals" ("id");

ALTER TABLE "openSession"
    ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "projects"
    ADD FOREIGN KEY ("proposalHash") REFERENCES "versionHistory" ("hash");

ALTER TABLE "productManagers"
    ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

-- Seed Data
