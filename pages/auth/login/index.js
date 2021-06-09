import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axiosApiIntances from "../../../utils/axios";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Login.module.css";
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

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [click, setClick] = useState(0);
  const [fill, setFill] = useState(false);
  const [fillPass, setFillPass] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    axiosApiIntances
      .post("/auth/login", form)
      .then((res) => {
        console.log(res);
        Cookies.set("token", res.data.data.token, { expires: 7, secure: true });
        Cookies.set("user", res.data.data.user_id, {
          expires: 7,
          secure: true,
        });
        resetData(event);
        router.push("/");
      })
      .catch((err) => {
        setMsgError(err.response.data.msg);
        setFill(false);
        setFillPass(false);
        setIsError(true);
      });
  };

  const changeTextForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (form.userEmail) {
      setFill(true);
    }
    if (form.userPassword) {
      setFillPass(true);
    }
    if (event.target.value == "") {
      setIsError(false);
      setFill(false);
      setFillPass(false);
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
    setForm({ userEmail: "", userPassword: "" });
  };
  console.log(form);
  console.log(fill);
  return (
    <Layout title="Login">
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
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      className={
                        fill
                          ? styles.mail
                          : isError
                          ? styles.mailError
                          : styles.inputPassEmail
                      }
                    >
                      <img
                        alt=""
                        src={
                          fill
                            ? "/mail (2).png"
                            : isError
                            ? "/mail (3).png"
                            : "/mail.png"
                        }
                      />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className={
                      fill
                        ? styles.controlFill1
                        : isError
                        ? styles.errorForm
                        : styles.control1
                    }
                    name="userEmail"
                    value={form.userEmail}
                    onChange={() => changeTextForm(event)}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      className={
                        fillPass
                          ? styles.pass
                          : isError
                          ? styles.passError
                          : styles.inputPass
                      }
                    >
                      <img
                        alt=""
                        src={
                          fillPass
                            ? "/lock (2).png"
                            : isError
                            ? "/lock (3).png"
                            : "/lock.png"
                        }
                      />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    className={
                      fillPass
                        ? styles.controlFill2
                        : isError
                        ? styles.control2Error
                        : styles.control2
                    }
                    name="userPassword"
                    value={form.userPassword}
                    onChange={() => changeTextForm(event)}
                    required
                  />
                  <InputGroup.Append>
                    <InputGroup.Text
                      className={
                        fillPass
                          ? styles.pass
                          : isError
                          ? styles.passError
                          : styles.inputPass
                      }
                    >
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

              <Link href="/pin">
                <p className={styles.forgot}>Forgot password?</p>
              </Link>
              {isError && <Alert className={styles.alert}>{msgError}</Alert>}
              {fill ? (
                <Button type="submit" className={styles.btnLoginFill}>
                  {isLoading ? (
                    <Spinner animation="border" role="status"></Spinner>
                  ) : (
                    "Login"
                  )}
                </Button>
              ) : (
                <Button type="submit" className={styles.btnLogin} disabled>
                  Login
                </Button>
              )}

              <p className={styles.toSignUp}>
                Don’t have an account? Let’s{" "}
                <Link href="/register" className={styles.signUp}>
                  Sign Up
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
