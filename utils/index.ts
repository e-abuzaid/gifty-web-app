import { Event, Person } from "@/types/types";

export const addAndSortByDate = (events: Event[]) => {
  for (let i = 0; i < events.length; i++) {
    const now = new Date();
    const [day, month, year] = events[i].date.split("/");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const isAfterToday =
      date.getMonth() > now.getMonth() ||
      (date.getMonth() === now.getMonth() && date.getDate() > now.getDate());
    if (!isAfterToday) {
      const updatedDate = new Date(
        now.getFullYear() + 1,
        Number(month) - 1,
        Number(day)
      );
      const timeLeft = updatedDate.getTime() - now.getTime();
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      events[i].timeRemaining = days;
    } else {
      const updatedDate = new Date(
        now.getFullYear(),
        Number(month) - 1,
        Number(day)
      );
      const timeLeft = updatedDate.getTime() - now.getTime();
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const timeRemainingInText = `only ${
        days > 30
          ? `${Math.floor(days / 30)} ${
              Math.floor(days / 30) > 1 ? "months" : "month"
            } & ${days % 30} ${days % 30 > 1 ? "days" : "day"}`
          : `${days} ${days > 1 ? "days" : "day"} left until`
      }`;
      events[i].timeRemaining = days;
      events[i].timeRemainingInText = timeRemainingInText;
    }
  }
  events.sort((a, b) => a.timeRemaining! - b.timeRemaining!);
  return events;
};

export const calculateAge = (person: Person) => {
  const now = new Date();
  const [day, month, year] = person?.dob.split("/");
  const birthday = new Date(Number(year), Number(month) - 1, Number(day));
  const age = now.getTime() - birthday.getTime();
  const years = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
  return years;
};

export const calculateTimeRemaining = (myDate: string) => {
  const now = new Date();
  const [day, month, year] = myDate.split("/");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const isAfterToday =
    date.getMonth() > now.getMonth() ||
    (date.getMonth() === now.getMonth() && date.getDate() > now.getDate());
  if (!isAfterToday) {
    const updatedDate = new Date(
      now.getFullYear() + 1,
      Number(month) - 1,
      Number(day)
    );
    const timeLeft = updatedDate.getTime() - now.getTime();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    return days;
  } else {
    const updatedDate = new Date(
      now.getFullYear(),
      Number(month) - 1,
      Number(day)
    );
    const timeLeft = updatedDate.getTime() - now.getTime();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    return days;
  }
};
