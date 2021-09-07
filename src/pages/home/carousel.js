// eslint-disable-next-line 
import React, { Component } from "react";
// eslint-disable-next-line 
import agent from "./../../services/agent";
import image1 from "assets/images/wall (1).jpg";
import image2 from "assets/images/wall (2).jpg";
import image3 from "assets/images/wall (3).jpg";
import image4 from "assets/images/landing2.jpg";
import ImageConstant from "utils/imageConstants";
import Slider from "react-slick";
import styles from "./home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class BannerSlider extends React.Component {
  render(){
    let settings = { 
      slidesToShow:1,
      slidesToScroll:1,
      dots:true,
      fade:true,
      autoPlay:true,
      speed:900,
      className: 'TheSlickSlide'
    }
    return (
      <Slider {...settings} >
        <div>
          <div className={styles.slideContent}>
            <img src={image1} alt ="banner"/>
            <div className={styles.Content}>
              <h2>Green Chick Chop</h2>
              <p>Talk about food just as much as you eat it, you're in good company. We've got famous chefs and stars—Julia Child, Sophia Loren, Virginia Woolf—to thank for some of the greatest food quotes of all time. Do what you will with these: Memorize them, pin them, or print them out and tack them up all over your kitchen.</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.slideContent}>
            <img src={image2} alt ="banner"/>
            <div className={styles.Content}>
              <h2>We Delivery Fresh and healthy</h2>
              <p>Talk about food just as much as you eat it, you're in good company. We've got famous chefs and stars—Julia Child, Sophia Loren, Virginia Woolf—to thank for some of the greatest food quotes of all time. Do what you will with these: Memorize them, pin them, or print them out and tack them up all over your kitchen.</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.slideContent}>
            <img src={image3} alt ="banner"/>
            <div className={styles.Content}>
              <h2>Green Chick Chop</h2>
              <p>Talk about food just as much as you eat it, you're in good company. We've got famous chefs and stars—Julia Child, Sophia Loren, Virginia Woolf—to thank for some of the greatest food quotes of all time. Do what you will with these: Memorize them, pin them, or print them out and tack them up all over your kitchen.</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.slideContent}>
            <img src={image4} alt ="banner"/>
            <div className={styles.Content}>
              <h2>Green Chick Chop</h2>
              <p>Talk about food just as much as you eat it, you're in good company. We've got famous chefs and stars—Julia Child, Sophia Loren, Virginia Woolf—to thank for some of the greatest food quotes of all time. Do what you will with these: Memorize them, pin them, or print them out and tack them up all over your kitchen.</p>
            </div>
          </div>
        </div>
      </Slider>
      )
  }
}

export default BannerSlider;




// import React, { Component } from "react";
// import agent from "./../../services/agent";
// import { Carousel as NCarousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// import ImageConstant from "utils/imageConstants";

// import styles from "./home.module.scss";

// export default class Carousel extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mounted: false,
//       mobileBannerArray: null,
//     };
//   }

//   fetchMobileBanners = () => {
//     agent.User.getMobileBanner().then((response) => {
//       console.log(response);
//       if (response.data.success == true) {
//         this.setState({
//           mobileBannerArray: response.data.result.result,
//         });
//       } else {
//         this.setState({
//           mobileBannerArray: [],
//         });
//       }
//     });
//   };

//   componentDidMount() {
//     this.fetchMobileBanners();
//     this.handleMount(true);
//   }
//   componentWillUnmount() {
//     this.handleMount(false);
//   }

//   handleMount = (flag) => this.setState({ mounted: flag });

//   renderFallbackBaner = () => (
//     <NCarousel
//       autoPlay
//       showArrows={false}
//       showStatus={false}
//       showThumbs={false}
//       stopOnHover={false}
//       infiniteLoop={true}
//       transitionTime={800}
//       interval={3000}
//     >
//       <div>
//         <img
//           src={ImageConstant.LANDING_ONE_ICON}
//           className={styles.imageStyle}
//           alt="landing"
//         />
//       </div>
//       <div>
//         <img
//           src={ImageConstant.LANDING_TWO_ICON}
//           className={styles.imageStyle}
//           alt="landing"
//         />
//       </div>
//     </NCarousel>
//   );

//   render() {
//     const { bannerPayload } = this.props;
//     let bannerMobileArray = [];
//     if (
//       this.state.mobileBannerArray != null &&
//       this.state.mobileBannerArray.length != 0
//     ) {
//       this.state.mobileBannerArray.forEach((banner, index) => {
//         bannerMobileArray.push(banner.promotional_banner);
//       });
//     }
//     console.log(bannerMobileArray);
//     // let bannerMobileArray = [
//     //   "https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/banner%2Fmb1.png?alt=media&token=8f97561f-0dd6-46ce-8f1b-5f1d9732c83d",
//     //   "https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/banner%2Fmb2.png?alt=media&token=168006fc-6d71-4223-8e91-fea2c6e9244c",
//     //   "https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/banner%2Fmb3.png?alt=media&token=648e23ee-3246-46c2-bbcb-98aaa55f6ef9",
//     //   "https://firebasestorage.googleapis.com/v0/b/youngenginer-1c1ab.appspot.com/o/banner%2Fmb4.png?alt=media&token=9f4cc07a-577c-47ff-81de-d6202922faf2",
//     // ];

//     const screenWidth = window.screen.width;
//     let deviceType = 0;
//     if (parseInt(screenWidth) <= 424) {
//       deviceType = 1;
//     } else {
//       deviceType = 0;
//     }
//     return (
//       <>
//         {this.state.mounted && (
//           <div className={styles.carouselMainContainer}>
//             {/* <div className={styles.carouselTextContainer}>
//               <h1>Best Quality Food Delivery With All Safety Checks</h1>
//             </div> */}
//             <div className={styles.carouselMainContainer}>
//               {bannerPayload ? (
//                 <NCarousel
//                   autoPlay
//                   showArrows={false}
//                   showStatus={false}
//                   showThumbs={false}
//                   stopOnHover={false}
//                   infiniteLoop={true}
//                   transitionTime={800}
//                   interval={3000}
//                 >
//                   {deviceType == 0
//                     ? bannerPayload.map((banner, index) => (
//                         <div key={index}>
//                           <img
//                             src={banner}
//                             className={styles.imageStyle}
//                             alt="landing"
//                           />
//                         </div>
//                       ))
//                     : bannerMobileArray.map((banner, index) => (
//                         <div key={index}>
//                           <img
//                             src={banner}
//                             className={styles.imageStyle}
//                             alt="landing"
//                           />
//                         </div>
//                       ))}
//                 </NCarousel>
//               ) : (
//                 this.renderFallbackBaner()
//               )}
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }
// }
