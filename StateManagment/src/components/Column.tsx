import './css/Column.css'
import Task from './Task.tsx'

interface ColumnProps {
    state: string
}

export default function Column({ state }: ColumnProps) {
    return (
        <div className="column">
            <p>{state}</p>
            <Task title="Todo" status={'PLANNED'} />
        </div>
    );
}