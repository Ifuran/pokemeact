import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);

  const checkPokemon = async () => {
    if (name == "") {
      alert("Anda tidak memasukkan apapun!");
    } else {
      document.getElementById("hasil").style.display = "block";
    }

    const random = Math.floor(Math.random() * 1000);

    requestPokemon(random);
  };

  const requestPokemon = async (length) => {
    setLoading(true);
    await fetch(`https://pokeapi.co/api/v2/pokemon/${length}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const closeModal = () => {
    document.getElementById("hasil").style.display = "none";
  };

  return (
    <>
      <div className="bg-indigo-600 px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">
          Terinspirasi dari <span className="font-bold">cek khodam </span>
          yang sedang viral
        </p>
      </div>
      <section className="bg-gray-900 text-white min-h-screen relative">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Cek Pokemon Online
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Temukan pokemon yang cocok dengan kamu!
            </p>

            <div className="mt-8">
              <input
                type="text"
                placeholder="Tuliskan namamu.."
                className="w-full lg:w-3/4 rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <button
                className="block w-full rounded border border-blue-600 px-12 py-3 mt-3 mx-auto text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                onClick={checkPokemon}
              >
                Cek
              </button>
            </div>
          </div>
        </div>
        <div
          id="hasil"
          className="hasil hidden rounded-lg w-[80%] p-5 shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-1/2 lg:p-8 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 bg-indigo-600"
        >
          <h2 className="text-lg font-extrabold">
            {name}, Pokemon yang cocok untuk kamu adalah:
          </h2>
          {loading ? (
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs"
              alt="loading"
              className="w-20 mx-auto"
            />
          ) : (
            <div className="wrapper">
              <h3 className="text-center text-yellow-400 text-4xl font-extrabold mt-5">
                {pokemon.name &&
                  pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
              </h3>
              <img
                src={pokemon.sprites && pokemon.sprites.front_default}
                alt="pokemon-image"
                className="mx-auto"
              />
            </div>
          )}

          <p className="mt-2 text-md text-center text-white">
            Hati-hati dalam memelihara pokemon anda.
          </p>

          <div className="mt-4 flex gap-2">
            <button
              className="block w-full rounded border border-white px-12 py-3 mt-3 mx-auto text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              onClick={closeModal}
            >
              Cek lagi
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
