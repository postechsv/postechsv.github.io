---
layout: researchpage
title: "RL-based Heuristics Learning for Model Checking"
intro: "This project leverages reinforcement learning to automatically learn search heuristics that improve the efficiency of model checking by guiding the exploration toward error states."
intro-temp: "Accelerating model checking through reinforcement learning-based heuristic learning"
img-url: "/reusable/reusable.png"
date: 2024-10-01
---

## Introduction
Model checking is a powerful graph search technique used to verify system properties and detect bugs. However, as the complexity of a system increases, the state space grows exponentially, rendering exhaustive search methods impractical. Our research addresses this challenge by using reinforcement learning to learn effective search heuristics. This approach is inspired by directed model checking, where heuristics are given, not learned.

## Framework and Methodology
Our framework is built on reinforcement learning, specifically employing Q-learning to learn and refine search heuristics for model checking.

- **Learning Search Heuristics with Q-Learning:**  
  We train a Q-function \( Q(s, a) \) to estimate the expected reward for taking an action a in a given state s. The training process involves:
  - **Data Collection:**  
    Simulating model checking on smaller, manageable models to gather state transitions and observe which actions lead to error states.
  - **Reward Function Design:**  
    Designing a reward scheme where reaching an error state is assigned a high reward, while non-critical transitions receive lower or zero rewards. This reward structure incentivizes the discovery of errors.
  - **Policy Learning:**  
    Optimizing the Q-function so that it approximates the optimal policy. From the learned Q-values, we derive a value function \( V: \text{State} \rightarrow \mathbb{R} \) that is used to rank states according to their potential to lead to an error.

- **Generalization via Abstraction:**  
  To address the challenge of state-space explosion, we incorporate abstraction techniques by grouping similar states. This abstraction reduces the complexity of the search space and enables the learned heuristics to generalize from smaller models to larger, more complex systems.

- **Integration with Model Checking:**  
  The learned heuristic is integrated into the model checking process by prioritizing state exploration based on the value function \( V(s) \). Instead of performing an exhaustive search, the model checker focuses on states with higher estimated rewards, thereby accelerating error detection.

## Preliminary Experiment

**Setup:**
- The experiment uses the one-third rule (OTR) configuration with various k/n settings, where k is the threshold and n is the number of nodes.
- Training is performed with Q-learning on an OTR(2/3) model.  
  Each Q-table entry corresponds to a predicate abstracted state (e.g., 4 predicates yield 2⁴ = 16 states).
- A heuristic search is then executed against the concrete model and the abstract model of OTR, respectively.  
- timeout = 24 hours

**Results Summary:**
- **Baseline (BFS):** A simple depth-first search (BFS) approach fails for all configurations, resulting in a timeout.
- **RL with Predicate Abstraction:** Applying reinforcement learning (RL) directly to the predicate abstracted system yields successful results for some configurations (OTR(3/5) and OTR(3/6)), while timing out for others.
- **RL with Predicate Abstraction<sup>2</sup>:** Incorporating more abstraction over the predicate abstracted states further improves performance across all configurations.

| OTR Configuration | Baseline (BFS) | RL w/ PA | RL with PA<sup>2</sup> |
|-------------------|----------------|----------------|---------------------|
| OTR(3/5)          | Timeout        | 8444           | 265                 |
| OTR(3/6)          | Timeout        | 96360          | 446                 |
| OTR(4/6)          | Timeout        | Timeout        | 109330              |
| OTR(4/7)          | Timeout        | Timeout        | 38092               |


## Future Work
Future research will focus on:
- **Extending to Temporal Logic:**  
  Developing reward functions that can encode temporal logic properties, thus addressing not only reachability (safety) but also liveness requirements.
- **Refining Abstraction Techniques:**  
  Enhancing state abstraction methods to improve the generalization capabilities of the learned heuristics.
- **Broadening Evaluation:**  
  Testing the reinforcement learning approach on a wider variety of models to better understand its effectiveness and limitations in different contexts.

## References
To be added.

## Examples
To be added.

## Contact
Byoungho Son <a href="mailto:byhoson@postech.ac.kr">byhoson (at) postech.ac.kr</a>

---
Last modified: 2024/10/5 02:40:42 (Byoungho Son)