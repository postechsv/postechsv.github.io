---
layout: researchpage
title: "Webassembly Program Model Checking"
intro: "WebAssembly (WASM) is a binary standard designed to execute high-performance programs on web browsers. Various verification techniques have been applied to WASM programs. In this study, we propose a model checking technique for WebAssembly programs using a rewriting logic-based Maude framework, aimed at verifying security properties related to concurrency and parallelism that have been challenging for existing methods."
img-url: "/wasmc/wasm.png"
hidden: True
---

## Introduction
<img src="{{ site.research_imgs }}/wasmc/introduction.png" width="100%">

WebAssembly (WASM) is a binary standard designed to execute high-performance programs on web browsers. WASM supports compilation from a variety of programming languages commonly used in commercial software development—such as C/C++, Python, and Rust—thereby enabling near-native performance within the browser environment. This capability has led to its widespread adoption in commercial applications ranging from advanced design tools like Figma and Photoshop to smart contract-related software.

However, the unique characteristics of the WASM language can give rise to security vulnerabilities that are not typically present in native languages. Although various verification techniques such as fuzzing, symbolic execution, and formal verification have been employed to analyze WASM programs, challenges remain—especially regarding properties related to concurrency and parallelism. In this study, we propose a model checking approach for WASM programs that leverages the Maude framework based on rewriting logic, specifically targeting these challenging security properties.


## Wasm Operational Semantics
<img src="{{ site.research_imgs }}/wasmc/semantics.png" width="100%">
This research is dedicated to formalizing the semantic structure of WebAssembly by employing a rewriting logic-based Maude language framework grounded in the official WebAssembly specification. By developing a precise Maude model, the project establishes a robust foundation for executing WebAssembly programs and systematically exploring their state spaces, thereby enabling rigorous analysis of program behavior and underlying computational semantics.

Building upon the constructed Maude model, the work further focuses on verifying the security properties of WebAssembly programs. To achieve this, an efficient model checking algorithm tailored specifically for WebAssembly is proposed and implemented. Advanced techniques such as partial order reduction are incorporated to mitigate challenges like state space explosion during the verification process, ensuring both scalability and accuracy in the model checking endeavors.

## SPEC2MAUDE: Automated Converting Wasm-DSL to Maude
<img src="{{ site.research_imgs }}/wasmc/converting.png" width="100%">
SPEC2MAUDE builds on the formal language WASM-DSL, which transforms the informal descriptions of the official WebAssembly specification into a precise and formal representation. This formalization facilitates the automatic generation of critical tools, including documentation renderers, interpreters, and testing frameworks, thus ensuring that the evolving specification is consistently and accurately represented across various applications.

In this work, the structure and semantics of WASM-DSL are thoroughly analyzed to derive transformation rules that map its constructs to corresponding elements in the Maude language. The developed tool automates this conversion process, enabling seamless updates in response to changes in the WebAssembly specification. Consequently, model checking of WebAssembly programs written in the latest syntax becomes an immediate and efficient process, reflecting the current state of the standard.

### IL2MAUDE
IL2MAUDE ingests the formally stated Intermediate Language (IL)—a DSL already distilled from WebAssembly—and parses its grammars and deduction rules.
It then automatically generates one-to-one Maude sorts, operators, and conditional rewrite rules, preserving typing judgments and evaluation contexts.
Because the mapping is machine-synthesized, any evolution of the IL spec transparently yields a fresh, executable Maude module, guaranteeing continuous alignment between theory and runnable code.

## Wasm Application Model Checking
<img src="{{ site.research_imgs }}/wasmc/application.png" width="100%">

The next step is to verify the distributed properties of Wasm modules. Because the core Wasm semantics lacks system-level definitions, we must first implement system call functionality at the Maude level. This approach also allows us to simulate multiple concurrent workers, enabling us to formally verify distributed Wasm applications.


## Experiment
### Execution WASM Program
<img src="{{ site.research_imgs }}/wasmc/fig4.png" width="40%">
Leveraging the formal Maude specification of WebAssembly, we executed elementary WASM programs to rigorously simulate their operational semantics through a rewriting logic framework that faithfully reproduces each computational step and validates the underlying semantic rules, while concurrently performing an extensive exploration of the state space to investigate the reachability of various program configurations. 

### LTL Model Checking Example
<img src="{{ site.research_imgs }}/wasmc/ex-mc.png" width="50%">
Once we finished testing the Wasm module, we moved on to model checking it. For this Fibonacci example, we set up an atomic proposition to verify the module's states. We wanted to confirm the property that "whenever the Wasm program finishes, the result is a correct Fibonacci number." To do this, we built the LTL property you see in the picture. Then, using Maude's model-check command, we successfully verified this liveness property for our simple Wasm program.


<!-- ## Reference
To be added.

## Examples
To be added -->

## Members / Contact
Hyuksoon Jang <a src="hyuksoon@postech.ac.kr">hyuksoon (at) postech.ac.kr</a>

---
Last modified: 2025/03/14 00:40:42 (Hyuksoon Jang)

