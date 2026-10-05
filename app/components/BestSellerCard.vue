<script setup lang="ts">
import type { ModalProduct } from '~/composables/useProductModal';
const props = defineProps<{ product: ModalProduct }>();
const { openProduct } = useProductModal();
const { addToCart } = useCart();
const justAdded = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;
const add = () => {
  addToCart(props.product);
  justAdded.value = true;
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => { justAdded.value = false; }, 1600);
};
onBeforeUnmount(() => clearTimeout(resetTimer));
const price = computed(() => new Intl.NumberFormat('ru-RU').format(props.product.price));
</script>

<template>
  <article class="bestseller-card">
    <button type="button" class="bestseller-details" :aria-label="'Подробнее о товаре: ' + product.name" @click="openProduct(product)">
      <span class="bestseller-photo">
        <img :src="product.image" :alt="product.name" width="480" height="480" loading="lazy" decoding="async">
      </span>
      <h3 class="font-display">{{ product.name }}</h3>
    </button>
    <p class="bestseller-material">{{ product.material }}</p>
    <div class="bestseller-purchase">
      <p class="font-sans">{{ price }} ₽</p>
      <button type="button" class="bestseller-add" :class="{ 'is-added': justAdded }" :aria-label="'Добавить в корзину: ' + product.name" @click="add"><Icon :name="justAdded ? 'ph:check' : 'ph:plus'" class="h-5 w-5" /></button>
    </div>
    <span role="status" class="sr-only">{{ justAdded ? product.name + ' добавлен в корзину' : '' }}</span>
  </article>
</template>
