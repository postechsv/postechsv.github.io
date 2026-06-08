---
title: "Research"
permalink: /research
layout: page
---

### Research Areas

<div class="research-areas-grid">
{% for area in site.data.research.research_areas %}
<div class="research-area-card">
<h4>{{ area.title }}</h4>
<p>{{ area.desc }}</p>
{% if area.papers %}
<ul class="rep-papers">
{% for paper in area.papers %}
  <li>{{ paper.title }}{% if paper.venue and paper.venue != "" %} <span class="rep-paper-venue">{{ paper.venue }}</span>{% endif %}</li>
{% endfor %}
</ul>
{% endif %}
</div>
{% endfor %}
</div>

<hr>

### Major Projects

<div class="research-projects">
{% for proj in site.data.research.projects %}
<div class="research-project-item">
<span class="research-project-badge">{{ proj.badge }}</span>
<div class="research-project-info">
<h5>{{ proj.title }}</h5>
<p>{{ proj.desc }}</p>
</div>
</div>
{% endfor %}
</div>

<br>
