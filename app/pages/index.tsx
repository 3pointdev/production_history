import Header from "components/header/header";
import TableList from "components/table/tableList";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if (currentHour === 0) {
        window.location.reload();
      }
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <article className="text-bg-gray-900 bg-white w-screen min-h-screen h-full p-4">
      <Header />
      <TableList />
    </article>
  );
}
