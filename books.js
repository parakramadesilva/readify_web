// Book database
const BOOKS = [
    {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        pages: 324,
        image:"Images/111111tokillamocjingbird.jpg",
        synopsis: "Set in small-town Alabama, the novel is a coming-of-age story about Scout Finch and her father Atticus, a lawyer who defends a Black man falsely accused of rape. The story tackles themes of racial injustice and moral growth.",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "4.27/5", reviews: "5.2M" },
            { source: "IMDB", rating: "4.8/5", reviews: "95K" }
        ],
        series: null
    },
    {
        id: 2,
        title: "The Lord of The Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        pages: 310,
        image:"Images/x7b1730809425-71G58wrbtzL.avif",
        synopsis: "Bilbo Baggins, a hobbit enjoying his quiet life, is swept into an epic quest by Gandalf and thirteen dwarves who seek to reclaim their treasure from Smaug the dragon.",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "4.28/5", reviews: "3.5M" },
            { source: "IMDB", rating: "4.7/5", reviews: "28K" }
        ],
        series: {
            prequels: [],
            sequels: ["The Fellowship of the Ring", "The Two Towers", "The Return of the King"]
        }
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Sci-Fi",
        pages: 328,
        image:"Images/1_g8s4n-puPV3y-F2b7ilJ_A.jpg",
        synopsis: "A dystopian social science fiction novel set in Airstrip One, formerly Great Britain, a province of the totalitarian superstate Oceania. The story follows Winston Smith's attempt to rebel against the oppressive government.",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "4.19/5", reviews: "4.1M" },
            { source: "IMDB", rating: "4.6/5", reviews: "67K" }
        ],
        series: null
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        pages: 432,
        image:"Images/9780241375273.jpg",
        synopsis: "A romantic novel of manners that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "4.28/5", reviews: "3.8M" },
            { source: "IMDB", rating: "4.6/5", reviews: "45K" }
        ],
        series: null
    },
    {
        id: 5,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "Mystery",
        pages: 489,
        image:"Images/DaVinciCode.jpg",
        synopsis: "A mystery thriller following symbologist Robert Langdon and cryptologist Sophie Neveu as they investigate a murder in Paris and discover a battle between the Priory of Sion and Opus Dei over the possibility of Jesus having been married.",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "3.92/5", reviews: "2.1M" },
            { source: "IMDB", rating: "4.5/5", reviews: "38K" }
        ],
        series: {
            prequels: [],
            sequels: ["Angels & Demons", "The Lost Symbol"]
        }
    },
    {
        id: 6,
        title: "It",
        author: "Stephen King",
        genre: "Non-Fiction",
        pages: 352,
        image:"Images/b8f32b5d182ad045574401a37630f305.jpg",
        synopsis: "It is a 1986 horror novel by American author Stephen King. This is his 22nd book and his 17th novel written under his own name. The story follows seven children as they are terrorized by an evil entity called It, which exploits the fears of its victims to disguise itself while hunting its prey.",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "4.49/5", reviews: "1.8M" },
            { source: "IMDB", rating: "4.7/5", reviews: "89K" }
        ],
        series: null
    },
    {
        id: 7,
        title: "The Shining",
        author: " Stephen King",
        genre: "Thriller",
        pages: 336,
        image:"Images/images (1).jpg",
        synopsis: "The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardcover bestseller; its success firmly established King as a preeminent author in the horror genre",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "4.08/5", reviews: "1.2M" },
            { source: "IMDB", rating: "4.5/5", reviews: "125K" }
        ],
        series: null
    },
    {
        id: 8,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        pages: 309,
         image:"Images/{622708F6-78D7-453A-A7C5-3FE6853F3167}IMG400.jpg",
        synopsis: "Harry Potter has never been the star of anything. But on his eleventh birthday, he learns he's a powerful wizard with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry.",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "4.47/5", reviews: "8.9M" },
            { source: "IMDB", rating: "4.9/5", reviews: "145K" }
        ],
        series: {
            prequels: [],
            sequels: ["Chamber of Secrets", "Prisoner of Azkaban", "Goblet of Fire"]
        }
    },
    {
        id: 9,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        pages: 180,
        image:"Images/images.jpg",
        synopsis: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set in the Jazz Age on Long Island's North Shore and in New York City.",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "3.93/5", reviews: "4.5M" },
            { source: "IMDB", rating: "4.4/5", reviews: "32K" }
        ],
        series: null
    },
    {
        id: 10,
        title: "The Martian",
        author: " Andy Weir",
        genre: "Sci-Fi",
        pages: 688,
        image:"Images/The-Martian-1-1-1.jpeg",
        synopsis: "The Martian is a 2011 science fiction debut novel written by Andy Weir. The book was originally self-published on Weir's blog, in a serialized format. In 2014, the book was re-released after Crown Publishing Group purchased the exclusive publishing rights",
        ratings: [
            { source: "Rotten tomatoes 🍅", rating: "4.25/5", reviews: "1.1M" },
            { source: "IMDB", rating: "4.6/5", reviews: "24K" }
        ],
        series: {
            prequels: [],
            sequels: ["Project Hail Mary", "The Egg"]
        }
    },
    {
     id: 11,
        title: "After We Collided",
        author: "Anna Todd",
        genre: "Romance",
        pages: 300,
        image:"Images/After_We_Collided_novel_cover.jpeg",
        synopsis: "After We Collided is a 2014 young adult American romance novel written by Anna Todd under her Wattpad name Imaginator1D and published by Gallery Books, an imprint of Simon & Schuster. After We Collided is the second installment of the After novel series",
        ratings: [
            { source: "Rotten tomatoes 🍅 ", rating: "3.93/5", reviews: "4.5M" },
            { source: "IMDB", rating: "4.4/5", reviews: "32K" }
        ],
        series: null
    },
    
];

