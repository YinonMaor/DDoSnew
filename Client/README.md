DDoS Thesis:  
1. [Introduction](#introduction)  
2. [Dependencies:](#dependencies)  
3. [Running The Client Requests:](#running-the-client-requests)

## Introduction
The client module defines a very effective attacker end-point, which pushes huge amount of requests for the server.

## Dependencies:  
Linux environment 
Node version ^8.7.0
Python version 3.5

## Running The Client Requests:
You can run the client GUI with the following commands:

```
      $ python3 DDoS_GUI.py
```

you also can be used for flag and arg applications like so:

```
      $ node request -t <ip> -p <port> -f <path>
      
      Flags:
        -t            define argument of IP destenation.
        -p            define argument of Port destenation.
        -f            define argument of path folder 

      Args:
        <ip>          IP address for attack.
        <port>        Port destenation for attack.
        <path>        path of folder to download files (default dev/null/)

```

