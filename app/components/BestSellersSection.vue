<script setup lang="ts">
const { data: allProducts } = await useFetch("/api/products", {
  query: { tag: "bestseller" },
});

const products = computed(() => allProducts.value?.slice(0, 4) ?? []);
</script>

<template>
  <section class="bg-brand-cream/60 py-10 sm:py-16 3xl:py-20 4xl:py-24">
    <div class="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10 3xl:max-w-[2200px] 4xl:max-w-[2600px]">
      <h2 class="mb-6 font-display text-xl sm:mb-8 sm:text-2xl 2xl:text-3xl 3xl:text-4xl">Хиты продаж</h2>

      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6 3xl:gap-10">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :name="product.name"
          :material="product.material"
          :price="product.price"
          :image="product.image"
          :description="product.description"
        />
      </div>

      <div class="mt-8 flex justify-center sm:mt-10 3xl:mt-14">
        <NuxtLink
          to="/catalog"
          class="inline-flex items-center gap-2 rounded-full border border-brand-dark/20 px-5 py-2.5 text-xs font-medium transition hover:border-brand-gold hover:text-brand-gold sm:px-6 sm:py-3 sm:text-sm 2xl:text-base 3xl:px-8 3xl:py-4 3xl:text-lg"
        >
          Смотреть все товары
          <Icon name="ph:arrow-right" class="h-4 w-4 3xl:h-5 3xl:w-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
