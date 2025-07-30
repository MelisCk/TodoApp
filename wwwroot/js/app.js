// Global değişkenler
let todos = [];
let currentFilter = 'all';
let editingTodoId = null;

// API base URL
const API_BASE = '/api/todo';

// Sayfa yüklendiğinde çalışacak
document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
    
    // Enter tuşu ile ekleme
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Edit modal için Enter tuşu
    document.getElementById('editInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
});

// Tüm todo'ları API'den yükle
async function loadTodos() {
    try {
        showLoading(true);
        const response = await fetch(API_BASE);
        
        if (!response.ok) {
            throw new Error('Todo\'lar yüklenirken hata oluştu');
        }
        
        todos = await response.json();
        renderTodos();
        updateStats();
        
    } catch (error) {
        console.error('Hata:', error);
        showError('Todo\'lar yüklenirken bir hata oluştu');
    } finally {
        showLoading(false);
    }
}

// Yeni todo ekle
async function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    
    if (!todoText) {
        input.focus();
        return;
    }
    
    if (todoText.length > 100) {
        showError('Todo metni 100 karakterden uzun olamaz');
        return;
    }
    
    try {
        const newTodo = {
            name: todoText,
            isComplete: false
        };
        
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        });
        
        if (!response.ok) {
            throw new Error('Todo eklenirken hata oluştu');
        }
        
        const createdTodo = await response.json();
        todos.push(createdTodo);
        
        input.value = '';
        renderTodos();
        updateStats();
        showSuccess('Todo başarıyla eklendi!');
        
    } catch (error) {
        console.error('Hata:', error);
        showError('Todo eklenirken bir hata oluştu');
    }
}

// Todo'yu tamamlandı/tamamlanmadı olarak işaretle
async function toggleTodo(id) {
    try {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        
        const updatedTodo = {
            ...todo,
            isComplete: !todo.isComplete
        };
        
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo)
        });
        
        if (!response.ok) {
            throw new Error('Todo güncellenirken hata oluştu');
        }
        
        // Local state'i güncelle
        const index = todos.findIndex(t => t.id === id);
        todos[index] = updatedTodo;
        
        renderTodos();
        updateStats();
        
    } catch (error) {
        console.error('Hata:', error);
        showError('Todo güncellenirken bir hata oluştu');
    }
}

// Todo'yu sil
async function deleteTodo(id) {
    if (!confirm('Bu todo\'yu silmek istediğinizden emin misiniz?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Todo silinirken hata oluştu');
        }
        
        // Local state'den kaldır
        todos = todos.filter(t => t.id !== id);
        
        renderTodos();
        updateStats();
        showSuccess('Todo başarıyla silindi!');
        
    } catch (error) {
        console.error('Hata:', error);
        showError('Todo silinirken bir hata oluştu');
    }
}

// Todo düzenleme modalını aç
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    editingTodoId = id;
    document.getElementById('editInput').value = todo.name;
    document.getElementById('editModal').style.display = 'block';
    document.getElementById('editInput').focus();
}

// Edit modalını kapat
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    editingTodoId = null;
}

// Düzenlemeyi kaydet
async function saveEdit() {
    const newText = document.getElementById('editInput').value.trim();
    
    if (!newText) {
        showError('Todo metni boş olamaz');
        return;
    }
    
    if (newText.length > 100) {
        showError('Todo metni 100 karakterden uzun olamaz');
        return;
    }
    
    try {
        const todo = todos.find(t => t.id === editingTodoId);
        if (!todo) return;
        
        const updatedTodo = {
            ...todo,
            name: newText
        };
        
        const response = await fetch(`${API_BASE}/${editingTodoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo)
        });
        
        if (!response.ok) {
            throw new Error('Todo güncellenirken hata oluştu');
        }
        
        // Local state'i güncelle
        const index = todos.findIndex(t => t.id === editingTodoId);
        todos[index] = updatedTodo;
        
        closeEditModal();
        renderTodos();
        showSuccess('Todo başarıyla güncellendi!');
        
    } catch (error) {
        console.error('Hata:', error);
        showError('Todo güncellenirken bir hata oluştu');
    }
}

// Todo'ları filtrele
function filterTodos(filter) {
    currentFilter = filter;
    
    // Filter butonlarını güncelle
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderTodos();
}

// Todo'ları render et
function renderTodos() {
    const todoList = document.getElementById('todoList');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    
    // Loading durumunda hiçbir şey render etme
    if (loading.style.display !== 'none') {
        return;
    }
    
    // Filtrelenmiş todo'ları al
    let filteredTodos = todos;
    
    switch (currentFilter) {
        case 'pending':
            filteredTodos = todos.filter(t => !t.isComplete);
            break;
        case 'completed':
            filteredTodos = todos.filter(t => t.isComplete);
            break;
        default: // 'all'
            filteredTodos = todos;
    }
    
    // Boş durum kontrolü
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        todoList.appendChild(loading);
        todoList.appendChild(emptyState);
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Todo listesini oluştur
    const todoHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.isComplete ? 'completed' : ''}" data-id="${todo.id}">
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.isComplete ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.name)}</span>
            <div class="todo-actions">
                <button class="btn-edit" onclick="editTodo(${todo.id})" title="Düzenle">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteTodo(${todo.id})" title="Sil">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    todoList.innerHTML = todoHTML;
    todoList.appendChild(loading);
    todoList.appendChild(emptyState);
}

// İstatistikleri güncelle
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.isComplete).length;
    const pending = total - completed;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('pendingCount').textContent = pending;
}

// Loading durumunu göster/gizle
function showLoading(show) {
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    
    if (show) {
        loading.style.display = 'block';
        emptyState.style.display = 'none';
    } else {
        loading.style.display = 'none';
    }
}

// Başarı mesajı göster
function showSuccess(message) {
    showNotification(message, 'success');
}

// Hata mesajı göster
function showError(message) {
    showNotification(message, 'error');
}

// Bildirim göster
function showNotification(message, type) {
    // Basit alert kullanıyoruz, daha sonra toast notification eklenebilir
    if (type === 'error') {
        alert('Hata: ' + message);
    } else {
        // Başarı mesajları için console log yeterli (çok fazla alert olmasın)
        console.log('Başarı: ' + message);
    }
}

// HTML escape fonksiyonu (XSS koruması)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Modal dışına tıklandığında kapat
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}