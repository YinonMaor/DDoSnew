DDoS Thesis:  
1. [Introduction](#introduction)  
2. [Our Project:](#our-project)  
3. [Our Goal:](#our-goal)  
4. [Dependencies:](#dependencies)  
5. [Installation:](#installation)
6. [Bundling:](#bundling)
7. [Practical Overview:](#practical-overview)

## Introduction
DoS attacks are attempts to exhaust server-side assets and designed to prevent client-to-server communication (denial of service). Simply, we can say that stealth server sabotage wires or even the server is denial of service, but in the context of data security we discuss about remote attacks and not physical sabotaging.  

DDoS attacks are very similar and sometimes even identical, and their intention is Distributed Denial of Service. In other words, the attack comes not from a single source, but from a large number of end stations – usually triggered by the attacker in the form of a king of virus located on these end stations. Most DDoS attacks are much more powerful and significant. It is important to understand that even an attack by two or three end stations is usually considered as a DoS attack, since there is really no significant flooding of the server.

## Our Project:
Our project deals with understanding and examining DoS and DDoS attacks, and what are the solutions for them. In particularly, we will discuss and handle with traffic flood attacks on web servers (within Application Layer - OSI), and will try to develop our own software or algorithm to block or to give any immediately pragmatic solution.


## Our Goal:
Our main goal is to develop an automatic open-source system that would identify and analyze a traffic flood attack, defend the server from it, and in need - will block any Internet Protocol (IP) or sub-net which the flood comes from. Our system should run on a Content delivery network (CDN) instead of on the server in order to save the server’s performances providing service

## Dependencies:
* MacOS / Linux
* Node.js ^8.7.0
* Python ^2.7.0
* Git

## Installation:
1. Clone the repository:  
    ```
    $ git clone https://github.com/YinonMaor/DDoSMitigation.git
    ```
2. Enter the project's directory:
    ```
    $ cd DDoSMitigation
    ```
3. Install dependent packages:
    ```
    $ npm install
    ```
    Or, if you have yarn installed:
    ```
    $ yarn
    ```
4. Run the module as describes in each module's directory.

## Bundling:
In case you want running the project with high performance, you might use the bundled modules.  

By running:
```
  $ npm run build
```
A directory named `dist/` with bundled modules (server, client and CDN) would be created. 
 
Running the bundled module is exactly the same as for unbundled modules.  

This is very useful for running these modules with only one single file, and not being dependent on some installed modules 

## Practical Overview:
In this repo, you might find about our modules that demonstrating our various parts of the research:  
* Main Server
* CDN Server
* Client sides (both regular and attacker)