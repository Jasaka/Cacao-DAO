-- Create Tables
CREATE TABLE IF NOT EXISTS "users"
(
    "id"             uuid NOT NULL DEFAULT gen_random_uuid(),
    "name"           text NOT NULL,
    "secret"         text NOT NULL,
    "wallet"         text,
    "profilePicture" uuid,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "files"
(
    "id"            uuid  NOT NULL DEFAULT gen_random_uuid(),
    "file"          bytea NOT NULL,
    "fileName"      text  NOT NULL,
    "encoding"      text  NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "proposals"
(
    "id"            uuid    NOT NULL DEFAULT gen_random_uuid(),
    "title"         text    NOT NULL,
    "description"   text    NOT NULL,
    "author"        uuid    NOT NULL,
    "currentHash"   text    NOT NULL,
    "predictedCost" numeric DEFAULT 0,
    "upVotes"       numeric DEFAULT 0,
    "downVotes"     numeric DEFAULT 0,
    "status"        numeric NOT NULL,
    "cycleId"       text    NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "proposalStates"
(
    "id"    numeric NOT NULL,
    "state" text    NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "cycles"
(
    "cycleHash" text                     NOT NULL,
    "status"    numeric                  NOT NULL,
    "startDate" timestamp with time zone NOT NULL DEFAULT now(),
    "endDate"   timestamp with time zone,

    PRIMARY KEY ("cycleHash")
);

CREATE TABLE IF NOT EXISTS "cycleStates"
(
    "id"    numeric NOT NULL,
    "state" text    NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "proposalFlags"
(
    "id"             uuid    NOT NULL DEFAULT gen_random_uuid(),
    "reason"         text    NOT NULL,
    "author"         uuid    NOT NULL,
    "authorIsPublic" boolean NOT NULL DEFAULT false,
    "proposalHash"   text    NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "versionHistory"
(
    "hash"       text      NOT NULL,
    "timestamp"  timestamp NOT NULL DEFAULT now(),
    "arweaveId"  text      NOT NULL,
    "proposalId" uuid      NOT NULL,

    PRIMARY KEY ("hash")
);

CREATE TABLE IF NOT EXISTS "openSessions"
(
    "token"   text      NOT NULL,
    "userId"  uuid      NOT NULL,
    "expires" timestamp NOT NULL,

    PRIMARY KEY ("token")
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
    "onlyLoggedIn" boolean NOT NULL DEFAULT false,
    "onlyAdmin"    boolean NOT NULL DEFAULT false
);

ALTER TABLE "users"
    ADD FOREIGN KEY ("profilePicture") REFERENCES "files" ("id");

ALTER TABLE "proposals"
    ADD FOREIGN KEY ("author") REFERENCES "users" ("id"),
    ADD FOREIGN KEY ("currentHash") REFERENCES "versionHistory" ("hash"),
    ADD FOREIGN KEY ("status") REFERENCES "proposalStates" ("id"),
    ADD FOREIGN KEY ("cycleId") REFERENCES "cycles" ("cycleHash");

ALTER TABLE "cycles"
    ADD FOREIGN KEY ("status") REFERENCES "cycleStates" ("id");

ALTER TABLE "proposalFlags"
    ADD FOREIGN KEY ("author") REFERENCES "users" ("id");

ALTER TABLE "versionHistory"
    ADD FOREIGN KEY ("proposalId") REFERENCES "proposals" ("id");

ALTER TABLE "openSessions"
    ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "productManagers"
    ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

-- Seed Data
INSERT INTO "proposalStates" ("id", "state")
VALUES (1, 'Editable'),
       (2, 'Finalized');

INSERT INTO "cycleStates" ("id", "state")
VALUES (0, 'Collecting Proposals'),
       (1, 'Active Voting'),
       (2, 'Ended'),
       (3, 'Extension Needed');

INSERT INTO "navigation" ("label", "url", "order", "onlyLoggedIn", "onlyAdmin")
VALUES ('Home', '/', 1, false, false),
       ('Login', '/login', 2, false, false),
       ('Townsquare', '/townsquare', 1, true, false),
       ('Proposals', '/proposals', 2, true, false),
       ('Voting', '/voting', 3, true, false),
       ('Decisions', '/wallet', 4, true, false),
       ('Admin', '/admin', 5, true, true);

INSERT INTO "users" ("id", "name", "secret", "wallet")
VALUES ('00000000-0000-0000-0000-000000000000', 'Admin', 'cacao_admin_dao', 'admin');

INSERT INTO "productManagers" ("userId")
VALUES ('00000000-0000-0000-0000-000000000000');