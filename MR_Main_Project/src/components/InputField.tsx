import type { InputHTMLAttributes, PropsWithChildren } from 'react'

type InputFieldProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>

function InputField({ children, ...props }: InputFieldProps) {
	return (
		<input {...props}>
			{children}
		</input>
	)
}

export default InputField
