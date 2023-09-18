
import Image from "next/image";
import { useEffect } from "react";
export default function About() {
  useEffect(() => {
    function reveal() {
      var crew = document.querySelectorAll(".crew");
      for (var i = 0; i < crew.length; i++) {
        var windowHeight = window.innerHeight;
        var crewTop = crew[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (crewTop < windowHeight - elementVisible) {
          crew[i]?.classList.add("show");
        }
      }
    }
    window.addEventListener("scroll", reveal);
  }, []);

  return (
    <section id="about">
      <div className="p-5 py-[8vh]   text-[#2E2E2E]   flex-wrap flex flex-row  font-poppins align-center items-center  justify-center  ">
        <div className="flex flex-col  md:w-[60vw] heading py-10 text-center md:text-left align-center justify-center mr-0 md:mr-5">
          <h1 className="revealtitle md:mt-[-115px] mt-[-10px] text-center md:text-left text-[2.5rem] md:text-[3vw]  font-bold">
            About Us
          </h1>
          <p className="text-[1rem] text-justify mt-3 md:text-[1.2vw] break-words ">
            OwnBoon was born from our team's journey in the self-improvement
            niche. Witnessing the lack of an all-in-one social platform that
            truly supports personal growth and productivity at the same time, we set out to create a transformative space. Powered by AI tools and personalized roadmaps, OwnBoon provides a distraction-free environment for work, connection, and learning. Together, We've decided to shape a future where personal development and social connection thrive. Join us on this remarkable journey towards fulfillment and success. Together, We empower individuals to unlock their full potential.
          </p>
        </div>
        <div className="  justify-center flex flex-col py-10 md:flex-nowrap flex-wrap ">
          <h1 className="revealtitle text-center md:text-left text-[2.5rem] md:text-[3vw] benefit-heading font-bold">
            Our Team
          </h1>
          <div className="flex mt-2 flex-row">
            <div className="flex px-3 flex-col">
              <div className="flex  mb-3 justify-center items-center align-center flex-col">
                <div className="som-bg p-2">
                  <Image
                    alt="Som Srivastava"
                    className="z-100 "
                    src={"/som.webp"}
                    width={100}
                    height={100}
                  />
                </div>
                <h2 className="mt-3 text-[16px] text-center font-semibold">
                  Som Srivastava
                </h2>
                <h3 className="pt-1 text-center text-[14px]">CEO <br /> FOUNDER</h3>
              </div>
              <div className="flex  justify-center items-center align-center flex-col">
                 <div className="sarthak-bg p-2">
                  <Image
                    alt="Saarthak Dutta"
                    className="z-100 "
                    src={"/sarthak.webp"}
                    width={100}
                    height={100}
                  />
                </div>

                <h2 className="mt-3 text-[16px] text-center font-semibold">
                  Saarthak Dutta
                </h2>
                <h3 className="mt-1 text-center text-[14px]">
                  CTO
                </h3>
                  
               
              </div>
            </div>
            <div className="flex px-3  flex-col">
              <div className="flex justify-center mb-3 items-center align-center flex-col">
                
                <div className="alok-bg p-2">
                  <Image
                    alt="Alok Singh"
                    className="z-100 "
                    src={"/alok.webp"}
                    width={100}
                    height={100}
                  />
                </div>

                <h2 className="mt-3 text-[16px] text-center font-semibold">
                  Alok Singh
                </h2>
                <h3 className="pt-1 text-center text-[14px]">
                  COO <br /> CO-FOUNDER
                </h3>
            
              </div>
              <div className="flex justify-center items-center align-center flex-col">
                <div className="ivavi-bg p-2">
                  <Image
                    alt="Devansh Rajwar"
                    className="z-100 "
                    src={"/avi.webp"}
                    width={100}
                    height={100}
                  />
                </div>

                <h2 className="mt-3 text-[16px] text-center font-semibold">
                  Devansh Rajwar
                </h2>
                <h3 className="pt-1 text-center text-[14px]">CONTENT HEAD</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
