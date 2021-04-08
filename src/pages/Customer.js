import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import data from "../data";
console.log(data);
const useStyle = makeStyles({
  personContainer: {
    border: "1px solid",
    padding: "1rem",
    marginBottom: "1rem",
  },
  container: {
    marginTop: "2rem",
  },
});

const Customer = () => {
  const classes = useStyle();
  return (
    <Box>
      <Typography variant="h4">
        Customer can browse all the riders near to their location and see their
        shops and restaurants to which riders are ok to go
      </Typography>
      <Grid container spacing={2} className={classes.container}>
        {data.map((item, i) => (
          <Grid item sm={12} md={6} lg={4} key={i}>
            <Box component="div" className={classes.personContainer} key={i}>
              <Typography variant="h4">{item.name}</Typography>
              <Typography variant="h4">{item.name}</Typography>
              <Typography>Shops available for this person</Typography>
              {item.availableShops.map((shop, i) => (
                <Typography key={i}>{shop.name}</Typography>
              ))}
              <Typography variant="h6" color="secondary">
                {item.phoneNumber}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Customer;
