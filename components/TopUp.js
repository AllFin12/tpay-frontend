import Head from "next/head";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../styles/TopUp.module.css";

export default function TopUp(props) {
  return (
    <>
      <Card className={styles.cardSearch}>
        <h1 className={styles.mainText}>How To Top Up</h1>
        <Row className={styles.rowMain}>
          <Col xs={1} className={styles.number}>
            1
          </Col>
          <Col xs={11} className={styles.content}>
            Go to the nearest ATM or you can use E-Banking.
          </Col>
        </Row>
        <Row className={styles.rowMain}>
          <Col xs={1} className={styles.number}>
            2
          </Col>
          <Col xs={11} className={styles.content}>
            Type your security number on the ATM or E-Banking.
          </Col>
        </Row>
        <Row className={styles.rowMain}>
          <Col xs={1} className={styles.number}>
            3
          </Col>
          <Col xs={11} className={styles.content}>
            Select “Transfer” in the menu
          </Col>
        </Row>
        <Row className={styles.rowMain}>
          <Col xs={1} className={styles.number}>
            4
          </Col>
          <Col xs={11} className={styles.content}>
            Type the virtual account number that we provide you at the top.
          </Col>
        </Row>
        <Row className={styles.rowMain}>
          <Col xs={1} className={styles.number}>
            5
          </Col>
          <Col xs={11} className={styles.content}>
            Type the amount of the money you want to top up.
          </Col>
        </Row>
        <Row className={styles.rowMain}>
          <Col xs={1} className={styles.number}>
            6
          </Col>
          <Col xs={11} className={styles.content}>
            Read the summary details
          </Col>
        </Row>
        <Row className={styles.rowMain}>
          <Col xs={1} className={styles.number}>
            7
          </Col>
          <Col xs={11} className={styles.content}>
            Press transfer / top up
          </Col>
        </Row>
        <Row className={styles.rowMain}>
          <Col xs={1} className={styles.number}>
            8
          </Col>
          <Col xs={11} className={styles.content}>
            You can see your money in TPay within 3 hours.
          </Col>
        </Row>
      </Card>
    </>
  );
}
