<template>
  <div class="contact-form-container">
    <h2>Can't Find Your Game? Place a Custom Order</h2>
    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name">Your Name</label>
        <input type="text" id="name" v-model="form.name" required placeholder="John Doe" />
      </div>
      
      <div class="form-group">
        <label for="gameName">Game Title</label>
        <input type="text" id="gameName" v-model="form.gameName" required placeholder="E.g. Cyberpunk 2077" />
      </div>

      <div class="form-group">
        <label for="message">Additional Note (Optional)</label>
        <textarea id="message" v-model="form.message" placeholder="Any extra details? (e.g. version, DLC, etc.)" rows="3"></textarea>
      </div>

      <button type="submit" class="submit-btn">Message via WhatsApp</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  gameName: '',
  message: ''
});

const submitForm = () => {
  const number = '2348130237990';
  let text = `Hi! My name is ${form.name}. I'd like to order: ${form.gameName}.`;
  if (form.message) {
    text += `\nNote: ${form.message}`;
  }
  
  const encodedText = encodeURIComponent(text);
  window.open(`https://wa.me/${number}?text=${encodedText}`, '_blank');
};
</script>

<style scoped>
.contact-form-container {
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  margin: 0 auto;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

h2 {
  text-align: center;
  color: #fff;
  margin-bottom: 24px;
  font-size: 1.8rem;
  letter-spacing: -0.5px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  color: #a0a0b0;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

input, textarea {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #00f0ff;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: transparent;
  border: 2px solid #00f0ff;
  color: #00f0ff;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn:hover {
  background: #00f0ff;
  color: #000;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
}
</style>
