---
layout: researchpage
title: "Utilization of Activation Property for Efficient Incremental Neural Network Verification"
intro: "In this research, we propose an \"Activation Property\", a form of information that can be extracted from previous verification processes, and develop a framework that leverages this for efficient incremental verification of neural networks. The proposed framework allows SOTA Branch-and-Bound(BaB)-based verifiers to support incremental verification with minimal modifications while improving verification performance."
img-url: "/act-prop/incremental-verification.png"
hidden: false
---

### Introduction
Neural network (NN) verification is the process of checking whether, for every input, a (trained) neural network produces outputs as intended. Incremental NN verification focuses on improving efficiency of such tasks for similar neural networks by reusing information from previous verification processes. Some research has explored integrating the Branch-and-Bound (BaB) technique, widely used in SOTA non-incremental verifiers, into an incremental verification setting to avoid running the verification process from scratch every time. However, current approaches still fail to fully utilize valuable information from previous verification processes.

To address this challenge, our research proposes a new formalization of information that can be extracted, called the \"Activation Property\", and presents a framework that leverages it to further improve integration between BaB and the incremental settings. The proposed framework will allow for SOTA BaB-based verifiers to support incremental verification with minimal modification and enable verification of larger networks and harder properties.
 
---

### Problem
The BaB technique used in most SOTA non-incremental verifiers, works by (1) abstracting all non-linear activation functions within the network and (2) iteratively refine one activation function at a time into multiple linear functions. Below is an example of an abstraction and refinement for a ReLU function.

<img src="{{ site.research_imgs }}/act-prop/relu-refinement.png" width="75%">

The BaB process explores the activation scenario space; defined as a set of status of every activation functions refined during the iterative refinement process. The space is searched to check whether a countereaxmple (i.e. an input that results in an unintended output) exists, starting from an initial scenario where none of the activation functions are refined. Below is an illustration of scenario space search.

<img src="{{ site.research_imgs }}/act-prop/bab.png" width="75%">

Although prior research has attempted to utilize information generated from the above BaB process, such as the order in which activation functions are refined, <u>valuable information that could further accelerate the incremental verification, remains unexploited</u>.

---

### Contribution
In this research, we aim to:
1. Propose a formal definition of activation property, a new type of information that can be extracted from the BaB verification process.
2. Develop methods for utilizing activation properties to accelerate the BaB process.
3. Design and implement a database (DB)-based framework that stores activation properties extracted from previous verification processes and loads and applies them in subsequent verifications.

---

### Formalization of Activation Property
An activation property defines the relationship between refined activation functions at specific positions and of certain statuses, and how they restrict statuses of other activation functions. They can be represented as a logical implication and can be used to prune the scenario space by avoiding scenarios that violates them, improving verification performance. 

<img src="{{ site.research_imgs }}/act-prop/act-prop-ex-and-usage.png" width="75%">

Above is an example of an activation property, where if activation functions at positions $(1,5)$ and $(3,1)$ are of status $ACTIVE$ and $INACTIVE$ respectively, the activation function at position $(5,7)$ cannot be $ACTIVE$. As such, subsequent sub-space after the refinement of activation function at $(5,7)$ to $INACTIVE$ no longer needs to be explored.

---

### Framework
Below is a diagram of the overall design of our proposed framework, along with a brief explanation of each component. The components are grouped based on the phase in which they participate: either the activation property gathering phase (during the "previous" BaB processes) or the activation property utilization phase (during the "current" BaB processes).

<img src="{{ site.research_imgs }}/act-prop/framework.png" width="75%">

**Activation Property Gathering Phase**
- Generating activation properties
    - Extraction: In our reserach, we extract the activation properties by computing them from UNSAT scenarios (i.e. scenarios that were determined to contain no counterexamples) encountered during the scenario space search.
    - Generalization: Extracted activation properties, in their raw form, are often too specific to be effectively utilized. Therefore, a "generalization" process to extract the core of what made it UNSAT is essential. Corresponds to (1) in the figure above.
- Storing activation property: The generalized activation properties are stored in a database, allowing for loading and reusing in future processes. Corresponds to (2) in the figure above.

**Activation Property Utilization Phase**
- Loading of activation properties: At the start of the current verification process, stored activation properties applicable to the current verification is queried and loaded. Corresponds to (3) in the figure above.
- Utilization of activation properties: The loaded properties are then used to accelerate the BaB process. For example, by identifying UNSAT scenarios before major computations are necessary, and even before the naive BaB process determines them to be UNSAT.

---

### Ongoing Work
The following aspects of the framework are under active research and development.

**Generalization of Activation Property** While the formal definition and meaning of (generalized) activation properties and how they can be safely and soundly be applied in subsequent BaB processes have been established, the practical process of generalization and how they can be done efficiently is being worked on. 

**Guiding of Refinement** In addition to (prematurely) determining UNSAT scenarios, ways of guiding the refinement by using the stored properties are currently being explored. The goal is to develop a heuristic that guides the refinement process towards refinements that lead to faster UNSAT scenarios.

---

### Contacts
- Seunghyun Chae <a href="mailto:shchae7@postech.ac.kr">shchae7 (at) postech.ac.kr</a>
- Jueun Yeon <a href="mailto:jeyeon@postech.ac.kr">jeyeon (at) postech.ac.kr</a>

---
Last modified: 2025/10/15 02:40:42 (Seunghyun Chae)