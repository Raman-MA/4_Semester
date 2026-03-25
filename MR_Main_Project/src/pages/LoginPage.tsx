import { useState } from 'react'
import logo from '../assets/svendborgpng.png'
import Button from '../components/Button'
import useAppNavigation from '../hooks/useAppNavigation'

// we define errors first.
type FormError = {
  bruger?: string
  password?: string
}

function LoginPage() {
  const { goToDashboard } = useAppNavigation()
  //tracking what the user has typed
  const [form, setForm]=useState({bruger:'', password:''})
  // tracking errors for each field
  const [errors, setErrors] = useState<FormError>({})
  // tracking if the user has interacted with the fields
  const [touchd, setTouched] = useState({bruger:false, password:false})

// validation function 
function validate(){
  const newErrors: FormError = {}
  if(!form.bruger) newErrors.bruger = 'Yo, du mangler lige brugernavn bro.'
  if(!form.password) newErrors.password = 'Yo, du mangler da lige en kode, du vil ikke have Ali til at logge ind, vil du?'
  else if(form.password.length <10) newErrors.password = "Ali kan gætte din kode."
  return newErrors
}
 // update form and re validate touhced fields as user types.
function handleChange(e: React.ChangeEvent<HTMLInputElement>){
  const{name, value} = e.target
  const updated = {...form, [name]: value}
  setForm(updated)
  if (touchd[name as keyof typeof touchd]) setErrors(validate())
}
// Mark field as touched when user leaves it
function handleBlur(e: React.FocusEvent<HTMLInputElement>){
  const{name} = e.target
  setTouched({...touchd, [name]: true})
  setErrors(validate())
}

// when submitting the form, we validate everything before navigating
function handleSubmit(){
  const validationErrors = validate()
  if(Object.keys(validationErrors).length > 0){
    setErrors(validationErrors)
    setTouched({bruger:true, password:true})
    return
  }
  goToDashboard()
}

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="login-logo">
          <img
            src={logo}
            alt="logo"
            className="logo-img"
          />
        </div>
        <h1 className="login-title">Velkommen</h1>
      </div>

      <div className="login-card">
        <div className="form-group">
          <label htmlFor="bruger">Brugernavn</label>
          <input
            type="text"
            id="bruger"
            name="bruger"
            placeholder="Indtast brugernavn"
            value={form.bruger}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        {errors.bruger && <p className="error-msg">{errors.bruger}</p>}
        
        </div>
        <div className="form-group">
          <label htmlFor="password">Kodeord</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Indtast Adgangskode"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>
        <Button className="login-btn" onClick={handleSubmit}>
          Log ind
        </Button>
        <div className="login-links">
          <a href="#">Glemt kodeord?</a>
          <a href="#">Opret konto</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
