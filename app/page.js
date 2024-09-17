// * /about

import Link from "next/link";

export const metadata = {
	title: 'About',
	description: 'isaacclloyd.com',
};

export default function Home() {
	return (
		<main className="flex flex-col mx-auto max-w-3xl px-20">
			<section className="h-screen" id="about">
				<div className="h-full flex items-center justify-center text-left flex-col">
					<h1 className="text-5xl underline underline-offset-8 text-test3">About</h1>
					<p className="py-6 Gitan-Regular text-test6">
						This project is the result of a couple months of work and a lot of learning. I built this logic simulator project to deepen my skills using React, Next.js, and Tailwind CSS. I also wanted to learn more about the ReactFlow library, which I used heavily throughout the project in order to build the user interface. 
						<br />
						<br />
						The whole point of this project was to create a simple yet powerful tool for not only learning about logic gates and digital circuits and how they work, but also to provide a robust platform for creating and testing digital circuits.
						<br />
						<br />
						This project is still a work in progress, and I plan to continue adding more amazing features and improvements. Please feel free to reach out to me with any feedback or suggestions you may have. I would love to hear from you!
						<br />
						<br />
						You can find more of my projects on my GitHub page at <Link href="https://github.com/theisaaclloyd" className="text-slate-400 hover:text-gray-900 transition underline underline-offset-4">github.com/isaacclloyd</Link>.
					</p>

					<Link href="/logic" className="text-3xl pt-14 pb-10 Gitan-Regular text-slate-400 hover:text-gray-900 transition underline underline-offset-4">Enter logic simulator</Link>
					<Link href="https://isaacclloyd.com" className="pt-15 Gitan-Regular text-slate-400 hover:text-gray-900 transition underline underline-offset-4">isaacclloyd.com</Link>
				</div>
			</section>
		</main>
	);
}
