<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
  material: string
  price: number
  image: string
  description?: string
}>()

const { addToCart } = useCart()
const { openProduct } = useProductModal()

const justAdded = ref(false)

const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU').format(value)

const handleAddToCart = () => {
  addToCart({ id: props.id, name: props.name, price: props.price, image: props.image })
  justAdded.value = true
  setTimeout(() => {
    justAdded.value = false
  }, 1200)
}

const showDetails = () => {
  openProduct(props)
}
</script>

<template>
  <div class="product-card flex h-full flex-col items-center rounded-2xl bg-brand-cream p-3 text-center sm:p-6 2xl:p-8 3xl:p-10">
    <button
      type="button"
      class="flex w-full flex-col items-center text-center"
      :aria-label="`Подробнее о товаре: ${name}`"
      @click="showDetails"
    >
      <div class="product-card-image relative w-full">
        <img :src="image" :alt="name" loading="lazy" decoding="async" width="480" height="480" class="mx-auto h-20 w-20 rounded-full object-cover sm:h-28 sm:w-28 lg:h-32 lg:w-32 2xl:h-40 2xl:w-40 3xl:h-48 3xl:w-48">
      </div>

      <h3 class="mt-3 font-display text-sm leading-tight transition hover:text-brand-gold sm:mt-5 sm:text-lg 2xl:mt-6 2xl:text-2xl 3xl:text-3xl">{{ name }}</h3>
    </button>

    <p class="mt-1 text-xs text-brand-dark/60 sm:text-sm 2xl:text-base 3xl:text-lg">{{ material }}</p>
    <p class="mt-2 text-sm font-medium sm:mt-3 sm:text-base 2xl:text-xl 3xl:text-2xl">{{ formatPrice(price) }} ₽</p>

    <button
      type="button"
      class="mt-3 w-full rounded-full border py-1.5 text-xs transition sm:mt-4 sm:py-2 sm:text-sm 2xl:mt-6 2xl:py-3 2xl:text-base 3xl:py-4 3xl:text-lg"
      :class="justAdded
        ? 'border-brand-gold bg-brand-gold text-brand-dark'
        : 'border-brand-dark/20 hover:border-brand-gold hover:text-brand-gold'"
      @click="handleAddToCart"
    >
      {{ justAdded ? 'Добавлено' : 'В корзину' }}
    </button>
    <span role="status" class="sr-only">{{ justAdded ? `${name} добавлен в корзину` : '' }}</span>
  </div>
</template>
