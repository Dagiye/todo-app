\c \connect todoapp_b7vs
\i /docker-entrypoint-initdb.d/schema.sql
\i /docker-entrypoint-initdb.d/seed.sql
