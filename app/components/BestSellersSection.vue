<script setup lang="ts">
const { data: allProducts } = await useFetch("/api/products", {
  query: { tag: "bestseller" },
});

const products = computed(() => allProducts.value?.slice(0, 4) ?? []);
</script>

<template>
  <section class="collection-section bestsellers-section py-10 sm:py-16">
    <div class="collection-inner mx-auto px-4 sm:px-6 lg:px-10">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
        <h2 class="font-display">Хиты продаж</h2>
        <NuxtLink to="/catalog" class="catalog-link inline-flex items-center gap-2 rounded-full border border-brand-dark/20 px-5 py-3 text-sm font-medium">
          Смотреть все товары
          <Icon name="ph:arrow-right" class="h-4 w-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6 3xl:gap-10">
        <ProductCard
          v-for="product in products"
          :id="product.id"
          :key="product.id"
          :name="product.name"
          :material="product.material"
          :price="product.price"
          :image="product.image"
          :description="product.description"
        />
      </div>

    </div>
  </section>
</template>
