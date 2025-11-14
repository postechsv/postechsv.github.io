---
layout: researchpage
title: "MR-HybridSynchAADL: Formal Modeling and Analysis of Multirate CPSs"
intro: "We define the MR-HybridSynchAADL modeling language and verification tool for hierarchical multirate CPSs with advanced control programs, continuous behaviors, and imprecise local clocks." 
img-url: "/aadl/cps.png"
hidden: false
---

## Introduction
Many cyber-physical systems (CPSs) are *virtually synchornous* networks of hybrid components with continuous behaviors combined with sophisticated controllers.
They should logically behave as if they were synchronous -- in each iteration of the system, all components, in lockstep, read inputs and perform transitions which generate outputs for the next iteration -- but have to be realized in a distributed setting, which clock skew and message passing communication. Examples of such CPSs include avionics and automotive systems, networked medical devices, and other distributed control systems, where the underlying infrastructure often guarantee bounds on clock skews, network delays, and local execution times.


The combination of large "discrete" state spaces, caused by interleaving due to asynchronous communication, and continuous behaviors, taking into account clock skews, network delays, and sampling/actuation times (based on imprecise clocks) makes direct automatic model checking analysis infeasible. To dramatically reduce both the modeling complexity and the state space caused by asynchronous communication, we use Hybrid PALS equivalence, which says that the underlying **synchronous** design -- where all components execute in lockstep, and there is no asynchronous message passing -- satisfies the same properties as the asynchronous distributed system.


To enable formal analysis to a large user base, the modling language for such CPSs, with complex control programs, and different frequences, should bee well-known for CPSs developers, and should be integrated into mature modeling environments.
The MH-SynchAADL modeling language is a subset of the avionics modeling standard AADL and its behavioral annex to model control programs, and captures a synchronous subset of AADL with continuous behaviors. We have also integrated modeling and formal analysis of MH-SynchAADL models into the OSATE modeling environment for AADL.


## The MH-SynchAADL Modeling Language
MH-SynchAADL is a behavioral subset of AADL extended with the following property set MH_SynchAADL.
```
property set MH_SynchAADL is
  Synchronous: inherit aadlboolean applies to (system, process, thread);
  InputAdaptor: aadlstring applies to (port);
  isEnvironment: inherit aadlboolean applies to (system);
  ContinuousDynamics: aadlstring applies to (system);
  Max_Clock_Deviation: inherit Time applies to (system, process, thread);
  Sampling_Time: inherit Time_Range applies to (system, process, thread);
  Response_Time: inherit Time_Range applies to (system, process, thread);
end MH_SynchAADL
```

### Discrete Controller Components

Discrete controllers are standard software components in the Multirate Synchronous AADL subset.
It includes system, process, and thread components; data components; composite data types; subprograms; ports and connections; and thread behaviors defined in the behavior annex language. 
Threads have periodic dispatch, and connections between controllers are delayed and involve only data ports. 

The below AADL code shows a controller component about a thermostat that turns its heater on or off. It has event output ports *on_ctrl* and *off_ctrl*, data input ports *curr* and *tin*, and data output ports *set_powert* and *tout*, where the initial value of *tout* is 0. 
```
thread ThermostatThread
  features
    on_ctrl: out event port;
    off_ctrl: out event port;
    set_power: out data port Base_Types::Float;
    curr: in data port Base_Types::Float;
    tin: in data port Base_Types::Float;
    tout: out data port Base_Types::Float;
  properties
    Dispatch_Protocol => Periodic;
end ThermostatThread

thread implementation ThermostatThread.impl
  subcomponents
    avg: data Base_Types::Float;
      {Data_Model::Initial_value => ("any");};
  annex behavior_specification {**
    states
      init: initial complete state; exec: state;
    transitions
      init -[on dispatch]-> exec
        { avg := (tin + curr) / 2; tout := curr};
      exec -[avg > 25]-> init { off_ctrl! };
      exec -[avg <= 25 and avg >= 10]-> init
        { set_power := 5 ; on_ctrl! };
      exec -[avg < 10]-> init
        { set_power := 10; on_ctrl! };
  **}
end ThermostatThread.impl;
```

### Environment Components
An environment component models real-valued state variables that continuously change over time.
The values of these state variables change according to their continuous dynamics, declared using
AADL constructs with the property set *ContinuousDynamics*, while *discretely* interacting with its controllers according to the sampling and actuating times.

