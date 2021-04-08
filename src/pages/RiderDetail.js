import { Typography } from "@material-ui/core";
import { useEffect } from "react";

const RiderDetail = (props) => {
  const id = props.match.params.id;
  console.log(id);
  useEffect(() => {
    // fetch user data from API get endpoint
  });

  return <Typography>Rider detail</Typography>;
};

export default RiderDetail;
