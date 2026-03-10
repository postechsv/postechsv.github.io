---
title: "POSTECH SV Lab - Members"
permalink: /members
layout: members
---
### Faculty

<div class="section-block container">

  {% assign number_printed = 0 %}

  {% for member in site.data.faculty %}

  {% assign even_odd = number_printed | modulo: 2 %}

  {% if even_odd == 0 %}

  <div class="row">

    {% endif %}

    {% include member-card.html member=member role="faculty" %}

    {% assign number_printed = number_printed | plus: 1 %}

    {% if even_odd == 1 %}

  </div>

  {% endif %}

  {% endfor %}

  {% assign even_odd = number_printed | modulo: 2 %}

  {% if even_odd == 1 %}

  </div>

  {% endif %}

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

### Former Members

<ul class="former-list">

{% for member in site.data.alumni %}

  <li>

    <span class="former-item">

      <span class="former-name">

        <b>{{ member.name }}</b>

      </span>

      <span class="former-info">

        {% if member.degree %} {{ member.degree }}{% endif %}

        {% if member.date %}, <span class="former-date">{{ member.date }}</span>{% endif %}

        {% if member.affiliation %} <span class="former-affiliation">(now in {{ member.affiliation }})</span>{% endif %}

      </span>

    </span>

  </li>

{% endfor %}

</ul>

<br>