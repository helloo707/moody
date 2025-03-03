// Initialize demo data for visualization
function initializeDemoData() {
  // Generate mood data for the past 30 days
  const today = new Date();
  const moodOptions = ['great', 'good', 'okay', 'sad', 'awful'];
  const moodEmojis = {
    'great': '😁',
    'good': '🙂',
    'okay': '😐',
    'sad': '😔',
    'awful': '😢'
  };

  // Generate sample mood data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const randomMoodIndex = Math.floor(Math.random() * 5);
    const mood = moodOptions[randomMoodIndex];
    
    state.moodData.push({
      date: date,
      mood: mood,
      emoji: moodEmojis[mood],
      note: i % 5 === 0 ? `Sample note for ${date.toDateString()}` : ''
    });
  }

  // Generate sample journal entries
  const journalTitles = [
    "A day of reflection",
    "New beginnings",
    "Challenges and growth",
    "Finding peace",
    "Moments of gratitude"
  ];

  const journalContents = [
    "Today I took time to reflect on my progress and felt proud of how far I've come.",
    "Started a new project today and I'm excited about the possibilities.",
    "Faced some challenges today, but I'm learning to see them as opportunities for growth.",
    "Found a moment of peace during a hectic day. Reminded myself to breathe.",
    "Grateful for the small moments that brought joy today."
  ];

  for (let i = 15; i >= 0; i--) {
    if (i % 3 === 0) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const randomIndex = Math.floor(Math.random() * journalTitles.length);
      
      state.journalEntries.push({
        date: date,
        title: journalTitles[randomIndex],
        content: journalContents[randomIndex]
      });
    }
  }
}
// app.js for Mood Tracker
const state = {
  currentPage: 'dashboard',
  darkMode: localStorage.getItem('darkMode') === 'true',
  selectedMood: null,
  moodData: JSON.parse(localStorage.getItem('moodData')) || [],
  journalEntries: JSON.parse(localStorage.getItem('journalEntries')) || [],
  selectedDate: new Date(),
  currentMonth: new Date(),
  quotes: [
    "You are capable of amazing things. Take a deep breath and embrace the day ahead.",
    "Your emotions are valid and important. Acknowledging them is the first step to growth.",
    "Small steps forward are still progress. Be proud of how far you've come.",
    "Today is a new opportunity to be kind to yourself.",
    "You don't have to be perfect to be worthy of love and respect."
  ],
  activities: [
    {
      id: 1,
      title: "5-Minute Meditation",
      icon: "🧘",
      description: "Take a short break to center yourself and breathe deeply.",
      category: "mindfulness",
      duration: 5,
      completed: false
    },
    {
      id: 2,
      title: "Nature Walk",
      icon: "🚶",
      description: "A 15-minute walk outside can boost your mood significantly.",
      category: "physical",
      duration: 15,
      completed: false
    },
    {
      id: 3,
      title: "Gratitude Journaling",
      icon: "📝",
      description: "Write down 3 things you're grateful for today.",
      category: "mindfulness",
      duration: 10,
      completed: false
    },
    {
      id: 4,
      title: "Mood Playlist",
      icon: "🎵",
      description: "Listen to music curated to improve your current mood.",
      category: "relaxation",
      duration: 20,
      completed: false
    }
  ],
  currentActivity: null,
  musicPlaylists: {
    relaxation: [
      { name: "Calm Meditation", url: "spotify:playlist:37i9dQZF1DWZqd5JICZI0u" },
      { name: "Deep Focus", url: "spotify:playlist:37i9dQZF1DWZeKCadgRdKQ" }
    ],
    energetic: [
      { name: "Mood Booster", url: "spotify:playlist:37i9dQZF1DX3rxVfibe1L0" },
      { name: "Motivation Mix", url: "spotify:playlist:37i9dQZF1DX76Wlfdnj7AP" }
    ],
    calm: [
      { name: "Peaceful Piano", url: "spotify:playlist:37i9dQZF1DX4sWSpwq3LiO" },
      { name: "Nature Sounds", url: "spotify:playlist:37i9dQZF1DX4PP3DA4J0N8" }
    ]
  }
};
document.addEventListener('DOMContentLoaded', function() {
  // First ensure all DOM elements exist
  const elements = {
    moodSelector: document.querySelector('.mood-selector'),
    saveMoodBtn: document.getElementById('save-mood'),
    journalEntry: document.getElementById('journal-entry'),
    saveJournalBtn: document.getElementById('save-journal'),
    weeklyMoodChart: document.getElementById('weeklyMoodChart'),
    // ... add all your element references here
  }

  // Initialize state
  const state = {
    currentPage: 'dashboard',
    darkMode: localStorage.getItem('darkMode') === 'true',
    selectedMood: null,
    moodData: JSON.parse(localStorage.getItem('moodData')) || [],
    journalEntries: JSON.parse(localStorage.getItem('journalEntries')) || [],
    selectedDate: new Date(),
    currentMonth: new Date(),
    quotes: [
      "You are capable of amazing things. Take a deep breath and embrace the day ahead.",
      "Your emotions are valid and important. Acknowledging them is the first step to growth.",
      "Small steps forward are still progress. Be proud of how far you've come.",
      "Today is a new opportunity to be kind to yourself.",
      "You don't have to be perfect to be worthy of love and respect."
    ]
  };

  // ---------- Initialize Demo Data ----------
  initializeDemoData();

  // ---------- UI Element References ----------
  const navLinks = document.querySelectorAll('.nav-links li');
  const pages = document.querySelectorAll('.page');
  const themeSwitch = document.getElementById('theme-switch');
  const modeText = document.querySelector('.mode-text');
  const currentDateEl = document.getElementById('current-date');
  const greetingEl = document.getElementById('greeting');
  const moodElements = document.querySelectorAll('.mood');
  const saveMoodBtn = document.getElementById('save-mood');
  const quoteText = document.getElementById('quote-text');
  const journalEntry = document.getElementById('journal-entry');
  const saveJournalBtn = document.getElementById('save-journal');
  const weeklyMoodChart = document.getElementById('weeklyMoodChart');
  const journalTitle = document.getElementById('journal-title');
  const journalContent = document.getElementById('journal-content');
  const saveFullJournalBtn = document.getElementById('save-full-journal');
  const entriesList = document.getElementById('entries-list');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const calendarMonth = document.getElementById('calendar-month');
  const calendarDays = document.getElementById('calendar-days');
  const selectedDateEl = document.getElementById('selected-date');
  const dayMoodEmoji = document.getElementById('day-mood-emoji');
  const dayMoodText = document.getElementById('day-mood-text');
  const dayJournalContent = document.getElementById('day-journal-content');
  const categoryBtns = document.querySelectorAll('.category');
  const accentColorInput = document.getElementById('accent-color');
  const themeSelect = document.getElementById('theme-select');
  const displayNameInput = document.getElementById('display-name');

  // ---------- Initialize App ----------
  updateDateTime();
  displayRandomQuote();
  renderWeeklyMoodChart();
  renderJournalEntries();
  renderMoodDistributionChart();
  renderMoodTrendsChart();
  renderMoodHeatmap();
  renderCalendar();
  setupProfileSettings();
  renderActivities('all');
  initializeWaterChallenge();

  // Daily updates
  setInterval(updateDateTime, 60000); // Update time every minute

  // ---------- Event Listeners ----------

  // Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      navigateToPage(page);
    });
  });

  // Theme Toggle
  themeSwitch.addEventListener('change', function() {
    toggleDarkMode(this.checked);
  });

  // Mood Selection
  moodElements.forEach(mood => {
    mood.addEventListener('click', function() {
      selectMood(this);
    });
  });

  // Save Mood
  saveMoodBtn.addEventListener('click', function() {
    saveMood();
  });

  // Save Quick Journal
  saveJournalBtn.addEventListener('click', function() {
    saveQuickJournal();
  });

  // Save Full Journal
  saveFullJournalBtn.addEventListener('click', function() {
    saveFullJournal();
  });

  // Analytics Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      updateAnalytics(this.getAttribute('data-period'));
    });
  });

  // Calendar Navigation
  prevMonthBtn.addEventListener('click', function() {
    navigateMonth(-1);
  });

  nextMonthBtn.addEventListener('click', function() {
    navigateMonth(1);
  });

  // Self-Care Categories
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      categoryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterActivities(this.getAttribute('data-category'));
    });
  });

  // Accent Color
  accentColorInput.addEventListener('change', function() {
    changeAccentColor(this.value);
  });

  // Theme Select
  themeSelect.addEventListener('change', function() {
    updateThemePreference(this.value);
  });

  // Display Name
  displayNameInput.addEventListener('input', function() {
    updateGreeting(this.value);
  });

  // Add event listeners for activity categories
  document.querySelectorAll('.category').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.category').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderActivities(this.dataset.category);
    });
  });

  // Update date and time display
  function updateDateTime() {
    const now = new Date();
    currentDateEl.textContent = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });

    const hour = now.getHours();
    let greeting = 'Good ';
    
    if (hour < 12) {
      greeting += 'morning';
    } else if (hour < 18) {
      greeting += 'afternoon';
    } else {
      greeting += 'evening';
    }
    
    const username = displayNameInput ? displayNameInput.value : 'User';
    greetingEl.textContent = `${greeting}, ${username}!`;
  }

  // Display a random quote/affirmation
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * state.quotes.length);
    quoteText.textContent = state.quotes[randomIndex];
  }

  // Handle page navigation
  function navigateToPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.toggle('active', page.id === pageName);
    });
  
    document.querySelectorAll('.nav-links li').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });
  
    // Update state if it exists
    if (typeof state !== 'undefined') {
      state.currentPage = pageName;
    }
  
    // Update analytics if on analytics page
    if (pageName === 'analytics') {
      if (typeof renderMoodDistributionChart === 'function') {
        renderMoodDistributionChart();
      }
      if (typeof renderMoodTrendsChart === 'function') {
        renderMoodTrendsChart();
      }
      if (typeof renderMoodHeatmap === 'function') {
        renderMoodHeatmap();
      }
    }
  
    // Update calendar if on calendar page
    if (pageName === 'calendar' && typeof renderCalendar === 'function') {
      renderCalendar();
    }
  }

  // Toggle dark mode
  function toggleDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    state.darkMode = isDark;
    localStorage.setItem('darkMode', isDark);
  }

  // Select mood
  function selectMood(moodElement) {
    moodElements.forEach(el => el.classList.remove('selected'));
    moodElement.classList.add('selected');
    state.selectedMood = moodElement.getAttribute('data-mood');
  }

  // Save mood
  function saveMood() {
    try {
      if (!state.selectedMood) {
        throw new Error('Please select a mood first');
      }
  
      const today = new Date();
      const moodEntry = {
        date: today,
        mood: state.selectedMood,
        note: journalEntry.value || ''
      };
  
      state.moodData.push(moodEntry);
      updateUI();
      showToast('Mood saved successfully!');
    } catch (error) {
      showToast(error.message);
    }
  }

  // Save quick journal entry
  function saveQuickJournal() {
    const content = journalEntry.value.trim();
    if (!content) {
      alert('Please write something before saving');
      return;
    }

    const today = new Date();

    // Check if there's a mood entry for today
    const todayMoodEntry = state.moodData.find(entry => 
      entry.date.toDateString() === today.toDateString()
    );

    if (todayMoodEntry) {
      todayMoodEntry.note = content;
    }

    // Add to journal entries if it's substantial
    if (content.length > 20) {
      // Check if there's already a journal entry for today
      const todayJournalEntry = state.journalEntries.find(entry => 
        entry.date.toDateString() === today.toDateString()
      );

      if (todayJournalEntry) {
        todayJournalEntry.content = content;
      } else {
        state.journalEntries.push({
          date: today,
          title: 'Quick Journal Entry',
          content: content
        });
      }

      renderJournalEntries();
    }

    alert('Journal entry saved!');
    journalEntry.value = '';
  }

  // Save full journal entry
  function saveFullJournal() {
    const title = journalTitle.value.trim();
    const content = journalContent.value.trim();

    if (!title || !content) {
      alert('Please provide both title and content for your journal entry');
      return;
    }

    const today = new Date();

    // Check if there's already a journal entry for today
    const todayEntry = state.journalEntries.find(entry => 
      entry.date.toDateString() === today.toDateString()
    );

    if (todayEntry) {
      todayEntry.title = title;
      todayEntry.content = content;
    } else {
      state.journalEntries.push({
        date: today,
        title: title,
        content: content
      });
    }

    renderJournalEntries();
    alert('Journal entry saved!');
    journalTitle.value = '';
    journalContent.value = '';
  }

  // Render weekly mood chart
  function renderWeeklyMoodChart() {
    if (!weeklyMoodChart) return;
    
    // Destroy existing chart
    if (window.weeklyChart) {
      window.weeklyChart.destroy();
    }
  
    const ctx = weeklyMoodChart.getContext('2d');
    window.weeklyChart = new Chart(ctx, {
      type: 'line',
      data: {
        // ... your chart data
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Render journal entries
  function renderJournalEntries() {
    if (!entriesList) return;

    // Clear existing entries
    entriesList.innerHTML = '';

    // Sort entries by date, newest first
    const sortedEntries = [...state.journalEntries].sort((a, b) => b.date - a.date);

    if (sortedEntries.length === 0) {
      entriesList.innerHTML = '<p>No journal entries yet. Start writing today!</p>';
      return;
    }

    // Create entry cards
    sortedEntries.forEach(entry => {
      const entryCard = document.createElement('div');
      entryCard.className = 'entry-card';

      const formattedDate = entry.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      entryCard.innerHTML = `
        <div class="entry-header">
          <h4 class="entry-title">${entry.title}</h4>
          <span class="entry-date">${formattedDate}</span>
        </div>
        <p class="entry-content">${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}</p>
      `;

      entriesList.appendChild(entryCard);
    });
  }

  // Render mood distribution chart
  function renderMoodDistributionChart() {
    const distributionChart = document.getElementById('moodDistributionChart');
    if (!distributionChart) return;

    // Count occurrences of each mood
    const moodCounts = {
      'great': 0,
      'good': 0,
      'okay': 0,
      'sad': 0,
      'awful': 0
    };

    state.moodData.forEach(entry => {
      if (moodCounts.hasOwnProperty(entry.mood)) {
        moodCounts[entry.mood]++;
      }
    });

    // Prepare data for chart
    const labels = Object.keys(moodCounts).map(mood => mood.charAt(0).toUpperCase() + mood.slice(1));
    const data = Object.values(moodCounts);
    const backgroundColors = [
      'rgba(52, 211, 153, 0.7)', // great - green
      'rgba(96, 165, 250, 0.7)', // good - blue
      'rgba(251, 191, 36, 0.7)', // okay - yellow
      'rgba(167, 139, 250, 0.7)', // sad - purple
      'rgba(239, 68, 68, 0.7)'    // awful - red
    ];

    // Get the chart context
    const ctx = distributionChart.getContext('2d');

    // Destroy existing chart if it exists
    if (window.distributionChartInstance) {
      window.distributionChartInstance.destroy();
    }

    // Create the chart
    window.distributionChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  // Render mood trends chart
  function renderMoodTrendsChart() {
    const trendsChart = document.getElementById('moodTrendsChart');
    if (!trendsChart) return;

    // Get the last 30 days of data
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 30);

    const monthData = state.moodData.filter(entry => 
      entry.date >= monthAgo && entry.date <= today
    ).sort((a, b) => a.date - b.date);

    // Prepare data for chart
    const labels = monthData.map(entry => 
      entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );

    const moodValues = monthData.map(entry => {
      switch(entry.mood) {
        case 'great': return 5;
        case 'good': return 4;
        case 'okay': return 3;
        case 'sad': return 2;
        case 'awful': return 1;
        default: return 0;
      }
    });

    // Calculate 7-day moving average
    const movingAverage = [];
    for (let i = 0; i < moodValues.length; i++) {
      if (i < 6) {
        movingAverage.push(null); // Not enough data for first 6 days
      } else {
        const sum = moodValues.slice(i-6, i+1).reduce((a, b) => a + b, 0);
        movingAverage.push((sum / 7).toFixed(2));
      }
    }

    // Get the chart context
    const ctx = trendsChart.getContext('2d');

    // Destroy existing chart if it exists
    if (window.trendsChartInstance) {
      window.trendsChartInstance.destroy();
    }

    // Create the chart
    window.trendsChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Daily Mood',
            data: moodValues,
            borderColor: 'rgba(124, 58, 237, 0.7)',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            pointBackgroundColor: 'rgb(124, 58, 237)',
            pointRadius: 3,
            type: 'line',
            order: 2
          },
          {
            label: '7-Day Average',
            data: movingAverage,
            borderColor: 'rgba(220, 38, 38, 0.7)',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            type: 'line',
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                switch(value) {
                  case 5: return 'Great';
                  case 4: return 'Good';
                  case 3: return 'Okay';
                  case 2: return 'Sad';
                  case 1: return 'Awful';
                  default: return '';
                }
              }
            }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45
            }
          }
        }
      }
    });
  }

  // Render mood heatmap
  function renderMoodHeatmap() {
    const heatmapContainer = document.getElementById('mood-heatmap-container');
    if (!heatmapContainer) return;

    // Clear existing content
    heatmapContainer.innerHTML = '';
    
    // Create a simple color-coded grid for now
    // In a real app, you might use a library like D3.js for a proper heatmap
    const heatmapTable = document.createElement('table');
    heatmapTable.className = 'mood-heatmap-table';
    heatmapTable.style.width = '100%';
    heatmapTable.style.borderCollapse = 'collapse';

    // Create header row with weekdays
    const headerRow = document.createElement('tr');
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      const th = document.createElement('th');
      th.textContent = day;
      th.style.padding = '8px';
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    heatmapTable.appendChild(headerRow);

    // Get the first day of the current month
    const firstDay = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth(), 1);
    
    // Calculate the number of weeks needed in the calendar
    const daysInMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = firstDay.getDay() || 7; // Convert Sunday (0) to 7 for easier calculation
    const weeksNeeded = Math.ceil((daysInMonth + (firstDayOfWeek - 1)) / 7);

    // Create a week row for each week
    for (let week = 0; week < weeksNeeded; week++) {
      const weekRow = document.createElement('tr');
      
      for (let day = 1; day <= 7; day++) {
        const calculatedDay = (week * 7) + day - (firstDayOfWeek - 1);
        const td = document.createElement('td');
        td.style.padding = '8px';
        td.style.textAlign = 'center';
        td.style.height = '30px';
        
        // Check if the day is within the current month
        if (calculatedDay > 0 && calculatedDay <= daysInMonth) {
          const date = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth(), calculatedDay);
          
          // Find mood entry for this date
          const moodEntry = state.moodData.find(entry => 
            entry.date.toDateString() === date.toDateString()
          );
          
          if (moodEntry) {
            // Set background color based on mood
            let bgColor;
            switch(moodEntry.mood) {
              case 'great': bgColor = 'rgba(52, 211, 153, 0.7)'; break; // green
              case 'good': bgColor = 'rgba(96, 165, 250, 0.7)'; break; // blue
              case 'okay': bgColor = 'rgba(251, 191, 36, 0.7)'; break; // yellow
              case 'sad': bgColor = 'rgba(167, 139, 250, 0.7)'; break; // purple
              case 'awful': bgColor = 'rgba(239, 68, 68, 0.7)'; break; // red
              default: bgColor = 'transparent';
            }
            
            td.style.backgroundColor = bgColor;
            td.textContent = calculatedDay;
          } else {
            td.textContent = calculatedDay;
            td.style.backgroundColor = 'rgba(229, 231, 235, 0.5)'; // light gray
          }
        }
        
        weekRow.appendChild(td);
      }
      
      heatmapTable.appendChild(weekRow);
    }
    
    heatmapContainer.appendChild(heatmapTable);
  }

  // Update analytics based on selected time period
  function updateAnalytics(period) {
    // This function would be used to update the analytics charts based on the selected time period
    // For now, just re-render the charts
    renderMoodDistributionChart();
    renderMoodTrendsChart();
    renderMoodHeatmap();
  }

  // Render calendar
  function renderCalendar() {
    if (!calendarDays || !calendarMonth) return;

    // Clear existing calendar
    calendarDays.innerHTML = '';

    // Update month display
    calendarMonth.textContent = state.currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    // Get first day of the month and days in month
    const firstDay = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth(), 1);
    const daysInMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 0).getDate();
    
    // Get day of week for the first day (0 = Sunday, 6 = Saturday)
    let firstDayOfWeek = firstDay.getDay();
    
    // Create previous month's days
    const prevMonthDays = firstDayOfWeek;
    const prevMonth = new Date(state.currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
    
    for (let i = 0; i < prevMonthDays; i++) {
      const day = document.createElement('div');
      day.className = 'calendar-day other-month';
      const dayNumber = daysInPrevMonth - prevMonthDays + i + 1;
      day.innerHTML = `<span class="date">${dayNumber}</span>`;
      calendarDays.appendChild(day);
    }
    
    // Create current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement('div');
      day.className = 'calendar-day';
      
      const date = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth(), i);
      
      // Find mood entry for this date
      const moodEntry = state.moodData.find(entry => 
        entry.date.toDateString() === date.toDateString()
      );
      
      // Add mood emoji if exists
      let moodEmoji = '';
      if (moodEntry) {
        moodEmoji = `<span class="mood-emoji">${moodEntry.emoji}</span>`;
      }
      
      day.innerHTML = `<span class="date">${i}</span>${moodEmoji}`;
      
      // Check if this is today
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        day.style.border = '2px solid var(--primary-color)';
      }
      
      // Check if this is the selected date
      if (date.toDateString() === state.selectedDate.toDateString()) {
        day.classList.add('active');
      }
      
      // Add click event to select date
      day.addEventListener('click', function() {
        // Remove active class from all days
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
        // Add active class to selected day
        this.classList.add('active');
        // Update selected date
        state.selectedDate = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth(), i);
        // Update day details
        updateDayDetails();
      });
      
      calendarDays.appendChild(day);
    }
    
    // Calculate how many days from next month are needed to fill the grid
    const totalDaysSoFar = prevMonthDays + daysInMonth;
    const remainingDays = 42 - totalDaysSoFar; // 6 rows × 7 days = 42
    
    // Create next month's days
    for (let i = 1; i <= remainingDays; i++) {
        // Create new day element for next month
        const day = document.createElement('div'); // Fix: Define day variable
        day.className = 'calendar-day other-month';
        day.innerHTML = `<span class="date">${i}</span>`;
        calendarDays.appendChild(day);
    }

    // Update day details
    updateDayDetails();
  }

  // Update day details panel
  function updateDayDetails() {
    if (!selectedDateEl || !dayMoodEmoji || !dayMoodText || !dayJournalContent) return;

    const formattedDate = state.selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    selectedDateEl.textContent = formattedDate;

    // Find mood entry for selected date
    const moodEntry = state.moodData.find(entry => 
        entry.date.toDateString() === state.selectedDate.toDateString()
    );

    // Find journal entry for selected date
    const journalEntry = state.journalEntries.find(entry =>
        entry.date.toDateString() === state.selectedDate.toDateString()
    );

    if (moodEntry) {
        dayMoodEmoji.textContent = moodEntry.emoji;
        dayMoodText.textContent = moodEntry.mood.charAt(0).toUpperCase() + moodEntry.mood.slice(1);
    } else {
        dayMoodEmoji.textContent = '--';
        dayMoodText.textContent = 'No mood recorded';
    }

    if (journalEntry) {
        dayJournalContent.textContent = journalEntry.content;
    } else {
        dayJournalContent.textContent = 'No journal entry for this day.';
    }
  }

  // Navigate between months
  function navigateMonth(direction) {
    state.currentMonth.setMonth(state.currentMonth.getMonth() + direction);
    renderCalendar();
  }

  // Filter self-care activities
  function filterActivities(category) {
    const activities = document.querySelectorAll('.activity-card');
    if (category === 'all') {
        activities.forEach(activity => activity.style.display = 'flex');
    } else {
        activities.forEach(activity => {
            if (activity.getAttribute('data-category') === category) {
                activity.style.display = 'flex';
            } else {
                activity.style.display = 'none';
            }
        });
    }
  }

  // Change accent color
  function changeAccentColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-hover', adjustColorBrightness(color, -10));
    localStorage.setItem('accentColor', color);
  }

  // Update theme preference
  function updateThemePreference(theme) {
    switch(theme) {
        case 'dark':
            toggleDarkMode(true);
            break;
        case 'light':
            toggleDarkMode(false);
            break;
        case 'auto':
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            toggleDarkMode(prefersDark);
            break;
    }
    localStorage.setItem('theme', theme);
  }

  // Setup profile settings
  function setupProfileSettings() {
    // Load saved settings
    const savedName = localStorage.getItem('userName');
    const savedColor = localStorage.getItem('accentColor');
    const savedTheme = localStorage.getItem('theme');

    if (savedName && displayNameInput) {
        displayNameInput.value = savedName;
        updateGreeting(savedName);
    }

    if (savedColor && accentColorInput) {
        accentColorInput.value = savedColor;
        changeAccentColor(savedColor);
    }

    if (savedTheme && themeSelect) {
        themeSelect.value = savedTheme;
        updateThemePreference(savedTheme);
    }
  }

  // Update greeting with user name
  function updateGreeting(name) {
    const hour = new Date().getHours();
    let greeting = 'Good ';
    
    if (hour < 12) greeting += 'morning';
    else if (hour < 18) greeting += 'afternoon';
    else greeting += 'evening';
    
    if (greetingEl) {
        greetingEl.textContent = `${greeting}, ${name}!`;
    }
    
    localStorage.setItem('userName', name);
  }

  // Utility function to adjust color brightness
  function adjustColorBrightness(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (0x1000000 + 
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }

  // Export user data
  function exportUserData() {
    const data = {
        moodData: state.moodData,
        journalEntries: state.journalEntries,
        settings: {
            theme: localStorage.getItem('theme'),
            accentColor: localStorage.getItem('accentColor'),
            userName: localStorage.getItem('userName')
        }
    };

    const dataStr = JSON.stringify(data);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'mood-tracker-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  // Delete all user data
  function deleteAllData() {
    if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
        state.moodData = [];
        state.journalEntries = [];
        localStorage.clear();
        
        // Reset UI
        renderWeeklyMoodChart();
        renderJournalEntries();
        renderMoodDistributionChart();
        renderMoodTrendsChart();
        renderMoodHeatmap();
        renderCalendar();
        
        alert('All data has been deleted successfully.');
    }
  }

  // Add event listeners for data management
  document.querySelectorAll('.settings-card button').forEach(button => {
    if (button.textContent === 'Export Your Data') {
        button.addEventListener('click', exportUserData);
    } else if (button.textContent === 'Delete All Data') {
        button.addEventListener('click', deleteAllData);
    }
  });

  // Initialize theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  toggleDarkMode(localStorage.getItem('darkMode') === 'true' || prefersDark);
});


