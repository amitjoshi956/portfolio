import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { IcAlert, IcCheckedCircle, IcSend } from "@assets/icons";
import {
  ContactURL,
  Socials,
  TopmateBaseURL,
  TopmateServices,
} from "@base/const";
import { Input, Button, TextArea, Loader } from "@components/.";
import ServiceCard from "./ServiceCard";
import TopmateCard from "./TopmateCard";
import RequestMessage from "./RequestMessage";

import "./Contact.scss";

type ContactFormState = {
  email: string;
  subject?: string;
  message: string;
};

type RequestStatus = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "contact" });
  const { t: tTopmate } = useTranslation(["common"], { keyPrefix: "topmate" });
  const [{ email, subject, message }, setFormState] =
    useState<ContactFormState>({
      email: "",
      subject: "",
      message: "",
    });

  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const isSendDisabled = !email || !message;
  const isRequestSuccess = requestStatus === "success";
  const isRequestError = requestStatus === "error";
  const isRequestLoading = requestStatus === "loading";
  const isRequestIdle = requestStatus === "idle";

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

  const handleSendClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() && message.trim()) {
      setRequestStatus("loading");
      fetch(ContactURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      })
        .then(() => {
          setRequestStatus("success");
          setFormState({
            email: "",
            subject: "",
            message: "",
          });
        })
        .catch(() => {
          setRequestStatus("error");
          setTimeout(() => {
            setRequestStatus("idle");
          }, 5000);
        });
    }
  };

  return (
    <div id="contact" className="contact">
      <h1 className="contact__title">{t("title")}</h1>
      <div className="contact__content">
        <section className="contact__connection-form">
          {isRequestIdle && (
            <>
              <h3 className="contact__form-heading">{t("formTitle")}</h3>
              <form className="contact__form" onSubmit={handleSendClick}>
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
                  disabled={isSendDisabled}
                  type="submit"
                  iconSrc={IcSend}
                  label={t("send")}
                />
              </form>
            </>
          )}
          {isRequestSuccess && (
            <RequestMessage
              iconSrc={IcCheckedCircle}
              variant="success"
              title={t("requestSuccessTitle")}
              message={t("requestSuccessText")}
            />
          )}
          {isRequestError && (
            <RequestMessage
              iconSrc={IcAlert}
              variant="error"
              title={t("requestErrorTitle")}
              message={t("requestErrorText")}
            />
          )}
          {isRequestLoading && <Loader />}
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
