---
layout: default

---

<img
  class="img-responsive center-block"
  src="/images/bg.png"
  width="100%"
  height="100%"
/>

<div class="container">
  {% for content in site.home %}
    {{content}}
    <br>
    <hr>
  {% endfor %}
</div>