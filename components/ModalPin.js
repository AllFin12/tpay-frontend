import Cookies from "js-cookie";
import Head from "next/head";
import { useState } from "react";
import { Button, Card, Col, Form, Row, Modal, Alert } from "react-bootstrap";
import styles from "../styles/ModalPin.module.css";
import axiosApiIntances from "../utils/axios";

export default function ModalPin(props) {
  const [pin, setPin] = useState({});
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
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

  const handleSubmit = () => {
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    console.log(allPin);
    // props.setPin(allPin);
    props.setForm({ ...props.form, pin: allPin });
    axiosApiIntances
      .post("/transaction", props.form, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      })
      .then((res) => {
        Cookies.set("transaction", res.data.data.id);
        props.setPageConfirm(false);
        props.setPageTransfer(false);
        props.setHistory(false);
        props.setDashboard(false);
        props.setTransfer(false);
        props.setTopUp(false);
        props.setProfile(false);
        props.StatusPage(true);
      })
      .catch((err) => {
        setIsError(true);
        setMsg(err.response.data.msg);
      });
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        {/* <Modal.Header closeButton> */}
        <Modal.Title closeButton className={styles.modal}>
          <h1 className={styles.titlePin}>Enter PIN to Transfer</h1>
          <p className={styles.notePin}>
            Enter your 6 digits PIN for confirmation to continue transferring
            money.{" "}
          </p>
        </Modal.Title>

        <Modal.Body>
          <Form>
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
          </Form>
          {isError && <Alert className={styles.alert}>{msg}</Alert>}
          <Button
            variant="primary"
            className={styles.btnNext}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
