import classNames from 'classnames'
import './css/Task.css'
import type { Status } from '../types/task'

interface TaskProps {
    id: number
    title: string
    status: Status
}

export default function Task({ title, status }: TaskProps) {
    return (
        <div className="task">
            <div>{title}</div>
            <div className='bottomWrapper'>
                <div></div>
                <div className={classNames('status',status)}>{status}</div>
            </div>
        </div>
    )
}