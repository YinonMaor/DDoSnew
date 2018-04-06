CDN Module:  
1. [Introduction](#introduction)  
2. [Dependencies:](#dependencies)  
3. [Running The CDN Server:](#running-the-cdn-server)
2. [Troubleshooting:](#troubleshooting)

## Introduction
The CDN sever handles his various requests coming from the clients, sending each one of the to the server. The CDN server has it's algorithm to determine which requests are legal and which are meant to flood the server.

## Dependencies:
Node version ^8.7.0

## Running The CDN Server:
You can run the server with the following commands:
```
    node CDN --server SERVER_IP --serverPort SERVER_PORT
```

The `--server` and `--serverPort` are mandatory fields in order to run the CDN server.
You might also use the following flags:

```
    $ node CDN --port <port> --server <server_ip> --serverPort <server_port>

      Flags:
        --port                define argument of listened port of the CDN.
        --server              define argument of IP of the original server.
        --serverPort          define argument of listened port of the original server.

      Args:
        <port>                Port of the CDN server.
        <server_ip>           The original server's IP.
        <server_port file>    The original server's listened port.
```
## Troubleshooting:
In case that you've got the following error:
```
    events.js:
          throw er; // Unhandled 'error' event
          ^
    Error: listen EADDRINUSE
```
First make sure that you entered the right IP and port of the original server, and that it is already listening.  
Second, make sure that CDN's port is different from the server's port.