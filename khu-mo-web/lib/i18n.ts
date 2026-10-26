import type { GalleryKey, ProductKey } from "@/lib/site-config";

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
    story: string;
    product: string;
    process: string;
    gallery: string;
    contact: string;
    enquire: string;
    menu: string;
    close: string;
    language: string;
    primaryLabel: string;
    mobileLabel: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    logoAlt: string;
  };
  story: {
    eyebrow: string;
    title: string;
    body: string;
    pillars: string[];
    imageAlt: string;
  };
  product: {
    eyebrow: string;
    title: string;
    enquire: string;
    categories: Record<ProductCategory, string>;
    items: Record<ProductKey, { name: string; blurb: string; category: ProductCategory }>;
  };
  process: {
    eyebrow: string;
    title: string;
    imageAlt: string;
    steps: { title: string; detail: string }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    captions: Record<GalleryKey, string>;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    imageAlt: string;
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
    options: {
      general: string;
      product: string;
      events: string;
      trade: string;
    };
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
  footer: {
    heritage: string;
    contact: string;
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
      story: "Câu chuyện",
      product: "Sản phẩm",
      process: "Quy trình",
      gallery: "Hình ảnh",
      contact: "Liên hệ",
      enquire: "Tư vấn",
      menu: "Menu",
      close: "Đóng",
      language: "Ngôn ngữ",
      primaryLabel: "Điều hướng chính",
      mobileLabel: "Điều hướng di động",
    },
    hero: {
      tagline: "Khu Mỏ Distillery",
      title: "Tôi luyện dưới lòng đất. Bản lĩnh trên đỉnh cao.",
      subtitle:
        "Rượu thủ công cao cấp mang tinh thần núi rừng Việt Nam, kết hợp di sản nguyên bản và kỹ thuật hiện đại.",
      primaryCta: "Tư vấn",
      secondaryCta: "Khám phá sản phẩm",
      logoAlt: "Logo Rượu Khu Mỏ Distillery",
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
    product: {
      eyebrow: "Nổi bật",
      title: "Sản phẩm small-batch với cá tính riêng",
      enquire: "Tư vấn",
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
    process: {
      eyebrow: "Chế tác",
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
    gallery: {
      eyebrow: "Bộ sưu tập",
      title: "Góc nhìn từ nguyên liệu, quy trình và khoảnh khắc",
      captions: {
        distillery: "Xưởng chưng cất",
        "highland-dusk": "Highland Reserve lúc hoàng hôn",
        "copper-blossom": "Copper Bloom giữa mùa hoa",
        "river-frost": "River Stone trong sương giá",
        brand: "Dấu ấn Khu Mỏ",
      },
    },
    contact: {
      eyebrow: "Liên hệ",
      title: "Đồng hành cùng ly rượu tiếp theo của bạn",
      intro:
        "Cho chúng tôi biết nhu cầu của bạn, đội ngũ sẽ phản hồi với thông tin sản phẩm, gợi ý và hướng dẫn tiếp theo.",
      imageAlt: "Xưởng chưng cất Khu Mỏ",
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
        general: "Tổng quan",
        product: "Sản phẩm",
        events: "Sự kiện",
        trade: "Thương mại",
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
    footer: {
      heritage: "Bắt rễ từ lửa nghề truyền thống, hoàn thiện cho nghi thức hiện đại.",
      contact: "Liên hệ",
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
      story: "Story",
      product: "Product",
      process: "Process",
      gallery: "Gallery",
      contact: "Contact",
      enquire: "Enquire",
      menu: "Menu",
      close: "Close",
      language: "Language",
      primaryLabel: "Primary",
      mobileLabel: "Mobile navigation",
    },
    hero: {
      tagline: "Khu Mo Distillery",
      title: "Forged Below. Owned Above.",
      subtitle:
        "Premium craft liquor from Vietnam's mountain spirit tradition, made with raw heritage and modern precision.",
      primaryCta: "Enquire",
      secondaryCta: "Explore Product",
      logoAlt: "Khu Mo Distillery logo",
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
    product: {
      eyebrow: "Featured",
      title: "Small-batch spirits with distinct character",
      enquire: "Enquire",
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
    process: {
      eyebrow: "Craft",
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
    gallery: {
      eyebrow: "Gallery",
      title: "Visual notes from place and process",
      captions: {
        distillery: "The distillery floor",
        "highland-dusk": "Highland Reserve at dusk",
        "copper-blossom": "Copper Bloom in blossom season",
        "river-frost": "River Stone, frost-clear",
        brand: "The Khu Mo mark",
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Let us help with your next pour",
      intro:
        "Share what you are looking for and our team will get back with availability, recommendations, and next steps.",
      imageAlt: "The Khu Mo distillery",
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
        general: "General",
        product: "Product",
        events: "Events",
        trade: "Trade",
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
    footer: {
      heritage: "Rooted in ancestral fire, crafted for modern ritual.",
      contact: "Contact",
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
