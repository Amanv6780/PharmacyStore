
export function AdvertCarousal() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner rounded">
        <div
          className="carousel-item bg-primary   active"
          style={{ height: "300px" }}
        >
          <div className="h-100 w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column p-4">
              <h1 className="text-white">Get Deliveries On Time</h1>
              <p className="text-white">
                Count on us for reliable, on-time delivery of your prescriptions
                and health essentials
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item bg-warning " style={{ height: "300px" }}>
          <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="text-start p-4">
              <h1 className="text-white">Download Your Reports</h1>
              <p className="text-white">
                You can easily download your receipts whenever you need them.
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item bg-success " style={{ height: "300px" }}>
          <div className="h-100 w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column p-4 ">
              <h1 className="text-white">Multiple Store Available</h1>
              <p className="text-white">
                Explore a wide range of products across our multiple store
                locations. Find what you need, wherever you are!
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-target="#carouselExampleControls"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-target="#carouselExampleControls"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}
