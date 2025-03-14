---
layout: researchpage
title: "Semantics and Analysis of PLC System"
intro: "This research focuses on defining the behavior of the whole PLC behavior including the PLC ST, multitask, external environment, and communication features."
img-url: "plc.jpg"
date: 2021-10-06

---

## Introduction
<img src="{{site.baseurl}}/images/respic/plc.jpg" width="70%">

A programmable logic controller (PLC) is commonly used in industrial control systems, and Structured Text (ST) serves as an imperative programming language for developing PLC software. Given the safety-critical nature of PLC applications, it is essential to formally verify PLC programs. A rewriting-based formal semantics for ST has been introduced for this purpose. In this project, we propose a bounded model checking technique for PLC ST programs, leveraging the rewriting-based semantics. We employ rewriting modulo SMT to symbolically examine LTL properties of ST programs concerning sequences of inputs and outputs, which may be infinite. The effectiveness of our approach has been demonstrated through a case study involving traffic lights.

Although recent developments in executable semantics for PLC ST have been made, existing approaches often overlook the complexity of multitasking and preemption. This project introduces executable semantics for PLC ST that supports preemptive multitasking. The formal analysis of multitasking programs, however, faces the challenge of state explosion. To address this issue, this project also presents state space reduction techniques to enhance the model checking of multitasking PLC ST programs.


## Members
*   Jaeseo Lee, POSTECH
*   Sangki Kim, POSTECH
*   Kyungmin Bae, POSTECH

## References

The following items show the publication from this project:

*   [Bounded Model Checking of PLC ST Programs using Rewriting Modulo SMT](https://dl.acm.org/doi/10.1145/3563822.3568016), Jaeseo Lee, Sangki Kim, Kyungmin Bae, FTSCS'12, 2022
*   [Formal Semantics and Analysis of Multitask PLC ST Programs with Preemption](https://link.springer.com/chapter/10.1007/978-3-031-71162-6_22), Jaeseo Lee, Kyungmin Bae, FM'09, 2024

