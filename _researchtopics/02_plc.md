---
layout: researchpage
title: "Semantics and Analysis of PLC System"
intro: "This research focuses on defining the behavior of the whole PLC behavior including the PLC ST, multitask, external environment, and communication features."
img-url: "/plc/plc.jpg"
hidden: false
---

## Introduction
<img src="{{ site.research_imgs }}/plc/plc.jpg" width="100%">

Programmable Logic Controllers (PLCs) are widely used in industrial control systems to interface with physical environments through sensors and actuators. Given their role in safety-critical domains, the correctness of PLC software is crucial, and formal verification becomes essential. However, the behavior of a complete PLC system involves several complex components: cyclic execution of Structured Text (ST) programs, real-time interaction with physical environments, task preemption under multitasking settings, and communication between networked controllers. 

This research aims to develop a unified and realistic formal semantics that captures the complete behavior of PLC systems. Our approach covers the formalization of the ST programming language, support for symbolic and bounded model checking, semantics for preemptive multitasking with state space reduction, and integration of continuous environment dynamics and networked communication. Through executable semantics, tool support, and scalable verification techniques, our framework offers a foundation for analyzing real-world PLC systems in industrial settings.


## Semantics of PLC ST

We defined K semantics of PLC ST. K is a rewriting-based framework for defining the semantic of programming languages. In K, program states are specified as multisets of nested cells, called configurations. Each cell represents a component of the program state, such as environments and stores. The cell structure for PLC ST is shown below.
<img src="{{ site.research_imgs }}/plc/cell1.jpg" width="80%">

PLCs exhibit cyclic bevior where a 'scan cycle' consists of input, execution and output stages. During the input stage, it reads values from sensors (e.g. temperature, water level) and store it to the program variables. Based on these values, the programs are executed in the execution stage. Finally, the output varaibles' values are reflected in the actuators (e.g. motor speed, pump switch). We formalized this cyclic behavior and integrated it to LTL model checking analysis procedure, whereas formal studies focus on the single execution of PLC programs.

<img src="{{ site.research_imgs }}/plc/scancycle.jpg" width="70%">

Another important distinction previous work is we do not assume a specific input values. At this point, we do not know what values can be read from the environment, we virtually assume that 'any' values of a specified range can be read. This neccesitates the need for a symbolic semantics with SMT variables as program values. To include these behaviors in our semantics, we extend the cell structures with the following cells.
<img src="{{ site.research_imgs }}/plc/cell2.jpg" width="80%">


## Bounded Symbolic Model Checking and STbmc Tool

We employ rewriting modulo SMT to symbolically examine LTL properties of ST programs concerning sequences of inputs and outputs. A model checking problem is encoded into reachability to an error state. LTL properties are 'flatten' to a propositional formula over the input and output stream elements. The following shows a Maude's search command to verify the LTL property φ.
<img src="{{ site.research_imgs }}/plc/search.jpg" width="80%">

We devoped 'stbmc' tool that takes PLC programs and specification file and perform model checking. The following shows the specification file format and the command line output of the tool. If the given LTL proeprty holds, 'test succeeded' is printed. If not, it shows a counterexample.
<img src="{{ site.research_imgs }}/plc/stbmc.jpg" width="80%">


## Semantics and Analysis of Multitask PLC

This project introduces executable semantics for PLC ST that supports preemptive multitasking. The formal analysis of multitasking programs, however, faces the challenge of state explosion. To address this issue, this project also presents state space reduction techniques to enhance the model checking of multitasking PLC ST programs. 

Under multitask PLC setting, various scenarios can occur from the same initial state. The following diagram shows two possible scenarios (among many) that may have different outcome. Our semantics is meant to capture all possible scenarios.
<img src="{{ site.research_imgs }}/plc/scenario.jpg" width="80%">
The following cells are added or modified to the cells originally proposed. (1) time denotes the current time; (2) active denotes the identifier of the currently running program; (3) interval has a map from program identifiers to their intervals; (4) pQueue contains a priority queue of tasks that are ready to run according to time and interval; and (5) futureTS contains tasks that are not ready. By moving task objects from pQueue and futureTS back and forth, we can naturally define the multitask PLC behaviors.
<img src="{{ site.research_imgs }}/plc/cell3.jpg" width="80%">

To resolve state explosion, we propose 'time-abstraction' and 'partial order reduction' techniques. The main idea of time-abstraction is to express time abstractly with a time interval that represents an infinite number of time points. We have adopted the classic ample set based partial order reduction approach to our system. The graph below shows the time comparison of state space exploration time before and after time abstraction. The points at 3600 represent timeout. 
<img src="{{ site.research_imgs }}/plc/g1.jpg" width="50%">


## Ongoing Work
Existing formal verification techniques focus on individual PLC programs in isolation, often neglecting interactions with physical environments and network communication between controllers. We present a unified formal framework that integrates discrete PLC semantics, networked communication, and continuous physical behaviors. 
<img src="{{ site.research_imgs }}/plc/environment.jpg" width="60%">

The environment interact with the programs by sensing and actuation at the beginning of every scan cycle. The environmental state, such as temperature, and switch position, is included in each PLCs attributes. We define 'tick' rule that rules the time evolution of the system, which update the environmental states.
 
<img src="{{ site.research_imgs }}/plc/env.jpg" width="80%">

PLC supports several function blocks that conduct inter-PLC communication, which includes 'CONNECT' for connection establishment, 'USEND' for asynchronous sending data, and 'URCV' for asynchronous receiving data. The behavior of each communicating function blocks are implemented in PLC ST format, with special communication functions defined in rewrite ruels.

Using this integrated semantics, we can verify properties of well-defined networked industrial control system such as chemical plants with water tanks, railed vehicle controllers, and so on.


## Contact
*   Jaeseo Lee sean96@postech.ac.kr

## References

The following items show the publication from this project:

*   [Bounded Model Checking of PLC ST Programs using Rewriting Modulo SMT](https://dl.acm.org/doi/10.1145/3563822.3568016), Jaeseo Lee, Sangki Kim, Kyungmin Bae, FTSCS'12, 2022
*   [Formal Semantics and Analysis of Multitask PLC ST Programs with Preemption](https://link.springer.com/chapter/10.1007/978-3-031-71162-6_22), Jaeseo Lee, Kyungmin Bae, FM'09, 2024

