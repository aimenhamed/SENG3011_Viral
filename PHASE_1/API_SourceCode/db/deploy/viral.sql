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
    event_date text NOT NULL,
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
    dashboards uuid[] NULL,
    bookmarked_articles uuid[] NULL,
    CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);

CREATE TABLE public.dashboard (
    dashboard_id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    widgets uuid[] NOT NULL,
    CONSTRAINT fk_user_id_dashboard FOREIGN KEY (user_id) references public.user(user_id),
    CONSTRAINT pk_dashboard_id PRIMARY KEY (dashboard_id)
);

CREATE TYPE widget AS ENUM ('ARTICLE');
CREATE TABLE public.widgets (
    widget_id uuid NOT NULL DEFAULT gen_random_uuid(),
    dashboard_id uuid NOT NULL,
    widget_type widget NOT NULL,
    article_id uuid NOT NULL,
    CONSTRAINT fk_dashboard_id_widget FOREIGN KEY (dashboard_id) references public.dashboard(dashboard_id),
    CONSTRAINT fk_article_id_widget FOREIGN KEY (article_id) references public.article(article_id),
    CONSTRAINT pk_widget_id PRIMARY KEY (widget_id)
);

COMMIT;