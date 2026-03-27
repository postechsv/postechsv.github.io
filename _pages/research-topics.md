---
title: "Research Topics"
permalink: /research/topics/
layout: page
sitemap: false
---

### Research Topics

<div class="section-block container">
    {% for proj in site.researchtopics %}
    
    <a href="{{ proj.url }}" class="topic-group-link">
        <div class="topic-card">
            <p class="topic-title">{{ proj.title }}</p>
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
    
    {% endfor %}
</div>

<br>
