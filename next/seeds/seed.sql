-- Create Tables
CREATE TABLE IF NOT EXISTS "users"
(
    "id"       uuid    NOT NULL DEFAULT gen_random_uuid(),
    "walletId" text    NOT NULL UNIQUE,
    "name"     text,
    "imageUrl" text,
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
    "status"        numeric NOT NULL DEFAULT 2,
    "cycleId"       text    NOT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "votes"
(
    "id"         uuid    NOT NULL DEFAULT gen_random_uuid(),
    "proposalId" uuid    NOT NULL,
    "voterId"    uuid    NOT NULL,
    "voteValue"  numeric NOT NULL DEFAULT 0,
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
    "proposalId" uuid      NOT NULL
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
       (2, 'Finalized'),
       (3, 'Taken Back');

INSERT INTO "cycleStates" ("id", "state")
VALUES (0, 'Collecting Proposals'),
       (1, 'Active Voting'),
       (2, 'Ended'),
       (3, 'Extension Needed');

INSERT INTO "navigation" ("label", "url", "order", "onlyLoggedIn", "onlyAdmin")
VALUES ('Home', '/', 1, false, false),
       ('FAQ', '/faq', 2, false, false),
       ('Townsquare', '/', 1, true, false),
       ('Proposals', '/proposals', 2, true, false),
       ('Voting', '/voting', 3, true, false),
       ('Decisions', '/decisions', 4, true, false),
       ('FAQ', '/faq', 5, true, false),
       ('Admin', '/admin', 6, true, true);

INSERT INTO "roles" ("id", "role")
VALUES (1, 'User'),
       (2, 'Admin');


-- Default start Cycle
INSERT INTO "cycles" ("cycleId", "status", "proposingEndDate", "votingEndDate")
VALUES ('0xda39a3ee5e6b4b0d3255bfef95601890afd80709', 0, now() + interval '7 day', now() + interval '14 day');


-- DEMO SEEDS
-- Example Data Admins
INSERT INTO "users" ("id", "walletId", "name", "imageUrl", "role", "email", "about")
VALUES ('320e6f30-d749-41f5-815f-14174ca8b95e', '0x227c44A7FE766501381B51e8b5770094c6c6EA28', 'Jan Samak',
        'https://avatars.githubusercontent.com/u/9197608?v=4', 2, 'kontakt@jan-samak.de',
        'Technical Lead at CacaoDao. Fullstack developer. Blockchain sceptic. I love to build things that matter.'),
       ('57b57183-a5c7-405f-a880-3073ac9b5df4', '0x0405dCFde04AB18F8cc3F89AfF3A757132a23301', 'Anthony Aaflatoun',
        'https://cdn.discordapp.com/avatars/537982776830459964/79030607a8e24f78ff1e532ac441927b.webp', 2,
        'anthony@cacao-dao.org', 'Hour 0 member of CacaoDao. The visonary. Public good advocate.'),
       ('ca7b7495-4a00-4caf-b381-6dd698bc3dbf', '0x74F9bd959acD22E9ed7Ca6692C6734Ec39107056', 'Christian Schwind',
        'https://cdn.discordapp.com/avatars/699917115888631859/37714219a8202ede84a7397847a12484.webp', 2,
        'christian@cacao-dao.org', 'Hour 0 member of CacaoDao. The thinker and sceptic.'),
       ('4a7aae7e-3668-4d94-a3d7-88f71548fdf2', '0xe547683070844852FdEe46012530a4a2A0991028', 'Michel Heimes',
        'https://cdn.discordapp.com/avatars/441292712176648202/15f7bc93076005062bc70894102f04b6.webp', 2,
        'michel@cacao-dao.org', 'Marketing Guru. The one who brings things together.');

-- Example Data Users
INSERT INTO "users" ("id", "walletId", "name", "about")
VALUES ('ac5519d2-e669-4360-bb09-31e0a8adf724', '0x876c44A7FE766501381B51e8b5770094c6c6EA24', 'Nadia al Taaifiya',
        'I am an environmental activist, my profession is civil engineering. Help me make Egypt cleaner.'),
       ('b768a303-044b-4db6-b902-ca5b756c2949', '0x915c44A7FE766501381B51e8b5770094c6c6EA23', 'Florian Schuhmacher',
        'I am a digital nomad, currently based in Portugal. I work as an IT-contractor and am looking to help you build sustainable systems.');

-- Example Cycles
INSERT INTO "cycles" ("cycleId", "status", "startDate", "proposingEndDate", "votingEndDate")
VALUES ('0x0da39a3ee5e6b4b0d3255bfef95601890afd8070', 2, now() - interval '14 day', now() - interval '7 day', now()),
       ('0x1da39a3ee5e6b4b0d3255bfef95601890afd8070', 2, now() - interval '28 day', now() - interval '21 day',
        now() - interval '14 day'),
       ('0x2da39a3ee5e6b4b0d3255bfef95601890afd8070', 2, now() - interval '42 day', now() - interval '35 day',
        now() - interval '28 day');

-- Example Data Proposals
INSERT INTO proposals ("id", "title", "description", "authorId", "currentHash", "predictedCost", "status", "cycleId")
        -- Current Cycle
VALUES ('99f22d56-f077-400e-a4b5-d54c54601935', 'Integration of Automatic Contract Execution for Funded Proposals',
        'This proposal aims to add a feature that automatically executes approved proposals using assigned contractors and funds, streamlining the implementation process.',
        'ca7b7495-4a00-4caf-b381-6dd698bc3dbf', '7d1ff685f241b17d3cb37b74f251220a98c45d77eca6df8058a6e5050877e38c',
        6000, 1, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       ('d0af5de7-fb2e-4669-9be1-ce0d78e956d1',
        'Introduction of a Moderation System for Proposal Submission and Review',
        'This proposal suggests implementing a moderation system to ensure that submitted proposals meet certain standards and guidelines before being made available for voting.',
        '57b57183-a5c7-405f-a880-3073ac9b5df4', '6e8196a6aaa50b88dfd33d7734b9f4b04cde96e911267552cac698b09540c472',
        2400, 2, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       ('b91f247b-4618-4658-93bb-c05b025063a8', 'Enhancing Security Measures to Protect User Funds and Votes',
        'This proposal aims to improve the security of the platform by implementing additional measures to protect user funds and votes from potential threats.',
        '320e6f30-d749-41f5-815f-14174ca8b95e', '93d13ea1905b845bf96d9be7767eff4c08f39fa76d1e79f33bf78fb3021b285f',
        2800, 1, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       ('0dc557ef-7b05-4003-8ab8-0ccb0adec340', 'Enabling Customizable Notification Settings for Users',
        'This proposal suggests adding the ability for users to customize their notification settings, allowing them to choose which updates and alerts they receive.',
        '320e6f30-d749-41f5-815f-14174ca8b95e', '0dfb5a7d5c9491018c9fd35d63dad35e1c76696a5feccca04b4a7382bfde6df7', 800,
        2, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       ('4bbcf0bc-3aff-4edc-88c8-6612ecff5006', 'Expanding the Range of Proposal Categories and Tags',
        'This proposal aims to increase the organization and discoverability of proposals by introducing additional categories and tags.',
        '320e6f30-d749-41f5-815f-14174ca8b95e', 'b3aca878c2c6a6d7f7251613c5a32e1ad9fc0c34151b0617755b595416f1e9ac', 200,
        2, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       ('e3d13ff2-9dc1-49ca-b3c7-640f90055330', 'Implementing a Reputation System for Proposal Submitters',
        'This proposal suggests introducing a reputation system that rewards active and high-quality proposal submitters.',
        '57b57183-a5c7-405f-a880-3073ac9b5df4', 'e2391ac6aa1b0bcb44201f16bda5736592e8e5b866717101a1978c21fe4eece2',
        1500, 2, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       ('45eaa814-812a-4628-954d-fa0af86b9b4d', 'Introducing a Reward System for Active Community Members',
        'This proposal suggests implementing a reward system to recognize and incentivize active participation in the community.',
        '4a7aae7e-3668-4d94-a3d7-88f71548fdf2', '970d2cd29a69213ccabe3a85b8f129a386373881042a473a5a4ae8c9fd99ccec',
        1500, 2, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       ('00293a5c-e5dc-4ba9-b66d-ff56c5114cb4', 'Adding Multilingual Support for a Global User Base',
        'This proposal aims to make the platform more accessible to a global audience by adding support for multiple languages.',
        'ac5519d2-e669-4360-bb09-31e0a8adf724', 'a4ac1fd738f7c1478b39829fc6ab89b960d12647cbec359b386a82c87a3e57ea', 300,
        2, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       ('11862e01-13c9-49b8-a439-efec1e365b59', 'Creating a Knowledge Base and Support System for New Users',
        'This proposal suggests building a knowledge base and support system to help new users get up to speed and troubleshoot any issues they may encounter.',
        'b768a303-044b-4db6-b902-ca5b756c2949', 'b309fce77a95100eacedc3ba8b20fef446051dec8acd3670120675a56721be41',
        2000, 1, '0xda39a3ee5e6b4b0d3255bfef95601890afd80709'),
       -- Third Cycle
       ('b292c5bc-dd03-461e-b147-e0b51ef1dcdc', 'Adding Support for Multiple Ethereum-Based Chains',
        'This proposal suggests expanding the platform to support multiple Ethereum-based chains, increasing its flexibility and reach.',
        '57b57183-a5c7-405f-a880-3073ac9b5df4', 'b19f632f94e4825eac99ac5347bed1b4ad0f213c6b913a60c5054804917c445c', 200,
        2, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415', 'Developing a Mobile App for Convenient Access to the Platform',
        'This proposal aims to create a mobile app version of the platform to provide users with convenient access on-the-go.',
        '4a7aae7e-3668-4d94-a3d7-88f71548fdf2', '3a610cde3cb79810ebee7b863c37ba797b9ba9ee52fd4fc75ec47f62d0184eff',
        5000, 2, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       -- Second Cycle
       ('89e73ff0-7b39-4ca1-9ff4-87451ad00a27', 'Updating the Smart Contract to Support Additional Voting Options',
        'This proposal aims to enhance the voting system by updating the smart contract to support additional voting options.',
        'ca7b7495-4a00-4caf-b381-6dd698bc3dbf', '2036344410e314f52bb6c4bec60cbb660a3368a6250ba105774166bdc8f07300',
        1000, 2, '0x1da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       -- First Cycle
       ('9cb9ec38-f67e-4444-aa5f-84529e528e8a', 'Implementation of a User-Friendly Signup Process for New Members',
        'This proposal suggests redesigning the signup process to make it more intuitive and easier for new users to join the platform.',
        '320e6f30-d749-41f5-815f-14174ca8b95e', 'f7f6b13161da96210c1f37e07fb2a3f436f908ad88f239fee9a5178e77fd5b7d', 700,
        2, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('089d8f64-2249-4a6c-89d9-249945c85a67',
        'Designing a More Intuitive Interface for Submitting and Voting on Proposals',
        'This proposal aims to improve the user experience by creating a more user-friendly interface for submitting and voting on proposals.',
        '4a7aae7e-3668-4d94-a3d7-88f71548fdf2', '08efd4a71643acec31ac765dc94ab33aba5628db8138acf0ec77f950b804bcae', 600,
        2, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070');

-- Example Data History Inserts
INSERT INTO "versionHistory" ("hash", "arweaveId", "proposalId")
VALUES ('7d1ff685f241b17d3cb37b74f251220a98c45d77eca6df8058a6e5050877e38c',
        '5hV6wJhZtYX-gYEo0xWu32YCv7lvhW9iiYe8pC-MAqg', '99f22d56-f077-400e-a4b5-d54c54601935'),
       ('f7f6b13161da96210c1f37e07fb2a3f436f908ad88f239fee9a5178e77fd5b7d',
        'H4RsrMqYYMF_F16dBezMSSgT6LrYQK03SLmovUsi5hw', '9cb9ec38-f67e-4444-aa5f-84529e528e8a'),
       ('08efd4a71643acec31ac765dc94ab33aba5628db8138acf0ec77f950b804bcae',
        'UbGwaRqYIuK6mZ1wMxmHI2msz5WsPlnHNIP0NrFvczU', '089d8f64-2249-4a6c-89d9-249945c85a67'),
       ('b19f632f94e4825eac99ac5347bed1b4ad0f213c6b913a60c5054804917c445c',
        'BbD731etfC4OqPfzBVGzmVIE7leMzVEm5zakTCSN8lw', 'b292c5bc-dd03-461e-b147-e0b51ef1dcdc'),
       ('3a610cde3cb79810ebee7b863c37ba797b9ba9ee52fd4fc75ec47f62d0184eff',
        '88rBNtNyHf48T7c_zVv0m8Z2BJpirJcJ2iFEeLwRGnc', '3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415'),
       ('6e8196a6aaa50b88dfd33d7734b9f4b04cde96e911267552cac698b09540c472',
        'LMPhIN3LKtLBjFgRFcO4CeoERJc-H3WZoUFSWzuqsr0', 'd0af5de7-fb2e-4669-9be1-ce0d78e956d1'),
       ('93d13ea1905b845bf96d9be7767eff4c08f39fa76d1e79f33bf78fb3021b285f',
        'YEjK57rfM0Q7KLMpf4W5V7cmkmrBgvy9MxZs1jJydss', 'b91f247b-4618-4658-93bb-c05b025063a8'),
       ('0dfb5a7d5c9491018c9fd35d63dad35e1c76696a5feccca04b4a7382bfde6df7',
        'SoF3btLtLJnqp98bLWArL98umYbKT_LggZjy53Ki7hU', '0dc557ef-7b05-4003-8ab8-0ccb0adec340'),
       ('b3aca878c2c6a6d7f7251613c5a32e1ad9fc0c34151b0617755b595416f1e9ac',
        'nRdzUe62d5FJn4-Z2jMv8XcGwwx2zYYE-W3DErbMxcg', '4bbcf0bc-3aff-4edc-88c8-6612ecff5006'),
       ('e2391ac6aa1b0bcb44201f16bda5736592e8e5b866717101a1978c21fe4eece2',
        'JH7zzQxxGyR6x_gTM4Cn7rOG7eT7Ofs7UAJTwvRdtnI', 'e3d13ff2-9dc1-49ca-b3c7-640f90055330'),
       ('2036344410e314f52bb6c4bec60cbb660a3368a6250ba105774166bdc8f07300',
        'uQz81b2u-9BYfPW7CJJvI_P795Jz4Rk_S_PzOji-M9s', '89e73ff0-7b39-4ca1-9ff4-87451ad00a27'),
       ('970d2cd29a69213ccabe3a85b8f129a386373881042a473a5a4ae8c9fd99ccec',
        'EhSu8Mf6FPEFwlkcOQ_LpvEJfnm5up01rFcC0jgT7ME', '45eaa814-812a-4628-954d-fa0af86b9b4d'),
       ('a4ac1fd738f7c1478b39829fc6ab89b960d12647cbec359b386a82c87a3e57ea',
        'FRlGuiF4vjGxjmQ68hLaKl0XUN4d1Ow8_b7Xyu0vAxA', '00293a5c-e5dc-4ba9-b66d-ff56c5114cb4'),
       ('b309fce77a95100eacedc3ba8b20fef446051dec8acd3670120675a56721be41',
        '5kcCta9I0GRZmBV1zX_zDll2BPbvJJsz8omICwXVqCg', '11862e01-13c9-49b8-a439-efec1e365b59');

-- Example Data Flags
INSERT INTO "proposalFlags" ("reason", "authorId", "authorIsPublic", "proposalHash")
VALUES ('This is already implemented!', '320e6f30-d749-41f5-815f-14174ca8b95e',
        true, 'b19f632f94e4825eac99ac5347bed1b4ad0f213c6b913a60c5054804917c445c'),
       ('This might seriously harm the decentralization idea behind Cacao DAO.', '57b57183-a5c7-405f-a880-3073ac9b5df4',
        false, '6e8196a6aaa50b88dfd33d7734b9f4b04cde96e911267552cac698b09540c472');

-- Example Data Votes
-- ('', '', 0, '')
INSERT INTO votes ("proposalId", "voterId", "voteValue", "cycleId")
        -- First Cycle
VALUES ('9cb9ec38-f67e-4444-aa5f-84529e528e8a', '320e6f30-d749-41f5-815f-14174ca8b95e', 7, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('9cb9ec38-f67e-4444-aa5f-84529e528e8a', '57b57183-a5c7-405f-a880-3073ac9b5df4', 7, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('9cb9ec38-f67e-4444-aa5f-84529e528e8a', 'ca7b7495-4a00-4caf-b381-6dd698bc3dbf', 7, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('9cb9ec38-f67e-4444-aa5f-84529e528e8a', '4a7aae7e-3668-4d94-a3d7-88f71548fdf2', 8, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('089d8f64-2249-4a6c-89d9-249945c85a67', '320e6f30-d749-41f5-815f-14174ca8b95e', 7, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('089d8f64-2249-4a6c-89d9-249945c85a67', '57b57183-a5c7-405f-a880-3073ac9b5df4', 7, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('089d8f64-2249-4a6c-89d9-249945c85a67', 'ca7b7495-4a00-4caf-b381-6dd698bc3dbf', 7, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('089d8f64-2249-4a6c-89d9-249945c85a67', '4a7aae7e-3668-4d94-a3d7-88f71548fdf2', 5, '0x2da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       -- Second Cycle
       ('89e73ff0-7b39-4ca1-9ff4-87451ad00a27', '320e6f30-d749-41f5-815f-14174ca8b95e', -5, '0x1da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('89e73ff0-7b39-4ca1-9ff4-87451ad00a27', '57b57183-a5c7-405f-a880-3073ac9b5df4', 5, '0x1da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('89e73ff0-7b39-4ca1-9ff4-87451ad00a27', 'ca7b7495-4a00-4caf-b381-6dd698bc3dbf', 6, '0x1da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('89e73ff0-7b39-4ca1-9ff4-87451ad00a27', '4a7aae7e-3668-4d94-a3d7-88f71548fdf2', 2, '0x1da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       -- Third Cycle
       ('3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415', '320e6f30-d749-41f5-815f-14174ca8b95e', -9, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415', '57b57183-a5c7-405f-a880-3073ac9b5df4', -5, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415', 'ca7b7495-4a00-4caf-b381-6dd698bc3dbf', -2, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415', '4a7aae7e-3668-4d94-a3d7-88f71548fdf2', 5, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415', 'ac5519d2-e669-4360-bb09-31e0a8adf724', 2, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415', 'b768a303-044b-4db6-b902-ca5b756c2949', 3, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('b292c5bc-dd03-461e-b147-e0b51ef1dcdc', '320e6f30-d749-41f5-815f-14174ca8b95e', 4, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('b292c5bc-dd03-461e-b147-e0b51ef1dcdc', '57b57183-a5c7-405f-a880-3073ac9b5df4', 8, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('b292c5bc-dd03-461e-b147-e0b51ef1dcdc', 'ca7b7495-4a00-4caf-b381-6dd698bc3dbf', 9, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('b292c5bc-dd03-461e-b147-e0b51ef1dcdc', '4a7aae7e-3668-4d94-a3d7-88f71548fdf2', 8, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('b292c5bc-dd03-461e-b147-e0b51ef1dcdc', 'ac5519d2-e669-4360-bb09-31e0a8adf724', -6, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070'),
       ('b292c5bc-dd03-461e-b147-e0b51ef1dcdc', 'b768a303-044b-4db6-b902-ca5b756c2949', 9, '0x0da39a3ee5e6b4b0d3255bfef95601890afd8070');