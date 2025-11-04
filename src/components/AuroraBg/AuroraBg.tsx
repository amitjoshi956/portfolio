import Wave1 from "@assets/image/wave1.svg";
import Wave2 from "@assets/image/wave2.svg";
import Wave3 from "@assets/image/wave3.svg";
import Wave4 from "@assets/image/wave4.svg";
import Wave5 from "@assets/image/wave5.svg";

import "./AuroraBg.scss";

const AuroraBg = () => {
  return (
    <div className="aurora-bg">
      <img
        id="wave-1"
        className="aurora-bg__wave"
        src={Wave1}
        alt="aurora wave 1"
      />
      <img
        id="wave-2"
        className="aurora-bg__wave"
        src={Wave2}
        alt="aurora wave 2"
      />
      <img
        id="wave-3"
        className="aurora-bg__wave"
        src={Wave3}
        alt="aurora wave 3"
      />
      <img
        id="wave-4"
        className="aurora-bg__wave"
        src={Wave4}
        alt="aurora wave 4"
      />
      <img
        id="wave-5"
        className="aurora-bg__wave"
        src={Wave5}
        alt="aurora wave 5"
      />
    </div>
  );
};

export default AuroraBg;
