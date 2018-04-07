#!/usr/bin/env bash
for d in ./*/ ; do
    if [ $d != "./node_modules/" ] && [ $d != "./dist/" ]
    then
        ./node_modules/.bin/eslint --fix $d*.js
    fi
done