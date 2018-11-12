import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import {fetchHomePageData} from '../actions'
import { Button, Modal, Input, Select, Radio, Checkbox, TimePicker, DatePicker ,InputNumber} from 'antd'
import moment from 'moment'
import Header from '../../../components/common/Header/Header'
import getSize from '../../../utils/getSize'
import css from './Schedule.css'

import CWYWSJ_IMG from '../../../containers/BusinessDb/Image/CWYWSJ_IMG.png'
import JWYWSJ_IMG from '../../../containers/BusinessDb/Image/JWYWSJ_IMG.png'
import TSYWSJ_IMG from '../../../containers/BusinessDb/Image/TSYWSJ_IMG.png'
import XGYWSJ_IMG from '../../../containers/BusinessDb/Image/XGYWSJ_IMG.png'
import YSYWSJ_IMG from '../../../containers/BusinessDb/Image/YSYWSJ_IMG.png'
import ZTGS_IMG from '../../../containers/BusinessDb/Image/ZTGS_IMG.png'

const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
class TimeSchedule extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      changeTimeType: 'Interval'
    };
  }

  // componentWillUpdate(newProps) {
  //   if (this.props.modalVisible != newProps.modalVisible) {
  //     console.log("...............  " + this.state.modalVisible + "  ...................")
  //     console.log("...............  " + newProps.modalVisible + "  ...................")
  //     let modalVisible = this.state.modalVisible

  //     this.setState({
  //       modalVisible: newProps.modalVisible,
  //     });
  //   }    
  // }

  // componentWillMount() {
  //   this.setState({
  //     modalVisible: this.props.changeModalView(true),
  //   });
  // }

  hideModal = () => {
    this.props.changeModalView(false);
  }

  // select选择器触发事件  
  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      changeTimeType: value
    })
  }

  // Radio选择触发事件
  handleRadioChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  // Radio选择触发事件
  handleCheckBoxChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  // 时间选择触发事件
  handleTimeChange = (time, timeString) => {
    console.log(time, timeString);
  }

  // 日期时间选择触发事件
  handleDataTimeChange = (time, timeString) => {
    console.log('Selected Time: ', time);
    console.log('Formatted Selected Time: ', timeString);
  }
  handleDataTimenOk = (value) => {
    console.log('onOk: ', value);
  }

  //间隔时间单位下拉框
  handleSpaceUnit = (value) => {
     console.log(`selected ${value}`);
  }

  //间隔时间数值
  handleSpaceValue = (value) => {
     console.log('changed', value);
  }


  render() {
    const everyDayData = [
      { label: '1', value: 'day1' },
      { label: '2', value: 'day2' },
      { label: '3', value: 'day3' },
      { label: '4', value: 'day4' },
      { label: '5', value: 'day5' },
      { label: '6', value: 'day6' },
      { label: '7', value: 'day7' },
      { label: '8', value: 'day8' },
      { label: '9', value: 'day9' },
      { label: '10', value: 'day10' },
      { label: '11', value: 'day11' },
      { label: '12', value: 'day12' },
      { label: '13', value: 'day13' },
      { label: '14', value: 'day14' },
      { label: '15', value: 'day15' },
      { label: '16', value: 'day16' },
      { label: '17', value: 'day17' },
      { label: '18', value: 'day18' },
      { label: '19', value: 'day19' },
      { label: '20', value: 'day20' },
      { label: '21', value: 'day21' },
      { label: '22', value: 'day22' },
      { label: '23', value: 'day23' },
      { label: '24', value: 'day24' },
      { label: '25', value: 'day25' },
      { label: '26', value: 'day26' },
      { label: '27', value: 'day27' },
      { label: '28', value: 'day28' },
      { label: '29', value: 'day29' },
      { label: '30', value: 'day30' },
      { label: '31', value: 'day31' },
      { label: '每月最后一天', value: 'dayLast' },
    ];

    const everyWeekData = [
      { label: '周一', value: 'week1' },
      { label: '周二', value: 'week2' },
      { label: '周三', value: 'week3' },
      { label: '周四', value: 'week4' },
      { label: '周五', value: 'week5' },
      { label: '周六', value: 'week6' },
      { label: '周日', value: 'week7' },
    ];

    return (
      <div>
        <Modal
          title="调度配置"
          maskClosable={false}
          visible={this.props.modalVisible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="关闭"
          width="50%"
        >
          <div style={{ height: 380 }}>
            <div className={css.contentDivLeft}>调度名称：</div><div className={css.contentDivRight}><Input placeholder="请输入调度名称" /></div>
            <div className={css.contentDivLeft}>调度模式：</div><div className={css.contentDivRight}>
              <Select defaultValue="Interval" style={{ width: 120 }} onChange={this.handleSelectChange}>
                <Option value="Interval">定时</Option>
                <Option value="Time">间隔</Option>
              </Select>
            </div>

            {(this.state.changeTimeType == "Interval") &&
              <div>
                <RadioGroup onChange={this.handleRadioChange} style={{ width: '100%' }}>
                  <div className={css.contentDivLeft}><Radio value={1}>每月：</Radio></div><div className={css.contentDivRight}><CheckboxGroup options={everyDayData} onChange={this.handleCheckBoxChange} /></div>
                  <div className={css.contentDivLeft}><Radio value={2}>每周：</Radio></div><div className={css.contentDivRight}><CheckboxGroup options={everyWeekData} onChange={this.handleCheckBoxChange} /></div>
                  <div className={css.contentDivLeft}><Radio value={3}>每天：</Radio></div><div className={css.contentDivRight}></div>
                </RadioGroup>

                <div className={css.contentDivLeft}>执行时间：</div> <div className={css.contentDivRight}>
                  <TimePicker onChange={this.handleTimeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                </div>
              </div>
            }


            {(this.state.changeTimeType == "Time") &&
              <div>
                <div className={css.contentDivLeft}>间隔时间：</div>
                <div className={css.contentDivRight}>
                <InputNumber min={1} max={1000}  style={{ width: 120 }} onChange={this.handleSpaceValue} />
                <Select defaultValue="day" style={{ width: 60,marginLeft:'10px' }} onChange={this.handleSpaceUnit}>
                  <Option value="month">月</Option>
                  <Option value="day">日</Option>
                  <Option value="hour">时</Option>
                  <Option value="minute">分</Option>
                </Select>
                </div>
                <div className={css.contentDivLeft}>执行时间：</div><div className={css.contentDivRight}>
                   <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Time"
                    onChange={this.handleDataTimeChange}
                    onOk={this.handleDataTimenOk}
                  />
                </div>
              </div>
            }

          </div>
        </Modal>
      </div>
    )
  }
}

export default TimeSchedule;
