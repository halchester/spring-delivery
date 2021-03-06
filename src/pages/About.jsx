import { Box, Typography } from '@material-ui/core';
import React from 'react';

const About = () => (
  <Box component="div">
    <Typography variant="h4" display="inline" gutterBottom>
      About
      {' '}
      <Typography display="inline" variant="h4" color="secondary">
        <strong>Spring Snacks</strong>
      </Typography>
    </Typography>
    <Typography variant="body2">Burmese below</Typography>
    <hr />
    <Typography>
      Spring Snacks is an app for the food delivery riders who are having
      difficulities in this very hard time. I see a lot of deliveries posting on
      facebook telling people they will only be able to deliver from some
      certain restaurants and are having money difficulities. By using this app,
      those deliveries could be grouped in one app, and provide necessary
      information about his or her ride. Also customers can call them and tell
      them what to buy
      {' '}
      <strong>(only from their available shops)</strong>
      {' '}
      and of
      course customers can tip as much as customers want as delivery fees :D
      {' '}
      {' '}
      <a href="https://www.usatoday.com/in-depth/graphics/2021/03/20/myanmar-military-coup-protests-violence-deaths-burma-videos/6868486002/">
        <strong style={{ textDecoration: 'underline', color: 'black' }}>Learn more about what&apos;s happening in myanmar</strong>
      </a>
    </Typography>
    <hr />
    <Typography>
      Spring Snack ဆိုတာကတော့ ဒီ အာဏာသိမ်းထားတဲ့အချိန်မှာ
      အပြင်စာစားချင်သူတွေအတွက်ကော ငွေအခက်အခဲရှိတဲ့သူအတွက်ကော ၂
      ဖက်လုံးအဆင်ပြေအောင်လုပ်ပေးထားတဲ့ app ၁ ခုပါ. အခု အချိန်မှာ foodpanda, grab
      စတဲ့ delivery သမားတွေက ငွေကြေးအခက်အခဲများစွာရှိတာကိုတွေ့ရပါတယ်
      အဲ့တာကြောင့် ဒီ web app လေးကိုရေးခဲ့တာပါ. Cellular data လည်းမရတဲ့အတွက်
      location tracking ကတော့ ရမှာမဟုတ်ပါဘူး ကျနော်တို့ customer ဆိုရင် customer
      ကိုရွေးပြီး ကိုနေတဲ့မြို့နယ်ကိုရှာ ရှာပြီးရင်ရှိတဲ့ delivery ကိုမှ
      {' '}
      <strong>သူတို့ ရတဲ့ဆိုင်လေးတွေကပဲမှာဖို့ </strong>
      admin အကြံပေးချင်ပါတယ်ခင်ဗျ. Delivery fees ကိုတော့ စေတနာရှိသလောက်ပေးပေးပါ
      မပေးပဲတော့ မနေပါနဲ့ခင်ဗျာ
    </Typography>
    <hr />
    <Typography variant="h5" align="center">
      <strong>Love my work?</strong>
      {' '}
    </Typography>
    <a
      href="https://www.buymeacoffee.com/halchester"
      style={{ textDecoration: 'none' }}
    >
      <Typography variant="h6" color="secondary" align="center">
        Buy me a coffee ☕️
      </Typography>
    </a>
  </Box>
);

export default About;
