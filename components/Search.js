import Head from "next/head";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import styles from "../styles/Search.module.css";
import axiosApiIntances from "../utils/axios";
import Cookie from "js-cookie";

export default function Search(props) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    console.log(search);
    axiosApiIntances
      .get(`user?search=${search}`, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token") || ""}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      });
  };
  const changeText = (event) => {
    event.preventDefault();
    setSearch({ [event.target.name]: event.target.value });
  };
  const handleTransfer = (item) => {
    props.receiverId(item.user_id);
    props.setPageTransfer(true);
    props.setHistory(false);
    props.setDashboard(false);
    props.setTransfer(false);
    props.setTopUp(false);
    props.setProfile(false);
  };
  console.log(data);
  return (
    <>
      <Card className={styles.cardSearch}>
        <h1 className={styles.title}>Search Receiver</h1>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search receiver here"
              className={styles.controlSearch}
              name="search"
              onChange={(event) => changeText(event)}
            />
          </Form.Group>
        </Form>
        {data.map((item, index) => {
          return (
            <Card
              className={styles.cardUser}
              onClick={() => handleTransfer(item)}
              key={index}
            >
              <Row>
                <Col xs={1} className={styles.userImg}>
                  <img alt="" src="/1.png" />
                </Col>
                <Col xs={9} className={styles.infoUser}>
                  <p className={styles.name}>{item.user_username}</p>{" "}
                  <p className={styles.method}>{item.user_phone}</p>
                </Col>
              </Row>
            </Card>
          );
        })}
      </Card>
    </>
  );
}
