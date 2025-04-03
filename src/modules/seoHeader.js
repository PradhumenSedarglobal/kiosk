import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'next-i18next';

const SeoHeader = ({ data, router }) => {
    
    let { query, asPath, locale } = router;
    const { t } = useTranslation("common");
    const strExists = ['[PRODUCT_COLOR]', '[PRODUCT_NAME]', '[CATEGORY_NAME]', '[COUNTRY]'];
    const url = process.env.NEXT_PUBLIC_LOCAL_API_URL || 'https://www.sedarglobal.com/';
    let seo = data && data.SEO && data.SEO != 'null' ? data.SEO : '';
    let meta_title = seo && seo.SEO_META_TITLE && seo.SEO_META_TITLE != 'null' ? seo.SEO_META_TITLE : 'Sedar';
    

    let meta_desc = seo && seo.SEO_META_DESC && seo.SEO_META_DESC.replace(/(<([^>]+)>)/ig, '') && seo.SEO_META_DESC != 'null' ? seo.SEO_META_DESC.replace(/(<([^>]+)>)/ig, '') : '';
    let og_title = seo && seo.SEO_OG_TITLE && seo.SEO_OG_TITLE != 'null' ? seo.SEO_OG_TITLE : 'Sedar';
    let og_desc = seo && seo.SEO_OG_DESC && seo.SEO_OG_DESC.replace(/(<([^>]+)>)/ig, '') && seo.SEO_OG_DESC != 'null' ? seo.SEO_OG_DESC.replace(/(<([^>]+)>)/ig, '') : '';
    let og_image = seo && seo.SEO_OG_IMAGE_PATH && seo.SEO_OG_IMAGE_PATH != 'null' ? seo.SEO_OG_IMAGE_PATH : '';
    let og_image_width = seo && seo.SEO_OG_IMAGE_WIDTH && seo.SEO_OG_IMAGE_WIDTH != 'null' ? seo.SEO_OG_IMAGE_WIDTH : '';
    let og_image_height = seo && seo.SEO_OG_IMAGE_HEIGHT && seo.SEO_OG_IMAGE_HEIGHT != 'null' ? seo.SEO_OG_IMAGE_HEIGHT : '';
    let og_type = seo && seo.SEO_OG_TYPE && seo.SEO_OG_TYPE != 'null' ? seo.SEO_OG_TYPE : 'website';
    let twitter_site = seo && seo.SEO_TWITTER_SITE && seo.SEO_TWITTER_SITE != 'null' ? seo.SEO_TWITTER_SITE : '';
    let twitter_title = seo && seo.SEO_TWITTER_TITLE && seo.SEO_TWITTER_TITLE != 'null' ? seo.SEO_TWITTER_TITLE : 'Sedar';
    let twitter_card = 'summary_large_image'; //seo && seo.SEO_TWITTER_CARD && seo.SEO_TWITTER_CARD != 'null' ? seo.SEO_TWITTER_CARD : '';
    let twitter_desc = seo && seo.SEO_TWITTER_DESC && seo.SEO_TWITTER_DESC.replace(/(<([^>]+)>)/ig, '') && seo.SEO_TWITTER_DESC != 'null' ? seo.SEO_TWITTER_DESC.replace(/(<([^>]+)>)/ig, '') : '';
    //let country_iso = seo && seo.country_iso && seo.country_iso.toUpperCase() && seo.country_iso != 'null' ? seo.country_iso.toUpperCase() : '';
    let country_iso = seo && seo.country_iso && seo.country_iso && seo.country_iso != 'null' ? seo.country_iso : '';

    let categoryData = [];
    
    let metaTitleInclude = strExists.some(el => meta_title.includes(el));
    let metaDescInclude = strExists.some(el => meta_desc.includes(el));
    if (metaTitleInclude || metaDescInclude) {
        const slugArray = query?.slug || [];
        const colorQuery = query?.color || '';
        const slug = slugArray.length > 1 ? slugArray[slugArray.length - 1] : slugArray[0];
        let categoryDataImage = '';
        let categoryDataContent = '';
        if (slugArray.length == 1) {
            categoryData = data?.COMPONENT?.[2]?.PARENT?.CHILD?.filter((element) => element.link_url == slug);
        } else if (slugArray.length == 2) {
            categoryData = data?.COMPONENT?.[2]?.PARENT?.CHILD?.map((element) =>
                (element?.SUB_CHILD ?? []).filter((innerElement) => innerElement.link_url === slugArray[0] + '/' + slugArray[1])
            ).filter((subChildArray) => subChildArray.length > 0)[0];
            
            if(categoryData){
                categoryDataImage = categoryData[0]?.banner_image_path || '';
                categoryDataContent = categoryData[0]?.content || '';
            }else{
                categoryDataImage = '';
                categoryDataContent = '';
            }
        }
       
        const mapObj = {
            '[CATEGORY_NAME]': categoryDataContent  || '',
            '[COUNTRY]': country_iso,
            '[PRODUCT_COLOR]': t(colorQuery),
            '[PRODUCT_NAME]': seo?.SFP_TITLE + ' - '  +seo?.CL_DESC+ ' - '  +seo?.SII_ITEM_ID || '',
        }
        meta_title = meta_title.replace(/\[CATEGORY_NAME]|\[COUNTRY]|\[PRODUCT_COLOR]|\[PRODUCT_NAME]/gi, matched => mapObj[matched]);
        meta_desc = meta_desc.replace(/\[CATEGORY_NAME]|\[COUNTRY]|\[PRODUCT_COLOR]|\[PRODUCT_NAME]/gi, matched => mapObj[matched]);
        og_title = meta_title;
        og_desc = meta_desc;
        og_image = categoryDataImage;
        og_image_width = 200;
        og_image_height = 200;
        // og_type = 'website';
        twitter_site = 'https://twitter.com/SedarGlobal';
        twitter_title = meta_title;
        // twitter_card = 'summary_large_image';
        twitter_desc = meta_desc;


    }


    const regex1 = new RegExp(`\\| Sedar\\s*${country_iso}\\s*`, 'gi');
    const regex2 = new RegExp(`\\| سيدار\\s*${country_iso}\\s*`, 'gi');
    //meta_title = meta_title?.replace(regex1, '')?.replace(regex2, '') || ''; //meta_title.length > 65 ? meta_title.replace(regex1, '').replace(regex2, '') : meta_title;
    return (
        <Head>
            <title>{meta_title}</title>
            <meta name="description" content={meta_desc || t('sedar')} />
            <meta name="robots" content="index,follow" />
            <meta property="category" content="Sedar Global" />
            <meta property="og:site_name" content="Sedar Global" />
            <meta property="og:title" content={og_title || t('sedar')} />
            <meta property="og:description" content={og_desc || t('sedar')} />
            <meta property="og:image" content={og_image || `${url}assets/images/logo.png`} />
            <meta property='og:type' content={og_type} />
            <meta name="twitter:title" content={twitter_title || t('sedar')} />
            <meta name="twitter:description" content={twitter_desc || t('sedar')} />
            <meta name="twitter:card" content={twitter_card || 'summary_large_image'} />
            <meta name="twitter:site" content={twitter_site} />
            <meta property='twitter:image' content={og_image || `${url}assets/images/logo.png`} />
            <meta property='og:url' content={`${url}${locale != 'default' ? locale : ''}${asPath != '/' ? asPath?.split('?')[0] || '' : ''}`} />
        </Head>
    )
}

export default SeoHeader