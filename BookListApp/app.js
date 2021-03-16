// ____________________________________
// Book Class: Represents a Book
// ____________________________________
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// ____________________________________
// UI Class: Handle UI Tasks
// ____________________________________
class UI {
    // static methods - don't need to instantiate class object
    static displayBooks() {
        // Hard coded dummy date for setup
        // const StoredBooks = [
        //     {
        //         title : 'Book One',
        //         author : 'John Doe',
        //         isbn : '12345'
        //     },
        //     {
        //         title : 'Book Two',
        //         author : 'Jane Doe',
        //         isbn : '67890'
        //     }
        // ];
        // const books = StoredBooks;

        // Get Books in storage
        const books = Store.getBooks();
        books.forEach( (book) => UI.addBookToList(book) );
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <a href="#" class="btn btn-danger btn-sm delete float-end">Remove Book</a>
            </td>
            `;
        list.appendChild(row);
    }

    static deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        // Create div to show alert message
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        // Place alert between heading and form
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Make alert vanish in 3 seconds
        setTimeout( () => document.querySelector('.alert').remove(), 3000 );
    }

    static clearFields() {
        // Clear input fields after submit
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}


// ____________________________________
// Store Class: Handle Storage
// ____________________________________
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            // parse books from stringified storage
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        // store book item in stringified form
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach( (book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}



// ____________________________________
// Event: Display Books
// ____________________________________
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// ____________________________________
// Event: Add a Book
// ____________________________________
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // instantiate a book
        const book = new Book(title, author, isbn);

    // add Book to UI
    UI.addBookToList(book);

    // add Book to Store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added Successfully', 'success');

    // Clear Fields
    UI.clearFields();
    }
});

// ____________________________________
// Event: Remove a book
// ____________________________________
document.querySelector('#book-list').addEventListener('click', (e) => {

    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Book Removed Successfully', 'success');
})
