interface InputProps {
	placeholder: string;
	title: string;
	[x: string]: any;
}

export function Input({ placeholder, title, ...rest }: InputProps) {
  return (
    <div className="flex flex-col mt-4">
		<label className="text-base font-semibold">{title}</label>
		<input 
			type="text" 
			placeholder={placeholder} 
			{...rest} 
			className="mt-2 bg-zinc-900 text-zinc-100 h-[50px] rounded-[4px] px-4 block w-full placeholder:text-zinc-500"
			/>
	</div>
  );
}
