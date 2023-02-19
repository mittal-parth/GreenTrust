import Carousel from "react-multi-carousel";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import IconButton from "./IconButton";


export default function CustomCarousel({ children, responsive }) {
  return (<Carousel
    className="!overflow-visible"
    swipeable={true}
    draggable={false}
    // showDots={true}
    responsive={responsive}
    keyBoardControl={true}
    customTransition="transform 300ms ease-in-out"
    transitionDuration={500}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["sm", "xs"]}
    dotListClass="carousel-dot-list"
    itemClass="mx-4"
    // partialVisbile={true}
    centerMode={true}
    customRightArrow={<IconButton styles="react-multiple-carousel__arrow react-multiple-carousel__arrow--right !bg-darkGray/30 hover:!bg-darkGray/60 z-0" />}
    customLeftArrow={<IconButton styles="react-multiple-carousel__arrow react-multiple-carousel__arrow--left !bg-darkGray/30 hover:!bg-darkGray/60 z-0" />}
    // renderDotsOutside={true}
  >
    {children}
  </Carousel>);
}
