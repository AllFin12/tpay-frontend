import Head from "next/head";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../styles/ProfileInfo.module.css";

export default function ProfileInfo(props) {
  return (
    <>
      <Card className={styles.cardSearch}>
        <h1 className={styles.title}>Personal Information</h1>
        <p className={styles.note}>
          We got your personal information from the sign
          <br /> up proccess. If you want to make changes on
          <br /> your information, contact our support.
        </p>
        <p className={styles.label}>First Name</p>
        <h1 className={styles.content}>Robert</h1>
        <p className={styles.label}>Last Name</p>
        <h1 className={styles.content}>Chandler</h1>
        <p className={styles.label}>Verified E-mail</p>
        <h1 className={styles.content}>pewdiepie1@gmail.com</h1>
        <Row>
          <Col>
            <p className={styles.label}>Phone Number</p>
            <h1 className={styles.content}>+62 813-9387-7946</h1>
          </Col>
          <Col className={styles.manage}>Manage</Col>
        </Row>
      </Card>
    </>
  );
}
