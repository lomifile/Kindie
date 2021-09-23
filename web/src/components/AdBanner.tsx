import React, { Component } from "react";

class GoogleAds extends Component {
  componentDidMount() {
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        // @ts-ignore
        style={{ display: "block" }}
        data-ad-client="ca-pub-7377394476088299"
        data-ad-slot="5100220885"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}

export default GoogleAds;
