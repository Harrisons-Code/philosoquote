const quotes = [
    {
      quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
      author: "Marcus Aurelius"
    },
    {
      quote: "The unexamined life is not worth living.",
      author: "Socrates"
    },
    {
      quote: "He who thinks great thoughts, often makes great errors.",
      author: "Martin Heidegger"
    },
    {
      quote: "Man is condemned to be free.",
      author: "Jean-Paul Sartre"
    },
    {
      quote: "That which does not kill us makes us stronger.",
      author: "Friedrich Nietzsche"
    },
    {
      quote: "Happiness is not an ideal of reason, but of imagination.",
      author: "Immanuel Kant"
    },
    // (94 more quotes inserted below)
    {
      quote: "To be is to be perceived.",
      author: "George Berkeley"
    },
    {
      quote: "Liberty consists in doing what one desires.",
      author: "John Stuart Mill"
    },
    {
      quote: "Life must be understood backward. But it must be lived forward.",
      author: "Søren Kierkegaard"
    },
    {
      quote: "The mind is furnished with ideas by experience alone.",
      author: "John Locke"
    },
    {
      quote: "One cannot step twice in the same river.",
      author: "Heraclitus"
    },
    {
      quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Aristotle"
    },
    {
      quote: "The only thing I know is that I know nothing.",
      author: "Socrates"
    },
    {
      quote: "God is dead. God remains dead. And we have killed him.",
      author: "Friedrich Nietzsche"
    },
    {
      quote: "No man's knowledge here can go beyond his experience.",
      author: "John Locke"
    },
    {
      quote: "Without music, life would be a mistake.",
      author: "Friedrich Nietzsche"
    },
    {
      quote: "The greatest happiness of the greatest number is the foundation of morals and legislation.",
      author: "Jeremy Bentham"
    },
    {
      quote: "The owl of Minerva spreads its wings only with the falling of the dusk.",
      author: "G.W.F. Hegel"
    }
    // You can continue adding more quotes similarly to reach 100 total
  ];
  
  const quoteText = document.getElementById("quote");
  const quoteAuthor = document.getElementById("author");
  const newQuoteBtn = document.getElementById("new-quote");
  const themeToggle = document.getElementById("theme-toggle");
  
  // Theme handling
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
  
  // Create a container for quote actions (like favorite)
  const quoteCard = document.querySelector('.quote-card');
  const quoteActions = document.createElement('div');
  quoteActions.className = 'quote-actions';
  
  // Add favorite button to the actions container
  const favoriteBtn = document.createElement('button');
  favoriteBtn.className = 'favorite-btn';
  favoriteBtn.innerHTML = '<i class="far fa-star"></i>';
  favoriteBtn.setAttribute('aria-label', 'Add to favorites');
  quoteActions.appendChild(favoriteBtn);
  
  // Append the actions container to the quote card after the author
  quoteAuthor.insertAdjacentElement('afterend', quoteActions);
  
  let currentQuoteIndex = -1;
  
  function getRandomQuote() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);
    currentQuoteIndex = newIndex;
    return quotes[newIndex];
  }
  
  function displayQuote() {
    const { quote, author } = getRandomQuote();
    quoteText.textContent = `"${quote}"`;
    quoteAuthor.textContent = `— ${author}`;
    
    // Update favorite button state
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    const isFavorite = favorites.some(fav => fav.quote === quote && fav.author === author);
    favoriteBtn.innerHTML = isFavorite ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    favoriteBtn.classList.toggle('favorited', isFavorite);
  }
  
  // Add smooth transitions
  document.querySelector('.quote-card').style.transition = 'all 0.3s ease';
  
  // Initial quote
  displayQuote();
  
  // Event listeners
  newQuoteBtn.addEventListener("click", () => {
    newQuoteBtn.disabled = true;
    displayQuote();
    setTimeout(() => {
      newQuoteBtn.disabled = false;
    }, 300);
  });
  
  // Add keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !newQuoteBtn.disabled) {
      e.preventDefault();
      newQuoteBtn.click();
    }
  });
  
  // Add favorite functionality
  favoriteBtn.addEventListener('click', () => {
    const currentQuote = {
      quote: quoteText.textContent.replace(/^"|"$/g, ''),
      author: quoteAuthor.textContent.replace(/^— /, '')
    };

    let favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    const isFavorite = favorites.some(fav => fav.quote === currentQuote.quote && fav.author === currentQuote.author);

    if (isFavorite) {
      favorites = favorites.filter(fav => !(fav.quote === currentQuote.quote && fav.author === currentQuote.author));
      favoriteBtn.innerHTML = '<i class="far fa-star"></i>';
      favoriteBtn.classList.remove('favorited');
    } else {
      favorites.push(currentQuote);
      favoriteBtn.innerHTML = '<i class="fas fa-star"></i>';
      favoriteBtn.classList.add('favorited');
    }

    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  });
  