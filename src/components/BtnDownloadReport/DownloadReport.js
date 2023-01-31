import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

export default function DownloadReport({ data }) {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    async function exportToCSV(csvData, fileName, format) {
        // check the type of csvData and convert it to array if it is not
        if (typeof csvData === "object") {
            csvData = Object.values(csvData);
        }

        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: format, type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    async function exportChartsToPdf() {
        const doc = new jsPDF("p", "px");
        const elements = document.getElementsByClassName(
            "custom-chart-for-download"
        );
        await createPdf({ doc, elements });
        doc.save("Reports.pdf");
    }
    async function createPdf({ doc, elements }) {
        const padding = 10;
        const marginTop = 20;
        let top = marginTop;
        for (let i = 0; i < elements.length; i++) {
            const el = elements.item(i);
            const imgData = await htmlToImage.toPng(el);

            let elHeight = el.offsetHeight;
            let elWidth = el.offsetWidth;

            const pageWidth = doc.internal.pageSize.getWidth();

            if (elWidth > pageWidth) {
                const ratio = pageWidth / elWidth;
                elHeight = elHeight * ratio - padding * 2;
                elWidth = elWidth * ratio - padding * 2;
            }

            const pageHeight = doc.internal.pageSize.getHeight();

            if (top + elHeight > pageHeight) {
                doc.addPage();
                top = marginTop;
            }

            doc.addImage(
                imgData,
                "PNG",
                10,
                top,
                elWidth,
                elHeight,
                `image${i}`
            );
            top += elHeight;
        }
    }

    return (
        <div className="col-md-12 mb-4 p-4 shadow rounded">
            <div className="dropdown btn-group mb-10 " role="group">
                <button
                    className="btn btn-success dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => exportToCSV(data, "Reports", "xlsx")}
                >
                    Download Report as XSLX
                </button>
                <ul className="dropdown-menu">
                    <li onClick={exportChartsToPdf}>
                        <a className="dropdown-item" href="#">
                            Download Report as PDF
                        </a>
                    </li>
                    <CSVLink
                        data={data}
                        filename={"Reports.csv"}
                        className="dropdown-item"
                    >
                        Download Report as CSV
                    </CSVLink>
                </ul>
            </div>
        </div>
    );
}
