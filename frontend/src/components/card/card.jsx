import "./card.css";

import { Card } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

export default function CardC(props) {
  const { children, className, ...rest } = props;
  return (
    <Card bg={"dark"}>
      <Card.Img variant="top" src={props.imagen} />
      <Card.Body>
        <Card.Title
          className="text-center"
          style={{ color: "white" }}
        >{props.title}</Card.Title>
        <br></br>
        <Card.Text className="bodyCard text-center">
          {children}
        </Card.Text>
        <br></br>
        {props.boton}
      </Card.Body>
    </Card>
  );
}
