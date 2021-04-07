#!/bin/bash

export PGPASSWORD="Fuckyahoo667"

echo 'Configuring dragonstackdb'

dropdb -U dragon_user dragonstackdb
createdb -U dragon_user dragonstackdb



psql -U dragon_user dragonstackdb < ./bin/sql/generation.sql
psql -U dragon_user dragonstackdb < ./bin/sql/dragon.sql
psql -U dragon_user dragonstackdb < ./bin/sql/trait.sql

node ./bin/insertTraits.js

echo 'dragonstackdb Configured'
