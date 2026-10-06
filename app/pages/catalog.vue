<script setup lang="ts">
import BestSellerCard from '~/components/BestSellerCard.vue';
const { data: products, pending, error, refresh } = await useFetch("/api/products");

useSeoMeta({ title: 'Каталог украшений — Samorodok' });

const categories = ["Все", "Кольца", "Серьги", "Подвески", "Браслеты"];
const metals = ["Все", "Серебро", "Золото"];

const selectedCategory = ref("Все");
const selectedMetal = ref("Все");
const minPrice = ref("");
const maxPrice = ref("");
const searchQuery = ref('');
const sortOrder = ref('default');
const normalize = (text: string) => text.toLocaleLowerCase('ru-RU').replaceAll('ё', 'е');
const priceError = computed(() => {
  const min = minPrice.value === '' ? null : Number(minPrice.value);
  const max = maxPrice.value === '' ? null : Number(maxPrice.value);
  if ((min !== null && (!Number.isFinite(min) || min < 0)) || (max !== null && (!Number.isFinite(max) || max < 0))) return 'Цена должна быть числом от 0 ₽.';
  if (min !== null && max !== null && min > max) return 'Цена «от» должна быть не больше цены «до».';
  return '';
});
const hasFilters = computed(() => !!searchQuery.value.trim() || selectedCategory.value !== 'Все' || selectedMetal.value !== 'Все' || minPrice.value !== '' || maxPrice.value !== '');

const filteredProducts = computed(() => {
  const min = minPrice.value === "" ? null : Number(minPrice.value);
  const max = maxPrice.value === "" ? null : Number(maxPrice.value);

  if (priceError.value) return [];
  const words = normalize(searchQuery.value.trim()).split(/\s+/).filter(Boolean);
  const result = (products.value ?? []).filter((product) => {
    const text = normalize(`${product.name} ${product.category} ${product.material} ${product.description}`);
    if (!words.every(word => text.includes(word))) return false;
    if (selectedCategory.value !== "Все" && product.category !== selectedCategory.value) return false;
    if (selectedMetal.value !== "Все" && product.metal !== selectedMetal.value) return false;
    if (min !== null && product.price < min) return false;
    if (max !== null && product.price > max) return false;
    return true;
  });
  switch (sortOrder.value) {
    case 'price-asc': return result.sort((a, b) => a.price - b.price);
    case 'price-desc': return result.sort((a, b) => b.price - a.price);
    case 'name': return result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    default: return result;
  }
});

const resetFilters = () => {
  selectedCategory.value = "Все";
  selectedMetal.value = "Все";
  minPrice.value = "";
  maxPrice.value = "";
  searchQuery.value = '';
};
const collectionDescriptions: Record<string, string> = {
  'Кольца': 'Маленькая деталь. Большое чувство.',
  'Серьги': 'Акценты, которые ловят свет.',
  'Подвески': 'Особенная история — ближе к сердцу.',
  'Браслеты': 'Лёгкое движение. Твой характер.',
};
const productSections = computed(() => categories.slice(1).map(category => ({
  category,
  description: collectionDescriptions[category],
  products: filteredProducts.value.filter(product => product.category === category),
})).filter(section => section.products.length));
</script>

