/* ============================================================
   PARTICIPATING CENTRES  —  one consistent record per program
   ------------------------------------------------------------
   Every listing uses the SAME fields, in the same order, so the
   cards stay consistent across programs. The Locations page fills
   itself in from this list — no HTML editing needed.

   FIELDS (leave any as "" to hide that row on the card):

     {
       name:       "Program name",                 // required
       photo:      "willow.jpg",                    // image in the /photos folder; "" = coloured placeholder
       days:       "Both days",                     // "Both days" | "Thu Oct 1 (eve)" | "Sat Oct 3 (AM)"
       care:       "Infant/toddler · 3–school age", // short ages / licence label
       philosophy: "Reggio-inspired",               // Montessori | Play-based | Blended | Academic | Outdoor …
       address:    "123 Example Rd, Richmond, BC",  // used on the card AND for the map link
       hours:      "8:00 am – 4:30 pm, Mon–Fri",
       languages:  "English, Mandarin",
       funding:    "ACCB, CCFRI, CCOF, Wage Enhancement",
       register:   "Email us or join the waitlist online",
       phone:      "604-555-0100",
       website:    "https://example.com",           // full URL incl. https://  ("" = no link)
       instagram:  "handle",                         // Instagram handle, no @      ("" = none)
       facebook:   "https://facebook.com/…",         // full Facebook URL           ("" = none)
       youtube:    "handle"                           // YouTube handle, no @        ("" = none)
     }

   PHOTOS: drop each program's image in a "photos" folder next to
   this file and put the filename in "photo". Landscape ~3:2 works
   best. No photo? Leave "" and a soft coloured tile shows instead.

   Reconciled against the Google Sheet (xlsx) export and operator-
   supplied links. Spot-check anything you're unsure of against the
   live sheet.
   ============================================================ */

