import React from "react";
import "./AboutUs1.css";
import avatar2 from "../../../assets/images/FooterElements/AboutUs/KunalSarkar.jpg";
import avatar3 from "../../../assets/images/FooterElements/AboutUs/OmSardar.jpg";
import avatar4 from "../../../assets/images/FooterElements/AboutUs/SouravKhanra.jpg";
import avatar5 from "../../../assets/images/FooterElements/AboutUs/SubhoSamanta.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Team = () => {
  return (
    <div className="TEAM-body">
      <div className="TEAM-center">
        <div className="TEAM-team">
          <div className="TEAM-title">Our Team</div>
          <div className="TEAM-profiles">
            {/* Existing team members */}
            <div className="TEAM-profile">
              <div className="TEAM-card">
                <div className="TEAM-head">
                  <img src={avatar2} alt="Sophia Diggs" />
                  <div className="TEAM-name">Kunal Sarkar</div>
                </div>
                <div className="TEAM-content">
                  <div className="TEAM-role">
                    Lead Developer/Technical Strategist
                  </div>
                  A passionate Graphic & Branding Designer and Full Stack
                  Developer, blending creativity and technical expertise to
                  craft impactful solutions.
                </div>
                <div className="TEAM-icons">
                  <a
                    href="https://www.linkedin.com/in/kunal-sarkar-592a1230a/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/kunalsarkar-bit" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="mailto:kunalsarkar6290@gmail.com" target="_blank">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
              <img src={avatar2} alt="Sophia Diggs" className="TEAM-picture" />
              <div className="TEAM-details">
                Kunal Sarkar
                <span>Lead Developer/Technical Strategist</span>
              </div>
            </div>

            <div className="TEAM-profile">
              <div className="TEAM-card">
                <div className="TEAM-head">
                  <img src={avatar3} alt="Lana Ward" />
                  <div className="TEAM-name">Om Sardar</div>
                </div>
                <div className="TEAM-content">
                  <div className="TEAM-role">Lead Full-Stack Developer</div>A
                  passionate BCA student with proficiency in Python, Java, C,
                  OOP, and Data Structures, committed to developing innovative
                  and efficient solutions.
                </div>
                <div className="TEAM-icons">
                  <a
                    href="https://www.linkedin.com/in/om-sardar"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/OM-SARDAR" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="mailto:omsardar14@gmail.com" target="_blank">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
              <img src={avatar3} alt="Lana Ward" className="TEAM-picture" />
              <div className="TEAM-details">
                Om Sardar
                <span>Lead Full-Stack Developer</span>
              </div>
            </div>

            <div className="TEAM-profile">
              <div className="TEAM-card">
                <div className="TEAM-head">
                  <img src={avatar4} alt="Jackson Cano" />
                  <div className="TEAM-name">Sourav Khanra</div>
                </div>
                <div className="TEAM-content">
                  <div className="TEAM-role">Frontend Developer</div>
                  Skilled in building responsive, user-friendly web interfaces
                  with a focus on performance, accessibility, and modern design
                  principles.
                </div>
                <div className="TEAM-icons">
                  <a href="https://www.linkedin.com/in/sourav-khanra-87912433a/" target="_blank">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/Sorav-khanra" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="mailto:prolaccy60@gmail.com" target="_blank">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
              <img src={avatar4} alt="Jackson Cano" className="TEAM-picture" />
              <div className="TEAM-details">
                Sourav Khanra
                <span>Frontend Developer</span>
              </div>
            </div>

            {/* New team member */}
            <div className="TEAM-profile">
              <div className="TEAM-card">
                <div className="TEAM-head">
                  <img src={avatar5} alt="Emily Carter" />
                  <div className="TEAM-name">Subho Samanta</div>
                </div>
                <div className="TEAM-content">
                  <div className="TEAM-role">Development Coordinator</div>
                  Oversees the development process, ensuring timely delivery and
                  alignment with business goals, while bridging technical and
                  non-technical teams.
                </div>
                <div className="TEAM-icons">
                  <a
                    href="https://www.linkedin.com/in/subha-samanta-93883423b/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/Subho256" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="mailto:subhasamantal968@gmail.com" target="_blank">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
              <img src={avatar5} alt="Emily Carter" className="TEAM-picture" />
              <div className="TEAM-details">
                Subho Samanta
                <span>Development Coordinator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
