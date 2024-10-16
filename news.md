---
title: "News"
excerpt: "POSTECH SV Lab"
sitemap: false
permalink: /news
---

### News

<div
    class="w3-container"
    style="
    padding: 25px;
    border-radius: 10px;
    border: 1px solid #5d8aa8;
    "
>
    <div style="text-align: left">
    <span style="display: block;"></span>
    <div class="news">
        <ul style="list-style-position: outside; padding: 20px">
        {% assign news =  site.data.news | sort: 'date' | reverse %}
        {% for new in news %} 
        <li>
            <span> <b>[{{new.date | date: '%Y.%m'}}]</b> {{ new.details }} </span>
        </li>
       {% endfor %}
        </ul>
    </div>
    </div>
</div>
<br>
<br>

