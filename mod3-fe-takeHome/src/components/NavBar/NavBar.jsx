import './NavBar.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <main className='header-container'>
      <header>
        <Link to='/' className="nav-link">
          <h3 className='typewriter'>SubsTeaTutions</h3><br></br>
          <img src='/tea_icon.jpg' alt='Tea Icon' className='tea-icon'/>
        </Link>
      </header>
    </main>
  );
}

export default Header;