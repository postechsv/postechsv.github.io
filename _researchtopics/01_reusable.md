---
layout: researchpage
title: "Reusable Model Checking"
intro: "Model checking usually takes very long time until a result is obtained. Even worse, model checking typically is quite a repetitive process, much like software development. Our main goal is to devise a learning based technique that exploits frequent logical patterns within a group of similar model checking instances to accelerate the search." 
intro-temp: "This research aims at accelerating model checking by learning useful patterns from previous search instances"
img-url: "reusable.png"
date: 2024-10-01
---

## Introduction
<img src="{{site.baseurl}}/images/respic/reusable.png" width="100%">

Model checking usually takes very long time until a result is obtained.
Even worse, model checking typically is quite a repetitive process, much like software development.
It is this heavy repetition of similar search instances each of which is also very heavy, that makes model checking impractical.
However, only little effort has been made to avoid such redundancies from the repetition.
Hence our main goal is to devise a learning based technique that exploits frequent logical patterns within a group of similar model checking instances to accelerate the search.

Our work is largely inspired by directed model checking approach, where the search for a goal state is prioritized by a carefully crafted heuristic function.
An obvious limitation to this approach is on how to come up with a decent heuristic function; this will again require a heavy repetition of trial-and-error, even equipped with domain knowledge of humans, due to an often large parameter space.
This is where learning can play its role: automatically design a heuristics by observing the data.


## Framework
Our framework automatically learns search heuristics for reachability analysis by reinforcement learning. To do this, we need models for training, and models for heuristic search. Then we simulate the training model in various ways, and observe which actions lead to reachability goals (i.e. safety violations). From these observations, we learn high-level patterns to achieve reachabiliity goals in forms of $q$-functions. This process is known as q learning. Once learning is done, we obtain a value function $V : State \rightarrow R$ defined over states, which is used as the priority for search in different models.

## Challenge
### Extension to temporal logic
For the simplest case of reachability goals, designing an admissible reward function for the goal over the transitions is immediate: e.g. give reward 1 for goal states and 0 otherwise. This is because whether a goal is reached can be detected simply by looking at the most recent state. In other words, reachability goal corresponds to Markovian rewards. But how can one encode e.g. an LTL properties into a reward function on an MDP?


## References
To be added.

## Examples
To be added.

## Contact
Byoungho Son <a src="byhoson@postech.ac.kr">byhoson (at) postech.ac.kr</a>

---
Last modified: 2024/10/5 02:40:42 (Byoungho Son)