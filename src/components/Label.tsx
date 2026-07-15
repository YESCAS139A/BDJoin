export interface LabelProps {
    name: string;
}

const Label = ({ name }: LabelProps) => {
    return (
        <div className="h-2 mb-5">
            <label>{name}</label>
        </div>
    )
}

export default Label
