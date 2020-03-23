import React from "react";

export default function Home() {
  const to = url => {
    window.location.href = url;
  };

  return (
    <div>
      <div className="jumbotron">
        <h1>Covid-19!</h1>
        <p>
          فيروس كورونا المستجد (كوفيد-19) من سلالة كورونا، تم التعرف عليه لأول
          مرة في عدد من المصابين بأعراض الالتهاب الرئوي في مدينة ووهان بمقاطعة
          هوبي، حيث ان معظم الحالات مرتبطة بسوق المأكولات البحرية والحيوانية.
        </p>
        <p>
          <button
            onClick={() => to("https://bit.ly/3bjkug6")}
            className="btn btn-primary btn-lg"
          >
            رابط خارجي عن آخر المستجدات
          </button>
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h3 className="text-center mb">بعض سلالات كورونا السابقة</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img
              src="https://cdn.technologynetworks.com/tn/images/thumbs/jpeg/640_360/scientists-firmly-determine-that-sars-cov-2-was-not-engineered-332244.jpg"
              alt="..."
              hidden="360"
              width="640"
            />
            <div className="caption">
              <h3>SARS-CoV</h3>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img
              src="https://netstorage-legit.akamaized.net/images/9771cd89c9d62383.jpg"
              alt="..."
              hidden="360"
              width="640"
            />
            <div className="caption">
              <h3>MERS-CoV</h3>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img
              src="https://netstorage-legit.akamaized.net/images/9771cd89c9d62383.jpg"
              alt="..."
              hidden="360"
              width="640"
            />
            <div className="caption">
              <h3>HCoV-NL63</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
