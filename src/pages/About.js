import { Box, Typography } from "@material-ui/core";
import React from "react";

const About = () => {
  return (
    <Box component="div">
      <Typography variant="h4" display="inline" gutterBottom>
        About{" "}
        <Typography display="inline" variant="h4" color="secondary">
          <strong>Spring Snacks</strong>
        </Typography>
      </Typography>
      <Typography>Burmese below</Typography>
      <hr />
      <Typography>
        Spring Snacks is an app for the food delivery riders who are having
        difficulities in this very hard time. I see a lot of deliveries posting
        on facebook telling people they will only be able to deliver from some
        certain restaurants and are having money difficulities. By using this
        app, those deliveries could be grouped in one app, and provide necessary
        information about his or her ride. Also customers can call them and tell
        them what to buy <strong>(only from their available shops)</strong> and
        of course they can tip as much as they want as delivery fees :D
      </Typography>
      <hr />
      <Typography>
        Spring Snack ဆိုတာကတော့ ဒီ အာဏာသိမ်းထားတဲ့အချိန်မှာ
        အပြင်စာစားချင်သူတွေအတွက်ကော ငွေအခက်အခဲရှိတဲ့သူအတွက်ကော ၂
        ဖက်လုံးအဆင်ပြေအောင်လုပ်ပေးထားတဲ့ app ၁ ခုပါ. အခု အချိန်မှာ foodpanda,
        grab စတဲ့ delivery သမားတွေက ငွေကြေးအခက်အခဲများစွာရှိတာကိုတွေ့ရပါတယ်
        အဲ့တာကြောင့် ဒီ web app လေးကိုရေးခဲ့တာပါ. Cellular data လည်းမရတဲ့အတွက်
        location tracking ကတော့ ရမှာမဟုတ်ပါဘူး ကျနော်တို့ customer ဆိုရင်
        customer ကိုရွေးပြီး ကိုနေတဲ့မြို့နယ်ကိုရှာ ရှာပြီးရင်ရှိတဲ့ delivery
        ကိုမှ <strong>သူတို့ ရတဲ့ဆိုင်လေးတွေကပဲမှာဖို့ </strong>admin
        အကြံပေးချင်ပါတယ်ခင်ဗျ. Delivery fees ကိုတော့ စေတနာရှိသလောက်ပေးပေးပါ
        မပေးပဲတော့ မနေပါနဲ့ခင်ဗျာ
      </Typography>
    </Box>
  );
};

export default About;
