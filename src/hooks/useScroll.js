import { useEffect, useState } from "react";
const SCROLL_END_ZONE = 300;

const useScroll = (element) => {
  const [scrollEnd, setScrollEnd] = useState(false);

  useEffect(() => {
    if (!element) {
      return;
    }
    const handleScrollEnd = () => {
      if (
        element.scrollHeight - element.scrollTop - SCROLL_END_ZONE <=
        element.clientHeight
      ) {
        if (!scrollEnd) {
          setScrollEnd(true);
          console.log("Loading more items ...");
        }
      }
    };

    element.addEventListener("scroll", handleScrollEnd);

    console.log("adding listener ");

    return () => {
      console.log("removing listener");
      element.removeEventListener("scroll", handleScrollEnd);
    };
  }, [element?.id, scrollEnd]);

  return scrollEnd;
};

export default useScroll;