The below AADL code shows an environment component.
It has data output port *temp*, data input port *power*, and event input ports
*on_ctrl* and *off_ctrl*. The implementation has two data subcomponents *x* and *p*, denoting the temperature of the room and the heater's power, respectively, to represent the state variables with the specified initial values. 
The value of *x* is sent to the controller thorugh the output port *temp*, using the connection 
$x \rightarrow temp&. When a discrete controller sends an actuation command through the input 
ports *power*, *on_ctrl*, and *off_ctrl*, the mode changes according to the mode transitions,
and the value of *p* can be updated with the value of the input port *power*, declared by
$power \rightarrow p$.

```
system RoomEnv
  features
    temp: out data port Base_Types::Float;
    power: in data port Base_Types::Float;
    on_ctrl: in event port;
    off_ctrl: out event port;
  properties
    MH_SynchAADL::isEnvironment => true;
end RoomEnv

system implementation RoomEnv.impl
  subcomponents
    x: data Base_Types::Float;
    p: data Base_Types::Float;
  connections
    C: port x -> temp; 
    R: port power -> p;
  modes
    heaterOff: initial mode;
    heaterOn: mode;
    heaterOff -[on_ctrl]-> heaterOn;
    heaterOn -[off_ctrl]-> heaterOff;
  properties
    MH_SynchAADL::ContinuousDynamics => 
      "x(t) = x(0) - 0.1 * (x(0) - p / 0.1) * t;" in modes (heaterOn),
      "x(t) = x(0) * (1 - 0.1 * t);" in modes (hearterOff);
end RoomEnv.impl;
```

The below figure depicts the behavior of an environment $E$ that interacts with two controllers $C_n$, $n = 1, 2$, *in a single iteration*.
Let $g : \mathbb{N} \to \mathbb{R}_{\geq 0}$ denote the *global time* $g(i)$ at the beginning of the $i$-th period, where $g(i + 1) - g(i) = \mathit{period}.$

The time frame of the environment is *shifted to the left* from the global time frame $[g(i), g(i+1)]$ by a maximal clock skew $\epsilon > 0$.

1. The state variables of $E$ have initial values $\vec{v}_0$, and change continuously over time according to $E$'s continuous dynamics.

2. The period of each controller $C_n$ begins at any time $0 < t_n^0 < 2\epsilon$, because $C_n$ runs according to its local clock.

3. $E$ sends the state values $\vec{v}_n^s$ at time $t_n^s$ to each controller $C_n$, where $t_n^s - t_n^0$ denotes the sampling time declared by $C_n$.

4. $E$ receives $C_n$'s command $\alpha_n$ at time $t_n^a$ (and may change its continuous dynamics), where $t_n^a - t_n^0$ denotes the actuating time.

<center>
<img src="{{ site.research_imgs }}/aadl/interaction.png" alt="A MH-SynchAADL model" width="50%"/>
</center>



## MH-SynchAADL Tool
MH-SynchAADL seamlessly integrates modeling and formal analysis into OSATE. The tool can statically check the syntactic constraints of MH-SynchAADL. The tool’s property specification language can specify invariant and reachability properties. The tool synthesizes the corresponding Maude model from a MH-SynchAADL model and invokes Maude with SMT solving to perform various formal analyses, including randomized simulation (using the concrete semantics), symbolic reachability analysis (using the symbolic semantics), and portfolio analysis (running both methods in parallel with multithreading). The tool is available at https://hybridsynchaadl.github.io.

<center>
<img src="{{ site.research_imgs }}/aadl/tool.png" alt="Virtually Synchronous CPSs" width="50%"/>
</center>


## Formal Semantics of MH-SynchAADL 
We define formal semantics of MH-SynchAADL in Maude and SMT. Maude is a language and tool for specifying and analyzing distributed systems. 
We define both a symbolic semantics for the synchronous composition of the components, capturing continuous behaviors and timing uncertainties using SMT, and a concrete semantics, for simulation, in rewriting logic, in a dmodular way to ensure consistency between these two semantics.


## CaseStudy: A Multirate Packet Delivery System
We perform the design and analysis of a collection of drones for packet
delivery using MH-SynchAADL. Each drone contains two controllers operating at diﬀerent periods, and diﬀerent drones can have diﬀerent periods. We use the combination of symbolic and concrete semantics to analyze overall system behavior and to verify individual controller logic. 

<center>
<img src="{{ site.research_imgs }}/aadl/system_description.png" alt="Packet Delivery Systems" width="50%"/>
</center>

