"use server";
export const createCourse = async () => {
  try {
    const dataExcel = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfa6fJVtWm4YHM6MTZAPp52yE4jZPtUV1Stpx59SWrOJS8g6FUcXD0imgrBZ-5hA8zeGL6H-k2lWZy/pub?output=tsv"
    );
    const response = await dataExcel.text();
    const rows = response.split("\n");
    const quantity = rows.map((row) => {
      return {
        num: Number(row.split("\t")[0]),
        plat: row.split("\t")[1],
      };
    });
    return quantity;
  } catch (error) {
    console.error(error);
  }
};
