import React, { Component } from "react";
import moment from "moment";
import { Button, Row, Icon, Divider, Tooltip } from "antd";
import calendarData from "./calendarData.json";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
const iconType = {
  1: "file",
  2: "dollar"
};

const calendarClasses = {
  0: "palette-red-6",
  1: "palette-red-5",
  2: "palette-volcano-6",
  3: "palette-volcano-5",
  4: "palette-orange-6",
  5: "palette-orange-6",
  6: "palette-gold-6",
  7: "palette-gold-5"
};

const calendarNames = {
  1: "Январь",
  11: "Ноябрь",
  12: "Декабрь"
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: calendarData[12]
    };
  }

  changeMonth = e => {
    if (e.target.value) {
      this.setState({
        currentMonth: calendarData[e.target.value]
      });
    }
  };

  componentDidMount() {}

  calendarsList = () =>
    this.state.currentMonth.content.map(item => {
      let { date, events } = item;

      let eventdate = moment(date, "YYYY-MM-DD");
      let todaysdate = moment();
      let difference = (date, eventdate.diff(todaysdate, "days"));
      let tdy = moment(todaysdate.format("YYYY-MM-DD"));

      let isToday = moment(tdy).isSame(eventdate.format("YYYY-MM-DD"));
      let eventClassName = "";

      if (difference >= 8) {
        eventClassName = "ant-btn-primary";
      } else if (difference >= 0 && difference < 8 && !isToday) {
        eventClassName = calendarClasses[difference];
      }

      if (events.length) {
        return (
          <Tooltip
            overlayClassName={`custom-tooltip`}
            title={events.map(item => (
              <>
                <div className="event-row">
                  <Icon
                    type={
                      iconType[item.type] ? iconType[item.type] : iconType[1]
                    }
                  />{" "}
                  {"   "}
                  {item.title}
                </div>
              </>
            ))}
            placement="bottom"
          >
            <Button shape="circle" size="default" className={eventClassName}>
              {parseInt(date.slice(8, 10), 10)}
            </Button>
          </Tooltip>
        );
      }
      return (
        <Button shape="circle" size="default" type="link">
          {parseInt(date.slice(8, 10), 10)}
        </Button>
      );
    });

  render() {
    return (
      <>
        <Row>
          <h5
            style={{
              textAlign: "center",
              fontSize: 15,
              marginBottom: 10
            }}
          >
            Налоговый календарь
          </h5>
        </Row>
        <Row
          gutter={20}
          type="flex"
          style={{ justifyContent: "space-between" }}
        >
          <Button
            type="default"
            value={this.state.currentMonth.prev}
            onClick={this.changeMonth}
          >
            <Icon type="left" />
            {calendarNames[this.state.currentMonth.prev]
              ? calendarNames[this.state.currentMonth.prev] +
                " " +
                this.state.currentMonth.prevYear
              : "Нет данных"}
          </Button>
          <Button type="primary">
            <Icon type="calendar" />
            {calendarNames[this.state.currentMonth.month] +
              " " +
              this.state.currentMonth.year}
          </Button>
          <Button
            type="default"
            value={this.state.currentMonth.next}
            onClick={this.changeMonth}
          >
            {calendarNames[this.state.currentMonth.next]
              ? calendarNames[this.state.currentMonth.next] +
                " " +
                this.state.currentMonth.nextYear
              : "Нет данных"}
            <Icon type="right" />
          </Button>
        </Row>
        <Divider style={{ marginTop: 10 }} />
        <Row
          gutter={20}
          type="flex"
          style={{ marginBottom: "10px", justifyContent: "space-between" }}
        >
          {this.calendarsList()}
        </Row>
        <Row gutter={20} style={{ textAlign: "right" }}>
          <Link to="calendar">
            <Button size="small">Расширенный календарь</Button>
          </Link>
        </Row>
      </>
    );
  }
}

export default Calendar;
