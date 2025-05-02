import React from 'react'
import Head from 'next/head';

export default function CanonicalTag(props) {
    const { locales, locale, route, asPath, query } = props?.router;
    let canonicalPath = '';
    const url = 'https://www.sedarglobal.com';
    if (['kitchen', 'office'].indexOf(query['room type']) >= 0 && query['min'] == 90 && query['max'] == 130 && query['slug'][0] == 'blinds-shades') {

        canonicalPath = `${asPath.split("?")[0]}?min=${query['min']}&max=${query['max']}&room type=${query['room type']}`;

    } else if (query['product'] == 'blackout roller blinds' && query['min'] == 90 && query['max'] == 130 && query['slug'][0] == 'blinds-shades') {

        canonicalPath = `${asPath.split("?")[0]}?min=${query['min']}&max=${query['max']}&product=${query['product']}`;

    } else if (query['material'] == 'blackout' && query['min'] == 100 && query['max'] == 200 && query['slug'][0] == 'curtains-and-drapes') {

        canonicalPath = asPath.split("?")[0];

    } else if (['floral', 'geometric'].indexOf(query['design']) >= 0 && query['min'] == 50 && query['max'] == 100 && query['slug'][0] == 'wallpaper') {

        canonicalPath = `${asPath.split("?")[0]}?min=${query['min']}&max=${query['max']}&room type=${query['design']}`;

    } else if (['paper', 'vinyl'].indexOf(query['material']) >= 0 && query['min'] == 50 && query['max'] == 100 && query['slug'][0] == 'wallpaper') {

        canonicalPath = `${asPath.split("?")[0]}?min=${query['min']}&max=${query['max']}&room type=${query['material']}`;

    } else {
        canonicalPath = asPath.split("?")[0];
    }
    
    let aHref = `${url}${locale != "default" ? locale : ''}${route != '/' && asPath.indexOf("?") !== -1 ? canonicalPath : route != '/' ? asPath : ''}`;
    return (
        <Head>
            <link rel="alternate" hreflang="x-default" href="https://www.sedarglobal.com" />
            {locales && locales.map((locale, index) => {
                let localeHref = "";
                switch (locale) {
                    case "global-en":
                        localeHref = "en"
                        break;
                    case "global-ar":
                        localeHref = "ar"
                        break;
                    case "bhr-en":
                        localeHref = "en-bh"
                        break;
                    case "bhr-ar":
                        localeHref = "ar-bh"
                        break;
                    case "ksa-en":
                        localeHref = "en-sa"
                        break;
                    case "ksa-ar":
                        localeHref = "ar-sa"
                        break;
                    case "uae-en":
                        localeHref = "en-ae"
                        break;
                    case "uae-ar":
                        localeHref = "ar-ae"
                        break;
                    case "omn-en":
                        localeHref = "en-om"
                        break;
                    case "omn-ar":
                        localeHref = "ar-om"
                        break;
                    case "qat-en":
                        localeHref = "en-qa"
                        break;
                    case "qat-ar":
                        localeHref = "ar-qa"
                        break;
                    case "bhr-ru":
                        localeHref = "ru-bh"
                        break;
                    case "ksa-ru":
                        localeHref = "ru-sa"
                        break;
                    case "uae-ru":
                        localeHref = "ru-ae"
                        break;
                    case "omn-ru":
                        localeHref = "ru-om"
                        break;
                    case "qat-ru":
                        localeHref = "ru-qa"
                        break;
                    case "kwt-en":
                        localeHref = "en-kw"
                        break;
                    case "kwt-ar":
                        localeHref = "ar-kw"
                        break;
                    case "kwt-ru":
                        localeHref = "ru-kw"
                        break;
                    // case "x-default":
                    //     localeHref = "x-default"
                    //     break;
                    default:
                        //localeHref = "default"
                        localeHref = ""
                        break;
                }


                return locale != "default" && localeHref != '' ?
                    (<link key={index} rel="alternate" hreflang={localeHref} href={`${url}${locale}${route != '/' && asPath.indexOf("?") !== -1 ? asPath.split("?")[0] : route != '/' ? asPath : ''}`} />)
                    : ('')
            })}

            {
                props.pagetype == 'PRODUCT' ?
                    (
                        <link rel="canonical" href={`https://www.sedarglobal.com/${locale != "default" ? locale : ''}${route != '/' && asPath.indexOf("?") != -1 ? `/product${canonicalPath}` : route != '/' ? `/product${asPath}` : ''}`} />
                    )
                    :
                    (
                        <link rel="canonical" href={`https://www.sedarglobal.com/${locale != "default" ? locale : ''}${route != '/' && asPath.indexOf("?") != -1 ? canonicalPath : route != '/' ? asPath : ''}`} />
                    )
            }

        </Head>
    )
}