document.addEventListener('click', function(e) {
  // Handle navigation
  if (e.target.closest('.nav-links li')) {
    const navItem = e.target.closest('.nav-links li');
    navigateToPage(navItem.dataset.page);
  }

  // Handle mood selection
  if (e.target.closest('.mood')) {
    const moodElement = e.target.closest('.mood');
    selectMood(moodElement);
  }
});


function showTimer(minutes, callback) {
  const modal = document.createElement('div');
  modal.className = 'timer-modal';
  modal.innerHTML = `
    <div class="timer-content">
      <h3>Timer</h3>
      <div class="timer-display">
        <span class="minutes">${String(minutes).padStart(2, '0')}</span>:
        <span class="seconds">00</span>
      </div>
      <button class="primary-btn cancel-timer">End Early</button>
    </div>
  `;

  document.body.appendChild(modal);

  let timeLeft = minutes * 60; // Convert to seconds
  let timerInterval;

  function updateTimerDisplay() {
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;
    
    const minutesDisplay = modal.querySelector('.minutes');
    const secondsDisplay = modal.querySelector('.seconds');
    
    minutesDisplay.textContent = String(minutesLeft).padStart(2, '0');
    secondsDisplay.textContent = String(secondsLeft).padStart(2, '0');
  }

  // Start timer
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.body.removeChild(modal);
      callback();
      showToast('Activity completed! 🎉');
    }
  }, 1000);

  // Add event listener for cancel button
  modal.querySelector('.cancel-timer').addEventListener('click', () => {
    if (confirm('Are you sure you want to end this activity early?')) {
      clearInterval(timerInterval);
      document.body.removeChild(modal);
    }
  });
}