<template>
  <div class="catalog-page">
    <section class="catalog-intro" aria-labelledby="catalog-title">
      <div class="catalog-intro-copy">
        <nav aria-label="Хлебные крошки" class="catalog-breadcrumb"><NuxtLink to="/">Главная</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">Каталог</span></nav>
        <p class="catalog-eyebrow">Коллекция Samorodok</p>
        <h1 id="catalog-title" class="font-display">Украшения<br>с характером.</h1>
        <p class="catalog-intro-description">Твоя грань сияния — в каждой детали.<br>Найди украшение, которое говорит о тебе.</p>
      </div>
      <div class="catalog-intro-photo">
        <span class="catalog-photo-caption">Samorodok<span>Искусство быть собой</span></span>
      </div>
    </section>

    <section class="catalog-tools" aria-label="Поиск и фильтры каталога">
      <div class="catalog-categories" role="group" aria-label="Категория">
        <button v-for="category in categories" :key="category" type="button" :aria-pressed="selectedCategory === category" :class="{ 'is-selected': selectedCategory === category }" @click="selectedCategory = category">{{ category === 'Все' ? 'Все украшения' : category }}</button>
      </div>
      <div class="catalog-search-row">
        <div class="catalog-search-field">
          <label for="catalog-search" class="catalog-label">Поиск по каталогу</label>
          <div class="catalog-search-input">
            <img src="/icons/ph-magnifying-glass-dark.svg" class="site-icon h-5 w-5 shrink-0" alt="" aria-hidden="true">
            <input id="catalog-search" v-model="searchQuery" type="search" placeholder="Название, металл или камень" autocomplete="off">
          </div>
        </div>
        <div class="catalog-sort-field">
          <label for="catalog-sort" class="catalog-label">Сортировка внутри разделов</label>
          <select id="catalog-sort" v-model="sortOrder">
            <option value="default">По умолчанию</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="name">По названию: А–Я</option>
          </select>
        </div>
      </div>
      <div class="catalog-filter-row">
      <div class="catalog-metal-field flex flex-col gap-1">
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
          :aria-invalid="!!priceError"
          :aria-describedby="priceError ? 'catalog-price-error' : undefined"
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
          :aria-invalid="!!priceError"
          :aria-describedby="priceError ? 'catalog-price-error' : undefined"
          placeholder="30000"
          class="w-24 rounded-lg border border-brand-dark/20 bg-white px-3 py-2 text-sm"
        >
      </div>

      <button
        type="button"
        :disabled="!hasFilters"
        class="catalog-reset rounded-full border border-brand-dark/20 px-4 py-2 text-sm transition hover:border-brand-gold hover:text-brand-gold"
        @click="resetFilters"
      >
        Сбросить фильтры
      </button>
      </div>
      <p v-if="priceError" id="catalog-price-error" role="alert" class="catalog-price-error">{{ priceError }}</p>
      <div v-if="hasFilters" class="catalog-active-filters" aria-label="Применённые фильтры">
        <button v-if="searchQuery.trim()" type="button" :aria-label="'Убрать поиск: ' + searchQuery" @click="searchQuery = ''">Поиск: {{ searchQuery }} <img src="/icons/ph-x-dark.svg" class="site-icon h-4 w-4" alt="" aria-hidden="true"></button>
        <button v-if="selectedCategory !== 'Все'" type="button" :aria-label="'Убрать категорию: ' + selectedCategory" @click="selectedCategory = 'Все'">{{ selectedCategory }} <img src="/icons/ph-x-dark.svg" class="site-icon h-4 w-4" alt="" aria-hidden="true"></button>
        <button v-if="selectedMetal !== 'Все'" type="button" :aria-label="'Убрать металл: ' + selectedMetal" @click="selectedMetal = 'Все'">{{ selectedMetal }} <img src="/icons/ph-x-dark.svg" class="site-icon h-4 w-4" alt="" aria-hidden="true"></button>
        <button v-if="minPrice !== '' || maxPrice !== ''" type="button" aria-label="Убрать диапазон цен" @click="minPrice = ''; maxPrice = ''">{{ minPrice ? 'От ' + minPrice + ' ₽' : '' }} {{ maxPrice ? 'До ' + maxPrice + ' ₽' : '' }} <img src="/icons/ph-x-dark.svg" class="site-icon h-4 w-4" alt="" aria-hidden="true"></button>
      </div>
    </section>

    <section class="catalog-collection" aria-labelledby="catalog-selection-title">
    <div class="catalog-results-heading">
      <h2 id="catalog-selection-title" class="font-display">{{ selectedCategory === 'Все' ? 'Все украшения' : selectedCategory }}</h2>
      <p v-if="!error" role="status" aria-live="polite">{{ pending ? 'Загружаем украшения…' : `Найдено товаров: ${filteredProducts.length}` }}</p>
    </div>
    <div v-if="error" role="alert" class="catalog-empty">
      <p>Не удалось загрузить каталог.</p>
      <button type="button" class="catalog-empty-reset" @click="refresh()">Попробовать снова</button>
    </div>

    <div v-else-if="filteredProducts.length" class="catalog-sections">
      <section v-for="section in productSections" :key="section.category" class="catalog-category-section" :aria-label="section.category">
        <div class="catalog-category-heading">
          <div>
            <p class="catalog-section-eyebrow">Коллекция / {{ section.category }}</p>
            <h3 class="font-display">{{ section.category }}</h3>
            <p class="catalog-category-description">{{ section.description }}</p>
          </div>
          <span class="catalog-category-count">{{ section.products.length }} {{ section.products.length === 1 ? 'украшение' : section.products.length < 5 ? 'украшения' : 'украшений' }}</span>
        </div>
        <div class="catalog-products">
          <BestSellerCard v-for="product in section.products" :key="product.id" :product="product" />
        </div>
      </section>
    </div>

    <div v-else-if="!pending" class="catalog-empty">
      <h2 class="font-display text-2xl">{{ priceError ? 'Проверьте диапазон цен' : 'Украшения не найдены' }}</h2>
      <p>{{ priceError || 'Попробуйте другое слово или уберите часть фильтров.' }}</p>
      <button v-if="hasFilters" type="button" class="catalog-empty-reset" @click="resetFilters">Показать все украшения</button>
    </div>
    </section>
  </div>
