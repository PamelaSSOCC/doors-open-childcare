/* ============================================================
   PARTICIPATING CENTRES  —  one consistent record per program
   ------------------------------------------------------------
   Every listing uses the SAME fields, in the same order. The
   Locations page groups these into sections (by care type,
   approach, or event day) and lists them alphabetically.

   FIELDS (leave any as "" to hide that row on the card):

     {
       name:       "Program name",                 // required
       photo:      "willow.jpg",                    // image in /photos; "" = coloured placeholder
       days:       "Both days",                     // "Both days" | "Thu Oct 1 (eve)" | "Sat Oct 3 (AM)"
       care:       "Infant/Toddler, 30 months – school age",  // one or more of the 4 categories, comma-separated:
                                                    //   "Preschool" · "Infant/Toddler" · "30 months – school age" · "School-aged care"
       philosophy: "Reggio-inspired",               // Montessori | Play-based | Blended (…) | Academic | Reggio-inspired …
       address:    "123 Example Rd, Richmond, BC",
       hours:      "8:00 am – 4:30 pm, Mon–Fri",
       languages:  "English, Mandarin",
       funding:    "ACCB, CCFRI, CCOF, Wage Enhancement",   // subsidies the program accepts
       fees:       "",                              // parent fees / tuition (NOT collected on the intake form — fill in as you get them)
       services:   "Meals, extended hours",         // additional services offered
       register:   "Email us or join the waitlist online",
       phone:      "604-555-0100",
       website:    "https://example.com",           // "" = no link
       instagram:  "handle",                         // optional, no @
       facebook:   "https://facebook.com/…",         // optional, full URL
       youtube:    "handle"                           // optional, no @
     }

   PHOTOS: drop each image in a "photos" folder and put the filename in "photo".
   FEES: the intake form did not ask for monthly fees, so most are blank — add them as you collect them.
   ============================================================ */

