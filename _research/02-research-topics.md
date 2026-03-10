---
---
<div class="news-header">
  <h3>Current Research</h3>
  <a href="{{ site.baseurl }}/research/topics" class="btn btn-sm btn-default more-btn">More…</a>
</div>

{% assign visible_topics = site.researchtopics | where: "hidden", false %}

<div class="section-block container">
  {% for proj in visible_topics %}
  <div><a href="{{ proj.url }}"><h4>{{ proj.title }}</h4></a></div>
  <div class="row topic-row">
  <div class="col-sm-4 col-md-4">
  <a href="{{ proj.url }}">
  <img src="{{ site.research_imgs }}/{{ proj.img-url }}" alt="" class="topic-img"></a>
  </div>
  <div class="col-sm-8 col-md-8">
      <p><a class="topic-intro-link" href="{{ proj.url }}">{{ proj.intro }}</a></p>
  </div>
  </div>
  {% unless forloop.last %}
  <hr class="dot">
  {% endunless %}
  {% endfor %}
</div>

<br>
