---
layout: researchpage
title: "SMT-Based Model Checking for Signal Temporal Logic"
intro: "This research focuses on modeling cyber-physical systems (CPS) that rely on virtual synchrony for coordination and timing accuracy. The goal is to improve the reliability of CPS in critical applications such as aerospace or automotive systems, where precision and safety are paramount."
authors: Jia Lee, Geunyeol Yu, Kyungmin Bae
img-url: "stlmc-arch.jpg"
use_math: true
date: 2024-01-01
katex: True
hidden: false
---

### Abstract

{: .rpost-subject}

Signal temporal logic (STL) is widely used to specify and analyze properties of cyber-physical systems (CPS) with continuous behaviors. We present an algorithm that can guarantee the correctness of CPS up to bounds. We reduce the bounded model checking problem of an STL formula for a hybrid automaton to the satisfiability of a first-order encoding using the algorithm and solve the satisfiability problem using a SMT solver. We implement the algorithm. The tool supports Z3 and Yices2 as the underlying SMT solver. We have compared the performance of our algorithm [[1](#reference)] and the previous algorithm [[2](#reference)]. Our algorithm outperforms other methods in most cases.
{: .text-justify}

---

### Overall architecture

{: .rpost-subject}

<div class="text-center">
  <img src="{{site.baseurl}}/images/respic/stlmc-arch.jpg" width="80%" alt="overview of the architecture">
</div>

### Experimental results

{: .rpost-subject}

We consider the following hybrid automata models: autonomous cars (Car), thermostat (The), water tank (Wat) systems, load management of batteries (Bat), and railroad gate controllers (Bat), and railroad gate controllers (Rai). We use two variants of continuous dynamics: linear and polynomial of degree 2. For each model, we use four STL formulas:
$$\varphi^d_{\top}$$ holds, and $$\varphi^d_{\bot}$$ has a counterexample, where $$d$$ represents the nesting depth of the formula. More details on the benchmark models can be found in [1].
{: .text-justify}

<div class="text-center">
  <img src="{{site.baseurl}}/images/respic/stlmc-expr.jpg" width="70%" alt="experimental result">
</div>

### Reference

1. Jia Lee, Geunyeol Yu, and Kyungmin Bae. Efficient SMT-Based model checking for signal temporal logic. [[paper](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9678719), [github](https://github.com/stlmc/stlmc/tree/ase2021)]
1. Kyungmin Bae and Jia Lee. Bounded model checking of signal temporal logic properties using syntactic separation. Proceedings of the ACM on Programming Languages, vol. 3, no. POPL, pp. 1–30, 2019. [[paper](https://dl.acm.org/doi/pdf/10.1145/3290364), [github](https://github.com/cee5539/stlMC/tree/popl2019)]

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>