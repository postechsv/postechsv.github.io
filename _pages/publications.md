---
title: "POSTECH SV Lab - Publications"
permalink: /publications
---

### Publications

<div class="btn-group filter-button-group" role="group">
    <button type="button" class="btn btn-primary" id="select-conference">Conference</button>
    <button type="button" class="btn btn-primary" id="select-journal">Journal</button>
    <button type="button" class="btn" id="select-domestic">Domestic</button>
    <button type="button" class="btn" id="select-book">Book</button>
    <button type="button" class="btn" id="select-thesis">Thesis</button>
</div>
<div class="btn-group filter-button-group" role="group">
    <button type="button" class="btn btn-primary btn-since" id="select-after">Since 2016</button>
    <button type="button" class="btn btn-since" id="select-before">Before 2016</button>
</div>

<div class="pub-spacer"></div>

<div class="pb">
    {% assign grouped_items = site.data.publist | sort: 'year' | reverse | group_by: 'year' %}
    {% for item in grouped_items %}
        {% assign sorted_pubs = item.items | sort: 'month' | reverse %}
        {% assign matchingpubs = site.data.publist | where: "year", item.name %}
        {% capture matchingtags %}
            {% for pub in matchingpubs %}{{ pub.tag }} {% endfor %}
        {% endcapture %}
        {% assign matchingtags = matchingtags | split: ' ' | uniq | join: ' ' %}

        <h4 class="element-item {{ matchingtags }}
        {% if item.name >= "2016" %}new{% endif %}
        {% if item.name < "2016" %}old{% endif %}">{{ item.name }}</h4>
        {% for publi in sorted_pubs %}
            <div class="element-item {{ publi.tag }}
            {% if publi.year >= 2016 %}new{% endif %}
            {% if publi.year < 2016 %}old{% endif %}">
                <a href="{{ publi.link }}">{{ publi.title }}</a><br>
                <em>{{ publi.authors }}</em><br>
                {{ publi.venue }}, {{ publi.year }}
            </div>
        {% endfor %}
    {% endfor %}
</div>

<br>