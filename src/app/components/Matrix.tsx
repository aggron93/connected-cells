import * as React from 'react';
import '../style.css'

export class Matrix extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            table: []
        };
    }

    componentDidMount() {
        this.generateMatrixData(this.props)
    }

    componentWillReceiveProps(nextprops: any) {
        this.generateMatrixData(nextprops)
    }

    generateMatrixData = (props: any) => {
        var row = [];
        for (var i = 0; props.row > i; i++) {
            var column = []
            for (var j = 0; props.column > j; j++) {
                column.push(0)
            }
            row.push(column)
        }
        this.setState({ table: row })
    }

    updateCell = (event: any) => {
        var position = event.target.id.split('_').map((x: any) => parseInt(x))
        var temp = [...this.state.table]
        temp[position[0]][position[1]] = parseInt(event.target.innerText)
        this.setState({ table: temp })
    };

    render() {
        let row = []
        for (var i = 0; i < this.state.table.length; i++) {
            let rowID = `row${i}`
            let cell = []
            for (var j = 0; j < this.state.table[i].length; j++) {
                let cellID = `${i}_${j}`
                cell.push(<td style={{ width: 20 }} contentEditable={true} key={cellID} id={cellID}
                    onInput={(event: any) => this.updateCell(event)}
                >{this.state.table[i][j]}</td>)
            }
            row.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
        return (
            <div style={{ justifyContent: 'center' }}>
                <table>
                    <tbody>
                        {row}
                    </tbody>
                </table>
            </div>
        )
    }
}