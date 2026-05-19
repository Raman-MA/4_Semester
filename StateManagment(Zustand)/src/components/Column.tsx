import { useMemo, useState } from 'react'
import './css/Column.css'
import Task from './Task.tsx'
import { useStore } from '../stores/store.tsx'
import type { Status } from '../types/task.ts'

interface ColumnProps {
    state: Status
}

export default function Column({ state }: ColumnProps) {
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    const allTasks = useStore((store) => store.tasks)
    const tasks = useMemo(
        () => allTasks.filter((task) => task.status === state),
        [allTasks, state])
    const addTask = useStore((store) => store.addTask)

    return (
        <div className="column">
            <div className='titleWrapper'>
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>
            {tasks.map((task, index) => (
                <Task
                    key={index}
                    id={task.id}
                    title={task.title}
                    status={task.status}
                />
            ))}
            {open && (
                <div className='Modal'>
                    <div className='modalContent'>
                        <input onChange={(e) => setText(e.target.value)} value={text} />
                        <button onClick={() => { addTask(text, state); setText(""); setOpen(false) }}> Submit </button>
                    </div>
                </div>
            )}
        </div>
    );
}