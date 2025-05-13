---
---   

<h3>Research Projects</h3>

{% for proj in site.researchtopics %}
{% if proj.hidden == false %}
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
{% endif %}
{% endfor %}
<!-- <h4>Last updated: {{ proj.date | date: "%F" }}</h4> -->


<button class="btn btn-link p-0 text-right" type="button"
                data-toggle="collapse"
                data-target="#hidden-projects"
                aria-expanded="false"
                aria-controls="hidden-projects">
    More…
</button>

<div class="collapse" id="hidden-projects">
{% for proj in site.researchtopics %}
{% if proj.hidden %}
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
{% endif %}
{% endfor %}
</div>
