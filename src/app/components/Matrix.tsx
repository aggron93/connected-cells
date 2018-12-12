import * as React from 'react';
import '../style.css'

export class Matrix extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            tableData: [],
        };
    }

    componentDidMount() {
        this.generateMatrixData(this.props)
    }

    componentWillReceiveProps(nextprops: any) {
        this.generateMatrixData(nextprops)
    }

    generateMatrixData = (props: any) => {
        var row = []
        for (var i = 0; props.row > i; i++) {
            var column = []
            for (var j = 0; props.column > j; j++) {
                column.push(0)
            }
            row.push(column)
        }
        /* row = [
            [1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 1, 1]
        ] */
        this.setState({ tableData: row })
    }

    updateCell = (event: any) => {
        var position = event.target.id.split('_').map((x: any) => parseInt(x))
        var temp = [...this.state.tableData]
        var currentVal = this.state.tableData[position[0]][position[1]]
        switch (currentVal) {
            case 0:
                temp[position[0]][position[1]] = 1
                break;
            case 1:
                temp[position[0]][position[1]] = 0
                break;
        }
        this.setState({ tableData: temp })
    };

    generateTable = () => {
        let row = []
        for (var i = 0; i < this.state.tableData.length; i++) {
            let cell = []
            for (var j = 0; j < this.state.tableData[i].length; j++) {
                let cellID = `${i}_${j}`
                cell.push(
                    <td style={{ height: 40, width: 40, textAlign: 'center', backgroundColor: this.state.tableData[i][j] == 1 ? 'yellow' : '' }} key={cellID} id={cellID}
                        onClick={(event: any) => this.updateCell(event)}>{this.state.tableData[i][j]}
                    </td>
                )
            }
            row.push(<tr key={i}>{cell}</tr>)
        }
        return row;
    }

    getCellRegions = () => {
        let tempTable = [...this.state.tableData]
        let found = tempTable.map((row: any) => {
            var columns = row.map(() => {
                return false
            })
            return columns
        })
        let regionCellsCollection = []
        let MaxRow = tempTable.length
        let maxCol = tempTable.length > 0 ? tempTable[0].length : 0
        let largestCellArea = 0
        let largestCellAreaCollection: any
        let regionCells: any

        var searchNeighbours = (i: number, j: number) => {
            if (tempTable[i][j] == 1 && !found[i][j]) {

                found[i][j] = true
                regionCells.push([i, j])

                if (i - 1 >= 0 && j - 1 >= 0)
                    searchNeighbours(i - 1, j - 1);

                if (j - 1 >= 0)
                    searchNeighbours(i, j - 1);

                if (i + 1 < MaxRow && j - 1 >= 0)
                    searchNeighbours(i + 1, j - 1);

                if (i + 1 < MaxRow)
                    searchNeighbours(i + 1, j);

                if (i + 1 < MaxRow && j + 1 < maxCol)
                    searchNeighbours(i + 1, j + 1);
                if (j + 1 < maxCol)
                    searchNeighbours(i, j + 1);

                if (i - 1 >= 0 && j + 1 < maxCol)
                    searchNeighbours(i - 1, j + 1);
                if (i - 1 >= 0)
                    searchNeighbours(i - 1, j);
                return regionCells;
            }
            return 0;
        }

        for (let i = 0; i < tempTable.length; i++) {
            var row = tempTable[i]
            for (let j = 0; j < row.length; j++) {
                regionCells = []
                if (!found[i][j]) {
                    var area = searchNeighbours(i, j);
                    regionCellsCollection.push(area)
                    if (area.length > largestCellArea) {
                        largestCellArea = area.length
                        largestCellAreaCollection = area
                    }
                }
            }
        }
        return { largestCellArea: largestCellArea, largestCellAreaCollection: largestCellAreaCollection }
    }


    render() {
        let table = this.generateTable()
        let largestRegion = this.getCellRegions()

        return (
            <div>
                <table style={{ flex: 'none' }}>
                    <tbody>
                        {table}
                    </tbody>
                </table>
                <p style={{ textAlign: 'center' }}> Largest region : {largestRegion.largestCellArea}</p>
                {/*<p style={{ flex: 'none', textAlign: 'center', position: "fixed", width: 'auto' }}>Cells region : {JSON.stringify(largestRegion.largestCellAreaCollection)}</p> */}
            </div>
        )
    }
}