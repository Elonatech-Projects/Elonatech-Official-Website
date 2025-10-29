import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { lazy, useState, Suspense, useEffect } from 'react';
import { CartProvider } from 'react-use-cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './index.css';
import { useAuth } from './components/admin/AuthContext';
import ReactGA from 'react-ga4';

const NewsDetails = lazy(() => import("./components/news/newsDetails/newsDetails"));
const NewsRelated = lazy(() => import("./components/news/newsDetails/newsRelated"));
const TrendDetails = lazy(() => import("./components/trends/TrendDetails/trendDetails"));
const TrendRelated = lazy(() => import("./components/trends/TrendDetails/trendRelated"));
const Trial = lazy(() => import("./components/blogDetails/Trial"));
const JobApplicationSuccess = lazy(() => import("./components/JobApplicationSuccess/JobApplicationSuccess"));



const LoadingPages = lazy(() => import("./components/LoadingPages/LoadingPages"));
const Navbar = lazy(() => import("./components/navbar/navbar"));
const Footer = lazy(() => import("./components/footer/footer"));
const Error = lazy(() => import("./components/error/error"));
const Web = lazy(() => import("./components/web/web"));
const AppDevelopment = lazy(() => import("./components/APP/app"));
const Portfolio = lazy(() => import("./components/portfolio/portfolio"));
const Team = lazy(() => import("./components/team/team"));
const Company = lazy(() => import("./components/company/company"));
const Network = lazy(() => import("./components/network/network"));
const Policy = lazy(() => import("./components/policy/policy"));
const Digital = lazy(() => import("./components/digital/digital"));
const Home = lazy(() => import("./components/home/home"));
const Engineer = lazy(() => import("./components/engineer/engineer"));
const Mobile = lazy(() => import("./components/mobile/mobile"));
const Printer = lazy(() => import("./components/printer/printer"));
const Access = lazy(() => import("./components/access/access"));
const Suvalliance = lazy(() => import("./components/suvalliance/suvalliance"));
const Networka = lazy(() => import("./components/networkA/networka"));
const Server = lazy(() => import("./components/server/server"));
const Integration = lazy(() => import("./components/integration/integration"));
const Cabling = lazy(() => import("./components/cabling/cabling"));
const Cctv = lazy(() => import("./components/cctv/cctv"));
const Internet = lazy(() => import("./components/internet/internet"));
const Security = lazy(() => import("./components/security/security"));
const Time = lazy(() => import("./components/time/time"));
const Blog = lazy(() => import("./components/blog/blog"));
const News = lazy(() => import("./components/news/News"));
const Trends = lazy(() => import("./components/trends/Trends"));

// =================================================

const Voip = lazy(() => import("./pages/telecom/voip"))
const IpTelephony = lazy(() => import("./pages/telecom/ip-telephony"))


// ================================================

const Domain = lazy(() => import("./pages/webs/domain/domain"))
const Hosting = lazy(() => import("./pages/webs/hosting/hosting"))


// =============================================
const Content = lazy(() => import("./pages/marketing/content/content"))
const Ppc = lazy(() => import("./pages/marketing/ppc/ppc"))
const Seo = lazy(() => import("./pages/marketing/seo/seo"))
const Social = lazy(() => import("./pages/marketing/social/social"))
const Mail = lazy(() => import("./pages/marketing/mail/mail"))

// ========================================
const Application = lazy(() => import("./pages/software/application/application"))
const Business = lazy(() => import("./pages/software/business/business"))
const SoftwareSupply = lazy(() => import('./pages/software/system-supply/softwareSupply'))
const SystemSoftware = lazy(() => import("./pages/software/system-software/system-software"))

// =================================
const Computer = lazy(() => import("./pages/sales/computer/computer"))
const Office = lazy(() => import("./pages/sales/office/office"))
const Shop = lazy(() => import("./pages/sales/shop/shop"))
const Pos = lazy(() => import("./pages/sales/pos/pos"))
const PrinterSales = lazy(() => import("./pages/sales/printers/printers"))

