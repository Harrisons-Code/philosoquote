// Theme handling
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sunIcon = themeToggle.querySelector('.fa-sun');
const moonIcon = themeToggle.querySelector('.fa-moon');

// Set initial theme based on system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.remove('light-mode');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'block';
} else {
  body.classList.add('light-mode');
  sunIcon.style.display = 'block';
  moonIcon.style.display = 'none';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');
  sunIcon.style.display = isLightMode ? 'block' : 'none';
  moonIcon.style.display = isLightMode ? 'none' : 'block';
});

// Favorites functionality
const favoritesList = document.getElementById('favorites-list');
const noFavorites = document.getElementById('no-favorites');

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
  
  if (favorites.length === 0) {
    favoritesList.style.display = 'none';
    noFavorites.style.display = 'block';
    return;
  }

  favoritesList.style.display = 'grid';
  noFavorites.style.display = 'none';
  
  favoritesList.innerHTML = favorites.map((quote, index) => `
    <div class="favorite-quote-card">
      <div class="quote-content">
        <p class="quote-text">"${quote.quote}"</p>
        <p class="quote-author">— ${quote.author}</p>
      </div>
      <button class="remove-favorite" data-index="${index}" aria-label="Remove from favorites">
        <i class="fas fa-star"></i>
      </button>
    </div>
  `).join('');

  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-favorite').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      removeFavorite(index);
    });
  });
}

function removeFavorite(index) {
  const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
  favorites.splice(index, 1);
  localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  loadFavorites();
}

// Load favorites when the page loads
document.addEventListener('DOMContentLoaded', loadFavorites); 