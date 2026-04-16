import classNames from 'classnames'
import './css/Task.css'

type Status = 'PLANNED' | 'ONGOING' | 'DONE'
const DEFAULT_STATUS: Status = 'PLANNED' // for debugging purposes.

interface TaskProps {
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