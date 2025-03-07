import Head from 'next/head';

export default function WebSiteShema(props) {
    const { locale } = props?.router;
    let meta_desc = props?.data && props?.data?.SEO_META_DESC && props?.data?.SEO_META_DESC.replace(/(<([^>]+)>)/ig, '') && props?.data?.SEO_META_DESC != 'null' ? props?.data?.SEO_META_DESC.replace(/(<([^>]+)>)/ig, '') : '';
    let schemas = {};
    const schema_url = process.env.NEXT_PUBLIC_SCHEMA_URL || 'https://schema.org';
    const url = process.env.NEXT_PUBLIC_LOCAL_API_URL || 'https://www.sedarglobal.com/';

    if (locale) {
        schemas = {
            "@context": `${schema_url}`,
            "@type": "WebSite",
            "name": "Sedar Global",
            "url": `${url}${locale != 'default' ? locale : ''}`,
            "description": `${meta_desc}`,
            "publisher": {
                "@type": "Organization",
                "name": "Sedar Global",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://api.sedarglobal.com/uploads/100001/header/1623314804_bd8bf9c117ab50f7f842.png"
                },
                "sameAs": [
                    "https://www.facebook.com/Sedar.Global",
                    "https://www.instagram.com/sedarglobal/",
                    "https://www.youtube.com/c/SedarGlobalChannel",
                    "https://www.linkedin.com/company/sedar-global1/",
                    "https://twitter.com/SedarGlobal",
                    "https://www.pinterest.com/sedarglobal/"
                ]
            }
        }
    }

    return (
        <Head>
            {schemas &&
                <script
                    type={`application/ld+json`}
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
                />
            }
        </Head>
    )
}
