import { useTranslation } from "react-i18next";
import "./Contact.scss";

const Contact = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "contact" });

  return (
    <div id="contact" className="contact">
      <h1 className="contact__title">{t("title")}</h1>
    </div>
  );
};

export default Contact;
