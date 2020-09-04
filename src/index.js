import "./yysrank.css"
import "./index.scss"
import "./css/icons.scss"
import demo from "./demo";

$(window).on('load', function () {
    console.log("window done");
    initOptions();
    initTables();
    initShishenRank();
    showUpdates();
    demo();
});
