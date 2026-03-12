---
title: "POSTECH SV Lab - Research"
permalink: /research
layout: page
---

### Overview

#### Logic and Algorithms for Software Verification.
Software is everywhere, but it can be buggy, unpredictable, and vulnerable to attacks. The goal of software verification is to ensure the reliability, security, and safety of software. In this research, we study automated algorithms for software verification, based model checking, computational logic, and satisfiability modulo theories (SMT).

#### Modeling and Verification of Autonomous Cyber-Physical Agents.
Autonomous cyber-physical agent systems, such as self-driving cars and drones, must meet strong safety requirements. The goal of this study is to develop techniques to model and verify these systems before actual implementation, which can avoid possible accidents during prototype testing.

#### Automated Analysis of Safety-Critical AI Software.
AI-based technologies such as deep neural networks are being applied to safety-critical applications, e.g., self-driving cars and air traffic control systems. The subject of this research is to develop new techniques to prove the safety requirements of AI-based systems, to prevent accidents or security problems caused by software errors.

<hr>

<div class="news-header">
  <h3>Current Research</h3>
  <a href="{{ site.baseurl }}/research/topics" class="btn btn-sm btn-default more-btn">More…</a>
</div>

{% assign visible_topics = site.researchtopics | where: "hidden", false %}

<div class="section-block container">
  {% for proj in visible_topics %}
  <a href="{{ proj.url }}" class="topic-group-link">
    <div class="topic-card">
      <h4>{{ proj.title }}</h4>
      <div class="row topic-row">
        <div class="col-sm-4 col-md-4">
          <img src="{{ site.research_imgs }}/{{ proj.img-url }}" alt="" class="topic-img">
        </div>
        <div class="col-sm-8 col-md-8">
          <p class="topic-intro">{{ proj.intro }}</p>
        </div>
      </div>
    </div>
  </a>
  {% unless forloop.last %}
  <hr class="dot">
  {% endunless %}
  {% endfor %}
</div>

<hr>

### LabCumentary

<div class="video-container">
  <iframe
    width="70%"
    height="350px"
    src="https://www.youtube.com/embed/lEl3TBvUmOk"
    title="소프트웨어 검증 연구실 (Software Verification Lab)"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

<br>