import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles({
  container: {
    marginTop: "0.5rem",
  },
});

const SignupRider = () => {
  const classes = useStyle();
  return (
    <Box component="div" className={classes.container}>
      <Typography>Signup rider</Typography>
    </Box>
  );
};

export default SignupRider;

// TODOS:
// []: formik form with kind of data fields in data.js
// []: photo or without photo? think with photo is better for person validation
// []: add new restaurants with idk what to call that( click to add new field)
