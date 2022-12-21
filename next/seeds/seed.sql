-- Create Tables
CREATE TABLE IF NOT EXISTS "users"
(
    "id"       uuid    NOT NULL DEFAULT gen_random_uuid(),
    "walletId" text    NOT NULL UNIQUE,
    "name"     text,
    "imageURL" text,
    "role"     numeric NOT NULL DEFAULT 1,
    "email"    text,
    "about"    text,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "proposals"
(
    "id"            uuid    NOT NULL DEFAULT gen_random_uuid(),
    "title"         text    NOT NULL,
    "description"   text    NOT NULL,
    "authorId"      uuid    NOT NULL,
    "currentHash"   text    NOT NULL,
    "predictedCost" numeric          DEFAULT 0,
    "status"        numeric NOT NULL,
    "cycleId"       text    NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "votes"
(
    "id"         uuid    NOT NULL DEFAULT gen_random_uuid(),
    "proposalId" uuid    NOT NULL,
    "voterId"    uuid    NOT NULL,
    "voteValue"  numeric NOT NULL,
    "cycleId"    text    NOT NULL,

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
    "cycleId"          text                     NOT NULL,
    "status"           numeric                  NOT NULL,
    "startDate"        timestamp with time zone NOT NULL DEFAULT now(),
    "proposingEndDate" timestamp with time zone,
    "votingEndDate"    timestamp with time zone,

    PRIMARY KEY ("cycleId")
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
    "authorId"       uuid    NOT NULL,
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

CREATE TABLE IF NOT EXISTS "roles"
(
    "id"   numeric NOT NULL,
    "role" text    NOT NULL,

    PRIMARY KEY ("id")
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
    ADD FOREIGN KEY ("role") REFERENCES "roles" ("id");

ALTER TABLE "proposals"
    ADD FOREIGN KEY ("authorId") REFERENCES "users" ("id"),
    ADD FOREIGN KEY ("currentHash") REFERENCES "versionHistory" ("hash"),
    ADD FOREIGN KEY ("status") REFERENCES "proposalStates" ("id"),
    ADD FOREIGN KEY ("cycleId") REFERENCES "cycles" ("cycleId");

ALTER TABLE "cycles"
    ADD FOREIGN KEY ("status") REFERENCES "cycleStates" ("id");

ALTER TABLE "votes"
    ADD FOREIGN KEY ("proposalId") REFERENCES "proposals" ("id"),
    ADD FOREIGN KEY ("voterId") REFERENCES "users" ("id"),
    ADD FOREIGN KEY ("cycleId") REFERENCES "cycles" ("cycleId");

ALTER TABLE "proposalFlags"
    ADD FOREIGN KEY ("authorId") REFERENCES "users" ("id");

ALTER TABLE "versionHistory"
    ADD FOREIGN KEY ("proposalId") REFERENCES "proposals" ("id");

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
       ('FAQ', '/faq', 2, false, false),
       ('Townsquare', '/townsquare', 1, true, false),
       ('Proposals', '/proposals', 2, true, false),
       ('Voting', '/voting', 3, true, false),
       ('Decisions', '/decisions', 4, true, false),
       ('FAQ', '/faq', 5, true, false),
       ('Admin', '/admin', 6, true, true);

INSERT INTO "roles" ("id", "role")
VALUES (1, 'User'),
       (2, 'Admin');

INSERT INTO "users" ("walletId", "name", "imageURL", "role")
VALUES ('0x227c44A7FE766501381B51e8b5770094c6c6EA28', 'Jan Samak',
        'https://avatars.githubusercontent.com/u/9197608?v=4', 2);