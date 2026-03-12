---
layout: page
sitemap: false
permalink: /research/topics/
---

### Research Topics

<div class="section-block container">
    {% for proj in site.researchtopics %}
    
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

<br>
