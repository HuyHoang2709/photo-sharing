const fetchModel = (path) => {
  const baseAPI = "https://g92sth-8080.csb.app";
  const fetchData = async () => {
    const res = await fetch(baseAPI + path);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const result = await res.json();
    return result;
  };
  const models = fetchData();
  return models;
};

export default fetchModel;
