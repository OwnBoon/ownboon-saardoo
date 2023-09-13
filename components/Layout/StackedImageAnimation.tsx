import { Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

const images = ["/exploreimg1.png", "/exploreimg2.png", "/exploreimg3.png"];

export const StackedImageAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | number>(-1);
  const size = useMemo(() => images.length, []);
  const [iphone, setIphone] = useState(false);
  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768) {
        setIphone(true);
      } else {
        setIphone(false);
      }
    };
    check();
    timer.current = setInterval(
      () => setActiveIndex((cur) => (cur + 1) % size),
      5000
    );
    window.addEventListener("resize", check);
    return () => clearInterval(timer.current as number);
  }, [size]);

  const map = useMemo(() => {
    const map = new Map<number, number>();
    const len = images.length;
    let i = len;

    if (len < activeIndex || activeIndex < 0)
      throw new Error("Invalid index set as active index");

    while (i > 0) {
      map.set((activeIndex + len - i) % len, --i);
    }

    return map;
  }, [activeIndex]);

  return (
    <Box
      className=" justify-center align-center flex items-center r-auto sm:r-0 md:w-[342px] md:h-[404px] w-[245px] h-[285px]"
      id="chakra"
      position="relative"
    >
      {images.map((image, i) => {
        const factor = size - 1 - map.get(i)!;
        const isPreviousActiveIndex = (activeIndex + size - 1) % size === i;

        return (
          <Box
            key={image}
            backgroundImage={`url(${image})`}
            backgroundSize={activeIndex===3?"cover":"100%"}
            backgroundRepeat="no-repeat"
            width="inherit"
            height="inherit"
            position="absolute"
            top={iphone === false ? 40 : 60}
            style={
              activeIndex - i === 0
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            right={iphone ? 0 - 0.075 * factor * 280 : 0 - 0.075 * factor * 580}
            transform={`scale(${1 - 0.075 * factor})`}
            zIndex={map.get(i)}
            opacity={map.get(i)}
            transition={"z-index 0.6s ease, opacity 0.6s ease, transform 0.6s ease, blur 0.6s ease".concat(
              isPreviousActiveIndex ? ", right 0.3s ease" : ""
            )}
          />
        );
      })}
    </Box>
  );
};
