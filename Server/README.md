DDoS Thesis:  
1. [Introduction](#introduction)  
2. [Dependencies:](#dependencies)  
3. [Running The Server:](#running-the-server)
2. [Troubleshooting:](#troubleshooting)

## Introduction
The sever handles his various requests, coming from the CDN. The server should provide any service which it has been requested because the assumption the CDN blocks every malicious request.

## Dependencies:
Node version ^8.7.0

## Running The Server:
You can run the server with the following commands:
```
    node server
```

You might also use the following flags:

```
    $ node server --port <port>

    Flags:
      --port           define argument of PORT listener.

    Args:
      <port>           Port value for server's listener.
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
It should ask for a password and close any node process. Now you would be able to run the server.
