---
title: "Publications"
permalink: /publications
layout: page
---

### Publications

<div class="filter-area">
  <div class="filter-top-row">
    <div class="filter-button-group" role="group">
      <button type="button" class="btn btn-primary" id="select-conference">conference</button>
      <button type="button" class="btn btn-primary" id="select-journal">journal</button>
      <span class="filter-break" aria-hidden="true"></span>
      <button type="button" class="btn" id="select-domestic">domestic</button>
      <button type="button" class="btn" id="select-book">book</button>
      <button type="button" class="btn" id="select-thesis">thesis</button>
    </div>
    <div class="pub-search-wrap">
      <svg class="pub-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="search" id="pub-search" class="pub-search" placeholder="Search…" autocomplete="off">
    </div>
  </div>
</div>

<div class="pub-spacer"></div>

<div class="pb">
    {% assign grouped_items = site.data.publications.publist | sort: 'year' | reverse | group_by: 'year' %}
    {% for item in grouped_items %}
        {% assign sorted_pubs = item.items | sort: 'month' | reverse %}
        {% assign matchingpubs = site.data.publications.publist | where: "year", item.name %}
        {% capture matchingtags %}
            {% for pub in matchingpubs %}{{ pub.tag }} {% endfor %}
        {% endcapture %}
        {% assign matchingtags = matchingtags | split: ' ' | uniq | join: ' ' %}

        <h4 class="element-item {{ matchingtags }}">{{ item.name }}</h4>
        {% for publi in sorted_pubs %}
            <div class="element-item {{ publi.tag }}">
                <div class="pub-entry-row">
                    <span class="pub-tag pub-tag-{{ publi.tag }}">{{ publi.tag }}</span>
                    {% if publi.award %}<span class="pub-award-icon" title="{{ publi.award }}">🏆</span>{% endif %}
                    <a href="{{ publi.link }}" class="pub-title">{{ publi.title }}</a>
                    {% if publi.pdf or publi.code or publi.slides %}
                    <span class="pub-links">
                      {% if publi.pdf %}<a href="{{ publi.pdf }}" class="pub-link-btn" target="_blank" rel="noopener">PDF</a>{% endif %}
                      {% if publi.code %}<a href="{{ publi.code }}" class="pub-link-btn" target="_blank" rel="noopener">Code</a>{% endif %}
                      {% if publi.slides %}<a href="{{ publi.slides }}" class="pub-link-btn" target="_blank" rel="noopener">Slides</a>{% endif %}
                    </span>
                    {% endif %}
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

  document.querySelector('#select-conference').classList.add('btn-primary');
  document.querySelector('#select-journal').classList.add('btn-primary');

  filterElements();

  document.querySelectorAll('.filter-button-group .btn').forEach(function(button) {
    button.addEventListener('click', function() {
      this.classList.toggle('btn-primary');
      filterElements();
    });
  });

  var searchInput = document.getElementById('pub-search');
  var isComposing = false;
  searchInput.addEventListener('compositionstart', function() { isComposing = true; });
  searchInput.addEventListener('compositionend', function() { isComposing = false; filterElements(); });
  searchInput.addEventListener('input', function() { if (!isComposing) filterElements(); });

  function filterElements() {
    var activeFilters = Array.from(document.querySelectorAll('.filter-button-group .btn.btn-primary'))
      .map(function(btn) { return btn.id.replace('select-', ''); });

    var searchTerm = document.getElementById('pub-search').value.toLowerCase().trim();

    var visibleCount = 0;
    var visibleYearHeaders = new Set();

    allElements.forEach(function(element) {
      if (element.tagName === 'H4') { return; }

      var elementClasses = Array.from(element.classList);
      var categoryMatch = activeFilters.some(function(f) { return elementClasses.indexOf(f) !== -1; });
      var searchMatch = !searchTerm || element.textContent.toLowerCase().indexOf(searchTerm) !== -1;
      var shouldShow = categoryMatch && searchMatch;

      element.style.display = shouldShow ? '' : 'none';

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
    });

    document.querySelectorAll('h4.element-item').forEach(function(yearHeader) {
      yearHeader.style.display = visibleYearHeaders.has(yearHeader) ? '' : 'none';
    });

    var emptyEl = document.getElementById('pub-empty');
    if (emptyEl) { emptyEl.style.display = visibleCount === 0 ? 'block' : 'none'; }
  }
})();
</script>
