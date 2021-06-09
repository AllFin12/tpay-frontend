import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Pin.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import axiosApiIntances from "../../../utils/axios";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Pin() {
  const router = useRouter();
  const [form, setForm] = useState({ userId: Cookies.get("user"), Pin: "" });
  const [fill, setFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");

  const changeText = (event) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
    if (form) {
      setFill(true);
    }
    if (event.target.value == "") {
      setFill(false);
    }
  };
  const handlePin = (event) => {
    event.preventDefault();
    axiosApiIntances
      .post("pin", form)
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {
        setMsgError(err.response.data.msg);
      });
  };
  console.log(fill);
  return (
    <Layout title="Create Pin">
      <Container fluid className={styles.main}>
        <Row className={styles.mainRow}>
          <Col sm={7} className={styles.col1}>
            <h1 className={styles.mainText}>TPay</h1>
            <img alt="" src="/Group 57.png" />
            <p className={styles.note1}>App that Covering Banking Needs.</p>
            <p className={styles.note2}>
              TPay is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in TPay everyday with worldwide
              users coverage.
            </p>
          </Col>
          <Col sm={5} className={styles.col2}>
            <h1 className={styles.titleLogin}>
              Secure Your Account, Your Wallet, <br /> and Your Data With 6
              Digits PIN
              <br /> That You Created Yourself.
            </h1>
            <p className={styles.noteTitle}>
              Create 6 digits pin to secure all your money and your data in{" "}
              <br /> TPay app. Keep it secret and don’t tell anyone about your{" "}
              <br />
              TPay account password and the PIN.
            </p>
            <Form onSubmit={handlePin}>
              <Row className={styles.rowPin}>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className={styles.pin}
                      name="Pin"
                      value={form.Pin}
                      onChange={() => changeText(event)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className={styles.pin}
                      name="Pin"
                      value={form.Pin}
                      onChange={() => changeText(event)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className={styles.pin}
                      name="Pin"
                      value={form.Pin}
                      onChange={() => changeText(event)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className={styles.pin}
                      name="Pin"
                      value={form.Pin}
                      onChange={() => changeText(event)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className={styles.pin}
                      name="Pin"
                      value={form.Pin}
                      onChange={() => changeText(event)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className={styles.pin}
                      name="Pin"
                      value={form.Pin}
                      onChange={() => changeText(event)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {fill ? (
                <Button type="submit" className={styles.btnLoginFill}>
                  {isLoading ? (
                    <Spinner animation="border" role="status"></Spinner>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              ) : (
                <Button type="submit" className={styles.btnLogin} disabled>
                  Confirm
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
