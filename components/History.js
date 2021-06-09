import Head from "next/head";
import { Card, Col, Row } from "react-bootstrap";

import styles from "../styles/History.module.css";

export default function History(props) {
  return (
    <>
      <Card className={styles.main}>
        <p className={styles.title}>Transaction History</p>
        <p className={styles.week}>This Week</p>
        {props.data.map((item, index) => {
          return (
            <Card className={styles.cardUser} key={index}>
              <Row>
                <Col xs={1} className={styles.userImg}>
                  <img alt="" src="/1.png" />
                </Col>
                <Col xs={8} className={styles.infoUser}>
                  <p className={styles.name}>{item.user_username}</p>{" "}
                  <p className={styles.method}>Transfer</p>
                </Col>
                <Col xs={2} className={styles.plus}>
                  +Rp{item.transaction_amount}
                </Col>
              </Row>
            </Card>
          );
        })}

        <p className={styles.month}>This Month</p>
        {props.data.map((item, index) => {
          return (
            <Card className={styles.cardUser} key={index}>
              <Row>
                <Col xs={1} className={styles.userImg}>
                  <img alt="" src="/1.png" />
                </Col>
                <Col xs={8} className={styles.infoUser}>
                  <p className={styles.name}>{item.user_username}</p>{" "}
                  <p className={styles.method}>Transfer</p>
                </Col>
                <Col xs={2} className={styles.plus}>
                  +Rp{item.transaction_amount}
                </Col>
              </Row>
            </Card>
          );
        })}
      </Card>
    </>
  );
}
