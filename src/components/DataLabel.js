import React, { Component } from 'react'
import { Row, Col } from "react-grid";

export default class DataLabel extends Component {
    render() {
        return (
          <Row
            style={{
              fontSize: "1.3vmax",
              marginTop: "20px",
              fontStyle: "italic",
            }}
          >
            <Col>
              <span style={{ float: "Right", fontWeight: "600" }}>
                {this.props.text1}
              </span>
            </Col>
            <Col>
              <span
                style={{
                  float: "Left",
                  color: "rgb(0 67 255)",
                  fontWeight: "600",
                }}
              >
                {this.props.text2}
              </span>
            </Col>
          </Row>
        );
    }
}
