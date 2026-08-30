import create from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) => (p._id === id ? updatedProduct : p)),
    })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter((p) => p._id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
