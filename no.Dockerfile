FROM postgres:14.2-alpine as db
WORKDIR /wf-next
COPY ./seeds/seed.sh /docker-entrypoint-initdb.d
COPY ./seeds/seed.sql ./seeds/seed.sql