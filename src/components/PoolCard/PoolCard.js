import React from "react";
import { Row, Col } from "react-bootstrap";

const PoolCard = ({ ...props }) => {
    return (
        <div>
            <Row>
                <Col className="col-5">Your stake:</Col>
                <Col className="col-4">
                    <code className="fs-6">
                        {props.pools[props.contractName]?.totalStaked ?? "--"}
                    </code>
                </Col>
                <Col className="col-3">sNEAR</Col>
            </Row>
            <Row>
                <Col className="col-5">Your deposit:</Col>
                <Col className="col-4">
                    <code className="fs-6">
                        {props.pools[props.contractName]?.totalDeposited ??
                            "--"}
                    </code>
                </Col>
                <Col className="col-3">NEAR</Col>
            </Row>
            <Row>
                <Col className="col-5">Total staked:</Col>
                <Col className="col-4">
                    <code className="fs-6">
                        {props.pools[props.contractName]?.totalAPY ?? "--"}
                    </code>
                </Col>
                <Col className="col-3">sNEAR</Col>
            </Row>
        </div>
    );
};
{
    /*        <Col classNameName={`card${props.maintance ? ' card-maintained' : ''}`}>
            <div classNameName="card-body">
                <p classNameName="card-body-title">{props.title}</p>
                <div classNameName="flex card-body-paragraph">
                    <p>your stake</p>
                    <p>{props.pools[props.contractName]?.totalStaked ?? '--'} sNEAR</p>
                </div>
                <div classNameName="flex card-body-paragraph">
                    <p>your deposit</p>
                    <p>{props.pools[props.contractName]?.totalDeposited ?? '--'} NEAR</p>
                </div>
                <div classNameName="flex card-body-paragraph">
                    <p>total staked</p>
                    <p>{props.pools[props.contractName]?.totalAPY ?? '--'} sNEAR</p>
                </div>
            </div>
        </Col>*/
}

export default PoolCard;
