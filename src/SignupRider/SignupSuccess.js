import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

const SignupSuccess = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        style={{ marginTop: "8rem" }}
        gutterBottom
      >
        Your id is <strong>{id}</strong>
      </Typography>
      <hr />
      <Typography align="center" variant="h4">
        Take a screenshot or remember your id!
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          history.push("/");
        }}
      >
        Return to home
      </Button>
    </Box>
  );
};

export default SignupSuccess;
