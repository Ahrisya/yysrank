import dataTable from "../../data/data.json"

const initData = () => {
    window.data = dataTable
    document.getElementById("loadingDiv").style.display = "none";
};
export default initData;
