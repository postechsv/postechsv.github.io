---
layout: researchpage
title: "Webassembly Program Model Checking"
intro: "웹 어셈블리는 웹 브라우저 상에서 고 성능의 프로그램을 실행하기 위해 고안된 바이너리 표준이다. 이러한 WASM 프로그램에 대해 Fuzzing, Symbolic execution, 그리고 정형 증명 등의 다양한 검증 기법들이 적용되어 왔다. 본 연구에서는 기존 제안된 기법이 해결하기 어려운 동시성 및 병렬성과 관련한 보안 성질들을 검증하기 위해 Rewriting logic 기반의 Maude 프레임워크를 활용한 웹 어셈블리 프로그램에 대한 모델 체킹 기법을 제안한다." 
img-url: "wasm.png"
date: 2024-10-01
---

## Introduction
<img src="{{site.baseurl}}/images/respic/wasm.png" width="100%">

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