// Add this toast notification function if not already present
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

function saveToLocalStorage() {
  localStorage.setItem('moodData', JSON.stringify(state.moodData));
  localStorage.setItem('journalEntries', JSON.stringify(state.journalEntries));
  localStorage.setItem('darkMode', state.darkMode);
}

// Call this after any state changes
function updateUI() {
  renderWeeklyMoodChart();
  renderJournalEntries(); 
  renderMoodDistributionChart();
  renderMoodTrendsChart();
  saveToLocalStorage();
}

function validateJournalEntry() {
  const title = document.getElementById('journal-title').value.trim();
  const content = document.getElementById('journal-content').value.trim();

  if (!title || !content) {
    showToast('Please fill in both title and content');
    return false;
  }
  return true;
}

function renderActivities(category) {
  const container = document.querySelector('.activities-container');
  if (!container) return;

  container.innerHTML = '';
  const filteredActivities = category === 'all' 
      ? state.activities 
      : state.activities.filter(activity => activity.category === category);

  filteredActivities.forEach(activity => {
      const card = document.createElement('div');
      card.className = 'activity-card';
      card.dataset.category = activity.category;

      card.innerHTML = `
          <div class="activity-icon">${activity.icon}</div>
          <h3>${activity.title}</h3>
          <p>${activity.description}</p>
          <div class="activity-meta">
              <span class="duration">${activity.duration} min</span>
              <button class="activity-btn ${activity.completed ? 'completed' : ''}" data-id="${activity.id}">
                  ${activity.completed ? 'Completed ✓' : 'Start Now'}
              </button>
          </div>
      `;

      card.querySelector('.activity-btn').addEventListener('click', () => startActivity(activity));
      container.appendChild(card);
  });
}

