-- Revert flipr:appschema from pg

BEGIN;

DROP TABLE viral.article;
DROP TABLE viral.report;

COMMIT;
