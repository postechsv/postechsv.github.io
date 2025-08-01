---
layout: researchpage
title: "A Framework for Maude-SMT Integration"
intro: "This research focuses on extending rewriting modulo SMT to support efficient and customizable symbolic analysis of infinite-state systems. The goal is to overcome the limitations of the existing Maude-SMT interface by enabling satisfying assignment generation, formula simplification, folding-based state-space reduction, and broader theory support including uninterpreted functions."
authors: Geunyeol Yu, Kyungmin Bae
img-url: "/maude-se/maude-se-arch.svg"
use_math: false
date: 2025-05-23
katex: True
hidden: true
---

### Introduction

{: .rpost-subject}

Rewriting modulo SMT integrates term rewriting with SMT solving to enable symbolic analysis of infinite-state systems. In this framework, states are terms constrained by SMT formulas, and transitions are defined via conditional rewrite rules. While Maude supports this through the Maude-SMT interface, the current implementation has several limitations: it lacks support for satisfying assignments and formula simplification, only handles linear arithmetic, excludes uninterpreted functions, does not support folding reduction, and is difficult to customize due to its dependence on Maude's internal C++ code.
{: .text-justify}

---

### Framework Design and Implementation

We present a new SMT extension of Maude, called Maude-SE, which extends the existing Maude-SMT wrapper interface with additional capabilities, including folding, support for uninterpreted functions, and concrete witness generation. A key feature of Maude-SE is an abstract Python connector that allows users to integrate Maude with SMT solvers and customize functionality entirely at the Python level—without requiring any knowledge of Maude's internal implementation or recompilation of its source code.
{: .text-justify}

<figure id="fig-maude-se" style="text-align: center; margin: 2em 0;">
  <img src="{{ site.research_imgs }}/maude-se/maude-se-arch.svg" width="95%" alt="The architecture of Maude-SE.">
  <figcaption style="margin-top: 0.5em; font-size: 1.1em;">
    <strong>Figure 1.</strong> The architecture of Maude-SE.
  </figcaption>
</figure>

**Design.** The architecture of Maude-SE is illustrated in <a href="#fig-maude-se">Figure 1</a>. The original Maude-SMT wrapper interface provides basic functions such as *checkSat*, for checking satisfiability, and *maude2smt*, for translating Maude terms into SMT solver-compatible data structures. Maude-SE extends this interface by introducing new functionalities, including *genAssn*, which retrieves satisfying assignments, and *addSmtSymbs*, which supports additional SMT theory symbols.
{: .text-justify}

To achieve both flexibility and efficiency, Maude-SE introduces two abstract Python connectors. The *CmdAdapter* connector defines solver-independent functionalities for SMT solving, specifying how the solver should behave. The *Converter* connector handles the translation between Maude terms and SMT solver data structures and is designed to be implemented using the maude Python binding.
{: .text-justify}

Developing such abstract connectors is challenging. Although the Maude Python binding allows user-defined Python functions to be invoked directly from within Maude, it requires an understanding of Maude's internal data structures. To address this, Maude-SE delegates performance-critical tasks—such as term manipulation and search graph construction—to the C++ level, while keeping SMT solver interactions at the Python level.
{: .text-justify}


**Implementation.** Our framework has been implemented to enjoy the best of both worlds: flexible capability of SMT solving using each SMT solver's Python API, and eﬃcient exploration of symbolic search space using Maude. Our abstract connector hides details about Maude's internal implementation, so users only need to undestand the Python API for the target SMT solver. The main routine for symbolic reachability analysis and folding are implemented at the C++ level and use the maude library to invoke user-defined Python functions for SMT solving.
{: .text-justify}

In addition, Maude-SE introduces several enhanced modeling and analysis capabilities: (i) integration with four widely used SMT solvers: CVC4 [9], CVC5 [8], Yices2 [16], and Z3 [13], whereas the original Maude implementation supports only CVC4 and Yices2; (ii) support for the theory of equality and uninterpreted functions, which were not available originally. This includes a Maude-level interface for declaring arbitrary free symbols as SMT-level symbols.
{: .text-justify}

<!-- ---

### Analysis Commands

