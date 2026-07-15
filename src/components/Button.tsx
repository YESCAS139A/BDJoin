export interface ButtonProps{
    name:string;
    type?: 'submit'| 'reset' | 'button';
    disabled?: boolean;
    className?: string;
}

const Button = ({ name, type, disabled, className }: ButtonProps) => {
    return (
        <button
        type={type}
        disabled={disabled}
        className={className}
        >{name}
        </button>
    )
}

export default Button
