import dataTable from "../../static/json/data.json"

const initData = () => {
    window.data = dataTable
    document.getElementById("loadingDiv").style.display = "none";
};
export default initData;
