import Image from "next/image";
import Link from "next/link";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4 ">
          <p>
            In the heart of Little Italy, where the cobblestone streets echo
            with the sounds of laughter and music, there lies a cornerstone of
            the community: Tony&apos;s Pizzeria. Founded in 1954 by Antonio
            "Tony" Marcello, this beloved pizza chain has grown from a small,
            family-run eatery to a nationally recognized name, all while staying
            true to its roots. Humble Beginnings Tony Marcello arrived in New
            York from Naples with little more than a suitcase and a head full of
            dreams. He brought with him a family recipe for pizza that had been
            passed down through generations. With a few borrowed dollars and a
            lot of determination, he opened the first Tony&apos;s Pizzeria on a
            quiet corner of Mulberry Street. From the very beginning, Tony was
            committed to quality. He insisted on using only the freshest
            ingredients: tomatoes hand-crushed for the sauce, mozzarella made
            fresh daily, and dough kneaded by hand. His dedication paid off as
            word quickly spread, and soon, locals were lining up outside the
            door to get a taste of Tony&apos;s famous pizza.
          </p>
          <p>
            Growth and Expansion As the pizzeria&apos;s popularity grew, so did
            the demand. In the 1970s, Tony&apos;s sons, Marco and Luca, joined
            the family business. They shared their father&apos;s passion for
            pizza and his commitment to quality. Under their leadership,
            Tony&apos;s Pizzeria opened additional locations across New York
            City. The expansion didn&apos;t stop there. By the 1980s,
            Tony&apos;s Pizzeria had become a household name, known for its
            authentic, mouthwatering pizza. The Marcello family decided it was
            time to share their beloved pizza with the rest of the country. They
            began franchising, carefully selecting partners who shared their
            dedication to quality and tradition.
          </p>
        </div>
      </section>
      <section className="text-center my-8 " id="contact">
        <SectionHeaders
          subHeader={"Don`t hesitate "}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+1 857 623 1234"
          >
            +1 857 623 1234
          </a>
        </div>
      </section>
    </>
  );
}
