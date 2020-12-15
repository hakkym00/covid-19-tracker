import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, totals }) {
  return (
    <div className="infoBox">
      <Card>
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          <h3 className="infoBox__cases"> {cases} </h3>
          <Typography color="textSecondary">{totals} Totals</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
