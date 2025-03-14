---
layout: researchpage
title: "Webassembly Program Model Checking"
intro: "WebAssembly (WASM) is a binary standard designed to execute high-performance programs on web browsers. Various verification techniques have been applied to WASM programs. In this study, we propose a model checking technique for WebAssembly programs using a rewriting logic-based Maude framework, aimed at verifying security properties related to concurrency and parallelism that have been challenging for existing methods."
img-url: "wasm.png"
date: 2024-10-05
---

## Introduction
<img src="{{site.baseurl}}/images/respic/wasm.png" width="100%">

WebAssembly (WASM) is a binary standard designed to execute high-performance programs on web browsers. WASM supports compilation from a variety of programming languages commonly used in commercial software development—such as C/C++, Python, and Rust—thereby enabling near-native performance within the browser environment. This capability has led to its widespread adoption in commercial applications ranging from advanced design tools like Figma and Photoshop to smart contract-related software.

However, the unique characteristics of the WASM language can give rise to security vulnerabilities that are not typically present in native languages. Although various verification techniques such as fuzzing, symbolic execution, and formal verification have been employed to analyze WASM programs, challenges remain—especially regarding properties related to concurrency and parallelism. In this study, we propose a model checking approach for WASM programs that leverages the Maude framework based on rewriting logic, specifically targeting these challenging security properties.


## Challenge
### WASM-DSL TO MAUDE
WASM-DSL is a domain-specific language introduced in previous research to specify the semantic structure of WASM. While implementing the semantic structure of WASM directly within the Maude framework is necessary for model checking, leveraging the semantic specifications defined in WASM-DSL allows for the automatic generation of corresponding Maude specifications. To this end, we have formulated a set of transformation rules that map the syntax and semantics of the DSL directly into Maude. Based on these rules, we are developing an automated conversion tool, WASM2MAUDE.

### State Explosion Problem
Complex software systems often exhibit highly intricate execution processes, which can lead to the state explosion problem. To mitigate this issue, it is essential to employ state reduction techniques—such as partial order reduction—that effectively decrease the size of the state space and minimize search times. In our study, we develop a state reduction strategy tailored to the specific characteristics of WASM, thereby enabling the efficient verification of its security properties.


## Reference
To be added.

## Examples
To be added

## Members / Contact
Hyuksoon Jang <a src="hyuksoon@postech.ac.kr">hyuksoon (at) postech.ac.kr</a>

---
Last modified: 2025/03/14 00:40:42 (Hyuksoon Jang)