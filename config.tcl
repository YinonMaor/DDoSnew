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



set link1 [$ns make-lan "$cdn $gateway1 $gateway3 $gateway2" 100Mb 0ms ]
set link2 [$ns make-lan "$cdn $server" 100Mb 0ms ]

set link11 [$ns duplex-link $router1 $gateway1 1000Mb 0ms DropTail]
set link111 [$ns duplex-link $client1 $router1 100Mb 0ms DropTail]

set link22 [$ns duplex-link $router2 $gateway2 1000Mb 0ms DropTail]
set link222 [$ns duplex-link $client2 $router2 100Mb 0ms DropTail]

set link33 [$ns duplex-link $router3 $gateway3 1000Mb 0ms DropTail]
set link333 [$ns duplex-link $client3 $router3 100Mb 0ms DropTail]

$ns rtproto Static
$ns run
