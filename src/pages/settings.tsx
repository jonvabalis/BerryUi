import { useBerryContext } from "../components/Themes/BerryContext";
import { BERRY_TYPE } from "../components/Themes/BerryData";

export default function settings() {
  const { berryType, setBerryType } = useBerryContext();

  return (
    <div>
      <p>Selected Berry: {berryType.type}</p>
      {BERRY_TYPE.map((berry) => (
        <button
          key={berry.id}
          onClick={() => setBerryType(berry)}
          style={{ margin: "5px" }}
        >
          {berry.type}
        </button>
      ))}
    </div>
  );
}
