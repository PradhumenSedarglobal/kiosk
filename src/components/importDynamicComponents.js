import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import React, { memo, useEffect, useMemo } from "react";
import SkeletonContactPage from "./skeleton/pages/contactSkeleton";


export const componentMap = {
  "Component/AboutUsBanner/AboutUsBanner": dynamic(
    () => import(`@/sections/about/banner`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/AboutusBringWorld/AboutusBringWorld": dynamic(
    () => import(`@/sections/about/aboutInfo`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/AboutReferenceSlider/AboutReferenceSlider": dynamic(
    () => import(`@/sections/about/slides`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/AboutTimeWise/AboutTimeWise": dynamic(
    () => import(`@/sections/about/aboutTimeWise`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/WhySedar/WhySedar": dynamic(
    () => import(`@/sections/about/aboutSedar`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/AboutHomeAutoMationBox/AboutHomeAutoMationBox": dynamic(
    () => import(`@/sections/about/aboutAutomation`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Franchise/Franchise": dynamic(
    () => import(`@/sections/about/aboutMedia`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/OurBrands/OurBrands": dynamic(
    () => import(`@/sections/homepage/secondary/brands`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/FooterAnnouncement/FooterAnnouncement": dynamic(
    () => import(`@/modules/announcement`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/Accessibilty/Accessibilty": dynamic(
    () => import(`@/sections/accessibility/accessibility`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/B2BRegistration/B2BRegistration": dynamic(
    () => import(`@/sections/B2BRegistration`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/Banner/Banner": dynamic(
    () => import(`@/sections/homepage/secondary/slider`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/HomeTopCategory/HomeTopCategory": dynamic(
    () => import(`@/sections/homepage/secondary/mobileView/menu`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Offer/NewCollection": dynamic(
    () => import(`@/sections/homepage/secondary/collection`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ProductSlider/ProductSlider": dynamic(
    () => import(`@/sections/homepage/secondary/category`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Franchise/Franchise": dynamic(
    () => import(`@/sections/homepage/secondary/projects`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/Blog/index": dynamic(() => import(`@/sections/blog`), {
    ssr: true,
    loading: () => <></>,
  }),

  "Component/LandingPage/LandingPage": dynamic(
    () => import(`@/sections/homepage/primary/landing/slider`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/BrandPageContent/BrandPageContent": dynamic(
    () => import(`@/sections/brands/production`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/BrandPage/BrandPage": dynamic(
    () => import(`@/sections/brands/BrandPage`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/Contact/MoreEnquires": dynamic(
    () => import(`@/sections/contact/enquiries`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/HomePageOurPresence/HomePageOurPresence": dynamic(
    () => import(`@/sections/findYourStore/index`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/QuickContact/QuickContact": dynamic(
    () => import(`@/sections/contact/QuickContact`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Faqpage/Faqpage": dynamic(
    () => import(`@/sections/contact/tabAccord`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ContactFormpage/ContactFormpage": dynamic(
    () => import(`@/sections/contact/form`),
    {
      ssr: false,
      loading: () => <SkeletonContactPage />,
    }
  ),

  "Component/CookiePolicy/CookiePolicy": dynamic(
    () => import(`@/sections/cookiePolicy/cookiePolicy`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/CommonBannerPage/CommonBannerPage": dynamic(
    () => import(`@/sections/customPrint/banner`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/FreeConsultationBookForm/FreeConsultationBookForm": dynamic(
    () => import(`@/modules/announcement/consultationForm/index`),
    {
      ssr: false,
      loading: () => <></>,
    }
  ),

  "Component/PageBanner/PageBanner": dynamic(
    () => import(`@/sections/franchise/banner`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Franchisevision/Franchisevision": dynamic(
    () => import(`@/sections/franchise/vision`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/WhyPartner/WhyPartner": dynamic(
    () => import(`@/sections/franchise/help`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Franchisevisionslider/Franchisevisionslider": dynamic(
    () => import(`@/sections/franchise/realty`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/FranchiseSupport/FranchiseSupport": dynamic(
    () => import(`@/sections/franchise/services`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/MediaCoverage/MediaCoverage": dynamic(
    () => import(`@/sections/franchise/slider`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/FranchiseeContactForm/FranchiseeContactForm": dynamic(
    () => import(`@/modules/form/franchiseeForm`),
    {
      ssr: false,
      loading: () => <></>,
    }
  ),

  "Component/FreeConsultationContentList/FreeConsultationContentList": dynamic(
    () => import(`@/sections/freeConsultation/content`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/HomeAutomationVideoBanner/HomeAutomationVideoBanner": dynamic(
    () => import(`@/sections/homeAutomation/banner`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/HomeAutomationBasicContent/HomeAutomationBasicContent": dynamic(
    () => import(`@/sections/homeAutomation/aboutHomeAutomation`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/HomeAutomationPartnerForConnect/HomeAutomationPartnerForConnect":
    dynamic(() => import(`@/sections/homeAutomation/partner`), {
      ssr: true,
      loading: () => <></>,
    }),
  "Component/HomeAutomationSedarStrength/HomeAutomationSedarStrength": dynamic(
    () => import(`@/sections/homeAutomation/strength`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/HomeAutomationVoiceControlSlider/HomeAutomationVoiceControlSlider":
    dynamic(() => import(`@/sections/homeAutomation/strengthSwiper`), {
      ssr: true,
      loading: () => <></>,
    }),
  "Component/HomeAutomationService/HomeAutomationService": dynamic(
    () => import(`@/sections/homeAutomation/professional`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/InquiryForm/InquiryForm": dynamic(
    () => import(`@/modules/form/homeAutomationForm`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/Privacypolicy/Privacypolicy": dynamic(
    () => import(`@/sections/privacyPolicy/privacyPolicy`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/ReturnsAndRefund/ReturnsAndRefund": dynamic(
    () => import(`@/sections/returnRefund/returnRefund`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/ServiceBanner/ServiceBanner": dynamic(
    () => import(`@/sections/service/banner`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Simplpieces/Simplpieces": dynamic(
    () => import(`@/sections/service/samplePieces`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/QualityServices_page/QualityServices_page": dynamic(
    () => import(`@/sections/service/qualityServices/index`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/TermsAndContitions/TermsAndContitions": dynamic(
    () => import(`@/sections/termsAndCondition/termsConditions`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/ToolsAndGuidesContentList/ToolsAndGuidesContentList": dynamic(
    () => import(`@/sections/toolsAndGuides/content`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ToolsAndinstructions/ToolsAndinstructions": dynamic(
    () => import(`@/sections/toolsAndGuides/category`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ToolsAndGuidFaq/ToolsAndGuidFaq": dynamic(
    () => import(`@/sections/toolsAndGuides/accordian`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/ContractsBanner/ContractsBanner": dynamic(
    () => import(`@/sections/contract/banner`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ContractsBringWorld/ContractsBringWorld": dynamic(
    () => import(`@/sections/contract/contractBringWorld`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ExploreProjectSection/ExploreProjectSection": dynamic(
    () => import(`@/sections/contract/exploreProjectSection`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/QualityServices/QualityServices": dynamic(
    () => import(`@/sections/contract/qualityServices/index`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/OurWorkforce/OurWorkforce": dynamic(
    () => import(`@/sections/contract/ourWorkForce`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Categorylist/ProjectManagement": dynamic(
    () => import(`@/sections/contract/projectManagement`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ProjectGallery/ProjectGallery": dynamic(
    () => import(`@/sections/contract/projectGallery`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ContractsForm/ContractsForm": dynamic(
    () => import(`@/modules/form/contractsForm`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),

  "Component/ProjectCategoryGroupBanner/ProjectCategoryGroupBanner": dynamic(
    () => import(`@/sections/hospitality/banner`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ProjectCategoryGroupHeading/ProjectCategoryGroupHeading": dynamic(
    () => import(`@/sections/hospitality/hospitalityInfo`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/ProjectCategoryGroupGrid/ProjectCategoryGroupGrid": dynamic(
    () => import(`@/sections/hospitality/projectCategory`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/OfferProductList/Index": dynamic(
    () => import(`@/sections/curtains_and_blinds/swiperCard`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/Offer/Offer": dynamic(
    () => import(`@/sections/curtains_and_blinds/allOffers`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  "Component/FreeSample/FreeSample": dynamic(
    () => import(`@/sections/freeSample/freeSampleCategory`),
    {
      ssr: true,
      loading: () => <></>,
    }
  ),
  // Add other components here...
};

export const ImportDynamicComponent = memo(({ url, isLanding, ...rest }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0); // Track the current component index
  const [isDownArrow, setIsDownArrow] = React.useState(false);

  // Function to detect which component is currently in view
  const handleScroll = () => {
    const components = document.querySelectorAll("[data-component]");
    components.forEach((component, index) => {
      const rect = component.getBoundingClientRect();
      // Check if the component is mostly visible in the viewport
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        setCurrentIndex(index);
      }
    });
  };

  useEffect(() => {
    if (isLanding) {
      const components = document.querySelectorAll("[data-component]");
      setIsDownArrow(currentIndex + 1 == components.length ? true : false);
    }
  }, [currentIndex, isLanding]);

  useEffect(() => {
    if (isLanding) {
      // Attach scroll event listener to track visible components
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll); // Cleanup event listener
      };
    }
  }, [isLanding]);

  // Handle arrow click to scroll to the next component
  const handleClick = () => {
    if (isLanding) {
      const components = document.querySelectorAll("[data-component]");
      if (components.length > 0) {
        const nextIndex = (currentIndex + 1) % components.length; // Move to the next component
        const nextComponent = components[nextIndex];
        if (nextComponent) {
          const topOffset =
            nextComponent.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: topOffset,
            behavior: "smooth",
          });

          setCurrentIndex(nextIndex); // Update the current component index after scrolling
        }
      }
    }
  };

  const Component = useMemo(() => componentMap[url] || null, [url]);

  return Component ? (
    <Box
      component="div"
      id={url}
      data-component={url}
      sx={(theme) => ({
        transition: theme.transitions.create("all", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.short,
        }),
      })}
    >
      <Component isLanding={isLanding} {...rest} />
      {isLanding && (
        <Box
          onClick={handleClick}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 15,
            cursor: "pointer",
            zIndex: 1400,
            display: {
              lg: "block",
              md: "none",
              sm: "none",
              xs: "none",
              xxs: "none",
            },
          }}
        >
          <ExpandCircleDownIcon
            color="primary"
            sx={(theme) => ({
              width: "60px",
              height: "60px",
              boxShadow: theme.customShadows.z8,
              borderRadius: "50%",
              border: `1px solid ${theme.palette.primary.light}`,
              color: theme.palette.primary.main,
              transform: isDownArrow ? "rotate(-180deg)" : "rotate(0deg)",
              transition: theme.transitions.create(
                ["all", "color", "transform"],
                {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.standard,
                }
              ),
              "&:hover": {
                color: theme.palette.primary.dark,
              },
            })}
          />
        </Box>
      )}
    </Box>
  ) : null;
});

ImportDynamicComponent.displayName = "ImportDynamicComponent";

const DynamicComponentRenderer = ({
  data = [],
  enq_type,
  isLanding,
  ...rest
}) => {
  return (
    <>
      {data &&
        data?.map((item, index) => (
          <React.Fragment key={`${item?.PARENT?.component_url}-${index}`}>
            <ImportDynamicComponent
              url={item.PARENT.component_url}
              data={item}
              breadcrumb={item?.result?.BREADCRUMB || ""}
              {...(enq_type && { enq_type })}
              isLanding={isLanding}
              {...rest}
            />
          </React.Fragment>
        ))}
    </>
  );
};

export default DynamicComponentRenderer;
