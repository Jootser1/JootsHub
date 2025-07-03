--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: jootser1
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO jootser1;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: jootser1
--

COMMENT ON SCHEMA public IS '';


--
-- Name: AttributeKey; Type: TYPE; Schema: public; Owner: jootser1
--

CREATE TYPE public."AttributeKey" AS ENUM (
    'CITY',
    'AGE',
    'GENDER',
    'JOB',
    'ORIGIN',
    'ORIENTATION',
    'PASSIONS',
    'QUALITY',
    'FLAW',
    'BIO'
);


ALTER TYPE public."AttributeKey" OWNER TO jootser1;

--
-- Name: Difficulty; Type: TYPE; Schema: public; Owner: jootser1
--

CREATE TYPE public."Difficulty" AS ENUM (
    'EASY',
    'INTERMEDIATE',
    'HARDCORE'
);


ALTER TYPE public."Difficulty" OWNER TO jootser1;

--
-- Name: LocaleCode; Type: TYPE; Schema: public; Owner: jootser1
--

CREATE TYPE public."LocaleCode" AS ENUM (
    'fr_FR',
    'en_US'
);


ALTER TYPE public."LocaleCode" OWNER TO jootser1;

--
-- Name: MessageType; Type: TYPE; Schema: public; Owner: jootser1
--

CREATE TYPE public."MessageType" AS ENUM (
    'TEXT',
    'ANSWER'
);


ALTER TYPE public."MessageType" OWNER TO jootser1;

--
-- Name: Opinion; Type: TYPE; Schema: public; Owner: jootser1
--

CREATE TYPE public."Opinion" AS ENUM (
    'DISLIKE',
    'NEUTRAL',
    'LIKE'
);


ALTER TYPE public."Opinion" OWNER TO jootser1;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: jootser1
--

CREATE TYPE public."UserRole" AS ENUM (
    'USER',
    'LISTENER'
);


ALTER TYPE public."UserRole" OWNER TO jootser1;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Auth; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."Auth" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Auth" OWNER TO jootser1;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."Category" (
    id integer NOT NULL
);


ALTER TABLE public."Category" OWNER TO jootser1;

--
-- Name: CategoryTranslation; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."CategoryTranslation" (
    "categoryId" integer NOT NULL,
    label text NOT NULL,
    locale public."LocaleCode" DEFAULT 'fr_FR'::public."LocaleCode" NOT NULL
);


ALTER TABLE public."CategoryTranslation" OWNER TO jootser1;

--
-- Name: Conversation; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."Conversation" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    locale public."LocaleCode" DEFAULT 'fr_FR'::public."LocaleCode" NOT NULL,
    "xpPoint" integer DEFAULT 0 NOT NULL,
    difficulty public."Difficulty" DEFAULT 'INTERMEDIATE'::public."Difficulty" NOT NULL
);


ALTER TABLE public."Conversation" OWNER TO jootser1;

--
-- Name: ConversationParticipant; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."ConversationParticipant" (
    "conversationId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "hasGivenAnswer" boolean DEFAULT false NOT NULL,
    "isIcebreakerReady" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ConversationParticipant" OWNER TO jootser1;

--
-- Name: Message; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."Message" (
    id text NOT NULL,
    "senderId" text,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "conversationId" text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "editedAt" timestamp(3) without time zone,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "messageType" public."MessageType" DEFAULT 'TEXT'::public."MessageType" NOT NULL,
    "userAAnswer" text,
    "userAId" text,
    "userBAnswer" text,
    "userBId" text
);


ALTER TABLE public."Message" OWNER TO jootser1;

--
-- Name: Question; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."Question" (
    id text NOT NULL,
    "groupId" text NOT NULL,
    question text NOT NULL,
    locale public."LocaleCode" DEFAULT 'fr_FR'::public."LocaleCode" NOT NULL
);


ALTER TABLE public."Question" OWNER TO jootser1;

--
-- Name: QuestionGroup; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."QuestionGroup" (
    id text NOT NULL,
    type integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isModerated" boolean DEFAULT false NOT NULL,
    "moderatedAt" timestamp(3) without time zone,
    pinned boolean DEFAULT false NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    "authorId" text NOT NULL
);


ALTER TABLE public."QuestionGroup" OWNER TO jootser1;

--
-- Name: QuestionGroupCategory; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."QuestionGroupCategory" (
    "questionGroupId" text NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."QuestionGroupCategory" OWNER TO jootser1;

--
-- Name: QuestionOption; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."QuestionOption" (
    id text NOT NULL,
    "groupId" text NOT NULL,
    label text NOT NULL,
    "order" integer NOT NULL,
    locale public."LocaleCode" DEFAULT 'fr_FR'::public."LocaleCode" NOT NULL
);


ALTER TABLE public."QuestionOption" OWNER TO jootser1;

--
-- Name: User; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    username text NOT NULL,
    "userNumber" integer NOT NULL,
    "isOnline" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    avatar text
);


ALTER TABLE public."User" OWNER TO jootser1;

--
-- Name: UserAnswer; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."UserAnswer" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "questionGroupId" text NOT NULL,
    "questionOptionId" text NOT NULL,
    "conversationId" text,
    "answeredAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    note text,
    "isFlagged" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."UserAnswer" OWNER TO jootser1;

--
-- Name: UserAttribute; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."UserAttribute" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    key public."AttributeKey" NOT NULL,
    value text NOT NULL,
    "levelRevealed" integer NOT NULL
);


ALTER TABLE public."UserAttribute" OWNER TO jootser1;

--
-- Name: UserContact; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."UserContact" (
    "userId" text NOT NULL,
    "contactId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UserContact" OWNER TO jootser1;

--
-- Name: UserQuestionPreference; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."UserQuestionPreference" (
    "userId" text NOT NULL,
    "categoryId" integer NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userSettingsId" text,
    "Opinion" public."Opinion" DEFAULT 'NEUTRAL'::public."Opinion" NOT NULL
);


ALTER TABLE public."UserQuestionPreference" OWNER TO jootser1;

--
-- Name: UserSettings; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public."UserSettings" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "acceptedLanguages" text[] DEFAULT ARRAY['fr_FR'::text],
    "isAvailableForChat" boolean DEFAULT true NOT NULL,
    "allowInvitationsFromStrangers" boolean DEFAULT true NOT NULL,
    "Applanguage" text DEFAULT 'fr_FR'::text NOT NULL
);


ALTER TABLE public."UserSettings" OWNER TO jootser1;

--
-- Name: User_userNumber_seq; Type: SEQUENCE; Schema: public; Owner: jootser1
--

CREATE SEQUENCE public."User_userNumber_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_userNumber_seq" OWNER TO jootser1;

--
-- Name: User_userNumber_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jootser1
--

ALTER SEQUENCE public."User_userNumber_seq" OWNED BY public."User"."userNumber";


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: jootser1
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO jootser1;

--
-- Name: User userNumber; Type: DEFAULT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."User" ALTER COLUMN "userNumber" SET DEFAULT nextval('public."User_userNumber_seq"'::regclass);


--
-- Data for Name: Auth; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."Auth" (id, email, password, "accessToken", "refreshToken", "createdAt", "updatedAt", "userId") FROM stdin;
cmazpxtfz0001qu3tk5j2o68d	jootser1@joots.com	$argon2id$v=19$m=65536,t=3,p=4$IcYXze4jdR8+dWBzzMDhAQ$Hj7bwj10ooKwP/9zjZ0JWcwwkZVdPTtc01DI6a1r8Ls	\N	\N	2025-05-22 18:41:57.84	2025-05-22 18:41:57.84	cmazpxtfz0000qu3tgg4qi5ex
cmazpxthm0003qu3tew0mut00	jootser2@joots.com	$argon2id$v=19$m=65536,t=3,p=4$tTQFz5SVvWBDkvoZUj9onw$B1bsK6U8b+42txq54xcwwjAxEo+YZIe9SD4tfhd29BA	\N	\N	2025-05-22 18:41:57.898	2025-05-22 18:41:57.898	cmazpxthm0002qu3ttqezlwor
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."Category" (id) FROM stdin;
1
2
3
4
5
6
7
8
9
10
11
12
\.


--
-- Data for Name: CategoryTranslation; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."CategoryTranslation" ("categoryId", label, locale) FROM stdin;
1	Spiritualité	fr_FR
1	Spirituality	en_US
2	News & Politique	fr_FR
2	News & Politics	en_US
3	Technologie & Sciences	fr_FR
3	Technology & Science	en_US
4	Sexe	fr_FR
4	Sex	en_US
5	Fun	fr_FR
5	Fun	en_US
6	Média et Célébrité	fr_FR
6	Media & Celebrity	en_US
7	Relations Sociales	fr_FR
7	Social Relationships	en_US
8	Vie Quotidienne	fr_FR
8	Daily Life	en_US
9	Introspection	fr_FR
9	Introspection	en_US
10	Business	fr_FR
10	Business	en_US
11	Monde & Culture	fr_FR
11	World & Culture	en_US
12	Sport	fr_FR
12	Sport	en_US
\.


--
-- Data for Name: Conversation; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."Conversation" (id, "createdAt", "updatedAt", locale, "xpPoint", difficulty) FROM stdin;
5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:18:08.406	2025-06-02 18:48:47.299	fr_FR	140	INTERMEDIATE
\.


--
-- Data for Name: ConversationParticipant; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."ConversationParticipant" ("conversationId", "userId", "createdAt", "hasGivenAnswer", "isIcebreakerReady", "updatedAt") FROM stdin;
5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	cmazpxthm0002qu3ttqezlwor	2025-05-22 21:18:08.406	f	f	2025-06-02 18:50:59.869
5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	cmazpxtfz0000qu3tgg4qi5ex	2025-05-22 21:18:08.406	f	f	2025-06-02 22:13:33.555
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."Message" (id, "senderId", content, "createdAt", "conversationId", "isRead", "editedAt", "isDeleted", "messageType", "userAAnswer", "userAId", "userBAnswer", "userBId") FROM stdin;
be9f9b0e-6d74-49fb-a5e3-6e57accd1d3e	\N	De quelle couleur sont vos yeux?	2025-05-22 21:30:28.464	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Marron	cmazpxthm0002qu3ttqezlwor	Vert	cmazpxtfz0000qu3tgg4qi5ex
cbd37d44-558d-4bc2-b8ea-188619b1e08d	\N	De quelle couleur sont vos yeux?	2025-05-22 21:30:28.465	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Marron	cmazpxthm0002qu3ttqezlwor	Vert	cmazpxtfz0000qu3tgg4qi5ex
cf3c1ebb-d5b6-4b41-a3d9-ed704f94ea6f	cmazpxthm0002qu3ttqezlwor	Essai	2025-05-22 21:30:47.269	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
71575b78-5cd4-4129-b489-b7b3105c968e	\N	Vous manque t-il des points sur votre permis de conduire ?	2025-05-22 21:32:22.301	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
a8ce26d4-ab2c-4174-8a3d-7e57587b1c04	\N	Quel est le montant maximum que vous avez perdu au jeu dans une journée ?	2025-05-22 21:33:09.698	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Moins de 50	cmazpxthm0002qu3ttqezlwor	Moins de 50	cmazpxtfz0000qu3tgg4qi5ex
0b5bc370-4294-44f9-b327-cc4551e214ac	\N	Avez-vous un secret que vous ne confierez à personne ?	2025-05-22 21:43:55.454	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
790f5ca7-4737-406b-9ffc-03eef0daef48	\N	Avez-vous déjà pris une décision à pile ou face?	2025-05-22 21:55:44.08	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
506a6f73-6e01-4b85-b9df-d7fa4850f5a0	\N	Avez-vous déjà reçu un coup de fil d'un obsédé ?	2025-05-22 22:16:55.122	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
c103fac9-6408-4003-9e1d-e5a501c03dfb	\N	Avez-vous déjà photocopié une partie de votre anatomie ?	2025-05-22 22:19:41.664	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
a600bf69-86ab-4c42-97af-f46a1761aa5c	cmazpxthm0002qu3ttqezlwor	Coucou	2025-05-22 22:19:51.761	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
aa2a9b8f-4120-404e-8427-66c65869af9b	cmazpxtfz0000qu3tgg4qi5ex	Super	2025-05-22 22:19:55.815	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
9af9ede0-b850-48c0-b0f8-a7daa1f4e818	cmazpxtfz0000qu3tgg4qi5ex	dzd	2025-05-22 22:20:18.507	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
9dae118e-8f27-4cdb-bd35-f36baf3bf7aa	cmazpxthm0002qu3ttqezlwor	dzdzdz	2025-05-22 22:20:19.792	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
a5dbea4b-3c94-416b-a0ea-5df7a6ef0255	cmazpxthm0002qu3ttqezlwor	dedededed	2025-05-22 22:21:52.906	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
854271af-1513-438d-a7c1-8d5204b11004	\N	Etes-vous souvent en retard ?	2025-05-23 07:06:46.261	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
a6696a5c-2644-4c36-ba4e-a18f808d30ec	\N	Pensez-vous qu'il existe une vie après la mort ?	2025-05-23 07:08:27.776	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
0f2ad78b-6a95-40a6-9a65-77695610148b	\N	Croyez-vous aux aliens ?	2025-05-23 07:46:18.986	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui et ils sont plus intelligents que les humains	cmazpxtfz0000qu3tgg4qi5ex
604fd0cb-36ee-4756-9c28-6311a08d818a	\N	Est-ce que l'état actuel du monde vous convient?	2025-05-23 07:47:05.918	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
34e6328b-7153-4123-a715-ab9c5be79c12	cmazpxtfz0000qu3tgg4qi5ex	Truc	2025-05-23 07:57:13.479	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
9031cf2b-a571-44c0-ba53-883a32b9173a	cmazpxthm0002qu3ttqezlwor	Muche	2025-05-23 07:57:16.398	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
5dc75b63-4592-4f17-aa90-b461f5bda48b	cmazpxtfz0000qu3tgg4qi5ex	Salut toi a 9h57	2025-05-23 07:57:23.696	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
2a67c57a-eaec-466e-8d7d-e53686d1b524	cmazpxthm0002qu3ttqezlwor	Alors ca roule depuis le temps ?	2025-05-23 07:57:29.431	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
e7635446-b3d9-4d09-ab32-381f5f1d313a	\N	Détestez-vous quelqu'un?	2025-05-23 08:46:50.191	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
28754006-4d39-4e25-b634-83bfab21f08f	\N	Pensez-vous que nous conduirons des voitures volantes dans le futur?	2025-05-23 08:48:52.478	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
f36b8cdc-0646-4327-8b3b-8185d9084a9f	\N	Savez-vous garder un secret?	2025-05-23 10:44:45.256	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
e860acfb-e68e-4392-b834-496055cea63f	\N	Aimeriez-vous voir le revenu minimum universel instauré dans votre pays ? 	2025-05-23 12:19:15.816	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
0f690e8f-7e72-4990-857f-dd2ae1bc4769	\N	Le poids d'une personne peut-il être un critère rédhibitoire dans votre recherche de partenaire ?	2025-05-23 13:58:19.118	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
1a9c9768-8eea-4446-99ff-db6b012a2e03	cmazpxthm0002qu3ttqezlwor	essai	2025-05-26 12:32:36.599	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
8b1d9240-5226-4112-b208-832837ad811a	cmazpxtfz0000qu3tgg4qi5ex	Message a 14h32	2025-05-26 12:32:46.097	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
3f703cfd-d276-45ec-8d7c-d0cd475c1007	\N	Etes-vous heureux?	2025-05-26 12:32:55.951	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	La moitié du temps	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
8e8c8f9f-4ede-4644-8120-707972c7d7f0	cmazpxthm0002qu3ttqezlwor	Essai	2025-05-26 15:41:30.007	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
88fbbc91-fdb0-4dec-aecd-42dbfa718a5c	cmazpxtfz0000qu3tgg4qi5ex	Super	2025-05-26 15:41:33.89	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
12fbaf9e-9a2c-4831-b990-44c5b084933c	cmazpxthm0002qu3ttqezlwor	Truc	2025-05-26 15:42:29.36	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
27be7882-0200-4090-a149-568a0a5a975f	cmazpxthm0002qu3ttqezlwor	Truc 2	2025-05-26 15:42:37.017	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
62430961-8ffc-42ed-b79a-8f48ce31cc71	\N	Croyez-vous qu'Hitler a eu certains impacts positifs sur la société malgré toutes les atrocités qu'il a commises dans le monde?	2025-05-26 15:42:45.164	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
3a15b344-4afc-45d2-aa1e-700a0dd3558b	\N	Possédez-vous des bijoux intimes? 	2025-05-26 18:30:14.792	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
8e46a5e0-4359-43f1-9ff9-8efb933cae7d	\N	Vous arrive t-il de faire l'amour en plein air ?	2025-05-26 19:54:06.643	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
c4620e6b-4dd4-47be-a6be-ff66a447c7dc	cmazpxthm0002qu3ttqezlwor	hello	2025-05-28 11:37:59.469	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
11e653f7-4005-4102-98fc-e6f8b0527fa6	\N	Pensez-vous que l'église a apporté d'avantage de positif ou de négatif à l'humanité ?	2025-05-26 19:55:44.692	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Du positif	cmazpxthm0002qu3ttqezlwor	Du positif	cmazpxtfz0000qu3tgg4qi5ex
eed31ce4-a208-4833-8ee2-6a6832b23b07	\N	Etes-vous déjà parti sans payer ?	2025-05-26 20:39:41.959	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Jamais	cmazpxtfz0000qu3tgg4qi5ex	Jamais	cmazpxthm0002qu3ttqezlwor
c43d22c3-5d6d-4218-8344-a71d69cc093f	\N	Resteriez-vous avec votre conjoint si vous appreniez qu'il vous a trompé ?	2025-05-26 20:43:05.21	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
e8374311-8286-461e-9b32-979b6ebb663a	\N	Faut-il éviter de parler de ses anciennes histoires d'amour avec votre conjoint ?	2025-05-26 20:56:55.562	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
5cd4307a-cb7a-4646-944a-2453b36d14ef	\N	Aimez-vous le pays dans lequel vous vivez?	2025-05-26 21:00:45.956	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
107f42fd-92e4-4e52-ab51-805d2f83134f	\N	Croyez-vous que Jésus est mort pour vos péchés?	2025-05-26 21:01:00.811	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je pense que Jésus a existé et qu'il est mort mais son histoire a été réécrite	cmazpxthm0002qu3ttqezlwor	Je ne crois pas en Jésus	cmazpxtfz0000qu3tgg4qi5ex
78f3027a-8580-4f69-b39c-6f037131ee5b	\N	Comment pouvons-nous supprimer la douleur et la haine du monde?	2025-05-26 21:01:14.129	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	En tâchant de s'améliorer tous les jours	cmazpxthm0002qu3ttqezlwor	En tâchant de s'améliorer tous les jours	cmazpxtfz0000qu3tgg4qi5ex
71a76439-a7ed-423f-b0a0-4ba1146f99aa	\N	Vous trouvez-vous séduisant(e) ?	2025-05-26 21:01:21.838	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
06120029-5745-4995-9bce-7bd8a7f459ba	\N	Est-ce que vos enfants vivront une vie meilleure?	2025-05-26 21:05:19.802	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
db2967b9-1a80-4eba-a840-b37a91f195b3	\N	Voudriez-vous de Donald Trump comme président?	2025-05-26 21:05:35.235	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
4dfa01d9-5b17-435a-be3a-c61a2413f8f3	\N	Pensez-vous les préliminaires importants?	2025-05-26 21:07:06.997	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
99acb148-90a0-4642-af5d-99021eb93fab	\N	Aimez-vous les jeux d'argent?	2025-05-26 21:11:20.114	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Pour le plaisir de jouer	cmazpxthm0002qu3ttqezlwor	Pour le plaisir de jouer	cmazpxtfz0000qu3tgg4qi5ex
ba4f47ca-ace7-4ee7-a32e-085228543fab	\N	Combien de fois pensez-vous au sexe par jour ?	2025-05-26 21:17:59.983	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Toutes les heures	cmazpxtfz0000qu3tgg4qi5ex	5 fois	cmazpxthm0002qu3ttqezlwor
f7931447-9d55-4d96-8386-025543c4c48c	\N	Achetez-vous des produits contrefaits ?	2025-05-26 21:21:25.905	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
3c600e40-fd08-436d-ab25-1a14e48f7496	\N	Pensez-vous que les hommes et femmes politiques locaux devraient se voir confier plus de pouvoirs et de moyens par votre pays ? 	2025-05-26 21:25:35.298	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
a71e8013-5076-4077-8092-eaa23ce02170	\N	Quel est l'écart maximum d'âge que vous avez eu avec votre conjoint ?	2025-05-26 21:29:18.536	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Entre 11 et 15 ans	cmazpxthm0002qu3ttqezlwor	Entre 16 et 20 ans	cmazpxtfz0000qu3tgg4qi5ex
0f502b64-b953-402d-9833-06eaf41c50bc	\N	Pensez-vous les taxes trop élevées dans votre pays ?	2025-05-26 21:31:39.287	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
eac757ee-251a-49bd-92e1-a3476f7a3122	\N	Mangez-vous vos crottes de nez?	2025-05-26 21:34:19.888	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
8b6696d3-a562-43b3-9c65-f31f1988b0b7	\N	Avez-vous déjà tagué un mur ?	2025-05-26 21:36:14.611	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
751e89fd-b3b2-4211-8c7e-c63cea917166	\N	Pensez-vous que les hommes politiques pensent d'abord à eux-mêmes? 	2025-05-26 21:37:06.015	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
1555d7f4-bbaa-4c1c-8eb5-2bcb05b250af	\N	Êtes-vous prêt à changer?	2025-05-26 21:38:22.953	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je voudrais mais c'est difficile	cmazpxtfz0000qu3tgg4qi5ex	Pourquoi devrai-je ?	cmazpxthm0002qu3ttqezlwor
cc1a42b7-2e71-43f3-a1e7-d760283a3fac	\N	Aimez-vous vous voir nu(e) dans le mirroir ?	2025-05-26 21:38:31.536	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Ca ne me dérange pas	cmazpxthm0002qu3ttqezlwor	Je déteste !	cmazpxtfz0000qu3tgg4qi5ex
82d2b75e-3995-4fd9-b246-3711072ac220	\N	Avez-vous déjà lu secrètement le journal intime de quelqu'un ?	2025-05-26 21:39:10.132	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
87085ef4-afc4-4f34-906f-e55a0e1e07d4	\N	Quelle est votre habitude la plus dégoûtante?	2025-05-26 21:45:14.909	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Ne pas se brosser les dents autant qu'il faudrait	cmazpxthm0002qu3ttqezlwor	Percer vos boutons et points noirs	cmazpxtfz0000qu3tgg4qi5ex
6afcdb2a-b9c0-4d89-afb9-2cbc17e2e809	\N	Quelle est votre habitude la plus dégoûtante?	2025-05-26 21:45:14.909	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Ne pas se brosser les dents autant qu'il faudrait	cmazpxthm0002qu3ttqezlwor	Percer vos boutons et points noirs	cmazpxtfz0000qu3tgg4qi5ex
ee42abee-2344-4565-b45f-e141ea3c7198	\N	Etes-vous satisfait des actions du maire de votre ville ?	2025-05-26 21:45:42.221	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
488c3b08-060e-4bad-b930-14bef8de34fd	\N	Aimez-vous vous baigner nu ?	2025-05-26 21:50:02.844	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
849afec4-02fc-43d4-a9ee-c3197ddfee03	\N	Etes -vous attiré par les personnes fortes?	2025-05-26 21:50:11.119	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
8d39cb3f-24ec-43d8-9990-37a603a589ae	\N	Pensez-vous que les drogues douces devraient être en vente libre ?	2025-05-26 21:50:20.397	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
48bae094-9c92-493f-9111-5363a63458c8	\N	Etes-vous déjà allé dans un sexe shop?	2025-05-26 21:51:15.873	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Une fois	cmazpxtfz0000qu3tgg4qi5ex	Jamais	cmazpxthm0002qu3ttqezlwor
5fb5f003-ac98-4482-8ea3-4edd013eccbb	\N	Voudriez-vous revenir dans le temps pour changer votre vie?	2025-05-26 21:51:20.59	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
caeba58a-7e7b-4d8b-aede-ed20546c0f6c	\N	Pensez-vous que les chomeurs devraient assumer des travaux d'utilité publique ?	2025-05-26 21:53:05.231	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
b277d5cf-f569-42a6-a0ba-4633a9539271	\N	Combien d'amis aviez-vous dans votre enfance ?	2025-05-26 21:53:12.939	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Entre 6 et 10	cmazpxtfz0000qu3tgg4qi5ex	Zero	cmazpxthm0002qu3ttqezlwor
374cc129-91ce-4752-a60c-765fb800e9e9	\N	Quelle puissance mondiale s'en sort le mieux en ce moment ?	2025-05-26 21:53:19.505	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Amérique du Sud	cmazpxtfz0000qu3tgg4qi5ex	Chine	cmazpxthm0002qu3ttqezlwor
134a96ee-2763-4ee0-b28a-9e961f530cf2	\N	Avez-vous déjà embrassé avec la langue plusieurs personnes dans une même soirée? 	2025-05-26 21:53:27.113	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
74515a81-0841-4c65-a44c-fff2db60fa8a	\N	Avez-vous déjà lu en cachette les sms sur le téléphone de votre partenaire? 	2025-05-26 21:55:36.886	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
96ce1ab7-decf-4494-a166-2dfd9b75c0f2	\N	Pensez-vous qu'il existe d'autres univers?	2025-05-26 21:56:16.346	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
ae00dc05-13a4-4594-8d4a-370dc83a6d1e	\N	Avez-vous déjà vraiment eu honte d'un membre de la famille ?	2025-05-26 21:56:35.947	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
7dc404ed-9bbd-44cb-b7b6-1f08bb000c95	\N	Croyez-vous que tout le monde devrait être considéré comme égal?	2025-05-26 21:56:48.59	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
43057f4c-d546-4e25-aba7-8376d21b1620	\N	Est-ce que les animaux, sans parler de l'homme, ont une âme ? 	2025-05-26 21:56:57.085	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
597f1c0f-05aa-4031-b974-5c50aa6871ef	\N	Pensez-vous votre pénis ou poitrine trop petit ( e) ?	2025-05-26 21:58:04.874	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
072a15ad-4195-4505-985a-22be1ee46f97	\N	Croyez-vous en la réincarnation? 	2025-05-26 21:58:36.912	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
68e5f0d5-dae6-4ea5-9786-e9b14897fcf3	\N	Vous sentez-vous seul(e) dans la vie ?	2025-05-26 21:59:09.834	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Tout le temps	cmazpxthm0002qu3ttqezlwor	Tout le temps	cmazpxtfz0000qu3tgg4qi5ex
7e74d56e-4de6-4dd2-b3e5-ceda93b1f9fb	\N	Pensez-vous que les fonctionnaires travaillent moins que les autres ?	2025-05-26 21:59:20.96	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
fc0da022-516e-4edb-8d67-be4459b464d1	\N	Aimez-vous dire des mots cochons en faisant l'amour? 	2025-05-26 21:59:39.746	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
009d4149-1e40-4792-85ec-5dbeead1842e	\N	Avez-vous déjà eu des morpions ?	2025-05-26 21:59:59.569	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
db851d81-c3e5-45e0-98c4-3725b59d4ded	\N	Avez-vous du mal à prendre des décisions ?	2025-05-26 22:02:37.742	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
ccf82daf-e0af-4bbe-9022-0ba560a2fdc0	\N	Avez-vous déjà fait des échanges de nourriture de bouche à bouche ?	2025-05-26 22:02:52.695	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
ef5db97c-2058-4b0f-8c71-5326f36ddb38	\N	Etes-vous vraiment heureux?	2025-05-26 22:03:19.308	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
9fd574a3-c715-4107-956a-85b190e0014a	\N	Mentez-vous?	2025-05-26 22:03:33.892	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Parfois	cmazpxthm0002qu3ttqezlwor	Souvent	cmazpxtfz0000qu3tgg4qi5ex
947f0e3c-2010-4a53-91c9-e5d50470f2d6	\N	Pensez-vous que l'essentiel dans un couple est de se soutenir mutuellement?	2025-05-27 08:51:12.488	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
067341ef-96a5-4a51-aaa9-1c35e1575e01	\N	Avez-vous déjà cassé un objet de valeur sous l'effet de la colère ?	2025-05-27 09:04:05.726	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
0997a1ef-2ed0-49c6-8987-9673f99de5cd	\N	Vous  souvenez-vous de vos cours de sciences du collège ?	2025-05-27 09:04:25.883	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
aa74049f-2206-48fe-9874-75b7f4845aa8	\N	Avez-vous déjà fait pipi exprès à côté des toilettes? 	2025-05-27 09:09:53.479	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Parfois	cmazpxtfz0000qu3tgg4qi5ex	Régulièrement	cmazpxthm0002qu3ttqezlwor
8646bb93-0be0-41d1-9783-750a41289239	\N	Avez-vous déjà secrètement observé un couple en train de faire l'amour ?	2025-05-27 09:12:14.718	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
aa2fb7da-4b96-4343-8ff8-98a89dc0b529	\N	Vous connaissez-vous bien vous-même ?	2025-05-27 09:12:29.113	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	J'y travaille	cmazpxthm0002qu3ttqezlwor	Pas assez	cmazpxtfz0000qu3tgg4qi5ex
245a2a06-891b-47bf-8bea-79313f019724	\N	Préférez-vous aller aux toilettes chez vous ?	2025-05-27 09:12:59.118	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
64a81385-7866-4c66-a33f-87f3ae869051	\N	Vous arrive t-il d'être insomniaque ?	2025-05-27 09:17:18.554	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
d5290083-6856-4f7b-8167-5acfde63db71	\N	Où va l'esprit quand on meurt?	2025-05-27 09:17:33.111	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Il reste sur Terre	cmazpxthm0002qu3ttqezlwor	Il reste sur Terre	cmazpxtfz0000qu3tgg4qi5ex
d12a76b7-f2b4-4745-9f3a-bafc215974cc	\N	Avez-vous déjà dit "je t'aime" sans vraiment le penser?	2025-05-27 09:17:46.869	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Parfois	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
b1abcc12-cd67-4871-ab67-776265bc93e6	\N	Vous-êtes vous déjà travesti ?	2025-05-27 09:20:36.53	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
2e9ec440-efdd-4c59-97c5-d11557a2d867	\N	Aimeriez-vous changer de métier ?	2025-05-27 09:20:49.311	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
aa992ae4-ca62-4443-ba68-909952985f68	\N	Y a-t-il un mensonge dans votre vie que vous ressortez tout le temps ?	2025-05-27 09:21:11.474	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
14ce3017-39da-4daa-aff5-6efd5fe942c5	\N	Avez-vous déjà participé à une manifestation politique ?	2025-05-27 09:21:28.729	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
cd23156b-aa02-4fb1-896a-495c04529c36	\N	Aux élections présidentielles, privilégiez-vous l'intérêt de votre pays ou votre intérêt ?	2025-05-27 09:22:20.454	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	L'intérêt de mon pays	cmazpxthm0002qu3ttqezlwor	L'intérêt de mon pays	cmazpxtfz0000qu3tgg4qi5ex
f023abba-bd0e-461a-8536-8cbe44d32750	\N	Vous-êtes vous déjà endormi au travail ?	2025-05-27 09:22:35.226	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
18373ae2-ac48-4aae-ad2b-5ea747faacb3	\N	Etes-vous complexé(e) par une partie de votre corps?	2025-05-27 09:23:57.524	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
98664df1-f9c0-42c3-a7a3-121cb24655e0	\N	Aimez-vous vous promener nu(e) chez vous?	2025-05-27 09:24:18.174	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Parfois	cmazpxthm0002qu3ttqezlwor	Très souvent	cmazpxtfz0000qu3tgg4qi5ex
723aea4a-c667-4c83-b068-af3ed6ea368c	\N	Pensez-vous qu'on trouve forcément du travail si on cherche bien et qu'on est prêt à quelques compromis?	2025-05-27 09:25:28.884	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
f1d3f6ed-3c1b-43b2-8ede-9cfdd6029f3e	\N	Si le respect de vos données personnelles était garanti, accepteriez-vous d'être constamment surveillé(e) pour garantir une sécurité maximale à notre société ? 	2025-05-27 09:25:47.974	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
af7d7cc9-453e-412f-8f3c-978a4da4f0d0	\N	L'union religieuse est-elle conseillée pour un couple ?	2025-05-27 09:25:59.028	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
8fafd5d4-9c3f-4853-8212-854d2885166b	\N	Seriez-vous prêt à mourir pour tenter de sauver un étranger?	2025-05-27 09:26:28.196	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
fd3c7021-6321-41bc-aefa-1023350a54bd	\N	Croyez-vous aux bienfaits de l'homéopathie ?	2025-05-27 09:27:31.458	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
05bcbc70-745d-4375-b72a-45a3075d1164	\N	Aimeriez-vous que les citoyens soient plus souvent appelés à voter lors de référendum pour décider de l'avenir du pays ? 	2025-05-27 09:27:41.121	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Uniquement quand c'est important	cmazpxthm0002qu3ttqezlwor	Non jamais	cmazpxtfz0000qu3tgg4qi5ex
73e31a22-2e55-412d-83f1-b8bc8caaca90	\N	Vous arrive-til de faire pipi sous la douche ?	2025-05-27 09:30:16.657	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
d1a15bff-2ac0-4b76-bb24-a368027c5a2b	\N	Pensez-vous cerner rapidement les personnes que vous rencontrez?	2025-05-27 09:30:27.414	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
72b90d16-99e5-494b-bb07-f008b76de59c	\N	Pensez-vous que vous feriez un bon chef d'état ?	2025-05-27 09:34:30.75	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
9339b9ca-2ff4-4889-8896-007e5bc2572f	\N	Pensez-vous que votre vie apporte du positif ou du négatif à la société?	2025-05-27 09:34:41.372	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Bien	cmazpxthm0002qu3ttqezlwor	Mal	cmazpxtfz0000qu3tgg4qi5ex
e2a84869-78ea-42af-8095-1c5e260eddbc	\N	Qui est apparu en premier, l'uf ou la poule?	2025-05-27 09:34:51.797	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Le poulet sans aucun doute	cmazpxthm0002qu3ttqezlwor	L'uf, c'est sûr!	cmazpxtfz0000qu3tgg4qi5ex
41cf3046-5b4a-47b7-8e93-1b9c594af549	\N	Quelle puissance mondiale s'en sort le mieux en ce moment ?	2025-05-27 09:35:12.769	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	USA	cmazpxthm0002qu3ttqezlwor	Amérique du Sud	cmazpxtfz0000qu3tgg4qi5ex
3c5f2d56-bee5-474f-833a-02c89139ff93	\N	Pensez-vous l'utilisation de la bombe atomique possiblement justifiable dans certaines circonstances ?	2025-05-27 09:35:23.13	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
ca5f00a3-5ce3-45e0-97fc-c1292c5ddcfd	\N	Avez-vous un objet soigneusement caché chez vous ?	2025-05-27 09:36:46.816	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
f800ed00-99d5-49d1-af6c-388d5c0ef2c8	\N	Vous-êtes vous déjà complètement rasé le pubis ?	2025-05-27 09:37:00.793	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
521aa09c-a059-4531-855d-6c703f2c4686	\N	Avez-vous déjà commis un acte que vous ne vous pardonneriez jamais? 	2025-05-27 09:39:32.212	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
78e29224-7f8e-4126-aef6-fa1f92041d89	\N	Avoir un enfant renforce t-il la cohésion du couple ?	2025-05-27 09:39:49.683	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
6b3b7c90-eb68-4140-a8db-b53015e2931c	\N	Avez-vous déjà volé dans un magasin?	2025-05-27 09:40:02.683	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Jamais	cmazpxthm0002qu3ttqezlwor	Sans faire Exprès	cmazpxtfz0000qu3tgg4qi5ex
83f5fc49-76ab-4b91-8a2c-2ad839ae2813	\N	A quelle fréquence vous lavez-vous? 	2025-05-27 09:40:12.329	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	1 fois par jour	cmazpxthm0002qu3ttqezlwor	1 fois par semaine	cmazpxtfz0000qu3tgg4qi5ex
89481fa8-47be-4f42-bcdb-e2ff6c4dc472	\N	Un de vos partenaires vous a-t-il déjà avoué vous avoir trompé ?	2025-05-27 09:41:22.183	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
00962252-3d1a-440a-92c9-43e239988748	\N	Dans quelle position vous endormez-vous ?	2025-05-27 09:41:37.817	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Sur le dos	cmazpxthm0002qu3ttqezlwor	Sur le côté	cmazpxtfz0000qu3tgg4qi5ex
38b05a8a-78a7-40aa-a401-708496f8ded8	\N	Avez-vous déjà témoigné en justice ?	2025-05-27 09:41:53.76	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
f98c513e-a01e-4333-bffc-5361b111ae47	\N	Si vous aviez un secret à confier sur votre lit de mort, sachant qu'il pourrait ternir votre mémoire, le partageriez-vous?	2025-05-27 09:43:41.326	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
58eb227e-efcc-4dee-9cec-4a4e3626c82b	\N	Quel sport nouvellement choisi pour les Jeux olympiques de 2024 a sa place durablement ?	2025-05-27 09:44:01.78	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Breakdance	cmazpxthm0002qu3ttqezlwor	Breakdance	cmazpxtfz0000qu3tgg4qi5ex
a193689d-5221-44b7-b854-b9aaec328196	\N	Etes-vous pour l'énergie nucléaire?	2025-05-27 09:45:02.252	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
b98abba4-f5f6-4637-8416-2ac65b175bcf	\N	Combien d'heures utilisez-vous votre smartphone par jour ?	2025-05-27 09:45:24.918	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	1 heure	cmazpxthm0002qu3ttqezlwor	5 heures	cmazpxtfz0000qu3tgg4qi5ex
33e1505b-d68d-4742-9ca9-b71efaf302b3	\N	Pensez-vous que la prostitution devrait être reconnue comme un vrai métier? 	2025-05-27 09:45:36.938	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
73c15f1d-0bf9-4fc3-a0a1-c0f434d51f0c	\N	Que pensez-vous de Donald Trump?	2025-05-27 09:47:46.156	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Il est brillant	cmazpxtfz0000qu3tgg4qi5ex	Il ne vit que pour l'argent	cmazpxthm0002qu3ttqezlwor
97dc8070-a206-45a8-9c39-98f1e89c65e5	\N	Que pensez-vous de Donald Trump?	2025-05-27 09:47:46.158	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Il est brillant	cmazpxtfz0000qu3tgg4qi5ex	Il ne vit que pour l'argent	cmazpxthm0002qu3ttqezlwor
1fba73e5-6eec-46e3-891e-5fb2e70b56f1	\N	Aimez-vous votre prénom ?	2025-05-27 09:50:08.15	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
caf3d4f2-8b1b-4591-8384-8b68735d5a28	\N	A quelle fréquence regardez-vous du porno ?	2025-05-27 09:52:00.677	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	2 fois par semaine	cmazpxthm0002qu3ttqezlwor	2 fois par semaine	cmazpxtfz0000qu3tgg4qi5ex
761ceb8b-6fca-4d81-9d83-8c6ee5a70a61	\N	Préférez-vous le temps chaud ou froid?	2025-05-27 09:52:12.913	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Chaud	cmazpxthm0002qu3ttqezlwor	Chaud	cmazpxtfz0000qu3tgg4qi5ex
25a4d63b-5300-4369-b9f3-c11ef102e60d	\N	Vous-lavez vous les mains après être passé aux toilettes? 	2025-05-27 09:52:33.5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Jamais	cmazpxthm0002qu3ttqezlwor	Rarement	cmazpxtfz0000qu3tgg4qi5ex
e8de1bae-06d7-4026-8928-0985f7b743f1	\N	Pourriez-vous pardonner l'infidélité à votre partenaire ?	2025-05-27 09:53:49.609	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
8943c23d-f446-48a1-b182-77dd146ce50a	\N	Avez-vous déjà conduit à plus de 200 km/h ?	2025-05-27 09:55:43.737	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
0fd7d16a-181b-407a-926a-08ca7d8e92d4	\N	L'organe sexuel du sexe opposé vous dégoûte t'il? 	2025-05-27 09:56:07.149	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
c6d24a1a-039c-4f95-94a6-7e5251bd5fb8	\N	Etes-vous pudique?	2025-05-27 09:56:18.842	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
305213c2-e589-4917-9a71-8837473d4b41	\N	Auriez-vous aimé être un espion ?	2025-05-27 09:57:49.434	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
7c8876ac-0805-4457-a14b-a1abf64a30b1	\N	Pensez-vous que le porno stimule ou freine votre sexualité avec votre partenaire ?	2025-05-27 09:58:10.185	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Stimule	cmazpxthm0002qu3ttqezlwor	Freine	cmazpxtfz0000qu3tgg4qi5ex
7d2eb82e-ec0e-4951-869e-330c1bba68f2	\N	Quelqu'un vous offre soit 100 $ aujourd'hui, soit de l' argent supplémentaire dans un mois à partir de maintenant. Quel montant suffirait à vous faire attendre?	2025-05-27 09:58:26.1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	100 de plus	cmazpxthm0002qu3ttqezlwor	10 de plus	cmazpxtfz0000qu3tgg4qi5ex
f98d1b01-f818-4713-912a-e9e89086baf6	\N	Avez-vous déjà sucé les pieds de quelqu'un ?	2025-05-27 09:58:39.692	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
1e6901c1-c4d3-4165-a152-b3553f8b0eec	\N	Pensez-vous que les catcheurs se battent pour de vrai?	2025-05-27 09:59:30.752	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
d615943f-c5ca-4da8-a6be-40663260c28a	\N	Est-ce qu'une relation à longue distance peut fonctionner?	2025-05-27 10:00:24.88	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Possible, tant que les deux amoureux ne font pas d'autres rencontres	cmazpxthm0002qu3ttqezlwor	Oui, mais cela exige beaucoup d'efforts	cmazpxtfz0000qu3tgg4qi5ex
e81f2e53-512d-4c73-b50a-1b22e83df264	\N	Etes-vous curieux de savoir ce qui se passe après la mort?	2025-05-27 10:00:42.974	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
e2f598a1-cd3e-4a9f-a8ab-44e7c1682245	\N	Vous-êtes vous déjà battu avec quelqu'un ?	2025-05-27 10:01:50.428	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
4f376dd1-ed63-4c2f-8248-7db2ab506e9e	\N	Possédez-vous des accessoires érotiques?	2025-05-27 10:03:08.692	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
6c7275d9-cad1-4186-8e26-a543df00594a	\N	Exprimez-vous facilement vos sentiments?	2025-05-27 10:03:23.253	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
e742b505-94d9-4a24-bfff-58632ab35e6d	\N	Vous arrive t-il de ne pas porter de sous-vêtements? 	2025-05-27 10:06:22.897	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Souvent	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
9168f3ba-cf5e-4ae6-9aa2-a40842d0fde3	\N	Avez-vous déjà réservé une chambre d'hôtel pour un rdv galant?	2025-05-27 10:06:34.34	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Parfois	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
ad10472d-e0ab-40d4-a6c1-f61eaa523fc5	\N	Avez-vous un problème de dépendance ?	2025-05-27 10:07:26.703	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
01fbec2a-d94b-4c0b-829b-e64b00bddd72	\N	Quel pourcentage de gens ne vous souhterait pas votre anniversaire si ce n'était pas écrit sur votre facebook ?	2025-05-27 10:07:44.874	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	40%	cmazpxthm0002qu3ttqezlwor	60%	cmazpxtfz0000qu3tgg4qi5ex
7fc02c29-9296-4560-b1e8-f36b294a7736	\N	Est-ce que vous aimeriez transformer votre smartphone en créature vivante ?	2025-05-27 10:08:07.029	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
464c3fe4-d312-4bc0-afe0-5d19ff8d7899	\N	Pourquoi trouve t-on les pets si drôles?	2025-05-27 10:08:16.054	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Parce qu'ils sentent	cmazpxthm0002qu3ttqezlwor	Parce qu'ils sentent	cmazpxtfz0000qu3tgg4qi5ex
93ef17ac-6e26-4a8b-a472-f4023f75aa37	\N	Seriez-vous prêt à tout quitter pour votre couple ?	2025-05-27 10:08:31.984	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
61f1ca57-2512-4240-98e4-2fdf2dc92bf9	\N	Aimeriez-vous que les citoyens soient plus souvent appelés à voter lors de référendum pour décider de l'avenir du pays ? 	2025-05-27 10:08:52.277	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non jamais	cmazpxthm0002qu3ttqezlwor	Non jamais	cmazpxtfz0000qu3tgg4qi5ex
126b4c6d-7489-4458-bcb8-8f1aef1189ee	\N	Trouvez-vous gênants les homo qui s'embrassent en public?	2025-05-27 10:09:07.588	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Au contraire je trouve ça beau	cmazpxthm0002qu3ttqezlwor	Pas du tout	cmazpxtfz0000qu3tgg4qi5ex
4712f070-fd02-4e53-8c5b-d09c3f7e75db	\N	Parlez-vous de votre vie intime avec vos meilleurs amis ?	2025-05-27 10:09:36.053	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
244033e1-2e89-4620-b547-b13b874c5db0	\N	Vous arrive t-il de vous garer sur les places réservées aux handicapés ?	2025-05-27 10:09:49.234	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
b0e2fd8e-f162-4e39-810a-1a103df76979	\N	Avez-vous déjà fait l'amour dans une voiture ?	2025-05-27 10:10:03.512	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
a40a89ce-6afa-4843-849d-774b14294937	\N	Est-ce que l'âme existe au-delà du corps ? 	2025-05-27 10:10:12.091	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
10890b22-abbc-4408-9f68-dd2989dc7ab2	\N	Avez-vous déjà trouvé un portefeuille dont vous avez gardé l'argent ?	2025-05-27 10:10:21.672	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
316590f2-722f-4ebc-8d16-a767906e6b6c	\N	Au lit comme dans la vie, c'est vous qui prenez les décisions dans votre couple ?	2025-05-27 10:10:31.655	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Uniquement dans la vie	cmazpxthm0002qu3ttqezlwor	Uniquement dans la vie	cmazpxtfz0000qu3tgg4qi5ex
9ca78788-6d92-4253-a1c5-d4d0db473439	\N	Pensez-vous que le passage à l'Euro a augmenté le coût de la vie ?	2025-05-27 10:12:03.435	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
cfb47b4a-3e0d-4e47-9869-29da9d28b7fd	\N	Combien de véritables amis estimez-vous avoir ?	2025-05-27 10:12:15.025	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	15	cmazpxthm0002qu3ttqezlwor	15	cmazpxtfz0000qu3tgg4qi5ex
c4b89412-54fc-4c1e-9402-00408f394a73	\N	Pensez-vous que les robots travailleront à notre place dans l'avenir ?	2025-05-27 10:12:24.113	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
243054d3-fe3b-45ab-8dff-d5254528bc0b	\N	Avez-vous déjà mangé en faisant l'amour ?	2025-05-27 10:12:52.248	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
2ab71bc8-bb1c-47d6-b982-8838782a5dbc	\N	Qu'est ce que la tromperie?	2025-05-27 10:13:27.708	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Embrasser quelqu'un d'autre	cmazpxthm0002qu3ttqezlwor	Embrasser quelqu'un d'autre	cmazpxtfz0000qu3tgg4qi5ex
89f9d1ac-5e29-4cfb-9b6a-17c995f63b91	\N	Avez-vous déjà menti sur votre CV ?	2025-05-27 10:14:39.08	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
a678e3a1-db0f-4890-8311-2cf6562cdd71	\N	Aimez-vous scotcher devant la télévision?	2025-05-27 10:15:00.554	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
d346cdf9-0d4c-4e0b-ac14-4b96a4cf7610	\N	Si vous pouviez changer une chose à propos de l'homme, quelle serait-elle?	2025-05-27 10:15:13.164	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Le rendre immortel	cmazpxthm0002qu3ttqezlwor	Lui donner le pouvoir de voler	cmazpxtfz0000qu3tgg4qi5ex
a2355c46-9a41-4736-a43c-81b693673669	\N	Avez-vous déjà grillé un feu rouge volontairement ?	2025-05-27 10:17:38.778	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
f1905e6b-0b86-414d-bc3f-6ba8b05455f0	\N	Avez-vous déjà fait dans votre culotte à l'âge adulte ?	2025-05-27 10:17:47.631	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
12ebce9b-b255-408b-90d8-91f7b8847752	\N	Si votre partenaire décidait d'avoir une relation sexuelle avec un(e) inconnu(e), préfèreriez vous que ce dernier soit attirant ou repoussant ?	2025-05-27 10:18:01.269	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Repoussant	cmazpxthm0002qu3ttqezlwor	Repoussant	cmazpxtfz0000qu3tgg4qi5ex
01185794-ddcd-45ef-873f-1ce8d551044d	\N	Etes-vous adepte du kamasutra ?	2025-05-27 10:19:22.77	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
cd824a58-576a-4bd3-ad26-33ce96d35728	\N	Quand deviendront disponibles les voyages commerciaux dans l'espace?	2025-05-27 10:19:51.49	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Dans 5 ans	cmazpxthm0002qu3ttqezlwor	Dans 100 ans	cmazpxtfz0000qu3tgg4qi5ex
4bf6a220-e81e-4e90-98bb-4afb442180c4	\N	Avez-vous déjà eu une perception paranormale? 	2025-05-27 10:25:06.969	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
a6f7f0d3-36a1-4908-a89d-8c4d0a91620c	\N	Quel est le montant maximum dont vous avez hérité ?	2025-05-27 10:25:28.505	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Moins de 20 000	cmazpxthm0002qu3ttqezlwor	Moins de 20 000	cmazpxtfz0000qu3tgg4qi5ex
6722cad4-7232-44dc-86c5-457a6a871bbf	\N	Avez-vous déjà pleuré toutes les larmes de votre corps par désespoir amoureux ?	2025-05-27 10:26:03.452	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
8946abc6-98b5-4c06-810d-aaeec61c71ac	\N	Pourrons-nous un jour établir la paix dans le monde?	2025-05-27 10:26:28.755	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
657c7915-7654-429a-828c-530fba5373a5	\N	Pensez-vous qu'il faut de l'argent pour être heureux? 	2025-05-27 10:27:06.255	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
9b3e2a61-7b9b-4a14-8dd9-9ed44f677540	\N	Pensez-vous que la télé-réalité devrait disparaître de nos écrans? 	2025-05-27 12:37:41.538	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
a903c5be-b47a-45a1-a6c6-42008b97b15e	\N	Vous arrive t-il de prendre des somnifères ?	2025-05-27 12:37:59.382	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
81beb28b-7149-4d3f-ad04-cdd29eaf219f	\N	Croyez-vous que la terre est ronde ?	2025-05-27 14:23:48.493	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
bc9bd336-be54-409e-a8c2-73c7562bbe35	\N	Pensez-vous que les femmes qui ont moins de poitrine sont moins féminines ?	2025-05-27 14:25:31.107	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxtfz0000qu3tgg4qi5ex	Le tour de poitrine ne fait pas la féminité	cmazpxthm0002qu3ttqezlwor
ca5dd09d-4218-41f2-8c19-e38f69e6142b	\N	Avez-vous déjà secrètement craché dans l'assiette ou le verre de quelqu'un ?	2025-05-27 14:41:16.708	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
11b43964-7aae-4821-ad5a-b1918e608db4	\N	Avez-vous déjà secrètement craché dans l'assiette ou le verre de quelqu'un ?	2025-05-27 14:41:16.707	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
d1b38bf2-771e-4861-9992-c6ff9914e907	\N	Etes-vous membre d'un parti politique?	2025-05-27 14:46:00.543	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
b7db01ae-d755-42ec-adad-e567f6ec77c6	\N	Avez-vous redoublé à l'école ?	2025-05-27 14:54:02.27	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
5b37b78a-1f65-4766-bd42-49d7124854ec	\N	Pourriez-vous travailler dans les pompes funèbres?	2025-05-27 14:54:24.109	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
563756c4-b4c2-47ec-8aee-fa7097471125	\N	Préféreriez-vous un très bon ami ou beaucoup de copains?	2025-05-27 14:54:57.822	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Un très bon ami	cmazpxthm0002qu3ttqezlwor	Un très bon ami	cmazpxtfz0000qu3tgg4qi5ex
fa9b059a-78dd-47cd-ae48-2b56a560241c	\N	Croyez-vous au destin?	2025-05-27 14:59:55.217	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
b4c30750-d51d-467c-b609-8692eceba0b9	\N	A quelle fréquence appelez-vous vos parents ?	2025-05-27 15:00:41.78	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	deux fois par mois	cmazpxthm0002qu3ttqezlwor	une fois par mois	cmazpxtfz0000qu3tgg4qi5ex
1ddf16f4-42dd-4945-8e4b-21d9176a7733	\N	Avez-vous déjà subi une chirurgie esthétique?	2025-05-27 15:05:31.081	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non mais je pourrais	cmazpxthm0002qu3ttqezlwor	Une seule fois	cmazpxtfz0000qu3tgg4qi5ex
113689c5-2951-47dc-a19c-165d3e617072	\N	Avez-vous déjà sérieusement souhaité la mort de quelqu'un?	2025-05-27 15:06:17.047	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Jamais	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
9581d262-4439-418f-8e1b-77c57b4c7e53	\N	Aimez-vous les médias sociaux?	2025-05-27 15:09:13.198	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
750e0c0b-6d75-4fe7-a062-2b75eeabc2cb	\N	Combien de fois allez-vous au temple ou à l'église?	2025-05-27 15:10:18.881	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Deux fois par semaine	cmazpxthm0002qu3ttqezlwor	Deux fois par semaine	cmazpxtfz0000qu3tgg4qi5ex
f2a4ebe4-eb31-44a3-a95c-dfab2af3f1c9	\N	Voudriez-vous vivre à l'étranger ?	2025-05-27 15:10:34.807	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
158cb02c-254f-4d46-8364-3dff90ea5957	\N	Un de vos partenaires vous a déjà t'il menacé de se suicider si vous la quittiez? 	2025-05-27 15:10:50.819	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
28997cd8-4f5f-450c-862e-d617c04e9202	\N	Avez-vous déjà consulté une voyante?	2025-05-27 15:10:58.427	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Jamais	cmazpxthm0002qu3ttqezlwor	Souvent	cmazpxtfz0000qu3tgg4qi5ex
8824f69e-d15b-4e72-a9a2-b7f3111fbf0a	\N	Avez-vous déjà fait l'amour par téléphone ?	2025-05-27 15:11:54.049	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
1d84c330-7144-47a1-8c03-d7442721887b	\N	Pourriez-vous commettre un meurtre dans certaines circonstances?	2025-05-27 15:12:07.538	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
df1c625a-0c3e-4e82-bf72-cf7041be4991	\N	Avez-vous déjà sérieusement pensé à vous suicider ?	2025-05-27 15:13:04.67	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
463dad0d-0ca3-4a94-a20f-e43052db44ce	\N	Si votre meilleur ami tuait quelqu'un, l'aideriez-vous à cacher le corps ?	2025-05-27 15:14:50.664	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
f70adae7-6835-4b83-b9d4-8578afeed453	\N	Regardez-vous souvent les fesses des gens qui vous entourent ?	2025-05-27 15:17:52.187	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Souvent	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
eff0b6e4-3712-499a-ac8a-624c266a3c1f	\N	Pensez-vous les hommes moins attentionnés que les femmes ?	2025-05-27 15:20:21.114	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
7d85fa13-fe44-4e90-981f-9826a4808fec	\N	Si le monde touchait à sa fin, qui voudriez-vous avoir à vos côtés?	2025-05-27 15:23:00.162	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Une célébrité	cmazpxthm0002qu3ttqezlwor	Une célébrité	cmazpxtfz0000qu3tgg4qi5ex
58015339-9270-4712-b592-109f32c68267	\N	Etes-vous très rapidement jaloux ?	2025-05-27 15:23:26.534	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
d0b74dbd-dad2-4022-a8b1-af8ea9730433	\N	Pensez qu'une personne mauvaise paiera tôt ou tard sa méchanceté ?	2025-05-27 15:25:27.717	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
cae09c4f-ba3a-4826-bcdf-16865723f5eb	\N	Avez-vous déjà craché sur quelqu'un ?	2025-05-27 15:27:37.505	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
5c58cf45-a5aa-4487-a07c-2f407f6f4bdb	\N	Avez-vous déjà du arrêter de faire l'amour à cause d'un problème d'érection ?	2025-05-27 15:28:09.809	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
8984e980-9a2f-4bec-bcb3-0766d0c6ac32	\N	Avez-vous déjà abimé le bien d'autrui sciemment ?	2025-05-27 15:30:32.371	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
544f0212-e346-4fd2-be86-8a077b0bcaba	\N	Quel est le sens de la vie?	2025-05-27 15:32:43.455	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Servir son dieu ou sa déesse	cmazpxthm0002qu3ttqezlwor	Obtenir de grosses voitures et beaucoup d'argent	cmazpxtfz0000qu3tgg4qi5ex
c1d0b793-e2f5-476d-94c8-71d1ac8e9c29	\N	Avez-vous déjà ressenti une peur injustifiée devant la mort ?	2025-05-27 15:34:26.309	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
420d9b33-e86f-471b-9fa7-2b2dc4d38bc6	\N	Préférez-vous faire l'amour dans le noir ou dans la lumière?	2025-05-27 15:39:56.781	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Dans la lumière	cmazpxthm0002qu3ttqezlwor	Dans la lumière	cmazpxtfz0000qu3tgg4qi5ex
0595dfc7-85a1-4881-9262-fdf52b8803cf	\N	Avez-vous déjà couché le premier soir?	2025-05-27 15:50:14.092	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Souvent	cmazpxthm0002qu3ttqezlwor	Souvent	cmazpxtfz0000qu3tgg4qi5ex
b280ec3c-4e8b-4838-a018-5bcce962cb01	\N	Faites-vous des cauchemars?	2025-05-27 15:59:10.403	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Souvent	cmazpxthm0002qu3ttqezlwor	Souvent	cmazpxtfz0000qu3tgg4qi5ex
558ee9f9-e1cb-4229-aa08-4cb6d56261dc	\N	Vous est-il déjà arrivé de simuler la maladie pour ne pas travailler ?	2025-05-27 18:57:26.266	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
fd7f9684-4ceb-42d2-a3a9-f5ac26833520	\N	Pensez-vous que la lune exerce une influence sur notre humeur?	2025-05-28 11:38:12.496	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
5680e5f3-30c1-46f9-bc85-c57665b4f30b	\N	Avec combien de personnes avez-vous vécu une histoire d'amour avant de trouver la bonne ?	2025-05-27 19:00:12.649	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Entre 5 et 10	cmazpxthm0002qu3ttqezlwor	Moins de 5	cmazpxtfz0000qu3tgg4qi5ex
1cc5ee43-d096-4284-8f1f-5f6e0e0f8fb8	\N	Pensez-vous que le président de votre pays est un bouffon? 	2025-05-27 19:01:28.369	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
15463b55-8939-4bd8-a3e9-054877971f25	\N	Etes-vous polygame?	2025-05-27 19:17:01.098	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
85f46530-4c49-44cb-87bf-95c6e79343d5	\N	Avez-vous déjà prêté de l'argent à un ami? 	2025-05-27 19:39:43.54	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Très souvent	cmazpxtfz0000qu3tgg4qi5ex	Parfois	cmazpxthm0002qu3ttqezlwor
dc4ef7fc-3f57-4c02-ae87-eebf85d2dc7d	\N	Avez-vous déjà prêté de l'argent à un ami? 	2025-05-27 19:39:43.54	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Très souvent	cmazpxtfz0000qu3tgg4qi5ex	Parfois	cmazpxthm0002qu3ttqezlwor
6153f6f8-3ba6-4e33-bc25-82fee225ec99	\N	Pleurez-vous devant un film ou en écoutant une chanson ?	2025-05-27 19:40:22.118	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Jamais	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
1aed67a6-c395-4dd4-af03-e313f404b297	\N	Se moquait-on de vous à l'école ?	2025-05-27 19:40:33.226	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
c50053cc-f861-4569-84c9-b39a4d5bd9a3	\N	Avez-vous déjà été condamné par un tribunal ?	2025-05-27 19:41:27.915	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
6ed0fca3-164a-4b5a-8936-73ef5a5a7d10	\N	Avez-vous déjà eu honte de votre conjoint(e) ?	2025-05-27 19:41:52.426	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
461c8a85-fcfe-4b14-9a5a-890d2693f2c5	\N	Avez-vous déjà été surpris(e) en train de faire l'amour? 	2025-05-27 19:43:09.437	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
2064dc50-7c9b-42f7-946e-f8ec5ca39d84	\N	Avez-vous prêté plus de 500 euros à un ami ?	2025-05-27 19:48:29.252	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
a9b22fba-7016-4a4e-85ef-48c33a7ba511	\N	Avez-vous prêté plus de 500 euros à un ami ?	2025-05-27 19:48:29.253	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas	cmazpxthm0002qu3ttqezlwor
34a04c33-c583-47e9-824d-f012ef275c81	\N	Enfant, avez-vous vu des adultes faire l'amour? 	2025-05-27 19:48:54.347	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
684358c0-9b21-4526-86da-370d1da31490	\N	De quelle religion êtes-vous ?	2025-05-27 21:15:34.419	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Bouddhisme / Hindouisme	cmazpxthm0002qu3ttqezlwor	Confucianisme	cmazpxtfz0000qu3tgg4qi5ex
b8e67a96-26c4-43f4-b129-e5f5e8586cab	\N	Avez-vous déjà causé des dégâts en voiture sans laisser vos coordonnées ?	2025-05-27 21:16:06.402	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
5cadfd1c-80e0-4686-a5d4-bdb268cace77	\N	Avez-vous tendance à remettre à plus tard ce que vous pouvez faire le jour même? 	2025-05-27 21:19:35.444	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
064ff23d-f8da-46a5-8edd-eb65456247bf	\N	Croyez-vous en Dieu?	2025-05-27 21:19:52.534	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
d593be42-1234-47e6-adce-a29527852a2b	\N	Pensez-vous que les hommes sont plus intelligents que les femmes ?	2025-05-27 21:20:04.345	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
66780364-6755-4b16-ad8f-15705c5b47c2	\N	Vous êtes vous déjà fait photographier nu-e ?	2025-05-27 21:20:22.531	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Régulièrement	cmazpxtfz0000qu3tgg4qi5ex	Une fois	cmazpxthm0002qu3ttqezlwor
c2dc7338-0b73-43b4-9ecf-80d4e779e2e7	\N	Vous est-il pénible de faire un discours en public ?	2025-05-27 21:22:21.358	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
93d737e0-d7af-4933-8543-d420b466b500	\N	Quel est votre chocolat préféré?	2025-05-27 21:22:34.907	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Blanc	cmazpxthm0002qu3ttqezlwor	Noir	cmazpxtfz0000qu3tgg4qi5ex
b2a84364-fc06-48d9-991f-524c75c9ca6e	\N	Avez-vous déjà conduit en état d'ivresse ?	2025-05-27 21:23:27.563	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
441af08b-54d6-4a11-8fa5-155cd6e8d13c	\N	Etes-vous déjà tombé(e) en panne d'essence ?	2025-05-27 21:23:41.341	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
d951e7fe-93f0-4f13-bb2f-77939eec6e0e	\N	Croyez-vous au coup de foudre?	2025-05-27 21:27:49.237	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
9d1c84b9-18a1-4dfd-95ec-d507e4d3106a	\N	Si vous étiez dans la matrice ou dans un monde virtuel sans le savoir, voudriez-vous qu'on vous dise la vérité ? 	2025-05-27 21:30:31.072	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
5923b238-f0b2-4138-b4e7-b10dff65ca9a	\N	Est-ce que le contrôle des citoyens par les nouvelles technologies vous inquiète ?	2025-05-27 21:35:39.245	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Pas du tout	cmazpxthm0002qu3ttqezlwor	Un peu	cmazpxtfz0000qu3tgg4qi5ex
ef85d0d9-35d4-4cb8-ac3a-5563c0b96e2c	\N	Avez-vous déjà eu l' impression que quelqu'un vous regardait bizarrement dans la rue?	2025-05-27 21:36:46.581	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
fa5313de-8044-4926-83ea-8ee0402cffa6	\N	Avez-vous déjà eu le sentiment que votre dernière heure était arrivée ?	2025-05-27 21:43:33.747	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
89be8404-7dd9-41a4-a37f-be9f82bbdf33	\N	Pensez-vous que le dérèglement climatique va éteindre l'humanité ?	2025-05-27 21:43:45.69	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
ca6bd1e9-908b-4d56-85a1-9fd54b0a0ba0	\N	Avez-vous déjà fait l'amour devant des témoins? 	2025-05-27 21:43:53.851	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Parfois	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
2038b156-a855-4110-ae56-14cb9cb3d944	\N	Les vrais hommes pissent-ils debout?	2025-05-27 21:44:01.781	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
8ab9c6ba-7d23-437c-862d-a777757ed7b4	\N	Vous a-t-on déjà importuné sexuellement ?	2025-05-27 21:49:33.023	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
35a5f98d-ac55-4231-9cfc-f9d0eee53c36	\N	Pensez-vous que la science sera en capacité de stopper le vieillissement de l'homme ? 	2025-05-27 21:50:00.221	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui, dans 5 ans	cmazpxthm0002qu3ttqezlwor	Oui, dans 5 ans	cmazpxtfz0000qu3tgg4qi5ex
7b7ee81e-b015-4b69-921c-b61dd4557b16	\N	Est ce que la France va gagner la prochaine coupe du monde de football ?	2025-05-27 21:50:23.452	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
da8f8b86-43a4-458d-b7d8-a41f44996b22	\N	Parlez-vous à votre animal de compagnie?	2025-05-27 21:50:31.339	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
4d89d066-8406-49af-b72b-0d76dba7137b	\N	Connaissez-vous quelqu'un membre d'une secte ?	2025-05-27 21:50:39.803	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
eb5b4bdf-63fd-4991-8fea-5c43806b7b05	\N	Vous est-il arrivé de répondre au téléphone pendant que vous faisiez l'amour ?	2025-05-27 21:58:15.506	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
78bbb2a7-3957-4787-aaf4-e99d84e2aac8	\N	Vous est-il arrivé de répondre au téléphone pendant que vous faisiez l'amour ?	2025-05-27 21:58:15.507	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
7c6ab87a-becb-4850-884f-51ab0f0c2801	\N	Portez-vous souvent des sous-vêtements troués?	2025-05-27 21:58:47.789	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
9fc113c3-7202-42cd-9917-ffc44dc69349	\N	Avez-vous déjà eu une liaison avec une personne mariée ?	2025-05-27 21:58:59.546	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
1bfaa100-e340-46af-8326-df6b803aa8b9	\N	Vous est-il déjà arrivé de faire des rêves prémonitoires? 	2025-05-27 22:14:05.297	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Souvent	cmazpxtfz0000qu3tgg4qi5ex	Régulièrement	cmazpxthm0002qu3ttqezlwor
02835ee4-8924-43eb-a6f3-81f4167f65fc	\N	Vous disputez-vous avec votre conjoint?	2025-05-27 22:14:11.366	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Une fois	cmazpxthm0002qu3ttqezlwor	Souvent	cmazpxtfz0000qu3tgg4qi5ex
6184b5a7-4b8b-437e-9aeb-0524a5a10d3e	\N	Combien de fois avez-vous flirté avec un(e) inconnu(e) dans votre vie ?	2025-05-27 22:14:16.853	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	1 fois	cmazpxthm0002qu3ttqezlwor	1 fois	cmazpxtfz0000qu3tgg4qi5ex
a7b203a4-aedf-43a3-adce-57314530338c	\N	Vous-êtes vous déjà fait aider par un psychologue ou un psychiatre ?	2025-05-27 22:14:22.247	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
7135c46e-3c08-4185-b834-ee6d6b8009a2	\N	A quelle fréquence lavez-vous vos draps ?	2025-05-27 22:14:29.835	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Une fois par an	cmazpxthm0002qu3ttqezlwor	Une fois par an	cmazpxtfz0000qu3tgg4qi5ex
0eba7d81-69fc-45ab-a3c6-7218bb2a34ba	\N	Dormez-vous généralement nu ?	2025-05-27 22:15:45.755	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
462ea760-2a3f-4a66-8964-88090f4b77a3	\N	Préféreriez-vous fêter Noël sans échange de cadeaux?	2025-05-27 22:20:34.685	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
2dd550ea-2407-484a-813c-ad9a1d4fb75c	\N	Pourquoi les personnes handicapées sont-elles souvent discriminées?	2025-05-27 22:20:39.196	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Certaines personnes ont peur des différences	cmazpxthm0002qu3ttqezlwor	Certaines personnes ont peur des différences	cmazpxtfz0000qu3tgg4qi5ex
27f0c57b-b9a6-4abe-899d-8bd01d72ad29	\N	Vivez-vous principalement pour vous-même ou pour les autres?	2025-05-27 22:20:44.659	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Principalement pour moi-même	cmazpxthm0002qu3ttqezlwor	Principalement pour moi-même	cmazpxtfz0000qu3tgg4qi5ex
972c9a4e-895d-4183-bf4e-5e3f5ecec734	\N	Vous êtes-vous déjà fait pelotée les fesses par un(e) inconnu(e)?	2025-05-27 22:25:35.079	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
729f630b-490a-4a6c-8cae-ea73bcb5c9cf	\N	Avez-vous déjà fait l'amour en inventant un scénario avec votre partenaire? 	2025-05-27 22:47:08.941	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Régulièrement	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
f2a65376-cb76-4f2e-a376-1680cb299df0	\N	Avez-vous déjà été ligoté(e) pendant que vous faisiez l'amour ?	2025-05-27 22:47:29.215	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
4711b9c7-86fb-4697-b02c-5e7222f517e2	\N	Y'a-t-il une personne qui vous manque au point de penser à elle tous les jours? 	2025-05-27 22:47:35.279	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
b6ef3bcc-4eea-44b7-9d25-7dd0e658c09e	\N	A quelle fréquence avez-vous des relations sexuelles extra-conjugales?	2025-05-27 22:47:53.241	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Une fois par jour	cmazpxthm0002qu3ttqezlwor	Une fois par semaine	cmazpxtfz0000qu3tgg4qi5ex
eb3dd9da-bd7a-4c4b-a7a5-8ccba0c153b8	\N	Etes-vous pour l'adoption par des couples homosexuels ?	2025-05-27 22:51:10.928	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Non	cmazpxthm0002qu3ttqezlwor
432156fe-1732-40cc-8cc9-1bd7fc5288d7	\N	Est-ce que vous aimez la crème glacée?	2025-05-27 22:51:58.193	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
10fc3dd9-5caf-427d-81f8-873e29fe6111	\N	Pensez-vous que toutes les expériences apportent quelque chose de positif ?	2025-05-27 22:55:51.891	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Non	cmazpxtfz0000qu3tgg4qi5ex
f5d81d36-8506-4924-8331-8e9cbf632f8b	\N	Avez-vous déjà sauvé la vie de quelqu'un? 	2025-05-27 22:56:13.785	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
8f7ade72-0362-47f4-957c-c21225201e22	\N	Pensez-vous que l'avortement est un crime ?	2025-05-27 22:56:19.166	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
44ec8a0e-4037-4d21-a9f4-af3ff54f4caf	\N	Quel est votre type d'animal de compagnie préféré ?	2025-05-27 22:56:28.082	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Rongeurs	cmazpxthm0002qu3ttqezlwor	Chats	cmazpxtfz0000qu3tgg4qi5ex
5afd9e8b-07cc-4d09-b398-923235c5d0a4	\N	Seriez-vous prêt à payer vos achats d'avantage s'ils soutenait la cause écologique ?	2025-05-27 23:01:31.258	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
7d08bceb-5be5-4a48-bd77-51e5e9b274dd	\N	Vous êtes-vous déjà rongé les ongles de pieds? 	2025-05-28 06:37:45.205	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Non	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
5047ddc9-2404-4cb9-851e-b4bf439d211d	cmazpxtfz0000qu3tgg4qi5ex	frrfrf	2025-05-28 11:37:30.079	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
13592cb7-33c4-45d6-9491-ba4001bc5a6c	\N	Etes-vous satisfait du dirigeant de votre pays ?	2025-05-28 12:38:22.236	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Oui	cmazpxthm0002qu3ttqezlwor	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex
9d8b8583-0d55-4509-a801-6d6607886a2e	\N	Quand avez-vous embrassé la première fois avec la langue ?	2025-05-28 12:38:32.773	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	5-10 ans	cmazpxthm0002qu3ttqezlwor	5-10 ans	cmazpxtfz0000qu3tgg4qi5ex
128c5f74-ecce-4d32-9321-247b34088616	cmazpxthm0002qu3ttqezlwor	coucou	2025-05-28 18:46:48.539	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
5d6407f6-5436-4964-963a-aaac460da3bd	cmazpxtfz0000qu3tgg4qi5ex	Hello	2025-05-28 18:46:54.418	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	TEXT	\N	\N	\N	\N
fa673675-6130-491a-8c86-49f9df1a3b59	\N	Avez-vous déjà trompé votre partenaire?	2025-05-28 21:17:58.883	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Une fois	cmazpxthm0002qu3ttqezlwor	Jamais	cmazpxtfz0000qu3tgg4qi5ex
3a9972ee-e4f5-420b-a3ea-d80eba460fec	\N	Avez-vous déjà triché lors d'examens?	2025-06-02 13:59:46.035	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Souvent	cmazpxtfz0000qu3tgg4qi5ex	Régulièrement	cmazpxthm0002qu3ttqezlwor
36442f13-9fd1-4802-b59f-562dce71058c	\N	Pensez-vous que les femmes s'intéressent réellement à la taille du pénis de l'homme? 	2025-06-02 13:59:53.769	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxthm0002qu3ttqezlwor	Oui	cmazpxtfz0000qu3tgg4qi5ex
1ed9a3b3-004c-456a-8f89-b89a339f4429	\N	Avez-vous déjà fait un strip-tease à votre partenaire? 	2025-06-02 18:48:15.479	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas danser	cmazpxtfz0000qu3tgg4qi5ex	Je ne sais pas danser	cmazpxthm0002qu3ttqezlwor
7d749f39-7871-4c46-ac16-c9976c578438	\N	Sous quelles conditions doit-on accueillir les migrants ?	2025-06-02 18:48:23.777	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	N'accepter que les plus jeunes	cmazpxtfz0000qu3tgg4qi5ex	Nous devons tous les accepter	cmazpxthm0002qu3ttqezlwor
6c6a7650-722f-4ec3-8a7b-9976983cc682	\N	Abusez-vous de l'alcool quand vous rencontrez des problèmes ?	2025-06-02 18:48:34.307	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Je ne sais pas	cmazpxtfz0000qu3tgg4qi5ex	Oui	cmazpxthm0002qu3ttqezlwor
96bf4e10-5883-4286-a750-182d96db75a0	\N	Avez-vous en votre possession une lettre d'amour de votre ex?	2025-06-02 18:48:38.717	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Une seule	cmazpxthm0002qu3ttqezlwor	Une seule	cmazpxtfz0000qu3tgg4qi5ex
b7c92fdc-cba2-42c8-bd72-9d8b024cb96b	\N	Finissez-vous ce que vous commencez ?	2025-06-02 18:48:47.314	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	f	\N	f	ANSWER	Souvent	cmazpxthm0002qu3ttqezlwor	Parfois	cmazpxtfz0000qu3tgg4qi5ex
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."Question" (id, "groupId", question, locale) FROM stdin;
b9f6be5b-b7df-466d-9430-a6b885af5ccb	b24781f7-d736-4abf-8faa-7d33b59e8a10	Do you have a habit of biting your nails?	en_US
257119aa-b8d0-4b48-94e8-69082a4085d1	b24781f7-d736-4abf-8faa-7d33b59e8a10	Avez-vous l'habitude de vous ronger les ongles?	fr_FR
c9adf189-2d0d-4118-9b6c-7465e24fb203	bc608ac8-bb77-4b23-ab46-159904eb81ae	Have you ever caused damage in a car without leaving your details?	en_US
5b1e5e91-5784-48d0-b498-60f0adb2d1de	bc608ac8-bb77-4b23-ab46-159904eb81ae	Avez-vous déjà causé des dégâts en voiture sans laisser vos coordonnées ?	fr_FR
55ba9d3f-515d-40d8-942e-408ea1c4c8dc	0b145c11-7769-4478-b41b-46cb17c41515	Have you ever been really ashamed of a family member?	en_US
f80615cc-abbf-4123-a7ee-6279f5eb7ff0	0b145c11-7769-4478-b41b-46cb17c41515	Avez-vous déjà vraiment eu honte d'un membre de la famille ?	fr_FR
438c534f-575f-40ac-b892-891e8e375617	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	Will your children live a better life?	en_US
ae2e2751-2554-4e09-8399-7168869bb44e	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	Est-ce que vos enfants vivront une vie meilleure?	fr_FR
61032993-248d-40f1-99f8-e3fd08e92204	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	Do you hate anyone?	en_US
4f669076-d91d-4e72-9522-3156c44f310c	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	Détestez-vous quelqu'un?	fr_FR
690f1e81-523c-4fe6-af42-c9c6e56b7cd2	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	Have you ever kissed with the tongue several people in the same evening? 	en_US
bbcaa725-87fc-4fda-9eae-cc84f2301b83	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	Avez-vous déjà embrassé avec la langue plusieurs personnes dans une même soirée? 	fr_FR
a23ddf33-e9bc-456c-9fe9-43f545e59253	cb526383-921f-4360-bbca-c73e8b3e3033	Are you satisfied with the leader of your country?	en_US
d346c44b-fb38-4eb7-ae8d-859986775e36	cb526383-921f-4360-bbca-c73e8b3e3033	Etes-vous satisfait du dirigeant de votre pays ?	fr_FR
65f549ec-3e8a-468a-9bef-2572cc40653e	6c33684b-038b-4753-8978-04001c98b8d5	Have you ever giggled while having sex?	en_US
315738d3-20c1-47b3-b1aa-30529a2c33fd	6c33684b-038b-4753-8978-04001c98b8d5	Avez-vous déjà eu un fou-rire en faisant l'amour ?	fr_FR
4b57dbed-d34d-44ae-aafd-572ced182bc4	52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	Do you think soldiers are assassins?	en_US
9e65f4df-7cae-4739-92b2-f7a74c98efb1	52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	Pensez-vous que les soldats sont des assassins ?	fr_FR
3632e8d4-24a7-472f-bbb6-d353ae5681f7	32c52d73-9868-473c-b0d2-ee7d526c8a81	Do you think arts education should be compulsory up to the baccalaureate?	en_US
6790451d-cfca-45b8-b183-0cbea471ca83	32c52d73-9868-473c-b0d2-ee7d526c8a81	Pensez-vous que l'éducation artistique devrait être obligatoire jusquau baccalauréat ?	fr_FR
09f1f36f-574d-4774-8476-a4c554de5375	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	Have you ever had an affair with a married person?	en_US
2c33f846-6ee4-420a-af78-0fae524339d2	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	Avez-vous déjà eu une liaison avec une personne mariée ?	fr_FR
cc15158c-bd78-4f37-b333-ad926793a0a7	06a7e629-237c-455a-a361-ec6203ea9234	Have you ever lied on your CV?	en_US
898ec9cf-72d5-4852-b7dc-20d31b76451d	06a7e629-237c-455a-a361-ec6203ea9234	Avez-vous déjà menti sur votre CV ?	fr_FR
183aabd4-3d0c-4e57-9ad0-bf1b198086da	e260af83-cf26-4fdd-b057-880d554eebde	Have you ever broken your word?	en_US
d1804c8f-bcce-4e58-b67b-3859cea7f6d6	e260af83-cf26-4fdd-b057-880d554eebde	Avez-vous déjà manqué à votre parole ?	fr_FR
63da3874-bdd6-4859-b650-7387cc38e7a8	b49f8a1d-4509-4b6c-884f-9a65cac45dcb	Is money a source of conflict in your relationship?	en_US
4bf52093-df86-4b06-9d5a-794e1c50dc82	b49f8a1d-4509-4b6c-884f-9a65cac45dcb	L'argent est-il source de conflit dans votre couple ?	fr_FR
5fccff18-9692-4e4f-99b9-9a4fa949c004	722b8cdb-281a-4797-ab32-32d089dae310	Have you ever knowingly damaged the property of others?	en_US
4cfe8377-fed8-42a4-b034-11125f45deb5	722b8cdb-281a-4797-ab32-32d089dae310	Avez-vous déjà abimé le bien d'autrui sciemment ?	fr_FR
cbc24dbe-87b0-42fa-83a1-1e50d5f632c8	09847df2-36f8-4b53-99af-48974fb53dcf	Have you ever been the victim of physical assault?	en_US
9cfa24b1-8580-4212-b04a-4f2929953d6d	09847df2-36f8-4b53-99af-48974fb53dcf	Avez-vous déjà été victime d'une agression physique?	fr_FR
9fafb3e7-e13a-4d6b-92c9-76b308c732cf	d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	Have you ever giggled while having sex?	en_US
654547a6-3530-4f23-94a9-a1a61cb69fc0	d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	Avez-vous déjà eu un fou-rire en faisant l'amour ?	fr_FR
084943bb-8270-4b1f-a7a8-f9400afdb532	cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	Have you ever faked an orgasm?	en_US
8b75a315-9586-41e8-8541-8d1498a12f2a	cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	Avez-vous déjà simulé un orgasme ?	fr_FR
ef368d1a-59b8-4f1c-9458-e00793c03fe2	15752b7a-b58c-4e8c-a95e-1776b1abd57c	Do you have a specific goal in life?	en_US
b26f1485-cd98-4717-9c94-c78ae6adde0a	15752b7a-b58c-4e8c-a95e-1776b1abd57c	Est-ce que vous poursuivez un but bien précis dans la vie?	fr_FR
6bb813e5-c77f-4dfe-85f8-a3830e73993b	f66fd69e-fbeb-443b-a021-c298e513a6f8	Did you repeat in school?	en_US
c8b1db2d-3115-40df-9c3b-abddc3d97296	f66fd69e-fbeb-443b-a021-c298e513a6f8	Avez-vous redoublé à l'école ?	fr_FR
9d0928c1-5cd9-435b-a27f-0965b20e6977	2480c44e-c2bf-434b-a447-8217584b25c3	Has one of your partners ever admitted to cheating on you?	en_US
0b67de93-217c-4734-881b-16f43fdf0fce	2480c44e-c2bf-434b-a447-8217584b25c3	Un de vos partenaires vous a-t-il déjà avoué vous avoir trompé ?	fr_FR
4ece100a-045c-41c4-9aa4-36e564025b14	05e41b42-81d8-473f-a63e-7326ff72ed9f	Have you ever felt an unwarranted fear of death?	en_US
edc00452-f867-497f-a529-583ca2a66e85	05e41b42-81d8-473f-a63e-7326ff72ed9f	Avez-vous déjà ressenti une peur injustifiée devant la mort ?	fr_FR
fcfe9b4b-6558-4f37-b450-62594f825d3a	4aabf8df-2528-455f-ab2e-d0896dcd8687	Are you really happy?	en_US
c2fecce1-480d-469b-ac43-554440d01bfa	4aabf8df-2528-455f-ab2e-d0896dcd8687	Etes-vous vraiment heureux?	fr_FR
bcfacc15-4e65-4ec8-8527-ed9253489ea5	4adf2538-72ec-40a1-8ac2-aa0522918bce	Do you find yourself attractive?	en_US
68d23596-96d8-49ed-92a6-8319ac245d7a	4adf2538-72ec-40a1-8ac2-aa0522918bce	Vous trouvez-vous séduisant(e) ?	fr_FR
ba971d2d-b9af-4f36-bfce-da1933572971	ee6d9a0a-ef03-4b19-862e-1bc8544acc40	Have you ever bought charming magazines?	en_US
870ef4a2-c783-49e5-b325-d36b63a43d6f	ee6d9a0a-ef03-4b19-862e-1bc8544acc40	Avez-vous déjà acheté des magazines de charme ?	fr_FR
341aa7e7-2694-4dcb-9a5a-53f002d42229	17710c4a-ceea-4f99-8e8a-9ea7be68df69	Do you think soft drugs should be over the counter?	en_US
6c6227fa-e995-4e86-98b8-7948aeb6d0cb	17710c4a-ceea-4f99-8e8a-9ea7be68df69	Pensez-vous que les drogues douces devraient être en vente libre ?	fr_FR
2aa77151-eab2-432b-acc8-cf572fc53287	061834a0-1650-41a8-a8c6-4f4c8cb6831f	Do you think the president of your country is a jester? 	en_US
d6372243-cc38-4da3-823f-94f9a68bec10	061834a0-1650-41a8-a8c6-4f4c8cb6831f	Pensez-vous que le président de votre pays est un bouffon? 	fr_FR
b358d25f-a7a1-495b-9eba-2a4fa507d2d3	7e1633f0-2688-488f-b8e2-9672b31ea37e	Do you think the most important thing in a relationship is to support each other?	en_US
b3b27e06-ab05-4ab5-b8e4-7fa4a6727668	7e1633f0-2688-488f-b8e2-9672b31ea37e	Pensez-vous que l'essentiel dans un couple est de se soutenir mutuellement?	fr_FR
9f746c18-ddb8-492f-ade0-d170362377fa	97553132-efe4-436a-8463-55773a02c6ae	Do you think reality TV should disappear from our screens? 	en_US
d4fbe46f-1805-4c7a-a044-c1b183e4d557	97553132-efe4-436a-8463-55773a02c6ae	Pensez-vous que la télé-réalité devrait disparaître de nos écrans? 	fr_FR
9489e901-c6dd-4f8e-8f0a-7e7cee59e3b0	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	Do you like to bathe naked?	en_US
f7eff9e9-393b-4d94-92f4-14af74476b97	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	Aimez-vous vous baigner nu ?	fr_FR
7c65e9ff-97b7-43bf-a90a-814a184dca9c	5442e950-bbfb-4c60-a047-3a21057e2a13	Do you find it hard to speak in public?	en_US
89419f5e-e103-4b92-b767-82b3a578ab5e	5442e950-bbfb-4c60-a047-3a21057e2a13	Vous est-il pénible de faire un discours en public ?	fr_FR
2d352ae7-b30a-490e-95da-a2baacfd62dc	a2057581-a0ce-49ca-b4a2-95fe17562b65	Have you ever fallen asleep at work?	en_US
d13f49fc-bd9c-4ea9-b646-d0e25e4de421	a2057581-a0ce-49ca-b4a2-95fe17562b65	Vous-êtes vous déjà endormi au travail ?	fr_FR
b55528c2-0750-4f32-8a61-059c4679c83e	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	Do you talk about your intimate life with your best friends?	en_US
e0942c4b-6cc0-4be1-b7b4-6a05b41bcf01	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	Parlez-vous de votre vie intime avec vos meilleurs amis ?	fr_FR
148c5185-8ef6-4cae-876d-401e35dba4f6	d1716ea4-7264-434a-9a81-2c7229d41454	Have you ever had a giggle during a funeral?	en_US
a844df9a-3dbb-4c87-861e-355381a08681	d1716ea4-7264-434a-9a81-2c7229d41454	Vous est-il arrivé d'avoir un fou rire pendant un enterrement ?	fr_FR
37245921-8992-46db-a5bc-4e89646be832	0241015c-e821-43e3-a1b0-2aa3456107b9	Have you ever blamed someone else? 	en_US
b30e6c7e-93c7-4798-8ad2-5b557c8903ca	0241015c-e821-43e3-a1b0-2aa3456107b9	Avez-vous déjà fait porter le chapeau à quelqu'un d'autre? 	fr_FR
d9fc7b17-5657-492d-a291-b1d873dfc1bf	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	Do you know someone who is a member of a cult?	en_US
842fa941-05f8-49df-8a87-c52e58ab5a32	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	Connaissez-vous quelqu'un membre d'une secte ?	fr_FR
dec10521-918d-4380-8807-9edb02979c3a	44beeb67-10c4-4088-8c01-03f44cbae9f9	Have you ever felt like your last hour had come?	en_US
b875c0f2-f70c-4a4c-b193-d9067531e985	44beeb67-10c4-4088-8c01-03f44cbae9f9	Avez-vous déjà eu le sentiment que votre dernière heure était arrivée ?	fr_FR
99f1e386-d9ae-4b2d-ba0f-c667827898ab	de3b04ee-9038-47f2-9d7b-68823d41cbac	Have you ever been ashamed of your spouse?	en_US
54bad3af-0ca3-48b8-8b40-ed59bb74b977	de3b04ee-9038-47f2-9d7b-68823d41cbac	Avez-vous déjà eu honte de votre conjoint(e) ?	fr_FR
8c491ee7-454d-4a2c-9128-aa1431ebba66	855cae49-e0d6-4ae8-8c69-3af1ba09d294	Do you think the use of the atomic bomb possibly justifiable in certain circumstances?	en_US
43593e60-b6b0-4164-a4dc-5629ee5a575d	855cae49-e0d6-4ae8-8c69-3af1ba09d294	Pensez-vous l'utilisation de la bombe atomique possiblement justifiable dans certaines circonstances ?	fr_FR
dcc025af-68e1-473f-8077-0452426f17c3	291601c1-9b3c-49a2-a78c-e46e9137b001	Have you ever flipped a coin?	en_US
3f9e8a9e-1c67-45d8-bc90-a2ac8db23da6	291601c1-9b3c-49a2-a78c-e46e9137b001	Avez-vous déjà pris une décision à pile ou face?	fr_FR
768622d4-d062-48af-9cd5-f5cdf098c99b	af5a66e5-bf31-4262-8976-89cd8ea4eb56	Do you attach a lot of importance to the cleanliness of your home?	en_US
d0f294ce-b580-45da-be9b-89065f491f14	af5a66e5-bf31-4262-8976-89cd8ea4eb56	Attachez-vous beaucoup d'importance à la propreté de votre logement ?	fr_FR
13d9ccd1-14d0-41dc-93f0-eeca9b2f73df	100d8668-342b-4430-9652-7ac4a042684a	In certain circumstances, can military intervention in a country in crisis be the best solution?	en_US
cb43ad4e-11c0-4901-bd13-0bbd5406aef5	100d8668-342b-4430-9652-7ac4a042684a	Dans certaines circonstances, l'intervention militaire dans un pays en crise peut-elle être la meilleure solution?	fr_FR
4160e645-bc8a-4939-92f0-b66186e21f3a	c9ab248e-c179-4fbb-ba58-b7efe09847ab	Do you approve of genetic manipulation of embryos?	en_US
47746495-f65e-4bf6-af40-e5802b9d40fb	c9ab248e-c179-4fbb-ba58-b7efe09847ab	Approuvez-vous la manipulation génétique des embryons?	fr_FR
7e7139df-5088-4104-a244-de98bec0705a	77c41e5c-949f-4bc2-8104-dc16bd16fc07	Have you ever called the police over a neighborhood dispute?	en_US
93f912c7-dfbe-4a0f-ba59-908a33c3dadf	77c41e5c-949f-4bc2-8104-dc16bd16fc07	Avez-vous déjà appelé la police pour une querelle de voisinage ?	fr_FR
84b8dc41-6321-49a0-9300-6a3e2efdeb2a	c3faadfe-b096-448d-a704-868d3d6fbadf	Do you think we will drive flying cars in the future?	en_US
d5f3c06c-b0b9-49bc-8431-cb60403efd29	c3faadfe-b096-448d-a704-868d3d6fbadf	Pensez-vous que nous conduirons des voitures volantes dans le futur?	fr_FR
9556c51d-33b0-41e3-bc8a-1b79f32247bd	f34c7766-37cb-455d-b19f-28b34aac51e7	Are you holding a grudge? 	en_US
e4d6eb16-f411-433a-9107-1f0bbea1113a	f34c7766-37cb-455d-b19f-28b34aac51e7	Etes-vous rancunier? 	fr_FR
2665d2de-102d-4e8d-a4ff-0fb2e2b3eb71	87cd330c-29f0-43d6-a30a-18859f64d7c7	Have you ever had someone black work?	en_US
4da5e358-7b28-4a51-af54-6948a8328c23	87cd330c-29f0-43d6-a30a-18859f64d7c7	Avez-vous déjà fait travailler quelqu'un au black ?	fr_FR
02dcb465-12bf-4673-83f5-734036d6b636	4eadaeb2-c165-4488-b119-97ddc5aa51c5	Do you have trouble making decisions?	en_US
4fc803cb-69e5-4df4-9a16-4ec948f893ee	4eadaeb2-c165-4488-b119-97ddc5aa51c5	Avez-vous du mal à prendre des décisions ?	fr_FR
abf56302-51f8-4739-9c40-c1e8c36d6ece	d6253326-0b34-40d6-8125-d3a1b8cfabaa	Do you park in places reserved for the disabled?	en_US
1c89ab6d-50df-4e5f-815a-c8ea275e6d03	d6253326-0b34-40d6-8125-d3a1b8cfabaa	Vous arrive t-il de vous garer sur les places réservées aux handicapés ?	fr_FR
38a8abac-dc7b-4671-ac64-87e2d886daef	7a9ca40a-914c-47fa-92dc-f74889a99208	Would you like to change jobs?	en_US
922acc47-5ad3-4de2-b3bb-1c180358bbd3	7a9ca40a-914c-47fa-92dc-f74889a99208	Aimeriez-vous changer de métier ?	fr_FR
c9f88c93-a22e-4ac5-93ae-507e1692f775	38f58c1f-0ca6-40b6-bba6-7c444e842921	Do you think polyamory, that is, having several romantic relationships at the same time, possible?	en_US
92928ba7-85e2-4478-ac97-7e87009b5ed9	38f58c1f-0ca6-40b6-bba6-7c444e842921	Pensez-vous le polyamour, cest-à-dire le fait d'avoir plusieurs relations amoureuses en même temps, possible ?	fr_FR
6ab0db3d-8f88-482d-9507-4657095cce67	0d7f4f2a-3424-4789-b732-a0b32286815d	Do you think suicide is a selfish act? 	en_US
844992c3-6137-4ab4-ac43-e8e41e68ab1d	0d7f4f2a-3424-4789-b732-a0b32286815d	Pensez-vous que le suicide est un acte égoiste? 	fr_FR
d164fadd-787b-412b-8e97-e2b13dc9e5f3	36a8daa4-7741-40e2-86aa-be5eb874e275	Are you curious about what happens after death?	en_US
b1bda477-3d3d-4da6-a268-3ef00d8226cd	36a8daa4-7741-40e2-86aa-be5eb874e275	Etes-vous curieux de savoir ce qui se passe après la mort?	fr_FR
0a3b2d53-d24d-4b58-a007-ae8505bd1935	5ba28665-5140-4503-8b0f-e4f91937f423	Have you ever told a stranger that you found him or her hot?	en_US
1e16538a-d3a0-448c-b028-e32880e59142	5ba28665-5140-4503-8b0f-e4f91937f423	Avez-vous déjà dit à un ou une inconnue que vous le ou la trouviez canon ?	fr_FR
ec2f8f8d-94c7-4e9c-a4dd-b9de85a7c54b	aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	Do you have a tattoo?	en_US
d2fe922c-b52d-4b09-a493-fb51d1bf98b5	aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	Avez-vous un tatouage ?	fr_FR
8bb257f5-37b2-4b56-b94d-148213f1c180	f32eac61-aa16-4095-94e0-9c786b8c70de	Do you panic at the sight of blood?	en_US
3e283d82-95a0-4b36-88cf-b67de4c0c30f	f32eac61-aa16-4095-94e0-9c786b8c70de	Paniquez-vous à la vue du sang ?	fr_FR
92c15d8b-bfca-44c3-8d5b-2cf27f35c889	dae0875e-7812-483f-8760-b98ab8bde6cc	Do you believe in the benefits of homeopathy?	en_US
dc967e9f-ef73-490c-aaa3-c7249c6578bd	dae0875e-7812-483f-8760-b98ab8bde6cc	Croyez-vous aux bienfaits de l'homéopathie ?	fr_FR
0ec73515-fc49-406c-86c8-f5188e7aa330	faadcff3-7957-4c4e-8620-50a24b37c862	Have you ever had a paranormal perception? 	en_US
626295c2-03b8-479d-99be-b3950ee68ebc	faadcff3-7957-4c4e-8620-50a24b37c862	Avez-vous déjà eu une perception paranormale? 	fr_FR
1e0a780a-227b-44b9-af64-e0f3ca49181c	f4d8008c-0888-400d-a388-87c0299d6e0e	Have you ever read writings from a religion other than your own?	en_US
6808c09a-5ee6-4bc4-b48e-58a61fabc46f	f4d8008c-0888-400d-a388-87c0299d6e0e	Avez-vous déjà lu des écrits d'une autre religion que la votre ?	fr_FR
6fb9e61d-284e-41a6-baaa-efae75d4e2e9	cfc5ac21-333d-4f60-93cd-542a39a65749	Are you eating your boogers?	en_US
8178c4a0-da03-4d73-b263-fc16f019cb78	cfc5ac21-333d-4f60-93cd-542a39a65749	Mangez-vous vos crottes de nez?	fr_FR
be44ca72-885d-4801-adbc-75d3e6660287	d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	Do you feel like you belong to the present day?	en_US
94e97808-fc30-43e4-84df-6cd34eb4742b	d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	Avez-vous l'impression d'appartenir à l'époque actuelle?	fr_FR
2f9a1730-9f37-42b3-b026-ea281c356457	54da03ba-5802-4292-a21d-8ca3c4a9492b	Do you think sex criminals should be punished much more severely?	en_US
7acc6a22-88ed-4890-a4aa-bb6180db682e	54da03ba-5802-4292-a21d-8ca3c4a9492b	Pensez-vous que les criminels sexuels devraient être punis bien plus sévèrement ?	fr_FR
b46ef73d-f7dc-43a5-bff6-7471685d5261	3ea2d4f9-571d-48db-8919-2752c85b57c8	Have you ever run out of gas?	en_US
427c9974-c100-4805-a042-050aa697c49f	3ea2d4f9-571d-48db-8919-2752c85b57c8	Etes-vous déjà tombé(e) en panne d'essence ?	fr_FR
d3ce83b8-de9e-4c3e-91b5-3a958833bf9d	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	Have you ever been sexually bothered?	en_US
f4150e37-5f9d-4aef-8a0b-9475a0a3a824	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	Vous a-t-on déjà importuné sexuellement ?	fr_FR
f1ec62eb-2551-4415-8650-28bd38a4ed7a	c704b3be-98bc-4c14-998d-11df3b1bc815	Do you think a higher intelligence civilization lived on Earth before man as we know him? 	en_US
304ccd90-3f5a-40bf-a445-6f264eddc6f2	c704b3be-98bc-4c14-998d-11df3b1bc815	Pensez-vous qu'une civilisation d'intelligence supérieure a vécu sur Terre avant l'homme tel qu'on le connait ? 	fr_FR
ff45083d-6771-49ad-80a8-159d32d5de20	7fdf9127-88d1-42cd-a7f1-e41f8453f4de	Do you have a tendency towards voyeurism?	en_US
41de6bc8-1eb4-451a-8513-c3c4af43bddb	7fdf9127-88d1-42cd-a7f1-e41f8453f4de	Avez-vous une tendance au voyeurisme ?	fr_FR
af5a3e3a-d48e-44d4-b262-c9579c837c54	3435a490-9687-4edf-962e-b7954022582f	Have you ever hit a partner during sex? 	en_US
de8d1f08-e2ec-4992-8700-b77c864be4fa	3435a490-9687-4edf-962e-b7954022582f	Avez-vous déjà frappé un partenaire lors d'une relation sexuelle? 	fr_FR
c801b8b9-21ad-4c48-82fc-6a3c75dc6cc7	730e74c7-6338-49f7-8f0d-4cacb3467703	Have you ever secretly spat on someone's plate or glass?	en_US
4ee0b620-2ed2-4060-a0f8-af2080436dea	730e74c7-6338-49f7-8f0d-4cacb3467703	Avez-vous déjà secrètement craché dans l'assiette ou le verre de quelqu'un ?	fr_FR
01aafeff-d419-4ab9-b795-17b3c3aed578	facf297a-ab60-430b-b605-ad6ce6d6babf	Do you own any erotic accessories?	en_US
c76d760a-6fb6-4525-b08f-a5a7aa7bb67d	facf297a-ab60-430b-b605-ad6ce6d6babf	Possédez-vous des accessoires érotiques?	fr_FR
d56b81b0-5a40-423e-8e56-923705c30a52	f0991fcd-ba86-43ed-bb8d-30ee6f813530	Do you tend to procrastinate what you can do the same day? 	en_US
1805417c-b4a5-48b6-a263-19db2489b6f7	f0991fcd-ba86-43ed-bb8d-30ee6f813530	Avez-vous tendance à remettre à plus tard ce que vous pouvez faire le jour même? 	fr_FR
40a844cb-1e9c-4822-a245-202b38ce008d	be520403-d204-4be1-9bb9-9a3e1356d4c3	Have you ever photocopied part of your anatomy?	en_US
f347eb7b-62d6-48f1-b5c0-45177a383333	be520403-d204-4be1-9bb9-9a3e1356d4c3	Avez-vous déjà photocopié une partie de votre anatomie ?	fr_FR
f0fc5573-c797-4c9d-84d2-5a1c851ffe2a	98398a41-fecc-4fa6-9697-89911e0e4644	Do animals, let alone humans, have souls? 	en_US
408d76e1-032c-4d0f-9f99-5a25fee492f5	98398a41-fecc-4fa6-9697-89911e0e4644	Est-ce que les animaux, sans parler de l'homme, ont une âme ? 	fr_FR
7da9d3ee-7f6d-448d-bd3a-10dd2bf84264	6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	Do you ever lie about your political opinions?	en_US
080c4bae-0a89-4276-bf53-d2b12f8c09ca	6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	Vous arrive t-il de mentir sur vos opinions politiques ?	fr_FR
c08441e4-325c-4a3f-9222-859b88028986	3e1936f9-a4d4-4026-adaf-16f845619eab	Do you think you would make a good head of state?	en_US
018acf7d-e968-4970-9702-4600d27b8e49	3e1936f9-a4d4-4026-adaf-16f845619eab	Pensez-vous que vous feriez un bon chef d'état ?	fr_FR
959ca361-38be-47e9-8e90-43e1038c574b	f36c221b-eed4-4623-a91f-7f72a446e781	Do you think women really care about the size of a man's penis? 	en_US
c9512304-1fd3-4756-a8ea-c3475604a9b3	f36c221b-eed4-4623-a91f-7f72a446e781	Pensez-vous que les femmes s'intéressent réellement à la taille du pénis de l'homme? 	fr_FR
5757f939-852f-4f87-a47e-5e74199603b5	9500303b-48bd-40e9-ae19-c0dcd79e0811	Can a person's weight be a crippling criterion in your search for a partner?	en_US
12464e25-6161-47bd-9878-481f6fd68acc	9500303b-48bd-40e9-ae19-c0dcd79e0811	Le poids d'une personne peut-il être un critère rédhibitoire dans votre recherche de partenaire ?	fr_FR
36d368ae-0e14-417b-bfa7-61bbc8395537	eb363c21-ad10-43d8-a05f-1c725b5e9737	Do you know how to keep a secret?	en_US
a1a99552-a2a9-405a-93e4-31a78cba4ce1	eb363c21-ad10-43d8-a05f-1c725b5e9737	Savez-vous garder un secret?	fr_FR
621cdfef-cbbd-4266-8430-f7a81a8d4d94	d29aa121-4e91-4123-bb89-809c951fe928	Do you think the earth is round?	en_US
b629aa04-98dd-4c03-84d2-28915664592f	d29aa121-4e91-4123-bb89-809c951fe928	Croyez-vous que la terre est ronde ?	fr_FR
4b0cab3e-e1a8-400d-924e-040b74b578bd	6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	Have you ever been unfair to someone who hasn't done anything to you?	en_US
74f3d644-daf4-4d29-a52c-2b3f785b1194	6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	Avez-vous déjà été injuste avec quelqu'un qui ne vous avait rien fait ?	fr_FR
68ccee1e-5e17-4b71-9ee3-a46a6bd7620d	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	Have you ever broken something of value in anger?	en_US
3be74768-34da-4bf5-ab62-ca1dae1ed5e7	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	Avez-vous déjà cassé un objet de valeur sous l'effet de la colère ?	fr_FR
568b5a28-3079-44d1-a1d6-c9c80be7c1b0	aaeb0306-d159-4510-baf8-905a12c13971	Have you ever giggled while having sex?	en_US
20e99434-6f2c-4262-9bf2-ba347a885b73	aaeb0306-d159-4510-baf8-905a12c13971	Avez-vous déjà eu un fou-rire en faisant l'amour ?	fr_FR
8034f846-5da0-47c8-bd44-5e5a5a1dd64a	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	Are you satisfied with the actions of the mayor of your city?	en_US
14a56e71-d612-448f-b2d0-6bb3aa040873	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	Etes-vous satisfait des actions du maire de votre ville ?	fr_FR
ec9a86ba-a61b-4c73-8a4f-33fb15677b68	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	Can you cheat on your partner even when you love them?	en_US
d760006a-ca79-43fa-ab2b-7a62df3fd19f	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	Peut-on tromper son conjoint ou sa conjointe même quand on l'aime ?	fr_FR
820f914e-1767-48cd-a6b8-b05106f20822	3507b7c1-b87d-4572-95ff-0c7345d8d5e9	Do you like to hug your mom?	en_US
69153ba4-5879-414a-b089-eb480cf94751	3507b7c1-b87d-4572-95ff-0c7345d8d5e9	Aimez-vous faire des calins à votre maman ?	fr_FR
d211dccb-15db-4d03-9c7d-0563e4701499	149697d1-db36-4403-97a9-41e4d1fd917b	Do you think you are a good shot?	en_US
4402dc86-e220-4eb8-8b9e-276491719ec0	149697d1-db36-4403-97a9-41e4d1fd917b	Pensez-vous être un bon coup ?	fr_FR
fff5be69-f1d8-4491-aa08-2d9325018ad9	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	Would you stay with your spouse if you found out that he had cheated on you?	en_US
9e673d1c-8093-460c-8568-8216b8370448	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	Resteriez-vous avec votre conjoint si vous appreniez qu'il vous a trompé ?	fr_FR
0935a5b8-5f76-425b-9dc9-960440e656e5	3d221b83-94d7-4992-a6fd-d15f7b201dd1	Are you attracted to strong people?	en_US
5a0e1099-b9cd-419a-b990-bb40a942c4ea	3d221b83-94d7-4992-a6fd-d15f7b201dd1	Etes -vous attiré par les personnes fortes?	fr_FR
6b2e7a3f-797f-4b18-9b3b-97e37fd68816	c5caa3e2-9489-4389-9e4b-07a5a1503dd7	Do you like the United States?	en_US
ce47df6e-9d60-4f8e-a8ac-930a68b5e34c	c5caa3e2-9489-4389-9e4b-07a5a1503dd7	Aimez-vous les Etats-Unis?	fr_FR
9e9d5f43-ee84-4b54-b7e7-5817f065bb22	19d491a3-88f7-4b55-a615-1538bd85e488	Do you think that local politicians should be given more power and resources by your country? 	en_US
21fe6543-8561-4c77-8488-46c66c63d9ab	19d491a3-88f7-4b55-a615-1538bd85e488	Pensez-vous que les hommes et femmes politiques locaux devraient se voir confier plus de pouvoirs et de moyens par votre pays ? 	fr_FR
e27fa87c-4f3a-4f95-8343-accab1a4f537	ba5baebe-ab16-4d31-8530-edee9ba059f6	Does the sexual organ of the opposite sex turn you off? 	en_US
e9e17ff8-31c9-401b-b557-aad0f4629e72	ba5baebe-ab16-4d31-8530-edee9ba059f6	L'organe sexuel du sexe opposé vous dégoûte t'il? 	fr_FR
7041ad03-9839-4a3f-9c99-a5620c480325	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	Would you be ready to leave everything for your relationship?	en_US
e96cc17e-be97-41ec-b070-aa4e556e91a2	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	Seriez-vous prêt à tout quitter pour votre couple ?	fr_FR
1458b74d-a89a-4d19-a57b-e963a9a8f5ae	b7b05f57-085c-4e59-98ff-5b7be5b188e8	Are you a fan of kamasutra?	en_US
7521cdf3-1556-439d-877d-ffe286dd2eff	b7b05f57-085c-4e59-98ff-5b7be5b188e8	Etes-vous adepte du kamasutra ?	fr_FR
f07a14f0-6e31-4b3c-9bf2-af07fb9c0bbf	8113da5b-1635-4fa4-be4d-92387cb97b94	Do you tip people who help you?	en_US
712e64d2-465f-4484-adca-4fbfac4dcf66	8113da5b-1635-4fa4-be4d-92387cb97b94	Laissez-vous des pourboires aux personnes qui vous rendent service?	fr_FR
6f58cd70-52da-4410-a100-74a2db5a8aa4	0a02d438-398f-43d9-84dd-dfca9147e058	Have you ever been able to sell you something you didn't want?	en_US
5acebf64-e658-4de7-90c6-49600670ecc8	0a02d438-398f-43d9-84dd-dfca9147e058	A-t-on déjà réussi à vous vendre quelque chose que vous ne vouliez pas ?	fr_FR
74e6fa79-7495-4216-9d50-2ee5bebeae62	a6faf59d-3e12-41e0-8284-3cd716c55079	Have you ever killed an animal outside of the hunt?	en_US
050e58ec-441e-4d68-b544-70727318ab33	a6faf59d-3e12-41e0-8284-3cd716c55079	Avez-vous déjà tué un animal en dehors de la chasse?	fr_FR
83014b72-6228-4f36-8a60-7832eebeeeb0	be2b14ea-489e-490a-8398-79716b05cfda	Have you ever been convicted by a court?	en_US
3f52411c-c2f0-41c0-86e9-c89f78746c8f	be2b14ea-489e-490a-8398-79716b05cfda	Avez-vous déjà été condamné par un tribunal ?	fr_FR
2a03c3f6-2f6d-49e2-b986-3ea114ae9ef0	74927512-e8a6-48b3-9277-8a9208195cad	Have you ever put your tongue in someone's ear? 	en_US
f9bd9ce4-432a-4244-9545-c1a305f38174	74927512-e8a6-48b3-9277-8a9208195cad	Avez-vous déjà mis votre langue dans l'oreille de quelqu'un? 	fr_FR
8e2a7f3d-721e-490e-8c75-0a6a623a7204	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	If your best friend killed someone, would you help them hide the body?	en_US
57b7eed4-5fba-40e1-925e-2a40c5b991cf	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	Si votre meilleur ami tuait quelqu'un, l'aideriez-vous à cacher le corps ?	fr_FR
db1b8c1d-821c-41ab-87a6-8fb13f1ae0f0	f072f18e-5645-48ad-bce9-2ed57ebeb1de	Do you like your first name?	en_US
d7e870f1-20e6-470f-93f4-c429742d5f64	f072f18e-5645-48ad-bce9-2ed57ebeb1de	Aimez-vous votre prénom ?	fr_FR
34cac1cf-0eae-459b-84fc-35131445b426	733c585b-631f-4dfb-a3a5-aec524d5a4e0	Are you jealous very quickly?	en_US
d731447c-c512-4d61-94cb-85b6462f7b8c	733c585b-631f-4dfb-a3a5-aec524d5a4e0	Etes-vous très rapidement jaloux ?	fr_FR
791fb5e9-fc30-4bda-920d-e6000d1e9010	dc459bb7-9061-498b-b81d-744a44c3ba80	Do you think you could have become a terrorist if you had evolved in another culture and in another environment?	en_US
1b268a66-1ff8-43e9-a219-3c7ccd6b3297	dc459bb7-9061-498b-b81d-744a44c3ba80	Pensez-vous que vous auriez pu devenir un terroriste si vous aviez évolué dans une autre culture et dans un autre environnement?	fr_FR
74b08c0a-2292-43c4-b45b-10c7cc46b7c7	88a25016-8c96-4e35-9aa5-91cea5a956a7	Do you believe in humanism?	en_US
42712975-9b5b-41af-b661-ed1c84e9c1e0	88a25016-8c96-4e35-9aa5-91cea5a956a7	Croyez-vous à l'humanisme?	fr_FR
e6e01a95-26ef-4811-a23c-a6aac38002c8	b0f828e0-6620-4249-b6f7-8523f1dc91c8	Are you buying counterfeit products?	en_US
a2772de0-caf2-455a-90cd-add095c31a1c	b0f828e0-6620-4249-b6f7-8523f1dc91c8	Achetez-vous des produits contrefaits ?	fr_FR
a7c4875a-2785-462d-9e8d-b970c528f488	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	Do you have an addiction problem?	en_US
a93dce06-2d8a-409c-b060-65157a6751a7	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	Avez-vous un problème de dépendance ?	fr_FR
b755e28a-bd3a-4e87-a01e-21f04d0bbb42	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	Do you have an object carefully hidden in your home?	en_US
56031042-ce66-496f-b382-18c002fab5c9	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	Avez-vous un objet soigneusement caché chez vous ?	fr_FR
f7da29c9-fff6-4cf4-bb01-667148c340c0	877d43c0-ae02-4b6e-b348-ad3494b0a2a0	Do you ever smell your farts under the sheets for pleasure?	en_US
e62eeb48-9fd8-4674-9ea7-ad447abfb716	877d43c0-ae02-4b6e-b348-ad3494b0a2a0	Vous arrive t-il de sentir l'odeur de vos pets sous les draps par plaisir ?	fr_FR
1d747af8-ea02-48c6-ab6a-2a58a8075650	0d46ab9b-8fb1-474d-8a77-566422449236	Do you have exhibitionist tendencies?	en_US
2e5d5512-943c-4d45-af63-dec566c51b34	0d46ab9b-8fb1-474d-8a77-566422449236	Avez-vous des tendances exhibitionnistes ?	fr_FR
7b581d1a-af85-4ef1-8871-85a503995123	e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	Do you think it takes piston to be successful in life? 	en_US
831fb495-b6b0-410c-aa13-41782a6b5b4f	e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	Pensez-vous qu'il faut du piston pour réussir dans la vie? 	fr_FR
c77abfbe-b201-4434-bd92-3df85116fe74	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	Have you ever found a wallet whose money you kept?	en_US
58fdf714-8450-4b10-bc19-c9af92eb248a	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	Avez-vous déjà trouvé un portefeuille dont vous avez gardé l'argent ?	fr_FR
b684ef41-6c41-46d9-89a5-c72aa228d0a4	d6a288b7-0c0e-40d7-9d16-5a35490c961e	Are you still attached to one of your exes?	en_US
02596eea-fcf8-4b99-85fd-fb6e5ba8ca08	d6a288b7-0c0e-40d7-9d16-5a35490c961e	Etes-vous encore attaché à un de vos exs ?	fr_FR
3fe021a7-934e-4f5d-a956-ce67ce8eda8d	07817ed1-248b-48c5-8a3f-8bab1d363f2b	Are you okay with the current state of the world?	en_US
9fe55e7e-7ca7-4b51-a433-420a5aa7cd6b	07817ed1-248b-48c5-8a3f-8bab1d363f2b	Est-ce que l'état actuel du monde vous convient?	fr_FR
6ca4da5b-81ff-4032-8020-8924a372f306	5d9f9e71-0476-40d3-844f-6f3ceee1488d	Have you ever had sex while drunk?	en_US
8f891dab-617f-4fae-ab58-3f3a75acf4c6	5d9f9e71-0476-40d3-844f-6f3ceee1488d	Avez-vous déjà eu des rapports sexuels en étant ivre ?	fr_FR
914bc7e2-aa31-4092-bd36-caf932ed40c7	89996d94-15b6-4ab0-bef1-05bd7877f9c0	Do you think Islamists (not to be confused with Muslims) are fundamentally bad?	en_US
f4522bf4-c178-4e4f-9c33-915325e4b16a	89996d94-15b6-4ab0-bef1-05bd7877f9c0	Pensez-vous que les islamistes (à ne pas confondre avec les musulmans) sont fondamentalement mauvais?	fr_FR
612dbd5c-b7a5-47a9-b441-44b00ba93f4b	1597c559-8579-435c-b0f2-fb8c5ce40917	Have you ever stuck chewing gum under a table or chair?	en_US
2d3798a8-7df4-463a-92e5-ca423f4643eb	1597c559-8579-435c-b0f2-fb8c5ce40917	Avez-vous déjà collé un chewing-gum sous un table ou une chaise?	fr_FR
76cf1e6e-c123-445d-9061-e954835beaad	ef344e03-8c7c-4fc9-9535-83bd8978d346	Are you superstitious?	en_US
be5164fa-3dce-46c3-a633-8d84efbea685	ef344e03-8c7c-4fc9-9535-83bd8978d346	Etes vous superstitieux ?	fr_FR
c4fb3236-7eda-47cc-85e1-a747d563640d	d9763a18-a497-4720-9deb-82a84e1f14ad	Do you think men are less caring than women?	en_US
6cb1bf42-462c-4696-8f72-80c9a2fdc2a9	d9763a18-a497-4720-9deb-82a84e1f14ad	Pensez-vous les hommes moins attentionnés que les femmes ?	fr_FR
8cc28a51-09c1-40a2-bfd2-f7b85ce06bd9	5d7d94fd-acd6-4433-b5e3-14599f51cc1f	Do you think men drive better than women?	en_US
e8738e48-bc5f-4b55-9c6e-5d0a6e7c82e1	5d7d94fd-acd6-4433-b5e3-14599f51cc1f	Pensez-vous que les hommes conduisent mieux que les femmes ?	fr_FR
9e1d9fb7-1ee9-4a7e-bed5-8a897da9b7ea	cab31e27-336c-46d8-b1cb-e742d273ebe6	Is there someone you miss so much that you think about them every day? 	en_US
9d2bb4a9-878f-438a-b1af-58ea1b4d427b	cab31e27-336c-46d8-b1cb-e742d273ebe6	Y'a-t-il une personne qui vous manque au point de penser à elle tous les jours? 	fr_FR
878119d3-e89a-4a91-af97-f9f2b6964eaa	988e0abb-3547-40b9-a776-2173f8c07676	Have you ever had sex without our knowing who you were?	en_US
7e6420bb-3d8e-4d78-9255-9c53d436aeb5	988e0abb-3547-40b9-a776-2173f8c07676	Avez-vous déjà fait l'amour sans qu'on sache qui vous étiez ?	fr_FR
1546756c-3c73-49a8-944c-ab68a8c29bd0	a316639f-bd7a-4377-970a-a302d2e821fd	Have you ever been to an erotica store or salon?	en_US
f75b9c62-34e3-4a1b-b45a-69a71dc2d346	a316639f-bd7a-4377-970a-a302d2e821fd	Avez-vous déjà fréquenté un magasin ou un salon de l'érotisme ?	fr_FR
e7a18303-ab45-413d-b36c-1378c43de231	286e0137-37b7-4333-9425-e22f09f6b12f	Has one of your partners ever threatened to kill himself if you left her? 	en_US
80af9daf-6693-4227-9daf-a61ba2e15eb0	286e0137-37b7-4333-9425-e22f09f6b12f	Un de vos partenaires vous a déjà t'il menacé de se suicider si vous la quittiez? 	fr_FR
83713b35-c56c-4242-b749-e7952938c27e	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	Are you missing any points on your driver's license?	en_US
3e0ff17a-88fa-4f54-9a77-1f10339eb5e9	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	Vous manque t-il des points sur votre permis de conduire ?	fr_FR
96f0cf8c-cc2e-4f57-8b24-85e9f515f554	6f41cc91-25c3-4e8d-afca-98c15aa707ef	Do you believe that Hitler had some positive impacts on society despite all the atrocities he committed around the world?	en_US
500b533c-265c-47db-8628-dedce9f8d2ff	6f41cc91-25c3-4e8d-afca-98c15aa707ef	Croyez-vous qu'Hitler a eu certains impacts positifs sur la société malgré toutes les atrocités qu'il a commises dans le monde?	fr_FR
28da639f-9142-4d13-9a58-9628ce8bb1f4	25e8843b-7c61-4083-be6b-1d588cc16cd7	Have you ever had sex in the kitchen?	en_US
1ef2defb-1667-4b35-9b34-5305473c4773	25e8843b-7c61-4083-be6b-1d588cc16cd7	Avez-vous déjà fait l'amour dans la cuisine ?	fr_FR
9f865020-a643-4a20-81ca-0b06cc9c56dd	15a4b211-7234-414e-a0cc-d38e2d52608a	Do you think teachers should be able to slap cheeky students?	en_US
46b8a53e-947b-4e5e-a674-25cd4817c76d	15a4b211-7234-414e-a0cc-d38e2d52608a	Pensez-vous que les professeurs devraient pouvoir gifler les élèves insolents ?	fr_FR
5330e2a4-ca21-4f4a-a385-247550130b45	4abff3d2-6104-4116-b515-77416e81dc12	Are you attracted to men and women of power? 	en_US
5d87873f-9302-4a75-b46c-ff451a1e4071	4abff3d2-6104-4116-b515-77416e81dc12	Etes-vous attiré(e) par les hommes et femmes de pouvoir ? 	fr_FR
2b26e419-237a-419b-a2d4-bd464810ab38	d64d2979-98ba-48a7-8534-c60877e5b965	Do real men pee standing up?	en_US
4d241d36-09b3-4e50-82d2-bef3d7548e6d	d64d2979-98ba-48a7-8534-c60877e5b965	Les vrais hommes pissent-ils debout?	fr_FR
5797f936-1e63-4730-87dd-e80b5bb10444	af62a94b-d5d3-445d-bde2-f2e0c4af0a41	Do you envy people's lives? 	en_US
b2a24f64-c331-442e-a67a-eca09ad5e5e2	af62a94b-d5d3-445d-bde2-f2e0c4af0a41	Enviez-vous la vie des people? 	fr_FR
9240f34e-a957-4660-8738-53a4b946f3d5	58d57815-902b-471f-bb08-3f4ca052015c	Would it be unbearable for you to be supported by your spouse?	en_US
e438b9ea-c3af-4d43-984c-946c7c0a340d	58d57815-902b-471f-bb08-3f4ca052015c	Vous serait-il insupportable d'être entretenu par votre conjoint ?	fr_FR
04cd98ae-e868-4948-a05f-f1177aca8f37	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	Could you work in the funeral directors?	en_US
ffcbe593-eef4-480a-9216-44fb0784d148	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	Pourriez-vous travailler dans les pompes funèbres?	fr_FR
acf4e287-0a1c-4b31-adc5-ba00246cf63e	6c19256b-78e2-428e-a12e-414f1e41bbff	Have you ever smoked a joint?	en_US
ee1a7b52-56d9-4927-9df2-5f4d6b22cba3	6c19256b-78e2-428e-a12e-414f1e41bbff	Avez-vous déjà fumé un joint ?	fr_FR
c1e250c4-c5aa-42a5-aeee-9dcdd00b9ee2	40c6c153-e108-4087-992d-40393c5c8d0f	Do you think men are smarter than women?	en_US
238502a7-c966-45b6-bba3-aa4430cf5a00	40c6c153-e108-4087-992d-40393c5c8d0f	Pensez-vous que les hommes sont plus intelligents que les femmes ?	fr_FR
013c6a54-18b2-48b9-aafd-24d833b7d734	271e9d82-2f38-41a5-bc6f-4a79d172fe51	Has an unknown person ever told you that you are very handsome or beautiful?	en_US
1e0e1875-6d86-4d1e-8862-538cefa68e34	271e9d82-2f38-41a5-bc6f-4a79d172fe51	Un personne inconnue vous a-t-elle déjà dit que vous étiez très beau ou belle ?	fr_FR
32a8caf4-52ee-44ce-ad7f-29f6ba7e33ef	f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	Do you have sexual fantasies that you have never dared to talk about?	en_US
d355015d-da74-46ab-9bd3-d5309b5a1ca1	f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	Avez-vous des fantasmes sexuels dont vous n'avez jamais osé parler ?	fr_FR
7c58ff62-cba5-4626-b6a3-ee881ed429ab	f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	As a child, did you regularly take money from your parents without telling them? 	en_US
f992cecd-1571-46a8-ae27-d4f730a8a9a0	f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	Enfant, preniez-vous régulièrement de l'argent à vos parents sans leur dire? 	fr_FR
e8598b33-ef15-40d7-ae67-9d1958fe473c	e8655fe7-56a8-4e21-a664-4ae0be515c44	Do you think that the development of social networks makes us more knowledgeable?	en_US
f9a899a3-65cc-46c0-bac8-995ac3e0af5e	e8655fe7-56a8-4e21-a664-4ae0be515c44	Pensez-vous que le développement des réseaux sociaux nous rend plus savant ?	fr_FR
f9cd6702-98b3-4ce9-b544-91703587f52f	9d9e6425-934d-4566-8430-4f7b9e86b26b	Have you ever had a black hole from alcohol?	en_US
066b98e7-a79b-433e-b997-efb9a850d752	9d9e6425-934d-4566-8430-4f7b9e86b26b	Avez-vous déjà eu un trou noir à cause de l'alcool ?	fr_FR
688e3a68-7c6c-4d48-bd1a-fe51a3af1727	a7d730e1-30f5-40df-b95b-cb972ecdd573	As a child, have you seen adults having sex? 	en_US
a53fab54-ccb4-4494-873f-d7c9d96141d8	a7d730e1-30f5-40df-b95b-cb972ecdd573	Enfant, avez-vous vu des adultes faire l'amour? 	fr_FR
96875843-8daf-4d7c-910a-1200d1c36a1a	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	Have you ever tagged a wall?	en_US
794154b0-5f09-4dbd-bf46-d8b8571ef09e	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	Avez-vous déjà tagué un mur ?	fr_FR
d8e02f0a-beec-4c91-81b1-7c6970b6e25b	64e790c9-1224-4ef9-9b4c-34c8740d8f24	Have you ever received a phone call from an obsessive?	en_US
fb09baa6-6d8a-49b7-92c5-b22fb96946d1	64e790c9-1224-4ef9-9b4c-34c8740d8f24	Avez-vous déjà reçu un coup de fil d'un obsédé ?	fr_FR
040493d1-4993-44e7-ba0e-51c554ad0155	cc8b6725-f8d7-4522-b70d-2e201057639c	Have you ever driven over 200 km / h?	en_US
e24c5df5-a4f4-4804-92e3-0631f2317965	cc8b6725-f8d7-4522-b70d-2e201057639c	Avez-vous déjà conduit à plus de 200 km/h ?	fr_FR
bbf9ac34-e778-4773-9b94-ff1dbff1148a	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	Do you believe in love at first sight?	en_US
81352f05-a5b2-48b7-84bb-536b7bbb77f7	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	Croyez-vous au coup de foudre?	fr_FR
e6ce9dd1-7c6e-4e44-95e8-e8f5234066b6	22cedfd9-1375-4d92-b023-b2a49c6c2b57	Have you ever participated in a political demonstration?	en_US
b019b78a-c472-4870-8f24-a09f92f87a2e	22cedfd9-1375-4d92-b023-b2a49c6c2b57	Avez-vous déjà participé à une manifestation politique ?	fr_FR
34984505-7313-4e8e-a0d3-43172ff23e36	4099456e-5461-4401-b552-34f8e891ba35	Are you modest?	en_US
2e0e9fa0-7235-44ad-8074-d1c64022befc	4099456e-5461-4401-b552-34f8e891ba35	Etes-vous pudique?	fr_FR
a0858b07-b1ba-4cd7-b3e5-87eb86e5cec9	a2ef7497-bbdd-4be7-83c7-319c2cbc212f	Are you afraid of dentists? 	en_US
1b1c1e0a-2148-4a41-861a-6430b8e06e03	a2ef7497-bbdd-4be7-83c7-319c2cbc212f	Avez-vous peur des dentistes? 	fr_FR
b3d5bf90-a295-4e5b-9707-4b658e1b93a3	12ac45a4-8e5e-482c-bd1c-ba87168f1098	If you were in the Matrix or in a virtual world and not knowing it, would you want to be told the truth? 	en_US
23c912f5-1b51-452e-bfe5-fcfff46e0909	12ac45a4-8e5e-482c-bd1c-ba87168f1098	Si vous étiez dans la matrice ou dans un monde virtuel sans le savoir, voudriez-vous qu'on vous dise la vérité ? 	fr_FR
783c3c80-344d-4746-a165-59c833b56c08	9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	Do you like to have the last word in a conversation?	en_US
4f408d78-f9df-42ba-b31d-62a80cc87754	9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	Aimez-vous avoir le dernier mot dans une conversation ?	fr_FR
d5113fdf-46e7-435b-8d8a-8df88c086252	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	Have you ever done something you will never forgive yourself? 	en_US
dd309646-54ec-4818-89cb-cb8809ad20cb	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	Avez-vous déjà commis un acte que vous ne vous pardonneriez jamais? 	fr_FR
33105cc4-40e3-485d-a458-5bcea2780073	5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	Are you afraid in the dark? 	en_US
9cc8dc0f-a278-492d-a1ac-ff2a2236af89	5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	Avez-vous peur dans le noir? 	fr_FR
7657b656-9b6b-4ada-a795-14eb29c8a4bc	64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	Have you ever donated blood?	en_US
7e4fcded-55fd-4e86-a55a-501273130690	64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	Avez-vous déjà donné votre sang ?	fr_FR
92b73089-3f11-4c8c-80e3-0791fb50b193	f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	Do you attach great importance to your car?	en_US
91cfe75d-563e-426a-8657-ffa37a08204d	f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	Attachez-vous une grande importance à votre voiture?	fr_FR
5c14382a-94a7-4ac3-8f1e-eb26c7aa4217	405ba252-6b60-4426-a300-25e7932c2593	Do you have a secret that you won't tell anyone?	en_US
73e6d6eb-e01b-4099-a696-5a131e740850	405ba252-6b60-4426-a300-25e7932c2593	Avez-vous un secret que vous ne confierez à personne ?	fr_FR
55fa29a1-8e8e-4735-a986-f028743c4e6b	6d4e69d7-156c-4855-81ea-263a87482c03	Are you for the ban on bullfighting?	en_US
8ebc4b6a-ead4-4368-ab32-8ff0aacc6cc2	6d4e69d7-156c-4855-81ea-263a87482c03	Etes-vous pour l'interdiction de la tauromachie?	fr_FR
0c7e8f69-1fe6-4857-a671-ebed257c0486	1a53ad26-5577-473f-8787-68ddd30a49f0	Are you complexed by any part of your body?	en_US
b3320be9-923c-4dd8-8179-c41b99d336d5	1a53ad26-5577-473f-8787-68ddd30a49f0	Etes-vous complexé(e) par une partie de votre corps?	fr_FR
9dbc4f52-29d2-498d-842d-0898043315c3	f6cb71fd-f034-4b41-a3f3-2f558010179d	Have you ever answered the phone while having sex?	en_US
c9f4ef8e-f20d-4bbc-a4a3-fab25a27edc9	f6cb71fd-f034-4b41-a3f3-2f558010179d	Vous est-il arrivé de répondre au téléphone pendant que vous faisiez l'amour ?	fr_FR
08b29956-3919-4337-9f6d-4ae44d9321be	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	Do you think robots will work for us in the future?	en_US
ca9b5495-ca49-45bc-9d59-538ba331984b	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	Pensez-vous que les robots travailleront à notre place dans l'avenir ?	fr_FR
531eb13e-ff5d-46e3-b145-67efc94b7c1b	612bac3b-7df4-472a-a80c-1de549a6b1ed	If your partner is cheating on you with a person of the same sex, is it worse than straight cheating?	en_US
9dba717f-6890-470f-b0bf-e65df6ca8c3c	612bac3b-7df4-472a-a80c-1de549a6b1ed	Si votre partenaire vous trompe avec une personne du même sexe, est-ce pire qu'une tromperie hétéro ?	fr_FR
53c3766b-4e86-4b8d-9e45-9103396c14b8	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	Have you ever cried all the tears in your body out of love desperation?	en_US
b82d0782-e87c-47ac-b05a-7c7c617d88ca	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	Avez-vous déjà pleuré toutes les larmes de votre corps par désespoir amoureux ?	fr_FR
87a7e9a8-100b-4ae4-9873-575ceb40d5cb	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	Would you like to live abroad?	en_US
0081e20f-b0da-45f1-8766-41248b5e9ab8	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	Voudriez-vous vivre à l'étranger ?	fr_FR
d3a6c9e5-a258-4321-97dd-e5bb1bee8859	4dea9bdb-0836-4049-9766-2a271c332335	Do you like your companion to be hairy?	en_US
226721a5-0470-46e3-af4d-90ebe477a675	4dea9bdb-0836-4049-9766-2a271c332335	Aimez-vous que votre compagnon/compagne soit poilue?	fr_FR
9e790724-7357-4742-9dc9-b30107be89ff	b2094136-6558-4074-8907-95a6708d1146	Do you believe that robots will one day take control of the Earth? 	en_US
370f4a7c-e7a4-4779-be73-a797e75bcad9	b2094136-6558-4074-8907-95a6708d1146	Croyez-vous que les robots prendront un jour le contrôle de la Terre ? 	fr_FR
33604bb2-022e-4145-b0b3-b23a5dac4ee0	5b282628-fa35-43c5-b5ee-a294b6ed8226	Are we all connected to each other in a non-material world?	en_US
8618dc25-e62d-4955-9e67-5dc46177c041	5b282628-fa35-43c5-b5ee-a294b6ed8226	Sommes-nous tous reliés les uns aux autres dans un monde non matériel ?	fr_FR
4750bab3-2b19-45d0-b60c-b9f9a011d3ef	1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	Do you think that man is descended from the monkey?	en_US
606e2f1f-6ccb-421e-856f-338d96d67266	1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	Pensez-vous que l'homme descend du singe ?	fr_FR
ea3964f3-4f78-49f0-9847-47ab9adb7f0b	e98227be-0c5f-4900-8f3a-2633b0dbbab0	Have you ever stung someone close to you?	en_US
3fd35cee-f279-44b6-9405-a882e893933d	e98227be-0c5f-4900-8f3a-2633b0dbbab0	Avez-vous déjà piqué l'amoureux( se) de quelqu'un de proche?	fr_FR
335ddd49-11f5-4b46-a3d9-42fa5a33b3bc	ed4e1a3d-786e-49bb-b942-1da35e5a04d9	Are you embarrassed to buy condoms at the pharmacy? 	en_US
f576fba1-5294-4ab3-9444-ffd9f1eac44e	ed4e1a3d-786e-49bb-b942-1da35e5a04d9	Etes-vous gêné d'acheter des préservatifs à la pharmacie? 	fr_FR
f65792d3-45b5-44e4-a039-b657e740d086	a6139b80-36a4-4775-9da5-c06466f1e361	Are you talking to your pet?	en_US
4f45fd83-95b6-4335-ac40-a9f736840974	a6139b80-36a4-4775-9da5-c06466f1e361	Parlez-vous à votre animal de compagnie?	fr_FR
d946747b-c237-419f-8f84-f3aba9c3defa	0852f89d-0df9-4559-b4d8-9074cf67a335	Do you think that men always want to have sex?	en_US
5f96bbd5-10bd-440f-a16d-c8bd82c1e449	0852f89d-0df9-4559-b4d8-9074cf67a335	Pensez-vous que les hommes ont toujours envie de faire l'amour ?	fr_FR
b95d84ad-7efb-4fbe-9011-79408c4c7b6e	63351453-5507-4199-915a-1220b13c7266	Do you easily express your feelings?	en_US
e824aa85-8978-4739-9e39-7587536a730a	63351453-5507-4199-915a-1220b13c7266	Exprimez-vous facilement vos sentiments?	fr_FR
626105b1-cd05-495b-86e8-7d6f51ba2f71	4e7476bb-6dde-4725-8a96-5454520df090	Think that a bad person will sooner or later pay for his wickedness?	en_US
875e42d2-1809-468b-8933-cece33540d73	4e7476bb-6dde-4725-8a96-5454520df090	Pensez qu'une personne mauvaise paiera tôt ou tard sa méchanceté ?	fr_FR
6f69e034-50e0-49c5-a3d3-c5fbdec2934c	bf819156-9d00-464b-8a94-e08428443caf	Do you have a blanket that you are still attached to?	en_US
797020a5-0440-4855-bb53-6b7e7e40e40f	bf819156-9d00-464b-8a94-e08428443caf	Avez-vous un doudou auquel vous êtes encore attaché?	fr_FR
b939ea41-23bf-4c08-88a0-8887c9576420	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	Have you ever done in your panties as an adult?	en_US
408d730d-260e-4733-ad96-b49dfefce2ca	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	Avez-vous déjà fait dans votre culotte à l'âge adulte ?	fr_FR
cb5db265-7b5a-4568-8483-14c1ce91178e	b988bbb3-0bc4-437d-aab1-226248393a02	Do you own more than 10 pairs of shoes?	en_US
ad82a011-4df5-45b4-94b7-67ff138f5f1a	b988bbb3-0bc4-437d-aab1-226248393a02	Possédez-vous plus de 10 paires de chaussures ?	fr_FR
ff0bbb0f-faa9-4673-9c14-4e9c2c2084ff	55f65763-815d-451e-94ca-3f1646372f57	Do you believe in the supernatural?	en_US
1fc50e4b-3fed-48c1-b46b-81bcc58df873	55f65763-815d-451e-94ca-3f1646372f57	Croyez-vous au surnaturel?	fr_FR
7e23391c-75a8-4369-a9ab-a463728917e6	83aac205-8aac-48b8-9178-bc28632d3592	Do you sometimes feel like your partner takes you for their mother or father?	en_US
578dbb4a-263b-4062-9cce-c71376316f76	83aac205-8aac-48b8-9178-bc28632d3592	Avez-vous parfois l'impression que votre partenaire vous prend pour sa mère ou son père ?	fr_FR
5479d937-e561-435b-a2cd-bfaabb88a0be	cd491b5c-c7a3-40ad-b390-b41481813ed6	Do you think there is life after death?	en_US
0e635d58-85ab-42e1-b3bd-3358761e2995	cd491b5c-c7a3-40ad-b390-b41481813ed6	Pensez-vous qu'il existe une vie après la mort ?	fr_FR
b7c302f6-2e3e-4f3c-b123-b3d5c0c60f7a	5300578b-0199-4e73-9c76-db08f0883fb2	Have you ever received a love letter from a complete stranger?	en_US
cc705f6e-483a-4e58-84e6-f71d679fd8d9	5300578b-0199-4e73-9c76-db08f0883fb2	Avez-vous déjà reçu une lettre d'amour d'un parfait inconnu?	fr_FR
b5d417f0-1c0f-46b1-8076-89bd6e820ff9	81416478-48b4-45a1-9766-6030759e901a	Do you think that prostitution should be recognized as a real profession? 	en_US
30e5c4f9-10ce-4329-aec4-a1ae0c926b0f	81416478-48b4-45a1-9766-6030759e901a	Pensez-vous que la prostitution devrait être reconnue comme un vrai métier? 	fr_FR
e3c93f94-b59b-40cf-8e74-e90cd7a85c96	d63fec99-6944-46fc-97ed-08f1d44e09f0	Do you own any intimate jewelry? 	en_US
a71a503e-8f93-4945-bebb-7f57c88f8071	d63fec99-6944-46fc-97ed-08f1d44e09f0	Possédez-vous des bijoux intimes? 	fr_FR
f3d9bd66-cbb0-454e-bbde-f39b3266ff4a	1c998d37-ffb5-4e93-b809-ef71f6b648a8	Do you wash every day? 	en_US
5d41047e-7aff-45d2-a7c8-c4a19b924468	1c998d37-ffb5-4e93-b809-ef71f6b648a8	Vous lavez-vous tous les jours? 	fr_FR
808b415e-e056-4899-8386-e3e633ee3c7e	1682619d-39ab-446f-973f-ae2c1b7820da	Would you like to go back in time to change your life?	en_US
cabdf839-7313-4471-a85e-aa430815d18e	1682619d-39ab-446f-973f-ae2c1b7820da	Voudriez-vous revenir dans le temps pour changer votre vie?	fr_FR
4779f1d4-8af6-411d-8f1f-71c02361a6af	30800c33-f9aa-4712-9986-2b253c36b188	Do you think climate change will turn humanity off?	en_US
f91743b7-5bc6-4367-9f9d-b83011ae7733	30800c33-f9aa-4712-9986-2b253c36b188	Pensez-vous que le dérèglement climatique va éteindre l'humanité ?	fr_FR
9c12aa74-152c-4ef9-9c38-3080fb3bac27	cf90b94e-e441-4f93-83f1-566752861202	Have you ever secretly read someone's diary?	en_US
ccc566b5-6d94-4297-a0e9-f8ca0a841958	cf90b94e-e441-4f93-83f1-566752861202	Avez-vous déjà lu secrètement le journal intime de quelqu'un ?	fr_FR
92b88d7e-6fe6-461c-8d8c-aa9819dbe461	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	Do you think it takes money to be happy? 	en_US
59aabf49-9890-47b3-a730-204b9e435dd9	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	Pensez-vous qu'il faut de l'argent pour être heureux? 	fr_FR
67d9f08f-0fdb-4d3f-9fbd-bcb8f3df9a09	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	Do you like to say dirty words while having sex? 	en_US
edf64565-9c84-462f-b2f3-8c6a516a278d	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	Aimez-vous dire des mots cochons en faisant l'amour? 	fr_FR
bf7f1158-b3d4-46f2-a371-daa918e5dc9d	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	Do you usually sleep naked?	en_US
b77eb362-a799-4394-bb7f-81143c4e1293	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	Dormez-vous généralement nu ?	fr_FR
2a6170b4-89af-4dc9-939a-a7c9a894fd0c	e8d5aac5-30a9-427c-8da3-9f0b140970e6	Do you think your first time was great?	en_US
ce9c9366-c6c8-4b3d-ad26-eeb010fe98fb	e8d5aac5-30a9-427c-8da3-9f0b140970e6	Trouvez-vous que votre première fois a été géniale ?	fr_FR
03c4ce21-a914-41c9-bbb1-fe5ba4e31486	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	Are you often late?	en_US
2ab45537-7739-49a4-a9bc-70beeeedd714	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	Etes-vous souvent en retard ?	fr_FR
6054168c-f2a1-4b63-ab71-6863bee98424	329b38ef-63bf-41e2-a266-5dd6a4b36f79	Disagree with your interlocutor, do you take a step back to understand their vision of the problem?	en_US
e3015a11-873e-437f-b478-450ca8744304	329b38ef-63bf-41e2-a266-5dd6a4b36f79	En désaccord avec votre interlocuteur, prenez-vous du recul pour comprendre sa vision du problème ?	fr_FR
1dcae66c-9315-4c3a-bb0b-232083915132	f376fba5-54e1-4f21-99d6-0e41bc000588	Do you think you are not getting paid enough?	en_US
4c6a104b-4df2-4922-8c1e-ffa3939cb158	f376fba5-54e1-4f21-99d6-0e41bc000588	Pensez-vous ne pas être assez payé(e) ?	fr_FR
33fc35ea-b5b8-4f60-8261-be1f9b9db58c	41bf1e07-3e24-40a4-98e9-45b3e4538cce	Do you think you are doing the least harm to the world?	en_US
cc398eef-cab1-4093-a636-e0730669d254	41bf1e07-3e24-40a4-98e9-45b3e4538cce	Pensez-vous faire le moins de mal possible au monde?	fr_FR
0ba124b7-0a43-4e55-b257-9017c68a47d3	0d9a0a12-85a6-40d5-8335-df90740abcf7	Do you think there are other universes?	en_US
430bfb24-48e5-4134-a774-6b40fc769f57	0d9a0a12-85a6-40d5-8335-df90740abcf7	Pensez-vous qu'il existe d'autres univers?	fr_FR
94272aee-4e67-4623-9963-3b97704f8464	4492fc47-f2b9-41c4-a680-e05ca735ce9e	Do you think friendship is stronger than love?	en_US
4c7b0394-b26e-4f00-a258-ce6dfabc86b9	4492fc47-f2b9-41c4-a680-e05ca735ce9e	Pensez-vous que l'amitié est plus forte que l'amour?	fr_FR
b776ad37-8a4d-42fb-bf02-b4152a16c1c2	3a952e5b-a9f2-45f6-90de-3407e6be0f9d	Have you ever peed in a swimming pool as an adult?	en_US
3fd0e514-3975-4889-b4fd-e0692672bae9	3a952e5b-a9f2-45f6-90de-3407e6be0f9d	Avez-vous déjà fait pipi dans une piscine à l'âge adulte ?	fr_FR
39a4b800-bcca-46f4-b557-c7c1eacb0b0b	80afdbde-8ccd-4068-b552-a828341ebe67	Have you ever had the impression that someone is looking at you strangely in the street?	en_US
25aaea81-99c0-4a8f-b751-d64e7fabbcca	80afdbde-8ccd-4068-b552-a828341ebe67	Avez-vous déjà eu l' impression que quelqu'un vous regardait bizarrement dans la rue?	fr_FR
efc75959-81eb-4db7-88a5-437024f359b6	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	Do you think that the unemployed should assume public utility work?	en_US
b6ab1220-9b2e-4b84-9350-f214e06481f1	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	Pensez-vous que les chomeurs devraient assumer des travaux d'utilité publique ?	fr_FR
f2544db7-d63b-47aa-b926-5d3be2b0328c	79a82f80-fb7d-4211-bb73-4a2ef554204f	Have you ever been caught having sex? 	en_US
64e39629-fe63-4c69-ab36-86d454e7fef3	79a82f80-fb7d-4211-bb73-4a2ef554204f	Avez-vous déjà été surpris(e) en train de faire l'amour? 	fr_FR
51beb95d-932e-4990-b667-16fdc911c2ca	24e4aa16-924f-4d83-8f64-c0f36bf1489c	If you had a secret to share on your deathbed knowing that it could tarnish your memory, would you share it?	en_US
03277556-e462-43af-a296-6bee31f48911	24e4aa16-924f-4d83-8f64-c0f36bf1489c	Si vous aviez un secret à confier sur votre lit de mort, sachant qu'il pourrait ternir votre mémoire, le partageriez-vous?	fr_FR
d086bf2c-334e-4b81-a895-e5efcf0fdfe5	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	Have you ever fought with someone?	en_US
4170edfd-54ee-4798-9f4a-74bc3669f2d0	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	Vous-êtes vous déjà battu avec quelqu'un ?	fr_FR
a3cf1fd6-564c-4049-bc6b-75a1c3af881e	6bf76683-2c9c-45df-a3f4-213f869dc9ab	Do you think the European Union is a good thing?	en_US
1db7febd-090c-42b6-81af-68c843d440f9	6bf76683-2c9c-45df-a3f4-213f869dc9ab	Pensez-vous que l'union européenne soit une bonne chose ?	fr_FR
88164c56-29a3-4720-98c5-fe21f72aaa96	484a7e91-2ffe-44ce-8635-d6576739734f	Do you think your penis or breast is too small?	en_US
6b8c3e98-1130-4ef4-84bc-ed56139a148c	484a7e91-2ffe-44ce-8635-d6576739734f	Pensez-vous votre pénis ou poitrine trop petit ( e) ?	fr_FR
4627bde8-be56-41ce-967e-fb10ab1f2b39	f0b1b23e-a127-467a-bbda-51d34380069c	Do you sometimes talk to yourself?	en_US
47925e00-c1e6-4ee5-8df8-30f8e14f146e	f0b1b23e-a127-467a-bbda-51d34380069c	Vous arrive t-il de parler tout(e) seul(e) ?	fr_FR
f1fe1a3b-6748-4b94-9637-596e4d9c49ee	01199d58-fbd7-4046-a875-b15712c14331	Have any of your partners ever fallen asleep during sex?	en_US
bbebab44-c778-407c-8679-32eaf3dac9e1	01199d58-fbd7-4046-a875-b15712c14331	Un de vos partenaires s'est-il déjà endormi(e) pendant un rapport sexuel?	fr_FR
ac5f505a-79ec-49f2-8fb9-5113ea571d82	4524ee1f-9f7a-465b-acf3-467f5161059c	Have you loaned more than 500 euros to a friend?	en_US
ee42a833-420d-40e9-bec2-a38b16e05736	4524ee1f-9f7a-465b-acf3-467f5161059c	Avez-vous prêté plus de 500 euros à un ami ?	fr_FR
1269b39e-f111-44a9-8cae-28b7659ad266	93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	Do you consider yourself sufficiently informed in politics to vote?	en_US
c655cd91-b070-44d5-9fbe-d97aea912ef7	93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	Considérez-vous être assez informé en polique pour voter ?	fr_FR
62c71232-a9f0-415d-b1e1-5bcdbf44eb85	d0059349-79ed-4c98-ba00-6135c431c2c2	Have you or one of your relatives ever been in prison?	en_US
5d87b655-db9f-4a0e-a132-abb4e888149e	d0059349-79ed-4c98-ba00-6135c431c2c2	Est-ce que vous ou un de vos proches avez déjà fait de la prison ?	fr_FR
806968db-e66b-4898-9043-bcd0880fa207	4b549b5d-0864-4add-8ed5-91c54e67bae2	Have you ever completely shaved your pubic area?	en_US
b352497d-5913-4d5c-8c77-49504b99f8cc	4b549b5d-0864-4add-8ed5-91c54e67bae2	Vous-êtes vous déjà complètement rasé le pubis ?	fr_FR
c5f85ebc-ce62-4480-ace5-34db002171cb	1c69cd87-b362-4f5d-befe-06706be21c3f	Do you believe in God?	en_US
709fa6d2-835c-4c9b-a231-f958263eeaea	1c69cd87-b362-4f5d-befe-06706be21c3f	Croyez-vous en Dieu?	fr_FR
24956b1a-6ae3-424b-b7c8-2d8a821263ca	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	Do you prefer to go to the bathroom at home?	en_US
6cada422-2abe-4d7e-9c22-279f4d358651	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	Préférez-vous aller aux toilettes chez vous ?	fr_FR
2ba9fa84-8747-4619-a6ac-6a2560fdd64e	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	Can a person's weight be a crippling criterion in your search for a partner?	en_US
d259fa9d-b088-4fe4-ac54-5736a78aa6fc	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	Le poids d'une personne peut-il être un critère rédhibitoire dans votre recherche de partenaire ?	fr_FR
4297e4f9-a3b4-49fa-87bf-c6326f53c79a	30e98b58-25c9-47cf-81fb-2d00a64eb9fc	Are you satisfied with the Prime Minister / Vice President of your country?	en_US
62942a5d-bb8e-4428-a171-9782687327ad	30e98b58-25c9-47cf-81fb-2d00a64eb9fc	Etes-vous satisfait du premier ministre / vice-président de votre pays ?	fr_FR
8296d2aa-0e06-4c74-9828-7d4fcdc914b1	59f8d229-bb8b-4ba6-925b-0f9d056b2b39	Have you ever found an attractive pregnant woman?	en_US
1e0bd76e-c7eb-4ca4-b946-26cd4f728e78	59f8d229-bb8b-4ba6-925b-0f9d056b2b39	Avez-vous déjà trouvé une femme enceinte attirante ?	fr_FR
142bdfd0-e573-4474-a19a-c20b574772c3	a71fb52d-a04b-44e9-97f1-a92437b8495a	Do you ever practice naturism?	en_US
db232106-cffc-4bf2-af37-7ce48b076125	a71fb52d-a04b-44e9-97f1-a92437b8495a	Vous arrive t-il de pratiquer le naturisme ?	fr_FR
d2e957d1-9a6d-4d73-9df9-25cac233b0e6	6524e347-2474-453a-9dc1-c1fa6daf6129	Have you ever spat on someone?	en_US
7560fdea-cbd9-486e-b901-555ed0ad154d	6524e347-2474-453a-9dc1-c1fa6daf6129	Avez-vous déjà craché sur quelqu'un ?	fr_FR
404d1a19-0466-4805-97b6-ae20076ff552	9aa16063-a8b3-4efe-801e-433f3a3c4a61	Do you go to parties even if you hardly know anyone?	en_US
c31d0986-fcc6-4c13-941a-2fac01477952	9aa16063-a8b3-4efe-801e-433f3a3c4a61	Allez-vous à des soirées même si vous ne connaissez presque personne ?	fr_FR
b5182d6d-54b7-4060-8f61-80a4e88409b5	ff5f90f7-9cf7-487a-a839-a119698dd932	Have you ever driven drunk?	en_US
d8a2cd3a-8908-48c0-8bfb-887132ca8ec8	ff5f90f7-9cf7-487a-a839-a119698dd932	Avez-vous déjà conduit en état d'ivresse ?	fr_FR
9598f0cf-a0b1-4490-afc0-c366e8dd9414	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	Have you ever bit your toenails? 	en_US
e8093ef4-1c03-4154-9e8c-457b84b4e4dd	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	Vous êtes-vous déjà rongé les ongles de pieds? 	fr_FR
cae15341-7791-4d09-8ca2-d1a9305c9b6d	adc0bf61-9e77-4226-8a5b-765a04e035aa	Does having a child strengthen the cohesion of the couple?	en_US
a6c30b39-f9c9-4711-85bc-4a1e9534c2f2	adc0bf61-9e77-4226-8a5b-765a04e035aa	Avoir un enfant renforce t-il la cohésion du couple ?	fr_FR
1ba23b64-295c-492b-9b6a-3c6519f2cda5	12c9e81b-3b09-4ce4-8608-fa1e5c281168	Have you ever spied on your neighbors through the window? 	en_US
5cf74726-e590-4ede-b66f-181a3266f5b9	12c9e81b-3b09-4ce4-8608-fa1e5c281168	Avez-vous déjà espionné vos voisins par la fenêtre? 	fr_FR
129aef2a-0b95-41bd-bb54-60bc04733cf3	3a991bbc-3caa-4a2e-b86b-ea3a72840351	Do you think that surrogacy is / would be a positive step forward for our society?	en_US
949690e9-2bf4-4b93-9b38-c088f1c1b029	3a991bbc-3caa-4a2e-b86b-ea3a72840351	Pensez-vous que la gestation pour autrui est/serait une avancée positive pour notre société ?	fr_FR
14fedc3d-b317-4dd9-9238-8273bdb687c2	ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	Have you ever fantasized about an office colleague?	en_US
56a94442-c689-47d2-a4fa-d1e268f7952f	ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	Avez-vous déjà fantasmé sur un collègue de bureau ?	fr_FR
af7bf3ca-7e71-4226-8a8e-ea52de44aa17	413a283c-4022-4f90-a742-b3c4098e9633	Would you be tempted by a threesome?	en_US
ae85a9cd-acba-4d63-b584-8f0cfbf5e3ab	413a283c-4022-4f90-a742-b3c4098e9633	Seriez-vous tenté(e) par un plan à trois ?	fr_FR
8164b51c-e87f-4d19-bf6b-f0c59c70c95e	97a944ab-acf6-4a2f-8787-a6cc9520ec0f	Would you be willing to kill someone you hate to bring back a deceased person you love?	en_US
a87f5d5e-c83c-46c5-a9b4-75df9d322e18	97a944ab-acf6-4a2f-8787-a6cc9520ec0f	Est-ce que vous seriez prêt à faire mourir une personne que vous détestez pour faire revenir une personne décédée que vous aimez?	fr_FR
165bce04-a6ec-4a6c-9bea-f21b01407b28	c91657e2-fdc2-4d61-a35f-db641b348955	Could you be in a romantic relationship without sex?	en_US
a0a57666-5a2d-4cd2-992b-ee11d4716e5b	c91657e2-fdc2-4d61-a35f-db641b348955	Pourriez-vous vivre une relation amoureuse sans sexe?	fr_FR
e6505eeb-513e-45a8-b67c-f935eb4b629c	572e63a5-9858-4b31-a50f-2b3b97223bb2	Do you think that politicians think of themselves first? 	en_US
3637b808-23c5-45be-83dd-6f208d70777a	572e63a5-9858-4b31-a50f-2b3b97223bb2	Pensez-vous que les hommes politiques pensent d'abord à eux-mêmes? 	fr_FR
4d37d29c-fcd4-4a17-87df-c049dfbc6760	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	Do you ever pee in the shower?	en_US
7c586cb2-bc03-454a-8cef-0b4dc2d57868	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	Vous arrive-til de faire pipi sous la douche ?	fr_FR
d3280830-a307-4bce-a49f-768782abadd7	42da9e30-776a-492c-b355-c8b79aa6fc7d	Do you believe that everyone should be considered equal?	en_US
4b0a16d0-7871-415f-ab12-cf8b783e1817	42da9e30-776a-492c-b355-c8b79aa6fc7d	Croyez-vous que tout le monde devrait être considéré comme égal?	fr_FR
d2c5e992-d060-49a6-939c-867ef5978da1	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	Would you like to turn your smartphone into a living creature?	en_US
44acdca1-49ca-4541-af9d-09cbe094983f	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	Est-ce que vous aimeriez transformer votre smartphone en créature vivante ?	fr_FR
d90c46c7-4de0-47ef-a436-f15f4b75e391	b8da26d2-712b-4c26-a3eb-a58432690bc9	Have you ever watched a porn movie with a partner?	en_US
a29ed5d9-124a-42fe-b293-74bea826db15	b8da26d2-712b-4c26-a3eb-a58432690bc9	Avez-vous déjà regardé un film porno avec un partenaire ?	fr_FR
0d56556c-9069-408c-8c4f-560bd9749cb0	da0352aa-205a-46a2-88f2-44337e07d82f	Do you adapt your personality to the people around you?	en_US
fce3577c-7946-4609-93b7-645eec223088	da0352aa-205a-46a2-88f2-44337e07d82f	Adaptez-vous votre personnalité aux personnes qui vous entourent ?	fr_FR
089d9e49-dff0-4c8c-838d-4715efef1c9b	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	If respect for your personal data was guaranteed, would you agree to be constantly monitored to ensure maximum security for our company? 	en_US
61025913-123a-43bb-9118-94e64aa021e9	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	Si le respect de vos données personnelles était garanti, accepteriez-vous d'être constamment surveillé(e) pour garantir une sécurité maximale à notre société ? 	fr_FR
2614f365-c422-4af7-b419-8318c978c7e8	8b4e4268-8871-433e-aeda-871ea6168258	Have you ever secretly read text messages on your partner's phone? 	en_US
b485e59c-a2ce-47af-9ce3-2f6faf307bb5	8b4e4268-8871-433e-aeda-871ea6168258	Avez-vous déjà lu en cachette les sms sur le téléphone de votre partenaire? 	fr_FR
3e467f60-38cd-4882-818e-ed73f0df46d0	467e8afc-4292-4d4a-b970-1c3b04452e10	Is there a lie in your life that you bring up all the time?	en_US
aada8284-491f-4ac6-8a41-119fd93d34ea	467e8afc-4292-4d4a-b970-1c3b04452e10	Y a-t-il un mensonge dans votre vie que vous ressortez tout le temps ?	fr_FR
30e31704-d761-47b8-961f-5e852a6cc241	f7df86fc-6889-4034-8554-89a2c7b7b0dc	Do you believe in reincarnation? 	en_US
80b4d50c-daac-4b98-ad18-690fe38fba2f	f7df86fc-6889-4034-8554-89a2c7b7b0dc	Croyez-vous en la réincarnation? 	fr_FR
091d07d3-20b1-4c3e-8d9f-c1e89a3257c9	bfc27d3d-28c1-4800-9a19-4083ec767ff7	Do you feel that you are the person you want to be?	en_US
f6985669-4590-4740-be33-6aafefd09a5a	bfc27d3d-28c1-4800-9a19-4083ec767ff7	Estimez-vous être la personne que vous voudriez être?	fr_FR
6b74f79c-ba70-4884-bdf6-f6591777d163	b73af29b-32b0-40e1-867a-765276acc40f	Have you ever been to a swingers club?	en_US
7b308cf3-2532-4e15-848a-8e3b1ce82e55	b73af29b-32b0-40e1-867a-765276acc40f	Etes-vous déjà allé dans un club échangiste ?	fr_FR
7bff6680-1ebb-4fbb-ad6d-b365f614bebb	45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	Have you ever told a restaurant worker that the food was not good? 	en_US
5a3da659-9715-4518-ae6c-927f2d925d38	45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	Avez-vous déjà dit à un employé de restaurant que les plats n'étaient pas bons? 	fr_FR
cd80266e-bd36-4079-8ea1-9d91451c0f30	df302924-708c-4861-a238-ddd950574c27	Do you think democracy is a good political regime?	en_US
a89b8935-82d7-4f9d-a026-8c5c22784945	df302924-708c-4861-a238-ddd950574c27	Pensez-vous que la démocratie est un bon régime politique ?	fr_FR
399f23a3-9a9e-4761-908b-375e3c9fe028	d291332c-68d5-4a91-9b96-cb8c9a9ac930	Would you have liked to be a spy?	en_US
40d09a95-03f3-4286-9150-cb9bb156054f	d291332c-68d5-4a91-9b96-cb8c9a9ac930	Auriez-vous aimé être un espion ?	fr_FR
4d2dfcdc-916f-4bd0-a5fb-ffd767f21f40	c1242167-5aae-435c-9196-58298b3d9261	Do you think that all experiences bring something positive?	en_US
c7e16140-2fe5-4247-8445-5250c3e23d3c	c1242167-5aae-435c-9196-58298b3d9261	Pensez-vous que toutes les expériences apportent quelque chose de positif ?	fr_FR
976ecba0-723c-4ced-be5e-a3c350785d43	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	Have you ever faked illness so as not to work?	en_US
a55508f5-4704-441b-af25-94f9cf5d924d	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	Vous est-il déjà arrivé de simuler la maladie pour ne pas travailler ?	fr_FR
a50ac7af-1976-4f5a-a8dd-94c4a2579142	b156696e-49af-4582-8e63-a41a46840bd7	Do you ever have an insomniac?	en_US
92b55ac7-7e01-45f7-9e5f-51943cbff069	b156696e-49af-4582-8e63-a41a46840bd7	Vous arrive t-il d'être insomniaque ?	fr_FR
bd815dc9-743e-429d-bd82-d253f5ab4ba3	5097e0ff-e224-4060-9051-cb9fdd9e99d4	Do you believe in Jesus?	en_US
76d9bcd9-cc52-4d7e-aabd-05054c54b915	5097e0ff-e224-4060-9051-cb9fdd9e99d4	Croyez-vous en Jésus?	fr_FR
5c9a8def-5921-484f-bd26-1a09b90cd6d8	4f64a379-9677-4b09-a4b4-3007f5403879	Could you forgive your partner for infidelity?	en_US
027f1de9-9d53-448c-83bd-c110a6c400f9	4f64a379-9677-4b09-a4b4-3007f5403879	Pourriez-vous pardonner l'infidélité à votre partenaire ?	fr_FR
11932873-2a2e-4917-9945-557a017581ab	2113e0af-27a5-4be6-a356-d11f82c2aeaa	Have you ever slept in your vomit so drunk you were? 	en_US
de6f3951-4dbf-4f1b-8840-8c975a46969e	2113e0af-27a5-4be6-a356-d11f82c2aeaa	Avez-vous déjà dormi dans votre vomi tellement vous étiez saoul? 	fr_FR
048e7d3f-fd2d-4ea8-980c-72c43ea6dfe6	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	Do you ever have sex outdoors?	en_US
b029ffc6-828c-4d29-b9e4-a9a2984aa2be	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	Vous arrive t-il de faire l'amour en plein air ?	fr_FR
a64641f9-6391-4ecd-9580-913ce8aaa203	a0e42c6c-02ab-4ea0-90e4-43523da39b03	Do you like there to be change in your life?	en_US
c1e91876-d3fc-4f0a-a827-776a9d91d561	a0e42c6c-02ab-4ea0-90e4-43523da39b03	Aimez-vous qu'il y ait du changement dans votre vie ?	fr_FR
372775d9-4746-4b95-aa88-723392381695	4c903a88-55b7-4f68-9cd8-06d374a8baf0	Do you like to tape in front of the TV?	en_US
f9e862d0-7dc6-46da-94b1-24f7e9370e00	4c903a88-55b7-4f68-9cd8-06d374a8baf0	Aimez-vous scotcher devant la télévision?	fr_FR
6fb4601b-1097-4238-b1d2-b1dca4ebfb8d	e0d4cf71-7f3c-4846-baec-90a3bb95d23b	Do you have a lucky charm?	en_US
77e27bff-df56-4cfa-9ed0-add2f35bdefe	e0d4cf71-7f3c-4846-baec-90a3bb95d23b	Avez-vous un porte-bonheur ?	fr_FR
399fa5bc-5ac6-4f2f-8bd3-15919e95cae8	cad0e400-d7fe-4a60-b939-0ca272f578ce	Do you feel close to the anarchists?	en_US
967ed935-3e2d-4888-bcf4-2690c3ccbb4f	cad0e400-d7fe-4a60-b939-0ca272f578ce	Vous sentez-vous proches des anarchistes ?	fr_FR
6ec46c37-28a2-404e-983d-7b3750b95d61	afc46845-19fa-4036-bc1f-3b1036104372	Do you remember your college science classes?	en_US
8e157b3a-d061-4822-aa5f-f20a687ced8a	afc46845-19fa-4036-bc1f-3b1036104372	Vous  souvenez-vous de vos cours de sciences du collège ?	fr_FR
0d143e53-f832-424f-a0b6-500e9e963780	6cf88651-6c1c-4c77-8d5d-5333b5a8e448	Have you ever wished you had other ethnic origins?	en_US
66d5a91a-4b31-4329-9462-892474286552	6cf88651-6c1c-4c77-8d5d-5333b5a8e448	Avez-vous déjà souhaité avoir d'autres origines ethniques?	fr_FR
0acdaf3a-c760-4bad-853c-b623c0d86242	dcb3ebca-90bf-4e10-8977-54231b8ebef5	Are you attracted to a particular type of woman or man?	en_US
de361a25-b227-42c9-bc1d-0e450f4f9987	dcb3ebca-90bf-4e10-8977-54231b8ebef5	Etes-vous attiré(e) par un type de femme ou d'homme en particulier?	fr_FR
316118a8-dfa6-4f18-aea1-e1b9811443b4	9d2245bc-d4c8-4e61-959f-d28105a788d9	Have you ever been tied up while having sex?	en_US
76db15a4-1470-4053-b85f-7a3e79d7930c	9d2245bc-d4c8-4e61-959f-d28105a788d9	Avez-vous déjà été ligoté(e) pendant que vous faisiez l'amour ?	fr_FR
a510aeeb-2ddd-4712-9a62-4ccce2dac9a8	21c1796c-73e8-4f7a-a551-ec684b835a5f	Do you think there are too many immigrants in your country?	en_US
8b2bc98f-7ad9-4692-9fb6-b5d31937d2e4	21c1796c-73e8-4f7a-a551-ec684b835a5f	Pensez-vous qu'il y a trop d'immigrés dans votre pays ?	fr_FR
0b597f41-2b99-44d4-b1c6-b1d58ab5263a	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	Do you often wear underwear with holes?	en_US
9e58137b-f93f-4c3a-8d8d-cd74dfe6ca48	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	Portez-vous souvent des sous-vêtements troués?	fr_FR
c8d71d3a-993d-45ed-8610-770535c6172d	912c3636-3a5a-4877-bae4-05e9f3028fd5	Would you want Donald Trump as president?	en_US
8e87fe0f-a878-4ac4-8a5e-7f647a273040	912c3636-3a5a-4877-bae4-05e9f3028fd5	Voudriez-vous de Donald Trump comme président?	fr_FR
8e795c57-b653-4fd5-91fd-6102afb17bc5	6c7fced7-c9d3-4a18-88cc-577d9a59b283	Do you like popping your partner's pimples? 	en_US
95db1755-141c-4be2-8cf5-6aa84e4cf7c9	6c7fced7-c9d3-4a18-88cc-577d9a59b283	Aimez-vous percer les boutons de votre partenaires? 	fr_FR
1e45276c-3bb9-4d95-9d13-9c6606a86fd8	484abcbf-dbd3-4c73-9ddf-3d31102d9564	Have you ever had to stop having sex because of an erection problem?	en_US
7c680348-88b7-4ffe-86da-8535b4559c39	484abcbf-dbd3-4c73-9ddf-3d31102d9564	Avez-vous déjà du arrêter de faire l'amour à cause d'un problème d'érection ?	fr_FR
1eba144d-6264-4097-b772-dd76b76e062d	e3844bbc-243d-4225-a3a0-dedb1f1f285e	Was it over two years since your last visit to the dentist? 	en_US
4272ae25-dd40-4ffc-8db8-3e427d48dbb4	e3844bbc-243d-4225-a3a0-dedb1f1f285e	Votre dernière visite chez le dentiste remonte t'elle à plus de deux ans? 	fr_FR
8b40206a-6836-44d1-9113-c19dc7a2adbe	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	Do you think the foreplay is important?	en_US
5b0e364a-909c-439b-9072-eb3fb13ad80f	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	Pensez-vous les préliminaires importants?	fr_FR
7919b3e4-5bf0-4072-bdab-75ebceab53c2	ffb69ca7-69f9-4694-b983-320fa63de509	Are there people who get on your nerves when they haven't done anything to you? 	en_US
147fecb2-68f9-4ad7-bcd6-8156e7120821	ffb69ca7-69f9-4694-b983-320fa63de509	Y'a-t-il des gens qui vous énervent alors qu'ils ne vous ont rien fait? 	fr_FR
1d02a7d7-261c-4eae-9cdf-bc9ae96544fe	1afd8c5e-977f-4597-8368-b658f59aa7fc	Were you laughed at at school?	en_US
b9d1f0b9-7813-4925-85f0-bed1d4bbde15	1afd8c5e-977f-4597-8368-b658f59aa7fc	Se moquait-on de vous à l'école ?	fr_FR
557f8e71-8a2b-44c9-88ce-f0ef4052b8cc	0ba134ba-6857-4ade-8b13-2b1df78701b8	Do you feel like other people understand you?	en_US
a3663465-54cd-41c9-8ed2-db8f619ee262	0ba134ba-6857-4ade-8b13-2b1df78701b8	Est-ce que vous avez l'impression que les autres vous comprennent?	fr_FR
74c326cf-04dc-4955-a356-c6c8604d6555	751ebb83-a155-443e-9d95-eaadf6183b57	Would you be prepared to pay more for your purchases if they supported the ecological cause?	en_US
6f92f610-fe5f-4c05-9b2e-6e5acf79ea10	751ebb83-a155-443e-9d95-eaadf6183b57	Seriez-vous prêt à payer vos achats d'avantage s'ils soutenait la cause écologique ?	fr_FR
a71139f6-b1c7-4888-a892-98d4e617bb28	9e3c8df2-f33e-4c86-90a0-3e04554cee14	How would you like to be on a reality show?	en_US
c69c0a60-273f-481a-9db0-1a7639bf3b84	9e3c8df2-f33e-4c86-90a0-3e04554cee14	Aimeriez-vous participer à une émission de téléréalité ?	fr_FR
e088d887-7d29-46f5-95e4-21d44584d5ea	7a2461a2-be29-4e95-9128-4f1d587ef9f9	Have you ever emitted a loud fart in the presence of several people?	en_US
f295ed63-4d1f-4a80-963b-bb71711940f8	7a2461a2-be29-4e95-9128-4f1d587ef9f9	Avez-vous déjà émis un pet sonore en présence de plusieurs personnes ?	fr_FR
ec248c82-087a-44d1-946b-89e3c12ed6e3	4d461bdd-6555-4e75-b92d-7007787a206c	Have you ever cried after having sex?	en_US
ca43c56e-8810-4d1d-96e2-c9f0178c9176	4d461bdd-6555-4e75-b92d-7007787a206c	Avez-vous déjà pleuré après avoir fait l'amour ?	fr_FR
c8a78768-e16d-4979-8a2f-a6e936ad36e6	b5332f27-d03f-46ad-9860-7f33d7109466	Have you ever sucked someone's feet?	en_US
09358d83-d869-4381-95d1-7dbc8bbc08e6	b5332f27-d03f-46ad-9860-7f33d7109466	Avez-vous déjà sucé les pieds de quelqu'un ?	fr_FR
c90df8c4-e0fb-461c-b6ea-c30e340a745d	8b5228d0-9411-4aba-a14c-8dfda45f20d0	Would you be happier if you were richer?	en_US
44f9d46a-4177-46b8-9593-9e910b8d7ecd	8b5228d0-9411-4aba-a14c-8dfda45f20d0	Seriez-vous plus heureux si vous étiez plus riche ?	fr_FR
4b8e981c-ef81-4cd2-b055-e6c309a0cc9d	3781e005-35d0-4802-8a02-b5b93a26be7d	Have you ever had help from a psychologist or psychiatrist?	en_US
396fe881-a2a0-4a32-a860-e5e2e3eab9b7	3781e005-35d0-4802-8a02-b5b93a26be7d	Vous-êtes vous déjà fait aider par un psychologue ou un psychiatre ?	fr_FR
6f5be01b-f114-442e-af8b-5d885256d3e3	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	Is religious union recommended for a couple?	en_US
ca422e29-75fe-4880-b18b-aa9e918d031d	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	L'union religieuse est-elle conseillée pour un couple ?	fr_FR
e50f56da-25a9-4a45-ad01-739688eb90d4	e3184a76-0833-49d4-95b1-c3ae863be78b	Would you be willing to die in an attempt to save a stranger?	en_US
cab5c642-9db7-4d4e-bc03-18076caffda4	e3184a76-0833-49d4-95b1-c3ae863be78b	Seriez-vous prêt à mourir pour tenter de sauver un étranger?	fr_FR
b13bead4-fa19-4a78-8e75-18431dbd105d	5db47450-6c6b-4f83-964a-fbd370cb7465	Do you believe that there is a master creator?	en_US
6f2838dd-909e-4947-94c2-f51409e8c3e6	5db47450-6c6b-4f83-964a-fbd370cb7465	Croyez-vous qu'il existe un maître créateur?	fr_FR
778a738c-b524-4a54-96ae-98b1791c1cff	5a55df28-edeb-45ae-b336-043a57f6f5b8	Do you think that we necessarily find work if we search well and that we are ready to make some compromises?	en_US
d30becac-2bd0-4c9b-b79c-948468d5c076	5a55df28-edeb-45ae-b336-043a57f6f5b8	Pensez-vous qu'on trouve forcément du travail si on cherche bien et qu'on est prêt à quelques compromis?	fr_FR
7ba64cd2-02a6-40aa-be90-094d3fc49755	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	Have you ever had mouth-to-mouth food exchanges?	en_US
9394fe01-4c64-4421-aca9-e60fabf9151b	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	Avez-vous déjà fait des échanges de nourriture de bouche à bouche ?	fr_FR
0a41cbb0-7aa9-414a-91e3-2bb2329993c4	8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	Have you ever tried threesome sex?	en_US
70241610-4ae7-4620-ac27-60fe0c45821b	8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	Avez-vous déjà essayé le sexe à 3 ?	fr_FR
e0181db2-2861-432a-8a2e-7575347dde59	cd3b1212-52b0-46fe-8243-db2ee3b8c81b	Do you believe in horoscopes?	en_US
e8eef6ed-d3f0-4d34-85ec-ed74b9b073fe	cd3b1212-52b0-46fe-8243-db2ee3b8c81b	Croyez-vous aux horoscopes?	fr_FR
688928d7-7366-4e97-9ead-96a089fb6d70	f577157e-75a5-425e-b537-99cbf885c979	Will we one day be able to establish peace in the world?	en_US
0eba0ca4-4324-4847-91c7-c0723264d3c1	f577157e-75a5-425e-b537-99cbf885c979	Pourrons-nous un jour établir la paix dans le monde?	fr_FR
dd61cca5-141a-4121-9727-975bd365e816	15724682-b932-4bf4-a734-87215b84955f	Have you ever testified in court?	en_US
3d1beccd-3f77-4e41-b6fa-a837ed19085d	15724682-b932-4bf4-a734-87215b84955f	Avez-vous déjà témoigné en justice ?	fr_FR
a86f283f-5a17-4e0c-ab8e-6cecf7d60c26	bf4c517f-21a3-4ca3-96d4-2002965e42ed	Could you commit murder under certain circumstances?	en_US
0ed7efa2-64ee-43b5-b804-4c58f188b039	bf4c517f-21a3-4ca3-96d4-2002965e42ed	Pourriez-vous commettre un meurtre dans certaines circonstances?	fr_FR
77611ab6-1fb9-4585-944f-756f615b63e5	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	Do you think the moon has an influence on our mood?	en_US
10d0c8d9-099a-4522-83ab-d8aedc6a7750	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	Pensez-vous que la lune exerce une influence sur notre humeur?	fr_FR
d3b27bee-9223-43e6-bfbc-4f55434fb103	17279c41-09b0-49be-87ec-05bf0d5da921	Do you ever take sleeping pills?	en_US
2f0ee92c-dff0-4709-b04d-4f4cb1642584	17279c41-09b0-49be-87ec-05bf0d5da921	Vous arrive t-il de prendre des somnifères ?	fr_FR
bf2fbf3e-4a4c-44f0-8ee7-d23b8305689b	7883db29-dc81-4e6d-9dd1-e7847014c54a	Do you like to travel?	en_US
4319a4fd-ecd8-476d-af5d-c054285037b9	7883db29-dc81-4e6d-9dd1-e7847014c54a	Aimez-vous voyager?	fr_FR
e1eeab72-0ad4-4f48-922a-5276158cd7aa	84a2e439-b945-4c8d-859c-7836589d8618	Do you value spirituality? 	en_US
7da883e7-233d-49b3-99d3-2b258678f482	84a2e439-b945-4c8d-859c-7836589d8618	Accordez-vous de l'importance à la spiritualité? 	fr_FR
6546c926-d23a-4697-ab2b-7a509136cf5d	443e2674-e2dd-4a99-a627-582b1a178dc0	Have you ever eaten while having sex?	en_US
8aec6869-3f2c-40c1-b13d-c8f57ec46283	443e2674-e2dd-4a99-a627-582b1a178dc0	Avez-vous déjà mangé en faisant l'amour ?	fr_FR
65c61284-8d0d-493f-85a2-77a3d3a83dee	61caff10-9b14-48c6-ad76-4a04a5e06c06	Do you think the taxes are too high in your country?	en_US
007e07f4-a5d9-4719-a204-bb984db21aca	61caff10-9b14-48c6-ad76-4a04a5e06c06	Pensez-vous les taxes trop élevées dans votre pays ?	fr_FR
3376310c-8dea-422f-8fdf-7bfd4a6020a9	93162b5d-3d6c-47ba-aebe-e2295159b54d	Do you like social media?	en_US
93e9881c-9944-49dd-b976-cec2091f026e	93162b5d-3d6c-47ba-aebe-e2295159b54d	Aimez-vous les médias sociaux?	fr_FR
7925d19a-c78a-47d3-9bcd-40f89e71eddd	718dd026-21ba-44b5-92fa-17b65a2ff7b3	Have you ever put your tongue in someone's nose? 	en_US
a8f20bce-3213-43b6-b24d-f2f5a78e21e6	718dd026-21ba-44b5-92fa-17b65a2ff7b3	Avez-vous déjà mis votre langue dans le nez de quelqu'un? 	fr_FR
f2f4440b-75a9-4883-a68c-42b1f00f7ec4	df65012d-e1b4-4d2f-aae6-c95faafb86e2	Do you think that the concept of loyalty is outdated?	en_US
fcdcbda8-b1e8-4711-af67-935a4fa9ec30	df65012d-e1b4-4d2f-aae6-c95faafb86e2	Pensez-vous que la notion de fidélité est dépassée ?	fr_FR
01649407-2910-4fca-b1bd-13ebfa37d69d	2aa871de-5739-4485-8561-b390dc57a40b	Do you think that you have to love yourself first to love others?	en_US
823b803e-086b-4aad-b233-9fc7a49d3e01	2aa871de-5739-4485-8561-b390dc57a40b	Pensez-vous qu'il faut d'abord s'aimer soi-même pour aimer les autres ?	fr_FR
8e1cc29e-f761-4139-8a90-386e7fa881fa	d956b86c-3435-4863-b25c-4108865cea7e	Have you ever had your wallet stolen?	en_US
fcca0681-c850-4ae3-82d9-bd3b043201c2	d956b86c-3435-4863-b25c-4108865cea7e	Vous êtes vous déjà fait voler votre porte-monnaie ?	fr_FR
4c4daded-4ea4-4a70-ab96-0c654c57e6d0	8835226f-c302-43e6-a52b-29ef94aa4f6a	Have you ever secretly observed a couple having sex?	en_US
4df337ae-59dd-4a0f-b1d3-f2909e4235f5	8835226f-c302-43e6-a52b-29ef94aa4f6a	Avez-vous déjà secrètement observé un couple en train de faire l'amour ?	fr_FR
b1ea4839-aba6-47dc-92ba-ce89f49a172f	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	Do you like the country in which you live?	en_US
9fb887e6-aa77-4eaf-bdac-d3ab48164d77	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	Aimez-vous le pays dans lequel vous vivez?	fr_FR
f0294990-9f84-49d2-baa3-97c02fad7a60	a66aff0c-57b9-4961-bc63-5e026a9a7faf	Are you a polygamist?	en_US
6bf1c2dc-6a47-4703-8367-5a3765960dcb	a66aff0c-57b9-4961-bc63-5e026a9a7faf	Etes-vous polygame?	fr_FR
a1c684b1-bc45-4b92-a26a-60ffb83bbab5	2f2232eb-36fa-4d46-ae26-83ac28a4e838	Have you ever looked at how tax money is used in your country? 	en_US
7c35a72b-280c-432f-9d47-890fa21b59bd	2f2232eb-36fa-4d46-ae26-83ac28a4e838	Avez-vous déjà regardé comment l'argent des impôts / taxes était utilisé dans votre pays ? 	fr_FR
ada90cc6-9833-457e-8b92-02e4423fd4a6	a50f8d01-6056-45ff-862a-0c752cbcd0c9	Do the armpits of unhaved women disgust you?	en_US
3ffa55e2-7125-41a0-a46c-74aa3c314aad	a50f8d01-6056-45ff-862a-0c752cbcd0c9	Est-ce que les aisselles de femmes non épilées vous dégoutent ?	fr_FR
3b994837-df8e-4a90-be70-09ae0109176c	bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	Are you in favor of the death penalty?	en_US
b090d59a-a84e-46dd-9a77-b423d6b848dc	bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	Etes-vous pour la peine de mort ?	fr_FR
c254da7e-b850-4a36-94a5-65549c62c7c8	be82911a-8f3c-4352-a469-dc336542eb58	Would you like to see the universal minimum income introduced in your country? 	en_US
ea0e1796-7eae-4ea2-927b-188d2683656c	be82911a-8f3c-4352-a469-dc336542eb58	Aimeriez-vous voir le revenu minimum universel instauré dans votre pays ? 	fr_FR
229b1a12-e40d-4a8d-89f3-5690736e1b45	2652fe6c-6e62-46fc-bec2-db8b91cecebc	Have you ever run a red light on purpose?	en_US
be6d758e-47e6-4691-b6ce-3f2f0b23e724	2652fe6c-6e62-46fc-bec2-db8b91cecebc	Avez-vous déjà grillé un feu rouge volontairement ?	fr_FR
4be5a433-9171-4f83-8cee-23ef6720c24f	d79ff7cf-bf2f-4270-aff4-2070fbee5a53	Have you ever made someone drink urine?	en_US
4ee0cd75-191e-4dac-a5ee-01ae730d47b0	d79ff7cf-bf2f-4270-aff4-2070fbee5a53	Avez-vous déjà fait boire de l'urine à quelqu'un ?	fr_FR
20f6494a-fbd7-409b-9529-40914298f7c6	8765b39e-8b40-4100-9ed3-69f270ccecff	Do you like the society you live in?	en_US
8e40bbb3-76ca-41d9-bfa1-34abb8d7789b	8765b39e-8b40-4100-9ed3-69f270ccecff	Aimez-vous la société dans laquelle vous vivez ?	fr_FR
81bb072f-7a2a-4154-9b19-01457937d026	6aebef76-6605-4d33-9ba0-649dd9574261	Do you think people give money to the homeless to feed their own egos?	en_US
12298d10-0686-4e78-8cde-0c4989d2f4bd	6aebef76-6605-4d33-9ba0-649dd9574261	Pensez-vous que les gens donnent de l'argent aux sans-abris pour nourrir leur propre ego?	fr_FR
7c796fc8-1b09-4bf5-9fd0-f2c866129c12	43303113-d193-4a22-8ae2-d0474dce0a6f	How would you like to travel to outer space?	en_US
a2b2db0e-c40d-4cd3-81cf-d681ea8b9daa	43303113-d193-4a22-8ae2-d0474dce0a6f	Souhaiteriez-vous pouvoir voyager dans l'espace extra-atmosphérique?	fr_FR
d93eaa99-ac91-4324-9674-d3a316334680	e760d7bb-a053-4cae-a04c-8a47e2405b17	Should you avoid talking about your old love stories with your spouse?	en_US
da33aa82-b906-4484-8f3a-830039f67fc7	e760d7bb-a053-4cae-a04c-8a47e2405b17	Faut-il éviter de parler de ses anciennes histoires d'amour avec votre conjoint ?	fr_FR
29933d7f-913c-471c-ba6f-734bab7c0cea	b6b4e561-4675-4cf8-801e-94baae050a4f	Do you think wrestlers are fighting for real?	en_US
dfaaeee9-97a2-4de7-9d92-441ea7ed7089	b6b4e561-4675-4cf8-801e-94baae050a4f	Pensez-vous que les catcheurs se battent pour de vrai?	fr_FR
9f6b7b1f-c957-4bf7-b599-123ea3d31433	145d2485-801f-40ee-a795-28a93847b780	Does the soul exist beyond the body? 	en_US
a52051e0-b3b4-43e7-85ca-bacccd9db2ff	145d2485-801f-40ee-a795-28a93847b780	Est-ce que l'âme existe au-delà du corps ? 	fr_FR
bc82e478-9a48-4abc-999b-d2be1cc29c28	07236582-4c9e-438f-a20f-4a8931d15e23	Do you think you understand yourself?	en_US
cf882a37-16da-4402-bdd4-5389909a43f9	07236582-4c9e-438f-a20f-4a8931d15e23	Pensez-vous vous comprendre vous-même?	fr_FR
387c0c5e-e848-4335-a3d4-1f8e247e638d	bddaa94a-0114-4545-a19d-753c92fa31b2	Have you ever had a homosexual experience?	en_US
f004d5ad-5436-4cb9-a4e3-a830044afcc5	bddaa94a-0114-4545-a19d-753c92fa31b2	Avez-vous déjà eu une expérience homosexuelle ?	fr_FR
adeb71f6-6f8f-4c00-8538-695e7d78cffc	df8e7cea-6a2f-4509-9604-83726c84d7e2	Have you ever saved someone's life? 	en_US
b62d33df-181e-4b2a-957b-d706a0a5ac53	df8e7cea-6a2f-4509-9604-83726c84d7e2	Avez-vous déjà sauvé la vie de quelqu'un? 	fr_FR
8a5e8d59-1429-4b8c-924a-31ace33c1978	c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	If you had a secret to share on your deathbed knowing that it could tarnish your memory, would you share it?	en_US
b5d6b7da-b3ff-4685-9320-80f5148a53c5	c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	Si vous aviez un secret à confier sur votre lit de mort, sachant qu'il pourrait ternir votre mémoire, le partageriez-vous?	fr_FR
6912bf92-87fb-4031-a361-052c7ac189d2	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	Do you like ice cream?	en_US
5872afec-01f4-4c40-9938-7f2d1a4af37f	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	Est-ce que vous aimez la crème glacée?	fr_FR
bc479606-fdb3-41a4-90b2-5913f515fc32	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	Do you think abortion is a crime?	en_US
d5ad5545-8605-47d9-a462-b03ffe6e5ae6	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	Pensez-vous que l'avortement est un crime ?	fr_FR
4f581490-925e-42b2-a422-a7a49ac95d2e	59707023-92fe-4cd1-8336-daf3d792adc3	Do you think everyone has a guardian angel?	en_US
c16031de-824e-4ade-9875-6e3af63b045e	59707023-92fe-4cd1-8336-daf3d792adc3	Pensez-vous que tout le monde a un ange gardien ?	fr_FR
21407c3a-41f1-47d0-b64d-f61501a74fb5	4ba7ca55-1686-4158-a469-b9b3c787d400	Are you in favor of nuclear energy?	en_US
fa466dbb-38be-4ec9-ae2b-f9cbd8cf476b	4ba7ca55-1686-4158-a469-b9b3c787d400	Etes-vous pour l'énergie nucléaire?	fr_FR
419e7d0a-ee73-48d4-a7d1-929d92a132c6	46318cf6-b5fa-49e9-b872-4e14c9ff3805	Have you ever talked about sex with your parents? 	en_US
52850221-c62a-4452-9d05-8f928f27d418	46318cf6-b5fa-49e9-b872-4e14c9ff3805	Avez-vous déjà parlé de sexe avec vos parents? 	fr_FR
45cad30b-8095-4148-925a-b1939bf7bcb6	074c499f-c4e5-47ab-9ef9-a732e63f827b	Do you think that terrorists believe they are acting for the good of the world when they commit crimes?	en_US
c6cad755-9757-4697-b9bd-35f3992439df	074c499f-c4e5-47ab-9ef9-a732e63f827b	Pensez-vous que les terroristes estiment agir pour le bien du monde quand ils commettent des crimes?	fr_FR
6473f698-d7ce-4f4d-b62b-178b8f444e7d	e504ad41-4f8a-4241-a045-6542f92d86b3	Have you ever had crabs?	en_US
76b1867e-8cea-4c06-a07b-92404003e759	e504ad41-4f8a-4241-a045-6542f92d86b3	Avez-vous déjà eu des morpions ?	fr_FR
ed08e904-c980-4941-b5c5-03c8ca5c8df0	161af0e2-4004-45de-a0b1-2e13243e2621	Are you in favor of adoption by same-sex couples?	en_US
613ea200-f368-4078-ab36-53814b1bc6f2	161af0e2-4004-45de-a0b1-2e13243e2621	Etes-vous pour l'adoption par des couples homosexuels ?	fr_FR
14ae57ea-2604-4161-9ae6-4adea8ad6d05	6b4ba409-7484-4679-a654-680ffa1262d2	Do certain sexual smells turn you on?	en_US
989a8d8e-349b-4c97-9324-863c96999764	6b4ba409-7484-4679-a654-680ffa1262d2	Certaines odeurs sexuelles vous excitent-elle?	fr_FR
5fbe57f1-e92b-4738-82c0-1d7d2266f30a	376c3f94-8227-4c9a-911c-1c20a84fc187	Have you ever crossed-dress?	en_US
a49a0b6f-423d-4f18-b4dc-ef6efe5727d3	376c3f94-8227-4c9a-911c-1c20a84fc187	Vous-êtes vous déjà travesti ?	fr_FR
b8f3ce63-919f-4641-af64-71f0c85bcb0d	fa0b0c21-ae00-4032-98bd-f6728058c639	Do you abuse alcohol when you are having problems?	en_US
c9f4a79c-4ea5-4f6a-a8ea-a7e9869e8b1a	fa0b0c21-ae00-4032-98bd-f6728058c639	Abusez-vous de l'alcool quand vous rencontrez des problèmes ?	fr_FR
e085299c-daf5-4dfe-8645-4371006eebff	e7e5012a-15df-4747-8d79-acd95a978e60	If maximum security measures were taken, would you trust an online voting system for political elections?	en_US
989c534f-3d98-4827-866b-4669b0808a73	e7e5012a-15df-4747-8d79-acd95a978e60	Si un maximum de mesures sécuritaires étaient prises, feriez-vous confiance à un système de vote en ligne pour les élections politiques ?	fr_FR
068ccf1f-13cf-421e-b4a6-e1776c555490	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	Have you ever had sex on the phone?	en_US
e6073676-f5cf-467d-933a-5ae301f67c82	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	Avez-vous déjà fait l'amour par téléphone ?	fr_FR
b66ec857-cbac-4a02-8d3e-4561e103fd33	b4cfadcd-1314-4b2b-8eb8-064403e430b1	Do you think that civil servants work less than others?	en_US
03937250-a60b-4acd-b4a4-a8519e1901ee	b4cfadcd-1314-4b2b-8eb8-064403e430b1	Pensez-vous que les fonctionnaires travaillent moins que les autres ?	fr_FR
cc46be4e-8d82-4791-9dc6-0f9d20e176ba	8754c711-e0c9-4440-b8c5-14605e9c1686	Do you believe in fate?	en_US
67f7b433-cff3-4dc7-947d-aeeb925b5619	8754c711-e0c9-4440-b8c5-14605e9c1686	Croyez-vous au destin?	fr_FR
7d0a4d59-380c-41c6-9155-a5b22b82409a	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	Have you ever seriously thought about killing yourself?	en_US
18017506-40b5-489b-8fcc-290aaf6885cc	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	Avez-vous déjà sérieusement pensé à vous suicider ?	fr_FR
e728d64d-3ccd-4f66-a695-cd4c3910b620	42635a47-17d6-4d8d-9213-8b525c42f1a1	Do you ever wear your underwear for several days without washing it?	en_US
8a86b296-bcfd-45b0-850c-334f0bb5e24f	42635a47-17d6-4d8d-9213-8b525c42f1a1	Vous arrive t-il de porter vos sous-vêtements plusieurs jours sans les laver ?	fr_FR
b55acf19-1e80-4e38-bf2a-101e0e696548	e8862f4a-a677-4112-a197-184c365158ef	Are you a member of a political party?	en_US
b13883f1-29ca-41e6-8b82-4671e3e06e86	e8862f4a-a677-4112-a197-184c365158ef	Etes-vous membre d'un parti politique?	fr_FR
cedab975-03a2-4646-a415-e17bcbcc1ee1	055c41e3-8b89-49ed-830f-b953f8d8f3f7	Have you ever had your butt groped by a stranger?	en_US
05eba322-ec4e-420d-bca0-53277bbc8bd3	055c41e3-8b89-49ed-830f-b953f8d8f3f7	Vous êtes-vous déjà fait pelotée les fesses par un(e) inconnu(e)?	fr_FR
fb658f91-7945-42e7-8676-d3142ddecdd5	253308cc-ade3-4258-8f08-6d62a08d86de	Will France win the next soccer world cup?	en_US
e6e11dcd-bcb5-4b30-9908-b438989aa952	253308cc-ade3-4258-8f08-6d62a08d86de	Est ce que la France va gagner la prochaine coupe du monde de football ?	fr_FR
8256076b-d13b-4ad0-9919-3ba925c4cd53	0d44edf6-38a2-4310-9708-dad2886df46a	Have you ever had sex in a car?	en_US
6bdf0a85-0d9c-49d4-8433-502fd32c3dfb	0d44edf6-38a2-4310-9708-dad2886df46a	Avez-vous déjà fait l'amour dans une voiture ?	fr_FR
fc3cce35-0a5b-4eb2-bdbf-e4df94a36dbf	07a2bc96-9d6d-472f-842c-ed00817fe9b0	Can you change your mood in minutes? 	en_US
44cff1ea-2fd0-4e83-807b-6bfe28fb435b	07a2bc96-9d6d-472f-842c-ed00817fe9b0	Pouvez-vous changer d'humeur en quelques minutes? 	fr_FR
fd3d07d6-c9d0-43d1-81dc-fc88d5f98447	168bfbaf-e950-474e-bf4a-7a880294b564	Can humans forget about the concept of race, religion and ethnicity?	en_US
20951849-f461-443c-a80c-50bbf87970a5	168bfbaf-e950-474e-bf4a-7a880294b564	Les humains peuvent-ils oublier le concept de race, religion et origine ethnique?	fr_FR
31431e62-f11b-4ab5-a0c2-ec746884a522	0b200580-eb6a-43d5-b59e-bf5d75bace7e	Would you feel capable of adopting a child? 	en_US
aa09e45a-efaa-4de1-9c6c-091e5a8bc23c	0b200580-eb6a-43d5-b59e-bf5d75bace7e	Vous sentiriez-vous capable d'adopter un enfant? 	fr_FR
01d3348c-1a4d-4c30-a343-cfdabd62a68b	266c5043-630f-4e32-9f61-737989489c6f	Have you ever had sodomy?	en_US
8458b4de-a348-42d6-912f-f4769e3c5e5b	266c5043-630f-4e32-9f61-737989489c6f	Avez-vous déjà pratiqué la sodomie ?	fr_FR
152ca5c6-6138-4828-ac59-805b920d21e5	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Why are people with disabilities often discriminated against?	en_US
de919f30-e6fe-4e05-8bf1-519c6dab1715	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Pourquoi les personnes handicapées sont-elles souvent discriminées?	fr_FR
e9d22c05-e02a-4038-8c4b-5cc3c7b2c6f5	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	What colour are your eyes?	en_US
b6685974-c904-41dd-8b94-20d66f8e70e5	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	De quelle couleur sont vos yeux?	fr_FR
1b1bb91b-58a1-4466-a178-2f8a9cf8cb74	6436d0e4-9902-4d3a-86aa-9414196e2c99	Would you like citizens to be called upon to vote more often in referendums to decide the future of the country? 	en_US
a464a593-2c2e-46aa-b4a4-5247fda94dec	6436d0e4-9902-4d3a-86aa-9414196e2c99	Aimeriez-vous que les citoyens soient plus souvent appelés à voter lors de référendum pour décider de l'avenir du pays ? 	fr_FR
e1ef5e64-ef6e-4f68-bc9f-48d1eeccda1b	6e50e2e4-9287-4ea8-82d5-837695929570	Are you in favor of euthanasia?	en_US
80643aa5-8502-4f8f-87a6-67768c672a09	6e50e2e4-9287-4ea8-82d5-837695929570	Etes-vous pour l'euthanasie?	fr_FR
2f503d54-8cf7-4392-a6e1-6dc6e2d5e5d2	2f9bbed5-ef7c-4954-a637-fc91112f9c10	Has confinement brought your relationship closer or further?	en_US
6a5a10de-452e-4ebb-ba85-8a89adc0575f	2f9bbed5-ef7c-4954-a637-fc91112f9c10	Est-ce que le confinement a rapproché ou éloigné votre couple ?	fr_FR
5c8ad7e8-4429-4a4a-ab49-a73e18432679	76438079-4579-4f01-a037-874d8cb1d599	Have you ever had cosmetic surgery?	en_US
6d5680a5-d0e0-4d70-aaf1-bb103ba7e861	76438079-4579-4f01-a037-874d8cb1d599	Avez-vous déjà subi une chirurgie esthétique?	fr_FR
8304e11b-2eb0-46b6-9845-4d7d3cb22bdf	2659d012-2599-4579-bd99-749106796ee0	If you could change one thing about man, what would it be?	en_US
2724e9de-be40-4446-a943-4573a1109dc7	2659d012-2599-4579-bd99-749106796ee0	Si vous pouviez changer une chose à propos de l'homme, quelle serait-elle?	fr_FR
d4d4d12e-2803-454f-a439-e1e07203308a	0ba30bd5-f31b-491b-85df-5f32444ff9d6	Would you prefer to celebrate Christmas without exchanging gifts?	en_US
b985bb81-2316-43c5-a059-d9e8b6f385bc	0ba30bd5-f31b-491b-85df-5f32444ff9d6	Préféreriez-vous fêter Noël sans échange de cadeaux?	fr_FR
7703a670-1955-43a6-a532-b00d3c2bb70c	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	Do you find gay kissing in public embarrassing?	en_US
49a2e1e4-efcd-416b-a847-ba5aeae3b038	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	Trouvez-vous gênants les homo qui s'embrassent en public?	fr_FR
c23b193a-9aa4-4ffb-a3ea-8e73ba3a9cc5	c413da51-fd2a-44dd-bee4-fbc214bc58c8	Do you think physical appearance is important?	en_US
7bf5e9f3-d7ff-4bba-946f-df58ecd7aa85	c413da51-fd2a-44dd-bee4-fbc214bc58c8	Pensez-vous que l'apparence physique est importante ?	fr_FR
4e4d5862-a33e-4767-9947-7d2bf1a410a5	49a69626-ca50-4650-8e9a-476fa8ab5c2d	What do you look at first in someone you might like?	en_US
4a1866e7-81b7-4e85-8f1e-b94277e2113d	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Que regardez-vous en premier chez une personne susceptible de vous plaire ?	fr_FR
87bf5777-e229-47d8-913a-ff9ee507c521	2db015ae-b56e-4fe5-8613-480c49d15921	Which super hero would you like to see exist?	en_US
49e5a9f6-6d19-4d37-a703-bbf1399b5f7d	2db015ae-b56e-4fe5-8613-480c49d15921	Quel super héros voudriez-vous voir exister?	fr_FR
42e9427c-3650-45b5-879f-bd2af67cacac	21b4dd7c-2739-4d48-a5b3-89511386cef7	Do you think porn boosts or restrains your sexuality with your partner?	en_US
ec73fa43-eaad-49eb-8307-eb322b3e8c65	21b4dd7c-2739-4d48-a5b3-89511386cef7	Pensez-vous que le porno stimule ou freine votre sexualité avec votre partenaire ?	fr_FR
dc911a71-306d-44a2-96f2-8b908b79c958	daf87f3f-f68a-40b7-a90c-d097a594f8b6	What's your most disgusting habit?	en_US
1387a2a6-2d82-45ad-b20d-209a21cc886d	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Quelle est votre habitude la plus dégoûtante?	fr_FR
18a75827-17ed-4e31-8361-3a7d6dc121f9	bad17f81-1a2d-4dd8-bbc3-76d059e44acb	If your partner decided to have sex with a stranger, would you prefer them to be attractive or repulsive?	en_US
62d84eec-6867-4e24-a9eb-78c293f8eaf6	bad17f81-1a2d-4dd8-bbc3-76d059e44acb	Si votre partenaire décidait d'avoir une relation sexuelle avec un(e) inconnu(e), préfèreriez vous que ce dernier soit attirant ou repoussant ?	fr_FR
cae8e6d8-b206-4bc9-b9b4-4384bc0f19b0	5969f2b8-73e9-434e-b79e-031f61f598cf	What quality makes you love another person the most?	en_US
defeeddd-6f69-4f1b-ad53-c4e881befdad	5969f2b8-73e9-434e-b79e-031f61f598cf	Quelle qualité vous fait le plus aimer une autre personne?	fr_FR
df7966e2-f5db-4991-af90-1cc85f48afd4	6b737cf0-ec65-42d7-9bd5-2159c5889e05	Do you like gambling?	en_US
312b44f7-18c8-43f9-ab76-b0cd6ddf260e	6b737cf0-ec65-42d7-9bd5-2159c5889e05	Aimez-vous les jeux d'argent?	fr_FR
91a0f971-f80e-4ee4-86c4-f46bcded6168	0c5964b4-2659-4db9-acc0-972c472c725e	Would you like citizens to be called upon to vote more often in referendums to decide the future of the country? 	en_US
f902bf07-86da-4e5a-82dd-762e97914d0a	0c5964b4-2659-4db9-acc0-972c472c725e	Aimeriez-vous que les citoyens soient plus souvent appelés à voter lors de référendum pour décider de l'avenir du pays ? 	fr_FR
6abe5616-9dca-4d75-8195-480975ae32bc	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	What religion are you from?	en_US
5a458c85-19cc-4ab5-baac-03b179b81428	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	De quelle religion êtes-vous ?	fr_FR
cba936dd-9a41-4b39-bc45-10f6e66d530a	ee244f83-9853-49d8-b641-74724c0e1496	Do you have a photo of a naked partner? 	en_US
f95ca4cd-b73b-48bf-a01d-df6b56490dd4	ee244f83-9853-49d8-b641-74724c0e1496	Possédez-vous une photo d'un(e) partenaire nu(e) ? 	fr_FR
00160a96-15a8-4471-bd6a-46fd8360e148	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Should we get rid of religion to facilitate harmony in all countries?	en_US
65b0a57f-08e0-4bfe-8f8d-503b01e7f5e5	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Devrions-nous se débarrasser de la religion pour faciliter l'harmonie dans tous les pays?	fr_FR
ab047470-9895-40bb-9e3b-d2db2f75f9d6	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Why do we find farts so funny?	en_US
9fcdb704-6036-4181-bb6b-a7972e80577d	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Pourquoi trouve t-on les pets si drôles?	fr_FR
35a92afc-8278-4b8e-9d34-1f3433604815	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	If the leader of your country matched your expectations, which political system do you think would be the most effective?	en_US
75cdc7b8-f54d-40e7-b14d-4d5e6e52005c	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Si le dirigeant de votre pays correspondait à vos attentes, quel système politique serait selon vous le plus efficace ?	fr_FR
02de278b-f099-4825-9b04-f1374786211e	23155572-b0cd-428e-8fd6-393d2bccdfa5	Where does the spirit go when we die?	en_US
8972fda6-c971-47e6-b5ee-f7b203511632	23155572-b0cd-428e-8fd6-393d2bccdfa5	Où va l'esprit quand on meurt?	fr_FR
9f516e2a-e91f-4ccf-8146-26da3e69be84	eaef97a9-bc49-4e0c-9d43-79a026808263	Does the control of citizens by new technologies worry you?	en_US
75cd8db4-72b3-43d4-be7e-b3c4f9d103ab	eaef97a9-bc49-4e0c-9d43-79a026808263	Est-ce que le contrôle des citoyens par les nouvelles technologies vous inquiète ?	fr_FR
9485aa83-657b-4e61-982d-bbd62db8be44	17138bd9-3f54-468f-874e-e589b39e6c01	Do you think you can quickly identify the people you meet?	en_US
f128e5d0-5843-47a9-a7c0-abc900ba4a8d	17138bd9-3f54-468f-874e-e589b39e6c01	Pensez-vous cerner rapidement les personnes que vous rencontrez?	fr_FR
7ef5c96b-7ad9-43c6-b1a3-1b0465c0f64c	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	Do you have a love letter from your ex in your possession?	en_US
aa9e66f6-0a52-46bc-a7a9-cd0bac27a4b8	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	Avez-vous en votre possession une lettre d'amour de votre ex?	fr_FR
38e2ebbe-f683-4680-b935-58770d379893	90f34cab-a886-4db8-9267-3dc055e34cc7	Do you like to see yourself naked in the mirror?	en_US
7582f9bb-9ea6-4548-b57b-4fa64742b436	90f34cab-a886-4db8-9267-3dc055e34cc7	Aimez-vous vous voir nu(e) dans le mirroir ?	fr_FR
5ed27d5e-5a93-45f5-91ef-8a9f6c374d8c	0048fc62-9d18-4e28-9ee5-11187507e3db	Do you think the church has brought more positive or negative to humanity?	en_US
4f56025b-68f5-4163-a059-edc110bfb9d2	0048fc62-9d18-4e28-9ee5-11187507e3db	Pensez-vous que l'église a apporté d'avantage de positif ou de négatif à l'humanité ?	fr_FR
1e426657-791f-4949-aafe-d99eca77b5ce	a527699c-0929-4d07-adaa-5c322ddb7240	Have you ever stolen from a store?	en_US
b0347aa9-f2f5-4839-9151-3dcdb6dfd04c	a527699c-0929-4d07-adaa-5c322ddb7240	Avez-vous déjà volé dans un magasin?	fr_FR
6b4d25cd-cfa5-4eec-beea-8a2e93c94b76	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	Under what conditions should we welcome migrants?	en_US
44385732-ef12-44b5-8fe3-a1096cb1e85e	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	Sous quelles conditions doit-on accueillir les migrants ?	fr_FR
eec24357-b623-45c3-bfd6-eac92205613d	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	If the world was coming to an end, who would you like to have on your side?	en_US
db22159c-72ad-482a-addc-144812fd3e9d	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Si le monde touchait à sa fin, qui voudriez-vous avoir à vos côtés?	fr_FR
b3b68737-226a-4a71-bd0e-e3410a644da5	e73a8b2c-f95b-4cff-9605-fecef53fce39	In bed as in life, are you the one who makes the decisions in your relationship?	en_US
690c5b44-1688-4fad-9542-98216c5ca411	e73a8b2c-f95b-4cff-9605-fecef53fce39	Au lit comme dans la vie, c'est vous qui prenez les décisions dans votre couple ?	fr_FR
bdb25190-bf31-4b75-9a81-3b53c60065f0	d7b79842-0726-445c-8ca1-8cda1552db06	Do you prefer hot or cold weather?	en_US
031bb28b-bb24-401a-a93e-d4dadf25e438	d7b79842-0726-445c-8ca1-8cda1552db06	Préférez-vous le temps chaud ou froid?	fr_FR
b8b6164d-3dde-498b-b4af-5291983643f4	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	the best food in the world?	en_US
3f16b68d-1f91-446a-a786-1c6ebd39db92	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	la meilleure cuisine du monde?	fr_FR
e07a8b36-2378-4451-b373-1287fe0c949a	80dc0680-2884-4a61-858a-db21dd490378	Who appeared first, the egg or the chicken?	en_US
e9e22ad5-e445-47ff-9484-d4fa3214fe85	80dc0680-2884-4a61-858a-db21dd490378	Qui est apparu en premier, l'uf ou la poule?	fr_FR
e4dcc281-6f7e-4643-99c0-48b40166239d	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	What are you most afraid of?	en_US
63170a41-af0b-43b2-8ee4-fd9f7f01bacf	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	De quoi avez-vous le plus peur?	fr_FR
381bea76-3758-4a38-b768-f964c8dfbd63	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	Do you think women who have smaller breasts are less feminine?	en_US
08920a90-0152-4d48-9333-db53580a8bc5	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	Pensez-vous que les femmes qui ont moins de poitrine sont moins féminines ?	fr_FR
6ba66814-9c7a-45d5-ac62-ec897438ef57	f8b65108-8187-470b-be50-6044e6fe6c12	Have you ever spied on your partner?	en_US
4e7a765a-1ea9-4d65-b952-2252a3aafda4	f8b65108-8187-470b-be50-6044e6fe6c12	Avez-vous déjà espionné votre partenaire ?	fr_FR
7e3bce5c-30c5-4d36-912e-208f06cd559c	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Would you be ready to retrain to be happier?	en_US
8ac92db2-5441-445e-a336-a7eedf57ea1f	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Seriez-vous prêt à vous reconvertir pour être plus heureux?	fr_FR
607aa6fa-f6ca-4944-bfd6-4ba3be7c2b64	bd7364ae-c249-45b1-b840-ffefae1fc337	Do you believe in aliens?	en_US
a355aa2b-0206-4ea5-9ec0-2d19b2efbd84	bd7364ae-c249-45b1-b840-ffefae1fc337	Croyez-vous aux aliens ?	fr_FR
0579b5d3-64bb-410a-aca4-9fb5902f45aa	fcb9151e-dadb-4bc6-a928-1fa07338bc23	Would you like to try 3-way sex?	en_US
022d6cd0-1929-45f9-b2dc-5122d78e2e42	fcb9151e-dadb-4bc6-a928-1fa07338bc23	Est-ce que vous aimeriez essayer le sexe a 3 ?	fr_FR
7d9217df-7e7a-485f-a125-22894854d304	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	What is your favorite type of pet?	en_US
4ae6c0e6-45f5-4593-938a-550d6c226e3b	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Quel est votre type d'animal de compagnie préféré ?	fr_FR
e6a93796-a527-4682-862b-bf978c4e1b18	6a582f59-a400-4c9d-8143-b3e6eb082230	Would you like citizens to be called upon to vote more often in referendums to decide the future of the country? 	en_US
602f938b-6b36-4daf-a7dc-105674fd1ba3	6a582f59-a400-4c9d-8143-b3e6eb082230	Aimeriez-vous que les citoyens soient plus souvent appelés à voter lors de référendum pour décider de l'avenir du pays ? 	fr_FR
06a444c8-31be-4663-84c5-4b99c0d7ba88	8ca16545-dd00-48d8-bf87-aaf093851072	Have you ever stripped your partner? 	en_US
cf816dfc-7aa6-44dc-97f7-624392cb3637	8ca16545-dd00-48d8-bf87-aaf093851072	Avez-vous déjà fait un strip-tease à votre partenaire? 	fr_FR
03d3bfd9-37d1-41c1-8155-f897ea61dfd1	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	What is your favorite chocolate?	en_US
fa0eccce-1690-41c3-ac71-de17380aae4c	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	Quel est votre chocolat préféré?	fr_FR
e4a6f745-9da9-4643-af61-e5c9ecc7f9f7	f03edd14-239b-4e70-a6c1-44d5da27960a	Do you believe that Jesus died for your sins?	en_US
96cf81fc-f6a7-49f9-98fb-b81e8b25094d	f03edd14-239b-4e70-a6c1-44d5da27960a	Croyez-vous que Jésus est mort pour vos péchés?	fr_FR
e18ad45c-833e-4619-8d49-192da1b38e1e	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	What is the meaning of life?	en_US
c91ff20b-d7e2-4901-b44c-5a5c3d7baffc	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Quel est le sens de la vie?	fr_FR
773b9f9a-f957-44d8-b542-78c23e92416e	5038dba5-1fcc-4a73-8639-6cfa75334633	How would you sometimes like to be in the body of the other sex?	en_US
bc61e882-ca87-48a2-a16c-060b56999101	5038dba5-1fcc-4a73-8639-6cfa75334633	Aimeriez-vous parfois être dans le corps de l'autre sexe ?	fr_FR
2291ea1f-4c51-41a9-a4d6-781bef2b9577	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	If you could live in another era, which one would you choose?	en_US
6b47ff20-c9c4-472c-a47b-242899af28bd	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Si vous pouviez vivre dans une autre époque, laquelle choisiriez-vous?	fr_FR
a34ba969-93c1-4997-b3a9-8f4a8df62f5a	20510485-8901-4682-87e4-c49cf4d99c26	Do you exist?	en_US
8828db76-a771-4fd0-aad9-cb13cd91b529	20510485-8901-4682-87e4-c49cf4d99c26	Est-ce que vous existez ?	fr_FR
fd51b5f7-bdab-48b5-aea6-1fd0c36aff4b	81d61817-dadd-452a-bfd7-229331ff34ba	If you could live in another country in the world, which region would you choose?	en_US
2dd2e069-5a14-467a-9e49-abd770161ad6	81d61817-dadd-452a-bfd7-229331ff34ba	Si vous pouviez vivre dans un autre pays du monde, quelle région choisiriez-vous?	fr_FR
78aa0ff8-65bf-443c-8297-7dabe452c67e	6402e55b-e502-47eb-adaf-d662d33a96d5	What is deception?	en_US
933ab74a-af23-4def-96ef-16c6f01b40e9	6402e55b-e502-47eb-adaf-d662d33a96d5	Qu'est ce que la tromperie?	fr_FR
2c96f867-f1f6-487f-9102-f9d28fae2b7a	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Who is the best tennis player of all time?	en_US
73f15623-4498-40b9-ad60-0626191e71a1	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Quel est le meilleur joueur de tennis de tous les temps ?	fr_FR
941fe6aa-2042-4bd9-ad1d-c82ac30c9dc9	c7b5a382-4165-4cc8-8de0-3f84a2283679	What do you think of Donald Trump?	en_US
55a491d9-d0d1-47e3-86b6-5bc6c084409b	c7b5a382-4165-4cc8-8de0-3f84a2283679	Que pensez-vous de Donald Trump?	fr_FR
e3bcf5d1-1fd7-4f9f-a84d-bf50deb928ec	bbe75fed-326d-414a-ba4b-132c65e35d52	Which sport newly chosen for the 2024 Olympic Games has its place in the long term?	en_US
ddd59a8b-1195-405d-816b-84fec808ac64	bbe75fed-326d-414a-ba4b-132c65e35d52	Quel sport nouvellement choisi pour les Jeux olympiques de 2024 a sa place durablement ?	fr_FR
a32ea970-80c9-46ce-86f9-7a0bfa37cad1	14da454e-4996-4129-8432-e27cb1cf00c3	Are you ready to change?	en_US
70219edb-50ef-41d8-ab29-1859e0975903	14da454e-4996-4129-8432-e27cb1cf00c3	Êtes-vous prêt à changer?	fr_FR
df27f18c-25c5-4d42-8007-7468e3d64a92	eb9d92e5-c125-4db0-9985-bc84f82bd357	Are you worried about global warming?	en_US
56fe1b22-6654-4761-b4d8-292f748bde42	eb9d92e5-c125-4db0-9985-bc84f82bd357	Etes-vous inquiet à propos du réchauffement climatique?	fr_FR
722cfecb-6121-4ad3-a4bd-cc2d1ded6b6e	30f70e5f-30f6-496e-9a4f-7da1bf533416	How can we remove pain and hatred from the world?	en_US
83980577-e289-4a26-a7eb-66558f1e949a	30f70e5f-30f6-496e-9a4f-7da1bf533416	Comment pouvons-nous supprimer la douleur et la haine du monde?	fr_FR
f922c1d4-50b9-4edf-b5aa-d43e10cce5a9	fb577695-639b-4820-ae9e-7adb78288346	Which world power is doing the best at the moment?	en_US
00cceee4-0d70-4f5a-98a8-d1caca28c61f	fb577695-639b-4820-ae9e-7adb78288346	Quelle puissance mondiale s'en sort le mieux en ce moment ?	fr_FR
95c7608f-351d-4134-a8bc-c3906b532dbe	6cfb4386-5a43-4470-920c-62622c5fac22	Which way do you prefer to use the toilet paper roll, the sheets distributed from the front or from the back?	en_US
04d39d78-d879-4919-b3cf-44f79b7ad324	6cfb4386-5a43-4470-920c-62622c5fac22	Dans quel sens préfèrez-vous utiliser le rouleau de papier toilette, les feuilles distribuées par l'avant ou par l'arrière?	fr_FR
f15b7eab-f8c5-4856-b913-710949a42d87	e3136214-550f-4058-9855-487bac6b4dc9	Which world power is doing the best at the moment?	en_US
ee8dc97a-156e-4fa8-b3f5-0b8ccf28baef	e3136214-550f-4058-9855-487bac6b4dc9	Quelle puissance mondiale s'en sort le mieux en ce moment ?	fr_FR
73975165-09cc-4024-af2d-9d91d187f7ed	96c250ce-8755-4275-964f-06e67bd12966	What is the accomplishment that you are most proud of?	en_US
88dcc528-27bf-467d-b2cc-a9056e0fed06	96c250ce-8755-4275-964f-06e67bd12966	Quel est l'accomplissement dont vous êtes le plus fier?	fr_FR
de27f29f-e4fb-449a-9539-162090c14ee0	91d56b0c-114c-48c0-864c-2b22548f68ba	Do you think the changeover to the Euro has increased the cost of living?	en_US
c761ee47-9171-4c23-a5b7-deaab86352cf	91d56b0c-114c-48c0-864c-2b22548f68ba	Pensez-vous que le passage à l'Euro a augmenté le coût de la vie ?	fr_FR
db0ebd9a-fd30-4eb5-bfe4-f72ddd3968a5	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	If you could get one superpower, what would it be?	en_US
1f03b112-78fd-427e-8208-8b58cd31046b	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Si vous pouviez obtenir un super-pouvoir, quel serait-il?	fr_FR
ceb09a30-12e3-4d98-809c-51c04b2d1fd2	b9efa02f-0969-4802-95c0-8d587d84a468	Do you think Trump is really crazy or, on the contrary, very intelligent?	en_US
621d73d4-1a91-418e-b76c-56d4d6bc931b	b9efa02f-0969-4802-95c0-8d587d84a468	Croyez-vous Trump réellement fou ou au contraire très intelligent ?	fr_FR
efe77797-4e2d-4e62-8bcd-0e871626705c	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	Do you think your life is bringing positive or negative to society?	en_US
e5996aae-91e0-4489-a3f8-4f5d6b448ed9	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	Pensez-vous que votre vie apporte du positif ou du négatif à la société?	fr_FR
983ac929-0aef-44f5-ab87-bd302264c2f9	3cb41358-d613-4e72-a9da-730ceb6dca91	Which world power is doing the best at the moment?	en_US
40adecd8-fc28-4992-9fad-f3fe31541649	3cb41358-d613-4e72-a9da-730ceb6dca91	Quelle puissance mondiale s'en sort le mieux en ce moment ?	fr_FR
de977ba7-592b-4136-ba69-6ff0fa4d0d42	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	Do you approve of medical experiments on animals?	en_US
7d6710fe-051d-48a1-b7da-a4fa381c0221	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	Approuvez-vous les expériences médicales sur les animaux ?	fr_FR
d6a7f833-2ebe-493b-a7f3-4fbd1c8d9761	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	Could you have sex with someone who has AIDS?	en_US
4bf825a3-c143-4470-a614-34e314f6f314	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	Pourriez-vous avoir une relation sexuelle avec une personne atteinte du sida?	fr_FR
d24d0e8d-e673-41ea-ab71-37e13b8a5f45	0448146e-fac5-4cef-b010-37e819542b89	Do you live primarily for yourself or for others?	en_US
ecb6b606-e2a4-4c1b-8d64-5f22c1c5b27e	0448146e-fac5-4cef-b010-37e819542b89	Vivez-vous principalement pour vous-même ou pour les autres?	fr_FR
a1d6f5b7-57f0-41ac-b20a-db68f9bc02fc	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	What makes you cry the most in movies?	en_US
a6880b31-ba1e-45b3-80f1-38a18646e2c3	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Qu'est-ce qui vous fait pleurer le plus dans les films?	fr_FR
b8f6fe14-a3cf-4d31-8b22-bdabe273b3f0	59be806c-5aa4-4eb5-a130-e74f06dc486b	Would you prefer a very good friend or a lot of buddies?	en_US
44cc467c-91cb-494d-9784-fde2b4a07ec5	59be806c-5aa4-4eb5-a130-e74f06dc486b	Préféreriez-vous un très bon ami ou beaucoup de copains?	fr_FR
5490e20e-7b5c-4b4c-a76d-ba1614a7e89b	368c76e7-957b-4495-a7a4-bfbb98eb3cca	Do you prefer to have sex in the dark or in the light?	en_US
bb162c70-2e0c-4afb-8572-4191e12a3c6c	368c76e7-957b-4495-a7a4-bfbb98eb3cca	Préférez-vous faire l'amour dans le noir ou dans la lumière?	fr_FR
964f5517-85ed-42f4-a5c9-bb21f21bf641	2f4b98ce-7dad-4843-b76a-130e62d8635d	Have you ever reported someone anonymously?	en_US
0b2f7adc-73d0-4a08-9a94-80ba233724d3	2f4b98ce-7dad-4843-b76a-130e62d8635d	Avez-vous déjà dénoncé quelqu'un anonymement ?	fr_FR
898ab332-1a5f-4b50-9b2e-dcaa01462a1d	dfa4ab04-3fd9-4439-a616-adfb76600112	What position do you fall asleep in?	en_US
9855f966-3835-4d86-a9ea-78b85799c8c5	dfa4ab04-3fd9-4439-a616-adfb76600112	Dans quelle position vous endormez-vous ?	fr_FR
0c80e4a5-914f-4e0d-ae05-ccc3cd818cd4	94673a27-2762-485e-bdba-62b21956622c	Are you sometimes afraid of other humans?	en_US
4e95cc4e-ea79-489d-90b8-55300adbc9f4	94673a27-2762-485e-bdba-62b21956622c	Avez-vous parfois peur des autres humains?	fr_FR
63ec4494-afc4-4cd4-9793-2f7c2872a2c1	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Have you ever left without paying?	en_US
2fd7dbfa-7af2-41ac-8ae7-081656697ca0	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Etes-vous déjà parti sans payer ?	fr_FR
fc6a75b7-6aff-43e8-b467-cf3be67f44c9	50ea9d2a-5293-4466-a807-77daba03dc47	What is your most precious possession?	en_US
d7918c77-cb41-484d-9c3b-95b56ebf4c20	50ea9d2a-5293-4466-a807-77daba03dc47	Quelle est votre bien le plus précieux?	fr_FR
c30a88d1-7f31-4e19-9739-f6f6514c18a1	15162537-f2c5-42df-981a-42e97fa6dfc2	In presidential elections, do you prioritize your country's interest or your interest?	en_US
018202be-48aa-440d-b00c-c3003e793158	15162537-f2c5-42df-981a-42e97fa6dfc2	Aux élections présidentielles, privilégiez-vous l'intérêt de votre pays ou votre intérêt ?	fr_FR
390a97fe-e5f0-40c7-a5a0-5f815d3a6e38	249cb45e-b334-45c0-9624-e354e685a7ce	how are you ?	en_US
f262f0d6-45d5-47a9-9eac-eebebccc4568	249cb45e-b334-45c0-9624-e354e685a7ce	ça va vous ?	fr_FR
b171a323-d575-4f56-9520-f122d633ac1c	237c95a3-f446-44d1-b4b2-5b2dcd678db1	Would you be able to wage war to defend your country?	en_US
4fcf4885-aaa0-4b12-8979-750d1abc0e11	237c95a3-f446-44d1-b4b2-5b2dcd678db1	Seriez-vous capable de faire la guerre pour défendre votre pays?	fr_FR
a703b6e4-ff19-4b37-97ab-0ed59e9fba82	68d7dea2-b7b1-4416-8c40-ce6260668110	Can a long distance relationship work?	en_US
30bcf4f9-7279-4180-bada-c0a061f8fb84	68d7dea2-b7b1-4416-8c40-ce6260668110	Est-ce qu'une relation à longue distance peut fonctionner?	fr_FR
03b0bf26-5414-4d6d-809d-a6e0c43a6f54	8da5755b-2a1d-41a0-b43c-c427c063748b	Do you cry while watching a movie or listening to a song?	en_US
a8023735-608d-40c5-8b2d-bf24d820e994	8da5755b-2a1d-41a0-b43c-c427c063748b	Pleurez-vous devant un film ou en écoutant une chanson ?	fr_FR
161d2dd0-f88f-4c1c-9893-c1f2cee915f8	0ce2cf9a-1de1-4018-860c-790a286728ed	Are you happy?	en_US
28610b20-6dc3-4d9e-b7d2-55719e12974f	0ce2cf9a-1de1-4018-860c-790a286728ed	Etes-vous heureux?	fr_FR
d6892221-115b-4c01-9edb-e61b715ac065	1edb1519-3ce7-4697-a27a-e495d69a02ca	At what age did you have your first sexual intercourse?	en_US
1b82f867-85ba-4e79-903e-d2247d181b5e	1edb1519-3ce7-4697-a27a-e495d69a02ca	A quel âge avez-vous eu votre premier rapport sexuel ?	fr_FR
2c9306a5-0af5-4ca4-ac89-5bade28e79f7	d4595adf-9bb6-4939-bd0d-6419c58698bc	What is the perfect size for a dog?	en_US
40b02bd0-9c24-4849-85f5-dd13691cb9d2	d4595adf-9bb6-4939-bd0d-6419c58698bc	Quelle est la taille parfaite pour un chien?	fr_FR
31392c33-8098-453b-8568-98e29ce6284b	d09941cf-67f9-420d-bd40-4ecd9f8b6896	How often do you go to the bathroom for the big commission?	en_US
6f2f8fcb-72a8-4c38-8d61-d7d3a5bbae8a	d09941cf-67f9-420d-bd40-4ecd9f8b6896	A quelle fréquence allez-vous aux toilettes pour le grosse commission?	fr_FR
e0abe2f9-b9f5-44a2-b468-47f9cb65efd8	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Have you ever had sex while inventing a scenario with your partner? 	en_US
fc21f406-6673-4a91-b586-9bee03e5b348	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Avez-vous déjà fait l'amour en inventant un scénario avec votre partenaire? 	fr_FR
ff1b1b82-647d-4093-bd91-2b1454b98d93	305ee8f2-4436-439b-b727-8d2bd0e2bc80	How many people have you had a love affair with before you found the right one?	en_US
39e96c28-40ba-4874-af31-16a4d115bc01	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Avec combien de personnes avez-vous vécu une histoire d'amour avant de trouver la bonne ?	fr_FR
a03d61b2-871d-495c-b49b-4deaaab54dd1	2667ba62-fc35-4793-8cc0-f94c02985460	How many days can you go without washing your hair?	en_US
eea888a6-5297-459b-b1a9-5704bc35f105	2667ba62-fc35-4793-8cc0-f94c02985460	Combien de jours pouvez-vous passer sans vous laver les cheveux ?	fr_FR
55906b9f-21a1-4ab3-9fc7-ba7cfc19c639	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Are you arguing with your partner?	en_US
d6c46403-e96a-442f-8667-f2430de61cf6	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Vous disputez-vous avec votre conjoint?	fr_FR
c85d75ac-1817-49d9-ad62-bd1b8af9dc2c	2e982a82-e9c1-497a-860a-fea6816c7220	Have you ever had premonitory dreams? 	en_US
59366eb6-1425-43f0-ab7f-6bb522be672e	2e982a82-e9c1-497a-860a-fea6816c7220	Vous est-il déjà arrivé de faire des rêves prémonitoires? 	fr_FR
65bf090e-f571-4b5a-9be7-cdd14737d882	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Do you wash your hands after going to the bathroom? 	en_US
ee804fa5-bdb2-4627-9d08-ebef9b32ade5	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Vous-lavez vous les mains après être passé aux toilettes? 	fr_FR
d92b6a69-7dcd-4b0e-88c6-05595cfa5b12	51802256-84a5-490f-bca8-62796ea49a68	How often do you watch porn?	en_US
89917c3b-e484-4ba8-85cc-9e4823c52df9	51802256-84a5-490f-bca8-62796ea49a68	A quelle fréquence regardez-vous du porno ?	fr_FR
fefe07cf-83c6-485e-9abc-4ef0aa9a768a	719f6e37-2b19-4771-b1fc-1ddf5a903329	Someone is offering you either $ 100 today or some extra cash a month from now. How much would be enough to keep you waiting?	en_US
3c876e43-6ca0-4934-8a40-f5c822ddb9ce	719f6e37-2b19-4771-b1fc-1ddf5a903329	Quelqu'un vous offre soit 100 $ aujourd'hui, soit de l' argent supplémentaire dans un mois à partir de maintenant. Quel montant suffirait à vous faire attendre?	fr_FR
cc37c8a3-0166-49f0-aaa4-2a9df3b9bc17	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Have you ever had an enema?	en_US
a3d2af83-0eb8-4e30-aae7-cbedf2000452	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Avez-vous déjà subi un lavement?	fr_FR
95c37779-5307-485d-9625-97e5008c07d6	4ad466de-c926-43b6-88c6-d2578d8fc4fc	For what amount would you agree to pose nude (e) in a magazine? 	en_US
2c4e3992-6599-44f2-b05d-f1ae97c1363e	4ad466de-c926-43b6-88c6-d2578d8fc4fc	Pour quel montant accepteriez-vous de poser nu(e) dans un magazine ? 	fr_FR
730dbb09-40d2-41f0-bf68-d8d546f278c5	8398637b-b892-4659-b018-9750954d46b1	Do you read or play in the bathroom?	en_US
c551f22a-97b4-4130-adaf-768741972cc0	8398637b-b892-4659-b018-9750954d46b1	Lisez-vous  ou jouez-vous aux toilettes ?	fr_FR
de5e215d-c942-4c9a-b03b-ed4e17de5ba7	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Have you ever evaded taxes? 	en_US
c96845d6-33f9-437c-8e2e-dfb795f1495d	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Avez-vous déjà fraudé les impôts? 	fr_FR
c37777f0-bb07-41f9-ab9a-0eb4f75e9f62	bb6e160f-f95c-4410-995d-577d29c98329	Have you ever had an STD?	en_US
4e74c2bf-6f48-46d9-9004-c0c7ceab4b9e	bb6e160f-f95c-4410-995d-577d29c98329	Avez-vous déjà eu une M.S.T?	fr_FR
95de0a7d-9a8d-4b14-98f5-2a7afd1ef436	edac60c8-d2f2-497d-8d82-c46f1368fe83	Have you ever cheated on exams?	en_US
03edb18e-7cf7-46a6-83e5-71bb39d6fd9e	edac60c8-d2f2-497d-8d82-c46f1368fe83	Avez-vous déjà triché lors d'examens?	fr_FR
89b0171e-e605-47c1-a939-358c9001a38b	122ac324-09f9-419a-9e4e-c96b56bf183a	When will commercial space travel become available?	en_US
a104cfeb-4691-4306-90a4-ded1642b5f97	122ac324-09f9-419a-9e4e-c96b56bf183a	Quand deviendront disponibles les voyages commerciaux dans l'espace?	fr_FR
df52d353-29b0-4c85-ad42-f9d9334cb6c3	c215ba8c-7f03-4623-8a29-1271ca7b0c79	What is the maximum age difference that you had with your spouse?	en_US
0e199b9f-b055-4369-8928-164f04e75fb5	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Quel est l'écart maximum d'âge que vous avez eu avec votre conjoint ?	fr_FR
6ffbd8e0-395e-4617-8f57-7d499acc76ca	ca21de48-a73d-4782-bb97-69324102a4c8	Do you sometimes defend a political opinion that you do not believe in out of opposition?	en_US
ba1ec76b-537e-4ce8-8f6c-1e2977592757	ca21de48-a73d-4782-bb97-69324102a4c8	Défendez-vous parfois une opinion politique à laquelle vous ne croyez pas par esprit d'opposition?	fr_FR
50cfa06f-a5d5-47c8-8de8-74b49f10f5c0	655200b4-a668-4070-acb5-6d9c2942db5e	Do you lack self-confidence?	en_US
7283e981-1643-4310-b3dd-04ef7053cbb6	655200b4-a668-4070-acb5-6d9c2942db5e	Manquez-vous de confiance en vous ?	fr_FR
3ac1a84d-bca0-4b03-8269-8525f5f514c8	5a965921-82fe-436d-bfcd-30bbb52ed79b	What is the maximum donation you have made?	en_US
70fc7863-38ff-40dc-9b57-c694826d5a70	5a965921-82fe-436d-bfcd-30bbb52ed79b	Quel est le don maximum que vous avez fait ?	fr_FR
557ec899-253f-40d0-9222-9e15c083a0c1	da0c024c-eee2-42a0-ba36-2e31cd731628	Is it difficult for you to say no?	en_US
5275cbcd-4cca-4bc6-a168-ccee0618f42a	da0c024c-eee2-42a0-ba36-2e31cd731628	Vous est il difficile de dire non ?	fr_FR
52221292-da57-4f4f-9348-b820de566673	4afea674-e0f3-4cc2-8024-5715b8a69434	Have you ever purposely peed next to the toilet? 	en_US
4b327e81-11f7-4aa4-849b-dbefcea7872a	4afea674-e0f3-4cc2-8024-5715b8a69434	Avez-vous déjà fait pipi exprès à côté des toilettes? 	fr_FR
e6864a6d-d410-42cc-ae66-f31b80662aae	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Do you know yourself well?	en_US
99ad0b06-3bee-40db-ba1e-903489348aff	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Vous connaissez-vous bien vous-même ?	fr_FR
b2e2f3cf-227a-4170-95c9-a9b7aca22fdf	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Have you ever loaned money to a friend? 	en_US
fc4e109b-0172-4dbb-a439-8bbfbf3fe4bf	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Avez-vous déjà prêté de l'argent à un ami? 	fr_FR
90fb9989-a73a-4d04-a483-3140eddc2769	b5911913-b139-4fdc-a8dc-d03750a50dde	What is the maximum amount you have inherited?	en_US
1ab788df-72de-4d30-a1d9-72369e1a57b6	b5911913-b139-4fdc-a8dc-d03750a50dde	Quel est le montant maximum dont vous avez hérité ?	fr_FR
e9c2dfa8-7b16-43ca-a0c6-4f3389f47668	dfcc5151-1112-49de-a315-6ad9a67bce7b	Have you ever had hemorrhoids?	en_US
c8a74e8b-dc39-4a85-93df-f802f2f24418	dfcc5151-1112-49de-a315-6ad9a67bce7b	Avez-vous déjà eu des hémorroïdes?	fr_FR
312b7763-5a86-41c9-9c33-3d449fdb0886	c7402c75-4217-4ec9-8306-fdb7c7e9523a	When was the first time you kissed with the tongue?	en_US
5d2a094f-7c78-4aa4-bc0c-6de0f1a2a3fa	c7402c75-4217-4ec9-8306-fdb7c7e9523a	Quand avez-vous embrassé la première fois avec la langue ?	fr_FR
69e20355-d5a4-4696-afe1-5009c080a16b	7e2e1772-b309-424a-bc6f-7ee8f23645f1	Have you ever deflowered someone?	en_US
58fcaa66-74cc-4c14-8018-764c5da5665c	7e2e1772-b309-424a-bc6f-7ee8f23645f1	Avez-vous déjà dépucelé quelqu'un?	fr_FR
616744a1-a923-49cc-9c94-a16d5623661b	140b724b-16a5-420d-8516-72722fb10576	What percentage of people wouldn't wish you your birthday if it wasn't written on your facebook?	en_US
9c520641-b3a9-4833-bec2-000fef8f379e	140b724b-16a5-420d-8516-72722fb10576	Quel pourcentage de gens ne vous souhterait pas votre anniversaire si ce n'était pas écrit sur votre facebook ?	fr_FR
52dc714f-1e33-4469-a5a4-53c017ee23f8	cda65b3a-0236-4317-b536-3242206a7a7e	Have you already booked a hotel room for a romantic date?	en_US
27b8626e-18d4-4f0d-9844-d367b9b8aa4d	cda65b3a-0236-4317-b536-3242206a7a7e	Avez-vous déjà réservé une chambre d'hôtel pour un rdv galant?	fr_FR
4e91b0ea-1930-414d-bb1f-f8b23246e681	2854b823-2730-429e-9d1a-264aa62a26aa	Do you buy scratch games?	en_US
c858b806-2ccc-4aee-a600-b2bb5fd5f18c	2854b823-2730-429e-9d1a-264aa62a26aa	Achetez-vous des jeux à gratter?	fr_FR
8ed5da7c-86b6-4ede-95fc-980fb60e3e71	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	Have you ever been attracted to someone of the same sex as yourself?	en_US
75c06b7a-2c9f-4af6-916c-b0bc0e840fc5	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	Avez-vous déjà été attiré par une personne du même sexe que vous ?	fr_FR
0c9dc053-6ef9-40e1-a72c-2c315fd0a84d	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Have you ever cheated on your partner?	en_US
c90a960e-38a5-4378-a585-39716e1d8ac0	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Avez-vous déjà trompé votre partenaire?	fr_FR
f71f8293-f089-458c-92c6-1103b08c422b	567c7e60-e599-4126-a07d-7bb809097a28	What is the maximum number of times you have had sex in a day?	en_US
e88b3157-be66-4ebd-b47b-ce2c5e0b0daf	567c7e60-e599-4126-a07d-7bb809097a28	Quel est le nombre maximum de fois que vous avez fait l'amour dans une journée ?	fr_FR
1dd21e0f-155b-44e4-9ad7-eecde3b6ca80	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Do you have nightmares?	en_US
c133009a-54fd-4e11-bf23-a8c629156f38	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Faites-vous des cauchemars?	fr_FR
1ea793b7-d0e7-4b69-9d46-c56311812974	402c7b8e-ff3b-4655-b542-2618c25e11b1	Have you ever had sex in front of witnesses? 	en_US
70ab97fc-1731-4cc3-ac48-bdf1d01c1a85	402c7b8e-ff3b-4655-b542-2618c25e11b1	Avez-vous déjà fait l'amour devant des témoins? 	fr_FR
44ac30f0-9a42-4d5c-88ad-8e5c96f45688	00ad0764-de3b-44d4-a292-5c14ec998950	Do you sometimes make a separate bed?	en_US
84f2a639-b927-4890-819d-4fc801d3729e	00ad0764-de3b-44d4-a292-5c14ec998950	Faites vous des fois lit à part ?	fr_FR
168027c6-71e6-4bce-9dfa-0b130c570b97	6e37deb6-881d-403a-9e8e-f553f0d2fe28	What is the maximum amount that you have lost at gambling in a day?	en_US
9cc99bd2-3817-45e9-8a9b-d194c5db97fc	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Quel est le montant maximum que vous avez perdu au jeu dans une journée ?	fr_FR
f8dd16a5-c89d-4438-b4aa-1567244e1cd0	0430cdf6-41b3-4855-881d-b50280bb21a7	Do you like to walk around naked at home?	en_US
a27a3cb5-5b74-4d1f-9bf3-6954648b4786	0430cdf6-41b3-4855-881d-b50280bb21a7	Aimez-vous vous promener nu(e) chez vous?	fr_FR
41b21eb3-a9ae-4f6f-9065-7fced2cc28b8	6a46bc77-4db4-44f7-908f-278c19ce5395	How often do you have extra-marital sex?	en_US
2fde8b45-1889-467b-b4e6-fd0833c4ccbd	6a46bc77-4db4-44f7-908f-278c19ce5395	A quelle fréquence avez-vous des relations sexuelles extra-conjugales?	fr_FR
52ed936a-812d-4228-b2f0-3e0431652aef	895ae354-7138-4797-bd0c-91f45dc927e0	Do you often look at the buttocks of the people around you?	en_US
eae4b0ae-0595-40ec-9188-025109e6cab1	895ae354-7138-4797-bd0c-91f45dc927e0	Regardez-vous souvent les fesses des gens qui vous entourent ?	fr_FR
342a4efe-c33e-4bab-a4c1-5b01f34cd493	b20f70d8-8103-4562-a31c-2620c9da4226	Have you ever had a nude photograph?	en_US
bc60285a-f3f4-4caa-950c-f661153b04ae	b20f70d8-8103-4562-a31c-2620c9da4226	Vous êtes vous déjà fait photographier nu-e ?	fr_FR
9d030968-1b9f-4763-8a28-b58d5a03ba0b	b822df53-4594-4f0d-941a-794786bb93ae	Do you sing in the shower?	en_US
d0f80c4d-45e0-4fb9-b949-1de2e441b193	b822df53-4594-4f0d-941a-794786bb93ae	Chantez-vous sous la douche?	fr_FR
7d2df882-763e-4d9b-b573-56374209fb12	8abe77b7-3d5e-4d2c-8d88-1c838223030b	How many true friends do you think you have?	en_US
834f1f9c-5d12-4a23-9042-0f6196abd849	8abe77b7-3d5e-4d2c-8d88-1c838223030b	Combien de véritables amis estimez-vous avoir ?	fr_FR
0ab80a2f-fc45-4b66-a0ca-d6b970842b1c	17864784-730c-423e-a290-d8fc76f75049	What is your general morning mood?	en_US
c46f133d-9109-4fc6-901b-d3c6b7380cb1	17864784-730c-423e-a290-d8fc76f75049	Quelle est votre humeur générale du matin ?	fr_FR
f9b67ab2-a041-4390-8e31-65e00f84d7f2	23b8fa1e-dd26-434f-b714-00c80284a124	How many times do you think about sex a day?	en_US
c650a280-9f4f-4591-b5c5-a9cf443dd311	23b8fa1e-dd26-434f-b714-00c80284a124	Combien de fois pensez-vous au sexe par jour ?	fr_FR
cd3b0a3a-19ff-47b6-b30b-59d731beea0f	2a0953da-fdd5-46ff-9b38-b30d95b1c447	How often do you wash your sheets?	en_US
7db9e974-9067-4684-9bfe-d337852e5b69	2a0953da-fdd5-46ff-9b38-b30d95b1c447	A quelle fréquence lavez-vous vos draps ?	fr_FR
2acafc37-ecf6-438b-aeb2-c58189dcd50f	ad615693-356c-41ca-874d-deb2e2536afc	How many times have you flirted with a stranger in your life?	en_US
1550f508-4fbc-4fa3-ae38-f4392c66195b	ad615693-356c-41ca-874d-deb2e2536afc	Combien de fois avez-vous flirté avec un(e) inconnu(e) dans votre vie ?	fr_FR
dfa990d0-8d97-455c-bf4f-e95818f8dc03	d572bcc1-bc14-4b7e-85ec-91862be987fb	Have you ever gone back to bed with an ex?	en_US
78ddc2d0-8583-492d-ad67-92b0c2f86570	d572bcc1-bc14-4b7e-85ec-91862be987fb	Avez-vous déjà recoucher avec un ou une ex ?	fr_FR
02a59ca6-1e52-4eac-9889-07b2c0e69d57	de810d24-1e70-45cc-9e77-ea92552a1bbb	Have the happiness of others ever made you angry? 	en_US
2f9abdb8-444c-41ee-bb1e-6bc15ee69273	de810d24-1e70-45cc-9e77-ea92552a1bbb	Le bonheur des autres vous a-t-il déjà enervé? 	fr_FR
5ae21392-ec6c-4732-b710-7111cf9b8911	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Do your friends' problems bother you?	en_US
1dfeea9b-12be-4d9c-87f8-3ef85e252596	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Est-ce que les problèmes de vos amis vous agacent ?	fr_FR
b6546ee9-6097-4dcc-94b3-0e7a340f1e20	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Do you sometimes cry for happiness?	en_US
ea80a7b4-7592-4fb5-8a09-fd0f6b487772	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Pleurez-vous des fois de bonheur ?	fr_FR
959e6ec4-2cb7-4cce-a5c2-649376f410df	997894ec-b392-4a31-82ad-6e0dd15dfea3	Have you ever been on television?	en_US
4b781bd5-41da-4062-acb4-bf45c388da3b	997894ec-b392-4a31-82ad-6e0dd15dfea3	Etes-vous déjà passé à la télévision?	fr_FR
eefacd4f-19e9-4f2c-bf64-e27b6be37411	d51bddd7-d291-4bc9-9737-d10705397a4c	Have you ever seen a psychic?	en_US
7254bd86-33d9-434b-b9ac-de283ee96eba	d51bddd7-d291-4bc9-9737-d10705397a4c	Avez-vous déjà consulté une voyante?	fr_FR
202d8e50-460f-4d77-8cc9-33679b8c0aa7	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Have you ever rejoiced in the misfortunes of others? 	en_US
e0f7244e-932f-4e5b-a956-ac9917578756	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Vous êtes-vous déjà réjoui des malheurs des autres? 	fr_FR
00148ad6-1268-4d3a-99aa-99feb642b75b	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Do you happen to not wear underwear? 	en_US
11816e32-7940-4d1a-808d-d8653d8e8f28	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Vous arrive t-il de ne pas porter de sous-vêtements? 	fr_FR
2bbd7c1b-7cd1-4c3d-9ab4-8b090b3d0d8f	8db347b3-463e-4385-8050-eb8ab1eecea2	If you were to estimate a dog's intelligence, you would say	en_US
1250ddb8-90d4-44eb-8e1d-c73628986be3	8db347b3-463e-4385-8050-eb8ab1eecea2	Si vous deviez estimer l'intelligence d'un chien, vous diriez	fr_FR
2ba8196b-ebfb-4782-9a84-e068e0905ad5	15b276d6-191f-4f11-8395-a33880c16c19	Have you ever done a lot of damage by clumsiness?	en_US
9c2fcb36-e878-4352-9690-d89dc4b3142c	15b276d6-191f-4f11-8395-a33880c16c19	Avez-vous déjà causé de gros dégâts par maladresse?	fr_FR
e1118337-f028-4426-82f7-93a7fad3b593	50c91d35-debe-4573-aa62-3a09634787db	Do you finish what you start?	en_US
384b7c93-2225-4e58-884c-978c75e6d534	50c91d35-debe-4573-aa62-3a09634787db	Finissez-vous ce que vous commencez ?	fr_FR
9fe4b4f9-892e-4bdb-8108-f6f8dab1045b	7f99b900-07fd-4acf-99e0-839abecb8e52	How often do you call your parents?	en_US
eca6d0c0-9f17-42e3-b8f6-4bec1a0d2b4f	7f99b900-07fd-4acf-99e0-839abecb8e52	A quelle fréquence appelez-vous vos parents ?	fr_FR
ec38e0a4-37f6-4228-96cf-101b7c3d7805	6e4ccbbd-761d-4db5-b644-c191e667a6ef	How often do you go to the temple or church?	en_US
be3b8ad6-3de6-4d5d-b265-5cc54f8100d1	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Combien de fois allez-vous au temple ou à l'église?	fr_FR
765be092-7862-4a27-b39c-fed1ae04fafa	7581432f-17ec-4a91-81f2-7a25f898fe11	Have you ever broken up because of a new meeting?	en_US
242d393e-5c17-480e-9c48-f683d575a9f6	7581432f-17ec-4a91-81f2-7a25f898fe11	Avez-vous déjà rompu à cause d'une nouvelle rencontre?	fr_FR
5904e4e9-c807-4291-b793-3a3e108553c2	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	How many friends did you have as a child?	en_US
ec8918d7-6ac3-4d2e-9ed3-244b043a01d4	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Combien d'amis aviez-vous dans votre enfance ?	fr_FR
ef0b9ad1-a44f-433c-ae56-045d2fae175d	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Do you feel alone in life?	en_US
5a57fca6-dbad-4d9b-ae68-c43aa3ef5f42	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Vous sentez-vous seul(e) dans la vie ?	fr_FR
9d6649a8-e0c7-4e76-ac23-17092896d8fb	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Are you lying?	en_US
a6d042ce-56eb-436d-a36e-5d8234f1be8f	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Mentez-vous?	fr_FR
6e296826-880f-4ac5-b4ef-96d1558fc541	761dde46-f86f-492b-9438-67f04e870b9e	Have you ever been to a sex shop?	en_US
44bfb553-3351-496c-91a0-6c2193ad8bf3	761dde46-f86f-492b-9438-67f04e870b9e	Etes-vous déjà allé dans un sexe shop?	fr_FR
28e3286d-f7e5-4518-84a0-a4f8404ad8d7	3e0ee6bc-913e-4a2b-8de4-830412ad0795	How many hours do you watch television per day?	en_US
18c18f28-8276-420b-9357-0ebefc14a810	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Combien d'heures regardez-vous la télévision par jour ?	fr_FR
eea31088-bbe8-4d0c-a1dd-8b7208c8f7b1	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	How much would you convince to sleep with anyone?	en_US
006e2c0d-0522-4611-8f5e-79a91aff4e14	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	Quel montant vous convaincrait de coucher avec n'importe qui ?	fr_FR
1214f5d6-add4-48dd-9b99-f65c7aea299a	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	How many times a week do you have sex?	en_US
68ec9717-ac7f-431e-9b88-ef2eabd45237	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Combien de fois par semaine faites-vous l'amour?	fr_FR
60cca6c7-d432-41e6-accb-9d96b47fe1f0	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Do you think that science will be able to stop the aging of man? 	en_US
19e04382-f5d5-4fd3-a814-bf3526ef96b5	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Pensez-vous que la science sera en capacité de stopper le vieillissement de l'homme ? 	fr_FR
e304c7f4-b550-4bd3-9fd6-229ca87a6e9f	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Have you ever slept with someone you didn't really like? 	en_US
2a0ac049-4111-478c-a5e6-1e305a5dc582	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Avez-vous déjà couché  avec quelqu'un qui ne vous plaisait pas vraiment? 	fr_FR
1dcf2b83-75da-400c-bf7e-01eefedbe186	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Have you ever slept on the first night?	en_US
af31d265-90af-4984-9b5d-3ee8c4cd2be7	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Avez-vous déjà couché le premier soir?	fr_FR
e358d20f-5100-4ac8-adbc-ff549522c557	64f798f6-bec0-4331-912c-49b505ca78fe	How many sexual partners have you had in your life?	en_US
42fd627a-a9fc-4bac-8c22-88f7effb3b56	64f798f6-bec0-4331-912c-49b505ca78fe	Combien de partenaires sexuels avez-vous eu dans votre vie ?	fr_FR
36606e44-b378-4290-9ba8-116a5cc2db21	ccfd600a-c461-4b5a-80fe-12db84877546	Have you ever said "I love you" without really thinking it?	en_US
f7ae8fc7-c76f-4771-abdc-0d9d5f095968	ccfd600a-c461-4b5a-80fe-12db84877546	Avez-vous déjà dit "je t'aime" sans vraiment le penser?	fr_FR
92e01b44-a298-46d4-9832-634947527a53	b8b40a89-dff0-483d-8e47-40a11afff475	How often do you wash? 	en_US
9ee4efe8-b331-4258-b3cd-c6776c2e027c	b8b40a89-dff0-483d-8e47-40a11afff475	A quelle fréquence vous lavez-vous? 	fr_FR
b394ba6f-3c19-4f8f-8bf6-d96d5ea90041	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	How many hours do you use your smartphone per day?	en_US
0069ce55-e05a-4668-a3c4-1c80f1271f66	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Combien d'heures utilisez-vous votre smartphone par jour ?	fr_FR
63a6c2c2-85ac-4c6c-adaf-7b5fccfeeea1	5bf309eb-632c-4c84-b1d7-31b558630477	Have you ever seriously wished someone had died?	en_US
ef53fce7-b655-4eec-afde-1f61520fb77c	5bf309eb-632c-4c84-b1d7-31b558630477	Avez-vous déjà sérieusement souhaité la mort de quelqu'un?	fr_FR
97cb6133-0665-4035-8f40-3ca45c2a965d	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Have you ever felt really ashamed of yourself after a night out?	en_US
3cea1336-ea20-40c9-b746-d12178c946f0	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Avez-vous déjà eu réellement honte de vous après une soirée?	fr_FR
\.


--
-- Data for Name: QuestionGroup; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."QuestionGroup" (id, type, "createdAt", "isModerated", "moderatedAt", pinned, enabled, "authorId") FROM stdin;
b24781f7-d736-4abf-8faa-7d33b59e8a10	1	2025-05-22 18:41:57.94	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bc608ac8-bb77-4b23-ab46-159904eb81ae	1	2025-05-22 18:41:57.946	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0b145c11-7769-4478-b41b-46cb17c41515	1	2025-05-22 18:41:57.949	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	1	2025-05-22 18:41:57.953	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	1	2025-05-22 18:41:57.956	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2f13abc0-d927-46e7-9aeb-d7acb79d42bb	1	2025-05-22 18:41:57.96	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cb526383-921f-4360-bbca-c73e8b3e3033	1	2025-05-22 18:41:57.965	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6c33684b-038b-4753-8978-04001c98b8d5	1	2025-05-22 18:41:57.968	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	1	2025-05-22 18:41:57.971	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
32c52d73-9868-473c-b0d2-ee7d526c8a81	1	2025-05-22 18:41:57.976	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	1	2025-05-22 18:41:57.981	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
06a7e629-237c-455a-a361-ec6203ea9234	1	2025-05-22 18:41:57.984	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e260af83-cf26-4fdd-b057-880d554eebde	1	2025-05-22 18:41:57.988	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b49f8a1d-4509-4b6c-884f-9a65cac45dcb	1	2025-05-22 18:41:57.992	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
722b8cdb-281a-4797-ab32-32d089dae310	1	2025-05-22 18:41:57.996	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
09847df2-36f8-4b53-99af-48974fb53dcf	1	2025-05-22 18:41:58	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	1	2025-05-22 18:41:58.004	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	1	2025-05-22 18:41:58.007	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
15752b7a-b58c-4e8c-a95e-1776b1abd57c	1	2025-05-22 18:41:58.01	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f66fd69e-fbeb-443b-a021-c298e513a6f8	1	2025-05-22 18:41:58.014	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2480c44e-c2bf-434b-a447-8217584b25c3	1	2025-05-22 18:41:58.017	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
05e41b42-81d8-473f-a63e-7326ff72ed9f	1	2025-05-22 18:41:58.02	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4aabf8df-2528-455f-ab2e-d0896dcd8687	1	2025-05-22 18:41:58.023	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4adf2538-72ec-40a1-8ac2-aa0522918bce	1	2025-05-22 18:41:58.027	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ee6d9a0a-ef03-4b19-862e-1bc8544acc40	1	2025-05-22 18:41:58.03	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
17710c4a-ceea-4f99-8e8a-9ea7be68df69	1	2025-05-22 18:41:58.033	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
061834a0-1650-41a8-a8c6-4f4c8cb6831f	1	2025-05-22 18:41:58.037	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7e1633f0-2688-488f-b8e2-9672b31ea37e	1	2025-05-22 18:41:58.04	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
97553132-efe4-436a-8463-55773a02c6ae	1	2025-05-22 18:41:58.043	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2897e9c9-ea5d-4328-9730-3eaf6d8cc862	1	2025-05-22 18:41:58.046	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5442e950-bbfb-4c60-a047-3a21057e2a13	1	2025-05-22 18:41:58.049	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a2057581-a0ce-49ca-b4a2-95fe17562b65	1	2025-05-22 18:41:58.052	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	1	2025-05-22 18:41:58.056	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d1716ea4-7264-434a-9a81-2c7229d41454	1	2025-05-22 18:41:58.059	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0241015c-e821-43e3-a1b0-2aa3456107b9	1	2025-05-22 18:41:58.062	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
96d029af-3e8e-4dc3-aa24-2ab49e6efc66	1	2025-05-22 18:41:58.066	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
44beeb67-10c4-4088-8c01-03f44cbae9f9	1	2025-05-22 18:41:58.069	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
de3b04ee-9038-47f2-9d7b-68823d41cbac	1	2025-05-22 18:41:58.073	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
855cae49-e0d6-4ae8-8c69-3af1ba09d294	1	2025-05-22 18:41:58.076	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
291601c1-9b3c-49a2-a78c-e46e9137b001	1	2025-05-22 18:41:58.08	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
af5a66e5-bf31-4262-8976-89cd8ea4eb56	1	2025-05-22 18:41:58.083	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
100d8668-342b-4430-9652-7ac4a042684a	1	2025-05-22 18:41:58.086	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c9ab248e-c179-4fbb-ba58-b7efe09847ab	1	2025-05-22 18:41:58.089	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
77c41e5c-949f-4bc2-8104-dc16bd16fc07	1	2025-05-22 18:41:58.092	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c3faadfe-b096-448d-a704-868d3d6fbadf	1	2025-05-22 18:41:58.095	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f34c7766-37cb-455d-b19f-28b34aac51e7	1	2025-05-22 18:41:58.098	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
87cd330c-29f0-43d6-a30a-18859f64d7c7	1	2025-05-22 18:41:58.102	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4eadaeb2-c165-4488-b119-97ddc5aa51c5	1	2025-05-22 18:41:58.106	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d6253326-0b34-40d6-8125-d3a1b8cfabaa	1	2025-05-22 18:41:58.109	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7a9ca40a-914c-47fa-92dc-f74889a99208	1	2025-05-22 18:41:58.112	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
38f58c1f-0ca6-40b6-bba6-7c444e842921	1	2025-05-22 18:41:58.115	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0d7f4f2a-3424-4789-b732-a0b32286815d	1	2025-05-22 18:41:58.118	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
36a8daa4-7741-40e2-86aa-be5eb874e275	1	2025-05-22 18:41:58.121	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5ba28665-5140-4503-8b0f-e4f91937f423	1	2025-05-22 18:41:58.125	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	1	2025-05-22 18:41:58.128	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f32eac61-aa16-4095-94e0-9c786b8c70de	1	2025-05-22 18:41:58.131	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
dae0875e-7812-483f-8760-b98ab8bde6cc	1	2025-05-22 18:41:58.134	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
faadcff3-7957-4c4e-8620-50a24b37c862	1	2025-05-22 18:41:58.138	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f4d8008c-0888-400d-a388-87c0299d6e0e	1	2025-05-22 18:41:58.141	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cfc5ac21-333d-4f60-93cd-542a39a65749	1	2025-05-22 18:41:58.144	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	1	2025-05-22 18:41:58.147	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
54da03ba-5802-4292-a21d-8ca3c4a9492b	1	2025-05-22 18:41:58.15	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3ea2d4f9-571d-48db-8919-2752c85b57c8	1	2025-05-22 18:41:58.153	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3a6ef475-6eca-4a0e-a558-4c7e0363d53c	1	2025-05-22 18:41:58.156	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c704b3be-98bc-4c14-998d-11df3b1bc815	1	2025-05-22 18:41:58.159	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7fdf9127-88d1-42cd-a7f1-e41f8453f4de	1	2025-05-22 18:41:58.163	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3435a490-9687-4edf-962e-b7954022582f	1	2025-05-22 18:41:58.166	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
730e74c7-6338-49f7-8f0d-4cacb3467703	1	2025-05-22 18:41:58.169	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
facf297a-ab60-430b-b605-ad6ce6d6babf	1	2025-05-22 18:41:58.172	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f0991fcd-ba86-43ed-bb8d-30ee6f813530	1	2025-05-22 18:41:58.175	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
be520403-d204-4be1-9bb9-9a3e1356d4c3	1	2025-05-22 18:41:58.179	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
98398a41-fecc-4fa6-9697-89911e0e4644	1	2025-05-22 18:41:58.182	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	1	2025-05-22 18:41:58.185	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3e1936f9-a4d4-4026-adaf-16f845619eab	1	2025-05-22 18:41:58.188	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f36c221b-eed4-4623-a91f-7f72a446e781	1	2025-05-22 18:41:58.191	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9500303b-48bd-40e9-ae19-c0dcd79e0811	1	2025-05-22 18:41:58.195	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
eb363c21-ad10-43d8-a05f-1c725b5e9737	1	2025-05-22 18:41:58.198	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d29aa121-4e91-4123-bb89-809c951fe928	1	2025-05-22 18:41:58.202	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	1	2025-05-22 18:41:58.205	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b5e1b839-cca3-4fc0-b21e-d954c709d1f4	1	2025-05-22 18:41:58.208	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
aaeb0306-d159-4510-baf8-905a12c13971	1	2025-05-22 18:41:58.212	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
31c0a592-e03e-470b-8acf-d9dd0fbc92ac	1	2025-05-22 18:41:58.215	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	1	2025-05-22 18:41:58.218	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3507b7c1-b87d-4572-95ff-0c7345d8d5e9	1	2025-05-22 18:41:58.221	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
149697d1-db36-4403-97a9-41e4d1fd917b	1	2025-05-22 18:41:58.224	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
aabd15ee-f0c2-4722-9904-58e9daeb4cf2	1	2025-05-22 18:41:58.227	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3d221b83-94d7-4992-a6fd-d15f7b201dd1	1	2025-05-22 18:41:58.23	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c5caa3e2-9489-4389-9e4b-07a5a1503dd7	1	2025-05-22 18:41:58.233	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
19d491a3-88f7-4b55-a615-1538bd85e488	1	2025-05-22 18:41:58.237	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ba5baebe-ab16-4d31-8530-edee9ba059f6	1	2025-05-22 18:41:58.24	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ed9fb2cf-0438-4d86-b415-2dac1111fcb5	1	2025-05-22 18:41:58.243	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b7b05f57-085c-4e59-98ff-5b7be5b188e8	1	2025-05-22 18:41:58.246	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8113da5b-1635-4fa4-be4d-92387cb97b94	1	2025-05-22 18:41:58.249	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0a02d438-398f-43d9-84dd-dfca9147e058	1	2025-05-22 18:41:58.252	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a6faf59d-3e12-41e0-8284-3cd716c55079	1	2025-05-22 18:41:58.255	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
be2b14ea-489e-490a-8398-79716b05cfda	1	2025-05-22 18:41:58.259	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
74927512-e8a6-48b3-9277-8a9208195cad	1	2025-05-22 18:41:58.262	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
93639a21-9dc5-42e7-abeb-ac0d0b5b4107	1	2025-05-22 18:41:58.265	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f072f18e-5645-48ad-bce9-2ed57ebeb1de	1	2025-05-22 18:41:58.269	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
733c585b-631f-4dfb-a3a5-aec524d5a4e0	1	2025-05-22 18:41:58.272	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
dc459bb7-9061-498b-b81d-744a44c3ba80	1	2025-05-22 18:41:58.276	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
88a25016-8c96-4e35-9aa5-91cea5a956a7	1	2025-05-22 18:41:58.279	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b0f828e0-6620-4249-b6f7-8523f1dc91c8	1	2025-05-22 18:41:58.283	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	1	2025-05-22 18:41:58.286	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	1	2025-05-22 18:41:58.289	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
877d43c0-ae02-4b6e-b348-ad3494b0a2a0	1	2025-05-22 18:41:58.292	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0d46ab9b-8fb1-474d-8a77-566422449236	1	2025-05-22 18:41:58.294	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	1	2025-05-22 18:41:58.297	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	1	2025-05-22 18:41:58.3	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d6a288b7-0c0e-40d7-9d16-5a35490c961e	1	2025-05-22 18:41:58.304	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
07817ed1-248b-48c5-8a3f-8bab1d363f2b	1	2025-05-22 18:41:58.307	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5d9f9e71-0476-40d3-844f-6f3ceee1488d	1	2025-05-22 18:41:58.31	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
89996d94-15b6-4ab0-bef1-05bd7877f9c0	1	2025-05-22 18:41:58.313	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1597c559-8579-435c-b0f2-fb8c5ce40917	1	2025-05-22 18:41:58.316	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ef344e03-8c7c-4fc9-9535-83bd8978d346	1	2025-05-22 18:41:58.32	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d9763a18-a497-4720-9deb-82a84e1f14ad	1	2025-05-22 18:41:58.323	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5d7d94fd-acd6-4433-b5e3-14599f51cc1f	1	2025-05-22 18:41:58.326	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cab31e27-336c-46d8-b1cb-e742d273ebe6	1	2025-05-22 18:41:58.329	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
988e0abb-3547-40b9-a776-2173f8c07676	1	2025-05-22 18:41:58.333	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a316639f-bd7a-4377-970a-a302d2e821fd	1	2025-05-22 18:41:58.336	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
286e0137-37b7-4333-9425-e22f09f6b12f	1	2025-05-22 18:41:58.339	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	1	2025-05-22 18:41:58.342	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6f41cc91-25c3-4e8d-afca-98c15aa707ef	1	2025-05-22 18:41:58.345	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
25e8843b-7c61-4083-be6b-1d588cc16cd7	1	2025-05-22 18:41:58.349	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
15a4b211-7234-414e-a0cc-d38e2d52608a	1	2025-05-22 18:41:58.352	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4abff3d2-6104-4116-b515-77416e81dc12	1	2025-05-22 18:41:58.356	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d64d2979-98ba-48a7-8534-c60877e5b965	1	2025-05-22 18:41:58.36	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
af62a94b-d5d3-445d-bde2-f2e0c4af0a41	1	2025-05-22 18:41:58.363	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
58d57815-902b-471f-bb08-3f4ca052015c	1	2025-05-22 18:41:58.367	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a2d09cc6-babd-4e8a-98dc-a0148d8b7384	1	2025-05-22 18:41:58.37	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6c19256b-78e2-428e-a12e-414f1e41bbff	1	2025-05-22 18:41:58.373	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
40c6c153-e108-4087-992d-40393c5c8d0f	1	2025-05-22 18:41:58.376	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
271e9d82-2f38-41a5-bc6f-4a79d172fe51	1	2025-05-22 18:41:58.379	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	1	2025-05-22 18:41:58.382	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	1	2025-05-22 18:41:58.386	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e8655fe7-56a8-4e21-a664-4ae0be515c44	1	2025-05-22 18:41:58.389	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9d9e6425-934d-4566-8430-4f7b9e86b26b	1	2025-05-22 18:41:58.392	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a7d730e1-30f5-40df-b95b-cb972ecdd573	1	2025-05-22 18:41:58.395	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	1	2025-05-22 18:41:58.398	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
64e790c9-1224-4ef9-9b4c-34c8740d8f24	1	2025-05-22 18:41:58.401	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cc8b6725-f8d7-4522-b70d-2e201057639c	1	2025-05-22 18:41:58.404	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
65d6e242-98a5-42c1-8a1f-e76e5865bb4b	1	2025-05-22 18:41:58.408	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
22cedfd9-1375-4d92-b023-b2a49c6c2b57	1	2025-05-22 18:41:58.411	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4099456e-5461-4401-b552-34f8e891ba35	1	2025-05-22 18:41:58.414	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a2ef7497-bbdd-4be7-83c7-319c2cbc212f	1	2025-05-22 18:41:58.418	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
12ac45a4-8e5e-482c-bd1c-ba87168f1098	1	2025-05-22 18:41:58.421	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	1	2025-05-22 18:41:58.424	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	1	2025-05-22 18:41:58.428	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	1	2025-05-22 18:41:58.43	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	1	2025-05-22 18:41:58.433	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	1	2025-05-22 18:41:58.436	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
405ba252-6b60-4426-a300-25e7932c2593	1	2025-05-22 18:41:58.44	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6d4e69d7-156c-4855-81ea-263a87482c03	1	2025-05-22 18:41:58.443	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1a53ad26-5577-473f-8787-68ddd30a49f0	1	2025-05-22 18:41:58.447	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f6cb71fd-f034-4b41-a3f3-2f558010179d	1	2025-05-22 18:41:58.45	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a94c6508-4a23-4ff8-9872-8a1d84efd8ab	1	2025-05-22 18:41:58.453	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
612bac3b-7df4-472a-a80c-1de549a6b1ed	1	2025-05-22 18:41:58.456	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	1	2025-05-22 18:41:58.459	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
937a6b97-95a4-4ebf-8e31-f4c41a5f0820	1	2025-05-22 18:41:58.464	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4dea9bdb-0836-4049-9766-2a271c332335	1	2025-05-22 18:41:58.468	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b2094136-6558-4074-8907-95a6708d1146	1	2025-05-22 18:41:58.471	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5b282628-fa35-43c5-b5ee-a294b6ed8226	1	2025-05-22 18:41:58.475	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	1	2025-05-22 18:41:58.478	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e98227be-0c5f-4900-8f3a-2633b0dbbab0	1	2025-05-22 18:41:58.482	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ed4e1a3d-786e-49bb-b942-1da35e5a04d9	1	2025-05-22 18:41:58.486	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a6139b80-36a4-4775-9da5-c06466f1e361	1	2025-05-22 18:41:58.49	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0852f89d-0df9-4559-b4d8-9074cf67a335	1	2025-05-22 18:41:58.494	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
63351453-5507-4199-915a-1220b13c7266	1	2025-05-22 18:41:58.497	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4e7476bb-6dde-4725-8a96-5454520df090	1	2025-05-22 18:41:58.5	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bf819156-9d00-464b-8a94-e08428443caf	1	2025-05-22 18:41:58.507	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	1	2025-05-22 18:41:58.511	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b988bbb3-0bc4-437d-aab1-226248393a02	1	2025-05-22 18:41:58.514	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
55f65763-815d-451e-94ca-3f1646372f57	1	2025-05-22 18:41:58.517	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
83aac205-8aac-48b8-9178-bc28632d3592	1	2025-05-22 18:41:58.521	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cd491b5c-c7a3-40ad-b390-b41481813ed6	1	2025-05-22 18:41:58.525	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5300578b-0199-4e73-9c76-db08f0883fb2	1	2025-05-22 18:41:58.528	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
81416478-48b4-45a1-9766-6030759e901a	1	2025-05-22 18:41:58.531	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d63fec99-6944-46fc-97ed-08f1d44e09f0	1	2025-05-22 18:41:58.534	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1c998d37-ffb5-4e93-b809-ef71f6b648a8	1	2025-05-22 18:41:58.537	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1682619d-39ab-446f-973f-ae2c1b7820da	1	2025-05-22 18:41:58.54	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
30800c33-f9aa-4712-9986-2b253c36b188	1	2025-05-22 18:41:58.544	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cf90b94e-e441-4f93-83f1-566752861202	1	2025-05-22 18:41:58.547	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	1	2025-05-22 18:41:58.55	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
12acd57b-5e92-403e-9f07-cc85ca0b8fbb	1	2025-05-22 18:41:58.554	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	1	2025-05-22 18:41:58.557	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e8d5aac5-30a9-427c-8da3-9f0b140970e6	1	2025-05-22 18:41:58.56	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	1	2025-05-22 18:41:58.563	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
329b38ef-63bf-41e2-a266-5dd6a4b36f79	1	2025-05-22 18:41:58.567	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f376fba5-54e1-4f21-99d6-0e41bc000588	1	2025-05-22 18:41:58.571	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
41bf1e07-3e24-40a4-98e9-45b3e4538cce	1	2025-05-22 18:41:58.574	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0d9a0a12-85a6-40d5-8335-df90740abcf7	1	2025-05-22 18:41:58.577	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4492fc47-f2b9-41c4-a680-e05ca735ce9e	1	2025-05-22 18:41:58.581	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3a952e5b-a9f2-45f6-90de-3407e6be0f9d	1	2025-05-22 18:41:58.584	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
80afdbde-8ccd-4068-b552-a828341ebe67	1	2025-05-22 18:41:58.587	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	1	2025-05-22 18:41:58.59	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
79a82f80-fb7d-4211-bb73-4a2ef554204f	1	2025-05-22 18:41:58.594	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
24e4aa16-924f-4d83-8f64-c0f36bf1489c	1	2025-05-22 18:41:58.598	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	1	2025-05-22 18:41:58.601	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6bf76683-2c9c-45df-a3f4-213f869dc9ab	1	2025-05-22 18:41:58.605	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
484a7e91-2ffe-44ce-8635-d6576739734f	1	2025-05-22 18:41:58.609	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f0b1b23e-a127-467a-bbda-51d34380069c	1	2025-05-22 18:41:58.612	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
01199d58-fbd7-4046-a875-b15712c14331	1	2025-05-22 18:41:58.616	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4524ee1f-9f7a-465b-acf3-467f5161059c	1	2025-05-22 18:41:58.619	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	1	2025-05-22 18:41:58.622	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d0059349-79ed-4c98-ba00-6135c431c2c2	1	2025-05-22 18:41:58.626	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4b549b5d-0864-4add-8ed5-91c54e67bae2	1	2025-05-22 18:41:58.629	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1c69cd87-b362-4f5d-befe-06706be21c3f	1	2025-05-22 18:41:58.633	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d1e0da35-7fe8-44c8-b358-c6a300e39cf4	1	2025-05-22 18:41:58.637	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	1	2025-05-22 18:41:58.64	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
30e98b58-25c9-47cf-81fb-2d00a64eb9fc	1	2025-05-22 18:41:58.644	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
59f8d229-bb8b-4ba6-925b-0f9d056b2b39	1	2025-05-22 18:41:58.647	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a71fb52d-a04b-44e9-97f1-a92437b8495a	1	2025-05-22 18:41:58.652	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6524e347-2474-453a-9dc1-c1fa6daf6129	1	2025-05-22 18:41:58.655	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9aa16063-a8b3-4efe-801e-433f3a3c4a61	1	2025-05-22 18:41:58.658	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ff5f90f7-9cf7-487a-a839-a119698dd932	1	2025-05-22 18:41:58.661	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	1	2025-05-22 18:41:58.664	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
adc0bf61-9e77-4226-8a5b-765a04e035aa	1	2025-05-22 18:41:58.667	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
12c9e81b-3b09-4ce4-8608-fa1e5c281168	1	2025-05-22 18:41:58.671	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3a991bbc-3caa-4a2e-b86b-ea3a72840351	1	2025-05-22 18:41:58.674	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	1	2025-05-22 18:41:58.677	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
413a283c-4022-4f90-a742-b3c4098e9633	1	2025-05-22 18:41:58.681	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
97a944ab-acf6-4a2f-8787-a6cc9520ec0f	1	2025-05-22 18:41:58.684	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c91657e2-fdc2-4d61-a35f-db641b348955	1	2025-05-22 18:41:58.687	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
572e63a5-9858-4b31-a50f-2b3b97223bb2	1	2025-05-22 18:41:58.69	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	1	2025-05-22 18:41:58.693	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
42da9e30-776a-492c-b355-c8b79aa6fc7d	1	2025-05-22 18:41:58.697	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
767b2153-1ddf-43b5-8ba3-c163e0d59aaa	1	2025-05-22 18:41:58.701	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b8da26d2-712b-4c26-a3eb-a58432690bc9	1	2025-05-22 18:41:58.705	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
da0352aa-205a-46a2-88f2-44337e07d82f	1	2025-05-22 18:41:58.708	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
960f0bc5-3ffb-47b4-9cb1-32145d0503f1	1	2025-05-22 18:41:58.711	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8b4e4268-8871-433e-aeda-871ea6168258	1	2025-05-22 18:41:58.715	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
467e8afc-4292-4d4a-b970-1c3b04452e10	1	2025-05-22 18:41:58.718	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f7df86fc-6889-4034-8554-89a2c7b7b0dc	1	2025-05-22 18:41:58.722	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bfc27d3d-28c1-4800-9a19-4083ec767ff7	1	2025-05-22 18:41:58.725	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b73af29b-32b0-40e1-867a-765276acc40f	1	2025-05-22 18:41:58.728	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	1	2025-05-22 18:41:58.731	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
df302924-708c-4861-a238-ddd950574c27	1	2025-05-22 18:41:58.735	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d291332c-68d5-4a91-9b96-cb8c9a9ac930	1	2025-05-22 18:41:58.738	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c1242167-5aae-435c-9196-58298b3d9261	1	2025-05-22 18:41:58.743	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	1	2025-05-22 18:41:58.747	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b156696e-49af-4582-8e63-a41a46840bd7	1	2025-05-22 18:41:58.75	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5097e0ff-e224-4060-9051-cb9fdd9e99d4	1	2025-05-22 18:41:58.753	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4f64a379-9677-4b09-a4b4-3007f5403879	1	2025-05-22 18:41:58.756	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2113e0af-27a5-4be6-a356-d11f82c2aeaa	1	2025-05-22 18:41:58.76	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	1	2025-05-22 18:41:58.763	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a0e42c6c-02ab-4ea0-90e4-43523da39b03	1	2025-05-22 18:41:58.766	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4c903a88-55b7-4f68-9cd8-06d374a8baf0	1	2025-05-22 18:41:58.769	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e0d4cf71-7f3c-4846-baec-90a3bb95d23b	1	2025-05-22 18:41:58.772	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cad0e400-d7fe-4a60-b939-0ca272f578ce	1	2025-05-22 18:41:58.776	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
afc46845-19fa-4036-bc1f-3b1036104372	1	2025-05-22 18:41:58.779	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6cf88651-6c1c-4c77-8d5d-5333b5a8e448	1	2025-05-22 18:41:58.782	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
dcb3ebca-90bf-4e10-8977-54231b8ebef5	1	2025-05-22 18:41:58.786	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9d2245bc-d4c8-4e61-959f-d28105a788d9	1	2025-05-22 18:41:58.789	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
21c1796c-73e8-4f7a-a551-ec684b835a5f	1	2025-05-22 18:41:58.793	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c497cb6d-c64c-47bc-bccf-4c7c8457a92d	1	2025-05-22 18:41:58.795	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
912c3636-3a5a-4877-bae4-05e9f3028fd5	1	2025-05-22 18:41:58.799	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6c7fced7-c9d3-4a18-88cc-577d9a59b283	1	2025-05-22 18:41:58.802	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
484abcbf-dbd3-4c73-9ddf-3d31102d9564	1	2025-05-22 18:41:58.806	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e3844bbc-243d-4225-a3a0-dedb1f1f285e	1	2025-05-22 18:41:58.81	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	1	2025-05-22 18:41:58.813	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ffb69ca7-69f9-4694-b983-320fa63de509	1	2025-05-22 18:41:58.816	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1afd8c5e-977f-4597-8368-b658f59aa7fc	1	2025-05-22 18:41:58.819	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0ba134ba-6857-4ade-8b13-2b1df78701b8	1	2025-05-22 18:41:58.823	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
751ebb83-a155-443e-9d95-eaadf6183b57	1	2025-05-22 18:41:58.826	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9e3c8df2-f33e-4c86-90a0-3e04554cee14	1	2025-05-22 18:41:58.83	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7a2461a2-be29-4e95-9128-4f1d587ef9f9	1	2025-05-22 18:41:58.833	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4d461bdd-6555-4e75-b92d-7007787a206c	1	2025-05-22 18:41:58.837	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b5332f27-d03f-46ad-9860-7f33d7109466	1	2025-05-22 18:41:58.84	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8b5228d0-9411-4aba-a14c-8dfda45f20d0	1	2025-05-22 18:41:58.844	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3781e005-35d0-4802-8a02-b5b93a26be7d	1	2025-05-22 18:41:58.847	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	1	2025-05-22 18:41:58.85	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e3184a76-0833-49d4-95b1-c3ae863be78b	1	2025-05-22 18:41:58.853	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5db47450-6c6b-4f83-964a-fbd370cb7465	1	2025-05-22 18:41:58.857	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5a55df28-edeb-45ae-b336-043a57f6f5b8	1	2025-05-22 18:41:58.86	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	1	2025-05-22 18:41:58.863	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	1	2025-05-22 18:41:58.866	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cd3b1212-52b0-46fe-8243-db2ee3b8c81b	1	2025-05-22 18:41:58.87	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f577157e-75a5-425e-b537-99cbf885c979	1	2025-05-22 18:41:58.873	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
15724682-b932-4bf4-a734-87215b84955f	1	2025-05-22 18:41:58.876	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bf4c517f-21a3-4ca3-96d4-2002965e42ed	1	2025-05-22 18:41:58.879	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	1	2025-05-22 18:41:58.882	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
17279c41-09b0-49be-87ec-05bf0d5da921	1	2025-05-22 18:41:58.885	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7883db29-dc81-4e6d-9dd1-e7847014c54a	1	2025-05-22 18:41:58.889	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
84a2e439-b945-4c8d-859c-7836589d8618	1	2025-05-22 18:41:58.891	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
443e2674-e2dd-4a99-a627-582b1a178dc0	1	2025-05-22 18:41:58.895	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
61caff10-9b14-48c6-ad76-4a04a5e06c06	1	2025-05-22 18:41:58.897	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
93162b5d-3d6c-47ba-aebe-e2295159b54d	1	2025-05-22 18:41:58.9	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
718dd026-21ba-44b5-92fa-17b65a2ff7b3	1	2025-05-22 18:41:58.903	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
df65012d-e1b4-4d2f-aae6-c95faafb86e2	1	2025-05-22 18:41:58.907	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2aa871de-5739-4485-8561-b390dc57a40b	1	2025-05-22 18:41:58.91	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d956b86c-3435-4863-b25c-4108865cea7e	1	2025-05-22 18:41:58.913	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8835226f-c302-43e6-a52b-29ef94aa4f6a	1	2025-05-22 18:41:58.916	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
fe12de5d-0cf9-4288-a7ee-5682af52ceb2	1	2025-05-22 18:41:58.919	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a66aff0c-57b9-4961-bc63-5e026a9a7faf	1	2025-05-22 18:41:58.922	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2f2232eb-36fa-4d46-ae26-83ac28a4e838	1	2025-05-22 18:41:58.925	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a50f8d01-6056-45ff-862a-0c752cbcd0c9	1	2025-05-22 18:41:58.928	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	1	2025-05-22 18:41:58.932	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
be82911a-8f3c-4352-a469-dc336542eb58	1	2025-05-22 18:41:58.936	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2652fe6c-6e62-46fc-bec2-db8b91cecebc	1	2025-05-22 18:41:58.939	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d79ff7cf-bf2f-4270-aff4-2070fbee5a53	1	2025-05-22 18:41:58.942	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8765b39e-8b40-4100-9ed3-69f270ccecff	1	2025-05-22 18:41:58.945	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6aebef76-6605-4d33-9ba0-649dd9574261	1	2025-05-22 18:41:58.949	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
43303113-d193-4a22-8ae2-d0474dce0a6f	1	2025-05-22 18:41:58.953	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e760d7bb-a053-4cae-a04c-8a47e2405b17	1	2025-05-22 18:41:58.958	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b6b4e561-4675-4cf8-801e-94baae050a4f	1	2025-05-22 18:41:58.961	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
145d2485-801f-40ee-a795-28a93847b780	1	2025-05-22 18:41:58.965	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
07236582-4c9e-438f-a20f-4a8931d15e23	1	2025-05-22 18:41:58.968	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bddaa94a-0114-4545-a19d-753c92fa31b2	1	2025-05-22 18:41:58.972	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
df8e7cea-6a2f-4509-9604-83726c84d7e2	1	2025-05-22 18:41:58.976	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	1	2025-05-22 18:41:58.979	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	1	2025-05-22 18:41:58.982	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2b2af6c9-0174-4643-bc23-6b43a1ac3acf	1	2025-05-22 18:41:58.986	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
59707023-92fe-4cd1-8336-daf3d792adc3	1	2025-05-22 18:41:58.99	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4ba7ca55-1686-4158-a469-b9b3c787d400	1	2025-05-22 18:41:58.993	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
46318cf6-b5fa-49e9-b872-4e14c9ff3805	1	2025-05-22 18:41:58.997	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
074c499f-c4e5-47ab-9ef9-a732e63f827b	1	2025-05-22 18:41:59	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e504ad41-4f8a-4241-a045-6542f92d86b3	1	2025-05-22 18:41:59.005	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
161af0e2-4004-45de-a0b1-2e13243e2621	1	2025-05-22 18:41:59.008	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6b4ba409-7484-4679-a654-680ffa1262d2	1	2025-05-22 18:41:59.012	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
376c3f94-8227-4c9a-911c-1c20a84fc187	1	2025-05-22 18:41:59.016	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
fa0b0c21-ae00-4032-98bd-f6728058c639	1	2025-05-22 18:41:59.019	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e7e5012a-15df-4747-8d79-acd95a978e60	1	2025-05-22 18:41:59.022	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	1	2025-05-22 18:41:59.025	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b4cfadcd-1314-4b2b-8eb8-064403e430b1	1	2025-05-22 18:41:59.028	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8754c711-e0c9-4440-b8c5-14605e9c1686	1	2025-05-22 18:41:59.032	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
dd88e4f7-0b5a-4c9a-945b-62db254d6df5	1	2025-05-22 18:41:59.035	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
42635a47-17d6-4d8d-9213-8b525c42f1a1	1	2025-05-22 18:41:59.038	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e8862f4a-a677-4112-a197-184c365158ef	1	2025-05-22 18:41:59.042	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
055c41e3-8b89-49ed-830f-b953f8d8f3f7	1	2025-05-22 18:41:59.045	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
253308cc-ade3-4258-8f08-6d62a08d86de	1	2025-05-22 18:41:59.048	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0d44edf6-38a2-4310-9708-dad2886df46a	1	2025-05-22 18:41:59.051	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
07a2bc96-9d6d-472f-842c-ed00817fe9b0	1	2025-05-22 18:41:59.054	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
168bfbaf-e950-474e-bf4a-7a880294b564	1	2025-05-22 18:41:59.057	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0b200580-eb6a-43d5-b59e-bf5d75bace7e	1	2025-05-22 18:41:59.06	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
266c5043-630f-4e32-9f61-737989489c6f	1	2025-05-22 18:41:59.063	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	2	2025-05-22 18:41:59.066	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cecbdec4-1ff3-4e7c-9bd3-a49f14570441	2	2025-05-22 18:41:59.07	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6436d0e4-9902-4d3a-86aa-9414196e2c99	2	2025-05-22 18:41:59.074	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6e50e2e4-9287-4ea8-82d5-837695929570	2	2025-05-22 18:41:59.077	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2f9bbed5-ef7c-4954-a637-fc91112f9c10	2	2025-05-22 18:41:59.08	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
76438079-4579-4f01-a037-874d8cb1d599	2	2025-05-22 18:41:59.082	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2659d012-2599-4579-bd99-749106796ee0	2	2025-05-22 18:41:59.086	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0ba30bd5-f31b-491b-85df-5f32444ff9d6	2	2025-05-22 18:41:59.09	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b202ec8c-2a9d-42a6-a13b-696e9ba116e5	2	2025-05-22 18:41:59.093	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c413da51-fd2a-44dd-bee4-fbc214bc58c8	2	2025-05-22 18:41:59.097	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
49a69626-ca50-4650-8e9a-476fa8ab5c2d	2	2025-05-22 18:41:59.1	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2db015ae-b56e-4fe5-8613-480c49d15921	2	2025-05-22 18:41:59.104	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
21b4dd7c-2739-4d48-a5b3-89511386cef7	2	2025-05-22 18:41:59.108	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
daf87f3f-f68a-40b7-a90c-d097a594f8b6	2	2025-05-22 18:41:59.111	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bad17f81-1a2d-4dd8-bbc3-76d059e44acb	2	2025-05-22 18:41:59.115	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5969f2b8-73e9-434e-b79e-031f61f598cf	2	2025-05-22 18:41:59.118	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6b737cf0-ec65-42d7-9bd5-2159c5889e05	2	2025-05-22 18:41:59.122	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0c5964b4-2659-4db9-acc0-972c472c725e	2	2025-05-22 18:41:59.125	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	2	2025-05-22 18:41:59.128	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ee244f83-9853-49d8-b641-74724c0e1496	2	2025-05-22 18:41:59.132	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8e7afa05-c492-4426-b7d8-ee3b92d0cec6	2	2025-05-22 18:41:59.135	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	2	2025-05-22 18:41:59.138	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	2	2025-05-22 18:41:59.141	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
23155572-b0cd-428e-8fd6-393d2bccdfa5	2	2025-05-22 18:41:59.145	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
eaef97a9-bc49-4e0c-9d43-79a026808263	2	2025-05-22 18:41:59.148	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
17138bd9-3f54-468f-874e-e589b39e6c01	2	2025-05-22 18:41:59.152	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
90e31429-f7e6-42d3-bc19-c5958e9b4d2a	2	2025-05-22 18:41:59.155	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
90f34cab-a886-4db8-9267-3dc055e34cc7	2	2025-05-22 18:41:59.159	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0048fc62-9d18-4e28-9ee5-11187507e3db	2	2025-05-22 18:41:59.162	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a527699c-0929-4d07-adaa-5c322ddb7240	2	2025-05-22 18:41:59.166	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b00e617d-8e60-4838-8e9e-ce59b9fccbbf	2	2025-05-22 18:41:59.169	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	2	2025-05-22 18:41:59.173	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e73a8b2c-f95b-4cff-9605-fecef53fce39	2	2025-05-22 18:41:59.176	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d7b79842-0726-445c-8ca1-8cda1552db06	2	2025-05-22 18:41:59.18	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	2	2025-05-22 18:41:59.183	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
80dc0680-2884-4a61-858a-db21dd490378	2	2025-05-22 18:41:59.187	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	2	2025-05-22 18:41:59.191	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f6fd6661-73bf-4f18-a6b8-b6f8606abe72	2	2025-05-22 18:41:59.194	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f8b65108-8187-470b-be50-6044e6fe6c12	2	2025-05-22 18:41:59.198	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1590dc85-75d6-4662-a8c5-e4ca9e00708b	2	2025-05-22 18:41:59.202	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bd7364ae-c249-45b1-b840-ffefae1fc337	2	2025-05-22 18:41:59.206	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
fcb9151e-dadb-4bc6-a928-1fa07338bc23	2	2025-05-22 18:41:59.209	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	2	2025-05-22 18:41:59.213	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6a582f59-a400-4c9d-8143-b3e6eb082230	2	2025-05-22 18:41:59.217	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8ca16545-dd00-48d8-bf87-aaf093851072	2	2025-05-22 18:41:59.221	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	2	2025-05-22 18:41:59.224	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
f03edd14-239b-4e70-a6c1-44d5da27960a	2	2025-05-22 18:41:59.228	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	2	2025-05-22 18:41:59.231	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5038dba5-1fcc-4a73-8639-6cfa75334633	2	2025-05-22 18:41:59.234	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
73fa7ace-0190-4429-8c1e-cc8aedb56f9d	2	2025-05-22 18:41:59.238	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
20510485-8901-4682-87e4-c49cf4d99c26	2	2025-05-22 18:41:59.242	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
81d61817-dadd-452a-bfd7-229331ff34ba	2	2025-05-22 18:41:59.246	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6402e55b-e502-47eb-adaf-d662d33a96d5	2	2025-05-22 18:41:59.249	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
29eb7ca2-7d27-457e-aa48-c266e040f5ca	2	2025-05-22 18:41:59.252	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c7b5a382-4165-4cc8-8de0-3f84a2283679	2	2025-05-22 18:41:59.255	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bbe75fed-326d-414a-ba4b-132c65e35d52	2	2025-05-22 18:41:59.259	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
14da454e-4996-4129-8432-e27cb1cf00c3	2	2025-05-22 18:41:59.262	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
eb9d92e5-c125-4db0-9985-bc84f82bd357	2	2025-05-22 18:41:59.265	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
30f70e5f-30f6-496e-9a4f-7da1bf533416	2	2025-05-22 18:41:59.269	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
fb577695-639b-4820-ae9e-7adb78288346	2	2025-05-22 18:41:59.273	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6cfb4386-5a43-4470-920c-62622c5fac22	2	2025-05-22 18:41:59.277	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e3136214-550f-4058-9855-487bac6b4dc9	2	2025-05-22 18:41:59.28	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
96c250ce-8755-4275-964f-06e67bd12966	2	2025-05-22 18:41:59.283	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
91d56b0c-114c-48c0-864c-2b22548f68ba	2	2025-05-22 18:41:59.287	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a2ca2e8a-f029-4981-9d83-4d10bb8145dc	2	2025-05-22 18:41:59.291	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b9efa02f-0969-4802-95c0-8d587d84a468	2	2025-05-22 18:41:59.295	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b3e7f06e-5ca2-42ae-af66-7989d3f004b6	2	2025-05-22 18:41:59.297	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3cb41358-d613-4e72-a9da-730ceb6dca91	2	2025-05-22 18:41:59.3	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	2	2025-05-22 18:41:59.304	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	2	2025-05-22 18:41:59.308	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0448146e-fac5-4cef-b010-37e819542b89	2	2025-05-22 18:41:59.311	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e25d43d7-1ce8-4aec-bf25-d4a369b8befb	2	2025-05-22 18:41:59.315	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
59be806c-5aa4-4eb5-a130-e74f06dc486b	2	2025-05-22 18:41:59.319	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
368c76e7-957b-4495-a7a4-bfbb98eb3cca	2	2025-05-22 18:41:59.322	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2f4b98ce-7dad-4843-b76a-130e62d8635d	2	2025-05-22 18:41:59.325	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
dfa4ab04-3fd9-4439-a616-adfb76600112	2	2025-05-22 18:41:59.33	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
94673a27-2762-485e-bdba-62b21956622c	2	2025-05-22 18:41:59.332	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	2	2025-05-22 18:41:59.336	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
50ea9d2a-5293-4466-a807-77daba03dc47	2	2025-05-22 18:41:59.34	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
15162537-f2c5-42df-981a-42e97fa6dfc2	2	2025-05-22 18:41:59.345	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
249cb45e-b334-45c0-9624-e354e685a7ce	2	2025-05-22 18:41:59.348	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
237c95a3-f446-44d1-b4b2-5b2dcd678db1	2	2025-05-22 18:41:59.352	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
68d7dea2-b7b1-4416-8c40-ce6260668110	2	2025-05-22 18:41:59.355	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8da5755b-2a1d-41a0-b43c-c427c063748b	3	2025-05-22 18:41:59.359	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0ce2cf9a-1de1-4018-860c-790a286728ed	3	2025-05-22 18:41:59.362	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1edb1519-3ce7-4697-a27a-e495d69a02ca	3	2025-05-22 18:41:59.365	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d4595adf-9bb6-4939-bd0d-6419c58698bc	3	2025-05-22 18:41:59.368	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d09941cf-67f9-420d-bd40-4ecd9f8b6896	3	2025-05-22 18:41:59.372	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
69aa774b-9a1d-4cbe-a08e-56b36129ed62	3	2025-05-22 18:41:59.375	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
305ee8f2-4436-439b-b727-8d2bd0e2bc80	3	2025-05-22 18:41:59.379	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2667ba62-fc35-4793-8cc0-f94c02985460	3	2025-05-22 18:41:59.382	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	3	2025-05-22 18:41:59.385	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2e982a82-e9c1-497a-860a-fea6816c7220	3	2025-05-22 18:41:59.389	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	3	2025-05-22 18:41:59.392	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
51802256-84a5-490f-bca8-62796ea49a68	3	2025-05-22 18:41:59.395	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
719f6e37-2b19-4771-b1fc-1ddf5a903329	3	2025-05-22 18:41:59.398	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	3	2025-05-22 18:41:59.402	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4ad466de-c926-43b6-88c6-d2578d8fc4fc	3	2025-05-22 18:41:59.406	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8398637b-b892-4659-b018-9750954d46b1	3	2025-05-22 18:41:59.409	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1a6d4bd9-026a-4e21-821c-1eafd60695b7	3	2025-05-22 18:41:59.413	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
bb6e160f-f95c-4410-995d-577d29c98329	3	2025-05-22 18:41:59.416	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
edac60c8-d2f2-497d-8d82-c46f1368fe83	3	2025-05-22 18:41:59.419	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
122ac324-09f9-419a-9e4e-c96b56bf183a	3	2025-05-22 18:41:59.423	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c215ba8c-7f03-4623-8a29-1271ca7b0c79	3	2025-05-22 18:41:59.426	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ca21de48-a73d-4782-bb97-69324102a4c8	3	2025-05-22 18:41:59.429	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
655200b4-a668-4070-acb5-6d9c2942db5e	3	2025-05-22 18:41:59.432	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5a965921-82fe-436d-bfcd-30bbb52ed79b	3	2025-05-22 18:41:59.436	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
da0c024c-eee2-42a0-ba36-2e31cd731628	3	2025-05-22 18:41:59.439	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4afea674-e0f3-4cc2-8024-5715b8a69434	3	2025-05-22 18:41:59.443	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cf50eaa5-de41-45a4-ada1-17e44e4b5014	3	2025-05-22 18:41:59.446	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
774b76f8-c9a4-4068-b867-99c2dfb7ecd5	3	2025-05-22 18:41:59.449	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b5911913-b139-4fdc-a8dc-d03750a50dde	3	2025-05-22 18:41:59.452	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
dfcc5151-1112-49de-a315-6ad9a67bce7b	3	2025-05-22 18:41:59.456	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
c7402c75-4217-4ec9-8306-fdb7c7e9523a	3	2025-05-22 18:41:59.458	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7e2e1772-b309-424a-bc6f-7ee8f23645f1	3	2025-05-22 18:41:59.462	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
140b724b-16a5-420d-8516-72722fb10576	3	2025-05-22 18:41:59.465	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
cda65b3a-0236-4317-b536-3242206a7a7e	3	2025-05-22 18:41:59.468	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2854b823-2730-429e-9d1a-264aa62a26aa	3	2025-05-22 18:41:59.471	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
90589d5d-d15f-4d1a-bf60-1b251ae2eccf	3	2025-05-22 18:41:59.474	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e02bb639-fb42-4ea3-af02-5cc845b7c2b1	3	2025-05-22 18:41:59.477	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
567c7e60-e599-4126-a07d-7bb809097a28	3	2025-05-22 18:41:59.481	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6dc92a3e-5379-4b7d-a066-f96ec1a91f78	3	2025-05-22 18:41:59.485	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
402c7b8e-ff3b-4655-b542-2618c25e11b1	3	2025-05-22 18:41:59.488	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
00ad0764-de3b-44d4-a292-5c14ec998950	3	2025-05-22 18:41:59.491	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6e37deb6-881d-403a-9e8e-f553f0d2fe28	3	2025-05-22 18:41:59.494	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
0430cdf6-41b3-4855-881d-b50280bb21a7	3	2025-05-22 18:41:59.498	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6a46bc77-4db4-44f7-908f-278c19ce5395	3	2025-05-22 18:41:59.501	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
895ae354-7138-4797-bd0c-91f45dc927e0	3	2025-05-22 18:41:59.504	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b20f70d8-8103-4562-a31c-2620c9da4226	3	2025-05-22 18:41:59.507	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b822df53-4594-4f0d-941a-794786bb93ae	3	2025-05-22 18:41:59.51	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8abe77b7-3d5e-4d2c-8d88-1c838223030b	3	2025-05-22 18:41:59.513	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
17864784-730c-423e-a290-d8fc76f75049	3	2025-05-22 18:41:59.516	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
23b8fa1e-dd26-434f-b714-00c80284a124	3	2025-05-22 18:41:59.519	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2a0953da-fdd5-46ff-9b38-b30d95b1c447	3	2025-05-22 18:41:59.522	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ad615693-356c-41ca-874d-deb2e2536afc	3	2025-05-22 18:41:59.526	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d572bcc1-bc14-4b7e-85ec-91862be987fb	3	2025-05-22 18:41:59.529	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
de810d24-1e70-45cc-9e77-ea92552a1bbb	3	2025-05-22 18:41:59.532	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8d995d38-ca67-41df-b0c9-6e2d7004e7f2	3	2025-05-22 18:41:59.535	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
4dc46c8b-6173-44db-80f6-ffb320bd2df0	3	2025-05-22 18:41:59.538	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
997894ec-b392-4a31-82ad-6e0dd15dfea3	3	2025-05-22 18:41:59.541	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
d51bddd7-d291-4bc9-9737-d10705397a4c	3	2025-05-22 18:41:59.545	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
210231d9-7b86-4676-b0bb-d9f6655f2ab4	3	2025-05-22 18:41:59.548	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	3	2025-05-22 18:41:59.551	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
8db347b3-463e-4385-8050-eb8ab1eecea2	3	2025-05-22 18:41:59.555	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
15b276d6-191f-4f11-8395-a33880c16c19	3	2025-05-22 18:41:59.558	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
50c91d35-debe-4573-aa62-3a09634787db	3	2025-05-22 18:41:59.562	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7f99b900-07fd-4acf-99e0-839abecb8e52	3	2025-05-22 18:41:59.565	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
6e4ccbbd-761d-4db5-b644-c191e667a6ef	3	2025-05-22 18:41:59.568	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
7581432f-17ec-4a91-81f2-7a25f898fe11	3	2025-05-22 18:41:59.572	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	3	2025-05-22 18:41:59.575	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	3	2025-05-22 18:41:59.578	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
2c347c52-ea8a-48d3-ac24-7b964bac4e72	3	2025-05-22 18:41:59.583	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
761dde46-f86f-492b-9438-67f04e870b9e	3	2025-05-22 18:41:59.587	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3e0ee6bc-913e-4a2b-8de4-830412ad0795	3	2025-05-22 18:41:59.591	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	3	2025-05-22 18:41:59.595	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
3f4ee561-7cb3-4a61-b035-ed343f0ea81e	3	2025-05-22 18:41:59.599	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5dfc4e8e-d75a-4db3-8479-9b0c41046f27	3	2025-05-22 18:41:59.602	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
1f32ec15-46bc-4eaf-bb88-db4906fd095e	3	2025-05-22 18:41:59.605	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
18a83d57-fd7d-4612-821f-1f0e59dc38ec	3	2025-05-22 18:41:59.609	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
64f798f6-bec0-4331-912c-49b505ca78fe	3	2025-05-22 18:41:59.612	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
ccfd600a-c461-4b5a-80fe-12db84877546	3	2025-05-22 18:41:59.616	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
b8b40a89-dff0-483d-8e47-40a11afff475	3	2025-05-22 18:41:59.62	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
a1e89470-e247-4c3a-8227-bf9c3d8d7d50	3	2025-05-22 18:41:59.624	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
5bf309eb-632c-4c84-b1d7-31b558630477	3	2025-05-22 18:41:59.628	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
e65a7285-b369-4fe8-b0d4-80a5413f2c58	3	2025-05-22 18:41:59.631	f	\N	f	f	cmazpxtfz0000qu3tgg4qi5ex
\.


--
-- Data for Name: QuestionGroupCategory; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."QuestionGroupCategory" ("questionGroupId", "categoryId") FROM stdin;
b24781f7-d736-4abf-8faa-7d33b59e8a10	5
bc608ac8-bb77-4b23-ab46-159904eb81ae	8
0b145c11-7769-4478-b41b-46cb17c41515	7
e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	11
8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	7
2f13abc0-d927-46e7-9aeb-d7acb79d42bb	7
2f13abc0-d927-46e7-9aeb-d7acb79d42bb	5
2f13abc0-d927-46e7-9aeb-d7acb79d42bb	4
cb526383-921f-4360-bbca-c73e8b3e3033	2
6c33684b-038b-4753-8978-04001c98b8d5	4
52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	11
32c52d73-9868-473c-b0d2-ee7d526c8a81	11
32c52d73-9868-473c-b0d2-ee7d526c8a81	2
aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	4
06a7e629-237c-455a-a361-ec6203ea9234	10
06a7e629-237c-455a-a361-ec6203ea9234	8
06a7e629-237c-455a-a361-ec6203ea9234	1
e260af83-cf26-4fdd-b057-880d554eebde	9
e260af83-cf26-4fdd-b057-880d554eebde	7
b49f8a1d-4509-4b6c-884f-9a65cac45dcb	10
b49f8a1d-4509-4b6c-884f-9a65cac45dcb	4
b49f8a1d-4509-4b6c-884f-9a65cac45dcb	1
722b8cdb-281a-4797-ab32-32d089dae310	5
09847df2-36f8-4b53-99af-48974fb53dcf	8
09847df2-36f8-4b53-99af-48974fb53dcf	7
d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	4
cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	4
15752b7a-b58c-4e8c-a95e-1776b1abd57c	9
15752b7a-b58c-4e8c-a95e-1776b1abd57c	8
f66fd69e-fbeb-443b-a021-c298e513a6f8	8
2480c44e-c2bf-434b-a447-8217584b25c3	4
05e41b42-81d8-473f-a63e-7326ff72ed9f	9
4aabf8df-2528-455f-ab2e-d0896dcd8687	9
4adf2538-72ec-40a1-8ac2-aa0522918bce	9
ee6d9a0a-ef03-4b19-862e-1bc8544acc40	4
17710c4a-ceea-4f99-8e8a-9ea7be68df69	2
061834a0-1650-41a8-a8c6-4f4c8cb6831f	2
7e1633f0-2688-488f-b8e2-9672b31ea37e	4
97553132-efe4-436a-8463-55773a02c6ae	6
2897e9c9-ea5d-4328-9730-3eaf6d8cc862	8
5442e950-bbfb-4c60-a047-3a21057e2a13	10
a2057581-a0ce-49ca-b4a2-95fe17562b65	10
a2057581-a0ce-49ca-b4a2-95fe17562b65	8
a2057581-a0ce-49ca-b4a2-95fe17562b65	1
a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	7
d1716ea4-7264-434a-9a81-2c7229d41454	9
d1716ea4-7264-434a-9a81-2c7229d41454	8
d1716ea4-7264-434a-9a81-2c7229d41454	5
0241015c-e821-43e3-a1b0-2aa3456107b9	7
0241015c-e821-43e3-a1b0-2aa3456107b9	5
96d029af-3e8e-4dc3-aa24-2ab49e6efc66	7
96d029af-3e8e-4dc3-aa24-2ab49e6efc66	1
44beeb67-10c4-4088-8c01-03f44cbae9f9	9
44beeb67-10c4-4088-8c01-03f44cbae9f9	8
44beeb67-10c4-4088-8c01-03f44cbae9f9	1
de3b04ee-9038-47f2-9d7b-68823d41cbac	7
de3b04ee-9038-47f2-9d7b-68823d41cbac	4
855cae49-e0d6-4ae8-8c69-3af1ba09d294	3
855cae49-e0d6-4ae8-8c69-3af1ba09d294	2
291601c1-9b3c-49a2-a78c-e46e9137b001	5
af5a66e5-bf31-4262-8976-89cd8ea4eb56	8
100d8668-342b-4430-9652-7ac4a042684a	11
100d8668-342b-4430-9652-7ac4a042684a	2
c9ab248e-c179-4fbb-ba58-b7efe09847ab	3
c9ab248e-c179-4fbb-ba58-b7efe09847ab	2
77c41e5c-949f-4bc2-8104-dc16bd16fc07	8
c3faadfe-b096-448d-a704-868d3d6fbadf	3
f34c7766-37cb-455d-b19f-28b34aac51e7	9
87cd330c-29f0-43d6-a30a-18859f64d7c7	8
4eadaeb2-c165-4488-b119-97ddc5aa51c5	9
d6253326-0b34-40d6-8125-d3a1b8cfabaa	8
7a9ca40a-914c-47fa-92dc-f74889a99208	9
7a9ca40a-914c-47fa-92dc-f74889a99208	8
38f58c1f-0ca6-40b6-bba6-7c444e842921	7
38f58c1f-0ca6-40b6-bba6-7c444e842921	4
0d7f4f2a-3424-4789-b732-a0b32286815d	9
36a8daa4-7741-40e2-86aa-be5eb874e275	9
36a8daa4-7741-40e2-86aa-be5eb874e275	1
5ba28665-5140-4503-8b0f-e4f91937f423	7
aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	8
f32eac61-aa16-4095-94e0-9c786b8c70de	9
dae0875e-7812-483f-8760-b98ab8bde6cc	8
dae0875e-7812-483f-8760-b98ab8bde6cc	3
faadcff3-7957-4c4e-8620-50a24b37c862	8
faadcff3-7957-4c4e-8620-50a24b37c862	1
f4d8008c-0888-400d-a388-87c0299d6e0e	1
cfc5ac21-333d-4f60-93cd-542a39a65749	5
d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	9
54da03ba-5802-4292-a21d-8ca3c4a9492b	2
3ea2d4f9-571d-48db-8919-2752c85b57c8	8
3a6ef475-6eca-4a0e-a558-4c7e0363d53c	7
c704b3be-98bc-4c14-998d-11df3b1bc815	3
7fdf9127-88d1-42cd-a7f1-e41f8453f4de	9
3435a490-9687-4edf-962e-b7954022582f	4
730e74c7-6338-49f7-8f0d-4cacb3467703	5
facf297a-ab60-430b-b605-ad6ce6d6babf	8
facf297a-ab60-430b-b605-ad6ce6d6babf	4
f0991fcd-ba86-43ed-bb8d-30ee6f813530	9
f0991fcd-ba86-43ed-bb8d-30ee6f813530	8
be520403-d204-4be1-9bb9-9a3e1356d4c3	5
98398a41-fecc-4fa6-9697-89911e0e4644	1
6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	2
3e1936f9-a4d4-4026-adaf-16f845619eab	9
3e1936f9-a4d4-4026-adaf-16f845619eab	2
f36c221b-eed4-4623-a91f-7f72a446e781	4
9500303b-48bd-40e9-ae19-c0dcd79e0811	7
9500303b-48bd-40e9-ae19-c0dcd79e0811	4
eb363c21-ad10-43d8-a05f-1c725b5e9737	9
eb363c21-ad10-43d8-a05f-1c725b5e9737	7
d29aa121-4e91-4123-bb89-809c951fe928	3
6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	7
b5e1b839-cca3-4fc0-b21e-d954c709d1f4	9
b5e1b839-cca3-4fc0-b21e-d954c709d1f4	8
aaeb0306-d159-4510-baf8-905a12c13971	4
31c0a592-e03e-470b-8acf-d9dd0fbc92ac	2
7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	4
3507b7c1-b87d-4572-95ff-0c7345d8d5e9	7
149697d1-db36-4403-97a9-41e4d1fd917b	4
aabd15ee-f0c2-4722-9904-58e9daeb4cf2	4
3d221b83-94d7-4992-a6fd-d15f7b201dd1	7
3d221b83-94d7-4992-a6fd-d15f7b201dd1	4
c5caa3e2-9489-4389-9e4b-07a5a1503dd7	11
c5caa3e2-9489-4389-9e4b-07a5a1503dd7	8
19d491a3-88f7-4b55-a615-1538bd85e488	2
ba5baebe-ab16-4d31-8530-edee9ba059f6	4
ed9fb2cf-0438-4d86-b415-2dac1111fcb5	4
b7b05f57-085c-4e59-98ff-5b7be5b188e8	4
8113da5b-1635-4fa4-be4d-92387cb97b94	8
8113da5b-1635-4fa4-be4d-92387cb97b94	7
0a02d438-398f-43d9-84dd-dfca9147e058	7
a6faf59d-3e12-41e0-8284-3cd716c55079	8
be2b14ea-489e-490a-8398-79716b05cfda	8
74927512-e8a6-48b3-9277-8a9208195cad	7
74927512-e8a6-48b3-9277-8a9208195cad	5
93639a21-9dc5-42e7-abeb-ac0d0b5b4107	7
93639a21-9dc5-42e7-abeb-ac0d0b5b4107	5
f072f18e-5645-48ad-bce9-2ed57ebeb1de	9
733c585b-631f-4dfb-a3a5-aec524d5a4e0	7
733c585b-631f-4dfb-a3a5-aec524d5a4e0	4
dc459bb7-9061-498b-b81d-744a44c3ba80	11
dc459bb7-9061-498b-b81d-744a44c3ba80	9
dc459bb7-9061-498b-b81d-744a44c3ba80	2
88a25016-8c96-4e35-9aa5-91cea5a956a7	7
88a25016-8c96-4e35-9aa5-91cea5a956a7	1
b0f828e0-6620-4249-b6f7-8523f1dc91c8	8
d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	8
a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	9
877d43c0-ae02-4b6e-b348-ad3494b0a2a0	5
0d46ab9b-8fb1-474d-8a77-566422449236	4
e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	8
67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	8
67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	5
d6a288b7-0c0e-40d7-9d16-5a35490c961e	4
07817ed1-248b-48c5-8a3f-8bab1d363f2b	11
07817ed1-248b-48c5-8a3f-8bab1d363f2b	9
5d9f9e71-0476-40d3-844f-6f3ceee1488d	4
89996d94-15b6-4ab0-bef1-05bd7877f9c0	2
89996d94-15b6-4ab0-bef1-05bd7877f9c0	1
1597c559-8579-435c-b0f2-fb8c5ce40917	5
ef344e03-8c7c-4fc9-9535-83bd8978d346	9
d9763a18-a497-4720-9deb-82a84e1f14ad	9
d9763a18-a497-4720-9deb-82a84e1f14ad	7
5d7d94fd-acd6-4433-b5e3-14599f51cc1f	8
5d7d94fd-acd6-4433-b5e3-14599f51cc1f	7
cab31e27-336c-46d8-b1cb-e742d273ebe6	7
cab31e27-336c-46d8-b1cb-e742d273ebe6	4
988e0abb-3547-40b9-a776-2173f8c07676	4
a316639f-bd7a-4377-970a-a302d2e821fd	4
286e0137-37b7-4333-9425-e22f09f6b12f	4
21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	8
6f41cc91-25c3-4e8d-afca-98c15aa707ef	11
6f41cc91-25c3-4e8d-afca-98c15aa707ef	2
25e8843b-7c61-4083-be6b-1d588cc16cd7	4
15a4b211-7234-414e-a0cc-d38e2d52608a	7
15a4b211-7234-414e-a0cc-d38e2d52608a	2
4abff3d2-6104-4116-b515-77416e81dc12	9
4abff3d2-6104-4116-b515-77416e81dc12	7
4abff3d2-6104-4116-b515-77416e81dc12	4
d64d2979-98ba-48a7-8534-c60877e5b965	8
d64d2979-98ba-48a7-8534-c60877e5b965	5
af62a94b-d5d3-445d-bde2-f2e0c4af0a41	6
58d57815-902b-471f-bb08-3f4ca052015c	9
58d57815-902b-471f-bb08-3f4ca052015c	4
a2d09cc6-babd-4e8a-98dc-a0148d8b7384	9
6c19256b-78e2-428e-a12e-414f1e41bbff	8
40c6c153-e108-4087-992d-40393c5c8d0f	7
271e9d82-2f38-41a5-bc6f-4a79d172fe51	7
f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	9
f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	4
f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	9
f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	7
e8655fe7-56a8-4e21-a664-4ae0be515c44	3
9d9e6425-934d-4566-8430-4f7b9e86b26b	5
a7d730e1-30f5-40df-b95b-cb972ecdd573	9
a7d730e1-30f5-40df-b95b-cb972ecdd573	4
d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	8
64e790c9-1224-4ef9-9b4c-34c8740d8f24	7
cc8b6725-f8d7-4522-b70d-2e201057639c	12
cc8b6725-f8d7-4522-b70d-2e201057639c	8
65d6e242-98a5-42c1-8a1f-e76e5865bb4b	7
65d6e242-98a5-42c1-8a1f-e76e5865bb4b	4
22cedfd9-1375-4d92-b023-b2a49c6c2b57	2
4099456e-5461-4401-b552-34f8e891ba35	9
a2ef7497-bbdd-4be7-83c7-319c2cbc212f	8
12ac45a4-8e5e-482c-bd1c-ba87168f1098	5
9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	9
9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	7
bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	9
5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	9
64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	8
f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	9
f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	7
405ba252-6b60-4426-a300-25e7932c2593	9
405ba252-6b60-4426-a300-25e7932c2593	7
6d4e69d7-156c-4855-81ea-263a87482c03	12
6d4e69d7-156c-4855-81ea-263a87482c03	11
1a53ad26-5577-473f-8787-68ddd30a49f0	9
f6cb71fd-f034-4b41-a3f3-2f558010179d	5
f6cb71fd-f034-4b41-a3f3-2f558010179d	4
a94c6508-4a23-4ff8-9872-8a1d84efd8ab	3
a94c6508-4a23-4ff8-9872-8a1d84efd8ab	2
612bac3b-7df4-472a-a80c-1de549a6b1ed	4
ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	4
937a6b97-95a4-4ebf-8e31-f4c41a5f0820	9
4dea9bdb-0836-4049-9766-2a271c332335	4
b2094136-6558-4074-8907-95a6708d1146	3
5b282628-fa35-43c5-b5ee-a294b6ed8226	1
1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	3
e98227be-0c5f-4900-8f3a-2633b0dbbab0	7
e98227be-0c5f-4900-8f3a-2633b0dbbab0	4
ed4e1a3d-786e-49bb-b942-1da35e5a04d9	8
ed4e1a3d-786e-49bb-b942-1da35e5a04d9	4
a6139b80-36a4-4775-9da5-c06466f1e361	8
0852f89d-0df9-4559-b4d8-9074cf67a335	4
63351453-5507-4199-915a-1220b13c7266	9
4e7476bb-6dde-4725-8a96-5454520df090	7
4e7476bb-6dde-4725-8a96-5454520df090	1
bf819156-9d00-464b-8a94-e08428443caf	9
9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	5
b988bbb3-0bc4-437d-aab1-226248393a02	8
55f65763-815d-451e-94ca-3f1646372f57	9
55f65763-815d-451e-94ca-3f1646372f57	3
83aac205-8aac-48b8-9178-bc28632d3592	4
cd491b5c-c7a3-40ad-b390-b41481813ed6	1
5300578b-0199-4e73-9c76-db08f0883fb2	7
81416478-48b4-45a1-9766-6030759e901a	2
d63fec99-6944-46fc-97ed-08f1d44e09f0	8
1c998d37-ffb5-4e93-b809-ef71f6b648a8	8
1682619d-39ab-446f-973f-ae2c1b7820da	9
30800c33-f9aa-4712-9986-2b253c36b188	2
cf90b94e-e441-4f93-83f1-566752861202	7
cf90b94e-e441-4f93-83f1-566752861202	5
03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	10
03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	9
03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	8
12acd57b-5e92-403e-9f07-cc85ca0b8fbb	4
54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	8
e8d5aac5-30a9-427c-8da3-9f0b140970e6	4
e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	9
329b38ef-63bf-41e2-a266-5dd6a4b36f79	9
329b38ef-63bf-41e2-a266-5dd6a4b36f79	8
329b38ef-63bf-41e2-a266-5dd6a4b36f79	7
f376fba5-54e1-4f21-99d6-0e41bc000588	10
41bf1e07-3e24-40a4-98e9-45b3e4538cce	11
41bf1e07-3e24-40a4-98e9-45b3e4538cce	9
0d9a0a12-85a6-40d5-8335-df90740abcf7	3
4492fc47-f2b9-41c4-a680-e05ca735ce9e	7
3a952e5b-a9f2-45f6-90de-3407e6be0f9d	5
80afdbde-8ccd-4068-b552-a828341ebe67	8
d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	2
79a82f80-fb7d-4211-bb73-4a2ef554204f	5
79a82f80-fb7d-4211-bb73-4a2ef554204f	4
24e4aa16-924f-4d83-8f64-c0f36bf1489c	9
9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	7
6bf76683-2c9c-45df-a3f4-213f869dc9ab	11
6bf76683-2c9c-45df-a3f4-213f869dc9ab	2
484a7e91-2ffe-44ce-8635-d6576739734f	9
484a7e91-2ffe-44ce-8635-d6576739734f	4
f0b1b23e-a127-467a-bbda-51d34380069c	9
01199d58-fbd7-4046-a875-b15712c14331	4
4524ee1f-9f7a-465b-acf3-467f5161059c	7
93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	2
d0059349-79ed-4c98-ba00-6135c431c2c2	8
4b549b5d-0864-4add-8ed5-91c54e67bae2	4
1c69cd87-b362-4f5d-befe-06706be21c3f	1
d1e0da35-7fe8-44c8-b358-c6a300e39cf4	8
d1e0da35-7fe8-44c8-b358-c6a300e39cf4	5
9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	7
9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	4
30e98b58-25c9-47cf-81fb-2d00a64eb9fc	2
59f8d229-bb8b-4ba6-925b-0f9d056b2b39	7
a71fb52d-a04b-44e9-97f1-a92437b8495a	8
6524e347-2474-453a-9dc1-c1fa6daf6129	7
9aa16063-a8b3-4efe-801e-433f3a3c4a61	7
ff5f90f7-9cf7-487a-a839-a119698dd932	8
382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	5
adc0bf61-9e77-4226-8a5b-765a04e035aa	4
12c9e81b-3b09-4ce4-8608-fa1e5c281168	8
12c9e81b-3b09-4ce4-8608-fa1e5c281168	5
3a991bbc-3caa-4a2e-b86b-ea3a72840351	2
ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	7
ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	4
413a283c-4022-4f90-a742-b3c4098e9633	4
97a944ab-acf6-4a2f-8787-a6cc9520ec0f	9
c91657e2-fdc2-4d61-a35f-db641b348955	4
572e63a5-9858-4b31-a50f-2b3b97223bb2	2
9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	8
42da9e30-776a-492c-b355-c8b79aa6fc7d	11
42da9e30-776a-492c-b355-c8b79aa6fc7d	7
42da9e30-776a-492c-b355-c8b79aa6fc7d	1
767b2153-1ddf-43b5-8ba3-c163e0d59aaa	5
767b2153-1ddf-43b5-8ba3-c163e0d59aaa	3
b8da26d2-712b-4c26-a3eb-a58432690bc9	4
da0352aa-205a-46a2-88f2-44337e07d82f	7
960f0bc5-3ffb-47b4-9cb1-32145d0503f1	9
960f0bc5-3ffb-47b4-9cb1-32145d0503f1	7
960f0bc5-3ffb-47b4-9cb1-32145d0503f1	2
8b4e4268-8871-433e-aeda-871ea6168258	4
467e8afc-4292-4d4a-b970-1c3b04452e10	9
467e8afc-4292-4d4a-b970-1c3b04452e10	7
f7df86fc-6889-4034-8554-89a2c7b7b0dc	1
bfc27d3d-28c1-4800-9a19-4083ec767ff7	9
b73af29b-32b0-40e1-867a-765276acc40f	4
45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	7
df302924-708c-4861-a238-ddd950574c27	2
d291332c-68d5-4a91-9b96-cb8c9a9ac930	10
d291332c-68d5-4a91-9b96-cb8c9a9ac930	5
d291332c-68d5-4a91-9b96-cb8c9a9ac930	1
c1242167-5aae-435c-9196-58298b3d9261	9
c1242167-5aae-435c-9196-58298b3d9261	8
f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	10
b156696e-49af-4582-8e63-a41a46840bd7	8
5097e0ff-e224-4060-9051-cb9fdd9e99d4	1
4f64a379-9677-4b09-a4b4-3007f5403879	9
4f64a379-9677-4b09-a4b4-3007f5403879	4
2113e0af-27a5-4be6-a356-d11f82c2aeaa	5
82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	4
a0e42c6c-02ab-4ea0-90e4-43523da39b03	8
4c903a88-55b7-4f68-9cd8-06d374a8baf0	8
e0d4cf71-7f3c-4846-baec-90a3bb95d23b	9
e0d4cf71-7f3c-4846-baec-90a3bb95d23b	8
cad0e400-d7fe-4a60-b939-0ca272f578ce	2
afc46845-19fa-4036-bc1f-3b1036104372	3
6cf88651-6c1c-4c77-8d5d-5333b5a8e448	11
6cf88651-6c1c-4c77-8d5d-5333b5a8e448	9
dcb3ebca-90bf-4e10-8977-54231b8ebef5	7
dcb3ebca-90bf-4e10-8977-54231b8ebef5	4
9d2245bc-d4c8-4e61-959f-d28105a788d9	4
21c1796c-73e8-4f7a-a551-ec684b835a5f	2
c497cb6d-c64c-47bc-bccf-4c7c8457a92d	8
c497cb6d-c64c-47bc-bccf-4c7c8457a92d	5
912c3636-3a5a-4877-bae4-05e9f3028fd5	11
912c3636-3a5a-4877-bae4-05e9f3028fd5	2
6c7fced7-c9d3-4a18-88cc-577d9a59b283	5
6c7fced7-c9d3-4a18-88cc-577d9a59b283	4
484abcbf-dbd3-4c73-9ddf-3d31102d9564	4
e3844bbc-243d-4225-a3a0-dedb1f1f285e	8
ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	4
ffb69ca7-69f9-4694-b983-320fa63de509	9
ffb69ca7-69f9-4694-b983-320fa63de509	7
1afd8c5e-977f-4597-8368-b658f59aa7fc	9
1afd8c5e-977f-4597-8368-b658f59aa7fc	7
0ba134ba-6857-4ade-8b13-2b1df78701b8	9
0ba134ba-6857-4ade-8b13-2b1df78701b8	7
751ebb83-a155-443e-9d95-eaadf6183b57	11
751ebb83-a155-443e-9d95-eaadf6183b57	8
751ebb83-a155-443e-9d95-eaadf6183b57	2
9e3c8df2-f33e-4c86-90a0-3e04554cee14	6
7a2461a2-be29-4e95-9128-4f1d587ef9f9	5
4d461bdd-6555-4e75-b92d-7007787a206c	4
b5332f27-d03f-46ad-9860-7f33d7109466	7
b5332f27-d03f-46ad-9860-7f33d7109466	4
8b5228d0-9411-4aba-a14c-8dfda45f20d0	8
3781e005-35d0-4802-8a02-b5b93a26be7d	9
4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	4
4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	1
e3184a76-0833-49d4-95b1-c3ae863be78b	9
e3184a76-0833-49d4-95b1-c3ae863be78b	7
5db47450-6c6b-4f83-964a-fbd370cb7465	9
5db47450-6c6b-4f83-964a-fbd370cb7465	1
5a55df28-edeb-45ae-b336-043a57f6f5b8	8
cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	5
8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	4
cd3b1212-52b0-46fe-8243-db2ee3b8c81b	8
cd3b1212-52b0-46fe-8243-db2ee3b8c81b	1
f577157e-75a5-425e-b537-99cbf885c979	11
15724682-b932-4bf4-a734-87215b84955f	8
bf4c517f-21a3-4ca3-96d4-2002965e42ed	9
bf4c517f-21a3-4ca3-96d4-2002965e42ed	7
f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	9
f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	8
17279c41-09b0-49be-87ec-05bf0d5da921	8
7883db29-dc81-4e6d-9dd1-e7847014c54a	9
84a2e439-b945-4c8d-859c-7836589d8618	8
84a2e439-b945-4c8d-859c-7836589d8618	1
443e2674-e2dd-4a99-a627-582b1a178dc0	4
61caff10-9b14-48c6-ad76-4a04a5e06c06	2
93162b5d-3d6c-47ba-aebe-e2295159b54d	6
93162b5d-3d6c-47ba-aebe-e2295159b54d	3
718dd026-21ba-44b5-92fa-17b65a2ff7b3	7
718dd026-21ba-44b5-92fa-17b65a2ff7b3	5
df65012d-e1b4-4d2f-aae6-c95faafb86e2	4
2aa871de-5739-4485-8561-b390dc57a40b	9
2aa871de-5739-4485-8561-b390dc57a40b	7
d956b86c-3435-4863-b25c-4108865cea7e	8
8835226f-c302-43e6-a52b-29ef94aa4f6a	4
fe12de5d-0cf9-4288-a7ee-5682af52ceb2	11
fe12de5d-0cf9-4288-a7ee-5682af52ceb2	8
a66aff0c-57b9-4961-bc63-5e026a9a7faf	4
2f2232eb-36fa-4d46-ae26-83ac28a4e838	2
a50f8d01-6056-45ff-862a-0c752cbcd0c9	7
a50f8d01-6056-45ff-862a-0c752cbcd0c9	4
bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	11
bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	2
bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	1
be82911a-8f3c-4352-a469-dc336542eb58	2
2652fe6c-6e62-46fc-bec2-db8b91cecebc	8
d79ff7cf-bf2f-4270-aff4-2070fbee5a53	5
8765b39e-8b40-4100-9ed3-69f270ccecff	11
8765b39e-8b40-4100-9ed3-69f270ccecff	9
8765b39e-8b40-4100-9ed3-69f270ccecff	8
8765b39e-8b40-4100-9ed3-69f270ccecff	7
6aebef76-6605-4d33-9ba0-649dd9574261	9
43303113-d193-4a22-8ae2-d0474dce0a6f	3
e760d7bb-a053-4cae-a04c-8a47e2405b17	4
b6b4e561-4675-4cf8-801e-94baae050a4f	12
145d2485-801f-40ee-a795-28a93847b780	1
07236582-4c9e-438f-a20f-4a8931d15e23	9
bddaa94a-0114-4545-a19d-753c92fa31b2	7
bddaa94a-0114-4545-a19d-753c92fa31b2	4
df8e7cea-6a2f-4509-9604-83726c84d7e2	7
c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	1
cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	5
2b2af6c9-0174-4643-bc23-6b43a1ac3acf	2
2b2af6c9-0174-4643-bc23-6b43a1ac3acf	1
59707023-92fe-4cd1-8336-daf3d792adc3	1
4ba7ca55-1686-4158-a469-b9b3c787d400	11
4ba7ca55-1686-4158-a469-b9b3c787d400	2
46318cf6-b5fa-49e9-b872-4e14c9ff3805	7
46318cf6-b5fa-49e9-b872-4e14c9ff3805	4
074c499f-c4e5-47ab-9ef9-a732e63f827b	9
074c499f-c4e5-47ab-9ef9-a732e63f827b	7
074c499f-c4e5-47ab-9ef9-a732e63f827b	2
e504ad41-4f8a-4241-a045-6542f92d86b3	5
e504ad41-4f8a-4241-a045-6542f92d86b3	4
161af0e2-4004-45de-a0b1-2e13243e2621	2
6b4ba409-7484-4679-a654-680ffa1262d2	4
376c3f94-8227-4c9a-911c-1c20a84fc187	5
376c3f94-8227-4c9a-911c-1c20a84fc187	4
fa0b0c21-ae00-4032-98bd-f6728058c639	9
e7e5012a-15df-4747-8d79-acd95a978e60	2
15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	4
b4cfadcd-1314-4b2b-8eb8-064403e430b1	10
8754c711-e0c9-4440-b8c5-14605e9c1686	1
dd88e4f7-0b5a-4c9a-945b-62db254d6df5	9
42635a47-17d6-4d8d-9213-8b525c42f1a1	8
42635a47-17d6-4d8d-9213-8b525c42f1a1	5
e8862f4a-a677-4112-a197-184c365158ef	2
055c41e3-8b89-49ed-830f-b953f8d8f3f7	7
253308cc-ade3-4258-8f08-6d62a08d86de	12
0d44edf6-38a2-4310-9708-dad2886df46a	4
07a2bc96-9d6d-472f-842c-ed00817fe9b0	9
168bfbaf-e950-474e-bf4a-7a880294b564	11
168bfbaf-e950-474e-bf4a-7a880294b564	1
0b200580-eb6a-43d5-b59e-bf5d75bace7e	9
0b200580-eb6a-43d5-b59e-bf5d75bace7e	4
266c5043-630f-4e32-9f61-737989489c6f	4
7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	11
7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	7
cecbdec4-1ff3-4e7c-9bd3-a49f14570441	5
6436d0e4-9902-4d3a-86aa-9414196e2c99	2
6e50e2e4-9287-4ea8-82d5-837695929570	2
2f9bbed5-ef7c-4954-a637-fc91112f9c10	4
76438079-4579-4f01-a037-874d8cb1d599	9
2659d012-2599-4579-bd99-749106796ee0	5
2659d012-2599-4579-bd99-749106796ee0	3
0ba30bd5-f31b-491b-85df-5f32444ff9d6	8
0ba30bd5-f31b-491b-85df-5f32444ff9d6	1
b202ec8c-2a9d-42a6-a13b-696e9ba116e5	7
b202ec8c-2a9d-42a6-a13b-696e9ba116e5	4
c413da51-fd2a-44dd-bee4-fbc214bc58c8	9
c413da51-fd2a-44dd-bee4-fbc214bc58c8	7
49a69626-ca50-4650-8e9a-476fa8ab5c2d	7
2db015ae-b56e-4fe5-8613-480c49d15921	5
21b4dd7c-2739-4d48-a5b3-89511386cef7	4
daf87f3f-f68a-40b7-a90c-d097a594f8b6	5
bad17f81-1a2d-4dd8-bbc3-76d059e44acb	9
bad17f81-1a2d-4dd8-bbc3-76d059e44acb	5
bad17f81-1a2d-4dd8-bbc3-76d059e44acb	4
5969f2b8-73e9-434e-b79e-031f61f598cf	9
5969f2b8-73e9-434e-b79e-031f61f598cf	7
6b737cf0-ec65-42d7-9bd5-2159c5889e05	9
6b737cf0-ec65-42d7-9bd5-2159c5889e05	8
0c5964b4-2659-4db9-acc0-972c472c725e	2
6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	1
ee244f83-9853-49d8-b641-74724c0e1496	4
8e7afa05-c492-4426-b7d8-ee3b92d0cec6	1
c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	5
8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	2
23155572-b0cd-428e-8fd6-393d2bccdfa5	1
eaef97a9-bc49-4e0c-9d43-79a026808263	3
eaef97a9-bc49-4e0c-9d43-79a026808263	2
17138bd9-3f54-468f-874e-e589b39e6c01	7
90e31429-f7e6-42d3-bc19-c5958e9b4d2a	9
90e31429-f7e6-42d3-bc19-c5958e9b4d2a	4
90f34cab-a886-4db8-9267-3dc055e34cc7	9
0048fc62-9d18-4e28-9ee5-11187507e3db	11
0048fc62-9d18-4e28-9ee5-11187507e3db	2
0048fc62-9d18-4e28-9ee5-11187507e3db	1
a527699c-0929-4d07-adaa-5c322ddb7240	9
a527699c-0929-4d07-adaa-5c322ddb7240	8
b00e617d-8e60-4838-8e9e-ce59b9fccbbf	2
d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	5
e73a8b2c-f95b-4cff-9605-fecef53fce39	4
d7b79842-0726-445c-8ca1-8cda1552db06	8
d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	11
80dc0680-2884-4a61-858a-db21dd490378	5
e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	9
f6fd6661-73bf-4f18-a6b8-b6f8606abe72	7
f8b65108-8187-470b-be50-6044e6fe6c12	4
1590dc85-75d6-4662-a8c5-e4ca9e00708b	9
bd7364ae-c249-45b1-b840-ffefae1fc337	3
fcb9151e-dadb-4bc6-a928-1fa07338bc23	4
2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	8
6a582f59-a400-4c9d-8143-b3e6eb082230	2
8ca16545-dd00-48d8-bf87-aaf093851072	4
8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	8
8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	5
f03edd14-239b-4e70-a6c1-44d5da27960a	1
9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	9
5038dba5-1fcc-4a73-8639-6cfa75334633	4
73fa7ace-0190-4429-8c1e-cc8aedb56f9d	11
73fa7ace-0190-4429-8c1e-cc8aedb56f9d	9
73fa7ace-0190-4429-8c1e-cc8aedb56f9d	5
20510485-8901-4682-87e4-c49cf4d99c26	9
20510485-8901-4682-87e4-c49cf4d99c26	1
81d61817-dadd-452a-bfd7-229331ff34ba	11
6402e55b-e502-47eb-adaf-d662d33a96d5	4
29eb7ca2-7d27-457e-aa48-c266e040f5ca	12
c7b5a382-4165-4cc8-8de0-3f84a2283679	11
c7b5a382-4165-4cc8-8de0-3f84a2283679	2
bbe75fed-326d-414a-ba4b-132c65e35d52	12
14da454e-4996-4129-8432-e27cb1cf00c3	9
eb9d92e5-c125-4db0-9985-bc84f82bd357	11
eb9d92e5-c125-4db0-9985-bc84f82bd357	3
30f70e5f-30f6-496e-9a4f-7da1bf533416	11
fb577695-639b-4820-ae9e-7adb78288346	2
6cfb4386-5a43-4470-920c-62622c5fac22	8
6cfb4386-5a43-4470-920c-62622c5fac22	5
e3136214-550f-4058-9855-487bac6b4dc9	2
96c250ce-8755-4275-964f-06e67bd12966	9
91d56b0c-114c-48c0-864c-2b22548f68ba	8
91d56b0c-114c-48c0-864c-2b22548f68ba	2
a2ca2e8a-f029-4981-9d83-4d10bb8145dc	5
b9efa02f-0969-4802-95c0-8d587d84a468	2
b3e7f06e-5ca2-42ae-af66-7989d3f004b6	9
3cb41358-d613-4e72-a9da-730ceb6dca91	2
c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	11
c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	3
5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	7
5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	4
0448146e-fac5-4cef-b010-37e819542b89	9
0448146e-fac5-4cef-b010-37e819542b89	7
e25d43d7-1ce8-4aec-bf25-d4a369b8befb	9
e25d43d7-1ce8-4aec-bf25-d4a369b8befb	6
59be806c-5aa4-4eb5-a130-e74f06dc486b	7
368c76e7-957b-4495-a7a4-bfbb98eb3cca	4
2f4b98ce-7dad-4843-b76a-130e62d8635d	7
dfa4ab04-3fd9-4439-a616-adfb76600112	4
94673a27-2762-485e-bdba-62b21956622c	9
94673a27-2762-485e-bdba-62b21956622c	7
ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	8
50ea9d2a-5293-4466-a807-77daba03dc47	9
50ea9d2a-5293-4466-a807-77daba03dc47	8
15162537-f2c5-42df-981a-42e97fa6dfc2	2
249cb45e-b334-45c0-9624-e354e685a7ce	5
237c95a3-f446-44d1-b4b2-5b2dcd678db1	9
237c95a3-f446-44d1-b4b2-5b2dcd678db1	2
68d7dea2-b7b1-4416-8c40-ce6260668110	4
8da5755b-2a1d-41a0-b43c-c427c063748b	9
8da5755b-2a1d-41a0-b43c-c427c063748b	8
0ce2cf9a-1de1-4018-860c-790a286728ed	9
1edb1519-3ce7-4697-a27a-e495d69a02ca	4
d4595adf-9bb6-4939-bd0d-6419c58698bc	5
d09941cf-67f9-420d-bd40-4ecd9f8b6896	8
d09941cf-67f9-420d-bd40-4ecd9f8b6896	5
69aa774b-9a1d-4cbe-a08e-56b36129ed62	4
305ee8f2-4436-439b-b727-8d2bd0e2bc80	7
305ee8f2-4436-439b-b727-8d2bd0e2bc80	4
2667ba62-fc35-4793-8cc0-f94c02985460	8
8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	4
2e982a82-e9c1-497a-860a-fea6816c7220	8
2e982a82-e9c1-497a-860a-fea6816c7220	1
5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	8
51802256-84a5-490f-bca8-62796ea49a68	4
719f6e37-2b19-4771-b1fc-1ddf5a903329	5
719f6e37-2b19-4771-b1fc-1ddf5a903329	1
5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	8
4ad466de-c926-43b6-88c6-d2578d8fc4fc	5
4ad466de-c926-43b6-88c6-d2578d8fc4fc	4
8398637b-b892-4659-b018-9750954d46b1	8
1a6d4bd9-026a-4e21-821c-1eafd60695b7	8
bb6e160f-f95c-4410-995d-577d29c98329	8
bb6e160f-f95c-4410-995d-577d29c98329	4
edac60c8-d2f2-497d-8d82-c46f1368fe83	8
122ac324-09f9-419a-9e4e-c96b56bf183a	3
c215ba8c-7f03-4623-8a29-1271ca7b0c79	4
ca21de48-a73d-4782-bb97-69324102a4c8	2
655200b4-a668-4070-acb5-6d9c2942db5e	9
5a965921-82fe-436d-bfcd-30bbb52ed79b	8
da0c024c-eee2-42a0-ba36-2e31cd731628	9
da0c024c-eee2-42a0-ba36-2e31cd731628	7
4afea674-e0f3-4cc2-8024-5715b8a69434	5
cf50eaa5-de41-45a4-ada1-17e44e4b5014	9
774b76f8-c9a4-4068-b867-99c2dfb7ecd5	8
b5911913-b139-4fdc-a8dc-d03750a50dde	8
dfcc5151-1112-49de-a315-6ad9a67bce7b	8
c7402c75-4217-4ec9-8306-fdb7c7e9523a	4
7e2e1772-b309-424a-bc6f-7ee8f23645f1	4
140b724b-16a5-420d-8516-72722fb10576	7
cda65b3a-0236-4317-b536-3242206a7a7e	4
2854b823-2730-429e-9d1a-264aa62a26aa	8
90589d5d-d15f-4d1a-bf60-1b251ae2eccf	4
e02bb639-fb42-4ea3-af02-5cc845b7c2b1	4
567c7e60-e599-4126-a07d-7bb809097a28	4
6dc92a3e-5379-4b7d-a066-f96ec1a91f78	8
402c7b8e-ff3b-4655-b542-2618c25e11b1	4
00ad0764-de3b-44d4-a292-5c14ec998950	4
6e37deb6-881d-403a-9e8e-f553f0d2fe28	8
0430cdf6-41b3-4855-881d-b50280bb21a7	8
6a46bc77-4db4-44f7-908f-278c19ce5395	4
895ae354-7138-4797-bd0c-91f45dc927e0	7
b20f70d8-8103-4562-a31c-2620c9da4226	4
b822df53-4594-4f0d-941a-794786bb93ae	8
8abe77b7-3d5e-4d2c-8d88-1c838223030b	7
17864784-730c-423e-a290-d8fc76f75049	8
23b8fa1e-dd26-434f-b714-00c80284a124	4
2a0953da-fdd5-46ff-9b38-b30d95b1c447	8
ad615693-356c-41ca-874d-deb2e2536afc	7
ad615693-356c-41ca-874d-deb2e2536afc	4
d572bcc1-bc14-4b7e-85ec-91862be987fb	4
de810d24-1e70-45cc-9e77-ea92552a1bbb	9
8d995d38-ca67-41df-b0c9-6e2d7004e7f2	7
4dc46c8b-6173-44db-80f6-ffb320bd2df0	9
997894ec-b392-4a31-82ad-6e0dd15dfea3	6
d51bddd7-d291-4bc9-9737-d10705397a4c	8
d51bddd7-d291-4bc9-9737-d10705397a4c	1
210231d9-7b86-4676-b0bb-d9f6655f2ab4	9
b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	8
b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	5
8db347b3-463e-4385-8050-eb8ab1eecea2	8
8db347b3-463e-4385-8050-eb8ab1eecea2	3
15b276d6-191f-4f11-8395-a33880c16c19	8
50c91d35-debe-4573-aa62-3a09634787db	9
7f99b900-07fd-4acf-99e0-839abecb8e52	7
6e4ccbbd-761d-4db5-b644-c191e667a6ef	8
6e4ccbbd-761d-4db5-b644-c191e667a6ef	1
7581432f-17ec-4a91-81f2-7a25f898fe11	4
43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	7
1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	9
1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	7
2c347c52-ea8a-48d3-ac24-7b964bac4e72	9
761dde46-f86f-492b-9438-67f04e870b9e	8
761dde46-f86f-492b-9438-67f04e870b9e	4
3e0ee6bc-913e-4a2b-8de4-830412ad0795	8
b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	9
b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	4
3f4ee561-7cb3-4a61-b035-ed343f0ea81e	4
5dfc4e8e-d75a-4db3-8479-9b0c41046f27	3
1f32ec15-46bc-4eaf-bb88-db4906fd095e	4
18a83d57-fd7d-4612-821f-1f0e59dc38ec	4
64f798f6-bec0-4331-912c-49b505ca78fe	4
ccfd600a-c461-4b5a-80fe-12db84877546	9
ccfd600a-c461-4b5a-80fe-12db84877546	4
b8b40a89-dff0-483d-8e47-40a11afff475	8
a1e89470-e247-4c3a-8227-bf9c3d8d7d50	8
5bf309eb-632c-4c84-b1d7-31b558630477	9
e65a7285-b369-4fe8-b0d4-80a5413f2c58	9
e65a7285-b369-4fe8-b0d4-80a5413f2c58	8
\.


--
-- Data for Name: QuestionOption; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."QuestionOption" (id, "groupId", label, "order", locale) FROM stdin;
44671804-99e6-457d-bd1e-df17b488224e	b24781f7-d736-4abf-8faa-7d33b59e8a10	Yes	1	en_US
ded075bf-1c65-4ce1-ba1e-5d167e18c890	b24781f7-d736-4abf-8faa-7d33b59e8a10	No	2	en_US
beea7b50-79ce-45d2-ab35-82d81eee7a59	b24781f7-d736-4abf-8faa-7d33b59e8a10	I don't know	3	en_US
16733d2f-94eb-458d-822b-f4396b8624c0	b24781f7-d736-4abf-8faa-7d33b59e8a10	Oui	1	fr_FR
ad19eade-7dd3-41b9-9444-4844fdae7a21	b24781f7-d736-4abf-8faa-7d33b59e8a10	Non	2	fr_FR
902a86df-1dc8-4d2d-95bb-9cd1ca84ac4f	b24781f7-d736-4abf-8faa-7d33b59e8a10	Je ne sais pas	3	fr_FR
5e1e468c-39b1-4620-b823-37aa9144742d	bc608ac8-bb77-4b23-ab46-159904eb81ae	Yes	1	en_US
b91df7a4-0ff8-4269-97c1-120386445624	bc608ac8-bb77-4b23-ab46-159904eb81ae	No	2	en_US
911ffb54-45bd-41ae-b89a-75957b841cec	bc608ac8-bb77-4b23-ab46-159904eb81ae	I don't know	3	en_US
eae49178-f720-4614-bd8e-fdb4d49f4462	bc608ac8-bb77-4b23-ab46-159904eb81ae	Oui	1	fr_FR
84e3876a-6fe9-4fbf-96e5-73e6b46e3925	bc608ac8-bb77-4b23-ab46-159904eb81ae	Non	2	fr_FR
c3af6b12-f635-443e-b036-c00f408b2408	bc608ac8-bb77-4b23-ab46-159904eb81ae	Je ne sais pas	3	fr_FR
94524f21-6af2-421d-a3ce-f4ed1736ddaa	0b145c11-7769-4478-b41b-46cb17c41515	Yes	1	en_US
a373a854-2203-4699-8154-a922c5cb1136	0b145c11-7769-4478-b41b-46cb17c41515	No	2	en_US
7e3a66a6-982e-4833-a47f-760815da0f38	0b145c11-7769-4478-b41b-46cb17c41515	I don't know	3	en_US
ac426bb9-f839-4bfe-9307-63f450b2bc15	0b145c11-7769-4478-b41b-46cb17c41515	Oui	1	fr_FR
35b9fe30-0d99-474f-93ce-78f1c18a2b74	0b145c11-7769-4478-b41b-46cb17c41515	Non	2	fr_FR
85c49b75-307e-41f3-9a60-bfc1ebc5b93c	0b145c11-7769-4478-b41b-46cb17c41515	Je ne sais pas	3	fr_FR
5f79627e-23f1-4743-945c-9c169248fbcc	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	Yes	1	en_US
49181d44-ba8b-4b0e-9592-c543c936bdec	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	No	2	en_US
759f7198-fbf8-4535-8a50-0ab7541d61dd	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	I don't know	3	en_US
f54855c8-0ad7-41c1-a1ff-182403c9175f	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	Oui	1	fr_FR
81d9759c-5de7-4d2d-9ddf-00a19e0d8a2b	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	Non	2	fr_FR
b2ed4c0a-f702-4d9f-9fe5-1b6989543831	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	Je ne sais pas	3	fr_FR
cdc949eb-8fd4-4e0e-aa94-d6071477ad15	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	Yes	1	en_US
e0a2da2a-7736-4b1c-a242-c6976a7f759f	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	No	2	en_US
0f9a01be-b0ad-43c4-ad1d-1c0dccd56b15	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	I don't know	3	en_US
1d25f547-8044-4d19-9a54-6339b9e1a46c	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	Oui	1	fr_FR
0c8b6146-4aff-47ea-8eb4-a937ffff95d7	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	Non	2	fr_FR
29bc2ff1-30e0-45c1-a069-c265fd454088	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	Je ne sais pas	3	fr_FR
d7f03465-1bcd-4207-a338-70e8f96fb540	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	Yes	1	en_US
62787bca-2724-43c4-b399-2918a0d995ac	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	No	2	en_US
a2223d9a-c966-4c4a-b64f-c60c9b601307	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	I don't know	3	en_US
ce632c78-813e-4238-a842-ef9b3f8173b8	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	Oui	1	fr_FR
efcf0879-afa8-4d0e-bb77-bcdb78163781	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	Non	2	fr_FR
486b9c3a-f706-4366-8f1f-ece319feff7f	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	Je ne sais pas	3	fr_FR
90878536-bdad-4339-ab3e-e470c9cb5d2c	cb526383-921f-4360-bbca-c73e8b3e3033	Yes	1	en_US
734ab4e6-c2d7-425d-a3a1-3d90cf334e03	cb526383-921f-4360-bbca-c73e8b3e3033	No	2	en_US
cb5e3a60-6fe9-4e9e-93ec-a7a782886b93	cb526383-921f-4360-bbca-c73e8b3e3033	I don't know	3	en_US
9e1ef5c8-8dc6-4ccc-b762-dad7100400ab	cb526383-921f-4360-bbca-c73e8b3e3033	Oui	1	fr_FR
9b6db420-cbe1-4de5-8c99-812ca2e04448	cb526383-921f-4360-bbca-c73e8b3e3033	Non	2	fr_FR
e40c222b-70d1-4ae1-a19c-3b35c67ca767	cb526383-921f-4360-bbca-c73e8b3e3033	Je ne sais pas	3	fr_FR
5e09a807-54cc-42cb-ac84-0ad931115ed8	6c33684b-038b-4753-8978-04001c98b8d5	Yes	1	en_US
9a2213aa-e10a-4ffc-9d4b-fab97743e68c	6c33684b-038b-4753-8978-04001c98b8d5	No	2	en_US
f94d10ae-6535-4e96-97e2-25039def522b	6c33684b-038b-4753-8978-04001c98b8d5	I don't know	3	en_US
37c43753-22e6-4f25-a1d5-d418e6bffe9a	6c33684b-038b-4753-8978-04001c98b8d5	Oui	1	fr_FR
e4fbc619-47b8-4158-bb38-6dce9a7dc030	6c33684b-038b-4753-8978-04001c98b8d5	Non	2	fr_FR
5c7fe5cb-356d-481c-a1d5-933f13734076	6c33684b-038b-4753-8978-04001c98b8d5	Je ne sais pas	3	fr_FR
30e2ef6c-ce69-4263-b9de-be2750b99e75	52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	Yes	1	en_US
48012cc3-6c92-41bf-849e-27d02a311ef9	52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	No	2	en_US
61fe88c6-622e-43e6-9e4e-f8ee1cfe2918	52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	I don't know	3	en_US
0412b426-2983-45c3-9331-21ec8c56f085	52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	Oui	1	fr_FR
ebc0dafd-2291-410a-8c34-a47e7228ecf3	52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	Non	2	fr_FR
2b996456-7814-4a86-a1e0-d5025c72a160	52f743ed-d45f-4aaa-89cc-adbe13f7dc3b	Je ne sais pas	3	fr_FR
a7bfeba1-0713-4e11-9e01-bf101aa6a406	32c52d73-9868-473c-b0d2-ee7d526c8a81	Yes	1	en_US
3c270107-39f1-46ee-a1cf-49ef47420aba	32c52d73-9868-473c-b0d2-ee7d526c8a81	No	2	en_US
4d1e45e2-191d-491b-aa53-994ef0a1d1fb	32c52d73-9868-473c-b0d2-ee7d526c8a81	I don't know	3	en_US
0b24f931-a463-42eb-9600-a02f07d05a70	32c52d73-9868-473c-b0d2-ee7d526c8a81	Oui	1	fr_FR
8af8288f-7fdc-40a4-9b41-d2914ddd3eb9	32c52d73-9868-473c-b0d2-ee7d526c8a81	Non	2	fr_FR
0287920f-979f-43a7-ad07-488736982d55	32c52d73-9868-473c-b0d2-ee7d526c8a81	Je ne sais pas	3	fr_FR
b9503edd-6528-41b6-9eac-d0aa427e5b5e	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	Yes	1	en_US
739e3836-b49b-4f79-926c-77ecfc1da26a	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	No	2	en_US
bed4678b-5bf2-47e3-a7c5-d62c10908c82	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	I don't know	3	en_US
43f28488-c90e-4fbb-858f-8bdc8694a992	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	Oui	1	fr_FR
b3b631f6-3b52-414c-823f-94f2c8ed5696	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	Non	2	fr_FR
17811297-2e6a-4e64-ae46-2e34003f1d01	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	Je ne sais pas	3	fr_FR
ff0caa7c-9781-4f12-bf39-b22220d49021	06a7e629-237c-455a-a361-ec6203ea9234	Yes	1	en_US
e00acc1e-14ab-4996-bccd-9e846bf3a602	06a7e629-237c-455a-a361-ec6203ea9234	No	2	en_US
bff2c1d9-92f0-4770-a29f-f33e83f4f15d	06a7e629-237c-455a-a361-ec6203ea9234	I don't know	3	en_US
2ceee1c2-527a-490c-ae85-75d64832d246	06a7e629-237c-455a-a361-ec6203ea9234	Oui	1	fr_FR
545709e3-3482-454d-962b-ff4268b03c29	06a7e629-237c-455a-a361-ec6203ea9234	Non	2	fr_FR
60e6312e-0051-4a70-894a-4cb86655a950	06a7e629-237c-455a-a361-ec6203ea9234	Je ne sais pas	3	fr_FR
8434984d-535d-4732-ab05-b2e053481c9d	e260af83-cf26-4fdd-b057-880d554eebde	Yes	1	en_US
a4c06222-dcca-46c0-b9f5-6b055f63315b	e260af83-cf26-4fdd-b057-880d554eebde	No	2	en_US
3f4be8cd-37b8-4bd2-9fa9-645c0e765c8d	e260af83-cf26-4fdd-b057-880d554eebde	I don't know	3	en_US
69323433-80c6-44c2-b801-563e575f750a	e260af83-cf26-4fdd-b057-880d554eebde	Oui	1	fr_FR
7d5b2b23-b649-42a8-bd19-9d67a3965a03	e260af83-cf26-4fdd-b057-880d554eebde	Non	2	fr_FR
38da0b12-5371-4b8d-8657-d346594afc22	e260af83-cf26-4fdd-b057-880d554eebde	Je ne sais pas	3	fr_FR
4677990f-43a5-4fb7-8d65-d3ca3e3ac520	b49f8a1d-4509-4b6c-884f-9a65cac45dcb	Yes	1	en_US
f1ef24bb-103b-480a-8180-614fa21ae256	b49f8a1d-4509-4b6c-884f-9a65cac45dcb	No	2	en_US
4f407d73-d282-4d50-a23d-b5de734bc2f4	b49f8a1d-4509-4b6c-884f-9a65cac45dcb	I don't know	3	en_US
34236b2d-cf0f-470f-ad6e-ea707eebdaf5	b49f8a1d-4509-4b6c-884f-9a65cac45dcb	Oui	1	fr_FR
72da5df8-178b-4703-a650-1700f5473335	b49f8a1d-4509-4b6c-884f-9a65cac45dcb	Non	2	fr_FR
dc6bf59c-4984-4980-8129-30598c259c47	b49f8a1d-4509-4b6c-884f-9a65cac45dcb	Je ne sais pas	3	fr_FR
9c446e89-fa06-40d1-a0bd-e4f008d4ef60	722b8cdb-281a-4797-ab32-32d089dae310	Yes	1	en_US
4eed9e50-e012-42c4-acd1-9d85ba4fde8a	722b8cdb-281a-4797-ab32-32d089dae310	No	2	en_US
7ace7936-1f2e-4638-b27b-61933dc30c98	722b8cdb-281a-4797-ab32-32d089dae310	I don't know	3	en_US
040b7366-c989-4beb-997f-24a70d55abf1	722b8cdb-281a-4797-ab32-32d089dae310	Oui	1	fr_FR
93301d13-50fd-4ffc-ad7d-eee4d3d39b56	722b8cdb-281a-4797-ab32-32d089dae310	Non	2	fr_FR
2d95273c-eb78-45de-a5a2-f76ab024cd3a	722b8cdb-281a-4797-ab32-32d089dae310	Je ne sais pas	3	fr_FR
580437e2-f9cc-488c-a566-7421bdce87d2	09847df2-36f8-4b53-99af-48974fb53dcf	Yes	1	en_US
f1c61a47-46a9-44a9-b5a8-6fe0548a86a2	09847df2-36f8-4b53-99af-48974fb53dcf	No	2	en_US
a13d71bb-a0b9-4e48-a4aa-174cd0d01bd5	09847df2-36f8-4b53-99af-48974fb53dcf	I don't know	3	en_US
3dd579fb-1c29-43d9-b085-c5bed67f4a22	09847df2-36f8-4b53-99af-48974fb53dcf	Oui	1	fr_FR
fa1e571f-0613-4bb3-a93b-01e892923cc9	09847df2-36f8-4b53-99af-48974fb53dcf	Non	2	fr_FR
55a77f14-27f6-41b5-b32d-02c9b15226e0	09847df2-36f8-4b53-99af-48974fb53dcf	Je ne sais pas	3	fr_FR
988303f6-a641-4ccc-9aef-e07e86b3d7c3	d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	Yes	1	en_US
34e8fe47-5b46-4e28-99b0-f9057e34de77	d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	No	2	en_US
5f52f7d3-7208-45d1-ad4c-ddbe0b518c74	d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	I don't know	3	en_US
027038d3-18e2-42a2-a2e0-604d853575ed	d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	Oui	1	fr_FR
8b7d8be7-f78b-4740-88ed-5ff212e099ec	d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	Non	2	fr_FR
79179841-1caf-48aa-a663-4faa357ac787	d3880e73-0e13-4bb3-9bcc-1f8d6ded6f58	Je ne sais pas	3	fr_FR
9aec6a99-b26c-47e5-87b1-b1c4db51476a	cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	Yes	1	en_US
d0fe6a77-1889-4d0b-a873-c220a6b3ab08	cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	No	2	en_US
26fb381c-cd05-4313-9ea2-ef7f69d812d8	cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	I don't know	3	en_US
47ef9e80-0582-450e-957a-a264462aad7e	cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	Oui	1	fr_FR
ac4b38c1-5b5c-429b-b565-4b85e9ba2fd5	cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	Non	2	fr_FR
9adde545-4832-47cb-9fe6-3cf45aa5a71d	cd9a6cfe-b197-4f6e-a2b0-2ba003077b1d	Je ne sais pas	3	fr_FR
cddd3d5f-dec2-48f8-be36-d371426c4b50	15752b7a-b58c-4e8c-a95e-1776b1abd57c	Yes	1	en_US
efd2d2e1-91cb-4657-a97c-d8c2a5afe737	15752b7a-b58c-4e8c-a95e-1776b1abd57c	No	2	en_US
974f3ab9-5df3-4d48-b85f-17446deb99b9	15752b7a-b58c-4e8c-a95e-1776b1abd57c	I don't know	3	en_US
217c3754-ff9e-47c0-b922-4f48eac9e4e7	15752b7a-b58c-4e8c-a95e-1776b1abd57c	Oui	1	fr_FR
7a49552b-1def-4954-9a47-f72bb0e0aa07	15752b7a-b58c-4e8c-a95e-1776b1abd57c	Non	2	fr_FR
51e6c994-fb88-486f-b439-32dc75c0b463	15752b7a-b58c-4e8c-a95e-1776b1abd57c	Je ne sais pas	3	fr_FR
b958960d-c230-4d1a-929d-c0b147ed1587	f66fd69e-fbeb-443b-a021-c298e513a6f8	Yes	1	en_US
3c4c7018-e537-4044-99b6-25327e959b9b	f66fd69e-fbeb-443b-a021-c298e513a6f8	No	2	en_US
bf6df5c0-447c-414c-8757-d8661be33716	f66fd69e-fbeb-443b-a021-c298e513a6f8	I don't know	3	en_US
b9faac21-0bda-4007-9c8b-3419e7195755	f66fd69e-fbeb-443b-a021-c298e513a6f8	Oui	1	fr_FR
985b5d95-6c28-47d6-b45e-ed66a85c2d76	f66fd69e-fbeb-443b-a021-c298e513a6f8	Non	2	fr_FR
b98a58f6-e8cf-491d-b9ae-dfb72361e485	f66fd69e-fbeb-443b-a021-c298e513a6f8	Je ne sais pas	3	fr_FR
581f150f-9cce-419b-bfaf-4dd0a3f652d0	2480c44e-c2bf-434b-a447-8217584b25c3	Yes	1	en_US
8d12f552-39c5-4d4c-b1fd-618fdf73142d	2480c44e-c2bf-434b-a447-8217584b25c3	No	2	en_US
86ab4644-3f48-460d-bc98-27b5a0aa05be	2480c44e-c2bf-434b-a447-8217584b25c3	I don't know	3	en_US
18841a82-4a8b-4797-aa4d-facc09e5fd72	2480c44e-c2bf-434b-a447-8217584b25c3	Oui	1	fr_FR
ea963629-f3ec-48c3-9177-d006a48408a1	2480c44e-c2bf-434b-a447-8217584b25c3	Non	2	fr_FR
8b94c534-c230-49a4-8cd9-063b2c4c18a7	2480c44e-c2bf-434b-a447-8217584b25c3	Je ne sais pas	3	fr_FR
430008a8-059b-4e3e-b061-7ab24bce6844	05e41b42-81d8-473f-a63e-7326ff72ed9f	Yes	1	en_US
978ff371-a3b9-44fd-8127-c23d376546ec	05e41b42-81d8-473f-a63e-7326ff72ed9f	No	2	en_US
4b544c98-1ea7-46cf-9db6-d0cdd2871f4b	05e41b42-81d8-473f-a63e-7326ff72ed9f	I don't know	3	en_US
374aa508-5ebc-49a0-bce3-2309e43a3bc6	05e41b42-81d8-473f-a63e-7326ff72ed9f	Oui	1	fr_FR
b82125f1-aaf1-4fd1-ad5d-01bfda16992a	05e41b42-81d8-473f-a63e-7326ff72ed9f	Non	2	fr_FR
deef6287-5612-4a3b-a798-999ef9de2fd6	05e41b42-81d8-473f-a63e-7326ff72ed9f	Je ne sais pas	3	fr_FR
320dc711-3132-45b0-957c-e3c90346701e	4aabf8df-2528-455f-ab2e-d0896dcd8687	Yes	1	en_US
dfaab4c0-d1cc-4a89-935f-c9a6ed02723e	4aabf8df-2528-455f-ab2e-d0896dcd8687	No	2	en_US
c0a8658f-b903-4a87-a36a-617c7ec8ebd2	4aabf8df-2528-455f-ab2e-d0896dcd8687	I don't know	3	en_US
e29699c8-b778-474e-850c-0e85d7207a20	4aabf8df-2528-455f-ab2e-d0896dcd8687	Oui	1	fr_FR
a72c0001-4bb0-4fb2-b9fd-7a6c3ce00b23	4aabf8df-2528-455f-ab2e-d0896dcd8687	Non	2	fr_FR
c8b3655d-de74-4058-8cbe-c1dbb8728120	4aabf8df-2528-455f-ab2e-d0896dcd8687	Je ne sais pas	3	fr_FR
8307144b-144c-4ee4-9762-6214c1b13492	4adf2538-72ec-40a1-8ac2-aa0522918bce	Yes	1	en_US
3a446395-c517-4f68-88d6-3caa763f9c49	4adf2538-72ec-40a1-8ac2-aa0522918bce	No	2	en_US
0ed4fe92-26d8-4630-a790-b6fa43032e19	4adf2538-72ec-40a1-8ac2-aa0522918bce	I don't know	3	en_US
e0abcc5f-8d50-47df-9378-d25e8e8b960d	4adf2538-72ec-40a1-8ac2-aa0522918bce	Oui	1	fr_FR
8c90af62-1e1b-460e-b5ae-81a612a6485c	4adf2538-72ec-40a1-8ac2-aa0522918bce	Non	2	fr_FR
222c78ed-0d34-43d3-82e5-50b1aaef31c2	4adf2538-72ec-40a1-8ac2-aa0522918bce	Je ne sais pas	3	fr_FR
0522ec86-dc60-4019-b254-49312856511c	ee6d9a0a-ef03-4b19-862e-1bc8544acc40	Yes	1	en_US
15bc1563-0736-4ea8-a163-989785b378b0	ee6d9a0a-ef03-4b19-862e-1bc8544acc40	No	2	en_US
184d6b43-41ab-4cb7-91c9-2d05e6c5fbdc	ee6d9a0a-ef03-4b19-862e-1bc8544acc40	I don't know	3	en_US
7faea308-075d-447d-948c-fbd7569e77ce	ee6d9a0a-ef03-4b19-862e-1bc8544acc40	Oui	1	fr_FR
ea05cdc9-d771-47cf-8ff4-67078dd2231c	ee6d9a0a-ef03-4b19-862e-1bc8544acc40	Non	2	fr_FR
8c891e22-b90c-48d3-997a-1e9e47a8a115	ee6d9a0a-ef03-4b19-862e-1bc8544acc40	Je ne sais pas	3	fr_FR
3bb98f5f-607e-40df-a198-fec1bfaadddb	17710c4a-ceea-4f99-8e8a-9ea7be68df69	Yes	1	en_US
d4090997-5af4-4bda-b528-f7cf8508c830	17710c4a-ceea-4f99-8e8a-9ea7be68df69	No	2	en_US
236d99b2-a59a-4d68-991f-cd0af5e62d7a	17710c4a-ceea-4f99-8e8a-9ea7be68df69	I don't know	3	en_US
bb37ed16-f94e-427c-b92d-b3c106da1e74	17710c4a-ceea-4f99-8e8a-9ea7be68df69	Oui	1	fr_FR
69977e0b-e33a-4417-ad47-dcd6938308ff	17710c4a-ceea-4f99-8e8a-9ea7be68df69	Non	2	fr_FR
b0abed5b-0ee2-4560-a2c9-d394c98bca07	17710c4a-ceea-4f99-8e8a-9ea7be68df69	Je ne sais pas	3	fr_FR
efdd8d83-106a-4104-bb15-c0bf71114288	061834a0-1650-41a8-a8c6-4f4c8cb6831f	Yes	1	en_US
c3898ab9-10af-4620-acaa-c61c7b20a52d	061834a0-1650-41a8-a8c6-4f4c8cb6831f	No	2	en_US
2f304f10-b389-4442-8a43-5ea9ec64bbcc	061834a0-1650-41a8-a8c6-4f4c8cb6831f	I don't know	3	en_US
5caf024d-7037-439c-97ff-c1d9c95e7b89	061834a0-1650-41a8-a8c6-4f4c8cb6831f	Oui	1	fr_FR
aabcacdf-6024-4090-b2c5-03048a677c3a	061834a0-1650-41a8-a8c6-4f4c8cb6831f	Non	2	fr_FR
9921b12f-b88a-433b-b7d7-e4f863c148eb	061834a0-1650-41a8-a8c6-4f4c8cb6831f	Je ne sais pas	3	fr_FR
c32888bc-237c-433c-a443-5c03c6f69d25	7e1633f0-2688-488f-b8e2-9672b31ea37e	Yes	1	en_US
a9b24d53-c48d-43e9-a102-29d71263e82c	7e1633f0-2688-488f-b8e2-9672b31ea37e	No	2	en_US
3eca807b-ae2b-435a-9a35-fb4aa02c099d	7e1633f0-2688-488f-b8e2-9672b31ea37e	I don't know	3	en_US
b66d5b03-7b5a-440c-b8a9-6ef5b834f4af	7e1633f0-2688-488f-b8e2-9672b31ea37e	Oui	1	fr_FR
9d426046-8992-423a-9328-d0271eedd948	7e1633f0-2688-488f-b8e2-9672b31ea37e	Non	2	fr_FR
14240b93-3313-4c85-a8bb-2157e221551d	7e1633f0-2688-488f-b8e2-9672b31ea37e	Je ne sais pas	3	fr_FR
e2843d08-dc75-4f87-90ce-54103440ae75	97553132-efe4-436a-8463-55773a02c6ae	Yes	1	en_US
139cde4d-7658-449d-a10c-4e42a7b7a9ce	97553132-efe4-436a-8463-55773a02c6ae	No	2	en_US
02e2e65f-d2dc-470a-bafe-8569ed1394ac	97553132-efe4-436a-8463-55773a02c6ae	I don't know	3	en_US
ac5ad369-650e-457c-9a23-35026cb59365	97553132-efe4-436a-8463-55773a02c6ae	Oui	1	fr_FR
d9a16cda-1a5d-49f8-b1ba-9fc78647dd4b	97553132-efe4-436a-8463-55773a02c6ae	Non	2	fr_FR
4918ed92-256a-4647-a6e6-2a92b05ddd51	97553132-efe4-436a-8463-55773a02c6ae	Je ne sais pas	3	fr_FR
8f8ac705-b2ee-4e59-aa78-7f1c8607c333	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	Yes	1	en_US
a65f47d8-b9ff-4eb5-b7d1-7f2ab73d32ba	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	No	2	en_US
ebfaa92c-655e-4338-b261-f48829738c4a	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	I don't know	3	en_US
026baa0b-98fc-4608-b025-7ef46f2463cd	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	Oui	1	fr_FR
8aa116de-5b7a-47c8-a478-a76658983181	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	Non	2	fr_FR
56a22e6b-e520-456f-bee5-914cb404483e	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	Je ne sais pas	3	fr_FR
918e4757-5801-43f0-bd00-22f4517e310c	5442e950-bbfb-4c60-a047-3a21057e2a13	Yes	1	en_US
49871228-dd80-4c41-ad0a-ffd5c7924c71	5442e950-bbfb-4c60-a047-3a21057e2a13	No	2	en_US
1a976b29-1a73-47c9-9930-f263b2432ec8	5442e950-bbfb-4c60-a047-3a21057e2a13	I don't know	3	en_US
9f728d4e-72ff-4a0b-b817-132611120451	5442e950-bbfb-4c60-a047-3a21057e2a13	Oui	1	fr_FR
74824334-3776-4c7b-8c44-5b77d051bfd2	5442e950-bbfb-4c60-a047-3a21057e2a13	Non	2	fr_FR
7eb8baea-8a7c-4b4e-aafd-858495377e79	5442e950-bbfb-4c60-a047-3a21057e2a13	Je ne sais pas	3	fr_FR
f323aa99-6788-49ac-9c85-e8e47dfc1f91	a2057581-a0ce-49ca-b4a2-95fe17562b65	Yes	1	en_US
639c98a6-91a4-449f-aafe-801857afc7e3	a2057581-a0ce-49ca-b4a2-95fe17562b65	No	2	en_US
28f70d81-8a81-411f-9ae2-cdc5486d4002	a2057581-a0ce-49ca-b4a2-95fe17562b65	I don't know	3	en_US
54659bc5-0149-4988-9ec3-e7834717bbf2	a2057581-a0ce-49ca-b4a2-95fe17562b65	Oui	1	fr_FR
f69efff8-f5b6-4fdf-983b-56a831cb6a28	a2057581-a0ce-49ca-b4a2-95fe17562b65	Non	2	fr_FR
c8d99fd4-b0a1-445c-9cd6-f42e8b46a454	a2057581-a0ce-49ca-b4a2-95fe17562b65	Je ne sais pas	3	fr_FR
9c46b615-7aa0-4ff6-a132-ba01eca279cc	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	Yes	1	en_US
e8fe2ce3-c824-4647-b9af-c54992dd36a1	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	No	2	en_US
b87e33e1-9fb7-4a2d-9706-930552d8baeb	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	I don't know	3	en_US
a358f6fa-98cf-43a0-863d-96ae21de4cf8	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	Oui	1	fr_FR
92d7c921-91a0-4cbc-8bc4-1a91945280a2	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	Non	2	fr_FR
4ca72a71-85a0-4b59-8930-543ab41e3d86	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	Je ne sais pas	3	fr_FR
9a2333ad-bc9a-466a-8741-667d53da55dc	d1716ea4-7264-434a-9a81-2c7229d41454	Yes	1	en_US
e72fa4c6-ded1-4e19-b176-068947f345cd	d1716ea4-7264-434a-9a81-2c7229d41454	No	2	en_US
d8e86e9e-96e6-423f-aebe-5e52074a9766	d1716ea4-7264-434a-9a81-2c7229d41454	I don't know	3	en_US
ddb7f48b-b1fc-4e12-af8b-33a3ea764c03	d1716ea4-7264-434a-9a81-2c7229d41454	Oui	1	fr_FR
8b18faa3-164c-4995-b9d2-dc991c54b50c	d1716ea4-7264-434a-9a81-2c7229d41454	Non	2	fr_FR
e435100c-279c-4781-9ffc-1a935b557f58	d1716ea4-7264-434a-9a81-2c7229d41454	Je ne sais pas	3	fr_FR
8684bcd8-bfe5-47ad-b67e-6363ed8801d3	0241015c-e821-43e3-a1b0-2aa3456107b9	Yes	1	en_US
7a8f0e56-dfcf-4ad7-a9da-f710e7be4d9c	0241015c-e821-43e3-a1b0-2aa3456107b9	No	2	en_US
f59821b3-dd9f-48c9-80b5-2b7c278822c9	0241015c-e821-43e3-a1b0-2aa3456107b9	I don't know	3	en_US
52b00528-f225-4cb6-9f65-06f15b8e2e8d	0241015c-e821-43e3-a1b0-2aa3456107b9	Oui	1	fr_FR
b435e7fa-1d69-4c1d-9116-f53b21335e98	0241015c-e821-43e3-a1b0-2aa3456107b9	Non	2	fr_FR
4a905d01-edfc-4627-bc76-7485fb15715f	0241015c-e821-43e3-a1b0-2aa3456107b9	Je ne sais pas	3	fr_FR
d588c707-cbff-4b1f-ae60-c10254c7b472	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	Yes	1	en_US
fe88db73-d703-4e21-9a90-66c035419265	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	No	2	en_US
e1293002-0634-40c8-b845-3c1557614a22	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	I don't know	3	en_US
11f61be0-e1b0-4dbe-a857-be945975e5e9	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	Oui	1	fr_FR
6934ca7a-0867-43c8-a0a6-76996493a0bc	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	Non	2	fr_FR
a8a4f2e3-b642-4cc4-abcc-5ade253fa0b3	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	Je ne sais pas	3	fr_FR
1c4b1855-b9a9-42a9-9db2-c8867dc86274	44beeb67-10c4-4088-8c01-03f44cbae9f9	Yes	1	en_US
ed4ca7c7-ea62-4f76-8426-f4284aa0471a	44beeb67-10c4-4088-8c01-03f44cbae9f9	No	2	en_US
aaeb897a-2bd8-4ac8-96d0-e6102275b1ee	44beeb67-10c4-4088-8c01-03f44cbae9f9	I don't know	3	en_US
f5893781-bfa9-4dde-8de3-ca50edec52ac	44beeb67-10c4-4088-8c01-03f44cbae9f9	Oui	1	fr_FR
f7d0a829-1c6a-417e-9ca8-3abcb570297c	44beeb67-10c4-4088-8c01-03f44cbae9f9	Non	2	fr_FR
8bf356e6-c090-4feb-91f3-9cb656fd6ed3	44beeb67-10c4-4088-8c01-03f44cbae9f9	Je ne sais pas	3	fr_FR
fdc25139-674e-4c16-ada4-19ca26cdb481	de3b04ee-9038-47f2-9d7b-68823d41cbac	Yes	1	en_US
cf20a6bc-81d1-4746-b8ac-4d32065c4f42	de3b04ee-9038-47f2-9d7b-68823d41cbac	No	2	en_US
e0d1fafc-14ac-48dd-9f7b-9e88bb01459e	de3b04ee-9038-47f2-9d7b-68823d41cbac	I don't know	3	en_US
690457f6-56a6-4ffe-af27-747b1772c944	de3b04ee-9038-47f2-9d7b-68823d41cbac	Oui	1	fr_FR
0743b58e-d016-4a97-a613-9e934b5825d0	de3b04ee-9038-47f2-9d7b-68823d41cbac	Non	2	fr_FR
bde90562-4669-4869-9834-da07e1cb6e21	de3b04ee-9038-47f2-9d7b-68823d41cbac	Je ne sais pas	3	fr_FR
0fa5a166-7765-46e5-ba32-7c7f91943d73	855cae49-e0d6-4ae8-8c69-3af1ba09d294	Yes	1	en_US
5a93defd-ebc6-489b-b788-7bbb8661f2ee	855cae49-e0d6-4ae8-8c69-3af1ba09d294	No	2	en_US
f4ac6503-5fc8-44b8-856c-a2ba49f7fad6	855cae49-e0d6-4ae8-8c69-3af1ba09d294	I don't know	3	en_US
846760e7-ac9c-4b69-8e6a-a196b521d6f3	855cae49-e0d6-4ae8-8c69-3af1ba09d294	Oui	1	fr_FR
0ad1aa5e-e3bf-4998-bce4-e42efcb85923	855cae49-e0d6-4ae8-8c69-3af1ba09d294	Non	2	fr_FR
6fe03261-62cc-4e5a-a52b-02df6b2d1a5e	855cae49-e0d6-4ae8-8c69-3af1ba09d294	Je ne sais pas	3	fr_FR
c3468e8c-2e49-46f4-926a-a3c3fd296468	291601c1-9b3c-49a2-a78c-e46e9137b001	Yes	1	en_US
bb0ab962-d94e-4508-aae6-6ffcc909c314	291601c1-9b3c-49a2-a78c-e46e9137b001	No	2	en_US
c33b6e50-173a-4612-811b-4efebfee1757	291601c1-9b3c-49a2-a78c-e46e9137b001	I don't know	3	en_US
cbf180bb-daa9-4930-b91b-031b61ee9647	291601c1-9b3c-49a2-a78c-e46e9137b001	Oui	1	fr_FR
1b6dd3d9-eee6-4162-82f1-9f1eb3f58a2a	291601c1-9b3c-49a2-a78c-e46e9137b001	Non	2	fr_FR
e518418b-d1bf-432c-ab38-5e06783ba3e5	291601c1-9b3c-49a2-a78c-e46e9137b001	Je ne sais pas	3	fr_FR
86bc5dd7-7b87-42e5-91cd-c219619e2523	af5a66e5-bf31-4262-8976-89cd8ea4eb56	Yes	1	en_US
a0f0c6ee-4c7e-42a1-b72d-bc25f26609c3	af5a66e5-bf31-4262-8976-89cd8ea4eb56	No	2	en_US
343f6fbf-b29d-44a7-979b-7f65f11a80db	af5a66e5-bf31-4262-8976-89cd8ea4eb56	I don't know	3	en_US
cca1b7f9-efc8-462f-ba5f-6e63dcc6c881	af5a66e5-bf31-4262-8976-89cd8ea4eb56	Oui	1	fr_FR
58215863-0c51-4785-b78a-120c93e78aff	af5a66e5-bf31-4262-8976-89cd8ea4eb56	Non	2	fr_FR
93145361-b1b1-4cab-be0a-79a51cc17996	af5a66e5-bf31-4262-8976-89cd8ea4eb56	Je ne sais pas	3	fr_FR
dbc93e4e-a806-4500-8fc2-bf11511a89a5	100d8668-342b-4430-9652-7ac4a042684a	Yes	1	en_US
6d0a2343-b525-424c-9497-0be1f2c6cf80	100d8668-342b-4430-9652-7ac4a042684a	No	2	en_US
a2d169eb-929c-4d9f-b1df-e2e9d0b94cf4	100d8668-342b-4430-9652-7ac4a042684a	I don't know	3	en_US
15175466-384a-4855-84c1-2e7468a3c80e	100d8668-342b-4430-9652-7ac4a042684a	Oui	1	fr_FR
4a948da5-c7dd-46a0-bb0a-ae7fdd9ac932	100d8668-342b-4430-9652-7ac4a042684a	Non	2	fr_FR
366f7080-6ee8-4099-a99f-72ea74617f9d	100d8668-342b-4430-9652-7ac4a042684a	Je ne sais pas	3	fr_FR
aa4b0ac4-9088-4836-a5bd-04687be306ee	c9ab248e-c179-4fbb-ba58-b7efe09847ab	Yes	1	en_US
44efe2d0-afa1-4f3d-8364-1fba704a3f9d	c9ab248e-c179-4fbb-ba58-b7efe09847ab	No	2	en_US
69dd509e-1716-4ad9-bf5d-94f142beb02a	c9ab248e-c179-4fbb-ba58-b7efe09847ab	I don't know	3	en_US
1e3c896b-7eea-4524-9c21-3c77b049869d	c9ab248e-c179-4fbb-ba58-b7efe09847ab	Oui	1	fr_FR
3ce0ed9d-4297-44a5-b459-ac84772c6097	c9ab248e-c179-4fbb-ba58-b7efe09847ab	Non	2	fr_FR
e53f114a-e4b7-4df4-ab11-f0e810484409	c9ab248e-c179-4fbb-ba58-b7efe09847ab	Je ne sais pas	3	fr_FR
f9a04609-c3a9-4308-8b33-11fb12ac1c0c	77c41e5c-949f-4bc2-8104-dc16bd16fc07	Yes	1	en_US
1298dee3-56a3-4662-9e56-2396ab02b82c	77c41e5c-949f-4bc2-8104-dc16bd16fc07	No	2	en_US
87beb7bc-012d-44b6-b8cf-68f86c89c9e5	77c41e5c-949f-4bc2-8104-dc16bd16fc07	I don't know	3	en_US
79423474-07f1-46b6-92c2-5f942033e77b	77c41e5c-949f-4bc2-8104-dc16bd16fc07	Oui	1	fr_FR
9493f51b-4f29-4ff7-9dcf-edf86f99c10f	77c41e5c-949f-4bc2-8104-dc16bd16fc07	Non	2	fr_FR
23e14e29-7778-4cd3-a468-f8eeef88015a	77c41e5c-949f-4bc2-8104-dc16bd16fc07	Je ne sais pas	3	fr_FR
d8cc1dbc-ca25-47fc-8ff3-717160224b4d	c3faadfe-b096-448d-a704-868d3d6fbadf	Yes	1	en_US
27fd3f78-e0d5-4d96-90c6-a430b1245fed	c3faadfe-b096-448d-a704-868d3d6fbadf	No	2	en_US
a445c49b-8094-47cf-9f13-287d6dcc2d98	c3faadfe-b096-448d-a704-868d3d6fbadf	I don't know	3	en_US
07390b96-c729-4e2d-9a21-f5772e987111	c3faadfe-b096-448d-a704-868d3d6fbadf	Oui	1	fr_FR
868953bb-17bf-4937-bd12-462f7b34649d	c3faadfe-b096-448d-a704-868d3d6fbadf	Non	2	fr_FR
08fbe8d4-2e36-429c-8d36-f380fedc03e6	c3faadfe-b096-448d-a704-868d3d6fbadf	Je ne sais pas	3	fr_FR
735407c3-c801-4c7c-ad84-fc2c36f476f3	f34c7766-37cb-455d-b19f-28b34aac51e7	Yes	1	en_US
64a5dad6-dcb4-4c9b-b9f5-15335e906c5a	f34c7766-37cb-455d-b19f-28b34aac51e7	No	2	en_US
21d71d1f-b6cb-44ec-8be6-3c602e11c234	f34c7766-37cb-455d-b19f-28b34aac51e7	I don't know	3	en_US
4dd3744b-989f-4283-98f3-4377d60f5d51	f34c7766-37cb-455d-b19f-28b34aac51e7	Oui	1	fr_FR
6d72afec-ec66-447f-ac00-12d8e4f36922	f34c7766-37cb-455d-b19f-28b34aac51e7	Non	2	fr_FR
4e9ed6c0-3b2f-475d-8129-5d10b8ddc5d8	f34c7766-37cb-455d-b19f-28b34aac51e7	Je ne sais pas	3	fr_FR
f3d21b36-2bb9-444e-8407-b20a5e374817	87cd330c-29f0-43d6-a30a-18859f64d7c7	Yes	1	en_US
611dc9ce-5de5-4aec-a135-289fcb8bd206	87cd330c-29f0-43d6-a30a-18859f64d7c7	No	2	en_US
6e60b0d4-5178-45db-84fa-7d8395767b7e	87cd330c-29f0-43d6-a30a-18859f64d7c7	I don't know	3	en_US
58a652fa-5d9e-46cf-9cda-8612f44d5e26	87cd330c-29f0-43d6-a30a-18859f64d7c7	Oui	1	fr_FR
8c0686d9-8d00-41ff-9aa7-630fe84c502e	87cd330c-29f0-43d6-a30a-18859f64d7c7	Non	2	fr_FR
00a923b1-b86f-4981-a4f2-74885b22c71b	87cd330c-29f0-43d6-a30a-18859f64d7c7	Je ne sais pas	3	fr_FR
d134aee2-5c3f-4b26-aa1d-04fdc4946e29	4eadaeb2-c165-4488-b119-97ddc5aa51c5	Yes	1	en_US
275162f2-e896-493e-af1a-dc00762117a4	4eadaeb2-c165-4488-b119-97ddc5aa51c5	No	2	en_US
112623a3-ab0e-4e79-aa69-9bae8f163af8	4eadaeb2-c165-4488-b119-97ddc5aa51c5	I don't know	3	en_US
fc0695f9-1d49-4537-8459-197208f55abf	4eadaeb2-c165-4488-b119-97ddc5aa51c5	Oui	1	fr_FR
e676d522-fd44-4223-a304-3b68fd267225	4eadaeb2-c165-4488-b119-97ddc5aa51c5	Non	2	fr_FR
4e37d3b7-53ae-4813-be02-5e2a83ec0d08	4eadaeb2-c165-4488-b119-97ddc5aa51c5	Je ne sais pas	3	fr_FR
7017f720-f884-4cbe-9f2a-016f036df6f6	d6253326-0b34-40d6-8125-d3a1b8cfabaa	Yes	1	en_US
a54fbf81-6d6c-44ff-8f04-d5e0f9eac6a7	d6253326-0b34-40d6-8125-d3a1b8cfabaa	No	2	en_US
67c67ff1-b64c-401e-ae8f-834630bc1b1f	d6253326-0b34-40d6-8125-d3a1b8cfabaa	I don't know	3	en_US
5fee24d7-e19e-44d2-bfd3-02008ce3d6de	d6253326-0b34-40d6-8125-d3a1b8cfabaa	Oui	1	fr_FR
bab8da52-0050-49e3-95fa-098ce9bdcd7d	d6253326-0b34-40d6-8125-d3a1b8cfabaa	Non	2	fr_FR
2039ce39-f957-4072-afc9-b98f6be9fc34	d6253326-0b34-40d6-8125-d3a1b8cfabaa	Je ne sais pas	3	fr_FR
ffb8f4c1-67ad-4531-89da-5ba1a7ab39c9	7a9ca40a-914c-47fa-92dc-f74889a99208	Yes	1	en_US
bc352fee-a0e8-4b58-b28d-0219e1e5d682	7a9ca40a-914c-47fa-92dc-f74889a99208	No	2	en_US
8cc76da0-6a10-48fe-b52d-f0da89412e84	7a9ca40a-914c-47fa-92dc-f74889a99208	I don't know	3	en_US
ac571969-154e-4465-a680-1554dbe2dbe7	7a9ca40a-914c-47fa-92dc-f74889a99208	Oui	1	fr_FR
3825623c-c515-4d74-8058-f9ab9c4a5244	7a9ca40a-914c-47fa-92dc-f74889a99208	Non	2	fr_FR
36a4642f-214e-4939-8c48-4984e230c280	7a9ca40a-914c-47fa-92dc-f74889a99208	Je ne sais pas	3	fr_FR
54940435-5970-4e3a-95e1-a5d72f8f47c4	38f58c1f-0ca6-40b6-bba6-7c444e842921	Yes	1	en_US
922a9b94-066f-4d16-8fd0-5d4a0ff6c75c	38f58c1f-0ca6-40b6-bba6-7c444e842921	No	2	en_US
dedceb26-c23d-4671-962f-eef7be7ca39b	38f58c1f-0ca6-40b6-bba6-7c444e842921	I don't know	3	en_US
b5dfc371-9a6d-4735-b44b-5b67a40123e9	38f58c1f-0ca6-40b6-bba6-7c444e842921	Oui	1	fr_FR
6daaddb2-e204-47b7-8cdf-fbb9c5ee5737	38f58c1f-0ca6-40b6-bba6-7c444e842921	Non	2	fr_FR
72b85dc5-495c-4c54-ace3-0623e984fa68	38f58c1f-0ca6-40b6-bba6-7c444e842921	Je ne sais pas	3	fr_FR
72d6b401-546b-4234-b98d-82dc71f59189	0d7f4f2a-3424-4789-b732-a0b32286815d	Yes	1	en_US
6c8e310a-7f3b-4d54-9615-c69283301850	0d7f4f2a-3424-4789-b732-a0b32286815d	No	2	en_US
94733867-a4b0-42c5-99ce-24167f56c158	0d7f4f2a-3424-4789-b732-a0b32286815d	I don't know	3	en_US
c3d4dec1-bbca-48af-9fb5-03b5822fc35c	0d7f4f2a-3424-4789-b732-a0b32286815d	Oui	1	fr_FR
bc0dfdc9-cc45-4c10-b619-83ecc17d69da	0d7f4f2a-3424-4789-b732-a0b32286815d	Non	2	fr_FR
01284262-b9a1-49d4-b2f6-9c751ba2bf5b	0d7f4f2a-3424-4789-b732-a0b32286815d	Je ne sais pas	3	fr_FR
07fecb61-9f0f-45a5-8057-637d15b492cc	36a8daa4-7741-40e2-86aa-be5eb874e275	Yes	1	en_US
6fd08640-9cd5-4f6f-93f5-ade7e9c91ae9	36a8daa4-7741-40e2-86aa-be5eb874e275	No	2	en_US
67795358-b77b-42ce-ad33-85d586f5541b	36a8daa4-7741-40e2-86aa-be5eb874e275	I don't know	3	en_US
337225bc-e2d0-4082-8782-35c3efd74a1f	36a8daa4-7741-40e2-86aa-be5eb874e275	Oui	1	fr_FR
fcba78c1-609f-42cc-bfc1-149bfd46b79a	36a8daa4-7741-40e2-86aa-be5eb874e275	Non	2	fr_FR
2f4ab9f3-7dfc-4c3d-9f35-0fe1cc147a6a	36a8daa4-7741-40e2-86aa-be5eb874e275	Je ne sais pas	3	fr_FR
83d0bbe8-826c-4f42-8535-0d45126900b0	5ba28665-5140-4503-8b0f-e4f91937f423	Yes	1	en_US
78fa5178-099b-4272-9334-cc3484f42ccb	5ba28665-5140-4503-8b0f-e4f91937f423	No	2	en_US
cb4a0071-9a60-43c0-8074-47ca8bdb6791	5ba28665-5140-4503-8b0f-e4f91937f423	I don't know	3	en_US
6ad159e7-49ac-4b92-9a1d-0e692f54a386	5ba28665-5140-4503-8b0f-e4f91937f423	Oui	1	fr_FR
26804c09-ba24-4c95-bee1-2a7a964130bd	5ba28665-5140-4503-8b0f-e4f91937f423	Non	2	fr_FR
3f1d3e32-be4a-49d3-bf98-5c96c61e1bad	5ba28665-5140-4503-8b0f-e4f91937f423	Je ne sais pas	3	fr_FR
c5b7d0da-81d7-41d3-8a5e-05803728eba4	aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	Yes	1	en_US
35e345c5-83a2-4c74-926e-19bc8cc95e6a	aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	No	2	en_US
1931710d-b7ec-4640-aa32-5ccc1b465329	aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	I don't know	3	en_US
d6708932-15a9-4ba0-9c0a-8ba209973131	aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	Oui	1	fr_FR
29824d7d-bf2b-4736-bbed-94b7a751f685	aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	Non	2	fr_FR
03acaa05-4567-4894-841f-2592c19751d7	aa5448d5-9ec8-4833-8f18-0c6cdf9c2d0f	Je ne sais pas	3	fr_FR
a20131ad-9f20-42f5-b4a7-2554b8ccf0f0	f32eac61-aa16-4095-94e0-9c786b8c70de	Yes	1	en_US
f0c9d747-314e-4885-b644-9f67c1419c63	f32eac61-aa16-4095-94e0-9c786b8c70de	No	2	en_US
fb607504-436d-4c34-8c0d-bac93f7bafc9	f32eac61-aa16-4095-94e0-9c786b8c70de	I don't know	3	en_US
52ac7ed4-8a02-4379-9bef-291613058b01	f32eac61-aa16-4095-94e0-9c786b8c70de	Oui	1	fr_FR
421f9119-89ef-4ce1-a55f-447a65a10bf7	f32eac61-aa16-4095-94e0-9c786b8c70de	Non	2	fr_FR
67f4b392-3e9e-486f-9200-2c6160cd6775	f32eac61-aa16-4095-94e0-9c786b8c70de	Je ne sais pas	3	fr_FR
40907373-23fa-4b32-b942-980d5e695a99	dae0875e-7812-483f-8760-b98ab8bde6cc	Yes	1	en_US
4b0e422b-84d6-4785-9294-6f68f7b1ad59	dae0875e-7812-483f-8760-b98ab8bde6cc	No	2	en_US
b89f8d33-8692-49d8-9174-b8c49984501e	dae0875e-7812-483f-8760-b98ab8bde6cc	I don't know	3	en_US
540e53c2-fe24-4975-9459-8fdbcdfb88ef	dae0875e-7812-483f-8760-b98ab8bde6cc	Oui	1	fr_FR
2eb33f83-cd68-4f98-87fe-c58f52b2bff3	dae0875e-7812-483f-8760-b98ab8bde6cc	Non	2	fr_FR
cf540c89-80d6-44a0-9cb5-fbba4eca9e6d	dae0875e-7812-483f-8760-b98ab8bde6cc	Je ne sais pas	3	fr_FR
3ddaea78-908b-4884-ae3d-ed2679bcb127	faadcff3-7957-4c4e-8620-50a24b37c862	Yes	1	en_US
bd70c748-c284-476c-a9a0-b7e1fd1101b5	faadcff3-7957-4c4e-8620-50a24b37c862	No	2	en_US
55b62e9d-8d86-4132-ab55-acb430fdcb8b	faadcff3-7957-4c4e-8620-50a24b37c862	I don't know	3	en_US
b8bfd63d-4103-4f2c-a609-750dbaa89a0a	faadcff3-7957-4c4e-8620-50a24b37c862	Oui	1	fr_FR
359936c9-d5a3-46bd-94b1-340d9dea6860	faadcff3-7957-4c4e-8620-50a24b37c862	Non	2	fr_FR
5aa6491f-5eb2-470c-be45-412bcdf7f63d	faadcff3-7957-4c4e-8620-50a24b37c862	Je ne sais pas	3	fr_FR
1a56e669-631a-423b-8a8a-c7d9c5e74cc5	f4d8008c-0888-400d-a388-87c0299d6e0e	Yes	1	en_US
b065eb55-0702-428b-949d-b25058f044b8	f4d8008c-0888-400d-a388-87c0299d6e0e	No	2	en_US
93da97a1-2be7-4803-8996-f1105dc8072a	f4d8008c-0888-400d-a388-87c0299d6e0e	I don't know	3	en_US
b80e304d-5e1a-41a4-badc-5bdb7776dd65	f4d8008c-0888-400d-a388-87c0299d6e0e	Oui	1	fr_FR
cd2d1cf0-e18d-4c7a-b596-5ddc13623257	f4d8008c-0888-400d-a388-87c0299d6e0e	Non	2	fr_FR
9ee19425-54c4-4bb5-bd44-865517bcb32a	f4d8008c-0888-400d-a388-87c0299d6e0e	Je ne sais pas	3	fr_FR
0ea011e4-bb07-4508-af09-b5f7d1d48a70	cfc5ac21-333d-4f60-93cd-542a39a65749	Yes	1	en_US
37360b16-2ea7-4308-ade0-72dc971b176f	cfc5ac21-333d-4f60-93cd-542a39a65749	No	2	en_US
5bc2123f-733e-4b9b-ad83-b2fbb4a3b95f	cfc5ac21-333d-4f60-93cd-542a39a65749	I don't know	3	en_US
1d0723dc-9d6a-459e-a5bb-188580edc6e5	cfc5ac21-333d-4f60-93cd-542a39a65749	Oui	1	fr_FR
04a28715-4988-4072-a9cd-e989b992245c	cfc5ac21-333d-4f60-93cd-542a39a65749	Non	2	fr_FR
ad581eca-6880-4478-96a0-5ba6a5c96b59	cfc5ac21-333d-4f60-93cd-542a39a65749	Je ne sais pas	3	fr_FR
2720056d-e4ee-46c6-9eea-f856286ae181	d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	Yes	1	en_US
385ed208-60e1-4d26-9af3-5dc4350eeb82	d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	No	2	en_US
53938fc5-ee12-4cf4-8ddf-c351ceb62ed9	d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	I don't know	3	en_US
0a459f26-2ffe-4afe-b4ed-4739fa14fbbf	d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	Oui	1	fr_FR
2953e228-8b02-4ae3-8bae-8e818cc0cbbd	d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	Non	2	fr_FR
00796aa2-0cdd-4015-a2e7-64cb1a8612ea	d985fe7a-dcfc-4dc3-b177-2d0efe3769e7	Je ne sais pas	3	fr_FR
81cd8fb7-8573-43e3-bd5b-425dca20715c	54da03ba-5802-4292-a21d-8ca3c4a9492b	Yes	1	en_US
e4ce1cd9-16e4-4425-8349-1d089bfd85e0	54da03ba-5802-4292-a21d-8ca3c4a9492b	No	2	en_US
c2030b8e-9ce1-4cb5-aed5-fb05ad36d006	54da03ba-5802-4292-a21d-8ca3c4a9492b	I don't know	3	en_US
ad86c863-874f-4095-b432-3e2987297bbb	54da03ba-5802-4292-a21d-8ca3c4a9492b	Oui	1	fr_FR
a97b7b41-6a1f-47e1-b2be-2b4816e40902	54da03ba-5802-4292-a21d-8ca3c4a9492b	Non	2	fr_FR
163d4889-11a0-41ef-8a5b-a4dadc548656	54da03ba-5802-4292-a21d-8ca3c4a9492b	Je ne sais pas	3	fr_FR
b7e65102-44d7-4bc9-b660-e364430d7a74	3ea2d4f9-571d-48db-8919-2752c85b57c8	Yes	1	en_US
29a114f1-f5fb-46a4-bd0b-9332060e4fc6	3ea2d4f9-571d-48db-8919-2752c85b57c8	No	2	en_US
aff2f763-411e-4710-b418-df5fc1447f75	3ea2d4f9-571d-48db-8919-2752c85b57c8	I don't know	3	en_US
036dbec6-96f7-41c6-8307-36940f8c610f	3ea2d4f9-571d-48db-8919-2752c85b57c8	Oui	1	fr_FR
8602fe33-c521-46d9-9fb9-1fce2963e1a8	3ea2d4f9-571d-48db-8919-2752c85b57c8	Non	2	fr_FR
10c5adfe-9bd2-4abf-9474-5efb108bb05c	3ea2d4f9-571d-48db-8919-2752c85b57c8	Je ne sais pas	3	fr_FR
3b760433-c9e3-48d1-96eb-40d1bc18affc	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	Yes	1	en_US
89d469c4-7108-406a-b6c6-f141037ac0c7	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	No	2	en_US
28e35c62-0a23-4215-aac1-f8ef86bf541e	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	I don't know	3	en_US
524032dc-53a2-49a2-a4cc-c5306cf36b5d	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	Oui	1	fr_FR
dc0ed768-aa04-4b07-888c-74048846c54f	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	Non	2	fr_FR
540f1fc6-aa31-4c3f-88a7-81718332927b	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	Je ne sais pas	3	fr_FR
8ec18f2a-3587-41e8-8f13-26fce62b0db5	c704b3be-98bc-4c14-998d-11df3b1bc815	Yes	1	en_US
89399bef-6659-4c8d-b5e7-68cacdbb6bf3	c704b3be-98bc-4c14-998d-11df3b1bc815	No	2	en_US
792b0cf1-6fd9-4fbd-b6d8-0f8697cf4f1b	c704b3be-98bc-4c14-998d-11df3b1bc815	I don't know	3	en_US
a79955bd-bb1d-4153-a10f-4e7d1f1516ae	c704b3be-98bc-4c14-998d-11df3b1bc815	Oui	1	fr_FR
4d83060b-8b75-41af-b256-ac2124ed289d	c704b3be-98bc-4c14-998d-11df3b1bc815	Non	2	fr_FR
83d4b171-ef4c-4924-82ad-b8c1cb76a5e4	c704b3be-98bc-4c14-998d-11df3b1bc815	Je ne sais pas	3	fr_FR
3e4220e1-f8c2-497b-9e28-07924e02f35d	7fdf9127-88d1-42cd-a7f1-e41f8453f4de	Yes	1	en_US
3559e2b1-af00-4d01-ae42-9a6bdbd469ff	7fdf9127-88d1-42cd-a7f1-e41f8453f4de	No	2	en_US
5406cc10-0093-4bcb-babc-3714dc3dc4a4	7fdf9127-88d1-42cd-a7f1-e41f8453f4de	I don't know	3	en_US
1181eb60-6cfe-4be9-a63d-bec036e1137f	7fdf9127-88d1-42cd-a7f1-e41f8453f4de	Oui	1	fr_FR
443a8342-853a-46a7-a680-7751774fab2c	7fdf9127-88d1-42cd-a7f1-e41f8453f4de	Non	2	fr_FR
ad2b5777-230f-4631-96f2-dfe7b5ff4130	7fdf9127-88d1-42cd-a7f1-e41f8453f4de	Je ne sais pas	3	fr_FR
cd4b16ee-bf2a-46de-9f28-5eca6746ec34	3435a490-9687-4edf-962e-b7954022582f	Yes	1	en_US
6aeb2eef-e5da-4759-a145-0eb97cc9771f	3435a490-9687-4edf-962e-b7954022582f	No	2	en_US
33728bc0-4262-4a7b-bc81-2de1b2a420e5	3435a490-9687-4edf-962e-b7954022582f	I don't know	3	en_US
35ec27f5-d4c6-474a-8cd7-20871567118a	3435a490-9687-4edf-962e-b7954022582f	Oui	1	fr_FR
9c2fd7cf-529e-439e-bbd5-2508d95015a4	3435a490-9687-4edf-962e-b7954022582f	Non	2	fr_FR
64d75dbe-0cfa-40d5-8c08-66d72c91fbe8	3435a490-9687-4edf-962e-b7954022582f	Je ne sais pas	3	fr_FR
f9f387a4-afd5-4ec2-8061-7c52fac2d23a	730e74c7-6338-49f7-8f0d-4cacb3467703	Yes	1	en_US
76adee0c-f1b1-4458-94df-9aeaa2582f54	730e74c7-6338-49f7-8f0d-4cacb3467703	No	2	en_US
e71e732c-c757-45b4-aff2-11238436982b	730e74c7-6338-49f7-8f0d-4cacb3467703	I don't know	3	en_US
93727721-9f68-45af-b7ea-b24160a18039	730e74c7-6338-49f7-8f0d-4cacb3467703	Oui	1	fr_FR
a8b71366-fcac-4bf5-9ed0-a37d8d7ad32e	730e74c7-6338-49f7-8f0d-4cacb3467703	Non	2	fr_FR
c46620db-4eac-46cc-8f66-d912a318f1d4	730e74c7-6338-49f7-8f0d-4cacb3467703	Je ne sais pas	3	fr_FR
c7cdad36-2cc7-45c0-b72d-d677cde7ecc0	facf297a-ab60-430b-b605-ad6ce6d6babf	Yes	1	en_US
da54e882-33b9-48bb-9993-025173907cbc	facf297a-ab60-430b-b605-ad6ce6d6babf	No	2	en_US
169e0641-0657-4bb1-923f-ab888a13ba42	facf297a-ab60-430b-b605-ad6ce6d6babf	I don't know	3	en_US
80fee11d-3935-4ddd-a4ba-d98d3f4448fd	facf297a-ab60-430b-b605-ad6ce6d6babf	Oui	1	fr_FR
30d50bf3-a3a4-45cf-b61d-a10658abcab5	facf297a-ab60-430b-b605-ad6ce6d6babf	Non	2	fr_FR
98d90664-93d4-4671-b6e0-96bd43ae3af7	facf297a-ab60-430b-b605-ad6ce6d6babf	Je ne sais pas	3	fr_FR
166a9c85-2b24-4d20-99ee-518027956e0e	f0991fcd-ba86-43ed-bb8d-30ee6f813530	Yes	1	en_US
8795d620-a9e5-4373-a3b4-5411c8fad71e	f0991fcd-ba86-43ed-bb8d-30ee6f813530	No	2	en_US
4f2d486c-9aa0-42d8-bbbb-6aa5a675ff7e	f0991fcd-ba86-43ed-bb8d-30ee6f813530	I don't know	3	en_US
57ed916c-5da0-478c-a8ef-46422799d4d4	f0991fcd-ba86-43ed-bb8d-30ee6f813530	Oui	1	fr_FR
a77a2399-fbdf-4859-ac0a-0ec87f9528b1	f0991fcd-ba86-43ed-bb8d-30ee6f813530	Non	2	fr_FR
9c1ba6dc-2746-4689-bdd8-6e19330d008c	f0991fcd-ba86-43ed-bb8d-30ee6f813530	Je ne sais pas	3	fr_FR
55823727-3967-46ca-a6c1-61adcb1e9aaa	be520403-d204-4be1-9bb9-9a3e1356d4c3	Yes	1	en_US
d9a411c6-3fbb-4959-b56f-5818b4e2d68a	be520403-d204-4be1-9bb9-9a3e1356d4c3	No	2	en_US
36c5262c-ef7e-4a87-a542-4338ae0368e9	be520403-d204-4be1-9bb9-9a3e1356d4c3	I don't know	3	en_US
3f7ca683-dd55-4b83-973b-71d8144eb2a6	be520403-d204-4be1-9bb9-9a3e1356d4c3	Oui	1	fr_FR
219423d1-caee-424c-9ab1-5db4680a319d	be520403-d204-4be1-9bb9-9a3e1356d4c3	Non	2	fr_FR
eb3b9c71-c210-499e-b883-fbaa768e0e4f	be520403-d204-4be1-9bb9-9a3e1356d4c3	Je ne sais pas	3	fr_FR
f197d70b-f706-4a82-bd39-73530311832f	98398a41-fecc-4fa6-9697-89911e0e4644	Yes	1	en_US
e7f9b7d9-2f70-424d-82aa-2cf706c1c5d6	98398a41-fecc-4fa6-9697-89911e0e4644	No	2	en_US
fb3352d0-464d-4781-8149-b15ec0e6abe7	98398a41-fecc-4fa6-9697-89911e0e4644	I don't know	3	en_US
b8cd580f-1496-48dd-90e1-7ad881795c13	98398a41-fecc-4fa6-9697-89911e0e4644	Oui	1	fr_FR
1fee53ac-804c-4a8d-91d3-862a98a171ba	98398a41-fecc-4fa6-9697-89911e0e4644	Non	2	fr_FR
c18a90bd-f550-422d-abac-107291cae3fb	98398a41-fecc-4fa6-9697-89911e0e4644	Je ne sais pas	3	fr_FR
7d9e59c5-802d-41c5-8724-5e7549ce1bf9	6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	Yes	1	en_US
13e10dc2-c280-4337-85a6-f5afb0ba826d	6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	No	2	en_US
2e23033f-640b-43d3-9107-a281cb84991a	6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	I don't know	3	en_US
892ec36f-8902-44c8-8216-a1d3c6ce3482	6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	Oui	1	fr_FR
6a30c472-a143-47f8-830a-a60df4e6adf1	6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	Non	2	fr_FR
d104e4c2-31d0-4562-85aa-5add1643c077	6a1d4f14-5f2f-4f4d-a16b-0aaac2b70422	Je ne sais pas	3	fr_FR
64ffaeed-d30c-494d-a973-69982092d9f5	3e1936f9-a4d4-4026-adaf-16f845619eab	Yes	1	en_US
70b80df0-0ff1-4c37-988a-d8ddcd076d1a	3e1936f9-a4d4-4026-adaf-16f845619eab	No	2	en_US
d95d32ba-5bc2-41cf-a03e-8b17872f221b	3e1936f9-a4d4-4026-adaf-16f845619eab	I don't know	3	en_US
57ce9a4f-56fa-4089-8c79-562da4efa46b	3e1936f9-a4d4-4026-adaf-16f845619eab	Oui	1	fr_FR
b95627b8-6f05-4724-875d-15b4ee4c8188	3e1936f9-a4d4-4026-adaf-16f845619eab	Non	2	fr_FR
30070dcc-f9be-4cb1-babe-6f32817eb353	3e1936f9-a4d4-4026-adaf-16f845619eab	Je ne sais pas	3	fr_FR
59e8131d-6f59-4c3c-ad77-abfa492a2fc6	f36c221b-eed4-4623-a91f-7f72a446e781	Yes	1	en_US
326d6ba9-df7a-45f5-844a-47c4972df1a2	f36c221b-eed4-4623-a91f-7f72a446e781	No	2	en_US
ab081d10-2a04-4a47-a3b4-2662a54107b3	f36c221b-eed4-4623-a91f-7f72a446e781	I don't know	3	en_US
bfdb1780-8196-48b5-8185-dec64af1c04f	f36c221b-eed4-4623-a91f-7f72a446e781	Oui	1	fr_FR
e7b1323b-b6a2-4098-b1bd-cf6aeb8afacf	f36c221b-eed4-4623-a91f-7f72a446e781	Non	2	fr_FR
6ac32cbb-74d3-4808-b558-44d1bff6ca6d	f36c221b-eed4-4623-a91f-7f72a446e781	Je ne sais pas	3	fr_FR
fb6471d8-6b5e-444f-b4ca-0bb335b6e7dc	9500303b-48bd-40e9-ae19-c0dcd79e0811	Yes	1	en_US
7354cbe6-ed3c-449e-8a7a-8ee6b94059eb	9500303b-48bd-40e9-ae19-c0dcd79e0811	No	2	en_US
3760321b-6fc8-4032-af7d-d8842d927566	9500303b-48bd-40e9-ae19-c0dcd79e0811	I don't know	3	en_US
3fe757d8-8dac-4c6d-be2d-4610b931199e	9500303b-48bd-40e9-ae19-c0dcd79e0811	Oui	1	fr_FR
5d122655-48aa-4e39-a7d2-5b9f8b4996be	9500303b-48bd-40e9-ae19-c0dcd79e0811	Non	2	fr_FR
4d8496c5-a5da-46e9-a39d-d3fd35b2e638	9500303b-48bd-40e9-ae19-c0dcd79e0811	Je ne sais pas	3	fr_FR
54e4d6c4-99ab-4aa8-8303-dce0a7c59a7e	eb363c21-ad10-43d8-a05f-1c725b5e9737	Yes	1	en_US
9bc4b667-d448-454e-bbdb-804f291ac992	eb363c21-ad10-43d8-a05f-1c725b5e9737	No	2	en_US
ef18f662-48b2-4096-b369-81e643e7de49	eb363c21-ad10-43d8-a05f-1c725b5e9737	I don't know	3	en_US
aaaf113a-d506-4ffe-8037-c6319b1c2271	eb363c21-ad10-43d8-a05f-1c725b5e9737	Oui	1	fr_FR
fda7e910-ecf1-4807-8c55-9c8f572f2d84	eb363c21-ad10-43d8-a05f-1c725b5e9737	Non	2	fr_FR
1b179446-2d4b-4d00-956c-44aea140f60e	eb363c21-ad10-43d8-a05f-1c725b5e9737	Je ne sais pas	3	fr_FR
a4f6b9b3-0ea4-4e66-a714-ec58fdc3db74	d29aa121-4e91-4123-bb89-809c951fe928	Yes	1	en_US
050d2550-963e-4116-9e87-7ae4eb8905c1	d29aa121-4e91-4123-bb89-809c951fe928	No	2	en_US
32f0de2b-74cd-4f22-aa2d-45a9595a82d8	d29aa121-4e91-4123-bb89-809c951fe928	I don't know	3	en_US
c138d0c2-ac9c-4bd3-9750-9165618155c8	d29aa121-4e91-4123-bb89-809c951fe928	Oui	1	fr_FR
a7f1be65-cb81-4518-8f92-8b15d60d82c0	d29aa121-4e91-4123-bb89-809c951fe928	Non	2	fr_FR
cb64aa80-df6e-4942-8e1c-ba2bb38b6094	d29aa121-4e91-4123-bb89-809c951fe928	Je ne sais pas	3	fr_FR
190a2e1c-2534-47cb-8988-c5fffc1ce3cc	6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	Yes	1	en_US
bdde2f5a-cb96-43a2-a862-5d431b5e4187	6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	No	2	en_US
5b21032c-78e4-40e6-9cb7-a26146491cc9	6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	I don't know	3	en_US
671e84cd-e510-47e3-a774-3031e29277ad	6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	Oui	1	fr_FR
9c1f074f-e15c-4143-ac66-6cc9e8dba2e2	6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	Non	2	fr_FR
61396b89-f7e1-4e7f-9053-cbb249fefbae	6b3aa09f-cd02-4759-bf3d-e158e21fa5b0	Je ne sais pas	3	fr_FR
fc170c11-b1ff-4fa2-9165-8c4c4a3cbf87	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	Yes	1	en_US
4f69549e-d153-4f4e-bebb-6b34f83ae8be	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	No	2	en_US
f3ce6d69-837b-4bce-98dd-18fb53a15cac	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	I don't know	3	en_US
e90a25ad-8dd6-49d9-b391-d642ff4fa218	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	Oui	1	fr_FR
3bc594d7-b8cc-4402-8a4e-98e8cf553413	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	Non	2	fr_FR
50bd5239-e2d6-4e7c-873e-db614a6a9631	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	Je ne sais pas	3	fr_FR
a2ab5c81-23d1-41d6-8ead-8e1101199962	aaeb0306-d159-4510-baf8-905a12c13971	Yes	1	en_US
c304683a-cf9e-46c6-bbdb-2814180023a6	aaeb0306-d159-4510-baf8-905a12c13971	No	2	en_US
05cb489e-0e46-4172-9243-1ae0e5ec93f6	aaeb0306-d159-4510-baf8-905a12c13971	I don't know	3	en_US
2b7b0c17-5ef0-45c3-af6e-3d03d38e7811	aaeb0306-d159-4510-baf8-905a12c13971	Oui	1	fr_FR
fe24e704-7f1a-464e-acf8-5ae8d3d55c1a	aaeb0306-d159-4510-baf8-905a12c13971	Non	2	fr_FR
6cc855d4-f009-42f9-831b-3362c270013d	aaeb0306-d159-4510-baf8-905a12c13971	Je ne sais pas	3	fr_FR
9c72be61-0a55-4267-ad75-a3687fcd2090	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	Yes	1	en_US
5d92d2a2-c28d-49c2-bb05-ebdaa6abf4c3	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	No	2	en_US
af649d78-c977-4ad6-85fe-a5614114108d	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	I don't know	3	en_US
110bb842-4419-4851-88f0-5623c711f04d	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	Oui	1	fr_FR
708d8faf-18c9-46a2-8c61-5b9bdb226cd1	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	Non	2	fr_FR
475f232d-66a4-402b-ab45-62cec2a29187	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	Je ne sais pas	3	fr_FR
b4423b34-e420-4890-bc33-342dc8ee3541	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	Yes	1	en_US
d46b8777-2ac2-4ba4-a29f-03b22b03cb0d	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	No	2	en_US
b23f14ee-881f-4f64-9667-e8257ad6b78a	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	I don't know	3	en_US
936a33b8-3fb7-42c3-86a0-8559024f7020	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	Oui	1	fr_FR
96a867ec-b2a0-44b3-8b6c-a6dc519d4ce8	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	Non	2	fr_FR
aae47649-62d7-4b8e-b963-b206fe7ee73e	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	Je ne sais pas	3	fr_FR
5f4bad17-97fe-4611-8c2e-edce0692f4a3	3507b7c1-b87d-4572-95ff-0c7345d8d5e9	Yes	1	en_US
9d94d18b-feca-4127-a689-e46cca521ef6	3507b7c1-b87d-4572-95ff-0c7345d8d5e9	No	2	en_US
9fb92f6e-710f-4b83-95fd-8698ae9cbd8a	3507b7c1-b87d-4572-95ff-0c7345d8d5e9	I don't know	3	en_US
25606799-d8d7-4b66-8a11-910763190eb5	3507b7c1-b87d-4572-95ff-0c7345d8d5e9	Oui	1	fr_FR
fa2b8875-83d0-444d-b287-2e78547f3526	3507b7c1-b87d-4572-95ff-0c7345d8d5e9	Non	2	fr_FR
5ecb642c-d560-41d9-8341-d8e6d7e88086	3507b7c1-b87d-4572-95ff-0c7345d8d5e9	Je ne sais pas	3	fr_FR
5e89d95a-fc39-4c97-981b-f624559328f0	149697d1-db36-4403-97a9-41e4d1fd917b	Yes	1	en_US
bb466ea5-e3c8-4962-861f-a9709c948ea9	149697d1-db36-4403-97a9-41e4d1fd917b	No	2	en_US
85ca165b-284e-4101-951b-98f237f2ec62	149697d1-db36-4403-97a9-41e4d1fd917b	I don't know	3	en_US
2a7c6211-c5a9-4ec1-8c9e-09c3b806567a	149697d1-db36-4403-97a9-41e4d1fd917b	Oui	1	fr_FR
08350b93-9bf6-46a9-af16-4f8b1e21ad5d	149697d1-db36-4403-97a9-41e4d1fd917b	Non	2	fr_FR
9d1c3b56-17d4-4a65-9453-63c2190a7787	149697d1-db36-4403-97a9-41e4d1fd917b	Je ne sais pas	3	fr_FR
ff27a21d-0be5-4bd2-a244-5ce5e79da179	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	Yes	1	en_US
473c643b-67ce-400b-a301-9ed33dc64ed1	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	No	2	en_US
a861d8df-c970-4637-a29a-4c5fe926bdcc	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	I don't know	3	en_US
6e609621-46aa-4efa-b789-480eec37a61e	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	Oui	1	fr_FR
544faa7c-b395-4c97-93ce-f99cace5dd96	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	Non	2	fr_FR
cabccc50-812d-432f-8d79-fc617812b0ac	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	Je ne sais pas	3	fr_FR
e3fd884f-b733-45cf-be1f-fe03a8919c60	3d221b83-94d7-4992-a6fd-d15f7b201dd1	Yes	1	en_US
3a1dba0c-fc78-4bf2-aa1c-e29475fd389d	3d221b83-94d7-4992-a6fd-d15f7b201dd1	No	2	en_US
6539591e-375d-4d1b-867e-e1f6524e8c4e	3d221b83-94d7-4992-a6fd-d15f7b201dd1	I don't know	3	en_US
4db0e7ab-0a0c-4514-8886-2c15f9f0e152	3d221b83-94d7-4992-a6fd-d15f7b201dd1	Oui	1	fr_FR
824ef3a1-ccff-421f-a3ed-669d0d6cf363	3d221b83-94d7-4992-a6fd-d15f7b201dd1	Non	2	fr_FR
ee2adaa0-8209-4d4d-9c9d-ef2f51a27a64	3d221b83-94d7-4992-a6fd-d15f7b201dd1	Je ne sais pas	3	fr_FR
80c5d5f7-9539-4bbf-acdf-f260bf47631d	c5caa3e2-9489-4389-9e4b-07a5a1503dd7	Yes	1	en_US
bcc1eacb-07eb-45e9-93ee-013e3961dea7	c5caa3e2-9489-4389-9e4b-07a5a1503dd7	No	2	en_US
aaa97b8d-b3dd-4313-9aac-8634de716ee7	c5caa3e2-9489-4389-9e4b-07a5a1503dd7	I don't know	3	en_US
9c466c4b-7c76-4f38-9c68-cd0a9d54f0ed	c5caa3e2-9489-4389-9e4b-07a5a1503dd7	Oui	1	fr_FR
eea5e6ea-651d-4378-8b08-4479dcc0b8ec	c5caa3e2-9489-4389-9e4b-07a5a1503dd7	Non	2	fr_FR
121d8286-7514-4ffb-a077-390306d8f8aa	c5caa3e2-9489-4389-9e4b-07a5a1503dd7	Je ne sais pas	3	fr_FR
e8923b27-44fc-4d8d-9816-a2ef0dc24505	19d491a3-88f7-4b55-a615-1538bd85e488	Yes	1	en_US
971518e8-7d36-4719-a5b3-5915d5b1da9b	19d491a3-88f7-4b55-a615-1538bd85e488	No	2	en_US
0fb58ee8-5c26-4acf-ab49-4645eeee366d	19d491a3-88f7-4b55-a615-1538bd85e488	I don't know	3	en_US
db1db5b5-49da-4f05-ad80-be9ac21c81cf	19d491a3-88f7-4b55-a615-1538bd85e488	Oui	1	fr_FR
c1b9d9e9-38d8-416f-9604-49b644dca4b1	19d491a3-88f7-4b55-a615-1538bd85e488	Non	2	fr_FR
a86373a6-c209-47f4-a2cf-bd2ab7e021b8	19d491a3-88f7-4b55-a615-1538bd85e488	Je ne sais pas	3	fr_FR
5662c07c-b7a7-40fc-9aa1-761f02a79427	ba5baebe-ab16-4d31-8530-edee9ba059f6	Yes	1	en_US
eb3f88ac-e754-46d6-8658-8e6252e30b67	ba5baebe-ab16-4d31-8530-edee9ba059f6	No	2	en_US
87066993-99db-4819-9aab-4b740643d534	ba5baebe-ab16-4d31-8530-edee9ba059f6	I don't know	3	en_US
8acd4e27-187a-4f38-88ee-8adc33e303d9	ba5baebe-ab16-4d31-8530-edee9ba059f6	Oui	1	fr_FR
c6d24a7c-2d70-463d-8aef-6cf72f249a1b	ba5baebe-ab16-4d31-8530-edee9ba059f6	Non	2	fr_FR
205944ff-fe0d-4ee8-a309-901a6f6b1de6	ba5baebe-ab16-4d31-8530-edee9ba059f6	Je ne sais pas	3	fr_FR
65886b30-fc47-457a-a0bf-3c7f8ad7ad76	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	Yes	1	en_US
9204977b-de36-4519-ab6c-2ab480a1bf63	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	No	2	en_US
70f1cf97-7736-4073-b19c-7a3e1e1109b6	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	I don't know	3	en_US
fedd38dc-7872-40de-bf17-aee4c99f43c7	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	Oui	1	fr_FR
5a10d345-9576-4f69-8219-d25e93152c08	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	Non	2	fr_FR
b086f8aa-5d1b-49b0-a9dd-c627e0c7a7c7	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	Je ne sais pas	3	fr_FR
c61b3191-1af2-4694-a324-8555a1302c9c	b7b05f57-085c-4e59-98ff-5b7be5b188e8	Yes	1	en_US
b2c45f9d-3d24-47ad-b2c1-4c375d33b201	b7b05f57-085c-4e59-98ff-5b7be5b188e8	No	2	en_US
2f40d08a-3b10-4a81-af45-b58b7b42b67a	b7b05f57-085c-4e59-98ff-5b7be5b188e8	I don't know	3	en_US
e149297e-f0ba-46da-9162-fe4b917eec55	b7b05f57-085c-4e59-98ff-5b7be5b188e8	Oui	1	fr_FR
63425a24-7495-4ebc-aa6d-c6cfc3eed7a3	b7b05f57-085c-4e59-98ff-5b7be5b188e8	Non	2	fr_FR
a2f92c5a-3fa2-49dd-bc07-fb038ad7e962	b7b05f57-085c-4e59-98ff-5b7be5b188e8	Je ne sais pas	3	fr_FR
c3c6a4d6-fdb1-466e-abcf-4e6c0197786c	8113da5b-1635-4fa4-be4d-92387cb97b94	Yes	1	en_US
dcd29321-dd0b-4d1b-b057-1cdab7b28f1e	8113da5b-1635-4fa4-be4d-92387cb97b94	No	2	en_US
1caa0549-8998-4e4e-89a0-1b803a088d6f	8113da5b-1635-4fa4-be4d-92387cb97b94	I don't know	3	en_US
ce34eb2f-ff4c-405c-aec7-049580a44c16	8113da5b-1635-4fa4-be4d-92387cb97b94	Oui	1	fr_FR
8cfa2638-b7c3-420e-9dab-ed4d8c5e743a	8113da5b-1635-4fa4-be4d-92387cb97b94	Non	2	fr_FR
c7aa0397-7dcb-4798-acca-fc2bdb2c4349	8113da5b-1635-4fa4-be4d-92387cb97b94	Je ne sais pas	3	fr_FR
c0a96d06-7270-42bc-90c8-ba948fe9b666	0a02d438-398f-43d9-84dd-dfca9147e058	Yes	1	en_US
65f4322c-d069-474a-8472-4b1622369e44	0a02d438-398f-43d9-84dd-dfca9147e058	No	2	en_US
64e65b9c-072d-4877-9744-e621a004f18f	0a02d438-398f-43d9-84dd-dfca9147e058	I don't know	3	en_US
3d1d637e-cae9-4502-8160-b6c7ee799696	0a02d438-398f-43d9-84dd-dfca9147e058	Oui	1	fr_FR
ad46984e-6a7c-4f3a-81ac-e0fe33d71a18	0a02d438-398f-43d9-84dd-dfca9147e058	Non	2	fr_FR
02883a21-54b0-4822-a779-cc5926b15e4f	0a02d438-398f-43d9-84dd-dfca9147e058	Je ne sais pas	3	fr_FR
b7db9c63-4de0-46a7-9132-f780e9cd3eb0	a6faf59d-3e12-41e0-8284-3cd716c55079	Yes	1	en_US
3e266f16-38e9-4674-b631-af696a8658c0	a6faf59d-3e12-41e0-8284-3cd716c55079	No	2	en_US
0c23a001-3d82-48e2-b5d1-5cf40e3d8ed7	a6faf59d-3e12-41e0-8284-3cd716c55079	I don't know	3	en_US
d84dabe9-b057-4e10-b497-f933b1173b29	a6faf59d-3e12-41e0-8284-3cd716c55079	Oui	1	fr_FR
c73228d2-950a-4fda-98d8-2e16e72394c3	a6faf59d-3e12-41e0-8284-3cd716c55079	Non	2	fr_FR
8a9850db-3081-4b97-8e80-2bb0ebbedf57	a6faf59d-3e12-41e0-8284-3cd716c55079	Je ne sais pas	3	fr_FR
87260b72-1453-4600-b789-dafa45a1033c	be2b14ea-489e-490a-8398-79716b05cfda	Yes	1	en_US
08ae3201-70d6-4426-adaa-34565f62dcac	be2b14ea-489e-490a-8398-79716b05cfda	No	2	en_US
81a0614d-2be9-4997-b1d5-0056fe64319d	be2b14ea-489e-490a-8398-79716b05cfda	I don't know	3	en_US
67884ca0-af7d-4750-a6f1-08cc19daa9c1	be2b14ea-489e-490a-8398-79716b05cfda	Oui	1	fr_FR
ee416e03-f45c-473e-8863-5492d3341d72	be2b14ea-489e-490a-8398-79716b05cfda	Non	2	fr_FR
922de89f-8c8e-4318-b168-7bc8305c5672	be2b14ea-489e-490a-8398-79716b05cfda	Je ne sais pas	3	fr_FR
55063897-b7bd-46eb-ad20-0bd7d1e7a447	74927512-e8a6-48b3-9277-8a9208195cad	Yes	1	en_US
cf100c87-3c86-4615-b43b-4db9426a7f1d	74927512-e8a6-48b3-9277-8a9208195cad	No	2	en_US
43bf225e-d4ac-4449-8ed0-49e4dcce45d1	74927512-e8a6-48b3-9277-8a9208195cad	I don't know	3	en_US
0df77e06-c6f6-45e9-a91b-55988b79f30e	74927512-e8a6-48b3-9277-8a9208195cad	Oui	1	fr_FR
218fe61a-ae22-498c-9c96-33d9e1b14334	74927512-e8a6-48b3-9277-8a9208195cad	Non	2	fr_FR
b7453998-8678-4961-9b96-0de12cff140b	74927512-e8a6-48b3-9277-8a9208195cad	Je ne sais pas	3	fr_FR
8a818bc8-077e-462e-bc53-f23ff4ce2765	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	Yes	1	en_US
81b87d64-2efb-4fe4-845c-cf5fc9670925	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	No	2	en_US
90588dd5-5849-4b4e-a7d1-4b7e544d0afd	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	I don't know	3	en_US
a9039606-cf10-4966-97bf-179f52e5bde8	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	Oui	1	fr_FR
f4cc1d7e-6216-4dae-bf97-771affb86b7a	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	Non	2	fr_FR
5384f9d0-9995-48f6-a6e1-49d583ccc559	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	Je ne sais pas	3	fr_FR
836fb61c-943d-4fac-a0f6-3773873d0962	f072f18e-5645-48ad-bce9-2ed57ebeb1de	Yes	1	en_US
7e4b0043-7467-4561-a08f-9e8328ad06de	f072f18e-5645-48ad-bce9-2ed57ebeb1de	No	2	en_US
1e43d510-7672-41bf-8c53-6d2fe32ff24c	f072f18e-5645-48ad-bce9-2ed57ebeb1de	I don't know	3	en_US
7d0923f8-4efb-41b3-aa57-8c503d6c62fe	f072f18e-5645-48ad-bce9-2ed57ebeb1de	Oui	1	fr_FR
1fa89cfd-c93b-442b-9422-520f051dcf3e	f072f18e-5645-48ad-bce9-2ed57ebeb1de	Non	2	fr_FR
df4c3dac-9118-40ab-a539-1065e72ee42a	f072f18e-5645-48ad-bce9-2ed57ebeb1de	Je ne sais pas	3	fr_FR
4617f22c-b748-49ea-884f-1a8de464b43f	733c585b-631f-4dfb-a3a5-aec524d5a4e0	Yes	1	en_US
519a83e7-7234-4581-a279-96315d1fb442	733c585b-631f-4dfb-a3a5-aec524d5a4e0	No	2	en_US
672f6d76-8d39-4925-8d89-824f1931307b	733c585b-631f-4dfb-a3a5-aec524d5a4e0	I don't know	3	en_US
c5d5d7c2-8b5f-4f85-8c24-2e2883a2f95a	733c585b-631f-4dfb-a3a5-aec524d5a4e0	Oui	1	fr_FR
da63a6c7-cb58-4c77-8580-ecec8b582f7f	733c585b-631f-4dfb-a3a5-aec524d5a4e0	Non	2	fr_FR
1bafb3ad-9a78-4988-9365-f47c22d0e3c0	733c585b-631f-4dfb-a3a5-aec524d5a4e0	Je ne sais pas	3	fr_FR
1c054ed2-e77d-4563-9f29-d129cfc06f72	dc459bb7-9061-498b-b81d-744a44c3ba80	Yes	1	en_US
9a9fcbb9-4a88-4e20-9d4a-94be71ef3084	dc459bb7-9061-498b-b81d-744a44c3ba80	No	2	en_US
cd45c4e8-d8cd-4cae-8071-1f1d8c7178ff	dc459bb7-9061-498b-b81d-744a44c3ba80	I don't know	3	en_US
122a5dfd-79ea-4e8e-bc81-5eb68a6e5acf	dc459bb7-9061-498b-b81d-744a44c3ba80	Oui	1	fr_FR
79f8daf1-99c4-4a15-9b4f-ba8717aa45ce	dc459bb7-9061-498b-b81d-744a44c3ba80	Non	2	fr_FR
160dbee2-5d9d-46a1-b4f3-11ae0cac3347	dc459bb7-9061-498b-b81d-744a44c3ba80	Je ne sais pas	3	fr_FR
d6e63ce1-e60e-4d91-9147-0f78c50d9c38	88a25016-8c96-4e35-9aa5-91cea5a956a7	Yes	1	en_US
67774ab2-140e-4c60-85b3-94622806e4fe	88a25016-8c96-4e35-9aa5-91cea5a956a7	No	2	en_US
5ef8ea9b-caad-4ab4-af89-0d8fb959b705	88a25016-8c96-4e35-9aa5-91cea5a956a7	I don't know	3	en_US
3278dc53-9e2d-4d1f-81e1-2ef96c53059f	88a25016-8c96-4e35-9aa5-91cea5a956a7	Oui	1	fr_FR
fa24a0dd-ec1f-4a24-87e6-8db018bc708b	88a25016-8c96-4e35-9aa5-91cea5a956a7	Non	2	fr_FR
b3286d46-2ced-40e2-8e57-cc92e4cd1e0e	88a25016-8c96-4e35-9aa5-91cea5a956a7	Je ne sais pas	3	fr_FR
9ce1ee11-a3a7-4acd-a9ec-8469cd61b63a	b0f828e0-6620-4249-b6f7-8523f1dc91c8	Yes	1	en_US
72407618-6bd0-4826-8a99-d7df7593a7a0	b0f828e0-6620-4249-b6f7-8523f1dc91c8	No	2	en_US
dc014c99-1062-42e3-afc8-eef67bb6b9b9	b0f828e0-6620-4249-b6f7-8523f1dc91c8	I don't know	3	en_US
a521e5f2-7fc4-43ca-a10f-9af3bb62e287	b0f828e0-6620-4249-b6f7-8523f1dc91c8	Oui	1	fr_FR
1ee2c732-5d4c-4d2e-a517-5851a92e28b9	b0f828e0-6620-4249-b6f7-8523f1dc91c8	Non	2	fr_FR
4032d60a-b9f7-4ea4-9a54-e69547f34ff4	b0f828e0-6620-4249-b6f7-8523f1dc91c8	Je ne sais pas	3	fr_FR
8429cdbe-c84d-42c5-a4fd-780e8c4580bd	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	Yes	1	en_US
0efcb8a0-1242-492f-9ff7-99e83fd5a6bb	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	No	2	en_US
33a08ba1-a7a8-4088-8c0a-4a7b0eaf60a6	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	I don't know	3	en_US
d7dc320c-bc79-43d5-895b-1bf2290d8859	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	Oui	1	fr_FR
803862cc-f6db-46b5-b3ab-d42cc4bde2ef	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	Non	2	fr_FR
d1671f15-0eae-4aa0-8521-fa7f0788ba55	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	Je ne sais pas	3	fr_FR
978f1ac3-8af7-462d-9a90-8786cf7a087b	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	Yes	1	en_US
d3df5089-bcaa-4dc6-966f-f85c40b931a2	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	No	2	en_US
1b8b1fb2-38ae-4496-bfc4-4402f61d2625	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	I don't know	3	en_US
64ac0dea-b040-4d95-935b-82bed80f0313	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	Oui	1	fr_FR
acbca5c5-de4f-4674-92db-7db148d7fc8a	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	Non	2	fr_FR
af01ee30-714b-4327-8bf3-919079620c73	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	Je ne sais pas	3	fr_FR
01445bcc-c16d-4a25-8e98-00344ffea0e2	877d43c0-ae02-4b6e-b348-ad3494b0a2a0	Yes	1	en_US
f1604188-7add-47a5-b10d-39cde7537cb6	877d43c0-ae02-4b6e-b348-ad3494b0a2a0	No	2	en_US
c916018c-6a8b-4199-87b9-0af06fecb2f9	877d43c0-ae02-4b6e-b348-ad3494b0a2a0	I don't know	3	en_US
63e0394b-96a0-44fc-a4b0-c043997e30cb	877d43c0-ae02-4b6e-b348-ad3494b0a2a0	Oui	1	fr_FR
5c3cedf8-eaab-47ed-abb1-4611c0d562ad	877d43c0-ae02-4b6e-b348-ad3494b0a2a0	Non	2	fr_FR
f4a10aca-8417-46e5-9e00-a3e61bc2b08d	877d43c0-ae02-4b6e-b348-ad3494b0a2a0	Je ne sais pas	3	fr_FR
74f133c4-82dd-4757-97c0-d59d637af8e4	0d46ab9b-8fb1-474d-8a77-566422449236	Yes	1	en_US
5f303668-02ec-42b9-9776-ea9ca2174879	0d46ab9b-8fb1-474d-8a77-566422449236	No	2	en_US
ed6bbbd9-9333-4c7b-bc7d-c6973fff730a	0d46ab9b-8fb1-474d-8a77-566422449236	I don't know	3	en_US
34aadb02-f6df-47e5-ad3f-d33a3f3925b8	0d46ab9b-8fb1-474d-8a77-566422449236	Oui	1	fr_FR
3ac25eb5-cbd6-4c88-8d53-eb9c4675deb8	0d46ab9b-8fb1-474d-8a77-566422449236	Non	2	fr_FR
a6609bec-ccd2-41d3-b979-ec9698eb8233	0d46ab9b-8fb1-474d-8a77-566422449236	Je ne sais pas	3	fr_FR
561d7aef-d5bf-4080-b604-dfc5e2f56331	e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	Yes	1	en_US
78d19fa6-e07f-4775-88f1-8fc047ccdcdc	e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	No	2	en_US
c7a431d9-e71c-4aab-82d6-6cafad82fad1	e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	I don't know	3	en_US
05443c99-4441-4649-92bf-7d713fac5ee8	e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	Oui	1	fr_FR
b09dd602-ac1c-43ec-913a-6dcef536bacb	e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	Non	2	fr_FR
8a35da82-1639-422e-93f1-4f0120b0bb49	e92467c7-7e0c-42b2-984d-6cf2fc91c4ca	Je ne sais pas	3	fr_FR
c4c9ca1f-a84c-4aba-bf44-186b10aaf38d	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	Yes	1	en_US
4a542057-325b-4b64-b7d4-e034860873c8	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	No	2	en_US
05022ed7-3036-4f99-9f75-b7f1a290dbad	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	I don't know	3	en_US
810d03fd-9b08-4bef-9e26-f25dc40d6677	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	Oui	1	fr_FR
3c185343-9ffb-48e9-83aa-dd6fc07aa7c5	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	Non	2	fr_FR
b9bda0e5-4c7c-44e9-ad03-aea41e82055f	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	Je ne sais pas	3	fr_FR
68086145-f388-4144-89eb-6caa48f26017	d6a288b7-0c0e-40d7-9d16-5a35490c961e	Yes	1	en_US
d912390e-d395-45d6-aada-de3a67375088	d6a288b7-0c0e-40d7-9d16-5a35490c961e	No	2	en_US
f252a454-449c-4079-8097-f2d65faefecd	d6a288b7-0c0e-40d7-9d16-5a35490c961e	I don't know	3	en_US
8bedff39-cd65-443a-a8c4-537a9975bd2f	d6a288b7-0c0e-40d7-9d16-5a35490c961e	Oui	1	fr_FR
afd0e57b-defd-4e39-a40d-d6c08d91fcef	d6a288b7-0c0e-40d7-9d16-5a35490c961e	Non	2	fr_FR
b3c34283-0839-4ab6-8fd6-cfcbf06ec9e6	d6a288b7-0c0e-40d7-9d16-5a35490c961e	Je ne sais pas	3	fr_FR
112e7181-2ec5-4dc8-9831-dcf13ff38afb	07817ed1-248b-48c5-8a3f-8bab1d363f2b	Yes	1	en_US
8a8858d5-357d-4d30-8fb8-36c02bd42fa0	07817ed1-248b-48c5-8a3f-8bab1d363f2b	No	2	en_US
8a1c5f39-fb29-4665-a62b-57300ca82ba6	07817ed1-248b-48c5-8a3f-8bab1d363f2b	I don't know	3	en_US
7fbf7757-fcb6-4b50-a5f7-a8517ad79560	07817ed1-248b-48c5-8a3f-8bab1d363f2b	Oui	1	fr_FR
d29a7ca9-7c2f-4cf6-9cd5-515e7f170979	07817ed1-248b-48c5-8a3f-8bab1d363f2b	Non	2	fr_FR
67f39752-e3b6-4ac9-bda6-e421f0bce5a7	07817ed1-248b-48c5-8a3f-8bab1d363f2b	Je ne sais pas	3	fr_FR
a82ce49d-55d3-4fcd-a0d2-08a1cf73f638	5d9f9e71-0476-40d3-844f-6f3ceee1488d	Yes	1	en_US
44869bbe-b50d-45ac-8c16-435a10f4f60f	5d9f9e71-0476-40d3-844f-6f3ceee1488d	No	2	en_US
7a8548ed-7118-4ba2-9359-01b58b70bb2c	5d9f9e71-0476-40d3-844f-6f3ceee1488d	I don't know	3	en_US
73314561-b9a4-4086-b167-490dc48e3e64	5d9f9e71-0476-40d3-844f-6f3ceee1488d	Oui	1	fr_FR
145c30cc-dfce-4001-af75-99ca10ac0e02	5d9f9e71-0476-40d3-844f-6f3ceee1488d	Non	2	fr_FR
f96c9163-bf29-4011-b724-6a14d4ae1f99	5d9f9e71-0476-40d3-844f-6f3ceee1488d	Je ne sais pas	3	fr_FR
0a91c0a9-f7f0-43c9-be5b-ae1ea9768d70	89996d94-15b6-4ab0-bef1-05bd7877f9c0	Yes	1	en_US
764e845f-9382-4a20-b285-9869dc7a8571	89996d94-15b6-4ab0-bef1-05bd7877f9c0	No	2	en_US
5983adea-2a88-430a-a85c-995b964f1688	89996d94-15b6-4ab0-bef1-05bd7877f9c0	I don't know	3	en_US
4687c5ae-0d1e-4a80-88e6-e762324a39d3	89996d94-15b6-4ab0-bef1-05bd7877f9c0	Oui	1	fr_FR
e616b2bb-e836-4e8d-bbd6-b3dc2bcde390	89996d94-15b6-4ab0-bef1-05bd7877f9c0	Non	2	fr_FR
f25766c3-5b92-4733-b0c1-e394054bd353	89996d94-15b6-4ab0-bef1-05bd7877f9c0	Je ne sais pas	3	fr_FR
e16f0999-43da-4515-a6c2-a10623d66c1b	1597c559-8579-435c-b0f2-fb8c5ce40917	Yes	1	en_US
900ea2da-f234-4192-8ced-582befb152dc	1597c559-8579-435c-b0f2-fb8c5ce40917	No	2	en_US
a4e33064-6ed4-4071-8956-ce983ef76263	1597c559-8579-435c-b0f2-fb8c5ce40917	I don't know	3	en_US
01a73e44-b3c0-43a2-9497-97b0bb1c4625	1597c559-8579-435c-b0f2-fb8c5ce40917	Oui	1	fr_FR
0cd2b89a-9700-4be7-9507-af755add5d4d	1597c559-8579-435c-b0f2-fb8c5ce40917	Non	2	fr_FR
70c276c2-9da0-45ce-91ac-0b4725f52256	1597c559-8579-435c-b0f2-fb8c5ce40917	Je ne sais pas	3	fr_FR
81d66753-3c81-4238-8664-d6074fb96e19	ef344e03-8c7c-4fc9-9535-83bd8978d346	Yes	1	en_US
75f02892-b6c9-49cc-a54f-115561ec5782	ef344e03-8c7c-4fc9-9535-83bd8978d346	No	2	en_US
23cfd56d-61b3-412d-8b53-56b0360d073f	ef344e03-8c7c-4fc9-9535-83bd8978d346	I don't know	3	en_US
f02c8c67-1969-4d51-93a0-0d2efe509e2b	ef344e03-8c7c-4fc9-9535-83bd8978d346	Oui	1	fr_FR
16274695-c55a-4b01-8109-d2577ae96b1f	ef344e03-8c7c-4fc9-9535-83bd8978d346	Non	2	fr_FR
2d8a462e-c306-4bc9-86a2-9a14d400a97d	ef344e03-8c7c-4fc9-9535-83bd8978d346	Je ne sais pas	3	fr_FR
dcd0a12a-2172-4a81-8969-78855a15c0bb	d9763a18-a497-4720-9deb-82a84e1f14ad	Yes	1	en_US
3ac19409-ae3c-4a40-9030-5c07899bb9c2	d9763a18-a497-4720-9deb-82a84e1f14ad	No	2	en_US
ef97ff03-ad34-4150-9185-7da3f0a61c3f	d9763a18-a497-4720-9deb-82a84e1f14ad	I don't know	3	en_US
fa350a59-71d4-4a1f-a326-f52a77e106ae	d9763a18-a497-4720-9deb-82a84e1f14ad	Oui	1	fr_FR
4c294c32-6ae3-43bf-b729-098b392f1d27	d9763a18-a497-4720-9deb-82a84e1f14ad	Non	2	fr_FR
f01e48f9-ba41-4dce-b0fa-3ae6a0ab86a1	d9763a18-a497-4720-9deb-82a84e1f14ad	Je ne sais pas	3	fr_FR
f41daeee-452d-4681-a844-a47d9ae66733	5d7d94fd-acd6-4433-b5e3-14599f51cc1f	Yes	1	en_US
84bafbe8-38b7-4a7c-818b-9aa155b26699	5d7d94fd-acd6-4433-b5e3-14599f51cc1f	No	2	en_US
8d28cafd-acd7-4e12-bcf7-bd3a48b957d7	5d7d94fd-acd6-4433-b5e3-14599f51cc1f	I don't know	3	en_US
50d592be-084c-4c95-867f-b0f860196cfe	5d7d94fd-acd6-4433-b5e3-14599f51cc1f	Oui	1	fr_FR
e8742230-2df5-4cb6-8c05-2e0c29e65ea2	5d7d94fd-acd6-4433-b5e3-14599f51cc1f	Non	2	fr_FR
01b66281-a59f-4316-af5c-4360866e4004	5d7d94fd-acd6-4433-b5e3-14599f51cc1f	Je ne sais pas	3	fr_FR
c8ff01f2-042f-4743-a363-5f07b203eac6	cab31e27-336c-46d8-b1cb-e742d273ebe6	Yes	1	en_US
dfdcaa0a-133d-4568-8bac-efa3eb3fca3f	cab31e27-336c-46d8-b1cb-e742d273ebe6	No	2	en_US
b7e8e880-420f-4f16-a745-ba301755e6b0	cab31e27-336c-46d8-b1cb-e742d273ebe6	I don't know	3	en_US
28a6f4c8-1dad-4adf-8fdf-157d3b1eea27	cab31e27-336c-46d8-b1cb-e742d273ebe6	Oui	1	fr_FR
33b39235-46a7-48c5-b0fc-111742afed65	cab31e27-336c-46d8-b1cb-e742d273ebe6	Non	2	fr_FR
aad8648f-63b2-4ff2-a660-cbbcd7585156	cab31e27-336c-46d8-b1cb-e742d273ebe6	Je ne sais pas	3	fr_FR
c0e51c1e-7aa3-40ef-9e98-66c5882e5f00	988e0abb-3547-40b9-a776-2173f8c07676	Yes	1	en_US
933664bc-6879-46c3-b2da-abb12d88e7f8	988e0abb-3547-40b9-a776-2173f8c07676	No	2	en_US
8bc94e71-d4da-440c-98dc-647facbf58a1	988e0abb-3547-40b9-a776-2173f8c07676	I don't know	3	en_US
469e2f2c-f400-4948-96bc-f506e713d3d8	988e0abb-3547-40b9-a776-2173f8c07676	Oui	1	fr_FR
63d641e2-35c2-4072-b942-91548bbf5509	988e0abb-3547-40b9-a776-2173f8c07676	Non	2	fr_FR
d637ec73-56a4-4c86-86ac-24ba42e14ec6	988e0abb-3547-40b9-a776-2173f8c07676	Je ne sais pas	3	fr_FR
4acc0519-244d-431b-b578-1ceaac561a02	a316639f-bd7a-4377-970a-a302d2e821fd	Yes	1	en_US
5437e480-8dfe-4dd6-8333-e79c20d01c0f	a316639f-bd7a-4377-970a-a302d2e821fd	No	2	en_US
a3085cf9-7806-4cfc-81cb-4bab5472812f	a316639f-bd7a-4377-970a-a302d2e821fd	I don't know	3	en_US
2cc8cdec-f9bd-4262-bca2-07cde74ad16b	a316639f-bd7a-4377-970a-a302d2e821fd	Oui	1	fr_FR
4ca6cdc1-0fae-4548-8ab9-4d97c7fe9948	a316639f-bd7a-4377-970a-a302d2e821fd	Non	2	fr_FR
a4894eaf-3306-4832-b03d-a125fc8ea0cd	a316639f-bd7a-4377-970a-a302d2e821fd	Je ne sais pas	3	fr_FR
b72a5c21-7f20-4d84-be26-f866e840858e	286e0137-37b7-4333-9425-e22f09f6b12f	Yes	1	en_US
b0b19b80-6679-4423-9acd-82337e0f49ee	286e0137-37b7-4333-9425-e22f09f6b12f	No	2	en_US
2f4ecf4d-d2b4-4dac-9961-ae66d72386f8	286e0137-37b7-4333-9425-e22f09f6b12f	I don't know	3	en_US
a2a6363d-2725-43e0-babb-e6d1f3ef8d8c	286e0137-37b7-4333-9425-e22f09f6b12f	Oui	1	fr_FR
741e203f-9c15-4860-ae37-b5ff589fe5f8	286e0137-37b7-4333-9425-e22f09f6b12f	Non	2	fr_FR
26196e10-a041-43c3-a8a5-aeba8ebe5883	286e0137-37b7-4333-9425-e22f09f6b12f	Je ne sais pas	3	fr_FR
41722e0f-faf4-4fa8-a5cc-8d5c1ea2b7fc	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	Yes	1	en_US
87a1d1cd-d0bb-475b-a8eb-670039de7914	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	No	2	en_US
15887a53-09d7-478f-bf72-6de85a2c5053	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	I don't know	3	en_US
9efbeb3f-4208-4b60-9792-64d53702079f	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	Oui	1	fr_FR
bcd3bb5e-c358-4b1b-ace5-01c0b2f9d8a0	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	Non	2	fr_FR
875d8713-9a73-4f63-a34b-df33eddfd17f	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	Je ne sais pas	3	fr_FR
92b6857b-8dea-405c-b03d-9383b58b114f	6f41cc91-25c3-4e8d-afca-98c15aa707ef	Yes	1	en_US
6840020b-2197-4c8e-a524-5df144efb60e	6f41cc91-25c3-4e8d-afca-98c15aa707ef	No	2	en_US
21aeee5d-6e0f-4e97-9411-480f62e3fb2d	6f41cc91-25c3-4e8d-afca-98c15aa707ef	I don't know	3	en_US
2ad6dde5-6385-4a43-a56f-3f82f24a46f8	6f41cc91-25c3-4e8d-afca-98c15aa707ef	Oui	1	fr_FR
a267e9d6-5e70-4dbd-9e62-c3f9f9865386	6f41cc91-25c3-4e8d-afca-98c15aa707ef	Non	2	fr_FR
2df46a99-e34f-4973-ad3c-c281ccbd54fc	6f41cc91-25c3-4e8d-afca-98c15aa707ef	Je ne sais pas	3	fr_FR
b0f04700-b86e-4ebe-9b87-3b99a38ee132	25e8843b-7c61-4083-be6b-1d588cc16cd7	Yes	1	en_US
9ef2926f-7f44-455a-87f2-e23d7e58f7a8	25e8843b-7c61-4083-be6b-1d588cc16cd7	No	2	en_US
63b9989c-f511-4ec1-aeb5-902a06515d19	25e8843b-7c61-4083-be6b-1d588cc16cd7	I don't know	3	en_US
6cea944b-351a-4548-a3c0-6b4f8f49704e	25e8843b-7c61-4083-be6b-1d588cc16cd7	Oui	1	fr_FR
00b7fca0-618d-4295-a6d4-6330e76e732c	25e8843b-7c61-4083-be6b-1d588cc16cd7	Non	2	fr_FR
dd995277-5e68-4a4c-8788-f56d509ab013	25e8843b-7c61-4083-be6b-1d588cc16cd7	Je ne sais pas	3	fr_FR
2e4ac68b-3cbd-4fb6-91ad-abc0d49b734f	15a4b211-7234-414e-a0cc-d38e2d52608a	Yes	1	en_US
43f9e17b-d12e-4e76-b485-4fec15729855	15a4b211-7234-414e-a0cc-d38e2d52608a	No	2	en_US
dcb9a911-2869-458c-bdf1-11d964c51153	15a4b211-7234-414e-a0cc-d38e2d52608a	I don't know	3	en_US
dd32e033-aa28-41d1-8499-da4ed6432f1e	15a4b211-7234-414e-a0cc-d38e2d52608a	Oui	1	fr_FR
3cfcd89d-ba5a-49da-8e36-3a63232b09a2	15a4b211-7234-414e-a0cc-d38e2d52608a	Non	2	fr_FR
59376451-abf5-4536-821c-244030018ee9	15a4b211-7234-414e-a0cc-d38e2d52608a	Je ne sais pas	3	fr_FR
5a36e9e2-9cdd-4e85-8ceb-b84cc57a99a0	4abff3d2-6104-4116-b515-77416e81dc12	Yes	1	en_US
a4d55825-4986-448b-907e-613d3f38f331	4abff3d2-6104-4116-b515-77416e81dc12	No	2	en_US
a3bbc3a6-d6a0-4c73-a986-9b387333c920	4abff3d2-6104-4116-b515-77416e81dc12	I don't know	3	en_US
5ea39d47-caeb-4b62-bb47-d0d49dafe744	4abff3d2-6104-4116-b515-77416e81dc12	Oui	1	fr_FR
33c4f594-4cd2-408b-a2c3-131e6baecae3	4abff3d2-6104-4116-b515-77416e81dc12	Non	2	fr_FR
14661d12-201d-4758-b256-eb77bfe7f2b1	4abff3d2-6104-4116-b515-77416e81dc12	Je ne sais pas	3	fr_FR
6b99fcdc-a4c0-4433-bd6a-e92d570ea87f	d64d2979-98ba-48a7-8534-c60877e5b965	Yes	1	en_US
c8625024-dd8b-450f-9133-b0d901f6677c	d64d2979-98ba-48a7-8534-c60877e5b965	No	2	en_US
3bc834da-99eb-4e55-93ef-a5e9c6df32bc	d64d2979-98ba-48a7-8534-c60877e5b965	I don't know	3	en_US
be42978b-bb72-4d57-9a17-151ebd7576be	d64d2979-98ba-48a7-8534-c60877e5b965	Oui	1	fr_FR
7c41110c-5cb5-4342-9d51-699d01c14765	d64d2979-98ba-48a7-8534-c60877e5b965	Non	2	fr_FR
84352ced-3b52-43b5-a974-c9f03e0acd23	d64d2979-98ba-48a7-8534-c60877e5b965	Je ne sais pas	3	fr_FR
0cf8518a-9eb2-438d-b532-0ae1583a6e12	af62a94b-d5d3-445d-bde2-f2e0c4af0a41	Yes	1	en_US
c0dd68bc-01ee-4365-91b2-2b0053deeafb	af62a94b-d5d3-445d-bde2-f2e0c4af0a41	No	2	en_US
a95ac0a5-233a-4e0e-85d5-1e25516fec8d	af62a94b-d5d3-445d-bde2-f2e0c4af0a41	I don't know	3	en_US
00334859-a293-4a99-9168-0964e592c7f8	af62a94b-d5d3-445d-bde2-f2e0c4af0a41	Oui	1	fr_FR
ec7c3bbd-bcb5-4fd1-a81f-9cdad9085ff3	af62a94b-d5d3-445d-bde2-f2e0c4af0a41	Non	2	fr_FR
9305a9ad-9a97-43c2-9395-1e433a17d751	af62a94b-d5d3-445d-bde2-f2e0c4af0a41	Je ne sais pas	3	fr_FR
06e7e5ae-448b-438b-b3fd-c3ba6b088903	58d57815-902b-471f-bb08-3f4ca052015c	Yes	1	en_US
b41bb937-f5c3-4d54-bdad-b50968cfe3c8	58d57815-902b-471f-bb08-3f4ca052015c	No	2	en_US
9f8c41de-d372-4d81-8832-f49bf97309bd	58d57815-902b-471f-bb08-3f4ca052015c	I don't know	3	en_US
2470ad55-0aff-4ee8-b257-87e0f9569dc1	58d57815-902b-471f-bb08-3f4ca052015c	Oui	1	fr_FR
3a26e9c3-ae59-454f-a18a-e76e2bbe5e7a	58d57815-902b-471f-bb08-3f4ca052015c	Non	2	fr_FR
8f79cd16-9602-4e54-99f9-4438b131e7f8	58d57815-902b-471f-bb08-3f4ca052015c	Je ne sais pas	3	fr_FR
8e8973a5-6bce-4288-bff3-77603a045222	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	Yes	1	en_US
2b58e086-cf2d-4465-8472-fee71c44763f	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	No	2	en_US
98dd5be8-d3d4-4f70-b1e4-97d6386a5242	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	I don't know	3	en_US
0eed0d9e-a9b6-4472-b951-9ca49448882b	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	Oui	1	fr_FR
0a389a76-a0f5-4725-bb91-d3336e8adb4f	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	Non	2	fr_FR
66fabdef-284c-489a-bf2e-4eef3ccb3b07	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	Je ne sais pas	3	fr_FR
a18a6760-ef5f-420c-b7b8-fed3910d8561	6c19256b-78e2-428e-a12e-414f1e41bbff	Yes	1	en_US
2391f526-109b-41e0-a7e1-607434bd5e48	6c19256b-78e2-428e-a12e-414f1e41bbff	No	2	en_US
5cf52bf2-e4b1-488c-9f98-dde22e38a2b0	6c19256b-78e2-428e-a12e-414f1e41bbff	I don't know	3	en_US
16afd0ab-c119-4ba6-9559-e260cfaaabbb	6c19256b-78e2-428e-a12e-414f1e41bbff	Oui	1	fr_FR
6f8b7124-5f54-4069-889c-c4b117c8b372	6c19256b-78e2-428e-a12e-414f1e41bbff	Non	2	fr_FR
8dd58208-e82b-4c60-a974-80a59ebbd373	6c19256b-78e2-428e-a12e-414f1e41bbff	Je ne sais pas	3	fr_FR
75f67a24-5db2-46bc-8590-38937afc983d	40c6c153-e108-4087-992d-40393c5c8d0f	Yes	1	en_US
bc6458af-993b-4384-9fb7-613143e3211e	40c6c153-e108-4087-992d-40393c5c8d0f	No	2	en_US
71d32df9-3b99-44f4-b33e-6061e94f7368	40c6c153-e108-4087-992d-40393c5c8d0f	I don't know	3	en_US
3cd2f0e9-e176-4da2-ab0a-191e6d35289b	40c6c153-e108-4087-992d-40393c5c8d0f	Oui	1	fr_FR
e050933d-1c9b-4c3e-8241-7ffd4639603a	40c6c153-e108-4087-992d-40393c5c8d0f	Non	2	fr_FR
e8ea9831-7f63-462d-80b9-e19e62e3c739	40c6c153-e108-4087-992d-40393c5c8d0f	Je ne sais pas	3	fr_FR
0b7cf092-1258-43bc-bade-6958d9121489	271e9d82-2f38-41a5-bc6f-4a79d172fe51	Yes	1	en_US
e907f2d9-0e34-446b-9aaf-1506ebe0bc11	271e9d82-2f38-41a5-bc6f-4a79d172fe51	No	2	en_US
13df8069-a05e-4ba9-aa94-103a64b239c4	271e9d82-2f38-41a5-bc6f-4a79d172fe51	I don't know	3	en_US
ef9eaab6-1a10-4d06-be5d-4821809f70cb	271e9d82-2f38-41a5-bc6f-4a79d172fe51	Oui	1	fr_FR
273bf6a6-804f-41d8-9caa-b0e80254f3c4	271e9d82-2f38-41a5-bc6f-4a79d172fe51	Non	2	fr_FR
8b1f6d5f-b2db-4f67-b173-33701ebd69cf	271e9d82-2f38-41a5-bc6f-4a79d172fe51	Je ne sais pas	3	fr_FR
d2770a1b-0c60-4a91-a4bd-b78e1e83e953	f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	Yes	1	en_US
47b8e75b-6b81-4581-bf2c-151bf787657e	f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	No	2	en_US
7a3fe548-bcf7-4b38-9d25-defff7dba528	f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	I don't know	3	en_US
adb6418e-d373-420b-9774-562da6c160d6	f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	Oui	1	fr_FR
4eb3079d-9eb1-445a-a752-6463b1a6f65c	f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	Non	2	fr_FR
9c62e6e0-ffa9-446d-ab84-2aeabe53ed6f	f8cf50b5-2fa8-42e9-a279-2f63948dcbe5	Je ne sais pas	3	fr_FR
8dad7ea8-8715-4696-93e6-d0da6ee45882	f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	Yes	1	en_US
f7bcdad0-fc56-4fa1-8549-c858a32d1ba3	f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	No	2	en_US
d4550b9d-cb12-40f9-90dc-94de3d382ca5	f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	I don't know	3	en_US
7c153203-31db-44b3-89c2-d93a8d3318ae	f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	Oui	1	fr_FR
444b3bf9-84bb-47ce-895a-2d8e1050c4b6	f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	Non	2	fr_FR
c85f57c5-6b3e-4313-bffe-4e9407832fa2	f9f9d889-e0dc-49e9-8a8a-efd9a1105d5b	Je ne sais pas	3	fr_FR
0c78a18d-05de-41a6-a220-53717f27147b	e8655fe7-56a8-4e21-a664-4ae0be515c44	Yes	1	en_US
bc9e7f7c-ca17-4de6-bf54-a7e524274fb3	e8655fe7-56a8-4e21-a664-4ae0be515c44	No	2	en_US
ecd39943-79fd-4a5d-aa13-40fcc6cb860f	e8655fe7-56a8-4e21-a664-4ae0be515c44	I don't know	3	en_US
f84eb5c8-009e-410e-9569-3c247ee1b976	e8655fe7-56a8-4e21-a664-4ae0be515c44	Oui	1	fr_FR
c851bd82-0ec0-4da3-b685-755cdd7837c7	e8655fe7-56a8-4e21-a664-4ae0be515c44	Non	2	fr_FR
eaee250e-c0eb-4769-8f76-95f9ea9e02b5	e8655fe7-56a8-4e21-a664-4ae0be515c44	Je ne sais pas	3	fr_FR
2ffa7e99-f0a0-4ec0-84e1-e56c410bf7ac	9d9e6425-934d-4566-8430-4f7b9e86b26b	Yes	1	en_US
6a47a8e7-4c4a-4cc8-82f3-ff0ec8a10eb5	9d9e6425-934d-4566-8430-4f7b9e86b26b	No	2	en_US
d085e976-27df-4631-a719-b7dd9d88f4bf	9d9e6425-934d-4566-8430-4f7b9e86b26b	I don't know	3	en_US
bc8fe8ac-8d3c-4b8a-b830-8bb39c637ba1	9d9e6425-934d-4566-8430-4f7b9e86b26b	Oui	1	fr_FR
41fb6f7f-6587-4f8f-b667-a00224ea5ad2	9d9e6425-934d-4566-8430-4f7b9e86b26b	Non	2	fr_FR
738374ec-65a9-4fad-93e8-2a54f54e5dc5	9d9e6425-934d-4566-8430-4f7b9e86b26b	Je ne sais pas	3	fr_FR
218636f3-f54f-4845-b505-db6a3137a22f	a7d730e1-30f5-40df-b95b-cb972ecdd573	Yes	1	en_US
e86c79ef-b8c3-46a6-8ec4-c79ed841b2e8	a7d730e1-30f5-40df-b95b-cb972ecdd573	No	2	en_US
6d767d90-7d37-4643-9991-31a165e8dcd3	a7d730e1-30f5-40df-b95b-cb972ecdd573	I don't know	3	en_US
eb5a1684-8041-4719-a607-7b2684f117a6	a7d730e1-30f5-40df-b95b-cb972ecdd573	Oui	1	fr_FR
24717988-78f8-41f8-b270-070f677537db	a7d730e1-30f5-40df-b95b-cb972ecdd573	Non	2	fr_FR
0a31fa8d-ab27-46ac-979b-ab911d5653c1	a7d730e1-30f5-40df-b95b-cb972ecdd573	Je ne sais pas	3	fr_FR
c505af54-a1a2-4349-9a1e-0211bd6771ab	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	Yes	1	en_US
baeb0dd9-3d1a-444f-b890-d63067fba96b	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	No	2	en_US
22b61adb-af9e-434e-9322-e6eab41df0ae	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	I don't know	3	en_US
a7b2a34c-e733-4f04-b016-ad1f2e6889a7	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	Oui	1	fr_FR
b63d3265-49c5-400e-8212-e4389559e899	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	Non	2	fr_FR
6650f3e4-e67a-416b-894f-75100895863e	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	Je ne sais pas	3	fr_FR
887ad684-0fc8-478a-9002-12babc1c57e8	64e790c9-1224-4ef9-9b4c-34c8740d8f24	Yes	1	en_US
e7c18937-f37c-4021-b504-555bc242f26d	64e790c9-1224-4ef9-9b4c-34c8740d8f24	No	2	en_US
0e34a0ce-b326-447d-a42f-1521ff3dbf79	64e790c9-1224-4ef9-9b4c-34c8740d8f24	I don't know	3	en_US
c20d9591-5f33-4f83-87d0-4d50882d1517	64e790c9-1224-4ef9-9b4c-34c8740d8f24	Oui	1	fr_FR
fc9589c5-363a-4759-8db4-1ce8b6fdf140	64e790c9-1224-4ef9-9b4c-34c8740d8f24	Non	2	fr_FR
4f6cbad6-158f-4a67-950b-08585d83e4c0	64e790c9-1224-4ef9-9b4c-34c8740d8f24	Je ne sais pas	3	fr_FR
bb2a3076-f956-493a-a100-6f560a0bb741	cc8b6725-f8d7-4522-b70d-2e201057639c	Yes	1	en_US
080384b9-1c54-4510-b2fc-87ef4e7d44f8	cc8b6725-f8d7-4522-b70d-2e201057639c	No	2	en_US
0623d880-369d-4346-a47d-379f109eeac0	cc8b6725-f8d7-4522-b70d-2e201057639c	I don't know	3	en_US
b4ea9c8c-5c90-4068-819b-4b387440c8f6	cc8b6725-f8d7-4522-b70d-2e201057639c	Oui	1	fr_FR
bd7f5ae0-401e-479e-8384-b3e4e74d79f3	cc8b6725-f8d7-4522-b70d-2e201057639c	Non	2	fr_FR
eb226054-2334-4594-ab86-f45e3f84f843	cc8b6725-f8d7-4522-b70d-2e201057639c	Je ne sais pas	3	fr_FR
ef67593b-77f1-490f-b046-4440b2e07f9b	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	Yes	1	en_US
486855a7-a28e-47c9-8cca-60d73b2faea7	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	No	2	en_US
36176eda-89dd-47f4-8c50-2702d877b5c7	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	I don't know	3	en_US
ac375f44-0857-42fb-bca2-96e6b28f4bb5	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	Oui	1	fr_FR
929739ba-3b19-419a-a0b2-a080e27f14ca	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	Non	2	fr_FR
a9683caf-2061-4af5-b951-6d0d74f2a50d	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	Je ne sais pas	3	fr_FR
444edcc2-d12b-4394-88b5-f880f9773e43	22cedfd9-1375-4d92-b023-b2a49c6c2b57	Yes	1	en_US
6ec15f4b-8cc8-4fd7-b5ce-9fae67a26dce	22cedfd9-1375-4d92-b023-b2a49c6c2b57	No	2	en_US
e1c2de7a-a6cf-4f5e-8921-e6d113df28d6	22cedfd9-1375-4d92-b023-b2a49c6c2b57	I don't know	3	en_US
56ae2e71-bb24-4eb0-a63b-ee400df461d7	22cedfd9-1375-4d92-b023-b2a49c6c2b57	Oui	1	fr_FR
4ea52f8a-2757-4061-955f-2950b3397483	22cedfd9-1375-4d92-b023-b2a49c6c2b57	Non	2	fr_FR
e338c5ed-45d9-4bc7-aa12-a5db60dca4e0	22cedfd9-1375-4d92-b023-b2a49c6c2b57	Je ne sais pas	3	fr_FR
ce68af1e-1445-41db-8f17-e8dac4d2c156	4099456e-5461-4401-b552-34f8e891ba35	Yes	1	en_US
b7c21542-21f9-4464-9e74-761787c14ade	4099456e-5461-4401-b552-34f8e891ba35	No	2	en_US
e6b819a4-2388-4898-8767-35a761ca6b39	4099456e-5461-4401-b552-34f8e891ba35	I don't know	3	en_US
f692a90c-9b43-4ed2-97d6-0b69f65b476a	4099456e-5461-4401-b552-34f8e891ba35	Oui	1	fr_FR
41db97b6-b3c9-4818-9236-2dd3e47db2e3	4099456e-5461-4401-b552-34f8e891ba35	Non	2	fr_FR
546b87b3-13e7-4d2b-b06d-04c0234b5b01	4099456e-5461-4401-b552-34f8e891ba35	Je ne sais pas	3	fr_FR
03e1bca5-1ca2-43ed-ace2-c021d0dac3f9	a2ef7497-bbdd-4be7-83c7-319c2cbc212f	Yes	1	en_US
6b3a6f05-4083-4243-aed6-2e7df0154864	a2ef7497-bbdd-4be7-83c7-319c2cbc212f	No	2	en_US
e4c85949-3185-49aa-89ef-49a79f9638c7	a2ef7497-bbdd-4be7-83c7-319c2cbc212f	I don't know	3	en_US
8a6a631b-8a91-4632-8892-b7fbaaa9e200	a2ef7497-bbdd-4be7-83c7-319c2cbc212f	Oui	1	fr_FR
56383671-cba2-4889-8ed6-1deb17feacb5	a2ef7497-bbdd-4be7-83c7-319c2cbc212f	Non	2	fr_FR
e2beedba-2eb6-4484-8708-f41ce9adc412	a2ef7497-bbdd-4be7-83c7-319c2cbc212f	Je ne sais pas	3	fr_FR
cf0c3f8d-28cf-45a3-8d4e-c77faf4fd5f7	12ac45a4-8e5e-482c-bd1c-ba87168f1098	Yes	1	en_US
6a65697d-7c12-4b81-8bfe-e0b0d7086c50	12ac45a4-8e5e-482c-bd1c-ba87168f1098	No	2	en_US
239fcedd-23d4-49da-badf-017e917c38c4	12ac45a4-8e5e-482c-bd1c-ba87168f1098	I don't know	3	en_US
1aed24e5-85f3-4151-9d92-3fb741d5233a	12ac45a4-8e5e-482c-bd1c-ba87168f1098	Oui	1	fr_FR
b8a573e9-6587-4709-b3be-8c37acfd7a57	12ac45a4-8e5e-482c-bd1c-ba87168f1098	Non	2	fr_FR
4c6345e3-f87b-4e0f-94b4-043da247e3dc	12ac45a4-8e5e-482c-bd1c-ba87168f1098	Je ne sais pas	3	fr_FR
7beba03e-faaf-4760-81d2-9148de930522	9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	Yes	1	en_US
d4b95262-e7af-4c2b-a265-d71def895fc7	9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	No	2	en_US
bc11ee15-0ea8-442e-a8de-3884c0b19398	9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	I don't know	3	en_US
e9bebb31-04c7-4f8c-b9d1-2e4b36b2e948	9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	Oui	1	fr_FR
76f63a67-8498-4cde-91bf-c8e2e9155ec8	9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	Non	2	fr_FR
5d0003b9-769f-4c31-8575-9d3f093e3552	9ec2f6fc-3e1b-4837-8aac-e18f098f08d4	Je ne sais pas	3	fr_FR
633b33b7-e90e-43c3-80c2-d4234502c422	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	Yes	1	en_US
a905523c-1449-4a67-b593-1e99d9f76c0a	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	No	2	en_US
8c46b3f6-3f21-47a7-8b66-da1ef1629eb7	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	I don't know	3	en_US
a1607d4b-80fd-4048-9d20-05274c483184	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	Oui	1	fr_FR
3e414317-40df-4e0a-b08a-f1e4e0555803	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	Non	2	fr_FR
c76616bd-1eb4-4bf4-909e-4f3175ff6124	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	Je ne sais pas	3	fr_FR
b6c27bed-9f1f-4c75-9cb4-cb54d6b475c6	5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	Yes	1	en_US
5c72a55f-aedb-41c0-9e1e-128d244eb7a5	5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	No	2	en_US
a985adac-a58e-4a57-9514-ee599d0e04cf	5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	I don't know	3	en_US
dfdbc637-98d1-4bba-bae8-72da5003db8d	5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	Oui	1	fr_FR
9ec50aa9-258c-4f47-9c15-b9967cfbff5a	5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	Non	2	fr_FR
a2afa073-4ff0-48ab-9168-de047b8b9836	5b0f9b04-2ff6-4a7a-9ed7-c14e911a45e1	Je ne sais pas	3	fr_FR
42079b99-ffda-484e-8bd4-a6851291c2ea	64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	Yes	1	en_US
231ba31c-fcc6-4a5c-a4b0-326534f5db34	64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	No	2	en_US
aa537151-39f3-491d-8ee6-6e87655601f1	64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	I don't know	3	en_US
bcbb813d-e1e8-4449-ae4c-72f1a4b47b6b	64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	Oui	1	fr_FR
cc91dcac-4d68-4dc2-b107-2f394821a40d	64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	Non	2	fr_FR
23f304e4-5fad-4fe0-a565-36408c788e16	64dbb6b4-c6b2-4167-9669-ca0ef16a3a3c	Je ne sais pas	3	fr_FR
9852fc8d-e5f4-445d-bc6c-a6846e2c3e17	f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	Yes	1	en_US
0e189908-5449-47b8-8eb1-2b8423fb1629	f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	No	2	en_US
774c4de9-ef11-4d09-a49d-87167c98e49a	f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	I don't know	3	en_US
9c7ff3ce-d43d-4056-85f9-d500abd5a07d	f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	Oui	1	fr_FR
f06ca4cf-624b-464d-b62e-1ecb18d2b851	f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	Non	2	fr_FR
b9a1b398-978b-475f-919e-74f03c5955c4	f2f3f0de-ca3e-4bdb-87a1-fb5257b9be4d	Je ne sais pas	3	fr_FR
a8273120-128e-4724-b545-915987c4e062	405ba252-6b60-4426-a300-25e7932c2593	Yes	1	en_US
a51f81f7-2d1f-4ea0-bcb3-65e4e26d6c57	405ba252-6b60-4426-a300-25e7932c2593	No	2	en_US
562a4f2c-e142-4e3c-a9e7-78c22ba31a8b	405ba252-6b60-4426-a300-25e7932c2593	I don't know	3	en_US
5ea769e8-141c-441a-b21e-70f033bc83c5	405ba252-6b60-4426-a300-25e7932c2593	Oui	1	fr_FR
bd9e67b2-954d-4379-8a75-31f8e4b76d6b	405ba252-6b60-4426-a300-25e7932c2593	Non	2	fr_FR
cc6cdcae-15a7-47e0-ab90-a76ae9b667df	405ba252-6b60-4426-a300-25e7932c2593	Je ne sais pas	3	fr_FR
7836da77-b61a-4963-9c3f-ce501a3ecc5b	6d4e69d7-156c-4855-81ea-263a87482c03	Yes	1	en_US
c52254be-d612-4c2d-ad1a-d60659de6988	6d4e69d7-156c-4855-81ea-263a87482c03	No	2	en_US
cb63ac6d-830d-4dcd-85e3-227aaa32c5c1	6d4e69d7-156c-4855-81ea-263a87482c03	I don't know	3	en_US
11b59835-cf93-483b-a31e-7d60929317dc	6d4e69d7-156c-4855-81ea-263a87482c03	Oui	1	fr_FR
abf6ee87-52e5-4e89-bd96-4b27e753a8eb	6d4e69d7-156c-4855-81ea-263a87482c03	Non	2	fr_FR
41e6034a-d59b-49ff-9e77-654c7df6877a	6d4e69d7-156c-4855-81ea-263a87482c03	Je ne sais pas	3	fr_FR
ef9904c9-17a6-4390-b9c3-c2a6133b65f7	1a53ad26-5577-473f-8787-68ddd30a49f0	Yes	1	en_US
14eb67f9-65a1-4abf-9783-62bc4e5cd45a	1a53ad26-5577-473f-8787-68ddd30a49f0	No	2	en_US
1b00cb51-76f7-4aa8-9dbd-bf1dc24b7cdc	1a53ad26-5577-473f-8787-68ddd30a49f0	I don't know	3	en_US
6fe812f7-031a-48aa-9fdd-8be0127fa4f3	1a53ad26-5577-473f-8787-68ddd30a49f0	Oui	1	fr_FR
cbb850b3-040f-409d-a6b8-d510b47dd6dc	1a53ad26-5577-473f-8787-68ddd30a49f0	Non	2	fr_FR
5f4ef244-c3d9-4087-a382-9bc3b89b3139	1a53ad26-5577-473f-8787-68ddd30a49f0	Je ne sais pas	3	fr_FR
c636cb3d-95db-470c-8fa5-702a76420a56	f6cb71fd-f034-4b41-a3f3-2f558010179d	Yes	1	en_US
8de8266b-b937-445b-b4b5-74200e2d8a78	f6cb71fd-f034-4b41-a3f3-2f558010179d	No	2	en_US
0501dd3c-3f43-45ad-a013-e3772e61c920	f6cb71fd-f034-4b41-a3f3-2f558010179d	I don't know	3	en_US
6a6dbc87-6a2b-47d6-83d4-1fe9da8336a8	f6cb71fd-f034-4b41-a3f3-2f558010179d	Oui	1	fr_FR
0f6906a7-2c9f-403f-bce5-4de18960087a	f6cb71fd-f034-4b41-a3f3-2f558010179d	Non	2	fr_FR
13ca2f1b-ef3d-4548-8670-45b37350ee8b	f6cb71fd-f034-4b41-a3f3-2f558010179d	Je ne sais pas	3	fr_FR
c713ea6d-9cfd-47a9-8806-a97dab51b768	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	Yes	1	en_US
2d350658-93e5-4245-9922-41fddd1e75b0	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	No	2	en_US
a8b0062a-d7a9-4d6e-a7d9-12ff6d9b3518	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	I don't know	3	en_US
b463dfd7-24f3-426f-b48a-ac9f0291ede6	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	Oui	1	fr_FR
65b51738-8c45-4217-931f-bcafa7d72f31	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	Non	2	fr_FR
7ab3dd3f-51f1-49e8-8972-45706e7b0a7a	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	Je ne sais pas	3	fr_FR
6cc7967f-cbc4-46b4-9d14-0677efd067a4	612bac3b-7df4-472a-a80c-1de549a6b1ed	Yes	1	en_US
8f234fa6-ae7c-437f-8ebd-457f68d48ab3	612bac3b-7df4-472a-a80c-1de549a6b1ed	No	2	en_US
149a0bb0-4af5-4cd8-8a92-26ea39f79e05	612bac3b-7df4-472a-a80c-1de549a6b1ed	I don't know	3	en_US
8f22bc8e-ab60-49c8-9c4e-e3a07afcb2ec	612bac3b-7df4-472a-a80c-1de549a6b1ed	Oui	1	fr_FR
69f53811-0c09-4805-83ae-9f0ae02cee8e	612bac3b-7df4-472a-a80c-1de549a6b1ed	Non	2	fr_FR
ea349491-a650-42e3-b94a-f84a7699b93e	612bac3b-7df4-472a-a80c-1de549a6b1ed	Je ne sais pas	3	fr_FR
6b072db5-0af9-48f5-b830-acd2e2dfc6d7	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	Yes	1	en_US
35eaadfd-ac4e-48ce-b9e3-3e5f74b1482a	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	No	2	en_US
7db414dc-e062-4f13-b6d3-ffdcd052fe04	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	I don't know	3	en_US
b240e781-9ca9-4f05-b9ac-63c6a445c634	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	Oui	1	fr_FR
f8d96324-a58f-4041-8449-9d71d086b0d8	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	Non	2	fr_FR
3b15a068-d91a-45ce-b170-2503e78f3096	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	Je ne sais pas	3	fr_FR
a9082ad1-624c-43db-a821-7fa096cf9b86	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	Yes	1	en_US
eeb31c20-e833-43ed-8199-5dea1d4a99e2	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	No	2	en_US
008aed72-d553-4f81-9f97-328ec3771124	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	I don't know	3	en_US
1fa20903-21bb-44c4-b854-403e4605eb2f	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	Oui	1	fr_FR
242096af-6142-492d-8107-4166572fb781	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	Non	2	fr_FR
492a26b2-dc21-4336-af15-dc127b7f5ccc	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	Je ne sais pas	3	fr_FR
2924ac60-2e0c-4595-a7de-a8e53872d79d	4dea9bdb-0836-4049-9766-2a271c332335	Yes	1	en_US
115b3d03-ac0e-467f-bb7f-4a3e05d05671	4dea9bdb-0836-4049-9766-2a271c332335	No	2	en_US
b726192c-e3b1-4cc1-a210-fd7b3d138894	4dea9bdb-0836-4049-9766-2a271c332335	I don't know	3	en_US
1e5e13dc-3a1c-4b20-96e0-c60a153ec72a	4dea9bdb-0836-4049-9766-2a271c332335	Oui	1	fr_FR
d9ea99bb-26d8-4f55-a444-f78dd3966c49	4dea9bdb-0836-4049-9766-2a271c332335	Non	2	fr_FR
2a766cfd-ec03-474e-b8d3-8cc985312969	4dea9bdb-0836-4049-9766-2a271c332335	Je ne sais pas	3	fr_FR
a2b9c45f-841e-4260-a43a-9de02fb1a336	b2094136-6558-4074-8907-95a6708d1146	Yes	1	en_US
fb7272f4-c08c-4100-8f21-95a2c92bb6da	b2094136-6558-4074-8907-95a6708d1146	No	2	en_US
188a82b3-3c96-4aab-82fc-74adfd2410b9	b2094136-6558-4074-8907-95a6708d1146	I don't know	3	en_US
5c69bb4f-aa18-44ca-abe4-d892d561fdf8	b2094136-6558-4074-8907-95a6708d1146	Oui	1	fr_FR
41058325-4396-463b-aa6a-0326406e1315	b2094136-6558-4074-8907-95a6708d1146	Non	2	fr_FR
4bc90d73-e914-4d38-9fd2-39b92d30d814	b2094136-6558-4074-8907-95a6708d1146	Je ne sais pas	3	fr_FR
1d36723b-1bac-425e-b55a-da368981a454	5b282628-fa35-43c5-b5ee-a294b6ed8226	Yes	1	en_US
9569c144-ed31-49f4-98cf-7e09cce273c5	5b282628-fa35-43c5-b5ee-a294b6ed8226	No	2	en_US
fcfc58c3-3e95-43c4-86b3-6da1ce347892	5b282628-fa35-43c5-b5ee-a294b6ed8226	I don't know	3	en_US
b826fc7a-d1f6-444d-8673-4f28fa9a0a7b	5b282628-fa35-43c5-b5ee-a294b6ed8226	Oui	1	fr_FR
986fa3fa-32de-4211-b23b-1c65ff079cfe	5b282628-fa35-43c5-b5ee-a294b6ed8226	Non	2	fr_FR
6d4c36a7-8253-4c40-9965-9645722b55ac	5b282628-fa35-43c5-b5ee-a294b6ed8226	Je ne sais pas	3	fr_FR
7e782cba-097f-4e2b-af9f-adb6033b178a	1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	Yes	1	en_US
45413447-3bee-4157-97e5-8e01c80acbee	1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	No	2	en_US
61d8f5b3-4cf2-402d-8461-a76109ffd901	1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	I don't know	3	en_US
b55e9cfe-ef80-4ee3-8f8b-f0a8e2f3f0d6	1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	Oui	1	fr_FR
d7caf54c-adf5-4d31-9e4b-0f2f203f8966	1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	Non	2	fr_FR
e432b2bb-a2b9-48a1-a631-9d33e98959d0	1417e9d5-0ddb-4c37-9c5a-6d22ba7fafd7	Je ne sais pas	3	fr_FR
3b8f1d57-e520-4d43-a471-a29915b6d79a	e98227be-0c5f-4900-8f3a-2633b0dbbab0	Yes	1	en_US
34e0016b-8091-4612-9030-ff49ecbffc85	e98227be-0c5f-4900-8f3a-2633b0dbbab0	No	2	en_US
a6346bb9-421d-4e86-bc25-4cba45347c5c	e98227be-0c5f-4900-8f3a-2633b0dbbab0	I don't know	3	en_US
b14be851-cd7e-4acb-8c83-55bf2042f366	e98227be-0c5f-4900-8f3a-2633b0dbbab0	Oui	1	fr_FR
d0a09376-32ec-40b5-ab52-ac2d6712e8d8	e98227be-0c5f-4900-8f3a-2633b0dbbab0	Non	2	fr_FR
a0361da3-6879-4eb5-89f2-cc0b07423f12	e98227be-0c5f-4900-8f3a-2633b0dbbab0	Je ne sais pas	3	fr_FR
beb935b6-84a3-45c8-a9a1-c60ee9d11011	ed4e1a3d-786e-49bb-b942-1da35e5a04d9	Yes	1	en_US
b977e0e5-0174-42d3-9164-c383cef7e023	ed4e1a3d-786e-49bb-b942-1da35e5a04d9	No	2	en_US
8388e513-6b77-4740-8ec2-307bf3f79454	ed4e1a3d-786e-49bb-b942-1da35e5a04d9	I don't know	3	en_US
32689065-cbf3-4e73-ba8f-416f0fa595ca	ed4e1a3d-786e-49bb-b942-1da35e5a04d9	Oui	1	fr_FR
b66dcfa7-7883-4002-bc96-f9af6be9e59e	ed4e1a3d-786e-49bb-b942-1da35e5a04d9	Non	2	fr_FR
55cedc4f-d574-4ba8-8b1f-181503af6aad	ed4e1a3d-786e-49bb-b942-1da35e5a04d9	Je ne sais pas	3	fr_FR
965eaf39-84bb-47fd-b0c7-d66b28157a58	a6139b80-36a4-4775-9da5-c06466f1e361	Yes	1	en_US
a97f6126-ed25-4cc5-858f-b4976b678829	a6139b80-36a4-4775-9da5-c06466f1e361	No	2	en_US
fcbaabb3-b81f-4025-a6bd-bad08c367d97	a6139b80-36a4-4775-9da5-c06466f1e361	I don't know	3	en_US
f03937a3-25b1-4d14-8f34-78a5083956c1	a6139b80-36a4-4775-9da5-c06466f1e361	Oui	1	fr_FR
f87948ff-0be5-4e7c-a735-c776d30c8050	a6139b80-36a4-4775-9da5-c06466f1e361	Non	2	fr_FR
801030df-c6f0-479e-85cb-4f25a75d7a34	a6139b80-36a4-4775-9da5-c06466f1e361	Je ne sais pas	3	fr_FR
9a531a8d-77d5-4ec6-9f7f-b7fe858d897b	0852f89d-0df9-4559-b4d8-9074cf67a335	Yes	1	en_US
843d6aba-a917-4331-9a59-28458e0677f1	0852f89d-0df9-4559-b4d8-9074cf67a335	No	2	en_US
bde57094-43a3-4754-b5f6-3261c89feeda	0852f89d-0df9-4559-b4d8-9074cf67a335	I don't know	3	en_US
f4f10cd8-2b96-42b4-849e-a4d2492b0b39	0852f89d-0df9-4559-b4d8-9074cf67a335	Oui	1	fr_FR
5e25f6f6-383a-4822-aa55-a95db4243220	0852f89d-0df9-4559-b4d8-9074cf67a335	Non	2	fr_FR
5a986fbb-8e36-43eb-ba59-062f171f16eb	0852f89d-0df9-4559-b4d8-9074cf67a335	Je ne sais pas	3	fr_FR
68790f37-f63a-41e7-b127-8838df802111	63351453-5507-4199-915a-1220b13c7266	Yes	1	en_US
0e303c44-e9af-47a7-aa23-13216ae19755	63351453-5507-4199-915a-1220b13c7266	No	2	en_US
efa1b3cb-9a28-4fa2-afd6-f82d5ed336b1	63351453-5507-4199-915a-1220b13c7266	I don't know	3	en_US
6cee8d08-0534-4a57-a5e4-e6f58f1fb307	63351453-5507-4199-915a-1220b13c7266	Oui	1	fr_FR
639f1fe5-c0b1-4587-84f7-b373d0c7eed9	63351453-5507-4199-915a-1220b13c7266	Non	2	fr_FR
f035fd81-0200-49d1-ab1f-74bc29e91d72	63351453-5507-4199-915a-1220b13c7266	Je ne sais pas	3	fr_FR
0cc215f5-a714-4056-a95a-3cf866784936	4e7476bb-6dde-4725-8a96-5454520df090	Yes	1	en_US
70b280c9-4134-422b-b156-877abcfd5479	4e7476bb-6dde-4725-8a96-5454520df090	No	2	en_US
8ad1608d-d72e-4b73-9013-7acf11afd44c	4e7476bb-6dde-4725-8a96-5454520df090	I don't know	3	en_US
8166a12d-e75f-40b2-96ed-5dec2673ec93	4e7476bb-6dde-4725-8a96-5454520df090	Oui	1	fr_FR
7cbc12ab-d710-4239-bf9f-290507878de6	4e7476bb-6dde-4725-8a96-5454520df090	Non	2	fr_FR
e8a15558-272d-4662-be46-03e0a62664fc	4e7476bb-6dde-4725-8a96-5454520df090	Je ne sais pas	3	fr_FR
c4ebee90-ae00-4747-8f01-929a9844cf86	bf819156-9d00-464b-8a94-e08428443caf	Yes	1	en_US
57f86f7e-4f35-482a-9c41-d4420ddca8f7	bf819156-9d00-464b-8a94-e08428443caf	No	2	en_US
a7988fc1-b01a-4dda-89dc-425cd253c969	bf819156-9d00-464b-8a94-e08428443caf	I don't know	3	en_US
5e9d8959-1e0e-42e4-90d5-c1d5884a32e4	bf819156-9d00-464b-8a94-e08428443caf	Oui	1	fr_FR
4790f35e-fc1d-4ff2-b875-1f8e99138057	bf819156-9d00-464b-8a94-e08428443caf	Non	2	fr_FR
b903ae53-b38e-4b01-aabb-bf6411b54cac	bf819156-9d00-464b-8a94-e08428443caf	Je ne sais pas	3	fr_FR
7f0d8cf1-ccb0-495f-8dde-594f1b52a9d6	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	Yes	1	en_US
c92dbf78-a747-4838-9159-753e607ded4f	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	No	2	en_US
51fca5bb-69de-401f-85ea-347d41dc8589	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	I don't know	3	en_US
1c097b19-699c-45ad-81e7-475c88bd614c	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	Oui	1	fr_FR
35f1e58b-9318-4b41-bd0d-0bf9b2042647	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	Non	2	fr_FR
4c0f224f-d2c1-402c-a223-b76f49459470	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	Je ne sais pas	3	fr_FR
4f61bc64-d23f-426b-bb93-6bb340c823e3	b988bbb3-0bc4-437d-aab1-226248393a02	Yes	1	en_US
5cd9d7f7-5977-4a9b-8db2-303435b6e577	b988bbb3-0bc4-437d-aab1-226248393a02	No	2	en_US
f3088411-c8f5-4fb6-a73a-7361f2ef4a5d	b988bbb3-0bc4-437d-aab1-226248393a02	I don't know	3	en_US
7d076388-8000-4d94-884e-3f92e2f7ad08	b988bbb3-0bc4-437d-aab1-226248393a02	Oui	1	fr_FR
3ea70799-885f-4e61-b40d-e0097ad4c751	b988bbb3-0bc4-437d-aab1-226248393a02	Non	2	fr_FR
0a4792dc-ec36-4e73-b462-5597db975086	b988bbb3-0bc4-437d-aab1-226248393a02	Je ne sais pas	3	fr_FR
b6bfc674-661f-45a1-b1b1-e5e016fe22be	55f65763-815d-451e-94ca-3f1646372f57	Yes	1	en_US
1e140751-69e5-4b50-8011-a01dbd515bb6	55f65763-815d-451e-94ca-3f1646372f57	No	2	en_US
fc190e8b-bb22-4fac-b437-7aeca47f6fee	55f65763-815d-451e-94ca-3f1646372f57	I don't know	3	en_US
bcb0919f-c1a0-4ee8-a8cd-d345946445cb	55f65763-815d-451e-94ca-3f1646372f57	Oui	1	fr_FR
432bbbae-e030-4966-9e5e-086f5eee954a	55f65763-815d-451e-94ca-3f1646372f57	Non	2	fr_FR
af841664-9a5d-4e3a-b975-e40ad5c84e59	55f65763-815d-451e-94ca-3f1646372f57	Je ne sais pas	3	fr_FR
29f604ff-b20a-4d4f-95a5-25ff61dc5979	83aac205-8aac-48b8-9178-bc28632d3592	Yes	1	en_US
3a4665d2-70e3-47d2-9ec1-dc81a3f84a9f	83aac205-8aac-48b8-9178-bc28632d3592	No	2	en_US
dc744a7c-a1fb-45af-ab9d-7bed402cdd91	83aac205-8aac-48b8-9178-bc28632d3592	I don't know	3	en_US
e0597684-69c3-47ca-9ceb-120695c0a62f	83aac205-8aac-48b8-9178-bc28632d3592	Oui	1	fr_FR
b20d7d25-3e4f-4335-82c8-5ae8ce64d042	83aac205-8aac-48b8-9178-bc28632d3592	Non	2	fr_FR
91471e80-60f3-4d5f-8269-018443d81c9a	83aac205-8aac-48b8-9178-bc28632d3592	Je ne sais pas	3	fr_FR
c7bf6bfa-e2c8-49ba-95fe-107e7d7af477	cd491b5c-c7a3-40ad-b390-b41481813ed6	Yes	1	en_US
9e87ed0e-e7db-45ae-bf15-494ee45a7d46	cd491b5c-c7a3-40ad-b390-b41481813ed6	No	2	en_US
92d14b19-ecc9-47d0-9bc6-11a0fca7608e	cd491b5c-c7a3-40ad-b390-b41481813ed6	I don't know	3	en_US
65095a03-a1bd-4246-a9db-55d284cb6905	cd491b5c-c7a3-40ad-b390-b41481813ed6	Oui	1	fr_FR
d8ce0df7-2994-45f1-9ba9-16d5cb4f75d8	cd491b5c-c7a3-40ad-b390-b41481813ed6	Non	2	fr_FR
15ba5adb-6ab4-4e9b-926e-1fba35de3560	cd491b5c-c7a3-40ad-b390-b41481813ed6	Je ne sais pas	3	fr_FR
07ccb9ad-a634-4fac-9bec-d1d4635f9e6b	5300578b-0199-4e73-9c76-db08f0883fb2	Yes	1	en_US
250f3218-df12-48c8-aee2-ea1bb43f3866	5300578b-0199-4e73-9c76-db08f0883fb2	No	2	en_US
54d48eba-9108-4018-8b09-551f2a442fda	5300578b-0199-4e73-9c76-db08f0883fb2	I don't know	3	en_US
6747e94d-6429-4321-8f7e-a61fe1840091	5300578b-0199-4e73-9c76-db08f0883fb2	Oui	1	fr_FR
085b191f-5d73-4811-adcd-f7df6d0d844c	5300578b-0199-4e73-9c76-db08f0883fb2	Non	2	fr_FR
6231e453-7800-444c-903d-546d0fe3d748	5300578b-0199-4e73-9c76-db08f0883fb2	Je ne sais pas	3	fr_FR
b5ed4096-ac56-45d7-91d0-e883855781e4	81416478-48b4-45a1-9766-6030759e901a	Yes	1	en_US
90508c15-9dde-427e-a6aa-7a9189a7e490	81416478-48b4-45a1-9766-6030759e901a	No	2	en_US
6150f598-9328-4156-a23f-76325d56f9b8	81416478-48b4-45a1-9766-6030759e901a	I don't know	3	en_US
40373e97-5d57-4818-a39f-d7603a69d457	81416478-48b4-45a1-9766-6030759e901a	Oui	1	fr_FR
ee5df7c6-4ae6-444b-b280-abb12125347c	81416478-48b4-45a1-9766-6030759e901a	Non	2	fr_FR
2380da67-2e02-4adc-9d48-3cc867f16023	81416478-48b4-45a1-9766-6030759e901a	Je ne sais pas	3	fr_FR
150558ad-206f-4c5b-8011-99126dd23c87	d63fec99-6944-46fc-97ed-08f1d44e09f0	Yes	1	en_US
4cfe1fee-2231-40c5-8339-d53ef6d1876b	d63fec99-6944-46fc-97ed-08f1d44e09f0	No	2	en_US
cb9860b7-a763-4246-989a-4f0365bbf352	d63fec99-6944-46fc-97ed-08f1d44e09f0	I don't know	3	en_US
c0622ade-5c3c-4b6f-ab33-9172848dfbc0	d63fec99-6944-46fc-97ed-08f1d44e09f0	Oui	1	fr_FR
ceee6817-e0e1-4576-a6fd-6e6f77ba0895	d63fec99-6944-46fc-97ed-08f1d44e09f0	Non	2	fr_FR
d16a5509-5d6e-4935-b000-9b5bd82dcc0f	d63fec99-6944-46fc-97ed-08f1d44e09f0	Je ne sais pas	3	fr_FR
3e707e9e-56ee-48b2-85f7-10c24c62e94f	1c998d37-ffb5-4e93-b809-ef71f6b648a8	Yes	1	en_US
9883297a-a05e-4035-9b25-5c0d228085cd	1c998d37-ffb5-4e93-b809-ef71f6b648a8	No	2	en_US
639f24d1-6855-4211-a380-bc56dce87497	1c998d37-ffb5-4e93-b809-ef71f6b648a8	I don't know	3	en_US
ca112d01-ca80-4c96-b7a7-fb39d32c1443	1c998d37-ffb5-4e93-b809-ef71f6b648a8	Oui	1	fr_FR
8337752e-0714-4d41-878f-e558fcaa47c2	1c998d37-ffb5-4e93-b809-ef71f6b648a8	Non	2	fr_FR
1fbb61d1-dfc0-4abf-83e0-14df0c4f9232	1c998d37-ffb5-4e93-b809-ef71f6b648a8	Je ne sais pas	3	fr_FR
df7093b6-69e3-42c5-9a26-b419b3da112c	1682619d-39ab-446f-973f-ae2c1b7820da	Yes	1	en_US
48ba0c9f-825e-4243-acd9-7deece401f3a	1682619d-39ab-446f-973f-ae2c1b7820da	No	2	en_US
a018a926-a631-45e2-a8ed-148fd60d2599	1682619d-39ab-446f-973f-ae2c1b7820da	I don't know	3	en_US
9bb7ed34-8c3d-456a-b0a3-6c998a509d9c	1682619d-39ab-446f-973f-ae2c1b7820da	Oui	1	fr_FR
b7ade189-d6a7-4fe1-8d3d-f1d2f2b15806	1682619d-39ab-446f-973f-ae2c1b7820da	Non	2	fr_FR
bad15472-6bb4-478b-9c33-a927a4afb96a	1682619d-39ab-446f-973f-ae2c1b7820da	Je ne sais pas	3	fr_FR
6615982d-4f7c-49d6-994c-a5b0fccafdfd	30800c33-f9aa-4712-9986-2b253c36b188	Yes	1	en_US
5d44c5b3-75c8-4459-a777-84a78e9a62c2	30800c33-f9aa-4712-9986-2b253c36b188	No	2	en_US
dfac1168-3b3a-4c50-b1e1-7e4670a3ef50	30800c33-f9aa-4712-9986-2b253c36b188	I don't know	3	en_US
e83e3538-d6d9-4fd9-818a-1fda9698dfde	30800c33-f9aa-4712-9986-2b253c36b188	Oui	1	fr_FR
c8d7d6ed-4b4b-4953-bc82-34085f1bd7e7	30800c33-f9aa-4712-9986-2b253c36b188	Non	2	fr_FR
63a73a0d-5095-453d-9197-0d0f59434453	30800c33-f9aa-4712-9986-2b253c36b188	Je ne sais pas	3	fr_FR
fe19bef9-fd56-47b6-914c-2d2ee3a635f8	cf90b94e-e441-4f93-83f1-566752861202	Yes	1	en_US
efc82247-97ea-44a7-a8ac-ac1f8804a3cd	cf90b94e-e441-4f93-83f1-566752861202	No	2	en_US
44ae6951-8923-4792-9dbe-f7bfe1f3f974	cf90b94e-e441-4f93-83f1-566752861202	I don't know	3	en_US
7d4618b7-914b-4f77-a683-c6a8d8087cc0	cf90b94e-e441-4f93-83f1-566752861202	Oui	1	fr_FR
4765c924-51ab-42ed-a94f-d406c28a8d25	cf90b94e-e441-4f93-83f1-566752861202	Non	2	fr_FR
4a78c428-544f-4dda-a7f3-e0078e46aee6	cf90b94e-e441-4f93-83f1-566752861202	Je ne sais pas	3	fr_FR
d832740c-182b-4bcc-a79d-4f557d7d8059	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	Yes	1	en_US
cda6cf4a-67b7-466a-a2fd-efe75a58d47f	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	No	2	en_US
e3659187-1da7-4a35-8d05-8669ea53a9f2	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	I don't know	3	en_US
9431b1e2-5f25-43a0-bde8-7262e5dfd6da	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	Oui	1	fr_FR
22f2b675-ef0b-41a0-9995-c313241aa5af	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	Non	2	fr_FR
ff421cff-446e-4a79-bd00-ada4eb7470de	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	Je ne sais pas	3	fr_FR
395b99b7-dece-45c9-accd-3bed804037f8	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	Yes	1	en_US
726ec1b7-bc97-42d8-8fa1-d3f95c207207	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	No	2	en_US
132de72f-ee4a-4e98-b987-4ad0a6c14f2f	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	I don't know	3	en_US
2dc154ef-c493-4f45-9eb2-79a004e45d06	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	Oui	1	fr_FR
2f14e634-86da-4f16-8af3-ce9160c033c3	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	Non	2	fr_FR
fd04f7ca-7c62-489d-abb5-598b4b59b773	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	Je ne sais pas	3	fr_FR
4455671e-cf16-4996-be54-a5622cbff2fe	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	Yes	1	en_US
bf91b505-0626-409f-aeb8-9d3ba4ccee89	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	No	2	en_US
d7ae6f0d-efcd-49c0-8104-f17dc60f858e	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	I don't know	3	en_US
1fd2e2d7-aef4-4b98-a3d9-3153f3018044	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	Oui	1	fr_FR
98fca344-6512-4e2d-b7ec-589c4148b653	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	Non	2	fr_FR
8c09cf8a-27ef-4617-ad01-83698a5d61dd	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	Je ne sais pas	3	fr_FR
c1397d94-04d1-44db-ac86-102175a17ece	e8d5aac5-30a9-427c-8da3-9f0b140970e6	Yes	1	en_US
c5cf471e-6bde-4d78-ba88-b4e7ad80b05c	e8d5aac5-30a9-427c-8da3-9f0b140970e6	No	2	en_US
a07433b1-a753-4e82-b5c7-abfe326a7196	e8d5aac5-30a9-427c-8da3-9f0b140970e6	I don't know	3	en_US
a88f0810-fc85-4307-8d9a-b78e15b8b917	e8d5aac5-30a9-427c-8da3-9f0b140970e6	Oui	1	fr_FR
50f93fde-5368-4c20-986b-991bfcf749e2	e8d5aac5-30a9-427c-8da3-9f0b140970e6	Non	2	fr_FR
9a22ed6a-5226-4e71-8426-55cf409f4061	e8d5aac5-30a9-427c-8da3-9f0b140970e6	Je ne sais pas	3	fr_FR
76d1c6b5-bd65-469a-8b7f-e5dcc09c4de7	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	Yes	1	en_US
b09fd107-1eb3-4863-a3df-9ac5ff927048	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	No	2	en_US
7d897f31-02fe-4b0a-b647-f56322fde888	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	I don't know	3	en_US
60ff3203-dfed-450e-bef1-88691a93dedb	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	Oui	1	fr_FR
c5a6d275-73a2-4af8-9357-eced795ba305	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	Non	2	fr_FR
aed1dc30-4c79-47c1-9223-9711c147af87	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	Je ne sais pas	3	fr_FR
d5c0022a-f353-490c-a984-b447a04a9a86	329b38ef-63bf-41e2-a266-5dd6a4b36f79	Yes	1	en_US
c349ea26-072f-4436-80df-231eeec98e4f	329b38ef-63bf-41e2-a266-5dd6a4b36f79	No	2	en_US
3f3267be-211d-475c-831b-668d5714be42	329b38ef-63bf-41e2-a266-5dd6a4b36f79	I don't know	3	en_US
d6f789c4-ce23-4b2a-bb4e-f024983f9cde	329b38ef-63bf-41e2-a266-5dd6a4b36f79	Oui	1	fr_FR
752d1a9c-6b2c-4de1-ad24-18977d610f4b	329b38ef-63bf-41e2-a266-5dd6a4b36f79	Non	2	fr_FR
e61db80b-fc38-4b0e-badf-832caca34a07	329b38ef-63bf-41e2-a266-5dd6a4b36f79	Je ne sais pas	3	fr_FR
08c1a145-eb8e-40c2-b549-2fa04a9e9e42	f376fba5-54e1-4f21-99d6-0e41bc000588	Yes	1	en_US
662f10e9-499a-47af-ab9a-3c2541e9eff4	f376fba5-54e1-4f21-99d6-0e41bc000588	No	2	en_US
664d6b1f-b570-429e-ae7c-8f15fc4a6cba	f376fba5-54e1-4f21-99d6-0e41bc000588	I don't know	3	en_US
6732fbcf-b20f-4f11-adde-766760f2499e	f376fba5-54e1-4f21-99d6-0e41bc000588	Oui	1	fr_FR
7058b046-001c-46ba-a3f4-d49f407f0d2d	f376fba5-54e1-4f21-99d6-0e41bc000588	Non	2	fr_FR
929b4edf-2a42-4b8a-8e5c-5f66a345c377	f376fba5-54e1-4f21-99d6-0e41bc000588	Je ne sais pas	3	fr_FR
21c390db-304e-4944-a7ed-dbf7951efac9	41bf1e07-3e24-40a4-98e9-45b3e4538cce	Yes	1	en_US
80d0a8a4-2149-4420-920a-e19b80c7e6fd	41bf1e07-3e24-40a4-98e9-45b3e4538cce	No	2	en_US
84a9f678-abc7-4550-908a-8ed42b0b969b	41bf1e07-3e24-40a4-98e9-45b3e4538cce	I don't know	3	en_US
f41eaef4-e4de-42ba-825b-16da4ee310a7	41bf1e07-3e24-40a4-98e9-45b3e4538cce	Oui	1	fr_FR
dab7bb02-381a-41ce-903c-42d9a561444d	41bf1e07-3e24-40a4-98e9-45b3e4538cce	Non	2	fr_FR
4f9ef3b6-d9c3-4fb6-b02f-450ecd8f9808	41bf1e07-3e24-40a4-98e9-45b3e4538cce	Je ne sais pas	3	fr_FR
ca8fe9ed-37f4-4998-a87a-c4889a0e0276	0d9a0a12-85a6-40d5-8335-df90740abcf7	Yes	1	en_US
7d8c79c0-1831-43be-bcdb-2a38ed4c9626	0d9a0a12-85a6-40d5-8335-df90740abcf7	No	2	en_US
1c00dd4d-f111-4a60-bb38-0352fa45df98	0d9a0a12-85a6-40d5-8335-df90740abcf7	I don't know	3	en_US
f921ce9d-e201-420a-9281-fb014cb17cba	0d9a0a12-85a6-40d5-8335-df90740abcf7	Oui	1	fr_FR
f633768f-e584-4d96-b34b-dde27b5dda89	0d9a0a12-85a6-40d5-8335-df90740abcf7	Non	2	fr_FR
774c11c5-374a-41e6-a422-448caac65458	0d9a0a12-85a6-40d5-8335-df90740abcf7	Je ne sais pas	3	fr_FR
620917c1-0dd2-4ff7-bdbc-68396f5fc261	4492fc47-f2b9-41c4-a680-e05ca735ce9e	Yes	1	en_US
df4ef57f-4afc-4e0b-8b14-c786f363a2a7	4492fc47-f2b9-41c4-a680-e05ca735ce9e	No	2	en_US
8470a0eb-14ce-4840-a7a9-3304e96085e0	4492fc47-f2b9-41c4-a680-e05ca735ce9e	I don't know	3	en_US
dc9a8822-1059-4540-8e4d-27a5826d6dea	4492fc47-f2b9-41c4-a680-e05ca735ce9e	Oui	1	fr_FR
bede1b45-6ec7-423f-bcba-e5c5c46e5f52	4492fc47-f2b9-41c4-a680-e05ca735ce9e	Non	2	fr_FR
aee4da77-662e-437f-8dac-96c8f67015aa	4492fc47-f2b9-41c4-a680-e05ca735ce9e	Je ne sais pas	3	fr_FR
355a0524-30da-4a23-aa7a-ca253d11aab3	3a952e5b-a9f2-45f6-90de-3407e6be0f9d	Yes	1	en_US
7b4dbc01-b51d-49d0-a934-8aa09167ff2a	3a952e5b-a9f2-45f6-90de-3407e6be0f9d	No	2	en_US
ba358174-9c39-4681-8257-530f6f2deae7	3a952e5b-a9f2-45f6-90de-3407e6be0f9d	I don't know	3	en_US
08af4350-de12-4bb2-b536-7be5744c7ff5	3a952e5b-a9f2-45f6-90de-3407e6be0f9d	Oui	1	fr_FR
ea42bcb6-4e23-456f-93fc-518ac075cd7a	3a952e5b-a9f2-45f6-90de-3407e6be0f9d	Non	2	fr_FR
812f01db-f10f-4edf-92d8-97dde1a52ed9	3a952e5b-a9f2-45f6-90de-3407e6be0f9d	Je ne sais pas	3	fr_FR
75840adb-39f5-4f80-88b2-4ceac8e329e9	80afdbde-8ccd-4068-b552-a828341ebe67	Yes	1	en_US
5464823f-2c8a-423c-b784-52f12699c3d0	80afdbde-8ccd-4068-b552-a828341ebe67	No	2	en_US
f902ea7c-d0bb-49ae-9a5a-976d711a9b0b	80afdbde-8ccd-4068-b552-a828341ebe67	I don't know	3	en_US
b9117404-d034-495e-aed8-6a1650174b96	80afdbde-8ccd-4068-b552-a828341ebe67	Oui	1	fr_FR
6718e1d2-6a6c-45a6-b2ee-450d3ba01551	80afdbde-8ccd-4068-b552-a828341ebe67	Non	2	fr_FR
1061c181-d5dd-4acf-b72e-1239ad9a327f	80afdbde-8ccd-4068-b552-a828341ebe67	Je ne sais pas	3	fr_FR
8ec8197a-c4b4-441c-8083-365bed12eb95	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	Yes	1	en_US
6263fcf2-22db-4929-bd63-cef4d1443476	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	No	2	en_US
ff1a30a0-a735-48cd-bf98-9addd2290cb5	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	I don't know	3	en_US
f41fedb3-d8a8-4868-a9fe-753d0f48161a	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	Oui	1	fr_FR
a7cd5af3-5e21-4780-9af4-93b346e51d89	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	Non	2	fr_FR
ec2172d5-23e5-46aa-9011-77ab0891327b	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	Je ne sais pas	3	fr_FR
321a1325-d7b6-4136-b5cf-f6f010fe4a9f	79a82f80-fb7d-4211-bb73-4a2ef554204f	Yes	1	en_US
b3008a28-8731-484c-9cf6-c5ecdff59d2f	79a82f80-fb7d-4211-bb73-4a2ef554204f	No	2	en_US
ae0e2aec-c161-4de1-a55e-68646c1acb1e	79a82f80-fb7d-4211-bb73-4a2ef554204f	I don't know	3	en_US
45715c96-93bf-4a19-957c-b24fc3054b23	79a82f80-fb7d-4211-bb73-4a2ef554204f	Oui	1	fr_FR
d694750e-ddd0-426b-9c34-22e28487c9c4	79a82f80-fb7d-4211-bb73-4a2ef554204f	Non	2	fr_FR
73d4a2a4-4e2b-4f02-94ae-e3fea1ce681f	79a82f80-fb7d-4211-bb73-4a2ef554204f	Je ne sais pas	3	fr_FR
e61af318-83af-4a34-a7dd-6fb689582846	24e4aa16-924f-4d83-8f64-c0f36bf1489c	Yes	1	en_US
dc04b4cd-447f-4c5a-ab7a-bd6d91671f34	24e4aa16-924f-4d83-8f64-c0f36bf1489c	No	2	en_US
be118bc3-b75d-43fd-8493-a3c5bc2ff043	24e4aa16-924f-4d83-8f64-c0f36bf1489c	I don't know	3	en_US
0f5b9662-21f6-4e39-b38b-54e419a09970	24e4aa16-924f-4d83-8f64-c0f36bf1489c	Oui	1	fr_FR
6514c4c7-b0be-47e1-a5c4-12b327cb13fb	24e4aa16-924f-4d83-8f64-c0f36bf1489c	Non	2	fr_FR
2d0db918-02ad-40a6-95f2-ee2573a46ab1	24e4aa16-924f-4d83-8f64-c0f36bf1489c	Je ne sais pas	3	fr_FR
923a2a27-a85e-425b-8a98-efec93169288	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	Yes	1	en_US
66cd6f1c-68d3-4df8-aae6-b532340bcb2f	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	No	2	en_US
09da09d2-a571-4a45-a22f-8b46a3d2608e	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	I don't know	3	en_US
07bf0058-90a7-4ea1-a4cf-5c41664a9576	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	Oui	1	fr_FR
ec53a9d4-e03d-45f4-aca8-04f4dac963f4	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	Non	2	fr_FR
db401f9c-ba40-4cf2-baee-dff4cec5a03f	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	Je ne sais pas	3	fr_FR
1556b694-4ce3-421e-99ab-6fa6cc4bea9a	6bf76683-2c9c-45df-a3f4-213f869dc9ab	Yes	1	en_US
bb38f68e-822f-419e-aa0a-9cee8594349c	6bf76683-2c9c-45df-a3f4-213f869dc9ab	No	2	en_US
66bbd52a-33bc-4723-b9f6-cc9393b881c6	6bf76683-2c9c-45df-a3f4-213f869dc9ab	I don't know	3	en_US
e73d125b-ea5b-42d3-8a63-0f6b1639dbc0	6bf76683-2c9c-45df-a3f4-213f869dc9ab	Oui	1	fr_FR
66825918-8365-4b20-bb99-3d307a1359f4	6bf76683-2c9c-45df-a3f4-213f869dc9ab	Non	2	fr_FR
7fd4d79e-a29e-4099-95a0-8ef8527ba189	6bf76683-2c9c-45df-a3f4-213f869dc9ab	Je ne sais pas	3	fr_FR
b02c2837-59e0-427a-ae8b-ec8237885daa	484a7e91-2ffe-44ce-8635-d6576739734f	Yes	1	en_US
97ff5458-0a36-4a8d-92d9-e1ed4c434113	484a7e91-2ffe-44ce-8635-d6576739734f	No	2	en_US
af23dfd5-c787-4730-95c3-ce5db214bbbc	484a7e91-2ffe-44ce-8635-d6576739734f	I don't know	3	en_US
9c324102-69fb-49e0-b36d-f450c0bb9011	484a7e91-2ffe-44ce-8635-d6576739734f	Oui	1	fr_FR
d5d94eaf-f002-41e9-ad87-8b964f1f1e3a	484a7e91-2ffe-44ce-8635-d6576739734f	Non	2	fr_FR
04eeba5a-9e32-4f33-9a6f-04e24c709f47	484a7e91-2ffe-44ce-8635-d6576739734f	Je ne sais pas	3	fr_FR
e6fa4f9e-9fa4-4920-826b-ff6eda3719c0	f0b1b23e-a127-467a-bbda-51d34380069c	Yes	1	en_US
88fbf287-fe29-4fcc-811d-19f71d717e84	f0b1b23e-a127-467a-bbda-51d34380069c	No	2	en_US
bacef463-8367-4319-971d-17a020460a75	f0b1b23e-a127-467a-bbda-51d34380069c	I don't know	3	en_US
3bc6c6da-97f7-43ef-ae00-37a4ed6e1b48	f0b1b23e-a127-467a-bbda-51d34380069c	Oui	1	fr_FR
5fe2b7e9-258c-4e61-a2d3-bc589de6c092	f0b1b23e-a127-467a-bbda-51d34380069c	Non	2	fr_FR
81ff8378-61e0-481d-ba73-1b59c27b5647	f0b1b23e-a127-467a-bbda-51d34380069c	Je ne sais pas	3	fr_FR
c00cb545-6213-4493-81b6-f4986bfd39e5	01199d58-fbd7-4046-a875-b15712c14331	Yes	1	en_US
64f14b90-e1bb-475a-98aa-f27141d1a103	01199d58-fbd7-4046-a875-b15712c14331	No	2	en_US
4c37ba7e-50b8-494e-9ad4-c6a343e897c3	01199d58-fbd7-4046-a875-b15712c14331	I don't know	3	en_US
a5c0deba-d4f9-4ee7-aab8-4e1061f2e317	01199d58-fbd7-4046-a875-b15712c14331	Oui	1	fr_FR
69df6d1d-e7ae-4d19-910e-bf18f4a47b77	01199d58-fbd7-4046-a875-b15712c14331	Non	2	fr_FR
c0603e69-54f3-411b-80f4-27346ca33cc3	01199d58-fbd7-4046-a875-b15712c14331	Je ne sais pas	3	fr_FR
72bf1434-fd1c-465c-ae6f-0be03f8946ff	4524ee1f-9f7a-465b-acf3-467f5161059c	Yes	1	en_US
ae3d26f8-f48b-465b-ba46-51b46e82a288	4524ee1f-9f7a-465b-acf3-467f5161059c	No	2	en_US
720eacec-d84c-470d-afba-0f1a9e74fa7b	4524ee1f-9f7a-465b-acf3-467f5161059c	I don't know	3	en_US
08396773-514b-4a97-a633-00762d7cfaf2	4524ee1f-9f7a-465b-acf3-467f5161059c	Oui	1	fr_FR
945b6601-6c81-4904-9a85-2b0be177f84a	4524ee1f-9f7a-465b-acf3-467f5161059c	Non	2	fr_FR
90e2e395-c001-4146-9fa5-12cebebd9a6a	4524ee1f-9f7a-465b-acf3-467f5161059c	Je ne sais pas	3	fr_FR
81ce613e-786b-42b2-8fd3-b2b9f21a16db	93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	Yes	1	en_US
5f68cb6e-4dfb-4cee-a01d-40da55ac7dd5	93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	No	2	en_US
e185a8a3-5ff1-4cc1-9c39-0d8f9ef1ecab	93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	I don't know	3	en_US
fe6312a9-c5a6-4f7c-a8a1-661f5c89595d	93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	Oui	1	fr_FR
ccd1ac30-5568-44ca-9255-207eeb75022a	93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	Non	2	fr_FR
c0cc237c-4181-4723-ba1c-67b5e88ee0f9	93464e60-a4e1-4c05-a2bf-a7c31edb3a0f	Je ne sais pas	3	fr_FR
1e384c0f-775b-4f9d-bb0a-21fe3e84eaa2	d0059349-79ed-4c98-ba00-6135c431c2c2	Yes	1	en_US
c7690c5b-683a-4676-8791-531c9e6e16cd	d0059349-79ed-4c98-ba00-6135c431c2c2	No	2	en_US
5a7cc485-e684-4879-a4d7-e0b55b18b51c	d0059349-79ed-4c98-ba00-6135c431c2c2	I don't know	3	en_US
a56887f0-4fd7-4891-8fe9-a860beb1c408	d0059349-79ed-4c98-ba00-6135c431c2c2	Oui	1	fr_FR
e325744a-3256-4bc8-9f6a-1811ddd7f6aa	d0059349-79ed-4c98-ba00-6135c431c2c2	Non	2	fr_FR
a4a7893f-b065-42ee-b5c0-54aed9f59c54	d0059349-79ed-4c98-ba00-6135c431c2c2	Je ne sais pas	3	fr_FR
1be4bc79-2711-4208-89f2-3c3eb8007e0e	4b549b5d-0864-4add-8ed5-91c54e67bae2	Yes	1	en_US
d87916a2-e2d7-4bde-8f89-c7b9b57fb28c	4b549b5d-0864-4add-8ed5-91c54e67bae2	No	2	en_US
de07a861-dc6c-449c-a4df-580991396e3d	4b549b5d-0864-4add-8ed5-91c54e67bae2	I don't know	3	en_US
5789a80e-3ba5-40a9-8a01-10501149022d	4b549b5d-0864-4add-8ed5-91c54e67bae2	Oui	1	fr_FR
2e603aab-a63a-41fa-8356-6bce273f7fd8	4b549b5d-0864-4add-8ed5-91c54e67bae2	Non	2	fr_FR
6d2ac55b-65e5-4756-8ac5-f6590a8f9bcc	4b549b5d-0864-4add-8ed5-91c54e67bae2	Je ne sais pas	3	fr_FR
60737b82-d6bb-4a88-b493-84aea3f86b2b	1c69cd87-b362-4f5d-befe-06706be21c3f	Yes	1	en_US
67d17aab-9ca1-46ca-9697-48fc80614536	1c69cd87-b362-4f5d-befe-06706be21c3f	No	2	en_US
491190b1-f02d-411c-bf9c-95027abbf194	1c69cd87-b362-4f5d-befe-06706be21c3f	I don't know	3	en_US
22d9e237-0ed1-4b95-94f9-2b8ac0983886	1c69cd87-b362-4f5d-befe-06706be21c3f	Oui	1	fr_FR
4886df03-673a-47b8-b974-8c79c38555f3	1c69cd87-b362-4f5d-befe-06706be21c3f	Non	2	fr_FR
a3148204-bf20-4e84-b378-5a53da8eeca6	1c69cd87-b362-4f5d-befe-06706be21c3f	Je ne sais pas	3	fr_FR
ca3414f4-7a19-478e-8029-d3b0fc246cff	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	Yes	1	en_US
7aabaf8b-66bf-4218-9585-39f4550edcf7	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	No	2	en_US
2b7122d5-8cc0-4cd9-b8d8-cb490010c715	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	I don't know	3	en_US
3ff7915a-b949-4466-b7f0-d41b5d0a86ea	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	Oui	1	fr_FR
829a3051-e404-4cf1-8e97-563c2a436f2b	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	Non	2	fr_FR
544ddf6e-eacf-4cb7-92d6-2277e04aee5b	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	Je ne sais pas	3	fr_FR
9ed61ccf-e3af-481c-85e2-a42b0aed6ff2	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	Yes	1	en_US
861f5a62-39ee-43ea-81ee-8c9cc04f3be4	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	No	2	en_US
2eaa6a72-5331-4747-939b-18b14546335b	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	I don't know	3	en_US
55ab844e-2065-407f-9690-2199ce02476a	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	Oui	1	fr_FR
d2529610-2fda-4790-8347-0b4e14c8572d	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	Non	2	fr_FR
60325f61-8483-48ab-a772-4f91ea72d9be	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	Je ne sais pas	3	fr_FR
ec6f90e6-0425-421a-b12f-26e99acb8849	30e98b58-25c9-47cf-81fb-2d00a64eb9fc	Yes	1	en_US
80550e07-d8d2-4efd-8676-09981f7fef5f	30e98b58-25c9-47cf-81fb-2d00a64eb9fc	No	2	en_US
a45e3b69-5779-4ad0-83c9-f4b70dc77c3c	30e98b58-25c9-47cf-81fb-2d00a64eb9fc	I don't know	3	en_US
1facf636-89b7-4599-99b9-11275f0c9bc8	30e98b58-25c9-47cf-81fb-2d00a64eb9fc	Oui	1	fr_FR
e4904787-569d-447e-8656-7657ee351e61	30e98b58-25c9-47cf-81fb-2d00a64eb9fc	Non	2	fr_FR
1e2ab8d6-cefe-4dd6-8e64-c0e20ba15a9e	30e98b58-25c9-47cf-81fb-2d00a64eb9fc	Je ne sais pas	3	fr_FR
a208de3c-99d2-43ca-8662-41a0949cc497	59f8d229-bb8b-4ba6-925b-0f9d056b2b39	Yes	1	en_US
e0e9191b-b84c-4ca8-8f9c-aa38fd4c3591	59f8d229-bb8b-4ba6-925b-0f9d056b2b39	No	2	en_US
6f04d836-79d5-4ac2-8035-a5f42e9c9ef3	59f8d229-bb8b-4ba6-925b-0f9d056b2b39	I don't know	3	en_US
61b5dc12-3197-4707-ac63-f8ee2c5ea5ab	59f8d229-bb8b-4ba6-925b-0f9d056b2b39	Oui	1	fr_FR
cee6318d-c943-40f1-9ab8-d178e5f7717b	59f8d229-bb8b-4ba6-925b-0f9d056b2b39	Non	2	fr_FR
e67ee77a-ca62-4e33-baf1-314099760b80	59f8d229-bb8b-4ba6-925b-0f9d056b2b39	Je ne sais pas	3	fr_FR
7876b2a8-389f-4fc6-a6ed-915455a8e7e4	a71fb52d-a04b-44e9-97f1-a92437b8495a	Yes	1	en_US
abd0c79e-5667-4981-8e8b-3b445bf1240d	a71fb52d-a04b-44e9-97f1-a92437b8495a	No	2	en_US
8e3e16d1-dcb3-487a-82c0-38602e211fc7	a71fb52d-a04b-44e9-97f1-a92437b8495a	I don't know	3	en_US
e943cc7a-41b5-4555-88aa-8d278a1c4f8f	a71fb52d-a04b-44e9-97f1-a92437b8495a	Oui	1	fr_FR
e5bba5fc-452e-4b36-a30d-aecb1ccd3bd6	a71fb52d-a04b-44e9-97f1-a92437b8495a	Non	2	fr_FR
86b9cf28-0fe3-470d-abd7-d2f7bad928c9	a71fb52d-a04b-44e9-97f1-a92437b8495a	Je ne sais pas	3	fr_FR
51596c5d-3b10-490e-ab29-c2949f7e6320	6524e347-2474-453a-9dc1-c1fa6daf6129	Yes	1	en_US
740de809-e8e9-4429-9bee-be05f627da08	6524e347-2474-453a-9dc1-c1fa6daf6129	No	2	en_US
bc5d95b5-2438-47bb-98d4-aeb43baee8b2	6524e347-2474-453a-9dc1-c1fa6daf6129	I don't know	3	en_US
dedcbb40-4075-4c55-a38f-f7cf41173ed8	6524e347-2474-453a-9dc1-c1fa6daf6129	Oui	1	fr_FR
116557d5-b00e-4f5c-9c6f-18a0cf2594ed	6524e347-2474-453a-9dc1-c1fa6daf6129	Non	2	fr_FR
f241e974-c4a0-4d45-bd81-7cec2a753e09	6524e347-2474-453a-9dc1-c1fa6daf6129	Je ne sais pas	3	fr_FR
01bc6462-cec0-4ff3-9d45-7e5d973eee65	9aa16063-a8b3-4efe-801e-433f3a3c4a61	Yes	1	en_US
3bf2c581-9e78-4f62-8ee8-92e00ff178d5	9aa16063-a8b3-4efe-801e-433f3a3c4a61	No	2	en_US
a0352cfb-3ac1-46d1-97e7-82545c716492	9aa16063-a8b3-4efe-801e-433f3a3c4a61	I don't know	3	en_US
d10eebc2-42c7-4d47-94d3-41f7c9a3b47d	9aa16063-a8b3-4efe-801e-433f3a3c4a61	Oui	1	fr_FR
2413bee8-a091-4761-a23e-50a4c26eaaf5	9aa16063-a8b3-4efe-801e-433f3a3c4a61	Non	2	fr_FR
a5ef9b38-efb3-4aaa-a391-031990e7dd24	9aa16063-a8b3-4efe-801e-433f3a3c4a61	Je ne sais pas	3	fr_FR
b5a5834d-3ae8-4006-935d-4334e660cdf9	ff5f90f7-9cf7-487a-a839-a119698dd932	Yes	1	en_US
e9d8b176-7e86-4e8f-b8ff-c96600c2347d	ff5f90f7-9cf7-487a-a839-a119698dd932	No	2	en_US
5834c213-6446-41fc-a3ee-4090c3f23975	ff5f90f7-9cf7-487a-a839-a119698dd932	I don't know	3	en_US
cb13aca6-8bfd-4b8e-8a9c-f2b4e097b531	ff5f90f7-9cf7-487a-a839-a119698dd932	Oui	1	fr_FR
7b3ac950-4505-41d7-8288-be15c01b9b51	ff5f90f7-9cf7-487a-a839-a119698dd932	Non	2	fr_FR
d5e1593f-4a27-48a5-b060-be2508a3832b	ff5f90f7-9cf7-487a-a839-a119698dd932	Je ne sais pas	3	fr_FR
2ef351ca-f020-4819-bcea-d63dc4074f02	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	Yes	1	en_US
72b70fde-5e2e-4eff-bbdf-b28cb7653c75	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	No	2	en_US
f9554661-83b6-4641-a1ec-fcd3cac2b78c	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	I don't know	3	en_US
22657b26-dd5a-4c16-aebc-8cc3d0270a0d	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	Oui	1	fr_FR
2ff23e12-43f6-4484-81eb-f871eac221e2	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	Non	2	fr_FR
2a452e32-eba0-4ea5-a094-4f7361bcde0f	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	Je ne sais pas	3	fr_FR
40436bbb-27fe-4838-a42d-403013594f82	adc0bf61-9e77-4226-8a5b-765a04e035aa	Yes	1	en_US
7c92d16b-9d89-4f57-bbd9-ac205131a8dd	adc0bf61-9e77-4226-8a5b-765a04e035aa	No	2	en_US
805f8dca-8a2c-43b4-831f-7246dcb6094b	adc0bf61-9e77-4226-8a5b-765a04e035aa	I don't know	3	en_US
ca74b7b6-172e-4c36-be51-798afed05576	adc0bf61-9e77-4226-8a5b-765a04e035aa	Oui	1	fr_FR
3d860a30-d807-4230-b23f-a8dacc494217	adc0bf61-9e77-4226-8a5b-765a04e035aa	Non	2	fr_FR
7cd037ac-1475-4e1b-97e9-1bdbf3b30ab7	adc0bf61-9e77-4226-8a5b-765a04e035aa	Je ne sais pas	3	fr_FR
408d13a8-daa4-489f-97f2-8984ad04a523	12c9e81b-3b09-4ce4-8608-fa1e5c281168	Yes	1	en_US
99a2a78c-c794-47da-acba-076d2634cbe3	12c9e81b-3b09-4ce4-8608-fa1e5c281168	No	2	en_US
7a62fdb9-8a5c-4806-8868-2d35b95f0d7e	12c9e81b-3b09-4ce4-8608-fa1e5c281168	I don't know	3	en_US
f6293bb1-a07d-4818-8d05-b6a525896f03	12c9e81b-3b09-4ce4-8608-fa1e5c281168	Oui	1	fr_FR
c9fca5cf-6c57-46ce-aea5-b70665c68c15	12c9e81b-3b09-4ce4-8608-fa1e5c281168	Non	2	fr_FR
eddf92c0-ab83-4bc9-8472-99336ff71699	12c9e81b-3b09-4ce4-8608-fa1e5c281168	Je ne sais pas	3	fr_FR
86143077-a661-4629-8728-7c5ece48aec2	3a991bbc-3caa-4a2e-b86b-ea3a72840351	Yes	1	en_US
c8802a3a-f5c5-4f5c-b294-ab75d2db7072	3a991bbc-3caa-4a2e-b86b-ea3a72840351	No	2	en_US
6c7cdaa5-7059-49ef-a4d9-d957abbf9231	3a991bbc-3caa-4a2e-b86b-ea3a72840351	I don't know	3	en_US
47fa18b9-934f-4d9c-896b-dd96d1614be4	3a991bbc-3caa-4a2e-b86b-ea3a72840351	Oui	1	fr_FR
45123eda-93f9-43ee-8c4c-d1f11c7caec0	3a991bbc-3caa-4a2e-b86b-ea3a72840351	Non	2	fr_FR
f6d39fc6-cae1-460c-b235-a7f025f4db76	3a991bbc-3caa-4a2e-b86b-ea3a72840351	Je ne sais pas	3	fr_FR
7250a1b0-12a5-4221-a553-e9e6edc34d68	ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	Yes	1	en_US
7921f266-231e-4864-9445-db5d74f4830c	ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	No	2	en_US
fdf4e18c-c9d1-43e3-9588-479477827a80	ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	I don't know	3	en_US
8f8f1386-74c8-4e58-bbf8-5f826cb9d3ae	ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	Oui	1	fr_FR
3f9da6c9-8ba0-4590-aa08-884e67cd109c	ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	Non	2	fr_FR
ee1c645b-aa5e-4c9e-abb5-24aa6b146f08	ecb3f609-bc5e-4d62-8625-a1cfe8ee9d76	Je ne sais pas	3	fr_FR
9f88e4e0-ca86-47e5-9f57-841ac6e7f446	413a283c-4022-4f90-a742-b3c4098e9633	Yes	1	en_US
00028996-06ce-4ad7-9f16-d324b8307454	413a283c-4022-4f90-a742-b3c4098e9633	No	2	en_US
c64c3f42-8a69-45ee-9d7f-745c589a4d57	413a283c-4022-4f90-a742-b3c4098e9633	I don't know	3	en_US
17e188bf-7475-4ae8-8e0d-65225f3fc670	413a283c-4022-4f90-a742-b3c4098e9633	Oui	1	fr_FR
6efc3c33-0f83-42ac-ab9d-965680ea3e06	413a283c-4022-4f90-a742-b3c4098e9633	Non	2	fr_FR
dc7a20f1-9b04-42fd-8528-2889c58a342f	413a283c-4022-4f90-a742-b3c4098e9633	Je ne sais pas	3	fr_FR
9885dd20-836e-407d-b625-6a8f570d6f0c	97a944ab-acf6-4a2f-8787-a6cc9520ec0f	Yes	1	en_US
700b05d1-a6d5-45a5-bbc8-c1a5b69ae522	97a944ab-acf6-4a2f-8787-a6cc9520ec0f	No	2	en_US
6a62a1a8-21ee-4794-b77d-27a19d8d37a2	97a944ab-acf6-4a2f-8787-a6cc9520ec0f	I don't know	3	en_US
c2e001e9-2426-4bd0-a8e7-03e08a85b962	97a944ab-acf6-4a2f-8787-a6cc9520ec0f	Oui	1	fr_FR
eebc5e89-59f2-4066-8415-a5056aa134f2	97a944ab-acf6-4a2f-8787-a6cc9520ec0f	Non	2	fr_FR
a773b9a3-3900-418e-860e-162c2c36f374	97a944ab-acf6-4a2f-8787-a6cc9520ec0f	Je ne sais pas	3	fr_FR
9771d58c-ce5f-4b4a-9e50-74443d882db2	c91657e2-fdc2-4d61-a35f-db641b348955	Yes	1	en_US
c596b997-37bf-4606-9371-49666c1b09d3	c91657e2-fdc2-4d61-a35f-db641b348955	No	2	en_US
0c56f43d-e4d8-4af9-b7fc-3ebba7395344	c91657e2-fdc2-4d61-a35f-db641b348955	I don't know	3	en_US
88168c7c-2632-418d-8aef-d95a593bbee9	c91657e2-fdc2-4d61-a35f-db641b348955	Oui	1	fr_FR
9f50e98c-885d-4520-8868-123b3ff1005b	c91657e2-fdc2-4d61-a35f-db641b348955	Non	2	fr_FR
abb215ff-cc9d-4d70-871d-6d5f9d3c03da	c91657e2-fdc2-4d61-a35f-db641b348955	Je ne sais pas	3	fr_FR
8c9ac129-e552-49bd-b044-d19e2cd703b7	572e63a5-9858-4b31-a50f-2b3b97223bb2	Yes	1	en_US
20f73256-7c2c-4f87-9016-5b93f172eff8	572e63a5-9858-4b31-a50f-2b3b97223bb2	No	2	en_US
18a35dbd-8be3-4f28-8a4b-ed9852234dfc	572e63a5-9858-4b31-a50f-2b3b97223bb2	I don't know	3	en_US
94e9d057-be45-43b3-823d-2aa09184e2c4	572e63a5-9858-4b31-a50f-2b3b97223bb2	Oui	1	fr_FR
e9b07451-7685-49be-99c7-bc6531541922	572e63a5-9858-4b31-a50f-2b3b97223bb2	Non	2	fr_FR
d12903de-a4de-4593-bbdc-982fb254010c	572e63a5-9858-4b31-a50f-2b3b97223bb2	Je ne sais pas	3	fr_FR
f8f5ac5d-3642-47ef-9a7c-c0f4f89f20f2	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	Yes	1	en_US
9009536a-a5be-4aef-971d-83d90eaef4e1	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	No	2	en_US
be1c6776-79c7-4cb9-b7d3-0334ff4c92fb	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	I don't know	3	en_US
5c6edeae-de95-44c9-b846-4fdde104501e	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	Oui	1	fr_FR
d1d11c56-d0be-4d26-ba38-fd3c6cfe39b3	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	Non	2	fr_FR
771043a4-d914-477c-9242-2a9cf4ed4087	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	Je ne sais pas	3	fr_FR
a11bbd49-c7f2-459e-a604-b8c1aeaeb516	42da9e30-776a-492c-b355-c8b79aa6fc7d	Yes	1	en_US
c8f842ed-bbd2-4cc7-8685-62a08cdcf108	42da9e30-776a-492c-b355-c8b79aa6fc7d	No	2	en_US
fcea6c12-fb20-4581-bf7e-641d99a90cc1	42da9e30-776a-492c-b355-c8b79aa6fc7d	I don't know	3	en_US
f1fe4819-8ee4-4c4e-b056-fce72fa9eaf3	42da9e30-776a-492c-b355-c8b79aa6fc7d	Oui	1	fr_FR
524aaee7-2ada-46fd-a859-db6a4c2237d9	42da9e30-776a-492c-b355-c8b79aa6fc7d	Non	2	fr_FR
37455478-3a6d-4c5c-a866-5f1818734e07	42da9e30-776a-492c-b355-c8b79aa6fc7d	Je ne sais pas	3	fr_FR
7aee6fa8-76b4-44c0-b33f-3b0ddeaa77df	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	Yes	1	en_US
2de9682f-8b8f-45c2-9d53-ea6fb07e04ec	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	No	2	en_US
d229245b-fbb3-45be-93c2-42e92731ab01	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	I don't know	3	en_US
da7a08ed-0a02-4db2-8f0e-79574d809af5	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	Oui	1	fr_FR
5f4b0865-cd06-46a6-8e8b-5fdf85ea5da2	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	Non	2	fr_FR
83da591a-0e0c-4a87-b704-d2007221ebb5	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	Je ne sais pas	3	fr_FR
fcb4ceac-4570-4883-b294-981e2450e141	b8da26d2-712b-4c26-a3eb-a58432690bc9	Yes	1	en_US
ee70bf8d-ccde-4395-846e-d01d92ba4f7e	b8da26d2-712b-4c26-a3eb-a58432690bc9	No	2	en_US
1ecc4451-17d9-4910-b2c0-34181ae3e5c1	b8da26d2-712b-4c26-a3eb-a58432690bc9	I don't know	3	en_US
9a2ccc43-6aff-49c1-b22c-f28ad8d45a78	b8da26d2-712b-4c26-a3eb-a58432690bc9	Oui	1	fr_FR
4980dde8-f9cd-4acd-9fbb-1e40f1f56173	b8da26d2-712b-4c26-a3eb-a58432690bc9	Non	2	fr_FR
620f7cb2-3d1d-4189-a46b-629f2a204a7c	b8da26d2-712b-4c26-a3eb-a58432690bc9	Je ne sais pas	3	fr_FR
2ac5ffcf-da2c-4114-948d-57cafa90553b	da0352aa-205a-46a2-88f2-44337e07d82f	Yes	1	en_US
c669ca96-3b43-41f2-95f9-cb45591d75e9	da0352aa-205a-46a2-88f2-44337e07d82f	No	2	en_US
b9e50c9d-a910-49fa-808f-888eb642f54e	da0352aa-205a-46a2-88f2-44337e07d82f	I don't know	3	en_US
562bd121-7abd-4198-b58c-c85e9d959e79	da0352aa-205a-46a2-88f2-44337e07d82f	Oui	1	fr_FR
55c05552-b9e3-48a3-974e-930bb9a0174c	da0352aa-205a-46a2-88f2-44337e07d82f	Non	2	fr_FR
9f15ec74-89ec-459a-884c-1e4b0ec7653c	da0352aa-205a-46a2-88f2-44337e07d82f	Je ne sais pas	3	fr_FR
0840e890-5670-4f75-a091-aa5cc48a079e	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	Yes	1	en_US
7005487f-88e3-4da3-8e21-66e5998f7211	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	No	2	en_US
0d0bff73-86cf-4157-97e4-242995eaf7c3	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	I don't know	3	en_US
f1b5e3a9-e7a5-493b-b7ad-833a77791900	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	Oui	1	fr_FR
5082c4d9-171f-4b23-adc6-808ca00680f5	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	Non	2	fr_FR
a9aee983-b1c7-448d-8bd2-1ee303ab3393	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	Je ne sais pas	3	fr_FR
3838326f-07af-4198-a02c-df5cc8735ab8	8b4e4268-8871-433e-aeda-871ea6168258	Yes	1	en_US
105158a8-08f8-4df3-a0ea-20edf78bdd0c	8b4e4268-8871-433e-aeda-871ea6168258	No	2	en_US
4505a986-6835-4b66-8107-c95419d5e13c	8b4e4268-8871-433e-aeda-871ea6168258	I don't know	3	en_US
4f116039-07d3-47ef-a3dd-fde8205ed31f	8b4e4268-8871-433e-aeda-871ea6168258	Oui	1	fr_FR
9c712274-baaf-4475-9cc5-d9cf51c383f5	8b4e4268-8871-433e-aeda-871ea6168258	Non	2	fr_FR
b25f04a4-ed93-45f5-8226-1d6d32e3f8c1	8b4e4268-8871-433e-aeda-871ea6168258	Je ne sais pas	3	fr_FR
4fdc3065-0f26-4edc-a72c-7b58a61af22c	467e8afc-4292-4d4a-b970-1c3b04452e10	Yes	1	en_US
9973a156-1145-4df6-821a-3ccd0148565a	467e8afc-4292-4d4a-b970-1c3b04452e10	No	2	en_US
cbdf9ae3-db4c-4c3e-acc0-586f1ab150e6	467e8afc-4292-4d4a-b970-1c3b04452e10	I don't know	3	en_US
678c3010-c0ab-452e-b776-32df39b5fcc4	467e8afc-4292-4d4a-b970-1c3b04452e10	Oui	1	fr_FR
da07c6ab-0f0c-414e-b59b-e4367e4c6b54	467e8afc-4292-4d4a-b970-1c3b04452e10	Non	2	fr_FR
90032f47-9783-4edd-8afa-6de6ad3bdde7	467e8afc-4292-4d4a-b970-1c3b04452e10	Je ne sais pas	3	fr_FR
eada1a7f-d96e-44d7-98a2-04858f69abe5	f7df86fc-6889-4034-8554-89a2c7b7b0dc	Yes	1	en_US
d6aaef2d-6992-4157-b6fc-cd661615b2a9	f7df86fc-6889-4034-8554-89a2c7b7b0dc	No	2	en_US
88565ee4-edf0-4c20-8dad-1b0352ce12ab	f7df86fc-6889-4034-8554-89a2c7b7b0dc	I don't know	3	en_US
ad2d303a-b134-4854-b546-0e34cf0b7183	f7df86fc-6889-4034-8554-89a2c7b7b0dc	Oui	1	fr_FR
a61a24c6-42aa-4549-a82e-308ed0ae061d	f7df86fc-6889-4034-8554-89a2c7b7b0dc	Non	2	fr_FR
5010bd6e-4c7d-4157-b9fa-64f402b50321	f7df86fc-6889-4034-8554-89a2c7b7b0dc	Je ne sais pas	3	fr_FR
ecd842ef-8894-43ea-9daf-527144f45cbc	bfc27d3d-28c1-4800-9a19-4083ec767ff7	Yes	1	en_US
3b1cf4ff-c667-4adb-9c76-c161f637c191	bfc27d3d-28c1-4800-9a19-4083ec767ff7	No	2	en_US
9cc271d2-e26c-4176-badf-e4c60342d940	bfc27d3d-28c1-4800-9a19-4083ec767ff7	I don't know	3	en_US
79d9328e-b72f-462c-9551-32a5a4e99787	bfc27d3d-28c1-4800-9a19-4083ec767ff7	Oui	1	fr_FR
31d8031c-73d8-43f4-a4f0-146e2cc17e88	bfc27d3d-28c1-4800-9a19-4083ec767ff7	Non	2	fr_FR
34358ac6-9841-4c22-95c3-4dcf1b494380	bfc27d3d-28c1-4800-9a19-4083ec767ff7	Je ne sais pas	3	fr_FR
f1e0ab60-c04b-440c-9e87-5e6520004248	b73af29b-32b0-40e1-867a-765276acc40f	Yes	1	en_US
fe1cd23b-4584-4967-8b1c-567b05a7b705	b73af29b-32b0-40e1-867a-765276acc40f	No	2	en_US
68edd08b-87b6-407c-9634-1d6f81077baa	b73af29b-32b0-40e1-867a-765276acc40f	I don't know	3	en_US
a16f8816-fd4f-4b76-a324-98efda6ac9cd	b73af29b-32b0-40e1-867a-765276acc40f	Oui	1	fr_FR
68762ef2-4ad8-4c5b-b07d-ca96196cd510	b73af29b-32b0-40e1-867a-765276acc40f	Non	2	fr_FR
eb618617-64ab-49fb-ada6-db5a931bf656	b73af29b-32b0-40e1-867a-765276acc40f	Je ne sais pas	3	fr_FR
b30c1b48-66f5-4f70-8f59-fadbfcd7563c	45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	Yes	1	en_US
527c1c42-7cd6-481a-bb8f-1b48c05c593f	45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	No	2	en_US
f8238639-8460-406a-ba3b-c4bb918b7d31	45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	I don't know	3	en_US
7e22ddab-9bb6-458a-8a4f-27e67243b0e2	45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	Oui	1	fr_FR
22b746cd-5ab6-4f77-971a-ac6bdd28b04b	45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	Non	2	fr_FR
03e549c9-7ed6-41f1-a878-0a2ec6d4e401	45a6a1b1-c3c2-4905-9aa2-bdd5c88e10bb	Je ne sais pas	3	fr_FR
b2d7307e-2fea-4dfc-b2e3-e65e69634b53	df302924-708c-4861-a238-ddd950574c27	Yes	1	en_US
b570c659-4dcd-471d-b369-556c7153a464	df302924-708c-4861-a238-ddd950574c27	No	2	en_US
63a123b3-cffc-4ec8-9941-05baea656aab	df302924-708c-4861-a238-ddd950574c27	I don't know	3	en_US
5fb88a3e-801b-4acf-8ce7-0c7619e70b22	df302924-708c-4861-a238-ddd950574c27	Oui	1	fr_FR
f6e6d84f-2929-4845-a06b-dad57c2302e7	df302924-708c-4861-a238-ddd950574c27	Non	2	fr_FR
8a434476-6d8b-437b-8fc6-c6a53c9ef4d1	df302924-708c-4861-a238-ddd950574c27	Je ne sais pas	3	fr_FR
e520c6d1-8358-4901-bfe5-4cbc65bac769	d291332c-68d5-4a91-9b96-cb8c9a9ac930	Yes	1	en_US
928f1180-3936-4331-a924-10c91b19142d	d291332c-68d5-4a91-9b96-cb8c9a9ac930	No	2	en_US
7d90cf67-8813-4329-9441-ebf02c100291	d291332c-68d5-4a91-9b96-cb8c9a9ac930	I don't know	3	en_US
bca9798c-fe22-4d92-bff9-9e800609d896	d291332c-68d5-4a91-9b96-cb8c9a9ac930	Oui	1	fr_FR
6c3442c3-6527-4c65-9895-e0ab2dd67da0	d291332c-68d5-4a91-9b96-cb8c9a9ac930	Non	2	fr_FR
f89c2426-84a1-4232-8b3b-b2a1d02305c9	d291332c-68d5-4a91-9b96-cb8c9a9ac930	Je ne sais pas	3	fr_FR
73dd7f65-d572-4546-8e44-426f6f9a9929	c1242167-5aae-435c-9196-58298b3d9261	Yes	1	en_US
efabf631-24d9-41b8-b3d4-e3a4e1229c82	c1242167-5aae-435c-9196-58298b3d9261	No	2	en_US
9e0f6e49-c455-408f-8f07-fc20715cc249	c1242167-5aae-435c-9196-58298b3d9261	I don't know	3	en_US
c6899afe-6703-44ec-9fd1-54b5abe6d886	c1242167-5aae-435c-9196-58298b3d9261	Oui	1	fr_FR
6472e829-b814-4808-aa4b-731bd49c586e	c1242167-5aae-435c-9196-58298b3d9261	Non	2	fr_FR
fb59d03c-8565-48ed-b50c-624aa1f5d012	c1242167-5aae-435c-9196-58298b3d9261	Je ne sais pas	3	fr_FR
b5ca516e-a10b-4c99-a0b4-2f4fb0b6a731	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	Yes	1	en_US
3691e875-c63d-4a96-ae23-29894592a4f3	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	No	2	en_US
5122b528-a0be-48f0-802d-2dc672fca238	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	I don't know	3	en_US
2c7e5c61-4ad3-44fe-b4e9-02f41bad5b19	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	Oui	1	fr_FR
a35b0a47-2355-4572-8a86-679559fef5c6	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	Non	2	fr_FR
ca4a93cf-e7eb-41a0-adc7-5c88635cf38d	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	Je ne sais pas	3	fr_FR
9734321c-e844-4b9c-9633-4f65add69ede	b156696e-49af-4582-8e63-a41a46840bd7	Yes	1	en_US
22a5349e-1138-426c-860d-cc8e89de0fbe	b156696e-49af-4582-8e63-a41a46840bd7	No	2	en_US
9dce9056-adbc-47ee-8b20-dd47cd20166b	b156696e-49af-4582-8e63-a41a46840bd7	I don't know	3	en_US
9b5f0dbe-3285-471c-bbe5-8d707cb7a360	b156696e-49af-4582-8e63-a41a46840bd7	Oui	1	fr_FR
39d3ffb3-71da-4df3-b63f-a910187be5fe	b156696e-49af-4582-8e63-a41a46840bd7	Non	2	fr_FR
3c7b38a9-e686-48e1-b0d5-556ddbd2ba25	b156696e-49af-4582-8e63-a41a46840bd7	Je ne sais pas	3	fr_FR
7b23f314-02f3-43d5-ab32-3a48573a7f70	5097e0ff-e224-4060-9051-cb9fdd9e99d4	Yes	1	en_US
51e774ba-005d-40d3-814d-84216ed1da66	5097e0ff-e224-4060-9051-cb9fdd9e99d4	No	2	en_US
16ddf13a-4729-4271-b51e-9c40fdd520ab	5097e0ff-e224-4060-9051-cb9fdd9e99d4	I don't know	3	en_US
8041cd51-391b-4aa9-95ae-2b01a365e71a	5097e0ff-e224-4060-9051-cb9fdd9e99d4	Oui	1	fr_FR
4baa8ea5-82c6-45d2-b186-9e4db974f694	5097e0ff-e224-4060-9051-cb9fdd9e99d4	Non	2	fr_FR
72eccd85-257d-43fe-845b-e50eae39ee18	5097e0ff-e224-4060-9051-cb9fdd9e99d4	Je ne sais pas	3	fr_FR
3466dcf7-a46b-4fde-bab3-23a4e8288d96	4f64a379-9677-4b09-a4b4-3007f5403879	Yes	1	en_US
d2e583af-4b6f-4de2-b6a9-3ad5921e0f9a	4f64a379-9677-4b09-a4b4-3007f5403879	No	2	en_US
1e15165f-3b0c-48f5-bc93-e99f8afebcd5	4f64a379-9677-4b09-a4b4-3007f5403879	I don't know	3	en_US
bb9e0a81-4829-4355-a2e9-3f13de8b2910	4f64a379-9677-4b09-a4b4-3007f5403879	Oui	1	fr_FR
3fd7428d-5814-4959-818e-c07e84300bcc	4f64a379-9677-4b09-a4b4-3007f5403879	Non	2	fr_FR
9345015f-de2b-4ea5-a7bb-25cd77d22fdf	4f64a379-9677-4b09-a4b4-3007f5403879	Je ne sais pas	3	fr_FR
20dc5523-6726-4a4e-bf99-bb8b2db13ee0	2113e0af-27a5-4be6-a356-d11f82c2aeaa	Yes	1	en_US
b1141d26-ef1e-48d8-b797-d89be4428d2a	2113e0af-27a5-4be6-a356-d11f82c2aeaa	No	2	en_US
afd2f336-2524-4120-b468-935e5d2961de	2113e0af-27a5-4be6-a356-d11f82c2aeaa	I don't know	3	en_US
c7962b17-db7d-4620-9cac-3cd573ed18ab	2113e0af-27a5-4be6-a356-d11f82c2aeaa	Oui	1	fr_FR
1e83381d-c05f-44d5-85ad-4aa882c1f8cb	2113e0af-27a5-4be6-a356-d11f82c2aeaa	Non	2	fr_FR
988f201b-132a-4681-a623-aeae9eb20615	2113e0af-27a5-4be6-a356-d11f82c2aeaa	Je ne sais pas	3	fr_FR
471cae48-84a7-4b63-b9b9-827c8c0138a5	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	Yes	1	en_US
cd5681ed-722b-4c7f-bac8-f74804607edc	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	No	2	en_US
ab37c21c-92ad-4e68-8bed-96cd89f5d976	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	I don't know	3	en_US
c4bbaba1-983d-4306-9997-a9ba236b2e38	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	Oui	1	fr_FR
fd365cf7-5c94-4cce-bb1d-97a16fe748ef	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	Non	2	fr_FR
3cd503c2-c088-4988-9359-d3f609279194	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	Je ne sais pas	3	fr_FR
13c8e08b-5280-4fac-b5a4-0ae504800d3a	a0e42c6c-02ab-4ea0-90e4-43523da39b03	Yes	1	en_US
e690f94f-4c69-4c7d-9957-5c613a1c0ace	a0e42c6c-02ab-4ea0-90e4-43523da39b03	No	2	en_US
8fb8d750-1f40-41fa-8398-afaefb8637d7	a0e42c6c-02ab-4ea0-90e4-43523da39b03	I don't know	3	en_US
c9388974-9d9c-4260-9ee1-cdf33dd02610	a0e42c6c-02ab-4ea0-90e4-43523da39b03	Oui	1	fr_FR
995c8ccf-4818-467b-9cfe-583ce5015a3a	a0e42c6c-02ab-4ea0-90e4-43523da39b03	Non	2	fr_FR
3e7fe873-040d-4c7f-8900-da7a8f91d444	a0e42c6c-02ab-4ea0-90e4-43523da39b03	Je ne sais pas	3	fr_FR
45e91ce7-421e-45e9-b12e-5a9f6a85f4e1	4c903a88-55b7-4f68-9cd8-06d374a8baf0	Yes	1	en_US
6410a222-682e-404f-b292-bfa744172397	4c903a88-55b7-4f68-9cd8-06d374a8baf0	No	2	en_US
fee7bb60-8fc3-47c5-b153-50bb5c683bf4	4c903a88-55b7-4f68-9cd8-06d374a8baf0	I don't know	3	en_US
8eae1fe1-6e71-49c0-883a-3d571ef5845d	4c903a88-55b7-4f68-9cd8-06d374a8baf0	Oui	1	fr_FR
4c67e6bc-478f-49ee-b5fc-1e01889fcf16	4c903a88-55b7-4f68-9cd8-06d374a8baf0	Non	2	fr_FR
81c10716-e966-4f90-b5bc-298618447bb6	4c903a88-55b7-4f68-9cd8-06d374a8baf0	Je ne sais pas	3	fr_FR
9654a4b9-4537-482c-bc50-6b5bb76b82c5	e0d4cf71-7f3c-4846-baec-90a3bb95d23b	Yes	1	en_US
dd272cca-50c0-4d8b-a3da-210f04e2bdfd	e0d4cf71-7f3c-4846-baec-90a3bb95d23b	No	2	en_US
4e518662-4e64-455e-acce-abcf8ca6b3aa	e0d4cf71-7f3c-4846-baec-90a3bb95d23b	I don't know	3	en_US
b884b00e-b514-402c-95fa-de8122a4cd3e	e0d4cf71-7f3c-4846-baec-90a3bb95d23b	Oui	1	fr_FR
778108e0-ae7b-4a9f-8772-59fbf01db29b	e0d4cf71-7f3c-4846-baec-90a3bb95d23b	Non	2	fr_FR
56ebd32f-c2e2-4aeb-ab6a-ea869d7e243d	e0d4cf71-7f3c-4846-baec-90a3bb95d23b	Je ne sais pas	3	fr_FR
8179c4c6-f83a-4ba7-a56b-3d16b970cfd6	cad0e400-d7fe-4a60-b939-0ca272f578ce	Yes	1	en_US
61527dad-0f82-46da-b430-b4279cf8e753	cad0e400-d7fe-4a60-b939-0ca272f578ce	No	2	en_US
8a85c3ae-4ca8-4210-9fcd-348b7ef15c33	cad0e400-d7fe-4a60-b939-0ca272f578ce	I don't know	3	en_US
a09636c2-e0ce-4fdb-807b-1d3ba2926cc7	cad0e400-d7fe-4a60-b939-0ca272f578ce	Oui	1	fr_FR
53b99a0d-6f7a-4215-a771-7dc5c289f7cf	cad0e400-d7fe-4a60-b939-0ca272f578ce	Non	2	fr_FR
791eac35-221f-46c0-8df4-1a8e38656387	cad0e400-d7fe-4a60-b939-0ca272f578ce	Je ne sais pas	3	fr_FR
2e14f400-228b-4f57-9121-e5b4c95484c3	afc46845-19fa-4036-bc1f-3b1036104372	Yes	1	en_US
3725098e-507a-4625-874c-0ca1fd6a0e12	afc46845-19fa-4036-bc1f-3b1036104372	No	2	en_US
ac8e9847-e65c-4286-8680-543a60af0387	afc46845-19fa-4036-bc1f-3b1036104372	I don't know	3	en_US
81a2f6de-28f3-4da2-b72f-5f70121e3e00	afc46845-19fa-4036-bc1f-3b1036104372	Oui	1	fr_FR
bd60ed16-d8fe-4f07-b4dc-9bc569a40d78	afc46845-19fa-4036-bc1f-3b1036104372	Non	2	fr_FR
dcf5fd0e-13c1-42d8-a4aa-377d4f034be6	afc46845-19fa-4036-bc1f-3b1036104372	Je ne sais pas	3	fr_FR
311e9c36-5452-4dad-8756-e00f43ecf843	6cf88651-6c1c-4c77-8d5d-5333b5a8e448	Yes	1	en_US
53bc5938-c2c2-4529-8b28-299ef2ca6e68	6cf88651-6c1c-4c77-8d5d-5333b5a8e448	No	2	en_US
4c4e14f1-03d6-4097-a029-ef90dc50a451	6cf88651-6c1c-4c77-8d5d-5333b5a8e448	I don't know	3	en_US
df1f5355-59f8-47b1-9d6c-b89b75ff2f55	6cf88651-6c1c-4c77-8d5d-5333b5a8e448	Oui	1	fr_FR
e868ac23-7d1d-44f5-ab86-3d2ce9c4f20c	6cf88651-6c1c-4c77-8d5d-5333b5a8e448	Non	2	fr_FR
8c9fbeef-34d8-4a57-8656-02a3c1022cf6	6cf88651-6c1c-4c77-8d5d-5333b5a8e448	Je ne sais pas	3	fr_FR
4f7a35dc-5a90-4452-97e4-2a16382543d6	dcb3ebca-90bf-4e10-8977-54231b8ebef5	Yes	1	en_US
94e7eaae-52aa-44dd-ab56-d4f4f321c8a3	dcb3ebca-90bf-4e10-8977-54231b8ebef5	No	2	en_US
77780496-7547-420f-a11e-708b5e028591	dcb3ebca-90bf-4e10-8977-54231b8ebef5	I don't know	3	en_US
5b8ba53c-cb60-48e8-b6cc-2dcc394e8d98	dcb3ebca-90bf-4e10-8977-54231b8ebef5	Oui	1	fr_FR
baf38d7f-19e9-4573-afac-6c2cc1627acd	dcb3ebca-90bf-4e10-8977-54231b8ebef5	Non	2	fr_FR
7d4421fa-1c23-4ffb-b2d7-efe71ad54085	dcb3ebca-90bf-4e10-8977-54231b8ebef5	Je ne sais pas	3	fr_FR
74470011-65b0-4d48-b53b-5a1b9390b5bd	9d2245bc-d4c8-4e61-959f-d28105a788d9	Yes	1	en_US
30382c69-74c3-415f-800d-19093991b24c	9d2245bc-d4c8-4e61-959f-d28105a788d9	No	2	en_US
c20517f8-8c7d-4581-b35f-970491193656	9d2245bc-d4c8-4e61-959f-d28105a788d9	I don't know	3	en_US
db7e551b-06fe-464f-bc23-9559921e3341	9d2245bc-d4c8-4e61-959f-d28105a788d9	Oui	1	fr_FR
933d8533-dcac-484f-81c0-0591ffc66590	9d2245bc-d4c8-4e61-959f-d28105a788d9	Non	2	fr_FR
3d4d3bf2-ba57-491c-9b7a-9565e51529cf	9d2245bc-d4c8-4e61-959f-d28105a788d9	Je ne sais pas	3	fr_FR
4dfeef3f-15b3-4a3a-b59d-665dabd9b161	21c1796c-73e8-4f7a-a551-ec684b835a5f	Yes	1	en_US
4c02b2cd-cb32-4cd8-b70c-ae3a5a8591c4	21c1796c-73e8-4f7a-a551-ec684b835a5f	No	2	en_US
db79e14c-4f2c-48c3-92ed-cf18f7ef5706	21c1796c-73e8-4f7a-a551-ec684b835a5f	I don't know	3	en_US
209be4ec-2d49-4b74-8bd3-b92e33090bb5	21c1796c-73e8-4f7a-a551-ec684b835a5f	Oui	1	fr_FR
6a813af2-0a7d-438f-9f16-3f28e90cf936	21c1796c-73e8-4f7a-a551-ec684b835a5f	Non	2	fr_FR
6dbb2be2-0b74-4a32-95f1-bf4fe50339c9	21c1796c-73e8-4f7a-a551-ec684b835a5f	Je ne sais pas	3	fr_FR
ee8691cd-daa8-4b37-a2a4-210db0cf5a6a	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	Yes	1	en_US
d1b4909d-98c6-46a4-9341-208053949cf5	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	No	2	en_US
0484f989-3d5d-42a6-8492-6083e51863d4	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	I don't know	3	en_US
3aa2cfe5-e17a-4ae4-8737-11fd683ca493	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	Oui	1	fr_FR
5679a9ba-6dbb-4ace-8c61-69776d5b20d9	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	Non	2	fr_FR
a68196b5-69e5-4ca8-9a27-c92fa605fc46	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	Je ne sais pas	3	fr_FR
a7f7f375-7147-4343-9865-887ac55e1c66	912c3636-3a5a-4877-bae4-05e9f3028fd5	Yes	1	en_US
37dc7b61-ee8d-4aaf-a2d7-259ce8a0d888	912c3636-3a5a-4877-bae4-05e9f3028fd5	No	2	en_US
25ccacb3-f522-49e1-9d2b-c50ea9978682	912c3636-3a5a-4877-bae4-05e9f3028fd5	I don't know	3	en_US
cf97d60b-2207-485c-8908-2074d18854ba	912c3636-3a5a-4877-bae4-05e9f3028fd5	Oui	1	fr_FR
4580daf8-e2ee-4fda-8500-9612184b0c3c	912c3636-3a5a-4877-bae4-05e9f3028fd5	Non	2	fr_FR
9756d7cd-1200-4346-bd72-753e693724b6	912c3636-3a5a-4877-bae4-05e9f3028fd5	Je ne sais pas	3	fr_FR
9b6ad3b7-e800-4b7d-91b2-6550892e67e4	6c7fced7-c9d3-4a18-88cc-577d9a59b283	Yes	1	en_US
e79a2225-0446-492f-ade7-f75782ee9ffc	6c7fced7-c9d3-4a18-88cc-577d9a59b283	No	2	en_US
bcd81a0a-509e-4c19-9985-639dda51ae3c	6c7fced7-c9d3-4a18-88cc-577d9a59b283	I don't know	3	en_US
6ce39d25-c125-47e4-8c76-40bd57a6f08d	6c7fced7-c9d3-4a18-88cc-577d9a59b283	Oui	1	fr_FR
380439f4-35d2-47bd-9c02-79dd099ce3f0	6c7fced7-c9d3-4a18-88cc-577d9a59b283	Non	2	fr_FR
a8a8e7ec-b1bf-4747-93e4-a7be8c91704e	6c7fced7-c9d3-4a18-88cc-577d9a59b283	Je ne sais pas	3	fr_FR
9b4ba3b5-5659-4117-a78e-30a301b14d83	484abcbf-dbd3-4c73-9ddf-3d31102d9564	Yes	1	en_US
ec92940a-595d-45a3-a835-ca36e89a4fc7	484abcbf-dbd3-4c73-9ddf-3d31102d9564	No	2	en_US
81f8f212-8ea5-45fe-8ae1-a482b0371415	484abcbf-dbd3-4c73-9ddf-3d31102d9564	I don't know	3	en_US
e4b698fc-400b-4b1f-96d1-ca478af1ad47	484abcbf-dbd3-4c73-9ddf-3d31102d9564	Oui	1	fr_FR
b3321cdc-6e2d-4ca0-b6f7-44254ea05f18	484abcbf-dbd3-4c73-9ddf-3d31102d9564	Non	2	fr_FR
c68d46ab-834b-4895-a943-a395a73fbef8	484abcbf-dbd3-4c73-9ddf-3d31102d9564	Je ne sais pas	3	fr_FR
dc9dab3f-61b9-4cf5-b1b8-3fa403dc5e53	e3844bbc-243d-4225-a3a0-dedb1f1f285e	Yes	1	en_US
78fcf1a5-ef89-49f9-be66-eeb708abaafb	e3844bbc-243d-4225-a3a0-dedb1f1f285e	No	2	en_US
976c985b-07fd-4a2a-a08e-f17ee1c6a6b4	e3844bbc-243d-4225-a3a0-dedb1f1f285e	I don't know	3	en_US
1c7ad37a-2bc1-4671-8418-0b53b48e9f36	e3844bbc-243d-4225-a3a0-dedb1f1f285e	Oui	1	fr_FR
a88a1b84-6f42-473d-a3d4-ea89d2cf33a7	e3844bbc-243d-4225-a3a0-dedb1f1f285e	Non	2	fr_FR
4b766143-84ce-447f-a902-f882292f23e1	e3844bbc-243d-4225-a3a0-dedb1f1f285e	Je ne sais pas	3	fr_FR
85e9d768-cfeb-4c7a-b381-b98e2faeed04	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	Yes	1	en_US
c1ce4674-611b-48e2-aeff-da22551c026c	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	No	2	en_US
3ee8f7a4-b14b-4ce8-8b96-11b2c044109f	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	I don't know	3	en_US
1b409bb1-1f39-413a-be3c-7779aeb45fe4	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	Oui	1	fr_FR
3fa8b4e1-1fa8-4147-bb0b-ae41071c0106	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	Non	2	fr_FR
d1374d23-8971-4129-a085-6ce675d56992	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	Je ne sais pas	3	fr_FR
1b960fbc-d01e-4892-b4f6-032c2e1415eb	ffb69ca7-69f9-4694-b983-320fa63de509	Yes	1	en_US
41794c05-d926-40fa-b8b1-4dbc2f425acd	ffb69ca7-69f9-4694-b983-320fa63de509	No	2	en_US
b01e99f1-3791-4de2-9a72-b81e7373e9b0	ffb69ca7-69f9-4694-b983-320fa63de509	I don't know	3	en_US
c1c79424-aca8-40ba-9136-6c60d0e9c948	ffb69ca7-69f9-4694-b983-320fa63de509	Oui	1	fr_FR
aeaa79ca-593e-4343-a97f-f040b5297627	ffb69ca7-69f9-4694-b983-320fa63de509	Non	2	fr_FR
df80435b-da3f-4fb5-853f-8262e02df7c2	ffb69ca7-69f9-4694-b983-320fa63de509	Je ne sais pas	3	fr_FR
d7c2800f-04b5-4dee-afa3-b7daee486773	1afd8c5e-977f-4597-8368-b658f59aa7fc	Yes	1	en_US
a572f93a-b465-40c1-919d-06f4da3206e8	1afd8c5e-977f-4597-8368-b658f59aa7fc	No	2	en_US
ecf5a8b0-9d88-481e-b38c-869e7f88f026	1afd8c5e-977f-4597-8368-b658f59aa7fc	I don't know	3	en_US
3c7164e9-e5c7-4524-960c-6350643f27ce	1afd8c5e-977f-4597-8368-b658f59aa7fc	Oui	1	fr_FR
e7620ad7-2bdc-4ba9-b876-6ec80a4b9055	1afd8c5e-977f-4597-8368-b658f59aa7fc	Non	2	fr_FR
fa98c083-a69b-4352-84fe-07c4f96b9781	1afd8c5e-977f-4597-8368-b658f59aa7fc	Je ne sais pas	3	fr_FR
97fbe58f-78bc-4508-8075-41e79f142f9f	0ba134ba-6857-4ade-8b13-2b1df78701b8	Yes	1	en_US
c1683ea4-24de-4b34-a45b-9d9ee37f1b4f	0ba134ba-6857-4ade-8b13-2b1df78701b8	No	2	en_US
2870be76-43ee-4717-928c-0585a4ee7e54	0ba134ba-6857-4ade-8b13-2b1df78701b8	I don't know	3	en_US
5f83ac21-2505-4eca-8ec1-129f1e08fae7	0ba134ba-6857-4ade-8b13-2b1df78701b8	Oui	1	fr_FR
1fa181e7-fbe7-4fb0-a2f0-1f78d2b9a5e1	0ba134ba-6857-4ade-8b13-2b1df78701b8	Non	2	fr_FR
2e5ad252-f3b8-4497-8c71-27e53c3e2b34	0ba134ba-6857-4ade-8b13-2b1df78701b8	Je ne sais pas	3	fr_FR
bf55a9c7-2967-44d3-b2ef-057b4a0651e4	751ebb83-a155-443e-9d95-eaadf6183b57	Yes	1	en_US
bf139fcf-89c7-4557-b171-7bf8eee78894	751ebb83-a155-443e-9d95-eaadf6183b57	No	2	en_US
d650b02e-7134-41c0-a1f8-d28d41ca6088	751ebb83-a155-443e-9d95-eaadf6183b57	I don't know	3	en_US
8b3ad55c-30cd-4c41-ae02-2f142722ee74	751ebb83-a155-443e-9d95-eaadf6183b57	Oui	1	fr_FR
5af293ee-9e91-4b07-82fb-000f2734fd40	751ebb83-a155-443e-9d95-eaadf6183b57	Non	2	fr_FR
4b6cc262-6fb7-4a47-9bd4-77f70d785ec9	751ebb83-a155-443e-9d95-eaadf6183b57	Je ne sais pas	3	fr_FR
7c6de178-1b38-4342-b94a-1c82f5d327c5	9e3c8df2-f33e-4c86-90a0-3e04554cee14	Yes	1	en_US
a73c8c50-cd1d-4de6-975c-deac610d0b64	9e3c8df2-f33e-4c86-90a0-3e04554cee14	No	2	en_US
25f7e515-25c7-4114-b1fe-05aaa363e0d0	9e3c8df2-f33e-4c86-90a0-3e04554cee14	I don't know	3	en_US
c3ed7102-34e1-467e-b9e2-bcfc4fd56da9	9e3c8df2-f33e-4c86-90a0-3e04554cee14	Oui	1	fr_FR
92f06d67-bdf4-4381-bc3b-de0cea592c7d	9e3c8df2-f33e-4c86-90a0-3e04554cee14	Non	2	fr_FR
e3efe770-44ed-47a0-88ea-20223dc8b67e	9e3c8df2-f33e-4c86-90a0-3e04554cee14	Je ne sais pas	3	fr_FR
fa701eff-869e-4b5d-8c11-2a0eedb5cf42	7a2461a2-be29-4e95-9128-4f1d587ef9f9	Yes	1	en_US
729aa3d5-b308-4f37-a261-cb69e630bd0b	7a2461a2-be29-4e95-9128-4f1d587ef9f9	No	2	en_US
be3dd7dd-2d90-47db-ae37-4e4991b641fd	7a2461a2-be29-4e95-9128-4f1d587ef9f9	I don't know	3	en_US
bded0890-3183-46c4-b157-e1ab2eae8019	7a2461a2-be29-4e95-9128-4f1d587ef9f9	Oui	1	fr_FR
c4316669-8962-44b5-825b-01658eb2c5de	7a2461a2-be29-4e95-9128-4f1d587ef9f9	Non	2	fr_FR
092f953a-68e0-4433-8449-df7a5c16828f	7a2461a2-be29-4e95-9128-4f1d587ef9f9	Je ne sais pas	3	fr_FR
e9c191fb-70c6-4605-a776-bbaebb0fdfb3	4d461bdd-6555-4e75-b92d-7007787a206c	Yes	1	en_US
56170e95-ccb5-4add-9a66-58cdeea2a9d9	4d461bdd-6555-4e75-b92d-7007787a206c	No	2	en_US
5295533b-03e8-4197-9189-a41044c3ef7f	4d461bdd-6555-4e75-b92d-7007787a206c	I don't know	3	en_US
9b2a78ea-52e1-4a80-9f41-a6c9f8a069f7	4d461bdd-6555-4e75-b92d-7007787a206c	Oui	1	fr_FR
865d3c64-561b-4a80-ab75-f8812f71d80a	4d461bdd-6555-4e75-b92d-7007787a206c	Non	2	fr_FR
4798cc73-1ce6-4c7e-8735-5bb5bdf45b33	4d461bdd-6555-4e75-b92d-7007787a206c	Je ne sais pas	3	fr_FR
c85accc9-74fa-4ebe-b73d-3cd2fcaf305d	b5332f27-d03f-46ad-9860-7f33d7109466	Yes	1	en_US
9e80e36d-70e6-4fe7-87d4-775721bf76ac	b5332f27-d03f-46ad-9860-7f33d7109466	No	2	en_US
67710841-78dc-4ce5-ba4d-16fff8348396	b5332f27-d03f-46ad-9860-7f33d7109466	I don't know	3	en_US
cb9a7285-c029-4877-bfbf-e6456b4e78a3	b5332f27-d03f-46ad-9860-7f33d7109466	Oui	1	fr_FR
b92f5b61-d36d-41ca-8627-34ebbde54164	b5332f27-d03f-46ad-9860-7f33d7109466	Non	2	fr_FR
4068a9c8-c7fb-4883-a6d8-4ceb9e578f4a	b5332f27-d03f-46ad-9860-7f33d7109466	Je ne sais pas	3	fr_FR
dee1f785-361c-4e10-a448-3099ff609d0f	8b5228d0-9411-4aba-a14c-8dfda45f20d0	Yes	1	en_US
a0c4d28a-2fc2-46d4-bdbb-87017138f540	8b5228d0-9411-4aba-a14c-8dfda45f20d0	No	2	en_US
f1d4d1dd-3804-4539-833d-89ef1de1daf7	8b5228d0-9411-4aba-a14c-8dfda45f20d0	I don't know	3	en_US
ab5d6de6-375e-4f25-bd14-1be6846af6b0	8b5228d0-9411-4aba-a14c-8dfda45f20d0	Oui	1	fr_FR
ea07561b-7374-4543-9431-0388594fe16b	8b5228d0-9411-4aba-a14c-8dfda45f20d0	Non	2	fr_FR
2d1497fc-d5d4-44c4-95d9-a6bcb0edb0b1	8b5228d0-9411-4aba-a14c-8dfda45f20d0	Je ne sais pas	3	fr_FR
a2cbbf61-9e73-48f8-809b-c81898ebfc3b	3781e005-35d0-4802-8a02-b5b93a26be7d	Yes	1	en_US
b0445b11-7dfc-42f8-b82d-d66e589f902c	3781e005-35d0-4802-8a02-b5b93a26be7d	No	2	en_US
2c5f2c12-503b-4607-b510-c7c053172caf	3781e005-35d0-4802-8a02-b5b93a26be7d	I don't know	3	en_US
69c6a178-4d82-4afb-a902-3dd7fafb3cfb	3781e005-35d0-4802-8a02-b5b93a26be7d	Oui	1	fr_FR
f43cddb2-c2ac-4a22-ab9e-acaccc4e3bb5	3781e005-35d0-4802-8a02-b5b93a26be7d	Non	2	fr_FR
f41303c4-f15d-4a49-9f2f-3b8f94c0d5c1	3781e005-35d0-4802-8a02-b5b93a26be7d	Je ne sais pas	3	fr_FR
fe419bb1-bcac-4d29-8fdf-0f0c2ac990af	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	Yes	1	en_US
fbaa77b1-ea7f-4fde-ab11-4c95c3b20ef8	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	No	2	en_US
a7c5cb01-df89-4b80-ba1e-3984425a3756	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	I don't know	3	en_US
95d213b3-2f08-4bcf-bca4-06a5eec54eee	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	Oui	1	fr_FR
53c5176c-ec78-49d6-827b-cdfbdbe4bbe7	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	Non	2	fr_FR
637ba76a-689a-421e-9f5e-ecd849b320eb	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	Je ne sais pas	3	fr_FR
45e236b9-d183-47a5-b633-a701489591f9	e3184a76-0833-49d4-95b1-c3ae863be78b	Yes	1	en_US
63934da2-8b4c-4c5f-9d85-e5cde8ce18a2	e3184a76-0833-49d4-95b1-c3ae863be78b	No	2	en_US
ba2b4fb6-fa8a-4ad8-87da-19c6432b5677	e3184a76-0833-49d4-95b1-c3ae863be78b	I don't know	3	en_US
0f57579b-1633-4535-a515-9a05bad821b3	e3184a76-0833-49d4-95b1-c3ae863be78b	Oui	1	fr_FR
14cc7dac-7039-489e-b403-ccd802196df7	e3184a76-0833-49d4-95b1-c3ae863be78b	Non	2	fr_FR
599f94d7-44a3-49ee-b109-6b53004d0696	e3184a76-0833-49d4-95b1-c3ae863be78b	Je ne sais pas	3	fr_FR
6be82e7f-8f3f-455a-8326-ab94c8080c3c	5db47450-6c6b-4f83-964a-fbd370cb7465	Yes	1	en_US
a7c92b70-fd4c-4f4b-a078-19475254d997	5db47450-6c6b-4f83-964a-fbd370cb7465	No	2	en_US
f9a34b15-5ad3-4676-9dbd-a0faf763f0d9	5db47450-6c6b-4f83-964a-fbd370cb7465	I don't know	3	en_US
7d5ec64f-3f46-48c7-8604-db054707eecc	5db47450-6c6b-4f83-964a-fbd370cb7465	Oui	1	fr_FR
75ae9b74-d5cb-4e78-b227-42376c992a83	5db47450-6c6b-4f83-964a-fbd370cb7465	Non	2	fr_FR
59811b58-7871-4748-add0-3ee49c2485c3	5db47450-6c6b-4f83-964a-fbd370cb7465	Je ne sais pas	3	fr_FR
bd5e430b-4198-4a24-850c-134141965c72	5a55df28-edeb-45ae-b336-043a57f6f5b8	Yes	1	en_US
6c76d1a8-d616-4801-b952-0608e76f6374	5a55df28-edeb-45ae-b336-043a57f6f5b8	No	2	en_US
95c9a791-868a-4180-9909-c8356584b622	5a55df28-edeb-45ae-b336-043a57f6f5b8	I don't know	3	en_US
df3b1b52-c3a5-414c-a546-6a013b00c4bf	5a55df28-edeb-45ae-b336-043a57f6f5b8	Oui	1	fr_FR
d9b9f7c1-7b2f-44a0-bae3-18b645cdb9f4	5a55df28-edeb-45ae-b336-043a57f6f5b8	Non	2	fr_FR
44b21be9-1d2b-4adf-ab02-a0721fc06b22	5a55df28-edeb-45ae-b336-043a57f6f5b8	Je ne sais pas	3	fr_FR
363ecb1f-7a2d-4c9f-97bc-b6579a837a73	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	Yes	1	en_US
a5a29b24-3a6f-4767-8300-a5d41dfb09de	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	No	2	en_US
057ad8a7-054f-47e8-a86d-bb2de390e809	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	I don't know	3	en_US
9460be13-cb8f-4347-a4ab-43e0a4fbf1d1	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	Oui	1	fr_FR
3a76663f-2563-4f2e-9104-cac0f849ed3b	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	Non	2	fr_FR
95e34feb-3d3b-461c-b65b-6e786831b429	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	Je ne sais pas	3	fr_FR
014e9169-c4af-4256-b646-f80a262f8a66	8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	Yes	1	en_US
7187110c-b304-4f0f-b949-61c6890e6996	8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	No	2	en_US
0922ff14-554c-40b8-94ed-cc5dfd8b2ccd	8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	I don't know	3	en_US
c8c0a149-f49d-4b14-a28a-0ea1a09b458c	8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	Oui	1	fr_FR
f2d86fe3-140b-4398-beb1-47a23a4b69cf	8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	Non	2	fr_FR
c29a2314-8119-4e69-87f4-439b697fd7ea	8d8f37c6-cd0c-4ca8-9b99-a39dfc958c45	Je ne sais pas	3	fr_FR
b5c6a1c0-96d8-4ea4-a489-8d03c47cf795	cd3b1212-52b0-46fe-8243-db2ee3b8c81b	Yes	1	en_US
2b0ae3d7-017f-42e7-9013-d7b94671c8dc	cd3b1212-52b0-46fe-8243-db2ee3b8c81b	No	2	en_US
e96e94c1-f1dc-4f19-93bd-b73cb1341799	cd3b1212-52b0-46fe-8243-db2ee3b8c81b	I don't know	3	en_US
7e847587-622f-47df-a34d-df9753477688	cd3b1212-52b0-46fe-8243-db2ee3b8c81b	Oui	1	fr_FR
8749a319-d360-433b-93cd-b73002d860df	cd3b1212-52b0-46fe-8243-db2ee3b8c81b	Non	2	fr_FR
502682c3-6341-4006-b2ad-a84d1b3f32a3	cd3b1212-52b0-46fe-8243-db2ee3b8c81b	Je ne sais pas	3	fr_FR
dc72fb3a-03b3-4c9e-a451-326535a9ebef	f577157e-75a5-425e-b537-99cbf885c979	Yes	1	en_US
7da5cc93-f580-4bba-af2f-395021d4e29e	f577157e-75a5-425e-b537-99cbf885c979	No	2	en_US
fd205a93-0ce3-4304-b082-0df40bf7fa16	f577157e-75a5-425e-b537-99cbf885c979	I don't know	3	en_US
081f3a1a-bd24-4741-b9d0-612f59abe92b	f577157e-75a5-425e-b537-99cbf885c979	Oui	1	fr_FR
de8e10d8-8355-4503-9287-cd82801aad9f	f577157e-75a5-425e-b537-99cbf885c979	Non	2	fr_FR
10621f31-085f-4f00-9c31-c89703241aa1	f577157e-75a5-425e-b537-99cbf885c979	Je ne sais pas	3	fr_FR
8f361ff9-8095-436f-9058-5dad99cc7795	15724682-b932-4bf4-a734-87215b84955f	Yes	1	en_US
de83091b-997a-41e9-9b58-55a3e61f7cf0	15724682-b932-4bf4-a734-87215b84955f	No	2	en_US
349968b1-ac5b-45db-a1d5-18709e43e213	15724682-b932-4bf4-a734-87215b84955f	I don't know	3	en_US
f88289b6-6d2a-464d-a610-17e09c4df62d	15724682-b932-4bf4-a734-87215b84955f	Oui	1	fr_FR
ca4b5613-67bf-4e41-911b-9d3601b8c62d	15724682-b932-4bf4-a734-87215b84955f	Non	2	fr_FR
b791b3fe-04d3-4522-9a39-3a17487b3fb3	15724682-b932-4bf4-a734-87215b84955f	Je ne sais pas	3	fr_FR
36cb355b-19ce-4dde-b764-e7d7f6868d3e	bf4c517f-21a3-4ca3-96d4-2002965e42ed	Yes	1	en_US
06e7d44c-2f15-435d-a3e2-573351938379	bf4c517f-21a3-4ca3-96d4-2002965e42ed	No	2	en_US
f8c2316f-3341-46b4-a542-a8293ecec393	bf4c517f-21a3-4ca3-96d4-2002965e42ed	I don't know	3	en_US
5d0ce213-d1b4-4f17-b8e4-7083cf1629e5	bf4c517f-21a3-4ca3-96d4-2002965e42ed	Oui	1	fr_FR
01f26008-4026-4194-a38f-fca0e6d757c0	bf4c517f-21a3-4ca3-96d4-2002965e42ed	Non	2	fr_FR
c6671346-65f0-4d39-9d15-c420a40d57ff	bf4c517f-21a3-4ca3-96d4-2002965e42ed	Je ne sais pas	3	fr_FR
992ac602-56af-4985-a5bc-a5b782049183	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	Yes	1	en_US
ce99a9c1-1ed4-4430-84f4-f88446ce1fc7	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	No	2	en_US
34a32c41-1439-4e57-b93f-6d95d402acf1	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	I don't know	3	en_US
5eed0231-551b-4707-b41a-5e8af061bf85	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	Oui	1	fr_FR
80a1e365-477e-43a3-a3b7-9f4d08633bb3	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	Non	2	fr_FR
a0adc842-1054-4da2-83bc-ca58e43eb109	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	Je ne sais pas	3	fr_FR
441078cf-1b8f-451f-9241-18a7a8ca0b8e	17279c41-09b0-49be-87ec-05bf0d5da921	Yes	1	en_US
7238ae0f-0f91-4c56-8fc3-f8403a792282	17279c41-09b0-49be-87ec-05bf0d5da921	No	2	en_US
33ddd109-8037-48e8-bac2-86ddcd5add79	17279c41-09b0-49be-87ec-05bf0d5da921	I don't know	3	en_US
1dc5b26a-4059-4ebb-9363-bb05313f53a0	17279c41-09b0-49be-87ec-05bf0d5da921	Oui	1	fr_FR
730b6c7e-1bc3-4f46-89a3-98bfa2d35741	17279c41-09b0-49be-87ec-05bf0d5da921	Non	2	fr_FR
d68d7471-a667-45f8-9810-f227b679c8da	17279c41-09b0-49be-87ec-05bf0d5da921	Je ne sais pas	3	fr_FR
f3b04d16-722d-4b4f-80fd-4a85a3cf3c18	7883db29-dc81-4e6d-9dd1-e7847014c54a	Yes	1	en_US
71f1a6c2-3d5e-4010-92d3-3ce4a271ab7a	7883db29-dc81-4e6d-9dd1-e7847014c54a	No	2	en_US
b02738c9-3226-47cc-a8af-df55b6bb93f8	7883db29-dc81-4e6d-9dd1-e7847014c54a	I don't know	3	en_US
b850c7d9-7a85-432e-96f1-327e95437f2d	7883db29-dc81-4e6d-9dd1-e7847014c54a	Oui	1	fr_FR
caa8241f-f643-4b69-abfe-00ab634467e3	7883db29-dc81-4e6d-9dd1-e7847014c54a	Non	2	fr_FR
349ec325-7f15-4104-a252-8b0908ad814d	7883db29-dc81-4e6d-9dd1-e7847014c54a	Je ne sais pas	3	fr_FR
abb74872-361b-4163-8a9c-5b4d07201117	84a2e439-b945-4c8d-859c-7836589d8618	Yes	1	en_US
21e9eeff-ee50-4727-8bb5-3ecb6116d5a6	84a2e439-b945-4c8d-859c-7836589d8618	No	2	en_US
ef44788e-ed99-4fb3-9005-0bcdb64925c4	84a2e439-b945-4c8d-859c-7836589d8618	I don't know	3	en_US
a468e1f8-5d1d-46f9-abe9-5223d7bb9587	84a2e439-b945-4c8d-859c-7836589d8618	Oui	1	fr_FR
cb96822c-833a-46cb-b713-ca6156709f02	84a2e439-b945-4c8d-859c-7836589d8618	Non	2	fr_FR
20db006e-0f68-43c2-adef-e63a46501d9f	84a2e439-b945-4c8d-859c-7836589d8618	Je ne sais pas	3	fr_FR
9202841b-bd1a-4da4-9560-c4c57fdf8d8c	443e2674-e2dd-4a99-a627-582b1a178dc0	Yes	1	en_US
12e6428b-e875-4823-9809-861a030a4a8c	443e2674-e2dd-4a99-a627-582b1a178dc0	No	2	en_US
157cd91a-4824-4b0a-a01b-0ddde5f8e6db	443e2674-e2dd-4a99-a627-582b1a178dc0	I don't know	3	en_US
1d44a8db-ece3-403c-af21-88993a894043	443e2674-e2dd-4a99-a627-582b1a178dc0	Oui	1	fr_FR
6f9fafcf-9323-43cd-a318-9b7cb00e8689	443e2674-e2dd-4a99-a627-582b1a178dc0	Non	2	fr_FR
1cdaa42e-6e4b-4950-a54d-6338ae51c7a3	443e2674-e2dd-4a99-a627-582b1a178dc0	Je ne sais pas	3	fr_FR
7efc3397-bd1b-4b6b-a829-d838c98fb7de	61caff10-9b14-48c6-ad76-4a04a5e06c06	Yes	1	en_US
10a9766a-9861-4e59-a18e-6691ae79eeb5	61caff10-9b14-48c6-ad76-4a04a5e06c06	No	2	en_US
58ff5c06-aa45-4e64-82f5-20fafb3006c8	61caff10-9b14-48c6-ad76-4a04a5e06c06	I don't know	3	en_US
f7401139-d54e-464c-890b-ea76ba39dcd2	61caff10-9b14-48c6-ad76-4a04a5e06c06	Oui	1	fr_FR
b70501a2-edf6-40b9-a76b-06012291dbe1	61caff10-9b14-48c6-ad76-4a04a5e06c06	Non	2	fr_FR
5628b7b8-9bde-4e6b-ba21-29ae5f112fe6	61caff10-9b14-48c6-ad76-4a04a5e06c06	Je ne sais pas	3	fr_FR
861a1863-036c-4ec8-bec6-d59f50e2f92f	93162b5d-3d6c-47ba-aebe-e2295159b54d	Yes	1	en_US
4295a606-ca15-4181-be87-83a6aee8fde0	93162b5d-3d6c-47ba-aebe-e2295159b54d	No	2	en_US
ace938c6-3a0e-407d-9a70-aa74bcb79b9b	93162b5d-3d6c-47ba-aebe-e2295159b54d	I don't know	3	en_US
cca30ece-b121-4150-97ea-c7f4a8d00848	93162b5d-3d6c-47ba-aebe-e2295159b54d	Oui	1	fr_FR
6bf96f01-f67d-443c-9d27-0c6b559911c9	93162b5d-3d6c-47ba-aebe-e2295159b54d	Non	2	fr_FR
4963ca36-b343-4a01-87c7-9bdd527c9f73	93162b5d-3d6c-47ba-aebe-e2295159b54d	Je ne sais pas	3	fr_FR
ef58feab-d81c-419e-a0a6-c63115295a33	718dd026-21ba-44b5-92fa-17b65a2ff7b3	Yes	1	en_US
16dbc1ac-76a6-4581-afac-9c4b5b16b167	718dd026-21ba-44b5-92fa-17b65a2ff7b3	No	2	en_US
96e60f01-9025-4b1d-ad99-7fa4ff677e99	718dd026-21ba-44b5-92fa-17b65a2ff7b3	I don't know	3	en_US
f7bf0adb-bad9-44d2-9501-bb2fc2bddea3	718dd026-21ba-44b5-92fa-17b65a2ff7b3	Oui	1	fr_FR
254835d1-59e7-42d1-b2ef-f6ece5dade1d	718dd026-21ba-44b5-92fa-17b65a2ff7b3	Non	2	fr_FR
eb1a6444-e68c-4a94-a2dd-8d52f31b5383	718dd026-21ba-44b5-92fa-17b65a2ff7b3	Je ne sais pas	3	fr_FR
a200b0c4-b504-44ce-ac04-06b2b6d339ae	df65012d-e1b4-4d2f-aae6-c95faafb86e2	Yes	1	en_US
e0d778b9-4904-438a-b3f2-3c5a495c1aff	df65012d-e1b4-4d2f-aae6-c95faafb86e2	No	2	en_US
26f95ead-c8e7-403c-957f-c3cbe3492a46	df65012d-e1b4-4d2f-aae6-c95faafb86e2	I don't know	3	en_US
fcd295f0-f539-4c3f-8d55-04434ddf2927	df65012d-e1b4-4d2f-aae6-c95faafb86e2	Oui	1	fr_FR
0c54554f-d8dc-48cb-b216-25a07b3a4696	df65012d-e1b4-4d2f-aae6-c95faafb86e2	Non	2	fr_FR
b3b40184-26cd-4091-bc41-8440c2d71897	df65012d-e1b4-4d2f-aae6-c95faafb86e2	Je ne sais pas	3	fr_FR
37b8756c-9f65-4ba9-926b-1f801a1520d2	2aa871de-5739-4485-8561-b390dc57a40b	Yes	1	en_US
a35bbc89-49f0-40bf-bc37-f8e517cdf203	2aa871de-5739-4485-8561-b390dc57a40b	No	2	en_US
15d72e1c-f8bc-45b2-b440-83662e6937de	2aa871de-5739-4485-8561-b390dc57a40b	I don't know	3	en_US
d7f12eeb-6c57-4150-8848-5d97f5457b08	2aa871de-5739-4485-8561-b390dc57a40b	Oui	1	fr_FR
a52582f0-1219-4a40-bff1-b91598a49d20	2aa871de-5739-4485-8561-b390dc57a40b	Non	2	fr_FR
d3323082-a634-4a28-b74b-2aed89d5827b	2aa871de-5739-4485-8561-b390dc57a40b	Je ne sais pas	3	fr_FR
a4905dc1-a0f2-421b-ba77-8181b0d901b6	d956b86c-3435-4863-b25c-4108865cea7e	Yes	1	en_US
a772088d-3054-450c-9f6a-22956938afe5	d956b86c-3435-4863-b25c-4108865cea7e	No	2	en_US
a621237a-f9c3-4c4a-8389-bc254c70aa25	d956b86c-3435-4863-b25c-4108865cea7e	I don't know	3	en_US
587866ea-4da7-4e40-af70-dd3208dc56cd	d956b86c-3435-4863-b25c-4108865cea7e	Oui	1	fr_FR
35ac3c41-4959-414c-8c37-86cbbbaead8a	d956b86c-3435-4863-b25c-4108865cea7e	Non	2	fr_FR
1ffb9f54-082f-4e46-8c1f-b11466b074b2	d956b86c-3435-4863-b25c-4108865cea7e	Je ne sais pas	3	fr_FR
9ef544ad-365d-4531-97a2-3c54ae289664	8835226f-c302-43e6-a52b-29ef94aa4f6a	Yes	1	en_US
c33cf1c4-6d11-47d5-bc86-1e21ce908a31	8835226f-c302-43e6-a52b-29ef94aa4f6a	No	2	en_US
0d349714-bca8-4972-8d6e-9b5c9474bd8c	8835226f-c302-43e6-a52b-29ef94aa4f6a	I don't know	3	en_US
fc02fe25-2561-45e0-b4c2-01388ded189f	8835226f-c302-43e6-a52b-29ef94aa4f6a	Oui	1	fr_FR
62ff30e9-6e1e-47d6-9b5f-d98a3b98e18a	8835226f-c302-43e6-a52b-29ef94aa4f6a	Non	2	fr_FR
83d66622-df29-452c-8e70-8a518984751e	8835226f-c302-43e6-a52b-29ef94aa4f6a	Je ne sais pas	3	fr_FR
14173fe8-3e84-4f2b-8183-091b12befd8c	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	Yes	1	en_US
66cacf64-13d3-4f7a-a3ad-fc314c04241f	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	No	2	en_US
e1d83acc-2b5b-46f7-9d65-4a05f46b91b7	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	I don't know	3	en_US
88fe7d19-7777-4e40-b378-e645ab8f19e5	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	Oui	1	fr_FR
36e141fa-0f69-4db3-9a42-e0ecfaa34a06	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	Non	2	fr_FR
0ce2b0eb-17a0-4803-85da-79dff89e0704	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	Je ne sais pas	3	fr_FR
9455af78-9dc6-4072-a763-dee9d9e786ac	a66aff0c-57b9-4961-bc63-5e026a9a7faf	Yes	1	en_US
b4599027-64d7-4a8f-b29c-0ed8598ee722	a66aff0c-57b9-4961-bc63-5e026a9a7faf	No	2	en_US
1e7e9479-c2a5-41ad-9903-ce3b8aa549d2	a66aff0c-57b9-4961-bc63-5e026a9a7faf	I don't know	3	en_US
1a2b9832-0421-4f6e-854b-6ac99ecefc1b	a66aff0c-57b9-4961-bc63-5e026a9a7faf	Oui	1	fr_FR
0a857600-cf3b-4ebb-ba27-4e7fc1fc7d2d	a66aff0c-57b9-4961-bc63-5e026a9a7faf	Non	2	fr_FR
544a244e-611e-4bc1-b8cf-4974041389bd	a66aff0c-57b9-4961-bc63-5e026a9a7faf	Je ne sais pas	3	fr_FR
c2a08e9c-5ff4-4534-a8da-aefcd8141683	2f2232eb-36fa-4d46-ae26-83ac28a4e838	Yes	1	en_US
f344a317-2a28-4018-b377-939044c0af77	2f2232eb-36fa-4d46-ae26-83ac28a4e838	No	2	en_US
f3ed9eba-a6dd-4bd6-85c5-88540d8af6d6	2f2232eb-36fa-4d46-ae26-83ac28a4e838	I don't know	3	en_US
a73f00a9-6436-44c5-ab1c-b3195f4947db	2f2232eb-36fa-4d46-ae26-83ac28a4e838	Oui	1	fr_FR
6e892509-eb1e-40fb-8902-fc2aec7130e4	2f2232eb-36fa-4d46-ae26-83ac28a4e838	Non	2	fr_FR
1a92a79b-bce0-4ebd-8ca3-62cf49d510d7	2f2232eb-36fa-4d46-ae26-83ac28a4e838	Je ne sais pas	3	fr_FR
851723b3-e59d-4c6c-8d10-cf4fb8b4dde6	a50f8d01-6056-45ff-862a-0c752cbcd0c9	Yes	1	en_US
1a55ffcc-b80d-4fe0-8de2-e295e1c83f1d	a50f8d01-6056-45ff-862a-0c752cbcd0c9	No	2	en_US
00707010-ef81-4854-bb15-7e345e2f777f	a50f8d01-6056-45ff-862a-0c752cbcd0c9	I don't know	3	en_US
a5f4a4e4-429c-4e29-b5a7-f0bcea568edd	a50f8d01-6056-45ff-862a-0c752cbcd0c9	Oui	1	fr_FR
abb2482e-e6a4-4df4-976a-fd1ae687fa9e	a50f8d01-6056-45ff-862a-0c752cbcd0c9	Non	2	fr_FR
3e2519e1-4a2d-46c0-9d95-196368fd597e	a50f8d01-6056-45ff-862a-0c752cbcd0c9	Je ne sais pas	3	fr_FR
16ab2e1a-80a4-4d33-9c04-c0aed4c58948	bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	Yes	1	en_US
788cadab-9e31-4bca-a160-02319ac4befd	bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	No	2	en_US
033b00f6-773b-4ff5-93a0-354140cff8eb	bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	I don't know	3	en_US
bb5f0c91-6e24-4330-8258-e1f6eebfff7b	bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	Oui	1	fr_FR
5b376085-7e76-4ccc-9c17-2206921a113a	bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	Non	2	fr_FR
0fe14050-6e10-4012-b2df-207abeb23f01	bb1a3101-c7b9-40a5-bb16-3eec8f93b64d	Je ne sais pas	3	fr_FR
bf916a29-eeed-4b76-8500-0692ac0f4719	be82911a-8f3c-4352-a469-dc336542eb58	Yes	1	en_US
6196b9fe-b423-4254-8815-a7dbd19d070c	be82911a-8f3c-4352-a469-dc336542eb58	No	2	en_US
4e2574eb-9eb9-4467-8648-26c20e44958a	be82911a-8f3c-4352-a469-dc336542eb58	I don't know	3	en_US
5f2b752e-b323-4a2e-86eb-fa2de3589512	be82911a-8f3c-4352-a469-dc336542eb58	Oui	1	fr_FR
3552ad5c-466a-4ed5-a3f0-8b93af7db57b	be82911a-8f3c-4352-a469-dc336542eb58	Non	2	fr_FR
5df17a27-71cd-4754-a236-ecf81db846ec	be82911a-8f3c-4352-a469-dc336542eb58	Je ne sais pas	3	fr_FR
62c041de-4fa5-44f9-875e-0e9021fd7e99	2652fe6c-6e62-46fc-bec2-db8b91cecebc	Yes	1	en_US
a89d2245-e004-4c0a-aa9b-32759c477340	2652fe6c-6e62-46fc-bec2-db8b91cecebc	No	2	en_US
ff09dcaf-6c48-44fa-baf9-fc4618c35ed9	2652fe6c-6e62-46fc-bec2-db8b91cecebc	I don't know	3	en_US
20c44701-dc8a-4b16-93d9-a221d7c0cf65	2652fe6c-6e62-46fc-bec2-db8b91cecebc	Oui	1	fr_FR
4bc55924-4813-4504-9947-1901dd8941e6	2652fe6c-6e62-46fc-bec2-db8b91cecebc	Non	2	fr_FR
d12c3f73-8d8a-4f34-a419-dda899cbd9e6	2652fe6c-6e62-46fc-bec2-db8b91cecebc	Je ne sais pas	3	fr_FR
d85169e9-1508-4692-803f-abd5277e1f80	d79ff7cf-bf2f-4270-aff4-2070fbee5a53	Yes	1	en_US
20a87946-3071-429a-aa5f-bccec02a6d26	d79ff7cf-bf2f-4270-aff4-2070fbee5a53	No	2	en_US
5d2b6d85-fd78-46e0-ae52-492f97b0f411	d79ff7cf-bf2f-4270-aff4-2070fbee5a53	I don't know	3	en_US
7c569d19-1fcf-4438-b8dd-0154c96d1880	d79ff7cf-bf2f-4270-aff4-2070fbee5a53	Oui	1	fr_FR
1c631719-6289-4eba-9405-0ac6cbcbcbd2	d79ff7cf-bf2f-4270-aff4-2070fbee5a53	Non	2	fr_FR
322a59a5-e686-4bcd-9808-1ba8c52e507d	d79ff7cf-bf2f-4270-aff4-2070fbee5a53	Je ne sais pas	3	fr_FR
1ac3eecf-ee0a-4eb2-b2c5-03607967fb9d	8765b39e-8b40-4100-9ed3-69f270ccecff	Yes	1	en_US
3859e75e-1958-457b-8766-1082f7391655	8765b39e-8b40-4100-9ed3-69f270ccecff	No	2	en_US
a2a1274b-68f7-4c58-ae1a-50649bdc0889	8765b39e-8b40-4100-9ed3-69f270ccecff	I don't know	3	en_US
94f7453e-52da-4bb2-a3eb-9ccc85c633e5	8765b39e-8b40-4100-9ed3-69f270ccecff	Oui	1	fr_FR
6458fddf-d67c-4f3a-8752-79293f450fec	8765b39e-8b40-4100-9ed3-69f270ccecff	Non	2	fr_FR
92d8f004-67f4-4733-b9d2-a2b0c0590d36	8765b39e-8b40-4100-9ed3-69f270ccecff	Je ne sais pas	3	fr_FR
da318f59-32a6-4e89-9d0a-b7de22c1f567	6aebef76-6605-4d33-9ba0-649dd9574261	Yes	1	en_US
a91ac8be-b538-49a2-a98b-484fdbf4894b	6aebef76-6605-4d33-9ba0-649dd9574261	No	2	en_US
afce70f5-58a4-49e8-86a7-f3ded7ebbe55	6aebef76-6605-4d33-9ba0-649dd9574261	I don't know	3	en_US
9f9ba38b-b934-48b2-924b-30c81d182ee1	6aebef76-6605-4d33-9ba0-649dd9574261	Oui	1	fr_FR
e454696e-8993-4eee-8169-13432095e3b1	6aebef76-6605-4d33-9ba0-649dd9574261	Non	2	fr_FR
b3f91c6a-0b95-4169-8f37-83b5126adc87	6aebef76-6605-4d33-9ba0-649dd9574261	Je ne sais pas	3	fr_FR
a6950ed0-59f0-446e-b0c6-751a5f4d9ffa	43303113-d193-4a22-8ae2-d0474dce0a6f	Yes	1	en_US
826614ba-16b0-467e-93e2-b55acb74bfeb	43303113-d193-4a22-8ae2-d0474dce0a6f	No	2	en_US
94f5b52d-f52e-4304-a47f-52dccc9fc7be	43303113-d193-4a22-8ae2-d0474dce0a6f	I don't know	3	en_US
6510c0af-e91e-4f07-952a-f857974fe25f	43303113-d193-4a22-8ae2-d0474dce0a6f	Oui	1	fr_FR
5706c559-bec3-4610-b4f7-e0f09aec46a9	43303113-d193-4a22-8ae2-d0474dce0a6f	Non	2	fr_FR
d23ec50a-cf61-4023-863a-4c6f0edd58eb	43303113-d193-4a22-8ae2-d0474dce0a6f	Je ne sais pas	3	fr_FR
d591bd84-5c62-46db-afed-37486407bb12	e760d7bb-a053-4cae-a04c-8a47e2405b17	Yes	1	en_US
1d26f4dc-2a12-4240-89e4-4b20fbfa8ccc	e760d7bb-a053-4cae-a04c-8a47e2405b17	No	2	en_US
f8402ff7-12dd-49b8-b30e-d50e5579c1e0	e760d7bb-a053-4cae-a04c-8a47e2405b17	I don't know	3	en_US
59f7aff0-cb87-4865-b200-e519a853fe13	e760d7bb-a053-4cae-a04c-8a47e2405b17	Oui	1	fr_FR
2f73bb0a-c84d-433f-b1ce-76bde6c2fd9a	e760d7bb-a053-4cae-a04c-8a47e2405b17	Non	2	fr_FR
d4a6b5ce-4160-451b-a833-c3b49698457d	e760d7bb-a053-4cae-a04c-8a47e2405b17	Je ne sais pas	3	fr_FR
eb315a48-4031-4a9b-8ab8-e11890dd1e4f	b6b4e561-4675-4cf8-801e-94baae050a4f	Yes	1	en_US
ebd7a7a7-0b39-450f-bdc0-93a7b2d088f8	b6b4e561-4675-4cf8-801e-94baae050a4f	No	2	en_US
0f131939-204e-4491-8071-30808c0dee26	b6b4e561-4675-4cf8-801e-94baae050a4f	I don't know	3	en_US
17e29cb1-ae2d-49ba-8982-c9294403fb50	b6b4e561-4675-4cf8-801e-94baae050a4f	Oui	1	fr_FR
b124c409-4cd9-4c0e-8cc7-b45699753e36	b6b4e561-4675-4cf8-801e-94baae050a4f	Non	2	fr_FR
26f0092c-64b7-4747-91b7-690a8941e0ae	b6b4e561-4675-4cf8-801e-94baae050a4f	Je ne sais pas	3	fr_FR
6138ec00-9e91-40f5-829e-737022603d70	145d2485-801f-40ee-a795-28a93847b780	Yes	1	en_US
743c3c79-6f54-4630-8479-58652e8ac3b9	145d2485-801f-40ee-a795-28a93847b780	No	2	en_US
3e5f57c1-e887-4e35-85d4-60282df69ea6	145d2485-801f-40ee-a795-28a93847b780	I don't know	3	en_US
ae53c497-35a6-4974-9cc3-2db5e4bd0d46	145d2485-801f-40ee-a795-28a93847b780	Oui	1	fr_FR
22fa06da-b442-491f-aa86-cf7f58358e9a	145d2485-801f-40ee-a795-28a93847b780	Non	2	fr_FR
6c540897-f873-46d0-abb4-71cd76f3aee0	145d2485-801f-40ee-a795-28a93847b780	Je ne sais pas	3	fr_FR
5a68495b-13f9-4323-84b3-9c46c21678ac	07236582-4c9e-438f-a20f-4a8931d15e23	Yes	1	en_US
23bcb23d-dd4c-4cb3-9dd0-9626e79b3401	07236582-4c9e-438f-a20f-4a8931d15e23	No	2	en_US
5b66b402-b15b-484c-afbd-6d058b59840f	07236582-4c9e-438f-a20f-4a8931d15e23	I don't know	3	en_US
a4fcfb01-2a56-42e8-b13d-0242b53223aa	07236582-4c9e-438f-a20f-4a8931d15e23	Oui	1	fr_FR
55737929-bcfc-4b94-8ad0-d74216c438c3	07236582-4c9e-438f-a20f-4a8931d15e23	Non	2	fr_FR
dc8238b1-5c82-425e-83d6-5e964f19fcde	07236582-4c9e-438f-a20f-4a8931d15e23	Je ne sais pas	3	fr_FR
12b3ea46-d085-4be4-96df-63d96ef95297	bddaa94a-0114-4545-a19d-753c92fa31b2	Yes	1	en_US
2273205c-5a87-4f21-aa82-bee7d2c005de	bddaa94a-0114-4545-a19d-753c92fa31b2	No	2	en_US
f509d5c4-8937-4272-9670-70203cf39788	bddaa94a-0114-4545-a19d-753c92fa31b2	I don't know	3	en_US
ed1cd6b7-86e0-4707-864e-623123aed457	bddaa94a-0114-4545-a19d-753c92fa31b2	Oui	1	fr_FR
3c8394f4-dc87-4c2d-9214-94a978469d3c	bddaa94a-0114-4545-a19d-753c92fa31b2	Non	2	fr_FR
fc1ca135-f65c-46e1-ad4d-7653b17517c3	bddaa94a-0114-4545-a19d-753c92fa31b2	Je ne sais pas	3	fr_FR
1291de6b-571b-47f1-a45c-105aee1a1cee	df8e7cea-6a2f-4509-9604-83726c84d7e2	Yes	1	en_US
0199caee-1e5e-46cc-999b-01d263cd709e	df8e7cea-6a2f-4509-9604-83726c84d7e2	No	2	en_US
be29d2db-4376-4f39-954b-80bbd97be4bb	df8e7cea-6a2f-4509-9604-83726c84d7e2	I don't know	3	en_US
171af3eb-cc03-4a51-9278-e19713c261f4	df8e7cea-6a2f-4509-9604-83726c84d7e2	Oui	1	fr_FR
dc0be19d-b5ac-4a94-8086-bf365bbd1daa	df8e7cea-6a2f-4509-9604-83726c84d7e2	Non	2	fr_FR
4e8907b3-f1c9-4019-9cf1-11d0ef0f0cf0	df8e7cea-6a2f-4509-9604-83726c84d7e2	Je ne sais pas	3	fr_FR
07b7b4ea-82d9-4c5a-86ed-0938696478ab	c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	Yes	1	en_US
6f7dad88-d090-43c1-831e-0a967160c159	c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	No	2	en_US
aa6b5cc5-f169-4aa6-a917-d7a12b486ee5	c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	I don't know	3	en_US
8fcd99fa-5a4d-4a6f-b982-bad60fc6319d	c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	Oui	1	fr_FR
59e11f45-c765-4123-b7fa-d92fa31fdfcc	c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	Non	2	fr_FR
684c59de-ec0b-4910-8973-9af39dd0b28f	c3b1d269-6e4b-4caf-b4e8-84a9426c34e9	Je ne sais pas	3	fr_FR
ac11006f-7db0-4971-a865-8fd108f99142	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	Yes	1	en_US
24c12e08-dd74-4c27-8b9b-3242a8fb8813	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	No	2	en_US
faa77db3-ffbd-45ff-931d-06e12144dd99	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	I don't know	3	en_US
12a8bf31-c216-4bd8-a16a-90b090b9838f	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	Oui	1	fr_FR
356a5dbf-0f73-4e06-b4df-fc7be582dada	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	Non	2	fr_FR
95bde3fb-ef3b-485e-ae3d-19da9e7cd903	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	Je ne sais pas	3	fr_FR
5f7fb457-b692-4776-97cb-05d8fbbce2f5	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	Yes	1	en_US
104a73e5-035c-4a89-91f7-05730a304287	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	No	2	en_US
89002446-ba68-42ef-82b2-46f3b73c9276	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	I don't know	3	en_US
3380f872-8d50-4f4a-80a4-15313e48fb18	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	Oui	1	fr_FR
c5dcca7c-97f5-41bc-8b4e-25bc86bbe821	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	Non	2	fr_FR
2a5029ae-b3cd-41fb-ad36-824ed979c3af	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	Je ne sais pas	3	fr_FR
c1e40558-3f43-4179-bb32-e434fc93a8cd	59707023-92fe-4cd1-8336-daf3d792adc3	Yes	1	en_US
c1a51721-339c-4c54-8482-a6b41c49fedf	59707023-92fe-4cd1-8336-daf3d792adc3	No	2	en_US
6d3e7a90-c0d5-47ba-9c85-eb17a54ae8fd	59707023-92fe-4cd1-8336-daf3d792adc3	I don't know	3	en_US
016e7f82-bc91-4c5e-83f1-0717188777bf	59707023-92fe-4cd1-8336-daf3d792adc3	Oui	1	fr_FR
a6518e1d-8378-4652-9889-5a63b8de6594	59707023-92fe-4cd1-8336-daf3d792adc3	Non	2	fr_FR
95bf1fab-90b2-4357-a573-85c108271011	59707023-92fe-4cd1-8336-daf3d792adc3	Je ne sais pas	3	fr_FR
bf8d9c54-e9e1-4b20-b051-aae89ff3dba2	4ba7ca55-1686-4158-a469-b9b3c787d400	Yes	1	en_US
5698e58e-1f72-4af4-8719-0ebdf09936e2	4ba7ca55-1686-4158-a469-b9b3c787d400	No	2	en_US
ad5e1cf6-8f3e-4dcc-be8c-ecd780116e62	4ba7ca55-1686-4158-a469-b9b3c787d400	I don't know	3	en_US
3ed572c5-fa8e-4ab5-9016-24737395f940	4ba7ca55-1686-4158-a469-b9b3c787d400	Oui	1	fr_FR
7bc69bb5-5358-42c1-a5ac-772b8f9434ca	4ba7ca55-1686-4158-a469-b9b3c787d400	Non	2	fr_FR
93e3de1e-60f3-4d33-9ae6-8dbc3a139228	4ba7ca55-1686-4158-a469-b9b3c787d400	Je ne sais pas	3	fr_FR
48cf5fdf-25f3-4b8f-9979-0c033940d52f	46318cf6-b5fa-49e9-b872-4e14c9ff3805	Yes	1	en_US
68c30251-c08b-4fc6-903d-26c60ed07f0e	46318cf6-b5fa-49e9-b872-4e14c9ff3805	No	2	en_US
e91260f7-e61f-4c6c-b8f6-adad14706408	46318cf6-b5fa-49e9-b872-4e14c9ff3805	I don't know	3	en_US
492510f7-a577-400e-a780-37121f3197b0	46318cf6-b5fa-49e9-b872-4e14c9ff3805	Oui	1	fr_FR
5ae2c0ea-9768-49f5-af61-9bf92a260242	46318cf6-b5fa-49e9-b872-4e14c9ff3805	Non	2	fr_FR
c33235ed-ce3c-4e7e-909f-a157976e3bc4	46318cf6-b5fa-49e9-b872-4e14c9ff3805	Je ne sais pas	3	fr_FR
d4f17feb-aa61-4511-b132-53647fa0bcae	074c499f-c4e5-47ab-9ef9-a732e63f827b	Yes	1	en_US
332e343f-b348-4803-8272-7894e93525ca	074c499f-c4e5-47ab-9ef9-a732e63f827b	No	2	en_US
7d642137-f8c6-44ed-9b0e-df49043a4e4a	074c499f-c4e5-47ab-9ef9-a732e63f827b	I don't know	3	en_US
ffda490c-a56c-4559-a498-9562f3ad333f	074c499f-c4e5-47ab-9ef9-a732e63f827b	Oui	1	fr_FR
5730b69b-a720-4760-b575-858d404f3bc7	074c499f-c4e5-47ab-9ef9-a732e63f827b	Non	2	fr_FR
9f028a89-a161-4504-b86b-e76f23716124	074c499f-c4e5-47ab-9ef9-a732e63f827b	Je ne sais pas	3	fr_FR
85a03324-319d-445f-bb70-80dc75e82758	e504ad41-4f8a-4241-a045-6542f92d86b3	Yes	1	en_US
f2e1d259-b472-4be5-9d78-5325258433cb	e504ad41-4f8a-4241-a045-6542f92d86b3	No	2	en_US
f38811f9-32d2-4e19-bea0-c550607d6922	e504ad41-4f8a-4241-a045-6542f92d86b3	I don't know	3	en_US
d432dc4c-7819-48b4-b621-75c66e5ece2e	e504ad41-4f8a-4241-a045-6542f92d86b3	Oui	1	fr_FR
e2b35fb2-2919-43f1-916a-b1fb3b403989	e504ad41-4f8a-4241-a045-6542f92d86b3	Non	2	fr_FR
633060d9-ddde-4ee9-bfb6-ec7044ca9301	e504ad41-4f8a-4241-a045-6542f92d86b3	Je ne sais pas	3	fr_FR
c0a2b8cb-5e67-4717-be40-b93cf9360df6	161af0e2-4004-45de-a0b1-2e13243e2621	Yes	1	en_US
25db2d06-db22-44e6-8e9e-3701259c54c4	161af0e2-4004-45de-a0b1-2e13243e2621	No	2	en_US
f8c88f21-cd7a-4010-86d7-689d1d8af9fa	161af0e2-4004-45de-a0b1-2e13243e2621	I don't know	3	en_US
860675f5-e3a0-4275-b846-c5c5ddf339da	161af0e2-4004-45de-a0b1-2e13243e2621	Oui	1	fr_FR
657339ab-0d5a-4802-b7c6-93f0e9faecc7	161af0e2-4004-45de-a0b1-2e13243e2621	Non	2	fr_FR
7372a5e1-3fb0-4976-bd8b-28bb8cf44063	161af0e2-4004-45de-a0b1-2e13243e2621	Je ne sais pas	3	fr_FR
0720952b-a327-4f82-9efb-4b57bbb7ab7d	6b4ba409-7484-4679-a654-680ffa1262d2	Yes	1	en_US
ed058d2a-ab14-4c1d-907f-13a32d5f7baf	6b4ba409-7484-4679-a654-680ffa1262d2	No	2	en_US
cdffa029-9441-4cd1-a2bd-a5621469c066	6b4ba409-7484-4679-a654-680ffa1262d2	I don't know	3	en_US
538beba8-9696-4820-b648-ee6483a8b3aa	6b4ba409-7484-4679-a654-680ffa1262d2	Oui	1	fr_FR
0bf8b883-0526-451d-8de1-a09447ded6c5	6b4ba409-7484-4679-a654-680ffa1262d2	Non	2	fr_FR
fcd3783b-1c57-4c5c-a190-bea65845f58b	6b4ba409-7484-4679-a654-680ffa1262d2	Je ne sais pas	3	fr_FR
fda881bc-b66a-480e-ba68-fdb2a6a3287b	376c3f94-8227-4c9a-911c-1c20a84fc187	Yes	1	en_US
5cebc1c2-5d8d-4130-91ab-0bad6a7fe055	376c3f94-8227-4c9a-911c-1c20a84fc187	No	2	en_US
d1353055-cb0c-4201-b605-dac8b981d7c8	376c3f94-8227-4c9a-911c-1c20a84fc187	I don't know	3	en_US
9183bee9-ab12-4f00-9cef-d351dd360132	376c3f94-8227-4c9a-911c-1c20a84fc187	Oui	1	fr_FR
7b05e6eb-7d82-4b2c-8a14-991682a668f9	376c3f94-8227-4c9a-911c-1c20a84fc187	Non	2	fr_FR
2c4d44b6-7c59-4e8d-b557-6b8b31fed739	376c3f94-8227-4c9a-911c-1c20a84fc187	Je ne sais pas	3	fr_FR
c9a6da41-4e48-447e-8229-94eb511b3c73	fa0b0c21-ae00-4032-98bd-f6728058c639	Yes	1	en_US
812c8e69-3fb6-4e7f-9288-c4a5aeb03150	fa0b0c21-ae00-4032-98bd-f6728058c639	No	2	en_US
a91a60de-0f1f-4418-ba35-3a2e35fcedcc	fa0b0c21-ae00-4032-98bd-f6728058c639	I don't know	3	en_US
deb5cb29-6810-4d3b-9f8c-32b297034f5d	fa0b0c21-ae00-4032-98bd-f6728058c639	Oui	1	fr_FR
b3917784-da82-4221-91a0-b10e2f90d07e	fa0b0c21-ae00-4032-98bd-f6728058c639	Non	2	fr_FR
a90ee141-7008-4d35-97de-7a2f777e3bd1	fa0b0c21-ae00-4032-98bd-f6728058c639	Je ne sais pas	3	fr_FR
2d2c5cb4-6629-4575-9dd5-d57b2c468153	e7e5012a-15df-4747-8d79-acd95a978e60	Yes	1	en_US
9631b109-7724-45aa-9be4-8d6c62c78c44	e7e5012a-15df-4747-8d79-acd95a978e60	No	2	en_US
ac777d50-7d53-4a71-a9b6-ea876d977cdf	e7e5012a-15df-4747-8d79-acd95a978e60	I don't know	3	en_US
cc4f9ed2-f092-4c23-9904-77c237d05331	e7e5012a-15df-4747-8d79-acd95a978e60	Oui	1	fr_FR
676cac7e-a9bb-497d-9661-87c5852d3e14	e7e5012a-15df-4747-8d79-acd95a978e60	Non	2	fr_FR
bce11104-884b-4d8b-b298-f2ad83e06333	e7e5012a-15df-4747-8d79-acd95a978e60	Je ne sais pas	3	fr_FR
d2dec61a-e65a-423b-bedf-6f85273edfc6	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	Yes	1	en_US
ca3805f0-8f7d-41ac-a26b-4de7356cb15b	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	No	2	en_US
bf127cff-c6ce-4f86-ae8d-80f9f08f3c11	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	I don't know	3	en_US
cb5c460c-8211-4006-99bb-7adef717fde0	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	Oui	1	fr_FR
8627a036-5f1f-4644-a3e6-7e730b0c231b	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	Non	2	fr_FR
67c030ec-333c-490c-ab1a-3f401a975790	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	Je ne sais pas	3	fr_FR
bdcec2fb-6e29-4a61-8773-3a3b2cec810f	b4cfadcd-1314-4b2b-8eb8-064403e430b1	Yes	1	en_US
6a829a32-8323-40f5-9f98-6b52f1536d28	b4cfadcd-1314-4b2b-8eb8-064403e430b1	No	2	en_US
9cd90d18-d153-4b65-a696-47fcbe02684f	b4cfadcd-1314-4b2b-8eb8-064403e430b1	I don't know	3	en_US
f128f4dd-6911-4197-b4d3-7dd6d002db43	b4cfadcd-1314-4b2b-8eb8-064403e430b1	Oui	1	fr_FR
183b1c90-20bf-434a-ae67-6ced6d6a8cb6	b4cfadcd-1314-4b2b-8eb8-064403e430b1	Non	2	fr_FR
76703850-78b8-4a74-bf5b-ce8e7843ecf1	b4cfadcd-1314-4b2b-8eb8-064403e430b1	Je ne sais pas	3	fr_FR
423c125f-47d5-4a4e-a5a6-8f229561217e	8754c711-e0c9-4440-b8c5-14605e9c1686	Yes	1	en_US
5639b357-fb51-41bc-be32-b008adc62e58	8754c711-e0c9-4440-b8c5-14605e9c1686	No	2	en_US
1119159b-7774-482a-af29-3bf31610a9ed	8754c711-e0c9-4440-b8c5-14605e9c1686	I don't know	3	en_US
2d03ae1d-0b37-4dfd-8b05-2ea66cb80e4b	8754c711-e0c9-4440-b8c5-14605e9c1686	Oui	1	fr_FR
f33fcb66-cc3d-4972-aaca-a6fb85cf5cee	8754c711-e0c9-4440-b8c5-14605e9c1686	Non	2	fr_FR
44ab1f35-6c1b-472a-a95d-b052e9feede4	8754c711-e0c9-4440-b8c5-14605e9c1686	Je ne sais pas	3	fr_FR
51fc8f41-41a2-45e8-920b-af4101bf5356	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	Yes	1	en_US
d27338b7-9cd7-4314-8c3c-e7e2852ef65f	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	No	2	en_US
d44eaf9a-7255-4854-8160-1c1155bff68d	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	I don't know	3	en_US
f50f6d03-ba88-4aeb-9722-1381308587cc	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	Oui	1	fr_FR
7a7fb741-b7b7-4c45-9935-045b23954010	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	Non	2	fr_FR
0d5fd3f5-a84b-452e-aaef-885df093bf1f	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	Je ne sais pas	3	fr_FR
50d177a9-2338-4927-b85a-5ae1330b7d37	42635a47-17d6-4d8d-9213-8b525c42f1a1	Yes	1	en_US
5e71cf99-d06b-4a9b-8804-70d638e338db	42635a47-17d6-4d8d-9213-8b525c42f1a1	No	2	en_US
ddb58246-8965-49b2-9534-cb9b626b410b	42635a47-17d6-4d8d-9213-8b525c42f1a1	I don't know	3	en_US
55684608-b8ba-4cf7-9565-359b1669979c	42635a47-17d6-4d8d-9213-8b525c42f1a1	Oui	1	fr_FR
aa18305f-b33b-467a-bceb-37dd7d196b13	42635a47-17d6-4d8d-9213-8b525c42f1a1	Non	2	fr_FR
dd1e7aa4-12e4-486f-926e-acec08e88308	42635a47-17d6-4d8d-9213-8b525c42f1a1	Je ne sais pas	3	fr_FR
c0d4946f-642d-41da-8fe9-4f3cccd71b3b	e8862f4a-a677-4112-a197-184c365158ef	Yes	1	en_US
28afe816-ae0f-4304-9d18-69002adaa92a	e8862f4a-a677-4112-a197-184c365158ef	No	2	en_US
c404ac61-2d73-44e1-8b70-780d86d274ff	e8862f4a-a677-4112-a197-184c365158ef	I don't know	3	en_US
b2e333ac-10fb-4a4c-90bc-a7c0f8c7fcc9	e8862f4a-a677-4112-a197-184c365158ef	Oui	1	fr_FR
1ac754dc-e71d-47a1-9b1c-0243a9ec84c0	e8862f4a-a677-4112-a197-184c365158ef	Non	2	fr_FR
6e4d2d39-d795-4650-8eef-bea59b81dd11	e8862f4a-a677-4112-a197-184c365158ef	Je ne sais pas	3	fr_FR
86227ea1-97d2-4f71-909a-fbb1ce8e1703	055c41e3-8b89-49ed-830f-b953f8d8f3f7	Yes	1	en_US
5a307bfe-21af-4b3a-a980-884559a505c5	055c41e3-8b89-49ed-830f-b953f8d8f3f7	No	2	en_US
88759de0-75b8-4c11-aaa0-2d42390e9d45	055c41e3-8b89-49ed-830f-b953f8d8f3f7	I don't know	3	en_US
7eb0e739-ac94-407e-85f1-5321600d3426	055c41e3-8b89-49ed-830f-b953f8d8f3f7	Oui	1	fr_FR
729cd060-ba72-4d35-b316-d99dd0aacf2c	055c41e3-8b89-49ed-830f-b953f8d8f3f7	Non	2	fr_FR
c22f2fc9-5420-400d-a4c5-702151a3b866	055c41e3-8b89-49ed-830f-b953f8d8f3f7	Je ne sais pas	3	fr_FR
d9d02999-ff46-483d-81cc-233d92ee0386	253308cc-ade3-4258-8f08-6d62a08d86de	Yes	1	en_US
77f21e46-a860-43eb-93a8-4cfc56113a87	253308cc-ade3-4258-8f08-6d62a08d86de	No	2	en_US
ccbdc4aa-6d62-4955-899b-2b2426bb46df	253308cc-ade3-4258-8f08-6d62a08d86de	I don't know	3	en_US
601c6ec9-cc85-4267-ac7a-5d73ec30d7df	253308cc-ade3-4258-8f08-6d62a08d86de	Oui	1	fr_FR
7a6ada4a-ba6a-49e0-9d22-25f0ce7d73cb	253308cc-ade3-4258-8f08-6d62a08d86de	Non	2	fr_FR
77d410f1-8131-4c91-be35-5014f71bf870	253308cc-ade3-4258-8f08-6d62a08d86de	Je ne sais pas	3	fr_FR
858d58c2-e3b2-4e62-98ed-9b09cf981660	0d44edf6-38a2-4310-9708-dad2886df46a	Yes	1	en_US
f0e89761-f1d6-423e-abb4-36c1a56dbcce	0d44edf6-38a2-4310-9708-dad2886df46a	No	2	en_US
ec51854f-74d9-4ed1-852f-32fd94b32129	0d44edf6-38a2-4310-9708-dad2886df46a	I don't know	3	en_US
563472e6-e6b8-477a-b81e-ad7278014597	0d44edf6-38a2-4310-9708-dad2886df46a	Oui	1	fr_FR
c261ccbf-32c8-4c8a-bdca-218d0839f2b1	0d44edf6-38a2-4310-9708-dad2886df46a	Non	2	fr_FR
4db9a587-2f3a-460e-b5c2-560d18bf58d1	0d44edf6-38a2-4310-9708-dad2886df46a	Je ne sais pas	3	fr_FR
2d54acb8-cb94-4e02-96ea-c4e7d8a21c5b	07a2bc96-9d6d-472f-842c-ed00817fe9b0	Yes	1	en_US
bf629333-fd43-4c68-92ef-711efdec7c93	07a2bc96-9d6d-472f-842c-ed00817fe9b0	No	2	en_US
e7e2045e-fd1d-4f21-92cf-99e4adce8d5d	07a2bc96-9d6d-472f-842c-ed00817fe9b0	I don't know	3	en_US
3755ff94-083d-4f58-b104-ae6e2f874c85	07a2bc96-9d6d-472f-842c-ed00817fe9b0	Oui	1	fr_FR
f17fe955-b076-431a-9c89-12f4006e5034	07a2bc96-9d6d-472f-842c-ed00817fe9b0	Non	2	fr_FR
ec2817c8-d637-49b0-8090-4ec4c4e01762	07a2bc96-9d6d-472f-842c-ed00817fe9b0	Je ne sais pas	3	fr_FR
216ea9dd-82f2-4e8d-abfb-e635ffd36319	168bfbaf-e950-474e-bf4a-7a880294b564	Yes	1	en_US
0f98a7c2-cc0c-40ff-9848-542ee9e8b3ff	168bfbaf-e950-474e-bf4a-7a880294b564	No	2	en_US
51f3cff4-a13b-452c-898a-a94b003fc70e	168bfbaf-e950-474e-bf4a-7a880294b564	I don't know	3	en_US
24789e5c-a5cb-40b2-a4b4-676af16a2d58	168bfbaf-e950-474e-bf4a-7a880294b564	Oui	1	fr_FR
6f62e229-abac-461b-9737-9abaf8bea84a	168bfbaf-e950-474e-bf4a-7a880294b564	Non	2	fr_FR
2d761a4c-a338-40cc-b633-d4c437a6f988	168bfbaf-e950-474e-bf4a-7a880294b564	Je ne sais pas	3	fr_FR
89734771-3c99-4293-93e9-7c39dc5317fa	0b200580-eb6a-43d5-b59e-bf5d75bace7e	Yes	1	en_US
aa21b033-87ac-49d2-b70d-0561e61acf09	0b200580-eb6a-43d5-b59e-bf5d75bace7e	No	2	en_US
457c028b-962d-4235-a564-d44e2ffbb9e6	0b200580-eb6a-43d5-b59e-bf5d75bace7e	I don't know	3	en_US
b78d8a82-02b3-4c11-9850-7afa67c7f6ef	0b200580-eb6a-43d5-b59e-bf5d75bace7e	Oui	1	fr_FR
f29a9a7e-51d3-4044-8735-1a5d58a47408	0b200580-eb6a-43d5-b59e-bf5d75bace7e	Non	2	fr_FR
1c344ec4-cda3-4fde-9dc0-f06b8b3f07af	0b200580-eb6a-43d5-b59e-bf5d75bace7e	Je ne sais pas	3	fr_FR
b0b5eecf-65ae-418f-8b74-2e53cb846280	266c5043-630f-4e32-9f61-737989489c6f	Yes	1	en_US
51b64f1d-d923-41b3-b63a-4bf2425b440e	266c5043-630f-4e32-9f61-737989489c6f	No	2	en_US
586c1539-540c-4d3a-8f3d-1b84ca2c6ebc	266c5043-630f-4e32-9f61-737989489c6f	I don't know	3	en_US
fb7e0409-c876-441e-9fde-1176703003d3	266c5043-630f-4e32-9f61-737989489c6f	Oui	1	fr_FR
a3df9817-147b-4be3-b764-34ee663d1b3c	266c5043-630f-4e32-9f61-737989489c6f	Non	2	fr_FR
85fc8b29-69bd-4fe6-a611-cfadbc220d86	266c5043-630f-4e32-9f61-737989489c6f	Je ne sais pas	3	fr_FR
513eb4c9-c9f9-4521-a376-8dedd6962a77	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Are they really?	1	en_US
ebc7365e-29e0-4a23-954b-bf794e57f595	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Some people are afraid of differences	2	en_US
8e7b0ca9-9122-47b9-8e31-8e8dca004247	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Some people are afraid of disability	3	en_US
3f0adcf5-9a2d-4bb6-819f-ba38079f6e84	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	I do not know	4	en_US
7efdfef3-0c46-4ba2-9f3a-112b91e25785	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Other	5	en_US
d62baca9-72ae-4dfc-a37f-29a2494a4697	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Le sont-ils vraiment ?	1	fr_FR
d83e1269-2d1f-48ac-bb2c-22fc6b41c4a9	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Certaines personnes ont peur des différences	2	fr_FR
ed58c201-247a-441f-951f-b43291419aa9	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Certaines personnes ont peur du handicap	3	fr_FR
5e7b389f-7d80-45e5-888e-1fba4ac9bb84	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Je ne sais pas	4	fr_FR
0eb579a9-1b4c-44eb-9d0f-2ba3baa29923	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	Autres	5	fr_FR
7411a09c-b5dd-4134-a1d0-063c45855d8e	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Brown	1	en_US
dd7b4afb-1c1b-48ae-b737-aa8a2142c235	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Blue	2	en_US
2438d0aa-50c9-41cb-8384-5acca7e00737	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Green	3	en_US
3cfd47eb-ebf1-4d79-90ef-661665d0326e	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Black	4	en_US
f7dd43f5-8ece-4467-b47f-195fe5245bcc	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Amber	5	en_US
2dd47d2d-a76b-4088-a6d9-36c47216857c	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Grey	6	en_US
ef1badd7-f43f-4777-b896-0f429f44e339	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Other	7	en_US
f615e9df-392f-4a98-8ed4-75197f517533	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Marron	1	fr_FR
659dda70-8c4f-4fac-87e6-cc59aeb4fec6	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Bleu	2	fr_FR
04756b10-fe94-4930-acec-7c11fe2ff817	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Vert	3	fr_FR
00f8d211-dd2d-4d21-b1ae-65acf58f1abe	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Noir	4	fr_FR
efe9f02c-b166-41b0-ac4f-c69d521756e8	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Ambre	5	fr_FR
61cc9068-fb60-4b27-a9e1-1937a737c25e	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Gris	6	fr_FR
4205b5fd-69a4-42bf-b587-cf3580f4ff54	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	Autre	7	fr_FR
5ac6e4c5-545a-41d0-9e10-237512146fec	6436d0e4-9902-4d3a-86aa-9414196e2c99	No never	1	en_US
2674fa1e-061e-4749-9e00-53d48779d8df	6436d0e4-9902-4d3a-86aa-9414196e2c99	Only when it's important	2	en_US
9c7cb502-5010-41bb-98d2-a4c773a833a9	6436d0e4-9902-4d3a-86aa-9414196e2c99	1 time per month	3	en_US
0d5ad4fe-254b-4e64-a567-64f775ec2443	6436d0e4-9902-4d3a-86aa-9414196e2c99	Once a year	4	en_US
86eb7ebf-8ee6-4e71-807d-a7a629dff153	6436d0e4-9902-4d3a-86aa-9414196e2c99	Non jamais	1	fr_FR
413ffbb4-b9e7-4754-bf54-77eab4031021	6436d0e4-9902-4d3a-86aa-9414196e2c99	Uniquement quand c'est important	2	fr_FR
40766e9d-ab77-4989-b317-56b199cb01fe	6436d0e4-9902-4d3a-86aa-9414196e2c99	1 fois par mois	3	fr_FR
30bc4c51-390b-4947-a794-182f8294ac27	6436d0e4-9902-4d3a-86aa-9414196e2c99	1 fois par an	4	fr_FR
f981f312-edd3-4299-9dcc-048cc3d63cfd	6e50e2e4-9287-4ea8-82d5-837695929570	No	1	en_US
e08a6e2c-7a0a-4209-a545-dc9fc430df74	6e50e2e4-9287-4ea8-82d5-837695929570	Yes, legally framed	2	en_US
aa60b1f3-e4dc-48a2-929f-7f975779dccc	6e50e2e4-9287-4ea8-82d5-837695929570	Yes without condition	3	en_US
fdd84526-923a-49e5-9721-ac33faeba759	6e50e2e4-9287-4ea8-82d5-837695929570	Non	1	fr_FR
1c718d1a-0334-49fe-b95f-e38369b53fbf	6e50e2e4-9287-4ea8-82d5-837695929570	Oui, légalement encadré	2	fr_FR
79493b5e-912f-422e-8089-6edaf76b45bb	6e50e2e4-9287-4ea8-82d5-837695929570	Oui sans condition	3	fr_FR
63b8f259-4acc-4a2b-8c65-24f762dec728	2f9bbed5-ef7c-4954-a637-fc91112f9c10	Bring together	1	en_US
5aeb16bc-cb06-4191-9b5b-1c321ecf4823	2f9bbed5-ef7c-4954-a637-fc91112f9c10	Remove	2	en_US
9acd45d6-f4d8-4fa2-a2c7-8a8e2f59daa3	2f9bbed5-ef7c-4954-a637-fc91112f9c10	Not in a relationship	3	en_US
6638eb59-3b38-49ca-b378-362b030518aa	2f9bbed5-ef7c-4954-a637-fc91112f9c10	Rapprocher	1	fr_FR
19bfdd19-c54a-4b2b-8cfd-bfba34a2a3e8	2f9bbed5-ef7c-4954-a637-fc91112f9c10	Eloigner	2	fr_FR
97741d13-5862-4770-8a38-2985260fdc94	2f9bbed5-ef7c-4954-a637-fc91112f9c10	Pas en couple	3	fr_FR
d8bb7804-01e9-42f5-b4a8-0b40c5c3f3ff	76438079-4579-4f01-a037-874d8cb1d599	What interest ?	1	en_US
18aa91a8-c4de-4ff9-ba56-0c397359ef2c	76438079-4579-4f01-a037-874d8cb1d599	No but I could	2	en_US
6fe051d0-a289-499d-868d-a4127a2c8812	76438079-4579-4f01-a037-874d8cb1d599	Only once	3	en_US
dafa92a3-ccce-43f0-b0fb-5c29b16271f4	76438079-4579-4f01-a037-874d8cb1d599	Several times	4	en_US
2735a172-e7ea-48e9-b828-36486adb91b1	76438079-4579-4f01-a037-874d8cb1d599	Quel intérêt ?	1	fr_FR
18749d06-130d-4a47-8ed9-e97a9bc0a9a3	76438079-4579-4f01-a037-874d8cb1d599	Non mais je pourrais	2	fr_FR
2b3d9742-76a4-45b2-ae99-e3fcedc77427	76438079-4579-4f01-a037-874d8cb1d599	Une seule fois	3	fr_FR
e07eede9-f9dc-4ec1-a8f5-35d369656b01	76438079-4579-4f01-a037-874d8cb1d599	Plusieurs fois	4	fr_FR
b70c4edf-7a2b-4301-9ed4-40e1a0654917	2659d012-2599-4579-bd99-749106796ee0	Make him immortal	1	en_US
896dc7d7-4a95-466f-994c-7c140e8bc70d	2659d012-2599-4579-bd99-749106796ee0	Give him the power to fly	2	en_US
41ff66fe-f456-4f7f-b720-2f18609e8836	2659d012-2599-4579-bd99-749106796ee0	Allow him to use 100% of his brain	3	en_US
5052522f-6fd9-48a0-b2f5-1fb3473d38ef	2659d012-2599-4579-bd99-749106796ee0	Allow only positive feelings	4	en_US
fd61ce9b-6f91-4edc-9b03-7a1a1e86e26c	2659d012-2599-4579-bd99-749106796ee0	Prevent any disease	5	en_US
459d2c31-7579-487c-a7e8-b577bec6a4de	2659d012-2599-4579-bd99-749106796ee0	Allow him to see the future	6	en_US
b1daf11f-3472-41b3-b98a-cc5275a451a2	2659d012-2599-4579-bd99-749106796ee0	Give him the gift of telepathy	7	en_US
adf400db-2031-4801-b2b2-2a4d894e262f	2659d012-2599-4579-bd99-749106796ee0	Other	8	en_US
309de7a5-489d-4249-bfbc-3651c8806fea	2659d012-2599-4579-bd99-749106796ee0	Le rendre immortel	1	fr_FR
53a604dd-7007-44cc-8e2c-01a5404ff775	2659d012-2599-4579-bd99-749106796ee0	Lui donner le pouvoir de voler	2	fr_FR
00989d8d-9513-418f-ba69-01770aeb543f	2659d012-2599-4579-bd99-749106796ee0	Lui permettre d'utiliser 100% de son cerveau	3	fr_FR
b2395d27-14b2-48b2-997a-104c2ce7b608	2659d012-2599-4579-bd99-749106796ee0	Autoriser uniquement les sentiments positifs	4	fr_FR
9013347c-00eb-449e-ac57-14923d71b5e9	2659d012-2599-4579-bd99-749106796ee0	Empêcher toute maladie	5	fr_FR
8a49eb56-5cda-44e6-93d3-69d1cc3fd30b	2659d012-2599-4579-bd99-749106796ee0	Lui permettre de voir le futur	6	fr_FR
3fee37c4-f505-45aa-85f6-845b51e7c800	2659d012-2599-4579-bd99-749106796ee0	Lui donner le don de télépathie	7	fr_FR
488964de-444d-4063-997b-3340fcbae62a	2659d012-2599-4579-bd99-749106796ee0	Autres	8	fr_FR
240b77ba-7562-49dc-8f14-58af5ba2da57	0ba30bd5-f31b-491b-85df-5f32444ff9d6	Yes	1	en_US
3471e260-9b09-42ff-8f82-c01f30ee96c9	0ba30bd5-f31b-491b-85df-5f32444ff9d6	No	2	en_US
f3229a40-41e8-4ad8-a88f-87b96a1d6bc9	0ba30bd5-f31b-491b-85df-5f32444ff9d6	Only gifts for children	3	en_US
acc1097d-3b6f-4056-8d96-0ef35967f0fe	0ba30bd5-f31b-491b-85df-5f32444ff9d6	Oui	1	fr_FR
8143bb00-22b7-467a-897a-dc99b90fa65b	0ba30bd5-f31b-491b-85df-5f32444ff9d6	Non	2	fr_FR
bfd380e4-2ccb-4a8c-b24e-03608ebb1a90	0ba30bd5-f31b-491b-85df-5f32444ff9d6	Seulement des cadeaux pour les enfants	3	fr_FR
7f57c27e-d845-453d-af7b-a1f846413731	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	On the contrary I find it beautiful	1	en_US
fdcea132-847e-46f9-8fe3-9cd1de198d91	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	Not at all	2	en_US
ff8e268a-0173-4a81-adf0-922927e4234e	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	It bothers me but they have the right	3	en_US
ed601e79-3e10-459f-b8a9-d816d81d6507	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	It disgusts me but they have the right	4	en_US
3c2ba04e-ffe6-46d5-af49-00936bef14d2	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	It should be forbidden	5	en_US
5b788043-067e-4fb6-bdd2-42fd0cb07a27	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	Au contraire je trouve ça beau	1	fr_FR
b46a7a75-d84c-4676-8478-9177c92dbe36	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	Pas du tout	2	fr_FR
a5d2b41d-0017-4a2f-bae1-0166428cf09b	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	Ca me gêne mais ils ont le droit	3	fr_FR
1d5a41d9-22f5-47ad-a308-4cdbf12a9dbe	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	Ca me dégoute mais ils ont le droit	4	fr_FR
0758430d-dce1-499e-bb2b-93f16f037364	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	Ca devrait être interdit	5	fr_FR
e98901f9-a8cd-4907-87fe-6c848954fdab	c413da51-fd2a-44dd-bee4-fbc214bc58c8	No	1	en_US
69d38b7c-a970-4c1a-95a7-d11e1a00153a	c413da51-fd2a-44dd-bee4-fbc214bc58c8	Yes but less than the mind	2	en_US
26474c9f-2a01-490c-a563-a89f0c1c6025	c413da51-fd2a-44dd-bee4-fbc214bc58c8	It's all about balance	3	en_US
44a467b3-8291-4b5d-b456-3948fd7d9671	c413da51-fd2a-44dd-bee4-fbc214bc58c8	It is the most important	4	en_US
a567c03e-ef78-43c3-9b99-3d7fbbf82b63	c413da51-fd2a-44dd-bee4-fbc214bc58c8	Non	1	fr_FR
13c611bc-9e04-4129-b8a7-cb2b4071c4d5	c413da51-fd2a-44dd-bee4-fbc214bc58c8	Oui mais moins que l'esprit	2	fr_FR
5d400c0e-2daf-4586-a4f3-8f12ae2a8c43	c413da51-fd2a-44dd-bee4-fbc214bc58c8	Tout est question d'équilibre	3	fr_FR
2daecd08-4f84-4e2c-8e88-1dbaca28018e	c413da51-fd2a-44dd-bee4-fbc214bc58c8	C'est le plus important	4	fr_FR
3f36aecf-d221-4a0f-b104-38dc96c3c24f	49a69626-ca50-4650-8e9a-476fa8ab5c2d	His face	1	en_US
f49a4487-4acf-499c-807a-d477f28a5b09	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Their eyes	2	en_US
1d937bed-e63b-426d-bf67-df3da30e13bc	49a69626-ca50-4650-8e9a-476fa8ab5c2d	His smile	3	en_US
7ba8ac12-8bb3-4924-b38f-91e8e515c951	49a69626-ca50-4650-8e9a-476fa8ab5c2d	His chest and chest	4	en_US
4fa7f5be-039d-420d-94ff-556ec1fe457b	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Her buttocks	5	en_US
322c2eb5-3463-4bf3-b80f-8b9b30726f93	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Her hair	6	en_US
9e4a7881-a772-41aa-8af4-edec1d5e25ba	49a69626-ca50-4650-8e9a-476fa8ab5c2d	His manners	7	en_US
8f4f5577-8b9f-4176-839b-eeb26d29a164	49a69626-ca50-4650-8e9a-476fa8ab5c2d	His body language	8	en_US
6809ac3a-e57c-4196-8582-fa8a29cb5f4f	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Other	9	en_US
aae6b4a1-4dfb-4e93-89e4-2cbfed584495	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Son visage	1	fr_FR
4e4928e0-047d-4fae-aeb8-88d5b406c81e	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Ses yeux	2	fr_FR
13050831-0b2d-4e29-888e-96994e0d045e	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Son sourire	3	fr_FR
d960f3c7-c980-4c84-886b-bb45d0bd6730	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Son torse et sa poitrine	4	fr_FR
c46f6afc-4b01-4339-8c39-1fa3621cce36	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Ses fesses	5	fr_FR
6dfa91c0-f727-4510-ba30-7caf92965764	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Sa chevelure	6	fr_FR
043d014c-08d8-4e69-87e8-11e732bb1441	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Ses manières	7	fr_FR
d9bab972-5843-4b32-adaa-35f9fee726c1	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Son langage corporel	8	fr_FR
705d43d5-686d-48d5-bf54-8bb844a3a82e	49a69626-ca50-4650-8e9a-476fa8ab5c2d	Autres	9	fr_FR
f0e8c273-8f73-44e1-b84a-e673a652c3e2	2db015ae-b56e-4fe5-8613-480c49d15921	Spiderman	1	en_US
d254b7fd-46eb-4aee-9176-fc95e2f83922	2db015ae-b56e-4fe5-8613-480c49d15921	Batman	2	en_US
2e4fdb2b-235c-4b89-98ab-51b9e750aef9	2db015ae-b56e-4fe5-8613-480c49d15921	Superman	3	en_US
fcff85d5-883f-4f92-bc89-5d006efcd195	2db015ae-b56e-4fe5-8613-480c49d15921	Wonderwoman	4	en_US
38e69f74-6917-44e5-936b-422c78c75eb3	2db015ae-b56e-4fe5-8613-480c49d15921	Thor	5	en_US
1e43e56a-2285-40e4-a74e-44a1491de37e	2db015ae-b56e-4fe5-8613-480c49d15921	Captain america	6	en_US
af508ccc-b64b-4364-b73c-50f2b0ede74f	2db015ae-b56e-4fe5-8613-480c49d15921	Teenage Mutant Ninja Turtles	7	en_US
43572f40-99c1-43c3-ba4a-458b10711122	2db015ae-b56e-4fe5-8613-480c49d15921	Wolverine	8	en_US
94f2e450-68bd-4c14-bf75-9bfbb89a48a6	2db015ae-b56e-4fe5-8613-480c49d15921	Dead Pool	9	en_US
ad63a57d-577c-4d9c-b3e4-65876b79772d	2db015ae-b56e-4fe5-8613-480c49d15921	We are all superheroes	10	en_US
7f963651-4794-4919-b0e4-cc7cf9407d1e	2db015ae-b56e-4fe5-8613-480c49d15921	Spiderman	1	fr_FR
e0c59cae-f34a-4fd5-9dbe-6adefc9816da	2db015ae-b56e-4fe5-8613-480c49d15921	Batman	2	fr_FR
2509fb53-05a2-4312-b7d4-b7c3c00cee52	2db015ae-b56e-4fe5-8613-480c49d15921	Superman	3	fr_FR
90da665d-c467-452a-b4d0-f8399e746d58	2db015ae-b56e-4fe5-8613-480c49d15921	Wonderwoman	4	fr_FR
f6773374-6864-48c5-8622-76185603c77f	2db015ae-b56e-4fe5-8613-480c49d15921	Thor	5	fr_FR
0c88dd72-43b2-4529-83c8-2400e48ed1da	2db015ae-b56e-4fe5-8613-480c49d15921	Captain America	6	fr_FR
c8f0c628-3972-4250-bef5-1025bb751b8b	2db015ae-b56e-4fe5-8613-480c49d15921	Les Tortues Ninja	7	fr_FR
c3756ac8-ca4e-4233-aca5-5053fa7fda2a	2db015ae-b56e-4fe5-8613-480c49d15921	Wolverine	8	fr_FR
f23e0c1d-7249-49e6-aebe-54a73cb78044	2db015ae-b56e-4fe5-8613-480c49d15921	DeadPool	9	fr_FR
83c7db7a-b04b-4bb3-ae1d-d60c1e49b858	2db015ae-b56e-4fe5-8613-480c49d15921	Nous sommes tous des superhéros	10	fr_FR
7efc1e5d-9668-4e51-a35f-cc114d626b83	21b4dd7c-2739-4d48-a5b3-89511386cef7	Stimulates	1	en_US
697d10ca-1209-40db-b364-5dc267d39337	21b4dd7c-2739-4d48-a5b3-89511386cef7	Brake	2	en_US
512ae611-1af9-40c6-ad17-36fbedb77a95	21b4dd7c-2739-4d48-a5b3-89511386cef7	Stimule	1	fr_FR
9779f920-4c48-47bd-96b5-c074037f7995	21b4dd7c-2739-4d48-a5b3-89511386cef7	Freine	2	fr_FR
5be852e2-1d4a-4bab-8bd3-36090fa856fd	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Not brushing your teeth as much as it takes	1	en_US
d9832d32-63f7-441d-b8a6-d1c30a20b6c6	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Biting the skin around your nails	2	en_US
a9eb76b7-7bdb-4707-a953-2b1bc4cdb92f	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Pick your nose and eat what you find there	3	en_US
73c50b1c-1d7c-44fa-ae85-0eab1fbb11de	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Pierce your pimples and blackheads	4	en_US
e9cf1b09-40d0-452e-82a6-9f20b6bb8aaf	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Sharing food with your pet	5	en_US
cb8b7eff-68c2-4052-a90e-9e30a4449d40	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Wear your jeans until they are visibly dirty	6	en_US
96094af5-aeae-48d1-ada7-c3b4f83d82b7	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Take a shower once every 3 days or less	7	en_US
cb132d9c-0023-4a7c-acf8-0d8ecd82383e	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Eat food after it has fallen to the ground	8	en_US
c1343fbb-bf00-49c2-bd3e-9f72cd1dc3e4	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Fold the corner of pages in a book	9	en_US
bb552f89-7b32-44dd-bc1b-74675b708d18	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Other	10	en_US
3c8ce829-c4b6-442d-9a3d-6678d7795456	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Ne pas se brosser les dents autant qu'il faudrait	1	fr_FR
edbf6c6a-a566-485b-adb5-578c1cb04533	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Mordiller la peau autour de vos ongles	2	fr_FR
d3c9baa0-2dec-4f68-9779-7eab03f96480	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Se curer le nez et manger ce que vous y trouvez	3	fr_FR
fd176233-d704-4a07-99fb-2fdc38c885f7	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Percer vos boutons et points noirs	4	fr_FR
3d165e94-2c01-4b59-b62e-05fe67e5ffde	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Partager de la nourriture avec votre animal de compagnie	5	fr_FR
4899275e-fc9a-4749-b08e-4012ef2d7ffd	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Porter vos jeans jusqu'à ce qu'ils soient visiblement sales	6	fr_FR
8de6bea4-2577-4b4a-a79e-41273cbcd131	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Prendre une douche une fois tous les 3 jours ou moins	7	fr_FR
9c5695a9-0ab0-4108-9138-31c09505e84a	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Manger de la nourriture après qu'elle soit tombée sur le sol	8	fr_FR
bb6eb78b-a90c-4530-a56b-3b8635289390	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Plier le coin de pages dans un livre	9	fr_FR
bc96093e-7add-4324-bcbc-ed7e839fe570	daf87f3f-f68a-40b7-a90c-d097a594f8b6	Autres	10	fr_FR
f27814b1-f511-4b58-b95e-8499011b0a54	bad17f81-1a2d-4dd8-bbc3-76d059e44acb	Attractive	1	en_US
89f5b998-f38d-4dfc-9b38-6133c26b77e0	bad17f81-1a2d-4dd8-bbc3-76d059e44acb	Repulsive	2	en_US
223be924-5ab9-4a97-9dc8-2fc149482827	bad17f81-1a2d-4dd8-bbc3-76d059e44acb	Attirant	1	fr_FR
c14fbdbf-451a-4e1c-887f-9d7c37ed2607	bad17f81-1a2d-4dd8-bbc3-76d059e44acb	Repoussant	2	fr_FR
3b81c0a7-108c-45d2-a8fe-88b0bfa757f7	5969f2b8-73e9-434e-b79e-031f61f598cf	Open mind	1	en_US
37123f9c-d11e-4d8a-a055-0d7671da774b	5969f2b8-73e9-434e-b79e-031f61f598cf	Kindness	2	en_US
8975cad9-d54c-4e7d-b10f-3c134684a473	5969f2b8-73e9-434e-b79e-031f61f598cf	Inspiration	3	en_US
b5953197-0a95-4f9d-93bf-b4e886aac986	5969f2b8-73e9-434e-b79e-031f61f598cf	Elegance	4	en_US
f492279e-88f5-462e-a894-afea23931861	5969f2b8-73e9-434e-b79e-031f61f598cf	Beauty	5	en_US
920d69e3-0830-4089-a056-e3fc2c8a6f13	5969f2b8-73e9-434e-b79e-031f61f598cf	Adventurous	6	en_US
c785acfb-6e76-4177-8581-b3a593e7c0e5	5969f2b8-73e9-434e-b79e-031f61f598cf	Funny	7	en_US
1cbaba4b-dd97-4bc9-9a5d-6bc51ca5aada	5969f2b8-73e9-434e-b79e-031f61f598cf	Loyal	8	en_US
f219a57b-2565-4d9c-baf1-97e844b272c5	5969f2b8-73e9-434e-b79e-031f61f598cf	Good Religious	9	en_US
218a9209-04c7-4540-9eb6-b4c9d0b17925	5969f2b8-73e9-434e-b79e-031f61f598cf	Other	10	en_US
46b42ca2-66af-4ad1-9752-fb5526ad4933	5969f2b8-73e9-434e-b79e-031f61f598cf	Ouverture d'esprit	1	fr_FR
224e916d-5d16-4aee-97e2-6fc9afb859bd	5969f2b8-73e9-434e-b79e-031f61f598cf	Gentillesse	2	fr_FR
2dd72c58-729b-4e25-bc68-3a6d50ac6f44	5969f2b8-73e9-434e-b79e-031f61f598cf	Inspiration	3	fr_FR
ab4cf7a2-0786-4527-893d-599470c3ef5c	5969f2b8-73e9-434e-b79e-031f61f598cf	Élégance	4	fr_FR
3ffd0942-2b69-4539-9812-b53b738fa910	5969f2b8-73e9-434e-b79e-031f61f598cf	Beauté	5	fr_FR
3e2c65f8-3e28-4fbf-bf0d-2d1fcd61cb8b	5969f2b8-73e9-434e-b79e-031f61f598cf	Aventureux	6	fr_FR
c750b959-e18b-486b-945b-285018795652	5969f2b8-73e9-434e-b79e-031f61f598cf	Drôle	7	fr_FR
0490b28d-c91c-44f0-bf8d-0b7bb9c77f29	5969f2b8-73e9-434e-b79e-031f61f598cf	Fidèle	8	fr_FR
1e468923-f341-4d85-bd10-7843ab7e5473	5969f2b8-73e9-434e-b79e-031f61f598cf	Bon Religieux	9	fr_FR
aca51044-d43f-44ec-84e3-cbbd68f34069	5969f2b8-73e9-434e-b79e-031f61f598cf	Autres	10	fr_FR
b9c8ebc9-6b6e-40a3-aab8-87ffc596528a	6b737cf0-ec65-42d7-9bd5-2159c5889e05	No	1	en_US
be27977c-4bca-43f7-8352-fca39d0512ce	6b737cf0-ec65-42d7-9bd5-2159c5889e05	For the pleasure of playing	2	en_US
de31d98f-e73f-4ed8-8091-103729e55d5a	6b737cf0-ec65-42d7-9bd5-2159c5889e05	In the hope of winning	3	en_US
47f4d8e4-4b2a-4de0-b870-923945606700	6b737cf0-ec65-42d7-9bd5-2159c5889e05	Non	1	fr_FR
f668118b-01b5-4faa-8b70-81db0d4d6c44	6b737cf0-ec65-42d7-9bd5-2159c5889e05	Pour le plaisir de jouer	2	fr_FR
d4d4cad2-328e-47bd-b893-3b9b2ef01d2c	6b737cf0-ec65-42d7-9bd5-2159c5889e05	Dans l'espoir de gagner	3	fr_FR
4a08f310-d6a1-4bdb-bb40-14d6b2d1a5ab	0c5964b4-2659-4db9-acc0-972c472c725e	No never	1	en_US
c55e5331-eb52-4de3-8802-b0b9c7631a12	0c5964b4-2659-4db9-acc0-972c472c725e	Only when it's important	2	en_US
fdb0fd9a-b3d6-4038-bdaf-8d659e0437b8	0c5964b4-2659-4db9-acc0-972c472c725e	1 time per month	3	en_US
2690f772-e0cd-4bfe-93e6-b7d6aec246d2	0c5964b4-2659-4db9-acc0-972c472c725e	Once a year	4	en_US
cd0e56e8-82ec-426a-968a-3a22becb8476	0c5964b4-2659-4db9-acc0-972c472c725e	Non jamais	1	fr_FR
97f48c36-4922-42fa-8716-619e1387ce4a	0c5964b4-2659-4db9-acc0-972c472c725e	Uniquement quand c'est important	2	fr_FR
e76543cd-4a0f-4037-8ae3-3416dc3d8367	0c5964b4-2659-4db9-acc0-972c472c725e	1 fois par mois	3	fr_FR
aedb60d9-fcfd-4358-b2a1-36510d7819e9	0c5964b4-2659-4db9-acc0-972c472c725e	1 fois par an	4	fr_FR
417b2877-5c12-4911-bcbf-62950b268c86	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Judaism	1	en_US
509e14ab-7fe1-4713-b21f-4965fb108630	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Christianity	2	en_US
9fbefc6a-7b76-4df1-81c1-41ae69a19510	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Islam	3	en_US
86252ef0-1e38-4a7f-ae9a-90138e33eba8	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Confucianism	4	en_US
7f007a61-c9c7-4d26-bb35-b574be79f002	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Buddhism / Hinduism	5	en_US
42f67fdc-55d1-4a03-b0a2-a9c392b9a9a8	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Zoroastrianism	6	en_US
deee2b0f-b252-400c-be2c-2dcf63772ca3	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Taoism	7	en_US
3ddd844b-931c-4d94-9be8-46cfadda0c76	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Shamanism / Paganism	8	en_US
98a91882-f68d-45f9-a75c-0e612c7d96a2	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Other	9	en_US
2264ff74-6e28-4f34-afd1-14f3b1657cae	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Atheist	10	en_US
474fcede-ee93-4610-80ed-e35dce45d197	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Judaïsme	1	fr_FR
56788653-5c06-4c87-bc61-09d54aaa314e	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Christianisme	2	fr_FR
7295aaef-ae6c-44b9-97c6-f07c00db30ee	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Islam	3	fr_FR
46e79348-d3a3-4024-9daf-497e587de7c5	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Confucianisme	4	fr_FR
3d8fa20a-8a59-41da-93ca-31327849b22b	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Bouddhisme / Hindouisme	5	fr_FR
581e56b2-336c-4007-be39-5604e349b3e7	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Zoroastrisme	6	fr_FR
80c654c5-2758-4e22-a76b-44c4ea55d71d	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Taoïsme	7	fr_FR
00fd073a-65c0-40af-8064-a595d1bd07e1	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Chamanisme / Paganisme	8	fr_FR
411f8ec1-f837-455c-b2d9-33028e90f830	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Autres	9	fr_FR
59753a56-b560-4115-b94a-d8421858c841	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	Athé	10	fr_FR
d26eb82b-dfe6-4df2-a39e-0a0d629d13c6	ee244f83-9853-49d8-b641-74724c0e1496	No	1	en_US
aa2fc261-8966-49c5-95f9-0d2e229cbd83	ee244f83-9853-49d8-b641-74724c0e1496	Only one	2	en_US
8468bc63-b946-47b9-bb52-e0c5f6240d0c	ee244f83-9853-49d8-b641-74724c0e1496	Many	3	en_US
0fe30cd6-8d3e-4dd7-a779-98535466fc11	ee244f83-9853-49d8-b641-74724c0e1496	Non	1	fr_FR
e2898270-9f16-457f-8a1a-7f90d87b5da8	ee244f83-9853-49d8-b641-74724c0e1496	Une seule	2	fr_FR
3750adb0-e37b-48e2-9470-da9f5814ae2e	ee244f83-9853-49d8-b641-74724c0e1496	Plusieurs	3	fr_FR
93804bea-fb6d-4fae-b28d-f14e828f9c40	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Yes	1	en_US
e7dfcf2a-87ea-4b6d-9abc-b7a0547f2022	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	No	2	en_US
a5d5e107-297d-4b6b-8c78-5d2965f96980	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	It might help	3	en_US
10ccdb39-116a-48ad-8863-f76bdaa85066	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Yes, but that is impossible	4	en_US
a7cf7c42-e8d6-4c2a-9825-f3cad1e8bb4c	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	We should only get rid of the crazy religious men	5	en_US
a91eff28-fa67-4afe-a5ca-25cc06ffa82f	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Oui	1	fr_FR
0d00321e-6343-45a5-a33e-81ee123d89fc	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Non	2	fr_FR
bbc52f84-1f8b-4165-8515-2fa38c536100	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Cela pourrait aider	3	fr_FR
4873a57f-4067-434b-a1be-049aff1b3309	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Oui, mais cela est impossible	4	fr_FR
aaf29415-b158-4a6a-a347-55b29b0fd042	8e7afa05-c492-4426-b7d8-ee3b92d0cec6	Nous devrions seulement nous débarrasser des hommes religieux fous	5	fr_FR
100abf33-4352-4d51-9b3a-3e877aeae9eb	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	It's not funny	1	en_US
c8a6cefb-4a45-4fa6-b346-0c3c59729cb9	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Because they feel	2	en_US
bd0d7f57-5ee6-44ed-8271-77e974bc0d36	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Because they make noise	3	en_US
f7b7f23e-b0df-4043-9ea6-e921ca8ac7fd	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Because they go against social rules	4	en_US
4e6dae7d-801f-4035-ade9-6dd29d7d1220	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Because they make us feel young again	5	en_US
9144afd8-a780-4426-b41f-285c96fdedc8	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Other	6	en_US
2d257527-d7b5-4901-b1ae-03a50fa03da6	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Ce n'est pas drôle	1	fr_FR
19bf3846-301c-4728-af7d-d6fccce1960a	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Parce qu'ils sentent	2	fr_FR
82d93c0b-6217-495b-a4aa-f3a14e161bb4	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Parce qu'ils font du bruit	3	fr_FR
11bb56a6-c590-48a5-9d8f-21a9faae6b70	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Parce qu'ils vont à l'encontre des règles sociales	4	fr_FR
1c666634-7da6-4b86-842e-dba0729944e1	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Parce qu'ils nous font sentir jeunes à nouveau	5	fr_FR
f0161ca1-a9c5-40d6-b24f-dd36df5eaad8	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	Autres	6	fr_FR
1905cd6d-7fd4-4cf7-af33-b9f17997e21f	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Democracy	1	en_US
71233452-12cc-40d8-b686-68e83b42a7bc	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Authoritarianism	2	en_US
786e8c16-f63a-4868-a324-4775e654fc6a	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Totalitarianism	3	en_US
893cef73-5303-4c04-91b5-8d7c3f725418	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Monarchy	4	en_US
c7b40bd4-e7a7-4991-ae22-0518b4f7aa56	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Feudalism	5	en_US
b00bf940-2dea-40e6-9216-4e9fe01f808f	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Anarchism	6	en_US
d408935d-1f0c-4742-94a1-d221867ba516	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Oligarchy	7	en_US
22c16ca1-893b-4600-bb4a-9fcdd889c5f7	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Theocracy	8	en_US
8a539fb0-dbd8-4e3d-9e00-839410394b3e	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Timocracy	9	en_US
1e725f36-f278-45e6-9500-cbe6757db159	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Other	10	en_US
3b3a9da7-d642-4498-beb5-df8e8cc0a4ed	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Démocratie	1	fr_FR
7b53f709-c5b7-4ef3-abd3-ba6d9e9b10e9	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Autoritarisme	2	fr_FR
84bdbca3-6230-4e83-aea8-c9fa48a5f4a3	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Totalitarisme	3	fr_FR
7703a483-ca87-4988-9c44-11410e98beb0	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Monarchie	4	fr_FR
4ded6a58-2e82-4d6e-9206-7e61d8f0d9c5	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Féodalisme	5	fr_FR
0ab6abb3-81ed-46c8-8ede-1955c0908734	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Anarchisme	6	fr_FR
5af2cfa1-056a-4512-bc0b-5ea5fffbe4eb	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Oligarchie	7	fr_FR
c71150a3-a9a2-438a-94f4-1e34b6682d90	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Théocratie	8	fr_FR
ff54ff50-1dfe-46cd-9a5c-1220166860a7	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Timocratie	9	fr_FR
a85ae212-c05e-4d2e-88d5-81189e73b925	8e4a75c2-12b1-46e9-a5dc-e7424b0db2c4	Autres	10	fr_FR
117f9c46-d983-49dd-a0c7-88c62f6a5b9b	23155572-b0cd-428e-8fd6-393d2bccdfa5	He stays on Earth	1	en_US
e7576173-c449-4491-ae11-bc52129f4e93	23155572-b0cd-428e-8fd6-393d2bccdfa5	He goes to heaven or hell	2	en_US
f88e52de-00e7-4592-b791-07c14368a86e	23155572-b0cd-428e-8fd6-393d2bccdfa5	He reincarnates in another entity	3	en_US
d21c583f-1d05-4d4d-be6e-edff352c060d	23155572-b0cd-428e-8fd6-393d2bccdfa5	He disappears	4	en_US
1d220231-4b2c-4147-b29c-45f724c7f88f	23155572-b0cd-428e-8fd6-393d2bccdfa5	The mind is a concept invented by man	5	en_US
ea118099-dd7b-4217-a2a4-79613c9baac2	23155572-b0cd-428e-8fd6-393d2bccdfa5	Other	6	en_US
97a1418a-6a49-478a-9f38-ce7d3d8fcb73	23155572-b0cd-428e-8fd6-393d2bccdfa5	Il reste sur Terre	1	fr_FR
0f347e0c-8cab-4f6e-b40c-724ed0418fe5	23155572-b0cd-428e-8fd6-393d2bccdfa5	Il va au ciel ou en enfer	2	fr_FR
c3bb2a0d-5002-40b6-ba68-099cd2688d51	23155572-b0cd-428e-8fd6-393d2bccdfa5	Il se réincarne dans une autre entité	3	fr_FR
03b4b8e7-479b-4a88-8118-48a4a00c931d	23155572-b0cd-428e-8fd6-393d2bccdfa5	Il disparait	4	fr_FR
477bc0cd-a1db-41d3-a590-0e5982fdf873	23155572-b0cd-428e-8fd6-393d2bccdfa5	L'esprit est un concept inventé par l'homme	5	fr_FR
3951aa04-a873-40cb-8806-26784b11088d	23155572-b0cd-428e-8fd6-393d2bccdfa5	Autre	6	fr_FR
20f15835-1239-4ed1-b1f3-9247eeebac2c	eaef97a9-bc49-4e0c-9d43-79a026808263	Not at all	1	en_US
6d6b33c3-85f9-41e2-b69f-f57dac3e1d54	eaef97a9-bc49-4e0c-9d43-79a026808263	A little	2	en_US
5edbf65a-7636-4bc3-92a5-9714a14e5434	eaef97a9-bc49-4e0c-9d43-79a026808263	Many	3	en_US
6c6083a8-db44-41d3-8d94-b9a0ff6d7710	eaef97a9-bc49-4e0c-9d43-79a026808263	I have no opinion	4	en_US
ce59ddc9-94d1-489a-a066-6e3e7a05643d	eaef97a9-bc49-4e0c-9d43-79a026808263	Pas du tout	1	fr_FR
43daa3a8-edde-4f1b-8897-f8ad05a63310	eaef97a9-bc49-4e0c-9d43-79a026808263	Un peu	2	fr_FR
bd023950-6427-40bf-9fcf-e9a8e0b90a4a	eaef97a9-bc49-4e0c-9d43-79a026808263	Beaucoup	3	fr_FR
3763537a-b9a5-4667-b5ea-ce05b6c9223c	eaef97a9-bc49-4e0c-9d43-79a026808263	Je n'ai pas d'avis	4	fr_FR
251691c3-619c-4676-a07d-0905e6257771	17138bd9-3f54-468f-874e-e589b39e6c01	No	1	en_US
cf1fe05d-5f74-4801-9146-3f219cb5aa1d	17138bd9-3f54-468f-874e-e589b39e6c01	Yes, but what do I know?	2	en_US
c8594b9e-bba5-4964-9f2a-8714d8a0e784	17138bd9-3f54-468f-874e-e589b39e6c01	Yeah and I'm pretty good	3	en_US
dad4fa7d-664b-4775-973e-809f6c3e942d	17138bd9-3f54-468f-874e-e589b39e6c01	Non	1	fr_FR
d6e9db8f-c8dd-46f7-9366-87f9fec49206	17138bd9-3f54-468f-874e-e589b39e6c01	Oui, mais qu'en sais-je ?	2	fr_FR
22725e19-d9d0-40b3-9583-584f7b153845	17138bd9-3f54-468f-874e-e589b39e6c01	Oui et je suis plutôt doué	3	fr_FR
22f9dfdf-5c69-4816-8c88-effdb3a52af0	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	No	1	en_US
6673d1eb-46ad-42fe-8fdc-02eb7c9e260e	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	Only one	2	en_US
582b3a4f-b2b8-49a5-9756-bb536f2be7e5	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	Many	3	en_US
a78b8189-c2fb-4ad7-b01d-bbacc4f33abe	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	Non	1	fr_FR
b1557281-f3b9-41db-817a-222783af7b45	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	Une seule	2	fr_FR
61e8bed6-3535-4c7b-a855-aa3a2b3a59c3	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	Plusieurs	3	fr_FR
f6f4d1b8-0cc4-443c-9e2a-9af8632f1dfe	90f34cab-a886-4db8-9267-3dc055e34cc7	I hate !	1	en_US
2e123b3d-ed10-4881-a1fb-e9c442935bf8	90f34cab-a886-4db8-9267-3dc055e34cc7	It does not bother me	2	en_US
8b038cd9-73be-4384-a8a8-44c1dc5759bc	90f34cab-a886-4db8-9267-3dc055e34cc7	I love that !	3	en_US
dd7db3cb-eee7-466c-98a1-37cf102e77e9	90f34cab-a886-4db8-9267-3dc055e34cc7	Je déteste !	1	fr_FR
ab3edd35-eab6-4f32-8200-66b85cdc5f78	90f34cab-a886-4db8-9267-3dc055e34cc7	Ca ne me dérange pas	2	fr_FR
8fabef16-79cb-4fe3-96f9-c62f1897f89b	90f34cab-a886-4db8-9267-3dc055e34cc7	J'adore ca !	3	fr_FR
cf8cc7d2-38c8-441e-a6d6-43a541abf3bb	0048fc62-9d18-4e28-9ee5-11187507e3db	Positive	1	en_US
8fc2d4be-f8b8-4cdb-8b1b-87ae8981355a	0048fc62-9d18-4e28-9ee5-11187507e3db	Negative	2	en_US
b7dcfcc3-3771-4ed9-a445-df9b04bf3ad6	0048fc62-9d18-4e28-9ee5-11187507e3db	Du positif	1	fr_FR
aedf3c30-52f7-4a74-9346-8070f0a33ae3	0048fc62-9d18-4e28-9ee5-11187507e3db	Du négatif	2	fr_FR
e492dbdf-e9e7-4e70-b0c4-177b64a28d16	a527699c-0929-4d07-adaa-5c322ddb7240	Never	1	en_US
35e939a9-6323-416a-9311-85b88ab28ae9	a527699c-0929-4d07-adaa-5c322ddb7240	Not on purpose	2	en_US
dcb81a76-d781-449e-a35f-8d65f26fe1a1	a527699c-0929-4d07-adaa-5c322ddb7240	To try	3	en_US
84cb8efe-628f-4c39-812f-f30c31c7b375	a527699c-0929-4d07-adaa-5c322ddb7240	Regularly	4	en_US
a02283be-6a37-478b-b599-42fcf00d60e4	a527699c-0929-4d07-adaa-5c322ddb7240	Jamais	1	fr_FR
9ecf1575-6ad3-45b3-9d51-8fb60f907061	a527699c-0929-4d07-adaa-5c322ddb7240	Sans faire Exprès	2	fr_FR
2e05045a-b5c0-4738-a62a-460f56b20dd8	a527699c-0929-4d07-adaa-5c322ddb7240	Pour essayer	3	fr_FR
33acf575-ebc1-4c53-837d-2335fa7cf4f7	a527699c-0929-4d07-adaa-5c322ddb7240	Régulièrement	4	fr_FR
77d748e4-32ff-48ec-b712-31182053549d	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	We have to accept them all	1	en_US
1b88a9d1-aef1-47a4-b2f8-847dba5603d3	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	According to quotas useful to the host country	2	en_US
ce1149de-665b-4928-b9f2-6932e341ddb5	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	According to their life course	3	en_US
da762541-7db3-4b82-9f26-78ec15006a9f	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	Accept only the youngest	4	en_US
5433769e-988c-46d1-847b-4f2c995d0ac5	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	Our borders must remain closed to them	5	en_US
f8579449-a1a1-40b7-b6f8-f13d3a9fe8c5	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	Nous devons tous les accepter	1	fr_FR
d3e548b8-9012-4c07-832d-e0be648d9ef9	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	Selon des quotas utiles au pays d'accueil	2	fr_FR
a0d1eb2b-9d1c-4d50-b2f6-886b81516cdb	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	Selon leur parcours de vie	3	fr_FR
0b461e77-f88c-4f87-8e99-bd1850799657	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	N'accepter que les plus jeunes	4	fr_FR
d55eec06-74a0-472e-8751-b603f788127d	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	Nos frontières doivent leur rester fermées	5	fr_FR
2225bf5f-557e-4868-a229-1595675c500b	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Your partner	1	en_US
5433b15a-c644-45d3-b4fe-f50b86f5b500	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	A member of your family	2	en_US
355a4817-704e-4d9d-8fee-32771695ff0b	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	One of your best friends	3	en_US
33d01fe4-09ae-402a-afec-b203f35fc9fc	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	A celebrity	4	en_US
c0b393e6-b90e-4cae-a3b7-c9f828baafaf	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Your pet	5	en_US
38d37ad5-cdd6-4927-85bf-67d74a0e4072	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	You prefer to die alone	6	en_US
9ab42b1a-a5ef-43ae-9cda-1d7462b73e33	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	A superhero, just in case there is a chance	7	en_US
d5891572-db0c-4789-a400-6fe54441fa6e	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Votre partenaire	1	fr_FR
fccaed40-6499-464d-aa20-ef0877786d76	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Un membre de votre famille	2	fr_FR
6331119e-18e2-4431-a5fc-551d1f7eb9be	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Un de vos meilleurs amis	3	fr_FR
e180d924-64af-495e-97dc-427ebc5ee433	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Une célébrité	4	fr_FR
cee11866-c53e-4925-9c8f-01e60362958f	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Votre animal de compagnie	5	fr_FR
e4518750-f0cc-4dc2-97df-41141697c76c	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Vous préférez mourir seul	6	fr_FR
db219cb0-7657-4b8a-b06c-d9deb2e45967	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	Un super-héros, juste au cas où il y ait une chance	7	fr_FR
d6450dd3-8ff3-47c6-a7a4-af6bf6ef7561	e73a8b2c-f95b-4cff-9605-fecef53fce39	Yes	1	en_US
ec36864f-99f3-434c-81b0-e45e49479eb5	e73a8b2c-f95b-4cff-9605-fecef53fce39	Only in bed	2	en_US
5032436b-2f12-4063-9b77-028bee7bf969	e73a8b2c-f95b-4cff-9605-fecef53fce39	Only in life	3	en_US
fdb2022b-f2d9-40fd-ab8c-ad3a88e4e9c9	e73a8b2c-f95b-4cff-9605-fecef53fce39	Not at all	4	en_US
29575685-4196-4e2d-8081-3a1149133801	e73a8b2c-f95b-4cff-9605-fecef53fce39	Oui	1	fr_FR
b747c1f2-e650-4ad1-aa44-674da0c922d4	e73a8b2c-f95b-4cff-9605-fecef53fce39	Uniquement au lit	2	fr_FR
a84b398b-529f-4971-8ad6-e755a06b38b8	e73a8b2c-f95b-4cff-9605-fecef53fce39	Uniquement dans la vie	3	fr_FR
4b6f83e3-b10e-481a-965a-9b14650d4d33	e73a8b2c-f95b-4cff-9605-fecef53fce39	Pas du tout	4	fr_FR
d8dcc9c9-4c66-4164-9545-55a12904cfa8	d7b79842-0726-445c-8ca1-8cda1552db06	Hot	1	en_US
281c8917-c934-4407-a30e-5191545f16fb	d7b79842-0726-445c-8ca1-8cda1552db06	Cold	2	en_US
98219960-68a1-4c94-8691-d3a4940a03d4	d7b79842-0726-445c-8ca1-8cda1552db06	Chaud	1	fr_FR
8bbd05c8-be60-47da-8c57-fa9a28c49615	d7b79842-0726-445c-8ca1-8cda1552db06	Froid	2	fr_FR
eb2d345f-c961-431a-ad17-240a22eb5528	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	french	1	en_US
be5030bd-2b1a-4a78-ac1e-d4117152ffc3	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	italian	2	en_US
ae8a1331-9772-43bb-9df9-07c9f03dab40	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	Arab	3	en_US
99000bf5-6e09-49c6-848f-dc35d27dcf00	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	Asian	4	en_US
faa61d41-8c7b-4453-9f0b-686958cfdad2	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	african	5	en_US
08ab1a8e-8d9b-4f2b-9af3-e666f9d93a76	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	other	6	en_US
f9a444fc-b97e-4e8e-8bdd-20c361051456	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	francaise	1	fr_FR
c8fa9158-bc7e-4192-b224-449c677dcdd4	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	italienne	2	fr_FR
13ffc18b-0681-4d32-adbc-f22b16889669	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	arabe	3	fr_FR
8020e8fe-5dac-40b9-832a-cd48807d702f	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	asiatique	4	fr_FR
7481573e-96b1-40ca-82fa-6499c015936f	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	africaine	5	fr_FR
7f266f67-b3ce-4c97-b87f-723a08b690be	d5c1c016-b866-4f1e-8c74-a36f6a4ac5cb	autre	6	fr_FR
ce7f9410-0ac9-414f-acf3-b784d486d83c	80dc0680-2884-4a61-858a-db21dd490378	Chicken without a doubt	1	en_US
3115e35e-1812-4885-9c99-e7f92030165f	80dc0680-2884-4a61-858a-db21dd490378	The egg, that's for sure!	2	en_US
413fe3b7-ea36-4f63-90ed-01749357dc49	80dc0680-2884-4a61-858a-db21dd490378	We do not care ?	3	en_US
1fd5a78e-d4ab-4a7f-988a-5ade909fb095	80dc0680-2884-4a61-858a-db21dd490378	I do not know	4	en_US
e8bee1a3-3762-41ac-b5c7-8752fd71f2c8	80dc0680-2884-4a61-858a-db21dd490378	Le poulet sans aucun doute	1	fr_FR
f986b0c2-7ec7-431a-8bfd-f9868e41847e	80dc0680-2884-4a61-858a-db21dd490378	L'uf, c'est sûr!	2	fr_FR
67f24edc-1371-47de-b841-e4cce494bd30	80dc0680-2884-4a61-858a-db21dd490378	On s'en fout ?	3	fr_FR
24a053a2-1d6e-4493-bf63-cde92dfefe94	80dc0680-2884-4a61-858a-db21dd490378	Je ne sais pas	4	fr_FR
275eb79a-2ed1-42f6-945d-48cf4c918d6b	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	The death	1	en_US
aed151ed-1be3-4b4b-a6d7-a0e62d3b178e	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Lose someone	2	en_US
e9b89d33-c317-4530-b6d1-e614b2dbb05f	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Solitude	3	en_US
7ba2de86-5411-4328-98d8-ef0f47ce2777	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Crowd	4	en_US
f4c02e5c-73d3-46ee-a48e-37e36db3b8de	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Certain "dangerous" animals	5	en_US
b62c6ce7-05a9-4a54-9c5d-8ae3cd5a6557	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Height or closed spaces	6	en_US
29672925-c3c3-45a2-8f4c-ea59090259ae	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Being physically impaired because of disability or old age	7	en_US
b7608d09-f677-467e-a384-80dcf18c9574	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Being poor or unemployed	8	en_US
92e9a994-746b-4ac0-9ab1-620034d5a0e1	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Suffer physically	9	en_US
b6ae8717-e447-4bf7-b5cc-db22924afd4c	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	La Mort	1	fr_FR
cd831a37-d9b6-4c7f-b78b-a1ece6e83329	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Perdre quelqu'un	2	fr_FR
9c2fe5e2-562d-47f6-a9a1-48f7a003751c	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Solitude	3	fr_FR
e6a17ff5-031a-4529-a1e3-670be56d9dcf	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Foule	4	fr_FR
bc81453d-7fe8-49a5-b4cd-bb501ccbce24	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Certains animaux "dangereux"	5	fr_FR
81a72512-f1fb-4242-a514-db08a244da08	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	La hauteur ou les espaces fermés	6	fr_FR
b69d01e8-5618-4586-a329-6ee2c7bc60cb	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Etre physiquement diminué à cause du handicap ou de la vieillesse	7	fr_FR
3c70efa2-81eb-4a47-9e1c-45c9080480de	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Être pauvre ou sans emploi	8	fr_FR
8397fb27-6e29-4361-b8c2-9fc686fd4e7b	e7adfcef-7c08-431d-ba1e-0c2ab21c8bb9	Souffrir physiquement	9	fr_FR
1009ea50-788e-44e8-9f37-2924312cd177	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	Yes	1	en_US
7ab00acc-f24b-4a08-ae58-9a6b5f342a60	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	The bust measurement does not make femininity	2	en_US
6002cd24-fe79-4e8c-9d13-755e1ecf9083	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	On the contrary!	3	en_US
62733ec9-c3c3-4349-a752-b3840f09d0b2	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	Oui	1	fr_FR
253ffbf4-7214-489e-803c-1ed3d01ee5a6	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	Le tour de poitrine ne fait pas la féminité	2	fr_FR
db65ac2b-90ab-4de6-ab3c-78fcceb74f8f	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	Au contraire!	3	fr_FR
7b8966e0-6102-4f15-976a-ff55fe6b14e7	f8b65108-8187-470b-be50-6044e6fe6c12	No	1	en_US
714a517a-2497-4c16-872a-ba77a70e5163	f8b65108-8187-470b-be50-6044e6fe6c12	I searched his pockets	2	en_US
c676a9db-c890-4a60-938a-7e74e17780cf	f8b65108-8187-470b-be50-6044e6fe6c12	I searched his cell phone	3	en_US
634c3a38-7aa9-4473-9c17-3cda899f1b7f	f8b65108-8187-470b-be50-6044e6fe6c12	I checked his emails	4	en_US
1733fb43-c6d8-47f8-b749-33ba71516ad9	f8b65108-8187-470b-be50-6044e6fe6c12	I followed him	5	en_US
4c4200b0-83c8-4716-9dae-3206a4be3973	f8b65108-8187-470b-be50-6044e6fe6c12	I hired a detective	6	en_US
e36886fa-ec28-4ee7-aae7-15393b7f310c	f8b65108-8187-470b-be50-6044e6fe6c12	Non	1	fr_FR
246a1375-be0c-4865-bae8-d380c3570e6a	f8b65108-8187-470b-be50-6044e6fe6c12	J'ai fouillé ses poches	2	fr_FR
32815927-4f5b-4ac1-9d0f-1d6350717a79	f8b65108-8187-470b-be50-6044e6fe6c12	J'ai fouillé son portable	3	fr_FR
0a9bc1d5-1e1e-4167-8232-09570521d504	f8b65108-8187-470b-be50-6044e6fe6c12	J'ai vérifié ses emails	4	fr_FR
1852ffe8-2710-4d0e-9a5c-28bd847721bf	f8b65108-8187-470b-be50-6044e6fe6c12	Je l'ai suivi	5	fr_FR
353cb189-28ff-47ea-88c8-c64a8fcaa8de	f8b65108-8187-470b-be50-6044e6fe6c12	J'ai embauché un détective	6	fr_FR
f6555afb-61ef-4ee9-9ccb-35d135ea1c09	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Yes i think about it	1	en_US
4ec6c0a6-bbe3-4a8d-867a-5d73405e96ef	1590dc85-75d6-4662-a8c5-e4ca9e00708b	No, my job allows me to flourish	2	en_US
6b75cebf-79bd-49d6-a1f2-7a55d53c38c4	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Yes, but I don't know for what job	3	en_US
15bbbc15-208b-4d5c-b3da-d40541eb83f0	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Yes, but I have not found a solution to finance training	4	en_US
ecd0f50b-d056-4cac-a4bf-5bae0b9631c2	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Oui, j'y réfléchis	1	fr_FR
270b0bd3-609c-42b7-8e30-594c4b7dfca5	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Non, mon métier me permet de m'épanouir	2	fr_FR
e04ca9a4-1ba6-40f7-bc5e-016ec9b098b5	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Oui, mais je ne sais pas pour quel métier	3	fr_FR
3e7796fc-0dce-4a62-8bb6-89492cf61fd5	1590dc85-75d6-4662-a8c5-e4ca9e00708b	Oui, mais je n'ai pas trouvé de solution pour financer une formation	4	fr_FR
a754c7d9-4c84-4b00-bc31-43e8a618b76f	bd7364ae-c249-45b1-b840-ffefae1fc337	Yes	1	en_US
b5a2dad6-0c87-40ad-bb39-ff67431065aa	bd7364ae-c249-45b1-b840-ffefae1fc337	Yes and they are smarter than humans	2	en_US
b8b5e2c3-e1b7-457a-8e23-ea64bea0f9a9	bd7364ae-c249-45b1-b840-ffefae1fc337	Yes, but they might not be as smart as we think they are	3	en_US
8f65dc36-96c8-46df-9a71-b7b127bf80e9	bd7364ae-c249-45b1-b840-ffefae1fc337	Yeah, but I doubt they ever came to earth	4	en_US
87ac4212-0abe-4d64-8e90-079ee513a2ca	bd7364ae-c249-45b1-b840-ffefae1fc337	No	5	en_US
a125c2c5-9c83-4495-a9b5-698eee96010c	bd7364ae-c249-45b1-b840-ffefae1fc337	Oui	1	fr_FR
2ea98bac-498c-4203-8bb2-7532026ebde0	bd7364ae-c249-45b1-b840-ffefae1fc337	Oui et ils sont plus intelligents que les humains	2	fr_FR
6ee0abeb-7336-4b6a-a97f-29fc707a2ab6	bd7364ae-c249-45b1-b840-ffefae1fc337	Oui, mais ils pourraient ne pas être aussi intelligents que nous le pensons	3	fr_FR
d86c8230-36e3-4898-b520-e2fe83211b44	bd7364ae-c249-45b1-b840-ffefae1fc337	Oui, mais je doute qu'ils soient déjà venus sur terre	4	fr_FR
185d0171-2d74-4fb3-b7a7-b2c104da6a05	bd7364ae-c249-45b1-b840-ffefae1fc337	Non	5	fr_FR
d3f08287-8e45-4063-8f33-11c45d48fc2d	fcb9151e-dadb-4bc6-a928-1fa07338bc23	Yes	1	en_US
4c29440f-1599-4eaf-afef-adaf2aa91f8b	fcb9151e-dadb-4bc6-a928-1fa07338bc23	No	2	en_US
e9946d90-fe3c-4dec-936b-0143a25e8635	fcb9151e-dadb-4bc6-a928-1fa07338bc23	Already done	3	en_US
11148bb6-349a-479c-a899-212e9b29539b	fcb9151e-dadb-4bc6-a928-1fa07338bc23	It depends on the sex of the 3rd	4	en_US
7272ca6e-6103-4059-8a4b-cbad136a06f8	fcb9151e-dadb-4bc6-a928-1fa07338bc23	Oui	1	fr_FR
acfb953a-a23e-4c6c-ad97-5c8684302a97	fcb9151e-dadb-4bc6-a928-1fa07338bc23	Non	2	fr_FR
8951a0ba-6166-4f9e-bbe8-f8fb14590656	fcb9151e-dadb-4bc6-a928-1fa07338bc23	Déjà Fait	3	fr_FR
8569ae86-8030-460d-873f-958011223761	fcb9151e-dadb-4bc6-a928-1fa07338bc23	Ca dépend du sexe du 3ème	4	fr_FR
a5ec46c1-88ad-4c8b-a9ee-70316b78de97	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Dogs	1	en_US
eeb63d50-f415-45bc-ad37-6acf1accc2f6	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Cats	2	en_US
66262b13-6a2c-4b16-995f-c97a82fa282d	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Birds	3	en_US
34e387ed-4545-4c9a-b3a4-3da40eca9401	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Rodents	4	en_US
6168307c-547a-411e-be9b-c66f5117ed27	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Reptiles	5	en_US
62a83820-aac6-4e21-9bc4-7a19110d70ba	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Insects	6	en_US
bd7ebc99-ec4b-42bf-a2e7-504338f6dc46	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Fishes	7	en_US
46c07f59-3bcd-4255-9868-089682de972c	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Other mammals	8	en_US
ba32162f-3681-4490-970d-06e93945fd93	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Chiens	1	fr_FR
8bd6c07f-c077-44dc-b2f5-11c63276b783	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Chats	2	fr_FR
d56cc955-bd0e-40d8-8747-252d815126fd	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Des oiseaux	3	fr_FR
4f8c90c0-ca83-499e-8a2b-9a8d643859d3	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Rongeurs	4	fr_FR
49a9792c-1c47-4613-80a4-d0b140f4d1c7	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Reptiles	5	fr_FR
0aabade8-ed41-4cc7-9575-9b6d403842a9	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Insectes	6	fr_FR
0b8c357b-6e3b-4ccf-81ac-a1fffb9b3008	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	Des poissons	7	fr_FR
b6557966-cffc-4529-8122-6eba7e1c3706	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	D'autres mammifères	8	fr_FR
ecb40164-b63e-4004-b354-d06ff8794b2c	6a582f59-a400-4c9d-8143-b3e6eb082230	No never	1	en_US
86d37bfa-7242-4731-9a76-a2136c4098f1	6a582f59-a400-4c9d-8143-b3e6eb082230	Only when it's important	2	en_US
2df61923-b116-45c6-b655-23c3a77ce763	6a582f59-a400-4c9d-8143-b3e6eb082230	1 time per month	3	en_US
510b26a3-6748-40c0-8d76-a98278fa9abe	6a582f59-a400-4c9d-8143-b3e6eb082230	Once a year	4	en_US
3acca256-8668-4e80-9d6c-ffefbb45c259	6a582f59-a400-4c9d-8143-b3e6eb082230	Non jamais	1	fr_FR
87b1dc84-790a-4697-a63e-42cdf653fd80	6a582f59-a400-4c9d-8143-b3e6eb082230	Uniquement quand c'est important	2	fr_FR
27726a2f-eaf1-45a2-bc19-b283cf8ca604	6a582f59-a400-4c9d-8143-b3e6eb082230	1 fois par mois	3	fr_FR
f8bcc1c5-4f8f-4d26-8cfb-d0095c65c57e	6a582f59-a400-4c9d-8143-b3e6eb082230	1 fois par an	4	fr_FR
3f204ca3-01d2-421d-81ce-2463335a8412	8ca16545-dd00-48d8-bf87-aaf093851072	What interest?	1	en_US
7412dbe4-fe47-4a3b-9ff1-0346cc753448	8ca16545-dd00-48d8-bf87-aaf093851072	I dare not	2	en_US
2a7014b4-7770-434e-8ce0-0f200f16d97d	8ca16545-dd00-48d8-bf87-aaf093851072	I do not know how to dance	3	en_US
6caf4afc-7843-444e-b67c-4e865a2d3b1b	8ca16545-dd00-48d8-bf87-aaf093851072	Occasionally	4	en_US
b99b6277-d7b6-438a-94e0-7f56b392caae	8ca16545-dd00-48d8-bf87-aaf093851072	All the time	5	en_US
3a8958f6-9d7e-4a12-881a-b4ec55ff9155	8ca16545-dd00-48d8-bf87-aaf093851072	Quel intérêt?	1	fr_FR
517588a2-58ea-4b66-a4e6-0b9d5e88bb7f	8ca16545-dd00-48d8-bf87-aaf093851072	Je n'ose pas	2	fr_FR
d3353106-21d4-4339-9810-a300ecec6178	8ca16545-dd00-48d8-bf87-aaf093851072	Je ne sais pas danser	3	fr_FR
de01a692-8eb3-4d5d-b9b4-78839b741cf0	8ca16545-dd00-48d8-bf87-aaf093851072	Occasionnellement	4	fr_FR
e71c0942-af78-4544-8402-2c6612f13990	8ca16545-dd00-48d8-bf87-aaf093851072	Tout le temps	5	fr_FR
0fa5bdf7-92ac-4fba-83d6-3ff5d90b590f	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	Black	1	en_US
283f3def-ac0e-42b6-b2cf-08670e7dce95	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	White	2	en_US
9d23cd8c-2064-489e-900c-17873abfd721	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	With milk	3	en_US
f352657d-caf0-4017-b433-866ac3b1f553	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	With nuts / fruits / rice	4	en_US
fe482cae-6189-437a-8d8c-017ffdd6d06a	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	Noir	1	fr_FR
d95f40f5-f3bf-4c16-b120-04b168afd4ba	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	Blanc	2	fr_FR
0759ed56-d65a-4829-8635-6853c87cf1c7	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	Au lait	3	fr_FR
5649ee82-96b9-432f-89b4-3ddc649e8ff6	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	Avec noix / fruits / riz	4	fr_FR
0d433c1e-8117-41df-9832-237dc357e58c	f03edd14-239b-4e70-a6c1-44d5da27960a	I don't believe in jesus	1	en_US
581e5940-4f72-4139-8dcc-c9ae63ee4f80	f03edd14-239b-4e70-a6c1-44d5da27960a	I think Jesus existed and died but his story has been rewritten	2	en_US
ab28fe80-937c-4172-bbee-05d748a2e1c0	f03edd14-239b-4e70-a6c1-44d5da27960a	He could have died for things other than our sins	3	en_US
c17c0ed7-078e-4d10-a198-6c124b334554	f03edd14-239b-4e70-a6c1-44d5da27960a	Yeah, just like the bible says	4	en_US
797803c9-f718-4f10-9bb7-6c4c0916e85d	f03edd14-239b-4e70-a6c1-44d5da27960a	I do not know	5	en_US
222ef9a7-aa9e-4036-b6cb-eed1dd993390	f03edd14-239b-4e70-a6c1-44d5da27960a	Je ne crois pas en Jésus	1	fr_FR
bea68516-c71d-4f7b-ad60-22a62ff97836	f03edd14-239b-4e70-a6c1-44d5da27960a	Je pense que Jésus a existé et qu'il est mort mais son histoire a été réécrite	2	fr_FR
a96466f7-e650-468c-bfaf-fc221056c3c2	f03edd14-239b-4e70-a6c1-44d5da27960a	Il a pu mourir pour autres choses que nos péchés	3	fr_FR
02500555-a1d2-4143-b162-5b65bcc01b6a	f03edd14-239b-4e70-a6c1-44d5da27960a	Oui, tout comme la Bible dit	4	fr_FR
a4c3de12-ad2c-4b46-967b-f67687cb46f3	f03edd14-239b-4e70-a6c1-44d5da27960a	Je ne sais pas	5	fr_FR
3378051b-29a1-4a81-a4fb-e8c755c5d9f5	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Discover the purpose of its existence	1	en_US
718f4fa9-d838-4ae6-b754-3e83859a02fd	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Make the people around you happy	2	en_US
fd2a90c5-b565-4d6f-8f6b-048bcbf25c5c	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Change the world	3	en_US
78a92714-b88b-4ff0-a508-d7eb4635ebfc	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Passing the torch to subsequent generations	4	en_US
936401f5-7b11-4edc-a8b7-6a42997b7b45	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Enjoy the moment	5	en_US
f74d4ffc-2e99-4a96-8ccd-15c70d7dfc55	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Get big cars and a lot of money	6	en_US
9ff9bcba-1c6d-432c-8ae9-d8f8f6a9f501	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Do good to be accepted in heaven or equivalent	7	en_US
300f5c6f-998d-468b-8768-966c203ac43d	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Serve your god or goddess	8	en_US
da47bcae-65cd-47ad-aff6-f2c64730b241	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Other	9	en_US
c244d7ba-f45d-4efa-ba5b-252ba90d62cd	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Découvrir le but de son existence	1	fr_FR
0773dc0e-4258-4f82-9911-e9f317a908e6	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Rendre les gens heureux autour de vous	2	fr_FR
89e6c08d-b1a1-422e-87e2-64c93836f83e	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Changer le monde	3	fr_FR
4e46e4fd-0119-4478-92f2-ec4e892b0f0c	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Passer le flambeau aux générations suivantes	4	fr_FR
5fe984b6-f8d1-4dc4-86a1-12042b3df840	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Profiter de l'instant présent	5	fr_FR
cedf9e57-34d3-4cf6-89bb-5fa0631d85cf	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Obtenir de grosses voitures et beaucoup d'argent	6	fr_FR
bb4e224b-8db8-4f2b-9de8-cf19fdb7e0a1	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Faire le bien pour être accepter au paradis ou équivalent	7	fr_FR
a352cafb-9c4a-4732-bd5e-b41e6d29c54e	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Servir son dieu ou sa déesse	8	fr_FR
bfa4e3d4-4465-491e-bb9f-283831eed348	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	Autres	9	fr_FR
532c2b5f-34a9-4796-9dab-8710a6294f70	5038dba5-1fcc-4a73-8639-6cfa75334633	Never	1	en_US
fcc4c8f6-2969-47e8-90da-75c163398a52	5038dba5-1fcc-4a73-8639-6cfa75334633	Once for the experience	2	en_US
3d23880d-89b3-462f-ab89-0d31ac80d811	5038dba5-1fcc-4a73-8639-6cfa75334633	Occasionally	3	en_US
87efe509-ac4f-4b98-a70a-8a9565ac80fe	5038dba5-1fcc-4a73-8639-6cfa75334633	Often	4	en_US
cbe86d1f-23b7-410a-9ada-902a2a943b1d	5038dba5-1fcc-4a73-8639-6cfa75334633	All the time	5	en_US
147c35e9-09b6-449a-92e8-dccc600e4441	5038dba5-1fcc-4a73-8639-6cfa75334633	Jamais	1	fr_FR
d42e8b26-c880-44b8-91a9-88f1f643e794	5038dba5-1fcc-4a73-8639-6cfa75334633	Une fois pour l'expérience	2	fr_FR
ef3957f0-eb96-42a1-b641-b4b013444736	5038dba5-1fcc-4a73-8639-6cfa75334633	Occasionnellement	3	fr_FR
47842737-9986-497d-8a2a-de51ae223ba2	5038dba5-1fcc-4a73-8639-6cfa75334633	Souvent	4	fr_FR
f1141865-67f8-42eb-a1fc-99d47dd931a7	5038dba5-1fcc-4a73-8639-6cfa75334633	Tout le temps	5	fr_FR
6c0c5713-6fbd-4fd9-ae27-123329a8cf8a	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Prehistory	1	en_US
09a6267b-c85f-42b8-8601-ef01c876f798	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	antiquity	2	en_US
1168392d-13a4-4627-97f9-003eaab691a9	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Middle Ages	3	en_US
a68458c3-3a71-4170-bd61-1e8614fda127	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Renaissance	4	en_US
97bf3a0b-e87a-4125-8424-81edd4eaf447	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	European expansion	5	en_US
ff3e9b45-f0ca-419c-8efd-96757bd0eaf8	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Scientific revolution	6	en_US
54d7bc3d-987b-415e-ab76-e4fc48cbf621	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Industrial Revolution	7	en_US
15bf4e5d-ee3f-448b-841e-25b44af82a16	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	20th century	8	en_US
aa616a55-4505-464b-a875-716181109e2c	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	21st century	9	en_US
e6517d09-0664-47bc-93be-a5850a878934	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	In the future	10	en_US
538686e8-cd01-4da7-86b4-9d6a16839b2d	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Préhistoire	1	fr_FR
b4bb264e-5a4a-4cd4-b1ed-c2732ee754dd	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Antiquité	2	fr_FR
7d095329-0413-4a89-8957-a25fd780b554	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Moyen Age	3	fr_FR
d366fb88-8d6c-4768-8e17-7aee2ccc4fa1	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Renaissance	4	fr_FR
f0d58419-b453-4884-924b-54379ce761c8	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Expansion européenne	5	fr_FR
1d96fb5c-cbb1-43d9-a0a4-2d11c70e5e2e	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Révolution scientifique	6	fr_FR
b2f91233-dd24-43a9-b5b2-bc7ccc2e5e54	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Révolution industrielle	7	fr_FR
d22c4eb4-9dec-418d-a944-d1edd5db9d23	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	20ième siècle	8	fr_FR
84289518-2a2b-43c4-b91e-86805056f20a	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	21e siècle	9	fr_FR
6a7c90d9-9120-4b62-a221-685b2b79400f	73fa7ace-0190-4429-8c1e-cc8aedb56f9d	Dans le futur	10	fr_FR
4c6d9d8d-08fd-41f5-ad58-6a217121aeb5	20510485-8901-4682-87e4-c49cf4d99c26	Yes	1	en_US
2b643d39-f1c3-40a5-bf02-2c2e9b8b3543	20510485-8901-4682-87e4-c49cf4d99c26	No	2	en_US
9ef3300a-2500-4feb-b3c6-02abbf6d4cff	20510485-8901-4682-87e4-c49cf4d99c26	In fact i'm not sure	3	en_US
4db698b8-153d-4210-8b4d-7cb30e5c38c6	20510485-8901-4682-87e4-c49cf4d99c26	I think I exist in my own world, but the world I perceive might be unreal	4	en_US
00d186e3-70a4-4134-87c6-54650745d165	20510485-8901-4682-87e4-c49cf4d99c26	I do not care	5	en_US
77704907-cbba-4e28-934e-16919b72b1bd	20510485-8901-4682-87e4-c49cf4d99c26	Oui	1	fr_FR
0354ebec-26f3-4b18-8af9-d5ff58090dd2	20510485-8901-4682-87e4-c49cf4d99c26	Non	2	fr_FR
7c258b85-ba3d-4516-b8b5-f3805e1b1fa1	20510485-8901-4682-87e4-c49cf4d99c26	En fait , je ne suis pas sûr	3	fr_FR
36749750-7e52-43b7-bfdb-dc8237c7cf8c	20510485-8901-4682-87e4-c49cf4d99c26	Je pense que j'existe dans mon propre monde, mais le monde que je perçois pourrait être irréel	4	fr_FR
687d76e7-90d9-4a01-afa8-4929d9eebabf	20510485-8901-4682-87e4-c49cf4d99c26	Peu m'importe	5	fr_FR
dfa5540d-64ce-434d-bff3-71663765dc01	81d61817-dadd-452a-bfd7-229331ff34ba	Europe	1	en_US
8aab87b4-5df1-4842-821c-8a8269854768	81d61817-dadd-452a-bfd7-229331ff34ba	North America	2	en_US
22615392-be8c-45cf-8f96-93a140b68c21	81d61817-dadd-452a-bfd7-229331ff34ba	South America	3	en_US
982a6a4f-e4ca-4b12-b483-cfaa83e60c15	81d61817-dadd-452a-bfd7-229331ff34ba	Asia	4	en_US
533ae595-4d8d-4d19-9366-5d8752a41bc1	81d61817-dadd-452a-bfd7-229331ff34ba	Africa	5	en_US
cfb08122-fcaf-4680-804c-7525efcdfcb8	81d61817-dadd-452a-bfd7-229331ff34ba	Australia & surroundings	6	en_US
fda1aeec-e980-466a-b8d5-8ddce390e2af	81d61817-dadd-452a-bfd7-229331ff34ba	Middle East	7	en_US
2e19c17a-d29e-4c88-941f-fec89ca78efa	81d61817-dadd-452a-bfd7-229331ff34ba	Arctic & antarctica	8	en_US
71ae190c-007a-4dd6-b8fe-5e6cfbdd3705	81d61817-dadd-452a-bfd7-229331ff34ba	Europe	1	fr_FR
dc86a8e4-4064-4b5c-9549-d35220cc2cc6	81d61817-dadd-452a-bfd7-229331ff34ba	Amérique du Nord	2	fr_FR
cd26f3ff-970a-4c45-a787-8eb693782e76	81d61817-dadd-452a-bfd7-229331ff34ba	Amérique du sud	3	fr_FR
14c703ba-cac9-4ad6-ad03-e1c77cd20b5e	81d61817-dadd-452a-bfd7-229331ff34ba	Asie	4	fr_FR
9bebdf95-933e-47e8-b57e-f7896dea7fd8	81d61817-dadd-452a-bfd7-229331ff34ba	Afrique	5	fr_FR
efd51e84-0a59-45e6-847c-882b69550271	81d61817-dadd-452a-bfd7-229331ff34ba	Australie & environs	6	fr_FR
a2307429-8372-4e61-9425-6820a2f18958	81d61817-dadd-452a-bfd7-229331ff34ba	Moyen Orient	7	fr_FR
0d4357d5-9b1f-4977-a6c0-022477a900ad	81d61817-dadd-452a-bfd7-229331ff34ba	Arctique & Antarctique	8	fr_FR
c3740de1-462b-432d-9055-13d016396fcd	6402e55b-e502-47eb-adaf-d662d33a96d5	Want someone else	1	en_US
29a0d9b4-92f5-4a5a-a519-1e879e18e1cb	6402e55b-e502-47eb-adaf-d662d33a96d5	Kiss someone else	2	en_US
2aeb15a6-d99f-4501-83e5-e95e33ba5b35	6402e55b-e502-47eb-adaf-d662d33a96d5	Looking at someone else	3	en_US
d7acf64a-dd6e-4af1-9501-82469f06bfa3	6402e55b-e502-47eb-adaf-d662d33a96d5	Sleeping with someone else	4	en_US
4c20d583-5e19-4511-8218-56691b52fd2f	6402e55b-e502-47eb-adaf-d662d33a96d5	Désirer quelqu'un d'autre	1	fr_FR
da2114f1-ddbd-4b0f-ab90-f97b60c4bf51	6402e55b-e502-47eb-adaf-d662d33a96d5	Embrasser quelqu'un d'autre	2	fr_FR
3a31afc5-4e84-41f2-b3ce-8bbf851e135d	6402e55b-e502-47eb-adaf-d662d33a96d5	Regarder quelqu'un d'autre	3	fr_FR
55abe3fa-b43c-40e3-ba3e-b986854d0bdf	6402e55b-e502-47eb-adaf-d662d33a96d5	Coucher avec quelqu'un d'autre	4	fr_FR
1373f96f-05c9-43c3-af78-46213353fc54	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Federer	1	en_US
8ee2d8da-22ea-4c61-9fae-034c4ca3c59d	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Nadal	2	en_US
d5e1078f-2b8c-42df-a0fb-4dd2c553132b	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Borg	3	en_US
44e39374-fbf4-4765-bd86-94630b4c7092	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Wash	4	en_US
24e84ab6-c110-4b48-88c5-7c55c21caf42	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Mcenroe	5	en_US
cc17b07f-3ac3-4e96-b766-71c73ee3c843	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Djokovic	6	en_US
de517e1a-74a0-41ea-b8a8-0fb239e38809	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Sampras	7	en_US
a92b9458-9f48-438e-9540-529a23e62efe	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Agassi	8	en_US
93666f59-cdab-421a-8a25-7b866ae20db2	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Lendl	9	en_US
f363e350-d779-4fb1-b769-ffb60b5e1894	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Connors	10	en_US
24448726-b428-4238-bad0-6ddc01518ece	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Federer	1	fr_FR
fe33d5ce-e3d6-4470-bfae-27b0194d7c22	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Nadal	2	fr_FR
ccb36c55-9573-427b-9d07-1d216a3d5cdc	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Borg	3	fr_FR
81cadb6e-b68f-46d2-8acc-f1db6db3859d	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Laver	4	fr_FR
eb8aafcd-60a4-495b-a71c-ad3f64c2cf54	29eb7ca2-7d27-457e-aa48-c266e040f5ca	McEnroe	5	fr_FR
deae6e44-16f4-4d41-abca-606de6f7776f	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Djokovic	6	fr_FR
92c066ae-5212-4f87-ae39-61e78ea80d3d	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Sampras	7	fr_FR
b2ebe9cd-0214-49a7-9a91-b35e9f68eed5	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Agassi	8	fr_FR
ad4593a8-1a85-4b03-a9d8-0ac4e2274792	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Lendl	9	fr_FR
205a0ec5-bf7a-4908-87c6-e5481179f2db	29eb7ca2-7d27-457e-aa48-c266e040f5ca	Connors	10	fr_FR
f3220290-31cb-43e7-b289-db600ba59c99	c7b5a382-4165-4cc8-8de0-3f84a2283679	He is a usurper	1	en_US
d0589644-b126-48ca-9081-b84853693b4b	c7b5a382-4165-4cc8-8de0-3f84a2283679	He is charismatic	2	en_US
68925f64-6261-42df-80cb-9dbd85dce585	c7b5a382-4165-4cc8-8de0-3f84a2283679	He is a liar	3	en_US
07d05e8c-f070-4bcf-b19e-5c5786cef598	c7b5a382-4165-4cc8-8de0-3f84a2283679	He is brilliant	4	en_US
a2b8f135-2914-40fa-9c1d-e958535180ce	c7b5a382-4165-4cc8-8de0-3f84a2283679	He only lives for the money	5	en_US
846c3567-f1f9-4993-9f32-c64bac42bca5	c7b5a382-4165-4cc8-8de0-3f84a2283679	He built himself	6	en_US
bdde91f9-806b-4502-bcd3-ed69505448ce	c7b5a382-4165-4cc8-8de0-3f84a2283679	He is demagogue	7	en_US
428d8964-573b-4abd-a7af-0433b8503863	c7b5a382-4165-4cc8-8de0-3f84a2283679	He's the change that America needs	8	en_US
6722dc69-5bc2-45cb-bdcd-dacfa4072ef7	c7b5a382-4165-4cc8-8de0-3f84a2283679	Il est un usurpateur	1	fr_FR
549aa66c-c076-4917-96bb-89368f484ce8	c7b5a382-4165-4cc8-8de0-3f84a2283679	Il est charismatique	2	fr_FR
e6fbc717-7480-48b3-b80a-a768d212a952	c7b5a382-4165-4cc8-8de0-3f84a2283679	Il est un menteur	3	fr_FR
4efff3db-2389-42df-ae33-a6dae684136f	c7b5a382-4165-4cc8-8de0-3f84a2283679	Il est brillant	4	fr_FR
d942b259-14b0-464d-a76e-b7f0b814a3b3	c7b5a382-4165-4cc8-8de0-3f84a2283679	Il ne vit que pour l'argent	5	fr_FR
65369dd2-788f-4cc7-83a9-0bb37d47d015	c7b5a382-4165-4cc8-8de0-3f84a2283679	Il s'est construit lui-même	6	fr_FR
0cad8983-589a-4fe8-9402-ab622eb8fedc	c7b5a382-4165-4cc8-8de0-3f84a2283679	Il est démagogue	7	fr_FR
9ac2563c-43b6-46dc-ae92-1cb5133807d1	c7b5a382-4165-4cc8-8de0-3f84a2283679	Il est le changement dont l'Amérique a besoin	8	fr_FR
df79fb06-e628-4e84-8a93-6edbd1fbbe50	bbe75fed-326d-414a-ba4b-132c65e35d52	Break dance	1	en_US
92482a4f-8a03-4510-892a-809ad6dff464	bbe75fed-326d-414a-ba4b-132c65e35d52	Surf	2	en_US
c06a5801-501e-4970-a970-4425c34df9f8	bbe75fed-326d-414a-ba4b-132c65e35d52	Skateboard	3	en_US
2219f2ae-939b-4fe4-9bc4-7a8211a3c7df	bbe75fed-326d-414a-ba4b-132c65e35d52	Climbing	4	en_US
a764df79-6cee-42b7-9cad-b43682de2c78	bbe75fed-326d-414a-ba4b-132c65e35d52	Breakdance	1	fr_FR
69e4e612-7c2a-41bb-9e2f-89d8b910ecf4	bbe75fed-326d-414a-ba4b-132c65e35d52	Surf	2	fr_FR
595fcb48-2837-45d8-be60-0ae2969eaa73	bbe75fed-326d-414a-ba4b-132c65e35d52	Skateboard	3	fr_FR
0ac8579b-b78b-4a3a-8f9c-100d929b7cff	bbe75fed-326d-414a-ba4b-132c65e35d52	Escalade	4	fr_FR
0d2cae59-01ed-4185-99db-4d18cf6209a5	14da454e-4996-4129-8432-e27cb1cf00c3	Yes and i do	1	en_US
e8abf4da-26fc-4b37-905a-c0a21fcbcef8	14da454e-4996-4129-8432-e27cb1cf00c3	I would like but it's difficult	2	en_US
ad1b59e1-7165-4f7c-bf59-43633b718529	14da454e-4996-4129-8432-e27cb1cf00c3	Why should I?	3	en_US
55480a90-d088-4dde-aa51-d03ca6e5f59f	14da454e-4996-4129-8432-e27cb1cf00c3	No, I do not want	4	en_US
53df1519-da6b-42f0-92bf-9aef436fe0dd	14da454e-4996-4129-8432-e27cb1cf00c3	Oui et je le fais	1	fr_FR
915a6f85-b9ec-4def-afb7-cd0c0c4a104e	14da454e-4996-4129-8432-e27cb1cf00c3	Je voudrais mais c'est difficile	2	fr_FR
487e4333-eb22-4d7d-acb2-e63723b03798	14da454e-4996-4129-8432-e27cb1cf00c3	Pourquoi devrai-je ?	3	fr_FR
36ba369b-5f93-4438-9072-b128720d8022	14da454e-4996-4129-8432-e27cb1cf00c3	Non, je ne veux pas	4	fr_FR
27e3667d-cce1-4f96-a3db-1e6024cf6dec	eb9d92e5-c125-4db0-9985-bc84f82bd357	It's bullshit	1	en_US
70255c6d-450f-4aa4-9e58-86a2456ec111	eb9d92e5-c125-4db0-9985-bc84f82bd357	Not at all	2	en_US
6194aa21-63bc-4a3c-8cbc-95fa6e1a15a5	eb9d92e5-c125-4db0-9985-bc84f82bd357	A little sometimes	3	en_US
b26fd4b9-3acb-429e-bc3c-a5650a4af081	eb9d92e5-c125-4db0-9985-bc84f82bd357	yes, but I will not change my habits	4	en_US
45bf7545-547c-4570-9a1b-a302180e18ac	eb9d92e5-c125-4db0-9985-bc84f82bd357	This is something that we cannot ignore	5	en_US
007da448-fdd2-4959-b815-6cb2c126c010	eb9d92e5-c125-4db0-9985-bc84f82bd357	Its very important	6	en_US
29f28e13-2dd0-4edd-9a8e-72da29418838	eb9d92e5-c125-4db0-9985-bc84f82bd357	Yes all the time	7	en_US
41caad07-2c26-4cbe-b458-95f9ffcca936	eb9d92e5-c125-4db0-9985-bc84f82bd357	C'est des conneries	1	fr_FR
618fa21c-450a-4480-80ea-ec8c3b4188f9	eb9d92e5-c125-4db0-9985-bc84f82bd357	Pas du tout	2	fr_FR
1f0cd95e-d39f-4ed2-9446-e3284a4dff1e	eb9d92e5-c125-4db0-9985-bc84f82bd357	Un peu parfois	3	fr_FR
6af9787a-ba10-4afe-8c40-e0f3030ecb9d	eb9d92e5-c125-4db0-9985-bc84f82bd357	oui, mais je ne vais pas changer mes habitudes	4	fr_FR
0d43deca-cf8e-43d5-8142-d6d4ceb8c35c	eb9d92e5-c125-4db0-9985-bc84f82bd357	Ceci est quelque chose que nous ne pouvons pas ignorer	5	fr_FR
bd5ec14a-ec47-4426-bd5e-f1ace5f97589	eb9d92e5-c125-4db0-9985-bc84f82bd357	C'est très important	6	fr_FR
5d900198-01f4-46c2-b41b-9e22c3077f9a	eb9d92e5-c125-4db0-9985-bc84f82bd357	Oui tout le temps	7	fr_FR
ab8561db-bbab-4908-87e7-fa5f014cffa8	30f70e5f-30f6-496e-9a4f-7da1bf533416	It is not possible	1	en_US
8eb5c48d-ad9d-4122-9137-c68a49b234be	30f70e5f-30f6-496e-9a4f-7da1bf533416	Striving to improve every day	2	en_US
5777a217-ac03-4f94-9d9f-a659f70297ce	30f70e5f-30f6-496e-9a4f-7da1bf533416	By launching movements on the Internet	3	en_US
8fbac34e-0a4d-4d5d-aa4c-2cfd51cd910f	30f70e5f-30f6-496e-9a4f-7da1bf533416	By investing in politics	4	en_US
2c37b079-c5dc-4edb-8cee-4809776a1971	30f70e5f-30f6-496e-9a4f-7da1bf533416	By removing the policy from our system	5	en_US
5481d22c-87af-4255-8351-2f1600664631	30f70e5f-30f6-496e-9a4f-7da1bf533416	Through better education in the world	6	en_US
c3bcc167-2849-4e91-9bf5-8175f4c3aba8	30f70e5f-30f6-496e-9a4f-7da1bf533416	By distributing wealth fairly around the world	7	en_US
d66b6670-f081-40b3-b7e9-ceb11223f9a3	30f70e5f-30f6-496e-9a4f-7da1bf533416	Praying to god	8	en_US
d03e5f29-2e6f-42da-9af2-f560bf4d11c0	30f70e5f-30f6-496e-9a4f-7da1bf533416	By making humans disappear	9	en_US
91fac8e9-7253-4cbb-801a-71eefe461658	30f70e5f-30f6-496e-9a4f-7da1bf533416	Other	10	en_US
783dc180-0f3d-4613-abcb-dbe2f7f47602	30f70e5f-30f6-496e-9a4f-7da1bf533416	Ce n'est pas possible	1	fr_FR
84f1970b-0d5d-4ef0-9143-2c083101adbf	30f70e5f-30f6-496e-9a4f-7da1bf533416	En tâchant de s'améliorer tous les jours	2	fr_FR
d24d537a-e0be-4937-b84a-3ee7ec01bdd8	30f70e5f-30f6-496e-9a4f-7da1bf533416	En lançant des mouvements sur Internet	3	fr_FR
494d98e3-0ff8-4478-9f5d-c4d2817bd5f4	30f70e5f-30f6-496e-9a4f-7da1bf533416	En s'investissant en politique	4	fr_FR
72dacd9b-491f-4b46-a798-f096561ad7ac	30f70e5f-30f6-496e-9a4f-7da1bf533416	En supprimant la politique de notre système	5	fr_FR
97dfef09-faad-45df-bb1d-3e97f34056d3	30f70e5f-30f6-496e-9a4f-7da1bf533416	Grâce à une meilleure éducation dans le monde	6	fr_FR
c36accb3-7b2b-4b6f-83dd-1457b149d619	30f70e5f-30f6-496e-9a4f-7da1bf533416	En répartissant la richesse équitablement dans le monde	7	fr_FR
18ba5995-7ce6-4c5e-b4e1-293c84118806	30f70e5f-30f6-496e-9a4f-7da1bf533416	En priant Dieu	8	fr_FR
684618b3-a8cb-4829-bf53-74d638c9f10b	30f70e5f-30f6-496e-9a4f-7da1bf533416	En faisant disparaître les humains	9	fr_FR
a07a4c14-2424-4ac5-8532-68b0a0e90fa3	30f70e5f-30f6-496e-9a4f-7da1bf533416	Autres	10	fr_FR
d1bdb953-a509-4bf1-ae88-ab7e763a27be	fb577695-639b-4820-ae9e-7adb78288346	Europe	1	en_US
a754d443-2613-4413-9d3e-93d6dfd546b9	fb577695-639b-4820-ae9e-7adb78288346	Japan	2	en_US
f644ce00-6acd-44ad-a549-9273481a78a0	fb577695-639b-4820-ae9e-7adb78288346	Russia	3	en_US
50b0b210-96a8-4bb5-8334-11985594b6e9	fb577695-639b-4820-ae9e-7adb78288346	Canada	4	en_US
8b198a20-47d6-466a-8f39-cc2125a09d3c	fb577695-639b-4820-ae9e-7adb78288346	USA	5	en_US
96444b55-3a43-41d4-9f95-e36110cf35f6	fb577695-639b-4820-ae9e-7adb78288346	South America	6	en_US
b8c6bd5b-5d7c-42ac-842f-37ce41168d80	fb577695-639b-4820-ae9e-7adb78288346	Middle East	7	en_US
263cafa2-d887-4e74-9717-4e982d094ad0	fb577695-639b-4820-ae9e-7adb78288346	Africa	8	en_US
61430557-0841-49c6-bb4b-a4dcdc3a947f	fb577695-639b-4820-ae9e-7adb78288346	China	9	en_US
820923f4-9187-4786-a247-d984bedd7c0d	fb577695-639b-4820-ae9e-7adb78288346	India	10	en_US
b4aec2c2-1a1a-4d40-9dcd-459db5e1c574	fb577695-639b-4820-ae9e-7adb78288346	Europe	1	fr_FR
3e242b04-edf0-4e19-870e-2b9928938d82	fb577695-639b-4820-ae9e-7adb78288346	Japon	2	fr_FR
5f4e7745-35b0-41a2-a54c-2e715c41df01	fb577695-639b-4820-ae9e-7adb78288346	Russie	3	fr_FR
3fda3be4-6973-41c2-bd48-319d276a3e72	fb577695-639b-4820-ae9e-7adb78288346	Canada	4	fr_FR
07ef4dd6-ef80-4cff-bbdd-6495064f5c50	fb577695-639b-4820-ae9e-7adb78288346	USA	5	fr_FR
b8a070c2-4dd8-4351-b469-322837256379	fb577695-639b-4820-ae9e-7adb78288346	Amérique du Sud	6	fr_FR
19f0eeec-6295-4eab-8b0c-4fbc21fb8e62	fb577695-639b-4820-ae9e-7adb78288346	Moyen Orient	7	fr_FR
e4c7b05a-b9be-47aa-bdaf-d858f25153ad	fb577695-639b-4820-ae9e-7adb78288346	Afrique	8	fr_FR
795a622b-f38f-4fe1-be9e-92ea0930a299	fb577695-639b-4820-ae9e-7adb78288346	Chine	9	fr_FR
a53763ea-aa62-4f82-a1e3-db362dd98c53	fb577695-639b-4820-ae9e-7adb78288346	Indes	10	fr_FR
477f98cf-5bd8-4531-bb19-a62defab678b	6cfb4386-5a43-4470-920c-62622c5fac22	Leaves distributed from the front	1	en_US
403ee956-90dd-4865-988a-2cf70d6ecc05	6cfb4386-5a43-4470-920c-62622c5fac22	Leaves distributed from behind	2	en_US
1934d06d-ee91-4b9a-81b7-0e8e8ee9c290	6cfb4386-5a43-4470-920c-62622c5fac22	No opinion	3	en_US
098870ac-a7b6-4519-886c-8ab4980cbe2a	6cfb4386-5a43-4470-920c-62622c5fac22	Les feuilles distribuées par l'avant	1	fr_FR
83e27339-7205-49c4-87c7-316c853ecfdf	6cfb4386-5a43-4470-920c-62622c5fac22	Les feuilles distribuées par l'arrière	2	fr_FR
d8876f62-6b5b-42da-bd41-736e914c7c0a	6cfb4386-5a43-4470-920c-62622c5fac22	Pas d'avis	3	fr_FR
8385b614-b297-4e25-8064-c694575c4fe2	e3136214-550f-4058-9855-487bac6b4dc9	Europe	1	en_US
c69294da-7e1e-4c40-a560-7f596bb85c55	e3136214-550f-4058-9855-487bac6b4dc9	Japan	2	en_US
b3dc13e6-63b5-458e-9690-187d3c2f9ab6	e3136214-550f-4058-9855-487bac6b4dc9	Russia	3	en_US
8caa77c6-b1d7-4d4e-81e9-c3521ff2c9c4	e3136214-550f-4058-9855-487bac6b4dc9	Canada	4	en_US
e67bb968-904d-41d2-bfc9-51c6f107f333	e3136214-550f-4058-9855-487bac6b4dc9	USA	5	en_US
78dc7f5b-e454-4337-9104-97f581611e89	e3136214-550f-4058-9855-487bac6b4dc9	South America	6	en_US
5a023a25-2406-4d7c-8f9b-259f34836a2e	e3136214-550f-4058-9855-487bac6b4dc9	Middle East	7	en_US
8cfa70a9-82e7-4645-8771-25ca3abf94de	e3136214-550f-4058-9855-487bac6b4dc9	Africa	8	en_US
64fd4fef-2b5c-4c54-9b58-a65044ad1fb9	e3136214-550f-4058-9855-487bac6b4dc9	China	9	en_US
44d4f319-84dd-4c00-9fe0-3d9c1019b114	e3136214-550f-4058-9855-487bac6b4dc9	India	10	en_US
b7c57a5a-6129-4dbd-aa95-4b66534f4faf	e3136214-550f-4058-9855-487bac6b4dc9	Europe	1	fr_FR
2baf40dd-3d67-446e-b6da-3f6e12f7346c	e3136214-550f-4058-9855-487bac6b4dc9	Japon	2	fr_FR
32ce566e-711c-499b-90c3-45a91c7c654d	e3136214-550f-4058-9855-487bac6b4dc9	Russie	3	fr_FR
339f35a5-079a-4b6c-b79c-08776e7ab2b5	e3136214-550f-4058-9855-487bac6b4dc9	Canada	4	fr_FR
91f230ec-daac-4a95-902a-fb908bd089a6	e3136214-550f-4058-9855-487bac6b4dc9	USA	5	fr_FR
35643412-e9c6-4eaa-99ad-87bd8f20bdd1	e3136214-550f-4058-9855-487bac6b4dc9	Amérique du Sud	6	fr_FR
7b0d5ed8-1f61-4bf1-8a4d-e29b0c649c83	e3136214-550f-4058-9855-487bac6b4dc9	Moyen Orient	7	fr_FR
fe9edd2e-1b09-4f66-b101-cb615d65a389	e3136214-550f-4058-9855-487bac6b4dc9	Afrique	8	fr_FR
99ee5be6-bf36-420e-992b-29d4da7d5e3e	e3136214-550f-4058-9855-487bac6b4dc9	Chine	9	fr_FR
f9eb5414-8ada-427e-ad0b-73dcc72ffaf4	e3136214-550f-4058-9855-487bac6b4dc9	Indes	10	fr_FR
336f41c8-f12c-42a7-ac94-366268716bf6	96c250ce-8755-4275-964f-06e67bd12966	Your career	1	en_US
2fe0d02f-5a3f-4797-bc5d-7e49192bd58a	96c250ce-8755-4275-964f-06e67bd12966	Your family	2	en_US
3c62112a-ec08-46e4-9264-f103f6daeef8	96c250ce-8755-4275-964f-06e67bd12966	A victory in sport	3	en_US
dee84ccd-92d8-48d2-acad-5e2b525b9738	96c250ce-8755-4275-964f-06e67bd12966	A construction project	4	en_US
62defa7a-414f-4f5e-84f2-b1e439c596fc	96c250ce-8755-4275-964f-06e67bd12966	You have overcome a difficult challenge	5	en_US
12b72d6a-7e45-461d-bcc0-6ac8e0887278	96c250ce-8755-4275-964f-06e67bd12966	You did something that most wouldn't do	6	en_US
4e0bf446-b6df-4afe-bee8-e41c0ef0c436	96c250ce-8755-4275-964f-06e67bd12966	A trip around the world	7	en_US
d1c94229-d39d-45ab-b6db-e33a110b6def	96c250ce-8755-4275-964f-06e67bd12966	Other	8	en_US
bd71a393-508f-4c1f-8b29-28a4a8283f86	96c250ce-8755-4275-964f-06e67bd12966	Votre carrière	1	fr_FR
29cbc138-81c4-471f-b954-23ebc519601f	96c250ce-8755-4275-964f-06e67bd12966	Votre famille	2	fr_FR
f968120b-4b44-43f5-8294-3ef9bfa4d24b	96c250ce-8755-4275-964f-06e67bd12966	Une victoire dans le sport	3	fr_FR
e60739c7-fdf3-4e47-abe6-e636a5664625	96c250ce-8755-4275-964f-06e67bd12966	Un projet de construction	4	fr_FR
fa7b4641-11b6-4bc4-9f45-567566b38da1	96c250ce-8755-4275-964f-06e67bd12966	Vous avez surmonté un challenge difficile	5	fr_FR
0623b0e1-7719-462c-9ee5-f0a82112a56b	96c250ce-8755-4275-964f-06e67bd12966	Vous avez fait quelque chose que la plupart ne ferait pas	6	fr_FR
261cd7cf-3a48-417b-ac8c-e0a223862079	96c250ce-8755-4275-964f-06e67bd12966	Un voyage autour du monde	7	fr_FR
455b33bf-1fb4-46b9-a61e-caf3777e7272	96c250ce-8755-4275-964f-06e67bd12966	Autres	8	fr_FR
2a3c8497-d557-484f-9276-e39384c1e164	91d56b0c-114c-48c0-864c-2b22548f68ba	Yes	1	en_US
5985db16-6155-435f-83b8-0f892a3d4ec0	91d56b0c-114c-48c0-864c-2b22548f68ba	No	2	en_US
aafbe6e3-60ac-4364-a6e6-687c45372558	91d56b0c-114c-48c0-864c-2b22548f68ba	No idea	3	en_US
87c97ba1-8667-4772-9846-b0425c1bb5e1	91d56b0c-114c-48c0-864c-2b22548f68ba	I was not born	4	en_US
f3839fac-0122-4859-9322-50c8b01ad71a	91d56b0c-114c-48c0-864c-2b22548f68ba	Oui	1	fr_FR
de21a696-6544-45e2-be9b-0c697c919543	91d56b0c-114c-48c0-864c-2b22548f68ba	Non	2	fr_FR
ab422968-8055-42d2-979d-6307223340dd	91d56b0c-114c-48c0-864c-2b22548f68ba	Aucune idée	3	fr_FR
d4754d3c-d1a3-4788-9055-ed2fa0a740ba	91d56b0c-114c-48c0-864c-2b22548f68ba	Je n'étais pas né	4	fr_FR
415b6c9d-3baf-43c0-8859-32763c4e99f1	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Time travel	1	en_US
5cd81a70-b44b-4872-b848-b0391bc16583	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Space travel	2	en_US
f39cf49d-436c-46b8-8a68-402ad97676e1	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Telekinesis	3	en_US
85548812-e49b-48f2-834f-da42882d5658	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Telepathy	4	en_US
c2a58f43-5e79-4ee6-8266-b294cceca366	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Steal	5	en_US
94b4b429-f8f9-47f1-af38-865e0ba427f7	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Super strength	6	en_US
e864ff65-08c1-43d8-afa4-ac324e98100b	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Invisibility	7	en_US
ba00e852-0346-4deb-b586-e8463eba541a	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Breath underwater	8	en_US
8b774bef-c717-469a-b223-7e2eb36fd5b3	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Steal the power of others	9	en_US
cbba3da9-c31c-4d26-91fe-2292ee4c12c4	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Make people fall in love with you	10	en_US
d6e8a96e-e3ec-4264-820a-481a54c28efc	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Voyage dans le temps	1	fr_FR
7617b211-6536-494d-ad31-c7440ff78964	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Voyage dans l'espace	2	fr_FR
7a1a1201-80fd-43eb-b248-6fd4b00543fb	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Télékinésie	3	fr_FR
8e993512-a445-457d-aead-b9936c01b7e2	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Télépathie	4	fr_FR
7b3b68ef-25b9-4800-96d2-cfd595e5b4f3	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Voler	5	fr_FR
b594d15c-205e-4f36-9f11-61335c299e89	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Super Force	6	fr_FR
697770b2-bb84-4528-982a-38e0ccdc56b7	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Invisibilité	7	fr_FR
58c5b2d9-cb22-4c76-999e-68f38de13034	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Respirer sous l' eau	8	fr_FR
b7b28263-a538-4866-b215-9fd7fab08c0f	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Voler le pouvoir des autres	9	fr_FR
4b1c489d-f4af-49ae-81ee-10c4b25dd7af	a2ca2e8a-f029-4981-9d83-4d10bb8145dc	Faire tomber les gens amoureux de vous	10	fr_FR
5da795db-0973-4d9e-9b4b-2ab10862c131	b9efa02f-0969-4802-95c0-8d587d84a468	Crazy	1	en_US
323bb6d7-3a69-40f3-a1cb-759ee7649b9e	b9efa02f-0969-4802-95c0-8d587d84a468	Clever	2	en_US
57af1957-504b-4344-8772-ca1febbea055	b9efa02f-0969-4802-95c0-8d587d84a468	Smart	3	en_US
91b7ff24-efae-42ee-9aa3-03b75143abd7	b9efa02f-0969-4802-95c0-8d587d84a468	Fou	1	fr_FR
9c15bf44-4e98-4575-956f-94da7e6af021	b9efa02f-0969-4802-95c0-8d587d84a468	Intelligent	2	fr_FR
4a38144b-290c-4745-a467-58d171186fef	b9efa02f-0969-4802-95c0-8d587d84a468	Malin	3	fr_FR
f67694a4-ebec-41d4-96a9-9c20e312afb7	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	Well	1	en_US
8f0bcc19-e3ac-4758-928e-3d0c9df934d9	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	Wrong	2	en_US
00790c72-b0ef-4157-a045-438efbcf909c	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	I do not know	3	en_US
3a7815e1-46d0-4259-9d43-b0c05c79dfa1	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	Bien	1	fr_FR
f6eabb33-41d3-404f-9a2a-f7e2723b867d	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	Mal	2	fr_FR
981d66d9-724c-4b6a-a839-5dc39f151003	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	Je ne sais pas	3	fr_FR
9eb63a12-d3c3-4903-9fc0-0a37118db4ee	3cb41358-d613-4e72-a9da-730ceb6dca91	Europe	1	en_US
6ef84467-d62a-4dd3-9788-f3513693b358	3cb41358-d613-4e72-a9da-730ceb6dca91	Japan	2	en_US
513e853f-c867-40e2-b987-d0f117600cba	3cb41358-d613-4e72-a9da-730ceb6dca91	Russia	3	en_US
0493b3e3-49f2-4e91-8494-a1d22b569fc1	3cb41358-d613-4e72-a9da-730ceb6dca91	Canada	4	en_US
47a8fc9f-247d-4d2b-8b75-24f3479279dd	3cb41358-d613-4e72-a9da-730ceb6dca91	USA	5	en_US
1e1c5b63-507c-4842-be45-b476e600a672	3cb41358-d613-4e72-a9da-730ceb6dca91	South America	6	en_US
5efffbe0-5dc3-479d-9bd0-45255ed9d3b4	3cb41358-d613-4e72-a9da-730ceb6dca91	Middle East	7	en_US
b3c713bd-5e86-466c-9065-51040f798346	3cb41358-d613-4e72-a9da-730ceb6dca91	Africa	8	en_US
70634072-d691-4ca3-8212-d83a7abf3665	3cb41358-d613-4e72-a9da-730ceb6dca91	China	9	en_US
169bbb45-c224-4a1d-8011-7ad196f06286	3cb41358-d613-4e72-a9da-730ceb6dca91	India	10	en_US
f5e12e28-10a7-48ce-ab39-95f56e1fcade	3cb41358-d613-4e72-a9da-730ceb6dca91	Europe	1	fr_FR
096e7c63-2780-43e7-b585-1dcd1b859360	3cb41358-d613-4e72-a9da-730ceb6dca91	Japon	2	fr_FR
9485c7a9-0a5f-4e0a-aebe-f797095fcfb3	3cb41358-d613-4e72-a9da-730ceb6dca91	Russie	3	fr_FR
cd8ae92e-4d32-40cb-8a0c-b0673d128cc8	3cb41358-d613-4e72-a9da-730ceb6dca91	Canada	4	fr_FR
40557ddc-e3f7-4ac3-a7f9-d0828437621f	3cb41358-d613-4e72-a9da-730ceb6dca91	USA	5	fr_FR
14360b0d-3eb1-43e1-adab-ff92c187b25d	3cb41358-d613-4e72-a9da-730ceb6dca91	Amérique du Sud	6	fr_FR
cdaa6e78-0f98-424c-8e1d-1e736ad8ddd3	3cb41358-d613-4e72-a9da-730ceb6dca91	Moyen Orient	7	fr_FR
24ab1798-1bb0-4605-817d-0a5401d5c9f7	3cb41358-d613-4e72-a9da-730ceb6dca91	Afrique	8	fr_FR
ae665a08-de39-47cb-821d-6ba8402d7ce4	3cb41358-d613-4e72-a9da-730ceb6dca91	Chine	9	fr_FR
cdbd3337-212f-4df6-8295-32d4f470df7c	3cb41358-d613-4e72-a9da-730ceb6dca91	Indes	10	fr_FR
60c852c7-dfef-4f3e-a5f9-3621d8a32125	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	Yes	1	en_US
b60c6732-9224-4038-a199-d24f87d006de	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	No	2	en_US
89bfd572-4e02-4a74-8608-cdebaf9e70ad	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	Only for the advancement of medicine	3	en_US
a73bf897-9ceb-4c3b-bda9-61ab62cee1ee	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	It depends on the animals used	4	en_US
4187125c-9da2-4c26-a7e3-9cc80f34a5d4	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	Oui	1	fr_FR
299286bb-b7d2-49ab-8500-9ca3db9c5fc9	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	Non	2	fr_FR
baec74cb-e792-4e24-8c3f-6918fa4f2ff0	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	Seulement pour le progrès de la mèdecine	3	fr_FR
73a63174-cc21-4640-bdab-7ed2bc80e214	c2340c96-2e1b-4353-ab78-b6d10c6e0c2e	Ca dépend des animaux utilisés	4	fr_FR
b54af4ab-8a14-4924-95d7-e49e2054f763	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	Impossible	1	en_US
d07c1aa6-4e54-4a03-927d-12a3f6229cda	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	No but I could	2	en_US
dc2e95a8-23fa-4121-915b-01dd6d60f551	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	For one evening	3	en_US
c75cfd26-0d61-4099-bf60-a4fe7aaea354	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	Several times	4	en_US
af7598d5-b04a-45ff-b79b-2885c2425389	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	Impossible	1	fr_FR
6e86d84c-97e5-4f4d-8e69-e250052e3224	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	Non mais je pourrais	2	fr_FR
17e07bbf-25da-4009-b8fa-1737157a7277	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	Pour un soir	3	fr_FR
c458fb70-2b7e-4efe-a381-6a90439f27b6	5dbd603e-d7bb-4fa6-8531-7cbfe7bb857a	Plusieurs fois	4	fr_FR
f7e77e87-5e99-49ee-9c16-e44f98896a65	0448146e-fac5-4cef-b010-37e819542b89	Only for me	1	en_US
c75da4c3-709f-443b-bfca-efbf50da74e6	0448146e-fac5-4cef-b010-37e819542b89	Mainly for myself	2	en_US
39b3d474-fadc-4a5b-9581-ac3a699ecf3b	0448146e-fac5-4cef-b010-37e819542b89	I'm trying to find the right balance	3	en_US
3c116126-9573-4d6d-97e1-ee6de3de74f2	0448146e-fac5-4cef-b010-37e819542b89	Mainly for others	4	en_US
59329ee2-b2e5-4b26-a0fb-866747360b5a	0448146e-fac5-4cef-b010-37e819542b89	Only for others	5	en_US
d18c0a54-8a74-4b11-bed1-7768a1555df1	0448146e-fac5-4cef-b010-37e819542b89	Uniquement pour moi	1	fr_FR
b39e796f-b410-4a24-a5bc-a2797e23dc8c	0448146e-fac5-4cef-b010-37e819542b89	Principalement pour moi-même	2	fr_FR
c3a50b07-a8ce-4350-8f18-fefc5e2723d6	0448146e-fac5-4cef-b010-37e819542b89	J'essaie de trouver le juste équilibre	3	fr_FR
42f72071-b1aa-4133-b488-77c33881c4d6	0448146e-fac5-4cef-b010-37e819542b89	Principalement pour les autres	4	fr_FR
8d07d29f-2bb7-4875-a7d8-1eca868924a7	0448146e-fac5-4cef-b010-37e819542b89	Seulement pour les autres	5	fr_FR
48c5781b-93a0-415b-af89-9cefac2cfbcf	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	When a character dies	1	en_US
2a5ed725-e6bc-4ca6-9cf1-3b27497b6299	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	When a character overcomes his weaknesses	2	en_US
c408fbcd-d31d-4802-855e-83f1b37d51b4	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	When a character makes a family member proud	3	en_US
6e6d1cd5-49eb-4a33-bd93-e2dbd6619ccf	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	When a character helps strangers	4	en_US
3fff1216-226d-485a-bd0c-c7d5fee10a37	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	When life is unfair with one of the characters	5	en_US
3109cf47-1691-429a-ba73-d1df22405c46	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	They lived happily and had many children.	6	en_US
e2c94939-5d57-497d-bc43-23090a4b7c25	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	When a character gives his life to save someone else's	7	en_US
5bf0d6a8-d162-4562-8b3e-9d2f436bf94e	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	When evil triumphs	8	en_US
7908bbfc-263b-4818-a6df-33fe1ec15844	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Other	9	en_US
205d7136-615e-4fac-876c-c339aba6dfd7	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Quand un personnage meurt	1	fr_FR
6fad6760-21c6-408d-bb21-f8cdc57bb586	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Quand un personnage surmonte ses faiblesses	2	fr_FR
722214f4-c70d-41a0-ae94-4f55bd80f3fb	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Quand un personnage rend fier un membre de sa famille	3	fr_FR
6c508fa2-98c2-401f-ace5-ae9c3507d4d2	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Quand un personnage aide des inconnus	4	fr_FR
1eb5cd14-35ae-4d26-9e37-33f02d668fce	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Quand la vie est injuste avec un des personnages	5	fr_FR
b4b41c36-d8fb-4b6d-8fcd-e402add4fe5f	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Ils vécurent heureux et eurent beaucoup d'enfants..	6	fr_FR
e46afe50-be3c-4c89-96fa-166c77e4e678	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Quand un personnage donne sa vie pour sauver celle d'un d'autre	7	fr_FR
959cafab-a547-441c-881e-85693db26227	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Quand le mal triomphe	8	fr_FR
34161c10-55d4-466d-9cf0-cfa25ca5adb2	e25d43d7-1ce8-4aec-bf25-d4a369b8befb	Autres	9	fr_FR
d2f48aac-d3ff-4382-84aa-58b8210310c9	59be806c-5aa4-4eb5-a130-e74f06dc486b	A very good friend	1	en_US
14269b74-1904-4fdd-9db8-6a0d0462d194	59be806c-5aa4-4eb5-a130-e74f06dc486b	Lots of friends	2	en_US
c0b2027a-2863-4643-a92d-facf7c6a8deb	59be806c-5aa4-4eb5-a130-e74f06dc486b	Un très bon ami	1	fr_FR
d69e583d-84a2-44b8-ac62-9d5546a29078	59be806c-5aa4-4eb5-a130-e74f06dc486b	Beaucoup de copains	2	fr_FR
ba32007c-0b6b-451b-9fca-14a455bb671a	368c76e7-957b-4495-a7a4-bfbb98eb3cca	In the dark	1	en_US
f54b518c-657d-4f39-a35e-242cb3e3ddbd	368c76e7-957b-4495-a7a4-bfbb98eb3cca	In the light	2	en_US
2fdf127b-3525-4c38-af35-32bae0d6477f	368c76e7-957b-4495-a7a4-bfbb98eb3cca	Dans le noir	1	fr_FR
dc5f0ee7-65fe-48f0-8aac-bc5af511accf	368c76e7-957b-4495-a7a4-bfbb98eb3cca	Dans la lumière	2	fr_FR
d3ce31ea-3d1f-41fa-993d-9f429932ebbf	2f4b98ce-7dad-4843-b76a-130e62d8635d	Never had the opportunity	1	en_US
86a2b99e-6878-4e4a-a616-8a0ba22291d4	2f4b98ce-7dad-4843-b76a-130e62d8635d	I had to do it	2	en_US
42548dce-86c2-4719-84d7-c7a11143f792	2f4b98ce-7dad-4843-b76a-130e62d8635d	Yes for fun	3	en_US
c3d90792-de39-4c7c-b690-4ef779d38817	2f4b98ce-7dad-4843-b76a-130e62d8635d	Often	4	en_US
9d744359-a2de-473e-9aeb-1f22cd10b714	2f4b98ce-7dad-4843-b76a-130e62d8635d	Jamais eu l'occasion	1	fr_FR
005b1865-e988-4994-ad1e-d0591e611d5f	2f4b98ce-7dad-4843-b76a-130e62d8635d	Je devais le faire	2	fr_FR
2574ff0f-49b1-41d5-aa3b-e13ceb21cefa	2f4b98ce-7dad-4843-b76a-130e62d8635d	Oui pour le plaisir	3	fr_FR
4f6d628e-8b93-40dd-a7a4-9cf1dddc3ac6	2f4b98ce-7dad-4843-b76a-130e62d8635d	Souvent	4	fr_FR
06572bd3-988e-4ebd-989e-7f5c75aa2030	dfa4ab04-3fd9-4439-a616-adfb76600112	On the back	1	en_US
a5d809b5-621f-442a-b87d-b7c4fadf9609	dfa4ab04-3fd9-4439-a616-adfb76600112	On the window	2	en_US
9c2ee253-08e0-4bc1-8fa5-29ce38a18fc3	dfa4ab04-3fd9-4439-a616-adfb76600112	On the side	3	en_US
0fbc0f59-5999-4514-8473-255205b124c7	dfa4ab04-3fd9-4439-a616-adfb76600112	Sur le dos	1	fr_FR
c9273c51-f877-4b5c-9a21-98d4f0b7e61d	dfa4ab04-3fd9-4439-a616-adfb76600112	Sur le ventre	2	fr_FR
6769746e-f773-418a-bda0-b49ee7e72239	dfa4ab04-3fd9-4439-a616-adfb76600112	Sur le côté	3	fr_FR
424ab3bb-ea59-4692-b510-bdf000f94bdd	94673a27-2762-485e-bdba-62b21956622c	Never	1	en_US
60656394-3df9-4665-af36-7c7e3dd41ecf	94673a27-2762-485e-bdba-62b21956622c	Only some described in the media	2	en_US
4154996e-b9fe-4e04-9a32-a5e244827376	94673a27-2762-485e-bdba-62b21956622c	I have not been comfortable with some people several times this year.	3	en_US
fa58738c-5ef8-44b5-9cf2-26ec9015b34a	94673a27-2762-485e-bdba-62b21956622c	I think sure people are more and more rare	4	en_US
602d62ab-4eec-444e-8925-365fafb0c6b0	94673a27-2762-485e-bdba-62b21956622c	Yes, quite often actually	5	en_US
54c689fb-6786-468b-91c0-902650b01012	94673a27-2762-485e-bdba-62b21956622c	So much so that I don't want to leave my house anymore	6	en_US
3f3b741e-31f1-492d-bfcc-7c76da24b556	94673a27-2762-485e-bdba-62b21956622c	Jamais	1	fr_FR
016655de-21dd-4ddd-8b34-cede5540b0c0	94673a27-2762-485e-bdba-62b21956622c	Seulement certains décrits dans les médias	2	fr_FR
2a033f18-401b-45b1-b84c-ee7015330ab4	94673a27-2762-485e-bdba-62b21956622c	Je n'ai pas été à l' aise avec certaines personnes plusieurs fois cette année	3	fr_FR
0b581998-f5cc-42a9-be55-1e30871969dd	94673a27-2762-485e-bdba-62b21956622c	Je pense que les gens sûrs sont de plus en plus rares	4	fr_FR
d89df034-9a28-45c7-b148-3925cf39b4cd	94673a27-2762-485e-bdba-62b21956622c	Oui, assez souvent en fait	5	fr_FR
c68a52ba-6bb6-4b3b-b6a1-3ce16822f607	94673a27-2762-485e-bdba-62b21956622c	Au point que je ne veuille plus quitter ma maison	6	fr_FR
4903c609-c0c5-4d07-9293-7a13143a4b99	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Never	1	en_US
8de2ff98-de79-4b98-ac6c-a58fa6b5f5e4	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Not on purpose	2	en_US
040419d6-b7f8-49d2-a50b-e1bf5cde1495	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	To try	3	en_US
1b0e19d8-afd1-4799-b5b6-ad9e2de96a96	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Regularly	4	en_US
c00851e9-df11-49b6-8a7a-98a2e17e4a72	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Jamais	1	fr_FR
9508a7c6-ab3b-47e6-9da6-5f0c7bece02b	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Sans faire Exprès	2	fr_FR
68f8f2fb-11fa-4a42-82a6-d428c1632824	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Pour essayer	3	fr_FR
fe08ded9-b967-4732-a569-a6347c35c48a	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	Régulièrement	4	fr_FR
44244e73-dbe7-4cf3-b8eb-c3cf908c4a19	50ea9d2a-5293-4466-a807-77daba03dc47	My vehicle	1	en_US
e79655e1-62ff-4966-b888-867f3407e90e	50ea9d2a-5293-4466-a807-77daba03dc47	My house	2	en_US
a64bc8e0-1e09-4aed-a977-e3439b66e866	50ea9d2a-5293-4466-a807-77daba03dc47	My jewelry and clothes	3	en_US
3def1942-9657-4661-b77a-dd6801e2a00d	50ea9d2a-5293-4466-a807-77daba03dc47	My computer	4	en_US
594c5d01-7e50-47fa-bd91-fa40b486d21e	50ea9d2a-5293-4466-a807-77daba03dc47	My bank account	5	en_US
06e53105-d60d-4f99-8e5e-1b06e79ff3b1	50ea9d2a-5293-4466-a807-77daba03dc47	My pets	6	en_US
c41e70c9-593d-4dd0-afcf-126289f61741	50ea9d2a-5293-4466-a807-77daba03dc47	My family and friends	7	en_US
297e81df-c9f3-4cc0-a05e-68568cbd7dae	50ea9d2a-5293-4466-a807-77daba03dc47	My photos and memories	8	en_US
6441efc4-9bac-4d88-8ee8-81965e361ff3	50ea9d2a-5293-4466-a807-77daba03dc47	Other	9	en_US
588f0661-8adb-441e-bde7-fcb312020ee1	50ea9d2a-5293-4466-a807-77daba03dc47	Mon véhicule	1	fr_FR
81ac64c6-c410-4ad2-b5d6-6e0de917fd61	50ea9d2a-5293-4466-a807-77daba03dc47	Ma Maison	2	fr_FR
c6068d92-5892-4d00-b497-1cde483b4b42	50ea9d2a-5293-4466-a807-77daba03dc47	Mes bijoux et vêtements	3	fr_FR
28df40d9-673f-4c2b-a31a-379041fcc392	50ea9d2a-5293-4466-a807-77daba03dc47	Mon ordinateur	4	fr_FR
1f782a9e-3ba6-4612-a498-78a6d6434efb	50ea9d2a-5293-4466-a807-77daba03dc47	Mon compte bancaire	5	fr_FR
b091581f-9d22-46d8-9cdc-0ca0680df19b	50ea9d2a-5293-4466-a807-77daba03dc47	Mes animaux de compagnie	6	fr_FR
8dbbd2a1-64d3-4db8-ae8d-da6594e7073a	50ea9d2a-5293-4466-a807-77daba03dc47	Ma famille et amis	7	fr_FR
d0039822-eb53-42c6-aad8-f45d3d1bf155	50ea9d2a-5293-4466-a807-77daba03dc47	Mes photos et souvenirs	8	fr_FR
21dfa145-609c-4321-97c0-15aa1ffb5a8e	50ea9d2a-5293-4466-a807-77daba03dc47	Autres	9	fr_FR
5afafafb-fc16-4866-b248-98b9c23afcf7	15162537-f2c5-42df-981a-42e97fa6dfc2	The interest of my country	1	en_US
d367801e-a5af-424c-9cba-74b68c32c9f6	15162537-f2c5-42df-981a-42e97fa6dfc2	My personal interest	2	en_US
b3f5749a-7fe0-4273-b02a-985f22aba9c8	15162537-f2c5-42df-981a-42e97fa6dfc2	L'intérêt de mon pays	1	fr_FR
46d931eb-127f-4325-bd1b-4d3a02d3ed97	15162537-f2c5-42df-981a-42e97fa6dfc2	Mon intérêt personnel	2	fr_FR
2c125a2d-09ef-407e-87c7-a66137a05a7f	249cb45e-b334-45c0-9624-e354e685a7ce	Yes Super !!	1	en_US
85015e66-a646-43eb-a358-0c44904dafa4	249cb45e-b334-45c0-9624-e354e685a7ce	so-so ....	2	en_US
e316ebca-6fd4-4f60-8177-09c3b2f0b304	249cb45e-b334-45c0-9624-e354e685a7ce	Oui, super !!	1	fr_FR
f7f0ea5f-1620-4d88-8ed0-917980b068ca	249cb45e-b334-45c0-9624-e354e685a7ce	bof, bof ....	2	fr_FR
38526ba3-ae3e-4da4-a5ea-7b716aa8f128	237c95a3-f446-44d1-b4b2-5b2dcd678db1	Of course	1	en_US
06cd9d76-df7d-4296-af3d-a71bbabc0b26	237c95a3-f446-44d1-b4b2-5b2dcd678db1	Only if I am called	2	en_US
106a6037-c74e-4619-ae53-fb3df803dbde	237c95a3-f446-44d1-b4b2-5b2dcd678db1	I will try to avoid	3	en_US
6d5315c8-af4a-4522-93c2-78afbd66cbb4	237c95a3-f446-44d1-b4b2-5b2dcd678db1	I still prefer to run away	4	en_US
1565e6a5-cde3-4a9c-a06b-8c6fcde8b0e1	237c95a3-f446-44d1-b4b2-5b2dcd678db1	Bien sûr	1	fr_FR
976d2189-9626-4eed-95bb-354cdae3785f	237c95a3-f446-44d1-b4b2-5b2dcd678db1	Uniquement si je suis appelé	2	fr_FR
59ca4642-7492-4c1d-819e-e5b670f76f3f	237c95a3-f446-44d1-b4b2-5b2dcd678db1	J'essaierai d'éviter	3	fr_FR
60f192ce-4b8c-40ab-b211-9add5bbfb077	237c95a3-f446-44d1-b4b2-5b2dcd678db1	Je préfère encore fuir	4	fr_FR
79dbe460-73a1-4974-8a89-a7c56e4cace0	68d7dea2-b7b1-4416-8c40-ce6260668110	No never	1	en_US
29f270da-c5c8-415f-a2a6-27547c13dc1e	68d7dea2-b7b1-4416-8c40-ce6260668110	Possible, as long as the two lovers do not meet other people	2	en_US
b52a84ad-3a9a-4af7-8429-53f8f657bf96	68d7dea2-b7b1-4416-8c40-ce6260668110	Yes, but it takes a lot of effort	3	en_US
f8dd69bc-8f41-49c0-a5bc-d6f1e7bd97e0	68d7dea2-b7b1-4416-8c40-ce6260668110	It depends on the strength of the love and not on the distance	4	en_US
768efea9-14e1-42b2-aab0-b6eb942804ea	68d7dea2-b7b1-4416-8c40-ce6260668110	Non jamais	1	fr_FR
f4d3811d-90e5-4b34-a696-a17b8efb221d	68d7dea2-b7b1-4416-8c40-ce6260668110	Possible, tant que les deux amoureux ne font pas d'autres rencontres	2	fr_FR
1f2ef747-8d76-4449-b61e-fb2666f23ef6	68d7dea2-b7b1-4416-8c40-ce6260668110	Oui, mais cela exige beaucoup d'efforts	3	fr_FR
6eecefa5-894a-458c-a480-7dfb13fdd082	68d7dea2-b7b1-4416-8c40-ce6260668110	Cela dépend de la force de l'amour et non de la distance	4	fr_FR
aa268ba6-aad0-4c72-9624-dd03d5e6582c	8da5755b-2a1d-41a0-b43c-c427c063748b	Never	1	en_US
31911b90-1c45-4ec5-9a94-b8436f24d32a	8da5755b-2a1d-41a0-b43c-c427c063748b	Sometimes	2	en_US
cd0deae2-499c-47af-be62-a6039567e688	8da5755b-2a1d-41a0-b43c-c427c063748b	Often	3	en_US
6bb8f5f4-355f-4ca5-b1df-91c4b159e0df	8da5755b-2a1d-41a0-b43c-c427c063748b	All the time	4	en_US
fdf3a64b-6787-4c61-aa92-37a60dcb9fc0	8da5755b-2a1d-41a0-b43c-c427c063748b	Jamais	1	fr_FR
dfdd660f-897c-4377-b0c0-70f56098093c	8da5755b-2a1d-41a0-b43c-c427c063748b	Parfois	2	fr_FR
da4ceabf-1c9e-402a-992c-57d9de005258	8da5755b-2a1d-41a0-b43c-c427c063748b	Souvent	3	fr_FR
b4b81f6f-3143-4f90-a741-a8e422c68e6a	8da5755b-2a1d-41a0-b43c-c427c063748b	Tout le temps	4	fr_FR
b19c7da0-aabe-489f-a50d-eca49e500789	0ce2cf9a-1de1-4018-860c-790a286728ed	Never	1	en_US
10cd04d4-94fb-4b80-89db-db89b0ee0f5e	0ce2cf9a-1de1-4018-860c-790a286728ed	Sometimes	2	en_US
52065309-7dbc-4adb-9e74-e23a75431b2e	0ce2cf9a-1de1-4018-860c-790a286728ed	Half the time	3	en_US
9e76fbf0-1860-4bf4-a660-d33815899f25	0ce2cf9a-1de1-4018-860c-790a286728ed	Most of the time	4	en_US
6042f5e8-72d7-4ae5-bc68-612a84e07c43	0ce2cf9a-1de1-4018-860c-790a286728ed	Yes	5	en_US
cb5fe9ef-d5b8-4db0-a21f-57e500c5068b	0ce2cf9a-1de1-4018-860c-790a286728ed	Jamais	1	fr_FR
b3cba082-1741-4d03-b94a-1e487e09ed28	0ce2cf9a-1de1-4018-860c-790a286728ed	Parfois	2	fr_FR
f22ad733-cd2c-41ec-8b18-19216996d182	0ce2cf9a-1de1-4018-860c-790a286728ed	La moitié du temps	3	fr_FR
455d22d4-fa2d-4f8c-92d5-32fee10f36fc	0ce2cf9a-1de1-4018-860c-790a286728ed	La plupart du temps	4	fr_FR
6cd503fc-7984-492a-b81d-9f9fef1ff4aa	0ce2cf9a-1de1-4018-860c-790a286728ed	Oui	5	fr_FR
38ac58c9-33b5-4c56-9302-6812b65e8fac	1edb1519-3ce7-4697-a27a-e495d69a02ca	Less than 10 years	1	en_US
ad866005-8e4d-44ef-bf9e-e9fcb1b18d0d	1edb1519-3ce7-4697-a27a-e495d69a02ca	oct-15	2	en_US
1232ce9b-1d66-4f06-96ab-787321a286c3	1edb1519-3ce7-4697-a27a-e495d69a02ca	16-20	3	en_US
f4ecfc4b-0580-4eec-8f8d-de458798b16f	1edb1519-3ce7-4697-a27a-e495d69a02ca	21-25	4	en_US
3479235a-e434-4e8d-8665-d51634342ab7	1edb1519-3ce7-4697-a27a-e495d69a02ca	26-30	5	en_US
3a01e9f0-441c-4163-84b7-7ae4133e2863	1edb1519-3ce7-4697-a27a-e495d69a02ca	30-40	6	en_US
efea6b1a-da9f-4fd7-80cd-281a900733b0	1edb1519-3ce7-4697-a27a-e495d69a02ca	Later	7	en_US
bc47e758-4593-47f2-891f-b17ac5db97f7	1edb1519-3ce7-4697-a27a-e495d69a02ca	Always not	8	en_US
9f0b0a24-3cea-493b-a71b-58d0bde9889e	1edb1519-3ce7-4697-a27a-e495d69a02ca	Moins de 10 ans	1	fr_FR
e5880254-9091-40ba-97ac-6a96ede6b3d2	1edb1519-3ce7-4697-a27a-e495d69a02ca	oct-15	2	fr_FR
ce279436-c34b-46c7-a4fe-dbc886d700fe	1edb1519-3ce7-4697-a27a-e495d69a02ca	16-20	3	fr_FR
df2284c1-4825-4362-8d8c-8e7ea9513822	1edb1519-3ce7-4697-a27a-e495d69a02ca	21-25	4	fr_FR
1812d31c-6adc-446f-82f4-b505bdec5008	1edb1519-3ce7-4697-a27a-e495d69a02ca	26-30	5	fr_FR
02f4ee21-f211-4970-b292-a3e4a4e105ee	1edb1519-3ce7-4697-a27a-e495d69a02ca	30-40	6	fr_FR
a7de10fd-eaea-4cdc-ae46-9fe888626fe2	1edb1519-3ce7-4697-a27a-e495d69a02ca	Plus tard	7	fr_FR
3eddd02d-8b7a-4218-aba6-e226d1859003	1edb1519-3ce7-4697-a27a-e495d69a02ca	Toujours pas	8	fr_FR
e6c38b46-9c16-4246-8b32-79ad01f4117a	d4595adf-9bb6-4939-bd0d-6419c58698bc	Tiny	1	en_US
78ffb09d-af71-4212-9124-218cae46e10f	d4595adf-9bb6-4939-bd0d-6419c58698bc	Small	2	en_US
8ae4255f-1c46-4b12-b21e-5072eb0d08a6	d4595adf-9bb6-4939-bd0d-6419c58698bc	Way	3	en_US
86b8541f-6d28-4e1a-b3d4-1a94f24f127d	d4595adf-9bb6-4939-bd0d-6419c58698bc	Tall	4	en_US
82eeb3ca-f1d8-4719-84d4-1288bc4e6f19	d4595adf-9bb6-4939-bd0d-6419c58698bc	Huge	5	en_US
5c5041fe-c32c-4388-b89f-6359197db281	d4595adf-9bb6-4939-bd0d-6419c58698bc	Minuscule	1	fr_FR
87e2488e-2455-409b-b5e9-9f4c11ebb007	d4595adf-9bb6-4939-bd0d-6419c58698bc	Petit	2	fr_FR
3923f2a8-e9dd-4d4e-8a29-34c21b061f0b	d4595adf-9bb6-4939-bd0d-6419c58698bc	Moyen	3	fr_FR
9a848f8e-a0ae-4653-943d-7ce9292f2a1c	d4595adf-9bb6-4939-bd0d-6419c58698bc	Grand	4	fr_FR
74289735-42bb-4352-866a-49d93371a679	d4595adf-9bb6-4939-bd0d-6419c58698bc	Énorme	5	fr_FR
6c359c3b-665d-4c1e-8f73-6383de114d2c	d09941cf-67f9-420d-bd40-4ecd9f8b6896	Several times a day	1	en_US
2d8462e5-e4d2-483a-a7f5-023be01eea06	d09941cf-67f9-420d-bd40-4ecd9f8b6896	Once a day	2	en_US
d02d2c1d-018c-4def-8f97-bd4819cb6473	d09941cf-67f9-420d-bd40-4ecd9f8b6896	Once every two days	3	en_US
7869e748-bfaf-433c-989d-a455b7ef42d4	d09941cf-67f9-420d-bd40-4ecd9f8b6896	Once a week	4	en_US
5b7aaaae-bc32-4da0-8401-35d0e693c384	d09941cf-67f9-420d-bd40-4ecd9f8b6896	Plusieurs fois par jour	1	fr_FR
e6cb354f-36f0-48be-ab5c-ed4dc729d3cf	d09941cf-67f9-420d-bd40-4ecd9f8b6896	Une fois par jour	2	fr_FR
ec3848d6-36e7-488d-b3b4-1eb672fa8b0e	d09941cf-67f9-420d-bd40-4ecd9f8b6896	Une fois tous les deux jours	3	fr_FR
3297f209-9b6b-48c9-acf3-2cc4b317a779	d09941cf-67f9-420d-bd40-4ecd9f8b6896	Une fois par semaine	4	fr_FR
a8043741-5fc4-4d44-9064-f0729ec18dd4	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Never	1	en_US
856df532-319c-48e4-bdbb-c3492d989e68	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Sometimes	2	en_US
df5d9a05-1b9d-4078-b169-6068342435d2	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Regularly	3	en_US
b5f8af03-4f52-48ae-a529-b41a988f91c9	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Often	4	en_US
d1349e91-3f43-4bd8-9d13-2d3ddcb25f00	69aa774b-9a1d-4cbe-a08e-56b36129ed62	All the time	5	en_US
f7c36e6c-46e4-4725-9caf-fc8ac86a7826	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Jamais	1	fr_FR
ae3eb167-5f64-46d8-96ec-49c648ad06c2	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Parfois	2	fr_FR
473917a6-e973-48d5-b109-2a17526a5252	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Régulièrement	3	fr_FR
2cc44d49-e320-4720-9419-322821c43078	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Souvent	4	fr_FR
0366dc32-8695-48cb-84bb-1d3f9ff57ba8	69aa774b-9a1d-4cbe-a08e-56b36129ed62	Tout le temps	5	fr_FR
2bb654ff-6d8d-41c0-a80a-cd5f8026690e	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Still not found	1	en_US
10e5687b-ed54-48ad-8b48-8650320d1b93	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Less than 5	2	en_US
0cd610e9-0bed-4c8a-a62c-a0e56ee5fb75	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Between 5 and 10	3	en_US
627b470b-5703-4827-bee3-6cd46c2efc8c	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Between 10 and 20	4	en_US
fedd823c-ebaf-4689-b653-cbab9cb367e7	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Over 20	5	en_US
537ca286-1652-448e-b9ea-d2ef45121cc7	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Toujours pas trouvé	1	fr_FR
d0cf76e8-c306-4e9b-b51d-7c7021c1a076	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Moins de 5	2	fr_FR
3ac35ea7-be19-471c-b608-9bddeb1ba228	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Entre 5 et 10	3	fr_FR
db7d8ad2-2f64-462a-8206-834be7279442	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Entre 10 et 20	4	fr_FR
4f63b084-eb82-472a-81a6-ba9f0ddb5053	305ee8f2-4436-439b-b727-8d2bd0e2bc80	Plus de 20	5	fr_FR
05d715b4-7e29-4dcc-9311-ccee33bd5893	2667ba62-fc35-4793-8cc0-f94c02985460	1 day	1	en_US
a82bed9c-3f28-444d-b118-3ce9cae3b929	2667ba62-fc35-4793-8cc0-f94c02985460	2 days	2	en_US
4e31f650-2593-4f8e-a009-ed2061983e21	2667ba62-fc35-4793-8cc0-f94c02985460	3 days	3	en_US
dbe2c9a6-95fa-43cf-ad83-c5337f1b13a6	2667ba62-fc35-4793-8cc0-f94c02985460	1 week	4	en_US
5962ce91-8f0d-402d-a25a-297a370699b8	2667ba62-fc35-4793-8cc0-f94c02985460	2 weeks	5	en_US
66f387c7-4029-4fea-8f27-33ab62d69da1	2667ba62-fc35-4793-8cc0-f94c02985460	1 month	6	en_US
38a0fdf4-1884-4aae-b939-d89f237074fd	2667ba62-fc35-4793-8cc0-f94c02985460	Several months	7	en_US
6ffcac1f-0b88-48bc-840b-7c1724a9ea4d	2667ba62-fc35-4793-8cc0-f94c02985460	What hair?	8	en_US
7a309f66-6289-4f96-beb8-d91fc77e3fe6	2667ba62-fc35-4793-8cc0-f94c02985460	1 jour	1	fr_FR
20f69821-3a40-457b-84ab-24352f69882d	2667ba62-fc35-4793-8cc0-f94c02985460	2 jours	2	fr_FR
c188f8ee-e009-4a67-9ee8-23fee09134cd	2667ba62-fc35-4793-8cc0-f94c02985460	3 jours	3	fr_FR
caa13704-8f66-47a5-96ab-58a94b1688ba	2667ba62-fc35-4793-8cc0-f94c02985460	1 semaine	4	fr_FR
7f165fd8-9cc1-4127-a15c-422d4fbd655b	2667ba62-fc35-4793-8cc0-f94c02985460	2 semaines	5	fr_FR
b2e18e73-936f-48aa-985c-537936aeaa57	2667ba62-fc35-4793-8cc0-f94c02985460	1 mois	6	fr_FR
246b9b9c-c2bf-44fd-a569-f4ade5669bc0	2667ba62-fc35-4793-8cc0-f94c02985460	Plusieurs mois	7	fr_FR
dd599866-4758-4f77-a095-de1e39e1cb6a	2667ba62-fc35-4793-8cc0-f94c02985460	Quels cheveux ?	8	fr_FR
623a0325-133f-4810-899d-fae9184531b9	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Never	1	en_US
13ae15a7-15c5-476f-90b0-ca263241bbb7	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Once	2	en_US
66e4a7dd-1872-40b6-8e85-b0baa2fd4b5b	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Regularly	3	en_US
36c2315c-6633-4ad1-97e3-f2741a900711	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Often	4	en_US
ed85d6dc-2b4b-4de9-81a8-5253317924c8	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	All the time	5	en_US
a825d824-f0fa-44dd-8f53-9f65aa8891bf	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Jamais	1	fr_FR
67cf2871-352f-45d1-829d-5585c49699f8	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Une fois	2	fr_FR
fd5a45c9-523a-46a9-bbaa-6f773fc910f4	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Régulièrement	3	fr_FR
bae1921a-cb26-4b25-bbb8-e78c7439f4ce	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Souvent	4	fr_FR
f109bcc7-f8e5-4849-8832-258086a688f7	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	Tout le temps	5	fr_FR
1270ad51-6635-430b-b85f-4df0ca73bd41	2e982a82-e9c1-497a-860a-fea6816c7220	Never	1	en_US
061c6a1d-26b9-4d89-a1cb-7460aae12a0e	2e982a82-e9c1-497a-860a-fea6816c7220	Sometimes	2	en_US
97ee5b11-d9ec-4ee3-b11d-16dd61ea1ac7	2e982a82-e9c1-497a-860a-fea6816c7220	Regularly	3	en_US
cfba1264-4090-44d3-b0a4-8ad62a9de0b6	2e982a82-e9c1-497a-860a-fea6816c7220	Often	4	en_US
cd186ea2-7d73-42fc-bda0-a919cf23545e	2e982a82-e9c1-497a-860a-fea6816c7220	All the time	5	en_US
dacc286d-7e6d-4187-930e-bc6005dfd0f2	2e982a82-e9c1-497a-860a-fea6816c7220	Jamais	1	fr_FR
7685fd99-9c90-4279-b425-320f99d52432	2e982a82-e9c1-497a-860a-fea6816c7220	Parfois	2	fr_FR
021f4dd1-8770-49b6-bc56-873b16acad90	2e982a82-e9c1-497a-860a-fea6816c7220	Régulièrement	3	fr_FR
57641d6d-9d12-4355-bc35-fe421f00b6ce	2e982a82-e9c1-497a-860a-fea6816c7220	Souvent	4	fr_FR
f9bcc497-e675-4ab9-ab4a-2abfe1098fbb	2e982a82-e9c1-497a-860a-fea6816c7220	Tout le temps	5	fr_FR
ad706858-1e44-4252-b97a-ca73324fa49e	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Never	1	en_US
4bed2636-0d98-4522-97fa-c50fb85d063e	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Rarely	2	en_US
b537b266-ac10-45ba-9d34-727ebbf823ec	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Occasionally	3	en_US
74c72ce6-5961-49d3-ab5d-5134f093b25f	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Often	4	en_US
420d0630-2fac-4435-81f8-4db737200cbf	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	All the time	5	en_US
022d19e9-31b9-41c9-8452-7a43f5da5ac9	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Jamais	1	fr_FR
79de82b3-4835-4373-99ac-3d2792ef1d72	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Rarement	2	fr_FR
f1067a38-474a-4b97-8967-d327375d7036	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Occasionnellement	3	fr_FR
99675eac-9867-49eb-a714-997ec8999892	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Souvent	4	fr_FR
2f53d86e-70ef-4237-9a1f-91add4ba26ec	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	Tout le temps	5	fr_FR
7739a010-b674-4efe-8540-a1f9bbe9d68f	51802256-84a5-490f-bca8-62796ea49a68	Never	1	en_US
8ecbfb4c-a041-4d64-9192-0ec037635f1f	51802256-84a5-490f-bca8-62796ea49a68	1 time per month	2	en_US
f6a5f9ae-abaf-4e0f-b35c-7f3fb991c98b	51802256-84a5-490f-bca8-62796ea49a68	1 time per week	3	en_US
a16241f7-d3c3-4b4f-95ad-e8db48eef578	51802256-84a5-490f-bca8-62796ea49a68	2 times per week	4	en_US
e9b8d1f8-1806-431a-bdc5-457feb84c808	51802256-84a5-490f-bca8-62796ea49a68	1 time per day	5	en_US
0d4be157-c93a-4db9-b714-fb431386230a	51802256-84a5-490f-bca8-62796ea49a68	2 times per day	6	en_US
b87422e3-3e5a-44d9-9cbb-9c2953a329f7	51802256-84a5-490f-bca8-62796ea49a68	As much as possible	7	en_US
b6a3b05f-60a3-468b-8f64-5143f36161bb	51802256-84a5-490f-bca8-62796ea49a68	Jamais	1	fr_FR
6ca98e39-13da-400f-b7fc-d699c83a6813	51802256-84a5-490f-bca8-62796ea49a68	1 fois par mois	2	fr_FR
c2f3899c-afdb-4e84-b616-59a16183c63b	51802256-84a5-490f-bca8-62796ea49a68	1 fois par semaine	3	fr_FR
77b3618d-3697-463f-8f87-1ffeb794d5da	51802256-84a5-490f-bca8-62796ea49a68	2 fois par semaine	4	fr_FR
7f897ec0-98a7-4912-8f12-9545c2db5c0a	51802256-84a5-490f-bca8-62796ea49a68	1 fois par jour	5	fr_FR
030dc713-838c-49d6-87e1-ea63dff27b3a	51802256-84a5-490f-bca8-62796ea49a68	2 fois par jour	6	fr_FR
d6e81c29-c072-47da-a9b9-b0c8fcdd83ec	51802256-84a5-490f-bca8-62796ea49a68	Autant que possible	7	fr_FR
f6e0eeda-bd1e-4a34-b5ac-3be1df964ff4	719f6e37-2b19-4771-b1fc-1ddf5a903329	1 more	1	en_US
93885e45-3f9e-4da9-87c4-097e5acea56f	719f6e37-2b19-4771-b1fc-1ddf5a903329	5 more	2	en_US
9419022d-d50a-46e4-8481-251bcb733421	719f6e37-2b19-4771-b1fc-1ddf5a903329	10 more	3	en_US
04c49f2c-76f5-470e-b493-f623c9853e8c	719f6e37-2b19-4771-b1fc-1ddf5a903329	25 more	4	en_US
91adeae6-9a91-4002-ba62-b8ab40e69418	719f6e37-2b19-4771-b1fc-1ddf5a903329	50 more	5	en_US
592a37bb-70bc-49d2-8b6d-bffcce8b36b3	719f6e37-2b19-4771-b1fc-1ddf5a903329	100 more	6	en_US
260c61ef-af57-42de-a50a-7be9cb5be915	719f6e37-2b19-4771-b1fc-1ddf5a903329	500 more	7	en_US
25a7c0a6-a4e6-4e30-a422-16732a26a9b8	719f6e37-2b19-4771-b1fc-1ddf5a903329	1000 more	8	en_US
f094619a-15bd-445e-bcce-63660e620cb1	719f6e37-2b19-4771-b1fc-1ddf5a903329	1 de plus	1	fr_FR
80252cd3-0ea9-4629-b95c-80b44a8555c0	719f6e37-2b19-4771-b1fc-1ddf5a903329	5 de plus	2	fr_FR
7f26116a-c975-498b-9a84-d3eb18395eb2	719f6e37-2b19-4771-b1fc-1ddf5a903329	10 de plus	3	fr_FR
4b717566-de6d-4fda-b125-3badb9a34d1b	719f6e37-2b19-4771-b1fc-1ddf5a903329	25 de plus	4	fr_FR
0093593c-e9bc-42d3-b3e7-7cf4c85c71df	719f6e37-2b19-4771-b1fc-1ddf5a903329	50 de plus	5	fr_FR
fe874a34-133e-44aa-a935-3a36f302eb3f	719f6e37-2b19-4771-b1fc-1ddf5a903329	100 de plus	6	fr_FR
98544184-ec34-4600-b463-70cde0cf19d7	719f6e37-2b19-4771-b1fc-1ddf5a903329	500 de plus	7	fr_FR
a3520f62-d60f-4ccc-974e-db76c7b92b18	719f6e37-2b19-4771-b1fc-1ddf5a903329	1000 de plus	8	fr_FR
07b669e6-b2db-4db6-9bbd-f05e0c30f99c	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Never	1	en_US
6947fc91-fbce-4692-bb78-31697f59a2ea	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Once	2	en_US
ee6d057a-1a6a-4081-9418-7e568e3c847f	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Regularly	3	en_US
4330c063-9fa1-4244-8478-1f956a9650c7	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Often	4	en_US
690ce632-09bd-4cbf-95d4-27220e59689c	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	All the time	5	en_US
13080f21-50ac-4f35-9289-d12fcfc76379	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Jamais	1	fr_FR
6cd94b35-2c5b-49b2-aeb6-e6bf9dc27c4a	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Une fois	2	fr_FR
1ad5cc26-5ece-45bf-895e-5b9fdfb7b807	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Régulièrement	3	fr_FR
04084954-e51a-4398-b4ed-2b7647114915	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Souvent	4	fr_FR
06562e94-259d-4fde-b49a-00f69fb22320	5cc4e91f-67a5-4faa-967d-a5b6fabd56aa	Tout le temps	5	fr_FR
c32100ae-2509-4ede-a655-068f589fc3bb	4ad466de-c926-43b6-88c6-d2578d8fc4fc	Free	1	en_US
fc760906-53d6-4b0b-98b0-6c3f659f89d2	4ad466de-c926-43b6-88c6-d2578d8fc4fc	100	2	en_US
a71540cc-ba5a-4492-b08f-6730cf272ac1	4ad466de-c926-43b6-88c6-d2578d8fc4fc	200	3	en_US
8c091ab7-b84b-4706-819a-452caa08b00b	4ad466de-c926-43b6-88c6-d2578d8fc4fc	500	4	en_US
d0c8fd7c-c9f6-4aa2-9cb9-174d3a21c4eb	4ad466de-c926-43b6-88c6-d2578d8fc4fc	1000	5	en_US
51c15dc4-59a4-4d42-adee-508fb6758591	4ad466de-c926-43b6-88c6-d2578d8fc4fc	10	6	en_US
57c1a963-5909-4113-85b6-6221c4482dd9	4ad466de-c926-43b6-88c6-d2578d8fc4fc	50	7	en_US
db304945-32f2-411c-8707-2e38454f7a4a	4ad466de-c926-43b6-88c6-d2578d8fc4fc	100	8	en_US
2e84d342-f939-4abc-a44f-9f378e75cb60	4ad466de-c926-43b6-88c6-d2578d8fc4fc	1,000,000	9	en_US
b19e0e3f-54cf-49da-8ca6-dd4ae3693cd9	4ad466de-c926-43b6-88c6-d2578d8fc4fc	No way!	10	en_US
09201f81-fb6d-4efb-964a-995e5e8907c8	4ad466de-c926-43b6-88c6-d2578d8fc4fc	Gratuitement	1	fr_FR
74e76140-6268-4e8e-848e-c6758e130f8d	4ad466de-c926-43b6-88c6-d2578d8fc4fc	100	2	fr_FR
d4d95391-a0dc-4c55-8985-43ef31a1a61f	4ad466de-c926-43b6-88c6-d2578d8fc4fc	200	3	fr_FR
395d241f-0327-4a29-bfdb-74a8cb00fe58	4ad466de-c926-43b6-88c6-d2578d8fc4fc	500	4	fr_FR
b9676d88-c9d9-4e53-8148-81e9eac78f91	4ad466de-c926-43b6-88c6-d2578d8fc4fc	1000	5	fr_FR
797c8bd8-143e-4c81-abee-3a93d87ef79f	4ad466de-c926-43b6-88c6-d2578d8fc4fc	10000	6	fr_FR
42d9c14a-3122-4ddf-83fe-e5d5de7c2582	4ad466de-c926-43b6-88c6-d2578d8fc4fc	50000	7	fr_FR
300d5905-024c-4a8a-9106-2736c3d3bb3c	4ad466de-c926-43b6-88c6-d2578d8fc4fc	100000	8	fr_FR
6a74a5ef-9a2d-4bf8-ae0d-de576be5bd37	4ad466de-c926-43b6-88c6-d2578d8fc4fc	1000000	9	fr_FR
bcbb74f1-2fd6-44d7-b5bd-fdbf8327c57d	4ad466de-c926-43b6-88c6-d2578d8fc4fc	Jamais de la vie!	10	fr_FR
f17e1622-927d-4796-9556-d0815074c7af	8398637b-b892-4659-b018-9750954d46b1	Never	1	en_US
e29c9ab7-5232-4f70-8e5c-b8d0ec7bddd8	8398637b-b892-4659-b018-9750954d46b1	Sometimes	2	en_US
b018665b-68b6-4b40-b9b4-a37ea6dd1295	8398637b-b892-4659-b018-9750954d46b1	Half the time	3	en_US
0e718185-7c7d-41e2-b09d-1a52054fe626	8398637b-b892-4659-b018-9750954d46b1	Often	4	en_US
cf19ebb8-6f8d-4153-a0c7-3a2249e3c40f	8398637b-b892-4659-b018-9750954d46b1	All the time	5	en_US
26c04981-ea3c-40be-9985-37a7116b4415	8398637b-b892-4659-b018-9750954d46b1	Jamais	1	fr_FR
5fffa6e6-8dce-40ad-8933-c34e3a9e780f	8398637b-b892-4659-b018-9750954d46b1	Parfois	2	fr_FR
0df56175-0c07-47e1-b531-dcd87ff699c5	8398637b-b892-4659-b018-9750954d46b1	La moitié du temps	3	fr_FR
8771585a-8b4a-419f-9055-e79cdf6543b7	8398637b-b892-4659-b018-9750954d46b1	Souvent	4	fr_FR
58d5a98e-b754-4698-adef-8718cf8035e5	8398637b-b892-4659-b018-9750954d46b1	Tout le temps	5	fr_FR
90ef32fc-a92e-499f-898d-a39ba75ce65c	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Never	1	en_US
dc90f40b-8d98-4c12-b36d-a7d7b4c99e21	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Sometimes	2	en_US
4ab93efc-452a-479c-ac1e-5413e2572752	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Regularly	3	en_US
3eb78eee-f8e5-4149-8693-7a4ef2d0850d	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Very often	4	en_US
76be096d-becd-490d-a3a3-d28c57609c96	1a6d4bd9-026a-4e21-821c-1eafd60695b7	All the time	5	en_US
8ae4d734-857c-4322-bc9a-577d395ea067	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Jamais	1	fr_FR
8e18b317-ca90-4339-b220-334e2d350dc6	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Parfois	2	fr_FR
535eedf6-7f5e-4fe0-9209-276a08474c48	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Régulièrement	3	fr_FR
3bd7dc4a-6bda-4dc3-9f1d-97172555ba81	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Très souvent	4	fr_FR
8034859e-d442-463c-8eb5-66a15e4bebcf	1a6d4bd9-026a-4e21-821c-1eafd60695b7	Tout le temps	5	fr_FR
33049de7-d8a0-4e0c-9510-3ad1d951e2c6	bb6e160f-f95c-4410-995d-577d29c98329	Never	1	en_US
137ae91e-1b4e-481e-9314-521ab7817f2c	bb6e160f-f95c-4410-995d-577d29c98329	Once	2	en_US
8a02ee3f-53da-4b18-8023-e3040e177a10	bb6e160f-f95c-4410-995d-577d29c98329	Several times	3	en_US
dfc74eeb-283e-4279-8465-dbf00ce88027	bb6e160f-f95c-4410-995d-577d29c98329	Too often	4	en_US
f7750194-7f06-41e4-922f-f8003ab50d96	bb6e160f-f95c-4410-995d-577d29c98329	For life	5	en_US
83ccd24e-b4aa-410e-8514-68b3a7a53b51	bb6e160f-f95c-4410-995d-577d29c98329	Jamais	1	fr_FR
a8aefc3e-4fbf-4bd5-80d9-48d98c9d8e28	bb6e160f-f95c-4410-995d-577d29c98329	Une fois	2	fr_FR
3e3e40e7-223b-4052-9cf7-4ddddcef3631	bb6e160f-f95c-4410-995d-577d29c98329	Plusieurs fois	3	fr_FR
de1b860e-bc0f-4ea7-8476-31f85d89359b	bb6e160f-f95c-4410-995d-577d29c98329	Trop souvent	4	fr_FR
d9d3f604-f8ff-45a7-955e-49347310bfe6	bb6e160f-f95c-4410-995d-577d29c98329	A vie	5	fr_FR
a3cb5a22-bff1-4fdb-ad50-896d551bb09e	edac60c8-d2f2-497d-8d82-c46f1368fe83	Never	1	en_US
a06d9932-328b-47cf-af39-951fe1848ad3	edac60c8-d2f2-497d-8d82-c46f1368fe83	Sometimes	2	en_US
3468ded4-b8c1-444a-86a8-3ec87e244090	edac60c8-d2f2-497d-8d82-c46f1368fe83	Regularly	3	en_US
b9a189d1-0519-4787-b78e-63bc7d8cefd4	edac60c8-d2f2-497d-8d82-c46f1368fe83	Often	4	en_US
13a09593-6ed5-4fde-a23f-fde2669098c4	edac60c8-d2f2-497d-8d82-c46f1368fe83	All the time	5	en_US
c418962f-4143-4846-b8bb-5a7424ba884f	edac60c8-d2f2-497d-8d82-c46f1368fe83	Jamais	1	fr_FR
c0492436-2bc9-4ac6-8818-72675d9dd404	edac60c8-d2f2-497d-8d82-c46f1368fe83	Parfois	2	fr_FR
28cab9c6-d501-4bff-b20b-af31ac532817	edac60c8-d2f2-497d-8d82-c46f1368fe83	Régulièrement	3	fr_FR
28a3ef17-8efa-4502-9d0d-0914a56fedad	edac60c8-d2f2-497d-8d82-c46f1368fe83	Souvent	4	fr_FR
8786a754-eb2d-4974-8b3d-7dbfd61c537f	edac60c8-d2f2-497d-8d82-c46f1368fe83	Tout le temps	5	fr_FR
73689afb-f7f4-4ad0-8002-c40c7f45f2d4	122ac324-09f9-419a-9e4e-c96b56bf183a	In 1 year	1	en_US
36713e62-13df-4e14-9a9e-5bfa7f2bf413	122ac324-09f9-419a-9e4e-c96b56bf183a	In 5 years	2	en_US
c08c87f2-92e3-4374-86b7-1b1086195005	122ac324-09f9-419a-9e4e-c96b56bf183a	In 10 years	3	en_US
d1799526-87b7-47f2-857d-a223bf4358cb	122ac324-09f9-419a-9e4e-c96b56bf183a	In 20 years	4	en_US
e245554e-ef1f-49a7-a072-971aa2b1896e	122ac324-09f9-419a-9e4e-c96b56bf183a	In 50 years	5	en_US
32e79ec5-7e5e-4dcf-afdc-4e3b6173221f	122ac324-09f9-419a-9e4e-c96b56bf183a	In 100 years	6	en_US
e0f4e438-119f-4ff2-a560-86abd4873979	122ac324-09f9-419a-9e4e-c96b56bf183a	Never	7	en_US
91b75ced-f556-4bb2-81c6-2908fe1ee85d	122ac324-09f9-419a-9e4e-c96b56bf183a	Dans 1 an	1	fr_FR
e2a451be-e6c7-477d-b5e9-832e432fc422	122ac324-09f9-419a-9e4e-c96b56bf183a	Dans 5 ans	2	fr_FR
7357fc46-938b-4b1a-98c6-5e836e538d6f	122ac324-09f9-419a-9e4e-c96b56bf183a	Dans 10 ans	3	fr_FR
aa594430-d666-4e1d-b3c4-1f1372bbc331	122ac324-09f9-419a-9e4e-c96b56bf183a	Dans 20 ans	4	fr_FR
cb51c63b-a12d-4306-a255-063211b478ed	122ac324-09f9-419a-9e4e-c96b56bf183a	Dans 50 ans	5	fr_FR
8fecb0b4-713e-4b71-b53e-6570cab4c28b	122ac324-09f9-419a-9e4e-c96b56bf183a	Dans 100 ans	6	fr_FR
301905a0-9e34-44b4-8a04-a4664befa8d6	122ac324-09f9-419a-9e4e-c96b56bf183a	Jamais	7	fr_FR
4dd79f9b-87e2-4e92-993b-ace46b01ffed	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Less than 5 years	1	en_US
3d3da408-3de0-48cd-9178-7cfe1ddc4e73	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Between 6 and 10 years	2	en_US
e8159a8f-9bf9-445b-9dd2-2e9f64ceee09	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Between 11 and 15 years old	3	en_US
64276b3e-5c95-4709-967c-73777912dd35	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Between 16 and 20 years old	4	en_US
ea93a6da-3145-4ebb-b1ae-47d0e74d6138	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Between 21 and 30 years old	5	en_US
7ef7580f-7ab5-4e6b-8af8-6d753df5fbb6	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Over 30 years	6	en_US
87ca77fb-b754-4b1a-a963-1f24d9170a4d	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Moins de 5 ans	1	fr_FR
46d249d2-ad25-4d6f-bd6b-1fab3b26de34	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Entre 6 et 10 ans	2	fr_FR
4a0daf66-dd10-4811-8b17-c9e494e16ef4	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Entre 11 et 15 ans	3	fr_FR
64b53794-11c6-4681-8f0a-1a1d8b6b6eb5	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Entre 16 et 20 ans	4	fr_FR
9cfef587-ad39-4e51-9eff-312f511e4217	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Entre 21 et 30 ans	5	fr_FR
c0428dee-7e8e-4490-a481-166f3b4c16de	c215ba8c-7f03-4623-8a29-1271ca7b0c79	Plus de 30 ans	6	fr_FR
038d12bc-73cf-41bf-8e20-463183f965eb	ca21de48-a73d-4782-bb97-69324102a4c8	Never	1	en_US
36c28538-f487-4c15-9700-96374fb85eac	ca21de48-a73d-4782-bb97-69324102a4c8	Once	2	en_US
48f4f9c0-76aa-4329-88c9-1d8ce380469b	ca21de48-a73d-4782-bb97-69324102a4c8	Regularly	3	en_US
7cbe76a2-520a-44fc-bb88-4eaf6258211f	ca21de48-a73d-4782-bb97-69324102a4c8	Often	4	en_US
ec72ca72-a759-4764-922a-3199cee40139	ca21de48-a73d-4782-bb97-69324102a4c8	All the time	5	en_US
d2147c88-c793-42b7-93c5-6c002a1a05f0	ca21de48-a73d-4782-bb97-69324102a4c8	Jamais	1	fr_FR
9888a68b-3290-485a-99c4-bd16afb224c2	ca21de48-a73d-4782-bb97-69324102a4c8	Une fois	2	fr_FR
8c6706aa-7f0a-45a7-8e0e-03ba657121e3	ca21de48-a73d-4782-bb97-69324102a4c8	Régulièrement	3	fr_FR
fdad8d75-fec5-4f7c-a698-3eb1ac3986e0	ca21de48-a73d-4782-bb97-69324102a4c8	Souvent	4	fr_FR
548bf37f-67cb-45a7-8082-631c7f98d80d	ca21de48-a73d-4782-bb97-69324102a4c8	Tout le temps	5	fr_FR
ea5307bf-0f18-4c1a-b293-bc9c839e1101	655200b4-a668-4070-acb5-6d9c2942db5e	Not at all	1	en_US
c9c7c76c-e1ca-4a8c-a417-d4fcb00a5c5c	655200b4-a668-4070-acb5-6d9c2942db5e	A little	2	en_US
7e3c0185-c08e-45df-99ce-7a375a3e1ddc	655200b4-a668-4070-acb5-6d9c2942db5e	Many	3	en_US
045cd6ff-5778-429d-ab79-17e9598024a4	655200b4-a668-4070-acb5-6d9c2942db5e	All the time	4	en_US
38d737f6-9378-46ca-8373-33473d22b324	655200b4-a668-4070-acb5-6d9c2942db5e	Pas du tout	1	fr_FR
f9d9a2db-38cd-40d7-83fd-9b00aadff484	655200b4-a668-4070-acb5-6d9c2942db5e	Un peu	2	fr_FR
e5c11c3d-eb9d-4f21-b774-5761646c22bf	655200b4-a668-4070-acb5-6d9c2942db5e	Beaucoup	3	fr_FR
5f57530e-3743-4425-8cb9-3564e81ec8b5	655200b4-a668-4070-acb5-6d9c2942db5e	Tout le temps	4	fr_FR
7604615e-03ca-4d06-8a96-8fcfc119d2e9	5a965921-82fe-436d-bfcd-30bbb52ed79b	5 euros or less	1	en_US
0aa38083-9ffb-49f3-8a4a-0799508b0e4f	5a965921-82fe-436d-bfcd-30bbb52ed79b	Between 6 and 10 euros	2	en_US
fd6c76fe-03d4-4b30-8f75-1aeedde2d82c	5a965921-82fe-436d-bfcd-30bbb52ed79b	Between 11 and 20 euros	3	en_US
d33fc394-9347-4576-aff5-e40384ee1b63	5a965921-82fe-436d-bfcd-30bbb52ed79b	Between 21 and 50 euros	4	en_US
07be3193-cd1d-4f4c-8007-a48d9c43e1b3	5a965921-82fe-436d-bfcd-30bbb52ed79b	Between 51 and 100 euros	5	en_US
e7f2933a-52f5-4a2a-ad94-baece29dc3ef	5a965921-82fe-436d-bfcd-30bbb52ed79b	Between 101 and 200 euros	6	en_US
86214052-a9d7-453e-94c3-510cac784204	5a965921-82fe-436d-bfcd-30bbb52ed79b	Between 201 and 1000 euros	7	en_US
9bfc2927-a205-427e-8ff6-4d65599f0d8c	5a965921-82fe-436d-bfcd-30bbb52ed79b	More than 1000 euros	8	en_US
ebc971af-e29f-4dac-a087-2f4bfa5f36ff	5a965921-82fe-436d-bfcd-30bbb52ed79b	5 euros ou moins	1	fr_FR
e3a767e9-ead3-4610-85de-e5faeb4af160	5a965921-82fe-436d-bfcd-30bbb52ed79b	Entre 6 et 10 euros	2	fr_FR
377f4e21-750c-4132-8cb4-b8eade29130f	5a965921-82fe-436d-bfcd-30bbb52ed79b	Entre 11 et 20 euros	3	fr_FR
0c9e959a-b195-459a-97e8-353d17609a1c	5a965921-82fe-436d-bfcd-30bbb52ed79b	Entre 21 et 50 euros	4	fr_FR
c45ce87c-243f-4a15-a4cf-cc92abaefc05	5a965921-82fe-436d-bfcd-30bbb52ed79b	Entre 51 et 100 euros	5	fr_FR
cb1080f6-a5a2-4db7-a1b7-e49fc576fc90	5a965921-82fe-436d-bfcd-30bbb52ed79b	Entre 101 et 200 euros	6	fr_FR
33fd48a1-1901-48ad-b7fb-53777c118424	5a965921-82fe-436d-bfcd-30bbb52ed79b	Entre 201 et 1000 euros	7	fr_FR
42098e14-b098-4e3a-a582-9c81d33eb855	5a965921-82fe-436d-bfcd-30bbb52ed79b	Plus de 1000 euros	8	fr_FR
8ce96fe2-74ba-4b1f-8570-3e39362c8665	da0c024c-eee2-42a0-ba36-2e31cd731628	Not at all	1	en_US
5f94f5c7-ddac-4c9e-b067-aa998a6b96c7	da0c024c-eee2-42a0-ba36-2e31cd731628	A little	2	en_US
df24b24f-1f2d-448e-8581-70c1be94181d	da0c024c-eee2-42a0-ba36-2e31cd731628	Many	3	en_US
d8cb3460-fe0b-43c7-a51a-e6aeff384b3e	da0c024c-eee2-42a0-ba36-2e31cd731628	I never say no	4	en_US
0e27a01c-b528-4eac-bbcf-eb4cd86bcc9a	da0c024c-eee2-42a0-ba36-2e31cd731628	Pas du tout	1	fr_FR
995ec033-4a81-430e-9fa9-251f1506876d	da0c024c-eee2-42a0-ba36-2e31cd731628	Un peu	2	fr_FR
6ec82083-ff54-4f81-8518-ea357ec92f06	da0c024c-eee2-42a0-ba36-2e31cd731628	Beaucoup	3	fr_FR
2a336d7e-3da4-4d23-8698-d804161458fd	da0c024c-eee2-42a0-ba36-2e31cd731628	Je ne dis jamais non	4	fr_FR
c4d9c843-e628-4407-822a-358505de3c99	4afea674-e0f3-4cc2-8024-5715b8a69434	Never	1	en_US
a7ce085d-9ae1-4668-a38e-60e919e7795f	4afea674-e0f3-4cc2-8024-5715b8a69434	Sometimes	2	en_US
b595febd-db29-4cb4-8113-af8b520a5e47	4afea674-e0f3-4cc2-8024-5715b8a69434	Regularly	3	en_US
79eda060-ad60-4002-aa88-5c62cc2f29f9	4afea674-e0f3-4cc2-8024-5715b8a69434	Often	4	en_US
d0540782-99f7-45ee-a61b-d8963624ed8b	4afea674-e0f3-4cc2-8024-5715b8a69434	All the time	5	en_US
aac03596-bbdc-4a18-8377-bd74136ed041	4afea674-e0f3-4cc2-8024-5715b8a69434	Jamais	1	fr_FR
7a9ea5df-b4e0-426d-a474-16f679f11a83	4afea674-e0f3-4cc2-8024-5715b8a69434	Parfois	2	fr_FR
48144256-772b-4160-8db4-79d4707e711b	4afea674-e0f3-4cc2-8024-5715b8a69434	Régulièrement	3	fr_FR
b9f7f704-181e-4784-9035-b921ffd047db	4afea674-e0f3-4cc2-8024-5715b8a69434	Souvent	4	fr_FR
bce42a0c-e63c-44cb-ac0a-b9e9c2b66019	4afea674-e0f3-4cc2-8024-5715b8a69434	Tout le temps	5	fr_FR
5407a66e-7cd5-4daf-ad0f-3a1f29842971	cf50eaa5-de41-45a4-ada1-17e44e4b5014	No	1	en_US
48f31c8a-3904-4b2e-acd3-c6ac63452fb5	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Not enough	2	en_US
ee2861c6-444f-49b2-ba1c-7d29d9b6ee49	cf50eaa5-de41-45a4-ada1-17e44e4b5014	I'm working on it	3	en_US
88b81957-0f70-4a48-8332-54641799d1e6	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Rather	4	en_US
0406fcc8-a315-4409-8fad-a92935dcb435	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Yes	5	en_US
662b9253-79ba-4b33-8b87-8156caa73bff	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Non	1	fr_FR
4f3ea275-13b9-47ae-a3a5-3e806729e530	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Pas assez	2	fr_FR
590cc9e6-7334-4c81-963a-811b1115e8c3	cf50eaa5-de41-45a4-ada1-17e44e4b5014	J'y travaille	3	fr_FR
077faf18-58d2-49bd-9bb4-0dd72b394698	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Plutôt	4	fr_FR
73908e55-9dc3-4f66-81d3-8f7e9e527fdf	cf50eaa5-de41-45a4-ada1-17e44e4b5014	Oui	5	fr_FR
04e75a88-c119-436c-b43e-7f50013cb4c8	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Never	1	en_US
05ac435b-a4ee-4400-bca4-f2d522147de8	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Sometimes	2	en_US
eb5da978-ba7f-461d-a2d4-b61ba2c09378	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Regularly	3	en_US
a14c466b-6c48-4743-a985-cd8950a1bf90	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Very often	4	en_US
6067fb19-7e9d-4cfc-8eb6-376d45d96931	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	All the time	5	en_US
6f9e139f-159d-4eae-a1b2-467caa85f087	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Jamais	1	fr_FR
250bc0f5-3c7d-4fd7-a76c-bc55aa879844	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Parfois	2	fr_FR
8fbbb485-712e-4c76-9c5e-c19bd93fea22	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Régulièrement	3	fr_FR
ce1431d6-d788-4d60-9401-9d569c89b0e5	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Très souvent	4	fr_FR
9d63f376-99d7-425e-9763-42033778d0ee	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	Tout le temps	5	fr_FR
8db29039-fd09-4712-9f4c-0b057f2ee48d	b5911913-b139-4fdc-a8dc-d03750a50dde	Nothing	1	en_US
e8b79186-f079-45f4-a048-ad57f5e832ed	b5911913-b139-4fdc-a8dc-d03750a50dde	Less than 20,000	2	en_US
f5ae8270-b9e3-4164-8aa5-15c97325156e	b5911913-b139-4fdc-a8dc-d03750a50dde	Between 20,000 and 40,000	3	en_US
d13c4421-0c9f-4dcd-8884-c87f658a2f30	b5911913-b139-4fdc-a8dc-d03750a50dde	Between 40,000 and 75,000	4	en_US
710a555a-6be5-425d-bf9c-a9678fe38fc9	b5911913-b139-4fdc-a8dc-d03750a50dde	Between 75,000 and 100,000	5	en_US
568f2146-4ee4-4d3c-ade5-9f31b6ea9373	b5911913-b139-4fdc-a8dc-d03750a50dde	Between 100,000 and 200,000	6	en_US
8c764ad3-8de7-434c-babd-2b344cd3c50f	b5911913-b139-4fdc-a8dc-d03750a50dde	Between 200,000 and 300,000	7	en_US
caf69794-3be5-4060-9de4-2efac1a1edbe	b5911913-b139-4fdc-a8dc-d03750a50dde	Between 300,000 and 500,000	8	en_US
3911a961-41bf-4ef9-9322-ec19fd471b0b	b5911913-b139-4fdc-a8dc-d03750a50dde	Between 500,000 and 1M	9	en_US
eb7f57dd-f034-42b8-bb64-7c3908f6c862	b5911913-b139-4fdc-a8dc-d03750a50dde	Over 1M	10	en_US
2f06e424-a7b1-4ce5-809d-a31368a34de7	b5911913-b139-4fdc-a8dc-d03750a50dde	Rien	1	fr_FR
baad8e62-3d1c-40d3-a8a5-d088eda44591	b5911913-b139-4fdc-a8dc-d03750a50dde	Moins de 20 000	2	fr_FR
3b8eb75e-f651-4213-b73d-3b3c383e1383	b5911913-b139-4fdc-a8dc-d03750a50dde	Entre 20 000  et 40 000	3	fr_FR
db81b2b4-d333-4c88-950f-2bfddca7d177	b5911913-b139-4fdc-a8dc-d03750a50dde	Entre 40000 et 75 000	4	fr_FR
7a092843-23ec-457a-b59e-9680be90c3c8	b5911913-b139-4fdc-a8dc-d03750a50dde	Entre 75 000 et 100 000	5	fr_FR
9f9c8206-64ce-471d-915c-217053cecd9e	b5911913-b139-4fdc-a8dc-d03750a50dde	Entre 100 000 et 200 000	6	fr_FR
e55683c3-6b88-43fa-ba39-546af63c1990	b5911913-b139-4fdc-a8dc-d03750a50dde	Entre 200 000 et 300 000	7	fr_FR
a9f2df99-3c63-4475-9327-069ce005f226	b5911913-b139-4fdc-a8dc-d03750a50dde	Entre 300 000 et 500 000	8	fr_FR
46716a38-c2cb-4cee-83d0-364f9a94fad8	b5911913-b139-4fdc-a8dc-d03750a50dde	Entre 500 000 et 1M	9	fr_FR
e599651b-19a5-4b40-b04c-eafb211f6899	b5911913-b139-4fdc-a8dc-d03750a50dde	Plus de 1M	10	fr_FR
54a855c3-53a8-4914-b2e2-cf1ea1ae4bc9	dfcc5151-1112-49de-a315-6ad9a67bce7b	Never	1	en_US
7c978b67-6424-4daf-8a84-881e3fc2aed4	dfcc5151-1112-49de-a315-6ad9a67bce7b	Once	2	en_US
455ec78d-26ab-4c56-a96e-a2d3dcfc422d	dfcc5151-1112-49de-a315-6ad9a67bce7b	Regularly	3	en_US
9e4d8f89-387a-42f3-9204-2bf5ac2cc6ca	dfcc5151-1112-49de-a315-6ad9a67bce7b	Often	4	en_US
4af7777e-a771-4839-85ef-dbb69f89d37c	dfcc5151-1112-49de-a315-6ad9a67bce7b	Jamais	1	fr_FR
be0952bf-1091-40b0-8342-a769d69439f1	dfcc5151-1112-49de-a315-6ad9a67bce7b	Une fois	2	fr_FR
fa66ec27-9fd1-4049-8448-de2857502f23	dfcc5151-1112-49de-a315-6ad9a67bce7b	Régulièrement	3	fr_FR
eb887aad-8c3d-442c-9025-d653f45bc0d3	dfcc5151-1112-49de-a315-6ad9a67bce7b	Souvent	4	fr_FR
ac887f3d-cd25-4bf0-9988-796592bf80ee	c7402c75-4217-4ec9-8306-fdb7c7e9523a	Never	1	en_US
f5107be5-12b3-4885-9e4c-34187de62189	c7402c75-4217-4ec9-8306-fdb7c7e9523a	5-10 years	2	en_US
bc8b01f2-33d4-47cf-b272-8810f55d2a35	c7402c75-4217-4ec9-8306-fdb7c7e9523a	10-15 years	3	en_US
61d04e5b-83cd-4d4e-baf7-dc0c3bdcf0aa	c7402c75-4217-4ec9-8306-fdb7c7e9523a	15-20 years	4	en_US
c54d0e9d-3851-4863-8b7c-630163379d2b	c7402c75-4217-4ec9-8306-fdb7c7e9523a	20 years and over	5	en_US
45ab4def-756e-4d39-beda-9833f809783c	c7402c75-4217-4ec9-8306-fdb7c7e9523a	Jamais	1	fr_FR
d036905f-473a-4c43-a3be-256ba182be4b	c7402c75-4217-4ec9-8306-fdb7c7e9523a	5-10 ans	2	fr_FR
9698bb99-0ce5-43a7-80bc-bff010a52f0b	c7402c75-4217-4ec9-8306-fdb7c7e9523a	10-15 ans	3	fr_FR
b96e2151-483a-4de3-bcec-55a99ebf5155	c7402c75-4217-4ec9-8306-fdb7c7e9523a	15-20 ans	4	fr_FR
0a7378aa-d987-4c78-aa19-745992ac8d34	c7402c75-4217-4ec9-8306-fdb7c7e9523a	20 ans et plus	5	fr_FR
f8a18e24-ad52-419f-bf03-c7433b3d9302	7e2e1772-b309-424a-bc6f-7ee8f23645f1	Never	1	en_US
4b77ce3f-bd8d-4c05-93bd-e7f9c63dea4a	7e2e1772-b309-424a-bc6f-7ee8f23645f1	Once	2	en_US
614880c4-3d69-4bc8-8597-bb99db4c801f	7e2e1772-b309-424a-bc6f-7ee8f23645f1	Several times	3	en_US
4c24d116-f4d7-4736-b431-70adf7255621	7e2e1772-b309-424a-bc6f-7ee8f23645f1	Jamais	1	fr_FR
a2144808-d1ee-4db3-aed4-026cdfb76ab5	7e2e1772-b309-424a-bc6f-7ee8f23645f1	Une fois	2	fr_FR
0c98d982-cb09-454d-89a8-e9e0278255a2	7e2e1772-b309-424a-bc6f-7ee8f23645f1	Plusieurs fois	3	fr_FR
7716fc84-7df4-4b66-997e-36d707102473	140b724b-16a5-420d-8516-72722fb10576	0%	1	en_US
58f2f5c2-3f06-4683-ad6d-06d39608b5d6	140b724b-16a5-420d-8516-72722fb10576	20%	2	en_US
9b3cc611-6a33-4e0d-bc31-f282e7173492	140b724b-16a5-420d-8516-72722fb10576	40%	3	en_US
5f558b25-73fa-4933-a650-a620a91a6f33	140b724b-16a5-420d-8516-72722fb10576	60%	4	en_US
27c01083-4ff7-4d7b-87ad-62fde6f7247d	140b724b-16a5-420d-8516-72722fb10576	80%	5	en_US
c2b670b9-e578-4211-ab20-9d436631f8f3	140b724b-16a5-420d-8516-72722fb10576	100%	6	en_US
a91819f9-0aca-4c9c-9335-e109553d3083	140b724b-16a5-420d-8516-72722fb10576	0%	1	fr_FR
faceb1bc-4b91-4028-8418-6e9683f0a0b4	140b724b-16a5-420d-8516-72722fb10576	20%	2	fr_FR
ebc48a09-dae7-412d-9483-353210ad3562	140b724b-16a5-420d-8516-72722fb10576	40%	3	fr_FR
c76efe51-f794-403b-89b9-87490f9e8696	140b724b-16a5-420d-8516-72722fb10576	60%	4	fr_FR
b072e6bb-90da-4f3b-affb-5962440b3180	140b724b-16a5-420d-8516-72722fb10576	80%	5	fr_FR
19c2bda0-58d3-4176-82a7-37c482e284a7	140b724b-16a5-420d-8516-72722fb10576	100%	6	fr_FR
a2fb6570-11c3-4d68-bb7a-2e0aa117ae02	cda65b3a-0236-4317-b536-3242206a7a7e	Never	1	en_US
04150652-db81-4feb-a28f-eb128a0ed4da	cda65b3a-0236-4317-b536-3242206a7a7e	Sometimes	2	en_US
50052649-5c75-44b0-aff9-3aaf0d5bd08b	cda65b3a-0236-4317-b536-3242206a7a7e	Regularly	3	en_US
190472fb-2f3c-44b8-8c67-276c12411417	cda65b3a-0236-4317-b536-3242206a7a7e	Very often	4	en_US
0d07e8b3-1137-4bbb-863b-ef6a766ff48e	cda65b3a-0236-4317-b536-3242206a7a7e	All the time	5	en_US
cf645ee7-f775-48f5-b11b-7eedd51e8498	cda65b3a-0236-4317-b536-3242206a7a7e	Jamais	1	fr_FR
bbf57b82-fb7f-40e9-9dc7-7f0ca66c937e	cda65b3a-0236-4317-b536-3242206a7a7e	Parfois	2	fr_FR
0ae9c6ba-7e98-4c29-bc48-a407adf25154	cda65b3a-0236-4317-b536-3242206a7a7e	Régulièrement	3	fr_FR
cc031190-281b-4b61-90f0-b13857d3270f	cda65b3a-0236-4317-b536-3242206a7a7e	Très souvent	4	fr_FR
cc2d50f9-065a-43cf-bba3-9b3961f9e4e6	cda65b3a-0236-4317-b536-3242206a7a7e	Tout le temps	5	fr_FR
ac7fee7e-bd83-4c32-a659-765d8e873f25	2854b823-2730-429e-9d1a-264aa62a26aa	Never	1	en_US
09c4f57a-9dd8-4b7e-a0c3-42746dd4912e	2854b823-2730-429e-9d1a-264aa62a26aa	Sometimes	2	en_US
9db7bea8-5ceb-4f99-85f7-efc683edf71f	2854b823-2730-429e-9d1a-264aa62a26aa	Regularly	3	en_US
7c341c36-654e-42f4-a547-04885e5d30b1	2854b823-2730-429e-9d1a-264aa62a26aa	Often	4	en_US
387c5c50-8367-480d-982c-621cd3d6a8a5	2854b823-2730-429e-9d1a-264aa62a26aa	All the time	5	en_US
aa9fb3d6-5d20-4424-a314-b57fe2675812	2854b823-2730-429e-9d1a-264aa62a26aa	Jamais	1	fr_FR
d9b79d25-2c86-4d50-9e52-24c748b62f1c	2854b823-2730-429e-9d1a-264aa62a26aa	Parfois	2	fr_FR
196a1fe0-a4c5-43f6-b348-e2c59e674a59	2854b823-2730-429e-9d1a-264aa62a26aa	Régulièrement	3	fr_FR
d0ee0538-d07e-4872-902e-4c4cf76111e0	2854b823-2730-429e-9d1a-264aa62a26aa	Souvent	4	fr_FR
438c0749-922a-4532-af2a-acf8754f90bd	2854b823-2730-429e-9d1a-264aa62a26aa	Tout le temps	5	fr_FR
88bbc6b1-c750-4928-9942-8755085b307b	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	Never	1	en_US
8d121520-af23-4add-aeda-c7c23038f940	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	1 time	2	en_US
80b4788a-88a7-4672-8fe9-a6b9899efa43	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	Sometimes	3	en_US
c1fadb8a-dd44-420f-8116-a13dfac3d153	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	All the time	4	en_US
515a5c0d-4def-4a2f-a737-b7fda0a442f3	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	Jamais	1	fr_FR
a5405236-e3b7-40b4-9377-6beb3a77b1a6	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	1 fois	2	fr_FR
36bcc06b-5177-4e5b-871a-4d3e7c9e6d6b	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	Quelques fois	3	fr_FR
bfc53e8b-42a2-4d17-9313-d81988e16dca	90589d5d-d15f-4d1a-bf60-1b251ae2eccf	Tout le temps	4	fr_FR
5e05df57-3621-4576-8270-2f9cd690237f	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Never	1	en_US
349e35b6-9af0-4530-95e5-3b790667a03a	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Once	2	en_US
f7ef2a81-dc97-4344-ab5b-81ed5db187e2	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Regularly	3	en_US
8b8c48cb-6914-4b68-a1a7-9e40cb70ec3d	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Often	4	en_US
b2c6684b-f017-4d72-9dce-ff48af5f2cec	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	All the time	5	en_US
3eaa61f3-466d-4124-9810-110fb91b6c5d	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Jamais	1	fr_FR
0d07d998-bbc0-4309-88c0-a32606ea4095	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Une fois	2	fr_FR
f461b98c-56ba-423e-8cef-6df4e47fa6bb	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Régulièrement	3	fr_FR
e67ae254-15c5-4c55-ba5b-d5d5ca70af18	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Souvent	4	fr_FR
0e06fce9-710d-4ae2-95df-cf256e816425	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	Tout le temps	5	fr_FR
5956d3dc-9d72-4c2d-8178-38e75724200e	567c7e60-e599-4126-a07d-7bb809097a28	1 time	1	en_US
6cb94a29-cbb1-4c4d-a2ce-a59419bedae2	567c7e60-e599-4126-a07d-7bb809097a28	2 times	2	en_US
c6b2afab-bfb2-4c67-9f11-dc9d792d695c	567c7e60-e599-4126-a07d-7bb809097a28	3 times	3	en_US
a7abe972-c104-4d63-b757-91b2d4c05da9	567c7e60-e599-4126-a07d-7bb809097a28	Four times	4	en_US
eea63d55-758e-4405-a5b7-79ee305b2f9c	567c7e60-e599-4126-a07d-7bb809097a28	5 times	5	en_US
60e57e9e-4b2f-4ed9-9582-838b0351f41a	567c7e60-e599-4126-a07d-7bb809097a28	6 times	6	en_US
14e57289-e973-4df2-94d3-c1c7f62692e5	567c7e60-e599-4126-a07d-7bb809097a28	7 times	7	en_US
74e59e8f-6398-4056-a604-fec3ce2e7111	567c7e60-e599-4126-a07d-7bb809097a28	8 times	8	en_US
452545ce-e8bb-4b8c-a037-9230532f4493	567c7e60-e599-4126-a07d-7bb809097a28	More than 8 times	9	en_US
6e23a312-633b-46fc-805a-d1a85b8adb66	567c7e60-e599-4126-a07d-7bb809097a28	1 fois	1	fr_FR
8b7b59e3-c903-47ad-9e09-327be7ddd7b0	567c7e60-e599-4126-a07d-7bb809097a28	2 fois	2	fr_FR
57b7be46-f07e-4b38-963d-110b93dee9d4	567c7e60-e599-4126-a07d-7bb809097a28	3 fois	3	fr_FR
ebb7f202-f92a-4d69-ba0f-d72aea61f189	567c7e60-e599-4126-a07d-7bb809097a28	4 fois	4	fr_FR
326dfb0f-f3cd-4d45-954f-26beda8e3d7f	567c7e60-e599-4126-a07d-7bb809097a28	5 fois	5	fr_FR
f42641a2-2918-4eac-a92d-5936b2d32fb6	567c7e60-e599-4126-a07d-7bb809097a28	6 fois	6	fr_FR
2ba48166-3e13-4e6b-8cba-68ecb4c3a644	567c7e60-e599-4126-a07d-7bb809097a28	7 fois	7	fr_FR
a5825d0b-7227-4370-ab81-5d9514a90d79	567c7e60-e599-4126-a07d-7bb809097a28	8 fois	8	fr_FR
d99e0eba-d875-405e-a8dc-270ecead6a79	567c7e60-e599-4126-a07d-7bb809097a28	Plus de 8 fois	9	fr_FR
22fe3578-0464-4bd6-9599-3c868fe4e239	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Never	1	en_US
c72ca673-5e42-4bed-a12e-9f513007c2ba	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Sometimes	2	en_US
82752b74-98a7-410d-a82b-3166aa07a6a1	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Regularly	3	en_US
1816f2e2-d7d9-4b49-9f37-07cdbd03a47c	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Often	4	en_US
872f41af-6bc0-4bde-9cef-cf086bab08c7	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	All the time	5	en_US
b4656756-e002-47b6-a030-b3be6ede9dd4	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Jamais	1	fr_FR
95b2ce74-e193-4e77-a40c-897cc69fe59f	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Parfois	2	fr_FR
1eb2842e-5212-42e2-8e83-de407fc0a51f	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Régulièrement	3	fr_FR
acdf9e8c-e3d3-4743-80dd-c39afaa592eb	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Souvent	4	fr_FR
52b3fb15-4abf-4e62-b518-8f65845d8e85	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	Tout le temps	5	fr_FR
ec8790a9-78ad-4112-952e-0504889abe21	402c7b8e-ff3b-4655-b542-2618c25e11b1	Never	1	en_US
ed143230-240e-4111-ba3e-0cb18c0350fd	402c7b8e-ff3b-4655-b542-2618c25e11b1	Sometimes	2	en_US
70540889-3d5c-4fe8-8746-beec32b461a6	402c7b8e-ff3b-4655-b542-2618c25e11b1	Regularly	3	en_US
692de552-7c25-46ee-8015-dc7f6b9ef5c9	402c7b8e-ff3b-4655-b542-2618c25e11b1	Often	4	en_US
9e02c6d4-d9a6-49eb-9f36-bb55c94842a6	402c7b8e-ff3b-4655-b542-2618c25e11b1	All the time	5	en_US
a7fca410-0bf8-4dab-a700-0da961be1adf	402c7b8e-ff3b-4655-b542-2618c25e11b1	Jamais	1	fr_FR
9f573f99-c4e3-445b-9e15-d04460404db1	402c7b8e-ff3b-4655-b542-2618c25e11b1	Parfois	2	fr_FR
b6f49eb5-944b-4c71-a871-268c57c9440c	402c7b8e-ff3b-4655-b542-2618c25e11b1	Régulièrement	3	fr_FR
042f5236-5afe-4f6a-ac19-ca4013f54229	402c7b8e-ff3b-4655-b542-2618c25e11b1	Souvent	4	fr_FR
82677deb-c064-4a28-837f-26940f794fd7	402c7b8e-ff3b-4655-b542-2618c25e11b1	Tout le temps	5	fr_FR
7e3e27ad-855f-4899-b29e-30e9bcb484e9	00ad0764-de3b-44d4-a292-5c14ec998950	never	1	en_US
356a4438-82c1-4061-bdaf-63aca993fd0e	00ad0764-de3b-44d4-a292-5c14ec998950	often	2	en_US
78d34f19-a663-4710-bbb8-9544dc154340	00ad0764-de3b-44d4-a292-5c14ec998950	All the time	3	en_US
9404a763-0ebe-48a3-9eb4-5a6e815c7d53	00ad0764-de3b-44d4-a292-5c14ec998950	Once a week	4	en_US
643d00a6-1b92-4960-b00b-5045dd0a0263	00ad0764-de3b-44d4-a292-5c14ec998950	jamais	1	fr_FR
8634dd46-20ed-43cf-ae8b-a3af4804f630	00ad0764-de3b-44d4-a292-5c14ec998950	souvent	2	fr_FR
582f28e2-4294-485d-8509-421c230b32f0	00ad0764-de3b-44d4-a292-5c14ec998950	tout le temps	3	fr_FR
2d786c06-f634-440f-a74a-81e62e88cf8e	00ad0764-de3b-44d4-a292-5c14ec998950	1 fois / semaine	4	fr_FR
ca1aa39c-c19f-4419-b146-f36a92b8f810	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Never played	1	en_US
2bc5fbb9-eec8-40e3-b0f2-f4864fbe5bec	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Less than 50	2	en_US
6d16ff35-9bc5-4ff4-8404-20f30a4f0ca9	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Between 51 and 100	3	en_US
53192a3e-8b56-4eba-bff8-1ef9a959b98f	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Between 101 and 500	4	en_US
6dcf9659-4e53-4ff5-98a3-e11f3bb4b92e	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Between 501 and 1000	5	en_US
4f9be2ef-91f7-4b83-afc0-ffc4a6306cd8	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Over 1000	6	en_US
7f34f83b-0e96-4d93-9cf4-d14fedc62ec5	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Over 10,000	7	en_US
d0a4b87b-1d6e-410f-afe6-62460522a880	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Over 50,000	8	en_US
198d1c50-c592-4335-b199-a7e87e21f8a0	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Over 100,000	9	en_US
44525367-d6bd-4fc7-bf45-d8e2bc367cef	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Jamais joué	1	fr_FR
07e0f7e6-8a90-466b-a813-9a046e7e842f	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Moins de 50	2	fr_FR
26a859e0-0781-4ead-ba62-38aa29798482	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Entre 51 et 100	3	fr_FR
3cbbbb1a-3989-4519-ae0d-bfd6fcfc57c1	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Entre 101 et 500	4	fr_FR
d49d3c1f-3879-418d-aa29-483ddd91b90f	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Entre 501 et 1000	5	fr_FR
54e28c46-8df5-4f6c-a4a1-55634309edea	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Plus de 1000	6	fr_FR
e341a8ae-6e09-4909-8d6b-d097479f324b	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Plus de 10000	7	fr_FR
2534856c-e5bd-4f77-ab37-e93d801756f9	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Plus de 50000	8	fr_FR
f112a13b-ae02-4532-b749-3d5d08772253	6e37deb6-881d-403a-9e8e-f553f0d2fe28	Plus de 100 000	9	fr_FR
766c870c-aebb-4df5-9f39-06e8723cd06e	0430cdf6-41b3-4855-881d-b50280bb21a7	Never	1	en_US
4111f3c5-c2a7-482c-b3e5-2bea89af1d50	0430cdf6-41b3-4855-881d-b50280bb21a7	Sometimes	2	en_US
1d84942d-a6f7-452a-9c0c-6e4cbf2fcc9f	0430cdf6-41b3-4855-881d-b50280bb21a7	Regularly	3	en_US
ce9d071d-9686-42cf-a4a4-7b2cfbe0d624	0430cdf6-41b3-4855-881d-b50280bb21a7	Very often	4	en_US
abbaf641-3d04-4cfe-8007-7492e561449e	0430cdf6-41b3-4855-881d-b50280bb21a7	All the time	5	en_US
52c8ee45-2b62-45a9-9f6d-df4193352a2d	0430cdf6-41b3-4855-881d-b50280bb21a7	Jamais	1	fr_FR
eb7e6b46-c466-42d1-b04f-45268c82a97f	0430cdf6-41b3-4855-881d-b50280bb21a7	Parfois	2	fr_FR
60b1e275-1388-4eab-89fe-a98f83da73ca	0430cdf6-41b3-4855-881d-b50280bb21a7	Régulièrement	3	fr_FR
3cbce92e-9366-494f-8254-66baa1c1d491	0430cdf6-41b3-4855-881d-b50280bb21a7	Très souvent	4	fr_FR
85ed1e12-dd71-4c51-b74b-76d46837d053	0430cdf6-41b3-4855-881d-b50280bb21a7	Tout le temps	5	fr_FR
8b303a84-657e-4a9d-9eaa-709d1513233e	6a46bc77-4db4-44f7-908f-278c19ce5395	Once a day	1	en_US
59b9dbc8-2dd0-44ee-afc1-b54260f3ebd3	6a46bc77-4db4-44f7-908f-278c19ce5395	Once a week	2	en_US
82489432-003a-4960-9a3c-133e85986a04	6a46bc77-4db4-44f7-908f-278c19ce5395	Once a month	3	en_US
8a4a3cb0-1f5a-4a1d-864d-f6329e3377fd	6a46bc77-4db4-44f7-908f-278c19ce5395	Once a year	4	en_US
d259bdaa-f513-46f8-8f41-e2a59d04f139	6a46bc77-4db4-44f7-908f-278c19ce5395	Never	5	en_US
6028722a-08f9-4acb-9298-7e1f1e7c04f8	6a46bc77-4db4-44f7-908f-278c19ce5395	Une fois par jour	1	fr_FR
28ae7621-ff38-4c10-b535-b0ae61cf5cfa	6a46bc77-4db4-44f7-908f-278c19ce5395	Une fois par semaine	2	fr_FR
d3f90fce-0c31-42d5-86e2-f96c6c2872fd	6a46bc77-4db4-44f7-908f-278c19ce5395	Une fois par mois	3	fr_FR
a1d68867-4ef9-45f4-b7d4-7a0eaf12b4ad	6a46bc77-4db4-44f7-908f-278c19ce5395	Une fois par an	4	fr_FR
3f1e2df1-f4a0-4ec9-836d-f45b63d858f7	6a46bc77-4db4-44f7-908f-278c19ce5395	Jamais	5	fr_FR
cc56b515-3b3e-4e6f-8c98-dc157b1ede47	895ae354-7138-4797-bd0c-91f45dc927e0	Never	1	en_US
b8a0d993-75a4-43b7-9229-6d5ef2ebaa1c	895ae354-7138-4797-bd0c-91f45dc927e0	Sometimes	2	en_US
84bb905e-ac79-4f67-a7dc-5f344ab79bc0	895ae354-7138-4797-bd0c-91f45dc927e0	Often	3	en_US
d8ac8cee-e657-4c61-807e-6773cddd46ea	895ae354-7138-4797-bd0c-91f45dc927e0	All the time	4	en_US
737318a2-3166-44da-a40a-9bfb88331d56	895ae354-7138-4797-bd0c-91f45dc927e0	Jamais	1	fr_FR
741bb2ff-a888-47ca-ac40-c0245a2019e6	895ae354-7138-4797-bd0c-91f45dc927e0	Parfois	2	fr_FR
23815262-c47d-4d8c-ad60-1be21ad0f1a8	895ae354-7138-4797-bd0c-91f45dc927e0	Souvent	3	fr_FR
42bd1200-7739-4f24-9d6b-55dbe5cbceb2	895ae354-7138-4797-bd0c-91f45dc927e0	Tout le temps	4	fr_FR
30785c69-9fe4-4115-9246-19b81e9de64c	b20f70d8-8103-4562-a31c-2620c9da4226	Never	1	en_US
d25c5c72-038c-4c96-9c3c-e3089ea75479	b20f70d8-8103-4562-a31c-2620c9da4226	Once	2	en_US
fc03fc07-4863-4928-a17f-91b34b7082fa	b20f70d8-8103-4562-a31c-2620c9da4226	Regularly	3	en_US
4b85c519-499e-4564-8412-7a0043b60ba2	b20f70d8-8103-4562-a31c-2620c9da4226	Often	4	en_US
f568293d-2841-41c0-9584-a6c12996c40b	b20f70d8-8103-4562-a31c-2620c9da4226	Jamais	1	fr_FR
80996c75-1819-4b3c-adb2-06c22dccd51f	b20f70d8-8103-4562-a31c-2620c9da4226	Une fois	2	fr_FR
d4b4edd2-830d-4238-a13b-5a87621f7b33	b20f70d8-8103-4562-a31c-2620c9da4226	Régulièrement	3	fr_FR
19d98e98-bfee-425d-8904-10ad778555cf	b20f70d8-8103-4562-a31c-2620c9da4226	Souvent	4	fr_FR
17f2e043-c6ca-4b0a-829a-a9797027ffe5	b822df53-4594-4f0d-941a-794786bb93ae	Never	1	en_US
36b25940-824d-4f92-b9cb-43f7ba3e30f0	b822df53-4594-4f0d-941a-794786bb93ae	Sometimes	2	en_US
b99644d1-fe5c-455f-911d-111f0b4bf02f	b822df53-4594-4f0d-941a-794786bb93ae	Regularly	3	en_US
3a03642a-10cb-4732-80df-9fc23208ae24	b822df53-4594-4f0d-941a-794786bb93ae	Often	4	en_US
80a6b40f-434b-4eba-ab02-14096d399681	b822df53-4594-4f0d-941a-794786bb93ae	All the time	5	en_US
3d4bb365-c8a5-4145-82e6-8e9a4c4e0dd3	b822df53-4594-4f0d-941a-794786bb93ae	Jamais	1	fr_FR
64ef4d11-b580-4ca4-b881-37846df59372	b822df53-4594-4f0d-941a-794786bb93ae	Parfois	2	fr_FR
a4e4cf81-d89e-451c-8741-62f8da68f84e	b822df53-4594-4f0d-941a-794786bb93ae	Régulièrement	3	fr_FR
178f3cc1-4d18-4950-89f8-cbe14762f73a	b822df53-4594-4f0d-941a-794786bb93ae	Souvent	4	fr_FR
9dff5cc4-76cc-4ca7-b73a-06c99879fa3c	b822df53-4594-4f0d-941a-794786bb93ae	Tout le temps	5	fr_FR
1a9a0510-0eae-413d-9d9e-3789d1690ec8	8abe77b7-3d5e-4d2c-8d88-1c838223030b	1	1	en_US
3a1796f6-e8fe-490c-93fb-18de4c57b5c8	8abe77b7-3d5e-4d2c-8d88-1c838223030b	5	2	en_US
9e7be710-ae89-40c3-b718-be8ae1b5edb6	8abe77b7-3d5e-4d2c-8d88-1c838223030b	10	3	en_US
5e1e2fa0-85b7-4dd0-9323-f2b129079b96	8abe77b7-3d5e-4d2c-8d88-1c838223030b	15	4	en_US
e85642a9-da78-4984-ba05-b031e3dca0be	8abe77b7-3d5e-4d2c-8d88-1c838223030b	more than 15	5	en_US
645f4d87-f666-4e6d-9860-d95595e2a7ac	8abe77b7-3d5e-4d2c-8d88-1c838223030b	1	1	fr_FR
29bc6853-8c58-4c3c-b017-ba2c5f26ecfc	8abe77b7-3d5e-4d2c-8d88-1c838223030b	5	2	fr_FR
78adce53-b56a-413d-a48d-d6463428f78b	8abe77b7-3d5e-4d2c-8d88-1c838223030b	10	3	fr_FR
5afd350c-1226-4a4e-9ee0-683a08493e0a	8abe77b7-3d5e-4d2c-8d88-1c838223030b	15	4	fr_FR
5837a078-acb5-4ca1-b16d-fe3824536799	8abe77b7-3d5e-4d2c-8d88-1c838223030b	+ de 15	5	fr_FR
d95245e1-ec08-4c32-997a-e60f27cf8042	8abe77b7-3d5e-4d2c-8d88-1c838223030b	+ de 15	6	fr_FR
19a33516-1de8-48eb-aef6-1e6f37e0e2b1	17864784-730c-423e-a290-d8fc76f75049	Very positive	1	en_US
d623de0a-6633-4051-90d3-8ddec38a081d	17864784-730c-423e-a290-d8fc76f75049	Rather Positive	2	en_US
11e62287-3daf-4016-be0b-983f23b39368	17864784-730c-423e-a290-d8fc76f75049	Rather negative	3	en_US
f0e85132-4830-4b63-8079-b8f184867ea5	17864784-730c-423e-a290-d8fc76f75049	Very negative	4	en_US
a0f91400-66b2-4953-8fa6-5cc34d80fae0	17864784-730c-423e-a290-d8fc76f75049	Très positive	1	fr_FR
42723451-267e-4419-9c0a-720c02852bf9	17864784-730c-423e-a290-d8fc76f75049	Plutôt Positive	2	fr_FR
bc3a06cd-d498-404b-a5bc-2e3974bc5542	17864784-730c-423e-a290-d8fc76f75049	Plutôt négative	3	fr_FR
c13086c5-7eb0-4cb1-ba69-e2ec4914160a	17864784-730c-423e-a290-d8fc76f75049	Très négative	4	fr_FR
a40c5402-a821-4d6b-b6e5-5068d89e4eab	23b8fa1e-dd26-434f-b714-00c80284a124	1 time	1	en_US
287641de-7113-478e-8051-cb00feb44029	23b8fa1e-dd26-434f-b714-00c80284a124	2 times	2	en_US
be24898f-5a89-4e1b-a9e3-1554d9ea5be3	23b8fa1e-dd26-434f-b714-00c80284a124	5 times	3	en_US
93091b18-c335-48fc-81d9-c02ce2aba8e8	23b8fa1e-dd26-434f-b714-00c80284a124	Every hour	4	en_US
b66ab2ce-db2e-43d1-bac2-b7731a6271e3	23b8fa1e-dd26-434f-b714-00c80284a124	At every moment	5	en_US
6a559748-9f19-414f-af9d-276371b39832	23b8fa1e-dd26-434f-b714-00c80284a124	1 fois	1	fr_FR
c9596256-704b-4c13-8dfb-88209d52cb1e	23b8fa1e-dd26-434f-b714-00c80284a124	2 fois	2	fr_FR
3557dd13-1616-4ae6-b50f-01737c5b7d72	23b8fa1e-dd26-434f-b714-00c80284a124	5 fois	3	fr_FR
715ac052-0c8c-4964-a07c-f1200a0f7d55	23b8fa1e-dd26-434f-b714-00c80284a124	Toutes les heures	4	fr_FR
b6de1eaf-e877-4d36-a392-f725a527f47b	23b8fa1e-dd26-434f-b714-00c80284a124	A chaque instant	5	fr_FR
192dff86-2798-427b-aec8-8667f2128b6b	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Never	1	en_US
1f65e27c-92c6-4f44-94d8-2b997fbcd0e5	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Once a year	2	en_US
a33286f0-8d35-400e-909c-30d5929d001d	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Every 6 months	3	en_US
dbdfee13-d323-4710-938a-4c1aee300a79	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Every 2 months	4	en_US
7d71390b-17bf-4832-822b-c2273f6ac3dc	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Every month	5	en_US
583f15e5-157e-43ea-a1b5-d3d8cfd2da1b	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Every week	6	en_US
f90bc958-f34d-43b1-91f5-f5c7935c49bb	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Jamais	1	fr_FR
ac1f89dd-b45a-49e0-a961-ae2f85849b8b	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Une fois par an	2	fr_FR
0e21010d-f5ca-4b0e-92ae-2f5ecf216c54	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Tous les 6 mois	3	fr_FR
20ff138a-f2bc-4605-9dd9-38221715a917	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Tous les 2 mois	4	fr_FR
d1e594a5-6419-4ded-a046-7482a3a00c6f	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Tous les mois	5	fr_FR
b42313d0-f823-472d-aa24-bc9209ebf8e8	2a0953da-fdd5-46ff-9b38-b30d95b1c447	Toutes les semaines	6	fr_FR
4e7de884-bb6f-46c0-91b3-6dc1c8bacde8	ad615693-356c-41ca-874d-deb2e2536afc	Never	1	en_US
f33b026e-1c00-4103-9137-9920404d5d83	ad615693-356c-41ca-874d-deb2e2536afc	1 time	2	en_US
353f7771-deec-41b8-9f58-bb66ab257e65	ad615693-356c-41ca-874d-deb2e2536afc	2 or 3 times	3	en_US
31d59113-bc45-45ee-99a6-8de4e4f20d66	ad615693-356c-41ca-874d-deb2e2536afc	Occasionally	4	en_US
d749371c-5501-43d8-a696-904a52a98fbe	ad615693-356c-41ca-874d-deb2e2536afc	It's my hobby	5	en_US
b5e387b2-164a-41ce-b38f-4088cf83944f	ad615693-356c-41ca-874d-deb2e2536afc	Jamais	1	fr_FR
d7cc6983-fcc2-4e5c-a62b-1c27199b8c9d	ad615693-356c-41ca-874d-deb2e2536afc	1 fois	2	fr_FR
7fead2e2-4e8b-4727-9134-26675ec87654	ad615693-356c-41ca-874d-deb2e2536afc	2 ou 3 fois	3	fr_FR
23b59090-d381-4412-93de-14c2be832a97	ad615693-356c-41ca-874d-deb2e2536afc	Occasionellement	4	fr_FR
9db6f96b-4d18-4bac-92ea-6ba36b446b0d	ad615693-356c-41ca-874d-deb2e2536afc	C'est mon hobby	5	fr_FR
cbef73dd-700c-41e3-8b87-9a407765c952	d572bcc1-bc14-4b7e-85ec-91862be987fb	Never	1	en_US
9965101d-6383-40f5-b400-0767c60bae66	d572bcc1-bc14-4b7e-85ec-91862be987fb	Once	2	en_US
10b64b64-171e-44f4-b365-66cfb4f68de4	d572bcc1-bc14-4b7e-85ec-91862be987fb	Regularly	3	en_US
1682646f-b29f-4511-bbfd-bb16f4f6ad07	d572bcc1-bc14-4b7e-85ec-91862be987fb	Often	4	en_US
84e12195-8596-4130-a71f-acc41b8c9722	d572bcc1-bc14-4b7e-85ec-91862be987fb	All the time	5	en_US
5df205d5-95d7-4521-9282-6f124850b972	d572bcc1-bc14-4b7e-85ec-91862be987fb	Jamais	1	fr_FR
eac2eca0-64b3-4320-92b5-2e0f872fcf87	d572bcc1-bc14-4b7e-85ec-91862be987fb	Une fois	2	fr_FR
94d3d553-517a-4d06-a0ca-0b5b22166064	d572bcc1-bc14-4b7e-85ec-91862be987fb	Régulièrement	3	fr_FR
b5ec4bcf-b3f0-4610-baa1-d77b08364e6d	d572bcc1-bc14-4b7e-85ec-91862be987fb	Souvent	4	fr_FR
48fc7893-f11d-4b0a-b169-37d3e90e68d6	d572bcc1-bc14-4b7e-85ec-91862be987fb	Tout le temps	5	fr_FR
61a72206-9348-4a82-bb61-bcd32eb39029	de810d24-1e70-45cc-9e77-ea92552a1bbb	Never	1	en_US
04dee77b-4d4d-4b53-a8c7-f9516f2c2e1d	de810d24-1e70-45cc-9e77-ea92552a1bbb	Sometimes	2	en_US
e613dff6-5791-4399-bbe0-bdadf58e66f0	de810d24-1e70-45cc-9e77-ea92552a1bbb	Regularly	3	en_US
36f407dc-e1cf-45db-9c8f-af49793804d2	de810d24-1e70-45cc-9e77-ea92552a1bbb	Often	4	en_US
9bef291c-4943-452c-82fe-529a0dcb8585	de810d24-1e70-45cc-9e77-ea92552a1bbb	All the time	5	en_US
4dbca11e-3a8f-4466-868b-fdf4de92cc39	de810d24-1e70-45cc-9e77-ea92552a1bbb	Jamais	1	fr_FR
2ba213b1-adbc-48f8-b5c4-4515c1f2c8f8	de810d24-1e70-45cc-9e77-ea92552a1bbb	Parfois	2	fr_FR
9712403c-4511-4b28-9813-2e858a33e6c2	de810d24-1e70-45cc-9e77-ea92552a1bbb	Régulièrement	3	fr_FR
f7165323-6fcf-4c08-ae41-7f8c6d895844	de810d24-1e70-45cc-9e77-ea92552a1bbb	Souvent	4	fr_FR
5967496d-842a-4c33-bcdc-8400e2bbe69d	de810d24-1e70-45cc-9e77-ea92552a1bbb	Tout le temps	5	fr_FR
3dbca1cf-d050-435f-b307-831312c4b68f	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Never	1	en_US
69ac120b-858d-48db-9f3e-9c2f2edc4fb5	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Sometimes	2	en_US
f34ac512-6f7e-40b0-8cae-d7d6eb5e8a6b	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Often	3	en_US
28f55758-b9b9-40ed-a502-b5af40bdb006	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Clearly	4	en_US
adfa859a-6a77-4e41-9821-5f5e1a002b3b	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Jamais	1	fr_FR
3ea592ea-a604-4aea-8a76-95e659e5d451	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Parfois	2	fr_FR
b7a4f198-4443-4c04-9e60-bc901be9643c	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Souvent	3	fr_FR
bb673108-3ae3-4f5d-9797-7188620b1d7d	8d995d38-ca67-41df-b0c9-6e2d7004e7f2	Clairement	4	fr_FR
486dedc6-2dcf-4925-9cb0-07b1646dba46	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Never	1	en_US
44d49e65-5aed-4444-9bcd-7156a54198d8	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Rarely	2	en_US
a19b81d5-f1aa-4c91-ae9b-9dc6ccd3da11	4dc46c8b-6173-44db-80f6-ffb320bd2df0	It happens	3	en_US
7ef15232-f0f5-452d-a47c-193fba9b8153	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Often	4	en_US
f1d9facb-4515-4a5f-a52c-306362ed426f	4dc46c8b-6173-44db-80f6-ffb320bd2df0	All the time	5	en_US
3abe4892-d4f2-436d-b441-a108253c39ad	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Jamais	1	fr_FR
645dfb66-6548-4de0-969c-e1fb6b5775a1	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Rarement	2	fr_FR
31a10101-8cb8-44fb-878c-e2a60c9781d7	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Ca arrive	3	fr_FR
0c18006f-996c-4525-9911-59b8b92b25e6	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Souvent	4	fr_FR
ea9cbd45-b7b8-48ed-b19b-e9303e4168a3	4dc46c8b-6173-44db-80f6-ffb320bd2df0	Tout le temps	5	fr_FR
3c423cb1-ccb5-4084-bffb-6c58642146b9	997894ec-b392-4a31-82ad-6e0dd15dfea3	Never	1	en_US
c15e1154-5442-4c96-9d73-c13e27925661	997894ec-b392-4a31-82ad-6e0dd15dfea3	Once	2	en_US
5b27a30a-e45d-4a61-9439-e32f0dee6c53	997894ec-b392-4a31-82ad-6e0dd15dfea3	Several times	3	en_US
763f440c-a420-4c49-8804-3cebac2d3e0a	997894ec-b392-4a31-82ad-6e0dd15dfea3	It is my job	4	en_US
57978e67-a17b-4c05-b31b-c86f5621f0cd	997894ec-b392-4a31-82ad-6e0dd15dfea3	Jamais	1	fr_FR
f2bffe25-90f8-42f8-8e2d-87da257df514	997894ec-b392-4a31-82ad-6e0dd15dfea3	Une fois	2	fr_FR
734397e8-b0fa-43b3-b412-b7c987805692	997894ec-b392-4a31-82ad-6e0dd15dfea3	Plusieurs fois	3	fr_FR
04bca438-a54e-4f3a-8c75-da590ca00b0e	997894ec-b392-4a31-82ad-6e0dd15dfea3	C'est mon métier	4	fr_FR
fb9f297b-cae3-4bd0-8695-d8d97a074e4c	d51bddd7-d291-4bc9-9737-d10705397a4c	Never	1	en_US
45a751a5-1eaf-4099-af12-ee781539f228	d51bddd7-d291-4bc9-9737-d10705397a4c	Sometimes	2	en_US
ad58eada-b462-4a7b-b018-f230f452c6ec	d51bddd7-d291-4bc9-9737-d10705397a4c	Regularly	3	en_US
30f9ca00-9b51-4aa3-a87e-1835f7917e05	d51bddd7-d291-4bc9-9737-d10705397a4c	Often	4	en_US
b8e16efd-7f23-4d1c-b5a4-2a70c8ba9be5	d51bddd7-d291-4bc9-9737-d10705397a4c	All the time	5	en_US
b60d6c3d-98f5-4716-97ee-88396afe85c1	d51bddd7-d291-4bc9-9737-d10705397a4c	Jamais	1	fr_FR
107828ff-9209-4ae3-806b-9d828c7e9cf8	d51bddd7-d291-4bc9-9737-d10705397a4c	Parfois	2	fr_FR
02425b62-ee0d-44da-93ee-073071dd4cfd	d51bddd7-d291-4bc9-9737-d10705397a4c	Régulièrement	3	fr_FR
8fd6d149-74f4-4293-84bf-000f7b87a595	d51bddd7-d291-4bc9-9737-d10705397a4c	Souvent	4	fr_FR
2f7ac27d-e9fc-4773-a7f3-8134fcca4fee	d51bddd7-d291-4bc9-9737-d10705397a4c	Tout le temps	5	fr_FR
c44b50f4-a1c4-4daf-8737-ef1e3a1da545	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Never	1	en_US
9b9d99b9-68a8-4a5e-87a2-dfc7220193db	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Sometimes	2	en_US
400bb9b5-5bef-47e2-a1e3-d523f7d730c0	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Regularly	3	en_US
e2e01f02-7c13-4943-be09-378024ad7975	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Often	4	en_US
79382103-c868-4a9d-b7c9-25d25d843880	210231d9-7b86-4676-b0bb-d9f6655f2ab4	All the time	5	en_US
e1802089-0353-4de3-89c8-ae27e4d0cf40	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Jamais	1	fr_FR
784981b9-f0c6-439e-833a-e5dba7b42384	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Parfois	2	fr_FR
048c2b3c-cc54-4b1d-9f96-848a24457cc4	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Régulièrement	3	fr_FR
450383d7-f646-4b61-b17b-2e61589797ca	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Souvent	4	fr_FR
e2abddbc-c351-451e-9044-a87d426119c8	210231d9-7b86-4676-b0bb-d9f6655f2ab4	Tout le temps	5	fr_FR
1581c467-3c2a-466a-b3c3-faa7f02f8680	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Never	1	en_US
c56b6910-c103-44ae-ade9-85083606c3b9	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Sometimes	2	en_US
994ec225-2f47-4324-bc92-a682102d5b84	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Regularly	3	en_US
282e0e28-7652-4101-99a3-2031a15d938e	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Often	4	en_US
07a2bb17-a1db-4dcd-b22a-e4beb43806c1	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	All the time	5	en_US
a628ded2-27d0-4722-90a1-3d0269d9d010	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Jamais	1	fr_FR
a1a1e314-a005-4b9b-bb9b-380d0d141d95	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Parfois	2	fr_FR
4e26b816-2f91-4565-87d3-9512e24b27f0	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Régulièrement	3	fr_FR
dbcdbd0e-4ec9-490c-9f59-74bc7a32febc	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Souvent	4	fr_FR
1b6adc5e-0a95-4346-9d04-1c953ec2eac0	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	Tout le temps	5	fr_FR
dec0cab4-16d9-4ef9-a84d-dd5476c3802c	8db347b3-463e-4385-8050-eb8ab1eecea2	They don't have any form of intelligence	1	en_US
99b15c85-6384-4be1-97b6-aa3ef7e61c80	8db347b3-463e-4385-8050-eb8ab1eecea2	As smart as a newborn	2	en_US
9505dbeb-c169-47e8-9889-1c0b28d33021	8db347b3-463e-4385-8050-eb8ab1eecea2	As smart as a week old baby	3	en_US
61d2e628-d5d6-4190-ba33-644ab6bcff57	8db347b3-463e-4385-8050-eb8ab1eecea2	As smart as a 1 month old baby	4	en_US
d2b375a9-1117-4b6e-9f86-e4ba98c2269c	8db347b3-463e-4385-8050-eb8ab1eecea2	As smart as a 1 year old	5	en_US
7864d404-2d1c-41e5-9e0f-e8439f77ac57	8db347b3-463e-4385-8050-eb8ab1eecea2	As smart as a 3 year old	6	en_US
92124512-9464-421d-a4c5-d69068e91520	8db347b3-463e-4385-8050-eb8ab1eecea2	As smart as a 5 year old	7	en_US
2e60e8a1-ee43-4570-9b9b-399de97347bf	8db347b3-463e-4385-8050-eb8ab1eecea2	As smart as a 10 year old	8	en_US
3d6093aa-f7c8-4644-82d0-11da02b5d71f	8db347b3-463e-4385-8050-eb8ab1eecea2	As smart as a grown man	9	en_US
58f16187-8353-4a33-b2b4-6e64fa9dc2e6	8db347b3-463e-4385-8050-eb8ab1eecea2	Ils ne disposent pas de forme d'intelligence	1	fr_FR
12d62c27-205e-4a12-bcc1-9f31199fbec8	8db347b3-463e-4385-8050-eb8ab1eecea2	Aussi intelligent qu'un nouveau né	2	fr_FR
73a60e13-5ca5-4309-97ed-7e304bac8283	8db347b3-463e-4385-8050-eb8ab1eecea2	Aussi intelligent qu'un bébé d'une semaine	3	fr_FR
1afcdc34-50e0-4cac-a207-e719121a4af0	8db347b3-463e-4385-8050-eb8ab1eecea2	Aussi intelligent qu'un bébé d'1 mois	4	fr_FR
8e596350-4b28-42a5-9f0e-f6bc244c7285	8db347b3-463e-4385-8050-eb8ab1eecea2	Aussi intelligent qu'un enfant d'1 an	5	fr_FR
6ad0c538-3ea0-4dc5-9891-ecae050b3a94	8db347b3-463e-4385-8050-eb8ab1eecea2	Aussi intelligent qu'un enfant de 3 ans	6	fr_FR
6a5852fe-2261-4514-b996-13438e8b12e7	8db347b3-463e-4385-8050-eb8ab1eecea2	Aussi intelligent qu'un enfant de 5 ans	7	fr_FR
ee755952-48db-41e0-ae30-fa5d8587e2da	8db347b3-463e-4385-8050-eb8ab1eecea2	Aussi intelligent qu'un enfant de 10 ans	8	fr_FR
621d6002-615b-4ddf-a995-a045e6a6541c	8db347b3-463e-4385-8050-eb8ab1eecea2	Aussi intelligent qu'un homme adulte	9	fr_FR
0b7961f4-3061-4a5b-aa00-04c8492f74ea	15b276d6-191f-4f11-8395-a33880c16c19	Never	1	en_US
cce51637-f685-4bfa-a190-9a8dcd29a65d	15b276d6-191f-4f11-8395-a33880c16c19	Once	2	en_US
b28f4ba4-6236-4fd3-ab63-490b4914e866	15b276d6-191f-4f11-8395-a33880c16c19	Regularly	3	en_US
9e39efb8-e69f-4d8d-90d0-1d183b2d611a	15b276d6-191f-4f11-8395-a33880c16c19	Often	4	en_US
6d079840-fe10-490c-8d55-e6b87f257028	15b276d6-191f-4f11-8395-a33880c16c19	All the time	5	en_US
38565e77-b3ac-4841-93ed-969eda0a29cf	15b276d6-191f-4f11-8395-a33880c16c19	Jamais	1	fr_FR
cb19b531-18ec-4827-a97d-af216d0de86d	15b276d6-191f-4f11-8395-a33880c16c19	Une fois	2	fr_FR
c10abedf-3801-4237-bc4d-8983d6b38a14	15b276d6-191f-4f11-8395-a33880c16c19	Régulièrement	3	fr_FR
e0e8f013-6c24-4e3b-a4ec-86fc292f79c3	15b276d6-191f-4f11-8395-a33880c16c19	Souvent	4	fr_FR
ced3a223-9719-4b66-92a1-48689037d293	15b276d6-191f-4f11-8395-a33880c16c19	Tout le temps	5	fr_FR
f3dea790-3e49-439c-bd1a-f931525aa1b8	50c91d35-debe-4573-aa62-3a09634787db	Never	1	en_US
09523a76-fca7-4747-839f-8cb7de4335d2	50c91d35-debe-4573-aa62-3a09634787db	Sometimes	2	en_US
44d2eb0f-4589-483d-9db2-8d510edc7244	50c91d35-debe-4573-aa62-3a09634787db	Often	3	en_US
779b945c-efb7-4343-9520-3709fdb43a1b	50c91d35-debe-4573-aa62-3a09634787db	All the time	4	en_US
aabd7c28-77b2-4147-91d0-c35029a9c7e2	50c91d35-debe-4573-aa62-3a09634787db	Jamais	1	fr_FR
c5f7de83-55d0-4626-bd55-4d591542e594	50c91d35-debe-4573-aa62-3a09634787db	Parfois	2	fr_FR
287f883c-ebc8-4c7b-b345-08d4ecbe896b	50c91d35-debe-4573-aa62-3a09634787db	Souvent	3	fr_FR
ca034009-f0ae-42d2-818a-bff7b7e80f8f	50c91d35-debe-4573-aa62-3a09634787db	Tout le temps	4	fr_FR
12f4676e-f487-49c6-8efc-857c9061c6d1	7f99b900-07fd-4acf-99e0-839abecb8e52	everyday	1	en_US
a2abb960-c1c5-4bca-9c81-f6377dd45e92	7f99b900-07fd-4acf-99e0-839abecb8e52	once a week	2	en_US
bd0a8c35-466c-47f0-88b3-51378f5fa123	7f99b900-07fd-4acf-99e0-839abecb8e52	twice a month	3	en_US
c0ade33a-ae6f-431d-b975-4fac05b6fa61	7f99b900-07fd-4acf-99e0-839abecb8e52	once a month	4	en_US
c356c349-b7aa-4b3c-a925-2cf12796fe98	7f99b900-07fd-4acf-99e0-839abecb8e52	once every two months	5	en_US
02183c62-4388-4f4b-938b-efeb75402bda	7f99b900-07fd-4acf-99e0-839abecb8e52	once a year	6	en_US
7cca80a7-e3ab-42be-ab02-9acb0df742de	7f99b900-07fd-4acf-99e0-839abecb8e52	never	7	en_US
c607f1ab-a33e-496e-997c-d82726c4248e	7f99b900-07fd-4acf-99e0-839abecb8e52	tous les jours	1	fr_FR
55d55a04-cefe-4133-8498-0541d2f0f66d	7f99b900-07fd-4acf-99e0-839abecb8e52	une fois par semaine	2	fr_FR
574a1252-256d-485e-87cd-4ffcd97f05a2	7f99b900-07fd-4acf-99e0-839abecb8e52	deux fois par mois	3	fr_FR
e331be94-0efc-4a12-a257-f9d3c47fb810	7f99b900-07fd-4acf-99e0-839abecb8e52	une fois par mois	4	fr_FR
5e323dae-fbe6-4300-a5c2-deaf435d6925	7f99b900-07fd-4acf-99e0-839abecb8e52	une fois tous les deux mois	5	fr_FR
8b2b905a-90b1-4dff-9de5-47d548d190b9	7f99b900-07fd-4acf-99e0-839abecb8e52	une fois par an	6	fr_FR
f6d3eef1-2ffc-4faf-bc06-94d58c716fde	7f99b900-07fd-4acf-99e0-839abecb8e52	jamais	7	fr_FR
8de6ee2d-cd31-4cc7-a7cd-78fcdb1fa068	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Once a day	1	en_US
4a4c2486-0ecf-4a5a-bfa9-ae41a4d43c12	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Twice a week	2	en_US
da12c5f4-eb92-4bf0-8928-9b0445ca8a31	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Once a week	3	en_US
f2b58c89-9b32-491b-b939-a37847bf9170	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Once a month	4	en_US
2fc52fec-76f5-4b44-929a-ea534033a0cd	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Once a year	5	en_US
dd29e528-8d2b-4c0b-8372-e4767b2c5ed2	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Never	6	en_US
8fc83a8b-a712-4593-b859-852961488f69	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Une fois par jour	1	fr_FR
4611599a-ebb6-42d8-91c0-f18bcb29ede8	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Deux fois par semaine	2	fr_FR
9d0e3307-9992-4819-9bd0-6255959e846a	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Une fois par semaine	3	fr_FR
acf72262-d2bf-45da-89ee-b2a7fa79475b	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Une fois par mois	4	fr_FR
b57716c2-c43a-4055-9cf7-18aef943b74a	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Une fois par an	5	fr_FR
8e31f4cc-b47c-4f82-aa86-9dd1b4b73c6f	6e4ccbbd-761d-4db5-b644-c191e667a6ef	Jamais	6	fr_FR
ad2dc0bf-0f0c-4103-adc5-04e7ccfc5366	7581432f-17ec-4a91-81f2-7a25f898fe11	Never	1	en_US
a363d9a1-a32d-4f69-9fdc-480ae8a014ce	7581432f-17ec-4a91-81f2-7a25f898fe11	Once	2	en_US
1d415f27-d1ab-456e-910a-cc516c0bad58	7581432f-17ec-4a91-81f2-7a25f898fe11	Regularly	3	en_US
b3f928fb-5f4a-4153-b51f-4087a86d9361	7581432f-17ec-4a91-81f2-7a25f898fe11	Often	4	en_US
0a67db1c-488a-462f-8a28-015700ebb2db	7581432f-17ec-4a91-81f2-7a25f898fe11	All the time	5	en_US
27efe246-8513-4efd-9d92-ddac74778277	7581432f-17ec-4a91-81f2-7a25f898fe11	Jamais	1	fr_FR
cfd5a6d0-9d30-4a6c-ab52-35eccbcb6e2a	7581432f-17ec-4a91-81f2-7a25f898fe11	Une fois	2	fr_FR
14aaab12-429c-4b64-90e3-585d0991c68e	7581432f-17ec-4a91-81f2-7a25f898fe11	Régulièrement	3	fr_FR
09f9d6a3-728c-4ad6-8a4e-25b6d1d2a3e7	7581432f-17ec-4a91-81f2-7a25f898fe11	Souvent	4	fr_FR
3177e951-25a0-44e8-ba2f-43e54adef2cc	7581432f-17ec-4a91-81f2-7a25f898fe11	Tout le temps	5	fr_FR
c5eba19b-7216-403c-b359-4e0d72acf546	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Zero	1	en_US
c60e2b02-352a-4e07-85b3-5b80b2ba169f	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	1	2	en_US
fdbd63be-9281-4fcc-bd85-ae208001932a	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Between 2 and 5	3	en_US
8fca0f31-d5dd-4962-aa3d-36e3ef1a7f2a	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Between 6 and 10	4	en_US
1fcf4cec-77b0-4cf9-ad7b-3e326692afec	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Moreover	5	en_US
aea39ecd-0038-478e-9d84-abbdb03d346e	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Zero	1	fr_FR
da99f562-a9ec-458a-b4b9-6e075d892796	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	1	2	fr_FR
8ef77e9c-4593-4bfe-9aee-e0baea444211	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Entre 2 et 5	3	fr_FR
4686e4cf-bce4-4bff-a813-d7e227d2e7d2	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Entre 6 et 10	4	fr_FR
e2f645d5-adf5-4c29-ba6c-352f3de21ff5	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	Plus encore	5	fr_FR
bf3f3501-f6c4-48f7-bca3-2df90a9c2c7e	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Never	1	en_US
cdfeac0c-5c82-45a3-9fd1-e4b4b831acac	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Sometimes	2	en_US
2a866558-fcee-4699-a735-5e108446395c	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Often	3	en_US
a71ab7b2-8683-425f-b5ea-142ac8e9e042	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Too often	4	en_US
6936264a-8137-4582-88a4-9bdaa247192b	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	All the time	5	en_US
794b9b9e-3cb2-4fe3-aa93-4c87ade4d219	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Jamais	1	fr_FR
6ce17e7b-8f0e-4b04-81db-0166818fbba3	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Parfois	2	fr_FR
c11e01c6-479b-4179-b655-ff5ff8a11f6d	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Souvent	3	fr_FR
9b2501c4-6432-496e-8226-7178d304d501	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Trop souvent	4	fr_FR
461b518f-93de-42b0-9310-bdb437440255	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	Tout le temps	5	fr_FR
0807abad-94dd-4217-b9b8-d33ce43d0329	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Never	1	en_US
82d05ac5-2c51-4df0-a814-a011c7e89e3c	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Sometimes	2	en_US
9f59cb61-631a-4b8a-8fe4-3e63fbe99864	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Regularly	3	en_US
d39870ef-ced0-403b-8068-241127df4387	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Often	4	en_US
34d73cc1-4922-44e0-90a9-94af82b4316e	2c347c52-ea8a-48d3-ac24-7b964bac4e72	All the time	5	en_US
eb843402-1573-4094-8d4d-36dcaac3a7e1	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Jamais	1	fr_FR
a1737c39-287b-43bf-8857-35fb35a15a63	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Parfois	2	fr_FR
a7d203f3-a19d-449a-a4c6-c54cbe310575	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Régulièrement	3	fr_FR
a28a425c-6023-4d9e-a13e-639a58fdbef4	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Souvent	4	fr_FR
e2bbd903-febe-422b-a3d3-ce1241c3187f	2c347c52-ea8a-48d3-ac24-7b964bac4e72	Tout le temps	5	fr_FR
860e194c-bace-4dae-926d-ed269b6ad2b1	761dde46-f86f-492b-9438-67f04e870b9e	Never	1	en_US
94e9510c-0abc-4d1e-9f16-92a3042ea721	761dde46-f86f-492b-9438-67f04e870b9e	Once	2	en_US
736d17fa-f64a-441e-b766-786f6b55312f	761dde46-f86f-492b-9438-67f04e870b9e	Regularly	3	en_US
12f04d5e-34d1-4b4d-a292-f687d8530aae	761dde46-f86f-492b-9438-67f04e870b9e	Often	4	en_US
e936240f-aff6-4c42-b89f-bc7fde05c4d3	761dde46-f86f-492b-9438-67f04e870b9e	Jamais	1	fr_FR
00d3cd12-d81f-49e5-9285-97cbb11fd5ec	761dde46-f86f-492b-9438-67f04e870b9e	Une fois	2	fr_FR
ca56937b-be3e-42a0-b8a0-44557171e46c	761dde46-f86f-492b-9438-67f04e870b9e	Régulièrement	3	fr_FR
0ba83312-7f91-4532-a38b-fa638f7d751d	761dde46-f86f-492b-9438-67f04e870b9e	Souvent	4	fr_FR
19502a6f-6a88-46db-8bde-c3b59676ed38	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Zero	1	en_US
a67ebb0b-6475-4358-81e1-1d1972c15d89	3e0ee6bc-913e-4a2b-8de4-830412ad0795	1 hour	2	en_US
7ee5c8d5-913b-4610-bed9-df43794114c4	3e0ee6bc-913e-4a2b-8de4-830412ad0795	2 hours	3	en_US
4082fff3-ab4c-4af5-b3be-4a5214f87450	3e0ee6bc-913e-4a2b-8de4-830412ad0795	3 hours	4	en_US
515d6a6e-9377-4493-95b2-d09f4b13f56e	3e0ee6bc-913e-4a2b-8de4-830412ad0795	4 hours	5	en_US
3fef1ad4-5d69-4317-8ee2-8217027541c6	3e0ee6bc-913e-4a2b-8de4-830412ad0795	5 hours	6	en_US
cf66bfd5-d01b-44a4-aff9-26225491dd5d	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Between 5 and 7 hours	7	en_US
ef93789e-e222-4047-a104-6c36d7cf4740	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Between 8 and 10 hours	8	en_US
707ab74e-c37d-40a3-9b15-0b9747317b49	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Between 10 and 12 hours	9	en_US
d9bf0a16-f1f4-4c56-991a-92a67e6302ef	3e0ee6bc-913e-4a2b-8de4-830412ad0795	More than 12 hours	10	en_US
0bb7782a-0acb-4181-9f9c-03812ac87818	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Zero	1	fr_FR
69d4b342-6aa8-46ab-b132-34b72afcd98c	3e0ee6bc-913e-4a2b-8de4-830412ad0795	1 heure	2	fr_FR
7fe33685-edb8-4d1b-a2b5-3b472f797cae	3e0ee6bc-913e-4a2b-8de4-830412ad0795	2 heures	3	fr_FR
68bcaf13-5b8d-4cc2-a54a-de440c79fb99	3e0ee6bc-913e-4a2b-8de4-830412ad0795	3 heures	4	fr_FR
5b076d4f-8934-472f-80fb-b23d8f6e5079	3e0ee6bc-913e-4a2b-8de4-830412ad0795	4 heures	5	fr_FR
7d2e72c3-914a-4e83-a6ce-140c04366033	3e0ee6bc-913e-4a2b-8de4-830412ad0795	5 heures	6	fr_FR
c88db907-5fb6-4e8b-9868-1c8a140fe883	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Entre 5 et 7 heures	7	fr_FR
495a338d-ac4c-45ef-91f2-32e3adca394e	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Entre 8 et 10 heures	8	fr_FR
93e5d2f0-fccc-490c-a099-c832fbb37b2d	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Entre 10 et 12 heures	9	fr_FR
b3b51ff2-37d9-4be6-b0ef-fb42b83f2b6a	3e0ee6bc-913e-4a2b-8de4-830412ad0795	Plus de 12 heures	10	fr_FR
9a237f61-1df4-43e2-82fb-d9885d811473	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	I will do it for free	1	en_US
405294ed-195a-42e3-b8e5-05b01f83e42e	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	100	2	en_US
928b2665-bd87-44d9-81dc-c8256da5dc72	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	200	3	en_US
ce92a8ad-31da-41bb-8954-b8353f9f71c6	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	500	4	en_US
ca0a5edb-1b9c-48fe-b54b-c73907527b37	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	1000	5	en_US
07081f5a-351b-4efe-82ae-57cb1230c4f7	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	10	6	en_US
62d8fdac-b916-46ac-8d7b-cf135af45950	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	50	7	en_US
23e256a4-2ba3-4de0-8a46-47d0fb3d1e35	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	100	8	en_US
8e782ef0-888c-4583-a70d-f870c9674477	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	1,000,000	9	en_US
f71631fc-2c82-4373-b06f-09c7336a14b8	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	No way!	10	en_US
8a1060b6-549f-42dd-9950-3f24f5513940	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	Je le ferai gratuitement	1	fr_FR
d03f948b-6a80-42d1-9a03-9520158dbe34	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	100	2	fr_FR
e744be78-cdd9-41da-8169-1b51563c5f29	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	200	3	fr_FR
446d65ab-ba1f-4f72-8739-529ede6285b7	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	500	4	fr_FR
67fb3e1f-563c-49a2-99a7-f903d041b2de	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	1000	5	fr_FR
a9c795ff-7886-40f0-90c1-63bd3e5b2300	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	10000	6	fr_FR
71369541-0d44-4c6b-9133-fb193acf4189	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	50000	7	fr_FR
6e0ca163-4fda-4a80-9af3-a63c87627a59	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	100000	8	fr_FR
651fda88-47d1-43b7-a19d-39903ab48e83	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	1000000	9	fr_FR
5c31d2cc-9b03-4f7c-a101-7ec3c1987535	b2ddbbd3-85a6-4172-8cef-a83f5a777d2f	Jamais de la vie!	10	fr_FR
91fd7fd3-4c4e-4dca-b3e8-3ac64fe3dc3e	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Several times a day	1	en_US
cefd5b92-87cb-484b-aaa1-66644cd4050e	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Once a day	2	en_US
4bea1100-93cf-4cc0-9ac4-7469f520515a	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Several times a week	3	en_US
b2880e66-6ba9-4663-b893-498b494f0910	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Once a week	4	en_US
25023bfd-3a98-451b-81fb-ee89259e4c20	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Several times a month	5	en_US
3a5c2a8b-9902-458a-a0a3-fde0836e31e1	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Once a month	6	en_US
bcce6d68-0016-4a3e-92cd-edb680f8618b	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Never	7	en_US
3d7579ed-ba6c-4d82-8258-d21a5485b0b3	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Plusieurs fois par jour	1	fr_FR
3101c138-8dab-4e37-b95d-8a9e6f0a6adb	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Une fois par jour	2	fr_FR
1196efa3-381c-48ca-a15a-3796cc1f8149	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Plusieurs fois par semaine	3	fr_FR
141063e1-2b42-42ac-a370-8968fca55b4f	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Une fois par semaine	4	fr_FR
e9627ef0-b003-4c82-a551-a022e390149b	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Plusieurs fois par mois	5	fr_FR
f3ff50cd-c53a-4443-bf12-4b6d332107f8	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Une fois par mois	6	fr_FR
048db613-6bf4-452c-8c8e-650acf6c5cea	3f4ee561-7cb3-4a61-b035-ed343f0ea81e	Jamais	7	fr_FR
f794f0bb-831c-42b0-bab3-87d179f0ec33	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Impossible	1	en_US
7384cea9-53c4-4494-8afe-9f2deaae31df	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Yes, in 5 years	2	en_US
f7b2d9fc-ad3e-4c4e-b092-d37028b13618	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Yes, in 10 years	3	en_US
3b99fde7-7659-4be1-84bc-d026e70447d1	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Yes, in 50 years	4	en_US
6e60d1f3-6413-437f-981c-41858ded9a3a	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Yes, in 100 years	5	en_US
07c2ddf9-9f8d-49b6-9061-a90055e7c944	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Yes, but in over 100 years	6	en_US
901f8da8-83f0-4b94-a807-7e93d645e234	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Impossible	1	fr_FR
481f68ed-cbd1-4bc0-8792-210c74c1646e	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Oui, dans 5 ans	2	fr_FR
634675a0-767c-4493-8425-635d6beb1ef4	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Oui, dans 10 ans	3	fr_FR
bae071f9-d16a-4ef2-9e39-20f2cbfef6ec	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Oui, dans 50 ans	4	fr_FR
b117d721-ba5f-4845-b9c3-9fc01c653023	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Oui, dans 100 ans	5	fr_FR
f4eb286a-dccb-4819-9888-b04fc978af2b	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	Oui, mais dans plus de 100 ans	6	fr_FR
4eb0de6f-8f56-4d9b-8547-2012c03e523a	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Never	1	en_US
20aef26e-125b-46a3-9794-9af1157728aa	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Once	2	en_US
1ea236e0-dda6-4694-aade-84bd5f268c9b	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Regularly	3	en_US
6fedcd67-d84a-4629-a3fe-794124de3444	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Often	4	en_US
00bb1326-2e04-4a74-afbb-0eb26987799b	1f32ec15-46bc-4eaf-bb88-db4906fd095e	All the time	5	en_US
45995b71-fc13-41e9-a81f-7a792f926066	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Jamais	1	fr_FR
b5f7b048-03d5-4515-b1f8-ed7fec1e44f6	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Une fois	2	fr_FR
64c2925d-fc9d-4d4f-8221-8c4810433c2d	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Régulièrement	3	fr_FR
a2b68ff8-c1b4-4045-a7ce-8f7c545c1b1a	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Souvent	4	fr_FR
7e064820-3726-4349-b16a-1a52dc8b3da1	1f32ec15-46bc-4eaf-bb88-db4906fd095e	Tout le temps	5	fr_FR
423fe761-2214-4657-9b77-e5b6da07a2da	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Never	1	en_US
00b5e478-5fcb-414a-bceb-3732f08403eb	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Once	2	en_US
ef37dea9-ecfb-4b82-80d3-b629be8fee1e	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Regularly	3	en_US
ee92985c-ac36-44c5-ac7d-6d7aea8fdcea	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Often	4	en_US
d251fe01-dbdf-4114-9074-addc40c91f23	18a83d57-fd7d-4612-821f-1f0e59dc38ec	All the time	5	en_US
3eaede9e-de67-44f5-92ff-a9b39bbb605e	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Jamais	1	fr_FR
ca58957b-c070-4e05-a261-ebfb830027fe	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Une fois	2	fr_FR
c14ab481-cdd7-47d9-81d1-b27a56d37bdc	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Régulièrement	3	fr_FR
8758d586-13c3-47f9-8be7-c5ad5541afb9	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Souvent	4	fr_FR
9ddc9934-338f-43b2-ad3d-5d7d4004accc	18a83d57-fd7d-4612-821f-1f0e59dc38ec	Tout le temps	5	fr_FR
4c66515a-5dc4-42ea-abce-772abc798c8e	64f798f6-bec0-4331-912c-49b505ca78fe	Zero	1	en_US
9669b347-0985-4d56-9950-98fcb94583ba	64f798f6-bec0-4331-912c-49b505ca78fe	Less than 3	2	en_US
256b9e71-d832-4677-96ec-3578321a2ebd	64f798f6-bec0-4331-912c-49b505ca78fe	Between 3 and 5	3	en_US
26f05f02-3895-42e0-9648-332c0b08684a	64f798f6-bec0-4331-912c-49b505ca78fe	Between 5 and 10	4	en_US
a8b78387-cb43-4148-8e35-328f4a750e22	64f798f6-bec0-4331-912c-49b505ca78fe	Between 10 and 20	5	en_US
050fbd13-a9df-4a48-9093-fc9a0a3f3928	64f798f6-bec0-4331-912c-49b505ca78fe	Between 20 and 50	6	en_US
2e11866a-d1df-4363-9886-57172c31a54f	64f798f6-bec0-4331-912c-49b505ca78fe	More than 50	7	en_US
8d57ce35-2abb-4fed-97e3-7fb144defbce	64f798f6-bec0-4331-912c-49b505ca78fe	Zero	1	fr_FR
dcc2e521-a7f8-45d6-8350-65faf00591ea	64f798f6-bec0-4331-912c-49b505ca78fe	Moins de 3	2	fr_FR
b291ae6a-3dc9-4493-afc2-ed4b8b47783d	64f798f6-bec0-4331-912c-49b505ca78fe	Entre 3 et 5	3	fr_FR
941e1f26-6dfb-49e7-85ce-fafc2c311d58	64f798f6-bec0-4331-912c-49b505ca78fe	Entre 5 et 10	4	fr_FR
df12a6c1-7669-4daa-9f18-5f84bfc007bb	64f798f6-bec0-4331-912c-49b505ca78fe	Entre 10 et 20	5	fr_FR
08e9b261-1e51-41cb-8a18-9f58a4befca8	64f798f6-bec0-4331-912c-49b505ca78fe	Entre 20 et 50	6	fr_FR
34769157-750d-4646-961c-517799e0dcb5	64f798f6-bec0-4331-912c-49b505ca78fe	Plus de 50	7	fr_FR
85fbf533-ef58-45ca-aaa2-b8cdf3f77d15	ccfd600a-c461-4b5a-80fe-12db84877546	Never	1	en_US
54b12bca-6760-434a-ae5f-d33ee2ad74bb	ccfd600a-c461-4b5a-80fe-12db84877546	Sometimes	2	en_US
b9a2f429-7753-4ed0-8b1f-089b74af10a2	ccfd600a-c461-4b5a-80fe-12db84877546	Regularly	3	en_US
9e06ff75-abe6-4df3-ae06-abb7ecd15804	ccfd600a-c461-4b5a-80fe-12db84877546	Often	4	en_US
7a7c56de-1e52-4fd7-ba60-1faeaa556dec	ccfd600a-c461-4b5a-80fe-12db84877546	All the time	5	en_US
7d0c6404-f143-4e3b-a2c8-6cea210c69de	ccfd600a-c461-4b5a-80fe-12db84877546	Jamais	1	fr_FR
827ba563-d02f-4714-adc4-b9bc4a382810	ccfd600a-c461-4b5a-80fe-12db84877546	Parfois	2	fr_FR
31269ea0-63e1-4c26-8617-154e33d321f3	ccfd600a-c461-4b5a-80fe-12db84877546	Régulièrement	3	fr_FR
ebbd14cf-5d00-4a59-8476-da773491009a	ccfd600a-c461-4b5a-80fe-12db84877546	Souvent	4	fr_FR
fc3cef8d-eaf9-4740-9eee-9257a524a897	ccfd600a-c461-4b5a-80fe-12db84877546	Tout le temps	5	fr_FR
a071891d-6fa2-4014-9745-0c4f74fb4117	b8b40a89-dff0-483d-8e47-40a11afff475	1 time per month	1	en_US
9ac22523-771f-4828-a81d-6c3e73b05926	b8b40a89-dff0-483d-8e47-40a11afff475	1 time per week	2	en_US
b17b922a-2627-4cd3-8a3b-6e322bb17fa1	b8b40a89-dff0-483d-8e47-40a11afff475	2 times per week	3	en_US
c1251ede-71fd-4251-9b58-582d57dee9f8	b8b40a89-dff0-483d-8e47-40a11afff475	1 time per day	4	en_US
4ee645ab-e92b-4f5b-b8e7-9fde8e74315d	b8b40a89-dff0-483d-8e47-40a11afff475	2 times per day	5	en_US
1d11d1af-0beb-4123-8e27-f523eeff35f1	b8b40a89-dff0-483d-8e47-40a11afff475	As much as possible	6	en_US
f7ff6cd3-4f8e-410e-a246-465c13db7adb	b8b40a89-dff0-483d-8e47-40a11afff475	1 fois par mois	1	fr_FR
b20c31f4-43f8-4ec8-999a-785b117a6b2b	b8b40a89-dff0-483d-8e47-40a11afff475	1 fois par semaine	2	fr_FR
e0215451-0443-4529-aefd-f3bf7bf10687	b8b40a89-dff0-483d-8e47-40a11afff475	2 fois par semaine	3	fr_FR
f9048251-08a3-416e-94e0-39e48207231d	b8b40a89-dff0-483d-8e47-40a11afff475	1 fois par jour	4	fr_FR
0a3f5616-c0b1-46c9-8ba7-31abd7462699	b8b40a89-dff0-483d-8e47-40a11afff475	2 fois par jour	5	fr_FR
b836f37b-2d19-48aa-9f31-a1713890dd61	b8b40a89-dff0-483d-8e47-40a11afff475	Autant que possible	6	fr_FR
6adaa95b-3a81-4841-ba6e-e20cd3f5acea	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Zero	1	en_US
b5d82090-6557-41f1-9865-ec8842bef02c	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	1 hour	2	en_US
618b4ba7-01c6-464f-9d20-02776d342fa3	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	2 hours	3	en_US
614f122f-bc90-4846-b334-9881255c6d3c	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	3 hours	4	en_US
865a5c8c-b56c-4e81-bf96-79f19b88ed60	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	4 hours	5	en_US
cb32b77f-784a-43df-a7d8-1c09e3f68e57	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	5 hours	6	en_US
99df23d8-b149-472d-a072-bf0836cd333b	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Between 5 and 7 hours	7	en_US
b35ed1d0-bca5-4d29-9269-d96abb1ae90c	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Between 8 and 10 hours	8	en_US
15df3adb-4df9-493e-b5da-4084ca220d43	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Between 10 and 12 hours	9	en_US
dcaed6db-2db1-4398-b57b-8c1e3124bf38	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	More than 12 hours	10	en_US
447f7c94-1f7e-4386-9cd6-b19cd21e4e40	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Zero	1	fr_FR
10612cc9-770f-4961-9218-9acefd9f7c0f	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	1 heure	2	fr_FR
e1c003c0-7cac-447a-a03f-5087f10e9aef	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	2 heures	3	fr_FR
2c75a1fe-c6fd-4512-a5dc-252b65c11c2e	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	3 heures	4	fr_FR
d4685e72-8162-4eaa-9260-e18a21e17bdb	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	4 heures	5	fr_FR
20c51cd7-7f4c-4a4f-a67d-dd2918808e55	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	5 heures	6	fr_FR
2e9dee0e-4b94-4ff8-bfcd-24deb85bc82e	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Entre 5 et 7 heures	7	fr_FR
29273ed9-e26d-4e48-904b-ada873701595	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Entre 8 et 10 heures	8	fr_FR
731a90d3-cb27-45d2-9052-8b750fd65985	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Entre 10 et 12 heures	9	fr_FR
8c170720-c908-426e-b916-1fa69e077152	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	Plus de 12 heures	10	fr_FR
2e3cb31e-2126-46b3-bc5f-c80e5795cd10	5bf309eb-632c-4c84-b1d7-31b558630477	Never	1	en_US
8c06ea28-b584-4430-a43d-6e9f036a4ed1	5bf309eb-632c-4c84-b1d7-31b558630477	Sometimes	2	en_US
412de7c1-9f2e-4950-87e4-44b4cf71fdd3	5bf309eb-632c-4c84-b1d7-31b558630477	Regularly	3	en_US
2a03a494-2c7f-48ce-9250-db39c7c7bc83	5bf309eb-632c-4c84-b1d7-31b558630477	Very often	4	en_US
685fb9cd-26d5-4c4b-9b9a-6e84c4bbfcc9	5bf309eb-632c-4c84-b1d7-31b558630477	All the time	5	en_US
1755a044-5587-4e8e-9c1d-1271c07840e1	5bf309eb-632c-4c84-b1d7-31b558630477	Jamais	1	fr_FR
f46e5fbe-25be-4a45-aba6-f5a9295b7f4d	5bf309eb-632c-4c84-b1d7-31b558630477	Parfois	2	fr_FR
371f8274-a9c3-48db-884e-44014d4fcd92	5bf309eb-632c-4c84-b1d7-31b558630477	Régulièrement	3	fr_FR
eb66d5bc-7746-44f1-9c3e-c008f27e09f0	5bf309eb-632c-4c84-b1d7-31b558630477	Très souvent	4	fr_FR
b1919ed6-42b2-4206-969b-65d902d7f36b	5bf309eb-632c-4c84-b1d7-31b558630477	Tout le temps	5	fr_FR
4b0c6f70-9882-4814-ab92-8896795324a3	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Never	1	en_US
505b7813-0eae-496b-a452-7fa5defb86b4	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Once	2	en_US
b52e7734-01fe-4be0-a75d-89602077d482	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Regularly	3	en_US
10bc0cb0-fdd9-4745-ad29-0fc66aa4406c	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Often	4	en_US
7716de75-35f5-4c81-8a67-ffe0e60f7560	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Jamais	1	fr_FR
516fa121-0d4b-49c9-aa81-0288174782d4	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Une fois	2	fr_FR
703c31e5-9078-4aaf-a837-bd54e46dc67f	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Régulièrement	3	fr_FR
4e48b705-38df-4632-abbb-1b299f7a3501	e65a7285-b369-4fe8-b0d4-80a5413f2c58	Souvent	4	fr_FR
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."User" (id, "createdAt", username, "userNumber", "isOnline", "updatedAt", role, avatar) FROM stdin;
cmazpxthm0002qu3ttqezlwor	2025-05-22 18:41:57.898	Jootser2	2	f	2025-06-02 18:50:59.867	USER	/avatars/avatar_1748880277530.png
cmazpxtfz0000qu3tgg4qi5ex	2025-05-22 18:41:57.84	Jootser1	1	f	2025-06-02 22:13:33.466	LISTENER	/avatars/avatar_1748869460074.jpg
\.


--
-- Data for Name: UserAnswer; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."UserAnswer" (id, "userId", "questionGroupId", "questionOptionId", "conversationId", "answeredAt", "updatedAt", note, "isFlagged") FROM stdin;
0dffa2ec-ef95-499f-bb01-36e9b4507e4f	cmazpxthm0002qu3ttqezlwor	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	f615e9df-392f-4a98-8ed4-75197f517533	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:30:28.414	2025-05-22 21:30:28.415	\N	f
b2ab7dc0-1c72-4f47-b0d3-874706e1e8fb	cmazpxtfz0000qu3tgg4qi5ex	cecbdec4-1ff3-4e7c-9bd3-a49f14570441	04756b10-fe94-4930-acec-7c11fe2ff817	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:30:28.421	2025-05-22 21:30:28.422	\N	f
83ab495d-efb6-40f2-bdee-e14aeb3dbf77	cmazpxthm0002qu3ttqezlwor	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	bcd3bb5e-c358-4b1b-ace5-01c0b2f9d8a0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:32:15.078	2025-05-22 21:32:15.079	\N	f
8980a820-ddf1-4619-bba9-e1669d37ebb0	cmazpxtfz0000qu3tgg4qi5ex	21a26ce4-c5ef-4e9c-9ff2-f9c8e3fa3e4d	875d8713-9a73-4f63-a34b-df33eddfd17f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:32:22.289	2025-05-22 21:32:22.289	\N	f
4b385d82-559e-4c89-8a75-55fd7807a85f	cmazpxthm0002qu3ttqezlwor	6e37deb6-881d-403a-9e8e-f553f0d2fe28	07e0f7e6-8a90-466b-a813-9a046e7e842f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:33:08.622	2025-05-22 21:33:08.623	\N	f
c599b801-192e-47c3-81c9-c8c94c70c8e2	cmazpxtfz0000qu3tgg4qi5ex	6e37deb6-881d-403a-9e8e-f553f0d2fe28	07e0f7e6-8a90-466b-a813-9a046e7e842f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:33:09.683	2025-05-22 21:33:09.683	\N	f
3eaba3cc-1744-4c3f-b05a-c3c75f928a70	cmazpxtfz0000qu3tgg4qi5ex	405ba252-6b60-4426-a300-25e7932c2593	5ea769e8-141c-441a-b21e-70f033bc83c5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:43:53.724	2025-05-22 21:43:53.725	\N	f
2057072b-a42f-4447-8c13-02dd5170cc82	cmazpxthm0002qu3ttqezlwor	405ba252-6b60-4426-a300-25e7932c2593	5ea769e8-141c-441a-b21e-70f033bc83c5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:43:55.436	2025-05-22 21:43:55.437	\N	f
abceed01-a2b5-4346-9968-019ead66da23	cmazpxthm0002qu3ttqezlwor	291601c1-9b3c-49a2-a78c-e46e9137b001	1b6dd3d9-eee6-4162-82f1-9f1eb3f58a2a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:55:41.937	2025-05-22 21:55:41.938	\N	f
49839adc-0566-4624-a662-c938e943aa3d	cmazpxtfz0000qu3tgg4qi5ex	291601c1-9b3c-49a2-a78c-e46e9137b001	1b6dd3d9-eee6-4162-82f1-9f1eb3f58a2a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 21:55:44.065	2025-05-22 21:55:44.067	\N	f
da442bcb-9525-4d2d-862a-f3157fe35cc6	cmazpxthm0002qu3ttqezlwor	64e790c9-1224-4ef9-9b4c-34c8740d8f24	fc9589c5-363a-4759-8db4-1ce8b6fdf140	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 22:16:50.187	2025-05-22 22:16:50.189	\N	f
2cdbc897-fabd-4c70-8a62-359eef56a3d0	cmazpxtfz0000qu3tgg4qi5ex	64e790c9-1224-4ef9-9b4c-34c8740d8f24	fc9589c5-363a-4759-8db4-1ce8b6fdf140	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 22:16:55.1	2025-05-22 22:16:55.101	\N	f
781e6006-b23f-495f-b966-c5a5b10a0e4b	cmazpxthm0002qu3ttqezlwor	be520403-d204-4be1-9bb9-9a3e1356d4c3	219423d1-caee-424c-9ab1-5db4680a319d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 22:19:39.269	2025-05-22 22:19:39.27	\N	f
5b1b6945-8f08-49d9-8535-15a2bc526f11	cmazpxtfz0000qu3tgg4qi5ex	be520403-d204-4be1-9bb9-9a3e1356d4c3	eb3b9c71-c210-499e-b883-fbaa768e0e4f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-22 22:19:41.641	2025-05-22 22:19:41.642	\N	f
c92b4e8f-24f9-4b34-9669-1c0e2409b004	cmazpxthm0002qu3ttqezlwor	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	60ff3203-dfed-450e-bef1-88691a93dedb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 07:06:44.511	2025-05-23 07:06:44.512	\N	f
7e78e278-41f2-4222-a032-3d4454adce85	cmazpxtfz0000qu3tgg4qi5ex	e3a38a61-b7a1-4bb5-a3b5-a48b96c016f6	c5a6d275-73a2-4af8-9357-eced795ba305	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 07:06:46.245	2025-05-23 07:06:46.246	\N	f
d75b6685-947b-4ade-a2f9-d6901258f5e0	cmazpxtfz0000qu3tgg4qi5ex	cd491b5c-c7a3-40ad-b390-b41481813ed6	15ba5adb-6ab4-4e9b-926e-1fba35de3560	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 07:08:20.818	2025-05-23 07:08:20.819	\N	f
ed020196-5c8f-45f1-8132-776daf2b3cfe	cmazpxthm0002qu3ttqezlwor	cd491b5c-c7a3-40ad-b390-b41481813ed6	65095a03-a1bd-4246-a9db-55d284cb6905	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 07:08:27.762	2025-05-23 07:08:27.763	\N	f
588bff26-b957-410e-81fb-ac381bb4bb30	cmazpxthm0002qu3ttqezlwor	bd7364ae-c249-45b1-b840-ffefae1fc337	185d0171-2d74-4fb3-b7a7-b2c104da6a05	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 07:46:17.776	2025-05-23 07:46:17.777	\N	f
3cf73602-7add-471c-b724-b1733c7b9710	cmazpxtfz0000qu3tgg4qi5ex	bd7364ae-c249-45b1-b840-ffefae1fc337	2ea98bac-498c-4203-8bb2-7532026ebde0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 07:46:18.966	2025-05-23 07:46:18.967	\N	f
cfa39dd5-4442-45c6-b56d-45059207271c	cmazpxthm0002qu3ttqezlwor	07817ed1-248b-48c5-8a3f-8bab1d363f2b	d29a7ca9-7c2f-4cf6-9cd5-515e7f170979	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 07:47:03.593	2025-05-23 07:47:03.594	\N	f
4b592eb6-7b5e-4dd5-a774-45fd8d9343b4	cmazpxtfz0000qu3tgg4qi5ex	07817ed1-248b-48c5-8a3f-8bab1d363f2b	67f39752-e3b6-4ac9-bda6-e421f0bce5a7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 07:47:05.905	2025-05-23 07:47:05.906	\N	f
d9adf97d-e103-48c5-bb7e-d7563f216e86	cmazpxtfz0000qu3tgg4qi5ex	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	0c8b6146-4aff-47ea-8eb4-a937ffff95d7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 08:46:48.885	2025-05-23 08:46:48.887	\N	f
10aa4656-c218-4561-8695-057de8edc376	cmazpxthm0002qu3ttqezlwor	8a4bb1f5-d6e9-4421-9dd3-c33d2019d1ea	29bc2ff1-30e0-45c1-a069-c265fd454088	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 08:46:50.08	2025-05-23 08:46:50.082	\N	f
1105e4aa-fd96-4c0a-8698-b3cad444eac9	cmazpxtfz0000qu3tgg4qi5ex	c3faadfe-b096-448d-a704-868d3d6fbadf	868953bb-17bf-4937-bd12-462f7b34649d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 08:48:51.254	2025-05-23 08:48:51.256	\N	f
9933933b-e1f3-4ae4-b4dd-953b34413ab5	cmazpxthm0002qu3ttqezlwor	c3faadfe-b096-448d-a704-868d3d6fbadf	868953bb-17bf-4937-bd12-462f7b34649d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 08:48:52.404	2025-05-23 08:48:52.41	\N	f
6d07d1e3-a0d6-4649-8ba6-1caa321f9c62	cmazpxtfz0000qu3tgg4qi5ex	eb363c21-ad10-43d8-a05f-1c725b5e9737	aaaf113a-d506-4ffe-8037-c6319b1c2271	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 10:44:44.135	2025-05-23 10:44:44.136	\N	f
7e636b40-2dc7-4cb4-ad3b-7354ff65cdcc	cmazpxthm0002qu3ttqezlwor	eb363c21-ad10-43d8-a05f-1c725b5e9737	aaaf113a-d506-4ffe-8037-c6319b1c2271	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 10:44:45.23	2025-05-23 10:44:45.231	\N	f
83db12b9-0a13-40ee-8cc9-65b8eb2a07bc	cmazpxtfz0000qu3tgg4qi5ex	be82911a-8f3c-4352-a469-dc336542eb58	5f2b752e-b323-4a2e-86eb-fa2de3589512	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 12:19:13.325	2025-05-23 12:19:13.326	\N	f
dfb720c0-05aa-4629-aff3-d6aba4d5cb9c	cmazpxthm0002qu3ttqezlwor	be82911a-8f3c-4352-a469-dc336542eb58	5df17a27-71cd-4754-a236-ecf81db846ec	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 12:19:15.793	2025-05-23 12:19:15.794	\N	f
5d3a98aa-b999-4664-843d-de134c90c408	cmazpxtfz0000qu3tgg4qi5ex	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	60325f61-8483-48ab-a772-4f91ea72d9be	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 13:58:17.652	2025-05-23 13:58:17.653	\N	f
f74fd75f-0c51-42e5-850d-69a3cfe509f1	cmazpxthm0002qu3ttqezlwor	9aa838a7-aa14-45ae-8c3b-9c7597d7acb0	55ab844e-2065-407f-9690-2199ce02476a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-23 13:58:19.084	2025-05-23 13:58:19.085	\N	f
05496195-d64e-4e29-b2e7-8037fe803893	cmazpxthm0002qu3ttqezlwor	0ce2cf9a-1de1-4018-860c-790a286728ed	f22ad733-cd2c-41ec-8b18-19216996d182	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 12:32:54.779	2025-05-26 12:32:54.781	\N	f
c5226e93-068b-465a-accb-3e4b0f670aba	cmazpxtfz0000qu3tgg4qi5ex	0ce2cf9a-1de1-4018-860c-790a286728ed	b3cba082-1741-4d03-b94a-1e487e09ed28	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 12:32:55.921	2025-05-26 12:32:55.922	\N	f
ee5c67d9-ff6c-4451-810d-5b486ed18c73	cmazpxtfz0000qu3tgg4qi5ex	6f41cc91-25c3-4e8d-afca-98c15aa707ef	2ad6dde5-6385-4a43-a56f-3f82f24a46f8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 15:42:43.975	2025-05-26 15:42:43.976	\N	f
45516a83-5dfa-436b-a79f-29bb89d2bbdd	cmazpxthm0002qu3ttqezlwor	6f41cc91-25c3-4e8d-afca-98c15aa707ef	2ad6dde5-6385-4a43-a56f-3f82f24a46f8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 15:42:45.14	2025-05-26 15:42:45.141	\N	f
c4bb0345-5ee5-4259-9134-04e2fabf8fc9	cmazpxthm0002qu3ttqezlwor	d63fec99-6944-46fc-97ed-08f1d44e09f0	ceee6817-e0e1-4576-a6fd-6e6f77ba0895	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 18:30:13.762	2025-05-26 18:30:13.763	\N	f
e397c4e0-9c3e-4051-b8c7-158c31373054	cmazpxtfz0000qu3tgg4qi5ex	d63fec99-6944-46fc-97ed-08f1d44e09f0	d16a5509-5d6e-4935-b000-9b5bd82dcc0f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 18:30:14.764	2025-05-26 18:30:14.766	\N	f
e818c046-8cbb-4e9e-a2de-9ef3d6cd7658	cmazpxthm0002qu3ttqezlwor	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	c4bbaba1-983d-4306-9997-a9ba236b2e38	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 19:54:04.954	2025-05-26 19:54:04.955	\N	f
5e3b7f38-f76f-4676-ba14-140ab62279d6	cmazpxtfz0000qu3tgg4qi5ex	82c9c08c-4fff-4ac2-8a3c-55c093c3bcf0	c4bbaba1-983d-4306-9997-a9ba236b2e38	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 19:54:06.622	2025-05-26 19:54:06.623	\N	f
5c556862-9874-4b1d-9ad4-be9844502bfe	cmazpxthm0002qu3ttqezlwor	0048fc62-9d18-4e28-9ee5-11187507e3db	b7dcfcc3-3771-4ed9-a445-df9b04bf3ad6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 19:55:42.773	2025-05-26 19:55:42.775	\N	f
9f73f82f-b314-4f18-95dd-178cbc823592	cmazpxtfz0000qu3tgg4qi5ex	0048fc62-9d18-4e28-9ee5-11187507e3db	b7dcfcc3-3771-4ed9-a445-df9b04bf3ad6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 19:55:44.663	2025-05-26 19:55:44.664	\N	f
1de16a55-9158-447d-887a-ddc86061ec0a	cmazpxtfz0000qu3tgg4qi5ex	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	c00851e9-df11-49b6-8a7a-98a2e17e4a72	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 20:39:39.766	2025-05-26 20:39:39.767	\N	f
1260ab15-bd7e-442c-93d5-ddef70c70671	cmazpxthm0002qu3ttqezlwor	ed8ee2b4-f8a7-433a-bde5-3d1e3736b0c7	c00851e9-df11-49b6-8a7a-98a2e17e4a72	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 20:39:41.927	2025-05-26 20:39:41.928	\N	f
8cc7bdfa-881b-40a7-bb19-bd09ed043ed0	cmazpxthm0002qu3ttqezlwor	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	6e609621-46aa-4efa-b789-480eec37a61e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 20:43:03.275	2025-05-26 20:43:03.277	\N	f
2deec9a7-f414-4cd7-8452-b9c289dca8e3	cmazpxtfz0000qu3tgg4qi5ex	aabd15ee-f0c2-4722-9904-58e9daeb4cf2	544faa7c-b395-4c97-93ce-f99cace5dd96	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 20:43:05.182	2025-05-26 20:43:05.184	\N	f
20bd9d6d-2abe-4253-b3bc-6f307b2b13b5	cmazpxtfz0000qu3tgg4qi5ex	e760d7bb-a053-4cae-a04c-8a47e2405b17	59f7aff0-cb87-4865-b200-e519a853fe13	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 20:56:55.429	2025-05-26 20:56:55.43	\N	f
b3853ae0-38e8-4751-bd6d-a394c7626497	cmazpxthm0002qu3ttqezlwor	e760d7bb-a053-4cae-a04c-8a47e2405b17	d4a6b5ce-4160-451b-a833-c3b49698457d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 20:56:55.515	2025-05-26 20:56:55.516	\N	f
cab608d9-f099-4a27-933c-51852ef3bdb0	cmazpxtfz0000qu3tgg4qi5ex	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	0ce2b0eb-17a0-4803-85da-79dff89e0704	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:00:43.883	2025-05-26 21:00:43.885	\N	f
35b1a36e-58d9-446a-93f9-658a35710de6	cmazpxthm0002qu3ttqezlwor	fe12de5d-0cf9-4288-a7ee-5682af52ceb2	36e141fa-0f69-4db3-9a42-e0ecfaa34a06	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:00:45.931	2025-05-26 21:00:45.932	\N	f
634aa289-2fa5-43c4-bc34-6e23830facf5	cmazpxthm0002qu3ttqezlwor	f03edd14-239b-4e70-a6c1-44d5da27960a	bea68516-c71d-4f7b-ad60-22a62ff97836	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:00:59.254	2025-05-26 21:00:59.256	\N	f
0e0f1906-1bc1-48a5-b1bd-fecadcd2a4ec	cmazpxtfz0000qu3tgg4qi5ex	f03edd14-239b-4e70-a6c1-44d5da27960a	222ef9a7-aa9e-4036-b6cb-eed1dd993390	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:01:00.783	2025-05-26 21:01:00.785	\N	f
58548b8c-5af4-4e95-ab34-4b821256c19c	cmazpxthm0002qu3ttqezlwor	30f70e5f-30f6-496e-9a4f-7da1bf533416	84f1970b-0d5d-4ef0-9143-2c083101adbf	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:01:11.009	2025-05-26 21:01:11.01	\N	f
d674c774-191a-4de6-b99c-fd412d2e9e9e	cmazpxtfz0000qu3tgg4qi5ex	30f70e5f-30f6-496e-9a4f-7da1bf533416	84f1970b-0d5d-4ef0-9143-2c083101adbf	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:01:14.094	2025-05-26 21:01:14.095	\N	f
fa392841-f86a-48a3-942f-a0bbd81a86ab	cmazpxthm0002qu3ttqezlwor	4adf2538-72ec-40a1-8ac2-aa0522918bce	222c78ed-0d34-43d3-82e5-50b1aaef31c2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:01:20.311	2025-05-26 21:01:20.312	\N	f
8ea461b6-2b34-4cf9-b458-4ec7b926891c	cmazpxtfz0000qu3tgg4qi5ex	4adf2538-72ec-40a1-8ac2-aa0522918bce	8c90af62-1e1b-460e-b5ae-81a612a6485c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:01:21.811	2025-05-26 21:01:21.813	\N	f
457a6d40-e622-44f7-bfe1-b4e0efc93c70	cmazpxtfz0000qu3tgg4qi5ex	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	81d9759c-5de7-4d2d-9ddf-00a19e0d8a2b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:05:18.29	2025-05-26 21:05:18.291	\N	f
eb11ab67-fb4d-4339-b4cc-9edc18c10a42	cmazpxthm0002qu3ttqezlwor	e10fe255-3cb5-4707-9cd1-0f6b06a35e8c	81d9759c-5de7-4d2d-9ddf-00a19e0d8a2b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:05:19.774	2025-05-26 21:05:19.775	\N	f
606b91cb-4a7a-4802-81ae-4471f388c616	cmazpxtfz0000qu3tgg4qi5ex	912c3636-3a5a-4877-bae4-05e9f3028fd5	9756d7cd-1200-4346-bd72-753e693724b6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:05:33.387	2025-05-26 21:05:33.388	\N	f
f9cc3dee-695a-48e0-bd4e-ac37a6764f70	cmazpxthm0002qu3ttqezlwor	912c3636-3a5a-4877-bae4-05e9f3028fd5	9756d7cd-1200-4346-bd72-753e693724b6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:05:35.212	2025-05-26 21:05:35.213	\N	f
82acf115-314b-49ba-9728-b3d2d6f630b0	cmazpxthm0002qu3ttqezlwor	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	3fa8b4e1-1fa8-4147-bb0b-ae41071c0106	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:07:04.476	2025-05-26 21:07:04.477	\N	f
4f2ba793-811c-48dc-af80-2981ad469a40	cmazpxtfz0000qu3tgg4qi5ex	ca5fdb1a-cf4a-4a7c-a8ab-cd23a3b39255	d1374d23-8971-4129-a085-6ce675d56992	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:07:06.966	2025-05-26 21:07:06.973	\N	f
6d5995de-24e2-475e-8d7f-3916a43d8701	cmazpxthm0002qu3ttqezlwor	6b737cf0-ec65-42d7-9bd5-2159c5889e05	f668118b-01b5-4faa-8b70-81db0d4d6c44	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:11:16.963	2025-05-26 21:11:16.965	\N	f
f460932f-b976-44eb-9a7a-a12c67b63c1e	cmazpxtfz0000qu3tgg4qi5ex	6b737cf0-ec65-42d7-9bd5-2159c5889e05	f668118b-01b5-4faa-8b70-81db0d4d6c44	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:11:20.09	2025-05-26 21:11:20.091	\N	f
9c630d8c-28ef-46a6-8bc3-b5068c8fceb8	cmazpxtfz0000qu3tgg4qi5ex	23b8fa1e-dd26-434f-b714-00c80284a124	715ac052-0c8c-4964-a07c-f1200a0f7d55	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:17:59.431	2025-05-26 21:17:59.432	\N	f
865f3488-b9ad-4f83-b0d1-4b4e5d24c173	cmazpxthm0002qu3ttqezlwor	23b8fa1e-dd26-434f-b714-00c80284a124	3557dd13-1616-4ae6-b50f-01737c5b7d72	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:17:59.962	2025-05-26 21:17:59.963	\N	f
541c2731-eecc-4546-a943-03daf63bba9a	cmazpxtfz0000qu3tgg4qi5ex	b0f828e0-6620-4249-b6f7-8523f1dc91c8	1ee2c732-5d4c-4d2e-a517-5851a92e28b9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:21:25.038	2025-05-26 21:21:25.039	\N	f
0a1110ba-9339-4673-b5cc-e20310349350	cmazpxthm0002qu3ttqezlwor	b0f828e0-6620-4249-b6f7-8523f1dc91c8	4032d60a-b9f7-4ea4-9a54-e69547f34ff4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:21:25.886	2025-05-26 21:21:25.887	\N	f
02d0389c-440c-4a13-a1a4-7446491878a8	cmazpxthm0002qu3ttqezlwor	19d491a3-88f7-4b55-a615-1538bd85e488	c1b9d9e9-38d8-416f-9604-49b644dca4b1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:25:34.376	2025-05-26 21:25:34.378	\N	f
6728bebb-b788-4ea3-af86-7e0a66e43d88	cmazpxtfz0000qu3tgg4qi5ex	19d491a3-88f7-4b55-a615-1538bd85e488	a86373a6-c209-47f4-a2cf-bd2ab7e021b8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:25:35.28	2025-05-26 21:25:35.28	\N	f
631c3775-85b0-4af1-a9db-a06f4398f3f7	cmazpxthm0002qu3ttqezlwor	c215ba8c-7f03-4623-8a29-1271ca7b0c79	4a0daf66-dd10-4811-8b17-c9e494e16ef4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:29:16.64	2025-05-26 21:29:16.641	\N	f
efc9a2bd-d4ba-441b-b3d2-5cf6e980988c	cmazpxtfz0000qu3tgg4qi5ex	c215ba8c-7f03-4623-8a29-1271ca7b0c79	64b53794-11c6-4681-8f0a-1a1d8b6b6eb5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:29:18.514	2025-05-26 21:29:18.515	\N	f
a67b05a0-1cfb-44d7-879c-8b882e63387e	cmazpxthm0002qu3ttqezlwor	61caff10-9b14-48c6-ad76-4a04a5e06c06	b70501a2-edf6-40b9-a76b-06012291dbe1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:31:39.265	2025-05-26 21:31:39.267	\N	f
ad05089f-c8b2-4354-adfe-b2b94ad1c3a3	cmazpxtfz0000qu3tgg4qi5ex	61caff10-9b14-48c6-ad76-4a04a5e06c06	f7401139-d54e-464c-890b-ea76ba39dcd2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:31:39.271	2025-05-26 21:31:39.271	\N	f
45883b8c-00d5-497b-af86-c2af6f3b82e4	cmazpxtfz0000qu3tgg4qi5ex	cfc5ac21-333d-4f60-93cd-542a39a65749	04a28715-4988-4072-a9cd-e989b992245c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:34:17.797	2025-05-26 21:34:17.798	\N	f
54160177-c342-46ef-bb6e-258f993ee77b	cmazpxthm0002qu3ttqezlwor	cfc5ac21-333d-4f60-93cd-542a39a65749	ad581eca-6880-4478-96a0-5ba6a5c96b59	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:34:19.868	2025-05-26 21:34:19.869	\N	f
0d6610c5-50be-4703-a653-cfee4d56174f	cmazpxtfz0000qu3tgg4qi5ex	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	6650f3e4-e67a-416b-894f-75100895863e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:36:11.636	2025-05-26 21:36:11.637	\N	f
cf988f78-b908-41a3-befd-4da3290bf0f6	cmazpxthm0002qu3ttqezlwor	d924fa74-b575-4dc6-b5cd-8dea3cbf6ce5	b63d3265-49c5-400e-8212-e4389559e899	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:36:14.564	2025-05-26 21:36:14.566	\N	f
868615b2-0692-4593-aa8c-0f7643bddee3	cmazpxthm0002qu3ttqezlwor	572e63a5-9858-4b31-a50f-2b3b97223bb2	94e9d057-be45-43b3-823d-2aa09184e2c4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:37:00.34	2025-05-26 21:37:00.341	\N	f
431d9ed1-e2db-4b44-88d4-b296b90734b4	cmazpxtfz0000qu3tgg4qi5ex	572e63a5-9858-4b31-a50f-2b3b97223bb2	e9b07451-7685-49be-99c7-bc6531541922	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:37:05.99	2025-05-26 21:37:05.991	\N	f
27359996-df31-467b-b701-418c29e63131	cmazpxtfz0000qu3tgg4qi5ex	14da454e-4996-4129-8432-e27cb1cf00c3	915a6f85-b9ec-4def-afb7-cd0c0c4a104e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:38:21.298	2025-05-26 21:38:21.3	\N	f
13d8f197-1f84-45c1-be18-748246ac705b	cmazpxthm0002qu3ttqezlwor	14da454e-4996-4129-8432-e27cb1cf00c3	487e4333-eb22-4d7d-acb2-e63723b03798	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:38:22.925	2025-05-26 21:38:22.927	\N	f
57b9919a-bb53-4880-9309-62f081c4824e	cmazpxthm0002qu3ttqezlwor	90f34cab-a886-4db8-9267-3dc055e34cc7	ab3edd35-eab6-4f32-8200-66b85cdc5f78	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:38:30.686	2025-05-26 21:38:30.687	\N	f
abca1961-d456-4157-aa61-565b7136e0e6	cmazpxtfz0000qu3tgg4qi5ex	90f34cab-a886-4db8-9267-3dc055e34cc7	dd7db3cb-eee7-466c-98a1-37cf102e77e9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:38:31.503	2025-05-26 21:38:31.504	\N	f
fd8de17f-4076-4b9b-8dfb-4350126c1f7b	cmazpxtfz0000qu3tgg4qi5ex	cf90b94e-e441-4f93-83f1-566752861202	4765c924-51ab-42ed-a94f-d406c28a8d25	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:39:08.527	2025-05-26 21:39:08.528	\N	f
88875998-9e76-4c26-9be3-c218e4126729	cmazpxthm0002qu3ttqezlwor	cf90b94e-e441-4f93-83f1-566752861202	4765c924-51ab-42ed-a94f-d406c28a8d25	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:39:10.105	2025-05-26 21:39:10.106	\N	f
8cb9069b-0207-468a-b742-b4d3f6366241	cmazpxthm0002qu3ttqezlwor	daf87f3f-f68a-40b7-a90c-d097a594f8b6	3c8ce829-c4b6-442d-9a3d-6678d7795456	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:45:14.866	2025-05-26 21:45:14.867	\N	f
3e9d4f0e-a90f-484d-8460-3a64625b0d4c	cmazpxtfz0000qu3tgg4qi5ex	daf87f3f-f68a-40b7-a90c-d097a594f8b6	fd176233-d704-4a07-99fb-2fdc38c885f7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:45:14.871	2025-05-26 21:45:14.871	\N	f
fb894278-c3b9-4e77-ae1b-70fb6c2cffb5	cmazpxthm0002qu3ttqezlwor	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	110bb842-4419-4851-88f0-5623c711f04d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:45:40.45	2025-05-26 21:45:40.451	\N	f
e3095dd8-ea27-4eab-bf11-29b26e8b1cc1	cmazpxtfz0000qu3tgg4qi5ex	31c0a592-e03e-470b-8acf-d9dd0fbc92ac	708d8faf-18c9-46a2-8c61-5b9bdb226cd1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:45:42.201	2025-05-26 21:45:42.203	\N	f
9ad3029f-9678-4c3a-8203-f5e99f3c6830	cmazpxtfz0000qu3tgg4qi5ex	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	56a22e6b-e520-456f-bee5-914cb404483e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:50:01.411	2025-05-26 21:50:01.412	\N	f
36c32930-519e-4ca0-8b66-7ec3c789fde5	cmazpxthm0002qu3ttqezlwor	2897e9c9-ea5d-4328-9730-3eaf6d8cc862	56a22e6b-e520-456f-bee5-914cb404483e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:50:02.821	2025-05-26 21:50:02.822	\N	f
8648bd30-4a20-4a6e-9e55-585bae145f3e	cmazpxtfz0000qu3tgg4qi5ex	3d221b83-94d7-4992-a6fd-d15f7b201dd1	ee2adaa0-8209-4d4d-9c9d-ef2f51a27a64	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:50:08.29	2025-05-26 21:50:08.292	\N	f
685856b0-ad66-4d12-a31b-cdf75bf56a17	cmazpxthm0002qu3ttqezlwor	3d221b83-94d7-4992-a6fd-d15f7b201dd1	ee2adaa0-8209-4d4d-9c9d-ef2f51a27a64	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:50:11.097	2025-05-26 21:50:11.098	\N	f
bb9e54c3-ab8c-4583-9117-f9581e585213	cmazpxthm0002qu3ttqezlwor	17710c4a-ceea-4f99-8e8a-9ea7be68df69	bb37ed16-f94e-427c-b92d-b3c106da1e74	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:50:17.839	2025-05-26 21:50:17.84	\N	f
d4fe2156-41d3-4ae0-a457-5af2490df94c	cmazpxtfz0000qu3tgg4qi5ex	17710c4a-ceea-4f99-8e8a-9ea7be68df69	bb37ed16-f94e-427c-b92d-b3c106da1e74	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:50:20.371	2025-05-26 21:50:20.372	\N	f
88b7d050-82c4-4786-93aa-570e06f5e18b	cmazpxtfz0000qu3tgg4qi5ex	761dde46-f86f-492b-9438-67f04e870b9e	00d3cd12-d81f-49e5-9285-97cbb11fd5ec	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:51:14.14	2025-05-26 21:51:14.141	\N	f
90ab7833-29f1-429f-8af3-d441fce9c0dd	cmazpxthm0002qu3ttqezlwor	761dde46-f86f-492b-9438-67f04e870b9e	e936240f-aff6-4c42-b89f-bc7fde05c4d3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:51:15.856	2025-05-26 21:51:15.856	\N	f
d5e3cf76-e006-497a-a2a0-abdfd769ed4f	cmazpxthm0002qu3ttqezlwor	1682619d-39ab-446f-973f-ae2c1b7820da	b7ade189-d6a7-4fe1-8d3d-f1d2f2b15806	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:51:18.633	2025-05-26 21:51:18.634	\N	f
833141c6-b58e-43f2-91c5-345cd88df8eb	cmazpxtfz0000qu3tgg4qi5ex	1682619d-39ab-446f-973f-ae2c1b7820da	b7ade189-d6a7-4fe1-8d3d-f1d2f2b15806	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:51:20.564	2025-05-26 21:51:20.565	\N	f
7dd55685-d022-4764-b6f2-8761f8bb95c6	cmazpxtfz0000qu3tgg4qi5ex	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	ec2172d5-23e5-46aa-9011-77ab0891327b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:53:04.387	2025-05-26 21:53:04.388	\N	f
4e30a21a-4c7a-4a52-bc93-0fb644be5295	cmazpxthm0002qu3ttqezlwor	d8ffc4c6-049b-46d6-9c73-ec7bb437bd0c	a7cd5af3-5e21-4780-9af4-93b346e51d89	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:53:05.206	2025-05-26 21:53:05.206	\N	f
3188c882-be16-41ca-86e2-43473ec037bc	cmazpxtfz0000qu3tgg4qi5ex	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	4686e4cf-bce4-4bff-a813-d7e227d2e7d2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:53:11.412	2025-05-26 21:53:11.413	\N	f
5b243507-8aae-4ce9-812c-8bc314102fec	cmazpxthm0002qu3ttqezlwor	43eb41a3-0d85-4bde-a47a-abc5c3e10fe4	aea39ecd-0038-478e-9d84-abbdb03d346e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:53:12.915	2025-05-26 21:53:12.917	\N	f
4b2420c2-07a7-4d6f-8126-c8a6dcbdaca8	cmazpxtfz0000qu3tgg4qi5ex	e3136214-550f-4058-9855-487bac6b4dc9	35643412-e9c6-4eaa-99ad-87bd8f20bdd1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:53:17.832	2025-05-26 21:53:17.833	\N	f
051ef94e-5c31-46e1-82a1-a7824c1be4f8	cmazpxthm0002qu3ttqezlwor	e3136214-550f-4058-9855-487bac6b4dc9	99ee5be6-bf36-420e-992b-29d4da7d5e3e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:53:19.478	2025-05-26 21:53:19.479	\N	f
1c7d8bcc-0d9d-4ada-9010-d137a5aa40b0	cmazpxtfz0000qu3tgg4qi5ex	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	efcf0879-afa8-4d0e-bb77-bcdb78163781	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:53:24.846	2025-05-26 21:53:24.847	\N	f
83ac2f30-5099-4afb-bae9-b9995ed77cbd	cmazpxthm0002qu3ttqezlwor	2f13abc0-d927-46e7-9aeb-d7acb79d42bb	efcf0879-afa8-4d0e-bb77-bcdb78163781	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:53:27.089	2025-05-26 21:53:27.09	\N	f
90576705-e815-4d7f-8cf2-02e9c4caf6ed	cmazpxthm0002qu3ttqezlwor	8b4e4268-8871-433e-aeda-871ea6168258	9c712274-baaf-4475-9cc5-d9cf51c383f5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:55:36.383	2025-05-26 21:55:36.384	\N	f
86f8f163-f6b8-426c-9bda-152aa9e5a3de	cmazpxtfz0000qu3tgg4qi5ex	8b4e4268-8871-433e-aeda-871ea6168258	9c712274-baaf-4475-9cc5-d9cf51c383f5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:55:36.864	2025-05-26 21:55:36.865	\N	f
e8f630d8-036d-4e32-ad6e-d4ad615621b9	cmazpxtfz0000qu3tgg4qi5ex	0d9a0a12-85a6-40d5-8335-df90740abcf7	774c11c5-374a-41e6-a422-448caac65458	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:56:14.816	2025-05-26 21:56:14.817	\N	f
2beb78f7-410c-40cf-8c05-2f79c81b51e9	cmazpxthm0002qu3ttqezlwor	0d9a0a12-85a6-40d5-8335-df90740abcf7	f633768f-e584-4d96-b34b-dde27b5dda89	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:56:16.33	2025-05-26 21:56:16.331	\N	f
4d9e71d1-2037-45c0-b0a3-e8d481526d95	cmazpxthm0002qu3ttqezlwor	0b145c11-7769-4478-b41b-46cb17c41515	ac426bb9-f839-4bfe-9307-63f450b2bc15	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:56:34.335	2025-05-26 21:56:34.337	\N	f
c2f7db89-c0f0-445e-9e0f-25781ea57f29	cmazpxtfz0000qu3tgg4qi5ex	0b145c11-7769-4478-b41b-46cb17c41515	ac426bb9-f839-4bfe-9307-63f450b2bc15	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:56:35.924	2025-05-26 21:56:35.925	\N	f
8e00bf28-d358-4d58-9cfb-acbc62aa20fb	cmazpxtfz0000qu3tgg4qi5ex	42da9e30-776a-492c-b355-c8b79aa6fc7d	37455478-3a6d-4c5c-a866-5f1818734e07	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:56:47.096	2025-05-26 21:56:47.097	\N	f
cd34338d-1d3e-4324-a55c-e0b9c6d75fab	cmazpxthm0002qu3ttqezlwor	42da9e30-776a-492c-b355-c8b79aa6fc7d	524aaee7-2ada-46fd-a859-db6a4c2237d9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:56:48.561	2025-05-26 21:56:48.563	\N	f
abb9e08b-64e9-41f6-899f-74d914c3b109	cmazpxthm0002qu3ttqezlwor	98398a41-fecc-4fa6-9697-89911e0e4644	1fee53ac-804c-4a8d-91d3-862a98a171ba	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:56:54.378	2025-05-26 21:56:54.379	\N	f
e6ba3ab0-b829-4600-89a5-8749214fa73b	cmazpxtfz0000qu3tgg4qi5ex	98398a41-fecc-4fa6-9697-89911e0e4644	c18a90bd-f550-422d-abac-107291cae3fb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:56:57.065	2025-05-26 21:56:57.066	\N	f
a64ec962-f2cb-49f2-97b3-0bfe18b26926	cmazpxtfz0000qu3tgg4qi5ex	484a7e91-2ffe-44ce-8635-d6576739734f	d5d94eaf-f002-41e9-ad87-8b964f1f1e3a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:58:03.37	2025-05-26 21:58:03.371	\N	f
ea90e379-8edc-46ee-bfd7-1612508ce7d0	cmazpxthm0002qu3ttqezlwor	484a7e91-2ffe-44ce-8635-d6576739734f	d5d94eaf-f002-41e9-ad87-8b964f1f1e3a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:58:04.853	2025-05-26 21:58:04.854	\N	f
7ec2a08f-644c-4ce1-ba2e-8885d0a221b2	cmazpxtfz0000qu3tgg4qi5ex	f7df86fc-6889-4034-8554-89a2c7b7b0dc	a61a24c6-42aa-4549-a82e-308ed0ae061d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:58:35.221	2025-05-26 21:58:35.222	\N	f
b5cc0692-c7b7-49d0-b983-51fc3d1085b0	cmazpxthm0002qu3ttqezlwor	f7df86fc-6889-4034-8554-89a2c7b7b0dc	ad2d303a-b134-4854-b546-0e34cf0b7183	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:58:36.885	2025-05-26 21:58:36.886	\N	f
0efa3966-ee28-4f3d-81ed-9440be350e25	cmazpxthm0002qu3ttqezlwor	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	461b518f-93de-42b0-9310-bdb437440255	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:59:07.8	2025-05-26 21:59:07.801	\N	f
089cf8b9-177e-49d3-8f4d-87771cb8807a	cmazpxtfz0000qu3tgg4qi5ex	1c5475ce-1cf4-4a33-91d7-1398a4b1fa20	461b518f-93de-42b0-9310-bdb437440255	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:59:09.809	2025-05-26 21:59:09.81	\N	f
f1ac4ae5-bf23-4a96-9538-f1213497091a	cmazpxthm0002qu3ttqezlwor	b4cfadcd-1314-4b2b-8eb8-064403e430b1	183b1c90-20bf-434a-ae67-6ced6d6a8cb6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:59:15.473	2025-05-26 21:59:15.475	\N	f
835a8796-24b3-4a44-90cf-a7349657ee3b	cmazpxtfz0000qu3tgg4qi5ex	b4cfadcd-1314-4b2b-8eb8-064403e430b1	183b1c90-20bf-434a-ae67-6ced6d6a8cb6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:59:20.939	2025-05-26 21:59:20.94	\N	f
b1f35cb6-f167-4992-ac35-edfe11e4a5af	cmazpxthm0002qu3ttqezlwor	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	2f14e634-86da-4f16-8af3-ce9160c033c3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:59:37.283	2025-05-26 21:59:37.285	\N	f
1cdcf5a8-8661-4506-a53d-a2431dedd807	cmazpxtfz0000qu3tgg4qi5ex	12acd57b-5e92-403e-9f07-cc85ca0b8fbb	2f14e634-86da-4f16-8af3-ce9160c033c3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:59:39.728	2025-05-26 21:59:39.729	\N	f
ac4cd24f-9ee6-419d-bbe0-331aa9b224f6	cmazpxtfz0000qu3tgg4qi5ex	e504ad41-4f8a-4241-a045-6542f92d86b3	e2b35fb2-2919-43f1-916a-b1fb3b403989	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:59:57.74	2025-05-26 21:59:57.741	\N	f
2341b2fd-b323-4092-931c-12b3d32ddaec	cmazpxthm0002qu3ttqezlwor	e504ad41-4f8a-4241-a045-6542f92d86b3	e2b35fb2-2919-43f1-916a-b1fb3b403989	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 21:59:59.551	2025-05-26 21:59:59.552	\N	f
74aca8fa-eb86-4937-9496-3aa153c53f60	cmazpxthm0002qu3ttqezlwor	4eadaeb2-c165-4488-b119-97ddc5aa51c5	e676d522-fd44-4223-a304-3b68fd267225	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 22:02:35.918	2025-05-26 22:02:35.919	\N	f
4944c724-8618-4b1d-9d7a-88d785efe0f4	cmazpxtfz0000qu3tgg4qi5ex	4eadaeb2-c165-4488-b119-97ddc5aa51c5	4e37d3b7-53ae-4813-be02-5e2a83ec0d08	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 22:02:37.713	2025-05-26 22:02:37.714	\N	f
7b740f90-2bd4-4d1c-85c0-74c56bace139	cmazpxtfz0000qu3tgg4qi5ex	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	3a76663f-2563-4f2e-9104-cac0f849ed3b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 22:02:49.853	2025-05-26 22:02:49.854	\N	f
1e0bf81d-2074-4deb-9016-9e66c6a41532	cmazpxthm0002qu3ttqezlwor	cc6b4f04-9fe4-4cef-a883-63e5c6ac3fe0	9460be13-cb8f-4347-a4ab-43e0a4fbf1d1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 22:02:52.67	2025-05-26 22:02:52.671	\N	f
6275fd7f-977c-48c6-962c-7579c8f0e7db	cmazpxthm0002qu3ttqezlwor	4aabf8df-2528-455f-ab2e-d0896dcd8687	a72c0001-4bb0-4fb2-b9fd-7a6c3ce00b23	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 22:03:17.745	2025-05-26 22:03:17.747	\N	f
b16d41d3-044c-4bd9-a6c2-4e0c05a827bd	cmazpxtfz0000qu3tgg4qi5ex	4aabf8df-2528-455f-ab2e-d0896dcd8687	a72c0001-4bb0-4fb2-b9fd-7a6c3ce00b23	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 22:03:19.287	2025-05-26 22:03:19.288	\N	f
fc7ba37f-c263-4656-b8a7-cf1a80b9bfe7	cmazpxthm0002qu3ttqezlwor	2c347c52-ea8a-48d3-ac24-7b964bac4e72	a1737c39-287b-43bf-8857-35fb35a15a63	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 22:03:32.147	2025-05-26 22:03:32.148	\N	f
10df4bf0-ddb2-43b0-9dd5-aa1ce2b6fcb2	cmazpxtfz0000qu3tgg4qi5ex	2c347c52-ea8a-48d3-ac24-7b964bac4e72	a28a425c-6023-4d9e-a13e-639a58fdbef4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-26 22:03:33.875	2025-05-26 22:03:33.876	\N	f
62b8fc43-ed7f-4038-b9f1-1fbce03ac367	cmazpxthm0002qu3ttqezlwor	7e1633f0-2688-488f-b8e2-9672b31ea37e	9d426046-8992-423a-9328-d0271eedd948	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 08:51:11.041	2025-05-27 08:51:11.043	\N	f
5990e205-8eaa-4d1c-b33f-40c7bec42637	cmazpxtfz0000qu3tgg4qi5ex	7e1633f0-2688-488f-b8e2-9672b31ea37e	9d426046-8992-423a-9328-d0271eedd948	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 08:51:12.457	2025-05-27 08:51:12.458	\N	f
3db4c9b7-80b5-4f1e-b1ff-e6a29f8d5a9a	cmazpxthm0002qu3ttqezlwor	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	3bc594d7-b8cc-4402-8a4e-98e8cf553413	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:04:04.2	2025-05-27 09:04:04.202	\N	f
f75c5b00-9565-4543-a725-a12c54e5e5fe	cmazpxtfz0000qu3tgg4qi5ex	b5e1b839-cca3-4fc0-b21e-d954c709d1f4	3bc594d7-b8cc-4402-8a4e-98e8cf553413	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:04:05.698	2025-05-27 09:04:05.7	\N	f
8e8002b6-641b-4af3-956f-bf7de39c71f1	cmazpxthm0002qu3ttqezlwor	afc46845-19fa-4036-bc1f-3b1036104372	bd60ed16-d8fe-4f07-b4dc-9bc569a40d78	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:04:24.256	2025-05-27 09:04:24.259	\N	f
d89594bc-6447-42b3-999a-d6439521a5d1	cmazpxtfz0000qu3tgg4qi5ex	afc46845-19fa-4036-bc1f-3b1036104372	81a2f6de-28f3-4da2-b72f-5f70121e3e00	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:04:25.863	2025-05-27 09:04:25.864	\N	f
33679e18-ab14-4d58-81af-6fe253b73fe8	cmazpxtfz0000qu3tgg4qi5ex	4afea674-e0f3-4cc2-8024-5715b8a69434	7a9ea5df-b4e0-426d-a474-16f679f11a83	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:09:52.157	2025-05-27 09:09:52.158	\N	f
60972c84-0495-4e4a-abb7-f3f6e2555d52	cmazpxthm0002qu3ttqezlwor	4afea674-e0f3-4cc2-8024-5715b8a69434	48144256-772b-4160-8db4-79d4707e711b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:09:53.456	2025-05-27 09:09:53.456	\N	f
01f365b8-d833-4a6e-bcd2-82effe04890c	cmazpxthm0002qu3ttqezlwor	8835226f-c302-43e6-a52b-29ef94aa4f6a	fc02fe25-2561-45e0-b4c2-01388ded189f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:12:12.952	2025-05-27 09:12:12.953	\N	f
a27fd981-6ba9-4ff9-aeef-bebe63de8810	cmazpxtfz0000qu3tgg4qi5ex	8835226f-c302-43e6-a52b-29ef94aa4f6a	fc02fe25-2561-45e0-b4c2-01388ded189f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:12:14.7	2025-05-27 09:12:14.701	\N	f
801e4de2-c2a5-4ac9-8e7d-5b8a7b461f00	cmazpxthm0002qu3ttqezlwor	cf50eaa5-de41-45a4-ada1-17e44e4b5014	590cc9e6-7334-4c81-963a-811b1115e8c3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:12:27.535	2025-05-27 09:12:27.536	\N	f
a2031f81-c456-4d33-a062-349780e81490	cmazpxtfz0000qu3tgg4qi5ex	cf50eaa5-de41-45a4-ada1-17e44e4b5014	4f3ea275-13b9-47ae-a3a5-3e806729e530	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:12:29.095	2025-05-27 09:12:29.096	\N	f
5b34a2ec-5bc1-4c88-9ffb-0fcce0810fba	cmazpxtfz0000qu3tgg4qi5ex	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	829a3051-e404-4cf1-8e97-563c2a436f2b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:12:57.596	2025-05-27 09:12:57.597	\N	f
9a26f51e-5ec3-4981-8f86-020d94a5e4be	cmazpxthm0002qu3ttqezlwor	d1e0da35-7fe8-44c8-b358-c6a300e39cf4	829a3051-e404-4cf1-8e97-563c2a436f2b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:12:59.099	2025-05-27 09:12:59.1	\N	f
ecb209a6-8b55-4d42-9086-72fba88e3387	cmazpxtfz0000qu3tgg4qi5ex	7dd4f0ce-fe50-4387-8dd1-ed4bb634e853	936a33b8-3fb7-42c3-86a0-8559024f7020	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:17:12.56	2025-05-27 09:17:12.561	\N	f
66fbf58a-2478-4a6e-a018-7ceebd044100	cmazpxthm0002qu3ttqezlwor	b156696e-49af-4582-8e63-a41a46840bd7	9b5f0dbe-3285-471c-bbe5-8d707cb7a360	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:17:16.443	2025-05-27 09:17:16.444	\N	f
e1d6658f-d142-4065-89db-dc0b5ba7b7b3	cmazpxtfz0000qu3tgg4qi5ex	b156696e-49af-4582-8e63-a41a46840bd7	9b5f0dbe-3285-471c-bbe5-8d707cb7a360	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:17:18.535	2025-05-27 09:17:18.536	\N	f
b93202a6-9367-4b53-9d10-ec24f052196d	cmazpxthm0002qu3ttqezlwor	23155572-b0cd-428e-8fd6-393d2bccdfa5	97a1418a-6a49-478a-9f38-ce7d3d8fcb73	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:17:30.654	2025-05-27 09:17:30.655	\N	f
144a5f73-9ce6-4acd-847f-eea811be9b96	cmazpxtfz0000qu3tgg4qi5ex	23155572-b0cd-428e-8fd6-393d2bccdfa5	97a1418a-6a49-478a-9f38-ce7d3d8fcb73	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:17:33.086	2025-05-27 09:17:33.087	\N	f
9459071a-8c9e-4b1c-a171-70f82dd70042	cmazpxthm0002qu3ttqezlwor	ccfd600a-c461-4b5a-80fe-12db84877546	827ba563-d02f-4714-adc4-b9bc4a382810	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:17:45.148	2025-05-27 09:17:45.148	\N	f
d45b1e44-25ea-4999-9aa4-17129aeddf6c	cmazpxtfz0000qu3tgg4qi5ex	ccfd600a-c461-4b5a-80fe-12db84877546	827ba563-d02f-4714-adc4-b9bc4a382810	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:17:46.844	2025-05-27 09:17:46.845	\N	f
be4a6a85-5d5b-4adf-91ec-67412485635a	cmazpxthm0002qu3ttqezlwor	376c3f94-8227-4c9a-911c-1c20a84fc187	7b05e6eb-7d82-4b2c-8a14-991682a668f9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:20:34.942	2025-05-27 09:20:34.943	\N	f
df404c25-31d8-4a05-a592-9c2b0f9f6764	cmazpxtfz0000qu3tgg4qi5ex	376c3f94-8227-4c9a-911c-1c20a84fc187	7b05e6eb-7d82-4b2c-8a14-991682a668f9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:20:36.51	2025-05-27 09:20:36.51	\N	f
8ac80d88-0270-426e-9e75-27cc88355a3e	cmazpxthm0002qu3ttqezlwor	7a9ca40a-914c-47fa-92dc-f74889a99208	3825623c-c515-4d74-8058-f9ab9c4a5244	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:20:47.848	2025-05-27 09:20:47.849	\N	f
a73dad83-1c2c-44b3-90d4-9e78b16c6c32	cmazpxtfz0000qu3tgg4qi5ex	7a9ca40a-914c-47fa-92dc-f74889a99208	ac571969-154e-4465-a680-1554dbe2dbe7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:20:49.297	2025-05-27 09:20:49.298	\N	f
4a00a939-eb0e-4355-9399-ba5545d96aaf	cmazpxthm0002qu3ttqezlwor	467e8afc-4292-4d4a-b970-1c3b04452e10	678c3010-c0ab-452e-b776-32df39b5fcc4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:21:10.537	2025-05-27 09:21:10.538	\N	f
a1ff3a8b-06a0-4ece-97e4-e2e575f498fc	cmazpxtfz0000qu3tgg4qi5ex	467e8afc-4292-4d4a-b970-1c3b04452e10	678c3010-c0ab-452e-b776-32df39b5fcc4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:21:11.46	2025-05-27 09:21:11.461	\N	f
964ecec9-9470-454b-8ed5-f77043131804	cmazpxthm0002qu3ttqezlwor	22cedfd9-1375-4d92-b023-b2a49c6c2b57	4ea52f8a-2757-4061-955f-2950b3397483	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:21:23.601	2025-05-27 09:21:23.602	\N	f
68ad3df8-86cf-4dcc-a0dd-d603688cbe98	cmazpxtfz0000qu3tgg4qi5ex	22cedfd9-1375-4d92-b023-b2a49c6c2b57	56ae2e71-bb24-4eb0-a63b-ee400df461d7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:21:28.694	2025-05-27 09:21:28.695	\N	f
615ff119-4dd8-4d1a-984b-3c4f1e863d65	cmazpxthm0002qu3ttqezlwor	15162537-f2c5-42df-981a-42e97fa6dfc2	b3f5749a-7fe0-4273-b02a-985f22aba9c8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:22:19.335	2025-05-27 09:22:19.335	\N	f
764bc068-d371-494e-8bcc-0566d0b92577	cmazpxtfz0000qu3tgg4qi5ex	15162537-f2c5-42df-981a-42e97fa6dfc2	b3f5749a-7fe0-4273-b02a-985f22aba9c8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:22:20.439	2025-05-27 09:22:20.439	\N	f
32e84b73-e8b4-4f17-a546-a4c30cdbaa0d	cmazpxthm0002qu3ttqezlwor	a2057581-a0ce-49ca-b4a2-95fe17562b65	54659bc5-0149-4988-9ec3-e7834717bbf2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:22:32.577	2025-05-27 09:22:32.578	\N	f
2c759022-1183-4e91-99ca-00fc962bb0ad	cmazpxtfz0000qu3tgg4qi5ex	a2057581-a0ce-49ca-b4a2-95fe17562b65	f69efff8-f5b6-4fdf-983b-56a831cb6a28	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:22:35.21	2025-05-27 09:22:35.211	\N	f
25aeae0c-1217-4e57-b2a7-c979a460bc0b	cmazpxthm0002qu3ttqezlwor	1a53ad26-5577-473f-8787-68ddd30a49f0	5f4ef244-c3d9-4087-a382-9bc3b89b3139	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:23:55.917	2025-05-27 09:23:55.918	\N	f
f0119c60-0bbf-4115-be48-9c0dbfa0e75e	cmazpxtfz0000qu3tgg4qi5ex	1a53ad26-5577-473f-8787-68ddd30a49f0	5f4ef244-c3d9-4087-a382-9bc3b89b3139	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:23:57.502	2025-05-27 09:23:57.503	\N	f
904814b9-3d97-4675-ad5b-fb208cea620f	cmazpxthm0002qu3ttqezlwor	0430cdf6-41b3-4855-881d-b50280bb21a7	eb7e6b46-c466-42d1-b04f-45268c82a97f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:24:23.257	2025-05-27 09:24:23.258	\N	f
b6adc7ff-de78-44a2-b976-814bdf0d7f90	cmazpxtfz0000qu3tgg4qi5ex	0430cdf6-41b3-4855-881d-b50280bb21a7	3cbce92e-9366-494f-8254-66baa1c1d491	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:24:18.156	2025-05-27 09:24:18.157	\N	f
314d9444-27a2-47e5-aef6-96ca93592aed	cmazpxthm0002qu3ttqezlwor	5a55df28-edeb-45ae-b336-043a57f6f5b8	df3b1b52-c3a5-414c-a546-6a013b00c4bf	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:25:27.146	2025-05-27 09:25:27.148	\N	f
eeda5269-6cff-4a2c-ab2e-8bfe29243de5	cmazpxtfz0000qu3tgg4qi5ex	5a55df28-edeb-45ae-b336-043a57f6f5b8	d9b9f7c1-7b2f-44a0-bae3-18b645cdb9f4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:25:28.863	2025-05-27 09:25:28.864	\N	f
8e7484b0-cf6e-4945-a695-8916c500cca8	cmazpxthm0002qu3ttqezlwor	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	f1b5e3a9-e7a5-493b-b7ad-833a77791900	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:25:46.519	2025-05-27 09:25:46.52	\N	f
f532b7e5-5a81-4198-bc4a-e3c6c10cfe2a	cmazpxtfz0000qu3tgg4qi5ex	960f0bc5-3ffb-47b4-9cb1-32145d0503f1	f1b5e3a9-e7a5-493b-b7ad-833a77791900	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:25:47.947	2025-05-27 09:25:47.948	\N	f
b7a9d6be-56ad-4cce-9683-e48c3db10957	cmazpxthm0002qu3ttqezlwor	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	95d213b3-2f08-4bcf-bca4-06a5eec54eee	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:25:57.392	2025-05-27 09:25:57.393	\N	f
ec8243e2-ed2b-473d-97c7-7646328b59f8	cmazpxtfz0000qu3tgg4qi5ex	4fe7ec90-cee5-4d4c-a4d7-90a16d8fd375	53c5176c-ec78-49d6-827b-cdfbdbe4bbe7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:25:58.997	2025-05-27 09:25:58.999	\N	f
d4bdcd86-6a79-4466-b34a-6c7d8d288ba4	cmazpxthm0002qu3ttqezlwor	e3184a76-0833-49d4-95b1-c3ae863be78b	0f57579b-1633-4535-a515-9a05bad821b3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:26:26.936	2025-05-27 09:26:26.937	\N	f
f2879193-3d70-4846-94a3-7303053a3fe2	cmazpxtfz0000qu3tgg4qi5ex	e3184a76-0833-49d4-95b1-c3ae863be78b	0f57579b-1633-4535-a515-9a05bad821b3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:26:28.16	2025-05-27 09:26:28.161	\N	f
6c729695-8f1c-4681-b30e-d5cc64c469ba	cmazpxthm0002qu3ttqezlwor	dae0875e-7812-483f-8760-b98ab8bde6cc	2eb33f83-cd68-4f98-87fe-c58f52b2bff3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:27:30.408	2025-05-27 09:27:30.409	\N	f
4fa8b642-0177-4317-860a-f1601777203c	cmazpxtfz0000qu3tgg4qi5ex	dae0875e-7812-483f-8760-b98ab8bde6cc	2eb33f83-cd68-4f98-87fe-c58f52b2bff3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:27:31.433	2025-05-27 09:27:31.434	\N	f
abc66e40-f9f8-4150-a786-d7145fc3a779	cmazpxthm0002qu3ttqezlwor	6436d0e4-9902-4d3a-86aa-9414196e2c99	413ffbb4-b9e7-4754-bf54-77eab4031021	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:27:40.266	2025-05-27 09:27:40.267	\N	f
e1f364ae-d69b-4b95-8137-cd7c93c69347	cmazpxtfz0000qu3tgg4qi5ex	6436d0e4-9902-4d3a-86aa-9414196e2c99	86eb7ebf-8ee6-4e71-807d-a7a629dff153	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:27:41.104	2025-05-27 09:27:41.105	\N	f
23adf101-1411-4fda-b795-00880e37f489	cmazpxthm0002qu3ttqezlwor	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	d1d11c56-d0be-4d26-ba38-fd3c6cfe39b3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:30:15.993	2025-05-27 09:30:15.994	\N	f
fbad8738-dd24-43cd-be46-5f0c8b3fa69a	cmazpxtfz0000qu3tgg4qi5ex	9f67ce31-1ca5-40c0-8ca0-069f1a7dfdec	d1d11c56-d0be-4d26-ba38-fd3c6cfe39b3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:30:16.64	2025-05-27 09:30:16.641	\N	f
eb25ce33-c63b-4190-8292-6839893760ea	cmazpxthm0002qu3ttqezlwor	17138bd9-3f54-468f-874e-e589b39e6c01	dad4fa7d-664b-4775-973e-809f6c3e942d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:30:26.108	2025-05-27 09:30:26.11	\N	f
c62257d5-73b6-49be-8655-d929a3632fc7	cmazpxtfz0000qu3tgg4qi5ex	17138bd9-3f54-468f-874e-e589b39e6c01	dad4fa7d-664b-4775-973e-809f6c3e942d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:30:27.392	2025-05-27 09:30:27.393	\N	f
1e4c9931-60d5-4fae-9493-0d32a5ec8e64	cmazpxthm0002qu3ttqezlwor	3e1936f9-a4d4-4026-adaf-16f845619eab	b95627b8-6f05-4724-875d-15b4ee4c8188	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:34:29.316	2025-05-27 09:34:29.317	\N	f
eccf8b27-cb43-45b7-9e63-243e29ec0706	cmazpxtfz0000qu3tgg4qi5ex	3e1936f9-a4d4-4026-adaf-16f845619eab	57ce9a4f-56fa-4089-8c79-562da4efa46b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:34:30.721	2025-05-27 09:34:30.722	\N	f
39c0348d-d1de-4421-b97d-48123bdaff6f	cmazpxthm0002qu3ttqezlwor	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	3a7815e1-46d0-4259-9d43-b0c05c79dfa1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:34:39.919	2025-05-27 09:34:39.92	\N	f
1d7bf303-5c11-45da-b360-3cf3976858ee	cmazpxtfz0000qu3tgg4qi5ex	b3e7f06e-5ca2-42ae-af66-7989d3f004b6	f6eabb33-41d3-404f-9a2a-f7e2723b867d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:34:41.35	2025-05-27 09:34:41.351	\N	f
5ef08298-9ea6-4d3d-a869-b56958a29c0d	cmazpxthm0002qu3ttqezlwor	80dc0680-2884-4a61-858a-db21dd490378	e8bee1a3-3762-41ac-b5c7-8752fd71f2c8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:34:51.116	2025-05-27 09:34:51.117	\N	f
f4e6881f-af12-4f07-b2cb-53853416ab83	cmazpxtfz0000qu3tgg4qi5ex	80dc0680-2884-4a61-858a-db21dd490378	f986b0c2-7ec7-431a-8bfd-f9868e41847e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:34:51.779	2025-05-27 09:34:51.78	\N	f
102331d5-aa69-41d1-b68e-3242a41147d4	cmazpxthm0002qu3ttqezlwor	3cb41358-d613-4e72-a9da-730ceb6dca91	40557ddc-e3f7-4ac3-a7f9-d0828437621f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:35:11.835	2025-05-27 09:35:11.836	\N	f
dd31e77a-d844-4afa-b524-9525261c077b	cmazpxtfz0000qu3tgg4qi5ex	3cb41358-d613-4e72-a9da-730ceb6dca91	14360b0d-3eb1-43e1-adab-ff92c187b25d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:35:12.745	2025-05-27 09:35:12.747	\N	f
7a19c28a-e639-40d1-a7b0-9de8093c0fb7	cmazpxthm0002qu3ttqezlwor	855cae49-e0d6-4ae8-8c69-3af1ba09d294	0ad1aa5e-e3bf-4998-bce4-e42efcb85923	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:35:21.961	2025-05-27 09:35:21.962	\N	f
af1aa277-8cbc-4b9f-b1b7-3baa971a11f7	cmazpxtfz0000qu3tgg4qi5ex	855cae49-e0d6-4ae8-8c69-3af1ba09d294	0ad1aa5e-e3bf-4998-bce4-e42efcb85923	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:35:23.105	2025-05-27 09:35:23.106	\N	f
9e654dcc-a403-4abf-8f9c-0040b39c7ab3	cmazpxthm0002qu3ttqezlwor	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	af01ee30-714b-4327-8bf3-919079620c73	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:36:45.215	2025-05-27 09:36:45.217	\N	f
f07eb88d-c1d6-4537-9ac9-5d1adafab5d6	cmazpxtfz0000qu3tgg4qi5ex	a4b3b065-0d54-480a-9c0b-cbaefb9ed9e5	acbca5c5-de4f-4674-92db-7db148d7fc8a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:36:46.801	2025-05-27 09:36:46.802	\N	f
2ddc066f-7e26-4a15-ab5b-de974c0cea49	cmazpxthm0002qu3ttqezlwor	4b549b5d-0864-4add-8ed5-91c54e67bae2	2e603aab-a63a-41fa-8356-6bce273f7fd8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:36:57.179	2025-05-27 09:36:57.18	\N	f
641afe58-6694-4708-8380-df34756d5e1e	cmazpxtfz0000qu3tgg4qi5ex	4b549b5d-0864-4add-8ed5-91c54e67bae2	2e603aab-a63a-41fa-8356-6bce273f7fd8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:37:00.774	2025-05-27 09:37:00.775	\N	f
9358f263-5a2a-4232-9152-d9f095a22416	cmazpxthm0002qu3ttqezlwor	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	c76616bd-1eb4-4bf4-909e-4f3175ff6124	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:39:32.117	2025-05-27 09:39:32.118	\N	f
f64159a6-a21b-487d-bffd-6062707a5359	cmazpxtfz0000qu3tgg4qi5ex	bbb3a00b-7b97-4dba-9838-6b2ae3ab1e5b	3e414317-40df-4e0a-b08a-f1e4e0555803	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:39:32.185	2025-05-27 09:39:32.186	\N	f
d22c3a92-bb6c-4b5e-af5c-d9623151c647	cmazpxthm0002qu3ttqezlwor	adc0bf61-9e77-4226-8a5b-765a04e035aa	3d860a30-d807-4230-b23f-a8dacc494217	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:39:46.561	2025-05-27 09:39:46.562	\N	f
cbd736a6-049b-4845-bdfb-f0bd22d1b434	cmazpxtfz0000qu3tgg4qi5ex	adc0bf61-9e77-4226-8a5b-765a04e035aa	3d860a30-d807-4230-b23f-a8dacc494217	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:39:49.662	2025-05-27 09:39:49.663	\N	f
2d255d57-f3b5-47f7-9077-78bc0e8cf865	cmazpxthm0002qu3ttqezlwor	a527699c-0929-4d07-adaa-5c322ddb7240	a02283be-6a37-478b-b599-42fcf00d60e4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:40:01.632	2025-05-27 09:40:01.633	\N	f
64fbbc66-8838-4d0f-840d-6f87402ecaa8	cmazpxtfz0000qu3tgg4qi5ex	a527699c-0929-4d07-adaa-5c322ddb7240	9ecf1575-6ad3-45b3-9d51-8fb60f907061	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:40:02.664	2025-05-27 09:40:02.665	\N	f
6854a269-1177-4b6b-a309-5b697b9b21c3	cmazpxthm0002qu3ttqezlwor	b8b40a89-dff0-483d-8e47-40a11afff475	f9048251-08a3-416e-94e0-39e48207231d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:40:11.098	2025-05-27 09:40:11.099	\N	f
284a956b-d0f7-4387-adc7-6e7320ad2d0e	cmazpxtfz0000qu3tgg4qi5ex	b8b40a89-dff0-483d-8e47-40a11afff475	b20c31f4-43f8-4ec8-999a-785b117a6b2b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:40:12.313	2025-05-27 09:40:12.314	\N	f
4c71bce3-0baa-4710-946d-3cf284b2fe90	cmazpxthm0002qu3ttqezlwor	2480c44e-c2bf-434b-a447-8217584b25c3	ea963629-f3ec-48c3-9177-d006a48408a1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:41:20.998	2025-05-27 09:41:20.999	\N	f
0bcd652c-aa98-4c54-b3ec-aff4ffb6bd5c	cmazpxtfz0000qu3tgg4qi5ex	2480c44e-c2bf-434b-a447-8217584b25c3	ea963629-f3ec-48c3-9177-d006a48408a1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:41:22.16	2025-05-27 09:41:22.161	\N	f
098df200-b880-48a1-ad83-4bc5f42034be	cmazpxthm0002qu3ttqezlwor	dfa4ab04-3fd9-4439-a616-adfb76600112	0fbc0f59-5999-4514-8473-255205b124c7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:41:36.716	2025-05-27 09:41:36.717	\N	f
8a2e4511-d975-44e5-87a4-075134bd760f	cmazpxtfz0000qu3tgg4qi5ex	dfa4ab04-3fd9-4439-a616-adfb76600112	6769746e-f773-418a-bda0-b49ee7e72239	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:41:37.794	2025-05-27 09:41:37.795	\N	f
f5189ceb-17ad-46cb-822c-6aa76ca1948e	cmazpxthm0002qu3ttqezlwor	15724682-b932-4bf4-a734-87215b84955f	ca4b5613-67bf-4e41-911b-9d3601b8c62d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:41:50.729	2025-05-27 09:41:50.73	\N	f
62186808-1ae7-40d1-b7b3-46828338145a	cmazpxtfz0000qu3tgg4qi5ex	15724682-b932-4bf4-a734-87215b84955f	ca4b5613-67bf-4e41-911b-9d3601b8c62d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:41:53.743	2025-05-27 09:41:53.744	\N	f
51e8b363-9749-4ef9-b3c2-0955316cbf26	cmazpxthm0002qu3ttqezlwor	24e4aa16-924f-4d83-8f64-c0f36bf1489c	0f5b9662-21f6-4e39-b38b-54e419a09970	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:43:41.277	2025-05-27 09:43:41.278	\N	f
1a4b5c29-084a-4850-a3df-818ba5c84f23	cmazpxtfz0000qu3tgg4qi5ex	24e4aa16-924f-4d83-8f64-c0f36bf1489c	0f5b9662-21f6-4e39-b38b-54e419a09970	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:43:41.303	2025-05-27 09:43:41.304	\N	f
0f5d7863-e06b-4c23-9c79-a3a6a11c5a06	cmazpxthm0002qu3ttqezlwor	bbe75fed-326d-414a-ba4b-132c65e35d52	a764df79-6cee-42b7-9cad-b43682de2c78	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:43:59.572	2025-05-27 09:43:59.573	\N	f
e564bd41-e284-431f-bd7e-76b453ed7d35	cmazpxtfz0000qu3tgg4qi5ex	bbe75fed-326d-414a-ba4b-132c65e35d52	a764df79-6cee-42b7-9cad-b43682de2c78	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:44:01.766	2025-05-27 09:44:01.767	\N	f
18aa75a3-f8f9-470a-bc8c-b111cb467129	cmazpxthm0002qu3ttqezlwor	4ba7ca55-1686-4158-a469-b9b3c787d400	3ed572c5-fa8e-4ab5-9016-24737395f940	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:45:00.909	2025-05-27 09:45:00.91	\N	f
d05099ae-2aea-4e3c-a1fa-2e27ff79cfe4	cmazpxtfz0000qu3tgg4qi5ex	4ba7ca55-1686-4158-a469-b9b3c787d400	7bc69bb5-5358-42c1-a5ac-772b8f9434ca	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:45:02.227	2025-05-27 09:45:02.228	\N	f
1f4c858c-6329-4daf-a1d7-f8a8eb970e7a	cmazpxthm0002qu3ttqezlwor	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	10612cc9-770f-4961-9218-9acefd9f7c0f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:45:23.663	2025-05-27 09:45:23.664	\N	f
d4e6134b-1752-457a-a9b2-31c4f19a10bf	cmazpxtfz0000qu3tgg4qi5ex	a1e89470-e247-4c3a-8227-bf9c3d8d7d50	20c51cd7-7f4c-4a4f-a67d-dd2918808e55	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:45:24.896	2025-05-27 09:45:24.897	\N	f
79e4e565-e46e-4787-868f-47487100dd6c	cmazpxthm0002qu3ttqezlwor	81416478-48b4-45a1-9766-6030759e901a	40373e97-5d57-4818-a39f-d7603a69d457	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:45:35.243	2025-05-27 09:45:35.244	\N	f
925c6751-3b2a-47f1-bbfc-463c3d08fc6f	cmazpxtfz0000qu3tgg4qi5ex	81416478-48b4-45a1-9766-6030759e901a	40373e97-5d57-4818-a39f-d7603a69d457	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:45:36.922	2025-05-27 09:45:36.923	\N	f
ab3678bb-886d-42a5-b146-8308da41d79b	cmazpxtfz0000qu3tgg4qi5ex	c7b5a382-4165-4cc8-8de0-3f84a2283679	4efff3db-2389-42df-ae33-a6dae684136f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:47:46.114	2025-05-27 09:47:46.115	\N	f
d0f1b43b-8648-486c-9ee1-3032064324d5	cmazpxthm0002qu3ttqezlwor	c7b5a382-4165-4cc8-8de0-3f84a2283679	d942b259-14b0-464d-a76e-b7f0b814a3b3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:47:46.118	2025-05-27 09:47:46.119	\N	f
51b585a1-1eeb-4bf4-95c9-61f4b50b11c8	cmazpxthm0002qu3ttqezlwor	f072f18e-5645-48ad-bce9-2ed57ebeb1de	7d0923f8-4efb-41b3-aa57-8c503d6c62fe	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:50:06.808	2025-05-27 09:50:06.809	\N	f
2ef9efc9-be5f-40e3-ab75-14ea7708c155	cmazpxtfz0000qu3tgg4qi5ex	f072f18e-5645-48ad-bce9-2ed57ebeb1de	1fa89cfd-c93b-442b-9422-520f051dcf3e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:50:08.132	2025-05-27 09:50:08.133	\N	f
629033a4-c8f5-44f8-8fd9-30ce79239e6d	cmazpxthm0002qu3ttqezlwor	51802256-84a5-490f-bca8-62796ea49a68	77b3618d-3697-463f-8f87-1ffeb794d5da	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:51:59.256	2025-05-27 09:51:59.257	\N	f
614e04dc-71fa-4735-a71c-cc9ae919217f	cmazpxtfz0000qu3tgg4qi5ex	51802256-84a5-490f-bca8-62796ea49a68	77b3618d-3697-463f-8f87-1ffeb794d5da	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:52:00.65	2025-05-27 09:52:00.651	\N	f
a6ce6566-5d23-4cbf-8423-7f6a582803bc	cmazpxthm0002qu3ttqezlwor	d7b79842-0726-445c-8ca1-8cda1552db06	98219960-68a1-4c94-8691-d3a4940a03d4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:52:11.555	2025-05-27 09:52:11.556	\N	f
44a5e23f-f2a6-404b-9fc1-47c5c80b43e1	cmazpxtfz0000qu3tgg4qi5ex	d7b79842-0726-445c-8ca1-8cda1552db06	98219960-68a1-4c94-8691-d3a4940a03d4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:52:12.897	2025-05-27 09:52:12.898	\N	f
02e8129a-bf3b-4a7e-bd9f-2dde03458a2c	cmazpxthm0002qu3ttqezlwor	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	022d19e9-31b9-41c9-8452-7a43f5da5ac9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:52:32.549	2025-05-27 09:52:32.551	\N	f
26818238-158a-4a8d-8aea-541fcf25d8b8	cmazpxtfz0000qu3tgg4qi5ex	5247a347-dc8d-4f4c-ae81-b01b2f53d9a8	79de82b3-4835-4373-99ac-3d2792ef1d72	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:52:33.475	2025-05-27 09:52:33.476	\N	f
ca628727-221c-4312-b470-9e9070b71aad	cmazpxthm0002qu3ttqezlwor	4f64a379-9677-4b09-a4b4-3007f5403879	3fd7428d-5814-4959-818e-c07e84300bcc	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:53:48.833	2025-05-27 09:53:48.834	\N	f
d7b08ca4-f02d-4573-a9dc-aa879b6ecfd9	cmazpxtfz0000qu3tgg4qi5ex	4f64a379-9677-4b09-a4b4-3007f5403879	3fd7428d-5814-4959-818e-c07e84300bcc	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:53:49.589	2025-05-27 09:53:49.59	\N	f
b5321b9a-ac68-4f16-9d78-316c9b0d5708	cmazpxthm0002qu3ttqezlwor	cc8b6725-f8d7-4522-b70d-2e201057639c	bd7f5ae0-401e-479e-8384-b3e4e74d79f3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:55:42.431	2025-05-27 09:55:42.432	\N	f
13b81215-fb18-4289-9cc8-d03f7e5ea7b6	cmazpxtfz0000qu3tgg4qi5ex	cc8b6725-f8d7-4522-b70d-2e201057639c	b4ea9c8c-5c90-4068-819b-4b387440c8f6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:55:43.719	2025-05-27 09:55:43.72	\N	f
8a9950cc-df28-4ed7-8dc7-c9acac6c9e73	cmazpxthm0002qu3ttqezlwor	ba5baebe-ab16-4d31-8530-edee9ba059f6	c6d24a7c-2d70-463d-8aef-6cf72f249a1b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:56:06.168	2025-05-27 09:56:06.169	\N	f
e4d11ddc-c197-486d-baab-39d26cffd98e	cmazpxtfz0000qu3tgg4qi5ex	ba5baebe-ab16-4d31-8530-edee9ba059f6	c6d24a7c-2d70-463d-8aef-6cf72f249a1b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:56:07.129	2025-05-27 09:56:07.13	\N	f
7873acc5-1f6b-482d-a7f5-fa1560d339cd	cmazpxthm0002qu3ttqezlwor	4099456e-5461-4401-b552-34f8e891ba35	546b87b3-13e7-4d2b-b06d-04c0234b5b01	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:56:17.899	2025-05-27 09:56:17.9	\N	f
9f556a06-a6c4-4484-9ef5-7d66e04bb456	cmazpxtfz0000qu3tgg4qi5ex	4099456e-5461-4401-b552-34f8e891ba35	546b87b3-13e7-4d2b-b06d-04c0234b5b01	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:56:18.821	2025-05-27 09:56:18.822	\N	f
187c715d-be69-4121-a877-3feb15ce0cb2	cmazpxthm0002qu3ttqezlwor	d291332c-68d5-4a91-9b96-cb8c9a9ac930	bca9798c-fe22-4d92-bff9-9e800609d896	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:57:48.061	2025-05-27 09:57:48.062	\N	f
62547b8f-6b43-418d-b434-256b323739d3	cmazpxtfz0000qu3tgg4qi5ex	d291332c-68d5-4a91-9b96-cb8c9a9ac930	6c3442c3-6527-4c65-9895-e0ab2dd67da0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:57:49.403	2025-05-27 09:57:49.404	\N	f
190229a4-efc0-445a-8529-02cdfef45817	cmazpxthm0002qu3ttqezlwor	21b4dd7c-2739-4d48-a5b3-89511386cef7	512ae611-1af9-40c6-ad17-36fbedb77a95	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:58:09.243	2025-05-27 09:58:09.244	\N	f
84bec13e-0108-430f-846c-1932bcf99938	cmazpxtfz0000qu3tgg4qi5ex	21b4dd7c-2739-4d48-a5b3-89511386cef7	9779f920-4c48-47bd-96b5-c074037f7995	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:58:10.159	2025-05-27 09:58:10.16	\N	f
2cee1295-05e2-4860-bb76-fcbc9cfb455f	cmazpxthm0002qu3ttqezlwor	719f6e37-2b19-4771-b1fc-1ddf5a903329	fe874a34-133e-44aa-a935-3a36f302eb3f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:58:24.517	2025-05-27 09:58:24.519	\N	f
9a345140-3dd1-448b-afef-a07b16a8f1b3	cmazpxtfz0000qu3tgg4qi5ex	719f6e37-2b19-4771-b1fc-1ddf5a903329	7f26116a-c975-498b-9a84-d3eb18395eb2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:58:26.082	2025-05-27 09:58:26.083	\N	f
77a0dac9-d85f-4e5d-a0f7-a26eb87fe9a8	cmazpxthm0002qu3ttqezlwor	b5332f27-d03f-46ad-9860-7f33d7109466	b92f5b61-d36d-41ca-8627-34ebbde54164	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:58:38.03	2025-05-27 09:58:38.031	\N	f
b14933ea-eb16-412b-a7fe-3d07823ea6fe	cmazpxtfz0000qu3tgg4qi5ex	b5332f27-d03f-46ad-9860-7f33d7109466	b92f5b61-d36d-41ca-8627-34ebbde54164	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:58:39.672	2025-05-27 09:58:39.673	\N	f
26423107-cbca-4d89-b8f3-e24d8a651d28	cmazpxthm0002qu3ttqezlwor	b6b4e561-4675-4cf8-801e-94baae050a4f	17e29cb1-ae2d-49ba-8982-c9294403fb50	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:59:17.447	2025-05-27 09:59:17.448	\N	f
00de69da-3cb3-4bd3-b0e1-22f24168da29	cmazpxtfz0000qu3tgg4qi5ex	b6b4e561-4675-4cf8-801e-94baae050a4f	17e29cb1-ae2d-49ba-8982-c9294403fb50	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 09:59:24.499	2025-05-27 09:59:24.5	\N	f
cfa362fa-8107-470e-95e7-e9e7e33661d4	cmazpxthm0002qu3ttqezlwor	68d7dea2-b7b1-4416-8c40-ce6260668110	f4d3811d-90e5-4b34-a696-a17b8efb221d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:00:22.379	2025-05-27 10:00:22.38	\N	f
517872a3-7173-4a2b-9145-afdfef13a1d3	cmazpxtfz0000qu3tgg4qi5ex	68d7dea2-b7b1-4416-8c40-ce6260668110	1f2ef747-8d76-4449-b61e-fb2666f23ef6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:00:24.865	2025-05-27 10:00:24.866	\N	f
fe9b5419-48fc-4a31-88e4-20c67a507c64	cmazpxthm0002qu3ttqezlwor	36a8daa4-7741-40e2-86aa-be5eb874e275	fcba78c1-609f-42cc-bfc1-149bfd46b79a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:00:39.422	2025-05-27 10:00:39.423	\N	f
3f092878-59b5-49a6-a490-c40e50ce1c4b	cmazpxtfz0000qu3tgg4qi5ex	36a8daa4-7741-40e2-86aa-be5eb874e275	337225bc-e2d0-4082-8782-35c3efd74a1f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:00:42.952	2025-05-27 10:00:42.953	\N	f
93c23304-2862-4972-94e0-ab5be16186fa	cmazpxthm0002qu3ttqezlwor	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	07bf0058-90a7-4ea1-a4cf-5c41664a9576	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:01:47.517	2025-05-27 10:01:47.518	\N	f
77ac6d46-ab4c-4166-80fe-dd254a6ed5d4	cmazpxtfz0000qu3tgg4qi5ex	9c1bad9b-d73b-4cfd-a74b-36ddc178c4e0	07bf0058-90a7-4ea1-a4cf-5c41664a9576	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:01:50.409	2025-05-27 10:01:50.41	\N	f
35fc9495-f1c9-4ac4-952d-bd8744c8e8e9	cmazpxthm0002qu3ttqezlwor	facf297a-ab60-430b-b605-ad6ce6d6babf	80fee11d-3935-4ddd-a4ba-d98d3f4448fd	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:03:05.676	2025-05-27 10:03:05.677	\N	f
3881c490-8920-478a-b933-811cc72ba607	cmazpxtfz0000qu3tgg4qi5ex	facf297a-ab60-430b-b605-ad6ce6d6babf	80fee11d-3935-4ddd-a4ba-d98d3f4448fd	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:03:08.663	2025-05-27 10:03:08.664	\N	f
113b1e52-526f-4977-8e2b-b786de7a06b1	cmazpxthm0002qu3ttqezlwor	63351453-5507-4199-915a-1220b13c7266	639f1fe5-c0b1-4587-84f7-b373d0c7eed9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:03:19.87	2025-05-27 10:03:19.871	\N	f
706b138b-73c4-4b38-9807-c5ca25212766	cmazpxtfz0000qu3tgg4qi5ex	63351453-5507-4199-915a-1220b13c7266	639f1fe5-c0b1-4587-84f7-b373d0c7eed9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:03:23.233	2025-05-27 10:03:23.234	\N	f
ff913306-208b-4898-b388-1504c6b60b51	cmazpxthm0002qu3ttqezlwor	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	dbcdbd0e-4ec9-490c-9f59-74bc7a32febc	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:06:19.358	2025-05-27 10:06:19.359	\N	f
61f448da-32d0-4497-85d7-2eab9897de06	cmazpxtfz0000qu3tgg4qi5ex	b5751fa4-f9df-4f9a-b166-3f955a2dfd2c	a1a1e314-a005-4b9b-bb9b-380d0d141d95	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:06:22.861	2025-05-27 10:06:22.862	\N	f
abb437d4-77ea-443b-84a8-315f55ca2b0e	cmazpxthm0002qu3ttqezlwor	cda65b3a-0236-4317-b536-3242206a7a7e	bbf57b82-fb7f-40e9-9dc7-7f0ca66c937e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:06:33.016	2025-05-27 10:06:33.017	\N	f
b5d16976-94db-45ac-8fd1-53a083f6cbca	cmazpxtfz0000qu3tgg4qi5ex	cda65b3a-0236-4317-b536-3242206a7a7e	bbf57b82-fb7f-40e9-9dc7-7f0ca66c937e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:06:34.317	2025-05-27 10:06:34.318	\N	f
5b073bc0-baad-46dd-b9f2-42dcf115492d	cmazpxthm0002qu3ttqezlwor	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	803862cc-f6db-46b5-b3ab-d42cc4bde2ef	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:07:23.605	2025-05-27 10:07:23.606	\N	f
d63b0026-80ce-4a58-88e8-f9f3720ef0bf	cmazpxtfz0000qu3tgg4qi5ex	d0ed95f4-eea9-4ae1-95e1-6318e181b2a9	803862cc-f6db-46b5-b3ab-d42cc4bde2ef	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:07:26.672	2025-05-27 10:07:26.673	\N	f
f6d6891e-5115-4a8a-8c42-8bcf452e51dd	cmazpxthm0002qu3ttqezlwor	140b724b-16a5-420d-8516-72722fb10576	ebc48a09-dae7-412d-9483-353210ad3562	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:07:43.777	2025-05-27 10:07:43.778	\N	f
e00376d6-2676-4d33-9683-fc6313a29aa9	cmazpxtfz0000qu3tgg4qi5ex	140b724b-16a5-420d-8516-72722fb10576	c76efe51-f794-403b-89b9-87490f9e8696	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:07:44.859	2025-05-27 10:07:44.86	\N	f
0f18365d-1678-4c18-ab19-3fcf0eeeca30	cmazpxthm0002qu3ttqezlwor	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	da7a08ed-0a02-4db2-8f0e-79574d809af5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:08:05.054	2025-05-27 10:08:05.055	\N	f
f646a511-4bcc-4592-a87b-c740037353da	cmazpxtfz0000qu3tgg4qi5ex	767b2153-1ddf-43b5-8ba3-c163e0d59aaa	5f4b0865-cd06-46a6-8e8b-5fdf85ea5da2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:08:07.003	2025-05-27 10:08:07.004	\N	f
323e695a-8e4c-4a7e-b1f4-08ed95c80312	cmazpxthm0002qu3ttqezlwor	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	19bf3846-301c-4728-af7d-d6fccce1960a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:08:15.212	2025-05-27 10:08:15.213	\N	f
56d12282-23c9-4c16-91c5-6dd7aa4937f3	cmazpxtfz0000qu3tgg4qi5ex	c66d68ce-6b01-41ec-af56-a5ecf4d3e7b6	19bf3846-301c-4728-af7d-d6fccce1960a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:08:16.037	2025-05-27 10:08:16.038	\N	f
ef1911b1-86a1-4907-b495-f86ff9848d4e	cmazpxthm0002qu3ttqezlwor	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	5a10d345-9576-4f69-8219-d25e93152c08	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:08:30.796	2025-05-27 10:08:30.797	\N	f
58a65aee-eae8-42c3-9f62-fa87b0122ff3	cmazpxtfz0000qu3tgg4qi5ex	ed9fb2cf-0438-4d86-b415-2dac1111fcb5	fedd38dc-7872-40de-bf17-aee4c99f43c7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:08:31.96	2025-05-27 10:08:31.96	\N	f
7437348c-24ad-4058-b3dd-c14694ecee49	cmazpxthm0002qu3ttqezlwor	6a582f59-a400-4c9d-8143-b3e6eb082230	3acca256-8668-4e80-9d6c-ffefbb45c259	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:08:51.049	2025-05-27 10:08:51.05	\N	f
2556c886-e9fd-4b6b-814e-6f078ab1a389	cmazpxtfz0000qu3tgg4qi5ex	6a582f59-a400-4c9d-8143-b3e6eb082230	3acca256-8668-4e80-9d6c-ffefbb45c259	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:08:52.254	2025-05-27 10:08:52.255	\N	f
6c0a6e41-cd82-4e1f-86ec-bff30d515ae6	cmazpxthm0002qu3ttqezlwor	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	5b788043-067e-4fb6-bdd2-42fd0cb07a27	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:09:06.227	2025-05-27 10:09:06.228	\N	f
fff0d840-b8cb-4abb-8071-5a71863b43d6	cmazpxtfz0000qu3tgg4qi5ex	b202ec8c-2a9d-42a6-a13b-696e9ba116e5	b46a7a75-d84c-4676-8478-9177c92dbe36	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:09:07.572	2025-05-27 10:09:07.573	\N	f
f942d62d-f357-401b-887a-368812721fc0	cmazpxthm0002qu3ttqezlwor	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	92d7c921-91a0-4cbc-8bc4-1a91945280a2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:09:34.885	2025-05-27 10:09:34.886	\N	f
0884bb02-e183-4c71-a71b-8224f2fbd495	cmazpxtfz0000qu3tgg4qi5ex	a7d930f1-71b8-45e5-a624-4fcdeecbbfc9	a358f6fa-98cf-43a0-863d-96ae21de4cf8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:09:36.036	2025-05-27 10:09:36.037	\N	f
f1a00bfb-28c8-4301-90ff-97602f2bd44b	cmazpxthm0002qu3ttqezlwor	d6253326-0b34-40d6-8125-d3a1b8cfabaa	5fee24d7-e19e-44d2-bfd3-02008ce3d6de	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:09:48.098	2025-05-27 10:09:48.099	\N	f
fca9e1e1-1a41-4066-81a6-5830f00d47cf	cmazpxtfz0000qu3tgg4qi5ex	d6253326-0b34-40d6-8125-d3a1b8cfabaa	5fee24d7-e19e-44d2-bfd3-02008ce3d6de	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:09:49.219	2025-05-27 10:09:49.22	\N	f
a6252205-37d0-49e3-a977-567f551055c9	cmazpxthm0002qu3ttqezlwor	0d44edf6-38a2-4310-9708-dad2886df46a	c261ccbf-32c8-4c8a-bdca-218d0839f2b1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:10:01.469	2025-05-27 10:10:01.47	\N	f
2a9ee36c-9b83-4a34-8956-02b19ea546c8	cmazpxtfz0000qu3tgg4qi5ex	0d44edf6-38a2-4310-9708-dad2886df46a	c261ccbf-32c8-4c8a-bdca-218d0839f2b1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:10:03.495	2025-05-27 10:10:03.496	\N	f
d429629d-d9e2-4299-bfba-e9f516ee9528	cmazpxthm0002qu3ttqezlwor	145d2485-801f-40ee-a795-28a93847b780	22fa06da-b442-491f-aa86-cf7f58358e9a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:10:10.684	2025-05-27 10:10:10.685	\N	f
47f9fba9-16e6-4738-97d2-5a4b688fec3c	cmazpxtfz0000qu3tgg4qi5ex	145d2485-801f-40ee-a795-28a93847b780	22fa06da-b442-491f-aa86-cf7f58358e9a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:10:12.075	2025-05-27 10:10:12.076	\N	f
604dce04-cece-452d-a501-d2b6637543c8	cmazpxthm0002qu3ttqezlwor	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	3c185343-9ffb-48e9-83aa-dd6fc07aa7c5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:10:20.519	2025-05-27 10:10:20.52	\N	f
e06cd3d1-e6f8-4ab9-9b5c-16e95151ef84	cmazpxtfz0000qu3tgg4qi5ex	67e4b7f4-e641-4cf2-b7bf-7668bbb98e26	3c185343-9ffb-48e9-83aa-dd6fc07aa7c5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:10:21.657	2025-05-27 10:10:21.658	\N	f
3df22f32-79eb-42df-a744-009bd2587bba	cmazpxthm0002qu3ttqezlwor	e73a8b2c-f95b-4cff-9605-fecef53fce39	a84b398b-529f-4971-8ad6-e755a06b38b8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:10:30.37	2025-05-27 10:10:30.372	\N	f
2b71869f-362a-4053-bf13-ff8ada11e57b	cmazpxtfz0000qu3tgg4qi5ex	e73a8b2c-f95b-4cff-9605-fecef53fce39	a84b398b-529f-4971-8ad6-e755a06b38b8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:10:31.63	2025-05-27 10:10:31.631	\N	f
1302bfd1-d1c3-4c05-9143-831bbfcb6206	cmazpxthm0002qu3ttqezlwor	91d56b0c-114c-48c0-864c-2b22548f68ba	de21a696-6544-45e2-be9b-0c697c919543	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:12:00.465	2025-05-27 10:12:00.466	\N	f
e8725169-a1e0-4e8a-8a2a-8d36bf7189e3	cmazpxtfz0000qu3tgg4qi5ex	91d56b0c-114c-48c0-864c-2b22548f68ba	f3839fac-0122-4859-9322-50c8b01ad71a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:12:03.409	2025-05-27 10:12:03.41	\N	f
06982b80-3c15-465d-9c75-faca42c19cf2	cmazpxthm0002qu3ttqezlwor	8abe77b7-3d5e-4d2c-8d88-1c838223030b	5afd350c-1226-4a4e-9ee0-683a08493e0a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:12:12.936	2025-05-27 10:12:12.937	\N	f
ce5890ac-3c88-4e6b-95fa-e7c1b0cbb034	cmazpxtfz0000qu3tgg4qi5ex	8abe77b7-3d5e-4d2c-8d88-1c838223030b	5afd350c-1226-4a4e-9ee0-683a08493e0a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:12:15.002	2025-05-27 10:12:15.003	\N	f
a88fd57b-f955-4982-b824-8dfb2a65eeab	cmazpxthm0002qu3ttqezlwor	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	65b51738-8c45-4217-931f-bcafa7d72f31	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:12:22.722	2025-05-27 10:12:22.723	\N	f
ac8fe7a0-5db7-46f7-a6a3-2dad331a57d5	cmazpxtfz0000qu3tgg4qi5ex	a94c6508-4a23-4ff8-9872-8a1d84efd8ab	b463dfd7-24f3-426f-b48a-ac9f0291ede6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:12:24.096	2025-05-27 10:12:24.097	\N	f
4ac791d6-72f2-4445-b824-0ca3883af24d	cmazpxthm0002qu3ttqezlwor	443e2674-e2dd-4a99-a627-582b1a178dc0	6f9fafcf-9323-43cd-a318-9b7cb00e8689	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:12:50.728	2025-05-27 10:12:50.729	\N	f
e5fb7985-5f49-49d8-bbb7-825ca4bc24ae	cmazpxtfz0000qu3tgg4qi5ex	443e2674-e2dd-4a99-a627-582b1a178dc0	6f9fafcf-9323-43cd-a318-9b7cb00e8689	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:12:52.228	2025-05-27 10:12:52.229	\N	f
0b58ca2d-bf7e-41b2-80ba-fc25c8aa72b6	cmazpxthm0002qu3ttqezlwor	6402e55b-e502-47eb-adaf-d662d33a96d5	da2114f1-ddbd-4b0f-ab90-f97b60c4bf51	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:13:24.47	2025-05-27 10:13:24.471	\N	f
adc20acd-8795-4c17-9c5b-dfc3baefc53f	cmazpxtfz0000qu3tgg4qi5ex	6402e55b-e502-47eb-adaf-d662d33a96d5	da2114f1-ddbd-4b0f-ab90-f97b60c4bf51	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:13:27.684	2025-05-27 10:13:27.685	\N	f
287f77da-bbbd-4ccc-a8a6-d3c60634f4f6	cmazpxthm0002qu3ttqezlwor	06a7e629-237c-455a-a361-ec6203ea9234	60e6312e-0051-4a70-894a-4cb86655a950	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:14:36.305	2025-05-27 10:14:36.306	\N	f
2e875e6f-1173-421b-8ecc-5105f80f193e	cmazpxtfz0000qu3tgg4qi5ex	06a7e629-237c-455a-a361-ec6203ea9234	545709e3-3482-454d-962b-ff4268b03c29	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:14:39.062	2025-05-27 10:14:39.063	\N	f
284fd3d9-d710-4e71-8ff8-15480f7cdb6f	cmazpxthm0002qu3ttqezlwor	4c903a88-55b7-4f68-9cd8-06d374a8baf0	4c67e6bc-478f-49ee-b5fc-1e01889fcf16	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:14:59.199	2025-05-27 10:14:59.2	\N	f
4e22a54d-7196-45eb-913a-eac37b64b710	cmazpxtfz0000qu3tgg4qi5ex	4c903a88-55b7-4f68-9cd8-06d374a8baf0	81c10716-e966-4f90-b5bc-298618447bb6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:15:00.529	2025-05-27 10:15:00.53	\N	f
6b4dc3df-1611-4000-8400-fdd64bf306c9	cmazpxthm0002qu3ttqezlwor	2659d012-2599-4579-bd99-749106796ee0	309de7a5-489d-4249-bfbc-3651c8806fea	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:15:10.024	2025-05-27 10:15:10.026	\N	f
04280648-ff37-4673-a7e6-ab204f59190c	cmazpxtfz0000qu3tgg4qi5ex	2659d012-2599-4579-bd99-749106796ee0	53a604dd-7007-44cc-8e2c-01a5404ff775	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:15:13.135	2025-05-27 10:15:13.136	\N	f
d3dd6c50-1d15-497b-a9c4-8e6dbf465e67	cmazpxthm0002qu3ttqezlwor	2652fe6c-6e62-46fc-bec2-db8b91cecebc	4bc55924-4813-4504-9947-1901dd8941e6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:17:35.972	2025-05-27 10:17:35.973	\N	f
5280c9a7-6857-45fa-9782-9071e48bc99a	cmazpxtfz0000qu3tgg4qi5ex	2652fe6c-6e62-46fc-bec2-db8b91cecebc	20c44701-dc8a-4b16-93d9-a221d7c0cf65	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:17:38.756	2025-05-27 10:17:38.757	\N	f
f991eee6-f44e-4753-a7f5-5710004a2ea2	cmazpxthm0002qu3ttqezlwor	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	35f1e58b-9318-4b41-bd0d-0bf9b2042647	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:17:46.167	2025-05-27 10:17:46.169	\N	f
788ec3e6-210e-4bc3-a66d-ca30535f55f5	cmazpxtfz0000qu3tgg4qi5ex	9a1ab24f-8e55-44ac-a6c7-09e0b21c279b	35f1e58b-9318-4b41-bd0d-0bf9b2042647	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:17:47.608	2025-05-27 10:17:47.609	\N	f
d4731dfe-4628-45ca-8a41-a1291767758a	cmazpxthm0002qu3ttqezlwor	bad17f81-1a2d-4dd8-bbc3-76d059e44acb	c14fbdbf-451a-4e1c-887f-9d7c37ed2607	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:17:59.71	2025-05-27 10:17:59.711	\N	f
2684aebd-37de-49a0-b6c5-3a80f22d2930	cmazpxtfz0000qu3tgg4qi5ex	bad17f81-1a2d-4dd8-bbc3-76d059e44acb	c14fbdbf-451a-4e1c-887f-9d7c37ed2607	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:18:01.246	2025-05-27 10:18:01.247	\N	f
76b011b8-5424-47da-b1df-3e54dfe28dd9	cmazpxthm0002qu3ttqezlwor	b7b05f57-085c-4e59-98ff-5b7be5b188e8	e149297e-f0ba-46da-9162-fe4b917eec55	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:19:18.114	2025-05-27 10:19:18.115	\N	f
accf2b19-e3c5-4107-b2fe-ec78df186b6e	cmazpxtfz0000qu3tgg4qi5ex	b7b05f57-085c-4e59-98ff-5b7be5b188e8	e149297e-f0ba-46da-9162-fe4b917eec55	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:19:22.75	2025-05-27 10:19:22.751	\N	f
b1fa8e92-87b0-4fb4-8ac3-37d61f01f024	cmazpxthm0002qu3ttqezlwor	122ac324-09f9-419a-9e4e-c96b56bf183a	e2a451be-e6c7-477d-b5e9-832e432fc422	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:19:50.24	2025-05-27 10:19:50.241	\N	f
845a5456-9c3b-4e66-bb88-e3b3c53d821f	cmazpxtfz0000qu3tgg4qi5ex	122ac324-09f9-419a-9e4e-c96b56bf183a	8fecb0b4-713e-4b71-b53e-6570cab4c28b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:19:51.465	2025-05-27 10:19:51.466	\N	f
4d814532-87d9-4dbb-8eb1-9fa2bf77fd27	cmazpxthm0002qu3ttqezlwor	faadcff3-7957-4c4e-8620-50a24b37c862	b8bfd63d-4103-4f2c-a609-750dbaa89a0a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:25:02.807	2025-05-27 10:25:02.808	\N	f
7e4f1c3b-b324-4b93-938b-893cb349452c	cmazpxtfz0000qu3tgg4qi5ex	faadcff3-7957-4c4e-8620-50a24b37c862	359936c9-d5a3-46bd-94b1-340d9dea6860	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:25:06.937	2025-05-27 10:25:06.938	\N	f
d18716a5-9154-4e53-8bcc-3c31b97b93e8	cmazpxthm0002qu3ttqezlwor	b5911913-b139-4fdc-a8dc-d03750a50dde	baad8e62-3d1c-40d3-a8a5-d088eda44591	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:25:26.392	2025-05-27 10:25:26.393	\N	f
6696e147-290b-4c7d-9833-129c1da5baef	cmazpxtfz0000qu3tgg4qi5ex	b5911913-b139-4fdc-a8dc-d03750a50dde	baad8e62-3d1c-40d3-a8a5-d088eda44591	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:25:28.488	2025-05-27 10:25:28.489	\N	f
d7cd8d1d-7d9e-4014-a970-d9778566bb71	cmazpxthm0002qu3ttqezlwor	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	b240e781-9ca9-4f05-b9ac-63c6a445c634	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:25:59.891	2025-05-27 10:25:59.891	\N	f
80c935a9-66e2-4d03-ade6-f730c803614f	cmazpxtfz0000qu3tgg4qi5ex	ba833cac-35c5-49cf-8e1b-67ea31ba6aa4	b240e781-9ca9-4f05-b9ac-63c6a445c634	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:26:03.437	2025-05-27 10:26:03.438	\N	f
ae37c514-96b6-486e-bd61-f31ed6a3bf4a	cmazpxthm0002qu3ttqezlwor	f577157e-75a5-425e-b537-99cbf885c979	081f3a1a-bd24-4741-b9d0-612f59abe92b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:26:26.142	2025-05-27 10:26:26.143	\N	f
9c54dea9-7b08-4d7f-af8d-9feab94b5cf1	cmazpxtfz0000qu3tgg4qi5ex	f577157e-75a5-425e-b537-99cbf885c979	081f3a1a-bd24-4741-b9d0-612f59abe92b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:26:28.735	2025-05-27 10:26:28.736	\N	f
4c48fc20-4edb-44b3-bf74-98c2b08a86bf	cmazpxthm0002qu3ttqezlwor	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	22f2b675-ef0b-41a0-9995-c313241aa5af	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:27:02.636	2025-05-27 10:27:02.637	\N	f
9a28b8df-df58-49cb-aaa6-0553283c1138	cmazpxtfz0000qu3tgg4qi5ex	03fd993f-cec1-4c9e-8a83-eeef33c7ae8c	9431b1e2-5f25-43a0-bde8-7262e5dfd6da	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:27:06.239	2025-05-27 10:27:06.24	\N	f
a49ee9d5-ee54-4b66-84a1-e7ac9a6b742a	cmazpxthm0002qu3ttqezlwor	97553132-efe4-436a-8463-55773a02c6ae	d9a16cda-1a5d-49f8-b1ba-9fc78647dd4b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 10:32:16.446	2025-05-27 10:32:16.447	\N	f
3b40234b-c987-4ec7-9b38-6e732388ce9a	cmazpxtfz0000qu3tgg4qi5ex	97553132-efe4-436a-8463-55773a02c6ae	d9a16cda-1a5d-49f8-b1ba-9fc78647dd4b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 12:37:41.417	2025-05-27 12:37:41.436	\N	f
6efcb3f5-cc23-4630-8392-c3e1ed8d9fab	cmazpxthm0002qu3ttqezlwor	17279c41-09b0-49be-87ec-05bf0d5da921	d68d7471-a667-45f8-9810-f227b679c8da	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 12:37:57.018	2025-05-27 12:37:57.019	\N	f
2e6309ac-3667-477d-a397-55a0f7903c05	cmazpxtfz0000qu3tgg4qi5ex	17279c41-09b0-49be-87ec-05bf0d5da921	730b6c7e-1bc3-4f46-89a3-98bfa2d35741	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 12:37:59.366	2025-05-27 12:37:59.367	\N	f
d93df6ee-ad6d-4e66-919d-b81c3d173d7e	cmazpxtfz0000qu3tgg4qi5ex	d29aa121-4e91-4123-bb89-809c951fe928	a7f1be65-cb81-4518-8f92-8b15d60d82c0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:23:47.548	2025-05-27 14:23:47.549	\N	f
fa3a51aa-ae29-482f-84a7-f7d9a3a1606b	cmazpxthm0002qu3ttqezlwor	d29aa121-4e91-4123-bb89-809c951fe928	cb64aa80-df6e-4942-8e1c-ba2bb38b6094	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:23:48.472	2025-05-27 14:23:48.473	\N	f
a9683f13-ffd0-4c99-9fe3-44762d503d92	cmazpxtfz0000qu3tgg4qi5ex	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	62733ec9-c3c3-4349-a752-b3840f09d0b2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:25:29.673	2025-05-27 14:25:29.674	\N	f
fecfe325-0d10-46f7-ae5f-b8c14d46e604	cmazpxthm0002qu3ttqezlwor	f6fd6661-73bf-4f18-a6b8-b6f8606abe72	253ffbf4-7214-489e-803c-1ed3d01ee5a6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:25:31.088	2025-05-27 14:25:31.089	\N	f
1500ffc3-0701-448a-bf03-79382f0ead2e	cmazpxtfz0000qu3tgg4qi5ex	730e74c7-6338-49f7-8f0d-4cacb3467703	a8b71366-fcac-4bf5-9ed0-a37d8d7ad32e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:41:16.661	2025-05-27 14:41:16.663	\N	f
0c844a4f-ff0f-4a56-ac33-0fdcef2e576c	cmazpxthm0002qu3ttqezlwor	730e74c7-6338-49f7-8f0d-4cacb3467703	a8b71366-fcac-4bf5-9ed0-a37d8d7ad32e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:41:16.663	2025-05-27 14:41:16.664	\N	f
b6b6187e-5de0-43c0-a37d-96d9d5bc180e	cmazpxtfz0000qu3tgg4qi5ex	e8862f4a-a677-4112-a197-184c365158ef	b2e333ac-10fb-4a4c-90bc-a7c0f8c7fcc9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:45:59.492	2025-05-27 14:45:59.493	\N	f
4f5d15e1-b838-4b17-ae9a-a153eea090c1	cmazpxthm0002qu3ttqezlwor	e8862f4a-a677-4112-a197-184c365158ef	b2e333ac-10fb-4a4c-90bc-a7c0f8c7fcc9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:46:00.527	2025-05-27 14:46:00.528	\N	f
066c731c-f324-453c-a206-894aaa598a44	cmazpxthm0002qu3ttqezlwor	f66fd69e-fbeb-443b-a021-c298e513a6f8	b9faac21-0bda-4007-9c8b-3419e7195755	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:54:02.204	2025-05-27 14:54:02.205	\N	f
db2ecf42-3608-410e-9783-4b02c2e0566e	cmazpxtfz0000qu3tgg4qi5ex	f66fd69e-fbeb-443b-a021-c298e513a6f8	985b5d95-6c28-47d6-b45e-ed66a85c2d76	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:54:02.23	2025-05-27 14:54:02.231	\N	f
1b368c83-fe10-41d1-8604-875c539382dc	cmazpxthm0002qu3ttqezlwor	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	0eed0d9e-a9b6-4472-b951-9ca49448882b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:54:23.026	2025-05-27 14:54:23.027	\N	f
2d6db67c-09d2-4552-9f32-bbe8dcda1bcd	cmazpxtfz0000qu3tgg4qi5ex	a2d09cc6-babd-4e8a-98dc-a0148d8b7384	66fabdef-284c-489a-bf2e-4eef3ccb3b07	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:54:24.095	2025-05-27 14:54:24.096	\N	f
0379e67f-4fd8-46c6-a5a1-8cb68d17d115	cmazpxthm0002qu3ttqezlwor	59be806c-5aa4-4eb5-a130-e74f06dc486b	c0b2027a-2863-4643-a92d-facf7c6a8deb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:54:56.061	2025-05-27 14:54:56.062	\N	f
76a46b47-c6b9-4d83-8690-4c254a841f7d	cmazpxtfz0000qu3tgg4qi5ex	59be806c-5aa4-4eb5-a130-e74f06dc486b	c0b2027a-2863-4643-a92d-facf7c6a8deb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:54:57.789	2025-05-27 14:54:57.79	\N	f
53e91c41-8fc8-4e1c-9a77-925f89bf35b2	cmazpxtfz0000qu3tgg4qi5ex	8754c711-e0c9-4440-b8c5-14605e9c1686	f33fcb66-cc3d-4972-aaca-a6fb85cf5cee	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:59:55.176	2025-05-27 14:59:55.177	\N	f
76784062-790a-4cd2-92c1-8090fb1f2c42	cmazpxthm0002qu3ttqezlwor	8754c711-e0c9-4440-b8c5-14605e9c1686	2d03ae1d-0b37-4dfd-8b05-2ea66cb80e4b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 14:59:55.186	2025-05-27 14:59:55.187	\N	f
a17e0cc7-cba6-4277-9643-a0be2d93a1ce	cmazpxthm0002qu3ttqezlwor	7f99b900-07fd-4acf-99e0-839abecb8e52	574a1252-256d-485e-87cd-4ffcd97f05a2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:00:40.397	2025-05-27 15:00:40.398	\N	f
8919dd8e-382d-4ff1-acb9-49d41f0ba87c	cmazpxtfz0000qu3tgg4qi5ex	7f99b900-07fd-4acf-99e0-839abecb8e52	e331be94-0efc-4a12-a257-f9d3c47fb810	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:00:41.753	2025-05-27 15:00:41.754	\N	f
a45eb75e-ee1f-4bbe-a385-187e17cf9e5e	cmazpxthm0002qu3ttqezlwor	76438079-4579-4f01-a037-874d8cb1d599	18749d06-130d-4a47-8ed9-e97a9bc0a9a3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:05:31.031	2025-05-27 15:05:31.032	\N	f
245fee3c-140c-487a-bb1f-49a896f430ca	cmazpxtfz0000qu3tgg4qi5ex	76438079-4579-4f01-a037-874d8cb1d599	2b3d9742-76a4-45b2-ae99-e3fcedc77427	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:05:31.048	2025-05-27 15:05:31.049	\N	f
a2214149-95f5-44ca-a953-8ceb48511b14	cmazpxthm0002qu3ttqezlwor	5bf309eb-632c-4c84-b1d7-31b558630477	1755a044-5587-4e8e-9c1d-1271c07840e1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:06:15.477	2025-05-27 15:06:15.478	\N	f
06c00c5c-3d3c-4b7f-bece-fd936116ad54	cmazpxtfz0000qu3tgg4qi5ex	5bf309eb-632c-4c84-b1d7-31b558630477	f46e5fbe-25be-4a45-aba6-f5a9295b7f4d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:06:17.024	2025-05-27 15:06:17.025	\N	f
562a652d-c0a2-41cc-b2e1-a9b405377dff	cmazpxthm0002qu3ttqezlwor	93162b5d-3d6c-47ba-aebe-e2295159b54d	cca30ece-b121-4150-97ea-c7f4a8d00848	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:09:08.537	2025-05-27 15:09:08.538	\N	f
55b9900a-342d-4c9b-a1e2-c1d634cba16a	cmazpxtfz0000qu3tgg4qi5ex	93162b5d-3d6c-47ba-aebe-e2295159b54d	cca30ece-b121-4150-97ea-c7f4a8d00848	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:09:13.17	2025-05-27 15:09:13.171	\N	f
9845a122-e960-4c05-91e8-ee883f16c232	cmazpxthm0002qu3ttqezlwor	6e4ccbbd-761d-4db5-b644-c191e667a6ef	4611599a-ebb6-42d8-91c0-f18bcb29ede8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:10:15.368	2025-05-27 15:10:15.369	\N	f
2d5f5d26-84c5-4c2f-8646-a9d0942ddbe5	cmazpxtfz0000qu3tgg4qi5ex	6e4ccbbd-761d-4db5-b644-c191e667a6ef	4611599a-ebb6-42d8-91c0-f18bcb29ede8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:10:18.824	2025-05-27 15:10:18.825	\N	f
ee52c3c8-e921-4b4f-9b0e-2f8236a45a6a	cmazpxthm0002qu3ttqezlwor	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	492a26b2-dc21-4336-af15-dc127b7f5ccc	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:10:30.724	2025-05-27 15:10:30.726	\N	f
1c1a997e-48f3-4182-96b6-b067e367739e	cmazpxtfz0000qu3tgg4qi5ex	937a6b97-95a4-4ebf-8e31-f4c41a5f0820	492a26b2-dc21-4336-af15-dc127b7f5ccc	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:10:34.773	2025-05-27 15:10:34.775	\N	f
c86cd73c-18e5-4da0-8bf1-7609659f4924	cmazpxthm0002qu3ttqezlwor	286e0137-37b7-4333-9425-e22f09f6b12f	a2a6363d-2725-43e0-babb-e6d1f3ef8d8c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:10:47.906	2025-05-27 15:10:47.908	\N	f
825bf9fc-c886-4dc8-86f3-65c406a80d2d	cmazpxtfz0000qu3tgg4qi5ex	286e0137-37b7-4333-9425-e22f09f6b12f	a2a6363d-2725-43e0-babb-e6d1f3ef8d8c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:10:50.796	2025-05-27 15:10:50.797	\N	f
1766c632-103c-4948-8a88-4d3e991673f0	cmazpxthm0002qu3ttqezlwor	d51bddd7-d291-4bc9-9737-d10705397a4c	b60d6c3d-98f5-4716-97ee-88396afe85c1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:10:55.7	2025-05-27 15:10:55.701	\N	f
49c19e04-9ec8-486c-babc-b79aca4791a3	cmazpxtfz0000qu3tgg4qi5ex	d51bddd7-d291-4bc9-9737-d10705397a4c	8fd6d149-74f4-4293-84bf-000f7b87a595	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:10:58.406	2025-05-27 15:10:58.407	\N	f
847f2525-74c9-4801-8575-ee4618c81535	cmazpxthm0002qu3ttqezlwor	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	cb5c460c-8211-4006-99bb-7adef717fde0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:11:52.661	2025-05-27 15:11:52.662	\N	f
5d027320-4241-42b8-a570-5b4e35f13a9e	cmazpxtfz0000qu3tgg4qi5ex	15b9d2bc-53f5-4dc3-b4ef-52fabeea9345	8627a036-5f1f-4644-a3e6-7e730b0c231b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:11:54.027	2025-05-27 15:11:54.028	\N	f
9d742369-665d-482a-ba77-40ffe1b3c055	cmazpxthm0002qu3ttqezlwor	bf4c517f-21a3-4ca3-96d4-2002965e42ed	01f26008-4026-4194-a38f-fca0e6d757c0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:12:04.805	2025-05-27 15:12:04.806	\N	f
d7a3199a-1cd6-4c7e-8f1e-08492ffbbda6	cmazpxtfz0000qu3tgg4qi5ex	bf4c517f-21a3-4ca3-96d4-2002965e42ed	01f26008-4026-4194-a38f-fca0e6d757c0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:12:07.521	2025-05-27 15:12:07.522	\N	f
9b0c710a-5a9a-41fd-98aa-44dec81c1458	cmazpxthm0002qu3ttqezlwor	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	f50f6d03-ba88-4aeb-9722-1381308587cc	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:13:01.601	2025-05-27 15:13:01.603	\N	f
3106a71f-9fbc-4d25-beb8-66d064ae5f4d	cmazpxtfz0000qu3tgg4qi5ex	dd88e4f7-0b5a-4c9a-945b-62db254d6df5	f50f6d03-ba88-4aeb-9722-1381308587cc	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:13:04.641	2025-05-27 15:13:04.643	\N	f
52c6265c-f1fd-4953-9c5e-818e7e62f3b0	cmazpxthm0002qu3ttqezlwor	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	f4cc1d7e-6216-4dae-bf97-771affb86b7a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:14:49.538	2025-05-27 15:14:49.539	\N	f
c06ce67b-d8d4-4a04-b1a4-5bcc1302719c	cmazpxtfz0000qu3tgg4qi5ex	93639a21-9dc5-42e7-abeb-ac0d0b5b4107	f4cc1d7e-6216-4dae-bf97-771affb86b7a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:14:50.646	2025-05-27 15:14:50.647	\N	f
e6353f66-2253-479b-8813-43410052df22	cmazpxthm0002qu3ttqezlwor	895ae354-7138-4797-bd0c-91f45dc927e0	23815262-c47d-4d8c-ad60-1be21ad0f1a8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:17:44.871	2025-05-27 15:17:44.872	\N	f
d7ec9b3f-b584-48dc-85db-8e06b5aeaa1e	cmazpxtfz0000qu3tgg4qi5ex	895ae354-7138-4797-bd0c-91f45dc927e0	741bb2ff-a888-47ca-ac40-c0245a2019e6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:17:52.166	2025-05-27 15:17:52.167	\N	f
64b59dfc-5f5c-4820-ba6c-10167d07917f	cmazpxthm0002qu3ttqezlwor	d9763a18-a497-4720-9deb-82a84e1f14ad	fa350a59-71d4-4a1f-a326-f52a77e106ae	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:20:20.392	2025-05-27 15:20:20.394	\N	f
4a727b4c-6c9c-45e2-ba05-7c364d75b727	cmazpxtfz0000qu3tgg4qi5ex	d9763a18-a497-4720-9deb-82a84e1f14ad	fa350a59-71d4-4a1f-a326-f52a77e106ae	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:20:21.094	2025-05-27 15:20:21.095	\N	f
c2fef37c-9be4-4111-bc5f-ad107c3308c4	cmazpxthm0002qu3ttqezlwor	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	e180d924-64af-495e-97dc-427ebc5ee433	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:22:56.13	2025-05-27 15:22:56.132	\N	f
2d612ab2-f43f-4f28-a4ca-31db937432dc	cmazpxtfz0000qu3tgg4qi5ex	d5ec0350-92aa-4ec8-826a-eb6ba6aafdec	e180d924-64af-495e-97dc-427ebc5ee433	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:23:00.141	2025-05-27 15:23:00.142	\N	f
45745d8c-e7d6-4383-939f-abaa9c604d3d	cmazpxthm0002qu3ttqezlwor	733c585b-631f-4dfb-a3a5-aec524d5a4e0	c5d5d7c2-8b5f-4f85-8c24-2e2883a2f95a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:23:25.002	2025-05-27 15:23:25.003	\N	f
81571e34-affe-415c-af01-5e9041d9acea	cmazpxtfz0000qu3tgg4qi5ex	733c585b-631f-4dfb-a3a5-aec524d5a4e0	da63a6c7-cb58-4c77-8580-ecec8b582f7f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:23:26.518	2025-05-27 15:23:26.519	\N	f
74890ecf-caa8-4459-9db3-48ce7dd45afb	cmazpxthm0002qu3ttqezlwor	4e7476bb-6dde-4725-8a96-5454520df090	7cbc12ab-d710-4239-bf9f-290507878de6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:25:26.401	2025-05-27 15:25:26.402	\N	f
847daf68-b179-4eca-86ba-713a0040b4f5	cmazpxtfz0000qu3tgg4qi5ex	4e7476bb-6dde-4725-8a96-5454520df090	8166a12d-e75f-40b2-96ed-5dec2673ec93	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:25:27.7	2025-05-27 15:25:27.701	\N	f
ee499877-300c-46d2-ad5b-83dbe25b9744	cmazpxthm0002qu3ttqezlwor	6524e347-2474-453a-9dc1-c1fa6daf6129	dedcbb40-4075-4c55-a38f-f7cf41173ed8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:27:36.651	2025-05-27 15:27:36.652	\N	f
f937de3a-b699-4574-953b-045a7c43c302	cmazpxtfz0000qu3tgg4qi5ex	6524e347-2474-453a-9dc1-c1fa6daf6129	116557d5-b00e-4f5c-9c6f-18a0cf2594ed	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:27:37.47	2025-05-27 15:27:37.471	\N	f
5341892e-350d-4276-a4fd-db32a87c9864	cmazpxthm0002qu3ttqezlwor	484abcbf-dbd3-4c73-9ddf-3d31102d9564	e4b698fc-400b-4b1f-96d1-ca478af1ad47	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:28:05.189	2025-05-27 15:28:05.19	\N	f
a3dee550-790d-4631-8e99-0465b80c5394	cmazpxtfz0000qu3tgg4qi5ex	484abcbf-dbd3-4c73-9ddf-3d31102d9564	c68d46ab-834b-4895-a943-a395a73fbef8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:28:09.794	2025-05-27 15:28:09.795	\N	f
ef7cef63-d9b4-477e-add7-85e5d49ef4b5	cmazpxthm0002qu3ttqezlwor	722b8cdb-281a-4797-ab32-32d089dae310	93301d13-50fd-4ffc-ad7d-eee4d3d39b56	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:30:25.881	2025-05-27 15:30:25.882	\N	f
aae04d3b-30cb-4a5d-a055-5edf8492f381	cmazpxtfz0000qu3tgg4qi5ex	722b8cdb-281a-4797-ab32-32d089dae310	93301d13-50fd-4ffc-ad7d-eee4d3d39b56	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:30:32.337	2025-05-27 15:30:32.338	\N	f
53b9d16c-409b-4b13-a242-a13cf9cd8eed	cmazpxthm0002qu3ttqezlwor	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	a352cafb-9c4a-4732-bd5e-b41e6d29c54e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:32:39.367	2025-05-27 15:32:39.368	\N	f
0a13da9f-be4c-4647-acbb-a5ac10e339dc	cmazpxtfz0000qu3tgg4qi5ex	9150d5c0-b8d3-4bdb-b202-9ba0d47a81d0	cedf9e57-34d3-4cf6-89bb-5fa0631d85cf	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:32:43.42	2025-05-27 15:32:43.421	\N	f
35c61c7a-aa4a-495c-87c8-248f83125591	cmazpxthm0002qu3ttqezlwor	05e41b42-81d8-473f-a63e-7326ff72ed9f	b82125f1-aaf1-4fd1-ad5d-01bfda16992a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:34:23.306	2025-05-27 15:34:23.308	\N	f
83f09011-14b5-4bae-a8fe-0f5aa586fc09	cmazpxtfz0000qu3tgg4qi5ex	05e41b42-81d8-473f-a63e-7326ff72ed9f	b82125f1-aaf1-4fd1-ad5d-01bfda16992a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:34:26.943	2025-05-27 15:34:26.944	\N	f
8e7c1814-33f3-4cd6-a573-908409175176	cmazpxthm0002qu3ttqezlwor	368c76e7-957b-4495-a7a4-bfbb98eb3cca	dc5f0ee7-65fe-48f0-8aac-bc5af511accf	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:39:53.107	2025-05-27 15:39:53.109	\N	f
9bb6805e-da65-4448-a501-63184cf1e7c3	cmazpxtfz0000qu3tgg4qi5ex	368c76e7-957b-4495-a7a4-bfbb98eb3cca	dc5f0ee7-65fe-48f0-8aac-bc5af511accf	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:39:56.749	2025-05-27 15:39:56.75	\N	f
90e5ae57-1143-4627-9e74-58e6496a364a	cmazpxthm0002qu3ttqezlwor	18a83d57-fd7d-4612-821f-1f0e59dc38ec	8758d586-13c3-47f9-8be7-c5ad5541afb9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:50:13.82	2025-05-27 15:50:13.822	\N	f
09eb7795-173a-4b88-9a8d-1787ad6d77f2	cmazpxtfz0000qu3tgg4qi5ex	18a83d57-fd7d-4612-821f-1f0e59dc38ec	8758d586-13c3-47f9-8be7-c5ad5541afb9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:50:14.068	2025-05-27 15:50:14.069	\N	f
c18d77c9-a961-4181-bc90-314a0fc674fb	cmazpxthm0002qu3ttqezlwor	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	acdf9e8c-e3d3-4743-80dd-c39afaa592eb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:59:09.25	2025-05-27 15:59:09.251	\N	f
f797bc34-34ce-40e8-9941-18f92310fbe9	cmazpxtfz0000qu3tgg4qi5ex	6dc92a3e-5379-4b7d-a066-f96ec1a91f78	acdf9e8c-e3d3-4743-80dd-c39afaa592eb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 15:59:10.375	2025-05-27 15:59:10.376	\N	f
df255cf6-a8ca-4982-a978-ee5b26168705	cmazpxthm0002qu3ttqezlwor	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	ca4a93cf-e7eb-41a0-adc7-5c88635cf38d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 18:57:23.66	2025-05-27 18:57:23.662	\N	f
ba96102e-5b82-42e6-a032-f1beca2ac375	cmazpxtfz0000qu3tgg4qi5ex	f20abfe2-8bfc-4e98-9c5b-722993f0ac2d	a35b0a47-2355-4572-8a86-679559fef5c6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 18:57:26.217	2025-05-27 18:57:26.218	\N	f
dc39d107-c5a8-4395-a148-86ac838917a1	cmazpxthm0002qu3ttqezlwor	305ee8f2-4436-439b-b727-8d2bd0e2bc80	3ac35ea7-be19-471c-b608-9bddeb1ba228	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:00:10.028	2025-05-27 19:00:10.029	\N	f
c3d42acb-52e8-4006-9aa9-564cb301ae23	cmazpxtfz0000qu3tgg4qi5ex	305ee8f2-4436-439b-b727-8d2bd0e2bc80	d0cf76e8-c306-4e9b-b51d-7c7021c1a076	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:00:12.606	2025-05-27 19:00:12.608	\N	f
5142858d-9973-49b0-9b52-01060f93bfdf	cmazpxthm0002qu3ttqezlwor	061834a0-1650-41a8-a8c6-4f4c8cb6831f	5caf024d-7037-439c-97ff-c1d9c95e7b89	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:01:22.248	2025-05-27 19:01:22.249	\N	f
8e285cce-ef93-456e-b431-deea0d13520a	cmazpxtfz0000qu3tgg4qi5ex	061834a0-1650-41a8-a8c6-4f4c8cb6831f	5caf024d-7037-439c-97ff-c1d9c95e7b89	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:01:28.327	2025-05-27 19:01:28.329	\N	f
035e45e8-331d-4ab8-a4ce-74d19fb7ae4b	cmazpxthm0002qu3ttqezlwor	a66aff0c-57b9-4961-bc63-5e026a9a7faf	1a2b9832-0421-4f6e-854b-6ac99ecefc1b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:16:55.355	2025-05-27 19:16:55.356	\N	f
8971243e-a138-4c61-9811-19e5b11b0dde	cmazpxtfz0000qu3tgg4qi5ex	a66aff0c-57b9-4961-bc63-5e026a9a7faf	544a244e-611e-4bc1-b8cf-4974041389bd	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:17:01.059	2025-05-27 19:17:01.06	\N	f
98711657-5e70-4e18-ad34-12311ad1c1de	cmazpxtfz0000qu3tgg4qi5ex	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	ce1431d6-d788-4d60-9401-9d569c89b0e5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:39:43.473	2025-05-27 19:39:43.474	\N	f
391719a3-da65-437f-8767-7b26bab894e5	cmazpxthm0002qu3ttqezlwor	774b76f8-c9a4-4068-b867-99c2dfb7ecd5	250bc0f5-3c7d-4fd7-a76c-bc55aa879844	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:39:43.475	2025-05-27 19:39:43.476	\N	f
5145707d-2caa-4150-910c-0ca292b41fe3	cmazpxthm0002qu3ttqezlwor	8da5755b-2a1d-41a0-b43c-c427c063748b	fdf3a64b-6787-4c61-aa92-37a60dcb9fc0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:40:19.576	2025-05-27 19:40:19.577	\N	f
582db2b8-8cae-47d0-958b-ff915dfa9f0a	cmazpxtfz0000qu3tgg4qi5ex	8da5755b-2a1d-41a0-b43c-c427c063748b	dfdd660f-897c-4377-b0c0-70f56098093c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:40:22.08	2025-05-27 19:40:22.082	\N	f
bab807e3-c102-4056-8926-58b86950922c	cmazpxthm0002qu3ttqezlwor	1afd8c5e-977f-4597-8368-b658f59aa7fc	fa98c083-a69b-4352-84fe-07c4f96b9781	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:40:31.672	2025-05-27 19:40:31.673	\N	f
a0678e69-7242-4fd6-bb85-57eb3fd78111	cmazpxtfz0000qu3tgg4qi5ex	1afd8c5e-977f-4597-8368-b658f59aa7fc	e7620ad7-2bdc-4ba9-b876-6ec80a4b9055	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:40:33.193	2025-05-27 19:40:33.195	\N	f
42f86ab5-855d-4623-92c7-47ee01a93c3c	cmazpxthm0002qu3ttqezlwor	be2b14ea-489e-490a-8398-79716b05cfda	ee416e03-f45c-473e-8863-5492d3341d72	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:41:26.463	2025-05-27 19:41:26.464	\N	f
5567a75d-4958-457a-8706-dd6a6e07f807	cmazpxtfz0000qu3tgg4qi5ex	be2b14ea-489e-490a-8398-79716b05cfda	ee416e03-f45c-473e-8863-5492d3341d72	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:41:27.878	2025-05-27 19:41:27.88	\N	f
3500c929-fd54-49ec-b370-a6ab2913b6f4	cmazpxthm0002qu3ttqezlwor	de3b04ee-9038-47f2-9d7b-68823d41cbac	bde90562-4669-4869-9834-da07e1cb6e21	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:41:49.491	2025-05-27 19:41:49.493	\N	f
5ad3a3b0-ab9d-470a-b3d9-9b7147e1ee73	cmazpxtfz0000qu3tgg4qi5ex	de3b04ee-9038-47f2-9d7b-68823d41cbac	bde90562-4669-4869-9834-da07e1cb6e21	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:41:52.394	2025-05-27 19:41:52.395	\N	f
37296713-8869-4c3d-9118-ddb8e35cf446	cmazpxthm0002qu3ttqezlwor	79a82f80-fb7d-4211-bb73-4a2ef554204f	d694750e-ddd0-426b-9c34-22e28487c9c4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:43:07.937	2025-05-27 19:43:07.938	\N	f
e0d2a724-4d9c-43b4-8be6-c7cf0e2b16f4	cmazpxtfz0000qu3tgg4qi5ex	79a82f80-fb7d-4211-bb73-4a2ef554204f	d694750e-ddd0-426b-9c34-22e28487c9c4	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:43:09.4	2025-05-27 19:43:09.401	\N	f
74aad30b-c243-4064-ad51-fc49e6d75b44	cmazpxtfz0000qu3tgg4qi5ex	4524ee1f-9f7a-465b-acf3-467f5161059c	945b6601-6c81-4904-9a85-2b0be177f84a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:48:29.199	2025-05-27 19:48:29.2	\N	f
13f83737-db7c-4f57-9c68-ac6826e49d1f	cmazpxthm0002qu3ttqezlwor	4524ee1f-9f7a-465b-acf3-467f5161059c	90e2e395-c001-4146-9fa5-12cebebd9a6a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:48:29.2	2025-05-27 19:48:29.201	\N	f
eef0e0a3-c5db-46a7-8f0f-d68870761dde	cmazpxthm0002qu3ttqezlwor	a7d730e1-30f5-40df-b95b-cb972ecdd573	eb5a1684-8041-4719-a607-7b2684f117a6	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:48:49.534	2025-05-27 19:48:49.535	\N	f
5b000139-ec67-4e6e-8f38-e642de3181e1	cmazpxtfz0000qu3tgg4qi5ex	a7d730e1-30f5-40df-b95b-cb972ecdd573	24717988-78f8-41f8-b270-070f677537db	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 19:48:54.312	2025-05-27 19:48:54.313	\N	f
91bc3836-d659-4c4f-90fe-ac2b436e57f2	cmazpxthm0002qu3ttqezlwor	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	3d8fa20a-8a59-41da-93ca-31327849b22b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:15:32.459	2025-05-27 21:15:32.46	\N	f
6ffc3573-ecba-4096-ba46-9f8be5d3ad90	cmazpxtfz0000qu3tgg4qi5ex	6eb04dc6-bf5b-4d50-9af6-ca7c4301dffd	46e79348-d3a3-4024-9daf-497e587de7c5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:15:34.386	2025-05-27 21:15:34.387	\N	f
1ec3f0a1-48bf-4ecf-921f-4d41d88ee19c	cmazpxthm0002qu3ttqezlwor	bc608ac8-bb77-4b23-ab46-159904eb81ae	eae49178-f720-4614-bd8e-fdb4d49f4462	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:16:03.694	2025-05-27 21:16:03.695	\N	f
9f11cb1d-5f54-4cc6-b155-8ec20126d417	cmazpxtfz0000qu3tgg4qi5ex	bc608ac8-bb77-4b23-ab46-159904eb81ae	eae49178-f720-4614-bd8e-fdb4d49f4462	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:16:06.355	2025-05-27 21:16:06.356	\N	f
b4b60731-8adf-48c3-aa6d-299cd4c7bbe9	cmazpxthm0002qu3ttqezlwor	f0991fcd-ba86-43ed-bb8d-30ee6f813530	a77a2399-fbdf-4859-ac0a-0ec87f9528b1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:19:34.042	2025-05-27 21:19:34.043	\N	f
21c24c4f-e1d6-4285-b23d-09768aad9767	cmazpxtfz0000qu3tgg4qi5ex	f0991fcd-ba86-43ed-bb8d-30ee6f813530	a77a2399-fbdf-4859-ac0a-0ec87f9528b1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:19:35.418	2025-05-27 21:19:35.419	\N	f
18384955-26eb-4655-8e7f-ceb4845196b4	cmazpxthm0002qu3ttqezlwor	1c69cd87-b362-4f5d-befe-06706be21c3f	22d9e237-0ed1-4b95-94f9-2b8ac0983886	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:19:50.756	2025-05-27 21:19:50.756	\N	f
c6bc32f5-f504-41bf-ac46-9d6adde9b0bc	cmazpxtfz0000qu3tgg4qi5ex	1c69cd87-b362-4f5d-befe-06706be21c3f	4886df03-673a-47b8-b974-8c79c38555f3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:19:52.497	2025-05-27 21:19:52.498	\N	f
6018b2f4-5ebc-4c67-859b-0e94c3549f37	cmazpxthm0002qu3ttqezlwor	40c6c153-e108-4087-992d-40393c5c8d0f	e050933d-1c9b-4c3e-8241-7ffd4639603a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:20:02.931	2025-05-27 21:20:02.932	\N	f
f415a777-4875-4e4d-9c27-084f9bd0eddb	cmazpxtfz0000qu3tgg4qi5ex	40c6c153-e108-4087-992d-40393c5c8d0f	e050933d-1c9b-4c3e-8241-7ffd4639603a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:20:04.308	2025-05-27 21:20:04.309	\N	f
0a86a196-21cb-4a4b-9570-bbaa5cab3582	cmazpxtfz0000qu3tgg4qi5ex	b20f70d8-8103-4562-a31c-2620c9da4226	d4b4edd2-830d-4238-a13b-5a87621f7b33	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:20:20.962	2025-05-27 21:20:20.963	\N	f
b2a19280-3ffe-4485-919f-16dbed036093	cmazpxthm0002qu3ttqezlwor	b20f70d8-8103-4562-a31c-2620c9da4226	80996c75-1819-4b3c-adb2-06c22dccd51f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:20:22.499	2025-05-27 21:20:22.499	\N	f
3c8463e2-3f79-42e9-94bf-d5bf9202c485	cmazpxthm0002qu3ttqezlwor	5442e950-bbfb-4c60-a047-3a21057e2a13	74824334-3776-4c7b-8c44-5b77d051bfd2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:22:18.975	2025-05-27 21:22:18.977	\N	f
7d0c88b8-d6c6-4696-b000-bf7bd5793e26	cmazpxtfz0000qu3tgg4qi5ex	5442e950-bbfb-4c60-a047-3a21057e2a13	9f728d4e-72ff-4a0b-b817-132611120451	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:22:21.333	2025-05-27 21:22:21.334	\N	f
6c9fd824-67a2-4f68-80d7-089f82350494	cmazpxthm0002qu3ttqezlwor	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	d95f40f5-f3bf-4c16-b120-04b168afd4ba	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:22:32.003	2025-05-27 21:22:32.004	\N	f
8c135442-f88d-4d5b-a16b-2dd7faed814f	cmazpxtfz0000qu3tgg4qi5ex	8d1f9a9e-7e9c-4be5-9845-0b1645f8934a	fe482cae-6189-437a-8d8c-017ffdd6d06a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:22:34.871	2025-05-27 21:22:34.872	\N	f
b4612d7b-cfef-4d6c-9702-c179333b8bbe	cmazpxthm0002qu3ttqezlwor	ff5f90f7-9cf7-487a-a839-a119698dd932	cb13aca6-8bfd-4b8e-8a9c-f2b4e097b531	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:23:26.439	2025-05-27 21:23:26.439	\N	f
4555482f-38e7-4a69-a3c4-cdf346620801	cmazpxtfz0000qu3tgg4qi5ex	ff5f90f7-9cf7-487a-a839-a119698dd932	7b3ac950-4505-41d7-8288-be15c01b9b51	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:23:27.533	2025-05-27 21:23:27.534	\N	f
c21e4fb5-c24f-4d8f-a2b0-1c50115db1fc	cmazpxthm0002qu3ttqezlwor	3ea2d4f9-571d-48db-8919-2752c85b57c8	036dbec6-96f7-41c6-8307-36940f8c610f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:23:36.019	2025-05-27 21:23:36.02	\N	f
f4df3083-2f87-4732-854a-24a55ce9d33a	cmazpxtfz0000qu3tgg4qi5ex	3ea2d4f9-571d-48db-8919-2752c85b57c8	8602fe33-c521-46d9-9fb9-1fce2963e1a8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:23:41.31	2025-05-27 21:23:41.311	\N	f
28c065e8-df78-4243-a664-b7ab9038e8e7	cmazpxthm0002qu3ttqezlwor	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	929739ba-3b19-419a-a0b2-a080e27f14ca	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:27:47.815	2025-05-27 21:27:47.816	\N	f
f457e647-6da6-4a4d-b4a2-795ed08803f1	cmazpxtfz0000qu3tgg4qi5ex	65d6e242-98a5-42c1-8a1f-e76e5865bb4b	a9683caf-2061-4af5-b951-6d0d74f2a50d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:27:49.194	2025-05-27 21:27:49.195	\N	f
988e4df2-0ab0-4664-a9e4-3a79ee3d300f	cmazpxthm0002qu3ttqezlwor	12ac45a4-8e5e-482c-bd1c-ba87168f1098	b8a573e9-6587-4709-b3be-8c37acfd7a57	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:30:29.829	2025-05-27 21:30:29.83	\N	f
041a5cf2-d6e6-444a-9108-45dd703c5b65	cmazpxtfz0000qu3tgg4qi5ex	12ac45a4-8e5e-482c-bd1c-ba87168f1098	1aed24e5-85f3-4151-9d92-3fb741d5233a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:30:31.05	2025-05-27 21:30:31.05	\N	f
dd858970-b896-4840-a433-75af5c8eda23	cmazpxthm0002qu3ttqezlwor	eaef97a9-bc49-4e0c-9d43-79a026808263	ce59ddc9-94d1-489a-a066-6e3e7a05643d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:35:37.62	2025-05-27 21:35:37.621	\N	f
d66594a1-b5e0-4f9f-95b6-01d284963bff	cmazpxtfz0000qu3tgg4qi5ex	eaef97a9-bc49-4e0c-9d43-79a026808263	43daa3a8-edde-4f1b-8897-f8ad05a63310	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:35:39.212	2025-05-27 21:35:39.213	\N	f
f581f86a-270a-4340-a5e7-021585a6ce73	cmazpxthm0002qu3ttqezlwor	80afdbde-8ccd-4068-b552-a828341ebe67	6718e1d2-6a6c-45a6-b2ee-450d3ba01551	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:36:45.498	2025-05-27 21:36:45.499	\N	f
ecb74a84-a25e-442b-950a-b4f8a17515a2	cmazpxtfz0000qu3tgg4qi5ex	80afdbde-8ccd-4068-b552-a828341ebe67	6718e1d2-6a6c-45a6-b2ee-450d3ba01551	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:36:46.558	2025-05-27 21:36:46.559	\N	f
08107753-a5a3-4e56-825f-8b1f3cccace1	cmazpxthm0002qu3ttqezlwor	44beeb67-10c4-4088-8c01-03f44cbae9f9	f7d0a829-1c6a-417e-9ca8-3abcb570297c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:43:32.302	2025-05-27 21:43:32.303	\N	f
f083c687-8e58-4348-bfd7-b1b535390c71	cmazpxtfz0000qu3tgg4qi5ex	44beeb67-10c4-4088-8c01-03f44cbae9f9	f5893781-bfa9-4dde-8de3-ca50edec52ac	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:43:33.723	2025-05-27 21:43:33.724	\N	f
f6d23611-9042-434c-a491-acc75bb237ed	cmazpxthm0002qu3ttqezlwor	30800c33-f9aa-4712-9986-2b253c36b188	63a73a0d-5095-453d-9197-0d0f59434453	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:43:43.884	2025-05-27 21:43:43.885	\N	f
970764b5-0060-43fa-b127-d3798023eb72	cmazpxtfz0000qu3tgg4qi5ex	30800c33-f9aa-4712-9986-2b253c36b188	c8d7d6ed-4b4b-4953-bc82-34085f1bd7e7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:43:45.665	2025-05-27 21:43:45.666	\N	f
c8c9fe98-a3da-4994-aa2b-4d37b32af308	cmazpxthm0002qu3ttqezlwor	402c7b8e-ff3b-4655-b542-2618c25e11b1	9f573f99-c4e3-445b-9e15-d04460404db1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:43:52.478	2025-05-27 21:43:52.479	\N	f
0ffbea31-62c4-4d9b-b2f4-4760a54c14a7	cmazpxtfz0000qu3tgg4qi5ex	402c7b8e-ff3b-4655-b542-2618c25e11b1	9f573f99-c4e3-445b-9e15-d04460404db1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:43:53.82	2025-05-27 21:43:53.821	\N	f
e9900cce-f823-4838-8790-847a2e0895d6	cmazpxthm0002qu3ttqezlwor	d64d2979-98ba-48a7-8534-c60877e5b965	7c41110c-5cb5-4342-9d51-699d01c14765	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:44:00.001	2025-05-27 21:44:00.002	\N	f
8b855f7d-9edf-41d5-8631-e3df4fbee58a	cmazpxtfz0000qu3tgg4qi5ex	d64d2979-98ba-48a7-8534-c60877e5b965	be42978b-bb72-4d57-9a17-151ebd7576be	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:44:01.758	2025-05-27 21:44:01.759	\N	f
488eccff-a563-4123-b663-4bb9d09b6f83	cmazpxthm0002qu3ttqezlwor	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	dc0ed768-aa04-4b07-888c-74048846c54f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:49:31.998	2025-05-27 21:49:31.999	\N	f
05810774-bb13-4f0c-a46a-81d705543290	cmazpxtfz0000qu3tgg4qi5ex	3a6ef475-6eca-4a0e-a558-4c7e0363d53c	dc0ed768-aa04-4b07-888c-74048846c54f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:49:32.987	2025-05-27 21:49:32.988	\N	f
92d51d73-37f9-4c82-a6e2-faa0f22fea5b	cmazpxthm0002qu3ttqezlwor	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	481f68ed-cbd1-4bc0-8792-210c74c1646e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:49:58.687	2025-05-27 21:49:58.688	\N	f
6d8ee8f5-3c8e-4572-a410-08675ddd9c6b	cmazpxtfz0000qu3tgg4qi5ex	5dfc4e8e-d75a-4db3-8479-9b0c41046f27	481f68ed-cbd1-4bc0-8792-210c74c1646e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:50:00.191	2025-05-27 21:50:00.192	\N	f
5a4d167c-300b-4455-9f16-eed36c114880	cmazpxtfz0000qu3tgg4qi5ex	253308cc-ade3-4258-8f08-6d62a08d86de	7a6ada4a-ba6a-49e0-9d22-25f0ce7d73cb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:50:22.127	2025-05-27 21:50:22.128	\N	f
6bfd8235-4907-4437-b6b6-1406d27374f6	cmazpxthm0002qu3ttqezlwor	253308cc-ade3-4258-8f08-6d62a08d86de	7a6ada4a-ba6a-49e0-9d22-25f0ce7d73cb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:50:23.413	2025-05-27 21:50:23.414	\N	f
1564f7a0-0697-4a84-aca0-ab3ff797d546	cmazpxtfz0000qu3tgg4qi5ex	a6139b80-36a4-4775-9da5-c06466f1e361	f87948ff-0be5-4e7c-a735-c776d30c8050	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:50:29.827	2025-05-27 21:50:29.829	\N	f
7f048ffb-9147-4a41-a307-0539dc56c6e0	cmazpxthm0002qu3ttqezlwor	a6139b80-36a4-4775-9da5-c06466f1e361	f03937a3-25b1-4d14-8f34-78a5083956c1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:50:31.309	2025-05-27 21:50:31.31	\N	f
f5f289e3-efed-4298-a731-ce791fe6a521	cmazpxthm0002qu3ttqezlwor	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	11f61be0-e1b0-4dbe-a857-be945975e5e9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:50:37.882	2025-05-27 21:50:37.883	\N	f
ff1faa94-e890-4de2-9737-172144fc3b0c	cmazpxtfz0000qu3tgg4qi5ex	96d029af-3e8e-4dc3-aa24-2ab49e6efc66	11f61be0-e1b0-4dbe-a857-be945975e5e9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:50:39.775	2025-05-27 21:50:39.776	\N	f
362e9fd0-32e1-4b2b-a97d-09fce8bc0fee	cmazpxtfz0000qu3tgg4qi5ex	f6cb71fd-f034-4b41-a3f3-2f558010179d	0f6906a7-2c9f-403f-bce5-4de18960087a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:58:15.455	2025-05-27 21:58:15.456	\N	f
06deb7f2-e1ae-43d6-8cde-0ee43699336b	cmazpxthm0002qu3ttqezlwor	f6cb71fd-f034-4b41-a3f3-2f558010179d	0f6906a7-2c9f-403f-bce5-4de18960087a	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:58:15.456	2025-05-27 21:58:15.457	\N	f
95310b18-f212-420d-81e3-413f1bd6ac11	cmazpxthm0002qu3ttqezlwor	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	3aa2cfe5-e17a-4ae4-8737-11fd683ca493	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:58:46.594	2025-05-27 21:58:46.595	\N	f
19244c3e-a6e0-4f54-b603-50ba560e7e17	cmazpxtfz0000qu3tgg4qi5ex	c497cb6d-c64c-47bc-bccf-4c7c8457a92d	5679a9ba-6dbb-4ace-8c61-69776d5b20d9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:58:47.764	2025-05-27 21:58:47.765	\N	f
c3aa4835-1030-49b2-999b-0308b99f2742	cmazpxthm0002qu3ttqezlwor	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	17811297-2e6a-4e64-ae46-2e34003f1d01	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:58:56.585	2025-05-27 21:58:56.586	\N	f
72dfc263-fa3a-4e84-95a3-e2406de4e48e	cmazpxtfz0000qu3tgg4qi5ex	aaf78bd0-2cb9-4fa7-9e99-b66d0f5d4b88	43f28488-c90e-4fbb-858f-8bdc8694a992	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 21:58:59.521	2025-05-27 21:58:59.522	\N	f
7f17c5bc-a61d-4e66-8c78-95fad92a4eee	cmazpxtfz0000qu3tgg4qi5ex	2e982a82-e9c1-497a-860a-fea6816c7220	57641d6d-9d12-4355-bc35-fe421f00b6ce	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:05.254	2025-05-27 22:14:05.255	\N	f
42fcd7f2-150a-496a-b3cf-882469db8c8f	cmazpxthm0002qu3ttqezlwor	2e982a82-e9c1-497a-860a-fea6816c7220	021f4dd1-8770-49b6-bc56-873b16acad90	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:05.258	2025-05-27 22:14:05.258	\N	f
187e59e6-3d7b-430f-8f4e-98420418449e	cmazpxthm0002qu3ttqezlwor	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	67cf2871-352f-45d1-829d-5585c49699f8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:10.335	2025-05-27 22:14:10.336	\N	f
33d6f96a-341b-461e-bedb-a0f9ed985630	cmazpxtfz0000qu3tgg4qi5ex	8ec636c7-f13f-4893-aef4-d4a2ca77e2d3	bae1921a-cb26-4b25-bbb8-e78c7439f4ce	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:11.333	2025-05-27 22:14:11.334	\N	f
fc79fa54-af55-4666-acf9-571e042a6030	cmazpxthm0002qu3ttqezlwor	ad615693-356c-41ca-874d-deb2e2536afc	d7cc6983-fcc2-4e5c-a62b-1c27199b8c9d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:15.792	2025-05-27 22:14:15.793	\N	f
a8cb584d-193b-4443-bae8-93891c653a11	cmazpxtfz0000qu3tgg4qi5ex	ad615693-356c-41ca-874d-deb2e2536afc	d7cc6983-fcc2-4e5c-a62b-1c27199b8c9d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:16.828	2025-05-27 22:14:16.829	\N	f
83a7f16b-c859-41e7-8ca7-66309d324735	cmazpxthm0002qu3ttqezlwor	3781e005-35d0-4802-8a02-b5b93a26be7d	f43cddb2-c2ac-4a22-ab9e-acaccc4e3bb5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:20.703	2025-05-27 22:14:20.704	\N	f
e73070d3-d509-406a-9f51-b832b0fa9cec	cmazpxtfz0000qu3tgg4qi5ex	3781e005-35d0-4802-8a02-b5b93a26be7d	69c6a178-4d82-4afb-a902-3dd7fafb3cfb	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:22.212	2025-05-27 22:14:22.213	\N	f
fb60a83e-a613-4d83-9153-d2453139ac5a	cmazpxthm0002qu3ttqezlwor	2a0953da-fdd5-46ff-9b38-b30d95b1c447	ac1f89dd-b45a-49e0-a961-ae2f85849b8b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:28.61	2025-05-27 22:14:28.611	\N	f
4dcacc6f-d302-4f1d-b916-e876117f08d8	cmazpxtfz0000qu3tgg4qi5ex	2a0953da-fdd5-46ff-9b38-b30d95b1c447	ac1f89dd-b45a-49e0-a961-ae2f85849b8b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:14:29.802	2025-05-27 22:14:29.803	\N	f
53951e11-4c87-49a4-b83f-9a55317635ef	cmazpxthm0002qu3ttqezlwor	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	98fca344-6512-4e2d-b7ec-589c4148b653	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:15:44.6	2025-05-27 22:15:44.601	\N	f
bf8d925a-5083-4c7b-abac-d8575cb612ce	cmazpxtfz0000qu3tgg4qi5ex	54dd30f5-46d2-4b4e-b9b5-e2cc34428d0c	98fca344-6512-4e2d-b7ec-589c4148b653	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:15:45.73	2025-05-27 22:15:45.731	\N	f
0e13ae89-d493-4bf4-b192-9f58eaf45192	cmazpxthm0002qu3ttqezlwor	0ba30bd5-f31b-491b-85df-5f32444ff9d6	acc1097d-3b6f-4056-8d96-0ef35967f0fe	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:20:33.414	2025-05-27 22:20:33.415	\N	f
eadca202-5242-455c-8818-8ef1e2c995ce	cmazpxtfz0000qu3tgg4qi5ex	0ba30bd5-f31b-491b-85df-5f32444ff9d6	acc1097d-3b6f-4056-8d96-0ef35967f0fe	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:20:34.646	2025-05-27 22:20:34.646	\N	f
7a76f9b2-8050-49eb-9ace-bdc6f66ed3fd	cmazpxthm0002qu3ttqezlwor	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	d83e1269-2d1f-48ac-bb2c-22fc6b41c4a9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:20:37.987	2025-05-27 22:20:37.988	\N	f
31ff2ae9-b352-4f05-abc5-25e1143c40c1	cmazpxtfz0000qu3tgg4qi5ex	7ffd4e0b-6b7b-4b19-91fa-1e2c08d3c8aa	d83e1269-2d1f-48ac-bb2c-22fc6b41c4a9	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:20:39.17	2025-05-27 22:20:39.171	\N	f
e26067f2-9ad6-4d96-ac67-bb01ef08256e	cmazpxthm0002qu3ttqezlwor	0448146e-fac5-4cef-b010-37e819542b89	b39e796f-b410-4a24-a5bc-a2797e23dc8c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:20:43.388	2025-05-27 22:20:43.389	\N	f
79df0625-da66-4c9b-9426-1c9e6aaffaef	cmazpxtfz0000qu3tgg4qi5ex	0448146e-fac5-4cef-b010-37e819542b89	b39e796f-b410-4a24-a5bc-a2797e23dc8c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:20:44.62	2025-05-27 22:20:44.621	\N	f
d19341d3-19ee-4295-9509-3d933e866851	cmazpxthm0002qu3ttqezlwor	055c41e3-8b89-49ed-830f-b953f8d8f3f7	729cd060-ba72-4d35-b316-d99dd0aacf2c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:25:33.19	2025-05-27 22:25:33.191	\N	f
8220e365-24a6-4830-8f8f-edb7691e6564	cmazpxtfz0000qu3tgg4qi5ex	055c41e3-8b89-49ed-830f-b953f8d8f3f7	729cd060-ba72-4d35-b316-d99dd0aacf2c	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:25:35.044	2025-05-27 22:25:35.045	\N	f
cfe5084a-5751-4a69-bea0-4111c60a5c17	cmazpxthm0002qu3ttqezlwor	69aa774b-9a1d-4cbe-a08e-56b36129ed62	473917a6-e973-48d5-b109-2a17526a5252	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:47:07.485	2025-05-27 22:47:07.486	\N	f
745aca06-f7ed-4b0e-9f1c-f88498900b94	cmazpxtfz0000qu3tgg4qi5ex	69aa774b-9a1d-4cbe-a08e-56b36129ed62	ae3eb167-5f64-46d8-96ec-49c648ad06c2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:47:08.899	2025-05-27 22:47:08.9	\N	f
f265eee0-44d0-4c43-91fa-7b3dfa7e87ca	cmazpxthm0002qu3ttqezlwor	9d2245bc-d4c8-4e61-959f-d28105a788d9	3d4d3bf2-ba57-491c-9b7a-9565e51529cf	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:47:27.809	2025-05-27 22:47:27.81	\N	f
e416345b-c9ae-4cd2-98b0-35fbe3ab8bba	cmazpxtfz0000qu3tgg4qi5ex	9d2245bc-d4c8-4e61-959f-d28105a788d9	3d4d3bf2-ba57-491c-9b7a-9565e51529cf	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:47:29.19	2025-05-27 22:47:29.191	\N	f
c2fc3c92-46e8-430d-93ee-6b33b42b9981	cmazpxthm0002qu3ttqezlwor	cab31e27-336c-46d8-b1cb-e742d273ebe6	33b39235-46a7-48c5-b0fc-111742afed65	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:47:34.022	2025-05-27 22:47:34.023	\N	f
f645c111-c06a-4adc-a283-016f418d4216	cmazpxtfz0000qu3tgg4qi5ex	cab31e27-336c-46d8-b1cb-e742d273ebe6	33b39235-46a7-48c5-b0fc-111742afed65	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:47:35.244	2025-05-27 22:47:35.245	\N	f
46f2e75b-341f-4c85-a353-13f0e5d5daa9	cmazpxthm0002qu3ttqezlwor	6a46bc77-4db4-44f7-908f-278c19ce5395	6028722a-08f9-4acb-9298-7e1f1e7c04f8	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:47:49.962	2025-05-27 22:47:49.962	\N	f
ab2f421e-d68e-4d85-b600-faeb1c86f555	cmazpxtfz0000qu3tgg4qi5ex	6a46bc77-4db4-44f7-908f-278c19ce5395	28ae7621-ff38-4c10-b535-b0ae61cf5cfa	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:47:53.216	2025-05-27 22:47:53.216	\N	f
cb347807-6af0-4a91-9ece-a5fa759cb7a4	cmazpxthm0002qu3ttqezlwor	5b282628-fa35-43c5-b5ee-a294b6ed8226	b826fc7a-d1f6-444d-8673-4f28fa9a0a7b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:50:54.617	2025-05-27 22:50:54.618	\N	f
296f202f-0a0e-4562-ba57-cf0a44b9ba35	cmazpxtfz0000qu3tgg4qi5ex	161af0e2-4004-45de-a0b1-2e13243e2621	7372a5e1-3fb0-4976-bd8b-28bb8cf44063	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:51:09.378	2025-05-27 22:51:09.379	\N	f
eed8516a-b19f-40f7-99fb-5670065017c1	cmazpxthm0002qu3ttqezlwor	161af0e2-4004-45de-a0b1-2e13243e2621	657339ab-0d5a-4802-b7c6-93f0e9faecc7	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:51:10.898	2025-05-27 22:51:10.899	\N	f
148bb5aa-d030-494a-8f4f-6b9e42af8ec1	cmazpxthm0002qu3ttqezlwor	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	356a5dbf-0f73-4e06-b4df-fc7be582dada	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:51:56.734	2025-05-27 22:51:56.735	\N	f
2f1c5d3e-396a-4591-99dd-a58b3be1b456	cmazpxtfz0000qu3tgg4qi5ex	cf3e00f0-1d78-4fa1-8d86-2d1d46c36e9f	95bde3fb-ef3b-485e-ae3d-19da9e7cd903	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:51:58.164	2025-05-27 22:51:58.165	\N	f
dde4cfb5-937e-405b-a873-754efa7da02b	cmazpxthm0002qu3ttqezlwor	c1242167-5aae-435c-9196-58298b3d9261	c6899afe-6703-44ec-9fd1-54b5abe6d886	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:55:50.38	2025-05-27 22:55:50.381	\N	f
d2fb996c-5bf5-44b7-8d57-027d73751d45	cmazpxtfz0000qu3tgg4qi5ex	c1242167-5aae-435c-9196-58298b3d9261	6472e829-b814-4808-aa4b-731bd49c586e	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:55:51.857	2025-05-27 22:55:51.858	\N	f
9a0799d2-2862-4102-9fb3-e0a15c965725	cmazpxthm0002qu3ttqezlwor	df8e7cea-6a2f-4509-9604-83726c84d7e2	4e8907b3-f1c9-4019-9cf1-11d0ef0f0cf0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:56:12.776	2025-05-27 22:56:12.776	\N	f
e8da0146-34e1-4ba7-899f-3683c71ecf24	cmazpxtfz0000qu3tgg4qi5ex	df8e7cea-6a2f-4509-9604-83726c84d7e2	4e8907b3-f1c9-4019-9cf1-11d0ef0f0cf0	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:56:13.761	2025-05-27 22:56:13.762	\N	f
c9d30aef-7374-4cb2-99e5-7584792ed75a	cmazpxthm0002qu3ttqezlwor	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	2a5029ae-b3cd-41fb-ad36-824ed979c3af	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:56:17.91	2025-05-27 22:56:17.911	\N	f
25d224a9-e15d-4302-b465-de8959b0ff24	cmazpxtfz0000qu3tgg4qi5ex	2b2af6c9-0174-4643-bc23-6b43a1ac3acf	2a5029ae-b3cd-41fb-ad36-824ed979c3af	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:56:19.141	2025-05-27 22:56:19.142	\N	f
d78f05cf-1b8b-4192-a0bc-a06c7a8c312d	cmazpxthm0002qu3ttqezlwor	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	4f8c90c0-ca83-499e-8a2b-9a8d643859d3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:56:25.705	2025-05-27 22:56:25.706	\N	f
b25d646d-c1d2-49a9-9c52-30ad02ad67f6	cmazpxtfz0000qu3tgg4qi5ex	2ffa71a0-f4ae-4dc8-a3ab-aec4d2c5c020	8bd6c07f-c077-44dc-b2f5-11c63276b783	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 22:56:28.056	2025-05-27 22:56:28.057	\N	f
b049ed90-9d57-4390-836a-f6abababf365	cmazpxthm0002qu3ttqezlwor	751ebb83-a155-443e-9d95-eaadf6183b57	5af293ee-9e91-4b07-82fb-000f2734fd40	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 23:01:31.213	2025-05-27 23:01:31.214	\N	f
ffea5e33-4923-4741-9b46-94fef495705c	cmazpxtfz0000qu3tgg4qi5ex	751ebb83-a155-443e-9d95-eaadf6183b57	8b3ad55c-30cd-4c41-ae02-2f142722ee74	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-27 23:01:31.23	2025-05-27 23:01:31.231	\N	f
1b413481-3340-45af-a5b1-1272d8eb1588	cmazpxthm0002qu3ttqezlwor	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	2ff23e12-43f6-4484-81eb-f871eac221e2	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 06:37:39.286	2025-05-28 06:37:39.288	\N	f
52b184b4-41f4-4a60-bff9-d7caaae0be7b	cmazpxtfz0000qu3tgg4qi5ex	382d34f9-7bc6-4ded-87a2-8bff30f0cb0b	22657b26-dd5a-4c16-aebc-8cc3d0270a0d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 06:37:45.168	2025-05-28 06:37:45.169	\N	f
bb608a78-a9d1-46fa-a2c5-9a7fb050bb6e	cmazpxthm0002qu3ttqezlwor	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	80a1e365-477e-43a3-a3b7-9f4d08633bb3	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 11:38:10.422	2025-05-28 11:38:10.423	\N	f
dcbca6b5-3690-45f1-ba22-ec7449a5b0d3	cmazpxtfz0000qu3tgg4qi5ex	f54fe9b6-04d6-4a0c-9f24-6bcf22d8d688	5eed0231-551b-4707-b41a-5e8af061bf85	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 11:38:12.461	2025-05-28 11:38:12.462	\N	f
8f167ec0-5460-484b-a2c8-e2e16cddaacd	cmazpxthm0002qu3ttqezlwor	cb526383-921f-4360-bbca-c73e8b3e3033	9e1ef5c8-8dc6-4ccc-b762-dad7100400ab	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 12:38:18.896	2025-05-28 12:38:18.898	\N	f
9e4d9051-15c1-43c0-b071-fe4f2a73efa3	cmazpxtfz0000qu3tgg4qi5ex	cb526383-921f-4360-bbca-c73e8b3e3033	e40c222b-70d1-4ae1-a19c-3b35c67ca767	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 12:38:22.173	2025-05-28 12:38:22.174	\N	f
b0407c4a-841c-4a33-8ba1-2adaeceb4030	cmazpxthm0002qu3ttqezlwor	c7402c75-4217-4ec9-8306-fdb7c7e9523a	d036905f-473a-4c43-a3be-256ba182be4b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 12:38:30.341	2025-05-28 12:38:30.342	\N	f
49adb8c6-f045-4f17-ad22-1d9f65892197	cmazpxtfz0000qu3tgg4qi5ex	c7402c75-4217-4ec9-8306-fdb7c7e9523a	d036905f-473a-4c43-a3be-256ba182be4b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 12:38:32.721	2025-05-28 12:38:32.722	\N	f
52d5bb2d-c248-46d4-9e7e-7a7e2ca08106	cmazpxthm0002qu3ttqezlwor	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	0d07d998-bbc0-4309-88c0-a32606ea4095	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 21:17:56.827	2025-05-28 21:17:56.829	\N	f
4b1dda88-2c94-4d65-b3ca-7af2a5663805	cmazpxtfz0000qu3tgg4qi5ex	e02bb639-fb42-4ea3-af02-5cc845b7c2b1	3eaa61f3-466d-4124-9810-110fb91b6c5d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 21:17:58.827	2025-05-28 21:17:58.828	\N	f
e63bb19b-184f-4eb0-b4e1-9de5f8d01ec1	cmazpxthm0002qu3ttqezlwor	0b200580-eb6a-43d5-b59e-bf5d75bace7e	1c344ec4-cda3-4fde-9dc0-f06b8b3f07af	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-05-28 21:50:35.023	2025-05-28 21:50:35.026	\N	f
803ccc25-4503-412b-84dd-3674ef4da39c	cmazpxtfz0000qu3tgg4qi5ex	edac60c8-d2f2-497d-8d82-c46f1368fe83	28a3ef17-8efa-4502-9d0d-0914a56fedad	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 13:59:44.934	2025-06-02 13:59:44.935	\N	f
b96f0ce4-8983-4853-adce-800e810412ec	cmazpxthm0002qu3ttqezlwor	edac60c8-d2f2-497d-8d82-c46f1368fe83	28cab9c6-d501-4bff-b20b-af31ac532817	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 13:59:45.999	2025-06-02 13:59:46	\N	f
7d5fc3cc-bb46-4a96-ae7c-9f36d3224b5a	cmazpxthm0002qu3ttqezlwor	f36c221b-eed4-4623-a91f-7f72a446e781	6ac32cbb-74d3-4808-b558-44d1bff6ca6d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 13:59:52.008	2025-06-02 13:59:52.009	\N	f
affdc4b9-564f-4955-9001-2fe85124f2f9	cmazpxtfz0000qu3tgg4qi5ex	f36c221b-eed4-4623-a91f-7f72a446e781	bfdb1780-8196-48b5-8185-dec64af1c04f	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 13:59:53.732	2025-06-02 13:59:53.734	\N	f
6d1a9b16-02c3-40d9-a088-f24785a3eee7	cmazpxtfz0000qu3tgg4qi5ex	8ca16545-dd00-48d8-bf87-aaf093851072	d3353106-21d4-4339-9810-a300ecec6178	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:14.207	2025-06-02 18:48:14.208	\N	f
8e6092c9-1f02-46ab-89d3-c93d4b267ad2	cmazpxthm0002qu3ttqezlwor	8ca16545-dd00-48d8-bf87-aaf093851072	d3353106-21d4-4339-9810-a300ecec6178	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:15.441	2025-06-02 18:48:15.442	\N	f
adbb371b-2d30-4792-bc11-78bed7ccb4a4	cmazpxtfz0000qu3tgg4qi5ex	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	0b461e77-f88c-4f87-8e99-bd1850799657	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:23.137	2025-06-02 18:48:23.138	\N	f
c381a5ea-41c5-4860-af43-673156f25901	cmazpxthm0002qu3ttqezlwor	b00e617d-8e60-4838-8e9e-ce59b9fccbbf	f8579449-a1a1-40b7-b6f8-f13d3a9fe8c5	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:23.744	2025-06-02 18:48:23.745	\N	f
dafb17b8-848a-4b3d-b397-c372a8f6d112	cmazpxtfz0000qu3tgg4qi5ex	fa0b0c21-ae00-4032-98bd-f6728058c639	a90ee141-7008-4d35-97de-7a2f777e3bd1	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:33.327	2025-06-02 18:48:33.327	\N	f
e38c1a80-d2a7-4f88-88fe-bad66a28b6a7	cmazpxthm0002qu3ttqezlwor	fa0b0c21-ae00-4032-98bd-f6728058c639	deb5cb29-6810-4d3b-9f8c-32b297034f5d	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:34.278	2025-06-02 18:48:34.279	\N	f
8ee5c2a2-f7f1-4f3b-ad26-d17a9e6f8752	cmazpxthm0002qu3ttqezlwor	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	b1557281-f3b9-41db-817a-222783af7b45	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:36.677	2025-06-02 18:48:36.678	\N	f
fdae77b0-0bdf-45ad-8b3e-c88c20df0f07	cmazpxtfz0000qu3tgg4qi5ex	90e31429-f7e6-42d3-bc19-c5958e9b4d2a	b1557281-f3b9-41db-817a-222783af7b45	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:38.677	2025-06-02 18:48:38.678	\N	f
037c26e2-9a57-49fa-948a-59daa2569fbe	cmazpxthm0002qu3ttqezlwor	50c91d35-debe-4573-aa62-3a09634787db	287f883c-ebc8-4c7b-b345-08d4ecbe896b	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:45.832	2025-06-02 18:48:45.833	\N	f
73e3f688-ac55-4ce5-9fd3-10251e90b1f4	cmazpxtfz0000qu3tgg4qi5ex	50c91d35-debe-4573-aa62-3a09634787db	c5f7de83-55d0-4626-bd55-4d591542e594	5c09ba6f-a071-4ad2-b9a8-b79be2d1b5b8	2025-06-02 18:48:47.283	2025-06-02 18:48:47.284	\N	f
\.


--
-- Data for Name: UserAttribute; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."UserAttribute" (id, "createdAt", "updatedAt", "userId", key, value, "levelRevealed") FROM stdin;
cmbewb3s1000enz5tvm5dmy1p	2025-06-02 09:36:48.071	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	ORIENTATION	Hétérosexuel	12
cmbewb3ra0001nz5tavhbskbi	2025-06-02 09:36:48.07	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	CITY	Paris	3
cmbewb3s2000knz5tkat8cdon	2025-06-02 09:36:48.071	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	PASSIONS	Guitare||Van Life||Lecture	5
cmbewb3s2000lnz5tun3vn6gy	2025-06-02 09:36:48.071	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	FLAW	Flemme	11
cmbewb3s1000fnz5t8uqgxch8	2025-06-02 09:36:48.071	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	BIO	J'aime apprendre et partager.	13
cmbewb3s00009nz5tipy8mna5	2025-06-02 09:36:48.071	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	GENDER	Non-Binaire	4
cmbewb3s1000dnz5tvvb5omd7	2025-06-02 09:36:48.071	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	QUALITY	Empathie	6
cmbewb3rw0005nz5tkfi4uvad	2025-06-02 09:36:48.071	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	ORIGIN	Française	7
cmbewb3rz0007nz5txl27nftd	2025-06-02 09:36:48.071	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	JOB	Chercheuse	10
cmbewb3rn0003nz5tppip4yba	2025-06-02 09:36:48.07	2025-06-02 16:01:29.603	cmazpxtfz0000qu3tgg4qi5ex	AGE	25-35	9
cmbfa692q002pnz1h70psh4kk	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	PASSIONS	Blurrp||Blouch||Truc	5
cmbfa692q002rnz1hdcpeirlu	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	ORIGIN	Gana	7
cmbfa692p002fnz1hfaf3bl9o	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	QUALITY		6
cmbfa692p002enz1h0m9fq13k	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	JOB	Truc	10
cmbfa692p002lnz1hg2emjbz3	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	AGE	25-35	9
cmbfa692p002jnz1h0rbw5esr	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	GENDER	Femme	4
cmbfa692q002onz1hyw6z4crq	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	BIO	Je suis un bot	13
cmbfa692p002bnz1hgwt59pyw	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	FLAW		11
cmbfa692p002inz1hhjnsf6pt	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	ORIENTATION		12
cmbfa692p0029nz1hq2kryib6	2025-06-02 16:04:56.305	2025-06-02 18:48:04.835	cmazpxthm0002qu3ttqezlwor	CITY		3
\.


--
-- Data for Name: UserContact; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."UserContact" ("userId", "contactId", "createdAt") FROM stdin;
cmazpxthm0002qu3ttqezlwor	cmazpxtfz0000qu3tgg4qi5ex	2025-05-22 21:18:08.392
cmazpxtfz0000qu3tgg4qi5ex	cmazpxthm0002qu3ttqezlwor	2025-05-22 21:18:08.404
\.


--
-- Data for Name: UserQuestionPreference; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."UserQuestionPreference" ("userId", "categoryId", "updatedAt", "userSettingsId", "Opinion") FROM stdin;
\.


--
-- Data for Name: UserSettings; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public."UserSettings" (id, "userId", "acceptedLanguages", "isAvailableForChat", "allowInvitationsFromStrangers", "Applanguage") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: jootser1
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8a17086c-71fd-4c03-9fdf-988922aa8a1c	2c61052826f691a7feb568e4077bfb0aefe1917afcc08a2952b6128db28c9afc	2025-05-22 18:41:55.021869+00	20250218231944_init	\N	\N	2025-05-22 18:41:55.00088+00	1
4427ae64-d729-4bd3-821d-a16fc687b55e	ed7631c2b8e0a4e8fe8dc070b56e5f2bf0fac3273508bd2d5ae00e9f2c55efb3	2025-05-22 18:41:55.176521+00	20250430123319_add_icebreaker_status	\N	\N	2025-05-22 18:41:55.172886+00	1
d9ff589e-7f4d-4653-9542-66d903ab0f45	cb00291cf579eb3a423916c9c38dd24ef9b9ee15f4ac5c5673c253b89bfd0e6a	2025-05-22 18:41:55.031411+00	20250225111334_init_users	\N	\N	2025-05-22 18:41:55.023564+00	1
d799a8da-b0e3-4c05-ae55-294bad2e9197	17561a25e4fac701e4b8ec05156c7530b26d9fae8093c8a48178f5cd2ffc3e5a	2025-05-22 18:41:55.04884+00	20250228170631_add_user_number	\N	\N	2025-05-22 18:41:55.033183+00	1
6fc72985-7360-4210-818f-1d86bded43b3	5900e7b4a4bd61abb822e8caa9578ebc2e88afe1fa0d69911b6d96a394473576	2025-05-22 18:41:55.246932+00	20250514204746_make_sender_optional	\N	\N	2025-05-22 18:41:55.242711+00	1
66771432-98d3-4df6-bed3-d9f25d7f386d	9c262a31b930e628b2f31b2bc1f584d3011f7da939cd395eacff1ee98c5af75e	2025-05-22 18:41:55.053585+00	20250228172334_add_is_online	\N	\N	2025-05-22 18:41:55.050077+00	1
aac8c785-9950-49ef-b5a9-f7b74251cedf	93b80832ccffd2ee7205f47fcf7445a0c382caab874852f1eff438f6e90c986f	2025-05-22 18:41:55.180799+00	20250430123458_add_icebreaker_statut_defaultupdatedat	\N	\N	2025-05-22 18:41:55.177532+00	1
009b32a2-d4d7-4a50-95ad-f55da2358374	1527e28ca6984eb4164a536b0298dbb1a295e558cb4ddfc86bc436e7367d8696	2025-05-22 18:41:55.058524+00	20250320092419_add_avatar	\N	\N	2025-05-22 18:41:55.054668+00	1
538047be-31e3-4e61-a2b6-96d6944dd739	9307a3eef82a68a297ded4def257c0b83a91c822b57fc4aedb3195638af539d8	2025-05-22 18:41:55.07209+00	20250325104909_separate_auth_and_add_chat_preference	\N	\N	2025-05-22 18:41:55.059763+00	1
6a851caf-47e6-4578-848b-3d88d251fa35	817fb2d72e393a6d7092ee4e42bf144f0ccaf08ec15a4a147f44514ee67159d6	2025-05-22 18:41:55.089727+00	20250331221156_update_conversation_structure	\N	\N	2025-05-22 18:41:55.073509+00	1
c4440992-5d84-4aba-ae77-ffd16aff00fd	b445fce37681a88395d5d846b3c2a7d543502ff588c62ab1e0dcd47fd646217b	2025-05-22 18:41:55.193022+00	20250502093425_add_user_preferences_relations	\N	\N	2025-05-22 18:41:55.182081+00	1
7998d026-8d5e-4bc5-b7b2-4b9502806221	a6e04d7c1d0c9c051c8cd89f221fa55e09764642132c7afb7a723db5f797aa1d	2025-05-22 18:41:55.094771+00	20250401144141_remove_redundant_conversation_fields	\N	\N	2025-05-22 18:41:55.09098+00	1
118382d5-8f8f-4cda-9d31-6f55c471a7c3	7ef0eeae12843853736a8e6d88e493ea4a0319ca8320be94cae14935b9abf216	2025-05-22 18:41:55.107755+00	20250403095649_update_conversation_to_participants	\N	\N	2025-05-22 18:41:55.095819+00	1
9313baf6-af43-4029-a088-d71e4bdc7f66	443fd48e4b55ca738a0f042195d0198baaba511dbf6aabe3d70a17651e164050	2025-05-28 22:37:24.923065+00	20250528223724_update_user_profile_and_settings2	\N	\N	2025-05-28 22:37:24.918132+00	1
423893b7-61ac-4219-870d-3b41d8625c44	a61d7318d9ab3a8e0f9b7abdf75965c6f0310c1432637fa4f01051aab830e9c1	2025-05-22 18:41:55.11292+00	20250403101902_add_message_edit_delete_fields	\N	\N	2025-05-22 18:41:55.108967+00	1
b6f4d2f6-4e9f-40a8-99c1-4d3ba7d536b8	7f57786c359b5cff25239a1284d6c7ea4d9d6ac75bc90eeb7831abc658afdf27	2025-05-22 18:41:55.209531+00	20250502100213_add_enriched_user_answer_model	\N	\N	2025-05-22 18:41:55.194203+00	1
7da950e9-92a1-4dd2-8ceb-47d1e96ee0a6	2a9b47c8db968541ec447b4865a120a7f9cf4ab72c0920f0b1080e896c90103f	2025-05-22 18:41:55.129436+00	20250404142132_add_user_contacts	\N	\N	2025-05-22 18:41:55.114112+00	1
37c372fe-9d55-4c4f-9e53-9dd1a6a6c63a	ef7ba329653b28947c0299f47b51580e0342c5d71db71af3abaeb302bbb4a433	2025-05-22 18:41:55.166364+00	20250418144810_init_question_schema	\N	\N	2025-05-22 18:41:55.130743+00	1
6e3395be-28c3-4e1a-8400-3b4ab6cf2b4d	36561ec3018721dae02e5f0ddf76fdef8507d71ccd416c1a31bf959cda43df57	2025-05-22 18:41:55.259361+00	20250521183814_level_config	\N	\N	2025-05-22 18:41:55.248168+00	1
eb3ff3da-f071-4a4e-9492-19253af0291d	3f355c150f9ee77e18573dd01984717fd055572974ac815c455b23abdd1ad93c	2025-05-22 18:41:55.171824+00	20250418154451_authorstring_to_user	\N	\N	2025-05-22 18:41:55.167535+00	1
0ff9096e-08e6-46ba-9b80-0148b677d761	9e1772a1042c83d5cba00dcb0fe52977cc9c977ee03c955f1e86dacb09314300	2025-05-22 18:41:55.218502+00	20250513132150_update_message_for_answerdisplay	\N	\N	2025-05-22 18:41:55.210547+00	1
9d3f613a-08df-48a7-8146-8bf04b8e2508	ceecb970e71ca61ac0a3f4e8f16a1faf2581bf9fcacfd1b33c208e70b01eb62e	2025-05-22 18:41:55.223872+00	20250513144309_add_role_to_user	\N	\N	2025-05-22 18:41:55.219571+00	1
c95d9af2-e7ed-4f4b-8dd0-65fae5b6f6a5	18c5446fa1e6d9f93d5e05fa0999fea6317899483b16f9665820b15703b4fc83	2025-05-22 18:41:55.228654+00	20250513155514_add_default_for_level_progresspoint	\N	\N	2025-05-22 18:41:55.225139+00	1
30d27097-f2d4-4425-8718-f41117b6c825	a63ac22733b7fa3bdbbf5b71051d72af431c09b5e0ba598082adccfc12ae1d15	2025-05-22 18:41:55.280257+00	20250522073923_add_user_attributes_and_cleaning	\N	\N	2025-05-22 18:41:55.26045+00	1
f8037a74-1274-4da4-92ab-0276da063068	544d48f8b9939416b2840827805826d3fec5957157cc194170b4d5d9d8ba3dda	2025-05-22 18:41:55.241494+00	20250513162221_uniform_locale_code	\N	\N	2025-05-22 18:41:55.22986+00	1
af3ce866-809c-4d32-9fe3-7e858e0a0c67	14f6564c71c31ff3f79df810970e4608ae301fbcfefb37f5ce579e3ff3a795c0	2025-05-22 18:41:55.285326+00	20250522083257_ajout_conversation_difficulty	\N	\N	2025-05-22 18:41:55.2814+00	1
62b69bc7-74ee-4dad-b7cd-2d9eaf1d0203	34b6d0e3cc45cd777b301295550ae1e54d12da443e2c32ea80e66f6c2c0fc51b	2025-05-28 22:39:14.78319+00	20250528223914_update_user_profile_and_settings3	\N	\N	2025-05-28 22:39:14.778603+00	1
80f67e38-c637-490a-a3f0-7f092acd7ef1	caad8ce5f35268ca9dcf8e17f747fa231e28d1a37c844d94954e84616f6b0d15	2025-05-28 22:25:37.549873+00	20250528222537_update_user_profile_and_settings	\N	\N	2025-05-28 22:25:37.524718+00	1
6f9e5595-87ba-4955-9065-615d4071f5d2	d365a436378034ff0d932a107f6199d80ee7242838c99d9537c9b937c4940571	2025-05-28 23:49:22.322209+00	20250528234924_update_user_profile_and_settings4	\N	\N	2025-05-28 23:49:22.299714+00	1
\.


--
-- Name: User_userNumber_seq; Type: SEQUENCE SET; Schema: public; Owner: jootser1
--

SELECT pg_catalog.setval('public."User_userNumber_seq"', 2, true);


--
-- Name: Auth Auth_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_pkey" PRIMARY KEY (id);


--
-- Name: CategoryTranslation CategoryTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."CategoryTranslation"
    ADD CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("categoryId", locale);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: ConversationParticipant ConversationParticipant_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."ConversationParticipant"
    ADD CONSTRAINT "ConversationParticipant_pkey" PRIMARY KEY ("conversationId", "userId");


--
-- Name: Conversation Conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: QuestionGroupCategory QuestionGroupCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."QuestionGroupCategory"
    ADD CONSTRAINT "QuestionGroupCategory_pkey" PRIMARY KEY ("questionGroupId", "categoryId");


--
-- Name: QuestionGroup QuestionGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."QuestionGroup"
    ADD CONSTRAINT "QuestionGroup_pkey" PRIMARY KEY (id);


--
-- Name: QuestionOption QuestionOption_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."QuestionOption"
    ADD CONSTRAINT "QuestionOption_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: UserAnswer UserAnswer_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserAnswer"
    ADD CONSTRAINT "UserAnswer_pkey" PRIMARY KEY (id);


--
-- Name: UserAttribute UserAttribute_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserAttribute"
    ADD CONSTRAINT "UserAttribute_pkey" PRIMARY KEY (id);


--
-- Name: UserContact UserContact_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserContact"
    ADD CONSTRAINT "UserContact_pkey" PRIMARY KEY ("userId", "contactId");


--
-- Name: UserQuestionPreference UserQuestionPreference_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserQuestionPreference"
    ADD CONSTRAINT "UserQuestionPreference_pkey" PRIMARY KEY ("userId", "categoryId");


--
-- Name: UserSettings UserSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserSettings"
    ADD CONSTRAINT "UserSettings_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Auth_email_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "Auth_email_key" ON public."Auth" USING btree (email);


--
-- Name: Auth_userId_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "Auth_userId_key" ON public."Auth" USING btree ("userId");


--
-- Name: ConversationParticipant_conversationId_userId_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "ConversationParticipant_conversationId_userId_key" ON public."ConversationParticipant" USING btree ("conversationId", "userId");


--
-- Name: Message_conversationId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "Message_conversationId_idx" ON public."Message" USING btree ("conversationId");


--
-- Name: Message_messageType_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "Message_messageType_idx" ON public."Message" USING btree ("messageType");


--
-- Name: Message_senderId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "Message_senderId_idx" ON public."Message" USING btree ("senderId");


--
-- Name: QuestionOption_groupId_locale_order_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "QuestionOption_groupId_locale_order_key" ON public."QuestionOption" USING btree ("groupId", locale, "order");


--
-- Name: Question_groupId_locale_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "Question_groupId_locale_key" ON public."Question" USING btree ("groupId", locale);


--
-- Name: UserAnswer_conversationId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "UserAnswer_conversationId_idx" ON public."UserAnswer" USING btree ("conversationId");


--
-- Name: UserAnswer_questionGroupId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "UserAnswer_questionGroupId_idx" ON public."UserAnswer" USING btree ("questionGroupId");


--
-- Name: UserAnswer_userId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "UserAnswer_userId_idx" ON public."UserAnswer" USING btree ("userId");


--
-- Name: UserAttribute_userId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "UserAttribute_userId_idx" ON public."UserAttribute" USING btree ("userId");


--
-- Name: UserAttribute_userId_key_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "UserAttribute_userId_key_key" ON public."UserAttribute" USING btree ("userId", key);


--
-- Name: UserContact_contactId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "UserContact_contactId_idx" ON public."UserContact" USING btree ("contactId");


--
-- Name: UserContact_userId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "UserContact_userId_idx" ON public."UserContact" USING btree ("userId");


--
-- Name: UserQuestionPreference_categoryId_idx; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE INDEX "UserQuestionPreference_categoryId_idx" ON public."UserQuestionPreference" USING btree ("categoryId");


--
-- Name: UserSettings_userId_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "UserSettings_userId_key" ON public."UserSettings" USING btree ("userId");


--
-- Name: User_userNumber_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "User_userNumber_key" ON public."User" USING btree ("userNumber");


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: jootser1
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Auth Auth_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CategoryTranslation CategoryTranslation_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."CategoryTranslation"
    ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ConversationParticipant ConversationParticipant_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."ConversationParticipant"
    ADD CONSTRAINT "ConversationParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ConversationParticipant ConversationParticipant_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."ConversationParticipant"
    ADD CONSTRAINT "ConversationParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: QuestionGroupCategory QuestionGroupCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."QuestionGroupCategory"
    ADD CONSTRAINT "QuestionGroupCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: QuestionGroupCategory QuestionGroupCategory_questionGroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."QuestionGroupCategory"
    ADD CONSTRAINT "QuestionGroupCategory_questionGroupId_fkey" FOREIGN KEY ("questionGroupId") REFERENCES public."QuestionGroup"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: QuestionGroup QuestionGroup_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."QuestionGroup"
    ADD CONSTRAINT "QuestionGroup_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: QuestionOption QuestionOption_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."QuestionOption"
    ADD CONSTRAINT "QuestionOption_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."QuestionGroup"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Question Question_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."QuestionGroup"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserAnswer UserAnswer_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserAnswer"
    ADD CONSTRAINT "UserAnswer_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAnswer UserAnswer_questionGroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserAnswer"
    ADD CONSTRAINT "UserAnswer_questionGroupId_fkey" FOREIGN KEY ("questionGroupId") REFERENCES public."QuestionGroup"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAnswer UserAnswer_questionOptionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserAnswer"
    ADD CONSTRAINT "UserAnswer_questionOptionId_fkey" FOREIGN KEY ("questionOptionId") REFERENCES public."QuestionOption"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAnswer UserAnswer_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserAnswer"
    ADD CONSTRAINT "UserAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAttribute UserAttribute_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserAttribute"
    ADD CONSTRAINT "UserAttribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserContact UserContact_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserContact"
    ADD CONSTRAINT "UserContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserContact UserContact_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserContact"
    ADD CONSTRAINT "UserContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserQuestionPreference UserQuestionPreference_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserQuestionPreference"
    ADD CONSTRAINT "UserQuestionPreference_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserQuestionPreference UserQuestionPreference_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserQuestionPreference"
    ADD CONSTRAINT "UserQuestionPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserQuestionPreference UserQuestionPreference_userSettingsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserQuestionPreference"
    ADD CONSTRAINT "UserQuestionPreference_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES public."UserSettings"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserSettings UserSettings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jootser1
--

ALTER TABLE ONLY public."UserSettings"
    ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: jootser1
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

