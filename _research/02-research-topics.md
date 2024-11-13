---
---   

<h2>Research Projects</h2>

{% for proj in site.researchtopics %}

<div class="row" style="margin-left:0; margin-right:0">
    <a href="{{ proj.url }}"><h4>{{ proj.title }}</h4> </a>
    
<div class="col-md-4">
<a href="{{ proj.url }}">
<img src="/images/respic/{{ proj.img-url }}" alt="" style="margin: 0 0 0rem; filter: drop-shadow(3px 3px 2px gray);;"></a>
</div>
<div class="col-md-8">
    <p>{{ proj.intro }}</p>
</div>
</div>
{% unless forloop.last %}
<hr class="dot">
{% endunless %}
{% endfor %}
<!-- <h4>Last updated: {{ proj.date | date: "%F" }}</h4> -->
