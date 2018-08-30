# set network simualtor
set ns [new Simulator]
source tb_compat.tcl

set client1 [$ns node]
set client2 [$ns node]
set client3 [$ns node]
set client4 [$ns node]
set client5 [$ns node]
set client6 [$ns node]
set client7 [$ns node]

set server [$ns node]
set cdn [$ns node]


#set Os
tb-set-node-os $client1 Ubuntu1404-32-STD
tb-set-node-os $client2 Ubuntu1404-32-STD
tb-set-node-os $client3 Ubuntu1404-32-STD
tb-set-node-os $client4 Ubuntu1404-32-STD
tb-set-node-os $client5 Ubuntu1404-32-STD
tb-set-node-os $client6 Ubuntu1404-32-STD
tb-set-node-os $client7 Ubuntu1404-32-STD

tb-set-node-os $server Ubuntu1404-32-STD
tb-set-node-os $cdn Ubuntu1404-32-STD



set gateway1 [$ns node]
tb-set-node-os $gateway1 Ubuntu1404-32-STD

set gateway2 [$ns node]
tb-set-node-os $gateway2 Ubuntu1404-32-STD

set gateway3 [$ns node]
tb-set-node-os $gateway3 Ubuntu1404-32-STD

set gateway4 [$ns node]
tb-set-node-os $gateway4 Ubuntu1404-32-STD

set gateway5 [$ns node]
tb-set-node-os $gateway5 Ubuntu1404-32-STD

set gateway6 [$ns node]
tb-set-node-os $gateway6 Ubuntu1404-32-STD

set gateway7 [$ns node]
tb-set-node-os $gateway7 Ubuntu1404-32-STD

set router1 [$ns node]
tb-set-node-os $router1 Ubuntu1404-32-STD

set router2 [$ns node]
tb-set-node-os $router2 Ubuntu1404-32-STD

set router3 [$ns node]
tb-set-node-os $router3 Ubuntu1404-32-STD

set router4 [$ns node]
tb-set-node-os $router4 Ubuntu1404-32-STD

set router5 [$ns node]
tb-set-node-os $router5 Ubuntu1404-32-STD

set router6 [$ns node]
tb-set-node-os $router6 Ubuntu1404-32-STD

set router7 [$ns node]
tb-set-node-os $router7 Ubuntu1404-32-STD



set link1 [$ns make-lan "$cdn $gateway1 $gateway2 $gateway3 $gateway4 $gateway5 $gateway6" 100Mb 0ms ]
set link2 [$ns make-lan "$cdn $server" 100Mb 0ms ]

set link11 [$ns duplex-link $router1 $gateway1 1000Mb 0ms DropTail]
set link111 [$ns duplex-link $client1 $router1 100Mb 0ms DropTail]

set link22 [$ns duplex-link $router2 $gateway2 1000Mb 0ms DropTail]
set link222 [$ns duplex-link $client2 $router2 100Mb 0ms DropTail]

set link33 [$ns duplex-link $router3 $gateway3 1000Mb 0ms DropTail]
set link333 [$ns duplex-link $client3 $router3 100Mb 0ms DropTail]

set link44 [$ns duplex-link $router4 $gateway4 1000Mb 0ms DropTail]
set link444 [$ns duplex-link $client4 $router4 100Mb 0ms DropTail]

set link55 [$ns duplex-link $router5 $gateway5 1000Mb 0ms DropTail]
set link555 [$ns duplex-link $client5 $router5 100Mb 0ms DropTail]

set link66 [$ns duplex-link $router6 $gateway6 1000Mb 0ms DropTail]
set link666 [$ns duplex-link $client6 $router6 100Mb 0ms DropTail]

set link77 [$ns duplex-link $router7 $gateway7 1000Mb 0ms DropTail]
set link777 [$ns duplex-link $client7 $router7 100Mb 0ms DropTail]

$ns rtproto Static
$ns run