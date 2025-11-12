---
layout: researchpage
title: "A Formal Executable Semantics of Promela for Deductive Verification"
intro: "This project defines formal semantics of Promela using the K-Framework, with a support for deductive verification"
intro-temp: "This project defines formal semantics of Promela using the K-Framework, with a support for deductive verification"
img-url: "/promela/overview.png"
date: 2024-10-01
hidden: true
---

## Introduction
PROMELA, the modeling language of SPIN, is widely used to
specify and model check finite-state concurrent systems but lacks support
for deductive verification. Our work establishes a faithful, executable
semantics of PROMELA in the K framework that enables code-level
deductive verification. To address the nontrivial interactions between
guarded nondeterminism and concurrency, we introduce Load-and-Fire,
an elegant semantic pattern that yields a modular, uniform treatment
of guarded nondeterminism, cross-process interference, and atomicity
in K. Our semantics enables the full suite of analyses provided by K,
including deductive verification of PROMELA programs with infinite
state spaces, a capability previously unavailable for PROMELA models.
We illustrate the approach with a case study in deductive verification of
an infinite-state concurrent system.

<img src="{{site.baseurl}}/images/research/promela/overview.png" width="80%"/>

## Operational Semantics of PROMELA in K

### The PROMELA Language

PROMELA is the input modeling language for the SPIN model checker and is widely used to analyze distributed and concurrent systems.
PROMELA’s official documentation (https://spinroot.com) defines its syntax and informal semantics, but it does not provide a machine-readable, formal specification.
{: .text-justify}

### The K Framework

The K Framework (https://kframework.org/) is an executable semantic framework where languages, type systems, and analysis tools are specified via configurations and rewrite rules. K excels at defining control-intensive features such as abrupt termination, exceptions, and continuations.
{: .text-justify}

### PROMELA Semantics in K

We aim to make our PROMELA semantics in K:

- **Executable**: Runs directly under the K toolchain without a separate interpreter. This enables easy testing and random simulation of PROMELA models.
{: .text-justify}
- **Modular**: Defines each semantic feature independently, so one can add or modify one feature without reworking the entire semantics. This modularity is crucial for handling PROMELA’s rich control primitives.
{: .text-justify}

## Load-and-Fire: Modular Semantics for Control Effects

PROMELA provides advanced control primitives—executability conditions, nondeterminism, and atomic blocks—that interact in subtle ways. 
We use a generic semantic pattern based on two fundamental rule types, 
**loading** and **firing**, to integrate each control primitive naturally and modularly.
{: .text-justify}


- **Loading Rules:**
  The loading rules restructures the computation without side-effects, 
  by lifting the linear-shaped K continuation into a **multiset** of nondeterministic continuations.
  This way, `if`/`do` statements are flattened, and each local branch are setup to be fired by the firing rules "upto" associativity and commutativity.
  {: .text-justify}

<img src="{{site.baseurl}}/images/research/promela/load.png" width="100%"/>

- **Firing Rules:**
  The fire rule executes the control effects:
  - **Executability:** Guarded by an executability condition.  
  - **Nondeterminism:** Selects between branches nondeterministically.  
  - **Atomicity:** Acquires a lock to enforce atomic execution.

<img src="{{site.baseurl}}/images/research/promela/fire.png" width="100%"/>



## Case Study: Mutual Exclusion of Lamport's Bakery Algorithm
We use K’s all-path reachability logic to perform deductive verification of PROMELA code against pre/post-conditions.
This approach enables deductive verification of distributed systems with infinitely many states,
for which SPIN-an explicit model checker-fails to verify.
{: .text-justify}

Our case study includes a nontrivial example of verifying mutual exclusion of 
<a href="https://en.wikipedia.org/wiki/Lamport%27s_bakery_algorithm"> Lamport's Bakery Algorithm </a>
with two concurrent processes:
{: .text-justify}
<img src="{{site.baseurl}}/images/research/promela/bakery.png" width="100%"/>

The specification shown below is an excerpt of the main all-path reachability claim for mutual exclusion.
With three other auxiliary claims,
The K Framework's deductive verifier is able to automatically discharge this main claim in approximately 5 minutes.
<img src="{{site.baseurl}}/images/research/promela/bakery-k.png" width="50%"/>

## Reference
1. <span id="ref-1">Byoungho Son, Kyungmin Bae, <em>A Formal Executable Semantics of PROMELA</em> (draft)



## Contact
Byoungho Son <a href="mailto:byhoson@postech.ac.kr">byhoson (at) postech.ac.kr</a>

---
Last modified: 2025/10/15 02:40:42 (Byoungho Son)
