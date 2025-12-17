import { ProductDetails, Review, RelatedProduct } from './types';

export const WHATSAPP_NUMBER = "919226740297"; // Updated number
export const INSTAGRAM_HANDLE = "thetidbit.in";
export const LOGO_URL = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765969614/canva-_logo-_bykbip.png";
export const ARTISAN_STORY_IMAGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765956721/Dec_17_2025_01_01_22_PM_sdkox1.png";
export const ARTISAN_SPOTLIGHT_IMAGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957946/ChatGPT_Image_Dec_17_2025_01_22_13_PM_ymwkfv.png";
export const MISSION_IMAGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765963603/generated-image_stxalr.jpg";
export const AMAZON_PRODUCT_URL = "https://www.amazon.in/dp/B0DWGWX248?th=1";
export const AMAZON_STORE_URL = "https://www.amazon.in/stores/VisitTHETIDBIT/page/13388266-8AB4-473E-8B9B-58BB90AC3114?lp_asin=B0DY2M7HHZ&ref_=ast_bln";

// GOOGLE ANALYTICS ID - Replace this with your actual Measurement ID (starts with G-)
export const GA_TRACKING_ID = "G-6ZVW69DQG4"; 

export const VALID_COUPONS = ["SANDY5", "OCEAN5", "NEWYEAR5"];

/*
  GEMINI IMAGE GENERATION PROMPTS
  -------------------------------
  Use these prompts to generate the specific assets for this website.
  
  1. HERO IMAGE 
     Resolution: 4k (3840x2160) or 1920x1080
     Aspect Ratio: 16:9
     Prompt: "Generate a photorealistic lifestyle image based on this uploaded bag. Show a stylish young Indian woman (age 20-25) wearing this jute sling bag across her body. She is walking through a sunlit vibrant street market in Jaipur or a lush garden cafe. She is wearing a white cotton kurti with jeans or a boho floral maxi dress. The lighting should be golden hour, warm, and natural. Focus on the bag and her happy, candid expression. Authentic fashion photography, high resolution 4k."

  2. PRODUCT STUDIO SHOT
     Resolution: 2048x2048
     Aspect Ratio: 1:1
     Prompt: "Create a high-end product photography shot of this jute bag. Place the bag upright on a natural beige stone podium or a rustic wooden table. Surround it with subtle props like dried pampas grass, a small clay vase, or raw jute twine to emphasize the eco-friendly theme. The background should be a soft, neutral beige or off-white wall with dappled sunlight shadows (gobo effect). Resolution 2048x2048, sharp focus on embroidery texture."

  3. ARTISAN STORY (Process)
     Resolution: 4k (3840x2160)
     Aspect Ratio: 4:3 or 16:9
     Prompt: "Cinematic close-up shot focusing on the details of this jute bag. Show the hands of an artisan (older Indian woman) holding the bag or adding a final embroidery stitch. The lighting should be warm and moody, resembling a workshop environment. Deeply textured, focus on the rough jute texture and the colorful threads. High Resolution 4k."

  4. SOCIAL MEDIA FLAT LAY
     Resolution: 1080x1920
     Aspect Ratio: 9:16
     Prompt: "Aesthetic flat lay photography of this jute bag placed on a textured white linen sheet. Arrange everyday essentials next to it spilling out slightly: a pair of sunglasses, a small notebook, a lip balm, and an iced coffee. Soft, diffused morning light. Minimalist, boho-chic style. Resolution 1080x1920."

  5. ARTISAN SPOTLIGHT (Lakshmi Devi)
     Resolution: 1536x2048
     Aspect Ratio: 3:4
     Prompt: "A cinematic portrait of Lakshmi Devi, a 60-year-old master artisan weaver from rural West Bengal, India. She has a warm, dignified smile and wise eyes, wearing a traditional beige and red cotton saree. She is sitting in a sunlit rustic workshop, holding a handcrafted jute bag with embroidery in her lap. Her hands look weathered and skilled. The background is slightly blurred, showing wooden looms and colorful spools of thread. Warm natural lighting, high dynamic range, photorealistic, 4k."

  6. MISSION SECTION (About Us)
     Resolution: 1920x1440
     Aspect Ratio: 4:3
     Prompt: "A cinematic, high-resolution shot symbolizing the bridge between traditional craftsmanship and modern sustainable fashion. In the foreground, a beautifully handcrafted round jute bag with colorful embroidery sits on a rustic wooden table. Next to it are raw golden jute fibers, a vintage wooden loom shuttle, and a small potted green plant, emphasizing eco-friendliness. Soft, golden-hour sunlight streams from a nearby window, illuminating the coarse texture of the jute and creating warm, inviting shadows. The background is a blurred, modern, airy minimalist living space. Photorealistic, 8k, highly detailed texture, warm earth tones."

  7. LOGO (Bharat.style)
     Resolution: 1024x1024
     Aspect Ratio: 1:1
     Prompt: "A modern, minimalist logo design for a sustainable fashion brand called 'Bharat.style'. The typography should be an elegant, bold serif font in deep forest green. Integrated with the text, include a subtle, artistic line-art icon of a jute leaf or a woven thread knot to symbolize handmade craftsmanship. The aesthetic should be organic, earthy, and premium. Vector style, flat design, white background, high quality."
*/

