document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-input');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const modal = document.getElementById('task-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTaskContent = document.getElementById('modal-task-content');
    const modalNotes = document.getElementById('modal-notes');

    addBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        const priority = document.getElementById('priority-select').value;
        const dueDate = document.getElementById('due-date-input').value;
        const notes = document.getElementById('notes-input').value.trim();

        if (taskText !== "") {
            const newTask = document.createElement('li');
            newTask.classList.add(priority);

            const taskContent = document.createElement('span');
            taskContent.textContent = taskText;
            newTask.appendChild(taskContent);

            if (notes) {
                const notesElement = document.createElement('p');
                notesElement.textContent = `Notes: ${notes}`;
                newTask.appendChild(notesElement);
            }

            if (dueDate) {
                const dueDateElement = document.createElement('span');
                dueDateElement.textContent = `Due: ${dueDate}`;
                dueDateElement.classList.add('due-date');
                newTask.appendChild(dueDateElement);

                const dueDateObj = new Date(dueDate);
                const today = new Date();
                if (dueDateObj < today) {
                    newTask.classList.add('overdue');
                }
            }

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            removeBtn.addEventListener('click', function () {
                newTask.classList.add('removed');
                setTimeout(() => {
                    taskList.removeChild(newTask);
                }, 500); // Delay for animation
            });
            newTask.appendChild(removeBtn);

            newTask.addEventListener('click', function () {
                modalTaskContent.textContent = taskText;
                modalNotes.textContent = `Notes: ${notes}`;
                modal.style.display = "flex";
            });

            newTask.classList.add('added');
            taskList.appendChild(newTask);
            taskInput.value = "";
            document.getElementById('notes-input').value = "";
        }
    });

    closeModalBtn.addEventListener('click', function () {
        modal.style.display = "none";
    });

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        const tasks = taskList.getElementsByTagName('li');
        
        Array.from(tasks).forEach(function (task) {
            const taskText = task.querySelector('span').textContent.toLowerCase();
            if (taskText.includes(query)) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        });
    });

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });
});
