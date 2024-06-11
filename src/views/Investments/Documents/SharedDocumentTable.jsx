import { Table } from "react-bootstrap"
import { columns } from "./TableData";
import { useEffect, useState } from "react";


const SharedDocumentTable = () => {

    const [documentData, setDocumentData] = useState([]);

    const getMySharedDocuments = async (id) => {
        try {
        //   const res = await fetch(`http://localhost:8080/document/getMySharedDocuments?id=${id}`,{
          const res = await fetch(`https://autoinvest.ai/document/getMySharedDocuments?id=${id}`,{
            method: 'GET',
            headers: {
              'Content-type': 'application/json'
            },
          })
    
          if(res.ok) {
            res.json().then(data => {
              setDocumentData(data.data);
            })
          }
        } catch (err) {
          console.error(err);
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem("jampackId");
        getMySharedDocuments(userId);
    },[])

    return (
        <div>
            <Table
                className="hk-data-talbe h-100"
            >
                <thead>
                    <tr>
                        {columns.map((cols, index) => (
                            <th key={index}>
                                <span className="d-flex">
                                    <span className="flex-grow-1">{cols.title}</span>
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                        {
                            documentData?.map((row, index) => (
                                <tr key={index}>
                                    {
                                        columns.map((cols, index) => (
                                            <td key={index}>
                                                {cols.cellFormatter
                                                    ? cols.cellFormatter(row[cols.accessor])
                                                    : row[cols.accessor]}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                </tbody>
            </Table>
        </div>
    )
}

export default SharedDocumentTable;