const TableIDvalue = "indextable";

let TableLastSortedColumn = -1;

function sortTable() {
    const sortColumn = parseInt(arguments[0]);
    let type = arguments.length > 1 ? arguments[1] : 'T';
    const table = document.getElementById(TableIDvalue);
    const tbody = table.getElementsByTagName("tbody")[0];
    const rows = tbody.getElementsByTagName("tr");
    const arrayOfRows = new Array();
    type = type.toUpperCase();

    for (let i = 0, len = rows.length; i < len; i++) {
        arrayOfRows[i] = new Object;
        arrayOfRows[i].oldIndex = i;
        let celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g, "");
        let re = type == "N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
        arrayOfRows[i].value = celltext.replace(re, "").substr(0, 25).toLowerCase();
    }
    if (sortColumn == TableLastSortedColumn) {
        arrayOfRows.reverse();
    } else {
        TableLastSortedColumn = sortColumn;
        switch (type) {
            case "N":
                arrayOfRows.sort(CompareRowOfNumbers);
                break;
            default:
                arrayOfRows.sort(CompareRowOfText);
        }
    }
    const newTableBody = document.createElement("tbody");
    for (let i = 0, len = arrayOfRows.length; i < len; i++) {
        newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
    }
    table.replaceChild(newTableBody, tbody);
} // function SortTable()

function CompareRowOfText(a, b) {
    const aval = a.value;
    const bval = b.value;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
} // function CompareRowOfText()

function CompareRowOfNumbers(a, b) {
    const aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
    const bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
} // function CompareRowOfNumbers()