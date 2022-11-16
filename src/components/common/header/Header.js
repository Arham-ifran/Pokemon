import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo.png'
function Header() {
  return (
    <div className="header mb-5">
      <div className="logo text-center">
        <Link to="/">
          <img src={Logo} alt="logo" className='img-fluid' />
        </Link>
      </div>
    </div>
  );
}

export default Header;
