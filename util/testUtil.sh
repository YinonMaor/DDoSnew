#!/usr/bin/env bash

npm run clean

# running the server and outputting it's log to temporary file
server=$(mktemp "${TMPDIR:-/tmp/}$(basename 0).XXX")
node Server/Server --port 3300 &> $server &
server_pid=$!
echo "Initializing the server with pid: $server_pid . Wait:\n"

# waiting until the server is listening
until grep -i 'Server is listening on ip ' $server
do
  sleep 1
done


# running the CDN and outputting it's log to temporary file
cdn=$(mktemp "${TMPDIR:-/tmp/}$(basename 0).XXX")
node CDN/CDN --port 4400 &> $cdn &
cdn_pid=$!
echo "Initializing the CDN with pid: $cdn_pid . Wait:\n"

# waiting until the CDN is listening
until grep -i 'CDN Server is running on ip ' $cdn
do
  sleep 1
done


# running the tests
npm run jasmine
code=$?


# finished running tests, time to kill the server
kill -9 $server_pid
echo "Server killed"
kill -9 $cdn_pid
echo "CDN killed"


# cleaning test's data
npm run clean


# exiting with the test's exit code
exit $code