import { useEffect, useState } from "react";
import axiosApiIntances from "../utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import Footer from "../components/module/Footer";
import styles from "../styles/Home.module.css";
import Dashboard from "../components/Dashboard";
import History from "../components/History";
import Search from "../components/Search";
import TransferPage from "../components/TransferPage";
import ConfirmPage from "../components/ConfirmPage";
import StatusPage from "../components/StatusPage";
import TopUp from "../components/TopUp";
import Profile from "../components/Profile";
import ProfileInfo from "../components/ProfileInfo";
import ChangePassword from "../components/ChangePassword";

import { authPage } from "../middleware/authorizationPage";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import ChangePin from "../components/ChangePin";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  // console.log(data);
  const res = await axiosApiIntances
    .get(`user/${data.user}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return [];
    });
  const res2 = await axiosApiIntances
    .get("transaction?limit=4", {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return [];
    });
  return {
    props: { users: res, data2: res2 }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const router = useRouter();
  // useEffect(() => {
  //   props.users;
  // }, [props.data2.data]);
  const [users, setUsers] = useState(props.users);
  const [isDashboard, setIsDashboard] = useState(true);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isTopUp, setIsTopUp] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isPageHistory, setIsPageHistory] = useState(false);
  const [pageTransfer, setPageTransfer] = useState(false);
  const [pageConfirm, setPageConfirm] = useState(false);
  const [statusPage, setStatusPage] = useState(false);
  const [profileInfo, setProfileInfo] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [changePin, setChangePin] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const [form, setForm] = useState({});
  const [formPin, setFormPin] = useState({});

  const handleDashboard = () => {
    setIsDashboard(true);
    setIsTransfer(false);
    setIsTopUp(false);
    setIsEditProfile(false);
  };

  const handleTransfer = () => {
    setIsTransfer(true);
    setIsDashboard(false);
    setIsTopUp(false);
    setIsEditProfile(false);
  };
  const handleTopUp = () => {
    setIsTopUp(true);
    setIsDashboard(false);
    setIsTransfer(false);
    setIsEditProfile(false);
  };
  const handleEditProfile = () => {
    setIsTopUp(false);
    setIsDashboard(false);
    setIsTransfer(false);
    setIsEditProfile(true);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login");
  };
  const handleProfileInfo = () => {
    setPageConfirm(false);
    setPageTransfer(false);
    setIsPageHistory(false);
    setIsDashboard(false);
    setIsTransfer(false);
    setIsTopUp(false);
    setIsEditProfile(false);
    setStatusPage(false);
    setProfileInfo(true);
  };
  const handleChangePass = () => {
    setPageConfirm(false);
    setPageTransfer(false);
    setIsPageHistory(false);
    setIsDashboard(false);
    setIsTransfer(false);
    setIsTopUp(false);
    setIsEditProfile(false);
    setStatusPage(false);
    setProfileInfo(false);
    setChangePass(true);
  };
  const handleChangePin = () => {
    setPageConfirm(false);
    setPageTransfer(false);
    setIsPageHistory(false);
    setIsDashboard(false);
    setIsTransfer(false);
    setIsTopUp(false);
    setIsEditProfile(false);
    setStatusPage(false);
    setProfileInfo(false);
    setChangePass(false);
    setChangePin(true);
  };

  return (
    <Layout title="Home">
      <Navbar />
      <Container fluid className={styles.main}>
        <Container>
          <Row>
            <Col sm={4}>
              <Card className={styles.cardLeft}>
                <Nav>
                  <Row>
                    <Row className={isDashboard && styles.rowDash}>
                      <Nav.Item>
                        <Row>
                          <Col xs={2}>
                            <img
                              alt=""
                              src={isDashboard ? "/grid.png" : "/grid (1).png"}
                              className={styles.imgMenu}
                            />
                          </Col>
                          <Col xs={10}>
                            <Nav.Link
                              className={
                                isDashboard ? styles.dashTrue : styles.dashboard
                              }
                              onClick={handleDashboard}
                            >
                              Dashboard
                            </Nav.Link>
                          </Col>
                        </Row>
                      </Nav.Item>
                    </Row>
                    <Row className={isTransfer && styles.rowDash}>
                      <Nav.Item>
                        <Row>
                          <Col xs={2}>
                            <img
                              alt=""
                              src={
                                isTransfer
                                  ? "/arrow-up (1).png"
                                  : "/arrow-up.png"
                              }
                              className={styles.imgMenu}
                            />
                          </Col>
                          <Col xs={10}>
                            <Nav.Link
                              onClick={handleTransfer}
                              className={
                                isTransfer ? styles.dashTrue : styles.transfer
                              }
                            >
                              Transfer
                            </Nav.Link>
                          </Col>
                        </Row>
                      </Nav.Item>
                    </Row>
                    <Row className={isTopUp && styles.rowDash}>
                      <Nav.Item>
                        <Row>
                          <Col xs={2}>
                            <img
                              alt=""
                              src={isTopUp ? "/plus (3).png" : "/plus (2).png"}
                              className={styles.imgMenu}
                            />
                          </Col>
                          <Col xs={10}>
                            <Nav.Link
                              onClick={handleTopUp}
                              className={
                                isTopUp ? styles.dashTrue : styles.topup
                              }
                            >
                              Top Up
                            </Nav.Link>
                          </Col>
                        </Row>
                      </Nav.Item>
                    </Row>
                    <Row className={isEditProfile && styles.rowDash1}>
                      <Nav.Item>
                        <Row>
                          <Col xs={2}>
                            <img
                              alt=""
                              src={
                                isEditProfile ? "/user (1).png" : "/user.png"
                              }
                              className={styles.imgMenu}
                            />
                          </Col>
                          <Col xs={10}>
                            <Nav.Link
                              onClick={handleEditProfile}
                              className={
                                isEditProfile
                                  ? styles.dashTrue1
                                  : styles.profile
                              }
                            >
                              Profile
                            </Nav.Link>
                          </Col>
                        </Row>
                      </Nav.Item>
                    </Row>
                    <Row>
                      <Nav.Item>
                        <Row>
                          <Col xs={2}>
                            <img
                              alt=""
                              src="/log-out.png"
                              className={styles.imgMenu}
                            />
                          </Col>
                          <Col xs={10}>
                            <Nav.Link
                              onClick={() => handleLogout(event)}
                              className={styles.logout}
                            >
                              Logout
                            </Nav.Link>
                          </Col>
                        </Row>
                      </Nav.Item>
                    </Row>
                  </Row>
                </Nav>
              </Card>
            </Col>
            <Col sm={8}>
              {isDashboard ? (
                <Dashboard
                  handleTransfer={handleTransfer}
                  handleTopUp={handleTopUp}
                  setHistory={setIsPageHistory}
                  setDashboard={setIsDashboard}
                  setTransfer={setIsTransfer}
                  setTopUp={setIsTopUp}
                  setProfile={setIsEditProfile}
                  user={props.users.data[0]}
                  data={props.data2}
                />
              ) : isTransfer ? (
                <Search
                  setPageTransfer={setPageTransfer}
                  setHistory={setIsPageHistory}
                  setDashboard={setIsDashboard}
                  setTransfer={setIsTransfer}
                  setTopUp={setIsTopUp}
                  setProfile={setIsEditProfile}
                  receiverId={setReceiverId}
                />
              ) : isTopUp ? (
                <TopUp />
              ) : isEditProfile ? (
                <Profile
                  handleLogout={handleLogout}
                  handleProfileInfo={handleProfileInfo}
                  handleChangePass={handleChangePass}
                  handleChangePin={handleChangePin}
                  user={props.users.data[0]}
                />
              ) : isPageHistory ? (
                <History data={props.data2.data} />
              ) : pageTransfer ? (
                <TransferPage
                  setPageConfirm={setPageConfirm}
                  setPageTransfer={setPageTransfer}
                  setHistory={setIsPageHistory}
                  setDashboard={setIsDashboard}
                  setTransfer={setIsTransfer}
                  setTopUp={setIsTopUp}
                  setProfile={setIsEditProfile}
                  receiverId={receiverId}
                  setForm={setForm}
                />
              ) : pageConfirm ? (
                <ConfirmPage
                  setPageConfirm={setPageConfirm}
                  setPageTransfer={setPageTransfer}
                  setHistory={setIsPageHistory}
                  setDashboard={setIsDashboard}
                  setTransfer={setIsTransfer}
                  setTopUp={setIsTopUp}
                  setProfile={setIsEditProfile}
                  setStatusPage={setStatusPage}
                  form={form}
                  receiverId={receiverId}
                />
              ) : statusPage ? (
                <StatusPage
                  handleHome={handleDashboard}
                  receiverId={receiverId}
                />
              ) : profileInfo ? (
                <ProfileInfo />
              ) : changePass ? (
                <ChangePassword />
              ) : changePin ? (
                <ChangePin />
              ) : (
                "Welcomw to TPay"
              )}
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </Layout>
  );
}
