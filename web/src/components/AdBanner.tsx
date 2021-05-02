import React, { useEffect } from "react";

export const AdBanner = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7377394476088299"
      data-ad-slot="8172913926"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};
