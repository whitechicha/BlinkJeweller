export interface ModalProduct {
  id: number
  name: string
  material: string
  price: number
  image: string
  description?: string
}

export const useProductModal = () => {
  const selected = useState<ModalProduct | null>('product-modal', () => null)

  const openProduct = (product: ModalProduct) => {
    selected.value = product
  }

  const closeProduct = () => {
    selected.value = null
  }

  return { selected, openProduct, closeProduct }
}
