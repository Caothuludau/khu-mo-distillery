import type { Interest } from "@/lib/contact";
import type { ProductKey, SlideKey } from "@/lib/site-config";

export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

type ProductCategory = "signature" | "limited" | "contemporary";

type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    home: string;
    discover: string;
    story: string;
    visit: string;
    process: string;
    openMenu: string;
    close: string;
    menuLabel: string;
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    search: string;
    account: string;
    wishlist: string;
  };
  hero: {
    label: string;
    previous: string;
    next: string;
    goTo: string;
    pause: string;
    play: string;
    scrollHint: string;
    slides: Record<SlideKey, { title: string; description: string }>;
  };
  discover: {
    eyebrow: string;
    title: string;
    previous: string;
    next: string;
    enquire: string;
    addToWishlist: string;
    removeFromWishlist: string;
    categories: Record<ProductCategory, string>;
    items: Record<ProductKey, { name: string; blurb: string; category: ProductCategory }>;
  };
  story: {
    eyebrow: string;
    title: string;
    body: string;
    pillars: string[];
    imageAlt: string;
  };
  visit: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    videoLabel: string;
  };
  process: {
    eyebrow: string;
    title: string;
    imageAlt: string;
    steps: { title: string; detail: string }[];
  };
  enquiry: {
    visitTitle: string;
    visitIntro: string;
    productTitle: string;
    productIntro: string;
  };
  contact: {
    labels: {
      name: string;
      email: string;
      phone: string;
      interest: string;
      message: string;
    };
    placeholders: {
      phone: string;
    };
    options: Record<Interest, string>;
    productPrefill: string;
    buttonIdle: string;
    buttonSending: string;
    success: string;
    error: string;
    rateLimited: string;
    validation: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
  };
  search: {
    label: string;
    placeholder: string;
    empty: string;
    hint: string;
  };
  account: {
    signInTitle: string;
    registerTitle: string;
    name: string;
    email: string;
    password: string;
    signIn: string;
    register: string;
    toRegister: string;
    toSignIn: string;
    comingSoon: string;
  };
  wishlist: {
    title: string;
    empty: string;
    remove: string;
    enquire: string;
    count: string;
  };
  footer: {
    heritage: string;
    privacy: string;
    terms: string;
  };
  legal: {
    privacyTitle: string;
    privacyDescription: string;
    privacyBody1: string;
    privacyBody2: string;
    termsTitle: string;
    termsDescription: string;
    termsBody1: string;
    termsBody2: string;
    backHome: string;
  };
  notFound: {
    title: string;
    body: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  vi: {
    meta: {
      title: "Khu Mỏ — Tôi luyện dưới lòng đất. Bản lĩnh trên đỉnh cao.",
      description:
        "Rượu thủ công cao cấp với di sản nguyên bản và tinh thần hiện đại. Tôi luyện dưới lòng đất, bản lĩnh trên đỉnh cao.",
      ogLocale: "vi_VN",
    },
    nav: {
      home: "Trang chủ Khu Mỏ",
      discover: "Khám phá",
      story: "Câu chuyện",
      visit: "Tham quan",
      process: "Chế tác",
      openMenu: "Mở menu",
      close: "Đóng",
      menuLabel: "Điều hướng",
      language: "Ngôn ngữ",
      theme: "Giao diện",
      themeLight: "Sáng",
      themeDark: "Tối",
      search: "Tìm kiếm",
      account: "Đăng nhập / Đăng ký",
      wishlist: "Yêu thích",
    },
    hero: {
      label: "Hình ảnh nổi bật",
      previous: "Ảnh trước",
      next: "Ảnh tiếp theo",
      goTo: "Xem ảnh {n}",
      pause: "Tạm dừng trình chiếu",
      play: "Tiếp tục trình chiếu",
      scrollHint: "Cuộn xuống",
      slides: {
        highland: {
          title: "Highland Reserve",
          description: "Hậu vị khói nhẹ, sinh ra từ đá núi và lửa hoàng hôn.",
        },
        craft: {
          title: "Xưởng chưng cất",
          description: "Nơi nồi đồng và sự kiên nhẫn tôi luyện từng mẻ rượu.",
        },
        bloom: {
          title: "Copper Bloom",
          description: "Hương hoa mùa xuân, ấm áp và tinh tế.",
        },
        frost: {
          title: "River Stone",
          description: "Trong trẻo như sương giá, dành cho những ly cocktail cao cấp.",
        },
      },
    },
    discover: {
      eyebrow: "Khám phá",
      title: "Những dòng rượu làm nên Khu Mỏ",
      previous: "Sản phẩm trước",
      next: "Sản phẩm tiếp theo",
      enquire: "Tư vấn",
      addToWishlist: "Thêm vào yêu thích",
      removeFromWishlist: "Bỏ khỏi yêu thích",
      categories: {
        signature: "Dấu ấn thương hiệu",
        limited: "Giới hạn",
        contemporary: "Đương đại",
      },
      items: {
        "highland-reserve": {
          name: "Highland Reserve",
          blurb: "Hậu vị khói nhẹ, khô, với nhiều tầng hương ngũ cốc.",
          category: "signature",
        },
        "copper-bloom": {
          name: "Copper Bloom",
          blurb: "Hương hoa, gia vị mềm và khoáng chất ấm áp.",
          category: "limited",
        },
        "river-stone": {
          name: "River Stone",
          blurb: "Hương vị sạch, phù hợp cocktail và phục vụ cao cấp.",
          category: "contemporary",
        },
      },
    },
    story: {
      eyebrow: "Di sản",
      title: "Câu chuyện được tạo nên từ độ cao và lửa",
      body: "Khu Mỏ bắt đầu nơi không khí núi rừng se lạnh, nguyên liệu chân thật, và nghề làm rượu gắn liền với đời sống cộng đồng. Mỗi chai rượu là tri thức truyền đời được tinh chỉnh cho vị giác hiện đại.",
      pillars: [
        "Nguồn gốc: truyền thống làng núi được gìn giữ qua nhiều thế hệ.",
        "Chế tác: chưng cất nồi đồng, ủ chậm để cân bằng và tạo chiều sâu.",
        "Đẳng cấp: sản xuất giới hạn, tuyển chọn chất lượng nghiêm ngặt.",
        "Nghi thức: dành cho những khoảnh khắc kết nối, quà tặng và lễ kỷ niệm.",
      ],
      imageAlt: "Bên trong xưởng chưng cất Khu Mỏ với nồi đồng và bồn inox",
    },
    visit: {
      eyebrow: "Tham quan",
      title: "Ghé thăm xưởng rượu Khu Mỏ",
      body: "Tận mắt xem nồi đồng hoạt động, nghe câu chuyện của người thợ, và nếm thử những mẻ rượu mới nhất ngay tại xưởng.",
      cta: "Đặt lịch tham quan",
      videoLabel: "Video giới thiệu xưởng rượu Khu Mỏ",
    },
    process: {
      eyebrow: "Quy trình & Đam mê",
      title: "Từ nguyên liệu thô đến ly rượu nghi thức",
      imageAlt: "Khu vực chưng cất và ủ rượu tại xưởng Khu Mỏ",
      steps: [
        { title: "Nguyên liệu", detail: "Lựa chọn ngũ cốc và thảo mộc địa phương theo từng mẻ." },
        { title: "Lên men", detail: "Lên men chậm để tạo tầng hương phức hợp." },
        { title: "Chưng cất", detail: "Chưng cất nồi đồng để tối ưu độ trong và chiều sâu." },
        { title: "Ủ", detail: "Ủ có kiểm soát để hương vị mềm mại và hài hòa." },
        { title: "Đóng chai", detail: "Cân chỉnh nồng độ, kiểm định và hoàn thiện thủ công." },
      ],
    },
    enquiry: {
      visitTitle: "Đặt lịch tham quan",
      visitIntro: "Để lại thông tin, đội ngũ Khu Mỏ sẽ liên hệ để chốt lịch phù hợp với bạn.",
      productTitle: "Tư vấn sản phẩm",
      productIntro: "Cho chúng tôi biết nhu cầu của bạn, đội ngũ sẽ phản hồi với thông tin và gợi ý phù hợp.",
    },
    contact: {
      labels: {
        name: "Họ tên",
        email: "Email",
        phone: "Số điện thoại (tùy chọn)",
        interest: "Nhu cầu",
        message: "Nội dung",
      },
      placeholders: {
        phone: "Nhập số điện thoại",
      },
      options: {
        visit: "Tham quan xưởng",
        product: "Sản phẩm",
        events: "Sự kiện",
        trade: "Thương mại",
        general: "Khác",
      },
      productPrefill: "Tôi quan tâm đến sản phẩm {product}.",
      buttonIdle: "Gửi yêu cầu",
      buttonSending: "Đang gửi...",
      success: "Cảm ơn bạn. Chúng tôi đã nhận được yêu cầu.",
      error: "Không thể gửi yêu cầu. Vui lòng kiểm tra lại thông tin và thử lại.",
      rateLimited: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.",
      validation: {
        name: "Vui lòng nhập họ tên.",
        email: "Vui lòng nhập email hợp lệ.",
        phone: "Số điện thoại quá dài.",
        message: "Vui lòng chia sẻ thêm chi tiết.",
      },
    },
    search: {
      label: "Tìm sản phẩm",
      placeholder: "Tìm theo tên hoặc hương vị...",
      empty: "Không tìm thấy sản phẩm phù hợp.",
      hint: "Gợi ý",
    },
    account: {
      signInTitle: "Đăng nhập",
      registerTitle: "Đăng ký",
      name: "Họ tên",
      email: "Email",
      password: "Mật khẩu",
      signIn: "Đăng nhập",
      register: "Tạo tài khoản",
      toRegister: "Chưa có tài khoản? Đăng ký",
      toSignIn: "Đã có tài khoản? Đăng nhập",
      comingSoon: "Tính năng tài khoản đang được hoàn thiện và sẽ sớm ra mắt.",
    },
    wishlist: {
      title: "Danh sách yêu thích",
      empty: "Bạn chưa lưu sản phẩm nào. Nhấn biểu tượng trái tim ở mục Khám phá để lưu.",
      remove: "Bỏ khỏi yêu thích",
      enquire: "Tư vấn",
      count: "{n} sản phẩm yêu thích",
    },
    footer: {
      heritage: "Bắt rễ từ lửa nghề truyền thống, hoàn thiện cho nghi thức hiện đại.",
      privacy: "Chính sách bảo mật",
      terms: "Điều khoản sử dụng",
    },
    legal: {
      privacyTitle: "Chính sách bảo mật",
      privacyDescription: "Trang chính sách bảo mật tạm thời cho website Khu Mỏ.",
      privacyBody1:
        "Đây là bản nháp chính sách bảo mật cho website giới thiệu của Khu Mỏ. Bản chính thức sẽ mô tả dữ liệu được thu thập, mục đích sử dụng, và cách người dùng có thể yêu cầu cập nhật hoặc xóa dữ liệu.",
      privacyBody2:
        "Hiện tại, thông tin gửi qua form liên hệ chỉ được dùng để phản hồi và chăm sóc yêu cầu.",
      termsTitle: "Điều khoản sử dụng",
      termsDescription: "Trang điều khoản sử dụng tạm thời cho website Khu Mỏ.",
      termsBody1:
        "Đây là bản nháp điều khoản sử dụng cho website giới thiệu của Khu Mỏ. Bản chính thức sẽ bao gồm quy định sử dụng, quyền sở hữu nội dung, giới hạn trách nhiệm, và thông tin liên hệ pháp lý.",
      termsBody2:
        "Khi sử dụng website, người dùng đồng ý rằng thông tin sản phẩm và sự kiện có thể thay đổi, và cần được xác nhận trực tiếp trước khi đặt mua hoặc đặt lịch.",
      backHome: "Quay về trang chủ",
    },
    notFound: {
      title: "Không tìm thấy trang",
      body: "Trang bạn tìm không tồn tại hoặc đã được di chuyển.",
    },
  },
  en: {
    meta: {
      title: "Khu Mo — Forged Below. Owned Above.",
      description:
        "Premium craft liquor with raw heritage and modern sophistication. Forged below, owned above.",
      ogLocale: "en_US",
    },
    nav: {
      home: "Khu Mo home",
      discover: "Discover",
      story: "Story",
      visit: "Visit",
      process: "Process",
      openMenu: "Open menu",
      close: "Close",
      menuLabel: "Navigation",
      language: "Language",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      search: "Search",
      account: "Sign in / Register",
      wishlist: "Wishlist",
    },
    hero: {
      label: "Featured images",
      previous: "Previous image",
      next: "Next image",
      goTo: "Show image {n}",
      pause: "Pause slideshow",
      play: "Play slideshow",
      scrollHint: "Scroll",
      slides: {
        highland: {
          title: "Highland Reserve",
          description: "A gentle smoke, born of mountain stone and sunset fire.",
        },
        craft: {
          title: "The distillery",
          description: "Where copper stills and patience forge every batch.",
        },
        bloom: {
          title: "Copper Bloom",
          description: "Spring blossom on the nose, warm and refined.",
        },
        frost: {
          title: "River Stone",
          description: "Frost-clear and built for premium cocktails.",
        },
      },
    },
    discover: {
      eyebrow: "Discover",
      title: "The spirits that define Khu Mo",
      previous: "Previous product",
      next: "Next product",
      enquire: "Enquire",
      addToWishlist: "Add to wishlist",
      removeFromWishlist: "Remove from wishlist",
      categories: {
        signature: "Signature",
        limited: "Limited Batch",
        contemporary: "Contemporary",
      },
      items: {
        "highland-reserve": {
          name: "Highland Reserve",
          blurb: "Smoky, dry finish with layered grain depth.",
          category: "signature",
        },
        "copper-bloom": {
          name: "Copper Bloom",
          blurb: "Floral nose with soft spice and warm mineral notes.",
          category: "limited",
        },
        "river-stone": {
          name: "River Stone",
          blurb: "Clean profile built for cocktails and premium pours.",
          category: "contemporary",
        },
      },
    },
    story: {
      eyebrow: "Heritage",
      title: "A story shaped by altitude and fire",
      body: "Khu Mo begins where mountain air is cold, ingredients are honest, and spirit-making is part of communal life. Every bottle reflects ancestral knowledge refined for modern palates.",
      pillars: [
        "Origin: mountain village traditions preserved through family craft.",
        "Craft: copper still distillation, slow-rested for balance and depth.",
        "Status: small-batch production with strict quality selection.",
        "Ritual: designed for shared moments, gifting, and celebration.",
      ],
      imageAlt: "Inside the Khu Mo distillery with copper stills and steel tanks",
    },
    visit: {
      eyebrow: "Visit",
      title: "Visit the Khu Mo distillery",
      body: "See the copper stills at work, hear the makers' stories, and taste the latest batches right where they are made.",
      cta: "Book a visit",
      videoLabel: "Introduction video of the Khu Mo distillery",
    },
    process: {
      eyebrow: "Process & Passion",
      title: "From raw ingredient to ritual pour",
      imageAlt: "Distilling and resting area at the Khu Mo distillery",
      steps: [
        { title: "Raw", detail: "Locally sourced grains and botanicals selected per batch." },
        { title: "Ferment", detail: "Slow fermentation to build aromatic complexity." },
        { title: "Distill", detail: "Copper still passes tuned for clarity and depth." },
        { title: "Rest", detail: "Controlled resting to soften and harmonize the spirit." },
        { title: "Bottle", detail: "Final proofing, quality checks, and hand-finished bottling." },
      ],
    },
    enquiry: {
      visitTitle: "Book a visit",
      visitIntro: "Leave your details and the Khu Mo team will be in touch to confirm a time that suits you.",
      productTitle: "Product enquiry",
      productIntro: "Tell us what you are looking for and our team will reply with availability and recommendations.",
    },
    contact: {
      labels: {
        name: "Name",
        email: "Email",
        phone: "Phone (optional)",
        interest: "Interest",
        message: "Message",
      },
      placeholders: {
        phone: "Enter your phone number",
      },
      options: {
        visit: "Distillery visit",
        product: "Product",
        events: "Events",
        trade: "Trade",
        general: "Other",
      },
      productPrefill: "I'm interested in {product}.",
      buttonIdle: "Send Enquiry",
      buttonSending: "Sending...",
      success: "Thanks. We received your enquiry.",
      error: "We could not submit your enquiry. Please check your details and try again.",
      rateLimited: "Too many enquiries. Please try again in a few minutes.",
      validation: {
        name: "Please enter your name.",
        email: "Please enter a valid email.",
        phone: "Phone number is too long.",
        message: "Please share a bit more detail.",
      },
    },
    search: {
      label: "Search products",
      placeholder: "Search by name or flavour...",
      empty: "No matching products.",
      hint: "Suggestions",
    },
    account: {
      signInTitle: "Sign in",
      registerTitle: "Register",
      name: "Name",
      email: "Email",
      password: "Password",
      signIn: "Sign in",
      register: "Create account",
      toRegister: "New here? Create an account",
      toSignIn: "Already have an account? Sign in",
      comingSoon: "Accounts are coming soon.",
    },
    wishlist: {
      title: "Wishlist",
      empty: "Nothing saved yet. Tap the heart on a product in Discover to save it.",
      remove: "Remove from wishlist",
      enquire: "Enquire",
      count: "{n} saved products",
    },
    footer: {
      heritage: "Rooted in ancestral fire, crafted for modern ritual.",
      privacy: "Privacy",
      terms: "Terms",
    },
    legal: {
      privacyTitle: "Privacy Policy",
      privacyDescription: "Privacy policy placeholder for Khu Mo brochure website.",
      privacyBody1:
        "This is a placeholder privacy policy for the Khu Mo brochure website. The final policy will describe what personal data is collected, how it is used, and how visitors can request updates or deletion of their information.",
      privacyBody2:
        "For now, enquiries submitted through the contact form are handled only for response and follow-up purposes.",
      termsTitle: "Terms of Use",
      termsDescription: "Terms of use placeholder for Khu Mo brochure website.",
      termsBody1:
        "This is a placeholder terms page for the Khu Mo brochure website. The final terms will cover permitted site usage, content ownership, liability limitations, and contact details for legal inquiries.",
      termsBody2:
        "By using this website, visitors acknowledge that product and event information may change and should be confirmed directly before placing any order or booking.",
      backHome: "Back to home",
    },
    notFound: {
      title: "Page not found",
      body: "The page you are looking for does not exist or has moved.",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Canonical + hreflang alternates for a locale-prefixed path such as "" or "/legal/terms". */
export function getLocaleAlternates(locale: Locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((value) => [value, `/${value}${path}`])),
      "x-default": `/${DEFAULT_LOCALE}${path}`,
    },
  };
}
