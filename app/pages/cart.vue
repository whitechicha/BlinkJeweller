<script setup lang="ts">
const { items, removeFromCart, totalCount, totalPrice } = useCart();

const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
    <h1 class="font-display text-3xl sm:text-4xl">Корзина</h1>

    <div v-if="items.length === 0" class="mt-8 text-brand-dark/60">
      Пока пусто.
      <NuxtLink to="/catalog" class="text-brand-gold hover:underline"
        >Перейти в каталог</NuxtLink
      >
    </div>

    <div v-else class="mt-8 flex flex-col gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex flex-col gap-3 rounded-2xl bg-brand-cream p-4 sm:flex-row sm:items-center sm:gap-4"
      >
        <div class="flex items-center gap-4">
          <img
            :src="item.image"
            :alt="item.name"
            class="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
          />

          <div class="min-w-0 flex-1">
            <p class="truncate font-display text-base sm:text-lg">{{ item.name }}</p>
            <p class="text-xs text-brand-dark/60 sm:text-sm">
              {{ item.quantity }} × {{ formatPrice(item.price) }} ₽
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between sm:justify-end sm:gap-6">
          <p class="font-medium">
            {{ formatPrice(item.price * item.quantity) }} ₽
          </p>

          <button
            aria-label="Убрать из корзины"
            class="text-brand-dark/40 transition hover:text-brand-gold"
            @click="removeFromCart(item.id)"
          >
            <Icon name="ph:trash" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        class="mt-4 flex items-center justify-between border-t border-brand-dark/10 pt-6"
      >
        <p class="text-sm text-brand-dark/60 sm:text-base">Товаров: {{ totalCount }}</p>
        <p class="font-display text-xl sm:text-2xl">{{ formatPrice(totalPrice) }} ₽</p>
      </div>
    </div>
  </div>
</template>
