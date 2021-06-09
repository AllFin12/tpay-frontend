import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import styles from "../styles/ConfirmPage.module.css";
import axiosApiIntances from "../utils/axios";

import ModalPin from "./ModalPin";

export default function ConfirmPage(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [pin, setPin] = useState("");
  const [data2, setData2] = useState({});
  const [form, setForm] = useState({
    senderId: props.form.senderId,
    receiverId: props.form.receiverId,
    amount: props.form.amount,
    notes: props.form.notes,
    pin: "",
  });
  useEffect(() => {
    getData();
    getDataSender();
  }, []);
  const getData = () => {
    axiosApiIntances
      .get(`user/${props.receiverId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      })
      .then((res) => {
        setData(res.data.data[0]);
      });
  };
  const getDataSender = () => {
    axiosApiIntances
      .get(`user/${Cookies.get("user")}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      })
      .then((res) => {
        setData2(res.data.data[0]);
      });
  };
  const handleClose = () => setShow(false);
  const handleModalPin = () => setShow(true);
  console.log(form);
  return (
    <>
      <Card className={styles.cardSearch}>
        <h1 className={styles.title}>Transfer To</h1>
        <Card className={styles.cardUser}>
          <Row>
            <Col xs={1} className={styles.userImg}>
              <img alt="" src="/1.png" />
            </Col>
            <Col xs={9} className={styles.infoUser}>
              <p className={styles.name}>{data.user_username}</p>{" "}
              <p className={styles.method}>{data.user_phone}</p>
            </Col>
          </Row>
        </Card>
        <p className={styles.note1}>Details</p>
        <Card className={styles.cardDetails}>
          <p className={styles.titleAmount}>Amount</p>
          <h1 className={styles.amount}>Rp{props.form.amount}</h1>

          <p className={styles.titleAmount}>Balance Left</p>
          <h1 className={styles.amount}>Rp{data2.balance}</h1>

          <p className={styles.titleAmount}>Date & Time</p>
          <h1 className={styles.amount}>{Date(Date.now()).slice(0, 21)}</h1>

          <p className={styles.titleAmount}>Notes</p>
          <h1 className={styles.amount}>{props.form.notes}</h1>
        </Card>
        <Button className={styles.btnNext} onClick={handleModalPin}>
          Continue
        </Button>
        <ModalPin
          show={show}
          handleClose={handleClose}
          setPageConfirm={props.setPageConfirm}
          setPageTransfer={props.setPageTransfer}
          setHistory={props.setHistory}
          setDashboard={props.setDashboard}
          setTransfer={props.setTransfer}
          setTopUp={props.setTopUp}
          setProfile={props.setProfile}
          StatusPage={props.setStatusPage}
          setPin={setPin}
          pin2={pin}
          setForm={setForm}
          form={form}
        />
      </Card>
    </>
  );
}
