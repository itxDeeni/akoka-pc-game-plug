<template>
  <div class="game-card">
    <div class="image-wrapper" :style="game.image && game.image !== 'placeholder.jpg' ? { backgroundImage: `url(${game.image})` } : {}">
      <div v-if="!game.image || game.image === 'placeholder.jpg'" class="placeholder-gradient"></div>
    </div>
    <div class="content">
      <h3 class="title" :title="game.title">{{ game.title }}</h3>
      <div v-if="game.size" class="game-size">
        <svg xmlns="http://www.w3.org/2009/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hard-drive"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>
        {{ game.size }}
      </div>
      <div class="price-row">
        <span class="price">{{ game.price }}</span>
        <button class="buy-btn" @click="orderGame">Order via WhatsApp</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  game: Object
});

const orderGame = () => {
  const number = '2348130237990';
  const text = encodeURIComponent(`Hello, I'm interested in buying ${props.game.title} for ${props.game.price}.`);
  window.open(`https://wa.me/${number}?text=${text}`, '_blank');
};
</script>

<style scoped>
.game-card {
  background: rgba(30, 30, 40, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  transform: translateY(-5px);
  border-color: #00f0ff;
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.15);
}

.image-wrapper {
  height: 180px;
  position: relative;
  background-size: cover;
  background-position: center;
  background-color: #1f1c2c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1f1c2c, #928DAB);
}

.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  height: 2.8em;
}

.game-size {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #a0a0b0;
  margin-bottom: 12px;
  font-weight: 500;
}

.game-size svg {
  color: #00f0ff;
  opacity: 0.8;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #00f0ff;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
}

.buy-btn {
  background: linear-gradient(90deg, #00f0ff, #0080ff);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}

.buy-btn:hover {
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.6);
  transform: scale(1.05);
}
</style>
