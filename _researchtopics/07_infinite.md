---
layout: researchpage
title: "Model Checking of Infinite-State System"
intro: "This project leverages reinforcement learning to automatically learn search heuristics that improve the efficiency of model checking by guiding the exploration toward error states."
img-url: "/infinite/image.png"
hidden: false
---

# Model Checking of Infinite-State System

<img src="{{site.baseurl}}/images/respic/infinite/image.png" width="100%">

## Introduction

Model checking infinite-state systems remains a challenging problem in formal verification. The potentially unbounded state spaces make traditional exhaustive exploration techniques impractical or impossible. While standard model checking algorithms work well for finite-state systems, they break down when faced with the complexity of infinite states.

Our work extends Narrowing-based Folding Model Checking techniques to tackle these challenges. We build on symbolic representation approaches that can handle infinite sets of states without requiring explicit enumeration. By combining constrained term representations with user-definable reduction rules, we've developed methods that preserve bisimulation properties while expanding the range of verifiable systems.

This approach allows us to analyze systems that may not satisfy the finite variant property required by traditional narrowing techniques, while still maintaining the soundness of verification results.

## Framework

Our approach extends the capabilities of existing narrowing-based techniques to handle a wider spectrum of infinite-state systems. The framework consists of three main components:

### Extended State Representation

We represent states as pairs consisting of a pattern and a constraint, where a single symbolic term encodes potentially infinite sets of concrete states. For example, a pattern representing a sequence of natural numbers combined with a constraint on their sum can represent all possible term instances matching this structure and satisfying the constraint. This representation lets us handle equational theories beyond those supported by standard narrowing approaches.

### Incomplete Propositions

To enhance expressiveness, we introduce incomplete propositions. These are propositions where we explicitly define when they evaluate to a particular value while leaving other cases undefined. For instance, we might define when a proposition evaluates to true for specific patterns, but leave its behavior undefined for other patterns.

When performing narrowing with these propositions, we generate extended terms with appropriate constraints. This approach enables more precise symbolic representation and facilitates theory transformation on rewriting rules to ensure appropriate narrowing transitions.

### User-Definable State Space Reduction

The theoretical foundation for our reduction rules is bisimulation, ensuring that the reduced system preserves essential behaviors of the original. A reduction rule is valid when the reduced transition system maintains a bisimulation relation with the original system.

Our algorithm performs narrowing on the terms in the rule and verifies whether the results satisfy the user-defined reduction relation. This approach mirrors the definition of bisimulation, where states are related if they can simulate each other's behavior.

## Future Research Directions

### Integration of SMT Solving for Counterexample Validation

A key limitation in our current framework is the lack of mechanisms to verify the validity of counterexample traces. Integrating SMT solving techniques would allow us to check constraint satisfiability in final states, confirming whether a counterexample represents a genuine system behavior.

By translating verification problems into logical formulas, we can leverage SMT solvers to validate counterexamples. This is particularly valuable for our constrained term representation, where checking constraint consistency is crucial for confirming execution path feasibility.

### Automatic Generation of Valid Reduction Rules

Finding reduction rules that transform infinite-state systems into finite ones while preserving essential properties remains difficult. These rules must maintain system behaviors while effectively reducing state space.

We're investigating techniques to automatically generate such rules by analyzing state space structure and identifying patterns suitable for abstraction. This involves developing algorithms that can recognize bisimulation-preserving transformations and verify their correctness, making our approach more accessible for a broader range of verification problems.

## Contact
Kyunwoo Kim <a src="kkw423@postech.ac.kr">kkw423 (at) postech.ac.kr</a>