---
---   
<h3>Research Projects</h3>

{% for proj in site.researchtopics %}
  {% unless proj.hidden %}
    <div class="row mb-4" style="margin-left:0; margin-right:0">
      <a href="{{ proj.url }}"><h4>{{ proj.title }}</h4></a>
      <div class="col-md-4">
        <a href="{{ proj.url }}">
          <img src="/images/respic/{{ proj.img-url }}" alt="{{ proj.title }}"
               style="margin: 0 0 0rem; filter: drop-shadow(3px 3px 2px gray);">
        </a>
      </div>
      <div class="col-md-8">
        <p>{{ proj.intro }}</p>
      </div>
    </div>
    {% unless forloop.last %}
      <hr class="dot">
    {% endunless %}
  {% endunless %}
{% endfor %}

<button class="btn btn-link p-0" type="button"
        data-toggle="collapse"
        data-target="#hidden-projects"
        aria-expanded="false"
        aria-controls="hidden-projects">
  More…
</button>

<div class="collapse" id="hidden-projects">
  {% assign first = true %}
  {% for proj in site.researchtopics %}
    {% if proj.hidden %}
      {%- unless first -%}
        <hr class="dot">
      {%- endunless -%}
      <div class="row mb-4" style="margin-left:0; margin-right:0">
        <a href="{{ proj.url }}"><h4>{{ proj.title }}</h4></a>
        <div class="col-md-4">
          <a href="{{ proj.url }}">
            <img src="/images/respic/{{ proj.img-url }}" alt="{{ proj.title }}"
                 style="margin: 0 0 0rem; filter: drop-shadow(3px 3px 2px gray);">
          </a>
        </div>
        <div class="col-md-8">
          <p>{{ proj.intro }}</p>
        </div>
      </div>
      {% assign first = false %}
    {% endif %}
  {% endfor %}
</div>
