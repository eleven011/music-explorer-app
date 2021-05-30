import { useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

// https://www.youtube.com/watch?v=a4rstx9Pz2o&list=PLDZ4p-ENjbiPo4WH7KdHjh_EMI7Ic8b2B&index=7

const useResizeObserver = ref => {
  // function used by resize observer when the 'ref' changes
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => { 
    const observeTarget = ref.current; // observerTarget is the ref's current property

    // resizeObserver receives callback from entries
    const resizeObserver = new ResizeObserver(entries => { 
      entries.forEach(entry => {
        //console.log(entry)

        // set the resized dim at this point
        setDimensions(entry.contentRect);
      });

    });

    // set a target to observe
    resizeObserver.observe(observeTarget);
    return () => { // cleanup function called when component is removed/unmounted
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;