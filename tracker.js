// Reading tracker functionality

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('trackerForm').addEventListener('submit', calculate);
    document.getElementById('saveBtn').addEventListener('click', saveProgress);
    loadSaved();
});

function calculate(e) {
    e.preventDefault();
    
    const total = parseInt(document.getElementById('totalPages').value);
    const read = parseInt(document.getElementById('pagesRead').value);
    const speed = parseInt(document.getElementById('readingSpeed').value);
    
    if (read > total) {
        alert('Pages read cannot exceed total pages!');
        return;
    }
    
    const left = total - read;
    const percent = ((read / total) * 100).toFixed(1);
    const days = Math.ceil(left / speed);
    
    const finish = new Date();
    finish.setDate(finish.getDate() + days);
    const finishStr = finish.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    document.getElementById('percentComplete').textContent = `${percent}%`;
    document.getElementById('pagesLeft').textContent = left;
    document.getElementById('daysLeft').textContent = days;
    document.getElementById('finishDate').textContent = finishStr;
    document.getElementById('progressLabel').textContent = `${percent}%`;
    
    setTimeout(() => {
        document.getElementById('progressFill').style.width = `${percent}%`;
    }, 100);
    
    document.getElementById('trackerResults').style.display = 'block';
}

function saveProgress() {
    const title = document.getElementById('bookTitle').value.trim();
    const total = parseInt(document.getElementById('totalPages').value);
    const read = parseInt(document.getElementById('pagesRead').value);
    const speed = parseInt(document.getElementById('readingSpeed').value);
    const percent = ((read / total) * 100).toFixed(1);
    
    if (!title) {
        alert('Please enter a book title');
        return;
    }
    
    let saved = getData('reading_progress') || [];
    const existing = saved.findIndex(b => b.title.toLowerCase() === title.toLowerCase());
    
    const data = {
        title,
        total,
        read,
        speed,
        percent,
        updated: new Date().toISOString()
    };
    
    if (existing >= 0) {
        saved[existing] = data;
    } else {
        saved.push(data);
    }
    
    saveData('reading_progress', saved);
    
    const msg = document.getElementById('saveMessage');
    msg.textContent = 'Progress saved!';
    msg.className = 'message success';
    setTimeout(() => msg.textContent = '', 3000);
    
    loadSaved();
}

function loadSaved() {
    const saved = getData('reading_progress') || [];
    const list = document.getElementById('savedList');
    
    if (saved.length === 0) {
        list.innerHTML = '<p class="empty-msg">No saved books yet</p>';
        return;
    }
    
    list.innerHTML = '';
    saved.forEach((book, i) => {
        const item = document.createElement('div');
        item.className = 'saved-item';
        item.innerHTML = `
            <div>
                <h4>${book.title}</h4>
                <p>${book.percent}% complete • ${book.read} of ${book.total} pages</p>
                <p style="font-size:0.85rem;color:var(--text-light)">Updated: ${formatDate(book.updated)}</p>
            </div>
            <button class="delete-btn" onclick="deleteBook(${i})">Delete</button>
        `;
        list.appendChild(item);
    });
}

function deleteBook(index) {
    if (!confirm('Delete this progress?')) return;
    let saved = getData('reading_progress') || [];
    saved.splice(index, 1);
    saveData('reading_progress', saved);
    loadSaved();
}
