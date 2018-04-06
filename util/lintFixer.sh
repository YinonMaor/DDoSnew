#!/usr/bin/env bash
for d in ./*/ ; do
    if [ $d != "./node_modules/" ]
    then
        ./node_modules/.bin/eslint --fix $d*.js
    fi
done