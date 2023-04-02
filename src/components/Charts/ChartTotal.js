import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

function generateChartConfig(wallets, checkedState, period) {
    let Series = [];
    let yAxis = 0;
    let xAxis = [];
    for (let i in checkedState) {
        if (checkedState[i]) {
            //select the proper data
            if (period === "day") {
                yAxis =
                    wallets[i].lastUpdatedDayBalance[23] -
                    wallets[i].lastUpdatedDayBalance[0];
            } else if (period === "week") {
                yAxis =
                    wallets[i].lastUpdatedWeekBalance[6] -
                    wallets[i].lastUpdatedWeekBalance[0];
            } else if (period === "month") {
                yAxis =
                    wallets[i].lastUpdatedMonthBalance[29] -
                    wallets[i].lastUpdatedMonthBalance[0];
            } else if (period === "year") {
                yAxis =
                    wallets[i].lastUpdatedYearBalance[59] -
                    wallets[i].lastUpdatedYearBalance[0];
            }
            //create config data series
            Series.push(yAxis);
            xAxis.push(wallets[i].address.toString().slice(0, 4) + "...");
        }
    }

    let chartConfig = {
        xAxis: {
            type: "category",
            data: xAxis,
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: Series,
                type: "bar",
            },
        ],
    };
    return chartConfig;
}

function ChartWallets(props) {
    const classNames = props.className;
    const wallets = props.data;
    const checkedState = props.stateArray;
    const [periodSaldo, setSaldoPeriod] = useState("week");

    let chartConfig = generateChartConfig(wallets, checkedState, periodSaldo);

    const handleSaldoPeriod = (event) => {
        setSaldoPeriod(event.target.value);
        chartConfig = generateChartConfig(
            wallets,
            checkedState,
            event.target.value
        );
    };

    return (
        <div className={`total-saldo ${classNames}`}>
            <div className="m-0 p-4 shadow rounded">
                <h5>Total saldo</h5>
                <hr />
                <div className="row m-0 p-0">
                    <div className="col-md-3 p-0">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="saldoRadio"
                                id="saldoRadio1"
                                value="day"
                                checked={periodSaldo === "day"}
                                onChange={handleSaldoPeriod}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="saldoRadio1"
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
                                name="saldoRadio"
                                id="saldoRadio2"
                                value="week"
                                checked={periodSaldo === "week"}
                                onChange={handleSaldoPeriod}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="saldoRadio2"
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
                                name="saldoRadio"
                                id="saldoRadio3"
                                value="month"
                                checked={periodSaldo === "month"}
                                onChange={handleSaldoPeriod}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="saldoRadio3"
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
                                name="saldoRadio"
                                id="saldoRadio4"
                                value="year"
                                checked={periodSaldo === "year"}
                                onChange={handleSaldoPeriod}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="saldoRadio4"
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
                    style={{ height: "362px", marginTop: "-12px" }}
                    opts={{}}
                />
            </div>
        </div>
    );
}

export default ChartWallets;
