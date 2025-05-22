---
layout: researchpage
title: "SMT-Based Model Checking for Signal Temporal Logic"
intro: "This research focuses on developing a formal foundation and verification technique for signal temporal logic (STL), which specifies properties of continuous signals in hybrid systems. The goal is to enable robust bounded model checking of general STL properties, with correctness guarantees up to given bounds."
authors: Geunyeol Yu, Jia Lee, Kyungmin Bae
img-url: "stlmc-arch3.svg"
use_math: false
date: 2024-01-01
katex: True
hidden: false
---

### Introduction

{: .rpost-subject}

Signal temporal logic (STL) is a temporal logic used to specify properties of continuous signals. STL has been widely applied in specifying, monitoring, and testing properties of hybrid systems that exhibit both discrete and continuous behavior. However, model checking techniques for hybrid systems have primarily been limited to invariant and reachability properties. In this work, we present a novel logical foundation for STL, introduce bounded model checking algorithms and a tool for general STL properties of hybrid systems. With this new foundation, the robust STL
model checking problem can be reduced to the satisfiability of a first-order logic formula. This allows us to develop the first model checking algorithm for STL that can guarantee the correctness of STL up to given bounds. We demonstrate the eﬀectiveness of STLmc on various hybrid system case studies.
{: .text-justify}

---

### Logical Foundations and Algorithms

We have developed a novel logical foundation for STL and SMT-based bounded robust model checking algorithms on this foundation [<a href="#ref-1">1</a>,<a href="#ref-2">2</a>,<a href="#ref-3">3</a>]. Our logical foundation includes: (i) syntactic separation, decomposing an STL formula into components, with each component depending exclusively on separate segments of a signal; (ii) signal discretization, ensuring a complete abstraction of a signal through a set of discrete elements; and (iii) &#949;-strengthening, reducing robust STL model checking to Boolean STL model checking. We combine these foundational techniques to develop the algorithms, which are refutation-complete, meaning that they can guarantee correctness up to given bounds. Based on these algorithms, we implement a framework shown in <a href="#fig-stlmc">Figure 1</a>, called [STLmc](https://stlmc.github.io).
{: .text-justify}

<figure id="fig-stlmc" style="text-align: center; margin: 2em 0;">
  <img src="{{site.baseurl}}/images/respic/stlmc-arch3.svg" width="95%" alt="An SMT-based robust bounded STL model checking framework.">
  <figcaption style="margin-top: 0.5em; font-size: 1.1em;">
    <strong>Figure 1.</strong> An SMT-based robust bounded STL model checking framework.
  </figcaption>
</figure>


**Logical foundations.** A temporal logic formula &#x1D711; is called syntactically separated if &#x1D711; is a Boolean combination of formulas, each of which depends only on a disjoint part of the underlying time domain (such as the past, present, or future). This decomposition is well-known for LTL. However, it becomes more challenging for logics with temporal operators constrained by time intervals, such as MTL and STL; no generic method has been proposed for separating such formulas into disjoint parts. In [<a href="#ref-1">1</a>], we address this problem and generalize the STL syntax by adding extra time constraints, called STL with global time (STL-GT), and propose a syntactic separation procedure based on the Boolean semantics of STL. 
{: .text-justify}

For bounded signals with finite variable points (excluding Zeno behaviors), the satisfaction of a temporal logic formula must depend on a finite number of sampled time points. Intuitively, a discretization of a signal is a finite set of time points that equivalently captures the meaning of a temporal logic formula. Although signal discretization methods have been proposed for various temporal logics, they cannot be directly applicable to STL. The main diﬃculty arises from the timed until operator, which often results in overly "fine" discretized signals, hindering eﬃcient model checking of hybrid systems. In [<a href="#ref-2">2</a>], we propose a novel technique to build a complete yet reasonably coarse discretization for STL.
{: .text-justify}

**Algorithms.** We combine the these two foundational techniques to develop SMT-based bounded model checking algorithms for STL [<a href="#ref-1">1</a>,<a href="#ref-2">2</a>]. The core of our algorithms involves translating an STL formula into a decidable fragment of first-order logic for a signal with a finite number of variable points, where the satisfaction of each subformula can change finitely, while the value of the signal may continuously change over time. By leveraging syntactic separation, it becomes obvious to translate an STL formula into a quantifier-free first-order formula in linear real arithmetic.
{: .text-justify}

Despite these advances, the underlying Boolean semantics limits the applicability of these techniques to hybrid systems because small perturbations in signals can cause the system to violate properties verified by Boolean STL model checking. To address this, in [<a href="#ref-3">3</a>], we propose robust STL model checking, which verifies whether the robustness degree of an STL formula exceeds a robustness threshold &#949; > 0 for all possible system behaviors. We reduce the robust STL model checking problem to Boolean model checking using &#949;-strengthening (making the problem harder to be true by &#949;). We can then apply the refutation-complete Boolean model checking algorithms to solve this problem.
{: .text-justify}

---

### Experiments

{: .rpost-subject}

We conducted two experiments: one evaluates the results of robust STL model checking, and the other compares the performance of STLmc for invariant properties with existing reachability analysis tools for hybrid automata.
{: .text-justify}

