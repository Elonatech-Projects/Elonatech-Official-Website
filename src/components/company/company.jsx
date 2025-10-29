
import about from './image/about.jpg';
import test from './image/razzer.jpg';
import test2 from './image/wallpaper-design-featured-image-1.jpg';
import innovation from './image/Innovation.svg';
import mindset from './image/Growth_Mindset.svg';
import integrity from './image/Integrity_icon.svg';
import commitment from './image/Commitment-to_Excellence.svg';
import teamwork from './image/Team-work.svg';
import './company.css';
import CompanyForm from '../forms/companyForm';
import companyProfilePdf from './Our-Company-Profile_Elonatech.pdf';
import { Helmet } from 'react-helmet-async';

const Company = () => {
  const ExperienceYears = () => {
   const startYear = 2010; 
   const startMonth = 3;  
   const startDate = new Date(startYear, startMonth);
   const now = new Date();

   let years = now.getFullYear() - startDate.getFullYear();
   const monthDiff = now.getMonth() - startDate.getMonth();

   if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())) {
    years--;
   }

    return years; 
  };
  
  return (
    <>
      <Helmet>
        <title>WHO WE ARE - Leading IT Solutions Provider with {`${ExperienceYears()}`} Years of Expertise</title>
        <meta

          name="description"
          content="A diversified company in pursuit of excellence in ‘IT’. The Best Innovative IT Solutions Provider with Over 13 Years of Experience. Excellence, Team Work, Integrity, Professionalism. Our Core Expertise focuses on Sales and Supply, Web Design and Development, Network Admin/Implementation, Access Control, PBX & Surveillance (CCTV), Hardware Engineering, Software Engineering, Digital Marketing, Graphics & Brand Identity, Livestreaming and Videoconferencing, Video Editing & Motion Graphics, Training, Consulting & Retainer Partnership, etc. that will enable you and your clients maximize technology in bringing about the desired results, and access to a wide array of office equipment."
        />
        <link rel="canonical" href="https://elonatech.com.ng/who-we-are" />
      </Helmet>

      {/*================================================================== header ===================================================*/}
      <div className="container-fluid our-company-section">
        <div className="text-content">
          <h2>Our Company</h2>
          <h5>A diversified company in pursuit of excellence in ‘IT’</h5>
          <p className="lead">
            We apply strategic and result-driven approaches, focused on helping
            forward-thinking businesses succeed
          </p>
        </div>
      </div>
      {/*========================================================================== the company ======================================================================*/}
      <div className="container-fluid py-5 wow fadeInUp custom-container" data-wow-delay="0.1s">
        <div className="container custom-container">
          <h3 className="fw-bold text-uppercase">ABOUT US</h3>
          <div className="mb-2" style={{ height: '2px', width: '4rem', backgroundColor: 'red' }}></div>
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="section-title position-relative pb-3 mb-">
                <h2 className="mt-3">
                  The Best Innovative IT Solutions Provider with Over {`${ExperienceYears()}`} Years
                  of Experience
                </h2>
              </div>
              <p className="mb-4">
                We, at Elonatech are aware of your current need for quality IT
                Services. Beyond reasonable doubt, the management of information
                technology for business is not inherently a do-it-yourself
                project. Business owners who aren’t tech-savvy need to find
                quality IT solution providers. We are experts in IT related
                matters.
              </p>
              <div class='row g-0 mb-3'>
                <div class='col-sm-6 wow zoomIn' data-wow-delay='0.2s'>
                  <h5 class='mb-3'>
                    <i class='fa fa-check text-primary me-3'></i>Best in
                    industry
                  </h5>
                  <h5 class='mb-3'>
                    <i class='fa fa-check text-primary me-3'></i>Professional
                    Staff
                  </h5>
                </div>
                <div class='col-sm-6 wow zoomIn' data-wow-delay='0.4s'>
                  <h5 class='mb-3'>
                    <i class='fa fa-check text-primary me-3'></i>24/7 Support
                  </h5>
                  <h5 class='mb-3'>
                    <i class='fa fa-check text-primary me-3'></i>Fair Prices
                  </h5>
                </div>
              </div>
              <div
                class='d-flex align-items-center mb-4 wow fadeIn'
                data-wow-delay='0.6s'
              >
                <div
                  class='d-flex align-items-center justify-content-center rounded'
                  style={{
                    height: '60px',
                    width: '60px',
                    backgroundColor: '#435d8b'
                  }}
                >
                  <i class='fa fa-phone-alt text-white'></i>
                </div>
                <div class='ps-4'>
                  <h5 class='mb-2'>Call to ask any question</h5>
                  <h4 class=' mb-0 text-primary' style={{ color: '' }}>
                    +234 9014544520
                  </h4>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-12 '>
                  <div className='row'>
                    <div className='col-md-5 '>
                      <CompanyForm />
                    </div>
                    <div className='col-md-7'>
                      <div className='float-start'>
                        <a
                          href={companyProfilePdf}
                          class='btn text-white  btn-danger text-start py-3 px-5 mt-3 wow zoomIn'
                          data-wow-delay='0.9s'
                        >
                          <h6>Download Our Company Profile</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'></div>
              </div>
            </div>
            <div className="col-lg-6 image-container"> 
              <div className="position-relative h-100">
                <img
                  className="image position-absolute w-100 h-100 rounded wow zoomIn lazyload"
                  data-wow-delay="0.9s"
                  src="https://res.cloudinary.com/elonatech/image/upload/v1710164778/loaderImage/Loading_icon_wrnmya.gif"
                  data-src="https://res.cloudinary.com/elonatech/image/upload/v1709823981/groupPicture/group_discussion_k7mwxx.png"
                  alt="Company Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*========================================================================= story continue 1 ==================================================================*/}
{/* <div className="container mt-4">
    <div className="row align-items-center">
        <div className="col-md-6"> 
        <div className=" text-center mt-2 mb-4" >
           <img src='https://i.stack.imgur.com/qq8AE.gif'     data-src="https://res.cloudinary.com/elonatech/image/upload/v1733493382/group_pics_2_b8ttnj.jpg" className="img-fluid rounded lazyload"  />
        </div>

          </div>
        </div>
      </div> */}
      {/*=========================================================================== our story =======================================================================*/}
      <div className='container text-center mt-'>
        <div className='row justify-content-md-center'>
          <div className='col-md-12'>
            <h3 className='mb-3'>Our Story</h3>
            <div
              className='mb-2'
              style={{
                backgroundColor: 'red',
                height: '1px',
                width: '14rem',
                margin: 'auto'
              }}
            ></div>
            <p class='taj'>
              Elonatech Nigeria Limited is a diversified company in pursuit of
              excellence in ‘IT’. Our company's logistical services are designed
              for the top-of-the-market corporate clientele; we serve to keep
              you above the turmoil of working in today's Nigeria. Our company
              is managed and structured to achieve effective results, even to
              the most challenging client requirement. This, we believe, forms
              the foundation for mutually beneficial, long-term partnerships and
              we ensure that we reach our goal of adding value to our client’s
              processes. We Endeavour to exceed our clients’ expectations with
              the solutions we provide, and aim at pricing our solutions and
              services competitively and deliver projects within budget while
              continuously striving to maintain premium quality.
            </p>
          </div>
        </div>
      </div>
      {/*========================================================================= story continue 1 ==================================================================*/}
      <div className='container mt-4'>
        <div className='row align-items-center'>
          <div className='col-md-6'>
            <div className=' text-center mt-2 mb-4'>
              <img
                src='https://i.stack.imgur.com/qq8AE.gif'
                data-src='https://res.cloudinary.com/elonatech/image/upload/v1723798509/group_pics_dg1sql.jpg'
                className='img-fluid rounded lazyload'
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className=''>
              <p
                className='wow fadeInUp taj'
                style={{ textAlign: 'justify' }}
                data-wow-delay='0.2s'
              >
                We are pleased to introduce our company, ELONATECH NIGERIA
                LIMITED, a diversified company in pursuit of excellence in ‘IT’.
                Elonatech Nigeria Limited with RC 1410636 has been in operation
                for several years as a Computer and Allied products
                dealer/supplier until much recently in April 2010, where it
                commenced operations as a One-stop IT Solution Outfit, and was
                incorporated on May 3rd, 2017. Our Company’s logistical services
                are designed for the top-of-the-market corporate clientele; we
                serve as an interface keeping you above the turmoil of working
                in today’s Nigeria with minimum hassle.
                <br />
                We strive to be the leading provider of innovative information
                technologies that improve the quality of lives. We delight in
                satisfying our clients through the provision of innovative,
                quality, timely, relevant, accurate and affordable solutions to
                their needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*======================================================================= story continue 2 ===================================================================*/}
      <div className='container mt-3'>
        <div className='row align-items-center'>
          <div className='col-md-6 mt-3'>
            <div className=''>
              <p
                className='wow fadeInUp'
                style={{ textAlign: 'justify' }}
                data-wow-delay='0.2s'
              >
                Our Core Expertise focuses on Sales and Supply, Web Design and
                Development, Network Admin/Implementation, Access Control, PBX &
                Surveillance (CCTV), Hardware Engineering, Software Engineering,
                Digital Marketing, Graphics & Brand Identity, Livestreaming and
                Videoconferencing, Video Editing & Motion Graphics, Training,
                Consulting & Retainer Partnership, etc. that will enable you and
                your clients maximize technology in bringing about the desired
                results, and access to a wide array of office equipment.
              </p>
              <p
                className='wow fadeInUp'
                style={{ textAlign: 'justify' }}
                data-wow-delay='0.2s'
              >
                In today’s complex and diverse data centre environments, a
                functional and diversified IT solutions provider is inevitable.
              </p>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='text-center'>
              <img
                src='https://i.stack.imgur.com/qq8AE.gif'
                data-src='https://res.cloudinary.com/elonatech/image/upload/v1709823784/groupPicture/the_team_113_ma7z5p.png'
                className='img-fluid lazyload rounded'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      {/*============================================================================ vision & mission  =============================================================*/}
      <div
        className='container-fluid custom-container'
        style={{ backgroundColor: '#000000', marginTop: '250px' }}
      >
        <div
          className='container custom-container'
          style={{ position: 'relative', bottom: '160px' }}
        >
          <div className='row gy-3'>
            <div className='col-md-6 bg-secondary wow fadeInLeft'>
              <div className='pt-3'>
                <h3 className='text-white text-center mb-2 mt-5'>Vision</h3>
                <div
                  className=''
                  style={{
                    backgroundColor: 'white',
                    height: '1px',
                    width: '14rem',
                    margin: 'auto'
                  }}
                ></div>
                <p className='fs-4 p-4 mb-4 text-white'>
                  To be the leading provider of innovative information
                  technologies that improve the quality of lives by fostering a
                  culture of technology and innovation.
                </p>
              </div>
            </div>
            <div
              className='col-md-6 wow fadeInRight'
              style={{ backgroundColor: '#0d466d' }}
            >
              <div className='pt-3'>
                <h3 className='text-white text-center mb-2 mt-5'>Mission</h3>
                <div
                  className=''
                  style={{
                    backgroundColor: 'white',
                    height: '1px',
                    width: '14rem',
                    margin: 'auto'
                  }}
                ></div>
                <p className='fs-4 p-4 mb-5 text-white'>
                  To create a convenient communications services by delighting
                  and satisfying our clients through the provision of
                  innovative, quality, timely, relevant, accurate and affordable
                  solutions to their needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Value */}
        <div
          className='container rounded wow zoomIn custom-container'
          data-wow-delay='0.9s'
          style={{
            backgroundColor: '#000000',
            position: 'relative',
            bottom: '50px'
          }}
        >
          <p className='fw-bold fs-2 text-center text-white mb-5'>
            Core Values
          </p>
          <div className='row '>
            <div className='col-md-4'>
              <div className='border-white pt-3'>
                <div className='d-flex pt-5 '>
                  <div className='border border-primary '>
                    <div className='p-1'>
                      <img
                        src={innovation}
                        className=''
                        loading='lazy'
                        style={{ height: '3rem', color: 'black' }}
                        alt=''
                      />
                    </div>
                  </div>

                  <h3 className='text-white ms-4 mt-2'>Innovation</h3>
                </div>
                <p className='text-white mt-3 lead fs-6'>
                  Building cutting-edge solutions with groundbreaking ideas
                </p>
              </div>
            </div>

            <div
              className='col-md-4 float-md-end transparent'
              style={{ height: '' }}
            >
              <div
                className=' company-professional'
                style={{ position: 'relative', bottom: '32px' }}
              >
                <div className='d-flex justify-content-center'>
                  <div className='border border-primary'>
                    <div className='p-1'>
                      <img
                        src={mindset}
                        className=''
                        loading='lazy'
                        style={{ height: '3rem', color: 'black' }}
                        alt=''
                      />
                    </div>
                  </div>
                  <h3 className='text-white  ms-md-4 mt-2'>Professionalism</h3>
                </div>
                <p className='text-white company-professionalism-text text-center mt-3 lead fs-6'>
                  Providing specialized services with expert solutions
                </p>
              </div>
            </div>
            <div className='col-md-4  company-integrity'>
              <div className='border-white pt-3'>
                <div className='d-flex justify-content-start pt-5 ps-5'>
                  <div className='border border-primary'>
                    <div className='p-1'>
                      <img
                        src={integrity}
                        className=''
                        loading='lazy'
                        style={{ height: '3rem', color: 'black' }}
                        alt=''
                      />
                    </div>
                  </div>
                  <h3 className='text-white ms-4 mt-2'>Integrity</h3>
                </div>
                <p className='text-white ps-5 mt-3 lead fs-6'>
                  Guided by unwavering character, and doing what is right
                </p>
              </div>
            </div>

            <div className='row company-excellence  mb-5 justify-content-md-center'>
              <div className='col-md-4'>
                <div className=''>
                  <div className='d-flex  pt-5'>
                    <div className='border border-primary'>
                      <div className='p-1'>
                        <img
                          src={commitment}
                          className=''
                          loading='lazy'
                          style={{ height: '3rem', color: 'black' }}
                          alt=''
                        />
                      </div>
                    </div>
                    <h3 className='text-white ms-4 mt-2'>Excellence</h3>
                  </div>
                  <p className='text-white mt-3 lead fs-6'>
                    Excelling, and being truly the best at what we do.
                  </p>
                </div>
              </div>

              <div
                className='col-md-4 company-team-bord border-start-fg border-top-0 border-bottom-0   border-end-0  '
                style={{ height: '270px' }}
              >
                <div className=' text-center '>
                  <div className='d-flex justify-content-start pt-5 ps-5'>
                    <div className='border company-team border-primary'>
                      <div className='p-1'>
                        <img
                          src={teamwork}
                          className=''
                          style={{ height: '3rem', color: 'black' }}
                          alt=''
                        />
                      </div>
                    </div>
                    <h3 className='text-white ms-4 mt-2'>Team Work</h3>
                  </div>
                  <p className='text-white mt-3 ps-5  company-team-text  lead fs-6'>
                    Uniting minds together towards a unifying purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*============================================================================ our client ===================================================================*/}
      <p
        className='fw-bold fs-3 text-center wow zoomIn mt-5 mb-1'
        data-wow-delay='0.1s'
      >
        Some Of Our Clients
      </p>
      <div
        className='mb-2 wow zoomIn'
        style={{
          height: '2px',
          width: '4rem',
          backgroundColor: 'red',
          margin: 'auto'
        }}
        data-wow-delay='0.1s'
      ></div>
      <div className='container mt-5 mb-5' style={{ overflowX: 'hidden' }}>
        <div className='row'>
          <div className='col-12 mb-3'>
            <div className='row wow fadeInLeft' data-wow-delay='0.1s'>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234681/homePage/clientLogo/amp-featured-image_fincna.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234684/homePage/clientLogo/lsg_iph8mx.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234695/homePage/clientLogo/hv_nzxyt1.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234749/homePage/clientLogo/kosofe_yuqg5x.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234691/homePage/clientLogo/tru_h9afyy.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234742/homePage/clientLogo/feii_a8rzqg.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 mb-3'>
            <div className='row wow fadeInRight' data-wow-delay='0.9s'>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234686/homePage/clientLogo/ireti_whpffr.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234744/homePage/clientLogo/remaben_yljc8l.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234696/homePage/clientLogo/domino_i6flnw.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234746/homePage/clientLogo/olajide_e245yh.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1730310619/PFN_Web_Logo_Green_y4sbrw.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234690/homePage/clientLogo/home_mwhzd9.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 mb-3'>
            <div className='row wow fadeInLeft' data-wow-delay='0.6s'>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234739/homePage/clientLogo/safebrooks_smeauh.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234750/homePage/clientLogo/pentecostal_cutbi5.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234687/homePage/clientLogo/okhma_hrxdi7.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234698/homePage/clientLogo/neyant_hesh5e.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234754/homePage/clientLogo/universal_vcrdgw.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234683/homePage/clientLogo/women_right_uet6bw.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 mb-3'>
            <div className='row  wow fadeInRight' data-wow-delay='0.9s'>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234679/homePage/clientLogo/western_buckland_dt19jn.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234678/homePage/clientLogo/veoc_y61crf.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707234699/homePage/clientLogo/pineheight_sljytj.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1728401842/Taanet_logo_resized_putvik.png'
                    className='img-fluid lazyload taanet'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1728401858/Vivon_logo_fogs5t.png'
                    className='img-fluid lazyload vivon'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707753249/homePage/clientLogo/diva_cakes_betw0b.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='col-12 mb-3'>
            <div className='row  wow fadeInRight' data-wow-delay='0.9s'>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1707753250/homePage/clientLogo/cathenet_lgod6k.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1730310818/Logo_rqijd4.png'
                    className='img-fluid lazyload first'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1730310816/SHEKINAH_SACRED_PLACE_MINISTRIES_Logo_fu5map.png'
                    className='img-fluid lazyload second'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1730393956/Piers_Spectra_Consulting_logo_abcobj.jpg'
                    className='img-fluid lazyload third'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6 fourth'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1730310619/Kappachem_Labs_Web_logo_op3szo.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
              <div className='col-md-2 col-6 fifth'>
                <div className='card border-0'>
                  <img
                    src=''
                    data-src='https://res.cloudinary.com/elonatech/image/upload/v1730310618/Ozone_Cinemas_Logo-removebg-preview_e0aiav.png'
                    className='img-fluid lazyload'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company
