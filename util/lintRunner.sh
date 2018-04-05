#!/usr/bin/env bash
for d in ./*/ ; do
    if [[ $d != "./node_modules/" ]]
    then
        ./node_modules/.bin/eslint $d*.js
    fi
done