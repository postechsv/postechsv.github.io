---
title: "POSTECH SV Lab - Members"
permalink: /members
layout: members
---
### Faculty
<div style="margin-bottom: 20px;" class='container'>

{% assign number_printed = 0 %}
{% for member in site.data.faculty %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}

<div class="row" >
{% endif %}

<div class="col clearfix member-profile">
  <img src="/images/teampic/{{ member.photo }}" class="shadow p-3 mb-5 bg-white rounded" width="50%" style="float: left" />
  <h3 class="member-name" >{{ member.name }}</h3>
  <div class="member-info"> {{ member.info }} <br></div>
  <div class="member-link"><a href="mailto:{{ member.email }}">{{member.email}}</a></div>
  <div style="margin-bottom:7px;"></div>
  
{% if member.page %}
  <a href="{{ member.page }}"><span class="icon-home"></span></a>
{% endif %}
{% if member.git %}
  <a href="{{ member.git }}"><span class="icon-git"></span></a>
{% endif %}
{% if member.linkedin %}
  <a href="{{ member.linkedin }}"><span class="icon-linkedin"></span></a>
{% endif %}

</div>

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
<hr />

### Graduate Students

<div style="margin-bottom: 20px;" class='container'>
<div class="row" style="flex-wrap: wrap; display: flex;">

{% for member in site.data.students %}

  <div class="col member-profile student" >
    <img src="/images/teampic/{{ member.photo }}" class="shadow p-3 mb-5 bg-white rounded"/>
    <h4 class="member-name">{{ member.name }}    
    {% if member.page %}
      <a href="{{ member.page }}"><span class="icon-home"></span></a>
    {% endif %}
    {% if member.github %}
      <a href="{{ member.github }}"><span class="icon-git"></span></a>
    {% endif %}
    {% if member.linkedin %}
      <a href="{{ member.linkedin }}"><span class="icon-linkedin"></span></a>
    {% endif %}</h4>


    <div class="member-info">{{ member.info }} <br></div>
    <div class="member-link"><a href="mailto:{{ member.email }}">{{member.email}}</a></div>
    <div style="margin-bottom:7px;"></div>

  </div>


{% endfor %}
</div>
</div>
<hr />

<div style="margin-bottom: 20px;"></div>

### Former Members
- Jaeseo Lee:      Ph.D., February 2026
- Jia Lee:         Ph.D., December 2024 (now in Hyundai Rotem)
- Hyuksoon Chang:  MS, February 2026
- Sangki Kim:      MS, August 2022
- Moonhyeon Chung: MS, February 2021
- Sharon Kim:      MS, February 2020 (now in HD KSOE)
- Byeongjee Kang:  Undergraduate Intern, 2022 (now in CMU)
- Jungeun Lee:     Undergraduate Intern, Fall 2020
- Kanghee Park:    Undergraduate Intern, 2018 (now in UW-Madison)
- Woochang Jeong:  Undergraduate Intern, Spring 2018
- Minseok Kang

<br/> 
