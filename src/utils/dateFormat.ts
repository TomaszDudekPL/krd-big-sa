const formatDate = (dataString: string | null) => {

  if (!dataString) {
    return "No date";
  }

  const data = new Date(dataString);

  const day = String(data.getDate()).padStart(2, "0");
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const year = data.getFullYear();

  return `${day}-${month}-${year}`;
};

export default formatDate;