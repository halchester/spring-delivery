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
        သင့် id : <strong>{id}</strong>
      </Typography>
      <hr />
      <Typography align="center" variant="body2">
        ဒီ ID ကိုမှတ်ထားပေးပါ ပြန်ပြင်တာတို့ဘာတို့ဆိုရင်လိုအပ်ပါတယ်
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          history.push(`/info/${id}`);
        }}
      >
        profile ကြည့်ရန်
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          history.push("/");
        }}
      >
        ပြန်ထွက်
      </Button>
    </Box>
  );
};

export default SignupSuccess;
