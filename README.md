# Green Chick Chop

## Changes

- home.module.scss

  - carouselTextContainer
    - Added display: none to remove the description text

- pages/app/index.js
  - Removing location search
  - Line 35: componentDidMount

## Making the Category Navigation Bar Scrollable

- Path: pages/app/header/header.module.scss
- bottomNavigationContainer
- ````@media #{$mobile_device} {
    height: unset;
    overflow-x: auto;
  }```
  ````

## Making the cards larger (in mobile)

- productList.modele.scss/productWrapTitleContainer
  - grid-template-columns: repeat(auto-fill, 300px) !important;
- productList.modele.scss/productWrapContainer
  - grid-template-columns: repeat(auto-fill, 300px);
- ItemCard/itemCard.modules.scss/itemCardContainer
  - @media #{$mobile_device} {
    font-size: $normal-font-mobile;
    width: 300px;
    height: 300px;
    }

## Makinng Quality check small

- qualitycheck_module.scss/mainContainer
  - height: 50px; (in mobile)
- qualitycheck_module.scss/listStyle
  - display: none; (in mobile)
- qualitycheck_module.scss/listLastStyle
  - display: none; (in mobile)

## Making image large

- home.module.scss
  - imageStyle:
    @media #{\$mobile_device} {
    height: 200px;
    }

## Reduce search bar width

- components/SearchBar/index.js
- SET: "@media (min-width: 340px) and (max-width: 767px)": {
  width: "250px",
  margin: "0px 10px",
  },

## Making the Category List Small and 3 in a line

- .categoryCard/categoryCardContainer
  width: 90px;
  height: 90px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin: 5px;
- home/categoryCardWrapContainer
  display: block;
- categoryCard/categoryCardContentStyle
  height: 30px;
- categoryCard/categoryCardSubTitleStyle
  display: none;

## Making the Bestselling view horizonntal scrollable

- productList/mainProductWrapContainer
  height: 400px
  overflow: auto
  max-height: 400px;
  width: 100%;
- productList/productMainContainer
  margin: 0px;
- productList/productWrapContainer
  text-align: start;
  white-space: nowrap;
  width: 400px;
  max-width: 400px;
  overflow-x: scroll;
  margin-left: 20px;
- productList/productWrapContainer
  display : block
- itemCard/itemCardContainer
  width: 300px
  height: 300px;
  margin-left: 10px;
  display: inline-block;
  text-align: start;
- productList/.productMainContainer h3
  @media #{\$mobile_device} {
  padding-left: 10px;
  color: #607D8B;
  font-weight: bolder;
  }

## Changing the banner UI

- node_modules/react-responsive-carousel/lib/styles/carousel.min.css
  .carousel .slider-wrapper{
  @media #{\$mobile_device} {
  overflow: hidden;
  margin: auto;
  width: 95%;
  border-radius: 10px;
  margin-top: 20px;
  box-sizing: border-box;
  transition: height .15s ease-in;
  box-shadow: 2px 4px 4px 2px #eee;
  }
  }

## Banner Bug

- Mobile banner are called every time the screen loads

## Hiding online payments

- payments/paymentMode.js
  - Hide the corresponsing field
