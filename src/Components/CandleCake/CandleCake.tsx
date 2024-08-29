import React, { useEffect, useState } from "react";
import "../CandleCake/candle.css";

const CandleCake = () => {
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [isLoud, setIsLoud] = useState(false); 
  let audioContext;
  let analyser;
  let dataArray;

  async function takePermission() {
    if (isMicOpen) return; 

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const source = audioContext.createMediaStreamSource(stream);

      analyser = audioContext.createAnalyser();
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      setIsMicOpen(true);

      processAudio();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }

  function processAudio() {
    if (!analyser) return;

    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;

    // Update loudness state

    if (average > 120) {
      console.log("Loud sound detected!");
      setIsLoud(true);
      closeMic();
    }

    requestAnimationFrame(processAudio);
  }

  useEffect(() => {
    // Cleanup audio context when component unmounts
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <div className=" dark:bg-[#1E201E]  bg-white min-h-full min-w-full bg-gradient-to-b from-white to-gray-400 flex justify-center items-center">
      <div className="relative p-8 bg-white  dark:bg-[#1E201E] dark:text-white flex flex-col sm:flex-row justify-around items-center w-full ">
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] mb-4 dark:bg-[#3C3D37] rounded-full shadow-2xl relative">
          <div className="w-60 h-[30rem] scale-50 absolute top-[40%] left-[50%] -translate-y-1/2 -translate-x-1/2">
            <div className="absolute bottom-0">
              {/* Cake layers */}
              <div className="w-60 h-24 bg-[#F1D4AF] rounded-[7.5rem_7.5rem_1.5rem_1.5rem] absolute bottom-0"></div>
              <div className="w-60 h-24 bg-[#774F38] rounded-[7.5rem_7.5rem_1.5rem_1.5rem] absolute bottom-12"></div>
              <div className="w-60 h-24 bg-[#E08E79] rounded-[7.5rem_7.5rem_1.5rem_1.5rem] absolute bottom-24 bg-[radial-gradient(ellipse_7.5rem_1.5rem_at_7.5rem_1.5rem,_gold,_gold_5%,_#E99788_100%,_transparent)]"></div>

              {/* Candle */}
              <div className="absolute bottom-40 left-[6.5rem] w-8 h-40 bg-red-600 rounded-[1rem_1rem_.5rem_.5rem] bg-[repeating-linear-gradient(45deg,_white,_white_10%,_transparent_10%,_transparent_20%)]">
                {/* Candle wick */}
                <div className="absolute w-2 h-8 bg-black rounded-[.25rem_/_0.15rem] top-[-1.5rem] left-[.75rem]"></div>
                {/* Candle base */}
                <div className="w-8 h-4 bg-red-600 rounded-full"></div>
              </div>

              {/* Flame */}
              <div
                className={` ${
                  isLoud ? `opacity-0` : `opacity-1`
                } absolute left-[6.5rem] top-[-33rem]`}
              >
                {/* White flame */}
                <div className="relative w-5 h-8 top-[9rem] z-40 bg-white/35 rounded-xl transform rotate-[60deg] animate-burn-wht box-shadow-white"></div>
                {/* Yellow flame */}
                <div className="relative top-[6rem] w-5 h-8 bg-yellow-400 rounded-xl transform rotate-[120deg] animate-burn-ylw box-shadow-gold opacity-90"></div>
                {/* Orange flame */}
                <div className="relative top-[5rem] w-5 h-8 bg-orange-500 rounded-xl transform rotate-[65deg] animate-burn-orng box-shadow-orange opacity-80"></div>
                {/* Red flame */}
                <div className="relative top-[3.6rem] w-5 h-8 bg-red-600 rounded-xl transform rotate-[120deg] animate-burn-red opacity-70"></div>
              </div>

              {/* Smoke */}
              <div className="absolute top-[-28.5rem] left-[6.2rem]">
                <div className="absolute top-[7rem] left-2 w-1 h-1 bg-black rounded-full box-shadow-black animate-burn-smoke"></div>
                <div className="absolute top-[8.8rem] left-[.5rem] w-1 h-1 bg-black rounded-full box-shadow-black animate-burn-smoke-rev"></div>
                <div className="absolute top-[6rem] left-[1rem] w-1 h-1 bg-black rounded-full box-shadow-black animate-burn-smoke"></div>
                <div className="absolute top-[5rem] left-[1.5rem] w-1 h-1 bg-black rounded-full box-shadow-black animate-burn-smoke-rev"></div>
                <div className="absolute top-[7.8rem] left-[2rem] w-1 h-1 bg-black rounded-full box-shadow-black animate-burn-smoke"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] sm:w-[60%]  text-lg font-medium">
          <ul>
            <li className="md:mb-5">🎉🎂 Happy Birthday! 🎂🎉</li>
            <li className="md:mb-5">
              We hope your special day is filled with joy and celebration! 🎈🎁
              To add a little fun to your birthday, we have a virtual candle for
              you. Simply blow into your microphone to blow out the candle and
              make a wish! 🎊💨
            </li>

            <li className="md:mb-5">
              Have an amazing birthday and enjoy your special day! 🥳🎉 Best
              wishes,
            </li>

            <button
              onClick={takePermission}
              className="px-5 py-2 shadow-lg  bg-slate-300/20 hover:bg-slate-300/35 hover:-translate-y-2 duration-300"
            >
              Open Mic
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CandleCake;
