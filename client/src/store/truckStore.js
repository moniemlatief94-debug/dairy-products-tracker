import create from 'zustand';

export const useTruckStore = create((set) => ({
  trucks: [],
  isLoading: false,
  error: null,

  setTrucks: (trucks) => set({ trucks }),
  addTruck: (truck) => set((state) => ({ trucks: [...state.trucks, truck] })),
  updateTruck: (id, updatedTruck) =>
    set((state) => ({
      trucks: state.trucks.map((t) => (t._id === id ? updatedTruck : t)),
    })),
  deleteTruck: (id) => set((state) => ({ trucks: state.trucks.filter((t) => t._id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
