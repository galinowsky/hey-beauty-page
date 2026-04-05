export const languages = {
  pl: "Polski",
  en: "English",
  uk: "Українська",
} as const;

export type Lang = keyof typeof languages;

export const ui = {
  pl: {
    // Nav
    "nav.services": "Usługi",
    "nav.pricing": "Cennik",
    "nav.salons": "Salony",
    "nav.about": "O nas",
    "nav.faq": "FAQ",
    "nav.contact": "Kontakt",
    "nav.book": "Umów wizytę",
    "nav.close": "Zamknij",

    // Common
    "common.bookNow": "Umów wizytę",
    "common.bookOnline": "Umów wizytę online",
    "common.learnMore": "Dowiedz się więcej →",
    "common.seeAll": "Zobacz wszystkie usługi",
    "common.priceFrom": "od",
    "common.currency": "zł",
    "common.min": "min",
    "common.price": "Cena",
    "common.duration": "Czas zabiegu",
    "common.verifiedBooksy": "Zweryfikowane opinie z Booksy",
    "common.sourceBooksy": "Źródło: Booksy — zweryfikowane opinie potwierdzonych klientek",

    // Homepage
    "home.heroSubtitle": "Face · Body · Brows · Nails · Kraków",
    "home.locationsLabel": "Nasze Salony",
    "home.locationsTitle": "4 lokalizacje w Krakowie",
    "home.servicesLabel": "Usługi",
    "home.servicesTitle": "Zabiegi kosmetyczne",
    "home.aboutTitle": "O Hey Beauty",
    "home.aboutQuote": "\"Your Care Place\"",
    "home.aboutText": "Sieć salonów kosmetycznych w Krakowie, łączących profesjonalizm z luksusową atmosferą. Pełen zakres usług, od stylizacji brwi i rzęs, przez zabiegi na twarz i ciało, po manicure i pedicure.",
    "home.aboutLink": "Poznaj nas bliżej →",
    "home.reviewsLabel": "Opinie klientek",
    "home.reviewsTitle": "Co mówią o nas",
    "home.reviewsRating": "★★★★★ · Zweryfikowane opinie z Booksy",
    "home.faqLabel": "FAQ",
    "home.faqTitle": "Najczęściej zadawane pytania",
    "home.instagramFollowers": "5,600+ obserwujących na Instagramie",
    "home.instagramFollow": "Obserwuj nas",

    // Services page
    "services.title": "Usługi",
    "services.subtitle": "Profesjonalne zabiegi kosmetyczne w 4 salonach Hey Beauty w Krakowie.",
    "services.pageTitle": "Usługi — Zabiegi Kosmetyczne Hey Beauty Kraków",
    "services.pageDesc": "Pełna oferta zabiegów kosmetycznych Hey Beauty w Krakowie. Sprawdź ceny i umów wizytę.",
    "services.breadHome": "Strona główna",
    "services.breadServices": "Usługi",

    // Salons page
    "salons.title": "Nasze salony",
    "salons.subtitle": "Hey Beauty to 4 salony kosmetyczne w Krakowie. Każdy z nich oferuje profesjonalne zabiegi w luksusowej atmosferze.",
    "salons.pageTitle": "Salony Hey Beauty Kraków — 4 lokalizacje",
    "salons.pageDesc": "Salon kosmetyczny Hey Beauty w Krakowie. 4 lokalizacje: Śródmieście, Zabłocie i więcej. Sprawdź adresy i zarezerwuj wizytę.",
    "salons.breadHome": "Strona główna",
    "salons.breadSalons": "Salony",

    // Hair page
    "hair.heroLabel": "Hey Beauty Zabłocie · Usługi",
    "hair.heroTitle": "Włosy",
    "hair.heroText": "Keratynowe zabiegi prostujące i regenerujące. Efekt, który widać od pierwszego mycia — i zostaje z Tobą na miesiące.",
    "hair.expertLabel": "Twoja specjalistka",
    "hair.expertTitle": "Magdalena",
    "hair.expertSurname": "Tryba",
    "hair.expertBio1": "Magdalena od lat pasjonuje się keratyną — nie jako prostą usługą, ale jako sztuką transformacji włosa. Każdy zabieg traktuje indywidualnie: dobiera formułę, czas aplikacji i pielęgnację do konkretnego rodzaju włosa i oczekiwań klientki.",
    "hair.expertBio2": "Certyfikowany specjalista keratynowego prostowania i regeneracji. Pracuje wyłącznie ze sprawdzonymi preparatami bezformaldehydowymi. Znajdziesz ją w Hey Beauty Zabłocie.",
    "hair.expertCert": "Certyfikowany",
    "hair.expertCertTitle": "Specjalista Keratyny",
    "hair.statMonths": "Miesięcy efektu",
    "hair.statRating": "Średnia ocen",
    "hair.statPassion": "Pasja do włosa",
    "hair.offerLabel": "Oferta",
    "hair.offerTitle": "Zabiegi keratynowe",
    "hair.offerNote": "Dostępne wyłącznie w salonie Hey Beauty Zabłocie",
    "hair.videosLabel": "Praca Magdaleny",
    "hair.videosTitle": "Efekty mówią same za siebie",
    "hair.videoScroll": "← przesuń →",
    "hair.reviewsLabel": "Opinie klientek",
    "hair.reviewsTitle": "Co mówią o Magdalenie",
    "hair.ctaLabel": "Hey Beauty Zabłocie",
    "hair.ctaTitle": "Gotowa na nowe włosy?",
    "hair.ctaAddress": "ul. Przemysłowa 4/469, Kraków-Zabłocie · pon–pt 9–20, sob 9–16",
    "hair.faqLabel": "FAQ",
    "hair.faqTitle": "Najczęściej zadawane pytania",
    "hair.backToServices": "← Wszystkie usługi",
    "hair.bookBtn": "Umów →",

    // Service detail page
    "service.priceFrom": "Cena od",
    "service.availableAt": "Dostępne w",
    "service.salons": "salonach",
    "service.faqTitle": "Najczęściej zadawane pytania",
    "service.otherServices": "Inne zabiegi",
    "service.details": "Szczegóły",
    "service.seeAllLink": "Zobacz pełną ofertę →",

    // Location detail page
    "location.openingHours": "Godziny otwarcia",
    "location.servicesAt": "Usługi w",
    "location.booksyReviews": "opinii na Booksy",

    // Breadcrumbs
    "breadcrumb.home": "Strona główna",
    "breadcrumb.services": "Usługi",
    "breadcrumb.salons": "Salony",

    // Homepage extras
    "home.servicesHeading": "Usługi które oferujemy",

    // About page
    "about.label": "O nas",
    "about.intro": "Sieć salonów kosmetycznych w Krakowie, łączących profesjonalizm z luksusową atmosferą. Pełen zakres usług — od stylizacji brwi i rzęs, przez zabiegi pielęgnacyjne, po manicure i pedicure.",
    "about.philosophyLabel": "Nasza filozofia",
    "about.philosophyTitle": "Luksus w codzienności",
    "about.philosophyText": "Wierzymy, że każda kobieta zasługuje na chwilę luksusu. Nasze salony inspirowane są stylem \"Soft Industrial Luxury\" — połączeniem surowych materiałów z ciepłem i elegancją.",
    "about.whyLabel": "Dlaczego my?",
    "about.whyTitle": "Jakość ponad wszystko",
    "about.why1": "5.0 na Booksy — setki opinii",
    "about.why2": "4 lokalizacje w centrum Krakowa",
    "about.why3": "Profesjonalny zespół specjalistek",
    "about.why4": "Darmowa konsultacja kosmetologiczna",
    "about.why5": "Program lojalnościowy",
    "about.teamLabel": "Zespół",
    "about.teamTitle": "Nasze specjalistki",
    "about.ctaLabel": "Gotowa?",
    "about.ctaTitle": "Zapraszamy",
    "about.ctaText": "Umów swoją pierwszą wizytę i przekonaj się sama.",
    "about.pageTitle": "O Hey Beauty — Salon Kosmetyczny Kraków",
    "about.pageDesc": "Poznaj Hey Beauty. Sieć salonów kosmetycznych w Krakowie łączących profesjonalizm z luksusową atmosferą.",

    // FAQ page
    "faq.pageTitle": "FAQ — Najczęściej Zadawane Pytania | Hey Beauty Kraków",
    "faq.pageDesc": "Odpowiedzi na najczęściej zadawane pytania o salonach Hey Beauty w Krakowie.",
    "faq.heading": "Najczęściej zadawane pytania",
    "faq.intro": "Masz pytania? Znajdziesz tutaj odpowiedzi na najczęstsze zapytania o nasze salony i usługi.",

    // Contact page
    "contact.pageTitle": "Kontakt — Hey Beauty Salon Kosmetyczny Kraków",
    "contact.pageDesc": "Skontaktuj się z Hey Beauty. Adresy, godziny otwarcia i rezerwacje online przez Booksy.",
    "contact.heading": "Kontakt",
    "contact.intro": "Rezerwuj wizytę online przez Booksy lub odwiedź nas w jednym z 4 salonów w Krakowie.",
    "contact.hours": "Godziny otwarcia",
    "contact.book": "Rezerwuj",
    "contact.social": "Social media",

    // Footer
    "footer.brand": "Sieć salonów kosmetycznych w Krakowie.",
    "footer.services": "Usługi",
    "footer.salons": "Salony",
    "footer.contact": "Kontakt",
    "footer.privacy": "Polityka Prywatności",
    "footer.terms": "Regulamin",
  },

  en: {
    // Nav
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.salons": "Salons",
    "nav.about": "About",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.book": "Book now",
    "nav.close": "Close",

    // Common
    "common.bookNow": "Book appointment",
    "common.bookOnline": "Book online",
    "common.learnMore": "Learn more →",
    "common.seeAll": "See all services",
    "common.priceFrom": "from",
    "common.currency": "PLN",
    "common.min": "min",
    "common.price": "Price",
    "common.duration": "Duration",
    "common.verifiedBooksy": "Verified Booksy reviews",
    "common.sourceBooksy": "Source: Booksy — verified reviews from confirmed clients",

    // Homepage
    "home.heroSubtitle": "Face · Body · Brows · Nails · Kraków",
    "home.locationsLabel": "Our Salons",
    "home.locationsTitle": "4 locations in Kraków",
    "home.servicesLabel": "Services",
    "home.servicesTitle": "Beauty treatments",
    "home.aboutTitle": "About Hey Beauty",
    "home.aboutQuote": "\"Your Care Place\"",
    "home.aboutText": "A network of beauty salons in Kraków, combining professionalism with a luxurious atmosphere. Full range of services — from brow and lash styling, through facial and body treatments, to manicure and pedicure.",
    "home.aboutLink": "Learn more about us →",
    "home.reviewsLabel": "Client reviews",
    "home.reviewsTitle": "What they say about us",
    "home.reviewsRating": "★★★★★ · Verified Booksy reviews",
    "home.faqLabel": "FAQ",
    "home.faqTitle": "Frequently asked questions",
    "home.instagramFollowers": "5,600+ Instagram followers",
    "home.instagramFollow": "Follow us",

    // Services page
    "services.title": "Services",
    "services.subtitle": "Professional beauty treatments across 4 Hey Beauty salons in Kraków.",
    "services.pageTitle": "Beauty Treatments Kraków — Hey Beauty | Services & Pricing",
    "services.pageDesc": "Full range of Hey Beauty beauty treatments in Kraków. Check prices and book your appointment.",
    "services.breadHome": "Home",
    "services.breadServices": "Services",

    // Salons page
    "salons.title": "Our salons",
    "salons.subtitle": "Hey Beauty is 4 beauty salons in Kraków. Each offers professional treatments in a luxurious atmosphere.",
    "salons.pageTitle": "Hey Beauty Salons Kraków — 4 Locations",
    "salons.pageDesc": "Hey Beauty beauty salon in Kraków. 4 locations: City Centre, Zabłocie and more. Check addresses and book your visit.",
    "salons.breadHome": "Home",
    "salons.breadSalons": "Salons",

    // Hair page
    "hair.heroLabel": "Hey Beauty Zabłocie · Services",
    "hair.heroTitle": "Hair",
    "hair.heroText": "Keratin straightening and regeneration treatments. Results you'll see after the first wash — and they stay with you for months.",
    "hair.expertLabel": "Your specialist",
    "hair.expertTitle": "Magdalena",
    "hair.expertSurname": "Tryba",
    "hair.expertBio1": "Magdalena has been passionate about keratin for years — not as a simple service, but as the art of hair transformation. She approaches every treatment individually: selecting the formula, application time and aftercare for each specific hair type and client's expectations.",
    "hair.expertBio2": "Certified specialist in keratin straightening and regeneration. Works exclusively with proven formaldehyde-free formulas. Find her at Hey Beauty Zabłocie.",
    "hair.expertCert": "Certified",
    "hair.expertCertTitle": "Keratin Specialist",
    "hair.statMonths": "Months of results",
    "hair.statRating": "Average rating",
    "hair.statPassion": "Passion for hair",
    "hair.offerLabel": "Services",
    "hair.offerTitle": "Keratin treatments",
    "hair.offerNote": "Available exclusively at Hey Beauty Zabłocie",
    "hair.videosLabel": "Magdalena's work",
    "hair.videosTitle": "Results speak for themselves",
    "hair.videoScroll": "← scroll →",
    "hair.reviewsLabel": "Client reviews",
    "hair.reviewsTitle": "What they say about Magdalena",
    "hair.ctaLabel": "Hey Beauty Zabłocie",
    "hair.ctaTitle": "Ready for new hair?",
    "hair.ctaAddress": "Przemysłowa 4/469, Kraków-Zabłocie · Mon–Fri 9–20, Sat 9–16",
    "hair.faqLabel": "FAQ",
    "hair.faqTitle": "Frequently asked questions",
    "hair.backToServices": "← All services",
    "hair.bookBtn": "Book →",

    // Service detail page
    "service.priceFrom": "from",
    "service.availableAt": "Available at",
    "service.salons": "salons",
    "service.faqTitle": "Frequently asked questions",
    "service.otherServices": "Other services",
    "service.details": "Details",
    "service.seeAllLink": "See all services →",

    // Location detail page
    "location.openingHours": "Opening hours",
    "location.servicesAt": "Services at",
    "location.booksyReviews": "reviews on Booksy",

    // Breadcrumbs
    "breadcrumb.home": "Home",
    "breadcrumb.services": "Services",
    "breadcrumb.salons": "Salons",

    // Homepage extras
    "home.servicesHeading": "Services we offer",

    // About page
    "about.label": "About us",
    "about.intro": "A network of beauty salons in Kraków, combining professionalism with a luxurious atmosphere. Full range of services — from brow and lash styling, through skincare treatments, to manicure and pedicure.",
    "about.philosophyLabel": "Our philosophy",
    "about.philosophyTitle": "Everyday luxury",
    "about.philosophyText": "We believe every woman deserves a moment of luxury. Our salons are inspired by a 'Soft Industrial Luxury' aesthetic — raw materials combined with warmth and elegance.",
    "about.whyLabel": "Why us?",
    "about.whyTitle": "Quality above all",
    "about.why1": "5.0 on Booksy — hundreds of reviews",
    "about.why2": "4 locations in central Kraków",
    "about.why3": "Professional specialist team",
    "about.why4": "Free cosmetic consultation",
    "about.why5": "Loyalty programme",
    "about.teamLabel": "Team",
    "about.teamTitle": "Our specialists",
    "about.ctaLabel": "Ready?",
    "about.ctaTitle": "Welcome",
    "about.ctaText": "Book your first appointment and see for yourself.",
    "about.pageTitle": "About Hey Beauty — Beauty Salon Kraków",
    "about.pageDesc": "Meet Hey Beauty. A network of beauty salons in Kraków combining professionalism with a luxurious atmosphere.",

    // FAQ page
    "faq.pageTitle": "FAQ — Frequently Asked Questions | Hey Beauty Kraków",
    "faq.pageDesc": "Answers to the most frequently asked questions about Hey Beauty salons in Kraków.",
    "faq.heading": "Frequently asked questions",
    "faq.intro": "Have questions? Find answers to the most common questions about our salons and services.",

    // Contact page
    "contact.pageTitle": "Contact — Hey Beauty Beauty Salon Kraków",
    "contact.pageDesc": "Contact Hey Beauty. Addresses, opening hours and online booking via Booksy.",
    "contact.heading": "Contact",
    "contact.intro": "Book online via Booksy or visit one of our 4 salons in Kraków.",
    "contact.hours": "Opening hours",
    "contact.book": "Book",
    "contact.social": "Social media",

    // Footer
    "footer.brand": "A network of beauty salons in Kraków.",
    "footer.services": "Services",
    "footer.salons": "Salons",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },

  uk: {
    // Nav
    "nav.services": "Послуги",
    "nav.pricing": "Ціни",
    "nav.salons": "Салони",
    "nav.about": "Про нас",
    "nav.faq": "FAQ",
    "nav.contact": "Контакт",
    "nav.book": "Записатись",
    "nav.close": "Закрити",

    // Common
    "common.bookNow": "Записатись",
    "common.bookOnline": "Записатись онлайн",
    "common.learnMore": "Дізнатись більше →",
    "common.seeAll": "Всі послуги",
    "common.priceFrom": "від",
    "common.currency": "злотих",
    "common.min": "хв",
    "common.price": "Ціна",
    "common.duration": "Тривалість",
    "common.verifiedBooksy": "Перевірені відгуки з Booksy",
    "common.sourceBooksy": "Джерело: Booksy — перевірені відгуки підтверджених клієнток",

    // Homepage
    "home.heroSubtitle": "Обличчя · Тіло · Брови · Нігті · Краків",
    "home.locationsLabel": "Наші Салони",
    "home.locationsTitle": "4 локації в Кракові",
    "home.servicesLabel": "Послуги",
    "home.servicesTitle": "Косметологічні процедури",
    "home.aboutTitle": "Про Hey Beauty",
    "home.aboutQuote": "\"Your Care Place\"",
    "home.aboutText": "Мережа салонів краси в Кракові, що поєднує професіоналізм з розкішною атмосферою. Повний спектр послуг — від стилізації брів та вій, через процедури для обличчя і тіла, до манікюру та педикюру.",
    "home.aboutLink": "Дізнайся про нас більше →",
    "home.reviewsLabel": "Відгуки клієнток",
    "home.reviewsTitle": "Що кажуть про нас",
    "home.reviewsRating": "★★★★★ · Перевірені відгуки з Booksy",
    "home.faqLabel": "FAQ",
    "home.faqTitle": "Часті запитання",
    "home.instagramFollowers": "5,600+ підписників в Instagram",
    "home.instagramFollow": "Підписатись",

    // Services page
    "services.title": "Послуги",
    "services.subtitle": "Професійні косметологічні процедури в 4 салонах Hey Beauty у Кракові.",
    "services.pageTitle": "Косметологічні процедури Краків — Hey Beauty | Послуги та ціни",
    "services.pageDesc": "Повний спектр косметологічних послуг Hey Beauty у Кракові. Перевір ціни та запишись на прийом.",
    "services.breadHome": "Головна",
    "services.breadServices": "Послуги",

    // Salons page
    "salons.title": "Наші салони",
    "salons.subtitle": "Hey Beauty — це 4 салони краси в Кракові. Кожен пропонує професійні процедури в розкішній атмосфері.",
    "salons.pageTitle": "Салони Hey Beauty Краків — 4 локації",
    "salons.pageDesc": "Салон краси Hey Beauty у Кракові. 4 локації: центр міста, Заблоче та інші. Перевір адреси та запишись на візит.",
    "salons.breadHome": "Головна",
    "salons.breadSalons": "Салони",

    // Hair page
    "hair.heroLabel": "Hey Beauty Забłoцie · Послуги",
    "hair.heroTitle": "Волосся",
    "hair.heroText": "Кератинове випрямлення та відновлення волосся. Результат видно після першого миття — і залишається з тобою на місяці.",
    "hair.expertLabel": "Твій спеціаліст",
    "hair.expertTitle": "Магдалена",
    "hair.expertSurname": "Триба",
    "hair.expertBio1": "Магдалена роками захоплюється кератином — не як простою послугою, а як мистецтвом трансформації волосся. Кожну процедуру вона підходить індивідуально: підбирає формулу, час нанесення і догляд під конкретний тип волосся та побажання клієнтки.",
    "hair.expertBio2": "Сертифікований спеціаліст із кератинового випрямлення та відновлення. Працює виключно з перевіреними безформальдегідними препаратами. Знайди її в Hey Beauty Забłoцie.",
    "hair.expertCert": "Сертифікований",
    "hair.expertCertTitle": "Спеціаліст з кератину",
    "hair.statMonths": "Місяців ефекту",
    "hair.statRating": "Середня оцінка",
    "hair.statPassion": "Пристрасть до волосся",
    "hair.offerLabel": "Послуги",
    "hair.offerTitle": "Кератинові процедури",
    "hair.offerNote": "Доступно виключно в салоні Hey Beauty Забłoцie",
    "hair.videosLabel": "Роботи Магдалени",
    "hair.videosTitle": "Результати говорять самі за себе",
    "hair.videoScroll": "← гортай →",
    "hair.reviewsLabel": "Відгуки клієнток",
    "hair.reviewsTitle": "Що кажуть про Магдалену",
    "hair.ctaLabel": "Hey Beauty Забłoцie",
    "hair.ctaTitle": "Готова до нового волосся?",
    "hair.ctaAddress": "вул. Пшемислова 4/469, Краків-Заблоче · пн–пт 9–20, сб 9–16",
    "hair.faqLabel": "FAQ",
    "hair.faqTitle": "Часті запитання",
    "hair.backToServices": "← Всі послуги",
    "hair.bookBtn": "Записатись →",

    // Service detail page
    "service.priceFrom": "від",
    "service.availableAt": "Доступно в",
    "service.salons": "салонах",
    "service.faqTitle": "Часті запитання",
    "service.otherServices": "Інші послуги",
    "service.details": "Деталі",
    "service.seeAllLink": "Всі послуги →",

    // Location detail page
    "location.openingHours": "Години роботи",
    "location.servicesAt": "Послуги в",
    "location.booksyReviews": "відгуків на Booksy",

    // Breadcrumbs
    "breadcrumb.home": "Головна",
    "breadcrumb.services": "Послуги",
    "breadcrumb.salons": "Салони",

    // Homepage extras
    "home.servicesHeading": "Послуги які ми пропонуємо",

    // About page
    "about.label": "Про нас",
    "about.intro": "Мережа салонів краси в Кракові, що поєднує професіоналізм з розкішною атмосферою. Повний спектр послуг — від стилізації брів і вій, через процедури для обличчя і тіла, до манікюру та педикюру.",
    "about.philosophyLabel": "Наша філософія",
    "about.philosophyTitle": "Розкіш у повсякденності",
    "about.philosophyText": "Ми віримо, що кожна жінка заслуговує на мить розкоші. Наші салони натхнені стилем «Soft Industrial Luxury» — поєднанням суворих матеріалів з теплом і елегантністю.",
    "about.whyLabel": "Чому ми?",
    "about.whyTitle": "Якість перш за все",
    "about.why1": "5.0 на Booksy — сотні відгуків",
    "about.why2": "4 локації в центрі Кракова",
    "about.why3": "Професійна команда спеціалістів",
    "about.why4": "Безкоштовна косметологічна консультація",
    "about.why5": "Програма лояльності",
    "about.teamLabel": "Команда",
    "about.teamTitle": "Наші спеціалісти",
    "about.ctaLabel": "Готова?",
    "about.ctaTitle": "Запрошуємо",
    "about.ctaText": "Запишіться на перший візит і переконайтесь самі.",
    "about.pageTitle": "Про Hey Beauty — Салон краси Краків",
    "about.pageDesc": "Познайомтесь з Hey Beauty. Мережа салонів краси в Кракові, що поєднує професіоналізм з розкішною атмосферою.",

    // FAQ page
    "faq.pageTitle": "FAQ — Часті запитання | Hey Beauty Краків",
    "faq.pageDesc": "Відповіді на найпоширеніші запитання про салони Hey Beauty у Кракові.",
    "faq.heading": "Часті запитання",
    "faq.intro": "Маєш питання? Знайди відповіді на найпоширеніші запитання про наші салони та послуги.",

    // Contact page
    "contact.pageTitle": "Контакт — Салон краси Hey Beauty Краків",
    "contact.pageDesc": "Зв'яжіться з Hey Beauty. Адреси, години роботи та онлайн-запис через Booksy.",
    "contact.heading": "Контакт",
    "contact.intro": "Записуйтесь онлайн через Booksy або завітайте до одного з 4 салонів у Кракові.",
    "contact.hours": "Години роботи",
    "contact.book": "Записатись",
    "contact.social": "Соціальні мережі",

    // Footer
    "footer.brand": "Мережа салонів краси в Кракові.",
    "footer.services": "Послуги",
    "footer.salons": "Салони",
    "footer.contact": "Контакт",
    "footer.privacy": "Політика конфіденційності",
    "footer.terms": "Умови використання",
  },
} as const;

export type UIKey = keyof typeof ui.pl;
