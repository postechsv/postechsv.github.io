---
title: "People"
permalink: /people
layout: page
---
### Faculty

<div class="section-block container">
  {% assign number_printed = 0 %}
  {% for member in site.data.people.faculty %}
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
  {% for member in site.data.people.students %}
    {% include member-card.html member=member role="student" %}
  {% endfor %}
  </div>
</div>

<hr>

### Alumni

<p class="people-subhead">Graduates</p>
<ul class="people-list">
{% for member in site.data.people.alumni %}
  {% unless member.degree contains "Intern" %}
  <li class="people-item">
    <span class="people-name">{{ member.name }}</span><span class="people-info">{% if member.degree %}<span class="people-degree">{{ member.degree }}</span>{% endif %}{% if member.date %}<span class="people-date">{{ member.date }}</span>{% endif %}{% if member.affiliation and member.affiliation != "POSTECH" %}<span class="people-affiliation">{{ member.affiliation }}</span>{% endif %}</span>
  </li>
  {% endunless %}
{% endfor %}
</ul>

<p class="people-subhead">Undergraduate Interns</p>
<ul class="people-list">
{% for member in site.data.people.alumni %}
  {% if member.degree contains "Intern" %}
  <li class="people-item">
    <span class="people-name">{{ member.name }}</span><span class="people-info">{% if member.date %}<span class="people-date">{{ member.date }}</span>{% endif %}{% if member.affiliation and member.affiliation != "POSTECH" %}<span class="people-affiliation">{{ member.affiliation }}</span>{% endif %}</span>
  </li>
  {% endif %}
{% endfor %}
</ul>

<hr>

### Collaborators

<ul class="people-list">
{% for collab in site.data.people.collaborators %}
<li class="people-item">
  <span class="people-name">{{ collab.name }}</span>
  <span class="people-info">{% if collab.affiliation %}<span class="collab-affiliation">{{ collab.affiliation }}</span>{% endif %}</span>
</li>
{% endfor %}
</ul>

<br>
