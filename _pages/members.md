---
title: "Members"
permalink: /members
layout: page
---
### Faculty

<div class="section-block container">
  {% assign number_printed = 0 %}
  {% for member in site.data.faculty %}
    {% assign even_odd = number_printed | modulo: 2 %}
    {% if even_odd == 0 %}<div class="row">{% endif %}
    {% include member-card.html member=member role="faculty" %}
    {% assign number_printed = number_printed | plus: 1 %}
    {% if even_odd == 1 %}</div>{% endif %}
  {% endfor %}
  {% assign even_odd = number_printed | modulo: 2 %}
  {% if even_odd == 1 %}</div>{% endif %}
</div>

<hr>

### Graduate Students

<div class="section-block container">
  <div class="row student-row">
  {% for member in site.data.students %}
    {% include member-card.html member=member role="student" %}
  {% endfor %}
  </div>
</div>

<hr>

### Interns

<div class="section-block container">
  <div class="row student-row">
  {% for member in site.data.interns %}
    {% include member-card.html member=member role="student" %}
  {% endfor %}
  </div>
</div>

<hr>

### Alumni

<p class="former-subhead">Graduates</p>
<ul class="former-list">
{% for member in site.data.alumni %}
  {% unless member.degree contains "Intern" %}
  <li class="former-item">
    <span class="former-name">{{ member.name }}</span><span class="former-info">{% if member.degree %}<span class="former-degree">{{ member.degree }}</span>{% endif %}{% if member.date %}<span class="former-date">{{ member.date }}</span>{% endif %}{% if member.affiliation and member.affiliation != "POSTECH" %}<span class="former-affiliation">{{ member.affiliation }}</span>{% endif %}</span>
  </li>
  {% endunless %}
{% endfor %}
</ul>

<p class="former-subhead">Undergraduate Interns</p>
<ul class="former-list">
{% for member in site.data.alumni %}
  {% if member.degree contains "Intern" %}
  <li class="former-item">
    <span class="former-name">{{ member.name }}</span><span class="former-info">{% if member.date %}<span class="former-date">{{ member.date }}</span>{% endif %}{% if member.affiliation and member.affiliation != "POSTECH" %}<span class="former-affiliation">{{ member.affiliation }}</span>{% endif %}</span>
  </li>
  {% endif %}
{% endfor %}
</ul>

<br>
