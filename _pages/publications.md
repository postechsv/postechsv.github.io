---
title: "Publications"
permalink: /publications
layout: page
---

### Publications

<div class="filter-area">
  <div class="filter-button-group" role="group">
    <button type="button" class="btn btn-primary" id="select-conference">conference</button>
    <button type="button" class="btn btn-primary" id="select-journal">journal</button>
    <span class="filter-break" aria-hidden="true"></span>
    <button type="button" class="btn" id="select-domestic">domestic</button>
    <button type="button" class="btn" id="select-book">book</button>
    <button type="button" class="btn" id="select-thesis">thesis</button>
  </div>
  <div class="filter-row-2">
    <div class="filter-button-group" role="group">
      <button type="button" class="btn btn-primary btn-since" id="select-after">Since 2016</button>
      <button type="button" class="btn btn-since" id="select-before">Before 2016</button>
    </div>
    <div class="pub-search-wrap">
      <svg class="pub-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="search" id="pub-search" class="pub-search" placeholder="Search…" autocomplete="off">
    </div>
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
                <div class="pub-entry-row">
                    <span class="pub-tag pub-tag-{{ publi.tag }}">{{ publi.tag }}</span>
                    <a href="{{ publi.link }}" class="pub-title">{{ publi.title }}</a>
                </div>
                <div class="pub-authors">{{ publi.authors }}</div>
                <div class="pub-venue">{{ publi.venue }}</div>
            </div>
        {% endfor %}
    {% endfor %}
</div>

<div class="pub-empty" id="pub-empty">No publications match your search.</div>

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
  var timeoutIds = new WeakMap();

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

  var searchInput = document.getElementById('pub-search');
  var isComposing = false;
  searchInput.addEventListener('compositionstart', function() { isComposing = true; });
  searchInput.addEventListener('compositionend', function() { isComposing = false; filterElements(); });
  searchInput.addEventListener('input', function() { if (!isComposing) filterElements(); });

  function showElement(el) {
    if (timeoutIds.has(el)) {
      clearTimeout(timeoutIds.get(el));
      timeoutIds.delete(el);
    }
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
    if (timeoutIds.has(el)) {
      clearTimeout(timeoutIds.get(el));
    }
    el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateX(8px)';
    var t = setTimeout(function() {
      el.style.display = 'none';
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
      timeoutIds.delete(el);
    }, 210);
    timeoutIds.set(el, t);
  }

  function filterElements() {
    var activeFilters = Array.from(document.querySelectorAll('.filter-button-group .btn.btn-primary'))
      .map(function(btn) { return btn.id.replace('select-', ''); });

    var isBeforeSelected = activeFilters.indexOf('before') !== -1;
    var isAfterSelected = activeFilters.indexOf('after') !== -1;
    var otherFilters = activeFilters.filter(function(f) { return f !== 'before' && f !== 'after'; });
    var searchTerm = document.getElementById('pub-search').value.toLowerCase().trim();

    var visibleCount = 0;
    var visibleYearHeaders = new Set();

    allElements.forEach(function(element) {
      if (element.tagName === 'H4') { return; }

      var elementClasses = Array.from(element.classList);
      var isOld = elementClasses.indexOf('old') !== -1;
      var isNew = elementClasses.indexOf('new') !== -1;

      var categoryMatch = otherFilters.some(function(f) { return elementClasses.indexOf(f) !== -1; });
      var timeMatch = (isOld && isBeforeSelected) || (isNew && isAfterSelected) || (!isOld && !isNew);
      var searchMatch = !searchTerm || element.textContent.toLowerCase().indexOf(searchTerm) !== -1;
      var shouldShow = categoryMatch && timeMatch && searchMatch;

      if (shouldShow) {
        visibleCount++;
        var prev = element.previousElementSibling;
        while (prev) {
          if (prev.tagName === 'H4' && prev.classList.contains('element-item')) {
            visibleYearHeaders.add(prev);
            break;
          }
          prev = prev.previousElementSibling;
        }
      }

      var isPendingHide = timeoutIds.has(element);
      if (shouldShow && (element.style.display === 'none' || isPendingHide)) {
        showElement(element);
      } else if (!shouldShow && element.style.display !== 'none') {
        hideElement(element);
      }
    });

    document.querySelectorAll('h4.element-item').forEach(function(yearHeader) {
      var shouldShowHeader = visibleYearHeaders.has(yearHeader);
      var isPendingHide = timeoutIds.has(yearHeader);
      if (shouldShowHeader && (yearHeader.style.display === 'none' || isPendingHide)) {
        showElement(yearHeader);
      } else if (!shouldShowHeader && yearHeader.style.display !== 'none') {
        hideElement(yearHeader);
      }
    });

    var emptyEl = document.getElementById('pub-empty');
    if (emptyEl) { emptyEl.style.display = visibleCount === 0 ? 'block' : 'none'; }
  }
})();
</script>
