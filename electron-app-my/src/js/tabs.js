document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const tabsContainer = document.getElementById('tabs-container');

  tabs.forEach(tab => {
    tab.addEventListener('dragstart', () => {
      tab.classList.add('dragging');
    });

    tab.addEventListener('dragend', () => {
      tab.classList.remove('dragging');
    });
  });

  tabsContainer.addEventListener('dragover', e => {
    e.preventDefault();
    const draggingTab = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(tabsContainer, e.clientX);
    if (afterElement) {
      tabsContainer.insertBefore(draggingTab, afterElement);
    } else {
      tabsContainer.appendChild(draggingTab);
    }
  });

  function getDragAfterElement(container, x) {
    const tabs = [...container.querySelectorAll('.tab:not(.dragging)')];
    return tabs.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
});