// =====================================
const SingleProduct = lazy(() => import("./pages/sales/singleProduct/singleProduct"))
const BlogDetails = lazy(() => import("./components/blogDetails/blogDetails"))
const BlogWrite = lazy(() => import("./components/blogWrite/blogWrite"))
const BlogUpdate = lazy(() => import("./components/blog/blogUpdate/blogUpdate"))
const BlogRelated = lazy(() => import("./components/blogDetails/blogRelated"))


// =====================================
const Graphic = lazy(() => import("./pages/add/graphic/graphic"))
const Branding = lazy(() => import("./pages/add/branding/branding"))
const Animation = lazy(() => import("./pages/add/animation/Animation"))
const Video = lazy(() => import("./pages/add/video/Video"))
const Motion = lazy(() => import("./pages/add/motion/motion"))
const Uiux = lazy(() => import("./pages/add/uiux/uiux"))
const Career = lazy(() => import("./pages/add/career/career"))
const Technical = lazy(() => import("./pages/add/technical/technical"))
const Remote = lazy(() => import("./pages/add/remote/remote"))
const Livestreaming = lazy(() => import("./pages/add/livestreaming/livestreaming"))
const Videoconferencing = lazy(() => import("./pages/add/videoconferencing/videoconferencing"))

// ===========================================
const AnimationCareer = lazy(() => import("./pages/add/animationCareer/animationCareer"))
const DigitalCareer = lazy(() => import("./pages/add/digitalCareer/digitalCareer"))
const GraphicCareer = lazy(() => import("./pages/add/graphicCareer/graphicCareer"))
const MarketingCareer = lazy(() => import("./pages/add/marketingCareer/marketingCareer"))
const SystemCareer = lazy(() => import("./pages/add/systemCareer/systemCareer"))
const WebCareer = lazy(() => import("./pages/add/webCareer/webCareer"))
const Shopwrite = lazy(() => import("./pages/sales/shop/shopWrite/shopWrite"))
const ComputerWrite = lazy(() => import("./pages/sales/computer/computerWrite"))

// ===============================================

const PrivateRoute = lazy(() => import("./components/privateRoute/PrivateRoute"))
const AdminLogin = lazy(() => import("./components/admin/admin"))
const Dashboard = lazy(() => import("./components/admin/dashboard"))
const ScrollTop = lazy(() => import("./components/scrolltop/scrolltop"))
const Hardware = lazy(() => import("./components/hardware/hardware"))
const Consumable = lazy(() => import("./components/consumble/consumable"))
const GetInTouchPage = lazy(() => import("./components/getIntouchPage/getInTouchPage"))
const Consulting = lazy(() => import("./components/consulting/consulting"))
const Retainership = lazy(() => import("./components/retainership/retainership"))
const Training = lazy(() => import("./components/trainer/training"))
const NetworkDevices = lazy(() => import("./pages/sales/networkDevices/networkDevices"))
const ShopUpdate = lazy(() => import("./pages/sales/shop/shopUpdate/shopUpdate"))
const NetworkSupport = lazy(() => import("./components/networkSupport/networkSupport"))

// ================================

const Cart = lazy(() => import("./components/cart/cart"))
const Checkout = lazy(() => import("./components/checkout/checkout"))
const Thankyou = lazy(() => import("./components/cart/thankyou"))
const Teamchairman = lazy(() => import("./components/team/teamchairman"))
const TeamMd = lazy(() => import("./components/team/teamMd"))
const TeamAdmin = lazy(() => import("./components/team/teamAdmin"))
const TeamLead = lazy(() => import("./components/team/teamLead"))
const TeamSystem = lazy(() => import("./components/team/teamSystem"))
const TeamWeb = lazy(() => import("./components/team/teamWeb"))
const BlogPages = lazy(() => import("./components/blog/blogPages"));

// import Mailchimp from './components/mailchimp/mailchimp';




const Layout = () => {
  return (
    <>
      <Suspense fallback={<><LoadingPages /></>}>
        <CartProvider>
          <Navbar />
          <ScrollTop />
          <Outlet />
          <Footer />
        </CartProvider>
      </Suspense>
    </>

    // <>
    //   <CartProvider>
    //     <Navbar />
    //     <ScrollTop />
    //     <Suspense fallback={<LoadingPages />}>
    //     <Outlet />
    //     </Suspense>
    //     <Footer />
    //   </CartProvider>
    // </>
  )
}


