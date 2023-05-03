import { ButtonHTMLAttributes, ReactNode, FC } from "react";

export interface RoundedButtonProperties
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	children?: ReactNode;
	disabled?: boolean;
	color?: string;
}

export const RoundedButton: FC<RoundedButtonProperties> = ({
	children,
	onClick,
	disabled,
	className,
	color = 'bg-[color:var(--gray-100)]'
}) => (
	<button
		type='button'
		disabled={disabled}
		onClick={onClick}
		className={`rounded-full ${color} p-1.5 disabled:opacity-75 outline-none focus:outline-none hover:outline-none active:outline-none border-none ${
			className ?? ''
		}`}
	>
		{children}
	</button>
);