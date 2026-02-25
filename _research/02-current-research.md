---
---   
<h3> Current Research </h3>

{% for proj in site.researchtopics %}
{% if proj.hidden == false %}
<div><a href="{{ proj.url }}"><h4>{{ proj.title }}</h4></a></div>
<div class="row topic-row">
<div class="col-md-4">
<a href="{{ proj.url }}">
<img src="{{ site.research_imgs }}/{{ proj.img-url }}" alt="" class="topic-img"></a>
</div>
<div class="col-md-8">
    <p>{{ proj.intro }}</p>
</div>
</div>
{% unless forloop.last %}
<hr class="dot">
{% endunless %}
{% endif %}
{% endfor %}
<div class="text-right">
    <a href="{{ site.baseurl }}/research/topics" class="btn btn-sm btn-default more-btn">More…</a>
</div>