import moment from "moment";
import { useEffect, useState } from "react";

const Timer = ({ callQueuedTime }: any) => {
     const [time, setTime] = useState(() => new Date().getTime() / 1000 - callQueuedTime);
     useEffect(() => {
          const queuedTime = callQueuedTime;
          const intervalId = setInterval(function () {
               setTime(() => new Date().getTime() / 1000 - queuedTime);
          }, 1000);
          return () => {
               console.log(intervalId);
               clearInterval(intervalId);
          };
     }, [callQueuedTime]);
     return <div className="timer">{moment(time).format("mm:ss")}</div>;
};

export default Timer;
