import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IcSend } from "@assets/icons";
import { Socials, TopmateBaseURL, TopmateServices } from "@base/const";
import { Input, Button, TextArea } from "@components/.";
import ServiceCard from "./ServiceCard";
import TopmateCard from "./TopmateCard";

import "./Contact.scss";

type ContactFormState = {
  email: string;
  subject?: string;
  message?: string;
};

const Contact = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "contact" });
  const { t: tTopmate } = useTranslation(["common"], { keyPrefix: "topmate" });
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

  const getServiceLink = (serviceParam: string) => {
    return `${TopmateBaseURL}/${serviceParam}`;
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
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
        <section className="contact__socials">
          <div className="contact__socials-group">
            <h5 className="contact__group-heading">{tTopmate("title")}</h5>
            <div className="contact__topmate-services">
              {TopmateServices.map(
                ({ titleKey, buttonLabelKey, descriptionKey, serviceId }) => (
                  <ServiceCard
                    key={titleKey}
                    title={tTopmate(titleKey)}
                    description={tTopmate(descriptionKey)}
                    link={getServiceLink(serviceId)}
                    buttonLabel={tTopmate(buttonLabelKey)}
                  />
                )
              )}
            </div>
            <TopmateCard
              profileUrl={TopmateBaseURL}
              name={tTopmate("name")}
              bio={tTopmate("profileBio")}
              description={tTopmate("profileDesc")}
              ctaLabel={tTopmate("viewProfile")}
            />
          </div>

          <div className="contact__socials-group">
            <h5 className="contact__group-heading">{t("socialsTitle")}</h5>
            <ul className="contact__socials-links">
              {Socials.map(({ labelKey, url, iconSrc }) => (
                <li key={labelKey} title={t(labelKey)}>
                  <Button
                    className="contact__socials-link-btn"
                    variant="glass"
                    iconSrc={iconSrc}
                    onClick={() => handleSocialClick(url)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
