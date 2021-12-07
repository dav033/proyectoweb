import { ListGroup, Button } from "react-bootstrap";
import "./genericButton.css";
export default function GenericButton(props) {
  const {
    onClick,
    variant,
    style,
    id,
    content,
    className,
    children,
    type,
    valor,
  } = props;

  return (
    <Button
      onClick={(e) => onClick(valor)}
      className={className}
      id={id}
      style={style}
      variant={variant}
      type={type}
    >
      {children}
    </Button>
  );
}
