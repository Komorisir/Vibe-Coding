// 常量定义
const PRIORITY_LABELS = {
    high: '高',
    medium: '中',
    low: '低'
};

const DEFAULT_PRIORITY = 'medium';
const STORAGE_KEY = 'tasks';

// 获取DOM元素
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const priorityRadios = document.querySelectorAll('input[name="priority"]');
const taskList = document.getElementById('taskList');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// 从本地存储加载任务
let tasks = loadTasks();
let editingTaskId = null;

// 初始化应用
function init() {
    renderTasks();
    updateStats();
    
    // 事件监听
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', handleInputKeyPress);
    clearCompletedBtn.addEventListener('click', clearCompleted);
    clearAllBtn.addEventListener('click', clearAll);
    
    // 优先级单选框变化事件
    priorityRadios.forEach(radio => {
        radio.addEventListener('change', handlePriorityChange);
    });
    
    // 使用事件委托处理任务列表的点击事件
    taskList.addEventListener('click', handleTaskListClick);
    taskList.addEventListener('change', handleTaskListChange);
    
    // 初始化优先级样式
    updatePriorityStyles();
}

// 处理优先级变化
function handlePriorityChange() {
    updatePriorityStyles();
}

// 更新优先级按钮样式
function updatePriorityStyles() {
    priorityRadios.forEach(radio => {
        const label = radio.closest('.priority-radio-label');
        if (radio.checked) {
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
    });
}

// 处理输入框按键
function handleInputKeyPress(e) {
    if (e.key === 'Enter') {
        addTask();
    }
}

// 处理任务列表点击事件（事件委托）
function handleTaskListClick(e) {
    const target = e.target;
    
    // 处理任务项中的按钮
    const taskItem = target.closest('.task-item');
    if (taskItem) {
        const taskId = parseInt(taskItem.dataset?.taskId);
        if (taskId) {
            if (target.classList.contains('edit-btn')) {
                startEdit(taskId);
                return;
            } else if (target.classList.contains('delete-btn')) {
                deleteTask(taskId);
                return;
            }
        }
    }
    
    // 处理编辑面板中的按钮
    const editPanel = target.closest('.task-edit-panel');
    if (editPanel) {
        const taskId = parseInt(editPanel.dataset?.editPanelId);
        if (taskId) {
            if (target.classList.contains('save-btn')) {
                saveTask(taskId);
                return;
            } else if (target.classList.contains('cancel-btn')) {
                cancelEdit();
                return;
            }
        }
    }
    
    // 处理通过 data-task-id 属性直接获取的情况
    if (target.dataset?.taskId) {
        const taskId = parseInt(target.dataset.taskId);
        if (target.classList.contains('save-btn')) {
            saveTask(taskId);
            return;
        }
    }
}

// 处理任务列表变化事件（事件委托）
function handleTaskListChange(e) {
    if (e.target.classList.contains('task-checkbox')) {
        const taskId = parseInt(e.target.closest('.task-item')?.dataset?.taskId);
        if (taskId) {
            toggleTask(taskId);
        }
    }
}

// 获取选中的优先级
function getSelectedPriority() {
    const selected = Array.from(priorityRadios).find(radio => radio.checked);
    return selected ? selected.value : DEFAULT_PRIORITY;
}

// 设置优先级
function setPriority(value) {
    const radio = Array.from(priorityRadios).find(r => r.value === value);
    if (radio) radio.checked = true;
}

// 添加任务
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (!taskText) {
        taskInput.focus();
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: getSelectedPriority()
    };
    
    tasks.push(newTask);
    refreshUI();
    
    // 清空输入框并聚焦
    taskInput.value = '';
    setPriority(DEFAULT_PRIORITY);
    taskInput.focus();
}

// 删除任务
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    refreshUI();
}

// 切换任务完成状态
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    refreshUI();
}

// 渲染任务列表（使用DOM API）
function renderTasks() {
    // 清空列表
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        const emptyState = createEmptyState();
        taskList.appendChild(emptyState);
        return;
    }
    
    // 使用DocumentFragment批量操作
    const fragment = document.createDocumentFragment();
    
    tasks.forEach(task => {
        const priority = task.priority || DEFAULT_PRIORITY;
        const taskElement = createTaskDisplayElement(task, priority);
        fragment.appendChild(taskElement);
        
        // 如果正在编辑此任务，在任务项下方插入编辑面板
        if (editingTaskId === task.id) {
            const editPanel = createEditPanel(task, priority);
            fragment.appendChild(editPanel);
        }
    });
    
    taskList.appendChild(fragment);
    
    // 如果是编辑模式，设置焦点和事件监听
    if (editingTaskId) {
        setupEditMode(editingTaskId);
    }
}

