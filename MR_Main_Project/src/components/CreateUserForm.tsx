import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from './Button'
import InputField from './InputField'

type NewUser = {
  fullName: string
  password: string
}

type CreateUserFormProps = {
  onCreateUser: (newUser: NewUser) => void
}

function CreateUserForm({ onCreateUser }: CreateUserFormProps) {
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = fullName.trim()
    if (!trimmedName || !password.trim()) {
      return
    }

    onCreateUser({ fullName: trimmedName, password })
    setFullName('')
    setPassword('')
  }

  return (
    <section className="create-user-card">
      <h2 className="create-user-title">Opret ny bruger</h2>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="new-user-name">Fulde navn</label>
          <InputField
            id="new-user-name"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Indtast navn"
          />
        </div>

        <div className="form-group">
          <label htmlFor="new-user-password">Kodeord</label>
          <InputField
            id="new-user-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Indtast kodeord"
          />
        </div>

        <Button type="submit" className="login-btn create-user-submit">
          Opret bruger
        </Button>
      </form>
    </section>
  )
}

export type { NewUser }
export default CreateUserForm