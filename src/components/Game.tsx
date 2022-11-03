interface GameProps {
	title: string,
	banner: string,
	adsCount: number
}

export function Game({ title, banner, adsCount }: GameProps) {
  return (
    <a className="w-40 h-52 rounded-md relative bg-game-gradient">
      <img
        className="absolute top-0 left-o w-full h-full rounded-md object-cover bg-cover bg-game-gradient"
        src={banner}
        alt=""
      />
      <div className="absolute w-full bottom-0 rounded-md py-2 px-2 bg-game-gradient">
        <span className="text-sm text-white font-bold">{title}</span>
        <p className="text-sm text-zinc-200">{adsCount} anúncios</p>
      </div>
    </a>
  );
}
