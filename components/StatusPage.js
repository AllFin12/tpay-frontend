import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../styles/StatusPage.module.css";
import axiosApiIntances from "../utils/axios";

export default function StatusPage(props) {
  const [isFailed, setIsFailed] = useState(false);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  useEffect(() => {
    getData();
    getDataReceiver();
    getDataTransfer();
  }, []);
  const getData = () => {
    axiosApiIntances
      .get(`user/${Cookies.get("user")}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      })
      .then((res) => {
        setData(res.data.data[0]);
      });
  };
  const getDataTransfer = () => {
    axiosApiIntances
      .get(`transaction/${Cookies.get("transaction")}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      })
      .then((res) => {
        setData3(res.data.data[0]);
      });
  };
  const getDataReceiver = () => {
    axiosApiIntances
      .get(`user/${props.receiverId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      })
      .then((res) => {
        setData2(res.data.data[0]);
      });
  };
  console.log(data3);
  return (
    <>
      <Card className={styles.cardSearch}>
        <img
          alt=""
          src={isFailed ? "/failed.png" : "/success.png"}
          className={styles.img}
        />
        {isFailed ? (
          <div>
            <h1 className={styles.status}>Transfer Failed</h1>
            <p className={styles.noteFail}>
              We can’t transfer your money at the moment, we recommend you to
              check your
              <br /> internet connection and try again.
            </p>
          </div>
        ) : (
          <h1 className={styles.status}>Transfer Success</h1>
        )}

        <Card className={styles.cardDetails}>
          <p className={styles.titleAmount}>Amount</p>
          <h1 className={styles.amount}>Rp{data3.transaction_amount}</h1>

          <p className={styles.titleAmount}>Balance Left</p>
          <h1 className={styles.amount}>Rp{data.balance}</h1>

          <p className={styles.titleAmount}>Date & Time</p>
          <h1 className={styles.amount}>{Date(Date.now()).slice(0, 21)}</h1>

          <p className={styles.titleAmount}>Notes</p>
          <h1 className={styles.amount}>{data3.transaction_note}</h1>
        </Card>
        <h1 className={styles.title}>Transfer To</h1>
        <Card className={styles.cardUser}>
          <Row>
            <Col xs={1} className={styles.userImg}>
              <img alt="" src="/1.png" />
            </Col>
            <Col xs={9} className={styles.infoUser}>
              <p className={styles.name}>{data2.user_username}</p>{" "}
              <p className={styles.method}>{data2.user_phone}</p>
            </Col>
          </Row>
        </Card>
        {isFailed ? (
          <Row>
            <Col className={styles.colBtn}>
              <Button className={styles.btnHome}>Try Again</Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className={styles.colBtn}>
              <Button className={styles.btnShare}>
                <img alt="" src="/share-2.png" />
              </Button>
            </Col>
            <Col className={styles.colBtn}>
              <Button className={styles.btnPdf}>Download PDF</Button>
            </Col>
            <Col className={styles.colBtn}>
              <Button className={styles.btnHome} onClick={props.handleHome}>
                Back To Home
              </Button>
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
}
