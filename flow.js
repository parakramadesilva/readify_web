// Reading flow functionality

const sounds = {
    rain: new Audio("Sounds/rainsound.mp3"),
    fire: new Audio("Sounds/firefirefiresound.mp3"),
    forest: new Audio("Sounds/forestsound.mp3"),
    ocean: new Audio("Sounds/oceansound.mp3"),
    thunder: new Audio("Sounds/thundersound.mp3")
};

Object.values(sounds).forEach(sound => {
    sound.loop = true;
    sound.volume = 0.4;
});


document.addEventListener('DOMContentLoaded', function() {
    // Sound buttons
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const sound = this.getAttribute('data-sound');
            toggleSound(sound, this);
        });
    });
    
    // Volume sliders
    document.querySelectorAll('.volume').forEach(slider => {
        slider.addEventListener('input', function() {
            const sound = this.getAttribute('data-sound');
            if (sounds[sound]) {
                sounds[sound].volume = this.value / 100;
            }
        });
    });
    
    document.getElementById('stopAll').addEventListener('click', stopAll);
    
    // Completed books
    document.getElementById('completedForm').addEventListener('submit', addCompleted);
    loadCompleted();
});


function toggleSound(type, btn) {
    const item = btn.closest('.sound-item');
    const playSpan = btn.querySelector('.play');
    const pauseSpan = btn.querySelector('.pause');

    const sound = sounds[type];

    if (sound.paused) {
        sound.play();
        item.classList.add('playing');
        playSpan.style.display = 'none';
        pauseSpan.style.display = 'inline';
    } else {
        sound.pause();
        sound.currentTime = 0;
        item.classList.remove('playing');
        playSpan.style.display = 'inline';
        pauseSpan.style.display = 'none';
    }
}

function stopAll() {
    Object.keys(sounds).forEach(type => {
        sounds[type].pause();
        sounds[type].currentTime = 0;

        const btn = document.querySelector(`.sound-btn[data-sound="${type}"]`);
        if (btn) {
            const item = btn.closest('.sound-item');
            const playSpan = btn.querySelector('.play');
            const pauseSpan = btn.querySelector('.pause');

            item.classList.remove('playing');
            playSpan.style.display = 'inline';
            pauseSpan.style.display = 'none';
        }
    });
}


function addCompleted(e) {
    e.preventDefault();
    
    const title = document.getElementById('compTitle').value.trim();
    const author = document.getElementById('compAuthor').value.trim();
    const date = document.getElementById('compDate').value;
    
    let books = getData('completed_books') || [];
    books.push({ title, author, date, added: new Date().toISOString() });
    saveData('completed_books', books);
    
    document.getElementById('completedForm').reset();
    loadCompleted();
}

function loadCompleted() {
    const books = getData('completed_books') || [];
    const list = document.getElementById('completedList');
    const stats = document.getElementById('readingStats');
    
    if (books.length === 0) {
        list.innerHTML = '<p class="empty-msg">No completed books yet</p>';
        stats.style.display = 'none';
        return;
    }
    
    list.innerHTML = '';
    books.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach((book, i) => {
        const item = document.createElement('div');
        item.className = 'comp-item';
        item.innerHTML = `
            <div class="comp-icon">✅</div>
            <div>
                <h4>${book.title}</h4>
                <p>by ${book.author}</p>
                <p style="font-size:0.85rem;color:var(--text-light)">Completed: ${formatDate(book.date)}</p>
            </div>
            <button class="delete-btn" onclick="deleteCompleted(${i})">Remove</button>
        `;
        list.appendChild(item);
    });
    
    updateStats(books);
}

function updateStats(books) {
    const stats = document.getElementById('readingStats');
    stats.style.display = 'block';
    
    const now = new Date();
    const month = books.filter(b => {
        const d = new Date(b.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    
    const year = books.filter(b => {
        const d = new Date(b.date);
        return d.getFullYear() === now.getFullYear();
    }).length;
    
    document.getElementById('totalBooks').textContent = books.length;
    document.getElementById('thisMonth').textContent = month;
    document.getElementById('thisYear').textContent = year;
}

function deleteCompleted(index) {
    if (!confirm('Remove this book?')) return;
    let books = getData('completed_books') || [];
    books.splice(index, 1);
    saveData('completed_books', books);
    loadCompleted();
}
