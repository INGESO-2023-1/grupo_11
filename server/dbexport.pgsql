--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dispositivos; Type: TABLE; Schema: public; Owner: sofiwi
--

CREATE TABLE public.dispositivos (
    id integer NOT NULL,
    estado boolean,
    buzon character varying(200),
    mensaje character varying(500)
);


ALTER TABLE public.dispositivos OWNER TO sofiwi;

--
-- Name: dispositivos_id_seq; Type: SEQUENCE; Schema: public; Owner: sofiwi
--

CREATE SEQUENCE public.dispositivos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dispositivos_id_seq OWNER TO sofiwi;

--
-- Name: dispositivos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sofiwi
--

ALTER SEQUENCE public.dispositivos_id_seq OWNED BY public.dispositivos.id;


--
-- Name: mensajes; Type: TABLE; Schema: public; Owner: sofiwi
--

CREATE TABLE public.mensajes (
    id integer NOT NULL,
    origin_id integer,
    recipient_id integer,
    msg_content text,
    "timestamp" timestamp with time zone DEFAULT now()
);


ALTER TABLE public.mensajes OWNER TO sofiwi;

--
-- Name: mensajes_id_seq; Type: SEQUENCE; Schema: public; Owner: sofiwi
--

CREATE SEQUENCE public.mensajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mensajes_id_seq OWNER TO sofiwi;

--
-- Name: mensajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sofiwi
--

ALTER SEQUENCE public.mensajes_id_seq OWNED BY public.mensajes.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: sofiwi
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(20)
);


ALTER TABLE public.usuarios OWNER TO sofiwi;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: sofiwi
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO sofiwi;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sofiwi
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: dispositivos id; Type: DEFAULT; Schema: public; Owner: sofiwi
--

ALTER TABLE ONLY public.dispositivos ALTER COLUMN id SET DEFAULT nextval('public.dispositivos_id_seq'::regclass);


--
-- Name: mensajes id; Type: DEFAULT; Schema: public; Owner: sofiwi
--

ALTER TABLE ONLY public.mensajes ALTER COLUMN id SET DEFAULT nextval('public.mensajes_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: sofiwi
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: dispositivos; Type: TABLE DATA; Schema: public; Owner: sofiwi
--

COPY public.dispositivos (id, estado, buzon, mensaje) FROM stdin;
\.


--
-- Data for Name: mensajes; Type: TABLE DATA; Schema: public; Owner: sofiwi
--

COPY public.mensajes (id, origin_id, recipient_id, msg_content, "timestamp") FROM stdin;
19	0	1	Bienvenidos a nuestro chat :D\n(work in progress)	2023-05-18 17:07:04.043144-04
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: sofiwi
--

COPY public.usuarios (id, username) FROM stdin;
1	Sofi
2	Gabo
3	Moai
4	Ruiz
0	1
\.


--
-- Name: dispositivos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sofiwi
--

SELECT pg_catalog.setval('public.dispositivos_id_seq', 1, false);


--
-- Name: mensajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sofiwi
--

SELECT pg_catalog.setval('public.mensajes_id_seq', 19, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sofiwi
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);


--
-- Name: dispositivos dispositivos_pkey; Type: CONSTRAINT; Schema: public; Owner: sofiwi
--

ALTER TABLE ONLY public.dispositivos
    ADD CONSTRAINT dispositivos_pkey PRIMARY KEY (id);


--
-- Name: mensajes mensajes_pkey; Type: CONSTRAINT; Schema: public; Owner: sofiwi
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: sofiwi
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: mensajes mensajes_origin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sofiwi
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_origin_id_fkey FOREIGN KEY (origin_id) REFERENCES public.usuarios(id);


--
-- Name: mensajes mensajes_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sofiwi
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.usuarios(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO sofiwi;


--
-- PostgreSQL database dump complete
--