function startActivity(activity) {
  switch(activity.title) {
      case "5-Minute Meditation":
          showTimer(activity.duration, () => completeActivity(activity.id));
          break;
      case "Nature Walk":
          showTimer(activity.duration, () => completeActivity(activity.id));
          break;
      case "Gratitude Journaling":
          showGratitudeJournal(activity.id);
          break;
      case "Mood Playlist":
          showMusicPlayer(activity, () => completeActivity(activity.id));
          break;
      default:
          console.warn('Unknown activity type');
  }
}

function completeActivity(activityId) {
  const activity = state.activities.find(a => a.id === activityId);
  if (activity) {
      activity.completed = true;
      showToast(`Completed: ${activity.title} 🎉`);
      renderActivities(document.querySelector('.category.active').dataset.category);
  }
}

function initializeWaterChallenge() {
  const progressBar = document.querySelector('.challenge-progress .progress');
  const progressText = document.querySelector('.challenge-progress span');
  let waterCount = parseInt(localStorage.getItem('waterCount') || '0');

  updateWaterProgress(waterCount);

  document.querySelector('.challenge-content').addEventListener('click', () => {
      if (waterCount < 8) {
          waterCount++;
          localStorage.setItem('waterCount', waterCount);
          updateWaterProgress(waterCount);
          if (waterCount === 8) {
              showToast('🎉 Water challenge completed for today!');
          }
      }
  });
}

