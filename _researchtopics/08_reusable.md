---
layout: researchpage
title: "RL-based Heuristics Learning for Model Checking"
intro: "This project leverages reinforcement learning to automatically learn search heuristics that improve the efficiency of model checking by guiding the exploration toward error states."
img-url: "/reusable/reusable.png"
hidden: True
---
<img src="{{site.baseurl}}/images/research/reusable/reusable.png" width="80%"/>

### Introduction

Model checking is a formal verification technique that exhaustively explores the state space of a system to verify whether it satisfies a given property. However, in practical verification scenarios—such as debugging cycles where errors are fixed and re-verified, or regression testing after system modifications—running full verification from scratch each time is highly inefficient.
{: .text-justify}

While directly reusing previously explored state spaces is challenging due to structural changes in the system, abstract knowledge about which states are likely to lead to errors can be transferred across similar systems. This research addresses this challenge by using reinforcement learning to automatically learn search heuristics based on predicate abstraction. The learned heuristics generalize across different system sizes and configurations, accelerating repeated verification tasks.
{: .text-justify}

This work focuses on falsification of safety properties, particularly deadlock detection in concurrent systems.
{: .text-justify}

---

### Problem

Repeated model checking during development and maintenance incurs high computational cost because each verification run explores large portions of the state space from scratch. Structural changes between system versions prevent direct reuse of explored states, and manually designed heuristics are often system-specific and do not generalize well.
{: .text-justify}

The core problem is how to automatically derive reusable, generalizable heuristics that guide state-space exploration efficiently toward error states across different instances of a system.
{: .text-justify}

---

### Approach

#### Predicate Abstraction for Feature Extraction

Predicate abstraction maps concrete states to fixed-dimensional Boolean vectors based on predefined predicates. Given \( n \) predicates, each concrete state is abstracted as:
{: .text-justify}

$$
\alpha(s) := \langle p_1(s), p_2(s), \ldots, p_n(s) \rangle
$$

This abstraction yields meaningful, property-relevant features and a fixed-dimensional representation independent of system size, enabling heuristic transfer across instances.
{: .text-justify}

#### Heuristic Learning with Reinforcement Learning

A Q-function \( Q(s, a) \) is trained on the abstract state space to estimate the likelihood of reaching an error state. The reward function assigns 1 to error states and 0 otherwise. Learned Q-values indicate the promise of state–action pairs for finding violations.
{: .text-justify}

Two learning approaches are used:
- **Q-table**: Explicitly stores Q-values for visited abstract state–action pairs.
- **Deep Q-Network (DQN)**: Uses a neural network to approximate the Q-function and generalize to unseen abstract states.
{: .text-justify}

#### Heuristic-Guided Search

The learned Q-function is integrated into a best-first search framework, where the state value is defined as:
{: .text-justify}

$$
\hat{V}(s) = \max_a \hat{Q}(\alpha(s), a)
$$

States with higher values are prioritized during exploration, directing the search toward potential error states.
{: .text-justify}

---

### Results

#### Experimental Setup

Experiments are conducted on the Dining Philosophers benchmark, a classic concurrency problem. Deadlock detection is used as the target safety property.
{: .text-justify}

Training is performed on an instance with \( N = 3 \), and evaluation is carried out on instances with \( N = 4 \) to \( N = 10 \). Thirteen predicates are defined to ensure a fixed-dimensional abstraction across all instances.
{: .text-justify}

Baselines include breadth-first search (BFS) and heuristic search with random priorities.
{: .text-justify}

#### Search Efficiency

Experimental results show that learned heuristics significantly reduce the number of explored states before detecting deadlock. DQN consistently outperforms both BFS and random search, especially as system size increases.
{: .text-justify}

For \( N = 10 \), DQN explores orders of magnitude fewer states than BFS and substantially fewer states than random search.
{: .text-justify}

#### Generalization and Runtime

Q-table performance degrades as system size increases due to low hit ratios for previously seen abstract states. In contrast, DQN maintains strong performance by generalizing to unseen states.
{: .text-justify}

Although DQN incurs neural inference overhead for small instances, overall verification time is significantly reduced for larger instances due to the dramatic decrease in explored states.
{: .text-justify}

---

### Contacts

- Hyeyoon Kang <a href="mailto:hyoonk@postech.ac.kr">hyoonk (at) postech.ac.kr</a>
- Byoungho Son <a href="mailto:byhoson@postech.ac.kr">byhoson (at) postech.ac.kr</a>

---

### References

1. H. Kang, B. Son, and K. Bae. *RL-based Heuristic Learning for Model Checking*. Korea Conference on Software Engineering (KCSE), 2026.

---
Last modified: 2026/02/25 (Hyeyoon Kang)