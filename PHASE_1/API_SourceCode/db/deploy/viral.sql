-- Deploy flipr:appschema to pg

BEGIN;
CREATE SCHEMA viral;

CREATE TABLE viral.article (
    article_id uuid NOT NULL DEFAULT gen_random_uuid(),
    url text NOT NULL,
    main_text text NOT NULL,
    date_of_publication text NOT NULL,
    headline text NOT NULL,
    CONSTRAINT pk_article_id PRIMARY KEY (article_id)
);

CREATE TABLE viral.report (
    report_id uuid NOT NULL DEFAULT gen_random_uuid(),
    article_id uuid NOT NULL,
    event_date text NOT NULL,
    locations text[] NOT NULL,
    diseases text[],
    syndromes text[],
    CONSTRAINT fk_report_id_article FOREIGN KEY (article_id) references viral.article(article_id),
    CONSTRAINT pk_report_id PRIMARY KEY (report_id)
);

COMMIT;