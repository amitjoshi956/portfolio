import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IcSend } from "@assets/icons";
import { Input, Button } from "@components/.";

import "./Contact.scss";

type ContactFormState = {
  email: string;
  subject: string;
};

const Contact = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "contact" });
  const [{ email, subject }, setFormState] = useState<ContactFormState>({
    email: "",
    subject: "",
  });

  const handleInputChange = (value: string, name: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div id="contact" className="contact">
      <h1 className="contact__title">{t("title")}</h1>
      <div className="contact__content">
        <section className="contact__connection-form">
          <form className="contact__form">
            <Input
              name="email"
              type="email"
              required
              label="Email"
              value={email}
              onChange={handleInputChange}
            />
            <Input
              name="subject"
              label="Subject line"
              value={subject}
              onChange={handleInputChange}
            />
            <Button
              className="contact__submit-btn"
              type="submit"
              iconSrc={IcSend}
              label="Send"
            />
          </form>
        </section>
        <section className="contact__topmate"></section>
      </div>
    </div>
  );
};

export default Contact;
