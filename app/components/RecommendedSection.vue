<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import type { Swiper as SwiperInstance } from "swiper";

const { data: products } = await useFetch("/api/products", {
  query: { tag: "recommended" },
});

const swiperInstance = shallowRef<SwiperInstance | null>(null);

const slidePrev = () => swiperInstance.value?.slidePrev();
const slideNext = () => swiperInstance.value?.slideNext();
</script>

<template>
  <section id="recommendations" class="collection-section recommended-section py-10 sm:py-16">
    <div class="collection-inner mx-auto px-4 sm:px-6 lg:px-10">
    <h2 class="mb-6 font-display text-xl sm:mb-8 sm:text-2xl 2xl:text-3xl 3xl:text-4xl">Рекомендуем</h2>

    <div class="relative flex items-center gap-2 sm:gap-4">
      <button
        aria-label="Назад"
        class="hidden shrink-0 rounded-full border border-brand-dark/20 p-2 transition hover:border-brand-gold hover:text-brand-gold md:flex"
        @click="slidePrev"
      >
        <Icon name="ph:caret-left" class="h-5 w-5" />
      </button>

      <Swiper
        class="min-w-0 flex-1"
        :watch-overflow="true"
        :space-between="12"
        :breakpoints="{
          0: { slidesPerView: 1.35, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }"
        @swiper="(instance) => (swiperInstance = instance)"
      >
        <SwiperSlide v-for="product in products" :key="product.id">
          <ProductCard
            :id="product.id"
            :name="product.name"
            :material="product.material"
            :price="product.price"
            :image="product.image"
            :description="product.description"
          />
        </SwiperSlide>
      </Swiper>

      <button
        aria-label="Вперёд"
        class="hidden shrink-0 rounded-full border border-brand-dark/20 p-2 transition hover:border-brand-gold hover:text-brand-gold md:flex"
        @click="slideNext"
      >
        <Icon name="ph:caret-right" class="h-5 w-5" />
      </button>
    </div>
    </div>
  </section>
</template>
