<script setup lang="ts">
import { socialLinks } from '~/utils/socialLinks';
</script>

<template>
  <section class="hero-section relative overflow-hidden text-brand-cream" aria-labelledby="hero-title">
    <div class="hero-inner relative mx-auto flex items-center">
      <div class="hero-copy">
        <h1 id="hero-title" class="hero-title font-display">Твоя грань сияния.</h1>
        <p class="hero-description">Украшения, подчёркивающие твою индивидуальность.</p>
        <div class="hero-buttons">
        <a href="#recommendations" class="hero-cta inline-flex items-center gap-3 rounded-full bg-brand-gold font-medium text-brand-dark">
          Открыть коллекцию
          <img src="/icons/ph-arrow-down-dark.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true">
        </a>
        <a href="#bestsellers" class="hero-secondary-cta">Хиты продаж <img src="/icons/ph-arrow-down-cream.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></a>
        </div>
        <div class="hero-socials flex gap-3 text-brand-cream/80">
          <a :href="socialLinks.vk" target="_blank" rel="noopener noreferrer" aria-label="VK (откроется в новой вкладке)"><img src="/icons/simple-icons-vk-cream.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></a>
          <a :href="socialLinks.telegram" target="_blank" rel="noopener noreferrer" aria-label="Telegram (откроется в новой вкладке)"><img src="/icons/ph-telegram-logo-cream.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></a>
          <a :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram (откроется в новой вкладке)"><img src="/icons/ph-instagram-logo-cream.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></a>
        </div>
      </div>
    </div>
  </section>
</template>
