import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../method/useFetch";

const SearchBar = ({ api, onEvent }) => {
  const format = "?format=j1";
  const [inputClass, setInput] = useState("");
  const [search, setSearch] = useState("Philippines");
  const { data, loading, error, updateUrlAndParams } = useFetch(
    `${api}/${search}`,
    format
  );

  const [name, setName] = useState("");
  const names = [
    "niko",
    "rodmark",
    "carlos",
    "angelo",
    "lucky",
    "cambronero",
    "zhayden",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (names.some((name) => name === search.toLowerCase())) {
      console.log("it run");
      setName(search);
      const url = `${api}/cavite`;
      updateUrlAndParams(url, format);
      return;
    } else {
      setName("");
      const url = `${api}/${search}`;
      updateUrlAndParams(url, format);
    }
  };

  useEffect(() => {
    if (error) setInput("red-border");
    else setInput("");

    onEvent({ data, loading, name });
  }, [data, loading, error, name]);

  return (
    <section>
      <form id="search-engine" onSubmit={handleSubmit}>
        <label htmlFor="input">
          <i className="bi bi-geo-alt"></i>
        </label>
        <input
          type="text"
          id="input"
          name="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputClass}
          placeholder="example of city name"
        />
        <button type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
      <div className="error">
        {error &&
          (error === "Error: HTTP error: 404"
            ? "Can't find what you search for"
            : "No Internet")}
      </div>
    </section>
  );
};

SearchBar.Proptypes = {
  api: PropTypes.string.isRequired,
  onEvent: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SearchBar;
