---
title: "POSTECH SV Lab - Publications"
permalink: /publications
---

### Publications

<div class="btn-group filter-button-group" role="group">
    <button type="button" class="btn" id="select-all">All</button>
    <button type="button" class="btn btn-primary" id="select-conference">Conference</button>
    <button type="button" class="btn btn-primary" id="select-journal">Journal</button>
    <button type="button" class="btn" id="select-domestic">Domestic</button>
    <button type="button" class="btn" id="select-book">Book</button>
    <button type="button" class="btn" id="select-dissertation">Dissertation</button>
</div>
<div class="btn-group filter-button-group" role="group">
    <button type="button" class="btn btn-primary btn-since" id="select-after">Since 2016</button>
    <button type="button" class="btn btn-since" id="select-before">Before 2016</button>
</div>
    

<div style="height: 10px;"></div>

<!--Display Research Publications-->
<div class="pb">
    {% assign grouped_items = site.data.publist | sort: 'year' | reverse | group_by: 'year' %}

    {% for item in grouped_items %}
        {% assign sorted_pubs = item.items | sort: 'month' | reverse %}
        {% capture alltags %}
            {% for tag in site.data.pubtypes %}
                {{ tag.slug }}
            {% endfor %}
        {% endcapture %}

        {% assign matchingpubs = site.data.publist | where: "year", item.name %}
        {% capture matchingtags %}
            {% for pub in matchingpubs %}
                {{ pub.tag }}
            {% endfor %}
        {% endcapture %}
        {% assign matchingtags = matchingtags | split: ' ' | uniq | join: ' ' %}

        <h4 class="element-item {{ matchingtags }} 
        {% if item.name >= "2016" %}new{% endif %}
        {% if item.name < "2016" %}old{% endif %}">{{ item.name }}</h4>
        {% for publi in sorted_pubs %}
            <div class="element-item {{ publi.tag }} 
            {% if publi.year >= 2016 %}new{% endif %}
            {% if publi.year <  2016 %}old{% endif %}
            ">
                <a href="{{ publi.link }}">{{ publi.title }}</a><br />
                <em>{{ publi.authors }} </em><br />
                {{ publi.venue }}, {{ publi.year }}
                <br><br>
            </div>
        {% endfor %}
    {% endfor %}
</div> 

<script>
document.addEventListener('DOMContentLoaded', function() {
    const allElements = document.querySelectorAll('.element-item');
    const oldElements = document.querySelectorAll('.element-item.old');
    const newElements = document.querySelectorAll('.element-item.new');

    // Hide elements with 'old' class initially
    oldElements.forEach(element => {
        element.style.display = 'none';
    });

    // Hide elements with 'new' class initially
    newElements.forEach(element => {
        element.style.display = 'none';
    });

    // Set default selected buttons
    document.querySelector('#select-conference').classList.add('btn-primary');
    document.querySelector('#select-journal').classList.add('btn-primary');

    // Filter elements based on default selected buttons
    filterElements();

    document.querySelectorAll('.filter-button-group .btn').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.id.replace('select-', '');
            const isAllButton = filter === 'all';

            // Toggle 'btn-primary' class
            if (this.classList.contains('btn-primary')) {
                this.classList.remove('btn-primary');
            } else {
                if (isAllButton) {
                    document.querySelectorAll('.filter-button-group .btn').forEach(btn => {
                     if (!btn.classList.contains('btn-since') && !btn.classList.contains('btn-since') ){
                         btn.classList.remove('btn-primary');
                     }
                    });
                } else {
                    if(!(filter === 'before' || filter === 'after')){
                        document.querySelector('#select-all').classList.remove('btn-primary');
                    }
                }
                this.classList.add('btn-primary');
            }

            // Filter elements
            filterElements();
        });
    });

    function filterElements() {
        const activeFilters = Array.from(document.querySelectorAll('.filter-button-group .btn.btn-primary'))
            .map(btn => btn.id.replace('select-', ''));
        
        const isBeforeSelected = activeFilters.includes('before');
        const isAfterSelected = activeFilters.includes('after');
        const otherFilters = activeFilters.filter(filter => filter !== 'before' && filter !== 'after');

        if (activeFilters.includes('all')) {
            allElements.forEach(element => {
                const elementClasses = Array.from(element.classList);
                const isOld = elementClasses.includes('old');
                const isNew = elementClasses.includes('new');
                element.style.display = (isOld && isBeforeSelected) || (isNew && isAfterSelected) ? 'block' : 'none';
            });
        } else if (activeFilters.length === 0) {
            allElements.forEach(element => {
                element.style.display = 'none';
            });
        } else {
            allElements.forEach(element => {
                const elementClasses = Array.from(element.classList);
                const isOld = elementClasses.includes('old');
                const isNew = elementClasses.includes('new');
                const shouldShow = otherFilters.some(filter => elementClasses.includes(filter));
                const showOld = isOld && isBeforeSelected && shouldShow;
                const showNew = isNew && isAfterSelected && shouldShow;
                element.style.display = (shouldShow && !isOld && !isNew) || showOld || showNew ? 'block' : 'none';
            });
        }
    }
});
</script>


<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>