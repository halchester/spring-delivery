import { Chip, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.3),
  },
}));

const Township = ({ township }) => {
  const classes = useStyle();

  return (
    <React.Fragment>
      {township.length > 2 ? (
        <>
          <Chip
            label={township[0]}
            className={classes.chip}
            color="secondary"
          />
          <Chip
            label={township[1]}
            className={classes.chip}
            color="secondary"
          />
          <Chip
            label={township[2]}
            className={classes.chip}
            color="secondary"
          />
          {township.length - 3 === 0 ? null : (
            <Chip
              label={township.length - 3 + " more"}
              className={classes.chip}
              variant="outlined"
              color="secondary"
            />
          )}
        </>
      ) : (
        township.map((township, i) => (
          <Chip
            key={i}
            label={township}
            className={classes.chip}
            color="secondary"
          />
        ))
      )}
    </React.Fragment>
  );
};

export default Township;
