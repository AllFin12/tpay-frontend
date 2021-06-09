import Head from "next/head";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../styles/Profile.module.css";

export default function Profile(props) {
  console.log(props.user);
  return (
    <>
      <Card className={styles.cardSearch}>
        <img alt="" src="/Rectangle 25.png" className={styles.imgPP} />
        {/* <label for="file">
          <input
            type="file"
            id="file"
            onChange={(event) => handleImage(event)}
          />
          <div> */}
        {/* <span>Edit</span> */}
        {/* </div>
        </label> */}
        <h1 className={styles.name}>{props.user.user_username}</h1>
        <p className={styles.phone}>{props.user.user_phone}</p>
        <Row>
          <Button className={styles.btn} onClick={props.handleProfileInfo}>
            Personal Information
          </Button>
          <img alt="" src="/arrow-left.png" className={styles.arrowLeft} />
        </Row>
        <Row>
          <Button className={styles.btn} onClick={props.handleChangePass}>
            Change Password
          </Button>
          <img alt="" src="/arrow-left.png" className={styles.arrowLeft1} />
        </Row>
        <Row>
          <Button className={styles.btn} onClick={props.handleChangePin}>
            Change PIN
          </Button>
          <img alt="" src="/arrow-left.png" className={styles.arrowLeft2} />
        </Row>
        <Row>
          <Button className={styles.btn} onClick={props.handleLogout}>
            Logout
          </Button>
        </Row>
      </Card>
    </>
  );
}