// 创建空状态元素
function createEmptyState() {
    const li = document.createElement('li');
    li.className = 'empty-state';
    
    const icon = document.createElement('div');
    icon.className = 'empty-state-icon';
    icon.textContent = '✨';
    
    const text = document.createElement('div');
    text.className = 'empty-state-text';
    text.innerHTML = '还没有任务呢～<br>添加第一个任务开始你的待办之旅吧！';
    
    const subtitle = document.createElement('div');
    subtitle.className = 'empty-state-subtitle';
    subtitle.textContent = '点击上方输入框，输入你的任务内容';
    
    li.appendChild(icon);
    li.appendChild(text);
    li.appendChild(subtitle);
    
    return li;
}

// 创建编辑面板（独立元素，在任务项下方展开）
function createEditPanel(task, priority) {
    const li = document.createElement('li');
    li.className = 'task-edit-panel';
    li.dataset.editPanelId = task.id;
    
    const panelContent = document.createElement('div');
    panelContent.className = 'edit-panel-content';
    
    // 编辑输入框
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'task-edit-input';
    editInput.value = task.text;
    editInput.dataset.editInput = task.id;
    editInput.placeholder = '编辑任务内容...';
    
    // 编辑面板底部操作区
    const editActions = document.createElement('div');
    editActions.className = 'edit-actions';
    
    // 优先级选择器（编辑模式使用紧凑的图标按钮）
    const priorityGroup = document.createElement('div');
    priorityGroup.className = 'priority-radio-group-inline';
    priorityGroup.dataset.editPriority = task.id;
    
    const priorityIcons = {
        low: '🟢',
        medium: '🟡',
        high: '🔴'
    };
    
    ['low', 'medium', 'high'].forEach(pri => {
        const label = document.createElement('label');
        label.className = `priority-radio-label-inline priority-${pri}`;
        if (priority === pri) {
            label.classList.add('checked');
        }
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `priority-${task.id}`;
        radio.value = pri;
        radio.className = 'priority-radio';
        radio.checked = priority === pri;
        
        const icon = document.createElement('span');
        icon.className = 'priority-icon';
        icon.textContent = priorityIcons[pri];
        
        label.appendChild(radio);
        label.appendChild(icon);
        priorityGroup.appendChild(label);
    });
    
    // 按钮组
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'edit-button-group';
    
    // 保存按钮
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.dataset.taskId = task.id;
    saveBtn.textContent = '保存';
    
    // 取消按钮
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = '取消';
    
    buttonGroup.appendChild(saveBtn);
    buttonGroup.appendChild(cancelBtn);
    
    editActions.appendChild(priorityGroup);
    editActions.appendChild(buttonGroup);
    
    panelContent.appendChild(editInput);
    panelContent.appendChild(editActions);
    
    li.appendChild(panelContent);
    
    return li;
}

// 创建任务显示模式元素（使用DOM API）
function createTaskDisplayElement(task, priority) {
    const li = document.createElement('li');
    li.className = `task-item priority-${priority}`;
    if (task.completed) li.classList.add('completed');
    li.dataset.taskId = task.id;
    
    // 复选框
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    
    // 任务文本
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    // 优先级徽章
    const priorityBadge = document.createElement('span');
    priorityBadge.className = `priority-badge ${priority}`;
    priorityBadge.textContent = PRIORITY_LABELS[priority];
    
    // 编辑按钮
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.dataset.taskId = task.id;
    editBtn.textContent = '编辑';
    
    // 删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.dataset.taskId = task.id;
    deleteBtn.textContent = '删除';
    
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(priorityBadge);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    return li;
}

