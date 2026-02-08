// Home page functionality

const AUTHORS = [
{
name: "J. K. Rowling",
bio: "Joanne Rowling, better known by her pen name J. K. Rowling, is a British novelist best known for writing Harry Potter, a seven-volume series about a young wizard. Published from 1997 to 2007, the fantasy novels are the best-selling book series in history, with over 600 million copies sold.",
work: "Harry Potter series",
image: "Images/gettyimages-1061157246.avif"
},
{
name: "George Orwell",
bio: "Eric Arthur Blair was an English novelist, poet, essayist, journalist, and critic who wrote under the pen name of George Orwell. His work is characterised by lucid prose, social criticism, opposition to all totalitarianism, and support of democratic socialism",
work: "1984",
image: "Images/orwell.jpg"
},
{
name: "Jane Austen",
bio: "Jane Austen was an English writer known primarily for her six novels, which implicitly interpret, critique, and comment on the English landed gentry at the end of the 18th century. Austen's plots often explore the dependence of women on marriage for the pursuit of favourable social standing and economic security",
work: "Pride and Prejudice",
image: "Images/austen.jpg"
}
];


const QUOTES = [
{ text: "A reader lives a thousand lives before he dies", author: "George R.R. Martin" },
{ text: "The only thing you absolutely have to know is the location of the library", author: "Albert Einstein" },
{ text: "There is no friend as loyal as a book", author: "Ernest Hemingway" },
{ text: "Books are a uniquely portable magic", author: "Stephen King" },
{ text: "A room without books is like a body without a soul", author: "Cicero" },
{ text: "So many books, so little time", author: "Frank Zappa" },
{ text: "Reading is essential for those who seek to rise above the ordinary", author: "Jim Rohn" }
];

let quoteIndex = 0;

document.addEventListener('DOMContentLoaded', function() {

// Show first quote
showQuote();
setInterval(rotateQuote, 5000);

// Author of the day
showAuthorOfDay();

// Newsletter
const form = document.getElementById('newsletterForm');
if (form) {
form.addEventListener('submit', handleNewsletter);
}
});

function showQuote() {
const quote = QUOTES[quoteIndex];
document.getElementById('quoteText').textContent = quote.text;
document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
}

function rotateQuote() {
const box = document.getElementById('quoteBox');
box.style.opacity = '0';
setTimeout(() => {
quoteIndex = (quoteIndex + 1) % QUOTES.length;
showQuote();
box.style.opacity = '1';
}, 500);
}

function showAuthorOfDay() {
const today = new Date();
const dayOfYear =
Math.floor(
(today - new Date(today.getFullYear(), 0, 0)) / 86400000
);

const author = AUTHORS[dayOfYear % AUTHORS.length];

document.getElementById('authorName').textContent = author.name;
document.getElementById('authorBio').textContent = author.bio;
document.getElementById('authorWork').textContent = author.work;
document.getElementById('authorImage').src = author.image;
}

function handleNewsletter(e) {
e.preventDefault();

const emailInput = document.getElementById('newsletterEmail');
const msg = document.getElementById('newsletterMessage');
const email = emailInput.value.trim();

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!regex.test(email)) {
msg.textContent = 'Please enter a valid email';
msg.className = 'message error';
return;
}

let subs;
try {
subs = getData('newsletter') || [];
} catch (err) {
subs = [];
}

if (subs.includes(email)) {
msg.textContent = 'Already subscribed!';
msg.className = 'message error';
return;
}

subs.push(email);

try {
saveData('newsletter', subs);
} catch (err) {
console.error(err);
}

msg.textContent = 'Thanks for subscribing!';
msg.className = 'message success';
emailInput.value = '';

setTimeout(() => {
msg.textContent = '';
}, 3000);
}