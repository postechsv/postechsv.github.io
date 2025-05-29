---
layout: researchpage
title: "Utilization of UNSAT Configuration for Efficient Incremental Neural Network Verification"
intro: "In this research, we aim to develop a framework that leverages \"UNSAT\" information from previous BaB-based verification processes to improve the integration of the Branch-and-Bound technique with incremental verification, which allows for SOTA BaB-based verifiers to support incremental verification with minimal modifications"
intro-temp: "..."
img-url: "/unsatdb/framework.png"
hidden: false
---

### Introduction
Neural network (NN) verification is the task of checking whether, for every input, a (trained) neural network produces outputs as intended. Incremental NN verification focuses on improving efficiency of such tasks for similar neural networks by reusing information from previous verification processes for subsequent processes.
The Branch-and-Bound (BaB) technique is widely used in state-of-the-art (SOTA) non-incremental neural network verifiers. While some research has explored integrating BaB into incremental settings, current approaches still fail to fully utilize valuable information from previous verification processes.

Our research proposes to address this challenge by presenting a framework that leverages "UNSAT" information to further improve integration between BaB and the incremental settings, enabling incremental verification of larger networks and harder properties. This framework will also allow for SOTA BaB-based verifiers to support incremental verification with minimal modifications.
 

### Under-utilized BaB information for Incremental Verification
**BaB Technique** The BaB technique works by (1) abstracting all non-linear activation functions within the network, and (2) iteratively creating simpler sub-problems (referred to as configurations) by refining one activation function at a time. For each configuration, it checks whether a counterexample (i.e. a valid input that causes an unintended output) exists. Configurations that are found to contain no counterexample are denoted as "UNSAT" configurations.

<img src="{{site.baseurl}}/images/respic/unsatdb/bab.png" width="75%">

**Point of Under-utilization** Using "UNSAT" configuration, whether the BaB process (of refinement) needs to continue for an arbitrary configuration can be determined without expensive computation and prematurely. This can be done by simply computing the intersection between the two configurations, as the intersections do not need to be explored any further in the BaB process.

<img src="{{site.baseurl}}/images/respic/unsatdb/intersection.png" width="50%">

### Framework
To utilize the "UNSAT" configuration, we propose a framework that stores "UNSAT" configuration data from previous verification processes and loads them for use in subsequent processes. Below is an overview of the framework.

<img src="{{site.baseurl}}/images/respic/unsatdb/framework.png" width="75%">

**Storing & Generalization of UNSAT** UNSAT configuration in its raw form is quite unwieldy and inefficient. Therefore, a "generalization" process to extract the core of what made it UNSAT is essential. The extracted "UNSAT" data is then stored in a database.

**Loading & Utilization of UNSAT** Stored "UNSAT" data applicable (i.e. generated from previous verification processes of similar neural networks) to the current verification is queried and loaded. The loaded data is then used to check whether configurations are UNSAT before major computation takes place and even before the naive BaB process determines it to be UNSAT.


### Members
- Seunghyun Chae <a href="mailto:shchae7@postech.ac.kr">shchae7 (at) postech.ac.kr</a>
- Jueun Yeon <a href="mailto:jeyeon@postech.ac.kr">jeyeon (at) postech.ac.kr</a>

---
Last modified: 2025/3/29 02:40:42 (Seunghyun Chae)