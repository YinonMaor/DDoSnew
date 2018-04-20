#!/usr/bin/env bash

# running the server and outputting it's log to temporary file
output=$(mktemp "${TMPDIR:-/tmp/}$(basename 0).XXX")
node Server/Server &> $output &
server_pid=$!
echo "Initializing the server with pid: $server_pid . Wait:\n"

# waiting until the server is listening
until grep -i 'Server is listening on ip ' $output
do
  sleep 1
done

npm run jasmine
code=$?

# finished running tests, time to kill the server
kill -9 $server_pid
echo "Server killed"

# exiting with the test's exit code
exit $code