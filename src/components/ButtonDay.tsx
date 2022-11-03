interface ButtonDayProps {
  day: string;
  hasAdded: boolean;
  id: number;
  addDayOnDaysToPlay: (day: string, id: number) => void;
}

export function ButtonDay({ day, hasAdded, id, addDayOnDaysToPlay}: ButtonDayProps) {
	
  return (
    <button
      key={day}
      onClick={() => addDayOnDaysToPlay(day, id)}
      type="button"
      className={`${
        hasAdded ? "bg-[#8B5CF6]" : "bg-zinc-900"
      } w-[40px] h-[40px] font-bold text-base ml-2 first-of-type:ml-0 rounded hover:opacity-90 active:opacity-70`}
    >
      {day[0]}
    </button>
  );
}
