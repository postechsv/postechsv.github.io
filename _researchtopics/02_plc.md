---
layout: researchpage
title: "Semantics and Analysis of PLC System"
intro: "This research focuses on defining the behavior of the whole PLC behavior including the PLC ST, multitask, external environment, and communication features."
img-url: "plc.jpg"
date: 2024-10-06
hidden: False
---

## Introduction
<img src="{{site.baseurl}}/images/respic/plc.jpg" width="100%">

A programmable logic controller (PLC) is commonly used in industrial control systems, and Structured Text (ST) serves as an imperative programming language for developing PLC software. Given the safety-critical nature of PLC applications, it is essential to formally verify PLC programs. There are challenges in defining the semantics of PLCs. First, it must capture the real-time interaction with the external environment. PLCs also support multitask feature where high-priority tasks may preempt low-priority tasks. In this project, we aim to build a formal semantics of PLC that are realistic and integrative.


## Symbolic semantics of PLC ST programs

We defined K semantics of PLC ST. K is a rewriting-based framework for defining the semantic of programming languages. In K, program states are specified as multisets of nested cells, called configurations. Each cell represents a component of the program state, such as environments and stores. The cell structure for PLC ST is shown below.
<img src="{{site.baseurl}}/images/respic/cell1.jpg" width="80%">

PLCs exhibit cyclic bevior where a 'scan cycle' consists of input, execution and output stages. During the input stage, it reads values from sensors (e.g. temperature, water level) and store it to the program variables. Based on these values, the programs are executed in the execution stage. Finally, the output varaibles' values are reflected in the actuators (e.g. motor speed, pump switch). We formalized this cyclic behavior and integrated it to LTL model checking analysis procedure, whereas formal studies focus on the single execution of PLC programs. Another important distinction previous work is we do not assume a specific input values. At this point, we do not know what values can be read from the environment, we virtually assume that 'any' values of a specified range can be read. This neccesitates the need for a symbolic semantics with SMT variables as program values. To include these behaviors in our semantics, we extend the cell structures with the following cells.
<img src="{{site.baseurl}}/images/respic/cell2.jpg" width="80%">


## Bounded symbolic model checking of PLC ST and tool implementation

We propose a bounded model checking technique for PLC ST programs, leveraging the rewriting-based semantics. We employ rewriting modulo SMT to symbolically examine LTL properties of ST programs concerning sequences of inputs and outputs, which may be infinite. We encode model checking problems into reachabilities to the error state. After a desired repetition of scan cycles, we have series of inputs and outputs in our streams. We can check LTL properties by 'flatten' the LTL formula to a propositional formula over the input and output stream elements. The following shows a Maude's search command to verify the LTL property φ.
<img src="{{site.baseurl}}/images/respic/search.jpg" width="80%">

We devoped 'stbmc' tool that takes PLC programs and specification file and perform model checking. The following shows the specification file format and the command line output of the tool. If the given LTL proeprty holds, 'test succeeded' is printed. If not, it shows a counterexample.
<img src="{{site.baseurl}}/images/respic/stbmc.jpg" width="80%">


## Semantics and analysis of multitask PLC

Although recent developments in executable semantics for PLC ST have been made, existing approaches often overlook the complexity of multitasking and preemption. This project introduces executable semantics for PLC ST that supports preemptive multitasking. The formal analysis of multitasking programs, however, faces the challenge of state explosion. To address this issue, this project also presents state space reduction techniques to enhance the model checking of multitasking PLC ST programs. 

Under multitask PLC setting, various scenarios can occur from the same initial state. The following diagram shows two possible scenarios (among many) that may have different outcome. Our semantics is meant to capture all possible scenarios.
<img src="{{site.baseurl}}/images/respic/scenario.jpg" width="80%">
The following cells are added or modified to the cells originally proposed. (1) time denotes the current time; (2) active denotes the identifier of the currently running program; (3) interval has a map from program identifiers to their intervals; (4) pQueue contains a priority queue of tasks that are ready to run according to time and interval; and (5) futureTS contains tasks that are not ready. By moving task objects from pQueue and futureTS back and forth, we can naturally define the multitask PLC behaviors.
<img src="{{site.baseurl}}/images/respic/cell3.jpg" width="80%">

While nondeterminism is originally present, adding multitask feature greatly increases the complexity of the system. To mitigate this, we propose 'time-abstraction' and 'partial order reduction' techniques. The main idea of time-abstraction is to express time abstractly with a time interval that represents an infinite number of time points. We define an abstract function that maps a concrete K configuration to its abstract version. We have adopted the classic ample set based partial order reduction approach to our system.


## Formal analysis of networked PLC controllers interacting with physical environment
Existing formal verification techniques focus on individual PLC programs in isolation, often neglecting interactions with physical environments and network communication between controllers. This limitation poses significant challenges in analyzing real-world industrial systems, where continuous dynamics and communication delays play a critical role.
Here, we present a unified formal framework that integrates discrete PLC semantics, networked communication, and continuous physical behaviors. To mitigate state explosion, we apply partial order reduction.
<img src="{{site.baseurl}}/images/respic/environment.jpg" width="80%">

To accurately capture continuous physical dynamics, we extend the real-time system representation. We embed the physical environment into the relevant PLC machines. The environment interact with the programs by sensing and actuation at the beginning of every scan cycle. The environmental state, such as temperature, and switch position, is included in each PLCs attributes. We define 'tick' rule that rules the time evolution of the system, which update the environmental states. By defining a mathematically sound flow function, we ensure that the system’s physical behavior is represented precisely. This way, we can explicitly describe how the physical environment evolves over time, encapsulating continuous behaviors within each PLC object. This flexibility allows for easy modification or extension of PLC behavior with minimal effort, making our framework highly adaptable to diverse industrial applications.

Communication is often incorporated to systems with multiple PLCs. PLC supports several function blocks that conduct inter-PLC communication, which includes 'CONNECT' for connection establishment, 'USEND' for unsynchronous sending data, and 'URCV' for unsynchronous receiving data, which are all specificed in International Electrotechnical Commission (IEC) 61131 standard. The behavior of each communicating function blocks are implemented in PLC ST format, with special communication functions defined in rewrite ruels.

Using this integrated semantics, we can verify properties of well-defined networked industrial control system such as chemical plants with water tanks, railed vehicle controllers, and so on.

## Members
*   Jaeseo Lee, POSTECH
*   Sangki Kim, POSTECH
*   Kyungmin Bae, POSTECH

## References

The following items show the publication from this project:

*   [Bounded Model Checking of PLC ST Programs using Rewriting Modulo SMT](https://dl.acm.org/doi/10.1145/3563822.3568016), Jaeseo Lee, Sangki Kim, Kyungmin Bae, FTSCS'12, 2022
*   [Formal Semantics and Analysis of Multitask PLC ST Programs with Preemption](https://link.springer.com/chapter/10.1007/978-3-031-71162-6_22), Jaeseo Lee, Kyungmin Bae, FM'09, 2024

