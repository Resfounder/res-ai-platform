import {
  Instagram,
  Facebook,
  Star,
  MessageCircle,
  MessageSquare,
  CheckCircle,
  Clock,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

export type BusinessType = "restaurant" | "salon" | "clinic"

export interface InboxMessage {
  id: number
  type: string
  customer: string
  avatar: string
  content: string
  platform: string
  platformIcon: LucideIcon
  timeAgo: string
  status: string
  postContext?: string
  sentiment: "positive" | "neutral" | "negative"
  rating?: number
}

export interface ContentTemplate {
  id: string
  name: string
  description: string
}

export interface SampleContent {
  instagram: string
  facebook: string
}

export interface DashboardStat {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
}

export interface PlatformStat {
  platform: string
  icon: LucideIcon
  interactions: number
  responseRate: string
  avgTime: string
  color: string
  bgColor: string
}

export interface RecentActivity {
  id: number
  type: string
  customer: string
  content: string
  response: string
  platform: string
  timeAgo: string
  status: string
}

export interface BusinessProfile {
  id: BusinessType
  name: string
  label: string
  tagline: string
  messages: InboxMessage[]
  aiResponses: Record<number, string>
  contentTemplates: ContentTemplate[]
  sampleContent: Record<string, SampleContent>
  stats: DashboardStat[]
  platformStats: PlatformStat[]
  recentActivity: RecentActivity[]
}

const restaurant: BusinessProfile = {
  id: "restaurant",
  name: "Bella's Italian Bistro",
  label: "Restaurant",
  tagline: "Family-owned Italian dining",
  messages: [
    {
      id: 1,
      type: "instagram_comment",
      customer: "@foodie_sarah",
      avatar: "S",
      content: "This looks absolutely delicious! What's in the sauce? 😍",
      platform: "Instagram",
      platformIcon: Instagram,
      timeAgo: "2 min ago",
      status: "pending",
      postContext: "Photo: Truffle Pasta Special",
      sentiment: "positive",
    },
    {
      id: 2,
      type: "facebook_message",
      customer: "Mike Johnson",
      avatar: "M",
      content: "Hi! I have a severe nut allergy. Can you tell me which dishes are safe for me to order?",
      platform: "Facebook",
      platformIcon: Facebook,
      timeAgo: "5 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Jennifer L.",
      avatar: "J",
      content:
        "Disappointed with our visit last night. Food was cold and service was slow. Expected better for the price.",
      platform: "Google",
      platformIcon: Star,
      timeAgo: "12 min ago",
      status: "pending",
      rating: 2,
      sentiment: "negative",
    },
    {
      id: 4,
      type: "instagram_dm",
      customer: "@local_blogger",
      avatar: "L",
      content: "Hi! I'm a local food blogger with 15K followers. Would you be interested in a collaboration?",
      platform: "Instagram",
      platformIcon: MessageCircle,
      timeAgo: "1 hour ago",
      status: "pending",
      sentiment: "positive",
    },
  ],
  aiResponses: {
    0: "Hi Sarah! 😊 Thank you so much! Our truffle pasta features a creamy parmesan sauce with real black truffle shavings, fresh herbs, and a touch of white wine. It's one of our chef's signature dishes! We'd love to have you try it in person soon. What's your favorite type of pasta? 🍝✨",
    1: "Hi Mike! Thank you for reaching out about your allergy - we take food safety very seriously. I'd be happy to help you dine safely with us! Our chef can prepare several dishes that are completely nut-free, including our Margherita pizza, grilled salmon, and most of our pasta dishes. I'll have our manager call you directly to discuss all safe options and ensure your meal is prepared with extra care. Could you share your phone number? We want to make sure you have a wonderful and worry-free dining experience! 🙏",
    2: "Hi Jennifer, thank you for taking the time to share your feedback, and I sincerely apologize that your experience didn't meet our usual standards. Cold food and slow service are absolutely not acceptable, and I take full responsibility for this. I'd like to make this right immediately - could you please call us at [phone] or email us directly? I'd love to invite you and your party back for a complimentary meal so we can show you the experience we're truly known for. Your feedback helps us improve, and I'm personally committed to ensuring this doesn't happen again. Thank you for giving us the opportunity to do better.",
    3: "Hi! Thank you so much for reaching out! We'd absolutely love to collaborate with you - your content looks amazing! 📸 We're always excited to work with local food enthusiasts who share our passion for great Italian cuisine. Could we schedule a time to chat about partnership opportunities? I'd love to have you try our new seasonal menu and discuss how we can create something special together. Feel free to DM us your availability or email us at [email]. Looking forward to working with you! 🤝✨",
  },
  contentTemplates: [
    { id: "daily-special", name: "Daily Special Post", description: "Showcase today's featured dish" },
    { id: "review-celebration", name: "Review Celebration", description: "Share positive customer reviews" },
    { id: "behind-scenes", name: "Behind the Scenes", description: "Show kitchen/staff in action" },
    { id: "customer-story", name: "Customer Story", description: "Highlight loyal customers" },
    { id: "seasonal-menu", name: "Seasonal Menu", description: "Promote seasonal offerings" },
    { id: "event-announcement", name: "Event Announcement", description: "Announce special events" },
  ],
  sampleContent: {
    "daily-special": {
      instagram:
        "🍝 Today's Special: Truffle Mushroom Risotto! 🍄✨\n\nOur chef's signature creamy arborio rice with wild mushrooms, fresh truffle shavings, and aged parmesan. Each grain is perfectly cooked to creamy perfection!\n\n📍 Available today only\n💰 $28\n⏰ Until 9 PM or while supplies last\n\n#TruffleRisotto #DailySpecial #ItalianCuisine #FreshTruffles #BellasItalianBistro #FoodieFavorites",
      facebook:
        "🍝 DAILY SPECIAL ALERT! 🍝\n\nToday we're featuring our incredible Truffle Mushroom Risotto - a dish that's been 20 years in the making! Our chef combines creamy arborio rice with wild mushrooms and fresh truffle shavings for a truly unforgettable experience.\n\nThis special is only available today for $28, and trust us - it's worth every penny! Come in before 9 PM or while supplies last.\n\nWhat's your favorite risotto flavor? Let us know in the comments! 👇",
    },
    "review-celebration": {
      instagram:
        '⭐⭐⭐⭐⭐ WOW! Thank you Sarah M.! ⭐⭐⭐⭐⭐\n\n"Amazing service! The staff was incredibly helpful and the food was delicious. Best Italian restaurant in town!" - Sarah M.\n\nReviews like this make our day! 🥰 Thank you for choosing Bella\'s and for taking the time to share your experience.\n\n#CustomerLove #FiveStars #BestItalian #ThankYou #BellasFamily #HappyCustomers',
      facebook:
        "🌟 CUSTOMER SPOTLIGHT 🌟\n\nWe're absolutely thrilled to share this amazing review from Sarah M.:\n\n\"Amazing service! The staff was incredibly helpful and the food was delicious. Best Italian restaurant in town!\"\n\nSarah, thank you so much for your kind words! It's customers like you who make what we do so rewarding. We're honored to be your go-to Italian spot! ❤️\n\nTo all our amazing customers - THANK YOU for your continued support and for sharing your experiences with others!",
    },
  },
  stats: [
    { title: "Total Interactions", value: "1,247", change: "+23% this week", icon: MessageSquare, color: "text-blue-600" },
    { title: "Response Rate", value: "99.2%", change: "+25% with AI", icon: CheckCircle, color: "text-green-600" },
    { title: "Avg Response Time", value: "3.2 min", change: "-2.8 hrs saved", icon: Clock, color: "text-purple-600" },
    { title: "Engagement Rate", value: "8.4%", change: "+1.2% this month", icon: TrendingUp, color: "text-orange-600" },
  ],
  platformStats: [
    { platform: "Instagram", icon: Instagram, interactions: 456, responseRate: "99%", avgTime: "2.1 min", color: "text-pink-600", bgColor: "bg-pink-50" },
    { platform: "Facebook", icon: Facebook, interactions: 324, responseRate: "100%", avgTime: "1.8 min", color: "text-blue-600", bgColor: "bg-blue-50" },
    { platform: "Google Reviews", icon: Star, interactions: 89, responseRate: "98%", avgTime: "4.2 min", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { platform: "Messages", icon: MessageCircle, interactions: 378, responseRate: "99%", avgTime: "2.8 min", color: "text-green-600", bgColor: "bg-green-50" },
  ],
  recentActivity: [
    {
      id: 1,
      type: "instagram_comment",
      customer: "@sarah_foodie",
      content: "This pasta looks amazing! 😍",
      response: "Thank you Sarah! Our chef uses a family recipe that's been perfected over 20 years. Come try it soon! 🍝",
      platform: "Instagram",
      timeAgo: "2 min ago",
      status: "responded",
    },
    {
      id: 2,
      type: "facebook_message",
      customer: "Mike Johnson",
      content: "Do you have gluten-free options?",
      response:
        "Hi Mike! Yes, we have several delicious gluten-free pasta options and our chef can modify most dishes. Would you like to see our full gluten-free menu?",
      platform: "Facebook",
      timeAgo: "5 min ago",
      status: "responded",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Jennifer L.",
      content: "Best Italian food in town! Service was outstanding.",
      response:
        "Jennifer, thank you so much! We're thrilled you enjoyed both the food and service. Our team works hard to create that perfect dining experience! 🌟",
      platform: "Google",
      timeAgo: "12 min ago",
      status: "responded",
    },
  ],
}

const salon: BusinessProfile = {
  id: "salon",
  name: "Serenity Salon & Spa",
  label: "Salon / Spa",
  tagline: "Hair, beauty & wellness studio",
  messages: [
    {
      id: 1,
      type: "instagram_comment",
      customer: "@glow_gabby",
      avatar: "G",
      content: "Your balayage work is absolutely stunning! How much for color like this? 😍",
      platform: "Instagram",
      platformIcon: Instagram,
      timeAgo: "3 min ago",
      status: "pending",
      postContext: "Photo: Sun-Kissed Balayage Transformation",
      sentiment: "positive",
    },
    {
      id: 2,
      type: "facebook_message",
      customer: "Rachel Adams",
      avatar: "R",
      content: "Hi! Do you have any availability for a haircut and blow-dry this Saturday afternoon?",
      platform: "Facebook",
      platformIcon: Facebook,
      timeAgo: "8 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Monica B.",
      avatar: "M",
      content:
        "Booked a massage but waited 30 minutes past my appointment time. The treatment itself was lovely, but the wait was really frustrating.",
      platform: "Google",
      platformIcon: Star,
      timeAgo: "15 min ago",
      status: "pending",
      rating: 2,
      sentiment: "negative",
    },
    {
      id: 4,
      type: "instagram_dm",
      customer: "@beauty_by_bex",
      avatar: "B",
      content: "Hi! I'm a beauty blogger with 20K followers. Would you be interested in a collaboration?",
      platform: "Instagram",
      platformIcon: MessageCircle,
      timeAgo: "1 hour ago",
      status: "pending",
      sentiment: "positive",
    },
  ],
  aiResponses: {
    0: "Hi Gabby! 😊 Thank you so much - that balayage is one of our stylists' favorites too! Our balayage starts from $140 depending on hair length and thickness, and includes a toner and blow-dry to finish. We'd love to create a custom look just for you! Would you like us to book in a quick free consultation? ✨",
    1: "Hi Rachel! Thanks for reaching out! 😊 Yes, we do have a few openings this Saturday afternoon for a haircut and blow-dry. We have a slot at 1:30 PM and another at 3:00 PM - would either of those work for you? Let us know and we'll get you booked in right away! 💇‍♀️",
    2: "Hi Monica, thank you for taking the time to share your feedback, and I'm so sorry you were kept waiting 30 minutes past your appointment time. That's not the relaxing experience we want for our guests, and I completely understand your frustration. I'd love to make it right - please call us at [phone] or reply here, and we'll arrange a complimentary add-on treatment on your next visit. We truly appreciate you giving us the chance to do better. 🙏",
    3: "Hi Bex! Thank you so much for reaching out - we'd absolutely love to collaborate with you! 📸 Your content is beautiful and we're always excited to work with local beauty creators. Could we set up a time to chat about partnership ideas? We'd love to treat you to one of our signature services and explore how we can create something gorgeous together. Feel free to DM us your availability or email [email]. Can't wait! 💕",
  },
  contentTemplates: [
    { id: "daily-special", name: "Treatment of the Week", description: "Showcase a featured service or treatment" },
    { id: "review-celebration", name: "Review Celebration", description: "Share glowing client reviews" },
    { id: "behind-scenes", name: "Behind the Scenes", description: "Show your stylists and studio in action" },
    { id: "customer-story", name: "Client Transformation", description: "Highlight a before & after" },
    { id: "seasonal-menu", name: "Seasonal Offers", description: "Promote seasonal packages & promos" },
    { id: "event-announcement", name: "Event Announcement", description: "Announce pamper days & events" },
  ],
  sampleContent: {
    "daily-special": {
      instagram:
        "💆‍♀️ Treatment of the Week: The Serenity Glow Facial! ✨\n\nDrift away with our 60-minute signature facial featuring a deep cleanse, gentle exfoliation, hydrating mask, and a relaxing face & shoulder massage. You'll leave glowing and refreshed!\n\n📍 Book this week\n💰 $89 (save $20)\n⏰ Limited spots available\n\n#SerenityGlow #FacialFacts #SelfCareSunday #SpaDay #SerenitySalonSpa #SkincareGoals",
      facebook:
        "✨ TREATMENT OF THE WEEK ✨\n\nThis week we're spotlighting our Serenity Glow Facial - 60 minutes of pure relaxation and radiant results! It includes a deep cleanse, gentle exfoliation, a hydrating mask, and a soothing face & shoulder massage.\n\nThis week only, it's $89 (that's $20 off!). Spots are limited, so book early to treat yourself!\n\nWhen was the last time you took an hour just for you? Comment below and tag a friend who deserves a pamper day! 👇",
    },
    "review-celebration": {
      instagram:
        '⭐⭐⭐⭐⭐ Thank you, Olivia R.! ⭐⭐⭐⭐⭐\n\n"Absolutely love my new color! The team made me feel so welcome and relaxed. Best salon experience I\'ve ever had!" - Olivia R.\n\nReviews like this fill our hearts! 🥰 Thank you for trusting us with your hair and for being part of the Serenity family.\n\n#ClientLove #FiveStars #HairGoals #ThankYou #SerenityFamily #HappyClients',
      facebook:
        "🌟 CLIENT SPOTLIGHT 🌟\n\nWe're so grateful for this lovely review from Olivia R.:\n\n\"Absolutely love my new color! The team made me feel so welcome and relaxed. Best salon experience I've ever had!\"\n\nOlivia, thank you for your kind words - moments like these are why we do what we do! We're honored to be your salon home. 💕\n\nTo all our wonderful clients - THANK YOU for your trust and for sharing your experiences with us!",
    },
  },
  stats: [
    { title: "Total Interactions", value: "938", change: "+19% this week", icon: MessageSquare, color: "text-blue-600" },
    { title: "Response Rate", value: "99.0%", change: "+27% with AI", icon: CheckCircle, color: "text-green-600" },
    { title: "Avg Response Time", value: "2.7 min", change: "-3.1 hrs saved", icon: Clock, color: "text-purple-600" },
    { title: "Booking Enquiries", value: "12.6%", change: "+2.4% this month", icon: TrendingUp, color: "text-orange-600" },
  ],
  platformStats: [
    { platform: "Instagram", icon: Instagram, interactions: 512, responseRate: "99%", avgTime: "1.9 min", color: "text-pink-600", bgColor: "bg-pink-50" },
    { platform: "Facebook", icon: Facebook, interactions: 268, responseRate: "100%", avgTime: "1.6 min", color: "text-blue-600", bgColor: "bg-blue-50" },
    { platform: "Google Reviews", icon: Star, interactions: 74, responseRate: "97%", avgTime: "3.8 min", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { platform: "Messages", icon: MessageCircle, interactions: 301, responseRate: "99%", avgTime: "2.3 min", color: "text-green-600", bgColor: "bg-green-50" },
  ],
  recentActivity: [
    {
      id: 1,
      type: "instagram_comment",
      customer: "@glow_gabby",
      content: "Your balayage work is stunning! 😍",
      response: "Thank you Gabby! Our color team loves creating sun-kissed looks. We'd love to book you in for a free consultation! ✨",
      platform: "Instagram",
      timeAgo: "3 min ago",
      status: "responded",
    },
    {
      id: 2,
      type: "facebook_message",
      customer: "Rachel Adams",
      content: "Do you have availability this Saturday?",
      response:
        "Hi Rachel! Yes, we have openings at 1:30 PM and 3:00 PM this Saturday for a cut and blow-dry. Would either suit you? We'll get you booked right in!",
      platform: "Facebook",
      timeAgo: "8 min ago",
      status: "responded",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Olivia R.",
      content: "Best salon experience I've ever had! Love my new color.",
      response:
        "Olivia, thank you so much! We're thrilled you love your new color and felt so welcome. Can't wait to pamper you again! 💕",
      platform: "Google",
      timeAgo: "14 min ago",
      status: "responded",
    },
  ],
}

const clinic: BusinessProfile = {
  id: "clinic",
  name: "Brightwell Health Clinic",
  label: "Health Clinic",
  tagline: "Family medical & wellness practice",
  messages: [
    {
      id: 1,
      type: "instagram_comment",
      customer: "@wellness_will",
      avatar: "W",
      content: "Great post on flu season! Do you offer flu jabs and how much are they? 💉",
      platform: "Instagram",
      platformIcon: Instagram,
      timeAgo: "4 min ago",
      status: "pending",
      postContext: "Post: Flu Season Tips",
      sentiment: "positive",
    },
    {
      id: 2,
      type: "facebook_message",
      customer: "Daniel Price",
      avatar: "D",
      content: "Hi, I'd like to book a GP appointment this week. Do you have anything available and are you taking new patients?",
      platform: "Facebook",
      platformIcon: Facebook,
      timeAgo: "9 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Karen S.",
      avatar: "K",
      content:
        "Waited over an hour past my appointment time and reception seemed disorganised. The doctor was good but the wait was unacceptable.",
      platform: "Google",
      platformIcon: Star,
      timeAgo: "18 min ago",
      status: "pending",
      rating: 2,
      sentiment: "negative",
    },
    {
      id: 4,
      type: "facebook_message",
      customer: "Priya Sharma",
      avatar: "P",
      content: "Can you tell me if I need a referral to see a physiotherapist, or can I book directly?",
      platform: "Facebook",
      platformIcon: MessageCircle,
      timeAgo: "1 hour ago",
      status: "pending",
      sentiment: "neutral",
    },
  ],
  aiResponses: {
    0: "Hi Will! 😊 Thanks for your question - yes, we do offer flu vaccinations! Our flu jabs are $25, and they're free for eligible patients (over 65s, pregnant women, and those with certain health conditions). No appointment is needed for our walk-in flu clinic on weekday mornings. Would you like us to share the times? Stay well! 💙",
    1: "Hi Daniel! Thanks for getting in touch. 😊 Yes, we are currently accepting new patients and we have GP appointments available this week - we have openings on Wednesday afternoon and Thursday morning. To get you booked in, could you let us know which works best and share your phone number? Our reception team will confirm everything and explain our quick new-patient registration. We look forward to welcoming you!",
    2: "Hi Karen, thank you for sharing your feedback, and I'm truly sorry you waited over an hour and found reception disorganised. That's not the standard of care we aim for, and I completely understand your frustration. I'd like to look into what happened and make it right - please call our practice manager at [phone] or reply here. We genuinely value your feedback as it helps us improve for every patient. Thank you for your patience, and we hope to provide a much smoother experience next time. 🙏",
    3: "Hi Priya! Great question. 😊 For physiotherapy, you can book directly with us - no GP referral is needed for self-funded appointments. If you're planning to claim through insurance, some providers do require a referral, so it's worth checking with them first. Would you like us to find you an available physio slot? Happy to help get you booked in!",
  },
  contentTemplates: [
    { id: "daily-special", name: "Health Tip of the Week", description: "Share a helpful wellness tip" },
    { id: "review-celebration", name: "Review Celebration", description: "Share positive patient reviews" },
    { id: "behind-scenes", name: "Meet the Team", description: "Introduce your doctors and staff" },
    { id: "customer-story", name: "Patient Story", description: "Highlight a patient success story" },
    { id: "seasonal-menu", name: "Seasonal Health", description: "Promote seasonal services & screenings" },
    { id: "event-announcement", name: "Service Announcement", description: "Announce clinics & new services" },
  ],
  sampleContent: {
    "daily-special": {
      instagram:
        "🩺 Health Tip of the Week: Stay Hydrated! 💧\n\nDrinking enough water supports your energy, focus, and immune system. Aim for 6-8 glasses a day - more if you're active or it's warm out!\n\n✅ Carry a reusable bottle\n✅ Add fruit for flavor\n✅ Sip regularly, don't wait until you're thirsty\n\nBook a wellness check with our team today.\n\n#HealthTip #StayHydrated #WellnessWednesday #BrightwellHealth #PreventiveCare #FamilyHealth",
      facebook:
        "🩺 HEALTH TIP OF THE WEEK 🩺\n\nThis week's reminder: stay hydrated! Drinking 6-8 glasses of water a day supports your energy, concentration, and immune system. If you're active or it's warm, you'll need even more.\n\nSmall habits make a big difference - carry a reusable bottle, add a slice of fruit for flavor, and sip throughout the day rather than waiting until you feel thirsty.\n\nDue for a check-up? Our friendly team is here to help. Call us or send a message to book your appointment today! 💙",
    },
    "review-celebration": {
      instagram:
        '⭐⭐⭐⭐⭐ Thank you, James T.! ⭐⭐⭐⭐⭐\n\n"The whole team is caring and professional. Dr. Bright took the time to really listen and explain everything clearly. Highly recommend this practice!" - James T.\n\nReviews like this mean the world to us! 💙 Thank you for trusting us with your care.\n\n#PatientCare #FiveStars #ThankYou #BrightwellHealth #CaringTeam #HealthcareDoneRight',
      facebook:
        "🌟 PATIENT SPOTLIGHT 🌟\n\nWe're so grateful for this kind review from James T.:\n\n\"The whole team is caring and professional. Dr. Bright took the time to really listen and explain everything clearly. Highly recommend this practice!\"\n\nJames, thank you so much - taking the time to listen and provide clear, compassionate care is at the heart of everything we do. We're honored to look after you and your family. 💙\n\nTo all our patients - thank you for your trust!",
    },
  },
  stats: [
    { title: "Total Interactions", value: "1,084", change: "+17% this week", icon: MessageSquare, color: "text-blue-600" },
    { title: "Response Rate", value: "99.4%", change: "+29% with AI", icon: CheckCircle, color: "text-green-600" },
    { title: "Avg Response Time", value: "2.9 min", change: "-3.4 hrs saved", icon: Clock, color: "text-purple-600" },
    { title: "Booking Enquiries", value: "14.1%", change: "+2.1% this month", icon: TrendingUp, color: "text-orange-600" },
  ],
  platformStats: [
    { platform: "Instagram", icon: Instagram, interactions: 287, responseRate: "98%", avgTime: "2.4 min", color: "text-pink-600", bgColor: "bg-pink-50" },
    { platform: "Facebook", icon: Facebook, interactions: 421, responseRate: "100%", avgTime: "1.7 min", color: "text-blue-600", bgColor: "bg-blue-50" },
    { platform: "Google Reviews", icon: Star, interactions: 96, responseRate: "98%", avgTime: "4.0 min", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { platform: "Messages", icon: MessageCircle, interactions: 280, responseRate: "99%", avgTime: "2.5 min", color: "text-green-600", bgColor: "bg-green-50" },
  ],
  recentActivity: [
    {
      id: 1,
      type: "instagram_comment",
      customer: "@wellness_will",
      content: "Do you offer flu jabs?",
      response: "Hi Will! Yes, we offer flu vaccinations at $25 (free for eligible patients), with walk-in clinics weekday mornings. Stay well! 💙",
      platform: "Instagram",
      timeAgo: "4 min ago",
      status: "responded",
    },
    {
      id: 2,
      type: "facebook_message",
      customer: "Daniel Price",
      content: "Are you taking new patients?",
      response:
        "Hi Daniel! Yes, we're accepting new patients and have GP appointments this week. Let us know what works and we'll get you registered and booked in!",
      platform: "Facebook",
      timeAgo: "9 min ago",
      status: "responded",
    },
    {
      id: 3,
      type: "google_review",
      customer: "James T.",
      content: "Caring, professional team. Highly recommend this practice!",
      response:
        "James, thank you so much! Listening and providing clear, compassionate care is at the heart of what we do. We're honored to look after you. 💙",
      platform: "Google",
      timeAgo: "16 min ago",
      status: "responded",
    },
  ],
}

export const businessProfiles: Record<BusinessType, BusinessProfile> = {
  restaurant,
  salon,
  clinic,
}

export const businessTypeOptions: { value: BusinessType; label: string }[] = [
  { value: "restaurant", label: restaurant.label },
  { value: "salon", label: salon.label },
  { value: "clinic", label: clinic.label },
]
