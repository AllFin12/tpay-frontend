import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import styles from "../styles/ChangePin.module.css";

export default function ChangePin(props) {
  const [pin, setPin] = useState({});

  const changeText = (event) => {
    if (event.target.value) {
      const nextSibling = document.querySelector(
        `input[name='${parseInt(event.target.name, 10) + 1}']`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };
  return (
    <>
      <Card className={styles.cardSearch}>
        <h1 className={styles.title}>Change PIN</h1>
        <p className={styles.note}>
          Enter your current 6 digits TPay PIN below to
          <br /> continue to the next steps.
        </p>
        <Form className={styles.mainForm}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  maxLength="1"
                  onChange={(event) => changeText(event)}
                  name="1"
                  className={styles.controlForm}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  maxLength="1"
                  onChange={(event) => changeText(event)}
                  name="2"
                  className={styles.controlForm}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  maxLength="1"
                  onChange={(event) => changeText(event)}
                  name="3"
                  className={styles.controlForm}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  maxLength="1"
                  onChange={(event) => changeText(event)}
                  name="4"
                  className={styles.controlForm}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  maxLength="1"
                  onChange={(event) => changeText(event)}
                  name="5"
                  className={styles.controlForm}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  maxLength="1"
                  onChange={(event) => changeText(event)}
                  name="6"
                  className={styles.controlForm}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className={styles.btnNext}>
            Continue
          </Button>
        </Form>
      </Card>
    </>
  );
}
