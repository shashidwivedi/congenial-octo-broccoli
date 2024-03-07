import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isError) {
    return <h2>ohno</h2>;
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="my-0 mx-auto w-11/12">
      <div className="flex flex-col items-center">
        <Carousel images={pet.images} />
        <h1 className="mb-5 text-6xl text-slate-800">{pet.name}</h1>
        <h2 className="mb-3 text-2xl text-red-700">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button onClick={() => setShowModal(true)} className="button-primary">
          Adopt {pet.name}
        </button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h1 className="mb-3 text-xl">
                Would you like to adopt {pet.name}?
              </h1>
              <div className="flex flex-row gap-3">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                  className="button-primary"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="button-secondary"
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...[props]} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