**Robust STL model checking.** We consider the following hybrid automata models: load management of batteries (Bat), network of water tanks (Wat), autonomous driving of cars (Car), railroad gate controller (Rail), network of thermostats (Thm), filtered oscillator (Oscil-N), spacecraft rendezvous (Space-N), and navigation system (Nav-N). We consider three variants with diﬀerent continuous dynamics (e.g., Bat-L has linear dynamics, Bat-P has polynomial dynamics, and Bat-N has ODE dynamics). For each model, we use three STL formulas. For the discrete bound, we set 𝑁 = 20 for linear models, 𝑁 = 10 for polynomial models, and 𝑁 = 5 for ODE models. We use diﬀerent time bounds &#120591; and robustness thresholds &#949; depending on the model's characteristics. As the underlying SMT solver, we use Yices for linear and polynomial models, and dReal for ODE models. We set a timeout of 60 minutes.
{: .text-justify}

The experimental results are summarized in Table 1, where &#120591; denotes the time bound, 𝑁 denoted the discrete bound, and |&#936;|
denotes the size of the SMT encoding &#936; (in thousands). For the model checking results, &#x22A4; indicates that no counterexample was found up to bound 𝑁, and &#x22A5; indicates that a counterexample was found at some 𝑘 &le; 𝑁. As shown in the table, our tool can perform robust model checking of nontrivial STL formulas for hybrid systems with various continuous dynamics. ODE models generally require more time than linear and polynomial models due to the high computational costs of handling nonlinear constraints.
{: .text-justify}

<figure style="text-align: center; margin: 2em 0;">
  <figcaption style="margin-bottom: 0.5em; font-size: 1.1em;">
    <strong>Table 1.</strong> Experimental results for robust STL model checking.
  </figcaption>
  <img src="{{site.baseurl}}/images/respic/stlmc-exp1.svg" width="95%" alt="Experimental results for robust STL model checking.">
</figure>

**Comparison with reachability analysis tools.** We compare the performance of STLmc in verifying invariant properties against four hybrid automata reachability analysis tools: HyComp, SpaceEx, Flow*, and dReach. For each model, we consider a true invariant property so that reachability analysis explores all possible behaviors up to given bounds. We measure the execution times (in seconds) for analyzing the invariant properties up to a given bound with a timeout of 60 minutes. Since each tool has a diﬀerent notion of bounds, we use the number of discrete jumps 𝑁 and the maximum time horizon 𝜏 as the common bound parameters, which are "encoded" in the models if needed. We use the same settings for the discrete bound 𝑁 and time horizon 𝜏 as in the previous experiment. 
{: .text-justify}

The experimental results are summarized in Table 2, with execution times in seconds. T/O denotes a timeout. Because HyComp only supports linear models, it is not included in the results for polynomial and ODE models. Similarly, SpaceEx supports only linear ODEs and is therefore not applicable (N/A) for models with nonlinear ODEs (Car, Rail, and Wat). As shown in the table, our tool has comparable performance to the other tools for the invariant properties. For example, for the autonomous car system with ODE dynamics (Car-N), both STLmc and dReach verify the invariant property within 1 minute, whereas Flow* times out. This is because the systems’s dynamics are complex, involving trigonometric dynamic. For linear models, dReach cannot solve some problems in time. This problem is because dReach enumerate all possible paths and there are too many scenarios with a larger discrete bound 𝑁. STLmc can solve all the problems in time, including linear models with large discrete bounds.
{: .text-justify}

<figure style="text-align: center; margin: 2em 0;">
  <figcaption style="margin-bottom: 0.5em; font-size: 1.1em;">
    <strong>Table 2.</strong> Execution time for analyzing invariant properties (in seconds).
  </figcaption>
  <img src="{{site.baseurl}}/images/respic/stlmc-exp2.svg" width="70%" alt="Execution time for analyzing invariant properties (in seconds).">
</figure>

---

### References

1. <span id="ref-1">K. Bae, J. Lee, <em>Bounded model checking of signal temporal logic properties using syntactic separation</em>, Proc. ACM Program. Lang. 3 (POPL) (2019) 51:1–51:30, <a href="https://doi.org/10.1145/3290364">https://doi.org/10.1145/3290364</a>.</span>
1. <span id="ref-2">J. Lee, G. Yu, K. Bae, <em>Efficient SMT-based model checking for signal temporal logic</em>, in: IEEE/ACM International Conference on Automated Software Engineering, IEEE, 2021, pp. 343–354, <a href="https://ieeexplore.ieee.org/document/9678719">https://ieeexplore.ieee.org/document/9678719</a>.</span>
1. <span id="ref-1">G Yu., J. Lee, K. Bae. <em>STLmc: Robust STL model checking of hybrid systems using SMT</em>, in: International Conference on Computer Aided Verification, Springer, 2022, Volume 13371, <a href="https://doi.org/10.1007/978-3-031-13185-1_26">https://doi.org/10.1007/978-3-031-13185-1_26</a>.</span>
2. <span id="ref-1">J. Lee, G Yu., K. Bae. <em>SMT-based robust model checking for signal temporal logic</em>, Science of Computer Programming, 2025, Volume 246, <a href="https://doi.org/10.1016/j.scico.2025.103332">https://doi.org/10.1016/j.scico.2025.103332</a>.</span>