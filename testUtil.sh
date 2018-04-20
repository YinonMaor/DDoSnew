#!/usr/bin/env bash

output=$(mktemp "${TMPDIR:-/tmp/}$(basename 0).XXX")
node server/Server &> $output &
server_pid=$!
echo "Initializing the server with pid: $server_pid . Wait:\n"
until grep -i 'Server is listening on ip ' $output
do
  sleep 1
done
npm run test
code=$?
kill -9 $server_pid
echo "Server killed"
exit $code
