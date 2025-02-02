import React, { useEffect } from "react";
export default function Benefits() {
  useEffect(() => {
    function setInitialPositions() {
      const e = document.getElementById("benefit");
      e.style.backgroundPosition = `${40}% 0%`;
    }
    setInitialPositions();
    window.addEventListener("resize", setInitialPositions);

    function reveal() {
      var sphere = document.querySelectorAll(".sphere");
      var Ldot = document.querySelectorAll(".benefit-dot-left");
      var Rdot = document.querySelectorAll(".benefit-dot-right");
      var txt = document.querySelectorAll(".benefit-txt");
      for (var i = 0; i < sphere.length; i++) {
        var windowHeight = window.innerHeight;
        var sphereTop = sphere[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (sphereTop < windowHeight - elementVisible) {
          sphere[i]?.classList.add("show");
          Ldot[i]?.classList.add("show");
          Rdot[i]?.classList.add("show");
          txt[i]?.classList.add("show");
        }
      }
    }
    window.addEventListener("scroll", reveal);
    return () => {
      window.removeEventListener("resize", setInitialPositions);
    };
  }, []);

  return (
    <section id="benefit" className="mb-10 pt-[100px] px-5">
      <div className="heading  justify-center align-center ">
        <h1 className=" md:text-[4rem] text-[2.5rem] benefit-heading ">
          Benefits
        </h1>
        <h3 className="md:text-[1.5rem]  text-[15px] py-1 ">
          Unlock the full benefits of what we offer and experience positive
          changes in your life.
        </h3>
      </div>
      <div className="benefit-container md:justify-center md:align-middle py-[101px]  font-poppins flex  md:items-center md:space-y-10 space-y-20  md:space-x-48">
        <div className="flex flex-col md:items-center md:space-y-10 space-y-20  md:space-x-48 md:justify-center md:align-middle md:w-[100%] lg:w-[89%] xl:w-[83%]">
          {/* first row */}

          <div className="flex md:flex-row flex-col mr-0 md:mr-[4vw]  gap-0 md:gap-[8vw]">
            {/* first left square */}
            <div className="flex flex-row md:mt-0 mt-[10vh] w-full justify-between ">
              <div className="flex flex-col mx-1 ">
                <h3
                  className={`text-[#00F0B5] md:text-right  benefit-txt out text-[20px]`}
                >
                  Boosted Productivity
                </h3>
                <p className={`break-normal text-justify md:text-right `}>
                  Enhanced productivity with AI-powered scheduler and optimized
                  study techniques
                </p>
              </div>
              <div className="flex flex-col md:mr-0 mr-[30vw] benefit-dot-left">
                <svg
                  width="42"
                  height="26"
                  viewBox="0 0 42 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="29.1335"
                    cy="12.5098"
                    rx="12.5825"
                    ry="12.5"
                    fill="#00F0B5"
                  />
                  <path
                    d="M1.16414 11.8027C0.773615 12.1932 0.773615 12.8263 1.16414 13.2169L7.5281 19.5808C7.91862 19.9714 8.55179 19.9714 8.94231 19.5808C9.33284 19.1903 9.33284 18.5571 8.94231 18.1666L3.28546 12.5098L8.94231 6.85291C9.33284 6.46239 9.33284 5.82922 8.94231 5.4387C8.55179 5.04817 7.91862 5.04817 7.5281 5.4387L1.16414 11.8027ZM26.551 11.5098H1.87125V13.5098H26.551V11.5098Z"
                    fill="#00F0B5"
                  />
                </svg>
              </div>
            </div>

            <div
              className="sphere md:mt-0  mt-[50px] md:relative absolute right-16  "
              id="1"
            >
              <div className="spherebg bg-[#00F0B5] blur-[4rem]"></div>
              <svg
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.89014"
                  y="1.72705"
                  width="54.6238"
                  height="54.6238"
                  rx="27.3119"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.6864 9.3549C24.598 9.5184 24.1125 9.90011 24.2329 10.4977C24.4893 11.7754 32.4686 11.8121 32.725 10.5361C32.8436 9.94549 32.2081 9.56379 30.69 9.31242C29.476 9.11168 28.2208 8.98367 27.901 9.02847C27.5812 9.0727 26.5847 9.21991 25.6864 9.3549ZM19.4321 11.5386C16.1192 13.2644 14.9593 14.5445 15.8768 15.4627C16.3681 15.9544 16.7983 15.8915 17.567 15.2148C18.1344 14.7156 19.7275 13.7387 21.1072 13.0445C23.3834 11.8988 24.048 10.7066 22.6322 10.3092C22.3322 10.2248 20.8921 10.7781 19.4321 11.5386ZM33.8122 10.4866C33.0215 11.2774 33.4855 11.8511 35.8954 13.0637C37.2548 13.7474 38.8304 14.7156 39.3979 15.2148C40.1665 15.8915 40.5967 15.9544 41.088 15.4627C42.0206 14.5294 40.8194 13.2394 37.4048 11.5078C34.3029 9.93502 34.35 9.9484 33.8122 10.4866ZM23.5404 16.2267C23.5404 18.6856 24.7823 21.8399 26.7858 24.4682C28.4144 26.6054 30.0034 27.0662 29.533 25.2654C28.9999 23.2253 30.4365 20.1647 32.2866 19.3978C33.2326 19.0057 34.0058 18.4552 34.0058 18.1742C34.0058 17.1693 30.6453 17.6854 29.0598 18.9335L27.4458 20.2043L26.3649 18.8689C25.7707 18.1346 25.2846 16.7771 25.2846 15.8526C25.2846 14.7464 24.9864 14.1716 24.4125 14.1716C23.802 14.1716 23.5404 14.7878 23.5404 16.2267ZM27.2405 15.0403C27.0393 15.5657 27.1533 16.2744 27.494 16.6154C28.3801 17.5021 30.058 16.6916 29.8266 15.4895C29.5691 14.15 27.7062 13.8265 27.2405 15.0403ZM13.5174 16.3559C12.3244 17.7075 10.1679 21.8213 10.1679 22.7453C10.1679 24.3332 11.9459 23.3638 12.804 21.3075C13.3035 20.1118 14.2314 18.5797 14.8663 17.9036C15.8332 16.8731 15.8902 16.5653 15.2175 16.0068C14.5977 15.4918 14.2093 15.5715 13.5174 16.3559ZM41.8032 16.133C41.6351 16.5717 42.1549 17.9007 42.959 19.0866C43.7631 20.2718 44.5806 21.7457 44.7759 22.3619C44.9713 22.9775 45.5341 23.4814 46.0271 23.4814C47.2964 23.4814 46.5934 21.0404 44.4096 17.8641C42.5148 15.1078 42.2607 14.939 41.8032 16.133ZM36.2792 18.4087C33.6773 20.1636 31.1505 23.8741 30.711 26.5873L30.3517 28.8019L32.3238 27.5986C34.6919 26.1539 36.767 26.0619 38.5653 27.3228C39.2967 27.8354 40.0653 28.0851 40.2729 27.8767C40.9433 27.2064 39.5072 25.5464 37.3088 24.4519C36.1315 23.8654 35.1687 23.0909 35.1687 22.7308C35.1687 22.3706 36.1082 21.1132 37.2565 19.9361C39.6886 17.4434 39.0926 16.5112 36.2792 18.4087ZM21.2345 19.0935C20.8345 19.5759 20.4705 21.2185 20.4252 22.7441C20.345 25.4306 20.288 25.5167 18.5984 25.4719C17.6391 25.4469 16.1006 25.2136 15.1797 24.9535C12.8098 24.2849 13.3889 25.7803 16.0169 27.1168C18.2565 28.2561 24.9957 28.5162 26.4475 27.5201C27.1876 27.0115 27.1016 26.7712 25.8788 25.9287C23.0078 23.9509 22.2898 22.8832 22.4648 20.8531C22.666 18.514 22.2311 17.892 21.2345 19.0935ZM16.1937 21.4408C15.9925 21.9662 16.1065 22.6749 16.4472 23.0159C17.3332 23.9026 19.0112 23.0921 18.7798 21.89C18.5222 20.5505 16.6594 20.227 16.1937 21.4408ZM38.3129 21.3739C37.8426 22.601 38.5031 23.4814 39.895 23.4814C40.7729 23.4814 41.0177 23.1573 40.8781 22.178C40.6613 20.657 38.8106 20.0769 38.3129 21.3739ZM9.35799 26.4244C8.86088 29.5356 9.46962 32.7912 10.5487 32.7912C11.2104 32.7912 11.3464 31.9317 11.211 28.6192C11.0185 23.9189 9.95859 22.6638 9.35799 26.4244ZM45.6341 28.4272C45.6341 31.763 45.8242 32.7912 46.4417 32.7912C46.8998 32.7912 47.4097 31.9341 47.6202 30.8105C48.1324 28.0787 47.4254 24.0632 46.4318 24.0632C45.8265 24.0632 45.6341 25.1164 45.6341 28.4272ZM16.5634 29.2523C16.5634 30.6714 17.485 31.7776 19.542 32.8278C20.7822 33.4609 21.7962 34.2697 21.7962 34.6252C21.7962 34.9813 20.8804 36.1363 19.7612 37.193C17.4902 39.3365 17.3024 39.7735 18.6542 39.7735C21.206 39.7735 26.4289 33.2299 26.4422 30.0157L26.4475 28.6943L24.1451 29.8702C21.2741 31.3359 20.5793 31.3371 18.7304 29.8818C17.103 28.6006 16.5634 28.4441 16.5634 29.2523ZM32.0186 29.1923C29.9563 29.677 29.4417 30.8099 31.0517 31.3214C32.9308 31.9184 34.6727 34.5536 34.4733 36.497C34.3762 37.4455 34.6012 38.3229 34.9739 38.4474C35.8605 38.7436 36.5286 36.5657 36.4204 33.7338L36.3338 31.4761L38.8037 31.7735C40.1618 31.9376 41.6334 32.1674 42.0729 32.2855C42.5125 32.4036 42.9869 32.1883 43.1276 31.8072C43.7625 30.082 36.003 28.2555 32.0186 29.1923ZM27.3766 32.0638C27.8365 34.3762 26.7626 36.671 24.7282 37.7242C23.7549 38.2275 22.959 38.9275 22.959 39.2795C22.959 40.2122 26.423 39.4069 28.2842 38.0419C29.6528 37.0376 29.9133 37.0085 30.561 37.7894C30.9627 38.274 31.4447 39.6118 31.6313 40.7615C31.818 41.9113 32.2325 42.7486 32.5523 42.6223C33.4331 42.2732 33.1122 37.3215 32.0825 35.3781C31.011 33.355 28.3749 30.4637 27.6016 30.4637C27.3027 30.4637 27.201 31.1835 27.3766 32.0638ZM10.8522 33.8909C10.2929 34.2371 10.2731 34.7375 10.7668 36.0374C11.9523 39.1585 15.4006 42.8929 15.4006 41.0559C15.4006 40.8011 14.5413 38.9828 13.4913 37.0161C12.1749 34.5507 11.3557 33.5802 10.8522 33.8909ZM16.3896 33.7408C16.1658 33.9654 15.982 34.6473 15.982 35.2559C15.982 36.0717 16.3268 36.3143 17.2902 36.1776C18.1455 36.056 18.5984 35.5911 18.5984 34.8358C18.5984 33.6814 17.1611 32.9692 16.3896 33.7408ZM38.8025 33.7984C38.4031 33.9374 38.0757 34.5536 38.0757 35.1669C38.0757 35.9687 38.4845 36.2823 39.5293 36.2823C40.5677 36.2823 40.9828 35.9681 40.9828 35.1809C40.9828 34.0067 39.9967 33.3812 38.8025 33.7984ZM43.4375 37.0143C41.3712 40.9518 41.2188 41.5191 42.227 41.5191C43.5672 41.5191 47.0923 35.5637 46.5649 34.1894C46.0103 32.7423 45.3818 33.3102 43.4375 37.0143ZM27.4167 40.1616C26.7382 40.8401 26.9992 42.5467 27.8301 42.8661C28.726 43.21 29.9359 42.2377 29.9359 41.1741C29.9359 40.7924 29.522 40.321 29.0162 40.1267C27.8777 39.6891 27.8882 39.6891 27.4167 40.1616ZM15.6675 42.1399C15.064 43.1163 20.5653 46.7559 22.645 46.7559C24.3788 46.7559 23.5137 45.1749 21.2113 44.1357C19.9304 43.5579 18.5903 42.7329 18.2333 42.3023C17.4542 41.3626 16.1966 41.2829 15.6675 42.1399ZM38.6159 42.4414C38.1949 42.9487 36.8548 43.7628 35.6379 44.2504C33.4477 45.1272 32.5913 46.7559 34.3198 46.7559C36.3995 46.7559 41.9008 43.1163 41.2973 42.1399C40.7409 41.2386 39.4973 41.3789 38.6159 42.4414ZM24.2509 46.7076C24.3928 47.443 25.2463 47.6287 28.4824 47.6287C31.7186 47.6287 32.5721 47.443 32.7139 46.7076C32.8628 45.9325 32.1912 45.7859 28.4824 45.7859C24.7736 45.7859 24.102 45.9325 24.2509 46.7076Z"
                  fill="white"
                />
              </svg>
              <h2 className="text-white  text-center text-xl font-semibold font-poppins">
                Boosted Productivity
              </h2>
            </div>

            {/* first right square */}
            <div className="sphere  md:mt-0 mt-[10vh]  md:ml-0 ml-3" id="2">
              <div className="spherebg bg-[#AA77FF]  blur-[4rem]"></div>
              <svg
                width="81"
                height="81"
                viewBox="0 0 81 81"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M38.2501 37.3833C36.1047 38.5083 35.3305 40.9112 36.5355 42.7064C38.0322 44.9362 40.6679 45.2716 42.4767 43.4628C43.7169 42.2226 43.9979 40.7692 43.2776 39.3196C42.2443 37.2402 40.0988 36.414 38.2501 37.3833Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M43.876 20.1305C42.8974 20.6736 42.0794 22.0642 42.0774 23.1891C42.0756 24.0639 42.0055 24.1491 41.4208 23.9883C37.5322 22.9186 34.0669 23.1981 30.7697 24.8476C27.6474 26.4095 26.699 27.9365 27.9749 29.3465C28.7223 30.1724 29.595 30.0558 31.3125 28.9C34.3779 26.8371 37.8199 26.5084 41.0184 27.9726C45.3672 29.9635 47.7181 34.5718 46.7389 39.1859C46.3211 41.154 46.5978 42.0197 47.7355 42.3051C49.4921 42.7461 50.3488 41.5833 50.6711 38.3205C50.9917 35.0766 49.7498 30.8959 47.764 28.5363C46.9355 27.5516 46.816 27.0096 47.4269 27.0096C47.6503 27.0096 48.2394 26.5468 48.736 25.9813C49.474 25.1408 49.6387 24.7024 49.6369 23.5813C49.6349 22.0703 48.9434 20.7437 47.8382 20.1305C46.9731 19.6505 44.7412 19.6505 43.876 20.1305Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33.3491 30.6459C33.3491 30.7259 33.4145 30.7914 33.4945 30.7914C33.5745 30.7914 33.64 30.7259 33.64 30.6459C33.64 30.5659 33.5745 30.5005 33.4945 30.5005C33.4145 30.5005 33.3491 30.5659 33.3491 30.6459ZM54.7344 35.2042C53.9876 35.7918 53.9437 35.9446 54.0964 37.4247C54.5709 42.0222 52.3559 45.9769 48.2203 47.9155C46.881 48.5433 46.1645 48.6817 44.2582 48.6817C41.5867 48.6817 39.658 47.951 37.4669 46.1087C36.7719 45.5242 35.8881 45.046 35.5032 45.046C34.5752 45.046 33.64 46.0202 33.64 46.9866C33.64 48.1156 35.8779 50.1293 38.5526 51.4064C40.7105 52.4371 40.8548 52.4642 44.1851 52.4642H47.603L47.6033 53.293C47.6036 53.7488 47.8221 54.5823 48.0894 55.1455C49.3625 57.8282 53.3252 57.9952 54.888 55.4317C55.9507 53.6889 55.3421 50.8633 53.7162 49.9935C53.1257 49.6772 53.1454 49.6243 54.3553 48.2785C56.76 45.6033 58.0764 42.241 58.0764 38.7737C58.0764 36.5177 57.6644 35.3258 56.739 34.9043C55.7639 34.4598 55.6612 34.4752 54.7344 35.2042ZM30.44 39.6641C30.44 39.7441 30.5054 39.8096 30.5854 39.8096C30.6654 39.8096 30.7309 39.7441 30.7309 39.6641C30.7309 39.5841 30.6654 39.5187 30.5854 39.5187C30.5054 39.5187 30.44 39.5841 30.44 39.6641ZM21.1309 45.4823C21.1309 45.5623 21.1963 45.6278 21.2763 45.6278C21.3563 45.6278 21.4218 45.5623 21.4218 45.4823C21.4218 45.4023 21.3563 45.3369 21.2763 45.3369C21.1963 45.3369 21.1309 45.4023 21.1309 45.4823ZM33.64 55.6642C33.64 55.7442 33.7054 55.8096 33.7854 55.8096C33.8654 55.8096 33.9309 55.7442 33.9309 55.6642C33.9309 55.5842 33.8654 55.5187 33.7854 55.5187C33.7054 55.5187 33.64 55.5842 33.64 55.6642Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M35.6758 29.8935C32.3417 30.9446 28.9314 33.943 27.4748 37.1034C26.9733 38.1917 26.5308 39.1247 26.4918 39.1764C26.4528 39.2282 26.0223 39.0644 25.5356 38.8128C23.5507 37.7865 21.0736 38.5519 20.1616 40.4736C19.5967 41.664 19.5559 42.3645 19.9862 43.4996C20.8854 45.8735 23.0643 46.622 25.8085 45.5002C26.1741 45.3507 26.3417 45.639 26.625 46.9047C27.302 49.9296 30.2402 53.5474 33.3785 55.2201C35.2616 56.2237 36.5334 56.3386 37.2307 55.5683C37.7299 55.0168 37.8611 53.8682 37.4896 53.3021C37.3721 53.1232 36.5768 52.624 35.7224 52.1932C29.958 49.2855 28.1282 42.6743 31.6261 37.3935C32.7388 35.7132 34.1337 34.6601 36.5264 33.6931C37.7948 33.1805 38.5846 32.6639 38.8697 32.16C39.2636 31.4647 39.2488 31.3303 38.6957 30.5865C38.054 29.7233 36.9901 29.4793 35.6758 29.8935Z"
                  fill="white"
                />
                <rect
                  x="1.56363"
                  y="40.0391"
                  width="54.6238"
                  height="54.6238"
                  rx="27.3119"
                  transform="rotate(-45 1.56363 40.0391)"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>

              <h2 className="text-white text-xl text-center font-semibold font-poppins">
                Focus Better
              </h2>
            </div>

            <div className=" flex flex-row md:mt-0 ml-[-4vw] mt-[-20vh] w-full justify-between ">
              <div className="flex flex-col md:ml-0 ml-[30vw] benefit-dot-right">
                <svg
                  width="41"
                  height="26"
                  viewBox="0 0 41 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="12.6316"
                    cy="12.8291"
                    rx="12.6315"
                    ry="12.5"
                    transform="rotate(-180 12.6316 12.8291)"
                    fill="#AA77FF"
                  />
                  <path
                    d="M40.7072 13.5362C41.0977 13.1457 41.0977 12.5125 40.7072 12.122L34.3432 5.75803C33.9527 5.36751 33.3195 5.36751 32.929 5.75803C32.5385 6.14856 32.5385 6.78172 32.929 7.17225L38.5859 12.8291L32.929 18.486C32.5385 18.8765 32.5385 19.5096 32.929 19.9002C33.3195 20.2907 33.9527 20.2907 34.3432 19.9002L40.7072 13.5362ZM15.2241 13.8291L40.0001 13.8291V11.8291L15.2241 11.8291V13.8291Z"
                    fill="#AA77FF"
                  />
                </svg>
              </div>
              <div className="flex flex-col  mx-1 ">
                <h3 className="text-[#AA77FF] md:text-left  text-[20px] benefit-txt">
                  Focus Better
                </h3>
                <p className="break-normal text-justify md:text-left ">
                  {" "}
                  Find your perfect study partner and stay motivated with our
                  Focus Planet and Lofi Sessions.
                </p>
              </div>
            </div>
          </div>

          {/* Second Row */}

          <div className=" flex md:flex-row  flex-col md:place-items-baseline gap-0 md:gap-[8vw]">
            {/* first left square */}

            <div className="flex flex-row md:mt-0 mt-[10vh] ml-[-4vw] justify-between ">
              <div className="flex flex-col mx-1 ">
                <h3
                  className={`text-[#E90064]  md:text-right   text-[20px] benefit-txt`}
                >
                  Diverse Connections
                </h3>
                <p className={`md:text-right text-justify`}>
                  Connect and expand with a community of like-minded individuals
                  through tailored group chats, study and gym buddies, and Vent
                  Zone.
                </p>
              </div>
              <div className="flex flex-col md:mr-0 mr-[30vw] benefit-dot-left">
                <svg
                  width="42"
                  height="26"
                  viewBox="0 0 42 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="29.2087"
                    cy="13.1128"
                    rx="12.6315"
                    ry="12.5"
                    fill="#E90064"
                  />
                  <path
                    d="M1.13316 12.4057C0.742636 12.7962 0.742636 13.4294 1.13316 13.8199L7.49712 20.1839C7.88765 20.5744 8.52081 20.5744 8.91133 20.1839C9.30186 19.7933 9.30186 19.1602 8.91133 18.7696L3.25448 13.1128L8.91133 7.45594C9.30186 7.06541 9.30186 6.43225 8.91133 6.04173C8.52081 5.6512 7.88765 5.6512 7.49712 6.04173L1.13316 12.4057ZM26.6162 12.1128H1.84027V14.1128H26.6162V12.1128Z"
                    fill="#E90064"
                  />
                </svg>
              </div>
            </div>
            <div className="sphere md:mt-0 mt-[50px] md:relative absolute right-16">
              <div className="spherebg bg-[#E90064] blur-[4rem]"></div>
              <svg
                width="58"
                height="58"
                viewBox="0 0 57 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.01709"
                  y="1.72754"
                  width="54.6238"
                  height="54.6238"
                  rx="27.3119"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.37 10.3028C25.1642 11.0802 23.9096 11.9276 22.2307 12.4241C17.2776 13.8887 11.0924 20.8081 11.0924 24.8843C11.0924 25.6429 10.4665 26.4481 9.68748 26.6922C7.88496 27.2573 7.83719 29.828 9.62145 30.2885C10.4616 30.5055 11.1219 31.4833 11.3938 32.9153C12.2655 37.5012 19.3731 44.3755 23.243 44.3755C23.8696 44.3755 25.1663 45.2097 26.1238 46.2291C27.5941 47.795 28.0359 47.9434 28.9625 47.1847C29.5652 46.6903 30.059 45.856 30.059 45.3311C30.059 44.8054 30.7425 44.3755 31.5777 44.3755C35.9787 44.3755 43.0322 37.565 43.8484 32.5277C44.1301 30.7871 44.7047 29.8204 45.5934 29.5908C46.3443 29.3974 46.9182 28.6373 46.9182 27.8371C46.9182 26.6762 46.3963 26.387 43.9875 26.2116C41.4319 26.0257 40.9683 25.7317 40.3698 23.9183C39.9926 22.7741 39.0745 21.0578 38.3306 20.1042C36.7036 18.0204 32.2936 15.2583 30.5859 15.2535C29.9101 15.2514 29.3565 14.7431 29.3565 14.1231C29.3565 12.4754 32.9047 13.3437 36.6959 15.9185C39.4903 17.8165 42.7034 22.5834 42.7034 24.8309C42.7034 25.2823 43.0195 25.652 43.4059 25.652C44.4968 25.652 44.239 23.7692 42.754 20.8962C40.837 17.1861 36.2112 13.3048 32.5577 12.3402C30.609 11.8257 29.327 11.0518 29.1184 10.2647C28.673 8.58373 25.8175 8.61285 25.37 10.3028ZM25.1417 14.0704C25.1417 14.5662 24.0283 15.3686 22.667 15.8547C19.5361 16.9726 15.5264 21.0078 14.9433 23.6277C14.4874 25.6762 13.4394 26.8128 12.6891 26.0729C11.7886 25.1832 14.0224 20.1951 16.408 17.77C19.8845 14.2362 25.1417 12.0094 25.1417 14.0704ZM32.2324 19.7915C35.2292 21.3206 37.0781 24.6707 37.0809 28.5749C37.083 31.2427 36.684 32.2947 34.9124 34.2863C30.699 39.0233 24.4892 39.0095 20.2596 34.2537C16.5267 30.0568 17.6598 23.0147 22.5419 20.0765C25.2485 18.4469 29.3615 18.3255 32.2324 19.7915ZM25.6686 25.7074C23.1678 27.145 24.5938 31.1997 27.6004 31.1997C30.6863 31.1997 32.0351 27.0666 29.4029 25.6762C27.7423 24.799 27.2407 24.8032 25.6686 25.7074ZM42.742 31.76C41.0793 37.4838 37.9842 40.6731 31.8622 42.9705C28.8473 44.1023 29.6333 41.7958 32.6933 40.5337C36.3159 39.04 38.9501 36.3771 40.3277 32.8154C41.6462 29.4071 43.684 28.5167 42.742 31.76ZM14.9841 33.1067C16.4972 36.6829 19.1947 39.2834 22.8025 40.6433C26.2552 41.9449 27.1571 43.9566 23.8717 43.0267C20.8419 42.1689 17.9204 40.5143 16.2675 38.7203C14.4502 36.7481 12.4973 33.0498 12.4973 31.5811C12.4973 29.6255 13.8658 30.4653 14.9841 33.1067Z"
                  fill="white"
                />
              </svg>

              <h2 className="text-white text-center text-xl font-semibold font-poppins">
                Diverse Connections
              </h2>
            </div>
            {/* second right square */}

            <div className="sphere  md:mt-0 mt-[10vh]  md:ml-0 ml-[7vw] ">
              <div className="spherebg  bg-[#00AEFF] blur-[4rem]"></div>
              <svg
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.88721"
                  y="1.72705"
                  width="54.6238"
                  height="54.6238"
                  rx="27.3119"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30.0187 9.77978C30.0187 14.6563 30.0944 14.8464 32.2125 15.2976C38.04 16.5405 42.6494 20.0767 44.0167 24.354C44.5943 26.1611 45.7614 27.2933 47.0705 27.3159C48.1889 27.3346 46.895 22.4565 45.1734 20.1624C44.3063 19.0068 43.8125 17.5138 44.0749 16.8444C44.4132 15.9841 44.118 15.674 43.0698 15.7878C42.2537 15.8758 39.5709 15.028 37.1082 13.9028C32.9791 12.0162 32.5595 11.5798 31.7123 8.29298C31.2065 6.33318 30.6194 4.72949 30.4064 4.72949C30.1934 4.72949 30.0187 7.00177 30.0187 9.77978ZM22.4815 14.4108C20.3811 15.4488 18.1043 16.0893 17.4214 15.8337C16.4793 15.4807 16.3142 15.7098 16.737 16.7852C17.0712 17.6361 16.8112 18.7224 16.086 19.5048C15.4223 20.2209 14.398 22.1659 13.8092 23.8265C12.8887 26.4245 12.1922 27.0331 8.81456 28.1949L4.88965 29.5446L10.1093 29.6046L15.3282 29.6653L16.2767 26.2024C17.4095 22.0661 21.0496 17.7787 24.6299 16.3636C27.1524 15.367 28.3857 14.3041 28.4112 13.1064C28.4335 12.0404 26.3466 12.4993 22.4815 14.4108ZM24.4815 18.1177C19.9782 20.4141 17.9839 23.1049 17.4677 27.5816C16.8279 33.1268 17.7238 34.9689 24.2454 41.5153L30.3354 47.6285L35.8207 42.3483C42.2513 36.1572 43.5803 33.9878 43.5803 29.6794C43.5803 19.6598 33.4641 13.5365 24.4815 18.1177ZM34.3791 21.4217C43.1336 24.9953 40.0144 38.237 30.4175 38.237C20.9459 38.237 17.707 25.0974 26.2812 21.4552C29.5464 20.0682 31.0462 20.0619 34.3791 21.4217ZM44.4595 32.766C43.708 35.6297 42.3199 37.8139 39.1552 41.1086C36.7971 43.5632 35.0173 45.7178 35.2 45.8955C35.3819 46.0731 37.0723 45.3484 38.9574 44.284C40.8417 43.2195 42.8775 42.5198 43.4806 42.7278C44.1523 42.9601 44.4347 42.692 44.2098 42.0359C44.0079 41.4468 44.6804 39.4215 45.7055 37.5365C46.7306 35.6515 47.5691 33.6488 47.5691 33.087C47.5691 32.5252 49.0944 31.6415 50.9595 31.1241C56.3586 29.6241 56.2637 28.8861 50.6715 28.8861H45.4774L44.4595 32.766ZM13.266 32.7395C13.266 33.4922 14.1044 35.6515 15.1295 37.5365C16.1546 39.4215 16.8271 41.4468 16.6253 42.0359C16.4003 42.692 16.6827 42.9601 17.3544 42.7278C17.9575 42.5198 19.9934 43.2195 21.8777 44.284C23.7627 45.3484 25.4516 46.0755 25.6311 45.9002C25.8105 45.7248 24.1744 43.6653 21.9957 41.3244C19.8171 38.9836 17.6161 35.9531 17.1055 34.591C16.0685 31.8223 13.266 30.4711 13.266 32.7395Z"
                  fill="white"
                />
              </svg>

              <h2 className="text-white text-center text-xl font-semibold font-poppins">
                Personalized Roadmaps
              </h2>
            </div>
            <div className="flex flex-row md:mt-0 ml-[-4vw] mt-[-20vh] justify-between  ">
              <div className="flex flex-col md:ml-0 ml-[30vw] benefit-dot-right">
                <svg
                  width="41"
                  height="26"
                  viewBox="0 0 41 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="12.6316"
                    cy="12.6182"
                    rx="12.6315"
                    ry="12.5"
                    transform="rotate(-180 12.6316 12.6182)"
                    fill="#00AEFF"
                  />
                  <path
                    d="M40.7077 13.3253C41.0982 12.9347 41.0982 12.3016 40.7077 11.9111L34.3437 5.5471C33.9532 5.15657 33.32 5.15657 32.9295 5.5471C32.539 5.93762 32.539 6.57079 32.9295 6.96131L38.5863 12.6182L32.9295 18.275C32.539 18.6655 32.539 19.2987 32.9295 19.6892C33.32 20.0798 33.9532 20.0798 34.3437 19.6892L40.7077 13.3253ZM15.2246 13.6182L40.0006 13.6182V11.6182L15.2246 11.6182V13.6182Z"
                    fill="#00AEFF"
                  />
                </svg>
              </div>
              <div className="flex flex-col   mx-1 ">
                <h3 className="text-[#00AEFF] md:text-left  text-[20px] benefit-txt">
                  Personalized Roadmaps
                </h3>
                <p className="break-normal text-justify md:text-left ">
                  Explore a roadmap tailored to your personality. Get expert
                  tips on productivity and self-improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
