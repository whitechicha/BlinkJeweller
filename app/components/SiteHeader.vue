<script setup lang="ts">
import HeaderSearch from './HeaderSearch.vue';
import BrandLogo from './BrandLogo.vue';
const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Каталог", to: "/catalog" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contacts" },
];

const { totalCount } = useCart();
const menuOpen = ref(false);
const route = useRoute();
watch(() => route.fullPath, () => { menuOpen.value = false; });
</script>

<template>
  <header class="site-header sticky top-0 z-40 bg-brand-dark text-brand-cream" :class="{ 'site-header-overlay': route.path === '/' }">
    <div class="header-topbar mx-auto flex items-center justify-end gap-4 px-4 sm:px-6 lg:px-10">
      <a href="tel:+79885475999" class="inline-flex shrink-0 items-center gap-2"><Icon name="ph:phone" class="h-4 w-4" />+7 988 547-59-99</a>
    </div>
    <div
      class="header-main mx-auto flex max-w-[1800px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-10 3xl:max-w-[2200px] 3xl:py-6 4xl:max-w-[2600px] 4xl:py-8"
    >
      <NuxtLink to="/" class="brand-logo flex items-center gap-2 sm:gap-3" aria-label="Samorodok — главная">
        <BrandLogo />
      </NuxtLink>

      <nav aria-label="Основная навигация" class="hidden items-center gap-10 md:flex 3xl:gap-14">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="site-nav-link relative text-sm tracking-wide text-brand-cream/90 transition hover:text-brand-gold 2xl:text-base 3xl:text-lg 4xl:text-xl"
          active-class="text-brand-gold"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions flex items-center gap-3 sm:gap-5 3xl:gap-7">
        <HeaderSearch />
        <NuxtLink
          to="/cart"
          aria-label="Корзина"
          class="header-icon relative text-brand-cream/90"
        >
          <Icon name="ph:shopping-cart" class="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
          <span
            v-if="totalCount > 0"
            class="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-medium text-brand-dark"
          >
            {{ totalCount }}
          </span>
        </NuxtLink>
        <button type="button" class="flex h-11 w-11 items-center justify-center md:hidden" :aria-expanded="menuOpen" aria-controls="mobile-navigation" :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'" @click="menuOpen = !menuOpen" @keydown.esc="menuOpen = false">
          <Icon :name="menuOpen ? 'ph:x' : 'ph:list'" class="h-6 w-6" />
        </button>
      </div>
    </div>
    <nav v-if="menuOpen" id="mobile-navigation" aria-label="Мобильная навигация" class="grid gap-1 border-t border-brand-cream/10 px-4 pb-5 pt-3 md:hidden">
      <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="rounded-lg px-3 py-3 text-sm hover:bg-brand-cream/10" active-class="text-brand-gold" @click="menuOpen = false">{{ link.label }}</NuxtLink>
    </nav>
  </header>
</template>
