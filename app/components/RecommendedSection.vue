<script setup lang="ts">
const { data: products } = await useFetch('/api/products', { query: { tag: 'recommended' } });
const { openProduct } = useProductModal();
const currentIndex = ref(0);
const selection = computed(() => {
  const list = products.value ?? [];
  return Array.from({ length: Math.min(3, list.length) }, (_, offset) => list[(currentIndex.value + offset) % list.length]!);
});
const move = (direction: number) => {
  const count = products.value?.length ?? 0;
  if (count) currentIndex.value = (currentIndex.value + direction + count) % count;
};
const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);
</script>

<template>
  <section id="recommendations" class="collection-section recommended-section" aria-labelledby="recommendations-title">
    <div class="collection-inner editorial-grid mx-auto">
      <div class="editorial-intro">
        <p class="editorial-eyebrow">Выбор Samorodok</p>
        <h2 id="recommendations-title" class="font-display">Рекомендуем</h2>
        <p class="editorial-description">Украшения, в которые легко влюбиться.</p>
        <NuxtLink to="/catalog" class="editorial-link">Смотреть подборку <Icon name="ph:arrow-right" class="h-4 w-4" /></NuxtLink>
        <div v-if="products && products.length > 1" class="editorial-controls">
          <button type="button" aria-label="Предыдущая подборка" @click="move(-1)"><Icon name="ph:caret-left" class="h-5 w-5" /></button>
          <span aria-live="polite">{{ String(currentIndex + 1).padStart(2, '0') }} <span class="editorial-total">/ {{ String(products.length).padStart(2, '0') }}</span></span>
          <button type="button" aria-label="Следующая подборка" @click="move(1)"><Icon name="ph:caret-right" class="h-5 w-5" /></button>
        </div>
      </div>
      <button v-for="(product, index) in selection" :key="product.id" type="button" class="editorial-tile" :class="{ 'editorial-feature': index === 0 }" :aria-label="'Подробнее о товаре: ' + product.name" @click="openProduct(product)">
        <img :src="product.image" :alt="product.name" width="700" height="800" loading="lazy" decoding="async">
        <span class="editorial-caption"><span class="font-display">{{ product.name }}</span><span>{{ formatPrice(product.price) }} ₽</span></span>
        <span class="editorial-tile-arrow" aria-hidden="true"><Icon name="ph:arrow-up-right" class="h-5 w-5" /></span>
      </button>
    </div>
  </section>
</template>
