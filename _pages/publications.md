---
title: "POSTECH SV Lab - Publications"
permalink: /publications
---

### Publications

<div class="filter-area">
  <div class="filter-button-group" role="group">
    <button type="button" class="btn btn-primary" id="select-conference">Conference</button>
    <button type="button" class="btn btn-primary" id="select-journal">Journal</button>
    <button type="button" class="btn" id="select-domestic">Domestic</button>
    <button type="button" class="btn" id="select-book">Book</button>
    <button type="button" class="btn" id="select-thesis">Thesis</button>
  </div>
  <div class="filter-button-group" role="group">
    <button type="button" class="btn btn-primary btn-since" id="select-after">Since 2016</button>
    <button type="button" class="btn btn-since" id="select-before">Before 2016</button>
  </div>
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
                {{ publi.venue }}
            </div>
        {% endfor %}
    {% endfor %}
</div>

<br>

<script>
(function() {
  var allElements = document.querySelectorAll('.element-item');
  var oldElements = document.querySelectorAll('.element-item.old');
  var newElements = document.querySelectorAll('.element-item.new');

  oldElements.forEach(function(el) { el.style.display = 'none'; });
  newElements.forEach(function(el) { el.style.display = 'none'; });

  document.querySelector('#select-conference').classList.add('btn-primary');
  document.querySelector('#select-journal').classList.add('btn-primary');

  var initialLoad = true;
  filterElements();
  initialLoad = false;

  document.querySelectorAll('.filter-button-group .btn').forEach(function(button) {
    button.addEventListener('click', function() {
      if (this.classList.contains('btn-primary')) {
        this.classList.remove('btn-primary');
      } else {
        this.classList.add('btn-primary');
      }
      filterElements();
    });
  });

  function showElement(el) {
    el.style.display = 'block';
    if (initialLoad) {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      void el.offsetHeight;
      el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    } else {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateX(-12px)';
      void el.offsetHeight;
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }
  }

  function hideElement(el) {
    el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateX(8px)';
    setTimeout(function() {
      el.style.display = 'none';
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
    }, 210);
  }

  function filterElements() {
    var activeFilters = Array.from(document.querySelectorAll('.filter-button-group .btn.btn-primary'))
      .map(function(btn) { return btn.id.replace('select-', ''); });

    var isBeforeSelected = activeFilters.indexOf('before') !== -1;
    var isAfterSelected = activeFilters.indexOf('after') !== -1;
    var otherFilters = activeFilters.filter(function(f) { return f !== 'before' && f !== 'after'; });

    allElements.forEach(function(element) {
      var elementClasses = Array.from(element.classList);
      var isOld = elementClasses.indexOf('old') !== -1;
      var isNew = elementClasses.indexOf('new') !== -1;

      var categoryMatch = otherFilters.some(function(f) { return elementClasses.indexOf(f) !== -1; });
      var timeMatch = (isOld && isBeforeSelected) || (isNew && isAfterSelected) || (!isOld && !isNew);
      var shouldShow = categoryMatch && timeMatch;

      if (shouldShow && element.style.display === 'none') {
        showElement(element);
      } else if (!shouldShow && element.style.display !== 'none') {
        hideElement(element);
      }
    });
  }
})();
</script>