// 设置编辑模式
function setupEditMode(taskId) {
    setTimeout(() => {
        const editInput = document.querySelector(`[data-edit-input="${taskId}"]`);
        if (editInput) {
            editInput.focus();
            editInput.select();
            
            // 添加键盘事件
            const handleKeyPress = (e) => {
                if (e.key === 'Enter') {
                    saveTask(taskId);
                } else if (e.key === 'Escape') {
                    cancelEdit();
                }
            };
            
            editInput.addEventListener('keydown', handleKeyPress);
        }
        
        // 更新优先级样式
        updateEditPriorityStyles(taskId);
        
        // 监听优先级变化
        const priorityGroup = document.querySelector(`[data-edit-priority="${taskId}"]`);
        if (priorityGroup) {
            priorityGroup.querySelectorAll('.priority-radio').forEach(radio => {
                radio.addEventListener('change', () => {
                    updateEditPriorityStyles(taskId);
                });
            });
        }
    }, 0);
}

// 开始编辑任务
function startEdit(id) {
    editingTaskId = id;
    renderTasks();
    
    // 滚动到编辑面板位置
    setTimeout(() => {
        const editPanel = document.querySelector(`[data-edit-panel-id="${id}"]`);
        if (editPanel) {
            editPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 100);
}

// 保存编辑的任务
function saveTask(id) {
    // 确保 id 是数字类型
    id = parseInt(id);
    if (!id || isNaN(id)) {
        console.error('保存失败：无效的任务ID', id);
        return;
    }
    
    const editInput = document.querySelector(`[data-edit-input="${id}"]`);
    const priorityGroup = document.querySelector(`[data-edit-priority="${id}"]`);
    
    if (!editInput) {
        console.error('保存失败：找不到编辑输入框', id);
        return;
    }
    
    if (!priorityGroup) {
        console.error('保存失败：找不到优先级选择器', id);
        return;
    }
    
    const newText = editInput.value.trim();
    if (!newText) {
        alert('任务内容不能为空！');
        editInput.focus();
        return;
    }
    
    // 获取选中的优先级
    const selectedRadio = priorityGroup.querySelector('input[type="radio"]:checked');
    const newPriority = selectedRadio ? selectedRadio.value : DEFAULT_PRIORITY;
    
    // 更新任务
    tasks = tasks.map(task => 
        task.id === id 
            ? { ...task, text: newText, priority: newPriority }
            : task
    );
    
    editingTaskId = null;
    refreshUI();
}

// 更新编辑模式下的优先级样式
function updateEditPriorityStyles(taskId) {
    const priorityGroup = document.querySelector(`[data-edit-priority="${taskId}"]`);
    if (!priorityGroup) return;
    
    priorityGroup.querySelectorAll('.priority-radio-label-inline').forEach(label => {
        const radio = label.querySelector('.priority-radio');
        if (radio && radio.checked) {
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
    });
}

// 取消编辑
function cancelEdit() {
    editingTaskId = null;
    renderTasks();
}

// 清空已完成任务
function clearCompleted() {
    const completedCount = tasks.filter(task => task.completed).length;
    if (completedCount === 0) return;
    
    if (confirm(`确定要清空 ${completedCount} 个已完成的任务吗？`)) {
        tasks = tasks.filter(task => !task.completed);
        refreshUI();
    }
}

// 全部清空
function clearAll() {
    if (tasks.length === 0) return;
    
    if (confirm(`⚠️ 警告：确定要清空所有 ${tasks.length} 个任务吗？\n此操作无法撤销！`)) {
        tasks = [];
        refreshUI();
    }
}

// 更新统计信息
function updateStats() {
    const stats = tasks.reduce((acc, task) => {
        task.completed ? acc.completed++ : acc.pending++;
        return acc;
    }, { pending: 0, completed: 0 });
    
    pendingCount.textContent = stats.pending;
    completedCount.textContent = stats.completed;
    
    // 更新按钮状态
    clearCompletedBtn.disabled = stats.completed === 0;
    clearAllBtn.disabled = tasks.length === 0;
}

// 统一刷新UI（保存、渲染、更新统计）
function refreshUI() {
    saveTasks();
    renderTasks();
    updateStats();
}

// 加载任务
function loadTasks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('加载任务失败:', error);
        return [];
    }
}

// 保存任务到本地存储
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('保存任务失败:', error);
        alert('保存失败，请检查浏览器存储空间');
    }
}

// 注意：现在使用DOM API的textContent，自动处理XSS，不需要escapeHtml函数

// 页面加载时初始化
init();
