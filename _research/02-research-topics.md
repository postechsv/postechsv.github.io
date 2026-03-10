---
---
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

<br>