const CENTRES = [
  {
    name: "SSOCC Heron – Toddlers and Junior Kindergarten", photo: "", days: "Both days",
    care: "Infant/toddler · 3–school age", philosophy: "Reggio-inspired",
    address: "12091 Cambie Road, Richmond, BC (Richmond Adult Education Centre, beside Mitchell Elementary)",
    hours: "8:00 am – 4:30 pm (extended to 5:30 pm)",
    languages: "English, Korean, Ukrainian, Mandarin, Tagalog",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Email registration@ssocc.ca or join the waitlist online",
    phone: "604-377-8385", website: "https://www.ssocc.ca",
    instagram: "ssoccchildcare", facebook: "https://www.facebook.com/Stevestonsocietyofchildrenscentres/", youtube: "StevestonSocietyofCC"
  },
  {
    name: "Crystal Star Daycare", photo: "", days: "Thu Oct 1 (eve)",
    care: "Infant/toddler (licensed home, 4 children)", philosophy: "Play-based",
    address: "10631 Gilmore Crescent, Richmond, BC",
    hours: "7:30 am – 4:30 pm, Mon–Fri",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Email crystalstardaycare@shaw.ca or call 604-276-9816",
    phone: "604-276-9816", website: "",
    facebook: "https://www.facebook.com/p/Crystal-Star-Daycare-an-InfantToddler-Child-Care-100054590433583/"
  },
  {
    name: "Kiddo House Montessori", photo: "", days: "Sat Oct 3 (AM)",
    care: "3 – school age", philosophy: "Montessori",
    address: "6640 Blundell Road, Richmond, BC",
    hours: "Full day", languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Register online or email kiddohousechildcare@gmail.com",
    phone: "778-886-0626", website: "https://kiddohousechildcare.ca"
  },
  {
    name: "Camps and Afterschool", photo: "", days: "Both days",
    care: "School age", philosophy: "Academic / traditional",
    address: "Unit 201, 6640 Blundell Rd, Richmond, BC V7C 1H8",
    hours: "8:30 am – 6:30 pm; after-school 2:45 – 7:00 pm",
    languages: "English, Mandarin, Cantonese", funding: "ACCB, Wage Enhancement",
    register: "Email celaafterschool@gmail.com",
    phone: "778-951-3438", website: "https://www.hellokidslearn.com"
  },
  {
    name: "Thompson Early Learning – Rompers Preschool", photo: "", days: "Both days",
    care: "Preschool", philosophy: "Blended (play-based, Reggio-inspired)",
    address: "Thompson Community Centre, 5151 Granville Ave, Richmond, BC V7C 1E6",
    hours: "9:00 am – 1:00 pm", languages: "English, Japanese, Tagalog, Greek",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Contact Anna Thymis, Preschool Coordinator, by email, phone, or the website form",
    phone: "604-238-8497", website: "https://www.thompsonearlylearning.com"
  },
  {
    name: "Little Koala Montessori Academy (Clarke Place)", photo: "", days: "Both days",
    care: "Infant/toddler · 3–school age", philosophy: "Montessori (AMI/AMS)",
    address: "110–12855 Clarke Place, Richmond, BC",
    hours: "8:00 am – 5:30 pm, Mon–Fri", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "$75 registration fee + one month's deposit",
    phone: "778-999-9229", website: "https://www.littlekoalamontessori.com"
  },
  {
    name: "Little Koala Montessori Academy (Blundell Road)", photo: "", days: "Both days",
    care: "3 – school age", philosophy: "Montessori (AMS)",
    address: "10011 Blundell Road, Richmond, BC",
    hours: "8:00 am – 5:30 pm, Mon–Fri", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "$75 registration fee + one month's deposit",
    phone: "778-999-9229", website: "https://www.littlekoalamontessori.com"
  },
  {
    name: "Blue Whale Children's Learning Centre", photo: "", days: "Sat Oct 3 (AM)",
    care: "3 – school age", philosophy: "Blended (Montessori, purposeful play)",
    address: "8060 No. 1 Road, Richmond, BC",
    hours: "8:00 am – 5:00 pm", languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Book a tour by phone or through the website, then register",
    phone: "604-754-7666", website: "https://www.bluewhaleedu.com"
  },
  {
    name: "Cedar Studio Outdoor Learning", photo: "", days: "Both days",
    care: "9 months – 5 years", philosophy: "Blended (Reggio-inspired, outdoor / land-based)",
    address: "Units 135 & 140, 6231 London Road, Richmond, BC",
    hours: "8:00 am – 5:00 pm", languages: "English, Mandarin, Cantonese, Hindi, Urdu",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Register through the Brightwheel link on the website",
    phone: "604-783-1014", website: "https://www.cedarstudio.co"
  },
  {
    name: "Kid Nest Infant and Toddler Daycare", photo: "", days: "Sat Oct 3 (AM)",
    care: "Infant/toddler", philosophy: "Blended (Montessori, play-based)",
    address: "8531 Leslie Road, Richmond, BC V6X 1E6",
    hours: "8:30 am – 6:00 pm, Mon–Fri", languages: "English, Chinese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Register online or email wenxuan20120329@gmail.com",
    phone: "778-995-0583", website: "https://www.kidnestdaycare.com"
  },
  {
    name: "Little Earthlings Childcare", photo: "", days: "Both days",
    care: "3 – school age", philosophy: "Blended (Reggio-inspired, play-based)",
    address: "3871 Moncton St, Richmond, BC V7E 3A7 (Steveston Village)",
    hours: "7:30 am – 5:30 pm, Mon–Fri", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Contact via the website or email; book a tour, then register",
    phone: "604-370-6228", website: "https://www.littleearthlings.ca"
  },
  {
    name: "Connections Kids Club", photo: "", days: "Both days",
    care: "3 – school age · school age", philosophy: "Reggio-inspired",
    address: "5999 Blanshard Drive, Richmond, BC V7C 5V4",
    hours: "7:00 am – 5:30/6:00 pm (open year-round)",
    languages: "English, Mandarin, Cantonese", funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Register at ccssociety.ca",
    phone: "778-798-8861", website: "https://www.ccssociety.ca"
  },
  {
    name: "Terra Nova Nature School", photo: "", days: "Both days",
    care: "Preschool", philosophy: "Blended (nature-based, emergent)",
    address: "2680 River Road, Richmond, BC",
    hours: "9:00 am – 1:00 pm; some afternoons 1:30 – 3:30 pm",
    languages: "English (educators also speak German, Japanese, French)",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Complete the online registration, then email the Director",
    phone: "604-238-8437", website: "https://www.terranovanatureschool.com"
  },
  {
    name: "Willow Children's Centre", photo: "", days: "Sat Oct 3 (AM)",
    care: "Infant/toddler · 3–school age", philosophy: "Reggio-inspired",
    address: "650–5688 Hollybridge Way, Richmond, BC",
    hours: "7:30 am – 6:00 pm", languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Join the Willow waitlist on the website",
    phone: "604-307-3490", website: "https://www.richmondchildcare.org"
  },
  {
    name: "Rothewood Academy – Richmond City Centre", photo: "", days: "Sat Oct 3 (AM)",
    care: "Infant/toddler · 3–school age", philosophy: "Blended (Reggio, play-based, Montessori)",
    address: "7931 Alderbridge Way, Richmond, BC",
    hours: "7:00 am – 6:00 pm", languages: "English, Mandarin, Cantonese, Korean, Japanese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Contact richmond@rothewood.com",
    phone: "604-279-1818", website: "https://www.rothewood.com"
  },
  {
    name: "Lesco Montessori Daycare", photo: "", days: "Both days",
    care: "3 – school age", philosophy: "Montessori",
    address: "12720 Cameron Drive, Richmond, BC",
    hours: "8:30 am – 5:30 pm", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Register in person",
    phone: "778-926-0640", website: "https://lescomontessori.ca",
    instagram: "Lesco_Montessori", facebook: "https://www.facebook.com/p/Lesco-Montessori-School-100039731937048/"
  },
  {
    name: "Dino-Mites Preschool", photo: "", days: "Sat Oct 3 (AM)",
    care: "Preschool", philosophy: "Play-based",
    address: "4071 Francis Road, Richmond, BC V7C 1J8",
    hours: "9:00 am – 1:00 pm", languages: "English",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Contact by phone, email, or through the website",
    phone: "604-272-2423", website: "https://www.dinomitespreschool.com",
    facebook: "https://www.facebook.com/dinomitespreschool2017"
  },
  {
    name: "Royal Blue Heron Montessori Academy", photo: "", days: "Thu Oct 1 (eve)",
    care: "3 – school age", philosophy: "Montessori",
    address: "10111 4th Avenue, Richmond, BC V7E 1V5 (inside Manoah Steves Elementary)",
    hours: "8:30 am – 3:30 pm", languages: "English, Mandarin",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Call, or leave a message on the website",
    phone: "778-866-3572", website: "https://royalblueheronmontessoriacademy.ca"
  },
  {
    name: "Renaissance Kids", photo: "", days: "Both days",
    care: "Infant/toddler · 3–school age · school age", philosophy: "Blended (Reggio, Montessori, academic)",
    address: "#1–12491 No. 2 Road, Richmond, BC",
    hours: "7:00 am – 5:30 pm", languages: "English, French",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    register: "Sign up for the waiting list",
    phone: "604-723-3117", website: "https://www.renaissancekids.ca"
  }
];
