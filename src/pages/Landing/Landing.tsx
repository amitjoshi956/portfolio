import IgWorkDiscuss from "@assets/image/work-discussion.svg";

import "./Landing.scss";

const Landing = () => {
  return (
    <main className="landing">
      <section className="landing__actions-section">
        <div className="landing__msg-container">
          <h3 className="landing__subtitle-msg">Got an idea for a product?</h3>
          <h1 className="landing__title-msg">
            Let's transform your ideas into reality
          </h1>
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