The below figure illustrates the control logic of the mission and flight controller, where double circles indicate complete states. 
In the mission control logic, the state *choose_action* determin drone's behavior based on information from the other components and the environment. 
In the flight control logic, it calculates a new velocity or determin drone's state based on the *goal* and commands from the mission controller.

<center>
<img src="{{ site.research_imgs }}/aadl/control_logic.png" alt="Control Logic" width="50%"/>
</center>

### 1. Randomized Simulation

We analyze whether all drones can complete their tasks within a given time bound **τ**. We analyze the invariant property complete by randomized simulation with the concrete semantics. For τ = 9,000 ms, a counterexample is found within one minute, which shows that 9,000 ms is not enough to deliver all packets. For τ = 12,000 ms, no counterexample is found for 12 hours, which seems to indicate that τ = 12,000 ms is enough for delivering all packets.

```
invariant [complete]: ?init ==> (not clock.time >= 9000) or ?done in time 9000 ms;

proposition [done]: forall i in {1..7}. drone[i].mainC.mainProc.mainThrd @ done;
```

### 2. Functional Verification
We verify the following functional property of the drone
control logic: if another drone is nearby, the drone must hover within a time
bound τ to avoid a collision. We verify that no counterexample exists by symbolic reachability
analysis, which takes about 50 minutes.
```
invariant [func]: ?init ==> (not clock.time >= 240) or ?hover in time 240 ms;

proposition [hover]: drone[2].subC.subProc.subThrd @ hover;
```


### 3. Inductive Verification
We also verify that an invariant of the drone control logic
is satisfied for an unbounded time horizon. The approach is to verify an invariant
property of the following form for one synchronous step, which ensures that the
proposition indInv is an inductive invariant. We verify that no counterexample exists by symbolic reach-
ability analysis which takes about 2 seconds.
```
invariant [inductive]: ?indInv ==> ?indInv in time 120ms;

proposition [indInv]: ((not ?sendHalt) or ?close) and ?stationary;
```


## Formal Analysis of MH-SynchAADL
We evaluates the MH-SynchAADL tool by addressing the following questions
1. How effective is our symbolic analysis method compared to other state-of-the-art formal analysis tools for CPSs?
2. How effective is our portfolio analysis method for finding bugs?
3. How effective is our state merging technique?

We first compare our symbolic reachability anlaysis method with four reachability analysis tools for hybrid automata: HyComp, SpaceEx, Flow*, and dReach. For these tools, we have "encoded" the *synchronous designs* of the MH-SynchAADL models as networks of hybrid automata. Each component is modeled as a hybrid automaton with threee modes, where the behavior of a controller is encoded as a single transition.

<center>
<img src="{{ site.research_imgs }}/aadl/table1.png" alt="A MH-SynchAADL model" width="50%"/>
</center>

We evaluate the power of MH-SynchAADL for analyzing invariant properties.
We measure the time taken to find counterexamples in "faulty" models obtained by modifying the 
sampling and actuating times using three analysis functions. We use different time bounds for observing
analysis results with varying time bounds. 

<center>
<img src="{{ site.research_imgs }}/aadl/table2.png" alt="A MH-SynchAADL model" width="50%"/>
</center>

We have performed symbolic analysis to generate all reachable symbolic states up to given bounds,
with and without state merging. We measure the time (seconds) the size of accumultated SMT formulas (thousands),
the number of calls to the SMT solver, and the number of reachable symbolic states, with 
a timeout of 3 hours.

<center>
<img src="{{ site.research_imgs }}/aadl/table3.png" alt="A MH-SynchAADL model" width="50%"/>
</center>





## Ongoing
We are actively pursuing a range of research directions aimed at improving the modeling language, formal semantics, and analysis tools. Current ongoing efforts include:
* We are defining formal symbolic and concrete semantics for connections with $M$ environments and $N$ discrete controllers.
* We are extending the tool functionality to support checking constraints about MSYNC in our MH-SynchAADL tools.



## Contact
Jaehun Lee <a src="thkighie1224@postech.ac.kr">thkighie1224 (at) postech.ac.kr</a>

## References
* Rigorous Model Engineering of Hierarchical Multirate CPSs in Multirate HybridSynchAADL (ISOLA2024)
* Modeling and Formal Analysis of Virtually Synchronous Cyber-Physical Systems in AADL (STTT2022)
* An Extension of HybridSynchAADL and Its Application to Collaborating Autonomous UAVs (ISOLA2022)
* HybridSynchAADL: Modeling and Formal Analysis of Virtually Synchronous CPSs in AADL (CAV2021)

---
Last modified: 2025/05/26 02:40:42 (Jaehun Lee)