</template>

<style scoped>
.catalog-page { width: calc(100% - clamp(24px, 4vw, 56px)); max-width: 1440px; margin: 28px auto 0; }
.catalog-intro { position: relative; display: grid; grid-template-columns: 1.1fr 1fr; overflow: hidden; border-radius: 32px; background: #302016 url('/img/catalog-jewelry-background.png') center / cover no-repeat; color: #f7f1e8; }
.catalog-intro::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(27,18,12,.78), rgba(27,18,12,.28) 55%, rgba(27,18,12,.08)); }
.catalog-intro-copy { position: relative; z-index: 1; padding: clamp(28px, 4vw, 64px); }
.catalog-breadcrumb { display: flex; gap: 12px; margin-bottom: 36px; color: #e1cdb8; font-size: 12px; }
.catalog-breadcrumb a:hover { color: #fffaf4; }
.catalog-eyebrow { display: flex; align-items: center; gap: 12px; color: #e1cdb8; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; }
.catalog-eyebrow::before { content: ''; width: 30px; height: 1px; background: currentColor; }
.catalog-intro h1 { margin-top: 20px; font-size: clamp(38px, 4.8vw, 72px); line-height: 1.1; letter-spacing: -.035em; }
.catalog-intro-description { margin-top: 24px; color: #eadbcb; font-size: clamp(14px, 1.4vw, 19px); line-height: 1.7; }
.catalog-intro-photo { position: relative; min-height: 360px; }
.catalog-photo-caption { position: absolute; bottom: 30px; left: 30px; z-index: 1; display: grid; gap: 5px; color: #f7f1e8; font-family: 'Playfair Display', serif; font-size: 26px; }
.catalog-photo-caption span { font-family: Inter, sans-serif; font-size: 12px; letter-spacing: .05em; }
.catalog-tools { margin-top: 24px; padding: clamp(24px, 3vw, 40px); border-radius: 28px; background: #241811; color: #f7f1e8; }
.catalog-categories { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
.catalog-categories button { min-height: 44px; padding: 11px 22px; border: 1px solid #806b59; border-radius: 99px; font-size: 14px; transition: background .2s, color .2s; }
.catalog-categories button:hover { background: #3a2a1d; }
.catalog-categories button.is-selected { border-color: #c69a6d; background: #c69a6d; color: #241811; }
.catalog-collection { margin-top: 40px; }
.catalog-results-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin: 0 clamp(16px, 3vw, 40px) 24px; }
.catalog-sections { display: grid; gap: 24px; }
.catalog-category-section { padding: clamp(24px, 3vw, 40px); border-radius: 28px; background: #f7f1e8; }
.catalog-category-section:nth-child(even) { background: #e8d9c8; }
.catalog-category-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-bottom: 24px; margin-bottom: 28px; border-bottom: 1px solid #cdbba8; }
.catalog-section-eyebrow { color: #796452; font-size: 10px; text-transform: uppercase; letter-spacing: .16em; }
.catalog-category-heading h3 { margin-top: 8px; font-size: clamp(32px, 3.5vw, 48px); letter-spacing: -.035em; line-height: 1.15; }
.catalog-category-description { margin-top: 10px; color: #796452; font-size: 14px; }
.catalog-category-count { padding: 9px 14px; border: 1px solid #b59b83; border-radius: 99px; font-size: 12px; white-space: nowrap; color: #796452; }
.catalog-results-heading h2 { font-size: clamp(26px, 2.7vw, 40px); letter-spacing: -.035em; }
.catalog-results-heading p { color: #796452; font-size: 13px; }
.catalog-products { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px 24px; }
.catalog-products :deep(.bestseller-photo) { border-radius: 12px; }
.catalog-products :deep(.bestseller-material) { color: #796452; }
.catalog-products :deep(.bestseller-add) { border-color: #a48a73; }
.catalog-products :deep(.bestseller-add .site-icon) { filter: brightness(0); }
.catalog-products :deep(.bestseller-add:hover) { background: #241811; color: #f7f1e8; }
.catalog-products :deep(.bestseller-add:hover .site-icon) { filter: brightness(0) invert(1); }
.catalog-products :deep(.bestseller-card h3) { font-size: clamp(17px, 1.5vw, 23px); }
.catalog-products :deep(.bestseller-purchase p) { font-size: clamp(17px, 1.55vw, 24px); }
.catalog-search-row { display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 20px; margin-bottom: 24px; }
.catalog-label { display: block; margin-bottom: 8px; color: #d3c1b0; font-size: 12px; }
.catalog-search-input { display: flex; align-items: center; gap: 12px; padding: 0 14px; border: 1px solid #d6c5b4; border-radius: 99px; background: #fffaf4; color: #241811; }
.catalog-search-input:focus-within { border-color: #8a6340; }
.catalog-search-input input { width: 100%; min-width: 0; padding: 12px 0; background: transparent; font-size: 14px; outline: none; }
.catalog-sort-field select { width: 100%; min-height: 46px; padding: 10px 14px; border: 1px solid #d6c5b4; border-radius: 12px; background: #fffaf4; color: #241811; font-size: 14px; }
.catalog-filter-row { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 16px; }
.catalog-filter-row label { color: #d3c1b0; }
.catalog-filter-row select, .catalog-filter-row input { min-height: 44px; background: #fffaf4; color: #241811; }
.catalog-reset { min-height: 44px; margin-left: auto; border-color: #806b59; }
.catalog-reset:disabled { opacity: .45; cursor: default; }
.catalog-price-error { margin-top: 14px; color: #ffbaa5; font-size: 13px; }
.catalog-active-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; padding-top: 16px; border-top: 1px solid #806b59; }
.catalog-active-filters button { display: inline-flex; align-items: center; gap: 8px; max-width: 100%; padding: 8px 12px; border: 1px solid #806b59; border-radius: 99px; background: #3a2a1d; font-size: 12px; overflow-wrap: anywhere; }
.catalog-active-filters button:hover { background: #59402d; }
.catalog-active-filters button .iconify { flex-shrink: 0; }
.catalog-empty { padding: 64px 20px; text-align: center; }
.catalog-empty p { margin-top: 12px; color: #796452; }
.catalog-empty-reset { margin-top: 24px; padding: 12px 22px; border: 1px solid #8a7564; border-radius: 99px; font-size: 14px; }
.catalog-empty-reset:hover { background: #f7f1e8; }
@media (max-width: 639px) {
  .catalog-page { margin-top: 16px; }
  .catalog-intro { grid-template-columns: 1fr; border-radius: 24px; background-position: 65% center; }
  .catalog-intro::before { background: linear-gradient(180deg, rgba(27,18,12,.86), rgba(27,18,12,.45) 60%, rgba(27,18,12,.2)); }
  .catalog-breadcrumb { margin-bottom: 26px; }
  .catalog-intro-photo { min-height: 150px; }
  .catalog-tools, .catalog-category-section { padding: 20px 16px; border-radius: 24px; }
  .catalog-tools { margin-top: 16px; }
  .catalog-collection { margin-top: 28px; }
  .catalog-sections { gap: 16px; }
  .catalog-category-heading { align-items: flex-start; gap: 12px; }
  .catalog-category-count { padding: 7px 10px; font-size: 11px; }
  .catalog-category-description { font-size: 12px; }
  .catalog-categories { gap: 8px; }
  .catalog-categories button { padding: 10px 14px; font-size: 12px; }
  .catalog-results-heading { flex-direction: column; gap: 8px; margin-bottom: 22px; }
  .catalog-products { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 14px; }
  .catalog-products :deep(.bestseller-card h3) { font-size: 16px; }
  .catalog-search-row { grid-template-columns: 1fr; gap: 16px; }
  .catalog-filter-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 12px; }
  .catalog-metal-field { grid-column: span 2; }
  .catalog-filter-row input, .catalog-filter-row select { width: 100%; }
  .catalog-reset { grid-column: span 2; margin-left: 0; }
}
@media (min-width: 640px) and (max-width: 1023px) {
  .catalog-products { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 20px; }
}
@media (min-width: 1920px) {
  .catalog-page { max-width: 1840px; }
  .catalog-products { grid-template-columns: repeat(5, minmax(0, 1fr)); }
}
</style>
