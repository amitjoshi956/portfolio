import Headshot from "/headshot__bio-pic.svg";

import "./About.scss";

const About = () => {
  return (
    <div id="about" className="about">
      <section className="about__bio">
        <img src={Headshot} alt="" className="about__bio-pic" />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure nulla
        harum fuga alias numquam? Corporis aut excepturi dolorem, enim culpa
        pariatur? Cupiditate necessitatibus libero beatae. Eaque quaerat odio
        soluta sunt.
      </section>
      <section className="about__skills">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
        veniam ut voluptatibus nihil placeat officia? Repellat, dolor commodi
        repudiandae minus similique repellendus aperiam necessitatibus atque
      quas eius vero animi doloremque?
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
        veniam ut voluptatibus nihil placeat officia? Repellat, dolor commodi
        repudiandae minus similique repellendus aperiam necessitatibus atque
        quas eius vero animi doloremque?
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
        veniam ut voluptatibus nihil placeat officia? Repellat, dolor commodi
        repudiandae minus similique repellendus aperiam necessitatibus atque
        quas eius vero animi doloremque?
      </section>
    </div>
  );
};

export default About;
