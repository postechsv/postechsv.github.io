---
layout: researchpage
title: "Webassembly Program Model Checking"
intro: "WASM(WebAsssembly)는 웹 브라우저 상에서 고 성능의 프로그램을 실행하기 위해 고안된 바이너리 표준이다. 이러한 WASM 프로그램에 대해 Fuzzing, Symbolic execution, 그리고 정형 증명 등의 다양한 검증 기법들이 적용되어 왔다. 본 연구에서는 기존 제안된 기법이 해결하기 어려웠던 동시성 및 병렬성과 관련한 보안 성질들을 검증하기 위한 웹 어셈블리 프로그램 모델 체킹 기법을 제안한다." 
img-url: "wasm.png"
date: 2024-10-0성성
---

## Introduction
<img src="{{site.baseurl}}/images/respic/wasm.png" width="100%">

WASM(WebAsssembly)는 웹 브라우저 상에서 고 성능의 프로그램을 실행하기 위해 고안된 바이너리 표준이다. WASM는 상용 프로그램 작성에 널리 쓰이는 다양한 프로그래밍 언어(C/C++, Python, RUST 등)로부터의 컴파일을 지원하여 네이티브와 거의 동일한 성능으로 웹 브라우저 상에서 실행이 가능하다. 따라서 Figma나 Photoshop 등의 상용 프로그램 부터 smart contract 관련 소프트웨어까지 널리 사용되고 있다.

그러나 WASM 언어의 특성 상 네이티브 언어에서 존재하지 않았던 보안 취약점이 새롭게 발생할 수 있다. 이러한 WASM 프로그램에 대해 Fuzzing, Symbolic execution, 그리고 정형 증명 등의 다양한 검증 기법들이 적용되어 왔다. 본 연구에서는 기존 제안된 기법이 해결하기 어려운 동시성 및 병렬성과 관련한 보안 성질들을 검증하기 위해 Rewriting logic 기반의 Maude 프레임워크를 활용한 WASM 프로그램에 대한 모델 체킹 기법을 제안한다.


## Challenge
### WASM-DSL TO MAUDE
WASM-DSL은 WASM의 의미 구조 명세를 위해 기존 연구에서 제안 된 도메인 특화 언어이다. 본 연구에서는 모델 체킹을 위해 WASM 언어의 의미 구조를 Maude framework 내에서 직접 구현하여야 하였으나, WASM-DSL에 명세 된 의미 구조를 활용한다면 자동으로 Maude 언어로 구현 된 명세를 얻을 수 있다. 따라서, DSL의 문법과 의미 구조를 Maude에서의 동일한 의미로 1대1 변환하는 규칙을 세우고, 그에 따른 WASM2MAUDE 자동 변환 도구를 개발하고 있다. 

### State Explosion Problem
복잡한 소프트웨어는 실행 과정이 매우 복잡해질 수 있기 때문에 상태 폭발 문제가 발생할 가능성이 높다. 따라서, Partial order reduction 등의 상태 축소 기법을 활용하여 효과적으로 상태 공간의 크기를 줄이고, 탐색 시간을 최소화 해야한다. 본 연구에서는 WASM의 특성을 반영한 의미 있는 상태 축소 기법을 개발하고, 효율적으로 WASM 프로그램의 보안 성질을 검증할 수 있도록 한다.


## Reference
To be added.

## Examples
To be added

## Members / Contact
Hyuksoon Jang <a src="hyuksoon@postech.ac.kr">hyuksoon (at) postech.ac.kr</a>

---
Last modified: 2025/03/14 00:40:42 (Hyuksoon Jang)