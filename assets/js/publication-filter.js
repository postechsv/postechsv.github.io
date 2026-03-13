document.addEventListener('DOMContentLoaded', function() {
  const allElements = document.querySelectorAll('.element-item');
  const oldElements = document.querySelectorAll('.element-item.old');
  const newElements = document.querySelectorAll('.element-item.new');

  oldElements.forEach(element => { element.style.display = 'none'; });
  newElements.forEach(element => { element.style.display = 'none'; });

  document.querySelector('#select-conference').classList.add('btn-primary');
  document.querySelector('#select-journal').classList.add('btn-primary');

  let initialLoad = true;
  filterElements();
  initialLoad = false;

  document.querySelectorAll('.filter-button-group .btn').forEach(button => {
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
    const activeFilters = Array.from(document.querySelectorAll('.filter-button-group .btn.btn-primary'))
      .map(btn => btn.id.replace('select-', ''));

    const isBeforeSelected = activeFilters.includes('before');
    const isAfterSelected = activeFilters.includes('after');
    const otherFilters = activeFilters.filter(filter => filter !== 'before' && filter !== 'after');

    allElements.forEach(element => {
      const elementClasses = Array.from(element.classList);
      const isOld = elementClasses.includes('old');
      const isNew = elementClasses.includes('new');

      const categoryMatch = otherFilters.some(filter => elementClasses.includes(filter));
      const timeMatch = (isOld && isBeforeSelected) || (isNew && isAfterSelected) || (!isOld && !isNew);
      const shouldShow = categoryMatch && timeMatch;

      if (shouldShow && element.style.display === 'none') {
        showElement(element);
      } else if (!shouldShow && element.style.display !== 'none') {
        hideElement(element);
      }
    });
  }
});