import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import styles from "../styles/ChangePassword.module.css";
import axiosApiIntances from "../utils/axios";
import Cookie from "js-cookie";

export default function ChangePassword(props) {
  const router = useRouter();
  const [form, setForm] = useState({
    userPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [click, setClick] = useState(0);
  const [fill, setFill] = useState(false);
  const [fillPass, setFillPass] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const updatePass = () => {
    axiosApiIntances
      .patch(`user/pass/${Cookie.get("user")}`, form, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token") || ""}`,
        },
      })
      .then((res) => {
        alert("Success Update Pass, Please Login Again");
        Cookie.remove("token");
        Cookie.remove("user");
        router.push("/login");
      })
      .catch((err) => {
        setIsError(true);
        setMsgError(err.response.data.msg);
      });
  };
  const changeTextForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });

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
  console.log(form);
  return (
    <>
      <Card className={styles.cardSearch}>
        <h1 className={styles.title}>Change Password</h1>
        <p className={styles.note}>
          You must enter your current password and then
          <br /> type your new password twice.
        </p>
        <Form className={styles.mainForm}>
          <Form.Group className={styles.group}>
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
          <Form.Group className={styles.group}>
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
                placeholder="New password"
                className={
                  fillPass
                    ? styles.controlFill2
                    : isError
                    ? styles.control2Error
                    : styles.control2
                }
                name="newPassword"
                value={form.newPassword}
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
          <Form.Group className={styles.group}>
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
                placeholder="Repeat new password"
                className={
                  fillPass
                    ? styles.controlFill2
                    : isError
                    ? styles.control2Error
                    : styles.control2
                }
                name="confirmPassword"
                value={form.confirmPassword}
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
          {isError && <Alert className={styles.alert}>{msgError}</Alert>}
          {fillPass ? (
            <Button className={styles.btnLoginFill} onClick={updatePass}>
              {isLoading ? (
                <Spinner animation="border" role="status"></Spinner>
              ) : (
                "Change Password"
              )}
            </Button>
          ) : (
            <Button className={styles.btnLogin} disabled>
              Change Password
            </Button>
          )}
        </Form>
      </Card>
    </>
  );
}
