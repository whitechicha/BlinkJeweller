<script setup lang="ts">
const { selected, closeProduct } = useProductModal()
const { addToCart } = useCart()

const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU').format(value)

const handleAddToCart = () => {
  if (!selected.value) return
  const { id, name, price, image } = selected.value
  addToCart({ id, name, price, image })
  closeProduct()
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeProduct()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="selected"
        class="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/70 p-4"
        @click.self="closeProduct"
      >
        <div class="relative max-h-[calc(100svh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-brand-cream p-4 sm:p-8">
          <button
            aria-label="Закрыть"
            class="absolute right-4 top-4 text-brand-dark/50 transition hover:text-brand-gold"
            @click="closeProduct"
          >
            <Icon name="ph:x" class="h-6 w-6" />
          </button>

          <img
            :src="selected.image"
            :alt="selected.name"
            class="mx-auto h-32 w-32 rounded-full object-cover sm:h-48 sm:w-48"
          >

          <h2 class="mt-6 text-center font-display text-2xl sm:text-3xl">{{ selected.name }}</h2>
          <p class="mt-1 text-center text-sm text-brand-dark/60">{{ selected.material }}</p>

          <p v-if="selected.description" class="mt-4 text-center text-brand-dark/80">
            {{ selected.description }}
          </p>

          <p class="mt-6 text-center font-display text-2xl">{{ formatPrice(selected.price) }} ₽</p>

          <button
            class="mt-6 w-full rounded-full bg-brand-gold py-3 text-sm font-medium text-brand-dark transition hover:bg-brand-gold/90"
            @click="handleAddToCart"
          >
            В корзину
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
