#!/usr/bin/env bash

while true
do
   node Client/request -t 10.9.2.4 -p 4400 --flood
done