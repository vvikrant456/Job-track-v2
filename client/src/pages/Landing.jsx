import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby cardigan bitters whatever man bun squid. Lomo offal umami
            leggings bespoke. Tousled swag letterpress wolf everyday carry,
            locavore portland dreamcatcher. Fingerstache mumblecore iceland
            letterpress, lomo scenester la croix everyday carry. Leggings
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/register" className="btn login-link">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job-hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
