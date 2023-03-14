import { Input } from "reactstrap";

const timezone = (props: { setTimezone: any }) => {
  return (
    <div>
      <Input
        id="timezone-select"
        name="select"
        type="select"
        onChange={() => props.setTimezone()}
      >
        <option value={""}>Choose your timezone...</option>
        <option value={"-11"}>(GMT-11:00) Midway Island, Samoa (SST)</option>
        <option value={"-10"}>(GMT-10:00) Hawaii (HAST)</option>
        <option value={"-9"}>(GMT-9:00) Alaska (AKST)</option>
        <option value={"-8"}>(GMT-8:00) Pacific Time (PST)</option>
        <option value={"-7"}>(GMT-7:00) Mountain Time (MST)</option>
        <option value={"-6"}>(GMT-6:00) Central Time (CST)</option>
        <option value={"-5"}>(GMT-5:00) Eastern Time (EST)</option>
        <option value={"-5"}>(GMT-5:00) Bogota, Lima, Quito (COT)</option>
        <option value={"-5"}>(GMT-5:00) Pittsburgh (PET)</option>
        <option value={"-4"}>(GMT-4:00) Caracas, La Paz (VET)</option>
        <option value={"-3.5"}>
          (GMT-3:30) Newfoundland and Labrador (HNTN)
        </option>
        <option value={"-3"}>(GMT-3:00) Santiago (CLST)</option>
        <option value={"-3"}>(GMT-3:00) Brasilia (BRT)</option>
        <option value={"-3"}>(GMT-3:00) Montevideo (UYT)</option>
        <option value={"-1"}>(GMT-1:00) Azores (AZOT)</option>
        <option value={"-1"}>(GMT-1:00) Cape Verde Islands (CVT)</option>
        <option value={"0"}>(GMT+0:00) UTC (GMT)</option>
        <option value={"0"}>(GMT+0:00) Edinburgh, London (GMT)</option>
        <option value={"1"}>
          (GMT+1:00) Rome, Brelin, Sarajevo, Skopje, Warsaw, Zagreb (CET)
        </option>
        <option value={"2"}>
          (GMT+2:00) Bucharest, Cairo, Minsk, Athens (EET)
        </option>
        <option value={"2"}>(GMT+2:00) Jerusalem (IST)</option>
        <option value={"3"}>
          (GMT+3:00) Istanbul, Moscow, St. Petersburg, Volgograd (MSK)
        </option>
        <option value={"3.5"}>(GMT+3:30) Tehran (IRST)</option>
        <option value={"4"}>(GMT+4:00) Abu Dhabi, Muscat (GST)</option>
        <option value={"4.5"}>(GMT+4:30) Kabul (AFT)</option>
        <option value={"5"}>
          (GMT+5:00) Islamabad, Karachi, Tashkent (PKT)
        </option>
        <option value={"5.5"}>
          (GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi (IST)
        </option>
        <option value={"5.75"}>(GMT+5:45) Kathmandu</option>
        <option value={"6"}>(GMT+6:00) Astana, Dhaka (BST)</option>
        <option value={"6.5"}>(GMT+6:30) Yangon Rangoon</option>
        <option value={"7"}>(GMT+7:00) Bangkok, Hanoi, Jakarta (ICT)</option>
        <option value={"8"}>
          (GMT+8:00) Beijing, Chongqing, Hong Kong SAR, Urumqi (CST)
        </option>
        <option value={"8"}>(GMT+8:00) Kuala Lumpur, Singapore (MYT)</option>
        <option value={"8"}>(GMT+8:00) Taipei (CST)</option>
        <option value={"9"}>(GMT+9:00) Seoul (KST)</option>
        <option value={"9.5"}>(GMT+9:30) Darwin (ACST)</option>
        <option value={"10"}>(GMT+10:00) Yakutsk (YAKT)</option>
        <option value={"10"}>(GMT+10:00) Vladivostok (VLAT)</option>
        <option value={"10.5"}>(GMT+10:30) Adelaide (ACDT)</option>
        <option value={"11"}>
          (GMT+11:00) Canberra, Melbourne, Sydney (AEDT)
        </option>
        <option value={"12"}>
          (GMT+12:00) Kamchatka, Marshall Islands (PETT)
        </option>
        <option value={"13"}>(GMT+13:00) Fiji Islands (FJT)</option>
        <option value={"13"}>(GMT+13:00) Auckland, Wellington (NZDT)</option>
        <option value={"14"}>(GMT+14:00) Nuku'alofa</option>
      </Input>
    </div>
  );
};

export default timezone;
