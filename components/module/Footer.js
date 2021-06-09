import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { Col, Container, Row } from "react-bootstrap";

import styles from "../../styles/Footer.module.css";

export default function Footer() {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login");
  };

  return (
    <>
      <Container fluid className={styles.main}>
        <Container className={styles.mainContainer}>
          <Row>
            <Col sm={8}>
              <h1 className={styles.mainText}>
                2020 TPay. All right reserved.
              </h1>
            </Col>
            <Col sm={2}>
              <h1 className={styles.mainPhone}>+62 5637 8882 9901</h1>
            </Col>
            <Col sm={2}>
              <h1 className={styles.mainEmail}>contact@tpay.com</h1>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
