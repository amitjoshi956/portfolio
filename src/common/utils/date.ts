import i18n from "@config/i18n";

export class DateUtil {
  static toYMD(date?: Date | string | null) {
    if (!date) return "";

    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static toYMDDate(dateStr?: string | null) {
    if (!dateStr) return new Date();

    return new Date(this.toYMD(dateStr));
  }

  static isValidDateString(dateString?: string) {
    const YMDDate = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateString || !YMDDate.test(dateString)) {
      return false;
    }

    const date = new Date(dateString);
    return !isNaN(date.valueOf());
  }

  /** Get the date formatted based on the locale
   * @param date Date in string format
   */
  static toLocaleDateString(date: string) {
    return DateUtil.toYMDDate(date).toLocaleDateString(i18n.language, {
      dateStyle: "medium",
    });
  }

  /** Get the date formatted for timeline
   * @param date Date in YMD string format
   */
  static toTimelineDate(date: string) {
    if (!DateUtil.isValidDateString(date)) return "";

    const [l1, l2] = DateUtil.toYMDDate(date)
      .toLocaleDateString(i18n.language, {
        dateStyle: "medium",
      })
      .split(",");

    return `${l1.slice(0, 3)} ${l2}`;
  }
}
