<script setup lang="ts">
const { data: products } = await useFetch('/api/products');
const { openProduct } = useProductModal();
const route = useRoute();
const query = ref('');
const expanded = ref(false);
const normalize = (text: string) => text.toLocaleLowerCase('ru-RU').replaceAll('ё', 'е');
const matches = computed(() => {
  const words = normalize(query.value.trim()).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return (products.value ?? []).filter(product => {
    const text = normalize(`${product.name} ${product.material} ${product.category} ${product.description}`);
    return words.every(word => text.includes(word));
  });
});
const choose = (product: NonNullable<typeof products.value>[number]) => {
  expanded.value = false;
  openProduct(product);
};
const submit = () => {
  expanded.value = true;
  if (matches.value.length === 1) choose(matches.value[0]!);
};
watch(() => route.fullPath, () => { expanded.value = false; });
</script>

<template>
  <form class="header-search" role="search" aria-label="Поиск украшений" @submit.prevent="submit" @focusout="event => { if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) expanded = false; }" @keydown.esc="expanded = false">
    <div class="header-search-field">
      <input id="header-search-input" v-model="query" type="search" aria-label="Поиск украшений" placeholder="Найти украшение" autocomplete="off" :aria-expanded="expanded && !!query.trim()" aria-controls="header-search-results" @focus="expanded = true" @input="expanded = true">
      <button type="submit" aria-label="Найти"><Icon name="ph:magnifying-glass" class="h-5 w-5" /></button>
    </div>
    <div v-if="expanded && query.trim()" id="header-search-results" class="header-search-results">
      <p role="status">{{ matches.length ? `Найдено: ${matches.length}` : 'Ничего не найдено. Попробуйте другое название.' }}</p>
      <ul>
        <li v-for="product in matches" :key="product.id">
          <button type="button" class="header-search-result" @click="choose(product)">
            <img :src="product.image" alt="" width="44" height="44">
            <span><span>{{ product.name }}</span><small>{{ new Intl.NumberFormat('ru-RU').format(product.price) }} ₽</small></span>
          </button>
        </li>
      </ul>
    </div>
  </form>
</template>
