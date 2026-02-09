// Book recommender functionality

let currentRec = null;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getRecommendation')?.addEventListener('click', recommend);
    document.getElementById('pickAgain')?.addEventListener('click', recommend);
    document.getElementById('saveToList')?.addEventListener('click', addToList);
    loadList();
});

function recommend() {
    const genre = document.getElementById('genreSelect').value;
    const length = document.getElementById('lengthSelect').value;
    
    let books = BOOKS.filter(book => {
        const genreMatch = !genre || book.genre === genre;
        
        let lengthMatch = true;
        if (length === 'short') lengthMatch = book.pages <= 200;
        else if (length === 'medium') lengthMatch = book.pages > 200 && book.pages <= 400;
        else if (length === 'long') lengthMatch = book.pages > 400;
        
        return genreMatch && lengthMatch;
    });
    
    if (books.length === 0) {
        alert('No books match your preferences');
        return;
    }
    
    const random = books[Math.floor(Math.random() * books.length)];
    currentRec = random;
    
    document.getElementById('recTitle').textContent = random.title;
    document.getElementById('recAuthor').textContent = random.author;
    document.getElementById('recGenre').textContent = random.genre;
    document.getElementById('recPages').textContent = random.pages;
    document.getElementById('recSynopsis').textContent = random.synopsis;
    document.getElementById('recCover').src = random.image;

    document.getElementById('recommendResult').style.display = 'block';
    document.getElementById('saveListMsg').textContent = '';
}

function addToList() {
    if (!currentRec) return;
    
    let list = getData('reading_list') || [];
    
    if (list.some(b => b.id === currentRec.id)) {
        document.getElementById('saveListMsg').textContent = 'Already in your list!';
        document.getElementById('saveListMsg').className = 'message';
        return;
    }
    
    list.push({
        id: currentRec.id,
        title: currentRec.title,
        author: currentRec.author,
        genre: currentRec.genre,
        added: new Date().toISOString()
    });
    
    saveData('reading_list', list);
    
    document.getElementById('saveListMsg').textContent = 'Added to list!';
    document.getElementById('saveListMsg').className = 'message success';
    
    loadList();
}

function loadList() {
    const list = getData('reading_list') || [];
    const container = document.getElementById('readingList');
    
    if (list.length === 0) {
        container.innerHTML = '<p class="empty-msg">Your list is empty</p>';
        return;
    }
    
    container.innerHTML = '';
    list.forEach((book, i) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div>
                <h4>${book.title}</h4>
                <p>by ${book.author} • ${book.genre}</p>
                <p style="font-size:0.85rem;color:var(--text-light)">Added: ${formatDate(book.added)}</p>
            </div>
            <button class="delete-btn" onclick="removeFromList(${i})">Remove</button>
        `;
        container.appendChild(item);
    });
}

function removeFromList(index) {
    if (!confirm('Remove this book?')) return;
    let list = getData('reading_list') || [];
    list.splice(index, 1);
    saveData('reading_list', list);
    loadList();
}