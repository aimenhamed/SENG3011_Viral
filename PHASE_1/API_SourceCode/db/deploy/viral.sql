-- Deploy flipr:appschema to pg

BEGIN;
-- CREATE SCHEMA viral;

CREATE TABLE public.article (
    article_id uuid NOT NULL DEFAULT gen_random_uuid(),
    url text NOT NULL,
    main_text text NOT NULL,
    date_of_publication text NOT NULL,
    headline text NOT NULL,
    CONSTRAINT pk_article_id PRIMARY KEY (article_id)
);

CREATE TABLE public.report (
    report_id uuid NOT NULL DEFAULT gen_random_uuid(),
    article_id uuid NOT NULL,
    event_date date NOT NULL,
    locations text[] NOT NULL,
    diseases text[],
    syndromes text[],
    CONSTRAINT fk_report_id_article FOREIGN KEY (article_id) references public.article(article_id),
    CONSTRAINT pk_report_id PRIMARY KEY (report_id)
);


CREATE TABLE public.user (
    user_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    bookmarked_countries text[] NOT NULL,
    CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);

CREATE TABLE public.advice (
    advice_id uuid NOT NULL DEFAULT gen_random_uuid(),
    url text NOT NULL,
    country uuid,
    continent text,
    advice_level text,
    latest_advice text NOT NULL,
    last_update date NOT NULL,
    CONSTRAINT pk_advice_id PRIMARY KEY (advice_id),
    CONSTRAINT fk_country FOREIGN KEY (country) references country(country_id)
);

CREATE TABLE public.user_articles (
    user_id uuid NOT NULL ,
    article_id uuid NOT NULL,
    CONSTRAINT pk_user_id_article_id PRIMARY KEY (user_id,article_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) references public.user(user_id),
    CONSTRAINT fk_article_id FOREIGN KEY (article_id) references public.article(article_id)
);

CREATE TABLE public.country (
    country_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    code text NOT NULL,
    coords int[],
    CONSTRAINT pk_country_id PRIMARY KEY (country_id)
)

CREATE TABLE public.user_countries (
    user_id uuid NOT NULL,
    country_id uuid NOT NULL,
    CONSTRAINT pk_user_id_country_id PRIMARY KEY (user_id,country_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) references public.user(user_id),
    CONSTRAINT fk_country_id FOREIGN KEY (country_id) references public.country(country_id)
)

CREATE TABLE public.comment (
    comment_id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_by uuid,
    country uuid,
    message text,
    created_date date,
    CONSTRAINT pk_comment_id PRIMARY KEY (comment_id),
    CONSTRAINT fk_user_id FOREIGN KEY (created_by) references public.user(user_id),
    CONSTRAINT fk_country FOREIGN KEY (country) references public.country(country_id)
)
COMMIT;