function updateWaterProgress(count) {
  const progressBar = document.querySelector('.challenge-progress .progress');
  const progressText = document.querySelector('.challenge-progress span');
  
  if (progressBar && progressText) {
      const percentage = (count / 8) * 100;
      progressBar.style.width = `${percentage}%`;
      progressText.textContent = `${count}/8 glasses`;
  }
}

function showGratitudeJournal(activityId) {
  const modal = document.createElement('div');
  modal.className = 'timer-modal';
  modal.innerHTML = `
      <div class="modal-content">
          <h3>Gratitude Journal</h3>
          <div class="gratitude-form">
              <div class="form-group">
                  <label>1. I'm grateful for:</label>
                  <input type="text" class="gratitude-input" placeholder="Enter your first gratitude...">
              </div>
              <div class="form-group">
                  <label>2. I'm grateful for:</label>
                  <input type="text" class="gratitude-input" placeholder="Enter your second gratitude...">
              </div>
              <div class="form-group">
                  <label>3. I'm grateful for:</label>
                  <input type="text" class="gratitude-input" placeholder="Enter your third gratitude...">
              </div>
          </div>
          <button class="primary-btn complete-gratitude">Complete</button>
      </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('.complete-gratitude').addEventListener('click', () => {
      document.body.removeChild(modal);
      completeActivity(activityId);
  });
}

function showMusicPlayer(activity, callback) {
  const modal = document.createElement('div');
  modal.className = 'activity-modal music-player';
  
  const playlist = selectPlaylist();
  
  modal.innerHTML = `
    <div class="modal-content">
      <h3>${activity.title}</h3>
      <div class="player-container">
        <iframe 
          src="https://open.spotify.com/embed/playlist/${playlist.url.split(':')[2]}" 
          width="100%" 
          height="380" 
          frameborder="0" 
          allowtransparency="true" 
          allow="encrypted-media">
        </iframe>
      </div>
      <div class="modal-actions">
        <button class="secondary-btn close-modal">End Activity</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
    callback();
  });
}

