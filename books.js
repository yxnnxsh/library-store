let books;
let dropdown = document.querySelector(".dropdown");

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += " books__loading";
  if (!books) {
    books = await getBooks();
  }
  booksWrapper.classList.remove("books__loading");

  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="book">
    <figure class="book__img--wrapper click no-cursor">
      <img src="${book.url}" alt="" class="book__img">
    </figure>
    <div class="book__title">${book.title}</div>
    <div class="book__ratings">
      ${ratingsHtml(book.rating)}
    </div>
    <div class="book__price">
      ${pricesHtml(book.originalPrice, book.salePrice)}
    </div>
  </div>`;
    })
    .join("");
  booksWrapper.innerHTML = booksHtml;
}

renderBooks();

// 1. passes the option into the input's placeholder (improves UX)
// 2. Gets the event from the onchange event listener
// and passes it as an argument for render books
function filterBooks(sortOptionDisplay, sortOptionAlgo) {
  document.querySelector(".textbox").value = sortOptionDisplay;
  renderBooks(sortOptionAlgo);
}

// toggles active class on the dropdown class
function active() {
  dropdown.classList.toggle("active");
}

// Adds the  html for the corresponding rating
function ratingsHtml(rating) {
  let ratingStr = ``;
  for (let i = 0; i < Math.floor(rating); i++) {
    ratingStr += `<i class="fas fa-star"></i>\n`;
  }

  if (rating % 1 !== 0) {
    ratingStr += `<i class="fas fa-star-half-alt"></i>`;
  }

  return ratingStr;
}

// Adds the corresponding html depending on whether the sale price exists
function pricesHtml(originalPrice, salePrice) {
  if (salePrice) {
    return `<span class="book__price--normal">$${originalPrice.toFixed(
      2
    )}</span>$${salePrice.toFixed(2)}`;
  }

  return `$${originalPrice.toFixed(2)}`;
}

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}
