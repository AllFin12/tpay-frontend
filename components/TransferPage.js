import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../styles/TransferPage.module.css";
import axiosApiIntances from "../utils/axios";
import Cookie from "js-cookie";

export default function TransferPage(props) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState({});
  const [form, setForm] = useState({
    senderId: parseInt(`${Cookie.get("user")}`),
    receiverId: props.receiverId,
    amount: "",
    notes: "",
  });
  useEffect(() => {
    getData();
    getDataSender();
  }, []);
  const getData = () => {
    axiosApiIntances
      .get(`user/${props.receiverId}`, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token") || ""}`,
        },
      })
      .then((res) => {
        setData(res.data.data[0]);
      });
  };
  const getDataSender = () => {
    axiosApiIntances
      .get(`user/${Cookie.get("user")}`, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token") || ""}`,
        },
      })
      .then((res) => {
        setData2(res.data.data[0]);
      });
  };
  const changeText = (event) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleConfirm = () => {
    props.setForm(form);
    props.setPageConfirm(true);
    props.setPageTransfer(false);
    props.setHistory(false);
    props.setDashboard(false);
    props.setTransfer(false);
    props.setTopUp(false);
    props.setProfile(false);
  };
  console.log(form);
  return (
    <>
      <Card className={styles.cardSearch}>
        <h1 className={styles.title}>Transfer Money</h1>
        <Card className={styles.cardUser}>
          <Row>
            <Col xs={1} className={styles.userImg}>
              <img alt="" src={`http://localhost:3004/api/${data.image}`} />
            </Col>
            <Col xs={9} className={styles.infoUser}>
              <p className={styles.name}>{data.user_username}</p>{" "}
              <p className={styles.method}>{data.user_phone}</p>
            </Col>
          </Row>
        </Card>
        <p className={styles.note1}>
          Type the amount you want to transfer and then <br />
          press continue to the next steps.
        </p>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="0.00"
              className={styles.formMoney}
              name="amount"
              value={form.amount}
              onChange={() => changeText(event)}
            />
          </Form.Group>
        </Form>
        <p className={styles.amount}>Rp{data2.balance} Available</p>
        <Form className={styles.mainFormNote}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Add some notes"
              className={styles.formNotes}
              name="notes"
              value={form.notes}
              onChange={() => changeText(event)}
            />
          </Form.Group>
        </Form>

        <Button className={styles.btnNext} onClick={handleConfirm}>
          Continue
        </Button>
      </Card>
    </>
  );
}
