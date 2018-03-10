DDoS Thesis:  
1. [Introduction](#introduction)  
2. [Dependencies:](#dependencies)  
3. [Running The Client Requests:](#running-the-client-requests)
4. [Troubleshooting:](#troubleshooting)

## Introduction
The client module defines a very effective attacker end-point, which pushes huge amount of requests for the server.

## Dependencies:  
Linux OS  
Node version ^8.7.0  
Python version ^3.5.0

## Running The Client Requests:
You can run the client GUI with the following commands:

```
      $ python3 DDoS_GUI.py
```

You might also use the following flags:

```
      $ node request -t <ip> -p <port> -f <path> -ht <requested file>

      Flags:
        -t                    define argument of IP destination.
        -p                    define argument of Port destination.
        -f                    define argument of path folder.
        -ht                   define argument of requested file

      Args:
        <ip>                  IP address for attack.
        <port>                Port destination for attack.
        <path>                path of folder to download files (default dev/null/)
        <requested file>      path to requested file on the server.
```

## Troubleshooting:
In case that you've got the following error:
```
events.js:
      throw er; // Unhandled 'error' event
      ^
Error: listen EADDRINUSE
```
It means that you have another node process which is already running the same file or the PORT (either the default or the chosen port) is in use. If you still want to the server, be sure that no node process is running a important task, and try running:
```
sudo killall node
```
It should ask for a password and close any node process. Now you would be able to run the requests.