Maude-SE provides various analysis commands, including *check*, *show model*, *smt-search*, and *show smt-path*. The *check* command determines the satisfiability of Boolean formulas. The *show model* command returns the satisfying assignment, if any, for the last check command. The *smt-search* command performs symbolic reachability analysis, potentially with folding. Finally, the *show smt-path* command displays a path
for the last search result. Given a module M, a Boolean formula ψ, and an (optional) SMT theory Th, the check command determines the satisfiability of ψ under the theory Th:
{: .text-justify} -->

---

### Case Study

{: .rpost-subject}

We demonstrate the flexibility of our interface with a case study on connecting a Z3 solver. We first show a simple implementation for the two Python components *CmdAdapter* and *Converter*, and then explain how to customize the implementation of *CmdAdapter* for diﬀerent purposes.
{: .text-justify}

**Implementing CmdAdapter.** The following class Z3CmdAdapter implements the base abstract `class CmdAdapter`. A Z3 solver object, assigned to
`self.solver`, is used to check the satisfiability of the input formulas (`checkSat`) and to build a satisfying assignment (`getModel`). We store an SMT formula in the state space as is (`mkConst`).
{: .text-justify}

<figure style="text-align: center; margin: 2em 0;">
  <img src="{{ site.research_imgs }}/maude-se/maude-se-case-study1.svg" width="70%">
</figure>


**Implementing Converter.** The following class Z3Converter implements the base
abstract `class Converter`. In the constructor, we initialize four Python maps:
`_symb_map` and `_const_map` are used to translate Maude symbols, and `_sort_map`
and `_u_sort` store Maude's sort information for translation.
{: .text-justify}

<figure style="text-align: center; margin: 2em 0;">
  <img src="{{ site.research_imgs }}/maude-se/maude-se-case-study2.svg" width="70%">
</figure>

The `dag2term` function recursively builds a Z3 data structure from a Maude
term representing an SMT formula, using two auxiliary functions `_declSort`
and `_declFunc`. The `dag2term` function takes an additional argument *special*,
which contains the theory name and sorts of each uninterpreted function symbol. 
{: .text-justify}

<figure style="text-align: center; margin: 2em 0;">
  <img src="{{ site.research_imgs }}/maude-se/maude-se-case-study3.svg" width="70%">
</figure>

The `term2dag` function converts a Z3 data structure representing an SMT
formula into a Maude term. We use the `parseTerm` function from the maude Python binding, which parses a string and builds a Maude term. For this purpose, the auxiliary function `toString` creates a string from a Z3 data structure.
{: .text-justify}

<figure style="text-align: center; margin: 2em 0;">
  <img src="{{ site.research_imgs }}/maude-se/maude-se-case-study4.svg" width="70%">
</figure>

**Customizing CmdAdapter.** The following shows three variations of the `mkConst`
function implemented using diﬀerent Z3 tactics. The first function uses rewriting
to obtain a simplified formula. The other functions use a syntactic/semantic
equality check to remove subformulas that are subsumed by context.
{: .text-justify}

<figure style="text-align: center; margin: 2em 0;">
  <img src="{{ site.research_imgs }}/maude-se/maude-se-case-study5.svg" width="70%">
</figure>

The following shows two variants of the `checkSat` function implemented
using the Z3 tactics. The first function simplifies an input formula and checks if the formula reduces to true. The other function first
applies Gaussian elimination before checking the satisfiability of a formula.
{: .text-justify}

<figure style="text-align: center; margin: 2em 0;">
  <img src="{{ site.research_imgs }}/maude-se/maude-se-case-study6.svg" width="70%">
</figure>

---

### References

1. <span id="ref-2">G. Yu, K. Bae, <em>A Flexible Framework for Integrating Maude and SMT Solvers Using Python</em>, in: International Workshop on Rewriting Logic and its Applications, 2024, <a href="https://doi.org/10.1007/978-3-031-65941-6_10">https://doi.org/10.1007/978-3-031-65941-6_10</a>.</span>
1. <span id="ref-1">G Yu., J. Lee, K. Bae. <em>Maude-SE: a Tight Integration of Maude and SMT solvers</em>, in: International Workshop on Rewriting Logic and its Applications, 2024, <a href="https://wrla2020.webs.upv.es/pre-proceedings.pdf#page=2270">https://wrla2020.webs.upv.es/pre-proceedings.pdf#page=227</a>.</span>