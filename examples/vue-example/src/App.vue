<template>
  <div class="df-min-h-screen df-bg-gray-50">
    <Header />
    <main>
      <HeroSection />
      <FeaturesSection />
      <ComponentsSection />
      <FormSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ComponentsSection from './components/ComponentsSection.vue'
import FormSection from './components/FormSection.vue'
import Footer from './components/Footer.vue'
</script>

<style>
@import '@delvforge/core/css';

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>