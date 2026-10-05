<script setup lang="ts">
import BestSellerCard from './BestSellerCard.vue';
const { data: allProducts } = await useFetch('/api/products', { query: { tag: 'bestseller' } });
const products = computed(() => allProducts.value?.slice(0, 4) ?? []);
</script>

<template>
  <section id="bestsellers" class="collection-section bestsellers-section" aria-labelledby="bestsellers-title">
    <div class="collection-inner mx-auto">
      <div class="bestsellers-heading">
        <div><h2 id="bestsellers-title" class="font-display">Хиты продаж</h2><p>Любимые украшения наших клиентов</p></div>
        <NuxtLink to="/catalog" class="bestsellers-link">Все товары <Icon name="ph:arrow-right" class="h-4 w-4" /></NuxtLink>
      </div>
      <div class="bestsellers-grid">
        <BestSellerCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </section>
</template>
