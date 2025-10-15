---
layout: researchpage
title: "TLS Model-based Testing using Maude"
intro: "We use model-based testing approach to test TLS libraries using Maude. By using Maude, we can generate more various and complicated test scenario automatically. We build an automated tool to test several TLS libraries." 
intro-temp: "This research aims at automatic testing for TLS libraries"
img-url: "/tls/model-based-testing.png"
hidden: false
---

## Introduction
Transport Layer Security (TLS) is a core protocol that ensures secure communication over the Internet, widely used in applications such as HTTPS. However, many vulnerabilities (e.g., CVE-2022-25640) arise when implementations fail to comply with the RFC requirements (MUST statements). Therefore, verifying the correctness of TLS implementations is crucial.

Previous research has employed formal verification, fuzzing, combinatorial testing, and differential testing to analyze the security of TLS. While effective to some extent, these approaches fail to bridge the gap between specification and implementation or to capture complex attack scenarios such as man-in-the-middle (MITM) attacks.
Our research combines Maude-based formal modeling with model-based testing (MBT). We build a formal model of TLS and automatically generate test scenarios that are executed against real TLS libraries, ensuring compliance with protocol specifications.


## TLS Protocols
TLS establishes an encrypted and authenticated channel between a client and a server through a handshake process that negotiates cryptographic parameters. Libraries such as OpenSSL and WolfSSL implement TLS based on specifications like RFC 5246 (TLS 1.2) and RFC 8446 (TLS 1.3). Many vulnerabilities are caused by deviations from these specifications, making rigorous testing essential.

<center>
<img src="{{ site.research_imgs }}/tls/tls_protocol.png" alt="TLS Protocols" width="30%"/>
</center>

## Existing Works
### Formal Verification on TLS Specifications
There has been a great deal of work conducted in the complementary analysis spheres pertinent to TLS 1.3.
There is a work offering a symbolic model and accompanying analysis of draft 10 of the TLS 1.3 specification, using the Tamarin prover. The ProVerif models on draft 18 presented by Bhargavan et al include most TLS 1.3 modes, and cover rich threat models by considering downgrade attacks (both with weak crypto and downgrade to TSL 1.2). However they do not consider all modes, as they do not consider the post-handhsake client authentication mode. Their analysis did not uncover the potential mismatch between clienet and server view.


### Testing TLS implementations
Some prior work extended the stateful fuzzing approach and use input/output Finite State Machines (FSM) as a behavioral abstraction of the PUT and use *differential fuzzing* to detect potential bugs or manually inspect the inferred FSM. They are tailored to capture bypass authentication attacks or other violations of the intended state machine flows. Since the FSM is not specifically designed for security, the security policy violations detected by FSM-based techniques are not necessarily security attacks and require manual inspection, those techniques thus also inherit the detection problem.


## Model-based Testing
Model-based testing (MBT) is a software testing methodology where a formal or abstract model of the system’s behavior is used to automatically generate test cases. In this approach, a model describes the system in terms of states, transitions, and input/output actions, reflecting its expected behavior and requirements. Test cases are systematically derived by exploring different paths through the model, ensuring broad coverage of possible system behaviors. Since the model is closely tied to the system’s specifications, MBT provides strong traceability to requirements and helps validate both functional and security properties. Moreover, MBT enables high levels of automation, as the test generation and execution processes can be driven entirely by the model without extensive manual effort.

<center>
<img src="{{ site.research_imgs }}/tls/model-based-testing.png" alt="TLS Protocols" width="30%"/>
</center>


## Maude Model
We model TLS clients and servers as Maude objects with attributes such as protocol version, cipher suites, keys, and message buffers.
-	Server/Client Components: Each role (client, server, attacker) is defined as a class with its own state and attributes.
```
class TLS | version : ProtocolVersion, ciphers : List{CipherSuite}, publicKey : Set{Key}, privateKey : Set{Key}, 
            certificates : List{Certificate}, extensions : Extension, masterSecret : Nonce, sessionId : Nonce, 
            ...
            inputBuffer : List{Msg}, outputBuffer : List{Msg}, hash : Nonce, nonceCtr : Nat .

class Client | clientState : ClientState .
class Server | serverState : ServerState .

subclass Client Server < TLS

```

