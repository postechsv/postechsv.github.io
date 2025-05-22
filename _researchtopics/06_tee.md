---
layout: researchpage
title: "Formal Specification of Trusted Execution Environment APIs"
intro: "This research focuses on presenting a formal specifcation of TEE APIs by leveraging Maude, to support formal analysis and verificatin of TEE applications."
intro-temp: "..."
img-url: "/tee/tee-ree.png"
hidden: false
---

## Introduction
Trusted execution environments (TEEs) have emerged as a key technology in the cybersecurity domain. A TEE provides an isolated environment in which sensitive computations can be executed securely. Trusted applications running in TEEs are developed using standardized APIs that many hardware platforms for TEE adhere to. However, formal models tailored to standard TEE APIs-required for rigorous verification-are not well developed. As there exists a huge representation gap between the informal (standard) specification and a formal model to be developed.

Our research addresses this challenge of reducing this gap by leveraging a very expressive modeling language, called Maude, which supports powerful object-oriented specification to present a formal specification of TEE APIs.


## Formal Specification of TEE APIs
We focus on Trusted Storage API and Cryptographic Operations API, which are foundational to mobile and IoT applications. 
Since TEE API is mainly specified using objects and their interactions, we use Maude's object-oriented specification to naturally specify the architecture as a collection of objects and the behavior as rewrite rules. 

<!-- ### Specifying Trusted Storage & Cryptogrpahic Operations API Behaviors -->
In the TEE API standard, resources such as files, keys, and cryptographic processes are expressed as objects in an abstract way. For example, a *cryptographic operation* abstracts a cryptographic process and includes attributes describing its details and status (e.g. the cryptographic algorithm in use). We model *cryptographic operation* as an instance of class **CryptoOp** and Cryptographic Operations APIs' behavior is modeled as rewrite rules defining how these instances are created/deleted and modified.

Below are (1) the Maude formal specification of *cryptographic operation* as **CryptoOp** with attributes such as *algorithm* denoting the algorithm in use and (2) the rewrite rule for an API, TEE_AllocateOperation that allocates a new *cryptographic operation* given an algorithm identifier, an operation mode, and a maximum key size.

<img src="{{site.baseurl}}/images/respic/tee/obj-spec-example.png" width="50%">

<img src="{{site.baseurl}}/images/respic/tee/api-spec-example.png" width="50%">


## Case Study on Formal Analysis of MQT-TZ
We demonstrate the effectiveness and feasibility of our formal model using MQT-TZ, an open-source TEE application that secures MQTT, a topic-based publish-subscribe IoT protocol. For formal analysis, we model MQT-TZ's entities (brokers, publishers, and subscribers) as Maude objects and specify the overall protocol's behavior, including data collection, communication between clients, and broker-side processing as rewrite rules.

We analyze several security requirements under two threat models: an out-of-memory threat and a message modification threat. By expressing security requirements as linear temporal logic (LTL) formulas and applying Maude's built-in model checking method, we identify several security vulnerabilities. Below are (1) the LTL properties for MQT-TZ and (2) the model checking results, with red highlighting property P2 and P3 violations indicating possible vulnerabilities. By analyzing the violations, we have discovered that TA can panic during the message re-encryption and that when insufficient memory is detected, the TA finalizes the re-encryption with an error and returns a re-encrypted message containing (dummy) data. 

<img src="{{site.baseurl}}/images/respic/tee/ltl-prop.png" width="50%">

<img src="{{site.baseurl}}/images/respic/tee/before-patch-results.png" width="50%">

We implement code-level patches and confirm their integrity by performing the LTL model checking again. Below are (1) the proposed patches and (2) the model checking results showing that P2 and P3 are no longer violated.

<img src="{{site.baseurl}}/images/respic/tee/after-patch-results.png" width="50%">


## Members
- Geunyeol Yu <a href="mailto:rgyen@postech.ac.kr">rgyen (at) postech.ac.kr</a>
- Seunghyun Chae <a href="mailto:shchae7@postech.ac.kr">shchae7 (at) postech.ac.kr</a>


## References
- Geunyeol Yu, Seunghyun Chae, Kyungmin Bae, and Sungkun Moon. Formal Specification of Trusted Execution Environment APIs. International Conference on Fundamental Approaches to Software Engineering (FASE), 2024. [[paper](https://link.springer.com/chapter/10.1007/978-3-031-57259-3_5), [github](https://github.com/postechsv/tee-formal-analysis)]

---
Last modified: 2025/5/23 02:40:42 (Seunghyun Chae)
