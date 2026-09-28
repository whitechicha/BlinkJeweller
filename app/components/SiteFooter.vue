<script setup lang="ts">
const year = new Date().getFullYear()

const navLinks = [
  { label: 'Главная', to: '/' },
  { label: 'Каталог', to: '/catalog' },
  { label: 'О нас', to: '/about' },
  { label: 'Контакты', to: '/contacts' }
]
</script>

<template>
  <footer class="bg-brand-dark text-brand-cream">
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
          <Icon name="ph:arrow-right" class="h-4 w-4 3xl:h-5 3xl:w-5" />
        </NuxtLink>
      </div>

      <div class="mt-10 grid gap-8 border-t border-brand-cream/10 pt-8 sm:mt-14 sm:grid-cols-2 sm:gap-10 sm:pt-10 lg:grid-cols-3 3xl:mt-20 3xl:gap-14 3xl:pt-14">
        <div class="flex items-center gap-3">
          <Icon name="ph:diamond-duotone" class="h-8 w-8 text-brand-gold 3xl:h-10 3xl:w-10" />
          <div>
            <p class="font-display text-xl 3xl:text-2xl">Blink</p>
            <p class="text-sm text-brand-cream/60 3xl:text-base">Блестяще каждый день</p>
          </div>
        </div>

        <div>
          <p class="text-xs tracking-[0.2em] text-brand-cream/50 3xl:text-sm">КОНТАКТЫ</p>
          <dl class="mt-4 flex flex-col gap-2 text-xs sm:text-sm 3xl:text-base">
            <div class="flex items-center justify-between gap-4">
              <dt class="text-brand-cream/50">Телеграм</dt>
              <dd><a href="#" class="hover:text-brand-gold">@blinkjewelry</a></dd>
            </div>
            <div class="flex items-center justify-between gap-4">
              <dt class="text-brand-cream/50">Телефон</dt>
              <dd><a href="tel:+79000000000" class="hover:text-brand-gold">+7 900 000-00-00</a></dd>
            </div>
            <div class="flex items-center justify-between gap-4">
              <dt class="text-brand-cream/50">Почта</dt>
              <dd><a href="mailto:info@blink-shop.ru" class="hover:text-brand-gold">info@blink-shop.ru</a></dd>
            </div>
          </dl>
          <div class="mt-4 flex gap-4 text-brand-cream/80">
            <a href="#" aria-label="VK" class="transition hover:text-brand-gold"><Icon name="simple-icons:vk" class="h-5 w-5" /></a>
            <a href="#" aria-label="Telegram" class="transition hover:text-brand-gold"><Icon name="ph:telegram-logo" class="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" class="transition hover:text-brand-gold"><Icon name="ph:instagram-logo" class="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <p class="text-xs tracking-[0.2em] text-brand-cream/50 3xl:text-sm">НАВИГАЦИЯ</p>
          <div class="mt-4 flex flex-col gap-2 text-sm 3xl:text-base">
            <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="w-fit hover:text-brand-gold">
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-2 border-t border-brand-cream/10 pt-6 text-xs text-brand-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} Blink. Все права защищены.</p>
        <a href="#" class="hover:text-brand-gold">Политика конфиденциальности</a>
      </div>
    </div>
  </footer>
</template>
