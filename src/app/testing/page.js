import React from "react";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function TestingPage() {
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <div className="mt-8 text-center">
        <SectionHeaders
          //   subHeader={"Check out the admin view as well"}
          mainHeader={"Testing the Platform?"}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4 ">
          <p>
            Login as an admin to view all the functionality: <br />
            email: <b>admin@gmail.com</b> <br />
            password: <b>admin</b> <br />
            Once logged in you can click the 'Hello, Admin' button to be able to
            view/add/edit menu items, categories, users, and all orders on the
            platform.
          </p>
        </div>
      </div>
    </section>
  );
}
