
export const countries = {
    BH: {
        code: "bhr",
        name: "Bahrain",
        country_code: "BH"
    },
    SA: {
        code: "ksa",
        name: "KSA",
        country_code: "SA"
    },
    AE: {
        code: "uae",
        name: "UAE",
        country_code: "AE"
    },
    US: {
        code: "global",
        name: "Global",
        country_code: "XX"
    },
    OM: {
        code: "omn",
        name: "Oman",
        country_code: "OM"
    },
    QA: {
        code: "qat",
        name: "qatar",
        country_code: "QA"
    },
    XX: {
        code: "global",
        name: "Global",
        country_code: "XX"
    },
    //  EG: {
    //      code: "egy",
    //      name: "egy",
    //      country_code: "EG"
    //  },

};

export const countries_en_url = {
    'uae-en': {
        code: "uae",
        name: "UAE",
        country_code: "AE",
        lang: 'en',
        path: '/assets/images/ae.png',
        ccy_code: 'AED'
    },
    'ksa-en': {
        code: "ksa",
        name: "KSA",
        country_code: "SA",
        lang: 'en',
        path: '/assets/images/sa.png',
        ccy_code: 'SAR'
    },
    'omn-en': {
        code: "omn",
        name: "Oman",
        country_code: "OM",
        lang: 'en',
        path: '/assets/images/om.png',
        ccy_code: 'OMR'
    },
    'qat-en': {
        code: "qat",
        name: "qatar",
        country_code: "QA",
        lang: 'en',
        path: '/assets/images/qa.png',
        ccy_code: 'QAR'
    },
    'bhr-en': {
        code: "bhr",
        name: "Bahrain",
        country_code: "BH",
        lang: 'en',
        path: '/assets/images/bh.png',
        ccy_code: 'BHD'
    },
    'global-en': {
        code: "global",
        name: "Global",
        country_code: "XX",
        lang: 'en',
        path: '/assets/images/xx.png',
        ccy_code: 'USD'
    },
    // 'egy-en': {
    //     code: "egy",
    //     name: "Egypt",
    //     country_code: "EG",
    //     lang: 'en',
    //     path: '/assets/images/eg.png',
    //     ccy_code: 'EGP'
    // }

};

export const countries_ar_url = {
    'uae-ar': {
        code: "uae",
        name: "UAE",
        country_code: "AE",
        lang: 'ar',
        path: '/assets/images/ae.png',
        ccy_code: 'AED'
    },
    'ksa-ar': {
        code: "ksa",
        name: "KSA",
        country_code: "SA",
        lang: 'ar',
        path: '/assets/images/sa.png',
        ccy_code: 'SAR'
    },
    'omn-ar': {
        code: "omn",
        name: "Oman",
        country_code: "OM",
        lang: 'ar',
        path: '/assets/images/om.png',
        ccy_code: 'OMR'
    },
    'qat-ar': {
        code: "qat",
        name: "qatar",
        country_code: "QA",
        lang: 'ar',
        path: '/assets/images/qa.png',
        ccy_code: 'QAR'
    },
    'bhr-ar': {
        code: "bhr",
        name: "Bahrain",
        country_code: "BH",
        lang: 'ar',
        path: '/assets/images/bh.png',
        ccy_code: 'BHD'
    },
    'global-ar': {
        code: "global",
        name: "Global",
        country_code: "XX",
        lang: 'ar',
        path: '/assets/images/xx.png',
        ccy_code: 'USD'
    },
    // 'egy-ar': {
    //     code: "egy",
    //     name: "Egypt",
    //     country_code: "EG",
    //     lang: 'ar',
    //     path: '/assets/images/eg.png',
    //     ccy_code: 'EGP'
    // }

};

export const countries_ru_url = {
    'uae-ru': {
        code: "uae",
        name: "UAE",
        country_code: "AE",
        lang: 'ru',
        path: '/assets/images/ae.png',
        ccy_code: 'AED'
    },
    'ksa-ru': {
        code: "ksa",
        name: "KSA",
        country_code: "SA",
        lang: 'ru',
        path: '/assets/images/sa.png',
        ccy_code: 'SAR'
    },
    'omn-ru': {
        code: "omn",
        name: "Oman",
        country_code: "OM",
        lang: 'ru',
        path: '/assets/images/om.png',
        ccy_code: 'OMR'
    },
    'qat-ru': {
        code: "qat",
        name: "qatar",
        country_code: "QA",
        lang: 'ru',
        path: '/assets/images/qa.png',
        ccy_code: 'QAR'
    },
    'bhr-ru': {
        code: "bhr",
        name: "Bahrain",
        country_code: "BH",
        lang: 'ru',
        path: '/assets/images/bh.png',
        ccy_code: 'BHD'
    },
    'global-ru': {
        code: "global",
        name: "Global",
        country_code: "XX",
        lang: 'ru',
        path: '/assets/images/xx.png',
        ccy_code: 'USD'
    },
    // 'egy-ru': {
    //     code: "egy",
    //     name: "Egypt",
    //     country_code: "EG",
    //     lang: 'ru',
    //     path: '/assets/images/eg.png',
    //     ccy_code: 'EGP'
    // }

};


export const countries_url_path = {
    ...countries_en_url,
    ...countries_ar_url,
    ...countries_ru_url
};

export const countries_lang = [
    {
        'en': { ...countries_en_url },
        'ar': { ...countries_ar_url },
        'ru': { ...countries_ru_url },
    }
];

export const locales = [
    {
        code: "ar",
        name: "عربي",
        dir: "rtl"
    },
    {
        code: "en",
        name: "English",
        dir: "ltr"
    },
    {
        code: "ru",
        name: "Russian",
        dir: "ltr" 
    }
];

export const countryCode = ["BH", "SA", "AE", "OM", "QA"];

export const defaultCountryPath = {
    BH: {
        url: "bhr"
    },
    SA: {
        url: "ksa"
    },
    AE: {
        url: "uae"
    },
    OM: {
        url: "omn"
    },
    QA: {
        url: "qat"
    },
    XX: {
        url: "global"
    },
    //  EG: {
    //      url: "egy"
    //  }

}
 