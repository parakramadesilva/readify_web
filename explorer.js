// Book explorer functionality

let currentBooks = [...BOOKS];

document.addEventListener('DOMContentLoaded', function() {
    displayBooks(BOOKS);
    
    document.getElementById('searchInput').addEventListener('input', filterBooks);
    document.getElementById('genreFilter').addEventListener('change', filterBooks);
    
    document.getElementById('modalClose').addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        if (e.target.id === 'bookModal') closeModal();
    });
});

function displayBooks(books) {
    const grid = document.getElementById('booksGrid');
    const noResults = document.getElementById('noResults');
    
    if (books.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    grid.innerHTML = '';
    
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-cover">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <span class="genre-tag">${book.genre}</span>
        `;
        card.addEventListener('click', () => showModal(book));
        grid.appendChild(card);
    });
}

function filterBooks() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const genre = document.getElementById('genreFilter').value;
    
    currentBooks = BOOKS.filter(book => {
        const matchSearch = book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search);
        const matchGenre = genre === 'all' || book.genre === genre;
        return matchSearch && matchGenre;
    });
    
    displayBooks(currentBooks);
}

function showModal(book) {
    document.getElementById('modalTitle').textContent = book.title;
    document.getElementById('modalAuthor').textContent = book.author;
    document.getElementById('modalGenre').textContent = book.genre;
    document.getElementById('modalSynopsis').textContent = book.synopsis;

    document.getElementById('modalCover').src = book.image;
    
    const seriesSection = document.getElementById('seriesSection');
    const seriesContent = document.getElementById('seriesContent');
    
    if (book.series) {
        seriesSection.style.display = 'block';
        let html = '';
        if (book.series.prequels.length > 0) {
            html += '<p><strong>Prequels:</strong></p><ul>';
            book.series.prequels.forEach(p => html += `<li>${p}</li>`);
            html += '</ul>';
        }
        if (book.series.sequels.length > 0) {
            html += '<p><strong>Sequels:</strong></p><ul>';
            book.series.sequels.forEach(s => html += `<li>${s}</li>`);
            html += '</ul>';
        }
        seriesContent.innerHTML = html;
    } else {
        seriesSection.style.display = 'none';
    }
    
    const tbody = document.getElementById('ratingsBody');
    tbody.innerHTML = '';
    book.ratings.forEach(r => {
        tbody.innerHTML += `<tr><td>${r.source}</td><td>${r.rating}</td><td>${r.reviews}</td></tr>`;
    });
    
    document.getElementById('bookModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
}
