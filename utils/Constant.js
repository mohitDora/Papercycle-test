import VerifiedIcon from '@mui/icons-material/Verified';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ScaleIcon from '@mui/icons-material/Scale';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const style={
    fontSize:"3rem",
    color:"#62ab45"
}
const style2={
    fontSize:"3rem",
    // color:"#1e1e1e"
    color:"white"
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
export const PLACE_ID = process.env.NEXT_PUBLIC_PLACE_ID;

export const NAV_ITEMS=[
    {text:"Home",link:"/letsrecycle",isLoggedIn:false},
    {text: "Recycle",link:"/",isLoggedIn:true},
    { text: "RateList", link: "/ratelist",isLoggedIn:"both" },
    { text: "About", link: "/about",isLoggedIn:"both" },
  ]

export const PROFILE_ITEMS = [
  {
    text: "My Profile",
    link: "/profile",
  },
  {
    text: "Orders",
    link: "/orders/upcoming",
  },
  {
    text: "Help and Support",
    link: "/helpSupport",
  },
  {
    text: "Logout",
    link: "/letsrecycle",
  },
];

export const Address=`OU-640, 6th Floor, Nexus Esplanade,
Bomikhal Bhubaneswar, PS- Mancheswar,
Khordha, Odisha 751010`

export const BUTTON_PARAMS = {
  home: false,
  business: false,
  other: false,
  others: false,
};


export const SOCIAL_MEDIA=[
  {
    name:"Instagram",
    logo:<InstagramIcon sx={style2}></InstagramIcon>,
    link:"https://www.instagram.com/papercycle.in"
  },
  {
    name:"Facebook",
    logo:<FacebookIcon sx={style2}></FacebookIcon>,
    link:"https://www.facebook.com/profile.php?id=100064316522831"
  },
  {
    name:"Linkedin",
    logo:<LinkedInIcon sx={style2}></LinkedInIcon>,
    link:"https://www.linkedin.com/company/papercycle/"
  },
]

// export const INSTAGRAM_URL = "https://www.instagram.com/papercycle.in";
// export const FACEBOOK_URL =
//   "https://www.facebook.com/profile.php?id=100064316522831";
// export const LINKEDIN_URL = "https://www.linkedin.com/company/papercycle/";

// export const SOCIAL_MEDIA_LINKS = [
//   {
//     url: INSTAGRAM_URL,
//     icon: "https://storage.googleapis.com/papercycle_prod/InstaVector.svg",
//     alt: "Instagram",
//   },
//   {
//     url: FACEBOOK_URL,
//     icon: "https://storage.googleapis.com/papercycle_prod/FacebbokVector.svg",
//     alt: "Facebook",
//   },
//   {
//     url: LINKEDIN_URL,
//     icon: "https://storage.googleapis.com/papercycle_prod/LinkedInVector.svg",
//     alt: "LinkedIn",
//   },
// ];

export const STATISTICS = [
  {
    image: "https://storage.googleapis.com/papercycle_prod/Group%20163.svg",
    text1: "Total weight recycled in Kg.",
    text2: "265.50",
  },
  {
    image: "https://storage.googleapis.com/papercycle_prod/Group%20164.svg",
    text1: "Total trees saved.",
    text2: "20",
  },
  {
    image: "https://storage.googleapis.com/papercycle_prod/Group%20165.svg",
    text1: "Total water saved in litres.",
    text2: "202",
  },
];

export const PARAGRAPHS = [
  "Welcome to Odisha's leading recycling company! We are at the forefront of sustainable development, leading the charge in recycling dry waste of all kinds. Our journey began with a vision sparked by two young professionals who, after experiencing the corporate world, felt compelled to make a tangible difference in environmental conservation.",
  "Driven by our passion for sustainability, we have established a seamless process for individuals and businesses to contribute to a greener future. Through our user-friendly mobile app and website, customers can easily create recycle requests from the comfort of their homes or offices. Our dedicated pickup executives ensure that the recycling process is effortless for our clients by collecting the dry waste directly from their doorstep.",
  "One of our key innovations is our instant payment system, ensuring that customers receive compensation promptly for their contributions to recycling efforts. By incentivizing recycling in this way, we not only promote environmental responsibility but also foster a culture of sustainable practices within our community.",
  "Furthermore, we pride ourselves on adhering to properly licensed measurements, ensuring transparency and legality in all our operations. By upholding the highest standards of compliance, we guarantee that our recycling processes are not only environmentally friendly but also ethically sound.",
  "Behind every successful operation is our trained staff, who are dedicated to providing exceptional service and expertise in recycling practices. Their commitment ensures that our recycling efforts are efficient, effective, and conducted with the utmost care for the environment.",
  "At our core, we are committed to making a meaningful impact on the environment while empowering individuals and businesses to be agents of change. Join us in our mission to build a cleaner, greener future for Odisha and beyond. Together, let's make recycling a way of life.",
];

export const CONTACT_DETAILS = [
  {value: "+91-9692386986" },
  {value: "admin@papercycle.in" },
];

export const COMPONENTS_DATA1 = [
  {
    title: "Schedule",
    image:<ScheduleIcon sx={style}></ScheduleIcon>,
    description:
      "Book a hassle-free dry waste pickup at a time that suits you best.",
  },
  {
    title: "Doorstep Pickup",
    image:<DeliveryDiningIcon sx={style}></DeliveryDiningIcon>,
    description:
      "Our pickup executives will collect your dry waste directly from your doorstep.",
  },
  {
    title: "Instant Payment",
    image:<CreditScoreIcon sx={style}></CreditScoreIcon>,
    description:
      "Receive instant payments for recycled waste via UPI or convenient bank transfers.",
  },
];

export const COMPONENTS_DATA2 = [
  {
    title:"Trust",
    image:<VerifiedIcon sx={style}></VerifiedIcon>,
    description:
      "Trained and verified pickup staff who are prepared to collect dray waste from your doorstep with professionalism and reliability.",
  },

  {
    title:"Best Rates",
    image:<CurrencyRupeeIcon sx={style}></CurrencyRupeeIcon>,
    description:
      "We provide the best rates in the market, inclusive of transportation and segregation, for your scrap.",
  },
  {
    title:"Eco-Friendly",
    image:<ScaleIcon sx={style}></ScaleIcon>,
    description:
      "We use licensed digital weighing machines to ensure fair and accurate measurements.",
  },
  {
    title:"Perfect Measurement",
    image:<RecyclingIcon sx={style}></RecyclingIcon>,
    description:
      "As a recycling business, we uphold our commitment to environmental stewardship by utilizing electric vehicles for all scrap pickups. This not only reduces our carbon footprint but also reflects our dedication to eco-friendly practices.",
  },
];

export const CATEGORIES = [
  {
    name: "Paper",
    image:
      "https://storage.googleapis.com/papercycle_prod/receipt_long_FILL0_wght300_GRAD0_opsz24%201.svg",
    imageClass: "ml-12 ",
  },
  {
    name: "Plastic",
    image:
      "https://storage.googleapis.com/papercycle_prod/water_bottle_FILL0_wght300_GRAD0_opsz24%201.svg",
    imageClass: "ml-12",
  },
  {
    name: "E-Waste",
    image:
      "https://storage.googleapis.com/papercycle_prod/memory_FILL0_wght300_GRAD0_opsz24%201.svg",
    imageClass: "ml-12",
  },
  {
    name: "Other",
    image:
      "https://storage.googleapis.com/papercycle_prod/token_FILL0_wght300_GRAD0_opsz24%201.svg",
    imageClass: "ml-12",
  },
];
export const PAPER_PLASTIC_IMAGES = Array.from({ length: 6 }, (_, index) => ({
  src: "https://storage.googleapis.com/papercycle_prod/Group%20155.svg",
  alt: "12/kg",
  height: 100,
  width: 200,
}));
export const  RATELIST_OPTIONS = [
    { label: 'Bhubaneswar', value: 'Bhubaneswar', disabled: false },
    { label: 'Cuttack', value: 'Cuttack', disabled: true },
    { label: 'Berhampur', value: 'Berhampur', disabled: true },
  ];
export const MESSAGE=`Schedule your pickup effortlessly with our service. Choose a
            convenient time, and we'll handle the rest!`