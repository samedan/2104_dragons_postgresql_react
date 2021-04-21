#!/bin/bash

export PGPASSWORD="Fuckyahoo667"

echo 'Configuring dragonstackdb'

dropdb -U dragon_user dragonstackdb
createdb -U dragon_user dragonstackdb



psql -U dragon_user dragonstackdb < ./bin/sql/account.sql
psql -U dragon_user dragonstackdb < ./bin/sql/generation.sql
psql -U dragon_user dragonstackdb < ./bin/sql/dragon.sql
psql -U dragon_user dragonstackdb < ./bin/sql/trait.sql
psql -U dragon_user dragonstackdb < ./bin/sql/dragonTrait.sql
psql -U dragon_user dragonstackdb < ./bin/sql/accountDragon.sql

node ./bin/insertTraits.js

echo 'dragonstackdb Configured'
