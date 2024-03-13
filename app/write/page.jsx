"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blog" },
  { name: "Write Blog", href: "/write" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Write() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    file: null,
    description: "",
    content: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data1 = createFormData(formData);
      const response = await fetch(`http://localhost:4000/api/blog`, {
        method: "POST",
        body: data1,
      });
      if (!response.ok) {
        const data = await response.json();
        data?.message
          ? toast(data.message, { type: "warning" })
          : toast("something went wrong", { type: "error" });
        throw new Error("something went wrong");
      }
      const data = await response.json();
      toast("Blog Published Successfully");
      setFormData({
        title: "",
        file: null,
        description: "",
        content: "",
      });
    } catch (err) {
      console.log(err);
      toast(err, { type: "error" });
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "file" ? files[0] : value,
    }));
  };

  const createFormData = (data) => {
    const formData2 = new FormData();
    formData2.append("title", data.title);
    formData2.append("description", data.description);
    formData2.append("content", data.content);
    if (data.file) {
      formData2.append("file", data.file);
    }
    return formData2;
  };

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <ToastContainer />
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-md font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="" alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-7 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto flex flex-col justify-center items-center py-12 sm:py-12 lg:py-16 min-w-full">
          <h1 className="text-3xl text-gray-700 underline underline-offset-8 p-4 font-semibold">
            WRITE BLOG
          </h1>
          <form
            className="w-full"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1 lg:px-[30%] md:px-[20%] sm:px-10 text-gray-700 justify-center items-center w-full">
              <div className="p-3 flex flex-col w-full">
                <label htmlFor="" className="font-semibold">
                  Title
                </label>
                <br />
                <input
                  onChange={handleChange}
                  type="text"
                  name="title"
                  value={formData.title}
                  className="p-2 shadow-lg"
                />
              </div>
              <div className="p-3 flex flex-col w-full">
                <label htmlFor="" className="font-semibold">
                  Image
                </label>
                <br />
                <input
                  onChange={handleChange}
                  type="file"
                  name="file"
                  id="file"
                  className="p-2"
                />
              </div>
              <div className="p-3 flex flex-col w-full">
                <label htmlFor="" className="font-semibold">
                  Description
                </label>
                <br />
                <input
                  onChange={handleChange}
                  type="text"
                  name="description"
                  value={formData.description}
                  className="p-2 shadow-lg"
                />
              </div>
              <div className="p-3 flex flex-col w-full">
                <label htmlFor="" className="font-semibold">
                  Content
                </label>
                <br />
                <textarea
                  onChange={handleChange}
                  name="content"
                  className="p-2 shadow-lg "
                  id=""
                  value={formData.content}
                  cols="30"
                  rows="7"
                ></textarea>
              </div>
              <div className="p-3 flex flex-col w-full">
                <button
                  className="p-4 text-white leading-4 tracking-wide rounded-lg text-lg font-semibold bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
