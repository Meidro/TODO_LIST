const todoList = {
    searchTaskInput: null,
    addTaskInput: null,
    addTaskBtn: null,
    taskList: null,
    tasks: null,
    initApp() {
        this.addTaskInput = document.querySelector('#newItemText');
        this.searchTaskInput = document.querySelector('#filter');
        this.addTaskBtn = document.querySelector('#addTaskBtn');
        this.taskList = document.querySelector('#items');
        this.tasks = this.getLocalStorage();
        this.addTaskBtn.addEventListener('click', this.addTask.bind(this));
        this.taskList.addEventListener('click', this.deleteTask.bind(this));
        this.searchTaskInput.addEventListener('input', this.searchTask.bind(this));
    },
    render(tasks) {
        this.taskList.innerHTML = '';
        tasks.forEach((task) => this.taskList.prepend(task));
    },
    getLocalStorage() {
        const storageData = localStorage.getItem('tasks');
        return storageData
            ? JSON.parse(storageData).map((taskText) => {
                  return this.createTaskElement(taskText);
              })
            : [];
    },
    setLocalStorage() {
        const taskTexts = this.tasks.map((task) => task.firstChild.nodeValue);
        localStorage.setItem('tasks', JSON.stringify(taskTexts));
    },
    createTaskElement(taskText) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<button data-action='delete' type='button'
        class='btn btn-light btn-sm float-right'>Удалить</button>`;
        li.prepend(document.createTextNode(taskText));
        return li;
    },
    addTask(e) {
        e.preventDefault();
        const inputValue = this.addTaskInput.value.trim();
        if (inputValue.length) {
            this.tasks.push(this.createTaskElement(inputValue));

            this.setLocalStorage();
            this.render(this.tasks);
        }
        this.addTaskInput.value = '';
    },
    deleteTask(e) {
        if (e.target.dataset.action === 'delete') {
            if (confirm(`Удалить задачу "${e.target.previousSibling.nodeValue}"?`)) {
                this.tasks = this.tasks.filter((task) => task !== e.target.parentNode);
                this.setLocalStorage();
                this.render(this.tasks);
            }
        }
    },
    searchTask() {
        const newTasks = this.tasks.filter((task) =>
            task.firstChild.nodeValue.toLowerCase().includes(this.searchTaskInput.value.toLowerCase())
        );
        this.render(newTasks);
    },
};
todoList.initApp();
todoList.render(todoList.tasks);
