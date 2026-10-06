<script setup lang="ts">
import BrandLogo from './BrandLogo.vue';
import ContactOptions from './ContactOptions.vue';
import { socialLinks } from '~/utils/socialLinks';
const year = new Date().getFullYear()

const navLinks = [
  { label: 'Главная', to: '/' },
  { label: 'Каталог', to: '/catalog' },
  { label: 'О нас', to: '/about' },
  { label: 'Контакты', to: '/contacts' }
]
</script>

<template>
  <footer class="site-footer bg-brand-dark text-brand-cream">
    <div class="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 sm:py-16 lg:px-10 3xl:max-w-[2200px] 3xl:py-20 4xl:max-w-[2600px] 4xl:py-24">
      <h2 class="font-display text-4xl leading-none sm:text-5xl md:text-6xl 2xl:text-7xl 3xl:text-8xl">
        Сияй ярче.
      </h2>

      <div class="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 3xl:mt-10">
        <p class="text-sm text-brand-cream/70 sm:text-base 3xl:text-lg">Готовы выбрать украшение по душе?</p>
        <NuxtLink
          to="/catalog"
          class="inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-xs font-medium text-brand-dark transition hover:bg-brand-gold/90 sm:px-6 sm:py-3 sm:text-sm 3xl:px-8 3xl:py-4 3xl:text-base"
        >
          Смотреть каталог
          <img src="/icons/ph-arrow-right-cream.svg" class="site-icon h-4 w-4 3xl:h-5 3xl:w-5" alt="" aria-hidden="true">
        </NuxtLink>
      </div>

      <div class="mt-10 grid gap-8 border-t border-brand-cream/10 pt-8 sm:mt-14 sm:grid-cols-2 sm:gap-10 sm:pt-10 lg:grid-cols-3 3xl:mt-20 3xl:gap-14 3xl:pt-14">
        <div class="footer-brand flex items-center gap-4">
          <BrandLogo />
          <div>
            <p class="footer-brand-name font-display">Samorodok</p>
            <p class="text-sm text-brand-cream/60 3xl:text-base">Блестяще каждый день</p>
          </div>
        </div>

        <div>
          <p class="text-xs tracking-[0.2em] text-brand-cream/50 3xl:text-sm">КОНТАКТЫ</p>
          <dl class="footer-contacts mt-4 grid gap-2 text-xs sm:text-sm 3xl:text-base">
            <div>
              <dt class="text-brand-cream/50">Телеграм</dt>
              <dd><a :href="socialLinks.telegram" target="_blank" rel="noopener noreferrer" class="hover:text-brand-gold">@samorodokJeweler</a></dd>
            </div>
            <div>
              <dt class="text-brand-cream/50">Телефон</dt>
              <dd><ContactOptions id-prefix="footer-contact" text="+7 988 547-59-99" /></dd>
            </div>
            <div>
              <dt class="text-brand-cream/50">ВКонтакте</dt>
              <dd><a :href="socialLinks.vk" target="_blank" rel="noopener noreferrer" class="hover:text-brand-gold">samorodok.jeweler</a></dd>
            </div>
          </dl>
          <div class="footer-socials mt-4 flex gap-2 text-brand-cream/80">
            <a :href="socialLinks.vk" target="_blank" rel="noopener noreferrer" aria-label="VK (откроется в новой вкладке)" class="transition hover:text-brand-gold"><img src="/icons/simple-icons-vk-cream.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></a>
            <a :href="socialLinks.telegram" target="_blank" rel="noopener noreferrer" aria-label="Telegram (откроется в новой вкладке)" class="transition hover:text-brand-gold"><img src="/icons/ph-telegram-logo-cream.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></a>
            <a :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram (откроется в новой вкладке)" class="transition hover:text-brand-gold"><img src="/icons/ph-instagram-logo-cream.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></a>
          </div>
        </div>

        <div>
          <p class="text-xs tracking-[0.2em] text-brand-cream/50 3xl:text-sm">НАВИГАЦИЯ</p>
          <nav aria-label="Навигация в подвале" class="footer-nav-grid mt-4 grid grid-cols-2 gap-2">
            <NuxtLink v-for="(link, index) in navLinks" :key="link.to" :to="link.to" class="footer-nav-card">
              <span>{{ link.label }}</span>
              <span class="footer-nav-detail">{{ ['На главную', 'Украшения', 'История бренда', 'Связаться'][index] }}</span>
              <img src="/icons/ph-arrow-up-right-gold.svg" class="site-icon footer-nav-arrow" alt="" aria-hidden="true">
            </NuxtLink>
          </nav>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-2 border-t border-brand-cream/10 pt-6 text-xs text-brand-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} Samorodok. Все права защищены.</p>
        <a href="#" class="hover:text-brand-gold">Политика конфиденциальности</a>
      </div>
      <p class="mt-4 max-w-4xl text-xs leading-relaxed text-brand-cream/60">
        Instagram принадлежит компании Meta Platforms Inc., признанной экстремистской организацией и запрещённой на территории Российской Федерации.
      </p>
    </div>
  </footer>
</template>
