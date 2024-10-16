---
title: "News"
---

<h2 style="display: inline;">Recent News </h2>  <div class="right"><a href="/news">....more</a></div>


<div style="text-align: left">
    <span style="display: block;"></span>
    <div class="news">
        <ul style="list-style-position: outside; padding: 20px">
        {% assign news =  site.data.news | sort: 'date' | reverse %}
        {% for new in news %} {% if forloop.index0 < 8 %}
        <li>
            <span> <b>[{{new.date | date: '%Y.%m'}}]</b> {{ new.details }} </span>
        </li>
        {% endif %} {% endfor %}
        </ul>
    </div>
   
</div>
