<script setup lang="ts">
const { data: products } = await useFetch("/api/products");

const categories = ["Все", "Кольца", "Серьги", "Подвески", "Браслеты"];
const metals = ["Все", "Серебро", "Золото"];

const selectedCategory = ref("Все");
const selectedMetal = ref("Все");
const minPrice = ref("");
const maxPrice = ref("");

const filteredProducts = computed(() => {
  const min = minPrice.value === "" ? null : Number(minPrice.value);
  const max = maxPrice.value === "" ? null : Number(maxPrice.value);

  return (products.value ?? []).filter((product) => {
    if (selectedCategory.value !== "Все" && product.category !== selectedCategory.value) return false;
    if (selectedMetal.value !== "Все" && product.metal !== selectedMetal.value) return false;
    if (min !== null && product.price < min) return false;
    if (max !== null && product.price > max) return false;
    return true;
  });
});

const resetFilters = () => {
  selectedCategory.value = "Все";
  selectedMetal.value = "Все";
  minPrice.value = "";
  maxPrice.value = "";
};
</script>

<template>
  <div class="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 3xl:max-w-[2200px] 3xl:py-32 4xl:max-w-[2600px]">
    <div class="text-center">
      <h1 class="font-display text-3xl sm:text-4xl 3xl:text-5xl">Каталог</h1>
      <p class="mt-4 text-brand-dark/60 3xl:text-lg">Все украшения Blink</p>
    </div>

    <div class="mt-10 flex flex-wrap items-end gap-4 rounded-2xl bg-brand-cream p-4 sm:p-6">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-brand-dark/50" for="filter-category">Категория</label>
        <select
          id="filter-category"
          v-model="selectedCategory"
          class="rounded-lg border border-brand-dark/20 bg-white px-3 py-2 text-sm"
        >
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs text-brand-dark/50" for="filter-metal">Металл</label>
        <select
          id="filter-metal"
          v-model="selectedMetal"
          class="rounded-lg border border-brand-dark/20 bg-white px-3 py-2 text-sm"
        >
          <option v-for="metal in metals" :key="metal" :value="metal">{{ metal }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs text-brand-dark/50" for="filter-min-price">Цена от</label>
        <input
          id="filter-min-price"
          v-model="minPrice"
          type="number"
          min="0"
          placeholder="0"
          class="w-24 rounded-lg border border-brand-dark/20 bg-white px-3 py-2 text-sm"
        >
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs text-brand-dark/50" for="filter-max-price">Цена до</label>
        <input
          id="filter-max-price"
          v-model="maxPrice"
          type="number"
          min="0"
          placeholder="30000"
          class="w-24 rounded-lg border border-brand-dark/20 bg-white px-3 py-2 text-sm"
        >
      </div>

      <button
        class="rounded-full border border-brand-dark/20 px-4 py-2 text-sm transition hover:border-brand-gold hover:text-brand-gold"
        @click="resetFilters"
      >
        Сбросить
      </button>
    </div>

    <p class="mt-4 text-sm text-brand-dark/50">Найдено товаров: {{ filteredProducts.length }}</p>

    <div
      v-if="filteredProducts.length"
      class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 2xl:grid-cols-5 2xl:gap-8 3xl:gap-10"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :material="product.material"
        :price="product.price"
        :image="product.image"
        :description="product.description"
      />
    </div>

    <p v-else class="mt-16 text-center text-brand-dark/50">
      Ничего не найдено. Попробуйте изменить фильтры.
    </p>
  </div>
</template>
