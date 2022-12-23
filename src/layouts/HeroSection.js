export default function HeroSection(props) {
	return (
		<section className={`relative ${ props.className }`}>
			<div className="z-10">
				{ props.children }
			</div>

			<div className="absolute top-0 w-[100%] h-[100%]">
				<img alt={ props.bgAlt } src={ props.bgSrc } className={`w-[100%] h-[100%] bg-slate-100 object-cover`}/>
			</div>
		</section>
	);
}