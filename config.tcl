# set network simualtor
set ns [new Simulator]
source tb_compat.tcl

set client1 [$ns node]
set client2 [$ns node]
set client3 [$ns node]

set server [$ns node]
set cdn [$ns node]


#set Os
tb-set-node-os $client1 Ubuntu1404-32-STD
tb-set-node-os $client2 Ubuntu1404-32-STD
tb-set-node-os $client3 Ubuntu1404-32-STD

tb-set-node-os $server Ubuntu1404-32-STD
tb-set-node-os $cdn Ubuntu1404-32-STD



set gateway1 [$ns node]
tb-set-node-os $gateway1 Ubuntu1404-32-STD

set gateway2 [$ns node]
tb-set-node-os $gateway2 Ubuntu1404-32-STD

set gateway3 [$ns node]
tb-set-node-os $gateway3 Ubuntu1404-32-STD

set router1 [$ns node]
tb-set-node-os $router1 Ubuntu1404-32-STD

set router2 [$ns node]
tb-set-node-os $router2 Ubuntu1404-32-STD

set router3 [$ns node]
tb-set-node-os $router3 Ubuntu1404-32-STD

set gatewayCDN [$ns node]
tb-set-node-os $gatewayCDN Ubuntu1404-32-STD

set routerCDN [$ns node]
tb-set-node-os $routerCDN Ubuntu1404-32-STD

set gatewayServer [$ns node]
tb-set-node-os $gatewayServer Ubuntu1404-32-STD

set routerServer [$ns node]
tb-set-node-os $routerServer Ubuntu1404-32-STD



set link1 [$ns make-lan "$gatewayCDN $gateway1 $gateway3 $gateway2" 100Mb 0ms ]
set link110 [$ns duplex-link $gatewayCDN $gatewayServer 100Mb 0ms DropTail]

set link11 [$ns duplex-link $router1 $gateway1 1000Mb 0ms DropTail]
set link111 [$ns duplex-link $client1 $router1 100Mb 0ms DropTail]

set link22 [$ns duplex-link $router2 $gateway2 1000Mb 0ms DropTail]
set link222 [$ns duplex-link $client2 $router2 100Mb 0ms DropTail]

set link33 [$ns duplex-link $router3 $gateway3 1000Mb 0ms DropTail]
set link333 [$ns duplex-link $client3 $router3 100Mb 0ms DropTail]

set link44 [$ns duplex-link $routerCDN $gatewayCDN 1000Mb 0ms DropTail]
set link444 [$ns duplex-link $cdn $routerCDN 100Mb 0ms DropTail]

set link55 [$ns duplex-link $routerServer $gatewayServer 1000Mb 0ms DropTail]
set link555 [$ns duplex-link $server $routerServer 100Mb 0ms DropTail]

$ns rtproto Static
$ns run
