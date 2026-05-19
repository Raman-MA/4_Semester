export type Status = 'PLANNED' | 'ONGOING' | 'DONE'

export interface Task {
    id: number
    title: string
    status: Status
}