-	Behavioral Rewrite Rules: TLS message exchanges (e.g., ServerHello, ClientKeyExchange) are described as rewrite rules that define state transitions and message generation.
```
rl [buildServerHello]
   < SI : Server | serverState : V3S-READY, nonceCtr : N, version : PV, cipher : CS, extensions : EXT, sessionId : SID, outputBuffer : MSGS >
=> < SI : Server | serverState : V3S-CH, nonceCtr : s N, outputBuffer : MSGS :: htype(server-hello) version(PV) suites(CS) random(nonce(CI, N)) extension(EXT) > .

crl [processServerHello]
   < CI : Client | clientState : V3C-READY, nonceCtr : N, version : PV, cipher : CS, extensions : EXT, sessionId : SID, inputBuffer : MSG :: MSGS >
=> < CI : Client | clientState : V3C-CH, inputBuffer : MSGS > 
if validVersion(PV, MSG)
/\ validCipherSuite(CS, MSG)
/\ validSessionId(SID, MSG) 
/\ validExtension(EXT, MSG) .

```



## Scenario Generation
RFC 5246 and RFC 8446 specify many MUST statements (e.g., “A client receiving an unsupported cipher suite MUST abort the handshake”). We encode these requirements into Maude-based formal properties, which are used to generate targeted test scenarios.

For example, RFC 8446 says 
"The single cipher suite selected by the server from the list in ClientHello.cipher_suites. A client which receives a cipher suite that was not offered MUST abort The handshake with an “illegal_parameter” alert."
We generate the following test scenario:

### Example 1: Send change-cipher-spec before sending client-key-exchange 
```

connect(SI);
var v0 := clienthello(TLS12, ECDHE_ECDSA_WITH_AES_128_CCM, random(CI,0), noSessionId, no-compression, no-extension)
send(SI, v0);
var v1 := recv(SI);
assert(v1.handshakeType == server-hello);
assert(v1.version == v0.version);
...
var v2 := recv(SI);
assert(v2.handshakeType == certificate);
...
var v3 := recv(SI);
assert(v3.handshakeType == server-key-exchange);
...
var v4 := recv(SI);
assert(v4.handshakeType == server-hello-done);
...
var v5 := changeCiperSpec();
send(v5,SI);

var v6 := recv(SI);
assert(v6.contentType == alert);
assert(v6.alertLevel == fatal);
assert(v6.alertDesc == handshake-failure);
close(SI);
```

### Example 2: Send server-finished after sending server-hello
```
connect(CI);
var v0 := recv(CI);
assert(CI.handshakeType == client-hello);
...
var v1 := serverHello(v0.TLS, v0.cipherSuite, random(SI,0), sessionId(SI,1), no-compression,no-extension);
send(v1, CI);
var v2 := serverfinished(ms(0), hash(v0));
send(v2, CI);
var v3 := recv(CI);
assert(v3.contentType == alert);
assert(v3.alertLevel == fatal);
assert(v3.alertDesc == handshake-failure);
close(CI);
```


## Scenario Execution
TLS-Attacker Library: We use the TLS-Attacker framework to execute the generated test scenarios. TLS-Attacker allows flexible message construction and dynamic modification during the handshake process. The scenarios derived from Maude are translated into TLS-Attacker scripts, which interact with real TLS libraries (e.g., OpenSSL) to verify compliance with protocol requirements.

<center>
<img src="{{ site.research_imgs }}/tls/execution.png" alt="TLS Protocols" width="30%"/>
</center>

## Contact
Jaehun Lee <a src="thkighie1224@postech.ac.kr">thkighie1224 (at) postech.ac.kr</a>

---
Last modified: 2025/07/24 02:40:42 (Jaehun Lee)