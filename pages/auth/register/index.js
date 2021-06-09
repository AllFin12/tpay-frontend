import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Register.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import Link from "next/link";
import axiosApiIntances from "../../../utils/axios";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [click, setClick] = useState(0);
  const [fill, setFill] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");

  const changeText = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (form) {
      setFill(true);
    }
    if (event.target.value == "") {
      setFill(false);
    }
  };
  const handleShowPass = () => {
    setShowPass(true);
    setClick(click + 1);
    if (click % 2) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };
  const resetData = (event) => {
    event.preventDefault();
    setForm({ userName: "", userEmail: "", userPassword: "" });
  };

  const handlePin = (event) => {
    event.preventDefault();
    axiosApiIntances
      .post("auth/register", form)
      .then((res) => {
        Cookies.set("user", res.data.data.id);
        setIsLoading(true);
        router.push("/pin");
      })
      .catch((err) => {
        setMsgError(err.response.data.msg);
        setIsError(true);
      });
  };
  return (
    <Layout title="Register">
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
              Start Accessing Banking Needs
              <br /> With All Devices and All Platforms
              <br /> With 30.000+ Users
            </h1>
            <p className={styles.noteTitle}>
              Transfering money is eassier than ever, you can access <br />
              TPay wherever you are. Desktop, laptop, mobile phone?
              <br /> we cover all of that for you!
            </p>
            <Form onSubmit={handlePin}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className={styles.inputPassUser}>
                      <img alt="" src="/Vector.png" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    className={styles.control}
                    name="userName"
                    value={form.userName}
                    onChange={(event) => changeText(event)}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className={styles.inputPassEmail}>
                      <img alt="" src="/mail.png" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className={styles.control1}
                    name="userEmail"
                    value={form.userEmail}
                    onChange={(event) => changeText(event)}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className={styles.inputPass}>
                      <img alt="" src="/lock.png" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="Create your password"
                    className={styles.control2}
                    name="userPassword"
                    value={form.userPassword}
                    onChange={(event) => changeText(event)}
                    required
                  />
                  <InputGroup.Append>
                    <InputGroup.Text className={styles.inputPass}>
                      <img
                        alt=""
                        src="/eye-crossed.png"
                        className={styles.showPass}
                        onClick={handleShowPass}
                      />
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              {isError && (
                <Alert variant="danger" className={styles.alert}>
                  {msgError}
                </Alert>
              )}
              {fill ? (
                <Button type="submit" className={styles.btnLoginFill}>
                  {isLoading ? (
                    <Spinner animation="border" role="status"></Spinner>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              ) : (
                <Button type="submit" className={styles.btnLogin} disabled>
                  Sign Up
                </Button>
              )}

              <p className={styles.toSignUp}>
                Already have an account? Let’s {"  "}
                <Link href="/login" className={styles.signUp}>
                  Login
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
