import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
  Image,
  Modal,
  ListGroup,
} from "react-bootstrap";

import GenericButton from "../genericButton/genericButton.jsx";

export default function ModalC(props) {
  const { show, onHide, title, children, onClick } = props;

  return (
    <Modal show={show} onHide={onHide} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <GenericButton
          variant="secondary"
          className="modalbuttons"
          onClick={onHide}
        >
          Close
        </GenericButton>
        <GenericButton
          variant="primary"
          className="modalbuttons"
          onClick={onClick}
        >
          Save Changes
        </GenericButton>
      </Modal.Footer>
    </Modal>
  );
}
