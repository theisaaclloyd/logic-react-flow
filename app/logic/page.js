// * /logic

import Flow from './flow';
import Link from "next/link";

export const metadata = {
  title: 'LOGIC',
  description: 'isaacclloyd.com',
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="h-screen w-screen FFMeta-Regular" id="canvas">
        <Flow />
      </section>
    </main>
  );
}
