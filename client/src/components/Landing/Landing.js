import React, { useEffect } from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Footer from './Footer';
import image1 from '../images/background1.jpg';
import image2 from '../images/background2.jpg';
import image3 from '../images/background3.jpg';

const Landing = ({ isAuthenticated }) => {
  useEffect(() => {
    M.Parallax.init(document.querySelectorAll('.parallax'));
  }, []);

  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <React.Fragment>
      <div id='index-banner' className='parallax-container '>
        <div className='section no-pad-bot'>
          <div className='container'>
            <h1 className='header center'>Every blood donor is a life saver</h1>
            <div className='row center'>
              <h5 className='header hide-on-small-only col s12 light'>
                Bring a life back to power. Make blood donation your
                responsibility
              </h5>
            </div>
            <div className='row center'>
              <Link
                to='/register'
                className='btn-large waves-effect waves-light red  darken-2'
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
        <div className='parallax'>
          <img src={image1} alt='Unsplashed background img 1' />
        </div>
      </div>

      <div className='container'>
        <div className='section'>
          <div className='row'>
            <div className='col s12 m4'>
              <div className='icon-block'>
                <h2 className='center brown-text'>
                  <i className='material-icons'>flash_on</i>
                </h2>
                <h5 className='center'>Search For Blood Swiftly</h5>

                <p className='light'>
                  Search for donors without any hassle of ringing up hospitals
                  and blood banks.
                </p>
              </div>
            </div>

            <div className='col s12 m4'>
              <div className='icon-block'>
                <h2 className='center brown-text'>
                  <i className='material-icons'>group</i>
                </h2>
                <h5 className='center'>User Experience Focused</h5>

                <p className='light'>
                  A single responsive system for a more unified user experience.
                </p>
              </div>
            </div>

            <div className='col s12 m4'>
              <div className='icon-block'>
                <h2 className='center brown-text'>
                  <i className='material-icons'>settings</i>
                </h2>
                <h5 className='center'>Easy to work with</h5>

                <p className='light'>
                  Get help at the click of a button. Start making a difference
                  right now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='parallax-container valign-wrapper'>
        <div className='section no-pad-bot'>
          <div className='container'>
            <div className='row center'>
              <h5 className='header col s12 light'>
                A single pint can save three lives, a single gesture can create
                a million smiles
              </h5>
            </div>
          </div>
        </div>
        <div className='parallax'>
          <img src={image2} alt='Unsplashed background img 2' />
        </div>
      </div>

      <div className='container'>
        <div className='section'>
          <div className='row'>
            <div className='col s12 center'>
              <h3>
                <i className='mdi-content-send brown-text'></i>
              </h3>
              <h4>Why Should I Donate Blood?</h4>
              <p className='left-align light'>
                Safe blood saves lives and improves healthThere is a constant
                need for regular blood supply because blood can be stored for
                only a limited time before use. Regular blood donations by a
                sufficient number of healthy people are needed to ensure that
                safe blood will be available whenever and wherever it is
                needed.Blood is the most precious gift that anyone can give to
                another person — the gift of life. A decision to donate your
                blood can save a life, or even several if your blood is
                separated into its components — red cells, platelets and plasma
                — which can be used individually for patients with specific
                conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='parallax-container valign-wrapper'>
        <div className='section no-pad-bot'>
          <div className='container'>
            <div className='row center'>
              <h5 className='header col s12 light'>
                Donate your blood for a reason, let the reason to be life
              </h5>
            </div>
          </div>
        </div>
        <div className='parallax'>
          <img src={image3} alt='Unsplashed background img 3' />
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated
});

export default connect(mapStateToProps)(Landing);
