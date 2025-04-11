import React from "react";
import Footer from "../component/global/Footer";
import "../styles/page/Home.css";

const Home = () => {
  return (
    <div className="home relative">
      {/* NAVBAR */}
      <nav className="navbar-container fixed top-0 z-50 bg-white w-full">
        <div className="mx-auto max-w-screen-xl grid grid-cols-2 py-3 px-6">
          <div className="brand flex items-center">
            <img src="http://placehold.co/75" alt="" className="logo pe-5" />
            <h1 className="brand-name">Flashback</h1>
          </div>
          <div className="flex items-center justify-end">
            <button>About</button>
          </div>
        </div>
      </nav>

      {/* BODY */}
      <div className="body-container relative flex flex-col min-h-screen justify-center">
        <div className="flex justify-center items-center ">
          <div className="grid grid-cols-2">
            <div>
              <img src="http://placehold.co/500" alt="" className="home-img" />
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="grid grid-rows-3">
                <h2>
                  Flashback helps you master anything, anytime—one digital card
                  at a time.
                </h2>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Get Started
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Alternative
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full text-center">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-4 gap-20 justify-items-center py-10">
              <div className="text-center">
                <p>Flashcards</p>
              </div>
              <div className="text-center">
                <p>Study Mode</p>
              </div>
              <div className="text-center">
                <p>Quizzes</p>
              </div>
              <div className="text-center">
                <p>Match Mode</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUE BLOCKS */}
      <div className="value-blocks-container">
        <div className="grid grid-cols-5 py-20">
          <div className="col-span-2 flex justify-end">
            <img src="http://placehold.co/300" alt="" className="value-1" />
          </div>
          <div className="col-span-3 h-full flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-lg font-semibold">
                Study smarter, not harder.
              </h4>
              <h5 className="text-sm text-gray-600">
                Master topics with intelligent flashcards that adapt to how well
                <br />
                you know the material—so you focus where it matters most.
              </h5>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 py-20">
          <div className="col-span-3 h-full flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-lg font-semibold">
                Review in minutes, retain for life.
              </h4>
              <h5 className="text-sm text-gray-600">
                Whether you’ve got 5 minutes or 50, Flashback helps you lock in
                <br />
                knowledge with fast, focused review sessions.
              </h5>
            </div>
          </div>
          <div className="col-span-2 flex justify-start">
            <img src="http://placehold.co/300" alt="" className="value-1" />
          </div>
        </div>

        <div className="grid grid-cols-5 py-20">
          <div className="col-span-2 flex justify-end">
            <img src="http://placehold.co/300" alt="" className="value-1" />
          </div>
          <div className="col-span-3 h-full flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-lg font-semibold">Your memory, on demand.</h4>
              <h5 className="text-sm text-gray-600">
                Access your flashcards anytime, anywhere. Perfect for cramming
                <br />
                before class or brushing up while in line for coffee.
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOAD PLUG */}
      <div className="download-plug-container text-center items-center pt-60 min-h-screen">
        <h3 className="pb-10">Train your brain, one flash at a time.</h3>
        <div className="download-buttons flex justify-center">
          <button
            type="button"
            className="flex items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 text-left gap-2"
          >
            <img src="http://placehold.co/75" alt="" className="apple" />
            <div>
              Download on <br /> Apple
            </div>
          </button>
          <button
            type="button"
            className="flex items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 text-left gap-2"
          >
            <img src="http://placehold.co/75" alt="" className="apple" />
            <div>
              Download on <br /> Apple
            </div>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
