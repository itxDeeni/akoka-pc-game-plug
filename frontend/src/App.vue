<template>
  <div id="app">
    <header class="hero animate-fade-in">
      <div class="hero-content">
        <h1>Welcome to <span class="highlight">Akoka PC Game Plug</span></h1>
        <p>Premium PC Games & Digital Delivery. Prices start at just ₦3,000 — based on game size.</p>
        <p class="promo-text">🎉 <strong>PROMO:</strong> Make 10 purchases and get a FREE game of your choice!</p>
        <p class="hdd-offer">💾 Prefer physical delivery? External Hard Drives available starting at an extra <strong>₦10,000 - ₦20,000</strong>. Delivery in 2-5 days depending on order size.</p>
        <a href="#games" class="cta-button">Browse Catalog</a>
      </div>
    </header>

    <main>
      <section id="games" class="games-section">
        <div class="section-header">
          <h2>Trending Games</h2>
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search games..." 
              @input="filterGames"
            />
          </div>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading games...</p>
        </div>

        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button @click="fetchGames" class="retry-btn">Retry</button>
        </div>

        <div v-else class="games-grid animate-fade-in">
          <GameCard 
            v-for="game in filteredGames" 
            :key="game.id" 
            :game="game" 
          />
          <div v-if="filteredGames.length === 0" class="no-results">
            No games found for "{{ searchQuery }}". Try a custom order below!
          </div>
        </div>
      </section>

      <section id="contact" class="contact-section animate-fade-in">
        <ContactForm />
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Akoka PC Game Plug. All rights reserved. | <a href="https://wa.me/2348130237990">Contact Support</a></p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import GameCard from './components/GameCard.vue';
import ContactForm from './components/ContactForm.vue';

const games = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');

const fetchGames = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get('http://localhost:3000/api/games');
    if (res.data && res.data.success) {
      games.value = res.data.data;
    } else {
      throw new Error('Invalid data format');
    }
  } catch (err) {
    console.error(err);
    error.value = 'Oops! Something went wrong. Tap Retry to reload.';
  } finally {
    loading.value = false;
  }
};

const filteredGames = computed(() => {
  if (!searchQuery.value) return games.value;
  const q = searchQuery.value.toLowerCase();
  return games.value.filter(g => g.title.toLowerCase().includes(q));
});

onMounted(() => {
  fetchGames();
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HERO SECTION */
.hero {
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to bottom, rgba(13, 13, 18, 0.2), #0d0d12), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop') center/cover;
  position: relative;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(13,13,18,1) 100%);
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 0 20px;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.highlight {
  color: #00f0ff;
  text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
}

.hero p {
  font-size: 1.25rem;
  color: #a0a0b0;
  margin-bottom: 24px;
}

.promo-text {
  font-size: 1.1rem;
  color: #ff0055 !important;
  font-weight: bold;
  margin-bottom: 32px !important;
  background: rgba(255, 0, 85, 0.1);
  padding: 10px 20px;
  border-radius: 20px;
  display: inline-block;
  border: 1px solid rgba(255, 0, 85, 0.3);
  text-shadow: 0 0 10px rgba(255, 0, 85, 0.4);
}

.hdd-offer {
  font-size: 1rem !important;
  color: #a0a0b0 !important;
  margin-top: -16px;
  margin-bottom: 32px !important;
  display: block;
}
.hdd-offer strong {
  color: #fff;
}

.cta-button {
  display: inline-block;
  background: transparent;
  border: 2px solid #00f0ff;
  color: #00f0ff;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.cta-button:hover {
  background: #00f0ff;
  color: #000;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
}

/* MAIN CONTENT */
main {
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-header h2 {
  font-size: 2rem;
  color: #fff;
  border-left: 4px solid #00f0ff;
  padding-left: 12px;
}

.search-bar input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 20px;
  color: #fff;
  font-size: 1rem;
  width: 250px;
  transition: all 0.3s;
}

.search-bar input:focus {
  outline: none;
  border-color: #00f0ff;
  width: 300px;
  background: rgba(0, 0, 0, 0.5);
}

/* GRID */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #a0a0b0;
  font-size: 1.1rem;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
}

/* STATES */
.loading-state, .error-state {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 240, 255, 0.2);
  border-top-color: #00f0ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  background: #00f0ff;
  color: #000;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 16px;
  cursor: pointer;
}

/* CONTACT SECTION */
.contact-section {
  margin-top: 80px;
  margin-bottom: 40px;
}

/* FOOTER */
footer {
  text-align: center;
  padding: 30px 20px;
  background: rgba(0,0,0,0.5);
  border-top: 1px solid rgba(255,255,255,0.05);
  color: #8a8a9e;
}

@media (max-width: 768px) {
  .hero h1 { font-size: 2.5rem; }
  .section-header { flex-direction: column; align-items: flex-start; }
  .search-bar input { width: 100%; }
  .search-bar input:focus { width: 100%; }
}
</style>