const CENTRES = [
  {
    name: "SSOCC Heron \u2013 Toddlers and Junior Kindergarten", photo: "", days: "Both days",
    care: "Infant/Toddler, 30 months \u2013 school age", philosophy: "Reggio-inspired",
    address: "12091 Cambie Road, Richmond, BC (Richmond Adult Education Centre, beside Mitchell Elementary)",
    hours: "8:00 am \u2013 4:30 pm (extended to 5:30 pm)",
    languages: "English, Korean, Ukrainian, Mandarin, Tagalog",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Meals; extended hours (4:30\u20135:30 pm)",
    register: "Email registration@ssocc.ca or join the waitlist online",
    phone: "604-377-8385", website: "https://www.ssocc.ca",
    instagram: "ssoccchildcare", facebook: "https://www.facebook.com/Stevestonsocietyofchildrenscentres/", youtube: "StevestonSocietyofCC"
  },
  {
    name: "Crystal Star Daycare", photo: "", days: "Thu Oct 1 (eve)",
    care: "Infant/Toddler", philosophy: "Play-based",
    address: "10631 Gilmore Crescent, Richmond, BC",
    hours: "7:30 am \u2013 4:30 pm, Mon\u2013Fri",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "",
    register: "Email crystalstardaycare@shaw.ca or call 604-276-9816",
    phone: "604-276-9816", website: "",
    facebook: "https://www.facebook.com/p/Crystal-Star-Daycare-an-InfantToddler-Child-Care-100054590433583/"
  },
  {
    name: "Kiddo House Montessori", photo: "", days: "Sat Oct 3 (AM)",
    care: "30 months \u2013 school age, School-aged care", philosophy: "Montessori",
    address: "6640 Blundell Road, Richmond, BC",
    hours: "Full day", languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Meals (two snacks + hot lunch); Mandarin club",
    register: "Register online or email kiddohousechildcare@gmail.com",
    phone: "778-886-0626", website: "https://kiddohousechildcare.ca"
  },
  {
    name: "Hello Kids Learn – Afterschool Care and Daycamps", photo: "", days: "Both days",
    care: "School-aged care", philosophy: "Academic / traditional",
    address: "Unit 201, 6640 Blundell Rd, Richmond, BC V7C 1H8",
    hours: "8:30 am \u2013 6:30 pm; after-school 2:45 \u2013 7:00 pm",
    languages: "English, Mandarin, Cantonese", funding: "ACCB, Wage Enhancement",
    fees: "Late pickup after 7 pm: $1/min",
    services: "Transportation; enhancement programs (yoga, language); summer field trips",
    register: "Email celaafterschool@gmail.com",
    phone: "778-951-3438", website: "https://www.hellokidslearn.com"
  },
  {
    name: "Thompson Early Learning \u2013 Rompers Preschool", photo: "", days: "Both days",
    care: "Preschool", philosophy: "Blended (play-based, Reggio-inspired)",
    address: "Thompson Community Centre, 5151 Granville Ave, Richmond, BC V7C 1E6",
    hours: "9:00 am \u2013 1:00 pm", languages: "English, Japanese, Tagalog, Greek",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "A 2-hour after-preschool program is in the works (details TBA)",
    register: "Contact Anna Thymis, Preschool Coordinator, by email, phone, or the website form",
    phone: "604-238-8497", website: "https://www.thompsonearlylearning.com"
  },
  {
    name: "Little Koala Montessori Academy (Clarke Place)", photo: "", days: "Both days",
    care: "Infant/Toddler, 30 months \u2013 school age", philosophy: "Montessori (AMI/AMS)",
    address: "110\u201312855 Clarke Place, Richmond, BC",
    hours: "8:00 am \u2013 5:30 pm, Mon\u2013Fri", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "$75 registration + one month's deposit",
    services: "",
    register: "Contact Little Koala to register or join the waitlist",
    phone: "778-999-9229", website: "https://www.littlekoalamontessori.com"
  },
  {
    name: "Little Koala Montessori Academy (Blundell Road)", photo: "", days: "Both days",
    care: "30 months \u2013 school age", philosophy: "Montessori (AMS)",
    address: "10011 Blundell Road, Richmond, BC",
    hours: "8:00 am \u2013 5:30 pm, Mon\u2013Fri", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "$75 registration + one month's deposit",
    services: "Optional hot lunch ($7\u20139/meal)",
    register: "Contact Little Koala to register or join the waitlist",
    phone: "778-999-9229", website: "https://www.littlekoalamontessori.com"
  },
  {
    name: "Blue Whale Children's Learning Centre", photo: "", days: "Sat Oct 3 (AM)",
    care: "30 months \u2013 school age", philosophy: "Blended (Montessori, purposeful play)",
    address: "8060 No. 1 Road, Richmond, BC",
    hours: "8:00 am \u2013 5:00 pm", languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Enhancement programs (yoga, language, dance, art)",
    register: "Book a tour by phone or through the website, then register",
    phone: "604-754-7666", website: "https://www.bluewhaleedu.com"
  },
  {
    name: "Cedar Studio Outdoor Learning", photo: "", days: "Both days",
    care: "30 months \u2013 school age", philosophy: "Blended (Reggio-inspired, outdoor / land-based)",
    address: "Units 135 & 140, 6231 London Road, Richmond, BC",
    hours: "8:00 am \u2013 5:00 pm", languages: "English, Mandarin, Cantonese, Hindi, Urdu",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Meals (third-party); enhancement programs (yoga, language)",
    register: "Register through the Brightwheel link on the website",
    phone: "604-783-1014", website: "https://www.cedarstudio.co"
  },
  {
    name: "Kid Nest Infant and Toddler Daycare", photo: "", days: "Sat Oct 3 (AM)",
    care: "Infant/Toddler", philosophy: "Blended (Montessori, play-based)",
    address: "8531 Leslie Road, Richmond, BC V6X 1E6",
    hours: "8:30 am \u2013 6:00 pm, Mon\u2013Fri", languages: "English, Chinese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Meals; enhancement programs (yoga, Mandarin); daily themes, phonics, science, cooking, arts",
    register: "Register online or email wenxuan20120329@gmail.com",
    phone: "778-995-0583", website: "https://www.kidnestdaycare.com"
  },
  {
    name: "Little Earthlings Childcare", photo: "", days: "Both days",
    care: "30 months \u2013 school age", philosophy: "Blended (Reggio-inspired, play-based)",
    address: "3871 Moncton St, Richmond, BC V7E 3A7 (Steveston Village)",
    hours: "7:30 am \u2013 5:30 pm, Mon\u2013Fri", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Daily outdoor & nature experiences; seasonal activities (included)",
    register: "Contact via the website or email; book a tour, then register",
    phone: "604-370-6228", website: "https://www.littleearthlings.ca"
  },
  {
    name: "Connections Kids Club", photo: "", days: "Both days",
    care: "30 months \u2013 school age, School-aged care", philosophy: "Reggio-inspired",
    address: "5999 Blanshard Drive, Richmond, BC V7C 5V4",
    hours: "7:00 am \u2013 5:30/6:00 pm (open year-round)",
    languages: "English, Mandarin, Cantonese", funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Meals; enhancement programs (yoga, language); extended hours",
    register: "Register at ccssociety.ca",
    phone: "778-798-8861", website: "https://www.ccssociety.ca"
  },
  {
    name: "Terra Nova Nature School", photo: "", days: "Both days",
    care: "Preschool", philosophy: "Blended (nature-based, emergent)",
    address: "2680 River Road, Richmond, BC",
    hours: "9:00 am \u2013 1:00 pm; some afternoons 1:30 \u2013 3:30 pm",
    languages: "English (educators also speak German, Japanese, French)",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "",
    register: "Complete the online registration, then email the Director",
    phone: "604-238-8437", website: "https://www.terranovanatureschool.com"
  },
  {
    name: "Willow Children's Centre", photo: "", days: "Sat Oct 3 (AM)",
    care: "Infant/Toddler, 30 months \u2013 school age", philosophy: "Reggio-inspired",
    address: "650\u20135688 Hollybridge Way, Richmond, BC",
    hours: "7:30 am \u2013 6:00 pm", languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "",
    register: "Join the Willow waitlist on the website",
    phone: "604-307-3490", website: "https://www.richmondchildcare.org"
  },
  {
    name: "Rothewood Academy \u2013 Richmond City Centre", photo: "", days: "Sat Oct 3 (AM)",
    care: "Infant/Toddler, 30 months \u2013 school age", philosophy: "Blended (Reggio, play-based, Montessori)",
    address: "7931 Alderbridge Way, Richmond, BC",
    hours: "7:00 am \u2013 6:00 pm", languages: "English, Mandarin, Cantonese, Korean, Japanese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Extended hours; meals; enhancement programs (yoga, language); web-cam access",
    register: "Contact richmond@rothewood.com",
    phone: "604-279-1818", website: "https://www.rothewood.com"
  },
  {
    name: "Lesco Montessori Daycare", photo: "", days: "Both days",
    care: "30 months \u2013 school age", philosophy: "Montessori",
    address: "12720 Cameron Drive, Richmond, BC",
    hours: "8:30 am \u2013 5:30 pm", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Enhancement programs (yoga, language)",
    register: "Register in person",
    phone: "778-926-0640", website: "https://lescomontessori.ca",
    instagram: "Lesco_Montessori", facebook: "https://www.facebook.com/p/Lesco-Montessori-School-100039731937048/"
  },
  {
    name: "Dino-Mites Preschool", photo: "", days: "Sat Oct 3 (AM)",
    care: "Preschool", philosophy: "Play-based",
    address: "4071 Francis Road, Richmond, BC V7C 1J8",
    hours: "9:00 am \u2013 1:00 pm", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Art, music, games, stories, active & quiet play (included)",
    register: "Contact by phone, email, or through the website",
    phone: "604-272-2423", website: "https://www.dinomitespreschool.com",
    facebook: "https://www.facebook.com/dinomitespreschool2017"
  },
  {
    name: "Royal Blue Heron Montessori Academy", photo: "", days: "Thu Oct 1 (eve)",
    care: "30 months \u2013 school age", philosophy: "Montessori",
    address: "10111 4th Avenue, Richmond, BC V7E 1V5 (inside Manoah Steves Elementary)",
    hours: "8:30 am \u2013 3:30 pm", languages: "English, Mandarin",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Extended hours",
    register: "Call, or leave a message on the website",
    phone: "778-866-3572", website: "https://royalblueheronmontessoriacademy.ca"
  },
  {
    name: "Renaissance Kids", photo: "", days: "Both days",
    care: "Infant/Toddler, 30 months \u2013 school age, School-aged care", philosophy: "Blended (Reggio, Montessori, academic)",
    address: "#1\u201312491 No. 2 Road, Richmond, BC",
    hours: "7:00 am \u2013 5:30 pm", languages: "English, French",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    services: "Transportation; meals; extended hours; enhancement programs (music, dance, art, STEM, French)",
    register: "Sign up for the waiting list",
    phone: "604-723-3117", website: "https://www.renaissancekids.ca"
  }
];
