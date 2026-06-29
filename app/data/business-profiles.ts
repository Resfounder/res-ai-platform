import {
  Instagram,
  Facebook,
  Star,
  MessageCircle,
  MessageSquare,
  CheckCircle,
  Clock,
  TrendingUp,
  Globe,
  Hourglass,
  Inbox,
  type LucideIcon,
} from "lucide-react"

export type BusinessType = "salon" | "clinic" | "hairsalon" | "dental" | "aesthetic"

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

export interface HealthScoreCategory {
  label: string
  // Relative weight of this category (all weights sum to 100).
  weight: number
  // The business's performance in this area, 0-100.
  score: number
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
  healthScore: HealthScoreCategory[]
}

// Computes the overall communication health score (0-100) as the
// weighted average of each category's performance: sum(score * weight) / sum(weight).
export function calculateHealthScore(categories: HealthScoreCategory[]): number {
  const totalWeight = categories.reduce((sum, c) => sum + c.weight, 0)
  if (totalWeight === 0) return 0
  const weighted = categories.reduce((sum, c) => sum + c.score * c.weight, 0)
  return Math.round(weighted / totalWeight)
}

const hairsalon: BusinessProfile = {
  id: "hairsalon",
  name: "Luxe Hair Studio",
  label: "Hair Salon",
  tagline: "Cut, color & styling experts",
  messages: [
    {
      id: 1,
      type: "instagram_dm",
      customer: "@chloe_styles",
      avatar: "C",
      content: "Do you have appointments available this Thursday?",
      platform: "Instagram",
      platformIcon: Instagram,
      timeAgo: "3 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 2,
      type: "website_enquiry",
      customer: "Hannah Reed",
      avatar: "H",
      content: "How much is your consultation?",
      platform: "Website",
      platformIcon: Globe,
      timeAgo: "11 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Megan T.",
      avatar: "M",
      content: "Great treatment, but I struggled to get a reply.",
      platform: "Google",
      platformIcon: Star,
      timeAgo: "20 min ago",
      status: "pending",
      rating: 3,
      sentiment: "negative",
    },
    {
      id: 4,
      type: "instagram_comment",
      customer: "@goldenglow_grace",
      avatar: "G",
      content: "Obsessed with this balayage! How much for color like this? 😍",
      platform: "Instagram",
      platformIcon: MessageCircle,
      timeAgo: "1 hour ago",
      status: "pending",
      postContext: "Photo: Honey Balayage Transformation",
      sentiment: "positive",
    },
  ],
  aiResponses: {
    0: "Hi Chloe! 😊 Thanks for reaching out! Yes, we do have availability this Thursday - we currently have openings at 11:00 AM and 2:30 PM. Let us know which service you'd like and which time suits you best, and we'll get you booked right in! 💇‍♀️✨",
    1: "Hi Hannah! Great question. 😊 Our style consultations are complimentary - we'll sit down with you to discuss your hair goals, assess your hair, and recommend the perfect look and pricing before any appointment. Would you like us to book you in for a free consultation this week?",
    2: "Hi Megan, thank you so much for the kind words about your treatment - we're thrilled you loved the result! I'm really sorry it was hard to reach us; that's not the experience we want, and we're improving how quickly we respond to messages. We'd love to make it up to you with a little something on your next visit - please reply here or call us at [phone]. Thank you for your patience and for choosing us! 🙏",
    3: "Hi Grace! 😊 Thank you so much - that honey balayage is one of our favorites too! Our balayage starts from $150 depending on length and thickness, and includes a toner and blow-dry to finish. We'd love to create a custom look just for you! Shall we book you in for a free consultation? ✨",
  },
  contentTemplates: [
    { id: "daily-special", name: "Style of the Week", description: "Showcase a featured cut or color" },
    { id: "review-celebration", name: "Review Celebration", description: "Share glowing client reviews" },
    { id: "behind-scenes", name: "Behind the Chair", description: "Show your stylists in action" },
    { id: "customer-story", name: "Client Transformation", description: "Highlight a before & after" },
    { id: "seasonal-menu", name: "Seasonal Offers", description: "Promote seasonal packages & promos" },
    { id: "event-announcement", name: "Event Announcement", description: "Announce launch days & events" },
  ],
  sampleContent: {
    "daily-special": {
      instagram:
        "✨ Style of the Week: The Honey Balayage! 🍯\n\nSoft, sun-kissed dimension that grows out beautifully - hand-painted by our color experts and finished with a gloss toner and bouncy blow-dry.\n\n📍 Book this week\n💰 From $150\n⏰ Limited slots available\n\n#HoneyBalayage #HairGoals #ColorMelt #LuxeHairStudio #BalayageSpecialist #HairTransformation",
      facebook:
        "✨ STYLE OF THE WEEK ✨\n\nThis week we're loving the Honey Balayage - soft, sun-kissed color that's hand-painted for a natural, lived-in finish that grows out beautifully.\n\nBook this week from $150, including a gloss toner and blow-dry. Slots are limited, so reserve yours early!\n\nThinking of going lighter for the season? Comment below and our team will help you find your perfect shade! 👇",
    },
    "review-celebration": {
      instagram:
        '⭐⭐⭐⭐⭐ Thank you, Sophie L.! ⭐⭐⭐⭐⭐\n\n"Best haircut I\'ve had in years - my stylist really listened and the color is perfect!" - Sophie L.\n\nReviews like this make our day! 🥰 Thank you for trusting us with your hair.\n\n#ClientLove #FiveStars #HairGoals #ThankYou #LuxeHairStudio #HappyClients',
      facebook:
        "🌟 CLIENT SPOTLIGHT 🌟\n\nWe're so grateful for this lovely review from Sophie L.:\n\n\"Best haircut I've had in years - my stylist really listened and the color is perfect!\"\n\nSophie, thank you so much - listening to exactly what you want is what we do best! We can't wait to see you again. 💕\n\nTo all our amazing clients - THANK YOU for your trust and support!",
    },
  },
  stats: [
    { title: "Total Interactions", value: "1,012", change: "+21% this week", icon: MessageSquare, color: "text-blue-600" },
    { title: "Response Rate", value: "99.1%", change: "+26% with AI", icon: CheckCircle, color: "text-green-600" },
    { title: "Avg Response Time", value: "2.6 min", change: "-3.2 hrs saved", icon: Clock, color: "text-purple-600" },
    { title: "Booking Enquiries", value: "13.4%", change: "+2.6% this month", icon: TrendingUp, color: "text-orange-600" },
    { title: "Waiting for a Response", value: "8", change: "3 over 1 hour", icon: Hourglass, color: "text-amber-600" },
    { title: "Awaiting Reply", value: "5", change: "Customer replied back", icon: Inbox, color: "text-rose-600" },
  ],
  platformStats: [
    { platform: "Instagram", icon: Instagram, interactions: 534, responseRate: "99%", avgTime: "1.8 min", color: "text-pink-600", bgColor: "bg-pink-50" },
    { platform: "Facebook", icon: Facebook, interactions: 246, responseRate: "100%", avgTime: "1.7 min", color: "text-blue-600", bgColor: "bg-blue-50" },
    { platform: "Google Reviews", icon: Star, interactions: 81, responseRate: "98%", avgTime: "3.9 min", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { platform: "Website", icon: Globe, interactions: 151, responseRate: "99%", avgTime: "2.4 min", color: "text-green-600", bgColor: "bg-green-50" },
  ],
  recentActivity: [
    {
      id: 1,
      type: "instagram_dm",
      customer: "@chloe_styles",
      content: "Do you have appointments available this Thursday?",
      response: "Hi Chloe! Yes, we have openings at 11:00 AM and 2:30 PM this Thursday. Let us know which works and we'll book you right in! 💇‍♀️",
      platform: "Instagram",
      timeAgo: "3 min ago",
      status: "responded",
    },
    {
      id: 2,
      type: "website_enquiry",
      customer: "Hannah Reed",
      content: "How much is your consultation?",
      response:
        "Hi Hannah! Our style consultations are completely free - we'll discuss your goals and pricing before booking. Would you like us to set one up this week?",
      platform: "Website",
      timeAgo: "11 min ago",
      status: "responded",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Sophie L.",
      content: "Best haircut I've had in years - the color is perfect!",
      response:
        "Sophie, thank you so much! We're thrilled you love your cut and color. Listening to exactly what you want is what we do best - see you again soon! 💕",
      platform: "Google",
      timeAgo: "17 min ago",
      status: "responded",
    },
  ],
  healthScore: [
    { label: "Google review response rate", weight: 25, score: 92 },
    { label: "Average response time", weight: 20, score: 88 },
    { label: "Messages awaiting reply", weight: 20, score: 78 },
    { label: "Customer sentiment", weight: 15, score: 84 },
    { label: "Social engagement", weight: 10, score: 90 },
    { label: "Channel coverage", weight: 10, score: 80 },
  ],
}

const dental: BusinessProfile = {
  id: "dental",
  name: "Smile Dental Care",
  label: "Dental Practice",
  tagline: "Family & cosmetic dentistry",
  messages: [
    {
      id: 1,
      type: "instagram_dm",
      customer: "@james_w",
      avatar: "J",
      content: "Do you have appointments available this Thursday?",
      platform: "Instagram",
      platformIcon: Instagram,
      timeAgo: "5 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 2,
      type: "website_enquiry",
      customer: "Laura Bennett",
      avatar: "L",
      content: "How much is your consultation?",
      platform: "Website",
      platformIcon: Globe,
      timeAgo: "13 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Tom H.",
      avatar: "T",
      content: "Great treatment, but I struggled to get a reply.",
      platform: "Google",
      platformIcon: Star,
      timeAgo: "22 min ago",
      status: "pending",
      rating: 3,
      sentiment: "negative",
    },
    {
      id: 4,
      type: "facebook_message",
      customer: "Aisha Khan",
      avatar: "A",
      content: "Hi! I'm interested in teeth whitening. Are you taking new patients and how does it work?",
      platform: "Facebook",
      platformIcon: Facebook,
      timeAgo: "1 hour ago",
      status: "pending",
      sentiment: "positive",
    },
  ],
  aiResponses: {
    0: "Hi James! 😊 Thanks for getting in touch! Yes, we do have appointments available this Thursday - we have openings at 9:30 AM and 1:00 PM. Could you let us know what you'd like to be seen for and your preferred time? We'll get you booked in and confirm everything by phone. 🦷",
    1: "Hi Laura! Thanks for your enquiry. 😊 Our new-patient consultation is $59, which includes a full examination, and we'll discuss any treatment options and costs with you upfront - no surprises. If you go ahead with treatment, we'll always provide a clear written quote first. Would you like us to find you a convenient appointment?",
    2: "Hi Tom, thank you for the kind words about your treatment - we're so glad it went well! I'm sorry it was difficult to get a reply from us; that's not the standard we aim for, and we're working hard to respond faster across all our channels. If there's anything still outstanding, please call us at [phone] or reply here and we'll sort it straight away. Thank you for your patience and for choosing Smile Dental Care! 🙏",
    3: "Hi Aisha! 😊 Thanks for reaching out - yes, we're accepting new patients and we'd love to help with teeth whitening! We offer professional whitening that's safe and tailored to you, starting with a quick check to make sure your teeth and gums are healthy. Our whitening starts from $250. Shall we book you in for an initial consultation to get you that brighter smile? ✨",
  },
  contentTemplates: [
    { id: "daily-special", name: "Dental Tip of the Week", description: "Share an oral-health tip" },
    { id: "review-celebration", name: "Review Celebration", description: "Share positive patient reviews" },
    { id: "behind-scenes", name: "Meet the Team", description: "Introduce your dentists and staff" },
    { id: "customer-story", name: "Smile Story", description: "Highlight a smile transformation" },
    { id: "seasonal-menu", name: "Seasonal Offers", description: "Promote whitening & check-up offers" },
    { id: "event-announcement", name: "Service Announcement", description: "Announce new treatments & services" },
  ],
  sampleContent: {
    "daily-special": {
      instagram:
        "🦷 Dental Tip of the Week: Don't Skip the Floss! 🧵\n\nBrushing only cleans about 60% of your tooth surface. Daily flossing reaches the spots your brush can't, helping prevent gum disease and cavities.\n\n✅ Floss once a day\n✅ Be gentle along the gumline\n✅ Try interdental brushes if floss is tricky\n\nDue a check-up? Book with our friendly team today.\n\n#DentalTip #FlossDaily #HealthySmile #SmileDentalCare #OralHealth #PreventiveCare",
      facebook:
        "🦷 DENTAL TIP OF THE WEEK 🦷\n\nThis week's reminder: don't skip the floss! Brushing alone only cleans around 60% of each tooth - daily flossing reaches between teeth and along the gumline where cavities and gum disease often start.\n\nGentle, once-a-day flossing makes a big difference. If traditional floss is fiddly, interdental brushes are a great alternative.\n\nOverdue for a check-up? Our friendly team is here to help - send us a message to book! 😁",
    },
    "review-celebration": {
      instagram:
        '⭐⭐⭐⭐⭐ Thank you, David M.! ⭐⭐⭐⭐⭐\n\n"Always nervous about the dentist, but the team put me completely at ease. Painless and professional!" - David M.\n\nReviews like this mean so much! 💙 Thank you for trusting us with your smile.\n\n#PatientCare #FiveStars #GentleDentistry #ThankYou #SmileDentalCare #HealthySmiles',
      facebook:
        "🌟 PATIENT SPOTLIGHT 🌟\n\nWe're so grateful for this kind review from David M.:\n\n\"Always nervous about the dentist, but the team put me completely at ease. Painless and professional!\"\n\nDavid, thank you so much - helping nervous patients feel relaxed and cared for is something we take real pride in. We're honored to look after your smile! 💙\n\nTo all our patients - thank you for your trust!",
    },
  },
  stats: [
    { title: "Total Interactions", value: "1,156", change: "+18% this week", icon: MessageSquare, color: "text-blue-600" },
    { title: "Response Rate", value: "99.3%", change: "+28% with AI", icon: CheckCircle, color: "text-green-600" },
    { title: "Avg Response Time", value: "3.0 min", change: "-3.3 hrs saved", icon: Clock, color: "text-purple-600" },
    { title: "Booking Enquiries", value: "13.8%", change: "+2.2% this month", icon: TrendingUp, color: "text-orange-600" },
    { title: "Waiting for a Response", value: "11", change: "4 over 1 hour", icon: Hourglass, color: "text-amber-600" },
    { title: "Awaiting Reply", value: "6", change: "Customer replied back", icon: Inbox, color: "text-rose-600" },
  ],
  platformStats: [
    { platform: "Instagram", icon: Instagram, interactions: 312, responseRate: "98%", avgTime: "2.3 min", color: "text-pink-600", bgColor: "bg-pink-50" },
    { platform: "Facebook", icon: Facebook, interactions: 398, responseRate: "100%", avgTime: "1.8 min", color: "text-blue-600", bgColor: "bg-blue-50" },
    { platform: "Google Reviews", icon: Star, interactions: 102, responseRate: "98%", avgTime: "4.1 min", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { platform: "Website", icon: Globe, interactions: 188, responseRate: "99%", avgTime: "2.6 min", color: "text-green-600", bgColor: "bg-green-50" },
  ],
  recentActivity: [
    {
      id: 1,
      type: "instagram_dm",
      customer: "@james_w",
      content: "Do you have appointments available this Thursday?",
      response: "Hi James! Yes, we have openings at 9:30 AM and 1:00 PM this Thursday. Let us know what you'd like to be seen for and we'll book you in! 🦷",
      platform: "Instagram",
      timeAgo: "5 min ago",
      status: "responded",
    },
    {
      id: 2,
      type: "website_enquiry",
      customer: "Laura Bennett",
      content: "How much is your consultation?",
      response:
        "Hi Laura! Our new-patient consultation is $59, including a full exam, and we'll discuss any treatment costs upfront. Shall we find you a convenient time?",
      platform: "Website",
      timeAgo: "13 min ago",
      status: "responded",
    },
    {
      id: 3,
      type: "google_review",
      customer: "David M.",
      content: "Painless and professional - the team put me at ease.",
      response:
        "David, thank you so much! Helping nervous patients feel relaxed is something we take real pride in. We're honored to look after your smile! 💙",
      platform: "Google",
      timeAgo: "19 min ago",
      status: "responded",
    },
  ],
  healthScore: [
    { label: "Google review response rate", weight: 25, score: 95 },
    { label: "Average response time", weight: 20, score: 90 },
    { label: "Messages awaiting reply", weight: 20, score: 72 },
    { label: "Customer sentiment", weight: 15, score: 88 },
    { label: "Social engagement", weight: 10, score: 76 },
    { label: "Channel coverage", weight: 10, score: 85 },
  ],
}

const aesthetic: BusinessProfile = {
  id: "aesthetic",
  name: "Radiance Aesthetic Clinic",
  label: "Aesthetic Clinic",
  tagline: "Skin, injectables & advanced treatments",
  messages: [
    {
      id: 1,
      type: "instagram_dm",
      customer: "@ella_glows",
      avatar: "E",
      content: "Do you have appointments available this Thursday?",
      platform: "Instagram",
      platformIcon: Instagram,
      timeAgo: "4 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 2,
      type: "website_enquiry",
      customer: "Sophia Clarke",
      avatar: "S",
      content: "How much is your consultation?",
      platform: "Website",
      platformIcon: Globe,
      timeAgo: "12 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Nadia R.",
      avatar: "N",
      content: "Great treatment, but I struggled to get a reply.",
      platform: "Google",
      platformIcon: Star,
      timeAgo: "21 min ago",
      status: "pending",
      rating: 3,
      sentiment: "negative",
    },
    {
      id: 4,
      type: "facebook_message",
      customer: "Olivia Grant",
      avatar: "O",
      content: "Hi! I'm interested in anti-wrinkle treatment but it's my first time. Can you explain how it works?",
      platform: "Facebook",
      platformIcon: Facebook,
      timeAgo: "1 hour ago",
      status: "pending",
      sentiment: "positive",
    },
  ],
  aiResponses: {
    0: "Hi Ella! 😊 Thanks for reaching out! Yes, we do have availability this Thursday - we have openings at 10:00 AM and 3:30 PM. Could you let us know which treatment you're interested in and your preferred time? We'll get you booked in and confirm the details. ✨",
    1: "Hi Sophia! Great question. 😊 Our consultations are $40, which is fully redeemable against any treatment you go ahead with. During your consultation, one of our practitioners will assess your skin, discuss your goals, and create a personalised plan with clear pricing. Would you like us to book you in this week?",
    2: "Hi Nadia, thank you so much for the lovely feedback on your treatment - we're delighted with your results! I'm really sorry it was hard to get a reply from us; that's not the level of service we want to provide, and we're improving our response times across all channels. If there's anything you still need, please call us at [phone] or reply here and we'll help right away. Thank you for choosing Radiance! 🙏",
    3: "Hi Olivia! 😊 Thank you for reaching out - it's completely normal to have questions before your first treatment! Anti-wrinkle treatments work by gently relaxing the targeted muscles to soften fine lines, with natural-looking results that develop over 1-2 weeks. We always start with a thorough consultation to make sure it's right for you and answer everything. Our anti-wrinkle treatments start from $180. Shall we book you a consultation to chat it through? ✨",
  },
  contentTemplates: [
    { id: "daily-special", name: "Treatment of the Week", description: "Showcase a featured treatment" },
    { id: "review-celebration", name: "Review Celebration", description: "Share glowing client reviews" },
    { id: "behind-scenes", name: "Meet the Team", description: "Introduce your practitioners" },
    { id: "customer-story", name: "Skin Transformation", description: "Highlight a before & after" },
    { id: "seasonal-menu", name: "Seasonal Offers", description: "Promote seasonal skin packages" },
    { id: "event-announcement", name: "Event Announcement", description: "Announce open evenings & launches" },
  ],
  sampleContent: {
    "daily-special": {
      instagram:
        "✨ Treatment of the Week: The Radiance Hydrafacial! 💧\n\nDeeply cleanse, exfoliate, and hydrate in one relaxing treatment - leaving your skin glowing, plump, and refreshed with zero downtime.\n\n📍 Book this week\n💰 From $120\n⏰ Limited slots available\n\n#Hydrafacial #GlowingSkin #SkincareGoals #RadianceAesthetic #SkinHealth #NoDowntime",
      facebook:
        "✨ TREATMENT OF THE WEEK ✨\n\nThis week we're spotlighting our Radiance Hydrafacial - a deep cleanse, gentle exfoliation, and intense hydration all in one relaxing treatment. You'll leave glowing, with zero downtime!\n\nBook this week from $120. Spots are limited, so reserve early to treat your skin.\n\nReady for that fresh, dewy glow? Comment below or send us a message to book! 💧",
    },
    "review-celebration": {
      instagram:
        '⭐⭐⭐⭐⭐ Thank you, Emma K.! ⭐⭐⭐⭐⭐\n\n"My skin has never looked better! The team is so knowledgeable and made me feel completely comfortable." - Emma K.\n\nReviews like this make our day! 🥰 Thank you for trusting us with your skin.\n\n#ClientLove #FiveStars #SkinGoals #ThankYou #RadianceAesthetic #GlowUp',
      facebook:
        "🌟 CLIENT SPOTLIGHT 🌟\n\nWe're so grateful for this wonderful review from Emma K.:\n\n\"My skin has never looked better! The team is so knowledgeable and made me feel completely comfortable.\"\n\nEmma, thank you so much - helping you feel comfortable and confident is exactly what we aim for. We can't wait to see you again! 💕\n\nTo all our amazing clients - THANK YOU for your trust!",
    },
  },
  stats: [
    { title: "Total Interactions", value: "967", change: "+22% this week", icon: MessageSquare, color: "text-blue-600" },
    { title: "Response Rate", value: "99.0%", change: "+30% with AI", icon: CheckCircle, color: "text-green-600" },
    { title: "Avg Response Time", value: "2.8 min", change: "-3.5 hrs saved", icon: Clock, color: "text-purple-600" },
    { title: "Booking Enquiries", value: "14.6%", change: "+2.8% this month", icon: TrendingUp, color: "text-orange-600" },
    { title: "Waiting for a Response", value: "7", change: "2 over 1 hour", icon: Hourglass, color: "text-amber-600" },
    { title: "Awaiting Reply", value: "4", change: "Customer replied back", icon: Inbox, color: "text-rose-600" },
  ],
  platformStats: [
    { platform: "Instagram", icon: Instagram, interactions: 489, responseRate: "99%", avgTime: "1.9 min", color: "text-pink-600", bgColor: "bg-pink-50" },
    { platform: "Facebook", icon: Facebook, interactions: 224, responseRate: "100%", avgTime: "1.7 min", color: "text-blue-600", bgColor: "bg-blue-50" },
    { platform: "Google Reviews", icon: Star, interactions: 88, responseRate: "98%", avgTime: "3.7 min", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { platform: "Website", icon: Globe, interactions: 166, responseRate: "99%", avgTime: "2.5 min", color: "text-green-600", bgColor: "bg-green-50" },
  ],
  recentActivity: [
    {
      id: 1,
      type: "instagram_dm",
      customer: "@ella_glows",
      content: "Do you have appointments available this Thursday?",
      response: "Hi Ella! Yes, we have openings at 10:00 AM and 3:30 PM this Thursday. Let us know which treatment you're interested in and we'll book you in! ✨",
      platform: "Instagram",
      timeAgo: "4 min ago",
      status: "responded",
    },
    {
      id: 2,
      type: "website_enquiry",
      customer: "Sophia Clarke",
      content: "How much is your consultation?",
      response:
        "Hi Sophia! Our consultation is $40, fully redeemable against any treatment. We'll assess your skin and create a personalised plan. Shall we book you in this week?",
      platform: "Website",
      timeAgo: "12 min ago",
      status: "responded",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Emma K.",
      content: "My skin has never looked better - the team is so knowledgeable!",
      response:
        "Emma, thank you so much! Helping you feel comfortable and confident is exactly what we aim for. We can't wait to see you again! 💕",
      platform: "Google",
      timeAgo: "18 min ago",
      status: "responded",
    },
  ],
  healthScore: [
    { label: "Google review response rate", weight: 25, score: 90 },
    { label: "Average response time", weight: 20, score: 92 },
    { label: "Messages awaiting reply", weight: 20, score: 82 },
    { label: "Customer sentiment", weight: 15, score: 86 },
    { label: "Social engagement", weight: 10, score: 94 },
    { label: "Channel coverage", weight: 10, score: 82 },
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
    { title: "Waiting for a Response", value: "9", change: "3 over 1 hour", icon: Hourglass, color: "text-amber-600" },
    { title: "Awaiting Reply", value: "5", change: "Customer replied back", icon: Inbox, color: "text-rose-600" },
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
  healthScore: [
    { label: "Google review response rate", weight: 25, score: 88 },
    { label: "Average response time", weight: 20, score: 85 },
    { label: "Messages awaiting reply", weight: 20, score: 76 },
    { label: "Customer sentiment", weight: 15, score: 90 },
    { label: "Social engagement", weight: 10, score: 92 },
    { label: "Channel coverage", weight: 10, score: 78 },
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
    { title: "Waiting for a Response", value: "10", change: "4 over 1 hour", icon: Hourglass, color: "text-amber-600" },
    { title: "Awaiting Reply", value: "6", change: "Customer replied back", icon: Inbox, color: "text-rose-600" },
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
  healthScore: [
    { label: "Google review response rate", weight: 25, score: 94 },
    { label: "Average response time", weight: 20, score: 89 },
    { label: "Messages awaiting reply", weight: 20, score: 70 },
    { label: "Customer sentiment", weight: 15, score: 87 },
    { label: "Social engagement", weight: 10, score: 74 },
    { label: "Channel coverage", weight: 10, score: 88 },
  ],
}

export const businessProfiles: Record<BusinessType, BusinessProfile> = {
  salon,
  clinic,
  hairsalon,
  dental,
  aesthetic,
}

export const businessTypeOptions: { value: BusinessType; label: string }[] = [
  { value: "salon", label: salon.label },
  { value: "clinic", label: clinic.label },
  { value: "hairsalon", label: hairsalon.label },
  { value: "dental", label: dental.label },
  { value: "aesthetic", label: aesthetic.label },
]
