// @mui
import SkeletonProductDropDownFilter from "./filterProductDropDown";
import SkeletonProductFilterHeading from "./filterHeading";
import SkeletonProductFilterSizeAvailability from "./filterSizeAvailability";
import SkeletonProductAccordionFilter from "./filterProductAccordion";

// ----------------------------------------------------------------------

export default function SkeletonProductFilter({ ...other }) {
    return (
        <>
            <SkeletonProductFilterHeading />
            <SkeletonProductFilterSizeAvailability/>
            <SkeletonProductDropDownFilter />
            <SkeletonProductAccordionFilter/>
        </>
    );
}
