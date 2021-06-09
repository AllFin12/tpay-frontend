import Head from "next/head";

import Link from "next/link";

import { Button, Card, Col, Row } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard(props) {
  const handleHistory = () => {
    props.setHistory(true);
    props.setDashboard(false);
    props.setTransfer(false);
    props.setTopUp(false);
    props.setProfile(false);
  };
  return (
    <>
      <div className={styles.mainDashboard}>
        <Card className={styles.cardBalance}>
          <Row>
            <Col xs={9}>
              <p className={styles.balance}>Balance</p>
              <p className={styles.money}>Rp{props.user.balance}</p>
              <p className={styles.phone}>{props.user.user_phone}</p>
            </Col>
            <Col xs={3}>
              <Button
                className={styles.btnTransfer}
                onClick={props.handleTransfer}
              >
                <Row>
                  <Col xs={1}>
                    <img alt="" src="/arrow-up (2).png" />
                  </Col>
                  <Col xs={10}>Transfer</Col>
                </Row>
              </Button>
              <Button className={styles.btnTopUp} onClick={props.handleTopUp}>
                <Row>
                  <Col xs={1}>
                    <img alt="" src="/plus (4).png" />
                  </Col>
                  <Col xs={10}>Top Up</Col>
                </Row>
              </Button>
            </Col>
          </Row>
        </Card>
        <Row>
          <Col sm={6}>
            <Card className={styles.cardCharts}>
              <Row>
                <Col xs={7}>
                  <img alt="" src="/arrow-up (4).png" />
                  <p className={styles.income}>Income</p>
                  <p className={styles.moneyIncome}>Rp2.120.000</p>
                </Col>
                <Col xs={5}>
                  <img alt="" src="/arrow-up (3).png" />
                  <p className={styles.expense}>Expense</p>
                  <p className={styles.moneyExpense}>Rp1.560.000</p>
                </Col>
              </Row>
              <Row className={styles.charts}>
                <img alt="" src="/graphic.png" />
              </Row>
            </Card>
          </Col>
          <Col sm={6}>
            <Card className={styles.cardHistory}>
              <Row>
                <Col xs={8} className={styles.history}>
                  Transaction History
                </Col>
                <Col xs={4}>
                  <p className={styles.seeAll} onClick={handleHistory}>
                    See all
                  </p>
                </Col>
              </Row>
              <Row className={styles.cardName}>
                {props.data.data.map((item, index) => {
                  return (
                    <Card className={styles.cardUser} key={index}>
                      <Row>
                        <Col xs={3} className={styles.userImg}>
                          <img alt="" src="/1.png" />
                        </Col>
                        <Col xs={5}>
                          <p className={styles.name}>{item.user_username}</p>{" "}
                          <p className={styles.method}>Transfer</p>
                        </Col>
                        <Col xs={4} className={styles.plus}>
                          +Rp{item.transaction_amount}
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
