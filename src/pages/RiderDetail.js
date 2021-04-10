import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { getOneRider } from "../api/query";
import Spinner from "../utils/Spinner/Spinner";

const useStyle = makeStyles({
  container: {
    marginTop: "2rem",
  },
  cardContainer: {
    padding: "0.5rem",
  },
});

const RiderDetail = (props) => {
  const id = props.match.params.id;
  const classes = useStyle();
  const { status, data } = useQuery(id, getOneRider);

  return status === "success" ? (
    <Box className={classes.container}>
      <Typography variant="h4" gutterBottom>
        {data.name}
      </Typography>
      <Typography variant="h5">
        <strong>{data.township}</strong>
      </Typography>
      <Typography variant="h5" gutterBottom color="secondary">
        <strong>{data.phoneNumber}</strong>
      </Typography>
      <hr />
      <Typography variant="body2" align="center" gutterBottom>
        <strong>Available for delivery &nbsp; &#8595; </strong>
      </Typography>
      <Grid container spacing={3}>
        {data.availableShops.map((shop, i) => (
          <Grid item key={i} xs={12} sm={6} md={6}>
            <Card className={classes.cardContainer}>
              <Typography variant="h6" gutterBottom>
                <strong>{shop.name}</strong>
              </Typography>
              <Typography variant="body1">{shop.detail}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <Spinner />
  );
};

export default RiderDetail;
