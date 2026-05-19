import { create } from 'zustand'
import type { Status, Task } from '../types/task'

interface StoreState {
    tasks: Task[]
    addTask: (title: string, status: Status) => void
}

const useStore = create<StoreState>((set) => ({
    tasks: [{ id: 1, title: 'TestTask', status: 'PLANNED' }],
    addTask: (title: string, status: Status) => {
        set((store) => ({
            tasks: [...store.tasks, { id: Date.now(), title, status }],
        }))
    },
}))

export { useStore }