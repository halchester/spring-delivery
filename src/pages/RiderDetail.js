import {
  Box,
  Card,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { getOneRider } from "../api/query";
import Spinner from "../utils/Spinner/Spinner";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: "2rem",
  },
  cardContainer: {
    padding: "0.5rem",
  },
  chip: {
    margin: theme.spacing(0.3),
  },
}));

const RiderDetail = (props) => {
  const id = props.match.params.id;
  const classes = useStyle();
  const { status, data } = useQuery(id, getOneRider);

  return status === "success" ? (
    <Box className={classes.container}>
      <Typography variant="h4">{data.name}</Typography>
      <Typography variant="h5" gutterBottom color="secondary">
        <strong>{data.phoneNumber}</strong>
      </Typography>
      <Typography variant="h5">
        <strong>
          {data.township.map((item) => (
            <Chip
              label={item}
              className={classes.chip}
              color="secondary"
              variant="outlined"
            />
          ))}
        </strong>
      </Typography>

      <hr />
      <Typography variant="body2" align="center" gutterBottom>
        <strong>Available for delivery &nbsp; &#8595; </strong>
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {data.availableShops.map((shop, i) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
              <Card className={classes.cardContainer}>
                <Typography variant="h6" gutterBottom>
                  <strong>{shop.name}</strong>
                </Typography>
                <Typography>{shop.detail}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  ) : (
    <Spinner />
  );
};

export default RiderDetail;
