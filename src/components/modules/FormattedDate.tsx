import React from "react";

interface FormattedDateProps {
  dateString: string;
  format?: "full" | "long" | "medium" | "short";
  className?: string;
  fallback?: string; // Optional fallback text for invalid dates
}

const FormattedDate: React.FC<FormattedDateProps> = ({
  dateString,
  format = "medium",
  className,
  fallback = "Invalid date",
}) => {
  // Validate the date string before creating a Date object
  const isValidDate = (dateStr: string): boolean => {
    if (!dateStr) return false;

    // Try to parse the date
    const date = new Date(dateStr);

    // Check if the date is valid
    return !isNaN(date.getTime());
  };

  if (!isValidDate(dateString)) {
    return <span className={className}>{fallback}</span>;
  }

  const date = new Date(dateString);

  const formatDate = (date: Date, format: string): string => {
    // For UTC dates
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthNamesShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formatTime = (h: number, m: number): string => {
      const period = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 || 12;
      return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
    };

    switch (format) {
      case "full":
        return `${monthNames[month]} ${day}, ${year} at ${formatTime(
          hours,
          minutes
        )} UTC`;
      case "long":
        return `${monthNamesShort[month]} ${day}, ${year}, ${formatTime(
          hours,
          minutes
        )}`;
      case "medium":
        return `${monthNamesShort[month]} ${day}, ${year}`;
      case "short":
        return `${month + 1}/${day}/${year.toString().slice(-2)}`;
      default:
        return `${monthNamesShort[month]} ${day}, ${year}`;
    }
  };

  const formattedDate = formatDate(date, format);

  return <span className={className}>{formattedDate}</span>;
};

export default FormattedDate;