const router = createBrowserRouter([
{
  path:"/",
  element: <Layout/>,
  errorElement:<Error  />,
  children:[
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/trial',
      element:<Trial/>
    },
    {
      path:'/application-success',
      element:<JobApplicationSuccess/>
    },
    {
      path:'/network',
      element:<Network/>
    },
    {
      path:'/portfolio',
      element:<Portfolio/>
    },
    {
      path:'/digital-marketing',
      element:<Digital/>
    },
    {
      path:'/policy',
      element:<Policy/>
    },
    {
      path:'/who-we-are',
      element:<Company/>
    },
    {
      path:'/web-design',
      element:<Web/>
    },
    {
      path:'/app-development',
      element:<AppDevelopment/>
    },
    {
      path:'/products',
      element:<Shop/>
    },
    // team ==============================
    {
      path:"/our-team",
      element:< Team/>
    },
    {
      path:"/israel-uhwonuwoma-o",
      element:<Teamchairman/>
    },
    {
      path:"/oreva-p-oku",
      element:<TeamMd/>
    },
    {
      path:"/violet-oku",
      element:< TeamAdmin />
    },
    {
      path:"/samuel-folarin",
      element:< TeamLead />
    },
    {
      path:"/jamiu-noah",
      element:< TeamSystem />
    },
    {
      path:"/joseph-okoronkwo",
      element:< TeamWeb />
    },
    // ===================================
    {
      path:'/hardware-engineering',
      element:<Engineer/>
    },
    {
      path:'/mobile-repair',
      element:<Mobile/>
    },
    {
      path:'/printer-repair',
      element:<Printer/>
    },
    {
      path:'/system-integration',
      element:<Integration/>
    },
    {
      path:'/structure-cabling',
      element:<Cabling/>
    },
    {
      path:'/cctv',
      element:<Cctv />
    },
    {
      path:'/internet',
      element:< Internet/>
    },
    {
      path:'/network-security',
      element:<Security/>
    },
    {
      path:'/access-control',
      element:<Access/>
    },
    {
      path:'/time-management',
      element:<Time/>
    },
    {
      path:'/blog',
      element:<Blog/>
    },
    {
      path: "/blog/page/:pagenumber",
      element: <Blog />
    },
    {
      path:'/blog/:slug',
      element:<BlogDetails/>
    },
    {
      path:'/blog/related/:slug',
      element:< BlogRelated/>
    },
    { path: '/news', element: <News /> },
    { path: '/news/page/:pagenumber', element: <News /> },
    { path: '/news/:slug', element: <NewsDetails /> },
    { path: '/news/page/:pagenumber/:slug', element: <NewsDetails /> },
    { path: '/news/related/:slug', element: <NewsRelated /> },
    { path: '/trends', element: <Trends /> },
    { path: '/trends/page/:pagenumber', element: <Trends /> },
    { path: '/trends/:slug', element: <TrendDetails /> },
    { path: '/trends/page/:pagenumber/:slug', element: <TrendDetails /> },
    { path: '/trends/related/:slug', element: <TrendRelated /> },
    {
      path:'/surveillance',
      element:<Suvalliance/>
    },
    {
      path:'/network-administration-implementation',
      element:<Networka/>
    },
    {
      path:'/server-administration',
      element:<Server/>
    },
    //=================== telecom pages
    {
      path:'/ip-telephony',
      element:< IpTelephony />
    },
    {
      path:'/voip',
      element:<Voip/>
    },
    //================================== web pages
    {
      path:'/domain',
      element:<Domain/>
    },
 
    {
      path:'/hosting',
      element:<Hosting/>
    },
  //============================== marketing
    {
        path:'/content-marketing',
        element:<Content/>
    },
    {
        path:'/ppc',
        element:<Ppc/>
       },
   
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/trial',
        element: <Trial />
      },
      {
        path: '/network',
        element: <Network />
      },
      {
        path: '/portfolio',
        element: <Portfolio />
      },
      {
        path: '/digital-marketing',
        element: <Digital />
      },
      {
        path: '/policy',
        element: <Policy />
      },
      {
        path: '/who-we-are',
        element: <Company />
      },
      {
        path: '/web-design',
        element: <Web />
      },
      {
        path: '/app-development',
        element: <AppDevelopment />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      // team ==============================
      {
        path: "/our-team",
        element: < Team />
      },
      {
        path: "/israel-uhwonuwoma-o",
        element: <Teamchairman />
      },
      {
        path: "/oreva-p-oku",
        element: <TeamMd />
      },
      {
        path: "/violet-oku",
        element: < TeamAdmin />
      },
      {
        path: "/samuel-folarin",
        element: < TeamLead />
      },
      {
        path: "/jamiu-noah",
        element: < TeamSystem />
      },
      {
        path: "/michael-jogoh",
        element: < TeamWeb />
      },
      // ===================================
      {
        path: '/hardware-engineering',
        element: <Engineer />
      },
      {
        path: '/mobile-repair',
        element: <Mobile />
      },
      {
        path: '/printer-repair',
        element: <Printer />
      },
      {
        path: '/system-integration',
        element: <Integration />
      },
      {
        path: '/structure-cabling',
        element: <Cabling />
      },
      {
        path: '/cctv',
        element: <Cctv />
      },
      {
        path: '/internet',
        element: < Internet />
      },
      {
        path: '/network-security',
        element: <Security />
      },
      {
        path: '/access-control',
        element: <Access />
      },
      {
        path: '/time-management',
        element: <Time />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: "/blog/page/:pagenumber",
        element: <Blog />
      },
      {
        path: '/blog/:slug/:id',
        element: <BlogDetails />
      },
      {
        path: '/blog/related/:slug/:id',
        element: < BlogRelated />
      },
      {
        path: '/news',
        element: <News />
      },
      {
        path: '/news/page/:pagenumber',
        element: <News />
      },
      {
        path: '/news/:slug/:id',
        element: <NewsDetails />
      },
      {
        path: '/news/page/:pagenumber/:slug/:id',
        element: <NewsDetails />
      },
      {
        path: '/news/related/:slug/:id',
        element: <NewsRelated />
      },
      {
        path: '/trends',
        element: <Trends />
      },
      {
        path: '/trends/page/:pagenumber',
        element: <Trends />
      },
      {
        path: '/trends/:slug/:id',
        element: <TrendDetails />
      },
      {
        path: '/trends/page/:pagenumber/:slug/:id',
        element: <TrendDetails />
      },
      {
        path: '/trends/related/:slug/:id',
        element: <TrendRelated />
      },
      {
        path: '/surveillance',
        element: <Suvalliance />
      },
      {
        path: '/network-administration-implementation',
        element: <Networka />
      },
      {
        path: '/server-administration',
        element: <Server />
      },
      //=================== telecom pages
      {
        path: '/ip-telephony',
        element: < IpTelephony />
      },
      {
        path: '/voip',
        element: <Voip />
      },
      //================================== web pages
      {
        path: '/domain',
        element: <Domain />
      },

      {
        path: '/hosting',
        element: <Hosting />
      },
      //============================== marketing
      {
        path: '/content-marketing',
        element: <Content />
      },
      {
        path: '/ppc',
        element: <Ppc />
      },

      {
        path: '/seo',
        element: <Seo />
      },
      {
        path: '/social-media-marketing',
        element: <Social />
      },
      {
        path: '/email-marketing',
        element: <Mail />
      },

      //================================================= software

      {
        path: "/application-software",
        element: <Application />
      },
      {
        path: "/business-software",
        element: <Business />
      },
      {
        path: "/system-software",
        element: <SystemSoftware />
      },

      //============================================================ sales

      {
        path: "/computers",
        element: < Computer />
      },
      {
        path: "/products",
        element: <Shop />
      },

      {
        path: "/printers",
        element: <PrinterSales />
      },
      {
        path: "/office-equipment",
        element: <Office />
      },
      {
        path: "/pos-system",
        element: <Pos />
      },
      {
        path: "/printer",
        element: <Printer />
      },

      //===================================== single product
      {
        path: "/product/:slug/:id",
        element: <SingleProduct />
      },
      {
        path: "/graphics-design",
        element: < Graphic />
      },
      {
        path: "/brand-identity",
        element: < Branding />
      },
      {
        path: '/animation',
        element: <Animation />
      },
      {
        path: "/video-editing",
        element: < Video />
      },
      {
        path: "/motion-graphics",
        element: < Motion />
      },

      {
        path: "/uiux",
        element: < Uiux />
      },
      {
        path: "/career",
        element: < Career />
      },
      {
        path: "/technical-support",
        element: < Technical />
      },
      {
        path: "/remote-support",
        element: < Remote />
      },
      {
        path: "/livestreaming",
        element: < Livestreaming />
      },
      {
        path: "/videoconferencing",
        element: < Videoconferencing />
      },
      // career page
      {
        path: "/animation-career",
        element: < AnimationCareer />
      },
      {
        path: "/digital-career",
        element: < DigitalCareer />
      },
      {
        path: "/graphic-career",
        element: < GraphicCareer />
      },
      {
        path: "/marketing-career",
        element: <  MarketingCareer />
      },
      {
        path: "/system-career",
        element: < SystemCareer />
      },
      {
        path: "/web-career",
        element: < WebCareer />
      },
      {
        path: "/write",
        element: <PrivateRoute>< BlogWrite /></PrivateRoute>
      },
      {
        path: "/update/:id",
        element: <PrivateRoute>< BlogUpdate /></PrivateRoute>
      },
      {
        path: "/shop-write",
        element: <PrivateRoute>< Shopwrite /></PrivateRoute>
      },
      {
        path: "/product/:id/update",
        element: <PrivateRoute><ShopUpdate /></PrivateRoute>
      },
      {
        path: "/computer-write",
        element: <PrivateRoute>< ComputerWrite /></PrivateRoute>
      },
      {
        path: "/login",
        element: <AdminLogin />
      },
      {
        path: "/dashboard",
        element: <PrivateRoute>< Dashboard /></PrivateRoute>
      },

      // Supplies
      {
        path: "/software-supply",
        element: <SoftwareSupply />
      },
      {
        path: "/hardware-supply",
        element: < Hardware />
      },
      {
        path: "/consumables",
        element: < Consumable />
      },
      {
        path: "/get-in-touch",
        element: < GetInTouchPage />
      },
      {
        path: "/consulting",
        element: <Consulting />
      },

      {
        path: "/retainer-partnership",
        element: <Retainership />
      },

      {
        path: "/training",
        element: <Training />
      },

      {
        path: "/network-devices",
        element: <NetworkDevices />
      },
      {
        path: "/network-support",
        element: <NetworkSupport />
      },
      {
        path: "/cart",
        element: <Cart />
      },

      {
        path: "/checkout",
        element: <Checkout />
      },

      {
        path: "/thank-you",
        element: <Thankyou />
      },


    ],
  },

]);

const App = () => {
  const { isAuthenticated } = useAuth();
  const MEASUREMENT_ID = 'G-T9V3LN3YLR';
  
  useEffect(() => {
    // Initialize GA
    ReactGA.initialize(MEASUREMENT_ID);

    // Log page views for the initial load and route changes
    const logPageView = () => {
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    };
    logPageView();

    // Log visit to your backend
    const logVisit = async () => {
      try {
        await axios.post('/api/v1/visitors/log');
      } catch (error) {
        console.error('Error logging visitor:', error);
      }
    };
    logVisit();

    // Update GA on route changes
    window.addEventListener('popstate', logPageView);

    return () => window.removeEventListener('popstate', logPageView);
  }, []);

  return (
    <>
      <div className={isAuthenticated ? 'user-select-text' : 'user-select-none'}>
        <ToastContainer />
        <RouterProvider router={router} />
      </div>

    </>
  );
}


export default App;