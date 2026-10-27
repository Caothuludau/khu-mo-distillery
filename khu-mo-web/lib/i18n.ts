import type { EnquiryMessages, Interest } from "@/lib/contact";
import type { CategoryKey, PackagingKey } from "@/lib/products";
import type { SalesPoint, SlideKey } from "@/lib/site-config";

export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const LEGAL_DOCS = ["privacy", "terms", "cookies", "shipping"] as const;
export type LegalDocKey = (typeof LEGAL_DOCS)[number];

type LegalDoc = {
  title: string;
  description: string;
  sections: { heading: string; body: string[] }[];
};

type Step = { title: string; detail: string };

type Dictionary = {
  meta: {
    siteName: string;
    title: string;
    description: string;
    ogLocale: string;
  };
  common: {
    updating: string;
    viewDetails: string;
    viewAll: string;
    backHome: string;
    close: string;
    breadcrumb: string;
    home: string;
  };
  nav: {
    home: string;
    products: string;
    story: string;
    whereToBuy: string;
    partners: string;
    homeLogo: string;
    openMenu: string;
    menuLabel: string;
    mainLabel: string;
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    switchToDark: string;
    switchToLight: string;
    search: string;
    orderCta: string;
  };
  ageGate: {
    title: string;
    body: string;
    confirm: string;
    leave: string;
    note: string;
  };
  cookies: {
    label: string;
    body: string;
    acceptAll: string;
    rejectOptional: string;
    customize: string;
    save: string;
    alwaysOn: string;
    policy: string;
    settings: string;
    categories: Record<"essential" | "analytics" | "marketing", { title: string; body: string }>;
  };
  hero: {
    label: string;
    previous: string;
    next: string;
    goTo: string;
    pause: string;
    play: string;
    scrollHint: string;
    slides: Record<SlideKey, { eyebrow: string; title: string; description: string; cta: string }>;
  };
  home: {
    productsEyebrow: string;
    productsTitle: string;
    productsIntro: string;
    viewProduct: string;
    browseCategory: string;
    storyEyebrow: string;
    storyTitle: string;
    storyBody: string;
    storyCta: string;
    qualityEyebrow: string;
    qualityTitle: string;
    qualityIntro: string;
    qualityCta: string;
    buyEyebrow: string;
    buyTitle: string;
    buyBody: string;
    buyPointsCta: string;
    buyEnquiryCta: string;
    partnerPrompt: string;
    partnerCta: string;
  };
  products: {
    title: string;
    intro: string;
    filters: string;
    showFilters: string;
    filterCategory: string;
    filterVolume: string;
    filterPackaging: string;
    all: string;
    clear: string;
    resultCount: string;
    loading: string;
    emptyTitle: string;
    emptyBody: string;
    categories: Record<CategoryKey, string>;
    packaging: Record<PackagingKey, string>;
    volume: string;
    packagingLabel: string;
    abv: string;
    price: string;
    ingredients: string;
    origin: string;
    colors: string;
    availability: string;
    available: string;
    unavailable: string;
    unavailableNote: string;
    contactForQuote: string;
    fromPrice: string;
    imagePending: string;
    info: string;
    packagingTitle: string;
    packagingNote: string;
    buyTitle: string;
    enquire: string;
    call: string;
    seePoints: string;
    bulkTitle: string;
    bulkBody: string;
    bulkCta: string;
    related: string;
    showImage: string;
  };
  story: {
    title: string;
    intro: string;
    storyEyebrow: string;
    storyTitle: string;
    storyBody: string[];
    imageAlt: string;
    values: Step[];
    processEyebrow: string;
    processTitle: string;
    processIntro: string;
    processImageAlt: string;
    steps: Step[];
    visitTitle: string;
    visitBody: string;
    visitCta: string;
    newsEyebrow: string;
    newsTitle: string;
    newsEmpty: string;
  };
  whereToBuy: {
    title: string;
    intro: string;
    pointsTitle: string;
    pointTypes: Record<SalesPoint["type"], string>;
    address: string;
    phone: string;
    hours: string;
    directions: string;
    pointsEmpty: string;
    deliveryTitle: string;
    deliveryBody: string[];
    deliveryPolicy: string;
    orderTitle: string;
    orderIntro: string;
    callUs: string;
  };
  partners: {
    title: string;
    intro: string;
    companyTitle: string;
    companyName: string;
    companyAddress: string;
    companyTaxCode: string;
    companyPhone: string;
    companyEmail: string;
    companyBody: string;
    viewCatalogue: string;
    distributionTitle: string;
    distributionBody: string;
    offers: string[];
    stepsTitle: string;
    steps: Step[];
    formTitle: string;
    formIntro: string;
  };
  enquiry: {
    titles: Record<Interest, string>;
    intros: Record<Interest, string>;
  };
  form: {
    labels: {
      interest: string;
      name: string;
      phone: string;
      email: string;
      product: string;
      packaging: string;
      quantity: string;
      company: string;
      area: string;
      message: string;
    };
    placeholders: {
      name: string;
      phone: string;
      email: string;
      quantity: string;
      company: string;
      area: string;
      message: string;
    };
    optional: string;
    required: string;
    notSelected: string;
    interests: Record<Interest, string>;
    consentBefore: string;
    consentLink: string;
    consentAfter: string;
    dataNote: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    errorTitle: string;
    errorBody: string;
    networkError: string;
    rateLimited: string;
    retry: string;
    validation: EnquiryMessages;
  };
  search: {
    label: string;
    placeholder: string;
    hint: string;
    noResults: string;
    noResultsHint: string;
    viewAll: string;
  };
  footer: {
    tagline: string;
    ageNotice: string;
    explore: string;
    buy: string;
    legal: string;
    process: string;
    news: string;
    delivery: string;
    order: string;
    partnerForm: string;
    rights: string;
  };
  legal: {
    draftNotice: string;
    docs: Record<LegalDocKey, LegalDoc>;
  };
  notFound: {
    title: string;
    body: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  vi: {
    meta: {
      siteName: "Rượu Khu Mỏ",
      title: "Rượu Khu Mỏ — Tinh thần vùng mỏ, dấu ấn trong từng giọt rượu",
      description:
        "Câu chuyện thương hiệu, nguồn gốc, các dòng sản phẩm và điểm bán của Rượu Khu Mỏ tại Cẩm Phả, Quảng Ninh.",
      ogLocale: "vi_VN",
    },
    common: {
      updating: "Đang cập nhật",
      viewDetails: "Xem chi tiết",
      viewAll: "Xem tất cả",
      backHome: "Quay về trang chủ",
      close: "Đóng",
      breadcrumb: "Đường dẫn",
      home: "Trang chủ",
    },
    nav: {
      home: "Trang chủ",
      products: "Sản phẩm",
      story: "Câu chuyện",
      whereToBuy: "Điểm bán",
      partners: "Đối tác",
      homeLogo: "Rượu Khu Mỏ — Trang chủ",
      openMenu: "Mở menu",
      menuLabel: "Menu",
      mainLabel: "Điều hướng chính",
      language: "Ngôn ngữ",
      theme: "Giao diện",
      themeLight: "Sáng",
      themeDark: "Tối",
      switchToDark: "Chuyển sang giao diện tối",
      switchToLight: "Chuyển sang giao diện sáng",
      search: "Tìm kiếm",
      orderCta: "Liên hệ đặt hàng",
    },
    ageGate: {
      title: "Bạn đã đủ 18 tuổi?",
      body: "Website có nội dung về đồ uống có cồn và chỉ dành cho người từ 18 tuổi trở lên.",
      confirm: "Tôi đã đủ 18 tuổi",
      leave: "Tôi chưa đủ 18 tuổi",
      note: "Không bán rượu cho người dưới 18 tuổi. Đã uống rượu bia, không lái xe.",
    },
    cookies: {
      label: "Thông báo cookie",
      body: "Website dùng bộ nhớ trình duyệt thiết yếu để ghi nhớ lựa chọn độ tuổi, giao diện và cài đặt cookie của bạn. Cookie phân tích hoặc quảng cáo chỉ được bật khi bạn đồng ý.",
      acceptAll: "Chấp nhận tất cả",
      rejectOptional: "Chỉ dùng thiết yếu",
      customize: "Tùy chỉnh",
      save: "Lưu lựa chọn",
      alwaysOn: "Luôn bật",
      policy: "Chính sách cookie",
      settings: "Cài đặt cookie",
      categories: {
        essential: {
          title: "Thiết yếu",
          body: "Cần để website hoạt động: ghi nhớ xác nhận độ tuổi, giao diện sáng/tối và lựa chọn cookie.",
        },
        analytics: {
          title: "Phân tích",
          body: "Giúp hiểu cách website được sử dụng để cải thiện nội dung. Hiện chưa sử dụng.",
        },
        marketing: {
          title: "Quảng cáo",
          body: "Dùng để đo lường hiệu quả quảng cáo. Hiện chưa sử dụng.",
        },
      },
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
        brand: {
          eyebrow: "Rượu · Văn hóa · Vùng mỏ",
          title: "Tinh thần vùng mỏ. Dấu ấn trong từng giọt rượu.",
          description: "Câu chuyện thương hiệu, nguồn gốc và các dòng sản phẩm của Rượu Khu Mỏ.",
          cta: "Khám phá thương hiệu",
        },
        distillery: {
          eyebrow: "Nguồn gốc",
          title: "Từ xưởng rượu ở Cẩm Phả, Quảng Ninh",
          description: "Nơi từng mẻ rượu được chưng cất, kiểm tra và đóng chai.",
          cta: "Xem quy trình",
        },
        product: {
          eyebrow: "Rượu nếp",
          title: "Rượu nếp nhiệt đới",
          description: "Chắt lọc tinh hoa trong chai nhãn xanh navy.",
          cta: "Xem sản phẩm",
        },
      },
    },
    home: {
      productsEyebrow: "Sản phẩm",
      productsTitle: "Các dòng sản phẩm",
      productsIntro: "Mỗi dòng rượu có màu nhãn riêng để dễ nhận biết trên kệ và trong hộp quà.",
      viewProduct: "Xem sản phẩm",
      browseCategory: "Xem theo danh mục",
      storyEyebrow: "Thương hiệu",
      storyTitle: "Về Rượu Khu Mỏ",
      storyBody:
        "Rượu Khu Mỏ ra đời tại Cẩm Phả, Quảng Ninh — vùng đất gắn với nghề mỏ qua nhiều thế hệ. Cái tên Khu Mỏ là lời tri ân với tinh thần bền bỉ, thẳng thắn và trọng nghĩa tình của người vùng mỏ.",
      storyCta: "Đọc câu chuyện",
      qualityEyebrow: "Chất lượng & nguồn gốc",
      qualityTitle: "Làm rượu chắc tay, từng bước một",
      qualityIntro: "Quy trình được thực hiện tại xưởng của Khu Mỏ, từ khâu chọn nguyên liệu đến khi đóng chai.",
      qualityCta: "Nguồn gốc và quy trình",
      buyEyebrow: "Mua hàng",
      buyTitle: "Tìm điểm bán và thông tin liên hệ",
      buyBody: "Xem địa chỉ bán hàng, gọi trực tiếp hoặc gửi yêu cầu để được báo giá và xác nhận giao hàng.",
      buyPointsCta: "Xem điểm bán",
      buyEnquiryCta: "Gửi yêu cầu mua hàng",
      partnerPrompt: "Đại lý, nhà hàng hoặc đơn vị phân phối?",
      partnerCta: "Hợp tác với Khu Mỏ",
    },
    products: {
      title: "Sản phẩm",
      intro: "Danh mục rượu của Khu Mỏ. Chọn sản phẩm để xem dung tích, quy cách đóng gói và cách mua.",
      filters: "Lọc sản phẩm",
      showFilters: "Bộ lọc",
      filterCategory: "Danh mục",
      filterVolume: "Dung tích",
      filterPackaging: "Quy cách",
      all: "Tất cả",
      clear: "Xóa bộ lọc",
      resultCount: "{n} sản phẩm",
      loading: "Đang tải danh sách sản phẩm",
      emptyTitle: "Chưa có sản phẩm phù hợp",
      emptyBody: "Không có sản phẩm nào khớp với các bộ lọc đã chọn. Hãy bỏ bớt bộ lọc để xem thêm.",
      categories: {
        traditional: "Rượu truyền thống",
        infused: "Rượu ngâm",
        other: "Dòng sản phẩm khác",
      },
      packaging: {
        bottle: "Chai lẻ",
        pack: "Pack",
        can: "Can",
      },
      volume: "Dung tích",
      packagingLabel: "Quy cách",
      abv: "Nồng độ cồn",
      price: "Giá",
      ingredients: "Thành phần",
      origin: "Nguồn gốc",
      colors: "Màu nhãn",
      availability: "Tình trạng",
      available: "Đang cung cấp",
      unavailable: "Tạm ngừng cung cấp",
      unavailableNote: "Sản phẩm hiện chưa thể đặt mua. Bạn có thể gửi yêu cầu để được báo khi có hàng.",
      contactForQuote: "Liên hệ báo giá",
      fromPrice: "Từ {price}",
      imagePending: "Ảnh sản phẩm đang cập nhật",
      info: "Thông tin sản phẩm",
      packagingTitle: "Quy cách đóng gói",
      packagingNote: "Các quy cách khác (pack, hộp quà) sẽ hiển thị khi được cung cấp.",
      buyTitle: "Mua sản phẩm này",
      enquire: "Gửi yêu cầu mua hàng",
      call: "Gọi {phone}",
      seePoints: "Xem điểm bán",
      bulkTitle: "Đặt cho tiệc, sự kiện?",
      bulkBody: "Cho chúng tôi biết quy cách và số lượng dự kiến để nhận báo giá, tồn kho và thời gian giao.",
      bulkCta: "Đặt số lượng lớn",
      related: "Sản phẩm khác",
      showImage: "Xem ảnh {n}",
    },
    story: {
      title: "Câu chuyện Khu Mỏ",
      intro: "Thương hiệu rượu sinh ra từ vùng mỏ Cẩm Phả, Quảng Ninh.",
      storyEyebrow: "Thương hiệu",
      storyTitle: "Sinh ra từ vùng mỏ",
      storyBody: [
        "Rượu Khu Mỏ ra đời tại Cẩm Phả, Quảng Ninh — nơi nhiều thế hệ gắn bó với nghề mỏ. Cái tên Khu Mỏ là lời tri ân với vùng đất ấy: bền bỉ, thẳng thắn và trọng nghĩa tình.",
        "Chúng tôi làm rượu theo cách người thợ mỏ làm việc: chắc tay, kỹ lưỡng và không đi đường tắt. Mỗi mẻ rượu đều được kiểm tra trước khi đóng chai và đến tay người thưởng thức.",
      ],
      imageAlt: "Bên trong xưởng rượu Khu Mỏ",
      values: [
        { title: "Nguồn gốc rõ ràng", detail: "Sản xuất và đóng chai tại xưởng của Khu Mỏ ở Cẩm Phả." },
        { title: "Chỉn chu", detail: "Bao bì và thông tin sản phẩm được trình bày rõ ràng, nhất quán." },
        { title: "Gắn với vùng mỏ", detail: "Lấy cảm hứng từ văn hóa và con người vùng mỏ Quảng Ninh." },
      ],
      processEyebrow: "Nguồn gốc và quy trình",
      processTitle: "Từ hạt nếp đến chai rượu",
      processIntro: "Các bước chính tại xưởng Khu Mỏ. Thông số kỹ thuật của từng sản phẩm được công bố tại trang chi tiết khi đã xác nhận.",
      processImageAlt: "Khu vực sản xuất tại xưởng Khu Mỏ",
      steps: [
        { title: "Chọn nguyên liệu", detail: "Chọn gạo nếp và nguyên liệu đầu vào cho từng mẻ." },
        { title: "Ủ men", detail: "Nấu nếp, trộn men và ủ cho lên men." },
        { title: "Chưng cất", detail: "Chưng cất để tách rượu, bỏ phần đầu và phần cuối." },
        { title: "Lắng lọc", detail: "Để rượu lắng, lọc trong và kiểm tra chất lượng." },
        { title: "Đóng chai", detail: "Đóng chai, dán nhãn và kiểm tra thành phẩm." },
      ],
      visitTitle: "Muốn tận mắt xem xưởng rượu?",
      visitBody: "Để lại thông tin, chúng tôi sẽ liên hệ để sắp xếp lịch tham quan phù hợp.",
      visitCta: "Đặt lịch tham quan",
      newsEyebrow: "Tin tức, hoạt động",
      newsTitle: "Hoạt động gần đây",
      newsEmpty: "Chưa có bài viết nào. Tin tức và hoạt động của Khu Mỏ sẽ được cập nhật tại đây.",
    },
    whereToBuy: {
      title: "Điểm bán",
      intro: "Mua Rượu Khu Mỏ tại các điểm bán dưới đây, hoặc liên hệ để đặt hàng và được xác nhận giao hàng.",
      pointsTitle: "Hệ thống điểm bán",
      pointTypes: {
        distillery: "Xưởng sản xuất",
        store: "Cửa hàng",
        agent: "Đại lý",
      },
      address: "Địa chỉ",
      phone: "Điện thoại",
      hours: "Giờ mở cửa",
      directions: "Chỉ đường",
      pointsEmpty: "Danh sách điểm bán đang được cập nhật. Vui lòng liên hệ để được hướng dẫn mua hàng.",
      deliveryTitle: "Thông tin giao hàng",
      deliveryBody: [
        "Khu Mỏ nhận đặt hàng qua điện thoại và form liên hệ. Phạm vi, thời gian và phí giao hàng được xác nhận cụ thể khi chúng tôi liên hệ lại, tùy theo địa chỉ và số lượng.",
        "Với đơn số lượng lớn cho tiệc cưới, liên hoan hay sự kiện, vui lòng gửi yêu cầu sớm để chúng tôi kiểm tra tồn kho và sắp xếp giao hàng.",
      ],
      deliveryPolicy: "Chính sách giao nhận và đổi trả",
      orderTitle: "Liên hệ đặt hàng",
      orderIntro: "Điền thông tin dưới đây. Chúng tôi sẽ liên hệ lại để xác nhận giá, tồn kho và giao hàng.",
      callUs: "Hoặc gọi trực tiếp",
    },
    partners: {
      title: "Đối tác",
      intro: "Thông tin doanh nghiệp và hợp tác phân phối dành cho đại lý, nhà hàng và đơn vị kinh doanh.",
      companyTitle: "Giới thiệu doanh nghiệp",
      companyName: "Tên doanh nghiệp",
      companyAddress: "Địa chỉ",
      companyTaxCode: "Mã số thuế",
      companyPhone: "Điện thoại",
      companyEmail: "Email",
      companyBody: "Rượu Khu Mỏ được sản xuất và phân phối bởi doanh nghiệp tại Cẩm Phả, Quảng Ninh.",
      viewCatalogue: "Xem danh mục sản phẩm",
      distributionTitle: "Hợp tác phân phối",
      distributionBody: "Chúng tôi tìm kiếm đại lý, cửa hàng và nhà hàng muốn đưa Rượu Khu Mỏ đến khách hàng của mình.",
      offers: [
        "Hồ sơ sản phẩm và thông tin doanh nghiệp để bạn xác minh thương hiệu.",
        "Chính sách phân phối và giá theo khu vực, gửi trực tiếp khi trao đổi.",
        "Hình ảnh và tài liệu giới thiệu sản phẩm cho điểm bán.",
      ],
      stepsTitle: "Quy trình hợp tác",
      steps: [
        { title: "Gửi yêu cầu", detail: "Điền form với thông tin doanh nghiệp và khu vực." },
        { title: "Trao đổi", detail: "Đầu mối phụ trách liên hệ để hiểu nhu cầu của bạn." },
        { title: "Nhận hồ sơ", detail: "Nhận hồ sơ sản phẩm và chính sách phù hợp." },
        { title: "Thống nhất", detail: "Thống nhất điều kiện và bắt đầu hợp tác." },
      ],
      formTitle: "Gửi yêu cầu hợp tác",
      formIntro: "Thông tin chỉ dùng để liên hệ trao đổi hợp tác.",
    },
    enquiry: {
      titles: {
        purchase: "Gửi yêu cầu mua hàng",
        bulk: "Đặt số lượng lớn",
        partner: "Gửi yêu cầu hợp tác",
        visit: "Đặt lịch tham quan",
        general: "Liên hệ",
      },
      intros: {
        purchase: "Chúng tôi sẽ liên hệ lại để xác nhận giá, tồn kho và giao hàng.",
        bulk: "Cho biết quy cách và số lượng dự kiến. Chúng tôi sẽ gửi báo giá, tồn kho và thời gian giao.",
        partner: "Thông tin chỉ dùng để liên hệ trao đổi hợp tác.",
        visit: "Để lại thông tin, chúng tôi sẽ liên hệ để sắp xếp lịch phù hợp.",
        general: "Chúng tôi sẽ phản hồi qua kênh liên hệ bạn cung cấp.",
      },
    },
    form: {
      labels: {
        interest: "Nhu cầu",
        name: "Họ và tên",
        phone: "Số điện thoại liên hệ",
        email: "Email",
        product: "Sản phẩm",
        packaging: "Quy cách",
        quantity: "Số lượng dự kiến",
        company: "Tên doanh nghiệp / cửa hàng",
        area: "Khu vực kinh doanh",
        message: "Ghi chú",
      },
      placeholders: {
        name: "Nhập họ và tên",
        phone: "Nhập số điện thoại",
        email: "ten@email.com",
        quantity: "Ví dụ: 24",
        company: "Nhập tên doanh nghiệp",
        area: "Ví dụ: Hạ Long, Quảng Ninh",
        message: "Dịp sử dụng, thời gian cần hàng, địa chỉ giao...",
      },
      optional: "không bắt buộc",
      required: "bắt buộc",
      notSelected: "Chưa chọn",
      interests: {
        purchase: "Mua hàng",
        bulk: "Đặt số lượng lớn (tiệc, sự kiện)",
        partner: "Hợp tác, phân phối",
        visit: "Tham quan xưởng",
        general: "Khác",
      },
      consentBefore: "Tôi đồng ý để Khu Mỏ dùng thông tin này để liên hệ phản hồi yêu cầu, theo ",
      consentLink: "chính sách quyền riêng tư",
      consentAfter: ".",
      dataNote: "Chỉ thu thập thông tin cần thiết để xử lý yêu cầu.",
      submit: "Gửi yêu cầu",
      sending: "Đang gửi...",
      successTitle: "Gửi yêu cầu thành công",
      successBody: "Yêu cầu đã được ghi nhận. Thông tin tiếp theo sẽ được gửi qua kênh liên hệ đã cung cấp.",
      sendAnother: "Gửi yêu cầu khác",
      errorTitle: "Không thể gửi yêu cầu",
      errorBody: "Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau hoặc sử dụng kênh liên hệ được cung cấp.",
      networkError: "Không có kết nối mạng. Kiểm tra kết nối rồi thử lại — thông tin bạn đã nhập vẫn được giữ.",
      rateLimited: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.",
      retry: "Thử lại",
      validation: {
        name: "Vui lòng nhập họ và tên (ít nhất 2 ký tự).",
        phone: "Vui lòng nhập số điện thoại hợp lệ, ví dụ 0912 345 678.",
        email: "Email chưa đúng định dạng, ví dụ ten@email.com.",
        quantity: "Số lượng chỉ gồm chữ số.",
        company: "Vui lòng nhập tên doanh nghiệp hoặc cửa hàng.",
        consent: "Vui lòng đồng ý để chúng tôi liên hệ phản hồi yêu cầu.",
        tooLong: "Nội dung quá dài.",
      },
    },
    search: {
      label: "Tìm sản phẩm",
      placeholder: "Nhập tên sản phẩm, ví dụ: rượu nếp",
      hint: "Gợi ý",
      noResults: "Không tìm thấy sản phẩm cho “{q}”.",
      noResultsHint: "Kiểm tra lại chính tả hoặc thử từ khóa ngắn hơn.",
      viewAll: "Xem tất cả sản phẩm",
    },
    footer: {
      tagline: "Tinh thần vùng mỏ. Dấu ấn trong từng giọt rượu.",
      ageNotice: "Chỉ dành cho người từ 18 tuổi trở lên. Đã uống rượu bia, không lái xe.",
      explore: "Khám phá",
      buy: "Mua hàng",
      legal: "Pháp lý",
      process: "Nguồn gốc và quy trình",
      news: "Tin tức, hoạt động",
      delivery: "Thông tin giao hàng",
      order: "Liên hệ đặt hàng",
      partnerForm: "Gửi yêu cầu hợp tác",
      rights: "© {year} Rượu Khu Mỏ.",
    },
    legal: {
      draftNotice:
        "Bản nháp — nội dung đang được rà soát theo quy định pháp luật Việt Nam và sẽ được cập nhật trước khi chính thức áp dụng.",
      docs: {
        privacy: {
          title: "Quyền riêng tư",
          description: "Cách Rượu Khu Mỏ thu thập và sử dụng thông tin cá nhân.",
          sections: [
            {
              heading: "Thông tin được thu thập",
              body: [
                "Khi bạn gửi form liên hệ, đặt hàng hoặc hợp tác, chúng tôi nhận họ tên, số điện thoại và các thông tin bạn tự nguyện cung cấp như email, tên doanh nghiệp, sản phẩm và ghi chú.",
                "Website không yêu cầu tạo tài khoản và không thu thập dữ liệu cá nhân nhạy cảm.",
              ],
            },
            {
              heading: "Mục đích sử dụng",
              body: [
                "Thông tin chỉ được dùng để liên hệ phản hồi yêu cầu của bạn: báo giá, xác nhận đơn hàng, giao hàng hoặc trao đổi hợp tác.",
              ],
            },
            {
              heading: "Người được tiếp cận và thời gian lưu trữ",
              body: [
                "Chỉ nhân sự phụ trách bán hàng và chăm sóc khách hàng của Khu Mỏ được tiếp cận thông tin. Thông tin được lưu trong thời gian cần thiết để xử lý yêu cầu và theo quy định áp dụng.",
              ],
            },
            {
              heading: "Quyền của bạn",
              body: [
                "Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin đã cung cấp bằng cách liên hệ với chúng tôi qua các kênh trên website.",
              ],
            },
          ],
        },
        terms: {
          title: "Điều khoản sử dụng",
          description: "Điều khoản khi sử dụng website Rượu Khu Mỏ.",
          sections: [
            {
              heading: "Độ tuổi",
              body: ["Website chỉ dành cho người từ 18 tuổi trở lên. Khu Mỏ không bán rượu cho người dưới 18 tuổi."],
            },
            {
              heading: "Thông tin sản phẩm",
              body: [
                "Thông tin sản phẩm, giá và tình trạng hàng có thể thay đổi. Đơn hàng chỉ được xác nhận khi Khu Mỏ liên hệ lại với bạn qua kênh bán hàng hợp lệ.",
              ],
            },
            {
              heading: "Nội dung website",
              body: [
                "Hình ảnh, logo và nội dung trên website thuộc quyền sở hữu của Khu Mỏ. Vui lòng không sao chép khi chưa có sự đồng ý.",
              ],
            },
          ],
        },
        cookies: {
          title: "Chính sách cookie",
          description: "Cách website Rượu Khu Mỏ dùng cookie và bộ nhớ trình duyệt.",
          sections: [
            {
              heading: "Thiết yếu",
              body: [
                "Website lưu trong bộ nhớ trình duyệt của bạn: xác nhận độ tuổi, lựa chọn giao diện sáng/tối và lựa chọn cookie. Các thông tin này không được gửi về máy chủ và không dùng để nhận diện bạn.",
              ],
            },
            {
              heading: "Phân tích và quảng cáo",
              body: [
                "Hiện website chưa dùng cookie phân tích hay quảng cáo. Nếu sử dụng trong tương lai, chúng chỉ được bật khi bạn đồng ý.",
              ],
            },
            {
              heading: "Thay đổi lựa chọn",
              body: ["Bạn có thể thay đổi lựa chọn bất cứ lúc nào qua liên kết “Cài đặt cookie” ở cuối trang."],
            },
          ],
        },
        shipping: {
          title: "Giao nhận và đổi trả",
          description: "Chính sách giao nhận và đổi trả của Rượu Khu Mỏ.",
          sections: [
            {
              heading: "Giao nhận",
              body: [
                "Phạm vi, thời gian và phí giao hàng được xác nhận cho từng đơn khi Khu Mỏ liên hệ lại với bạn. Vui lòng kiểm tra hàng khi nhận.",
              ],
            },
            {
              heading: "Đổi trả",
              body: [
                "Điều kiện đổi trả (ví dụ sản phẩm lỗi, vỡ khi vận chuyển, giao sai sản phẩm) đang được hoàn thiện. Trong thời gian này, vui lòng liên hệ trực tiếp để được hỗ trợ.",
              ],
            },
          ],
        },
      },
    },
    notFound: {
      title: "Không tìm thấy trang",
      body: "Trang bạn tìm không tồn tại hoặc đã được di chuyển.",
    },
  },
  en: {
    meta: {
      siteName: "Khu Mo Spirits",
      title: "Khu Mo Spirits — The spirit of the mining land",
      description:
        "Brand story, origin, product lines and where to buy Khu Mo spirits from Cam Pha, Quang Ninh, Vietnam.",
      ogLocale: "en_US",
    },
    common: {
      updating: "Being updated",
      viewDetails: "View details",
      viewAll: "View all",
      backHome: "Back to home",
      close: "Close",
      breadcrumb: "Breadcrumb",
      home: "Home",
    },
    nav: {
      home: "Home",
      products: "Products",
      story: "Story",
      whereToBuy: "Where to buy",
      partners: "Partners",
      homeLogo: "Khu Mo Spirits — Home",
      openMenu: "Open menu",
      menuLabel: "Menu",
      mainLabel: "Main navigation",
      language: "Language",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      switchToDark: "Switch to dark theme",
      switchToLight: "Switch to light theme",
      search: "Search",
      orderCta: "Order enquiry",
    },
    ageGate: {
      title: "Are you 18 or older?",
      body: "This website contains content about alcoholic beverages and is intended for people aged 18 and over.",
      confirm: "I am 18 or older",
      leave: "I am under 18",
      note: "We do not sell alcohol to anyone under 18. Don't drink and drive.",
    },
    cookies: {
      label: "Cookie notice",
      body: "This website uses essential browser storage to remember your age confirmation, theme and cookie choices. Analytics or advertising cookies are only enabled with your consent.",
      acceptAll: "Accept all",
      rejectOptional: "Essential only",
      customize: "Customise",
      save: "Save choices",
      alwaysOn: "Always on",
      policy: "Cookie policy",
      settings: "Cookie settings",
      categories: {
        essential: {
          title: "Essential",
          body: "Needed for the site to work: remembers your age confirmation, light/dark theme and cookie choices.",
        },
        analytics: {
          title: "Analytics",
          body: "Helps us understand how the site is used so we can improve it. Not currently in use.",
        },
        marketing: {
          title: "Advertising",
          body: "Measures how well advertising performs. Not currently in use.",
        },
      },
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
        brand: {
          eyebrow: "Spirits · Culture · Mining land",
          title: "The spirit of the mining land, in every drop.",
          description: "The brand story, origin and product lines of Khu Mo Spirits.",
          cta: "Discover the brand",
        },
        distillery: {
          eyebrow: "Origin",
          title: "From our distillery in Cam Pha, Quang Ninh",
          description: "Where every batch is distilled, checked and bottled.",
          cta: "See the process",
        },
        product: {
          eyebrow: "Sticky rice spirit",
          title: "Tropical Sticky Rice Spirit",
          description: "Distilled essence in the navy-label bottle.",
          cta: "View product",
        },
      },
    },
    home: {
      productsEyebrow: "Products",
      productsTitle: "Product lines",
      productsIntro: "Each line has its own label colour, so it is easy to recognise on the shelf and in a gift box.",
      viewProduct: "View product",
      browseCategory: "Browse by category",
      storyEyebrow: "The brand",
      storyTitle: "About Khu Mo Spirits",
      storyBody:
        "Khu Mo Spirits was born in Cam Pha, Quang Ninh — a land shaped by generations of coal mining. The name Khu Mo, \"the mine area\", honours the resilient, straightforward and loyal spirit of its people.",
      storyCta: "Read the story",
      qualityEyebrow: "Quality & origin",
      qualityTitle: "Steady hands, one step at a time",
      qualityIntro: "Every step happens at the Khu Mo distillery, from choosing ingredients to bottling.",
      qualityCta: "Origin and process",
      buyEyebrow: "Buy",
      buyTitle: "Where to buy and how to reach us",
      buyBody: "Find a point of sale, call us, or send an enquiry for a quote and delivery confirmation.",
      buyPointsCta: "Where to buy",
      buyEnquiryCta: "Send an order enquiry",
      partnerPrompt: "Retailer, restaurant or distributor?",
      partnerCta: "Partner with Khu Mo",
    },
    products: {
      title: "Products",
      intro: "The Khu Mo range. Choose a product to see its volume, packaging and how to buy it.",
      filters: "Filter products",
      showFilters: "Filters",
      filterCategory: "Category",
      filterVolume: "Volume",
      filterPackaging: "Packaging",
      all: "All",
      clear: "Clear filters",
      resultCount: "{n} products",
      loading: "Loading products",
      emptyTitle: "No matching products",
      emptyBody: "No products match the selected filters. Remove some filters to see more.",
      categories: {
        traditional: "Traditional spirits",
        infused: "Infused spirits",
        other: "Other lines",
      },
      packaging: {
        bottle: "Single bottle",
        pack: "Pack",
        can: "Can",
      },
      volume: "Volume",
      packagingLabel: "Packaging",
      abv: "Alcohol",
      price: "Price",
      ingredients: "Ingredients",
      origin: "Origin",
      colors: "Label colours",
      availability: "Availability",
      available: "Available",
      unavailable: "Currently unavailable",
      unavailableNote: "This product can't be ordered right now. Send an enquiry and we'll let you know when it's back.",
      contactForQuote: "Contact for a quote",
      fromPrice: "From {price}",
      imagePending: "Product photo coming soon",
      info: "Product information",
      packagingTitle: "Packaging",
      packagingNote: "Other formats (packs, gift boxes) will be listed once available.",
      buyTitle: "Buy this product",
      enquire: "Send an order enquiry",
      call: "Call {phone}",
      seePoints: "Where to buy",
      bulkTitle: "Ordering for a party or event?",
      bulkBody: "Tell us the packaging and expected quantity to receive a quote, stock and delivery time.",
      bulkCta: "Order in bulk",
      related: "Other products",
      showImage: "Show image {n}",
    },
    story: {
      title: "The Khu Mo story",
      intro: "A spirits brand born in the mining land of Cam Pha, Quang Ninh.",
      storyEyebrow: "The brand",
      storyTitle: "Born in the mining land",
      storyBody: [
        "Khu Mo Spirits was born in Cam Pha, Quang Ninh — where generations have made their living from the mines. The name Khu Mo, \"the mine area\", honours that land: resilient, straightforward and loyal.",
        "We make spirits the way miners work: with steady hands, care and no shortcuts. Every batch is checked before it is bottled and reaches your glass.",
      ],
      imageAlt: "Inside the Khu Mo distillery",
      values: [
        { title: "Clear origin", detail: "Made and bottled at the Khu Mo distillery in Cam Pha." },
        { title: "Care", detail: "Packaging and product information presented clearly and consistently." },
        { title: "Rooted in the mines", detail: "Inspired by the culture and people of Quang Ninh's mining land." },
      ],
      processEyebrow: "Origin and process",
      processTitle: "From sticky rice to bottle",
      processIntro: "The main steps at the Khu Mo distillery. Technical details for each product are published on its page once confirmed.",
      processImageAlt: "Production area at the Khu Mo distillery",
      steps: [
        { title: "Ingredients", detail: "Sticky rice and other ingredients are selected for each batch." },
        { title: "Fermentation", detail: "The rice is cooked, mixed with yeast and left to ferment." },
        { title: "Distillation", detail: "Distilled to separate the spirit, discarding heads and tails." },
        { title: "Settling", detail: "The spirit settles, is filtered clear and quality-checked." },
        { title: "Bottling", detail: "Bottled, labelled and checked as a finished product." },
      ],
      visitTitle: "Want to see the distillery?",
      visitBody: "Leave your details and we'll get in touch to arrange a visit.",
      visitCta: "Book a visit",
      newsEyebrow: "News and activities",
      newsTitle: "Recent activity",
      newsEmpty: "No posts yet. Khu Mo news and activities will be published here.",
    },
    whereToBuy: {
      title: "Where to buy",
      intro: "Buy Khu Mo spirits at the points of sale below, or contact us to order and confirm delivery.",
      pointsTitle: "Points of sale",
      pointTypes: {
        distillery: "Distillery",
        store: "Store",
        agent: "Agent",
      },
      address: "Address",
      phone: "Phone",
      hours: "Opening hours",
      directions: "Directions",
      pointsEmpty: "Our list of points of sale is being updated. Please contact us for help with buying.",
      deliveryTitle: "Delivery information",
      deliveryBody: [
        "We take orders by phone and through the enquiry form. Delivery area, time and cost are confirmed for each order when we get back to you, depending on address and quantity.",
        "For large orders for weddings, parties or events, please enquire early so we can check stock and arrange delivery.",
      ],
      deliveryPolicy: "Delivery and returns policy",
      orderTitle: "Order enquiry",
      orderIntro: "Fill in the form below. We'll get back to you to confirm price, stock and delivery.",
      callUs: "Or call us directly",
    },
    partners: {
      title: "Partners",
      intro: "Company information and distribution partnerships for retailers, restaurants and businesses.",
      companyTitle: "About the company",
      companyName: "Company name",
      companyAddress: "Address",
      companyTaxCode: "Tax code",
      companyPhone: "Phone",
      companyEmail: "Email",
      companyBody: "Khu Mo Spirits is produced and distributed by a company based in Cam Pha, Quang Ninh.",
      viewCatalogue: "View the product range",
      distributionTitle: "Distribution partnerships",
      distributionBody: "We are looking for agents, stores and restaurants that want to offer Khu Mo spirits to their customers.",
      offers: [
        "Product sheets and company information so you can verify the brand.",
        "Distribution policy and regional pricing, shared directly when we talk.",
        "Product images and materials for your point of sale.",
      ],
      stepsTitle: "How it works",
      steps: [
        { title: "Send a request", detail: "Fill in the form with your business and area." },
        { title: "Talk", detail: "Our partner contact gets in touch to understand your needs." },
        { title: "Receive the pack", detail: "Get product sheets and the policy that fits." },
        { title: "Agree", detail: "Agree on terms and start working together." },
      ],
      formTitle: "Send a partnership request",
      formIntro: "Your details are only used to discuss the partnership.",
    },
    enquiry: {
      titles: {
        purchase: "Send an order enquiry",
        bulk: "Order in bulk",
        partner: "Send a partnership request",
        visit: "Book a visit",
        general: "Contact us",
      },
      intros: {
        purchase: "We'll get back to you to confirm price, stock and delivery.",
        bulk: "Tell us the packaging and expected quantity. We'll send a quote, stock and delivery time.",
        partner: "Your details are only used to discuss the partnership.",
        visit: "Leave your details and we'll get in touch to arrange a time.",
        general: "We'll reply through the contact details you provide.",
      },
    },
    form: {
      labels: {
        interest: "Enquiry type",
        name: "Full name",
        phone: "Contact phone number",
        email: "Email",
        product: "Product",
        packaging: "Packaging",
        quantity: "Expected quantity",
        company: "Business / store name",
        area: "Business area",
        message: "Notes",
      },
      placeholders: {
        name: "Enter your full name",
        phone: "Enter your phone number",
        email: "name@email.com",
        quantity: "e.g. 24",
        company: "Enter your business name",
        area: "e.g. Ha Long, Quang Ninh",
        message: "Occasion, when you need it, delivery address...",
      },
      optional: "optional",
      required: "required",
      notSelected: "Not selected",
      interests: {
        purchase: "Buy",
        bulk: "Bulk order (party, event)",
        partner: "Partnership, distribution",
        visit: "Distillery visit",
        general: "Other",
      },
      consentBefore: "I agree that Khu Mo may use these details to respond to my enquiry, as described in the ",
      consentLink: "privacy policy",
      consentAfter: ".",
      dataNote: "We only collect what we need to handle your request.",
      submit: "Send enquiry",
      sending: "Sending...",
      successTitle: "Enquiry sent",
      successBody: "Your request has been received. Next steps will be sent through the contact details you provided.",
      sendAnother: "Send another enquiry",
      errorTitle: "Could not send your enquiry",
      errorBody: "Something went wrong while sending. Please try again later or use the contact details provided.",
      networkError: "No network connection. Check your connection and try again — your details are kept.",
      rateLimited: "Too many enquiries. Please try again in a few minutes.",
      retry: "Try again",
      validation: {
        name: "Please enter your full name (at least 2 characters).",
        phone: "Please enter a valid phone number, e.g. 0912 345 678.",
        email: "Please enter a valid email, e.g. name@email.com.",
        quantity: "Quantity should contain digits only.",
        company: "Please enter your business or store name.",
        consent: "Please agree so we can contact you about your enquiry.",
        tooLong: "This is too long.",
      },
    },
    search: {
      label: "Search products",
      placeholder: "Type a product name, e.g. sticky rice",
      hint: "Suggestions",
      noResults: "No products found for “{q}”.",
      noResultsHint: "Check the spelling or try a shorter keyword.",
      viewAll: "View all products",
    },
    footer: {
      tagline: "The spirit of the mining land, in every drop.",
      ageNotice: "For adults aged 18 and over only. Don't drink and drive.",
      explore: "Explore",
      buy: "Buy",
      legal: "Legal",
      process: "Origin and process",
      news: "News and activities",
      delivery: "Delivery information",
      order: "Order enquiry",
      partnerForm: "Partnership request",
      rights: "© {year} Khu Mo Spirits.",
    },
    legal: {
      draftNotice:
        "Draft — this content is being reviewed against Vietnamese law and will be updated before it formally applies.",
      docs: {
        privacy: {
          title: "Privacy",
          description: "How Khu Mo Spirits collects and uses personal information.",
          sections: [
            {
              heading: "What we collect",
              body: [
                "When you send an enquiry, order or partnership request, we receive your name, phone number and anything else you choose to share, such as email, business name, product and notes.",
                "The site does not require an account and does not collect sensitive personal data.",
              ],
            },
            {
              heading: "How we use it",
              body: [
                "Your details are only used to respond to your request: quotes, order confirmation, delivery or partnership discussions.",
              ],
            },
            {
              heading: "Who can access it and for how long",
              body: [
                "Only Khu Mo sales and customer care staff can access your details. They are kept for as long as needed to handle your request and as required by applicable law.",
              ],
            },
            {
              heading: "Your rights",
              body: [
                "You can ask to see, correct or delete the details you provided by contacting us through the channels on this site.",
              ],
            },
          ],
        },
        terms: {
          title: "Terms of use",
          description: "Terms for using the Khu Mo Spirits website.",
          sections: [
            {
              heading: "Age",
              body: ["This website is for people aged 18 and over. Khu Mo does not sell alcohol to anyone under 18."],
            },
            {
              heading: "Product information",
              body: [
                "Product information, prices and availability may change. An order is only confirmed when Khu Mo contacts you through a valid sales channel.",
              ],
            },
            {
              heading: "Website content",
              body: [
                "Images, logos and content on this website belong to Khu Mo. Please do not copy them without permission.",
              ],
            },
          ],
        },
        cookies: {
          title: "Cookie policy",
          description: "How the Khu Mo Spirits website uses cookies and browser storage.",
          sections: [
            {
              heading: "Essential",
              body: [
                "The site stores in your browser: your age confirmation, light/dark theme choice and cookie choices. This is not sent to our servers and is not used to identify you.",
              ],
            },
            {
              heading: "Analytics and advertising",
              body: [
                "The site does not currently use analytics or advertising cookies. If it does in future, they will only be enabled with your consent.",
              ],
            },
            {
              heading: "Changing your choice",
              body: ["You can change your choice at any time via the “Cookie settings” link at the bottom of every page."],
            },
          ],
        },
        shipping: {
          title: "Delivery and returns",
          description: "Delivery and returns policy for Khu Mo Spirits.",
          sections: [
            {
              heading: "Delivery",
              body: [
                "Delivery area, time and cost are confirmed for each order when Khu Mo contacts you. Please check your goods on delivery.",
              ],
            },
            {
              heading: "Returns",
              body: [
                "Return conditions (for example faulty products, breakage in transit or wrong items) are being finalised. In the meantime, please contact us directly for help.",
              ],
            },
          ],
        },
      },
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

export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
