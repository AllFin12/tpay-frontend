import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { Col, Container, Row, Navbar, Nav, NavDropdown } from "react-bootstrap";

import styles from "../../styles/Navbar.module.css";

export default function NavBar() {
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
          <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="#home">
              <h1 className={styles.title}>TPay</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className={`mr-auto ${styles.nav}`}>
                <Nav.Link href="#features">Edit Profile</Nav.Link>
                <Nav.Link href="#pricing">Log Out</Nav.Link>
              </Nav>
              <Navbar.Collapse
                className={`justify-content-end ${styles.rowUser}`}
              >
                <Navbar.Text>
                  <Row>
                    <Col xs={3}>
                      <img
                        alt=""
                        src="/Rectangle 25.png"
                        className={styles.imgPP}
                      />
                    </Col>
                    <Col xs={7}>
                      <h1 className={styles.nameUser}>Robert Chandler</h1>
                      <p className={styles.phoneUser}>+62 8139 3877 7946</p>
                    </Col>
                    <Col xs={2}>
                      <img alt="" src="/bell.png" className={styles.notif} />
                    </Col>
                  </Row>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Container>
    </>
  );
}
