DROP SCHEMA IF EXISTS laststraw CASCADE;
CREATE EXTENSION postgis;

\i sql/01_schema.sql
\i sql/02_tables.sql

\i data/tempimport.sql
