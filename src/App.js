import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project"; // our json data source
function App() {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [tours, setTours] = useState([]); // state to save tours

  // Not interested button to remove a tour
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  // fetch our data using async

  const fetchTours = async () => {
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setIsLoading(false); // set Loading state to false once data is available
      setTours(tours); // set out tour state to the data we got
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // call our fetch using useeffect
  useEffect(() => {
    fetchTours();
  }, []);

  // isLoading retur function

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  // check if tour has no value and return a refresh button
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  // our main return effect (we called the Tours component)
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
