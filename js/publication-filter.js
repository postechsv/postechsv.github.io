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
                        if (!btn.classList.contains('btn-since')) {
                            btn.classList.remove('btn-primary');
                        }
                    });
                } else {
                    if (!(filter === 'before' || filter === 'after')) {
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