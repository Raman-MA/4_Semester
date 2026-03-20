import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

function Button({ children, type = 'button', ...props }: ButtonProps) {
	return (
		<button type={type} {...props}>
			{children}
		</button>
	)
}

export default Button
