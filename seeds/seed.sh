#!/bin/bash

psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -a -f /wf-next/seeds/seed.sql