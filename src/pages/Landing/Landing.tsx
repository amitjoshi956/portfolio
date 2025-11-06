import IgWorkDiscuss from "@assets/image/work-discussion.svg";
import Button from "@components/Button";
import { IcRocket, IcCodeFolder } from "@assets/icons";

import "./Landing.scss";

const Landing = () => {
  const handleWorkWithMe = () => {};

  return (
    <main className="landing">
      <section className="landing__actions-section">
        <div className="landing__msg-container">
          <h3 className="landing__subtitle-msg">Got an idea for a product?</h3>
          <h1 className="landing__title-msg">
            Let's transform your{" "}
            <b className="landing__title-msg--highlight">ideas</b> into{" "}
            <text className="landing__title-msg--highlight">reality</text>
          </h1>
        </div>
        <div className="landing__actions">
          <Button
            variant="primary"
            label="Work with me"
            iconSrc={IcRocket}
            onClick={handleWorkWithMe}
          />
          <Button
            variant="glass"
            label="See my work"
            iconSrc={IcCodeFolder}
            onClick={handleWorkWithMe}
          />
        </div>
      </section>
      <section className="landing__infographic-section">
        <img
          src={IgWorkDiscuss}
          alt="let's discuss work"
          className="landing__infographic"
        />
      </section>
    </main>
  );
};

export default Landing;
