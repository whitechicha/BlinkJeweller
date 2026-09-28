<script setup lang="ts">
const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Каталог", to: "/catalog" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contacts" },
];

const { totalCount } = useCart();
</script>

<template>
  <header class="bg-brand-dark text-brand-cream">
    <div
      class="mx-auto flex max-w-[1800px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-10 3xl:max-w-[2200px] 3xl:py-6 4xl:max-w-[2600px] 4xl:py-8"
    >
      <NuxtLink to="/" class="flex items-center gap-2 sm:gap-3">
        <Icon name="ph:diamond-duotone" class="h-7 w-7 text-brand-gold sm:h-9 sm:w-9 2xl:h-11 2xl:w-11 3xl:h-12 3xl:w-12 4xl:h-14 4xl:w-14" />
        <span class="font-display text-lg tracking-wide sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl">Blink</span>
      </NuxtLink>

      <nav class="hidden items-center gap-10 md:flex 3xl:gap-14">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm tracking-wide text-brand-cream/90 transition hover:text-brand-gold 2xl:text-base 3xl:text-lg 4xl:text-xl"
          active-class="text-brand-gold"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3 sm:gap-5 3xl:gap-7">
        <button
          aria-label="Поиск"
          class="hidden text-brand-cream/90 transition hover:text-brand-gold sm:inline-flex"
        >
          <Icon name="ph:magnifying-glass" class="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
        </button>
        <button
          aria-label="Личный кабинет"
          class="hidden text-brand-cream/90 transition hover:text-brand-gold sm:inline-flex"
        >
          <Icon name="ph:user" class="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
        </button>
        <NuxtLink
          to="/cart"
          aria-label="Корзина"
          class="relative text-brand-cream/90 transition hover:text-brand-gold"
        >
          <Icon name="ph:shopping-bag" class="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
          <span
            v-if="totalCount > 0"
            class="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-medium text-brand-dark"
          >
            {{ totalCount }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
