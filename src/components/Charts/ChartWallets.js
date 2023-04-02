import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { WEEK_DAYS, MONTHS } from "../../constants";

const getFormattedData = (time, period) => {
    let date = new Date(time);
    let formattedDate = 0;
    if (period === "month") {
        formattedDate = date
            .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
            })
            .replace(/ /g, " ");
    } else if (period === "day") {
        formattedDate = date.getHours();
    }
    return formattedDate;
};

const getLast24Hours = () => {
    let j = 1;
    let t = Date.now() - 24 * 3600 * 1000;
    const last24Hours = [];
    while (j < 25) {
        last24Hours.push(getFormattedData(t + j * 3600 * 1000, "day"));
        j += 1;
    }
    console.log(last24Hours);
    return last24Hours;
};

const getLast30Days = () => {
    let j = 1;
    let t = Date.now() - 30 * 86400 * 1000;
    const last30Days = [];
    while (j < 31) {
        last30Days.push(getFormattedData(t + j * 86400 * 1000, "month"));
        j += 1;
    }
    return last30Days;
};

function generateChartConfig(wallets, checkedState, period) {
    let Series = [];
    let yAxis = [];
    let xAxis = [];
    const colors = [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
    ];
    for (let i in checkedState) {
        if (checkedState[i]) {
            //select the proper data
            if (period === "day") {
                yAxis = wallets[i].lastUpdatedDayBalance;
            } else if (period === "week") {
                yAxis = wallets[i].lastUpdatedWeekBalance;
            } else if (period === "month") {
                yAxis = wallets[i].lastUpdatedMonthBalance;
            } else if (period === "year") {
                yAxis = wallets[i].lastUpdatedYearBalance;
            }
            //create config data series
            Series.push({
                data: yAxis,
                type: "line",
                smooth: true,
                color: colors[i],
            });
        }
    }

    if (period === "day") {
        xAxis = getLast24Hours();
    } else if (period === "week") {
        xAxis = WEEK_DAYS;
    } else if (period === "month") {
        xAxis = getLast30Days();
    } else if (period === "year") {
        xAxis = MONTHS;
    }

    let chartConfig = {
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
            type: "category",
            data: xAxis,
        },
        yAxis: {
            type: "value",
        },
        tooltip: {
            trigger: "axis",
        },
        //animation:false,
        series: Series,
    };
    return chartConfig;
}

function ChartWallets(props) {
    const classNames = props.className;
    const wallets = props.data;
    const checkedState = props.stateArray;
    const [periodBalance, setBalancePeriod] = useState("week");

    let chartConfig = generateChartConfig(wallets, checkedState, periodBalance);

    const handleBalancePeriod = (event) => {
        setBalancePeriod(event.target.value);
        chartConfig = generateChartConfig(
            wallets,
            checkedState,
            event.target.value
        );
    };

    return (
        <div className={`wallet-analytics  ${classNames}`}>
            <div className="m-0 p-4 shadow rounded h-100">
                <h5>Wallet-by-Wallet Analytics</h5>
                <hr />
                <div className="row m-0 p-0">
                    <div className="col-md-3 p-0">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="balanceRadio1"
                                id="balanceRadio1"
                                value="day"
                                checked={periodBalance === "day"}
                                onChange={handleBalancePeriod}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="balanceRadio1"
                            >
                                Day
                            </label>
                        </div>
                    </div>
                    <div className="col-md-3 p-0">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="balanceRadio1"
                                id="balanceRadio2"
                                value="week"
                                checked={periodBalance === "week"}
                                onChange={handleBalancePeriod}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="balanceRadio2"
                            >
                                Week
                            </label>
                        </div>
                    </div>
                    <div className="col-md-3 p-0">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="balanceRadio1"
                                id="balanceRadio3"
                                value="month"
                                checked={periodBalance === "month"}
                                onChange={handleBalancePeriod}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="balanceRadio3"
                            >
                                Month
                            </label>
                        </div>
                    </div>
                    <div className="col-md-3 p-0">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="balanceRadio1"
                                id="balanceRadio4"
                                value="year"
                                checked={periodBalance === "year"}
                                onChange={handleBalancePeriod}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="balanceRadio4"
                            >
                                Year
                            </label>
                        </div>
                    </div>
                </div>
                <ReactECharts
                    option={chartConfig}
                    echarts={echarts}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    style={{ height: "282px", marginTop: "23px" }}
                    opts={{}}
                />
            </div>
        </div>
    );
}

export default ChartWallets;
