export interface LabelProps {
  name: string;
  className?: string;
}

const Label = ({ name, className }: LabelProps) => {
  return (
    <div className={`h-2 mb-5 ${className}`}>
      <label>{name}</label>
    </div>
  );
};

export default Label;
