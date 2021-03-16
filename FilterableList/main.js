// Get input element from search bar
let filterInput = document.getElementById('filterInput');

// Add event listener
filterInput.addEventListener('keyup', filterNames);

function filterNames() {
    // Get input value
    let filterValue = document.getElementById('filterInput').value.toUpperCase();

    // Get the names ul
    let ul = document.getElementById('names');

    // Get the li items from the ul
    let li = ul.querySelectorAll('li.collection-item');

    // loop through li collection
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0];
        // if matched
        if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