function showActivityPrompt(activity, callback) {
  const modal = document.createElement('div');
  modal.className = 'activity-modal';
  
  modal.innerHTML = `
    <div class="modal-content">
      <h3>${activity.title}</h3>
      <div class="activity-instructions">
        <p>${activity.description}</p>
        ${getActivityInstructions(activity)}
      </div>
      <div class="modal-actions">
        <button class="primary-btn complete-activity">Mark as Complete</button>
        <button class="secondary-btn close-modal">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  modal.querySelector('.complete-activity').addEventListener('click', () => {
    document.body.removeChild(modal);
    callback();
  });
  
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

function getActivityInstructions(activity) {
  switch(activity.title) {
    case 'Nature Walk':
      return `
        <ol class="instruction-steps">
          <li>Find a peaceful outdoor location</li>
          <li>Walk at a comfortable pace for 15 minutes</li>
          <li>Focus on your surroundings and breathing</li>
          <li>Notice nature's details around you</li>
        </ol>
      `;
    case 'Gratitude Journaling':
      return `
        <div class="gratitude-form">
          <div class="form-group">
            <label>1. I'm grateful for:</label>
            <input type="text" class="gratitude-input" placeholder="Enter your first gratitude...">
          </div>
          <div class="form-group">
            <label>2. I'm grateful for:</label>
            <input type="text" class="gratitude-input" placeholder="Enter your second gratitude...">
          </div>
          <div class="form-group">
            <label>3. I'm grateful for:</label>
            <input type="text" class="gratitude-input" placeholder="Enter your third gratitude...">
          </div>
        </div>
      `;
    default:
      return '';
  }
}

function selectPlaylist() {
  const currentMood = state.selectedMood || 'neutral';
  let playlistCategory;
  
  switch(currentMood) {
    case 'great':
    case 'good':
      playlistCategory = 'energetic';
      break;
    case 'awful':
    case 'sad':
      playlistCategory = 'calm';
      break;
    default:
      playlistCategory = 'relaxation';
  }
  
  const playlists = state.musicPlaylists[playlistCategory];
  return playlists[Math.floor(Math.random() * playlists.length)];
}