// Model Shots (Lifestyle)
const MODEL_RED = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765954770/ChatGPT_Image_Dec_17_2025_12_27_11_PM_afaonp.png";
const MODEL_BLUE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765955249/ChatGPT_Image_Dec_17_2025_12_37_13_PM_qehis4.png";
const MODEL_ORANGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765954852/ChatGPT_Image_Dec_17_2025_12_29_52_PM_hvhrpr.png";
const MODEL_PINK = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765953950/ChatGPT_Image_Dec_17_2025_12_11_00_PM_q6o0lb.png";

// Product Shots (Studio)
const PRODUCT_RED = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765955675/ChatGPT_Image_Dec_17_2025_12_42_23_PM_bzyc2j.png";
const PRODUCT_BLUE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765956077/ChatGPT_Image_Dec_17_2025_12_50_33_PM_qwxlgg.png";
const PRODUCT_ORANGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765956007/ChatGPT_Image_Dec_17_2025_12_49_52_PM_rc26b1.png";
const PRODUCT_PINK = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765956545/Gemini_Generated_Image_ackyldackyldacky_aqxskq.png";

// Flat Lay Shots (Social Media)
const FLATLAY_RED = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957206/ChatGPT_Image_Dec_17_2025_01_08_48_PM_cy6ief.png";
const FLATLAY_BLUE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957071/ChatGPT_Image_Dec_17_2025_01_07_39_PM_htm9c5.png";
const FLATLAY_PINK = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957307/ChatGPT_Image_Dec_17_2025_01_11_31_PM_ctiz6t.png";
const FLATLAY_ORANGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957494/ChatGPT_Image_Dec_17_2025_01_14_23_PM_tka0i4.png";

export const PRODUCT: ProductDetails = {
  id: "jute-round-sling-001",
  brand: "TheTidbit",
  name: "Handmade Jute Embroidered Round Sling Bag",
  tagline: "Eco-Friendly • Artistic • Boho-Inspired Crossbody Bag",
  price: 399,
  mrp: 1199,
  discountPercentage: 67,
  category: ["Women", "Handbags", "Sling / Crossbody Bags"],
  material: "Natural Jute with Cotton Lining",
  shape: "Round",
  dimensions: "20 × 20 × 1 cm",
  weight: "310 g",
  origin: "India",
  returnPolicy: "10 Days Return & Exchange",
  delivery: "Free Delivery",
  features: [
    "Handcrafted jute sling bag with intricate embroidery",
    "Eco-friendly and sustainable material",
    "Lightweight yet spacious for daily essentials",
    "Adjustable strap for shoulder or crossbody wear",
    "Unique boho design – every piece is slightly different"
  ],
  colors: [
    { 
      name: "Ruby Red", 
      hex: "#DC2626", 
      id: "red",
      images: [
        MODEL_RED, 
        PRODUCT_RED,
        FLATLAY_RED
      ]
    },
    { 
      name: "Ocean Blue", 
      hex: "#3B82F6", 
      id: "blue",
      images: [
        MODEL_BLUE, 
        PRODUCT_BLUE,
        FLATLAY_BLUE
      ]
    },
    { 
      name: "Skin Orange", 
      hex: "#FFA07A", 
      id: "skin-orange",
      images: [
        MODEL_ORANGE, 
        PRODUCT_ORANGE,
        FLATLAY_ORANGE
      ]
    },
    { 
      name: "Blush Pink", 
      hex: "#EC4899", 
      id: "pink",
      images: [
        MODEL_PINK, 
        PRODUCT_PINK,
        FLATLAY_PINK
      ]
    },
  ]
};

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Ananya S.",
    rating: 5,
    text: "Absolutely in love with this bag! The embroidery is so detailed and it fits my phone, wallet, and keys perfectly. Feels great to use something eco-friendly.",
    date: "2 days ago"
  },
  {
    id: 2,
    author: "Priya M.",
    rating: 5,
    text: "Ordered the Pink one for college. It's super cute and lightweight. Got so many compliments already!",
    date: "1 week ago"
  },
  {
    id: 3,
    author: "Riya K.",
    rating: 4,
    text: "Good quality jute. The strap length is perfect. Delivery was super fast.",
    date: "2 weeks ago"
  }
];

export const NEW_ARRIVALS: RelatedProduct[] = [
  {
    id: "boho-tote-002",
    name: "Classic Jute Shopper Tote",
    price: 599,
    mrp: 1499,
    image: "https://picsum.photos/seed/tote1/400/500",
    tag: "Bestseller"
  },
  {
    id: "clutch-003",
    name: "Embroidered Evening Clutch",
    price: 399,
    mrp: 899,
    image: "https://picsum.photos/seed/clutch1/400/500",
    tag: "New"
  },
  {
    id: "sling-sq-004",
    name: "Square Patchwork Sling",
    price: 499,
    mrp: 1299,
    image: "https://picsum.photos/seed/sling2/400/500",
    tag: "Limited Ed."
  },
  {
    id: "pouch-005",
    name: "Eco Mini Coin Pouch",
    price: 149,
    mrp: 299,
    image: "https://picsum.photos/seed/pouch1/400/500"
  }
];