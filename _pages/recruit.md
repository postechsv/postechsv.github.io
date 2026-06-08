---
title: "Join Us"
permalink: /join
layout: page
---

### Why FOREVER?

<div class="join-why-grid">
{% for why in site.data.join.join_why %}
<div class="join-why-card">
<h4>{{ why.title }}</h4>
<p>{{ why.desc }}</p>
</div>
{% endfor %}
</div>

<hr>

<h3>학부생 연구참여</h3>

<div class="join-mentor-grid">
{% for proj in site.data.join.ug_projects %}
<div class="join-mentor-card">
<span class="recruit-ug-tag">{{ proj.tag }}</span>
<h5>{{ proj.title }}</h5>
<p>{{ proj.desc }}</p>
{% if proj.mentor %}<span class="join-mentor-name">멘토: {{ proj.mentor }}</span>{% endif %}
</div>
{% endfor %}
</div>

<br>
