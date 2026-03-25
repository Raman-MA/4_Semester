import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from './Button'
import InputField from './InputField'
import { Protocol, Status } from '../types/enums'

type NewAppointment = {
	arrivalTime: Date
	scheduleTime: number
	isUrgent: boolean
	status: Status
	protocol: Protocol
}

type CreateAppointmentFormProps = {
	onCreateAppointment: (newAppointment: NewAppointment) => void
}

function CreateAppointmentForm({ onCreateAppointment }: CreateAppointmentFormProps) {
	const [arrivalTime, setArrivalTime] = useState('')
	const [scheduleTime, setScheduleTime] = useState('')
	const [isUrgent, setIsUrgent] = useState(false)
	const [status, setStatus] = useState<Status>(Status.inProgress)
	const [protocol, setProtocol] = useState<Protocol>(Protocol.CerebrumStd)
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const parsedScheduleTime = Number(scheduleTime)
		if (!arrivalTime || Number.isNaN(parsedScheduleTime) || parsedScheduleTime <= 0) {
			return
		}
		onCreateAppointment({
			arrivalTime: new Date(arrivalTime),
			scheduleTime: parsedScheduleTime,
			isUrgent,
			status,
			protocol,
		})
		setArrivalTime('')
		setScheduleTime('')
		setIsUrgent(false)
		setStatus(Status.inProgress)
		setProtocol(Protocol.CerebrumStd)
	}
	return (
		<section className="create-user-card">
			<h2 className="create-user-title">Opret ny aftale</h2>
			<form className="create-user-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="new-appointment-arrival">Møde tidspunkt</label>
					<InputField
						id="new-appointment-arrival"
						type="datetime-local"
						value={arrivalTime}
						onChange={(event) => setArrivalTime(event.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="new-appointment-duration">Planlagt Tid (minutter)</label>
					<InputField
						id="new-appointment-duration"
						type="number"
						min="1"
						value={scheduleTime}
						onChange={(event) => setScheduleTime(event.target.value)}
						placeholder="F.eks. 30"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="new-appointment-status">Status</label>
					<select
						id="new-appointment-status"
						value={status}
						onChange={(event) => setStatus(event.target.value as Status)}
					>
						{Object.values(Status).map((statusOption) => (
							<option key={statusOption} value={statusOption}>
								{statusOption}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="new-appointment-protocol">Protokol</label>
					<select
						id="new-appointment-protocol"
						value={protocol}
						onChange={(event) => setProtocol(event.target.value as Protocol)}
					>
						{Object.values(Protocol).map((protocolOption) => (
							<option key={protocolOption} value={protocolOption}>
								{protocolOption}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="new-appointment-urgent">
						<input
							id="new-appointment-urgent"
							type="checkbox"
							checked={isUrgent}
							onChange={(event) => setIsUrgent(event.target.checked)}
						/>{' '}
						Akut aftale
					</label>
				</div>
				<Button type="submit" className="login-btn create-user-submit">
					Opret aftale
				</Button>
			</form>
		</section>
	)
}

export type { NewAppointment }
export default CreateAppointmentForm
