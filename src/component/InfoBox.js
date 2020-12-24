import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../InfoBox.css";
import { prettyPrintStat } from "../util";

function InfoBox({
  title,
  cases,
  totals,
  active,
  isRecovered,
  isRed,
  ...props
}) {
  console.log(cases);
  return (
    <div
      className={`infoBox  ${active && "activeBox"} ${
        isRed && active && "redActive"
      }`}
    >
      <Card onClick={props.onClick}>
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          <h3 className={`infoBox__cases ${isRecovered && "greenText"}`}>
            {prettyPrintStat(cases)}{" "}
            <span className="today-text-color">today</span>
          </h3>
          <Typography color="textSecondary">
            {prettyPrintStat(totals)} Totals
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
