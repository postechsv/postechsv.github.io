---
layout: researchpage
title: "Utilization of UNSAT DB for Efficient Incremental Neural Network Verification"
intro: "In this research, we aim to develop a framework that leverages \"UNSAT\" information from previous Branch-and-Bound (BaB)-based verification processes to improve the integration of the BaB technique with incremental verification. The proposed framework enables SOTA BaB-based verifiers to support incremental verification with minimal modifications while improving verification performance."
intro-temp: "..."
img-url: "/unsatdb/framework.png"
hidden: false
---

### Introduction
Neural network (NN) verification is the task of checking whether, for every input, a (trained) neural network produces outputs as intended. Incremental NN verification focuses on improving efficiency of such tasks for similar neural networks by reusing information from previous verification processes. Some research has explored integrating the Branch-and-Bound (BaB) technique, widely used in SOTA non-incremental verifiers, into an incremental verification setting to avoid running the verification process from scratch every time. However, current approaches still fail to fully utilize valuable information from previous verification processes.

Our research proposes to address this challenge by presenting a framework that leverages "UNSAT" information to further improve integration between BaB and the incremental settings. The proposed framework will allow for SOTA BaB-based verifiers to support incremental verification with minimal modification and enable verification of larger networks and harder properties.
 
---

### Problem
The BaB technique used in most SOTA non-incremental verifiers works by (1) abstracting all non-linear activation functions within the network, and (2) iteratively creating simpler sub-problems (referred from now on as configurations) by refining one activation function at a time. For each configuration, it checks whether a counterexample (i.e. a valid input that causes an unintended output) exists. Configurations that are found to contain no counterexample are denoted as "UNSAT" configurations. Below is a figure showing part of the process of iterative refinement and counterexample checking (i.e. the BaB process).

<img src="{{site.baseurl}}/images/respic/unsatdb/bab.png" width="75%">

Research has been done to utilize information generated from the above BaB process, such as the order in which activation functions are refined. However, <u>valuable information still exists that could further accelerate the incremental verification, which is currently not being used at all</u>.

---

### Contribution
The above-mentioned UNSAT configuration can be used to (prematurely) determine whether the BaB process needs to continue for an arbitrary configuration, without expensive computation. This can be done by simply computing the intersection between the two configurations, as the intersections do not need to be explored any further. 

<img src="{{site.baseurl}}/images/respic/unsatdb/intersection.png" width="50%">

Based on this insight, we aim to explore the following directions:
1. Developing a formal definition for the generalization of UNSAT configurations, a method that transforms them into an efficient representation suitable for application (referred from now on as UNSAT information).
2. Developing methods for applying UNSAT information to accelerate the BaB process.
3. Designing and implementing a database (DB)-based framework for storing UNSAT information from previous processes, and for loading and applying them in subsequent processes.

---

### Framework
Below is a diagram of the overall design of our proposed framework, along with a brief explanation of each component. The components are grouped based on the phase in which they participate: either the information gathering phase (during the "previous" BaB processes) or the information utilization phase (during the "current" BaB processes).

<img src="{{site.baseurl}}/images/respic/unsatdb/framework.png" width="75%">

**Information Gathering Phase**
- Generalization of UNSAT configuration: UNSAT configurations in their raw form are quite unwieldy and inefficient to deal with. Therefore, a "generalization" process to extract the core of what made it UNSAT is essential. Corresponds to (1) in the figure above.
- Storing of UNSAT information: The extracted/generalized UNSAT information is stored in a database so that they can be loaded and reused by future processes. Corresponds to (2) in the figure above.

**Information Utilization Phase**
- Loading of UNSAT information: At the start of the current verification process, stored UNSAT information applicable to the current verification is queried and loaded. Corresponds to (3) in the figure above.
- Utilization of UNSAT information: The loaded information is then used to accelerate the BaB process, for example by identifying UNSAT configurations, before major computations are necessary, and even before the naive BaB process determines them to be UNSAT. This is achieved by our UNSAT-based determining algorithm that leverages the insight about configuration intersection. Corresponds to (BaB process with UNSAT) in the figure above.

---

### Ongoing Work
The following aspects of the framework are currently being researched and worked on.

**Generalization of UNSAT Configuration** While the formal definition and meaning of (generalized) UNSAT configurations and how they can be safely and soundly be applied in subsequent BaB processes have been established, the practical process of generalization and how they can be done efficiently is being worked on. 

**Guiding of Refinement** In addition to (prematurely) determining UNSAT configurations, ways of guiding the refinement by using the stored UNSAT information are currently being explored. The goal is to develop a heuristic that guides the refinement process towards refinements that lead to faster UNSAT configurations (either via the above-mentioned UNSAT-based determining algorithm in our framework or by the naive BaB process itself).

---

### Contacts
- Seunghyun Chae <a href="mailto:shchae7@postech.ac.kr">shchae7 (at) postech.ac.kr</a>
- Jueun Yeon <a href="mailto:jeyeon@postech.ac.kr">jeyeon (at) postech.ac.kr</a>

---
Last modified: 2025/6/28 02:40:42 (Seunghyun Chae)