import { MailList } from "../Mail/Mail";
import "./Footer.css";
import { useSelector } from "react-redux";

export const Footer = () => {

  const auth = useSelector((state) => state.auth);

  return (
    <div className="footer">
      <div className="footerItem">
        {!auth.user && 
          <MailList />
         }
        <div className="footerDetails">
          <div className="footerAbout">
            <ul>
              <li>About Us</li>
              <li>Teams / Careers</li>
              <li> Blogs</li>
              <li> Support</li>
            </ul>
            <ul>
              <li>Official Lambda Blog</li>
              <li> Investor Relations</li>
              <li> Lambda Circle</li>
              <li> Lambda Frames</li>
            </ul>
          </div>
          <div className="footerAbout">
            <ul>
              <li>Terms and conditions</li>
              <li>Guest Policies</li>
              <li>Privacy Policy</li>
              <li>Trust And Safety</li>
            </ul>
            <ul>
              <li>Cyber Security</li>
              <li> Cyber Security Awareness</li>
              <li> Responsible Disclosure</li>
            </ul>
          </div>
        </div>
        <div className="hotelsLocation">
          <ul>
            <li>Hotels near me</li>
            <li>Hotels in Goa</li>
            <li>Hotels in Puri</li>
            <li>Hotels in Mahabaleshwar</li>
            <li>Hotels in Jaipur</li>
            <li>Hotels in Shimla</li>
          </ul>
          <ul>
            <li>Hotels near me</li>
            <li>Hotels in Goa</li>
            <li>Hotels in Puri</li>
            <li>Hotels in Mahabaleshwar</li>
            <li>Hotels in Jaipur</li>
            <li>Hotels in Shimla</li>
          </ul>
          <ul>
            <li>Hotels near me</li>
            <li>Hotels in Goa</li>
            <li>Hotels in Puri</li>
            <li>Hotels in Mahabaleshwar</li>
            <li>Hotels in Jaipur</li>
            <li>Hotels in Shimla</li>
          </ul>
          <ul>
            <li>Hotels near me</li>
            <li>Hotels in Goa</li>
            <li>Hotels in Puri</li>
            <li>Hotels in Mahabaleshwar</li>
            <li>Hotels in Jaipur</li>
            <li>Hotels in Shimla</li>
          </ul>
        </div>
        <div className="footerCopyright">
          <span> 2022 &copy; Lambda Limited </span>
        </div>
      </div>
    </div>
  );
};
