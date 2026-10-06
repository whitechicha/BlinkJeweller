<script setup lang="ts">
const { data: products } = await useFetch('/api/products', { query: { tag: 'recommended' } });
const { openProduct } = useProductModal();
const currentIndex = ref(0);
const slideDirection = ref(1);
const selection = computed(() => {
  const list = products.value ?? [];
  return Array.from({ length: Math.min(3, list.length) }, (_, offset) => list[(currentIndex.value + offset) % list.length]!);
});
const move = (direction: number) => {
  const count = products.value?.length ?? 0;
  if (count) {
    slideDirection.value = direction;
    currentIndex.value = (currentIndex.value + direction + count) % count;
  }
};
onMounted(() => {
  for (const product of products.value ?? []) {
    const image = new Image();
    image.src = product.image;
  }
});
const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);
</script>

<template>
  <section id="recommendations" class="collection-section recommended-section" aria-labelledby="recommendations-title">
    <div class="collection-inner editorial-grid mx-auto" :style="{ '--slide-offset': `${slideDirection * 28}px` }">
      <div class="editorial-intro">
        <p class="editorial-eyebrow">Выбор Samorodok</p>
        <h2 id="recommendations-title" class="font-display">Рекомендуем</h2>
        <p class="editorial-description">Украшения, в которые легко влюбиться.</p>
        <NuxtLink to="/catalog" class="editorial-link">Смотреть подборку <img src="/icons/ph-arrow-right-dark.svg" class="site-icon h-4 w-4" alt="" aria-hidden="true"></NuxtLink>
        <div v-if="products && products.length > 1" class="editorial-controls">
          <button type="button" aria-label="Предыдущая подборка" @click="move(-1)"><img src="/icons/ph-caret-left-dark.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></button>
          <span aria-live="polite">{{ String(currentIndex + 1).padStart(2, '0') }} <span class="editorial-total">/ {{ String(products.length).padStart(2, '0') }}</span></span>
          <button type="button" aria-label="Следующая подборка" @click="move(1)"><img src="/icons/ph-caret-right-dark.svg" class="site-icon h-5 w-5" alt="" aria-hidden="true"></button>
        </div>
      </div>
      <div v-for="(product, index) in selection" :key="index" class="editorial-tile" :class="{ 'editorial-feature': index === 0 }" :style="{ '--slide-delay': `${index * 45}ms` }">
        <Transition name="recommendation">
          <button :key="product.id" type="button" class="editorial-product" :aria-label="'Подробнее о товаре: ' + product.name" @click="openProduct(product)">
            <img :src="product.image" :alt="product.name" width="700" height="800" decoding="async">
            <span class="editorial-caption"><span class="font-display">{{ product.name }}</span><span>{{ formatPrice(product.price) }} ₽</span></span>
          </button>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editorial-product { position: absolute; inset: 0; width: 100%; height: 100%; text-align: left; }
.recommendation-enter-active { transition: opacity 420ms ease, transform 480ms cubic-bezier(.22, 1, .36, 1); transition-delay: var(--slide-delay); }
.recommendation-leave-active { transition: opacity 240ms ease, transform 320ms ease; pointer-events: none; }
.recommendation-enter-from { opacity: 0; transform: translateX(var(--slide-offset)) scale(1.025); }
.recommendation-leave-to { opacity: 0; transform: translateX(calc(var(--slide-offset) * -1)) scale(.985); }
@media (prefers-reduced-motion: reduce) {
  .recommendation-enter-active, .recommendation-leave-active { transition: none; }
  .recommendation-enter-from, .recommendation-leave-to { transform: none; }
}
</style>
