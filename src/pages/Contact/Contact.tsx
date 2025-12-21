import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IcSend } from "@assets/icons";
import { Input, Button, TextArea } from "@components/.";

import "./Contact.scss";

type ContactFormState = {
  email: string;
  subject?: string;
  message?: string;
};

const Contact = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "contact" });
  const [{ email, subject, message }, setFormState] =
    useState<ContactFormState>({
      email: "",
      subject: "",
      message: "",
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
          <h3 className="contact__form-heading">{t("formTitle")}</h3>
          <form className="contact__form">
            <Input
              required
              name="email"
              type="email"
              className="contact__form-input"
              placeholder={t("emailPlaceholder")}
              label={t("emailLabel")}
              value={email}
              onChange={handleInputChange}
            />
            <Input
              name="subject"
              className="contact__form-input"
              placeholder={t("subjectPlaceholder")}
              label={t("subjectLabel")}
              value={subject}
              onChange={handleInputChange}
            />
            <TextArea
              name="message"
              resizable
              required
              className="contact__form-input"
              placeholder={t("messagePlaceholder")}
              label={t("messageLabel")}
              value={message}
              onChange={handleInputChange}
            />
            <Button
              className="contact__submit-btn"
              type="submit"
              iconSrc={IcSend}
              label={t("send")}
            />
          </form>
        </section>
        <section className="contact__topmate"></section>
      </div>
    </div>
  );
};

export default Contact;
